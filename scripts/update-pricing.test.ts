/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { extractPriceSnippets, formatCurrent } from './update-pricing.js';

describe('extractPriceSnippets', () => {
  it('captures a $price with its adjacent context (pages — value before unit)', () => {
    const md = 'Price\n$2\n/1000 Pages\n$3\n/1000 Annotated Pages';
    const snippets = extractPriceSnippets(md);
    expect(snippets).toContain('Price $2 /1000 Pages');
    expect(snippets.some((s) => s.includes('$3') && s.includes('Annotated'))).toBe(true);
  });

  it('captures token prices (unit before value)', () => {
    const md = 'Input (/M tokens)\n$0.5\nOutput (/M tokens)\n$1.5';
    const snippets = extractPriceSnippets(md);
    expect(snippets.some((s) => s.includes('$0.5') && s.includes('tokens'))).toBe(true);
    expect(snippets.some((s) => s.includes('$1.5'))).toBe(true);
  });

  it('returns [] when there is no $price', () => {
    expect(extractPriceSnippets('no price here\njust text')).toEqual([]);
  });

  it('dedupes identical snippets', () => {
    const md = 'Price\n$2\n/1000 Pages\nPrice\n$2\n/1000 Pages';
    expect(extractPriceSnippets(md)).toEqual(['Price $2 /1000 Pages']);
  });

  it('keeps only snippets matching the anchor (global pricing page fallback)', () => {
    const md =
      'Mistral Moderation\nInput (/M tokens)\n$0.1\nmistral-moderation-2603\nMistral Large\n$0.5\n/M Tokens';
    const snippets = extractPriceSnippets(md, /moderation/i);
    expect(snippets.some((s) => s.includes('$0.1'))).toBe(true);
    expect(snippets.some((s) => s.includes('$0.5'))).toBe(false);
  });

  it('ignores $values without a pricing unit (e.g. $0 in Speed/Features sections)', () => {
    expect(extractPriceSnippets('Speed\n$0\nFeatures\n$0\nFEATURESWEIGHTS')).toEqual([]);
  });
});

describe('formatCurrent', () => {
  it('formats a configured model prefix', () => {
    expect(formatCurrent('mistral-large')).toContain('in=$0.5/M');
  });

  it('returns NOT CONFIGURED for an unknown prefix', () => {
    expect(formatCurrent('nope')).toBe('NOT CONFIGURED');
  });
});
