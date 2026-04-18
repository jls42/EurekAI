import { describe, it, expect, vi } from 'vitest';
import { generateQuiz, generateQuizVocal, generateQuizReview } from './quiz.js';

const validQuiz = [
  { question: 'Q?', choices: ['A', 'B', 'C', 'D'], correct: 0, explanation: 'Because...' },
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

describe('generateQuiz', () => {
  it('returns valid quiz on first attempt', async () => {
    const client = mockClient(validQuiz);
    const result = await generateQuiz(client, 'Some content');
    expect(result).toEqual(validQuiz);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('retries on invalid response', async () => {
    const client = mockClient([]);
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validQuiz) } }],
      });

    const result = await generateQuiz(client, 'content');
    expect(result).toEqual(validQuiz);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('throws when both fail', async () => {
    const client = mockClient([]);
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] });

    await expect(generateQuiz(client, 'content')).rejects.toThrow(/quiz valide/);
  });
});

describe('generateQuizVocal', () => {
  it('returns valid quiz vocal on first attempt', async () => {
    const client = mockClient(validQuiz);
    const result = await generateQuizVocal(client, 'Some content');
    expect(result).toEqual(validQuiz);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('retries on invalid response', async () => {
    const client = mockClient([]);
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] })
      .mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(validQuiz) } }],
      });

    const result = await generateQuizVocal(client, 'content');
    expect(result).toEqual(validQuiz);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });
});

describe('generateQuizReview', () => {
  const weakQuestions = [
    { question: 'Weak Q1?', choices: ['A', 'B'], correct: 0, explanation: 'Ex' },
    { question: 'Weak Q2?', choices: ['C', 'D'], correct: 1, explanation: 'Ex2' },
  ];

  it('returns valid review quiz', async () => {
    const client = mockClient(validQuiz);
    const result = await generateQuizReview(client, 'content', weakQuestions);
    expect(result).toEqual(validQuiz);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('passes weak questions as concepts', async () => {
    const client = mockClient(validQuiz);
    await generateQuizReview(client, 'content', weakQuestions);

    const call = client.chat.complete.mock.calls[0][0];
    expect(call.messages[1].content).toContain('Weak Q1?');
    expect(call.messages[1].content).toContain('Weak Q2?');
  });
});
