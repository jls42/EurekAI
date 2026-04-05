import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import type { ApiUsage } from './pricing.js';

vi.mock('./usage-context.js', () => ({
  runWithUsageTracking: vi.fn(),
}));

import { runWithUsageTracking } from './usage-context.js';
import { withCostTracking } from './cost-middleware.js';

const mockedRunWithUsageTracking = vi.mocked(runWithUsageTracking);

function makeReq(overrides: Partial<Request> = {}): Request {
  return {
    params: { pid: 'p1' },
    method: 'POST',
    baseUrl: '/api/projects/p1',
    route: { path: '/generate/summary' },
    ...overrides,
  } as any;
}

const res = {} as Response;
const next: NextFunction = vi.fn();

describe('withCostTracking', () => {
  let store: { appendCostEntry: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    store = { appendCostEntry: vi.fn() };
  });

  it('does not call appendCostEntry when no usage is recorded', async () => {
    mockedRunWithUsageTracking.mockImplementation(async (fn) => {
      await fn();
      return { result: undefined, usage: [] };
    });

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockResolvedValue(undefined);
    const wrapped = withCostTracking(store as any, handler);

    await wrapped(makeReq(), res, next);

    expect(handler).toHaveBeenCalledOnce();
    expect(store.appendCostEntry).not.toHaveBeenCalled();
  });

  it('calls appendCostEntry with correct data when cost > 0', async () => {
    const usage: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, totalTokens: 1500, model: 'mistral-large-latest' },
    ];

    mockedRunWithUsageTracking.mockImplementation(async (fn) => {
      await fn();
      return { result: undefined, usage };
    });

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockResolvedValue(undefined);
    const wrapped = withCostTracking(store as any, handler);

    const fakeNow = new Date('2026-01-15T10:00:00.000Z');
    vi.useFakeTimers({ now: fakeNow });

    try {
      await wrapped(makeReq(), res, next);
    } finally {
      vi.useRealTimers();
    }

    expect(store.appendCostEntry).toHaveBeenCalledOnce();
    const [pid, entry] = store.appendCostEntry.mock.calls[0];
    expect(pid).toBe('p1');
    expect(entry.timestamp).toBe('2026-01-15T10:00:00.000Z');
    expect(entry.route).toBe('POST /api/projects/p1/generate/summary');
    expect(entry.cost).toBeGreaterThan(0);
    expect(entry.usage).toMatchObject({
      promptTokens: 1000,
      completionTokens: 500,
      totalTokens: 1500,
      callCount: 1,
    });
  });

  it('does not call appendCostEntry when cost is 0 (free model)', async () => {
    const usage: ApiUsage[] = [
      { promptTokens: 500, completionTokens: 100, totalTokens: 600, model: 'mistral-moderation-latest' },
    ];

    mockedRunWithUsageTracking.mockImplementation(async (fn) => {
      await fn();
      return { result: undefined, usage };
    });

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockResolvedValue(undefined);
    const wrapped = withCostTracking(store as any, handler);

    await wrapped(makeReq(), res, next);

    expect(handler).toHaveBeenCalledOnce();
    expect(store.appendCostEntry).not.toHaveBeenCalled();
  });

  it('falls back to empty string when req.route is undefined', async () => {
    const usage: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, totalTokens: 1500, model: 'mistral-large-latest' },
    ];

    mockedRunWithUsageTracking.mockImplementation(async (fn) => {
      await fn();
      return { result: undefined, usage };
    });

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockResolvedValue(undefined);
    const wrapped = withCostTracking(store as any, handler);

    await wrapped(makeReq({ route: undefined } as any), res, next);

    expect(store.appendCostEntry).toHaveBeenCalledOnce();
    const [, entry] = store.appendCostEntry.mock.calls[0];
    expect(entry.route).toBe('POST /api/projects/p1');
  });

  it('records cost entry even when handler throws', async () => {
    const usage: ApiUsage[] = [
      { promptTokens: 800, completionTokens: 400, totalTokens: 1200, model: 'mistral-large-latest' },
    ];

    const error = new Error('handler failed');
    (error as any).apiUsage = usage;

    mockedRunWithUsageTracking.mockRejectedValue(error);

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockResolvedValue(undefined);
    const wrapped = withCostTracking(store as any, handler);

    await expect(wrapped(makeReq(), res, next)).rejects.toThrow('handler failed');

    expect(store.appendCostEntry).toHaveBeenCalledOnce();
    const [pid, entry] = store.appendCostEntry.mock.calls[0];
    expect(pid).toBe('p1');
    expect(entry.cost).toBeGreaterThan(0);
  });

  it('does not call appendCostEntry when handler throws with no apiUsage', async () => {
    mockedRunWithUsageTracking.mockRejectedValue(new Error('no usage'));

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockResolvedValue(undefined);
    const wrapped = withCostTracking(store as any, handler);

    await expect(wrapped(makeReq(), res, next)).rejects.toThrow('no usage');
    expect(store.appendCostEntry).not.toHaveBeenCalled();
  });

  it('passes correct req, res, and next to the inner handler', async () => {
    const req = makeReq();
    const capturedArgs: unknown[] = [];

    mockedRunWithUsageTracking.mockImplementation(async (fn) => {
      await fn();
      return { result: undefined, usage: [] };
    });

    const handler = vi.fn<(req: Request, res: Response, next: NextFunction) => Promise<void>>()
      .mockImplementation(async (r, s, n) => {
        capturedArgs.push(r, s, n);
      });

    const wrapped = withCostTracking(store as any, handler);
    await wrapped(req, res, next);

    expect(capturedArgs[0]).toBe(req);
    expect(capturedArgs[1]).toBe(res);
    expect(capturedArgs[2]).toBe(next);
  });
});
