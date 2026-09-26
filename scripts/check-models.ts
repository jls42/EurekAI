#!/usr/bin/env tsx
/**
 * Surveille les modèles Mistral que l'app ENVOIE réellement, en CROISANT deux sources de vérité
 * (PAS de table de dates manuelle qui dérive — leçon OCR 3) :
 *   1. API `/v1/models` : chaque nom y est sa PROPRE entrée, qui porte ses frères dans `aliases` →
 *      groupe (alias ↔ versions) résolu indépendamment de l'ordre + champ `deprecation`.
 *   2. Page overview (https://docs.mistral.ai/models/overview, rendue en markdown via Lightpanda — la
 *      table figure aussi dans le HTML SSR, le markdown est simplement plus facile à parser) :
 *      la table « Legacy/Deprecated » expose les dates de RETRAIT + le modèle de remplacement, que
 *      l'API n'expose pas (et corrige les `deprecation: null` incomplets côté API).
 *
 * Alertes (à traiter) sur `WATCHED_MODELS` (alias `-latest` résolus par l'app + versions épinglées
 * importées des sources uniques) :
 *   - nom absent de `/v1/models` (piège 2026-09 : `mistral-moderation-latest` n'y est plus listé) ;
 *   - alias ambigu : plusieurs groupes distincts le listent (jamais « la 1re entrée gagne ») ;
 *   - groupe déprécié (API) ou listé Legacy, via l'id OU un frère (piège 2026-06 :
 *     `mistral-moderation-latest` → `2411`) ;
 *   - défaut épinglé `P-M-m` en retard sur l'alias de sa génération `P-M` (piège 2026-09 :
 *     `mistral-ocr-4-0` alors que `mistral-ocr-4` → `mistral-ocr-4-1`), sauf retard assumé.
 * Informations (à lire) : retard assumé sur UN candidat documenté, nouvelle génération (`P-latest`),
 * modèle non suivi dans la famille d'un épinglé sans alias (modération).
 *
 * Informatif et **NON BLOQUANT** : `exit 0` toujours, skip sans `MISTRAL_API_KEY`, tolérant au shape de
 * l'API, dégrade gracieusement au diagnostic API-seul si l'overview/Lightpanda échoue ou rend une
 * table Legacy vide ou partielle (legacyTableProblem). Appelé par
 * `scripts/check-deps.sh` (clé exportée, `timeout`, `|| true`). Usage direct :
 * `(set -a; . ./.env; set +a; npx tsx scripts/check-models.ts)` ou
 * `npx tsx --env-file=.env scripts/check-models.ts`.
 */
import { pathToFileURL } from 'node:url';
import { lightpanda } from '@lightpanda/browser';
import { MODERATION_MODEL } from '../helpers/moderation-model.js';
import { DEFAULT_OCR_MODEL, OCR_DEFAULT_ACCEPTED_LAG, OCR_MODELS } from '../helpers/ocr-models.js';

// Alias `-latest` RÉSOLUS par l'app à l'exécution (défauts config/générateurs, Réglages, routeur,
// STT, TTS). Ni `mistral-ocr-latest` ni `mistral-moderation-latest` : l'app envoie des versions
// épinglées (sources uniques ci-dessous), jamais ces alias.
const WATCHED_ALIASES = [
  'mistral-large-latest',
  'mistral-medium-latest',
  'mistral-small-latest',
  'voxtral-mini-latest',
  'voxtral-mini-tts-latest',
];

