import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  validateFillBlankAnswer,
  validateAnswer,
  isExactSpelling,
  answerLeaks,
  splitAlternatives,
  type FillBlankKey,
} from './fill-blank-validate.js';

// Cas réels : réponses justes refusées relevées par le jury du 2026-10-09
// (output/model-corpus/2026-10-09/, hors git) et typographie des claviers de tablette.
const MUST_ACCEPT: [string, FillBlankKey | string][] = [
  ['XVe', 'XVe (quinzième)'],
  ['quinzième', 'XVe (quinzième)'],
  ['15e', 'XVe'],
  ['XVème', 'XVe'],
  ['XVᵉ', 'XVe'],
  ['xve', 'XVe'],
  ['xv', 'XV'],
  ['9 mois', 'neuf mois'],
  ['9', 'neuf'],
  ['mille', '1000'],
  ['1 000', '1000'],
  ['un', '1'],
  ['3e', 'troisième'],
  ['IIIe', 'troisième'],
  ['3ème', 'troisième'],
  ['quatre-vingt-dix', '90'],
  ['vingt et un', '21'],
  ['1er', 'Ier'],
  ['Ier siècle', 'premier siècle'],
  ['Louis 16', 'Louis XVI'],
  ['3000 av. J.-C.', '3000 avant Jésus-Christ'],
  ['-3000', '3000 av. J.-C.'],
  ['l’écriture', "l'écriture"],
  ['coeur', 'cœur'],
  ['Jésus', { answer: 'Jésus-Christ', accepted: ['Jésus'] }],
  ['L', { answer: 'L', sentence: 'En chiffres romains, la lettre ___ vaut 50.' }],
];

const MUST_REFUSE: [string, FillBlankKey | string][] = [
  // La tolérance de frappe acceptait ces nombres faux (distance 1).
  ['1788', '1789'],
  ['1493', '1492'],
  ['XIVe', 'XVe'],
  ['XVIe', 'XVe'],
  ['XIV', 'XV'],
  ['huit', 'neuf'],
  ['six', 'dix'],
  ['3000', '-3000'],
  ['vie', 'XVIe'],
  ['15', { answer: 'XV', sentence: "En chiffres romains, 15 s'écrit ___." }],
  // Exercice réel du 2026-10-10 : le modèle listait « 15 » malgré les chiffres romains demandés.
  [
    '15',
    { answer: 'XV', accepted: ['15'], sentence: "Ce siècle s'écrit ___ en chiffres romains." },
  ],
  ['50', { answer: 'L', sentence: 'En chiffres romains, la lettre ___ vaut 50.' }],
  ['9', { answer: 'neuf', sentence: 'Écris en lettres : 9 → ___.' }],
  ['ovaire', 'ovule'],
  ['Jésus', 'Jésus-Christ'],
];

describe('normalizeAnswer', () => {
  it('met en minuscules', () => {
    expect(normalizeAnswer('PARIS')).toBe('paris');
  });

  it('retire les accents', () => {
    expect(normalizeAnswer('électricité')).toBe('electricite');
  });

  it('trim les espaces et la ponctuation', () => {
    expect(normalizeAnswer('  hello! ')).toBe('hello');
    expect(normalizeAnswer('...monde.')).toBe('monde');
  });

  it('normalise les espaces multiples', () => {
    expect(normalizeAnswer('deux   mots')).toBe('deux mots');
  });

  it("retire l'article l'", () => {
    expect(normalizeAnswer("l'alternateur")).toBe('alternateur');
  });

  it("retire l'article d'", () => {
    expect(normalizeAnswer("d'électricité")).toBe('electricite');
  });

  it('retire les articles simples (le, la, les, un, une, des, du)', () => {
    expect(normalizeAnswer('le soleil')).toBe('soleil');
    expect(normalizeAnswer('la lune')).toBe('lune');
    expect(normalizeAnswer('les etoiles')).toBe('etoiles');
    expect(normalizeAnswer('un arbre')).toBe('arbre');
    expect(normalizeAnswer('une fleur')).toBe('fleur');
    expect(normalizeAnswer('des montagnes')).toBe('montagnes');
    expect(normalizeAnswer('du pain')).toBe('pain');
  });

  it("retire l'article de la", () => {
    expect(normalizeAnswer('de la France')).toBe('france');
  });

  it("retire l'article de l'", () => {
    expect(normalizeAnswer("de l'eau")).toBe('eau');
  });

  it('retourne vide pour une chaine vide', () => {
    expect(normalizeAnswer('')).toBe('');
  });
});

