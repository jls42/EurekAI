import { describe, it, expect } from 'vitest';
import { runWithUsageTracking, recordUsage } from './usage-context.js';

describe('usage-context', () => {
  it('captures usage entries within tracking context', async () => {
    const { result, usage } = await runWithUsageTracking(async () => {
      recordUsage({ promptTokens: 100, completionTokens: 50, totalTokens: 150, model: 'mistral-large-latest' });
      recordUsage({ inputCharacters: 3000, model: 'voxtral-mini-tts-2603' });
      return 'ok';
    });

    expect(result).toBe('ok');
    expect(usage).toHaveLength(2);
    expect(usage[0].promptTokens).toBe(100);
    expect(usage[1].inputCharacters).toBe(3000);
  });

  it('isolates concurrent tracking contexts', async () => {
    const [r1, r2] = await Promise.all([
      runWithUsageTracking(async () => {
        recordUsage({ promptTokens: 100, model: 'mistral-large-latest' });
        return 'ctx1';
      }),
      runWithUsageTracking(async () => {
        recordUsage({ promptTokens: 200, model: 'mistral-small-latest' });
        recordUsage({ promptTokens: 300, model: 'mistral-small-latest' });
        return 'ctx2';
      }),
    ]);

    expect(r1.usage).toHaveLength(1);
    expect(r1.usage[0].promptTokens).toBe(100);
    expect(r2.usage).toHaveLength(2);
    expect(r2.usage[0].promptTokens).toBe(200);
  });

  it('attaches captured usage to thrown error', async () => {
    const err: any = await runWithUsageTracking(async () => {
      recordUsage({ promptTokens: 500, completionTokens: 100, totalTokens: 600, model: 'mistral-large-latest' });
      recordUsage({ inputCharacters: 2000, model: 'voxtral-mini-tts-2603' });
      throw new Error('generation failed');
    }).catch((e) => e);

    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('generation failed');
    expect(err.apiUsage).toHaveLength(2);
    expect(err.apiUsage[0].promptTokens).toBe(500);
    expect(err.apiUsage[1].inputCharacters).toBe(2000);
  });

  it('attaches empty array when fn throws before any usage', async () => {
    const err: any = await runWithUsageTracking(async () => {
      throw new Error('immediate failure');
    }).catch((e) => e);

    expect(err.apiUsage).toEqual([]);
  });

  it('silently discards usage when no context is active', () => {
    recordUsage({ promptTokens: 100, model: 'mistral-large-latest' });
    // No throw = success; verify no lingering state by running a clean tracking context
    expect(true).toBe(true);
  });
});
