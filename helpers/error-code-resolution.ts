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
  status: unknown | undefined;
  code: unknown | undefined;
  stage: unknown | undefined;
};

const EMPTY_FIELDS = Object.freeze({
  status: undefined,
  code: undefined,
  stage: undefined,
}) as ErrWithFields;

function matchRule(value: string, rules: readonly Rule[]): FailedStepCode | null {
  const matchedRule = rules.find(({ pattern }) => pattern.test(value));
  if (!matchedRule) return null;
  return matchedRule.code;
}

function getErrFields(err: unknown): ErrWithFields {
  if (err === null || typeof err !== 'object') return EMPTY_FIELDS;
  return err as ErrWithFields;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function readString(value: unknown): string {
  if (typeof value === 'string') return value;
  return '';
}

function getStatusMatch(status: unknown): FailedStepCode | null {
  if (typeof status !== 'number') return null;
  const statusMatch = STATUS_RULES.get(status);
  if (!statusMatch) return null;
  return statusMatch;
}

function getStructuredMatch(fields: ErrWithFields): FailedStepCode | null {
  const statusMatch = getStatusMatch(fields.status);
  if (statusMatch) return statusMatch;
  return matchRule(readString(fields.code), STRUCTURED_CODE_RULES);
}

function getAudioMatch(
  agent: string | undefined,
  fields: ErrWithFields,
  message: string,
): FailedStepCode | null {
  if (!agent || !TTS_AGENTS.has(agent)) return null;
  if (readString(fields.stage) === 'tts') return 'tts_upstream_error';
  if (TTS_SIGNATURE.test(message)) return 'tts_upstream_error';
  return null;
}

function firstMatch(matches: Array<FailedStepCode | null>): FailedStepCode | null {
  for (const match of matches) {
    if (match) return match;
  }
  return null;
}

function resolveErrorCode(err: unknown, agent: string | undefined): FailedStepCode {
  const fields = getErrFields(err);
  const message = getErrorMessage(err);
  const match = firstMatch([
    getStructuredMatch(fields),
    matchRule(message, MESSAGE_RULES),
    getAudioMatch(agent, fields, message),
  ]);
  if (match) return match;
  return 'internal_error';
}

export function extractErrorCode(err: unknown, agent: string | undefined = undefined): FailedStepCode {
  if (err instanceof SyntaxError) return 'llm_invalid_json';
  return resolveErrorCode(err, agent);
}
