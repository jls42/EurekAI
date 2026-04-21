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
import type { MistralVoice } from '../helpers/voice-types.js';

// Re-export pour conserver la surface API publique de ce module.
export type { MistralVoice } from '../helpers/voice-types.js';

// --- Types ---

export interface TtsOptions {
  model: string;
  mistralClient: Mistral;
}

// --- Mistral TTS ---

export async function textToSpeech(
  text: string,
  voiceId: string,
  options: TtsOptions,
): Promise<Buffer> {
  const response = await options.mistralClient.audio.speech.complete({
    input: text,
    model: options.model,
    voiceId,
    responseFormat: 'mp3',
  });
  if (!response.audioData) {
    throw new Error(`mistral_tts_empty_response (voiceId=${voiceId}, model=${options.model})`);
  }
  return Buffer.from(response.audioData, 'base64');
}

// --- Voice management ---

function pickField<T>(obj: Record<string, unknown>, key: string, fallback: T): T {
  return (obj[key] ?? fallback) as T;
}

function toMistralVoice(v: unknown): MistralVoice {
  const o = v as Record<string, unknown>;
  return {
    id: pickField<string>(o, 'id', ''),
    name: pickField<string>(o, 'name', ''),
    languages: pickField<string[]>(o, 'languages', []),
    gender: pickField<string | undefined>(o, 'gender', undefined),
    tags: pickField<string[] | undefined>(o, 'tags', undefined),
    createdAt: pickField<string | undefined>(o, 'createdAt', undefined),
  };
}

const MAX_VOICE_PAGES = 50;

async function fetchAllVoices(client: Mistral): Promise<MistralVoice[]> {
  const voices: MistralVoice[] = [];
  let offset = 0;
  for (let page = 0; page < MAX_VOICE_PAGES; page++) {
    const res = await client.audio.voices.list({ limit: 100, offset });
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
