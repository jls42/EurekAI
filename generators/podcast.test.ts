import { afterEach, describe, it, expect, vi } from 'vitest';
import { generatePodcastScript, PODCAST_RESPONSE_FORMAT } from './podcast.js';
import { logger } from '../helpers/logger.js';
import { PODCAST_NAME_POOL, podcastRetryUser } from '../prompts.js';

const validPodcast = {
  script: [
    { speaker: 'host', text: 'Bonjour!' },
    { speaker: 'guest', text: 'Salut!' },
  ],
  sourceRefs: ['ref1'],
};

function mockClient(responseData: any) {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(responseData) } }],
      }),
    },
  } as any;
}

describe('generatePodcastScript', () => {
  it('returns valid podcast script on first attempt', async () => {
    const client = mockClient(validPodcast);
    const result = await generatePodcastScript(client, 'Some content');
    expect(result.script).toEqual(validPodcast.script);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('returns sourceRefs when present in response', async () => {
    const client = mockClient(validPodcast);
    const result = await generatePodcastScript(client, 'content');
    expect(result.sourceRefs).toEqual(['ref1']);
  });

  it('accepte sourceRefs AVANT script (ordre des clés JSON non garanti) sans retry', async () => {
    // Régression : unwrapJsonArray prend le premier tableau trouvé — sur cet ordre
    // il retournait sourceRefs comme script → validation échouée → retry inutile.
    const inverted = { sourceRefs: ['ref1'], script: validPodcast.script };
    const client = mockClient(inverted);
    const result = await generatePodcastScript(client, 'content');
    expect(result.script).toEqual(validPodcast.script);
    expect(result.sourceRefs).toEqual(['ref1']);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('retries on invalid response', async () => {
    const invalid = { script: [] };
    const client = mockClient(invalid);
    client.chat.complete
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalid) } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validPodcast) } }],
      });

    const result = await generatePodcastScript(client, 'content');
    expect(result.script).toEqual(validPodcast.script);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    expect(client.chat.complete.mock.calls[1][0].messages[3].content).toBe(podcastRetryUser());
  });

  it('throws when both fail', async () => {
    const invalid = { script: [] };
    const client = mockClient(invalid);
    client.chat.complete
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalid) } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalid) } }],
      });

    await expect(generatePodcastScript(client, 'content')).rejects.toThrow(/podcast valide/);
  });

  it('handles response without sourceRefs', async () => {
    const noRefs = {
      script: [
        { speaker: 'host', text: 'Bonjour!' },
        { speaker: 'guest', text: 'Salut!' },
      ],
    };
    const client = mockClient(noRefs);
    const result = await generatePodcastScript(client, 'content');
    expect(result.script).toEqual(noRefs.script);
    expect(result.sourceRefs).toBeUndefined();
  });

  it('returns names from pool, distinct, coherent with system prompt (first attempt)', async () => {
    const client = mockClient(validPodcast);
    const result = await generatePodcastScript(client, 'content');

    expect(PODCAST_NAME_POOL).toContain(result.names.host);
    expect(PODCAST_NAME_POOL).toContain(result.names.guest);
    expect(result.names.host).not.toBe(result.names.guest);

    // Le system prompt envoyé au LLM doit contenir les mêmes prénoms que ceux retournés —
    // sinon l'UI afficherait des prénoms qui ne correspondent pas à ceux que le LLM a vus.
    const systemPrompt = client.chat.complete.mock.calls[0][0].messages[0].content;
    expect(systemPrompt).toContain(result.names.host);
    expect(systemPrompt).toContain(result.names.guest);
  });

  it('returns names coherent with system prompt on retry path', async () => {
    const invalid = { script: [] };
    const client = mockClient(invalid);
    client.chat.complete
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalid) } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validPodcast) } }],
      });

    const result = await generatePodcastScript(client, 'content');

    expect(PODCAST_NAME_POOL).toContain(result.names.host);
    expect(PODCAST_NAME_POOL).toContain(result.names.guest);
    expect(result.names.host).not.toBe(result.names.guest);

    // Le retry réutilise le même messages array (cf. generators/podcast.ts) — on assert
    // sur calls[1] puisque le résultat retourné vient de la branche retry.
    const retrySystemPrompt = client.chat.complete.mock.calls[1][0].messages[0].content;
    expect(retrySystemPrompt).toContain(result.names.host);
    expect(retrySystemPrompt).toContain(result.names.guest);
  });

  it('les deux appels demandent la sortie structurée stricte (6 à 8 répliques host/guest)', async () => {
    const client = mockClient({ script: [] });
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '{"script": [ },' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: JSON.stringify(validPodcast) } }] });

    await generatePodcastScript(client, 'content');

    for (const [request] of client.chat.complete.mock.calls) {
      expect(request.responseFormat).toBe(PODCAST_RESPONSE_FORMAT);
    }
    const schema = PODCAST_RESPONSE_FORMAT.jsonSchema?.schemaDefinition;
    expect(PODCAST_RESPONSE_FORMAT).toMatchObject({
      type: 'json_schema',
      jsonSchema: { strict: true },
    });
    expect(schema?.properties.script).toMatchObject({ minItems: 6, maxItems: 8 });
    expect(schema?.properties.script.items.properties.speaker.enum).toEqual(['host', 'guest']);
  });

  it('reprise refusée : le motif part dans le journal, jamais le texte des répliques', async () => {
    const warn = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const corrupted = { script: [{ ' ': 'host', text: 'Bonjour Zoé' }, null] };
    const client = mockClient(corrupted);

    await expect(generatePodcastScript(client, 'content')).rejects.toThrow(/podcast valide/);
    expect(warn).toHaveBeenCalledWith('podcast', 'retry invalid:', expect.stringContaining('" "'));
    const logged = warn.mock.calls.map((args) => args.join(' ')).join('\n');
    expect(logged).toContain('"speakerOk":false,"textLength":11');
    expect(logged).toContain('"null"'); // réplique null : décrite, pas d'exception
    // Le texte vient de la leçon de l'élève (relevé par la revue de sécurité du commit).
    expect(logged).not.toContain('Bonjour');
    warn.mockRestore();
  });
});

describe('generatePodcastScript — accroche', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('ouvre par un début qu’aucun podcast précédent n’a pris (lu dans le bloc d’exclusions)', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0); // 1er début libre du pool
    const client = mockClient(validPodcast);
    const exclusions =
      'Tu as deja traite les angles ci-dessous. Choisis un angle et une accroche differents :\n- Devine quoi : la lave';

    await generatePodcastScript(
      client,
      'content',
      'mistral-large-latest',
      'fr',
      'enfant',
      exclusions,
    );

    const systemPrompt: string = client.chat.complete.mock.calls[0][0].messages[0].content;
    expect(systemPrompt).toContain('commence par « Un jour »');
    expect(systemPrompt).not.toContain('« Devine »');
  });
});
