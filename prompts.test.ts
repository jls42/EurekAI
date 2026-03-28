import { describe, it, expect } from 'vitest';
import {
  langInstruction,
  ageInstruction,
  summarySystem,
  SUMMARY_SYSTEM,
  summaryUser,
  flashcardsSystem,
  FLASHCARDS_SYSTEM,
  flashcardsUser,
  quizSystem,
  QUIZ_SYSTEM,
  quizUser,
  quizReviewSystem,
  QUIZ_REVIEW_SYSTEM,
  quizReviewUser,
  podcastSystem,
  PODCAST_SYSTEM,
  podcastUser,
  fillBlankSystem,
  fillBlankUser,
  chatSystem,
  imageSystem,
  imageUser,
  websearchInstructions,
  WEBSEARCH_INSTRUCTIONS,
  websearchInput,
} from './prompts.js';
import type { AgeGroup } from './types.js';

// ── ageInstruction ──────────────────────────────────────────────────

describe('ageInstruction', () => {
  it.each([
    ['enfant', '6-10 ans'],
    ['ado', '11-15 ans'],
    ['etudiant', 'academique'],
    ['adulte', 'professionnel'],
  ] as const)('%s contient %s', (group, expected) => {
    expect(ageInstruction(group)).toContain(expected);
  });
});

// ── Age-parametric system functions ─────────────────────────────────

const AGE_KEYWORD: Record<AgeGroup, string> = {
  enfant: '6-10 ans',
  ado: '11-15 ans',
  etudiant: 'academique',
  adulte: 'professionnel',
};

const systemFns: [string, (ag: AgeGroup) => string][] = [
  ['summarySystem', summarySystem],
  ['flashcardsSystem', flashcardsSystem],
  ['quizSystem', quizSystem],
  ['quizReviewSystem', quizReviewSystem],
  ['podcastSystem', podcastSystem],
  ['fillBlankSystem', fillBlankSystem],
];

describe('system functions adapt to ageGroup', () => {
  for (const [name, fn] of systemFns) {
    it.each(Object.entries(AGE_KEYWORD))(`${name}(%s) contient %s`, (group, keyword) => {
      const result = fn(group as AgeGroup);
      expect(result).toContain(keyword);
      // Ne contient PAS les mots-cles des autres groupes
      for (const [otherGroup, otherKw] of Object.entries(AGE_KEYWORD)) {
        if (otherGroup !== group) expect(result).not.toContain(otherKw);
      }
    });
  }
});

// ── Legacy exports (backwards compat) ───────────────────────────────

describe('legacy exports = enfant default', () => {
  it.each([
    ['SUMMARY_SYSTEM', SUMMARY_SYSTEM],
    ['FLASHCARDS_SYSTEM', FLASHCARDS_SYSTEM],
    ['QUIZ_SYSTEM', QUIZ_SYSTEM],
    ['QUIZ_REVIEW_SYSTEM', QUIZ_REVIEW_SYSTEM],
    ['PODCAST_SYSTEM', PODCAST_SYSTEM],
    ['WEBSEARCH_INSTRUCTIONS', WEBSEARCH_INSTRUCTIONS],
  ])('%s contient le keyword enfant', (_name, value) => {
    expect(value).toContain('6-10 ans');
  });
});

// ── Specific content tests ──────────────────────────────────────────

describe('SUMMARY', () => {
  it('contient JSON strict', () => {
    expect(SUMMARY_SYSTEM).toContain('JSON strict');
  });

  it('summaryUser inclut le markdown complet', () => {
    const md = 'x'.repeat(5000);
    expect(summaryUser(md).length).toBeGreaterThan(5000);
  });
});

describe('FLASHCARDS', () => {
  it('contient 5 flashcards', () => {
    expect(FLASHCARDS_SYSTEM).toContain('5 flashcards');
  });

  it('flashcardsUser inclut le markdown complet', () => {
    expect(flashcardsUser('y'.repeat(5000)).length).toBeGreaterThan(5000);
  });
});

describe('QUIZ', () => {
  it('contient pedagogie', () => {
    expect(QUIZ_SYSTEM).toContain('pedagogie');
  });

  it('quizUser contient QCM et inclut le markdown complet', () => {
    const result = quizUser('z'.repeat(5000));
    expect(result).toContain('QCM');
    expect(result.length).toBeGreaterThan(5000);
  });
});

