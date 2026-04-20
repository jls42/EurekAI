import { logger } from './logger.js';

const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 4000;

// Bug SDK Mistral 2.2.0 : undici request.clone() échoue avec `TypeError: unusable`
// lors des retries internes du SDK → l'exception remonte et l'appel échoue à vie.
// On reconstruit une nouvelle request à chaque tentative pour contourner.
const SDK_CLONE_BUG = /unusable/i;

// Arrow consts pour éviter l'agglomération du parseur TS de Lizard sur helpers
// non-exportés consécutifs (piège connu, cf. CLAUDE.md).
const isRetryableStatus = (status: unknown): boolean => {
  if (status === 429) return true;
  if (typeof status !== 'number') return false;
  return status >= 500 && status < 600;
};

// Retry ciblé : transitoires upstream (429 + 5xx) + bug SDK connu.
// Les déterministes (400 body, 401/403 auth, 422 validation) sont fail-fast :
// retry inutile = burn quota + latence user inacceptable (~55s avant fix).
const isRetryable = (err: unknown): boolean => {
  if (!err || typeof err !== 'object') return false;
  if (err instanceof TypeError && SDK_CLONE_BUG.test(err.message)) return true;
  return isRetryableStatus((err as { status?: unknown }).status);
};

const describeError = (err: unknown): string => {
  if (!err || typeof err !== 'object') return String(err);
  const o = err as { name?: string; status?: unknown };
  if (typeof o.status === 'number') return `status ${o.status}`;
  return o.name ?? 'unknown';
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
  throw lastError;
}
