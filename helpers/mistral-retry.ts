import { logger } from './logger.js';

const MAX_ATTEMPTS = 10;
const BASE_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 8000;

// Bug SDK Mistral 2.2.0 : request.clone() échoue avec undici `TypeError: unusable`
// lors des retries internes → l'exception remonte et l'appel échoue à vie.
// Ce retry applicatif reconstruit une nouvelle request à chaque tentative
// (contourne le bug) et couvre aussi les 429/5xx upstream.
export async function callWithRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (attempt === MAX_ATTEMPTS) break;
      const delay = Math.min(BASE_BACKOFF_MS * 2 ** (attempt - 1), MAX_BACKOFF_MS);
      logger.warn(label, `attempt ${attempt} failed, retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}
