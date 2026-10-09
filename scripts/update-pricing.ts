#!/usr/bin/env tsx
/**
 * Compare les prix configurés (`helpers/pricing.ts`) aux prix RÉELS des model-cards Mistral.
 *
 * Les prix figurent dans le HTML SSR des pages (vérifié le 2026-09-26 : `$ 4 /1000 Pages`, payload
 * `"pricing":{…}`), mais valeur et unité y sont dispersées : on rend donc chaque page en markdown via
 * **Lightpanda** (`@lightpanda/browser`, le même moteur headless que le scraping de sources de
 * l'app, cf. `helpers/index.ts` `fetchWithLightpanda`) et on extrait les `$prix` (ou « Free » = $0)
 * avec leurs lignes voisines.
 *
 * Informatif (mise à jour manuelle) : affiche `Current` (configuré) vs `Found` (rendu, avec son
 * contexte d'unité). Lightpanda lance un navigateur par page → exécution **séquentielle**.
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

// Un vrai prix `$N` a une unité tarifaire adjacente — exclut les `$0` parasites (sections
// Speed/Features des model-cards) qui empêcheraient le fallback page-tarifs.
const PRICE_UNIT = /tokens|pages|char|\/M\b|\/1000|\/min|per (1k|min|million)/i;
// Un modèle gratuit affiche « Free » (EN) / « Gratuit » (FR) SEUL sur sa ligne et SANS unité (fiche :
// `Price` / `i` / `Free` ; page tarifs : `Classifier APIs` / `Free`) → équivaut à $0. Ligne entière
// exigée : l'infobulle « Free for a limited amount of time. » ne matche pas.
const FREE_LINE = /^(free|gratuit)$/i;
// Prix en promotion : tarif public barré en tête de ligne, `~~Original price: $1.36~~Sale price: $0.68`
// (fiche de Large 4 à son lancement, rendu du 2026-10-08) ; sans ce préfixe, « aucun prix rendu ».
const DOLLAR_LINE = /^(?:~~Original price: )?\$\d/;

const isPriceLine = (line = ''): boolean => FREE_LINE.test(line) || DOLLAR_LINE.test(line);

// Page tarifs : un bloc modèle = icône / nom / description / catégorie / prix. Le bloc d'un prix
// commence juste après le prix précédent → l'ancre n'y voit ni la description d'un voisin
// (« …tasks, like moderation » du Classifier 8B) ni l'icône du modèle suivant.
// `.at()` plutôt que `lines[k]` : évite le faux positif security/detect-object-injection.
const blockStart = (lines: readonly string[], i: number): number => {
  let start = i;
  while (start > 0 && !isPriceLine(lines.at(start - 1))) start--;
  return start;
};

const matchesAnchor = (lines: readonly string[], i: number, anchor?: RegExp): boolean =>
  !anchor || anchor.test(lines.slice(blockStart(lines, i), i + 1).join(' '));

// `$N` exige une unité adjacente ; « Free » n'en a jamais (et ne peut pas être un `$0` parasite).
const isPrice = (line: string, snippet: string): boolean =>
  FREE_LINE.test(line) || (DOLLAR_LINE.test(line) && PRICE_UNIT.test(snippet));

/**
 * Extrait les prix (`$N`, ou « Free »/« Gratuit » = $0) du markdown rendu AVEC leur contexte (lignes
 * adjacentes = label d'unité). Robuste à l'ordre valeur/unité : `$2` puis `/1000 Pages` (OCR) comme
 * `Input (/M tokens)` puis `$0.5`. `anchor` (fallback page tarifs) : nom du modèle, cherché dans le
 * BLOC du prix (depuis le prix précédent), pas seulement sur ±1 ligne.
 */
export function extractPriceSnippets(markdown: string, anchor?: RegExp): string[] {
  const lines = markdown
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    const price = FREE_LINE.test(lines[i]) ? `${lines[i]} (= $0)` : lines[i];
    const snippet = `${lines[i - 1] ?? ''} ${price} ${lines[i + 1] ?? ''}`
      .replace(/\s+/g, ' ')
      .trim();
    if (isPrice(lines[i], snippet) && matchesAnchor(lines, i, anchor)) out.add(snippet);
  }
  return [...out];
}

export function formatCurrent(prefix: string): string {
  const c = MODEL_PRICING[prefix];
  if (!c) return 'NOT CONFIGURED';
  return `${c.unit}: in=$${c.inputPerMillion}/M, out=$${c.outputPerMillion}/M`;
}

// Page tarifs API (forme canonique avec `/` final : sans lui, 301 ; `/pricing/#api` affiche désormais
// les formules Plans, sans tarifs API) : liste TOUS les modèles → fallback pour ceux dont la
// model-card n'expose pas de prix, filtré par une ancre = NOM du modèle (`Mistral Moderation 2`, id
// `mistral\-moderation…` échappé compris), jamais le mot seul (« like moderation » d'un voisin,
// icône `Icon-Model-Moderation.svg`).
const PRICING_PAGE = 'https://mistral.ai/pricing/api/';
export const PAGE_FALLBACK: Record<string, RegExp> = {
  'mistral-moderation': /mistral\W*moderation/i,
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
