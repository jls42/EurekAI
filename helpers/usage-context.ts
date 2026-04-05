import { AsyncLocalStorage } from 'node:async_hooks';
import type { ApiUsage } from './pricing.js';

const store = new AsyncLocalStorage<ApiUsage[]>();

/** Run a function within a usage-tracking context. Returns the result + all captured API usages.
 *  On error, attaches captured entries as `apiUsage` on the thrown error before re-throwing. */
export async function runWithUsageTracking<T>(fn: () => Promise<T>): Promise<{ result: T; usage: ApiUsage[] }> {
  const entries: ApiUsage[] = [];
  try {
    const result = await store.run(entries, fn);
    return { result, usage: entries };
  } catch (err) {
    (err as any).apiUsage = entries;
    throw err;
  }
}

/** Record an API usage entry in the current tracking context. No-op if no context active. */
export function recordUsage(usage: ApiUsage): void {
  store.getStore()?.push(usage);
}
