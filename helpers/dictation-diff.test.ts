/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { diffDictation, maskWordInSentence, normalizeDictationInput } from './dictation-diff.js';

describe('normalizeDictationInput', () => {
  it('NFC + trim + espaces internes + apostrophe typographique', () => {
    expect(normalizeDictationInput('  l’école  ')).toBe("l'école");
    expect(normalizeDictationInput('grand   père')).toBe('grand père');
    // e + combining acute (NFD) ≡ é précomposé (NFC)
    expect(normalizeDictationInput('école')).toBe('école');
  });
});

describe('diffDictation (comparaison stricte)', () => {
  it('correct : exact, casse ignorée, apostrophes équivalentes', () => {
    expect(diffDictation('toujours', 'toujours').correct).toBe(true);
    expect(diffDictation('Toujours', 'toujours').correct).toBe(true);
    expect(diffDictation('l’école', "l'école").correct).toBe(true);
    expect(diffDictation('  toujours ', 'toujours').correct).toBe(true);
  });

  it('incorrect : accent manquant = faux (les accents SONT le test)', () => {
    expect(diffDictation('ecole', 'école').correct).toBe(false);
    expect(diffDictation('éléphant', 'elephant').correct).toBe(false);
  });

  it('incorrect : lettre manquante ou en trop', () => {
    expect(diffDictation('toujour', 'toujours').correct).toBe(false);
    expect(diffDictation('toujourss', 'toujours').correct).toBe(false);
  });

  it('diff caractère par caractère marque les mauvaises lettres', () => {
    const { chars } = diffDictation('tovjours', 'toujours');
    expect(chars.map((c) => c.ok)).toEqual([true, true, false, true, true, true, true, true]);
    expect(chars.map((c) => c.ch).join('')).toBe('tovjours');
  });

  it('expose la forme attendue normalisée', () => {
    expect(diffDictation('x', ' toujours ').expected).toBe('toujours');
  });
});

describe('maskWordInSentence', () => {
  it('masque le mot (insensible à la casse)', () => {
    expect(maskWordInSentence('Mon chat dort toujours ici.', 'toujours')).toBe(
      'Mon chat dort ___ ici.',
    );
    expect(maskWordInSentence('Toujours en retard !', 'toujours')).toBe('___ en retard !');
  });

  it('retourne null si le mot est absent (fallback : phrase cachée avant validation)', () => {
    expect(maskWordInSentence('Mon chat dort ici.', 'toujours')).toBeNull();
    expect(maskWordInSentence('phrase', '')).toBeNull();
  });

  it('masque TOUTES les occurrences (anti-recopie quand le mot apparaît plusieurs fois)', () => {
    expect(
      maskWordInSentence('Il existe plusieurs climats comme le climat océanique.', 'climat'),
    ).toBe('Il existe plusieurs ___s comme le ___ océanique.');
  });

  it('gère les apostrophes typographiques', () => {
    expect(maskWordInSentence('Je vais à l’école demain.', "l'école")).toBe(
      'Je vais à ___ demain.',
    );
  });
});
