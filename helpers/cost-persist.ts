import type { ProjectStore } from '../store.js';
import type { ApiUsage, GenerationUsage } from './pricing.js';
import { aggregateUsage, calculateTotalCost, buildCostBreakdown } from './cost-calc.js';

export interface PersistResult {
  cost: number;
  usage: GenerationUsage;
  costBreakdown: string[];
}

/**
 * Single point of truth for persisting API cost.
 * Writes to costLog AND returns data for entity decoration + client response.
 * Returns null if no billable usage.
 */
export function persistUsage(
  store: ProjectStore, pid: string, route: string, entries: ApiUsage[],
): PersistResult | null {
  if (entries.length === 0) return null;
  const cost = calculateTotalCost(entries);
  if (cost <= 0) return null;
  const usage = aggregateUsage(entries);
  const costBreakdown = buildCostBreakdown(entries);
  store.appendCostEntry(pid, {
    timestamp: new Date().toISOString(),
    route,
    cost,
    usage,
  });
  return { cost, usage, costBreakdown };
}
