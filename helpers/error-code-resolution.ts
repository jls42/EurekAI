import type { FailedStepCode } from '../types.js';
import {
  MESSAGE_RULES,
  STATUS_RULES,
  STRUCTURED_CODE_RULES,
  TTS_AGENTS,
  TTS_SIGNATURE,
} from './error-code-rules.js';
import type { Rule } from './error-code-rules.js';

interface ErrContext {
  message: string;
  status: unknown;
  code: unknown;
  stage: unknown;
  agent: string | undefined;
}

type Matcher = (ctx: ErrContext) => FailedStepCode | null;

function matchByPattern(value: string, rules: readonly Rule[]): FailedStepCode | null {
  const matched = rules.find((r) => r.pattern.test(value));
  return matched ? matched.code : null;
}

function matchStatus(ctx: ErrContext): FailedStepCode | null {
  if (typeof ctx.status !== 'number') return null;
  return STATUS_RULES.get(ctx.status) || null;
}

function matchStructuredCode(ctx: ErrContext): FailedStepCode | null {
  const code = typeof ctx.code === 'string' ? ctx.code : '';
  return matchByPattern(code, STRUCTURED_CODE_RULES);
}

function matchMessage(ctx: ErrContext): FailedStepCode | null {
  return matchByPattern(ctx.message, MESSAGE_RULES);
}

function matchAudio(ctx: ErrContext): FailedStepCode | null {
  if (!ctx.agent) return null;
  if (!TTS_AGENTS.has(ctx.agent)) return null;
  if (ctx.stage === 'tts') return 'tts_upstream_error';
  if (TTS_SIGNATURE.test(ctx.message)) return 'tts_upstream_error';
  return null;
}

const MATCHERS: readonly Matcher[] = [matchStatus, matchStructuredCode, matchMessage, matchAudio];

function readObject(err: unknown): Record<string, unknown> {
  if (err === null || typeof err !== 'object') return {};
  return err as Record<string, unknown>;
}

function readMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function buildContext(err: unknown, agent: string | undefined): ErrContext {
  const obj = readObject(err);
  return {
    message: readMessage(err),
    status: obj.status,
    code: obj.code,
    stage: obj.stage,
    agent,
  };
}

export function extractErrorCode(
  err: unknown,
  agent: string | undefined = undefined,
): FailedStepCode {
  if (err instanceof SyntaxError) return 'llm_invalid_json';
  const ctx = buildContext(err, agent);
  for (const matcher of MATCHERS) {
    const code = matcher(ctx);
    if (code) return code;
  }
  return 'internal_error';
}
