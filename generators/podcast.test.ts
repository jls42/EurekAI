import { describe, it, expect, vi } from 'vitest';
import { generatePodcastScript } from './podcast.js';
import { PODCAST_NAME_POOL } from '../prompts.js';

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
});
