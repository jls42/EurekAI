import { Mistral } from '@mistralai/mistralai';
import { timer } from '../helpers/index.js';

export async function transcribeAudio(
  client: Mistral,
  audioBuffer: Buffer,
  fileName: string,
  language = 'fr',
): Promise<{ text: string; elapsed: number }> {
  const stop = timer();

  const response = await client.audio.transcriptions.complete({
    model: 'voxtral-mini-latest',
    file: { fileName, content: new Uint8Array(audioBuffer) },
    language,
  });

  const elapsed = stop();
  return { text: response.text, elapsed };
}
