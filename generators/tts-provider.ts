/**
 * TTS provider bas-niveau — couche Mistral Voxtral uniquement (actuellement mono-provider).
 *
 * Distinction avec `./tts.ts` : ce fichier expose l'API client (textToSpeech single-call,
 * listVoices pagination). `tts.ts` orchestre au-dessus (concat ffmpeg, dispatch host/guest).
 *
 * Le nom "provider" est conservé malgré le mono-provider actuel : si un futur provider TTS
 * est réintroduit (cf. CLAUDE.md "Réintégration ElevenLabs envisagée"), le nom reste
 * sémantiquement correct et un dispatcher pourra être ajouté ici sans rename destructif.
 */
import type { Mistral } from '@mistralai/mistralai';
import type { MistralVoice, VoiceId } from '../helpers/voice-types.js';
import { asVoiceId } from '../helpers/voice-types.js';
import { normalizeTtsModel, type TtsModel } from '../helpers/tts-models.js';
import { speakableText } from '../helpers/tts-text.js';
import { logger } from '../helpers/logger.js';
import type { AppConfig } from '../types.js';

// Re-export pour conserver la surface API publique de ce module.
export type { MistralVoice, VoiceId } from '../helpers/voice-types.js';

// --- Types ---

export interface TtsOptions {
  model: TtsModel;
  mistralClient: Mistral;
}

/**
 * Options TTS d'un appel : modèle de la config normalisé (id de TTS_MODELS, jamais un alias ni une
 * valeur libre, défense au point d'appel comme pour l'OCR) + client résolu de la requête.
 */
export const ttsOptionsFor = (
  config: Pick<AppConfig, 'ttsModel'>,
  client: Mistral,
): TtsOptions => ({
  model: normalizeTtsModel(config.ttsModel),
  mistralClient: client,
});

// --- Mistral TTS ---

export async function textToSpeech(
  text: string,
  voiceId: VoiceId,
  options: TtsOptions,
): Promise<Buffer> {
  const response = await options.mistralClient.audio.speech.complete({
    input: speakableText(text),
    model: options.model,
    voiceId,
    responseFormat: 'mp3',
  });
  if (!response.audioData) {
    // `.stage = 'tts'` verrouille le mapping vers `tts_upstream_error` côté
    // `helpers/error-matchers.ts` sans dépendre d'un match textuel fragile sur le message.
    const err = new Error(
      `mistral_tts_empty_response (voiceId=${voiceId}, model=${options.model})`,
    ) as Error & { stage: string };
    err.stage = 'tts';
    throw err;
  }
  return Buffer.from(response.audioData, 'base64');
}

// --- Voice listing helpers ---

function pickField<T>(obj: Record<string, unknown>, key: string, fallback: T): T {
  return (obj[key] ?? fallback) as T;
}

function toMistralVoice(v: unknown): MistralVoice {
  const o = v as Record<string, unknown>;
  return {
    // SDK response boundary : cast string -> VoiceId ici (cf. helpers/voice-types.ts).
    id: asVoiceId(pickField<string>(o, 'id', '')),
    name: pickField<string>(o, 'name', ''),
    languages: pickField<string[]>(o, 'languages', []),
    gender: pickField<string | undefined>(o, 'gender', undefined),
    tags: pickField<string[] | undefined>(o, 'tags', undefined),
    createdAt: pickField<string | undefined>(o, 'createdAt', undefined),
    // `kind` (ivc/pvc, exposé depuis le SDK 3) décide de la compatibilité avec les modèles speech
    // v1 ; slug et userId servent de repli s'il manque (cf. voiceSupportsTtsModel, tts-models.ts).
    kind: pickField<string | null>(o, 'kind', null) ?? undefined,
    slug: pickField<string | null>(o, 'slug', null) ?? undefined,
    custom: pickField<string | null>(o, 'userId', null) !== null,
  };
}

const MAX_VOICE_PAGES = 50;
// Plafond de `page_size` accepté par GET /v2/audio/voices (mesuré le 2026-10-24 : 101 → 422) ; les
// 68 voix du catalogue tiennent alors en une page.
const VOICE_PAGE_SIZE = 100;

// GET /v2/audio/voices (`voices.search`, SDK 3), pagination par curseur, suivi à la main :
// l'itérateur du SDK (`next()`, `for await`) s'arrête dès qu'une page compte moins de `pageSize`
// voix, même si un `next_page_token` suit (catalogue tronqué sans erreur). La v1 (`voices.list`,
// par offset) est dépréciée : en-tête `sunset` au 2027-03-31 (relu le 2026-10-24).
async function fetchAllVoices(client: Mistral): Promise<MistralVoice[]> {
  const voices: MistralVoice[] = [];
  let pageToken: string | undefined;
  for (let page = 0; page < MAX_VOICE_PAGES; page++) {
    // Pagination : le curseur de la page suivante vient de la réponse de celle-ci.
    // eslint-disable-next-line no-await-in-loop -- pagination séquentielle par curseur
    const res = await client.audio.voices.search({
      type: 'all',
      pageSize: VOICE_PAGE_SIZE,
      pageToken,
    });
    for (const v of res.result.data) voices.push(toMistralVoice(v));
    pageToken = res.result.nextPageToken ?? undefined;
    if (!pageToken) break;
  }
  return voices;
}

function matchesLang(voice: MistralVoice, lang: string): boolean {
  return voice.languages.some((l) => l.startsWith(lang));
}

// Une voix sans `kind` retombe sur le repli slug/userId : à signaler, l'API ou le SDK a changé.
function warnMissingKind(voices: readonly MistralVoice[]): void {
  const missing = voices.filter((v) => v.kind === undefined).length;
  if (missing > 0) logger.warn('tts', `${missing} voice(s) without kind: slug/userId fallback`);
}

export async function listVoices(client: Mistral, lang?: string): Promise<MistralVoice[]> {
  const voices = await fetchAllVoices(client);
  warnMissingKind(voices);
  if (!lang) return voices;
  return voices.filter((v) => matchesLang(v, lang));
}
