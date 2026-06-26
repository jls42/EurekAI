/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  OCR_MODELS,
  OCR_MODEL_LABELS,
  OCR_MODEL_RETIREMENT,
  DEFAULT_OCR_MODEL,
  normalizeOcrModel,
} from './ocr-models.js';

describe('ocr-models', () => {
  it('DEFAULT_OCR_MODEL is OCR 4 (modèle courant ; OCR 3 retiré le 2026-09-30)', () => {
    expect(DEFAULT_OCR_MODEL).toBe('mistral-ocr-4-0');
  });

  it('OCR_MODELS lists OCR 4 (défaut) puis OCR 3', () => {
    expect(OCR_MODELS).toEqual(['mistral-ocr-4-0', 'mistral-ocr-2512']);
  });

  it('OCR_MODEL_LABELS mappe les ids vers les noms produit', () => {
    expect(OCR_MODEL_LABELS['mistral-ocr-4-0']).toBe('OCR 4');
    expect(OCR_MODEL_LABELS['mistral-ocr-2512']).toBe('OCR 3');
  });

  it('OCR_MODEL_RETIREMENT documente la fin de vie OCR 3 (source unique de la date affichée)', () => {
    expect(OCR_MODEL_RETIREMENT['mistral-ocr-2512']).toEqual({
      deprecation: '2026-06-30',
      retirement: '2026-09-30',
    });
    // OCR 4 = modèle courant : pas d'entrée (sinon il serait marqué "en retrait" dans l'UI).
    expect(OCR_MODEL_RETIREMENT['mistral-ocr-4-0']).toBeUndefined();
  });

  describe('normalizeOcrModel', () => {
    it('keeps OCR 4 when explicitly selected', () => {
      expect(normalizeOcrModel('mistral-ocr-4-0')).toBe('mistral-ocr-4-0');
    });

    it('keeps OCR 3 (opt-in)', () => {
      expect(normalizeOcrModel('mistral-ocr-2512')).toBe('mistral-ocr-2512');
    });

    it('maps legacy alias mistral-ocr-latest to the default (OCR 4)', () => {
      expect(normalizeOcrModel('mistral-ocr-latest')).toBe('mistral-ocr-4-0');
    });

    it('maps unknown / nullish / non-string to OCR 4 default', () => {
      expect(normalizeOcrModel('garbage')).toBe('mistral-ocr-4-0');
      expect(normalizeOcrModel(undefined)).toBe('mistral-ocr-4-0');
      expect(normalizeOcrModel(null)).toBe('mistral-ocr-4-0');
      expect(normalizeOcrModel(42)).toBe('mistral-ocr-4-0');
    });
  });
});
