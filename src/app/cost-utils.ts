/** Update currentProject.totalCost and costLog from a cost delta. */
export function addCostDelta(state: any, delta?: number, route?: string): void {
  if (delta && state.currentProject) {
    state.currentProject.totalCost = (state.currentProject.totalCost || 0) + delta;
    state.currentProject.costLog ??= [];
    state.currentProject.costLog.push({
      timestamp: new Date().toISOString(),
      route: route || 'unknown',
      cost: delta,
    });
  }
}
