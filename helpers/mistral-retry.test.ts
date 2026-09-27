import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SDKError } from '@mistralai/mistralai/models/errors';
import { callWithRetry } from './mistral-retry.js';
import { logger } from './logger.js';

// Vraie erreur HTTP du SDK installé : le statut est dans `statusCode`, jamais dans `status`. Les
// anciens tests fabriquaient `{ status }` à la main et validaient une branche que les vraies
// erreurs n'atteignaient jamais (réessai applicatif inerte).
const sdkError = (statusCode: number): SDKError => {
  const body = '{"message":"upstream"}';
  return new SDKError('API error occurred', {
    request: new Request('https://api.mistral.ai/v1/chat/completions'),
    response: new Response(body, {
      status: statusCode,
      headers: { 'content-type': 'application/json' },
    }),
    body,
  });
};

describe('callWithRetry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns value on first success without retrying', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const p = callWithRetry('test', fn);
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Transitoires que le SDK ne rejoue pas (ses retryCodes : 429, 500, 502, 503, 504) : 408, et
  // les autres 5xx, dont ceux de Cloudflare placé devant l'API (520 à 529).
  it.each([408, 520, 529])('rejoue un %i (statut que le SDK ne rejoue pas)', async (status) => {
    const fn = vi.fn().mockRejectedValueOnce(sdkError(status)).mockResolvedValueOnce('ok');
    const p = callWithRetry('test', fn);
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Déjà rejoués par le SDK avec son backoff (≤ 120 s) : les rejouer ici multiplierait l'attente.
  it.each([429, 500, 502, 503, 504])(
    'ne rejoue pas un %i, déjà rejoué par le SDK',
    async (status) => {
      const err = sdkError(status);
      const fn = vi.fn().mockRejectedValue(err);
      const p = callWithRetry('test', fn);
      await expect(p).rejects.toBe(err);
      expect(fn).toHaveBeenCalledTimes(1);
    },
  );

  // Erreurs déterministes (client) : aucun retry, l'erreur remonte telle quelle.
  it.each([400, 401, 403, 422])('fails fast on HTTP %i', async (status) => {
    const err = sdkError(status);
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('lit encore `status` en repli (erreur qui ne vient pas du SDK)', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('gateway'), { status: 520 }))
      .mockResolvedValueOnce('ok');
    const p = callWithRetry('test', fn);
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('journalise le vrai statut de l’erreur', async () => {
    const warn = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const fn = vi.fn().mockRejectedValueOnce(sdkError(520)).mockResolvedValueOnce('ok');
    const p = callWithRetry('chat', fn);
    await vi.runAllTimersAsync();
    await p;
    expect(warn).toHaveBeenCalledWith('chat', 'attempt 1 failed (status 520), retrying in 1000ms');
  });

  it('retries on undici `TypeError: unusable` (SDK clone bug)', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Body is unusable: already read'))
      .mockResolvedValueOnce('ok');
    const p = callWithRetry('test', fn);
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('fails fast on SyntaxError (invalid JSON from LLM)', async () => {
    const err = new SyntaxError('Unexpected token');
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fails fast on generic TypeError (not SDK clone bug)', async () => {
    const err = new TypeError('cannot read property x of undefined');
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('rethrows the last error after MAX_ATTEMPTS retryable failures', async () => {
    const err = sdkError(520);
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    p.catch(() => {}); // surface eventual rejection safely
    await vi.runAllTimersAsync();
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('uses exponential backoff (1s, 2s) before capping', async () => {
    const err = sdkError(520);
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    p.catch(() => {});

    // t=0 : première tentative échoue immédiatement
    await vi.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);

    // t=1000 : attente 1s → seconde tentative échoue
    await vi.advanceTimersByTimeAsync(1000);
    expect(fn).toHaveBeenCalledTimes(2);

    // t=3000 : attente 2s → troisième tentative échoue → rejet
    await vi.advanceTimersByTimeAsync(2000);
    expect(fn).toHaveBeenCalledTimes(3);

    await expect(p).rejects.toBe(err);
  });
});
