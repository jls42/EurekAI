import { describe, it, expect, vi } from 'vitest';
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
  pickPodcastNames,
  PODCAST_NAME_POOL,
  fillBlankSystem,
  fillBlankUser,
  chatSystem,
  imageSystem,
  imageUser,
  websearchInstructions,
  websearchInput,
  defaultReasonFor,
  routerSystem,
  feedbackAgeInstruction,
  vocalRewriteRules,
  quizVocalSystem,
} from './prompts.js';
import { logger } from './helpers/logger.js';
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
  it('contient host, guest et les noms par defaut (Alex, Charlie)', () => {
    const podcast = podcastSystem('enfant');
    for (const kw of ['host', 'guest', 'Alex', 'Charlie']) {
      expect(podcast).toContain(kw);
    }
  });

  it('accepte des noms injectes et les insere dans le template', () => {
    const podcast = podcastSystem('enfant', { host: 'Camille', guest: 'Sasha' });
    expect(podcast).toContain('Camille');
    expect(podcast).toContain('Sasha');
    // Les defauts ne doivent pas apparaitre quand on override
    expect(podcast).not.toContain('"host" = Alex');
    expect(podcast).not.toContain('"guest" = Charlie');
  });

  it('podcastUser inclut le markdown complet', () => {
    expect(podcastUser('b'.repeat(5000)).length).toBeGreaterThan(5000);
  });

  it('contient une consigne bornee invitant a interpeller le guest par son prenom', () => {
    const podcast = podcastSystem('enfant', { host: 'Camille', guest: 'Sasha' });
    // Substring stable : couvre "interpelle <guest> sur un point precis" pour
    // garantir que la consigne est ancree sur les noms injectes (pas sur des
    // tokens generiques) sans rigidifier la formulation entiere.
    expect(podcast).toContain('interpelle Sasha sur un point precis');
    expect(podcast).toContain('Ne commence pas systematiquement une replique par un prenom');
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

// ── summarySystem / summaryUser title policy (anti-leak lexical) ────

describe('summarySystem title policy', () => {
  it('énonce une règle positive sur le champ title', () => {
    const result = summarySystem('enfant');
    expect(result).toContain('sujet du cours uniquement');
    expect(result).toContain('"Les volcans"');
    expect(result).toContain('"La photosynthese"');
  });

  it('ne contient plus les phrases exactes problématiques (anti-régression)', () => {
    const lower = summarySystem('enfant').toLowerCase();
    // Bug historique (premier leak COMPLÈTE dans title)
    expect(lower).not.toContain('cree une seule fiche de revision complete');
    expect(lower).not.toContain('fiche de revision exhaustive');
    // Occurrences dans le corps du prompt (deuxième passe d'audit)
    expect(lower).not.toContain('la fiche finale');
    expect(lower).not.toContain('avec cette fiche');
    expect(lower).not.toContain('resume complet du cours');
    // Pas de réinjection de la phrase legacy sur le préfixe UI
    expect(lower).not.toContain('prefixe par "fiche — "');
  });
});

// ── summarySystem source refs policy (format canonique) ───────────

describe('summarySystem source refs policy', () => {
  it('contient un exemple de multi-citation canonique [Source N][Source M]', () => {
    const result = summarySystem('enfant');
    expect(result).toMatch(/\[Source \d+\]\[Source \d+\]/);
  });

  it('ne mentionne jamais la forme dégradée ni aucun pattern similaire (anti-blacklist)', () => {
    const result = summarySystem('enfant');
    // Pas de chaîne exacte [Source 13, 20]
    expect(result).not.toContain('[Source 13, 20]');
    // Pas de variante avec virgule à l'intérieur d'un seul bracket
    expect(result).not.toMatch(/\[Source\s*\d+\s*,\s*\d+\]/);
  });

  it("ne demande plus d'inliner les sources dans summary/key_points (instruction retirée)", () => {
    const result = summarySystem('enfant');
    expect(result).not.toContain('Cite tes sources [Source 1], [Source 2]');
  });
});

// ── sourceRefsInstruction emphases policy (testé via flashcardsSystem) ─

describe('sourceRefsInstruction emphases', () => {
  it('contient uniquement les emphases load-bearing (FABRIQUE JAMAIS, LISTE-LES TOUTES)', () => {
    const result = flashcardsSystem('enfant');
    expect(result).toContain('FABRIQUE JAMAIS');
    expect(result).toContain('LISTE-LES TOUTES');
  });

  it('ne contient pas les emphases décoratives retirées', () => {
    const result = flashcardsSystem('enfant');
    expect(result).not.toContain('REGLE STRICTE SUR LES SOURCES');
    expect(result).not.toContain("AVANT d'ecrire un sourceRef");
    expect(result).not.toContain('contient VRAIMENT');
    expect(result).not.toContain('Format EXACT :');
  });
});

// ── chatSystem approche pédagogique (pas de socratique prescriptif) ──

describe('chatSystem approche pédagogique', () => {
  it('ne prescrit plus une relance socratique en emphase MAJUSCULE', () => {
    const result = chatSystem('fr', 'enfant');
    expect(result).not.toContain('SOCRATIQUE');
    expect(result).not.toContain("Privilegie l'approche SOCRATIQUE");
  });

  it('affirme que la réponse directe est le comportement par défaut', () => {
    const result = chatSystem('fr', 'enfant');
    expect(result).toContain('reponds clairement et directement');
  });
});

// ── podcastSystem personnages sans tics imposés ─────────────────

describe('podcastSystem personnages', () => {
  it("ne force pas d'interjection répétitive imposée au guest", () => {
    const result = podcastSystem('enfant');
    // Les 3 tics sur main-HEAD ne doivent plus apparaître en liste imposée
    expect(result).not.toContain('"Ah oui !"');
    expect(result).not.toContain('"Je savais pas !"');
    expect(result).not.toContain('"Ca alors !"');
  });

  it('conserve la différenciation host/guest (defauts Alex/Charlie)', () => {
    const result = podcastSystem('enfant');
    expect(result).toContain('Alex');
    expect(result).toContain('Charlie');
  });

  it("n'injecte plus d'adjectif genré (curieuse) dans la description guest", () => {
    const result = podcastSystem('enfant');
    expect(result).not.toContain('curieuse');
  });
});

describe('pickPodcastNames', () => {
  it('retourne deux noms distincts issus du pool (valeurs par defaut)', () => {
    const { host, guest } = pickPodcastNames();
    expect(PODCAST_NAME_POOL).toContain(host);
    expect(PODCAST_NAME_POOL).toContain(guest);
    expect(host).not.toBe(guest);
  });

  it('RNG=0 retourne les deux premiers noms du pool (i=0, j=1)', () => {
    const { host, guest } = pickPodcastNames(() => 0);
    expect(host).toBe(PODCAST_NAME_POOL[0]);
    expect(guest).toBe(PODCAST_NAME_POOL[1]);
  });

  it('RNG≈1 retourne le dernier puis l’avant-dernier (i=N-1, j décalé)', () => {
    // 0.999... -> floor(0.999 * 10) = 9, floor(0.999 * 9) = 8, j<i donc pas de +1
    const { host, guest } = pickPodcastNames(() => 0.9999);
    expect(host).toBe(PODCAST_NAME_POOL[PODCAST_NAME_POOL.length - 1]);
    expect(guest).toBe(PODCAST_NAME_POOL[PODCAST_NAME_POOL.length - 2]);
    expect(host).not.toBe(guest);
  });

  it('garantit host != guest même quand le RNG forcerait une collision', () => {
    // RNG qui retourne toujours 0 -> i=0, j=0 puis j+=1 -> j=1
    const { host, guest } = pickPodcastNames(() => 0);
    expect(host).not.toBe(guest);
  });

  it('le pool contient au moins 10 noms pour varier cross-podcasts', () => {
    expect(PODCAST_NAME_POOL.length).toBeGreaterThanOrEqual(10);
    // Tous uniques
    expect(new Set(PODCAST_NAME_POOL).size).toBe(PODCAST_NAME_POOL.length);
  });
});

describe('summaryUser title policy', () => {
  it('branche hasConsigne=false ne fait plus fuiter de tokens méta', () => {
    const lower = summaryUser('# Source 1\n\nContenu', false, 'fr').toLowerCase();
    expect(lower).not.toContain('fiche de revision exhaustive');
    expect(lower).not.toContain('synthese complete');
    expect(lower).not.toContain('cette seule fiche');
    expect(lower).toContain('title');
  });

  it('branche hasConsigne=true préserve le comportement de consigne', () => {
    const result = summaryUser('# Source 1\n\nContenu', true, 'fr');
    expect(result).toContain('CONSIGNE DE REVISION');
    expect(result).toContain('key_points');
  });
});

// ── defaultReasonFor (logger.warn sur agent inconnu) ────────────────

describe('defaultReasonFor', () => {
  it('retourne la reason localisée pour un agent connu', () => {
    expect(defaultReasonFor('summary', 'en')).toContain('Course summary');
    expect(defaultReasonFor('podcast', 'fr')).toMatch(/podcast/i);
  });

  it('log un warn et retourne un placeholder neutre pour un agent inconnu', () => {
    const spy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const result = defaultReasonFor('unknown-xyz', 'fr');
    expect(result).toBe('[unknown-xyz]');
    expect(spy).toHaveBeenCalledWith('router', expect.stringContaining('unknown-xyz'));
    spy.mockRestore();
  });
});

// ── routerSystem invariants ─────────────────────────────────────────

describe('routerSystem invariants', () => {
  it('contient la règle de cardinal 4-7 agents et la liste des 7 agents', () => {
    const result = routerSystem('enfant', 'fr');
    expect(result).toContain('4-7 agents');
    expect(result).toContain('Maximum 7 agents');
    for (const agent of [
      'summary',
      'flashcards',
      'quiz',
      'fill-blank',
      'podcast',
      'quiz-vocal',
      'image',
    ]) {
      expect(result).toContain(`"${agent}"`);
    }
  });

  it('mentionne le critère audio sans imposer sa sélection (politique neutre)', () => {
    const result = routerSystem('enfant', 'fr');
    // Le mot "audio" reste présent comme critère de pertinence
    expect(result.toLowerCase()).toContain('audio');
    // Mais la formulation prescriptive doit disparaître
    expect(result).not.toContain('inclure generalement au moins un format audio');
    expect(result).not.toContain('souvent les deux (podcast + quiz-vocal)');
  });
});

// ── feedbackAgeInstruction invariants ──────────────────────────────

describe('feedbackAgeInstruction invariants', () => {
  for (const ageGroup of ['enfant', 'ado', 'etudiant', 'adulte'] as const) {
    it(`ageGroup=${ageGroup} ne contient ni "presque" ni "pas tout à fait"`, () => {
      const result = feedbackAgeInstruction(ageGroup).toLowerCase();
      expect(result).not.toMatch(/\bpresque\b/);
      expect(result).not.toMatch(/pas tout à fait/);
    });
  }
});

// ── vocalRewriteRules invariants ────────────────────────────────────

describe('vocalRewriteRules', () => {
  it('FR contient des règles spécifiques (chiffres romains, abréviations)', () => {
    const result = vocalRewriteRules('fr');
    expect(result).toContain('cinquieme');
    expect(result).toContain('avant Jesus-Christ');
  });

  it('EN contient ses propres règles (ordinals, acronyms)', () => {
    const result = vocalRewriteRules('en');
    expect(result).toContain('fifth');
    expect(result).toContain('United Nations');
    expect(result).not.toContain('cinquieme');
  });

  it('ES contient ses propres règles', () => {
    const result = vocalRewriteRules('es');
    expect(result).toContain('quinto');
    expect(result).not.toContain('cinquieme');
  });

  it('DE contient ses propres règles (ajout 9 langues UI)', () => {
    const result = vocalRewriteRules('de');
    expect(result).toContain('fünfter');
    expect(result).not.toContain('cinquieme');
  });

  it('IT contient ses propres règles', () => {
    const result = vocalRewriteRules('it');
    expect(result).toContain('quinto');
    expect(result).toContain('quattordicesimo');
  });

  it('PT contient ses propres règles', () => {
    const result = vocalRewriteRules('pt');
    expect(result).toContain('quinto');
    expect(result).toContain('décimo quarto');
  });

  it('NL contient ses propres règles', () => {
    const result = vocalRewriteRules('nl');
    expect(result).toContain('vijfde');
  });

  it('HI contient ses propres règles (devanagari)', () => {
    const result = vocalRewriteRules('hi');
    expect(result).toContain('पाँचवाँ');
  });

  it('AR contient ses propres règles (arabe)', () => {
    const result = vocalRewriteRules('ar');
    expect(result).toContain('الخامس');
  });

  it('langue hors UI retombe sur FR (ex: japonais, coréen)', () => {
    const result = vocalRewriteRules('ja');
    expect(result).toContain('cinquieme');
  });

  it("toutes les 9 langues UI partagent l'intro TTS commune", () => {
    for (const lang of ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'hi', 'ar']) {
      expect(vocalRewriteRules(lang)).toContain('LUES A HAUTE VOIX');
    }
  });
});

// ── quizVocalSystem (vérifie que vocalRewriteRules est bien intégrée) ─

describe('quizVocalSystem integration', () => {
  it('contient la règle parenthèses/labels (exception A-D)', () => {
    const result = quizVocalSystem('enfant', 'fr');
    expect(result).toContain('AUCUNE parenthese');
    expect(result).toContain('A)');
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
