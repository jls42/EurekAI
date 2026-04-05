import { describe, it, expect, vi, beforeEach } from 'vitest';
import { persistUsage } from './cost-persist.js';
import type { ApiUsage } from './pricing.js';

function makeStore() {
  return { appendCostEntry: vi.fn() } as any;
}

describe('persistUsage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('writes to costLog and returns cost data for billable usage', () => {
    const store = makeStore();
    const entries: ApiUsage[] = [
      { promptTokens: 1000, completionTokens: 500, totalTokens: 1500, model: 'mistral-large-latest' },
    ];

    const result = persistUsage(store, 'p1', 'POST /generate/summary', entries);

    expect(result).not.toBeNull();
    expect(result!.cost).toBeGreaterThan(0);
    expect(result!.usage.promptTokens).toBe(1000);
    expect(result!.usage.callCount).toBe(1);
    expect(result!.costBreakdown.length).toBeGreaterThan(0);
    expect(store.appendCostEntry).toHaveBeenCalledOnce();
    const [pid, entry] = store.appendCostEntry.mock.calls[0];
    expect(pid).toBe('p1');
    expect(entry.route).toBe('POST /generate/summary');
    expect(entry.cost).toBe(result!.cost);
  });

  it('returns null for empty usage array', () => {
    const store = makeStore();
    expect(persistUsage(store, 'p1', 'POST /gen', [])).toBeNull();
    expect(store.appendCostEntry).not.toHaveBeenCalled();
  });

  it('returns null for free model (cost = 0)', () => {
    const store = makeStore();
    const entries: ApiUsage[] = [
      { promptTokens: 500, completionTokens: 100, totalTokens: 600, model: 'mistral-moderation-latest' },
    ];

    expect(persistUsage(store, 'p1', 'POST /moderate', entries)).toBeNull();
    expect(store.appendCostEntry).not.toHaveBeenCalled();
  });

  it('aggregates multiple entries into a single costLog write', () => {
    const store = makeStore();
    const entries: ApiUsage[] = [
      { promptTokens: 500, completionTokens: 200, totalTokens: 700, model: 'mistral-large-latest' },
      { inputCharacters: 3000, model: 'voxtral-mini-tts-2603' },
    ];

    const result = persistUsage(store, 'p1', 'POST /generate/podcast', entries);

    expect(result).not.toBeNull();
    expect(result!.usage.callCount).toBe(2);
    expect(result!.usage.promptTokens).toBe(500);
    expect(result!.usage.inputCharacters).toBe(3000);
    expect(store.appendCostEntry).toHaveBeenCalledOnce();
  });
});
