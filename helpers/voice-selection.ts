// Helper partagé front/back pour sélectionner les voix Mistral selon la langue.
// Pur TS, aucun import runtime Node-only : peut être consommé depuis src/ via
// l'alias @helpers (cf. vite.config.ts).
//
// Politique produit :
// 1. bucket langue exacte/préfixée  -> source 'lang-match'
// 2. sinon bucket en                -> source 'en-fallback'
// 3. sinon bucket global            -> source 'any-fallback'
// 4. sinon null (voiceCache vide)   -> appelant retombe sur son fallback interne
//
// Classement du bucket retenu :
//   - score DESC (préférence female + tags émotionnels)
//   - id ASC comme tie-breaker de stabilité cross-release
//
// Rotation déterministe par (profileId, langue du bucket retenu) via djb2 pour donner
// un offset sur le bucket trié -> deux profils distincts peuvent obtenir des voix
// différentes, sans changer arbitrairement entre locales qui partagent un fallback EN.
//
// Stabilité : déterministe tant qu'aucune voix n'est ajoutée/supprimée
// dans le bucket de la langue concernée.
//
// Note flows : quiz-vocal n'utilise que `host` (cf. routes/generate.ts).
// La sélection de deux voix distinctes bénéficie aux flows podcast et
// flashcards read-aloud.

import type { MistralVoice, VoiceId } from './voice-types.js';

export type VoiceSelectionSource = 'lang-match' | 'en-fallback' | 'any-fallback';

export interface VoiceSelectionInput {
  voices: MistralVoice[];
  lang: string;
  profileId?: string;
}

export interface VoiceSelectionResult {
  host: VoiceId;
  guest: VoiceId;
  source: VoiceSelectionSource;
  /** Taille du bucket retenu (pour observabilité). */
  bucketSize: number;
  /** Langue effectivement matchée (bucket). Null si fallback 'any'. */
  langMatched: string | null;
}

// Ordre de préférence pour les tags émotionnels. Score = meilleur tag match (pas sommé) ;
// une voix taggée à la fois 'excited' et 'curious' scorera 50 (excited), pas 75.
const TAG_SCORES: Record<string, number> = {
  excited: 50,
  cheerful: 40,
  happy: 30,
  curious: 25,
  confident: 20,
  neutral: 10,
};

const FEMALE_BONUS = 100;

const scoreVoice = (v: MistralVoice): number => {
  let score = 0;
  if (v.gender === 'female') score += FEMALE_BONUS;
  let bestTagScore = 0;
  for (const tag of v.tags ?? []) {
    const s = TAG_SCORES[tag.toLowerCase()] ?? 0;
    if (s > bestTagScore) bestTagScore = s;
  }
  return score + bestTagScore;
};

// djb2 : hash simple, stable, non cryptographique, suffisant pour répartir
// des profileId sur un bucket de voix.
// Math.imul garantit la multiplication 32-bit (évite le bit-op `|= 0` flaggé Sonar S2999).
// `for…of` itère par code point (surrogate pairs sûres).
// `>>> 0` final force un unsigned int32 déterministe pour le modulo.
const djb2 = (s: string): number => {
  let hash = 5381;
  for (const ch of s) {
    hash = Math.imul(hash, 33) + (ch.codePointAt(0) ?? 0);
  }
  return hash >>> 0;
};

// Normalise une locale au code ISO 639-1 (2 premiers caractères, lowercase).
// Absorbe aussi bien les BCP-47 (`pt-BR`, `en-US`) que les underscores (`pt_BR`)
// et les casses inconsistantes (`FR_FR`) → tout devient `pt`, `en`, `fr`, etc.
// Évite que des clients API publics tombent en en-fallback à tort.
const normalizeLang = (lang: string): string => lang.slice(0, 2).toLowerCase();

const filterByLang = (voices: MistralVoice[], lang: string): MistralVoice[] => {
  const target = normalizeLang(lang);
  return voices.filter((v) => v.languages.some((l) => normalizeLang(l) === target));
};

