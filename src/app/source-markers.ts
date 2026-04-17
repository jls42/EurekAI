// Helper partagé pour parser les marqueurs de sources dans le texte des fiches.
// Consommé par :
//  - helpers.ts:referencedSourceNums (listing des sources référencées pour dim/undim)
//  - render.ts:renderWithSources (transformation en badges cliquables)
// Garde une source de vérité unique pour la regex : toute divergence entre les deux
// call-sites recrée la régression "pastilles manquantes sur format dégradé".

// Regex tolérante. Couvre :
//   [Source N]                  canonique simple
//   [Source N][Source M]        canonique multi (rendu via 2 matchs consécutifs)
//   [Source N, M]               dégradé "liste de numéros"
//   [Source N, Source M]        dégradé "préfixe répété dans liste"
//   [Source N,M]                espaces absents
// Le préfixe "Source" devant chaque numéro additionnel est optionnel, les espaces sont libres.
const SOURCE_MARKER_RE = /\[Source\s*(\d+(?:\s*,\s*(?:Source\s*)?\d+)*)\]/gi;

function parsePartToNum(part: string): number {
  return Number.parseInt(part.replace(/^Source\s*/i, '').trim(), 10);
}

/** Extract all source numbers from a text containing [Source N] markers (single or multi). */
export function extractSourceNums(text: string): number[] {
  const nums: number[] = [];
  for (const m of text.matchAll(SOURCE_MARKER_RE)) {
    for (const part of m[1].split(/\s*,\s*/)) {
      const n = parsePartToNum(part);
      if (Number.isFinite(n)) nums.push(n);
    }
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
  return text.replace(SOURCE_MARKER_RE, (_, inner: string) =>
    inner
      .split(/\s*,\s*/)
      .map((p) => `[Source ${parsePartToNum(p)}]`)
      .join(''),
  );
}
