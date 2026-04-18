// Helper partagé pour parser les marqueurs de sources dans le texte des fiches.
// Consommé par :
//  - helpers.ts:referencedSourceNums (listing des sources référencées pour dim/undim)
//  - render.ts:renderWithSources (transformation en badges cliquables)
// Garde une source de vérité unique pour la regex : toute divergence entre les deux
// call-sites recrée la régression "pastilles manquantes sur format dégradé".

// Stratégie multi-passes pour éviter tout risque de backtracking catastrophique
// (règle SonarQube typescript:S5852) :
//   1. Regex simple `\[Source([^\]]+)\]` — classe négée, linéaire par construction.
//   2. Parse manuel du contenu capturé via split(',') + trim + extraction numérique.
// Couvre les formats :
//   [Source N]                  canonique simple
//   [Source N][Source M]        canonique multi (deux matchs consécutifs)
//   [Source N, M]               dégradé "liste de numéros"
//   [Source N, Source M]        dégradé "préfixe répété dans liste"
//   [Source N,M]                espaces absents
const SOURCE_MARKER_RE = /\[Source([^\]]+)\]/gi;

/** Extract all numeric IDs from the inner content of a [Source ...] bracket. */
function parseInnerToNums(inner: string): number[] {
  const nums: number[] = [];
  for (const part of inner.split(',')) {
    const trimmed = part.replace(/^\s*Source\s*/i, '').trim();
    const n = Number.parseInt(trimmed, 10);
    if (Number.isFinite(n)) nums.push(n);
  }
  return nums;
}

/** Extract all source numbers from a text containing [Source N] markers (single or multi). */
export function extractSourceNums(text: string): number[] {
  const nums: number[] = [];
  for (const m of text.matchAll(SOURCE_MARKER_RE)) {
    nums.push(...parseInnerToNums(m[1]));
  }
  return nums;
}

/**
 * Normalise a text by splitting multi-refs into adjacent canonical brackets.
 * Idempotent : normalize(normalize(x)) === normalize(x).
 *
 * Input  : "barrages [Source 13, 20] et eoliennes [Source 5, Source 7]"
 * Output : "barrages [Source 13][Source 20] et eoliennes [Source 5][Source 7]"
 */
export function normalizeSourceMarkers(text: string): string {
  return text.replaceAll(SOURCE_MARKER_RE, (match, inner: string) => {
    const nums = parseInnerToNums(inner);
    if (nums.length === 0) return match;
    return nums.map((n) => `[Source ${n}]`).join('');
  });
}
