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

  describe('labels oraux localisés (anti-régression TTS non-FR)', () => {
    // Régression à prévenir : le TTS (ttsQuestion) prononce les choix via
    // toSpokenChoice(raw, lang) → "choice A : Paris" (EN), "opción A : París" (ES),
    // "खिकल्प A : Paris" (HI), "خيار A : باريس" (AR). Le STT renvoie la forme
    // localisée exacte. Sans mention explicite dans le prompt, le LLM peut ne pas
    // mapper "opción B" / "खिकल्प B" à la lettre B — surtout en AR/HI scripts non-latins.
    it.each([
      ['fr', 'choix'],
      ['en', 'choice'],
      ['es', 'opción'],
      ['de', 'Auswahl'],
      ['it', 'scelta'],
      ['pt', 'opção'],
      ['nl', 'keuze'],
      ['hi', 'विकल्प'],
      ['ar', 'خيار'],
    ])('mentionne le label oral "%s B" pour lang=%s', (lang, spokenLabel) => {
      const result = verifyAnswerSystem('A) Paris\nB) Lyon', 'A) Paris', 'enfant', lang);
      expect(result).toContain(`${spokenLabel} B`);
    });

    it('fallback FR pour les langues hors périmètre UI', () => {
      // Ex: ja, zh, ko, pl, ro, sv (6 langues texte hors Voxtral-TTS).
      const result = verifyAnswerSystem('A) Paris', 'A) Paris', 'enfant', 'ja');
      expect(result).toContain('choix B');
    });
  });
});
