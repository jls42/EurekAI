/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import { textToSpeech, listVoices, ttsOptionsFor, type TtsOptions } from './tts-provider.js';
import { asVoiceId } from '../helpers/voice-types.js';
import { voiceSupportsTtsModel } from '../helpers/tts-models.js';
import { logger } from '../helpers/logger.js';
import type { Mistral } from '@mistralai/mistralai';

function makeMistralClient(overrides: Partial<Mistral> = {}): Mistral {
  return {
    audio: {
      speech: { complete: vi.fn() },
      voices: { search: vi.fn() },
    },
    ...overrides,
  } as unknown as Mistral;
}

describe('textToSpeech', () => {
  const ttsOptions: TtsOptions = {
    model: 'voxtral-mini-tts-2603',
    mistralClient: {} as Mistral,
  };

  it('happy path: décode audioData base64 en Buffer', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.speech.complete).mockResolvedValue({
      audioData: Buffer.from('audio-bytes').toString('base64'),
    } as Awaited<ReturnType<typeof client.audio.speech.complete>>);
    const result = await textToSpeech('bonjour', asVoiceId('voice-1'), {
      ...ttsOptions,
      mistralClient: client,
    });
    expect(result.toString()).toBe('audio-bytes');
    expect(client.audio.speech.complete).toHaveBeenCalledWith({
      input: 'bonjour',
      model: 'voxtral-mini-tts-2603',
      voiceId: asVoiceId('voice-1'),
      responseFormat: 'mp3',
    });
  });

  // Texte réellement lu (helpers/tts-text.ts) : Voxtral TTS prononce les marqueurs de sources et
  // TTS 3 avale un mot entre crochets (balise d'instruction) : aucun crochet ne part au TTS.
  it('envoie le texte lisible : marqueur [Source N] retiré, crochets ôtés, mot gardé', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.speech.complete).mockResolvedValue({
      audioData: Buffer.from('audio-bytes').toString('base64'),
    } as Awaited<ReturnType<typeof client.audio.speech.complete>>);
    await textToSpeech('Les volcans [Source 1] crachent [chat].', asVoiceId('voice-1'), {
      ...ttsOptions,
      mistralClient: client,
    });
    expect(client.audio.speech.complete).toHaveBeenCalledWith({
      input: 'Les volcans crachent chat.',
      model: 'voxtral-mini-tts-2603',
      voiceId: asVoiceId('voice-1'),
      responseFormat: 'mp3',
    });
  });

  it('throw descriptif si audioData absent (évite Buffer.from(undefined) opaque)', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.speech.complete).mockResolvedValue(
      {} as Awaited<ReturnType<typeof client.audio.speech.complete>>,
    );
    await expect(
      textToSpeech('bonjour', asVoiceId('voice-xyz'), {
        ...ttsOptions,
        mistralClient: client,
        model: 'voxtral-mini-tts-3-0',
      }),
    ).rejects.toThrow('mistral_tts_empty_response (voiceId=voice-xyz, model=voxtral-mini-tts-3-0)');
  });

  it("attache .stage='tts' sur l'Error (contrat producteur pour matcher stable)", async () => {
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

// Options de TOUS les appels TTS des routes : modèle de la config normalisé au point d'appel (un
// alias ou une valeur legacy restée dans config.json ne part jamais vers l'API).
describe('ttsOptionsFor', () => {
  const client = makeMistralClient();

  it.each(['voxtral-mini-tts-2603', 'voxtral-mini-tts-3-0'])('garde le modèle épinglé %s', (m) => {
    expect(ttsOptionsFor({ ttsModel: m }, client)).toEqual({ model: m, mistralClient: client });
  });

  it.each([
    ['alias mouvant voxtral-mini-tts-latest', 'voxtral-mini-tts-latest'],
    ['id ElevenLabs legacy', 'eleven_v3'],
    ['valeur inconnue', 'voxtral-custom'],
    ['champ absent', undefined],
  ])('%s → défaut Voxtral TTS (2603)', (_label, ttsModel) => {
    const config = { ttsModel } as { ttsModel: string };
    expect(ttsOptionsFor(config, client)).toEqual({
      model: 'voxtral-mini-tts-2603',
      mistralClient: client,
    });
  });
});

describe('listVoices', () => {
  // Voix minimale ; `kind` ivc par défaut (une voix sans `kind` est journalisée, cf. dernier test).
  function voice(id: string, languages: string[], kind = 'ivc') {
    return { id, name: id, languages, kind };
  }
  // Réponse de `voices.search` (SDK 3) : une page de GET /v2/audio/voices.
  function page(data: unknown[], nextPageToken: string | null = null) {
    return { result: { data, nextPageToken } } as never;
  }
  const FIRST_CALL = { type: 'all', pageSize: 100, pageToken: undefined };

  it('une page : un seul appel (type all, pageSize 100), sans curseur', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.search).mockResolvedValue(
      page([voice('v1', ['fr_fr']), voice('v2', ['en_us'])]),
    );
    const result = await listVoices(client);
    expect(result).toHaveLength(2);
    expect(client.audio.voices.search).toHaveBeenCalledTimes(1);
    expect(client.audio.voices.search).toHaveBeenCalledWith(FIRST_CALL);
  });

  it("plusieurs pages : suit next_page_token jusqu'à son absence", async () => {
    const client = makeMistralClient();
    const page1 = Array.from({ length: 100 }, (_, i) => voice(`v${i}`, ['fr_fr']));
    const page2 = Array.from({ length: 50 }, (_, i) => voice(`v${100 + i}`, ['en_us']));
    vi.mocked(client.audio.voices.search)
      .mockResolvedValueOnce(page(page1, 'curseur-2'))
      .mockResolvedValueOnce(page(page2));
    const result = await listVoices(client);
    expect(result).toHaveLength(150);
    expect(client.audio.voices.search).toHaveBeenCalledTimes(2);
    expect(client.audio.voices.search).toHaveBeenNthCalledWith(1, FIRST_CALL);
    expect(client.audio.voices.search).toHaveBeenNthCalledWith(2, {
      ...FIRST_CALL,
      pageToken: 'curseur-2',
    });
  });

  // L'itérateur du SDK s'arrêterait ici (page plus courte que pageSize) : la boucle suit le curseur.
  it("page plus courte que pageSize mais suivie d'un curseur : la boucle continue", async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.search)
      .mockResolvedValueOnce(page([voice('a', ['fr_fr']), voice('b', ['fr_fr'])], 'curseur-2'))
      .mockResolvedValueOnce(page([voice('c', ['en_us'])]));
    const result = await listVoices(client);
    expect(result.map((v) => v.id)).toEqual(['a', 'b', 'c']);
    expect(client.audio.voices.search).toHaveBeenCalledTimes(2);
  });

  it('curseur vide : traité comme la dernière page', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.search).mockResolvedValue(page([voice('a', ['fr_fr'])], ''));
    expect(await listVoices(client)).toHaveLength(1);
    expect(client.audio.voices.search).toHaveBeenCalledTimes(1);
  });

  it('garde-fou : au plus 50 pages si le curseur ne finit jamais', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.search).mockResolvedValue(
      page([voice('x', ['fr_fr'])], 'toujours'),
    );
    expect(await listVoices(client)).toHaveLength(50);
    expect(client.audio.voices.search).toHaveBeenCalledTimes(50);
  });

  it('filter par lang (startsWith): en match en_us et en_gb, pas fr_fr', async () => {
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.search).mockResolvedValue(
      page([
        voice('en-us-1', ['en_us']),
        voice('en-gb-1', ['en_gb']),
        voice('fr-1', ['fr_fr']),
        voice('multi-1', ['en_us', 'fr_fr']),
      ]),
    );
    const result = await listVoices(client, 'en');
    expect(result.map((v) => v.id)).toEqual(['en-us-1', 'en-gb-1', 'multi-1']);
  });

  // `kind` (ivc/pvc, exposé depuis le SDK 3) porte la compatibilité d'une voix avec les modèles
  // speech v1 ; `slug` et `userId` (camelCase côté SDK, `user_id` dans l'API) servent de repli.
  it('lit kind, slug et caractère personnel (userId non nul) de chaque voix', async () => {
    const warn = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const client = makeMistralClient();
    vi.mocked(client.audio.voices.search).mockResolvedValue(
      page([
        { ...voice('marie', ['fr_fr']), slug: 'fr_marie_neutral', userId: null },
        { ...voice('pvc-es', ['es_es'], 'pvc'), slug: 'voice_3141', userId: null },
        { ...voice('ma-voix', ['fr_fr']), slug: null, userId: 'user-42' },
        { id: 'sans-champs', name: 'sans-champs', languages: ['en_us'] },
      ]),
    );
    const result = await listVoices(client);
    expect(result.map(({ id, kind, slug, custom }) => ({ id, kind, slug, custom }))).toEqual([
      { id: 'marie', kind: 'ivc', slug: 'fr_marie_neutral', custom: false },
      { id: 'pvc-es', kind: 'pvc', slug: 'voice_3141', custom: false },
      { id: 'ma-voix', kind: 'ivc', slug: undefined, custom: true },
      { id: 'sans-champs', kind: undefined, slug: undefined, custom: false },
    ]);
    // Bout à bout : preset Voxtral 2 et voix personnelle acceptés par 2603, preset pvc et voix de
    // forme inconnue écartés.
    const accepted = result.filter((v) => voiceSupportsTtsModel(v, 'voxtral-mini-tts-2603'));
    expect(accepted.map((v) => v.id)).toEqual(['marie', 'ma-voix']);
    warn.mockRestore();
  });

  it('signale une seule fois les voix arrivées sans kind (repli slug/userId)', async () => {
    const warn = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const client = makeMistralClient();
    const withoutKind = (id: string) => ({ id, name: id, languages: ['fr_fr'] });
    vi.mocked(client.audio.voices.search).mockResolvedValue(
      page([voice('a', ['fr_fr']), withoutKind('b'), withoutKind('c')]),
    );
    await listVoices(client);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith('tts', '2 voice(s) without kind: slug/userId fallback');
    warn.mockClear();
    vi.mocked(client.audio.voices.search).mockResolvedValue(page([voice('a', ['fr_fr'])]));
    await listVoices(client);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
