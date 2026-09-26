/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  OCR_MODELS,
  OCR_MODEL_LABELS,
  DEFAULT_OCR_MODEL,
  OCR_DEFAULT_ACCEPTED_LAG,
  normalizeOcrModel,
} from './ocr-models.js';

describe('ocr-models', () => {
  it('DEFAULT_OCR_MODEL reste OCR 4.0 (épinglage volontaire face à OCR 4.1)', () => {
    expect(DEFAULT_OCR_MODEL).toBe('mistral-ocr-4-0');
  });

  it('OCR_DEFAULT_ACCEPTED_LAG vise une mineure plus récente de la génération du défaut', () => {
    // Défaut `P-M-m`, candidat `P-M-n` avec n > m. Échoue si le défaut est bumpé sans retirer
    // l'acceptation (devenue sans objet) ou si elle vise une autre génération.
    const generation = DEFAULT_OCR_MODEL.slice(0, DEFAULT_OCR_MODEL.lastIndexOf('-'));
    const minor = (id: string) => Number(id.slice(generation.length + 1));
    expect(OCR_DEFAULT_ACCEPTED_LAG.candidate.startsWith(`${generation}-`)).toBe(true);
    expect(minor(OCR_DEFAULT_ACCEPTED_LAG.candidate)).toBeGreaterThan(minor(DEFAULT_OCR_MODEL));
    expect(OCR_DEFAULT_ACCEPTED_LAG.since).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('OCR_MODELS lists OCR 4 (défaut) puis OCR 3', () => {
    expect(OCR_MODELS).toEqual(['mistral-ocr-4-0', 'mistral-ocr-2512']);
  });

  it('OCR_MODEL_LABELS mappe les ids vers les noms produit', () => {
    expect(OCR_MODEL_LABELS['mistral-ocr-4-0']).toBe('OCR 4');
    expect(OCR_MODEL_LABELS['mistral-ocr-2512']).toBe('OCR 3');
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
