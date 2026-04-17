import type { FailedStepCode } from '../types.js';

type ErrWithFields = {
  status?: unknown;
  code?: unknown;
  stage?: unknown;
};

type Rule = readonly [RegExp, FailedStepCode];

const STATUS_RULES = new Map<number, FailedStepCode>([
  [429, 'quota_exceeded'],
  [503, 'upstream_unavailable'],
  [529, 'upstream_unavailable'],
]);

const STRUCTURED_CODE_RULES: readonly Rule[] = [
  [/rate.?limit|quota|tier/i, 'quota_exceeded'],
  [/capacity|overloaded|unavailable/i, 'upstream_unavailable'],
  [/context.?length|token.?limit/i, 'context_length_exceeded'],
];

const MESSAGE_RULES: readonly Rule[] = [
  [/\b429\b|rate[_ ]?limit|quota|tier.*limit/i, 'quota_exceeded'],
  [/\b503\b|\b529\b|overloaded|capacity|service.?unavailable/i, 'upstream_unavailable'],
  [
    /context[_ ]?length|token.*limit|too.?many.?tokens|prompt.*too.?long/i,
    'context_length_exceeded',
  ],
];

const TTS_AGENTS = new Set(['podcast', 'quiz-vocal', 'tts', 'stt']);
const TTS_SIGNATURE = /\btts\b|\bstt\b|voxtral|elevenlabs|audio|speech|voice|transcrib/i;

function matchRule(value: string, rules: readonly Rule[]): FailedStepCode | null {
  return rules.find(([pattern]) => pattern.test(value))?.[1] ?? null;
}

export function extractErrorCode(err: unknown, agent?: string): FailedStepCode {
  if (err instanceof SyntaxError) return 'llm_invalid_json';

  const fields = err !== null && typeof err === 'object' ? (err as ErrWithFields) : {};
  const message = err instanceof Error ? err.message : String(err);
  const status =
    typeof fields.status === 'number' ? (STATUS_RULES.get(fields.status) ?? null) : null;
  const code = typeof fields.code === 'string' ? fields.code : '';
  const stage = typeof fields.stage === 'string' ? fields.stage : '';
  const audio =
    agent && TTS_AGENTS.has(agent) && (stage === 'tts' || TTS_SIGNATURE.test(message))
      ? 'tts_upstream_error'
      : null;

  return (
    status ??
    matchRule(code, STRUCTURED_CODE_RULES) ??
    matchRule(message, MESSAGE_RULES) ??
    audio ??
    'internal_error'
  );
}
