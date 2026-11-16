import { describe, it, expect, vi } from 'vitest';
import { quizRetryUser } from '../prompts.js';
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
    const result = await generateQuiz(client, 'Some content', undefined, 'fr', 'enfant', 1);
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
    expect(client.chat.complete.mock.calls[1][0].messages[3].content).toBe(
      quizRetryUser({ kind: 'quiz', count: 15, lang: 'fr' }),
    );
  });

  it('throws when both fail', async () => {
    const client = mockClient([]);
    client.chat.complete
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] })
      .mockResolvedValueOnce({ choices: [{ message: { content: '[]' } }] });

    await expect(generateQuiz(client, 'content')).rejects.toThrow(/quiz valide/);
  });

  it('filtre un item de queue malformé (salvage) sans retry', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const client = mockClient([...validQuiz, { question: 'Incomplète ?', choices: ['A) x'] }]);

    // 1 question gardée sur 2 demandées : la moitié est atteinte, pas de nouvel essai.
    const result = await generateQuiz(client, 'content', undefined, 'fr', 'enfant', 2);
    expect(result).toEqual(validQuiz);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('1 item'));
    warnSpy.mockRestore();
  });
});

// Quiz de n questions distinctes, valides.
const quizOf = (n: number) =>
  Array.from({ length: n }, (_, i) => ({ ...validQuiz[0], question: `Q${i + 1} ?` }));

const reply = (content: unknown) => ({
  choices: [
    { message: { content: typeof content === 'string' ? content : JSON.stringify(content) } },
  ],
});

describe('generateQuiz — réponse incomplète (moins de la moitié des questions demandées)', () => {
  const warn = () => vi.spyOn(console, 'warn').mockImplementation(() => {});

  it('1 question sur 20 → nouvel essai avec la réponse rejetée, le plus fourni est gardé', async () => {
    const spy = warn();
    const first = { quiz: quizOf(1) };
    const client = mockClient(null);
    client.chat.complete
      .mockResolvedValueOnce(reply(first))
      .mockResolvedValueOnce(reply(quizOf(20)));

    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 20);

    expect(result).toHaveLength(20);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    expect(client.chat.complete.mock.calls[1][0].messages.slice(2)).toEqual([
      { role: 'assistant', content: JSON.stringify(first) },
      { role: 'user', content: quizRetryUser({ kind: 'quiz', count: 20, lang: 'fr' }) },
    ]);
    spy.mockRestore();
  });

  it('10 questions sur 20 (la moitié) → aucun nouvel essai', async () => {
    const client = mockClient(quizOf(10));
    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 20);
    expect(result).toHaveLength(10);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('9 questions sur 20 → nouvel essai', async () => {
    const spy = warn();
    const client = mockClient(null);
    client.chat.complete
      .mockResolvedValueOnce(reply(quizOf(9)))
      .mockResolvedValueOnce(reply(quizOf(20)));
    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 20);
    expect(result).toHaveLength(20);
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  it.each([
    ['moins de questions', reply([])],
    ['JSON invalide', reply('{"quiz":[{"question":"tronq')],
  ])('nouvel essai avec %s → le 1er essai est gardé, sans erreur', async (_label, retry) => {
    const spy = warn();
    const client = mockClient(null);
    client.chat.complete.mockResolvedValueOnce(reply(quizOf(3))).mockResolvedValueOnce(retry);
    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 10);
    expect(result).toEqual(quizOf(3));
    spy.mockRestore();
  });

  it("nouvel essai rejeté par l'API → le 1er essai est gardé, sans erreur", async () => {
    const spy = warn();
    const client = mockClient(null);
    client.chat.complete
      .mockResolvedValueOnce(reply(quizOf(2)))
      .mockRejectedValueOnce(new Error('Status 503'));
    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 10);
    expect(result).toEqual(quizOf(2));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('1er essai garde'), 'Status 503');
    spy.mockRestore();
  });

  it('quiz vocal : même règle (2 questions sur 10 → nouvel essai)', async () => {
    const spy = warn();
    const client = mockClient(null);
    client.chat.complete
      .mockResolvedValueOnce(reply(quizOf(2)))
      .mockResolvedValueOnce(reply(quizOf(10)));
    const result = await generateQuizVocal(client, 'cours', undefined, 'fr', 'enfant', 10);
    expect(result).toHaveLength(10);
    expect(client.chat.complete.mock.calls[1][0].messages[3].content).toBe(
      quizRetryUser({ kind: 'quiz-vocal', count: 10, lang: 'fr' }),
    );
    spy.mockRestore();
  });

  it('révision (sans nombre demandé) : 1 question suffit, aucun nouvel essai', async () => {
    const client = mockClient(quizOf(1));
    const result = await generateQuizReview(client, 'cours', quizOf(2));
    expect(result).toHaveLength(1);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });
});

