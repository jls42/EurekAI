import type { FailedStepCode } from '../types.js';

export type Rule = Readonly<{
  pattern: RegExp;
  code: FailedStepCode;
}>;

export const STATUS_RULES = new Map<number, FailedStepCode>([
  [401, 'auth_required'],
  [403, 'auth_required'],
  [429, 'quota_exceeded'],
  [503, 'upstream_unavailable'],
  [529, 'upstream_unavailable'],
]);

// Ordre = priorité d'évaluation (première regex qui match gagne). Placer `auth_required`
// en tête garantit que "quota is not yet activated" (libellé Mistral d'un 401 billing)
// ne se fasse pas happer par la regex quota plus bas.
export const STRUCTURED_CODE_RULES: readonly Rule[] = [
  { pattern: /\bunauthori[sz]ed\b|invalid[_ ]?api[_ ]?key|\bforbidden\b/i, code: 'auth_required' },
  { pattern: /rate.?limit|quota|tier/i, code: 'quota_exceeded' },
  { pattern: /capacity|overloaded|unavailable/i, code: 'upstream_unavailable' },
  { pattern: /context.?length|token.?limit/i, code: 'context_length_exceeded' },
];

// Priorité identique aux STRUCTURED_CODE_RULES : `auth_required` d'abord pour capter
// à la fois les 401/403 du SDK et les `Error('ELEVENLABS_API_KEY non defini')` levés
// localement par tts-provider.ts. Sinon ces derniers filent en `tts_upstream_error`
// (via TTS_SIGNATURE /elevenlabs/) et masquent le vrai fix (définir la clé).
export const MESSAGE_RULES: readonly Rule[] = [
  {
    pattern:
      /api[_ ]?key.*(non.?defin|not.?defin|missing|not.?set)|\b401\b|\b403\b|\bunauthori[sz]ed\b|invalid[_ ]?api[_ ]?key|\bforbidden\b/i,
    code: 'auth_required',
  },
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
export const TTS_SIGNATURE = /\btts\b|\bstt\b|voxtral|elevenlabs|audio|speech|voice|transcrib/i;
