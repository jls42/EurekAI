import { describe, it, expect } from 'vitest';
import { selectVoices } from './voice-selection.js';
import { asVoiceId } from './voice-types.js';
import type { MistralVoice } from './voice-types.js';

function makeVoice(overrides: Partial<Omit<MistralVoice, 'id'>> & { id: string }): MistralVoice {
  return {
    // Cast au point d'entrée du helper de test — évite de polluer chaque test avec asVoiceId('…').
    id: asVoiceId(overrides.id),
    name: overrides.name ?? `Voice ${overrides.id}`,
    languages: overrides.languages ?? ['fr_FR'],
    gender: overrides.gender,
    tags: overrides.tags,
    createdAt: overrides.createdAt,
  };
}

describe('selectVoices', () => {
  describe('bucket resolution', () => {
    it('returns lang-match when voices exist in requested language', () => {
      const voices = [
        makeVoice({ id: 'fr1', languages: ['fr_FR'] }),
        makeVoice({ id: 'en1', languages: ['en_US'] }),
      ];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.source).toBe('lang-match');
      expect(res?.langMatched).toBe('fr');
      expect(res?.host).toBe('fr1');
    });

    it('falls back to en when requested language has no voice', () => {
      const voices = [
        makeVoice({ id: 'en1', languages: ['en_US'] }),
        makeVoice({ id: 'fr1', languages: ['fr_FR'] }),
      ];
      const res = selectVoices({ voices, lang: 'hi' });
      expect(res?.source).toBe('en-fallback');
      expect(res?.langMatched).toBe('en');
      expect(res?.host).toBe('en1');
    });

    it('falls back to any voice when neither requested lang nor en exist', () => {
      const voices = [makeVoice({ id: 'ja1', languages: ['ja_JP'] })];
      const res = selectVoices({ voices, lang: 'hi' });
      expect(res?.source).toBe('any-fallback');
      expect(res?.langMatched).toBeNull();
      expect(res?.host).toBe('ja1');
    });

    it('returns null when voice cache is entirely empty', () => {
      const res = selectVoices({ voices: [], lang: 'fr' });
      expect(res).toBeNull();
    });

    it('matches by language prefix (fr-CA matches fr_CA)', () => {
      const voices = [makeVoice({ id: 'frca', languages: ['fr_CA'] })];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.source).toBe('lang-match');
      expect(res?.host).toBe('frca');
    });

    it('normalises BCP-47 input (pt-BR matches pt_BR voice)', () => {
      const voices = [makeVoice({ id: 'ptbr', languages: ['pt_BR'] })];
      const res = selectVoices({ voices, lang: 'pt-BR' });
      expect(res?.source).toBe('lang-match');
      expect(res?.langMatched).toBe('pt');
      expect(res?.host).toBe('ptbr');
    });

    it('normalises case-inconsistent voice languages (FR_FR matches fr)', () => {
      const voices = [makeVoice({ id: 'upper', languages: ['FR_FR'] })];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.source).toBe('lang-match');
      expect(res?.host).toBe('upper');
    });

    it('normalises input lang case (FR matches fr_FR)', () => {
      const voices = [makeVoice({ id: 'frfr', languages: ['fr_FR'] })];
      const res = selectVoices({ voices, lang: 'FR' });
      expect(res?.source).toBe('lang-match');
      expect(res?.host).toBe('frfr');
    });

    it('pt-BR and pt produce the same rotation seed', () => {
      const voices = [
        makeVoice({ id: 'a', languages: ['pt_BR'] }),
        makeVoice({ id: 'b', languages: ['pt_BR'] }),
      ];
      const r1 = selectVoices({ voices, lang: 'pt', profileId: 'p1' });
      const r2 = selectVoices({ voices, lang: 'pt-BR', profileId: 'p1' });
      expect(r1?.host).toBe(r2?.host);
    });
  });

  describe('scoring', () => {
    it('prefers female voices over male', () => {
      const voices = [
        makeVoice({ id: 'a', gender: 'male', languages: ['fr_FR'] }),
        makeVoice({ id: 'b', gender: 'female', languages: ['fr_FR'] }),
      ];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.host).toBe('b');
    });

    it('prefers excited tag over neutral among same-gender voices', () => {
      const voices = [
        makeVoice({ id: 'a', gender: 'female', tags: ['neutral'], languages: ['fr_FR'] }),
        makeVoice({ id: 'b', gender: 'female', tags: ['excited'], languages: ['fr_FR'] }),
      ];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.host).toBe('b');
    });

    it('uses id ASC as tie-breaker when scores are equal', () => {
      const voices = [
        makeVoice({ id: 'z', gender: 'female', tags: ['excited'], languages: ['fr_FR'] }),
        makeVoice({ id: 'a', gender: 'female', tags: ['excited'], languages: ['fr_FR'] }),
      ];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.host).toBe('a');
    });
  });

  describe('distinct voices', () => {
    it('returns two distinct voices when bucket has at least 2', () => {
      const voices = [
        makeVoice({ id: 'a', languages: ['fr_FR'] }),
        makeVoice({ id: 'b', languages: ['fr_FR'] }),
      ];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.host).not.toBe(res?.guest);
    });

    it('reuses the same voice when bucket has only one', () => {
      const voices = [makeVoice({ id: 'solo', languages: ['fr_FR'] })];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.host).toBe('solo');
      expect(res?.guest).toBe('solo');
    });
  });

  describe('deterministic rotation by profileId', () => {
    const bucket = [
      makeVoice({ id: 'a', languages: ['fr_FR'] }),
      makeVoice({ id: 'b', languages: ['fr_FR'] }),
      makeVoice({ id: 'c', languages: ['fr_FR'] }),
      makeVoice({ id: 'd', languages: ['fr_FR'] }),
    ];

    it('returns the same result for identical profileId + lang', () => {
      const a = selectVoices({ voices: bucket, lang: 'fr', profileId: 'profile-1' });
      const b = selectVoices({ voices: bucket, lang: 'fr', profileId: 'profile-1' });
      expect(a?.host).toBe(b?.host);
      expect(a?.guest).toBe(b?.guest);
    });

    it('produces distinct results for at least 2 different profileIds (best-effort)', () => {
      const ids = ['profile-a', 'profile-b', 'profile-c', 'profile-d', 'profile-e'];
      const results = ids.map(
        (id) => selectVoices({ voices: bucket, lang: 'fr', profileId: id })?.host,
      );
      const unique = new Set(results);
      expect(unique.size).toBeGreaterThanOrEqual(2);
    });

    it('is stable for missing profileId (__default__ seed)', () => {
      const a = selectVoices({ voices: bucket, lang: 'fr' });
      const b = selectVoices({ voices: bucket, lang: 'fr' });
      expect(a?.host).toBe(b?.host);
    });
  });

  describe('bucketSize reporting', () => {
    it('returns correct bucketSize for lang-match', () => {
      const voices = [
        makeVoice({ id: 'a', languages: ['fr_FR'] }),
        makeVoice({ id: 'b', languages: ['fr_FR'] }),
        makeVoice({ id: 'c', languages: ['en_US'] }),
      ];
      const res = selectVoices({ voices, lang: 'fr' });
      expect(res?.bucketSize).toBe(2);
    });

    it('returns correct bucketSize for en-fallback', () => {
      const voices = [
        makeVoice({ id: 'a', languages: ['en_US'] }),
        makeVoice({ id: 'b', languages: ['en_GB'] }),
      ];
      const res = selectVoices({ voices, lang: 'hi' });
      expect(res?.source).toBe('en-fallback');
      expect(res?.bucketSize).toBe(2);
    });
  });
});