/** Tout id que l'app envoie tel quel à l'API : alias ci-dessus + versions épinglées (sources uniques). */
export const WATCHED_MODELS: readonly string[] = [
  ...WATCHED_ALIASES,
  ...OCR_MODELS,
  MODERATION_MODEL,
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

/** Retard assumé d'un défaut épinglé, lié à UN candidat précis (cf. OCR_DEFAULT_ACCEPTED_LAG). */
interface AcceptedLag {
  candidate: string;
  since: string;
  reason: string;
}

/** Défaut épinglé major-minor `P-M-m`, suivi dans sa génération (`P-M`) puis face à `P-latest`. */
interface TrackedDefault {
  pinned: string;
  acceptedLag?: AcceptedLag;
}

/** Épinglé sans alias listé : veille des autres modèles de sa famille (`family-…`). */
interface FamilyWatch {
  family: string;
  pinned: string;
  hint: string;
}

/** `alert` = à traiter (absent, ambigu, fin de vie, retard) ; `info` = à lire (choix, nouveauté). */
interface Finding {
  level: 'alert' | 'info';
  message: string;
}

// OCR 3 (`mistral-ocr-2512`, opt-in économique) est ancien PAR CHOIX : exclu EXPLICITEMENT des règles
// de retard comme de la veille de famille (test dédié) — seul le défaut OCR est suivi.
const TRACKED_DEFAULTS: readonly TrackedDefault[] = [
  { pinned: DEFAULT_OCR_MODEL, acceptedLag: OCR_DEFAULT_ACCEPTED_LAG },
];

// Épinglés SANS alias listé par /v1/models (ni génération ni `-latest` à suivre) : veille de famille,
// indépendante du schéma de nommage (daté `2603`, major-minor `3-0`…) — remplace toute règle YYMM.
const FAMILY_WATCHES: readonly FamilyWatch[] = [
  {
    family: 'mistral-moderation',
    pinned: MODERATION_MODEL,
    hint: 'évaluer (taxonomie, prix) avant de changer MODERATION_MODEL',
  },
];

// Défaut de paramètre en CONSTANTE : Lizard ne mesure pas une fonction dont un défaut contient un
// appel (`= new Map()`) → elle échapperait au plafond CCN 8 (cf. check-complexity.sh).
const NO_LEGACY: ReadonlyMap<string, LegacyEntry> = new Map();

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

// Complétude de la table Legacy, relevée sur la table réelle (2026-09-25 : 40 modèles). Seuil bas
// (la table ne fait que grandir) + sentinelles retirées depuis longtemps, loin du début de la table :
// un rendu TRONQUÉ par Lightpanda ne passe plus pour complet.
const LEGACY_MIN_ROWS = 20;
const LEGACY_SENTINELS: readonly string[] = ['mistral-ocr-2505', 'mistral-moderation-2411'];

/**
 * Problème de la table Legacy lue, ou null si elle paraît complète. Fonction PURE : vide → table
 * introuvable ; moins de LEGACY_MIN_ROWS modèles ou une sentinelle absente → table partielle. Dans
 * tous les cas `main` bascule en diagnostic API seul (retraits NON vérifiés), jamais un faux « OK ».
 */
export const legacyTableProblem = (legacy: ReadonlyMap<string, LegacyEntry>): string | null => {
  if (legacy.size === 0) return 'table Legacy introuvable (0 ligne)';
  if (legacy.size < LEGACY_MIN_ROWS) {
    return `table Legacy partielle : ${legacy.size} modèles lus, au moins ${LEGACY_MIN_ROWS} attendus`;
  }
  const missing = LEGACY_SENTINELS.filter((id) => !legacy.has(id));
  return missing.length > 0
    ? `table Legacy partielle : sentinelle(s) absente(s) ${missing.join(', ')}`
    : null;
};

const alertFinding = (message: string): Finding => ({ level: 'alert', message });
const infoFinding = (message: string): Finding => ({ level: 'info', message });
const isFinding = (f: Finding | null): f is Finding => f !== null;

const hasAlias = (m: ModelEntry, name: string): boolean => (m.aliases ?? []).includes(name);

// Ordre des unités de code : total et indépendant de la locale (localeCompare ne l'est pas).
const byCodeUnit = (a: string, b: string): number => (a < b ? -1 : Number(a > b));

// Groupe d'une entrée = son id + ses frères (`aliases`), dédoublonné et TRIÉ : forme canonique,
// comparable d'une entrée à l'autre quel que soit l'ordre de la liste ou des alias.
const groupOf = (m: ModelEntry): string[] =>
  [...new Set([m.id, ...(m.aliases ?? [])])].sort(byCodeUnit);

// Groupes DISTINCTS (par forme canonique) d'une liste d'entrées, triés : même résultat — donc mêmes
// messages — quel que soit l'ordre de la liste.
const distinctGroups = (entries: readonly ModelEntry[]): string[][] => {
  const byKey = new Map<string, string[]>();
  for (const m of entries) {
    const ids = groupOf(m);
    byKey.set(ids.join(' '), ids);
  }
  return [...byKey.entries()].sort(([a], [b]) => byCodeUnit(a, b)).map(([, ids]) => ids);
};

// Entrées portant un nom : celles dont l'id EST ce nom (forme réelle de l'API) ; à défaut, celles
// qui le listent en alias.
const entriesNamed = (models: readonly ModelEntry[], name: string): ModelEntry[] => {
  const own = models.filter((m) => m.id === name);
  return own.length > 0 ? own : models.filter((m) => hasAlias(m, name));
};

type Resolution =
  | { kind: 'missing' }
  | { kind: 'found'; ids: string[] }
  | { kind: 'ambiguous'; groups: string[][] };

/**
 * Groupe d'un nom dans `/v1/models`, indépendant de l'ordre de la liste : l'entrée dont l'id EST ce
 * nom (elle porte ses frères dans `aliases`) ; à défaut, les entrées qui le listent en alias, si elles
 * forment un seul et même groupe (mêmes ids + alias). Plusieurs groupes distincts → `ambiguous`
 * (jamais « la 1re entrée gagne ») ; aucune entrée → `missing`.
 */
export const resolveGroup = (models: readonly ModelEntry[], name: string): Resolution => {
  const groups = distinctGroups(entriesNamed(models, name));
  if (groups.length === 0) return { kind: 'missing' };
  return groups.length === 1 ? { kind: 'found', ids: groups[0] } : { kind: 'ambiguous', groups };
};

// Id affiché pour un groupe : la version datée (`-2604`), sinon major-minor (`-4-1`), sinon le 1er id.
const DATED_ID = /-\d{4}$/;
const MAJOR_MINOR_ID = /-\d+-\d+$/;
const displayId = (ids: readonly string[]): string =>
  ids.find((id) => DATED_ID.test(id)) ?? ids.find((id) => MAJOR_MINOR_ID.test(id)) ?? ids[0];

const ambiguousAlert = (name: string, groups: readonly string[][]): Finding =>
  alertFinding(
    `${name} : alias ambigu, listé par ${groups.length} groupes distincts (${groups.map(displayId).join(', ')}) — vérifier GET /v1/models/${name}`,
  );

// Groupe déprécié si UNE de ses entrées l'est (robuste à un marquage partiel côté API).
const groupDeprecation = (
  models: readonly ModelEntry[],
  ids: readonly string[],
): string | undefined =>
  models.find((m) => ids.includes(m.id) && Boolean(m.deprecation))?.deprecation ?? undefined;

// Ligne Legacy de l'id OU d'un frère — jamais d'un id de même préfixe hors du groupe.
const legacyOf = (
  ids: readonly string[],
  legacy: ReadonlyMap<string, LegacyEntry>,
): LegacyEntry | undefined => ids.map((id) => legacy.get(id)).find((e) => e !== undefined);

// Groupe utilisable : ni déprécié côté API, ni listé Legacy.
const isCurrent = (
  models: readonly ModelEntry[],
  ids: readonly string[],
  legacy: ReadonlyMap<string, LegacyEntry>,
): boolean => !groupDeprecation(models, ids) && !legacyOf(ids, legacy);

const formatWarning = (
  name: string,
  id: string,
  deprecation: string | undefined,
  legacy: LegacyEntry | undefined,
): string => {
  // Version épinglée (name === id) : pas de « X → X ».
  const parts = [name === id ? `${id} en fin de vie` : `${name} → ${id} en fin de vie`];
  if (deprecation) parts.push(`déprécié ${deprecation}`);
  if (legacy?.retirement) parts.push(`retiré ${legacy.retirement}`);
  if (legacy?.alternative) parts.push(`→ remplacer par ${legacy.alternative}`);
  return parts.join(' · ');
};

const endOfLife = (
  name: string,
  ids: readonly string[],
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry>,
): Finding | null => {
  const legacyEntry = legacyOf(ids, legacy);
  const deprecation = groupDeprecation(models, ids) ?? legacyEntry?.deprecation;
  if (!deprecation && !legacyEntry) return null;
  const id = legacyEntry?.apiId ?? displayId(ids);
  return alertFinding(formatWarning(name, id, deprecation, legacyEntry));
};

const evalName = (
  name: string,
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry>,
): Finding | null => {
  const r = resolveGroup(models, name);
  if (r.kind === 'missing') return null; // absence : signalée par findMissing
  if (r.kind === 'ambiguous') return ambiguousAlert(name, r.groups);
  return endOfLife(name, r.ids, models, legacy);
};

/**
 * Une alerte par nom surveillé ambigu, ou dont le GROUPE est déprécié (API) OU listé Legacy
 * (overview), y compris via un frère daté. La table Legacy rattrape les `deprecation: null`
 * incomplets de l'API et enrichit l'alerte (date de retrait + alternative). Tolérant au shape.
 */
export function analyzeModels(
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry> = NO_LEGACY,
  names: readonly string[] = WATCHED_MODELS,
): Finding[] {
  return names.map((n) => evalName(n, models, legacy)).filter(isFinding);
}

/**
 * Noms surveillés introuvables dans `/v1/models` (ni id, ni alias). `[]` si la liste est vide : une
 * API muette (shape inattendu) n'est pas un modèle retiré — `main` la signale à part.
 */
export function findMissing(
  models: readonly ModelEntry[],
  names: readonly string[] = WATCHED_MODELS,
): Finding[] {
  if (models.length === 0) return [];
  return names
    .filter((n) => resolveGroup(models, n).kind === 'missing')
    .map((n) =>
      alertFinding(
        `${n} absent de /v1/models : retiré ou renommé ? (GET /v1/models/${n} → « is deprecated » ou « was not found »)`,
      ),
    );
}

interface PinnedVersion {
  family: string; // `P`
  generation: string; // `P-M`, alias de génération
  minor: number; // `m`
}

const DIGITS = /^\d+$/;

// `P-M-m` → { family P, generation P-M, minor m } ; null pour tout autre id (daté `…-2512`, alias).
// Découpe par lastIndexOf plutôt qu'une regex `^(.+)-(\d+)-(\d+)$` sujette au backtracking.
const parsePinned = (id: string): PinnedVersion | null => {
  const minorAt = id.lastIndexOf('-');
  const majorAt = id.lastIndexOf('-', minorAt - 1);
  const minor = id.slice(minorAt + 1);
  const valid = majorAt > 0 && DIGITS.test(id.slice(majorAt + 1, minorAt)) && DIGITS.test(minor);
  if (!valid) return null;
  return { family: id.slice(0, majorAt), generation: id.slice(0, minorAt), minor: Number(minor) };
};

// Mineure `n` d'un id de la génération (`P-M-n`), sinon null.
const minorIn = (id: string, generation: string): number | null => {
  const rest = id.startsWith(`${generation}-`) ? id.slice(generation.length + 1) : '';
  return DIGITS.test(rest) ? Number(rest) : null;
};

// Dernière mineure de la génération PLUS RÉCENTE que l'épinglé (`P-M-n`, n > m) parmi `ids`.
const newestMinor = (ids: readonly string[], v: PinnedVersion): string | undefined => {
  let best: string | undefined;
  let bestMinor = v.minor;
  for (const id of ids) {
    const n = minorIn(id, v.generation);
    if (n !== null && n > bestMinor) {
      best = id;
      bestMinor = n;
    }
  }
  return best;
};

// Candidat = exactement le retard assumé → information ; tout autre candidat → alerte actionnable.
const lagFinding = (t: TrackedDefault, generation: string, candidate: string): Finding => {
  const accepted = t.acceptedLag;
  if (accepted?.candidate === candidate) {
    return infoFinding(
      `épinglage volontaire : ${t.pinned} conservé face à ${candidate} depuis ${accepted.since} (${accepted.reason}) — réévaluer à la prochaine mineure`,
    );
  }
  return alertFinding(
    `défaut épinglé ${t.pinned} en retard sur sa génération : ${generation} → ${candidate} — mettre à jour l'épinglage`,
  );
};

// (1) Génération : le groupe de l'alias `P-M` (ni déprécié, ni Legacy) contient une mineure `P-M-n`
// plus récente que l'épinglé — Mistral fait suivre à cet alias la dernière mineure (docs lifecycle).
const generationRule = (
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry>,
  t: TrackedDefault,
  v: PinnedVersion,
): Finding | null => {
  const r = resolveGroup(models, v.generation);
  if (r.kind === 'ambiguous') return ambiguousAlert(v.generation, r.groups);
  const current = r.kind === 'found' && isCurrent(models, r.ids, legacy);
  const candidate = current ? newestMinor(r.ids, v) : undefined;
  return candidate ? lagFinding(t, v.generation, candidate) : null;
};

// (2) Informatif, évalué seulement si (1) est muet : `P-latest` (dernière GA, toutes générations)
// ne contient pas l'épinglé → nouvelle génération possible, prix/compat à évaluer avant de bouger.
const latestRule = (
  models: readonly ModelEntry[],
  t: TrackedDefault,
  v: PinnedVersion,
): Finding | null => {
  const latest = `${v.family}-latest`;
  const r = resolveGroup(models, latest);
  if (r.kind === 'ambiguous') return ambiguousAlert(latest, r.groups);
  if (r.kind === 'missing' || r.ids.includes(t.pinned)) return null;
  return infoFinding(
    `nouvelle génération disponible : ${latest} → ${displayId(r.ids)} (défaut épinglé ${t.pinned}) — évaluer prix/compat avant de changer l'épinglage`,
  );
};

const lagOf = (
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry>,
  t: TrackedDefault,
): Finding | null => {
  const v = parsePinned(t.pinned);
  if (!v) return null;
  return generationRule(models, legacy, t, v) ?? latestRule(models, t, v);
};

/**
 * Au plus UNE ligne par défaut épinglé : retard dans sa génération (alerte, ou information si c'est
 * exactement le candidat du retard assumé), sinon nouvelle génération (information). Muet si ses
 * alias de référence sont absents de la liste.
 */
export function findLaggingDefaults(
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry> = NO_LEGACY,
  tracked: readonly TrackedDefault[] = TRACKED_DEFAULTS,
): Finding[] {
  return tracked.map((t) => lagOf(models, legacy, t)).filter(isFinding);
}

// Ids du groupe épinglé (frères compris, union si ambigu) : exclus de la veille de sa famille.
const pinnedGroupIds = (models: readonly ModelEntry[], pinned: string): ReadonlySet<string> =>
  new Set([pinned, ...distinctGroups(entriesNamed(models, pinned)).flat()]);

const familyFindings = (
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry>,
  w: FamilyWatch,
): Finding[] => {
  const pinnedIds = pinnedGroupIds(models, w.pinned);
  const others = models.filter(
    (m) => m.id.startsWith(`${w.family}-`) && !groupOf(m).some((id) => pinnedIds.has(id)),
  );
  return distinctGroups(others)
    .filter((ids) => isCurrent(models, ids, legacy))
    .map((ids) =>
      infoFinding(`modèle non suivi dans la famille ${w.family} : ${displayId(ids)} — ${w.hint}`),
    );
};

/**
 * Veille de famille des épinglés sans alias listé : UNE information par groupe dont un id commence
 * par `family-`, hors du groupe épinglé (frères exclus), ni déprécié ni Legacy — quel que soit son
 * schéma de nommage (`mistral-moderation-2611` comme `mistral-moderation-3-0`).
 */
export function findUntrackedFamilyModels(
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry> = NO_LEGACY,
  watches: readonly FamilyWatch[] = FAMILY_WATCHES,
): Finding[] {
  return watches.flatMap((w) => familyFindings(models, legacy, w));
}

/** Tous les constats de `main`, dans l'ordre d'affichage (le suivi des défauts est injectable). */
export function collectFindings(
  models: readonly ModelEntry[],
  legacy: ReadonlyMap<string, LegacyEntry>,
  tracked: readonly TrackedDefault[] = TRACKED_DEFAULTS,
): Finding[] {
  return [
    ...findMissing(models),
    ...analyzeModels(models, legacy),
    ...findLaggingDefaults(models, legacy, tracked),
    ...findUntrackedFamilyModels(models, legacy),
  ];
}

export async function fetchModels(key: string): Promise<ModelEntry[]> {
  const res = await fetch('https://api.mistral.ai/v1/models', {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { data?: ModelEntry[] };
  return data.data ?? [];
}

// I/O Lightpanda (non testée : navigateur headless, ~0,5-2 s mesuré le 2026-09-26). Rend l'overview
// en markdown et parse la table. Table vide = rendu ou format inattendu (page déplacée, colonnes
// renommées), table partielle = rendu tronqué (legacyTableProblem) : on le signale via le catch de
// loadLegacyTable plutôt que de conclure « rien de retiré » — sinon le diagnostic API seul passerait
// pour un contrôle complet.
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- Codacy ESLint ne résout pas les types @lightpanda/browser (faux positifs) ; couvert par lint:ci local type-aware */
const fetchLegacyTable = async (): Promise<Map<string, LegacyEntry>> => {
  const r = await lightpanda.fetch(OVERVIEW_URL, { dump: true, dumpOptions: { type: 'markdown' } });
  const md = typeof r === 'string' ? r : r.toString('utf-8');
  const table = parseLegacyTable(md);
  const problem = legacyTableProblem(table);
  if (problem) throw new Error(problem);
  return table;
};
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

// Dégradation gracieuse : un échec overview (réseau/Lightpanda, table vide ou partielle) ne casse pas
// le diagnostic API-seul. null = table Legacy non lue ou incomplète : le « OK » final ne doit alors
// pas affirmer « aucun retiré ».
const loadLegacyTable = async (): Promise<Map<string, LegacyEntry> | null> => {
  try {
    return await fetchLegacyTable();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`check-models: overview indisponible (${msg}) — diagnostic API seul.`);
    return null;
  }
};

// Sans table Legacy complète, seuls les constats de l'API sont vérifiés : les retraits ne le sont pas.
// Corps entre accolades : une flèche à corps-expression sur plusieurs lignes n'est mesurée par
// Lizard que sur sa première ligne.
const okLine = (legacyChecked: boolean): string => {
  if (legacyChecked) {
    return `check-models: ${WATCHED_MODELS.length} modèles surveillés OK (aucun absent, ambigu, déprécié, retiré ni en retard non assumé).`;
  }
  return `check-models: ${WATCHED_MODELS.length} modèles surveillés OK côté API (aucun absent, ambigu, déprécié ni en retard non assumé) — retraits NON vérifiés (table Legacy indisponible ou partielle).`;
};

// Alertes d'abord (en-tête ⚠ + marche à suivre), sinon « OK » ; les informations suivent toujours.
const reportFindings = (findings: readonly Finding[], legacyChecked: boolean): void => {
  const alerts = findings.filter((f) => f.level === 'alert');
  if (alerts.length === 0) {
    console.log(okLine(legacyChecked));
  } else {
    console.log(
      'check-models: ⚠ modèles à vérifier (absent, ambigu, déprécié/retiré ou en retard) :',
    );
    for (const f of alerts) console.log(`  - ${f.message}`);
    console.log(
      '  → mettre à jour la version épinglée (helpers/ocr-models.ts, helpers/moderation-model.ts) après vérif prix (scripts/update-pricing.ts), statut GA, compat et qualité — ou documenter un retard assumé (OCR_DEFAULT_ACCEPTED_LAG) ; alias -latest déprécié → épingler la version courante.',
    );
  }
  for (const f of findings.filter((x) => x.level === 'info')) console.log(`  ℹ ${f.message}`);
};

export async function main(): Promise<void> {
  // Lancé via check-deps.sh (qui EXPORTE MISTRAL_API_KEY) → process.env peuplé. En direct :
  // `set -a; . ./.env; set +a` avant (un simple `source` n'exporte pas au process enfant).
  const key = process.env.MISTRAL_API_KEY;
  if (!key) {
    console.log(
      'check-models: MISTRAL_API_KEY absent (exporter .env avant) — skip (non bloquant).',
    );
    return;
  }
  try {
    const models = await fetchModels(key);
    // Liste vide = API muette (shape inattendu), PAS « tout va bien » : ne jamais afficher OK.
    if (models.length === 0) {
      console.log('check-models: /v1/models renvoie une liste vide — skip (non bloquant).');
      return;
    }
    const legacy = await loadLegacyTable();
    reportFindings(collectFindings(models, legacy ?? NO_LEGACY), legacy !== null);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`check-models: vérification impossible (${msg}) — skip (non bloquant).`);
  }
}

// Guard CLI (robuste ESM/tsx) : ne lance main() que si exécuté directement, pas à l'import (tests).
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  void main();
}
