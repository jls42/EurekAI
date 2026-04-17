import type { FailedStepCode } from '../types.js';
import {
  MESSAGE_RULES,
  STATUS_RULES,
  STRUCTURED_CODE_RULES,
  TTS_AGENTS,
  TTS_SIGNATURE,
} from './error-code-rules.js';
import type { Rule } from './error-code-rules.js';

type ErrWithFields = {
  status?: unknown;
  code?: unknown;
  stage?: unknown;
};

const EMPTY_FIELDS = Object.freeze({}) as ErrWithFields;

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
