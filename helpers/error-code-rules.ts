import type { FailedStepCode } from '../types.js';

export type Rule = Readonly<{
  pattern: RegExp;
  code: FailedStepCode;
}>;

export type StatusRule = Readonly<{
  status: number;
  code: FailedStepCode;
}>;

// Mapping status HTTP → code d'erreur stable. Co-localisé avec MESSAGE_RULES /
// STRUCTURED_CODE_RULES : ce fichier regroupe toutes les tables de données.
export const STATUS_RULES: readonly StatusRule[] = [
  { status: 401, code: 'auth_required' },
  { status: 403, code: 'auth_required' },
  { status: 429, code: 'quota_exceeded' },
  { status: 503, code: 'upstream_unavailable' },
  { status: 529, code: 'upstream_unavailable' },
];

// Ordre = priorité d'évaluation (première regex qui match gagne). Placer `auth_required`
// en tête garantit que "quota is not yet activated" (libellé Mistral d'un 401 billing)
// ne se fasse pas happer par la regex quota plus bas.
export const STRUCTURED_CODE_RULES: readonly Rule[] = [
  { pattern: /\bunauthori[sz]ed\b|invalid[_ ]?api[_ ]?key|\bforbidden\b/i, code: 'auth_required' },
  { pattern: /rate.?limit|quota|tier/i, code: 'quota_exceeded' },
  { pattern: /capacity|overloaded|unavailable/i, code: 'upstream_unavailable' },
  { pattern: /context.?length|token.?limit/i, code: 'context_length_exceeded' },
];

// Priorité = ordre d'évaluation (première regex qui match gagne). Les trois règles
// `auth_required` sont placées en tête pour capter 401/403 SDK avant que
// TTS_SIGNATURE ne classe un message d'auth en tts_upstream_error.
// Segmentées en 3 patterns simples (Sonar S5843 : complexité regex < 20) au lieu
// d'une grosse alternation équivalente.
export const MESSAGE_RULES: readonly Rule[] = [
  // Clé API locale non définie (env var manquante, côté serveur EurekAI).
  { pattern: /api[_ ]?key.*(non.?defin|not.?defin|missing|not.?set)/i, code: 'auth_required' },
  // Codes HTTP d'auth dans le message brut (SDK sans status structuré).
  { pattern: /\b401\b|\b403\b/, code: 'auth_required' },
  // Mots-clés d'échec d'authentification (unauthorized/forbidden/invalid key).
  { pattern: /\bunauthori[sz]ed\b|\bforbidden\b|invalid[_ ]?api[_ ]?key/i, code: 'auth_required' },
  { pattern: /\b429\b|rate[_ ]?limit|quota|tier.*limit/i, code: 'quota_exceeded' },
  {
    pattern: /\b503\b|\b529\b|overloaded|capacity|service.?unavailable/i,
    code: 'upstream_unavailable',
  },
  {
    pattern: /context[_ ]?length|token.?limit|too.?many.?tokens|prompt.*too.?long/i,
    code: 'context_length_exceeded',
  },
];

export const TTS_AGENTS = new Set(['podcast', 'quiz-vocal', 'tts', 'stt']);
export const TTS_SIGNATURE = /\btts\b|\bstt\b|voxtral|audio|speech|voice|transcrib/i;