describe('validateFillBlankAnswer', () => {
  it('exact match retourne distance 0', () => {
    expect(validateFillBlankAnswer('Paris', 'Paris')).toEqual({ match: true, distance: 0 });
  });

  it('match insensible a la casse', () => {
    expect(validateFillBlankAnswer('PARIS', 'paris')).toEqual({ match: true, distance: 0 });
  });

  it('match insensible aux accents', () => {
    expect(validateFillBlankAnswer('electricite', 'électricité')).toEqual({
      match: true,
      distance: 0,
    });
  });

  it('match avec article en trop', () => {
    expect(validateFillBlankAnswer("l'eau", 'eau')).toEqual({ match: true, distance: 0 });
  });

  // Seuil pour mots courts (≤5 chars) : distance max 1
  it('accepte distance 1 pour mot court (≤5 chars)', () => {
    const result = validateFillBlankAnswer('Pari', 'Paris');
    expect(result.match).toBe(true);
    expect(result.distance).toBe(1);
  });

  it('refuse distance 2 pour mot court (≤5 chars)', () => {
    const result = validateFillBlankAnswer('Par', 'Paris');
    expect(result.match).toBe(false);
    expect(result.distance).toBe(2);
  });

  // Seuil pour mots moyens (6-12 chars) : distance max 2
  it('accepte distance 2 pour mot moyen (6-12 chars)', () => {
    const result = validateFillBlankAnswer('alternater', 'alternateur');
    expect(result.match).toBe(true);
    expect(result.distance).toBeLessThanOrEqual(2);
  });

  it('refuse distance 3 pour mot moyen (6-12 chars)', () => {
    const result = validateFillBlankAnswer('alterner', 'alternateur');
    expect(result.match).toBe(false);
  });

  // Seuil pour mots longs (>12 chars) : distance max 3
  it('accepte distance 3 pour mot long (>12 chars)', () => {
    const result = validateFillBlankAnswer('photosynthesee', 'photosynthese');
    expect(result.match).toBe(true);
    expect(result.distance).toBeLessThanOrEqual(3);
  });

  it('chaines vides sont un match exact', () => {
    expect(validateFillBlankAnswer('', '')).toEqual({ match: true, distance: 0 });
  });

  it('reponse vide vs reponse attendue = no match', () => {
    const result = validateFillBlankAnswer('', 'Paris');
    expect(result.match).toBe(false);
  });

  it('reponse completement differente = no match', () => {
    const result = validateFillBlankAnswer('Londres', 'Paris');
    expect(result.match).toBe(false);
  });
});

describe('isExactSpelling', () => {
  it('orthographe identique = exact', () => {
    expect(isExactSpelling('électricité', 'électricité')).toBe(true);
  });

  it('difference de casse seule = exact (casse ignoree)', () => {
    expect(isExactSpelling('paris', 'Paris')).toBe(true);
  });

  it('article manquant seul = exact (article ignore)', () => {
    expect(isExactSpelling('alternateur', 'un alternateur')).toBe(true);
  });

  it('formes Unicode NFD/NFC equivalentes = exact', () => {
    // Memes lettres mais formes Unicode differentes : la normalisation NFC interne
    // doit les faire converger (sinon fausse alerte sur un mot pourtant identique).
    const nfc = 'électricité'.normalize('NFC');
    const nfd = 'électricité'.normalize('NFD');
    expect(isExactSpelling(nfd, nfc)).toBe(true);
  });

  it('accents manquants = PAS exact (a signaler)', () => {
    expect(isExactSpelling('electricite', 'électricité')).toBe(false);
  });

  it('faute de frappe = PAS exact (a signaler)', () => {
    expect(isExactSpelling('Pari', 'Paris')).toBe(false);
  });

  it('autre écriture du même nombre = exact ; ordinal sans son « e » = juste mais signalé', () => {
    expect(isExactSpelling('15e', 'XVe')).toBe(true);
    expect(isExactSpelling('XV', 'XVe')).toBe(false);
    expect(validateAnswer('XV', 'XVe')).toBe(true);
  });
});

