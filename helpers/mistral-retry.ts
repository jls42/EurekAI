import { logger } from './logger.js';
import { httpStatusOf } from './error-code-resolution.js';

const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 4000;

// Bug du SDK Mistral (vu dès 2.2.0, mesuré le 2026-10-03 avec 2.7.0 et Node 22.18) : quand l'API
// répond 429 ou 503 avant d'avoir reçu tout le corps de la requête (HTTPS, gros corps), le
// réessai interne du SDK échoue sur `request.clone()` d'undici (`TypeError: unusable`).
// Le SDK enveloppe ce TypeError dans un UnexpectedClientError (`cause`), qui n'est pas un
// TypeError : sans lecture de la cause, aucun réessai (18 quiz en échec d'affilée ce jour-là).
// Le caller passe un closure qui re-invoque la méthode SDK à chaque tentative ;
// chaque invocation recrée un undici Request neuf côté SDK, contournant le bug.
const SDK_CLONE_BUG = /unusable/i;

const isCloneBugTypeError = (e: unknown): boolean => {
  return e instanceof TypeError && SDK_CLONE_BUG.test(e.message);
};

const isSdkCloneBug = (err: object): boolean => {
  return isCloneBugTypeError(err) || isCloneBugTypeError((err as { cause?: unknown }).cause);
};

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
  if (isSdkCloneBug(err)) return true;
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
  // Réessai : chaque tentative attend l'échec de la précédente, puis le délai de backoff.
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      // eslint-disable-next-line no-await-in-loop -- réessai séquentiel par nature
      return await fn();
    } catch (e) {
      lastError = e;
      if (!isRetryable(e) || attempt === MAX_ATTEMPTS) break;
      const delay = Math.min(BASE_BACKOFF_MS * 2 ** (attempt - 1), MAX_BACKOFF_MS);
      logger.warn(label, `attempt ${attempt} failed (${describeError(e)}), retrying in ${delay}ms`);
      // eslint-disable-next-line no-await-in-loop -- backoff entre deux tentatives
      await new Promise((r) => setTimeout(r, delay)); // NOSONAR(S9382) — backoff entre deux tentatives
    }
  }
  throw lastError ?? new Error(`callWithRetry: no attempt executed for ${label}`);
}
