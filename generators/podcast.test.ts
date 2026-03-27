import { describe, it, expect, vi } from 'vitest';
import { generatePodcastScript } from './podcast.js';

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

    await expect(generatePodcastScript(client, 'content')).rejects.toThrow(
      /podcast valide/,
    );
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
});
