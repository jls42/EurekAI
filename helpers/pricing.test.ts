import { describe, it, expect } from 'vitest';
import { resolvePricing, calculateCost, aggregateUsage, calculateTotalCost, buildCostBreakdown, MODEL_PRICING, PRICING_SOURCES } from './pricing.js';
import type { ApiUsage } from './pricing.js';

describe('resolvePricing', () => {
  it('resolves mistral-large-2512 to mistral-large pricing', () => {
    const p = resolvePricing('mistral-large-2512');
    expect(p).toEqual(MODEL_PRICING['mistral-large']);
  });

  it('resolves mistral-large-latest to mistral-large pricing', () => {
    expect(resolvePricing('mistral-large-latest')).toEqual(MODEL_PRICING['mistral-large']);
  });

  it('resolves voxtral-mini-tts-2603 to TTS pricing (longer prefix wins)', () => {
    const p = resolvePricing('voxtral-mini-tts-2603');
    expect(p).toEqual(MODEL_PRICING['voxtral-mini-tts']);
  });

  it('resolves voxtral-mini-latest to STT pricing', () => {
    const p = resolvePricing('voxtral-mini-latest');
    expect(p).toEqual(MODEL_PRICING['voxtral-mini']);
  });

  it('returns null for unknown model', () => {
    expect(resolvePricing('gpt-4o')).toBeNull();
  });
});

describe('calculateCost', () => {
  it('calculates token-based cost for mistral-large', () => {
    const usage: ApiUsage = { promptTokens: 1000, completionTokens: 500, model: 'mistral-large-2512' };
    // (1000 * 0.5 + 500 * 1.5) / 1M = (500 + 750) / 1M = 0.00125
    expect(calculateCost(usage)).toBeCloseTo(0.00125, 6);
  });

  it('calculates character-based cost for TTS', () => {
    const usage: ApiUsage = { inputCharacters: 5000, model: 'voxtral-mini-tts-2603' };
    // 5000 * 16 / 1M = 0.08
    expect(calculateCost(usage)).toBeCloseTo(0.08, 6);
  });

  it('calculates page-based cost for OCR', () => {
    const usage: ApiUsage = { pagesProcessed: 3, model: 'mistral-ocr-2512' };
    // 3 * 2000 / 1M = 0.006
    expect(calculateCost(usage)).toBeCloseTo(0.006, 6);
  });

  it('calculates audio-second cost for STT', () => {
    const usage: ApiUsage = { promptAudioSeconds: 60, model: 'voxtral-mini-latest' };
    // 60 * 50 / 1M = 0.003
    expect(calculateCost(usage)).toBeCloseTo(0.003, 6);
  });

  it('returns 0 for free moderation model', () => {
    const usage: ApiUsage = { promptTokens: 1000, completionTokens: 100, model: 'mistral-moderation-2603' };
    expect(calculateCost(usage)).toBe(0);
  });

  it('returns 0 for unknown model', () => {
    const usage: ApiUsage = { promptTokens: 1000, model: 'unknown-model' };
    expect(calculateCost(usage)).toBe(0);
  });
});

describe('aggregateUsage', () => {
  it('sums tokens across multiple entries', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' },
      { promptTokens: 200, completionTokens: 100, totalTokens: 300, model: 'mistral-large-latest' },
    ];
    const agg = aggregateUsage(entries);
    expect(agg.promptTokens).toBe(300);
    expect(agg.completionTokens).toBe(150);
    expect(agg.totalTokens).toBe(450);
    expect(agg.callCount).toBe(2);
  });

  it('aggregates mixed usage types', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' },
      { inputCharacters: 3000, model: 'voxtral-mini-tts-2603' },
    ];
    const agg = aggregateUsage(entries);
    expect(agg.promptTokens).toBe(100);
    expect(agg.inputCharacters).toBe(3000);
    expect(agg.callCount).toBe(2);
  });

  it('leaves optional fields undefined when not present', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' },
    ];
    const agg = aggregateUsage(entries);
    expect(agg.promptAudioSeconds).toBeUndefined();
    expect(agg.pagesProcessed).toBeUndefined();
    expect(agg.inputCharacters).toBeUndefined();
  });
});

describe('calculateTotalCost', () => {
  it('sums costs across entries', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, model: 'mistral-large-2512' },
      { inputCharacters: 5000, model: 'voxtral-mini-tts-2603' },
    ];
    const total = calculateTotalCost(entries);
    // 0.00125 + 0.08 = 0.08125
    expect(total).toBeCloseTo(0.08125, 6);
  });
});

describe('buildCostBreakdown', () => {
  it('builds token breakdown lines', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, model: 'mistral-large-2512' },
    ];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain('1000 tokens in');
    expect(lines[0]).toContain('$0.5/M');
    expect(lines[1]).toContain('500 tokens out');
    expect(lines[1]).toContain('$1.5/M');
  });

  it('builds character breakdown for TTS', () => {
    const entries: ApiUsage[] = [
      { inputCharacters: 5000, model: 'voxtral-mini-tts-2603' },
    ];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('5000 chars');
  });

  it('builds page breakdown for OCR', () => {
    const entries: ApiUsage[] = [
      { pagesProcessed: 3, model: 'mistral-ocr-2512' },
    ];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('3 page(s)');
  });

  it('builds audio breakdown for STT', () => {
    const entries: ApiUsage[] = [
      { promptAudioSeconds: 60, model: 'voxtral-mini-latest' },
    ];
    const lines = buildCostBreakdown(entries);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('60.0s audio');
  });

  it('skips unknown models', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 100, model: 'unknown-model' },
    ];
    expect(buildCostBreakdown(entries)).toHaveLength(0);
  });

  it('skips zero-quantity entries', () => {
    const entries: ApiUsage[] = [
      { promptTokens: 0, completionTokens: 0, model: 'mistral-large-latest' },
    ];
    expect(buildCostBreakdown(entries)).toHaveLength(0);
  });
});

describe('PRICING_SOURCES', () => {
  it('has a source URL for every pricing entry', () => {
    for (const key of Object.keys(MODEL_PRICING)) {
      expect(PRICING_SOURCES[key], `Missing source URL for ${key}`).toBeDefined();
      expect(PRICING_SOURCES[key]).toContain('https://docs.mistral.ai/');
    }
  });
});
