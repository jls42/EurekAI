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

async function fetchPricing(prefix: string, url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return `  ${prefix}: HTTP ${res.status}`;
    const html = await res.text();

    // Extract pricing patterns from rendered HTML
    const prices: string[] = [];

    // Token pricing: "$X.XX /M Tokens" or "$X.XX/M Tokens"
    const tokenMatch = html.match(/\$(\d+(?:\.\d+)?)\s*\/M\s*(?:input\s*)?Tokens?/gi);
    if (tokenMatch) prices.push(...tokenMatch);

    // Character pricing: "$X /M Chars"
    const charMatch = html.match(/\$(\d+(?:\.\d+)?)\s*\/M\s*Chars?/gi);
    if (charMatch) prices.push(...charMatch);

    // Page pricing: "$X /1,000 pages"
    const pageMatch = html.match(/\$(\d+(?:\.\d+)?)\s*(?:per|\/)\s*[\d,]+\s*(?:annotated\s*)?pages?/gi);
    if (pageMatch) prices.push(...pageMatch);

    // Per-minute pricing: "$X.XXX /min"
    const minMatch = html.match(/\$(\d+(?:\.\d+)?)\s*(?:per|\/)\s*min(?:ute)?/gi);
    if (minMatch) prices.push(...minMatch);

    // Free
    if (html.includes('$0') && !prices.length) prices.push('$0 (free)');

    const current = MODEL_PRICING[prefix];
    const currentStr = current
      ? `${current.unit}: in=$${current.inputPerMillion}/M, out=$${current.outputPerMillion}/M`
      : 'NOT CONFIGURED';

    return `  ${prefix}:\n    Current: ${currentStr}\n    Found:   ${prices.length ? prices.join(', ') : 'no pricing detected (JS-rendered page?)'}`;
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
