/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import { transcribeAudio } from './stt.js';
import { STT_MODELS } from '../helpers/stt-models.js';

function createClient(text = 'Bonjour le monde') {
  return {
    audio: {
      transcriptions: {
        complete: vi.fn().mockResolvedValue({ text }),
      },
    },
  } as any;
}

describe('transcribeAudio', () => {
  it('sends the requested model and language to client.audio.transcriptions.complete', async () => {
    const client = createClient();
    const buffer = Buffer.from('fake-audio');
    await transcribeAudio(client, buffer, 'audio.mp3', 'fr', 'voxtral-mini-2602');

    expect(client.audio.transcriptions.complete).toHaveBeenCalledWith({
      model: 'voxtral-mini-2602',
      file: { fileName: 'audio.mp3', content: expect.any(Uint8Array) },
      language: 'fr',
    });
  });

  // Plus d'alias codé en dur (`voxtral-mini-latest` jusqu'en v1.7.11) : l'id choisi dans les
  // Réglages part tel quel, préversions comprises.
  it.each(STT_MODELS)('sends the pinned model %s as-is', async (model) => {
    const client = createClient();
    await transcribeAudio(client, Buffer.from('audio'), 'answer.webm', 'fr', model);

    expect(client.audio.transcriptions.complete).toHaveBeenCalledWith(
      expect.objectContaining({ model }),
    );
  });

  it('returns transcribed text and elapsed time', async () => {
    const client = createClient('Transcription test');
    const result = await transcribeAudio(
      client,
      Buffer.from('audio'),
      'test.mp3',
      'fr',
      'voxtral-mini-2602',
    );

    expect(result.text).toBe('Transcription test');
    expect(typeof result.elapsed).toBe('number');
    expect(result.elapsed).toBeGreaterThanOrEqual(0);
  });

  it('passes the language parameter', async () => {
    const client = createClient();
    await transcribeAudio(client, Buffer.from('audio'), 'test.mp3', 'en', 'voxtral-mini-2602');

    expect(client.audio.transcriptions.complete).toHaveBeenCalledWith(
      expect.objectContaining({ language: 'en' }),
    );
  });
});
