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

// Mapping status HTTP → code d'erreur stable. Structure identique aux autres
// matchers du fichier (STRUCTURED_CODE_RULES, MESSAGE_RULES) : tableau de règles
// itéré via `.find()`. Forme alignée pour que Lizard applique le même traitement
// partout — un Record indexé (STATUS_CODES[key]) déclenchait un faux positif
// CCN même avec 3 décisions réelles.
const STATUS_RULES: ReadonlyArray<readonly [number, FailedStepCode]> = [
  [401, 'auth_required'],
  [403, 'auth_required'],
  [429, 'quota_exceeded'],
  [503, 'upstream_unavailable'],
  [529, 'upstream_unavailable'],
];

function matchStatus(ctx: ErrContext): FailedStepCode | null {
  if (typeof ctx.status !== 'number') return null;
  const status = ctx.status;
  const matched = STATUS_RULES.find(([code]) => code === status);
  return matched ? matched[1] : null;
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
