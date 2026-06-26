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
export function extractPriceSnippets(markdown: string): string[] {
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
      out.add(snippet);
    }
  }
  return [...out];
}

export function formatCurrent(prefix: string): string {
  const c = MODEL_PRICING[prefix];
  if (!c) return 'NOT CONFIGURED';
  return `${c.unit}: in=$${c.inputPerMillion}/M, out=$${c.outputPerMillion}/M`;
}

async function reportModel(prefix: string, url: string): Promise<string> {
  try {
    const snippets = extractPriceSnippets(await renderMarkdown(url));
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

main().catch((e: unknown) => {
  console.error(e);
});
