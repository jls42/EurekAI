import type { FailedStepCode } from '../types.js';

export type Rule = Readonly<{
  pattern: RegExp;
  code: FailedStepCode;
}>;

export const STATUS_RULES = new Map<number, FailedStepCode>([
  [429, 'quota_exceeded'],
  [503, 'upstream_unavailable'],
  [529, 'upstream_unavailable'],
]);

export const STRUCTURED_CODE_RULES: readonly Rule[] = [
  { pattern: /rate.?limit|quota|tier/i, code: 'quota_exceeded' },
  { pattern: /capacity|overloaded|unavailable/i, code: 'upstream_unavailable' },
  { pattern: /context.?length|token.?limit/i, code: 'context_length_exceeded' },
];

export const MESSAGE_RULES: readonly Rule[] = [
  { pattern: /\b429\b|rate[_ ]?limit|quota|tier.*limit/i, code: 'quota_exceeded' },
  { pattern: /\b503\b|\b529\b|overloaded|capacity|service.?unavailable/i, code: 'upstream_unavailable' },
  {
    pattern: /context[_ ]?length|token.*limit|too.?many.?tokens|prompt.*too.?long/i,
    code: 'context_length_exceeded',
  },
];

export const TTS_AGENTS = new Set(['podcast', 'quiz-vocal', 'tts', 'stt']);
export const TTS_SIGNATURE = /\btts\b|\bstt\b|voxtral|elevenlabs|audio|speech|voice|transcrib/i;
