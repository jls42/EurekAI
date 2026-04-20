import type { AppContext } from './app-context';

/** Update currentProject.totalCost and costLog from a cost delta. */
export function addCostDelta(
  state: Pick<AppContext, 'currentProject'>,
  delta?: number,
  route?: string,
): void {
  if (delta && state.currentProject) {
    const project = state.currentProject as typeof state.currentProject & {
      totalCost?: number;
      costLog?: Array<{ timestamp: string; route: string; cost: number }>;
    };
    project.totalCost = (project.totalCost || 0) + delta;
    project.costLog ??= [];
    project.costLog.push({
      timestamp: new Date().toISOString(),
      route: route || 'unknown',
      cost: delta,
    });
  }
}
