#!/usr/bin/env tsx
/**
 * Surveille les modèles Mistral en CROISANT deux sources de vérité (PAS de table de dates manuelle qui
 * dérive — leçon OCR 3) :
 *   1. API `/v1/models` : résout les alias `-latest` → version courante + champ `deprecation`.
 *   2. Page overview (https://docs.mistral.ai/models/overview, rendue via Lightpanda car JS-rendered) :
 *      la table « Legacy/Deprecated » expose les dates de RETRAIT + le modèle de remplacement, que
 *      l'API n'expose pas (et corrige les `deprecation: null` incomplets côté API).
 *
 * Détecte les alias `-latest` utilisés par l'app qui pointeraient vers une version dépréciée ou retirée
 * (piège `mistral-moderation-latest` → `mistral-moderation-2411`), en enrichissant l'alerte avec la date
 * de retrait réelle + l'alternative recommandée quand l'overview est disponible.
 *
 * Informatif et **NON BLOQUANT** : `exit 0` toujours, skip sans `MISTRAL_API_KEY`, tolérant au shape de
 * l'API, dégrade gracieusement au diagnostic API-seul si l'overview/Lightpanda échoue. Appelé par
 * `scripts/check-deps.sh` (`|| true`). Usage direct : `npx tsx scripts/check-models.ts`.
 */
import { pathToFileURL } from 'node:url';
import { lightpanda } from '@lightpanda/browser';

// Alias `-latest` réellement résolus par EurekAI. Le champ `deprecation` de l'API les concernant doit
// rester `null` ET leur version ne doit pas figurer dans la table Legacy de l'overview ; sinon Mistral a
// basculé l'alias vers une version en fin de vie sans repointage.
const WATCHED_ALIASES = [
  'mistral-large-latest',
  'mistral-medium-latest',
  'mistral-small-latest',
  'mistral-moderation-latest',
  'mistral-ocr-latest',
  'voxtral-mini-latest',
  'voxtral-mini-tts-latest',
];

const OVERVIEW_URL = 'https://docs.mistral.ai/models/overview';

interface ModelEntry {
  id: string;
  aliases?: string[];
  deprecation?: string | null;
}

interface LegacyEntry {
  apiId: string;
  deprecation?: string;
  retirement?: string;
  alternative?: string;
}

// Cellule markdown type `[OCR 4 ↗](https://…)` → texte du lien `OCR 4` ; sans lien → cellule brute.
// indexOf plutôt qu'une regex `\[([^\]]+)\]` (flaggée sonarjs/slow-regex, faux positif backtracking linéaire).
const linkText = (cell: string): string => {
  const open = cell.indexOf('[');
  const close = cell.indexOf(']', open + 1);
  const inner = open >= 0 && close > open ? cell.slice(open + 1, close) : cell;
  return inner.replace(/↗/g, '').trim();
};

// L'API id de la table est `mistral\-ocr\-2505` (tirets échappés markdown) → dé-échapper en `mistral-ocr-2505`.
const deEscapeApiId = (cell: string): string => linkText(cell).replace(/\\/g, '').trim();

// Deux dates COLLÉES dans la cellule « DeprecationRetirement » (ex. `2/27/20265/31/2026`) → [dep, ret].
const DATE_RE = /\d{1,2}\/\d{1,2}\/\d{4}/g;
const isModelId = (id: string): boolean => id.includes('-') && /^[a-z][a-z0-9.-]*$/i.test(id);
// `.at(i)` plutôt que `cells[i]` : évite le faux positif security/detect-object-injection (lecture à index variable).
const cell = (cells: string[], i: number): string => cells.at(i) ?? '';
// Une alternative valide a du texte (rejette les cellules vides ou `-` → pas de « remplacer par - »).
const cleanAlt = (alt: string): string | undefined => (/[a-z]/i.test(alt) ? alt : undefined);

// Une ligne de la table Legacy → entrée, ou null (header, séparateur, ligne hors modèle). Helpers extraits
// (`cell`/`cleanAlt`/`linkText`) pour garder le CCN sous le seuil Lizard malgré les cellules optionnelles.
const parseLegacyRow = (line: string): LegacyEntry | null => {
  if (!line.trim().startsWith('|')) return null;
  const cells = line.split('|').map((c) => c.trim());
  const apiId = deEscapeApiId(cell(cells, 3));
  if (!isModelId(apiId)) return null;
  const dates = cell(cells, 4).match(DATE_RE) ?? [];
  return {
    apiId,
    deprecation: dates[0],
    retirement: dates[1],
    alternative: cleanAlt(linkText(cell(cells, 5))),
  };
};

/**
 * Parse la table « Legacy/Deprecated » de l'overview (markdown rendu) en `Map<apiId, {dep, ret, alt}>`.
 * Fonction PURE (testable) : ignore header/séparateur et toute ligne dont la 3e cellule n'est pas un id
 * de modèle. Renvoie une Map vide si aucune table n'est présente (page sans Legacy / rendu vide).
 */
