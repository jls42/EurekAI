import { describe, it, expect } from 'vitest';
import { modelPriceLabel } from './model-pricing';

// `t` identité : renvoie la clé brute → permet de vérifier format des montants + suffixe d'unité.
const t = (k: string) => k;

describe('modelPriceLabel', () => {
  it('formats token pricing with 2 decimals (large)', () => {
    expect(modelPriceLabel('mistral-large-latest', t)).toBe('$0.50 / $1.50 settings.perMTokens');
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

  it('formats character pricing for TTS', () => {
    expect(modelPriceLabel('voxtral-mini-tts-latest', t)).toBe('$16 settings.perMChars');
  });

  it('returns priceUnknown for an unknown model', () => {
    expect(modelPriceLabel('gpt-4o', t)).toBe('settings.priceUnknown');
  });
});
