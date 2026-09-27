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

/**
 * Statut HTTP d'une erreur : `statusCode` (erreurs HTTP du SDK Mistral, `MistralError`), sinon
 * `status` (autres bibliothèques, erreurs maison). Le SDK n'expose jamais `status` : le lire seul
 * rendait inertes le réessai applicatif (`mistral-retry.ts`) et STATUS_RULES.
 */
export function httpStatusOf(err: unknown): number | undefined {
  const obj = readObject(err);
  if (typeof obj.statusCode === 'number') return obj.statusCode;
  return typeof obj.status === 'number' ? obj.status : undefined;
}

function buildContext(err: unknown, agent: string | undefined): ErrContext {
  const obj = readObject(err);
  return {
    message: readMessage(err),
    status: httpStatusOf(err),
    code: obj.code,
    stage: obj.stage,
    agent,
  };
}

// Le retour exclut 'cancelled' : ce literal n'est jamais dérivé d'une exception
// upstream, il est posé explicitement par store.markPendingCancelled /
// cancelAllPendingsAtBoot (cf. CLAUDE.md "FailedStepCode" + types.ts comment
// "Posé explicitement…"). Le retour étroit permet de passer le résultat à
// markPendingFailed sans cast ni guard runtime.
export type ExtractedErrorCode = Exclude<FailedStepCode, 'cancelled'>;

export function extractErrorCode(
  err: unknown,
  agent: string | undefined = undefined,
): ExtractedErrorCode {
  if (err instanceof SyntaxError) return 'llm_invalid_json';
  const ctx = buildContext(err, agent);
  for (const matcher of MATCHERS) {
    const code = matcher(ctx);
    if (code) return code;
  }
  return 'internal_error';
}
