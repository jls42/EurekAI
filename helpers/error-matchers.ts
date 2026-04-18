import type { FailedStepCode } from '../types.js';
import {
  MESSAGE_RULES,
  STATUS_RULES,
  STRUCTURED_CODE_RULES,
  TTS_AGENTS,
  TTS_SIGNATURE,
} from './error-code-rules.js';

export interface ErrContext {
  message: string;
  status: unknown;
  code: unknown;
  stage: unknown;
  agent: string | undefined;
}

export type Matcher = (ctx: ErrContext) => FailedStepCode | null;

export function matchStatus(ctx: ErrContext): FailedStepCode | null {
  if (typeof ctx.status !== 'number') return null;
  const status = ctx.status;
  const matched = STATUS_RULES.find((r) => r.status === status);
  return matched ? matched.code : null;
}

export function matchStructuredCode(ctx: ErrContext): FailedStepCode | null {
  const code = typeof ctx.code === 'string' ? ctx.code : '';
  const matched = STRUCTURED_CODE_RULES.find((r) => r.pattern.test(code));
  return matched ? matched.code : null;
}

export function matchMessage(ctx: ErrContext): FailedStepCode | null {
  const matched = MESSAGE_RULES.find((r) => r.pattern.test(ctx.message));
  return matched ? matched.code : null;
}

export function matchAudio(ctx: ErrContext): FailedStepCode | null {
  if (!ctx.agent) return null;
  if (!TTS_AGENTS.has(ctx.agent)) return null;
  if (ctx.stage === 'tts') return 'tts_upstream_error';
  if (TTS_SIGNATURE.test(ctx.message)) return 'tts_upstream_error';
  return null;
}

export const MATCHERS: readonly Matcher[] = [
  matchStatus,
  matchStructuredCode,
  matchMessage,
  matchAudio,
];
