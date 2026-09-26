/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any -- Codacy lance ESLint sans resolution des types vitest : faux positifs ; couvert par lint:ci local type-aware */
// Contrat commun des retries JSON (cf. .claude/rules/prompts.md §Retry prompts) : un 1er JSON
// invalide (réponse tronquée) déclenche le retry au lieu d'échouer, la réponse rejetée est
// renvoyée telle quelle en tour assistant sauf si elle est vide (l'API Mistral refuse en 400 un
// assistant vide), et l'échec final est une SyntaxError → llm_invalid_json.
import { describe, it, expect, vi } from 'vitest';
import { generateFlashcards } from './flashcards.js';
import { generateFillBlank } from './fill-blank.js';
import { generateDictation } from './dictation.js';
import { generateQuiz, generateQuizVocal, generateQuizReview } from './quiz.js';
import { generatePodcastScript } from './podcast.js';
import { generateSummary } from './summary.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import type { QuizQuestion } from '../types.js';
import {
  flashcardsRetryUser,
  fillBlankRetryUser,
  dictationRetryUser,
  quizRetryUser,
  podcastRetryUser,
  summaryRetryUser,
} from '../prompts.js';

const TRUNCATED = '{"items":[{"word":"a"';

const QUIZ_ITEMS: QuizQuestion[] = [
  { question: 'Q?', choices: ['a', 'b', 'c', 'd'], correct: 0, explanation: 'Parce que.' },
];

type Case = {
  name: string;
  run: (client: any) => Promise<unknown>;
  valid: unknown;
  retryPrompt: string;
};

const CASES: Case[] = [
  {
    name: 'flashcards',
    run: (client) => generateFlashcards(client, 'cours'),
    valid: [{ question: 'Q?', answer: 'R' }],
    retryPrompt: flashcardsRetryUser(5, 'fr'),
  },
  {
    name: 'fill-blank',
    run: (client) => generateFillBlank(client, 'cours'),
    valid: [{ sentence: 'Le ___ est bleu.', answer: 'ciel', hint: 'en haut' }],
    retryPrompt: fillBlankRetryUser(10, 'fr'),
  },
  {
    name: 'dictation',
    run: (client) => generateDictation(client, 'cours'),
    valid: { items: [{ word: 'école', sentence: "Je vais à l'école.", rule: 'Accent aigu.' }] },
    retryPrompt: dictationRetryUser(10, 'fr'),
  },
  {
    name: 'quiz',
    run: (client) => generateQuiz(client, 'cours'),
    valid: QUIZ_ITEMS,
    retryPrompt: quizRetryUser({ kind: 'quiz', count: 15, lang: 'fr' }),
  },
  {
    name: 'quiz-vocal',
    run: (client) => generateQuizVocal(client, 'cours'),
    valid: QUIZ_ITEMS,
    retryPrompt: quizRetryUser({ kind: 'quiz-vocal', count: 15, lang: 'fr' }),
  },
  {
    name: 'quiz-review',
    run: (client) => generateQuizReview(client, 'cours', QUIZ_ITEMS),
    valid: QUIZ_ITEMS,
    retryPrompt: quizRetryUser({ kind: 'quiz-review', lang: 'fr' }),
  },
  {
    name: 'podcast',
    run: (client) => generatePodcastScript(client, 'cours'),
    valid: {
      script: [
        { speaker: 'host', text: 'Bonjour !' },
        { speaker: 'guest', text: 'Salut !' },
      ],
    },
    retryPrompt: podcastRetryUser('fr'),
  },
  {
    name: 'summary',
    run: (client) => generateSummary(client, 'cours'),
    valid: { title: 'Les volcans', summary: 'Un volcan...', key_points: ['Magma'] },
    retryPrompt: summaryRetryUser('fr'),
  },
];

// Faux client : une réponse par appel, dans l'ordre.
const clientReturning = (...contents: string[]) => {
  const complete = vi.fn();
  for (const content of contents) {
    complete.mockResolvedValueOnce({ choices: [{ message: { content } }] });
  }
  return { chat: { complete } } as any;
};

// Messages ajoutés après le prompt initial (system + user) pour le 2e appel.
const retryMessagesOf = (client: any): unknown[] =>
  client.chat.complete.mock.calls[1][0].messages.slice(2);

describe.each(CASES)('retry JSON — $name', ({ run, valid, retryPrompt }) => {
  it('1er JSON tronqué → retry avec la réponse brute en tour assistant, puis succès', async () => {
    const client = clientReturning(TRUNCATED, JSON.stringify(valid));

    await expect(run(client)).resolves.toBeDefined();

    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    expect(retryMessagesOf(client)).toEqual([
      { role: 'assistant', content: TRUNCATED },
      { role: 'user', content: retryPrompt },
    ]);
  });

  it('1re réponse vide → retry SANS tour assistant (refusé en 400 par l API)', async () => {
    const client = clientReturning('', JSON.stringify(valid));

    await expect(run(client)).resolves.toBeDefined();

    expect(client.chat.complete).toHaveBeenCalledTimes(2);
    expect(retryMessagesOf(client)).toEqual([{ role: 'user', content: retryPrompt }]);
  });

  it('deux réponses tronquées → SyntaxError (llm_invalid_json)', async () => {
    const client = clientReturning(TRUNCATED, TRUNCATED);

    const error = await run(client).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(SyntaxError);
    expect(extractErrorCode(error)).toBe('llm_invalid_json');
    expect(client.chat.complete).toHaveBeenCalledTimes(2);
  });

  it('deux JSON valides mais inexploitables → SyntaxError « après 2 tentatives »', async () => {
    const client = clientReturning('{}', '{}');

    const error = await run(client).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(SyntaxError);
    expect((error as Error).message).toMatch(/apres 2 tentatives/);
    expect(extractErrorCode(error)).toBe('llm_invalid_json');
  });
});
