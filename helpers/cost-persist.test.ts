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
      {
        promptTokens: 1000,
        completionTokens: 500,
        totalTokens: 1500,
        model: 'mistral-large-latest',
      },
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

  it('returns null for zero-cost / unknown model', () => {
    const store = makeStore();
    const entries: ApiUsage[] = [
      {
        promptTokens: 500,
        completionTokens: 100,
        totalTokens: 600,
        model: 'free-unknown-model',
      },
    ];

    expect(persistUsage(store, 'p1', 'POST /gen', entries)).toBeNull();
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

  it("agent image : frais d'outil persistés (coût, usage, détail, costLog)", () => {
    const store = makeStore();
    // Usage réel d'une génération d'image capturé le 2026-09-26.
    const entries: ApiUsage[] = [
      {
        promptTokens: 187,
        completionTokens: 464,
        totalTokens: 943,
        connectorTokens: 292,
        toolCalls: { image_generation: 1 },
        model: 'mistral-large-latest',
      },
    ];

    const result = persistUsage(store, 'p1', 'POST /generate/image', entries);

    expect(result).not.toBeNull();
    // (187 + 292) × 0,5/M + 464 × 1,5/M + 0,10 = 0,1009355 (arrondi au millionième)
    expect(result!.cost).toBeCloseTo(0.1009355, 5);
    expect(result!.usage.toolCalls).toEqual({ image_generation: 1 });
    expect(result!.usage.connectorTokens).toBe(292);
    expect(result!.costBreakdown).toContain('1 × image_generation × $0.10/call = $0.1000');
    const [, entry] = store.appendCostEntry.mock.calls[0];
    expect(entry.cost).toBe(result!.cost);
    expect(entry.usage.toolCalls).toEqual({ image_generation: 1 });
  });

  it("frais d'outil seuls (modèle sans tarif) : coût > 0 persisté", () => {
    const store = makeStore();
    const entries: ApiUsage[] = [{ toolCalls: { web_search: 2 }, model: 'unknown-agent-model' }];

    const result = persistUsage(store, 'p1', 'POST /sources/websearch', entries);

    expect(result!.cost).toBeCloseTo(0.06, 6);
    expect(store.appendCostEntry).toHaveBeenCalledOnce();
  });
});
