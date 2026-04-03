import { AsyncLocalStorage } from 'node:async_hooks';
import type { ApiUsage } from './pricing.js';

const store = new AsyncLocalStorage<ApiUsage[]>();

/** Run a function within a usage-tracking context. Returns the result + all captured API usages. */
export async function runWithUsageTracking<T>(fn: () => Promise<T>): Promise<{ result: T; usage: ApiUsage[] }> {
  const entries: ApiUsage[] = [];
  const result = await store.run(entries, fn);
  return { result, usage: entries };
}

/** Record an API usage entry in the current tracking context. No-op if no context active. */
export function recordUsage(usage: ApiUsage): void {
  store.getStore()?.push(usage);
}
