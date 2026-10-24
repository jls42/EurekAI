/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  abortSingleRuns,
  endSingleRun,
  registerSingleRun,
  restoreSingleRuns,
  singleRunControllers,
} from './single-runs';

type Run = { projectId: string; controller: AbortController };

const makeState = () => ({
  singleRuns: {} as Record<string, Run>,
  abortControllersByGid: {} as Record<string, AbortController>,
});

describe('single-runs', () => {
  it('inscrit une génération envoyée, puis la retire à sa réponse', () => {
    const ctx = makeState();
    const controller = new AbortController();
    registerSingleRun(ctx, 'g1', 'pid-1', controller);
    expect(ctx.singleRuns).toEqual({ g1: { projectId: 'pid-1', controller } });
    expect(singleRunControllers(ctx)).toEqual(new Set([controller]));
    endSingleRun(ctx, 'g1');
    expect(ctx.singleRuns).toEqual({});
  });

  it('contexte partiel sans registre : aucun contrôleur épargné', () => {
    expect(singleRunControllers({})).toEqual(new Set());
  });

  it('retour sur le cours : seuls ses contrôleurs redeviennent annulables par l’écran', () => {
    const ctx = makeState();
    const mine = new AbortController();
    const other = new AbortController();
    registerSingleRun(ctx, 'g1', 'pid-1', mine);
    registerSingleRun(ctx, 'g2', 'pid-2', other);
    restoreSingleRuns(ctx, 'pid-1');
    expect(ctx.abortControllersByGid).toEqual({ g1: mine });
  });

  it('cours supprimé ou « Tout annuler » : ses générations sont abortées, pas celles des autres', () => {
    const ctx = makeState();
    const mine = new AbortController();
    const other = new AbortController();
    registerSingleRun(ctx, 'g1', 'pid-1', mine);
    registerSingleRun(ctx, 'g2', 'pid-2', other);
    abortSingleRuns(ctx, 'pid-1');
    expect(mine.signal.aborted).toBe(true);
    expect(other.signal.aborted).toBe(false);
    expect(Object.keys(ctx.singleRuns)).toEqual(['g2']);
  });
});