// Extrait réel (2026-11-16, Large 3, quiz avec historique) : la clé "quiz" répétée pour chaque
// question. JSON.parse seul n'en garde que la dernière (1 question sur les 20 écrites).
const REAL_REPEATED_QUIZ_KEY =
  '{"quiz": [{"question": "Qu\'est-ce qui se passe quand la pression devient trop forte dans la chambre magmatique ?", "choices": ["A) Le volcan s\'endort pour toujours", "B) Le magma sort par la cheminée et le cratère, c\'est une éruption", "C) La montagne devient plus petite", "D) La lave se transforme en glace"], "correct": 1, "explanation": "Quand la pression est trop forte, le magma pousse pour sortir. Il remonte par la cheminée et sort par le cratère : c\'est une éruption !", "sourceRefs": ["Source 1"]}],\n  "quiz": [{"question": "Comment appelle-t-on un volcan qui ne fait plus d\'éruption mais qui peut se réveiller un jour ?", "choices": ["A) Un volcan éteint", "B) Un volcan endormi", "C) Un volcan explosif", "D) Un volcan effusif"], "correct": 1, "explanation": "Un volcan endormi ne fait plus d\'éruption, mais il peut se réveiller plus tard. C\'est comme un géant qui dort !", "sourceRefs": ["Source 1"]}] ,\n  "quiz": [{"question": "Pourquoi dit-on que le Piton de la Fournaise est très actif ?", "choices": ["A) Parce qu\'il fait des éruptions très souvent", "B) Parce qu\'il ne fait plus jamais d\'éruption", "C) Parce qu\'il est toujours en train de dormir", "D) Parce qu\'il projette seulement des cendres"], "correct": 0, "explanation": "Le Piton de la Fournaise est très actif car il fait des éruptions très souvent. C\'est comme un feu d\'artifice de la nature !", "sourceRefs": ["Source 1"]}]}';

describe('generateQuiz — clé "quiz" répétée par le modèle', () => {
  it('instantané réel : les 3 questions sont gardées, sans nouvel essai', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect((JSON.parse(REAL_REPEATED_QUIZ_KEY) as { quiz: unknown[] }).quiz).toHaveLength(1);
    const client = mockClient(null);
    client.chat.complete.mockResolvedValueOnce(reply(REAL_REPEATED_QUIZ_KEY));

    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 3);

    expect(result.map((q) => q.question)).toEqual([
      expect.stringContaining('pression devient trop forte'),
      expect.stringContaining('ne fait plus d'),
      expect.stringContaining('Piton de la Fournaise'),
    ]);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('repetee 3 fois'));
    spy.mockRestore();
  });

  it('« "quiz": » dans un texte (guillemets échappés) ne compte pas comme une clé', async () => {
    const items = quizOf(2).map((q, i) =>
      i === 0 ? { ...q, explanation: 'Le mot "quiz": un jeu de questions.' } : q,
    );
    const client = mockClient({ quiz: items });
    const result = await generateQuiz(client, 'cours', undefined, 'fr', 'enfant', 2);
    expect(result).toEqual(items);
    expect(client.chat.complete).toHaveBeenCalledTimes(1);
  });

  it('quiz vocal : même fusion', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const [a, b] = quizOf(2);
    const client = mockClient(null);
    client.chat.complete.mockResolvedValueOnce(
      reply(`{"quiz": [${JSON.stringify(a)}], "quiz": [${JSON.stringify(b)}]}`),
    );
    const result = await generateQuizVocal(client, 'cours', undefined, 'fr', 'enfant', 2);
    expect(result).toEqual([a, b]);
    spy.mockRestore();
  });
});

describe('generateQuizVocal', () => {
  it('returns valid quiz vocal on first attempt', async () => {
    const client = mockClient(validQuiz);
    const result = await generateQuizVocal(client, 'Some content', undefined, 'fr', 'enfant', 1);
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
    expect(client.chat.complete.mock.calls[1][0].messages[3].content).toBe(
      quizRetryUser({ kind: 'quiz-vocal', count: 15, lang: 'fr' }),
    );
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
