import { describe, expect, it } from 'vitest';
import { verifyAnswerSystem } from './prompts.js';
import type { AgeGroup } from './types.js';

function prompt(ageGroup: AgeGroup = 'enfant', question = 'A) x', answer = question): string {
  return verifyAnswerSystem(question, answer, ageGroup, 'fr');
}

describe('verifyAnswerSystem', () => {
  it("encode l'équivalence lettres/numéros 1=A, 2=B, 3=C, 4=D", () => {
    expect(prompt('enfant', 'A) Paris\nB) Lyon', 'A) Paris')).toContain('1=A, 2=B, 3=C, 4=D');
  });

  it('impose une règle binaire sans quasi-réussite', () => {
    const result = prompt('enfant', 'A) Paris', 'A) Paris');
    expect(result).toContain('binaire');
    expect(result).toContain('quasi-reussite');
  });

  it('tolère les variantes orthographiques', () => {
    expect(prompt()).toContain('Wisigoths/Visigoths');
  });

  it.each(['enfant', 'ado', 'etudiant', 'adulte'] as const)(
    'ageGroup=%s ne contient ni "presque" ni "pas tout à fait"',
    (ageGroup) => {
      const result = prompt(ageGroup).toLowerCase();
      expect(result).not.toMatch(/\bpresque\b/);
      expect(result).not.toMatch(/pas tout à fait/);
    },
  );

  it('impose une structure de feedback avec opener binaire', () => {
    const result = prompt('enfant', 'A) Paris', 'A) Paris');
    expect(result).toContain('STRUCTURE OBLIGATOIRE');
    expect(result).toMatch(/negation nette/);
    expect(result).toContain('"Non,"');
    expect(result).toMatch(/"feedback":\s*"Non,/);
  });

  it('utilise un few-shot hors-domaine des quiz classiques', () => {
    const result = prompt('enfant', 'A) Mercure', 'A) Mercure');
    expect(result).toContain('Mercure');
    expect(result).not.toMatch(/la capitale de la France/);
  });
});
