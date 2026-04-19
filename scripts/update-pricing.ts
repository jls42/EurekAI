#!/usr/bin/env tsx
/**
 * Scrape Mistral model pricing from official documentation pages.
 * Usage: npx tsx scripts/update-pricing.ts
 *
 * Fetches each model's doc page, extracts pricing info, and displays
 * a comparison with current values in helpers/pricing.ts.
 * Manual update is required — this script is informational only.
 */

import { PRICING_SOURCES, MODEL_PRICING } from '../helpers/pricing.js';

const PRICE_PATTERNS: readonly RegExp[] = [
  /\$(\d+(?:\.\d+)?)\s*\/M\s*(?:input\s*)?Tokens?/gi,
  /\$(\d+(?:\.\d+)?)\s*\/M\s*Chars?/gi,
  /\$(\d+(?:\.\d+)?)\s*(?:per|\/)\s*[\d,]+\s*(?:annotated\s*)?pages?/gi,
  /\$(\d+(?:\.\d+)?)\s*(?:per|\/)\s*min(?:ute)?/gi,
];

export function extractPrices(html: string): string[] {
  const prices: string[] = [];
  for (const pattern of PRICE_PATTERNS) {
    const found = html.match(pattern);
    if (found) prices.push(...found);
  }
  if (!prices.length && html.includes('$0')) prices.push('$0 (free)');
  return prices;
}

export function formatCurrent(prefix: string): string {
  const current = MODEL_PRICING[prefix];
  if (!current) return 'NOT CONFIGURED';
  return `${current.unit}: in=$${current.inputPerMillion}/M, out=$${current.outputPerMillion}/M`;
}

export function formatPricingReport(prefix: string, prices: string[]): string {
  const found = prices.length ? prices.join(', ') : 'no pricing detected (JS-rendered page?)';
  return `  ${prefix}:\n    Current: ${formatCurrent(prefix)}\n    Found:   ${found}`;
}

async function fetchPricing(prefix: string, url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return `  ${prefix}: HTTP ${res.status}`;
    const html = await res.text();
    return formatPricingReport(prefix, extractPrices(html));
  } catch (e: any) {
    return `  ${prefix}: ERROR ${e.message}`;
  }
}

async function main() {
  console.log('Fetching Mistral model pricing...\n');

  const results = await Promise.all(
    Object.entries(PRICING_SOURCES).map(([prefix, url]) => fetchPricing(prefix, url)),
  );

  console.log('Results:\n');
  for (const r of results) console.log(r);
  console.log('\nNote: Mistral pricing pages are JS-rendered. If no pricing is detected,');
  console.log('check the URLs manually in a browser and update helpers/pricing.ts.');
}

main().catch(console.error);