describe('QUIZ_REVIEW', () => {
  it('contient NOUVELLES questions', () => {
    expect(QUIZ_REVIEW_SYSTEM).toContain('NOUVELLES questions');
  });

  it('quizReviewUser inclut concepts et markdown', () => {
    const result = quizReviewUser('La photosynthese', 'a'.repeat(4000));
    expect(result).toContain('La photosynthese');
    expect(result.length).toBeGreaterThan(4000);
  });
});

describe('PODCAST', () => {
  it('contient host, guest, Alex, Zoe', () => {
    for (const kw of ['host', 'guest', 'Alex', 'Zoe']) {
      expect(PODCAST_SYSTEM).toContain(kw);
    }
  });

  it('podcastUser inclut le markdown complet', () => {
    expect(podcastUser('b'.repeat(5000)).length).toBeGreaterThan(5000);
  });
});

describe('FILL_BLANK', () => {
  it('fillBlankSystem contient trous', () => {
    expect(fillBlankSystem('enfant')).toContain('trous');
  });

  it('fillBlankUser inclut le markdown complet', () => {
    const md = 'c'.repeat(5000);
    expect(fillBlankUser(md, 10).length).toBeGreaterThan(5000);
  });

  it('fillBlankUser inclut le count', () => {
    expect(fillBlankUser('content', 20)).toContain('20');
  });
});

describe('WEBSEARCH', () => {
  it('contient pedagogique', () => {
    expect(WEBSEARCH_INSTRUCTIONS).toContain('pedagogique');
  });

  it("websearchInstructions('en', 'adulte') combine lang + ageGroup", () => {
    const result = websearchInstructions('en', 'adulte');
    expect(result).toContain('professionnel');
    expect(result).toContain('English');
  });

  it('websearchInput inclut la query', () => {
    expect(websearchInput('les volcans')).toContain('les volcans');
  });
});

// ── langInstruction ─────────────────────────────────────────────────

describe('langInstruction', () => {
  it('retourne vide pour fr', () => {
    expect(langInstruction('fr')).toBe('');
  });

  it.each([
    ['en', 'English'],
    ['es', 'español'],
  ])('%s contient %s', (lang, expected) => {
    expect(langInstruction(lang)).toContain(expected);
  });

  it('utilise le code brut pour une langue inconnue', () => {
    expect(langInstruction('xx')).toContain('xx');
  });
});

// ── chatSystem ──────────────────────────────────────────────────────

describe('chatSystem', () => {
  it.each(Object.entries(AGE_KEYWORD))("chatSystem('fr', '%s') contient %s", (group, keyword) => {
    expect(chatSystem('fr', group as AgeGroup)).toContain(keyword);
  });

  it("chatSystem('fr') ne contient pas d'instruction de langue", () => {
    expect(chatSystem('fr')).not.toContain('IMPORTANT: Generate ALL content');
  });
});

// ── imageSystem / imageUser ────────────────────────────────────────────

describe('imageSystem', () => {
  it('returns string containing illustration instructions for FR enfant', () => {
    const result = imageSystem('fr', 'enfant');
    expect(result).toContain('illustrateur');
    expect(result).toContain('6-10 ans');
    expect(result).not.toContain('IMPORTANT: Generate ALL content');
  });

  it('returns string containing illustration instructions for EN adult', () => {
    const result = imageSystem('en', 'adulte');
    expect(result).toContain('illustrateur');
    expect(result).toContain('professionnel');
    expect(result).toContain('English');
  });
});

describe('imageUser', () => {
  it('returns truncated markdown (max 1500 chars) with lang context', () => {
    const longMd = 'a'.repeat(3000);
    const result = imageUser('fr', longMd);
    // The content portion is sliced to 1500 chars max
    expect(result.length).toBeLessThan(3000);
    expect(result).toContain('français');
    expect(result).toContain('illustration pedagogique');
    expect(result).toContain('INTERDICTION TOTALE DE TEXTE');
  });

  it('filters out lines starting with "# Source "', () => {
    const md = '# Source 1\nImportant content\n# Source 2\nMore content';
    const result = imageUser('en', md);
    expect(result).not.toContain('# Source 1');
    expect(result).toContain('Important content');
  });
});
