#!/usr/bin/env tsx
/**
 * Compare les prix configurés (`helpers/pricing.ts`) aux prix RÉELS des model-cards Mistral.
 *
 * Les pages de tarifs sont JS-rendered (Next.js RSC) : un simple `fetch()` ne voit PAS les prix
 * (ils sont injectés à l'hydratation). On rend donc chaque page via **Lightpanda**
 * (`@lightpanda/browser`, le même moteur headless que le scraping de sources de l'app, cf.
 * `helpers/index.ts` `fetchWithLightpanda`) et on extrait les `$prix` du markdown rendu.
 *
 * Informatif (mise à jour manuelle) : affiche `Current` (configuré) vs `Found` (rendu, avec son
 * contexte d'unité). Lightpanda lance un navigateur par page → exécution **séquentielle** et lente.
 *
 * Usage : `npx tsx scripts/update-pricing.ts [filtre-prefix]`
 *   ex. `npx tsx scripts/update-pricing.ts mistral-ocr` (un seul modèle, rapide).
 */
import { pathToFileURL } from 'node:url';
import { lightpanda } from '@lightpanda/browser';
import { PRICING_SOURCES, MODEL_PRICING } from '../helpers/pricing.js';

async function renderMarkdown(url: string): Promise<string> {
  const r = await lightpanda.fetch(url, { dump: true, dumpOptions: { type: 'markdown' } });
  const text = typeof r === 'string' ? r : r.toString('utf-8');
  return text.trim();
}

/**
 * Extrait les prix (`$N`) du markdown rendu AVEC leur contexte (lignes adjacentes = label d'unité).
 * Robuste à l'ordre valeur/unité : `$2` puis `/1000 Pages` (OCR) comme `Input (/M tokens)` puis `$0.5`.
 */
// Un vrai prix a une unité tarifaire adjacente — exclut les `$0` parasites (sections Speed/Features
// des model-cards) qui empêcheraient le fallback page-tarifs (ex. moderation).
const PRICE_UNIT = /tokens|pages|char|\/M\b|\/1000|\/min|per (1k|min|million)/i;

export function extractPriceSnippets(markdown: string, anchor?: RegExp): string[] {
  const lines = markdown
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    if (/^\$\d/.test(lines[i])) {
      const snippet = `${lines[i - 1] ?? ''} ${lines[i]} ${lines[i + 1] ?? ''}`
        .replace(/\s+/g, ' ')
        .trim();
      if (PRICE_UNIT.test(snippet) && (!anchor || anchor.test(snippet))) out.add(snippet);
    }
  }
  return [...out];
}

export function formatCurrent(prefix: string): string {
  const c = MODEL_PRICING[prefix];
  if (!c) return 'NOT CONFIGURED';
  return `${c.unit}: in=$${c.inputPerMillion}/M, out=$${c.outputPerMillion}/M`;
}

// La page tarifs globale (onglet API) liste TOUS les modèles : fallback pour ceux dont la model-card
// n'expose pas de widget prix (ex. moderation), filtré par une ancre (nom/id du modèle).
const PRICING_PAGE = 'https://mistral.ai/pricing/#api';
const PAGE_FALLBACK: Record<string, RegExp> = {
  'mistral-moderation': /moderation/i,
};

async function reportModel(prefix: string, url: string): Promise<string> {
  try {
    let snippets = extractPriceSnippets(await renderMarkdown(url));
    const fallback = PAGE_FALLBACK[prefix];
    if (!snippets.length && fallback) {
      snippets = extractPriceSnippets(await renderMarkdown(PRICING_PAGE), fallback);
    }
    const found = snippets.length ? snippets.slice(0, 8).join('  •  ') : 'aucun prix rendu';
    return `  ${prefix}:\n    Current: ${formatCurrent(prefix)}\n    Found:   ${found}`;
  } catch (e) {
    return `  ${prefix}: ERROR ${e instanceof Error ? e.message : String(e)}`;
  }
}

async function main(): Promise<void> {
  const filter = process.argv[2];
  const entries = Object.entries(PRICING_SOURCES).filter(([p]) => !filter || p.includes(filter));
  console.log(`Rendu Lightpanda des tarifs Mistral (${entries.length} modèle(s), séquentiel)...\n`);
  for (const [prefix, url] of entries) {
    // eslint-disable-next-line no-await-in-loop -- séquentiel volontaire : un navigateur Lightpanda par page, le parallélisme les empilerait
    console.log(await reportModel(prefix, url));
  }
  console.log(
    '\nNote: comparaison manuelle — vérifier Current vs Found, mettre à jour pricing.ts si écart.',
  );
}

// Guard CLI (robuste ESM/tsx) : ne lance main() que si exécuté directement, pas à l'import (tests).
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((e: unknown) => {
    console.error(e);
  });
}
