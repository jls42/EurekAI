/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  OCR_MODELS,
  OCR_MODEL_LABELS,
  DEFAULT_OCR_MODEL,
  normalizeOcrModel,
} from './ocr-models.js';

describe('ocr-models', () => {
  it('DEFAULT_OCR_MODEL est OCR 4.1 (OCR 4.0 retiré le 2026-09-30)', () => {
    expect(DEFAULT_OCR_MODEL).toBe('mistral-ocr-4-1');
  });

  it('OCR_MODELS lists OCR 4 (défaut) puis OCR 3, sans le modèle retiré', () => {
    expect(OCR_MODELS).toEqual(['mistral-ocr-4-1', 'mistral-ocr-2512']);
    expect(OCR_MODELS).not.toContain('mistral-ocr-4-0');
  });

  it('OCR_MODEL_LABELS mappe les ids vers les noms produit', () => {
    expect(OCR_MODEL_LABELS['mistral-ocr-4-1']).toBe('OCR 4');
    expect(OCR_MODEL_LABELS['mistral-ocr-2512']).toBe('OCR 3');
  });

  describe('normalizeOcrModel', () => {
    it('keeps OCR 4 when explicitly selected', () => {
      expect(normalizeOcrModel('mistral-ocr-4-1')).toBe('mistral-ocr-4-1');
    });

    it('maps the retired OCR 4.0 (config.json persisted before v1.7.6) to the default', () => {
      expect(normalizeOcrModel('mistral-ocr-4-0')).toBe('mistral-ocr-4-1');
    });

    it('keeps OCR 3 (opt-in)', () => {
      expect(normalizeOcrModel('mistral-ocr-2512')).toBe('mistral-ocr-2512');
    });

    it('maps legacy alias mistral-ocr-latest to the default (OCR 4)', () => {
      expect(normalizeOcrModel('mistral-ocr-latest')).toBe('mistral-ocr-4-1');
    });

    it('maps unknown / nullish / non-string to OCR 4 default', () => {
      expect(normalizeOcrModel('garbage')).toBe('mistral-ocr-4-1');
      expect(normalizeOcrModel(undefined)).toBe('mistral-ocr-4-1');
      expect(normalizeOcrModel(null)).toBe('mistral-ocr-4-1');
      expect(normalizeOcrModel(42)).toBe('mistral-ocr-4-1');
    });
  });
});
