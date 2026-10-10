import { Mistral } from '@mistralai/mistralai';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { collectStream } from '../helpers/audio.js';
import { mediaUrl, uniqueMediaName } from '../helpers/generation-media.js';
import { logger } from '../helpers/logger.js';
import { recordMediaUrl } from '../helpers/media-ledger.js';
import { imageSystem, imageUser } from '../prompts.js';
import type { AgeGroup } from '../types.js';

// 'download' : URL signée renvoyée par l'outil, à télécharger (elle expire, cf. downloadUrlImage).
interface ImageResult {
  type: 'url' | 'fileId' | 'download';
  value: string;
}

// Champs possibles renvoyés par l'API Mistral selon la variante de chunk
// (camelCase / snake_case / URL directe). Ordre = priorité de résolution.
const CHUNK_REF_FIELDS: ReadonlyArray<{ key: string; type: ImageResult['type'] }> = [
  { key: 'fileId', type: 'fileId' },
  { key: 'file_id', type: 'fileId' },
  { key: 'imageUrl', type: 'url' },
  { key: 'url', type: 'url' },
];

export function parseChunkRef(c: Record<string, unknown>): ImageResult | null {
  for (const { key, type } of CHUNK_REF_FIELDS) {
    const raw = c[key];
    if (raw) return { type, value: `${raw}` }; // NOSONAR(S6551) — always string from Mistral API
  }
  return null;
}

