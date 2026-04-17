// Helper partagé front/back pour sélectionner les voix Mistral selon la langue.
// Pur TS, aucun import runtime Node-only : peut être consommé depuis src/ via
// l'alias @helpers (cf. vite.config.ts).
//
// Politique produit :
// 1. bucket langue exacte/préfixée  -> source 'lang-match'
// 2. sinon bucket en                -> source 'en-fallback'
// 3. sinon bucket global            -> source 'any-fallback'
// 4. sinon null (voiceCache vide)   -> appelant retombe sur DEFAULT_CONFIG.mistralVoices
//
// Classement du bucket retenu :
//   - score DESC (préférence female + tags émotionnels)
//   - id ASC comme tie-breaker de stabilité cross-release
//
// Rotation déterministe par (profileId, lang) via djb2 pour donner un offset
// sur le bucket trié -> deux profils distincts peuvent obtenir des voix
// différentes, dans la limite de la taille réelle du bucket (best-effort).
//
// Stabilité : déterministe tant qu'aucune voix n'est ajoutée/supprimée
// dans le bucket de la langue concernée.
//
// Note flows : quiz-vocal n'utilise que `host` (cf. routes/generate.ts).
// La sélection de deux voix distinctes bénéficie aux flows podcast et
// flashcards read-aloud.

import type { MistralVoice } from './voice-types.js';

export type VoiceSelectionSource = 'lang-match' | 'en-fallback' | 'any-fallback';

export interface VoiceSelectionInput {
  voices: MistralVoice[];
  lang: string;
  profileId?: string;
}

export interface VoiceSelectionResult {
  host: string;
  guest: string;
  source: VoiceSelectionSource;
  /** Taille du bucket retenu (pour observabilité). */
  bucketSize: number;
  /** Langue effectivement matchée (bucket). Null si fallback 'any'. */
  langMatched: string | null;
}

// Ordre de préférence pour les tags émotionnels. Les valeurs sont additives :
// prendre le meilleur tag disponible sur une voix donnée.
const TAG_SCORES: Record<string, number> = {
  excited: 50,
  cheerful: 40,
  happy: 30,
  curious: 25,
  confident: 20,
  neutral: 10,
};

const FEMALE_BONUS = 100;

function scoreVoice(v: MistralVoice): number {
  let score = 0;
  if (v.gender === 'female') score += FEMALE_BONUS;
  let bestTagScore = 0;
  for (const tag of v.tags ?? []) {
    const s = TAG_SCORES[tag.toLowerCase()] ?? 0;
    if (s > bestTagScore) bestTagScore = s;
  }
  return score + bestTagScore;
}

// djb2 : hash simple, stable, non cryptographique, suffisant pour répartir
// des profileId sur un bucket de voix.
// Math.imul garantit la multiplication 32-bit et évite le bit-op `|= 0` (Sonar S2999).
// `for…of` itère par code point (surrogate pairs sûres).
function djb2(s: string): number {
  let hash = 5381;
  for (const ch of s) {
    hash = Math.imul(hash, 33) + (ch.codePointAt(0) ?? 0);
    hash = Math.imul(hash, 1); // re-cast en int32 signed sans `| 0`
  }
  return hash >>> 0;
}

// Normalise une locale au code ISO 639-1 (2 premiers caractères, lowercase).
// Absorbe aussi bien les BCP-47 (`pt-BR`, `en-US`) que les underscores (`pt_BR`)
// et les casses inconsistantes (`FR_FR`) → tout devient `pt`, `en`, `fr`, etc.
// Évite que des clients API publics tombent en en-fallback à tort.
function normalizeLang(lang: string): string {
  return lang.slice(0, 2).toLowerCase();
}

function filterByLang(voices: MistralVoice[], lang: string): MistralVoice[] {
  const target = normalizeLang(lang);
  return voices.filter((v) => v.languages.some((l) => normalizeLang(l) === target));
}

function sortByScoreThenId(bucket: MistralVoice[]): MistralVoice[] {
  return [...bucket].sort((a, b) => {
    const diff = scoreVoice(b) - scoreVoice(a);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });
}

function rotateDeterministic<T>(list: T[], seed: string): T[] {
  if (list.length <= 1) return list;
  const offset = djb2(seed) % list.length;
  return [...list.slice(offset), ...list.slice(0, offset)];
}

function resolveBucket(
  voices: MistralVoice[],
  lang: string,
): { bucket: MistralVoice[]; source: VoiceSelectionSource; langMatched: string | null } | null {
  const normalized = normalizeLang(lang);
  const langBucket = filterByLang(voices, normalized);
  if (langBucket.length > 0) {
    return { bucket: langBucket, source: 'lang-match', langMatched: normalized };
  }
  const enBucket = filterByLang(voices, 'en');
  if (enBucket.length > 0) {
    return { bucket: enBucket, source: 'en-fallback', langMatched: 'en' };
  }
  if (voices.length > 0) {
    return { bucket: voices, source: 'any-fallback', langMatched: null };
  }
  return null;
}

export function selectVoices(input: VoiceSelectionInput): VoiceSelectionResult | null {
  const resolved = resolveBucket(input.voices, input.lang);
  if (!resolved) return null;

  const sorted = sortByScoreThenId(resolved.bucket);
  // Seed basé sur la langue normalisée pour que pt-BR et pt produisent la même voix.
  const seed = `${input.profileId ?? '__default__'}|${normalizeLang(input.lang)}`;
  const rotated = rotateDeterministic(sorted, seed);

  const host = rotated[0];
  const guest = rotated.length > 1 ? rotated[1] : rotated[0];

  return {
    host: host.id,
    guest: guest.id,
    source: resolved.source,
    bucketSize: resolved.bucket.length,
    langMatched: resolved.langMatched,
  };
}