export function parseLegacyTable(markdown: string): Map<string, LegacyEntry> {
  const out = new Map<string, LegacyEntry>();
  for (const line of markdown.split('\n')) {
    const entry = parseLegacyRow(line);
    if (entry) out.set(entry.apiId, entry);
  }
  return out;
}

const buildAliasMap = (models: ModelEntry[]): Map<string, ModelEntry> => {
  const byAlias = new Map<string, ModelEntry>();
  for (const m of models) {
    for (const alias of m.aliases ?? []) byAlias.set(alias, m);
  }
  return byAlias;
};

const formatWarning = (
  alias: string,
  id: string,
  deprecation: string | undefined,
  legacy: LegacyEntry | undefined,
): string => {
  const parts = [`${alias} → ${id} en fin de vie`];
  if (deprecation) parts.push(`déprécié ${deprecation}`);
  if (legacy?.retirement) parts.push(`retiré ${legacy.retirement}`);
  if (legacy?.alternative) parts.push(`→ remplacer par ${legacy.alternative}`);
  return parts.join(' · ');
};

const evalAlias = (
  alias: string,
  byAlias: Map<string, ModelEntry>,
  legacy: Map<string, LegacyEntry>,
): string | null => {
  const target = byAlias.get(alias);
  if (!target) return null;
  const legacyEntry = legacy.get(target.id);
  const deprecation = target.deprecation ?? legacyEntry?.deprecation;
  if (!deprecation && !legacyEntry) return null;
  return formatWarning(alias, target.id, deprecation ?? undefined, legacyEntry);
};

/**
 * Renvoie un avertissement par alias surveillé pointant vers une version dépréciée (API) OU retirée
 * (table Legacy de l'overview). Croise les deux sources : la table Legacy rattrape les `deprecation: null`
 * incomplets de l'API et enrichit l'alerte (date de retrait + alternative). Tolérant au shape.
 */
export function analyzeModels(
  models: ModelEntry[],
  legacy = new Map<string, LegacyEntry>(),
): string[] {
  const byAlias = buildAliasMap(models);
  const warnings: string[] = [];
  for (const alias of WATCHED_ALIASES) {
    const w = evalAlias(alias, byAlias, legacy);
    if (w) warnings.push(w);
  }
  return warnings;
}

export async function fetchModels(key: string): Promise<ModelEntry[]> {
  const res = await fetch('https://api.mistral.ai/v1/models', {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { data?: ModelEntry[] };
  return data.data ?? [];
}

// I/O Lightpanda (non testée : navigateur headless ~40 s/page). Rend l'overview JS et parse la table.
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- Codacy ESLint ne résout pas les types @lightpanda/browser (faux positifs) ; couvert par lint:ci local type-aware */
const fetchLegacyTable = async (): Promise<Map<string, LegacyEntry>> => {
  const r = await lightpanda.fetch(OVERVIEW_URL, { dump: true, dumpOptions: { type: 'markdown' } });
  const md = typeof r === 'string' ? r : r.toString('utf-8');
  return parseLegacyTable(md);
};
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

// Dégradation gracieuse : un échec overview (réseau/Lightpanda) ne casse pas le diagnostic API-seul.
const loadLegacyTable = async (): Promise<Map<string, LegacyEntry>> => {
  try {
    return await fetchLegacyTable();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`check-models: overview indisponible (${msg}) — diagnostic API seul.`);
    return new Map();
  }
};

const reportWarnings = (warnings: string[]): void => {
  if (warnings.length === 0) {
    console.log(`check-models: ${WATCHED_ALIASES.length} alias OK (aucun déprécié/retiré).`);
    return;
  }
  console.log('check-models: ⚠ alias pointant vers un modèle déprécié ou retiré :');
  for (const w of warnings) console.log(`  - ${w}`);
  console.log('  → pinner explicitement la version courante (cf. generators/moderation.ts).');
};

export async function main(): Promise<void> {
  // Lancé via check-deps.sh (qui source .env) → process.env peuplé. En standalone, sourcer .env
  // avant (cf. CLAUDE.md « API Mistral en local »), sinon skip gracieux.
  const key = process.env.MISTRAL_API_KEY;
  if (!key) {
    console.log('check-models: MISTRAL_API_KEY absent (source .env avant) — skip (non bloquant).');
    return;
  }
  try {
    const models = await fetchModels(key);
    const legacy = await loadLegacyTable();
    reportWarnings(analyzeModels(models, legacy));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`check-models: vérification impossible (${msg}) — skip (non bloquant).`);
  }
}

// Guard CLI (robuste ESM/tsx) : ne lance main() que si exécuté directement, pas à l'import (tests).
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  void main();
}