// Images citées par les morceaux du message final (format de l'outil jusqu'en octobre 2026).
const chunkRefs = (outputs: unknown[]): ImageResult[] => {
  const refs: ImageResult[] = [];
  for (const output of outputs) {
    const content = (output as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;
    for (const chunk of content) {
      const ref = parseChunkRef(chunk as Record<string, unknown>);
      if (ref && !refs.some((r) => r.value === ref.value)) refs.push(ref);
    }
  }
  return refs;
};

// L'image générée reste stockée chez Mistral (fileId) tant qu'on ne la supprime pas : suppression
// gratuite, tentée même si le téléchargement échoue ; un échec est seulement journalisé.
const deleteRemoteImage = async (client: Mistral, fileId: string): Promise<void> => {
  try {
    await client.files.delete({ fileId });
  } catch (e) {
    logger.warn('image', `suppression du fichier Mistral ${fileId} impossible`, e);
  }
};

// Images au-delà de la première (seule gardée) : leurs fichiers sont supprimés chez Mistral, comme
// celui de la première après son téléchargement ; l'avertissement trace le surcoût (chaque appel
// de l'outil est facturé, cf. le coût de la génération). Suppressions indépendantes, en parallèle :
// deleteRemoteImage journalise son propre échec et ne rejette jamais.
const discardExtraImages = async (client: Mistral, extra: ImageResult[]): Promise<void> => {
  if (extra.length === 0) return;
  logger.warn(
    'image',
    `${extra.length + 1} images reçues de l'agent, seule la première est gardée`,
  );
  const fileIds = extra.filter((ref) => ref.type === 'fileId').map((ref) => ref.value);
  await Promise.all(fileIds.map((fileId) => deleteRemoteImage(client, fileId)));
};

// Appel de l'outil d'image : une sortie `tool.execution` par appel, qu'il ait produit une image
// ou non.
const isImageToolCall = (output: unknown): boolean => {
  const o = (output || {}) as { type?: unknown; name?: unknown };
  return o.type === 'tool.execution' && o.name === 'image_generation';
};

// Motif d'un appel (`info.result`), vide s'il est absent ou s'il contient une URL : le résultat
// d'un appel réussi porte l'URL signée de l'image, qui ne doit jamais finir dans les journaux.
const toolCallReason = (output: unknown): string => {
  const result = (output as { info?: { result?: unknown } }).info?.result;
  if (typeof result !== 'string' || /https?:/i.test(result)) return '';
  return result.slice(0, 120);
};

// Forme d'une réponse pour le journal (type de chaque sortie, outil, nature du contenu), sans son
// texte : il porterait l'URL signée d'une image.
const describeOutput = (output: unknown): string => {
  const o = (output || {}) as { type?: unknown; name?: unknown; content?: unknown; info?: unknown };
  const name = typeof o.name === 'string' ? `:${o.name}` : '';
  let content = '';
  if (Array.isArray(o.content)) content = `[${o.content.length} morceau(x)]`;
  else if (typeof o.content === 'string') content = '(texte)';
  return `${String(o.type)}${name}${content}${o.info ? '(info)' : ''}`;
};

const describeOutputs = (outputs: unknown[]): string => {
  return outputs.map(describeOutput).join(' | ');
};

// Format de l'outil mesuré le 2026-10-10 : l'image n'est plus un fichier de l'API Files cité par le
// message final (devenu un simple texte), mais une URL signée temporaire dans le résultat de
// l'appel, `info.result` = `{"url": "https://…blob.core.windows.net/…"}`. Toute illustration
// échouait (« Aucune image generee par l'agent »).
const toolResultUrl = (output: unknown): string | null => {
  if (!isImageToolCall(output)) return null;
  const result = (output as { info?: { result?: unknown } }).info?.result;
  if (typeof result !== 'string') return null;
  try {
    const parsed: unknown = JSON.parse(result);
    const url = (parsed as { url?: unknown } | null)?.url;
    return typeof url === 'string' ? url : null;
  } catch {
    return null;
  }
};

// Toutes les images de la réponse, dans l'ordre et sans doublon : l'agent peut appeler l'outil
// plusieurs fois malgré la consigne « une SEULE image » (vécu le 2026-09-26 : 2 appels
// `image_generation` facturés pour une illustration). Morceaux du message d'abord ; à défaut, URLs
// des appels de l'outil. Jamais les deux : une même image serait comptée deux fois.
export const extractImageRefs = (outputs: unknown[]): ImageResult[] => {
  const fromChunks = chunkRefs(outputs);
  if (fromChunks.length > 0) return fromChunks;
  const urls = outputs.map(toolResultUrl).filter((url): url is string => url !== null);
  return [...new Set(urls)].map((value): ImageResult => ({ type: 'download', value }));
};

// L'agent rappelle l'outil quand un appel échoue. Vécu les 2026-09-26 et 27 : « Tool call timed
// out. Please try again. » au bout de 30 s côté Mistral (8 appels sur 20), toujours une seule
// image au final. Chaque appel est compté dans le coût (`usage.connectors`) : les tentatives sans
// image sont journalisées avec leur motif, puisque la conversation n'est plus stockée chez
// Mistral (store: false).
const warnFailedToolCalls = (outputs: unknown[], images: number): void => {
  const calls = outputs.filter(isImageToolCall);
  const failed = calls.length - images;
  if (failed <= 0) return;
  const reasons = [...new Set(calls.map(toolCallReason).filter(Boolean))];
  const detail = reasons.length > 0 ? ` (${reasons.join(' | ')})` : '';
  const s = failed > 1 ? 's' : '';
  logger.warn(
    'image',
    `${calls.length} appels à l'outil d'image pour ${images} image : ${failed} tentative${s} sans image, comptée${s} dans le coût${detail}`,
  );
};

// Extension réelle de l'image : l'agent renvoie du JPEG, enregistré jusqu'ici en .png (servi en
// image/png). Les octets de tête font foi ; format non reconnu → .png, l'extension historique.
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];

const imageExtension = (image: Buffer): 'jpg' | 'png' => {
  return JPEG_SIGNATURE.every((byte, i) => image[i] === byte) ? 'jpg' : 'png';
};