const sortByScoreThenId = (bucket: MistralVoice[]): MistralVoice[] =>
  [...bucket].sort((a, b) => {
    const diff = scoreVoice(b) - scoreVoice(a);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });

const rotateDeterministic = <T>(list: T[], seed: string): T[] => {
  if (list.length <= 1) return list;
  const offset = djb2(seed) % list.length;
  return [...list.slice(offset), ...list.slice(0, offset)];
};

const speakerName = (voice: MistralVoice): string => (voice.name || voice.id).split(' - ')[0];

const emotionName = (voice: MistralVoice): string => (voice.name || '').split(' - ')[1] || '';

const matchesVoice = (voice: MistralVoice, speaker: string, emotion: string): boolean =>
  speakerName(voice).toLowerCase() === speaker &&
  (emotionName(voice).toLowerCase() === emotion ||
    (voice.tags ?? []).some((tag) => tag.toLowerCase() === emotion));

const findVoice = (voices: MistralVoice[], speaker: string, emotion: string): MistralVoice | null =>
  voices.find((voice) => matchesVoice(voice, speaker, emotion)) ?? null;

// Paires curated pour fr/en : choix produit explicite — le catalogue Mistral FR ne
// contient que 6 voix (rotation cycle trop vite, l'user perçoit les répétitions) et
// les combos Marie(FR) / Jane+Oliver(EN) ont été validés UX comme les meilleures
// combinaisons hôte/invité. Ces deux langues bypassent donc intentionnellement la
// rotation déterministe par profil. Pour toutes les autres langues (lang-match direct
// hors fr/en, ou en-fallback sans match curated), la rotation profileId-based reste active.
const preferredPair = (
  voices: MistralVoice[],
  langMatched: string | null,
): MistralVoice[] | null => {
  let preferred: string[][] | null = null;
  if (langMatched === 'fr') {
    preferred = [
      ['marie', 'excited'],
      ['marie', 'curious'],
    ];
  }
  if (langMatched === 'en') {
    preferred = [
      ['jane', 'confident'],
      ['oliver', 'curious'],
    ];
  }
  if (!preferred) return null;
  const [hostPref, guestPref] = preferred;
  const host = findVoice(voices, hostPref[0], hostPref[1]);
  const guest = findVoice(voices, guestPref[0], guestPref[1]);
  return host && guest ? [host, guest] : null;
};

const pickGuest = (rotated: MistralVoice[], host: MistralVoice): MistralVoice => {
  const hostSpeaker = speakerName(host);
  return rotated.find((voice) => speakerName(voice) !== hostSpeaker) ?? rotated[1] ?? host;
};

type ResolvedBucket = {
  bucket: MistralVoice[];
  source: VoiceSelectionSource;
  langMatched: string | null;
};

const resolveBucket = (voices: MistralVoice[], lang: string): ResolvedBucket | null => {
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
};

export function selectVoices(input: VoiceSelectionInput): VoiceSelectionResult | null {
  const resolved = resolveBucket(input.voices, input.lang);
  if (!resolved) return null;

  const sorted = sortByScoreThenId(resolved.bucket);
  const preferred = preferredPair(sorted, resolved.langMatched);
  if (preferred) {
    return {
      host: preferred[0].id,
      guest: preferred[1].id,
      source: resolved.source,
      bucketSize: resolved.bucket.length,
      langMatched: resolved.langMatched,
    };
  }
  // Seed basé sur la langue effectivement retenue: pt-BR et pt restent stables,
  // et es/ar/etc. qui tombent sur le fallback EN partagent une paire EN cohérente.
  const seedLang = resolved.langMatched ?? normalizeLang(input.lang);
  const seed = `${input.profileId ?? '__default__'}|${seedLang}`;
  const rotated = rotateDeterministic(sorted, seed);

  const host = rotated[0];
  const guest = pickGuest(rotated, host);

  return {
    host: host.id,
    guest: guest.id,
    source: resolved.source,
    bucketSize: resolved.bucket.length,
    langMatched: resolved.langMatched,
  };
}
