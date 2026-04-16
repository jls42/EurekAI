import { describe, it, expect } from 'vitest';
import {
  langInstruction,
  ageInstruction,
  summarySystem,
  summaryUser,
  flashcardsSystem,
  flashcardsUser,
  quizSystem,
  quizUser,
  quizReviewSystem,
  quizReviewUser,
  podcastSystem,
  podcastUser,
  fillBlankSystem,
  fillBlankUser,
  chatSystem,
  imageSystem,
  imageUser,
  websearchInstructions,
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

// ── Specific content tests ──────────────────────────────────────────

describe('SUMMARY', () => {
  it('contient JSON strict', () => {
    expect(summarySystem('enfant')).toContain('JSON strict');
  });

  it('summaryUser inclut le markdown complet', () => {
    const md = 'x'.repeat(5000);
    expect(summaryUser(md).length).toBeGreaterThan(5000);
  });
});

describe('FLASHCARDS', () => {
  it('contient 5 flashcards', () => {
    expect(flashcardsSystem('enfant')).toContain('5 flashcards');
  });

  it('flashcardsUser inclut le markdown complet', () => {
    expect(flashcardsUser('y'.repeat(5000)).length).toBeGreaterThan(5000);
  });
});

describe('QUIZ', () => {
  it('contient pedagogie', () => {
    expect(quizSystem('enfant')).toContain('pedagogie');
  });

  it('quizUser contient QCM et inclut le markdown complet', () => {
    const result = quizUser('z'.repeat(5000));
    expect(result).toContain('QCM');
    expect(result.length).toBeGreaterThan(5000);
  });
});

describe('QUIZ_REVIEW', () => {
  it('contient NOUVELLES questions', () => {
    expect(quizReviewSystem('enfant')).toContain('NOUVELLES questions');
  });

  it('quizReviewUser inclut concepts et markdown', () => {
    const result = quizReviewUser('La photosynthese', 'a'.repeat(4000));
    expect(result).toContain('La photosynthese');
    expect(result.length).toBeGreaterThan(4000);
  });
});

describe('PODCAST', () => {
  it('contient host, guest, Alex, Zoe', () => {
    const podcast = podcastSystem('enfant');
    for (const kw of ['host', 'guest', 'Alex', 'Zoe']) {
      expect(podcast).toContain(kw);
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
    expect(websearchInstructions('fr', 'enfant')).toContain('pedagogique');
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
  it('retourne une instruction explicite pour fr (explicite > implicite)', () => {
    const result = langInstruction('fr');
    expect(result).toContain('français');
    expect(result).toContain('IMPORTANT');
  });

  it.each([
    ['en', 'English'],
    ['es', 'español'],
    ['de', 'Deutsch'],
    ['it', 'italiano'],
    ['pt', 'português'],
    ['nl', 'Nederlands'],
    ['ja', '日本語'],
    ['zh', '中文'],
    ['ko', '한국어'],
    ['ar', 'العربية'],
    ['hi', 'हिन्दी'],
    ['pl', 'polski'],
    ['ro', 'română'],
    ['sv', 'svenska'],
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

  it("chatSystem('fr') contient une instruction explicite sur le français (explicite > implicite)", () => {
    expect(chatSystem('fr')).toContain('français');
  });
});

// ── imageSystem / imageUser ────────────────────────────────────────────

describe('imageSystem', () => {
  it('returns string containing illustration instructions for FR enfant', () => {
    const result = imageSystem('fr', 'enfant');
    expect(result).toContain('illustrateur');
    expect(result).toContain('6-10 ans');
    expect(result).toContain('français');
  });

  it('returns string containing illustration instructions for EN adult', () => {
    const result = imageSystem('en', 'adulte');
    expect(result).toContain('illustrateur');
    expect(result).toContain('professionnel');
    expect(result).toContain('English');
  });
});

describe('imageUser', () => {
  it('sends full markdown content with lang context', () => {
    const longMd = 'a'.repeat(3000);
    const result = imageUser('fr', longMd);
    expect(result).toContain('a'.repeat(3000));
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
