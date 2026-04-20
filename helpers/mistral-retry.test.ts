import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { callWithRetry } from './mistral-retry.js';

describe('callWithRetry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns value on first success without retrying', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const p = callWithRetry('test', fn);
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on HTTP 429 then succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('rate limited'), { status: 429 }))
      .mockResolvedValueOnce('ok');
    const p = callWithRetry('test', fn);
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries on HTTP 408 Request Timeout then succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('request timeout'), { status: 408 }))
      .mockResolvedValueOnce('ok');
    const p = callWithRetry('test', fn);
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries on HTTP 503 then succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('service unavail'), { status: 503 }))
      .mockResolvedValueOnce('ok');
    const p = callWithRetry('test', fn);
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
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

  it('fails fast on HTTP 400 (deterministic)', async () => {
    const err = Object.assign(new Error('bad request'), { status: 400 });
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fails fast on HTTP 401 auth error', async () => {
    const err = Object.assign(new Error('unauthorized'), { status: 401 });
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fails fast on HTTP 403 auth error', async () => {
    const err = Object.assign(new Error('forbidden'), { status: 403 });
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fails fast on HTTP 422 validation error', async () => {
    const err = Object.assign(new Error('invalid'), { status: 422 });
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
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
    const err = Object.assign(new Error('still 503'), { status: 503 });
    const fn = vi.fn().mockRejectedValue(err);
    const p = callWithRetry('test', fn);
    p.catch(() => {}); // surface eventual rejection safely
    await vi.runAllTimersAsync();
    await expect(p).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('uses exponential backoff (1s, 2s) before capping', async () => {
    const err = Object.assign(new Error('503'), { status: 503 });
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