describe('nombres, écritures et accepted', () => {
  it.each(MUST_ACCEPT)('accepte « %s » pour %j', (child, key) => {
    expect(validateAnswer(child, key)).toBe(true);
  });

  it.each(MUST_REFUSE)('refuse « %s » pour %j', (child, key) => {
    expect(validateAnswer(child, key)).toBe(false);
  });

  it("l'indice, caché tant que l'enfant ne l'ouvre pas, n'impose aucune écriture", () => {
    // Exercice réel du release-test du 2026-10-10 : « 5e » était refusé à cause de l'indice.
    const key = {
      answer: 'Ve',
      accepted: ['5e', 'cinquième'],
      sentence: "La chute de l'Empire romain d'Occident a lieu en 476, au ___ siècle.",
      hint: "Écris-le en chiffres romains : c'est le siècle qui suit le IVe.",
    };
    expect(validateAnswer('5e', key)).toBe(true);
    expect(validateAnswer('cinquième', key)).toBe(true);
    expect(validateAnswer('IVe', key)).toBe(false);
  });

  it("« Empire romain » n'impose pas les chiffres romains", () => {
    const key = { answer: 'Ve', sentence: "L'Empire romain d'Occident tombe au ___ siècle." };
    expect(validateAnswer('5e', key)).toBe(true);
  });

  it('écritures d’une réponse : parenthèses et « / »', () => {
    expect(splitAlternatives('XVe (quinzième)')).toEqual(['XVe', 'quinzième']);
    expect(splitAlternatives('neuf / 9')).toEqual(['neuf', '9']);
    expect(splitAlternatives('14/07/1789')).toEqual(['14/07/1789']);
  });

  it('accepted abîmé sur disque : ignoré sans erreur', () => {
    const key = { answer: 'ciel', accepted: [42, null, ''] } as unknown as FillBlankKey;
    expect(validateAnswer('ciel', key)).toBe(true);
    expect(validateAnswer('mer', key)).toBe(false);
  });
});

describe('answerLeaks', () => {
  it('voit la réponse dans la phrase, sous une autre écriture comprise', () => {
    // Exercices réels : « jusqu'à mille » pour 1000, « 14 + 1 = 15 » pour 1.
    expect(
      answerLeaks({
        answer: '1000',
        sentence: "Un millénaire dure ___ ans : compte jusqu'à mille.",
      }),
    ).toBe(true);
    expect(
      answerLeaks({ answer: '1', sentence: 'On ajoute ___ aux centaines : 14 + 1 = 15.' }),
    ).toBe(true);
    expect(
      answerLeaks({
        answer: "l'écriture",
        sentence: "Avant l'écriture, la Préhistoire ; puis l'invention de ___.",
      }),
    ).toBe(true);
  });

  it("voit la réponse dans l'indice", () => {
    expect(
      answerLeaks({
        answer: 'Lascaux',
        sentence: 'La grotte de ___',
        hint: 'Les grottes de Lascaux',
      }),
    ).toBe(true);
  });

  it("ne confond pas les écritures quand la phrase en impose une, ni l'article « un » avec 1", () => {
    const roman = {
      answer: 'L',
      sentence: 'Dans les chiffres romains, la lettre ___ représente le nombre 50.',
    };
    expect(answerLeaks(roman)).toBe(false);
    // « 15 » listé à tort dans accepted ne fait pas écarter l'exercice.
    const listed = {
      answer: 'XV',
      accepted: ['15'],
      sentence: 'En chiffres romains, 15 s’écrit ___.',
    };
    expect(answerLeaks(listed)).toBe(false);
    expect(validateAnswer('XV', listed)).toBe(true);
    expect(
      validateAnswer('15', { answer: '15', sentence: 'XV en chiffres romains vaut ___.' }),
    ).toBe(true);
    expect(
      answerLeaks({ answer: '1', sentence: 'Il faut ajouter ___ pour trouver un siècle.' }),
    ).toBe(false);
    expect(
      answerLeaks({
        answer: 'neuf',
        sentence: 'La grossesse dure ___ mois.',
        hint: 'Un peu moins de dix',
      }),
    ).toBe(false);
  });

  it('voit une réponse encadrée (indices réels des 2026-10-09 et 2026-10-10)', () => {
    const century = { answer: 'XVe', sentence: '1492 est au ___ siècle.' };
    expect(answerLeaks({ ...century, hint: 'Entre le XIVe et le XVIe siècle.' })).toBe(true);
    expect(
      answerLeaks({ answer: 'neuf', sentence: 'Elle dure ___ mois.', hint: 'Entre 8 et 10' }),
    ).toBe(true);
    expect(answerLeaks({ ...century, hint: 'On ajoute 1 au nombre de centaines.' })).toBe(false);
  });
});
