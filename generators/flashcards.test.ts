import { describe, it, expect, vi } from 'vitest';
import { generateFlashcards } from './flashcards.js';

const validFlashcards = [
  { question: 'Q1?', answer: 'A1' },
  { question: 'Q2?', answer: 'A2' },
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

describe('generateFlashcards', () => {
  it('returns valid flashcards on first attempt', async () => {
    const client = mockClient(validFlashcards);
    const result = await generateFlashcards(client, 'Some content');
    expect(result).toEqual(validFlashcards);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('retries on invalid response, succeeds on second', async () => {
    const client = mockClient([]);
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validFlashcards) } }],
      });

    const result = await generateFlashcards(client, 'content');
    expect(result).toEqual(validFlashcards);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('throws when both attempts fail (empty array)', async () => {
    const client = mockClient([]);
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] });

    await expect(generateFlashcards(client, 'content')).rejects.toThrow(/flashcards valides/);
  });

  it('handles wrapped {"flashcards": [...]} response', async () => {
    const wrapped = { flashcards: validFlashcards };
    const client = mockClient(wrapped);
    const result = await generateFlashcards(client, 'content');
    expect(result).toEqual(validFlashcards);
  });

  it('passes count parameter', async () => {
    const client = mockClient(validFlashcards);
    await generateFlashcards(client, 'content', 'mistral-large-latest', 'fr', 'enfant', 10);

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.messages[1].content).toContain('10');
  });
});
