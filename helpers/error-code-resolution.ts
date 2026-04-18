import type { FailedStepCode } from '../types.js';
import {
  MESSAGE_RULES,
  STRUCTURED_CODE_RULES,
  TTS_AGENTS,
  TTS_SIGNATURE,
} from './error-code-rules.js';

interface ErrContext {
  message: string;
  status: unknown;
  code: unknown;
  stage: unknown;
  agent: string | undefined;
}

type Matcher = (ctx: ErrContext) => FailedStepCode | null;

// Matchers spécialisés par tableau de règles. Séparation volontaire (vs un
// générique `matchByPattern(value, rules)`) parce que Codacy additionnait la
// complexité des regex des deux tableaux sur la fonction générique (9 > 8).
// Chaque fonction spécialisée ne voit que ses propres règles.
//
// statusCodeFor utilise un if-chain explicite plutôt qu'une Map : Codacy Lizard
// attribuait les entrées du Map comme branches de la fonction appelant .get()
// (CCN 10 puis 11 quand on a isolé le lookup), peu importe où il était placé.
// Le if-chain a une CCN prévisible (6) et reste lisible à 5 codes.
function statusCodeFor(status: number): FailedStepCode | null {
  if (status === 401 || status === 403) return 'auth_required';
  if (status === 429) return 'quota_exceeded';
  if (status === 503 || status === 529) return 'upstream_unavailable';
  return null;
}

function matchStatus(ctx: ErrContext): FailedStepCode | null {
  return typeof ctx.status === 'number' ? statusCodeFor(ctx.status) : null;
}

function matchStructuredCode(ctx: ErrContext): FailedStepCode | null {
  const code = typeof ctx.code === 'string' ? ctx.code : '';
  const matched = STRUCTURED_CODE_RULES.find((r) => r.pattern.test(code));
  return matched ? matched.code : null;
}

function matchMessage(ctx: ErrContext): FailedStepCode | null {
  const matched = MESSAGE_RULES.find((r) => r.pattern.test(ctx.message));
  return matched ? matched.code : null;
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
