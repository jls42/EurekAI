import type { FailedStepCode } from '../types.js';
import { MATCHERS, type ErrContext } from './error-matchers.js';

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