const saveImageBuffer = (imageBuffer: Buffer, projectDir: string, pid: string): string => {
  // Nom unique : deux illustrations générées dans la même milliseconde ne s'écrasent plus.
  const imageFilename = uniqueMediaName('illustration', imageExtension(imageBuffer));
  writeFileSync(join(projectDir, imageFilename), imageBuffer);
  console.log(`    Image saved: ${imageFilename} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
  const url = mediaUrl(pid, imageFilename);
  // Registre de la génération (media-ledger) : image supprimée si la génération n'aboutit pas.
  recordMediaUrl(url);
  return url;
};

// Flèche (pas `async function`) : Lizard agglomérait cette déclaration avec sa voisine et ne
// la mesurait pas (cf. CLAUDE.md « Pièges Lizard »).
const downloadAndSaveImage = async (
  client: Mistral,
  fileId: string,
  projectDir: string,
  pid: string,
): Promise<string> => {
  try {
    console.log(`    Image fileId: ${fileId}, downloading...`);
    const fileStream = await client.files.download({ fileId });
    const imageBuffer = await collectStream(fileStream as Parameters<typeof collectStream>[0]);
    return saveImageBuffer(imageBuffer, projectDir, pid);
  } finally {
    await deleteRemoteImage(client, fileId);
  }
};

// URL signée de l'outil : téléchargée et enregistrée comme une image de l'API Files (elle expire,
// et l'enfant ne charge aucune image hors de l'app). Seul le stockage Azure de Mistral est accepté
// (« mistralaiblackforestprod » le 2026-10-10), en HTTPS, sans redirection, 15 Mo au plus.
const IMAGE_HOST = /^mistral[a-z0-9-]*\.blob\.core\.windows\.net$/;
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

const imageDownloadUrl = (raw: string): string => {
  const parsed = new URL(raw);
  if (parsed.protocol !== 'https:' || !IMAGE_HOST.test(parsed.hostname)) {
    throw new Error(`Hôte d'image refusé : ${parsed.hostname}`);
  }
  return parsed.href;
};

const downloadUrlImage = async (raw: string, projectDir: string, pid: string): Promise<string> => {
  const url = imageDownloadUrl(raw);
  const allowedUrls = [url];
  if (allowedUrls.includes(url)) {
    const res = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`Téléchargement de l'image : HTTP ${res.status}`);
    const imageBuffer = Buffer.from(await res.arrayBuffer());
    if (imageBuffer.length === 0 || imageBuffer.length > MAX_IMAGE_BYTES) {
      throw new Error(`Image de ${imageBuffer.length} octets refusée`);
    }
    return saveImageBuffer(imageBuffer, projectDir, pid);
  }
  throw new Error("URL d'image refusée");
};

const resolveImageUrl = async (
  client: Mistral,
  ref: ImageResult,
  projectDir: string,
  pid: string,
): Promise<string> => {
  if (ref.type === 'url') return ref.value;
  if (ref.type === 'download') return downloadUrlImage(ref.value, projectDir, pid);
  return downloadAndSaveImage(client, ref.value, projectDir, pid);
};

// Arrow function (pas `function` declaration) pour contourner un crash du
// plugin Codacy `eslint-plugin-security-node` (rule `detect-unhandled-async-errors`)
// qui hooke sur les FunctionDeclaration et plante en lisant `node.body.body[0].type`
// quand la signature combine 6 params + defaults TS + return type Promise<{...}>.
// Le hook ne s'applique pas aux ArrowFunctionExpression → pas de crash.
export const generateImage = async (
  client: Mistral,
  markdown: string,
  projectDir: string,
  pid: string,
  lang: string = 'fr',
  ageGroup: AgeGroup = 'enfant',
): Promise<{ imageUrl: string; prompt: string }> => {
  const agent = await client.beta.agents.create({
    model: 'mistral-large-latest',
    name: 'Illustrator',
    instructions: imageSystem(lang, ageGroup),
    tools: [{ type: 'image_generation' }],
    completionArgs: { temperature: 0.3, topP: 0.95 },
  });

  try {
    const prompt = imageUser(lang, markdown);
    // store: false : Mistral ne garde pas la conversation, qui contient le texte de la leçon
    // (l'agent et l'image générée sont déjà supprimés chez Mistral).
    const response = await client.beta.conversations.start({
      agentId: agent.id,
      inputs: prompt,
      store: false,
    });
    const refs = extractImageRefs(response.outputs);
    warnFailedToolCalls(response.outputs, refs.length);
    const [imageRef, ...extra] = refs;

    if (!imageRef) {
      // Forme de la réponse seulement : son texte brut contiendrait l'URL signée d'une image et
      // le long prompt de l'outil (qui masquait, tronqué à 2000 caractères, la suite de la réponse).
      logger.error(
        'image',
        `aucune image dans la réponse de l'agent : ${describeOutputs(response.outputs)}`,
      );
      throw new Error("Aucune image generee par l'agent");
    }

    try {
      const imageUrl = await resolveImageUrl(client, imageRef, projectDir, pid);
      return { imageUrl, prompt };
    } finally {
      await discardExtraImages(client, extra);
    }
  } finally {
    await client.beta.agents
      .delete({ agentId: agent.id })
      .catch((e) => logger.warn('image', 'agent delete failed', e));
  }
};
