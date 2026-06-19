import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  validateFillBlankAnswer,
  isExactSpelling,
} from './fill-blank-validate.js';

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
});
