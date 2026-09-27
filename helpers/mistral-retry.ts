import { logger } from './logger.js';
import { httpStatusOf } from './error-code-resolution.js';

const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 4000;

// Bug SDK Mistral 2.2.0 : undici request.clone() échoue avec `TypeError: unusable`
// lors des retries internes du SDK → l'exception remonte et l'appel échoue à vie.
// Le caller passe un closure qui re-invoque la méthode SDK à chaque tentative ;
// chaque invocation recrée un undici Request neuf côté SDK, contournant le bug.
const SDK_CLONE_BUG = /unusable/i;

/**
 * Codes que le SDK rejoue déjà lui-même sur toutes ses opérations (`retryCodes` du SDK 2.7.0,
 * mesuré), avec le backoff de RETRY_CONFIG (`mistral-client-factory.ts`, ≤ 120 s). Les rejouer ici
 * empilerait 3 tentatives applicatives sur ce backoff : jusqu'à ~6 min d'attente sur un 429
 * persistant. Verrou au bump du SDK : `mistral-client-factory.contract.test.ts`.
 */
export const SDK_RETRIED_STATUSES: ReadonlySet<number> = new Set([429, 500, 502, 503, 504]);

// Transitoires que le SDK ne rejoue pas : 408 et les autres 5xx, dont ceux de Cloudflare placé
// devant l'API (520 à 529). cf. CLAUDE.md "Pièges Lizard"
const isRetryableStatus = (status: number | undefined): boolean => {
  if (status === undefined || SDK_RETRIED_STATUSES.has(status)) return false;
  return status === 408 || (status >= 500 && status < 600);
};

// Retry ciblé : transitoires que le SDK ne couvre pas + bug SDK connu. Les déterministes
// (400 body, 401/403 auth, 422 validation) sont fail-fast : retry inutile = burn quota + latence
// user inacceptable. Statut lu par httpStatusOf (`statusCode` des erreurs du SDK).
const isRetryable = (err: unknown): boolean => {
  if (!err || typeof err !== 'object') return false;
  if (err instanceof TypeError && SDK_CLONE_BUG.test(err.message)) return true;
  return isRetryableStatus(httpStatusOf(err));
};

const describeError = (err: unknown): string => {
  const status = httpStatusOf(err);
  if (status !== undefined) return `status ${status}`;
  if (!err || typeof err !== 'object') return String(err);
  return (err as { name?: string }).name ?? 'unknown';
};

export async function callWithRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (!isRetryable(e) || attempt === MAX_ATTEMPTS) break;
      const delay = Math.min(BASE_BACKOFF_MS * 2 ** (attempt - 1), MAX_BACKOFF_MS);
      logger.warn(label, `attempt ${attempt} failed (${describeError(e)}), retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError ?? new Error(`callWithRetry: no attempt executed for ${label}`);
}
