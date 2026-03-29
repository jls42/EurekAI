import type { Mistral } from '@mistralai/mistralai';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { collectStream } from '../helpers/audio.js';

// --- Types ---

export type TtsOptions =
  | { provider: 'mistral'; model: string; mistralClient: Mistral }
  | { provider: 'elevenlabs'; model: string };

export interface MistralVoice {
  id: string;
  name: string;
  languages: string[];
  gender?: string;
  tags?: string[];
  createdAt?: string;
}

export interface CreateVoiceOptions {
  name: string;
  /** Base64-encoded audio file */
  sampleAudio: string;
  sampleFilename?: string;
  languages?: string[];
  gender?: string;
  tags?: string[];
}

// --- TTS dispatch ---

export async function textToSpeech(
  text: string,
  voiceId: string,
  options: TtsOptions,
): Promise<Buffer> {
  if (options.provider === 'mistral') {
    return mistralTts(text, voiceId, options.model, options.mistralClient);
  }
  return elevenlabsTts(text, voiceId, options.model);
}

// --- Mistral TTS ---

const TTS_MAX_RETRIES = 3;
const TTS_RETRY_DELAY_MS = 1000;

async function mistralTts(
  text: string,
  voiceId: string,
  model: string,
  client: Mistral,
): Promise<Buffer> {
  for (let attempt = 1; attempt <= TTS_MAX_RETRIES; attempt++) {
    try {
      const response = await client.audio.speech.complete({
        input: text,
        model,
        voiceId,
        responseFormat: 'mp3',
      });
      return Buffer.from(response.audioData, 'base64');
    } catch (err: any) {
      if (attempt < TTS_MAX_RETRIES && err.statusCode === 500) {
        console.warn(`  TTS attempt ${attempt}/${TTS_MAX_RETRIES} failed (500), retrying in ${TTS_RETRY_DELAY_MS}ms...`);
        await new Promise((r) => setTimeout(r, TTS_RETRY_DELAY_MS * attempt));
        continue;
      }
      throw err;
    }
  }
  throw new Error('TTS: unreachable');
}

// --- Voice management ---

function toMistralVoice(v: any): MistralVoice {
  return {
    id: v.id ?? '',
    name: v.name ?? '',
    languages: v.languages ?? [],
    gender: v.gender ?? undefined,
    tags: v.tags ?? undefined,
    createdAt: v.createdAt ?? undefined,
  };
}

const MAX_VOICE_PAGES = 50;

export async function listVoices(client: Mistral, lang?: string): Promise<MistralVoice[]> {
  const voices: MistralVoice[] = [];
  let offset = 0;
  let pageCount = 0;
  while (pageCount++ < MAX_VOICE_PAGES) {
    const page = await client.audio.voices.list({ limit: 100, offset });
    for (const v of page.items ?? []) {
      voices.push(toMistralVoice(v));
    }
    if (offset + (page.items?.length ?? 0) >= page.total) break;
    offset += page.items?.length ?? 0;
  }
  if (!lang) return voices;
  return voices.filter((v) => v.languages.some((l) => l.startsWith(lang)));
}

export async function getVoice(client: Mistral, voiceId: string): Promise<MistralVoice> {
  const v = await client.audio.voices.get({ voiceId });
  return toMistralVoice(v);
}

export async function createVoice(
  client: Mistral,
  options: CreateVoiceOptions,
): Promise<MistralVoice> {
  const v = await client.audio.voices.create({
    name: options.name,
    sampleAudio: options.sampleAudio,
    sampleFilename: options.sampleFilename,
    languages: options.languages,
    gender: options.gender,
    tags: options.tags,
  });
  return toMistralVoice(v);
}

export async function deleteVoice(client: Mistral, voiceId: string): Promise<void> {
  await client.audio.voices.delete({ voiceId });
}

export async function getVoiceSample(client: Mistral, voiceId: string): Promise<Buffer> {
  const bytes = await client.audio.voices.getSampleAudio({ voiceId });
  return Buffer.from(bytes as any);
}

// --- ElevenLabs TTS ---

async function elevenlabsTts(
  text: string,
  voiceId: string,
  model: string,
): Promise<Buffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY non defini');

  const client = new ElevenLabsClient({ apiKey });
  const audioStream = await client.textToSpeech.convert(voiceId, {
    text,
    modelId: model,
    outputFormat: 'mp3_44100_128',
  });
  return collectStream(audioStream as any);
}
