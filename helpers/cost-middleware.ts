import type { Request, Response, NextFunction } from 'express';
import type { ProjectStore } from '../store.js';
import { runWithUsageTracking } from './usage-context.js';
import { aggregateUsage, calculateTotalCost } from './cost-calc.js';

/**
 * Wrap an Express route handler with API cost tracking.
 * Captures all Mistral API usage during the handler execution
 * and appends a cost entry to the project's cost log.
 */
export function withCostTracking(
  store: ProjectStore,
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    const pid = String(req.params.pid);
    const { usage } = await runWithUsageTracking(() => handler(req, res, next));
    if (pid && usage.length > 0) {
      const cost = calculateTotalCost(usage);
      if (cost > 0) {
        store.appendCostEntry(pid, {
          timestamp: new Date().toISOString(),
          route: `${req.method} ${req.baseUrl}${req.route?.path || ''}`,
          cost,
          usage: aggregateUsage(usage),
        });
      }
    }
  };
}
