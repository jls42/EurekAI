/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { modelPriceLabel } from './model-pricing';

// `t` identité : renvoie la clé brute → permet de vérifier format des montants + suffixe d'unité.
const t = (k: string) => k;

describe('modelPriceLabel', () => {
  it('formats token pricing with 2 decimals (large)', () => {
    expect(modelPriceLabel('mistral-large-latest', t)).toBe('$0.50 / $1.50 settings.perMTokens');
  });

  it('formats token pricing for Large 4 (its own price, not Large 3)', () => {
    expect(modelPriceLabel('mistral-large-4-0', t)).toBe('$1.36 / $4.18 settings.perMTokens');
  });

  it('formats token pricing for medium', () => {
    expect(modelPriceLabel('mistral-medium-latest', t)).toBe('$1.50 / $7.50 settings.perMTokens');
  });

  it('formats page pricing for OCR 3 ($2/1000)', () => {
    expect(modelPriceLabel('mistral-ocr-2512', t)).toBe('$2 settings.perKPages');
  });

  it('formats page pricing for OCR 4 ($4/1000)', () => {
    expect(modelPriceLabel('mistral-ocr-4-0', t)).toBe('$4 settings.perKPages');
  });

  it('formats character pricing for TTS (Voxtral TTS $16, TTS 3 at its own $13)', () => {
    expect(modelPriceLabel('voxtral-mini-tts-2603', t)).toBe('$16 settings.perMChars');
    expect(modelPriceLabel('voxtral-mini-tts-3-0', t)).toBe('$13 settings.perMChars');
  });

  it('returns priceUnknown for an unknown model', () => {
    expect(modelPriceLabel('gpt-4o', t)).toBe('settings.priceUnknown');
  });

  // Sélecteur « Transcription » des Réglages : prix par minute, 4 décimales (comme la ligne de coût
  // « $0.0035/min ») ; chaque modèle a son tarif, Transcribe 3 n'hérite pas de celui de Transcribe 2.
  it.each([
    ['voxtral-mini-2602', '$0.0030 settings.perMinute'],
    ['voxtral-mini-transcribe-3-0', '$0.0035 settings.perMinute'],
    ['voxtral-small-transcribe-3-0', '$0.0040 settings.perMinute'],
  ])('formats per-minute pricing for STT %s', (model, label) => {
    expect(modelPriceLabel(model, t)).toBe(label);
  });
});
