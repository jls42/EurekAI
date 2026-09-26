import { Mistral } from '@mistralai/mistralai';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { collectStream } from '../helpers/audio.js';
import { mediaUrl, uniqueMediaName } from '../helpers/generation-media.js';
import { logger } from '../helpers/logger.js';
import { recordMediaUrl } from '../helpers/media-ledger.js';
import { imageSystem, imageUser } from '../prompts.js';
import type { AgeGroup } from '../types.js';

interface ImageResult {
  type: 'url' | 'fileId';
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

// Toutes les images de la réponse, dans l'ordre et sans doublon : l'agent peut appeler l'outil
// plusieurs fois malgré la consigne « une SEULE image » (vécu le 2026-09-26 : 2 appels
// `image_generation` facturés pour une illustration), et chaque fichier généré reste stocké chez
// Mistral tant qu'on ne le supprime pas.
export const extractImageRefs = (outputs: unknown[]): ImageResult[] => {
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
// de l'outil est facturé, cf. le coût de la génération).
const discardExtraImages = async (client: Mistral, extra: ImageResult[]): Promise<void> => {
  if (extra.length === 0) return;
  logger.warn(
    'image',
    `${extra.length + 1} images reçues de l'agent, seule la première est gardée`,
  );
  for (const ref of extra) {
    if (ref.type === 'fileId') await deleteRemoteImage(client, ref.value);
  }
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
    // Nom unique : deux illustrations générées dans la même milliseconde ne s'écrasent plus.
    const imageFilename = uniqueMediaName('illustration', 'png');
    writeFileSync(join(projectDir, imageFilename), imageBuffer);
    console.log(`    Image saved: ${imageFilename} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
    const url = mediaUrl(pid, imageFilename);
    // Registre de la génération (media-ledger) : image supprimée si la génération n'aboutit pas.
    recordMediaUrl(url);
    return url;
  } finally {
    await deleteRemoteImage(client, fileId);
  }
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
    const response = await client.beta.conversations.start({ agentId: agent.id, inputs: prompt });
    const [imageRef, ...extra] = extractImageRefs(response.outputs);

    if (!imageRef) {
      console.error('    Image outputs:', JSON.stringify(response.outputs, null, 2).slice(0, 2000));
      throw new Error("Aucune image generee par l'agent");
    }

    try {
      const imageUrl =
        imageRef.type === 'url'
          ? imageRef.value
          : await downloadAndSaveImage(client, imageRef.value, projectDir, pid);
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
