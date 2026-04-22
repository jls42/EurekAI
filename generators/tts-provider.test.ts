import { describe, it, expect, vi } from 'vitest';
import { textToSpeech, listVoices, type TtsOptions } from './tts-provider.js';
import { asVoiceId } from '../helpers/voice-types.js';
import type { Mistral } from '@mistralai/mistralai';

function makeMistralClient(overrides: Partial<Mistral> = {}): Mistral {
  return {
    audio: {
      speech: { complete: vi.fn() },
      voices: { list: vi.fn() },
    },
    ...overrides,
  } as unknown as Mistral;
}

describe('textToSpeech', () => {
  const ttsOptions: TtsOptions = {
    model: 'voxtral-mini-tts-latest',
    mistralClient: {} as Mistral,
  };

  it('happy path: décode audioData base64 en Buffer', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.speech.complete).mockResolvedValue({
      audioData: Buffer.from('audio-bytes').toString('base64'),
    } as Awaited<ReturnType<typeof client.audio.speech.complete>>);
    const result = await textToSpeech('bonjour', asVoiceId('voice-1'), { ...ttsOptions, mistralClient: client });
    expect(result.toString()).toBe('audio-bytes');
    expect(client.audio.speech.complete).toHaveBeenCalledWith({
      input: 'bonjour',
      model: 'voxtral-mini-tts-latest',
      voiceId: asVoiceId('voice-1'),
      responseFormat: 'mp3',
    });
  });

  it('throw descriptif si audioData absent (I2 guard — évite Buffer.from(undefined) opaque)', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.speech.complete).mockResolvedValue(
      {} as Awaited<ReturnType<typeof client.audio.speech.complete>>,
    );
    await expect(
      textToSpeech('bonjour', asVoiceId('voice-xyz'), { ...ttsOptions, mistralClient: client, model: 'voxtral-v1' }),
    ).rejects.toThrow('mistral_tts_empty_response (voiceId=voice-xyz, model=voxtral-v1)');
  });

  it("attache .stage='tts' sur l'Error (contrat producteur pour matcher stable, review #7)", async () => {
    // Le classifier helpers/error-matchers.ts:41 consomme ctx.stage === 'tts' pour mapper
    // vers 'tts_upstream_error'. Ce test verrouille le contrat producteur : l'Error doit
    // porter .stage avant d'être remontée via les routes podcast/quiz-vocal.
    const client = makeMistralClient();
    vi.mocked(client.audio.speech.complete).mockResolvedValue(
      {} as Awaited<ReturnType<typeof client.audio.speech.complete>>,
    );
    let caught: (Error & { stage?: unknown }) | undefined;
    try {
      await textToSpeech('x', asVoiceId('v'), { ...ttsOptions, mistralClient: client });
    } catch (e) {
      caught = e as Error & { stage?: unknown };
    }
    expect(caught).toBeInstanceOf(Error);
    expect(caught?.stage).toBe('tts');
  });
});

describe('listVoices', () => {
  function voice(id: string, languages: string[]) {
    return { id, name: id, languages };
  }

  it('single-page: sort de la boucle quand items < limit (total atteint)', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.list).mockResolvedValue({
      items: [voice('v1', ['fr_fr']), voice('v2', ['en_us'])],
      total: 2,
    } as Awaited<ReturnType<typeof client.audio.voices.list>>);
    const result = await listVoices(client);
    expect(result).toHaveLength(2);
    expect(client.audio.voices.list).toHaveBeenCalledTimes(1);
    expect(client.audio.voices.list).toHaveBeenCalledWith({ limit: 100, offset: 0 });
  });

  it('multi-page: paginate jusqu\'à total atteint (offset incrémente)', async () => {
    const client = makeMistralClient();
    const page1 = Array.from({ length: 100 }, (_, i) => voice(`v${i}`, ['fr_fr']));
    const page2 = Array.from({ length: 50 }, (_, i) => voice(`v${100 + i}`, ['en_us']));
    vi.mocked(client.audio.voices.list)
      .mockResolvedValueOnce({ items: page1, total: 150 } as never)
      .mockResolvedValueOnce({ items: page2, total: 150 } as never);
    const result = await listVoices(client);
    expect(result).toHaveLength(150);
    expect(client.audio.voices.list).toHaveBeenCalledTimes(2);
    expect(client.audio.voices.list).toHaveBeenNthCalledWith(1, { limit: 100, offset: 0 });
    expect(client.audio.voices.list).toHaveBeenNthCalledWith(2, { limit: 100, offset: 100 });
  });

  it('filter par lang (startsWith): en match en_us et en_gb, pas fr_fr', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.list).mockResolvedValue({
      items: [
        voice('en-us-1', ['en_us']),
        voice('en-gb-1', ['en_gb']),
        voice('fr-1', ['fr_fr']),
        voice('multi-1', ['en_us', 'fr_fr']),
      ],
      total: 4,
    } as never);
    const result = await listVoices(client, 'en');
    expect(result.map((v) => v.id)).toEqual(['en-us-1', 'en-gb-1', 'multi-1']);
  });
});
