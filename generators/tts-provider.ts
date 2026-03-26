import type { Mistral } from '@mistralai/mistralai';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { collectStream } from '../helpers/audio.js';
import type { TtsProvider } from '../types.js';

export interface TtsOptions {
  provider: TtsProvider;
  model: string;
  mistralClient?: Mistral;
}

export async function textToSpeech(
  text: string,
  voiceId: string,
  options: TtsOptions,
): Promise<Buffer> {
  if (options.provider === 'mistral') {
    return mistralTts(text, voiceId, options.model, options.mistralClient!);
  }
  return elevenlabsTts(text, voiceId, options.model);
}

async function mistralTts(
  text: string,
  voiceId: string,
  model: string,
  client: Mistral,
): Promise<Buffer> {
  const response = await client.audio.speech.complete({
    input: text,
    model,
    voiceId,
    responseFormat: 'mp3',
  });
  return Buffer.from(response.audioData, 'base64');
}

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
