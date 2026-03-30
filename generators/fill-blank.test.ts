import { describe, it, expect, vi } from 'vitest';
import { generateFillBlank } from './fill-blank.js';

const validFillBlank = [
  { sentence: 'Le ___ est bleu', answer: 'ciel', hint: 'Au-dessus de nous', category: 'nature' },
];

function mockClient(responseData: any) {
  return {
    chat: {
      complete: vi.fn().mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(responseData) } }],
      }),
    },
  } as any;
}

describe('generateFillBlank', () => {
  it('returns valid fill-blank items on first attempt', async () => {
    const client = mockClient(validFillBlank);
    const result = await generateFillBlank(client, 'Some content');
    expect(result).toEqual(validFillBlank);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('retries on invalid (missing ___), succeeds', async () => {
    const invalidData = [{ sentence: 'No blank here', answer: 'test', hint: 'H', category: 'c' }];
    const client = mockClient(invalidData);
    client.chat.complete
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalidData) } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validFillBlank) } }],
      });

    const result = await generateFillBlank(client, 'content');
    expect(result).toEqual(validFillBlank);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('throws when both fail', async () => {
    const invalidData = [{ sentence: 'No blank', answer: 'a', hint: 'h', category: 'c' }];
    const client = mockClient(invalidData);
    client.chat.complete
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalidData) } }],
      })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(invalidData) } }],
      });

    await expect(generateFillBlank(client, 'content')).rejects.toThrow(
      /exercices a trous valides/,
    );
  });

  it('throws when response has empty choices', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({ choices: [] }),
      },
    } as any;

    await expect(generateFillBlank(client, 'content')).rejects.toThrow();
  });

  it('throws when response has no choices', async () => {
    const client = {
      chat: {
        complete: vi.fn().mockResolvedValue({}),
      },
    } as any;

    await expect(generateFillBlank(client, 'content')).rejects.toThrow();
  });
});
