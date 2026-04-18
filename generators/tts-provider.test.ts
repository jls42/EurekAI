import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../helpers/audio.js', () => ({
  collectStream: vi.fn().mockResolvedValue(Buffer.from('elevenlabs-audio')),
}));

vi.mock('@elevenlabs/elevenlabs-js', () => {
  const mockConvert = vi.fn().mockResolvedValue(
    (async function* () {
      yield Buffer.from('elevenlabs-audio');
    })(),
  );
  return {
    ElevenLabsClient: vi.fn().mockImplementation(function () {
      return { textToSpeech: { convert: mockConvert } };
    }),
  };
});

import {
  textToSpeech,
  listVoices,
  getVoice,
  createVoice,
  deleteVoice,
  getVoiceSample,
} from './tts-provider.js';

function createMistralClient() {
  return {
    audio: {
      speech: {
        complete: vi.fn().mockResolvedValue({
          audioData: Buffer.from('fake-audio').toString('base64'),
        }),
      },
      voices: {
        list: vi.fn().mockResolvedValue({
          items: [
            { id: 'v1', name: 'Voice1', languages: ['fr'] },
            { id: 'v2', name: 'Voice2', languages: ['en'] },
          ],
          total: 2,
        }),
        get: vi.fn().mockResolvedValue({ id: 'v1', name: 'Voice1', languages: ['fr'] }),
        create: vi.fn().mockResolvedValue({ id: 'v3', name: 'NewVoice', languages: ['en'] }),
        delete: vi.fn().mockResolvedValue(undefined),
        getSampleAudio: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
      },
    },
  } as any;
}

describe('tts-provider', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  describe('textToSpeech', () => {
    it('dispatches to Mistral and returns Buffer from base64', async () => {
      const client = createMistralClient();
      const result = await textToSpeech('Bonjour', 'voice-1', {
        provider: 'mistral',
        model: 'voxtral-mini-tts-2603',
        mistralClient: client,
      });

      expect(client.audio.speech.complete).toHaveBeenCalledWith({
        input: 'Bonjour',
        model: 'voxtral-mini-tts-2603',
        voiceId: 'voice-1',
        responseFormat: 'mp3',
      });
      expect(result).toBeInstanceOf(Buffer);
      expect(result.toString()).toBe('fake-audio');
    });

    it('dispatches to ElevenLabs when provider is elevenlabs', async () => {
      vi.stubEnv('ELEVENLABS_API_KEY', 'test-key');
      const result = await textToSpeech('Hello', 'voice-el', {
        provider: 'elevenlabs',
        model: 'eleven_v3',
      });

      expect(result).toBeInstanceOf(Buffer);
    });

    it('throws when ElevenLabs API key is missing', async () => {
      vi.stubEnv('ELEVENLABS_API_KEY', '');
      delete process.env.ELEVENLABS_API_KEY;

      await expect(
        textToSpeech('Hello', 'voice-el', { provider: 'elevenlabs', model: 'eleven_v3' }),
      ).rejects.toThrow('ELEVENLABS_API_KEY non defini');
    });
  });

  describe('listVoices', () => {
    it('returns all voices from a single page', async () => {
      const client = createMistralClient();
      const voices = await listVoices(client);

      expect(voices).toHaveLength(2);
      expect(voices[0]).toEqual({
        id: 'v1',
        name: 'Voice1',
        languages: ['fr'],
        gender: undefined,
        tags: undefined,
        createdAt: undefined,
      });
      expect(voices[1]).toEqual({
        id: 'v2',
        name: 'Voice2',
        languages: ['en'],
        gender: undefined,
        tags: undefined,
        createdAt: undefined,
      });
    });

    it('filters voices by language', async () => {
      const client = createMistralClient();
      const voices = await listVoices(client, 'fr');

      expect(voices).toHaveLength(1);
      expect(voices[0].id).toBe('v1');
    });

    it('paginates across multiple pages', async () => {
      const client = createMistralClient();
      client.audio.voices.list
        .mockResolvedValueOnce({
          items: [{ id: 'v1', name: 'Voice1', languages: ['fr'] }],
          total: 3,
        })
        .mockResolvedValueOnce({
          items: [{ id: 'v2', name: 'Voice2', languages: ['en'] }],
          total: 3,
        })
        .mockResolvedValueOnce({
          items: [{ id: 'v3', name: 'Voice3', languages: ['de'] }],
          total: 3,
        });

      const voices = await listVoices(client);

      expect(client.audio.voices.list).toHaveBeenCalledTimes(3);
      expect(voices).toHaveLength(3);
    });
  });

  describe('getVoice', () => {
    it('returns a voice by id', async () => {
      const client = createMistralClient();
      const voice = await getVoice(client, 'v1');

      expect(client.audio.voices.get).toHaveBeenCalledWith({ voiceId: 'v1' });
      expect(voice).toEqual({
        id: 'v1',
        name: 'Voice1',
        languages: ['fr'],
        gender: undefined,
        tags: undefined,
        createdAt: undefined,
      });
    });
  });

  describe('createVoice', () => {
    it('creates a voice with options', async () => {
      const client = createMistralClient();
      const voice = await createVoice(client, {
        name: 'NewVoice',
        sampleAudio: 'base64audio',
        languages: ['en'],
      });

      expect(client.audio.voices.create).toHaveBeenCalledWith({
        name: 'NewVoice',
        sampleAudio: 'base64audio',
        sampleFilename: undefined,
        languages: ['en'],
        gender: undefined,
        tags: undefined,
      });
      expect(voice.id).toBe('v3');
      expect(voice.name).toBe('NewVoice');
    });
  });

  describe('deleteVoice', () => {
    it('deletes a voice', async () => {
      const client = createMistralClient();
      await deleteVoice(client, 'v1');

      expect(client.audio.voices.delete).toHaveBeenCalledWith({ voiceId: 'v1' });
    });
  });

  describe('getVoiceSample', () => {
    it('returns an audio buffer', async () => {
      const client = createMistralClient();
      const result = await getVoiceSample(client, 'v1');

      expect(client.audio.voices.getSampleAudio).toHaveBeenCalledWith({ voiceId: 'v1' });
      expect(result).toBeInstanceOf(Buffer);
      expect([...result]).toEqual([1, 2, 3]);
    });
  });
});
