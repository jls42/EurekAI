import { describe, expect, it, vi } from 'vitest';
import { MODERATION_CHUNK_SIZE, moderateContent } from './moderation.js';

function createClient(responses: Array<Record<string, boolean>>) {
  const moderate = vi.fn();
  for (const categories of responses) {
    moderate.mockResolvedValueOnce({ results: [{ categories }] });
  }
  return {
    client: {
      classifiers: { moderate },
    } as any,
    moderate,
  };
}

describe('moderateContent', () => {
  it('uses a single moderation call for short text', async () => {
    const { client, moderate } = createClient([
      { violence_and_threats: false, sexual_content: false },
    ]);

    const result = await moderateContent(client, 'bonjour', ['violence_and_threats']);

    expect(moderate).toHaveBeenCalledTimes(1);
    expect(moderate).toHaveBeenCalledWith({
      model: 'mistral-moderation-latest',
      inputs: ['bonjour'],
    });
    expect(result).toEqual({
      status: 'safe',
      categories: { violence_and_threats: false, sexual_content: false },
    });
  });

  it('chunks long text and merges categories across safe chunks', async () => {
    const { client, moderate } = createClient([
      { violence_and_threats: false, sexual_content: true },
      { violence_and_threats: false, self_harm: true },
      { violence_and_threats: false },
    ]);
    const text = 'a'.repeat(MODERATION_CHUNK_SIZE * 2 + 10);

    const result = await moderateContent(client, text, ['violence_and_threats']);

    expect(moderate).toHaveBeenCalledTimes(3);
    expect(result).toEqual({
      status: 'safe',
      categories: {
        violence_and_threats: false,
        sexual_content: true,
        self_harm: true,
      },
    });
  });

  it('stops at the first unsafe chunk', async () => {
    const { client, moderate } = createClient([
      { violence_and_threats: false },
      { violence_and_threats: true, self_harm: false },
      { violence_and_threats: false, harassment: true },
    ]);
    const text = 'b'.repeat(MODERATION_CHUNK_SIZE * 3);

    const result = await moderateContent(client, text, ['violence_and_threats']);

    expect(moderate).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      status: 'unsafe',
      categories: { violence_and_threats: true, self_harm: false },
    });
  });

  it('treats any flagged category as unsafe when no category filter is provided', async () => {
    const { client } = createClient([{ self_harm: true, violence_and_threats: false }]);

    const result = await moderateContent(client, 'texte', undefined);

    expect(result).toEqual({
      status: 'unsafe',
      categories: { self_harm: true, violence_and_threats: false },
    });
  });
});
