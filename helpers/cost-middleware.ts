import type { Request, Response, NextFunction } from 'express';
import type { ProjectStore } from '../store.js';
import type { ApiUsage } from './pricing.js';
import { runWithUsageTracking } from './usage-context.js';
import { persistUsage } from './cost-persist.js';

/**
 * Wrap an Express route handler with API cost tracking.
 * Captures all Mistral API usage during the handler execution
 * and appends a cost entry to the project's cost log — even if the handler throws.
 */
export function withCostTracking(
  store: ProjectStore,
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    const pid = String(req.params.pid);
    let usage!: ApiUsage[];
    try {
      const tracked = await runWithUsageTracking(() => handler(req, res, next));
      usage = tracked.usage;
    } catch (err) {
      usage = (err as { apiUsage?: ApiUsage[] }).apiUsage ?? [];
      throw err;
    } finally {
      persistUsage(store, pid, `${req.method} ${req.baseUrl}${req.route?.path || ''}`, usage);
    }
  };
}
