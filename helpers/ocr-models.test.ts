/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { OCR_MODELS, DEFAULT_OCR_MODEL, normalizeOcrModel } from './ocr-models.js';

describe('ocr-models', () => {
  it('DEFAULT_OCR_MODEL is OCR 3 (cheaper default)', () => {
    expect(DEFAULT_OCR_MODEL).toBe('mistral-ocr-2512');
  });

  it('OCR_MODELS lists OCR 3 then OCR 4', () => {
    expect(OCR_MODELS).toEqual(['mistral-ocr-2512', 'mistral-ocr-4-0']);
  });

  describe('normalizeOcrModel', () => {
    it('keeps OCR 4 when explicitly selected', () => {
      expect(normalizeOcrModel('mistral-ocr-4-0')).toBe('mistral-ocr-4-0');
    });

    it('keeps OCR 3', () => {
      expect(normalizeOcrModel('mistral-ocr-2512')).toBe('mistral-ocr-2512');
    });

    it('maps legacy alias mistral-ocr-latest to OCR 3', () => {
      expect(normalizeOcrModel('mistral-ocr-latest')).toBe('mistral-ocr-2512');
    });

    it('maps unknown / nullish / non-string to OCR 3 default', () => {
      expect(normalizeOcrModel('garbage')).toBe('mistral-ocr-2512');
      expect(normalizeOcrModel(undefined)).toBe('mistral-ocr-2512');
      expect(normalizeOcrModel(null)).toBe('mistral-ocr-2512');
      expect(normalizeOcrModel(42)).toBe('mistral-ocr-2512');
    });
  });
});
