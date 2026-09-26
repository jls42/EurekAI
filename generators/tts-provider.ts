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

// Re-export pour conserver la surface API publique de ce module.
export type { MistralVoice, VoiceId } from '../helpers/voice-types.js';

// --- Types ---

export interface TtsOptions {
  model: string;
  mistralClient: Mistral;
}

// --- Mistral TTS ---

export async function textToSpeech(
  text: string,
  voiceId: VoiceId,
  options: TtsOptions,
): Promise<Buffer> {
  const response = await options.mistralClient.audio.speech.complete({
    input: text,
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
  };
}

const MAX_VOICE_PAGES = 50;

// `voices.list` (GET /v1/audio/voices, pagination par offset) est marqué déprécié depuis le SDK
// 2.7.0 au profit de GET /v2/audio/voices (pagination par curseur `next_page_token`), que le SDK
// n'expose pas encore. La v1 répond toujours (vérifié le 2026-09-26, aucune date de retrait
// publiée) : migrer dès qu'une méthode v2 existe dans le SDK.
async function fetchAllVoices(client: Mistral): Promise<MistralVoice[]> {
  const voices: MistralVoice[] = [];
  let offset = 0;
  for (let page = 0; page < MAX_VOICE_PAGES; page++) {
    // eslint-disable-next-line sonarjs/deprecation -- v2 absente du SDK 2.7.0, cf. ci-dessus
    const res = await client.audio.voices.list({ limit: 100, offset }); // NOSONAR(S1874) — v2 absente du SDK
    const items = res.items ?? [];
    for (const v of items) voices.push(toMistralVoice(v));
    if (offset + items.length >= res.total) break;
    offset += items.length;
  }
  return voices;
}

function matchesLang(voice: MistralVoice, lang: string): boolean {
  return voice.languages.some((l) => l.startsWith(lang));
}

export async function listVoices(client: Mistral, lang?: string): Promise<MistralVoice[]> {
  const voices = await fetchAllVoices(client);
  if (!lang) return voices;
  return voices.filter((v) => matchesLang(v, lang));
}
