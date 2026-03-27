import { describe, it, expect, vi } from 'vitest';
import { transcribeAudio } from './stt.js';

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
  it('calls client.audio.transcriptions.complete with correct model and language', async () => {
    const client = createClient();
    const buffer = Buffer.from('fake-audio');
    await transcribeAudio(client, buffer, 'audio.mp3');

    expect(client.audio.transcriptions.complete).toHaveBeenCalledWith({
      model: 'voxtral-mini-latest',
      file: { fileName: 'audio.mp3', content: expect.any(Uint8Array) },
      language: 'fr',
    });
  });

  it('returns transcribed text and elapsed time', async () => {
    const client = createClient('Transcription test');
    const result = await transcribeAudio(client, Buffer.from('audio'), 'test.mp3');

    expect(result.text).toBe('Transcription test');
    expect(typeof result.elapsed).toBe('number');
    expect(result.elapsed).toBeGreaterThanOrEqual(0);
  });

  it('passes the language parameter', async () => {
    const client = createClient();
    await transcribeAudio(client, Buffer.from('audio'), 'test.mp3', 'en');

    expect(client.audio.transcriptions.complete).toHaveBeenCalledWith(
      expect.objectContaining({ language: 'en' }),
    );
  });
});
