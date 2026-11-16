import { describe, it, expect } from 'vitest';
import { autoTitle } from './auto-title.js';

const items = (n: number): unknown[] => Array.from({ length: n }, () => ({}));

describe('autoTitle — singulier et pluriel', () => {
  it.each([
    ['quiz', 1, 'fr', 'Quiz (1 question)'],
    ['quiz', 10, 'fr', 'Quiz (10 questions)'],
    ['quiz', 0, 'fr', 'Quiz (0 questions)'],
    ['quiz-vocal', 1, 'fr', 'Quiz Vocal (1 question)'],
    ['quiz-vocal', 5, 'en', 'Vocal Quiz (5 questions)'],
    ['dictation', 1, 'fr', 'Dictée (1 mot)'],
    ['dictation', 7, 'fr', 'Dictée (7 mots)'],
    ['dictation', 1, 'en', 'Dictation (1 word)'],
    ['dictation', 3, 'en', 'Dictation (3 words)'],
  ])('%s, %i élément(s), %s → %s', (type, n, lang, expected) => {
    expect(autoTitle(type, items(n), lang)).toBe(expected);
  });

  it('données illisibles : « ? » au pluriel, comme avant', () => {
    expect(autoTitle('quiz', null)).toBe('Quiz (? questions)');
  });
});
