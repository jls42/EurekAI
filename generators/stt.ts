import { Mistral } from '@mistralai/mistralai';
import { timer } from '../helpers/index.js';
import type { SttModel } from '../helpers/stt-models.js';

// Seul appel de transcription de l'app (entrée vocale ET réponses orales du quiz vocal) : le
// modèle vient de la config (`normalizeSttModel(getConfig().models.stt)`), la langue de la requête.
export async function transcribeAudio(
  client: Mistral,
  audioBuffer: Buffer,
  fileName: string,
  language: string,
  model: SttModel,
): Promise<{ text: string; elapsed: number }> {
  const stop = timer();

  const response = await client.audio.transcriptions.complete({
    model,
    file: { fileName, content: new Uint8Array(audioBuffer) },
    language,
  });

  const elapsed = stop();
  return { text: response.text, elapsed };
}
