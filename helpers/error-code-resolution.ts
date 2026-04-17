import type { FailedStepCode } from '../types.js';

type ErrWithFields = {
  status?: unknown;
  code?: unknown;
  stage?: unknown;
};

type Rule = Readonly<{
  pattern: RegExp;
  code: FailedStepCode;
}>;

const EMPTY_FIELDS = Object.freeze({}) as ErrWithFields;

function createPattern(source: string): RegExp {
  return new RegExp(source, 'i');
}

function matchRule(value: string, rules: readonly Rule[]): FailedStepCode | null {
  return rules.find(({ pattern }) => pattern.test(value))?.code ?? null;
}

function getErrFields(err: unknown): ErrWithFields {
  if (err === null || typeof err !== 'object') return EMPTY_FIELDS;
  return err as ErrWithFields;
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

const STATUS_RULES = new Map<number, FailedStepCode>([
  [429, 'quota_exceeded'],
  [503, 'upstream_unavailable'],
  [529, 'upstream_unavailable'],
]);

const STRUCTURED_RATE_LIMIT = createPattern(String.raw`rate.?limit|quota|tier`);
const STRUCTURED_UPSTREAM_UNAVAILABLE = createPattern(String.raw`capacity|overloaded|unavailable`);
const STRUCTURED_CONTEXT_LIMIT = createPattern(String.raw`context.?length|token.?limit`);

const MESSAGE_RATE_LIMIT = createPattern(String.raw`\b429\b|rate[_ ]?limit|quota|tier.*limit`);
const MESSAGE_UPSTREAM_UNAVAILABLE = createPattern(
  String.raw`\b503\b|\b529\b|overloaded|capacity|service.?unavailable`,
);
const MESSAGE_CONTEXT_LIMIT = createPattern(
  String.raw`context[_ ]?length|token.*limit|too.?many.?tokens|prompt.*too.?long`,
);

const STRUCTURED_CODE_RULES: readonly Rule[] = [
  { pattern: STRUCTURED_RATE_LIMIT, code: 'quota_exceeded' },
  { pattern: STRUCTURED_UPSTREAM_UNAVAILABLE, code: 'upstream_unavailable' },
  { pattern: STRUCTURED_CONTEXT_LIMIT, code: 'context_length_exceeded' },
];

const MESSAGE_RULES: readonly Rule[] = [
  { pattern: MESSAGE_RATE_LIMIT, code: 'quota_exceeded' },
  { pattern: MESSAGE_UPSTREAM_UNAVAILABLE, code: 'upstream_unavailable' },
  { pattern: MESSAGE_CONTEXT_LIMIT, code: 'context_length_exceeded' },
];

const TTS_AGENTS = new Set(['podcast', 'quiz-vocal', 'tts', 'stt']);
const TTS_SIGNATURE = createPattern(String.raw`\btts\b|\bstt\b|voxtral|elevenlabs|audio|speech|voice|transcrib`);

function getStatusMatch(status: unknown): FailedStepCode | null {
  if (typeof status !== 'number') return null;
  return STATUS_RULES.get(status) ?? null;
}

function getStructuredMatch(fields: ErrWithFields): FailedStepCode | null {
  return getStatusMatch(fields.status) ?? matchRule(readString(fields.code), STRUCTURED_CODE_RULES);
}

function getAudioMatch(
  agent: string | undefined,
  fields: ErrWithFields,
  message: string,
): FailedStepCode | null {
  if (!agent || !TTS_AGENTS.has(agent)) return null;
  if (readString(fields.stage) === 'tts') return 'tts_upstream_error';
  return TTS_SIGNATURE.test(message) ? 'tts_upstream_error' : null;
}

function firstMatch(matches: Array<FailedStepCode | null>): FailedStepCode | null {
  for (const match of matches) {
    if (match) return match;
  }
  return null;
}

function resolveErrorCode(err: unknown, agent?: string): FailedStepCode {
  const fields = getErrFields(err);
  const message = getErrorMessage(err);
  const match = firstMatch([
    getStructuredMatch(fields),
    matchRule(message, MESSAGE_RULES),
    getAudioMatch(agent, fields, message),
  ]);
  return match ?? 'internal_error';
}

export function extractErrorCode(err: unknown, agent?: string): FailedStepCode {
  if (err instanceof SyntaxError) return 'llm_invalid_json';
  return resolveErrorCode(err, agent);
}
