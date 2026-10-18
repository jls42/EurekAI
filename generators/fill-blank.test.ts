import { describe, it, expect, vi } from 'vitest';
import { generateFillBlank } from './fill-blank.js';
import { fillBlankRetryUser } from '../prompts.js';
import { logger } from '../helpers/logger.js';

const validFillBlank = [
  { sentence: 'Le ___ est bleu', answer: 'ciel', hint: 'Au-dessus de nous', category: 'nature' },
];
// Ce que rend le générateur : accepted toujours présent (vide ici).
const returnedFillBlank = validFillBlank.map((item) => ({ ...item, accepted: [] }));

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
    expect(result).toEqual(returnedFillBlank);
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
    expect(result).toEqual(returnedFillBlank);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    expect(client.chat.complete.mock.calls[1][0].messages[3].content).toBe(
      fillBlankRetryUser(10, 'fr'),
    );
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

    await expect(generateFillBlank(client, 'content')).rejects.toThrow(/exercices a trous valides/);
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

// Exercices réels de la mesure du 2026-10-09 (output/model-corpus/, hors git).
describe('generateFillBlank — une réponse, ses écritures, jamais donnée par la phrase', () => {
  const century = {
    sentence:
      'Pour trouver le siecle, on ajoute 1 au nombre de centaines. 1492 est donc au ___ siecle.',
    answer: 'XVe (quinzième)',
    hint: 'Ecris-le avec un petit e a la fin',
    category: 'date',
  };
  // « 14 + 1 = 15 » contient le « 1 » attendu.
  const leaky = {
    sentence: 'On ajoute ___ au nombre de centaines : 1492 donne 14 + 1 = 15.',
    answer: '1',
    hint: 'Un petit nombre',
    category: 'nombre',
  };

  it('garde une seule écriture dans answer, les autres dans accepted (dédoublonnées)', async () => {
    const client = mockClient([{ ...century, accepted: ['15e', 'quinzième', 42, '  '] }]);
    const [item] = await generateFillBlank(client, 'content');
    expect(item.answer).toBe('XVe');
    expect(item.accepted).toEqual(['quinzième', '15e']);
  });

  it('écarte un exercice dont la phrase contient la réponse, garde les autres', async () => {
    const warn = vi.spyOn(logger, 'warn').mockImplementation(() => undefined);
    const client = mockClient([century, leaky]);
    const result = await generateFillBlank(client, 'content');
    expect(result.map((item) => item.answer)).toEqual(['XVe']);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      'fill-blank',
      expect.stringContaining('1 exercise(s) dropped'),
    );
  });

  it('relance quand tous les exercices donnent leur réponse, puis échoue en llm_invalid_json', async () => {
    vi.spyOn(logger, 'warn').mockImplementation(() => undefined);
    const client = mockClient([leaky]);
    await expect(generateFillBlank(client, 'content')).rejects.toThrow(SyntaxError);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });
});
