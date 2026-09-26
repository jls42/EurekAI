/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  MODERATION_MODEL_CATEGORIES,
  expandLegacyModerationCategories,
  isModerationCategory,
  legacyModerationCategoriesIn,
} from './moderation-model.js';

const LEGACY_KEY = 'dangerous_and_criminal_content';

describe('moderation-model', () => {
  describe('expandLegacyModerationCategories', () => {
    it('remplace la clé 2411 par dangerous + criminal à sa position', () => {
      expect(expandLegacyModerationCategories(['sexual', LEGACY_KEY, 'selfharm'])).toEqual([
        'sexual',
        'dangerous',
        'criminal',
        'selfharm',
      ]);
    });

    it('dédoublonne, la 1re occurrence gagne (ordre conservé)', () => {
      expect(expandLegacyModerationCategories(['criminal', LEGACY_KEY, 'sexual'])).toEqual([
        'criminal',
        'dangerous',
        'sexual',
      ]);
      expect(expandLegacyModerationCategories([LEGACY_KEY, LEGACY_KEY])).toEqual([
        'dangerous',
        'criminal',
      ]);
    });

    it('laisse intactes les listes sans clé legacy, inconnues comprises (filtrage = appelant)', () => {
      expect(expandLegacyModerationCategories(['sexual', 'TYPO'])).toEqual(['sexual', 'TYPO']);
      expect(expandLegacyModerationCategories([])).toEqual([]);
    });

    it('ne remonte pas le prototype sur une entrée hostile', () => {
      expect(expandLegacyModerationCategories(['__proto__', 'constructor'])).toEqual([
        '__proto__',
        'constructor',
      ]);
    });
  });

  describe('legacyModerationCategoriesIn', () => {
    it('ne retourne que les clés legacy, dédoublonnées', () => {
      expect(legacyModerationCategoriesIn(['sexual', LEGACY_KEY, LEGACY_KEY])).toEqual([
        LEGACY_KEY,
      ]);
      expect(legacyModerationCategoriesIn(['sexual', 'dangerous', 'criminal'])).toEqual([]);
    });
  });

  describe('isModerationCategory', () => {
    it('accepte chaque clé de la taxonomie', () => {
      for (const cat of MODERATION_MODEL_CATEGORIES) {
        expect(isModerationCategory(cat)).toBe(true);
      }
    });

    it('refuse la clé 2411, les inconnues et les clés du prototype', () => {
      for (const cat of [LEGACY_KEY, 'TYPO', '', 'constructor', '__proto__']) {
        expect(isModerationCategory(cat)).toBe(false);
      }
    });
  });
});
