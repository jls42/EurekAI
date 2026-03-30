import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from './logger.js';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('logger', () => {
  it('info calls console.log with timestamp, level, and prefix', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('sources', 'file uploaded');

    expect(spy).toHaveBeenCalledOnce();
    const msg = spy.mock.calls[0][0] as string;
    expect(msg).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3} INFO \[sources\]$/);
    expect(spy.mock.calls[0][1]).toBe('file uploaded');
  });

  it('warn calls console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('gen', 'slow response');

    expect(spy).toHaveBeenCalledOnce();
    const msg = spy.mock.calls[0][0] as string;
    expect(msg).toContain('WARN');
    expect(msg).toContain('[gen]');
  });

  it('error calls console.error and preserves Error objects intact', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const err = new Error('API down');
    logger.error('moderation', 'failed:', err);

    expect(spy).toHaveBeenCalledOnce();
    const msg = spy.mock.calls[0][0] as string;
    expect(msg).toContain('ERROR');
    expect(msg).toContain('[moderation]');
    expect(spy.mock.calls[0][1]).toBe('failed:');
    expect(spy.mock.calls[0][2]).toBe(err); // Error object passed through, not stringified
  });

  it('passes multiple args through to console', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('test', 'a', 42, { key: 'val' });

    expect(spy.mock.calls[0].slice(1)).toEqual(['a', 42, { key: 'val' }]);
  });
});
