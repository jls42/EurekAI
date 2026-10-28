import { describe, it, expect } from 'vitest';
import {
  AUTO_RUN_MAX_AGE_MS,
  MAX_KEPT_AUTO_RUNS,
  applyStepTransition,
  endAutoRun,
  isResumableAutoRun,
  pruneAutoRuns,
  resumableStepCount,
  resumeInterruptedSteps,
} from './auto-run-state.js';
import type { AutoRun, AutoRunStatus, ProjectData } from '../types.js';

const NOW = Date.parse('2026-10-28T12:00:00.000Z');
const iso = (ms: number) => new Date(ms).toISOString();

const makeRun = (id: string, status: AutoRunStatus, endedMsAgo = 0): AutoRun => ({
  id,
  status,
  startedAt: iso(NOW - endedMsAgo - 1000),
  updatedAt: iso(NOW - endedMsAgo),
  ...(status !== 'analysing' && status !== 'running' && { completedAt: iso(NOW - endedMsAgo) }),
  request: { lang: 'fr', ageGroup: 'enfant', sourceIds: [], useConsigne: true },
  steps: [],
  skipped: [],
});

const project = (autoRuns: AutoRun[]): ProjectData =>
  ({ meta: {}, sources: [], results: { generations: [], autoRuns } }) as unknown as ProjectData;

describe('pruneAutoRuns', () => {
  it('garde les lots actifs, et les terminés à la fois récents et parmi les plus récents', () => {
    const terminals = Array.from({ length: MAX_KEPT_AUTO_RUNS + 5 }, (_, i) =>
      makeRun(`t${i}`, 'completed', i * 1000),
    );
    const data = project([
      makeRun('active', 'running'),
      makeRun('old', 'completed', AUTO_RUN_MAX_AGE_MS + 1),
      ...terminals,
    ]);
    pruneAutoRuns(data, NOW);
    const ids = data.results.autoRuns!.map((r) => r.id);
    expect(ids).toContain('active');
    expect(ids).not.toContain('old');
    expect(ids).toHaveLength(MAX_KEPT_AUTO_RUNS);
    // Les plus récents d'abord retenus (t0 est le plus récent), ordre d'origine conservé.
    expect(ids.slice(1)).toEqual(terminals.slice(0, MAX_KEPT_AUTO_RUNS - 1).map((r) => r.id));
  });
});

describe('applyStepTransition / endAutoRun', () => {
  it('ignore une étape déjà terminée et une entrée d’un autre lot', () => {
    const run = makeRun('r', 'running');
    run.steps = [
      { agent: 'quiz', gid: 'g1', status: 'cancelled' },
      { agent: 'summary', gid: 'g2', status: 'pending' },
    ];
    const data = project([run]);
    expect(applyStepTransition(data, { id: 'g1', runId: 'r' }, 'failed', iso(NOW))).toBeUndefined();
    expect(applyStepTransition(data, { id: 'g2', runId: 'x' }, 'failed', iso(NOW))).toBeUndefined();
    expect(run.steps.map((s) => s.status)).toEqual(['cancelled', 'pending']);
  });

  it('endAutoRun : sans effet sur un lot déjà terminé', () => {
    const run = makeRun('r', 'completed');
    expect(endAutoRun(run, 'cancelled', 'cancelled', iso(NOW))).toBeUndefined();
    expect(run.status).toBe('completed');
  });
});

describe('resumeInterruptedSteps', () => {
  const interrupted = (): AutoRun => {
    const run = makeRun('r', 'interrupted');
    run.steps = [
      { agent: 'summary', gid: 'g1', status: 'completed' },
      { agent: 'quiz', gid: 'g2', status: 'interrupted' },
      { agent: 'flashcards', gid: 'g3', status: 'cancelled' },
      { agent: 'fill-blank', gid: 'g4', status: 'interrupted' },
    ];
    return run;
  };

  it('étapes interrompues seules, gids neufs dans l’ordre du plan, lot running', () => {
    const run = interrupted();
    expect(resumableStepCount(run)).toBe(2);
    const resumed = resumeInterruptedSteps(run, ['n1', 'n2'], iso(NOW));
    expect(resumed).toEqual([
      { agent: 'quiz', gid: 'n1' },
      { agent: 'fill-blank', gid: 'n2' },
    ]);
    expect(run.steps.map((s) => [s.gid, s.status])).toEqual([
      ['g1', 'completed'],
      ['n1', 'pending'],
      ['g3', 'cancelled'],
      ['n2', 'pending'],
    ]);
    expect(run).toMatchObject({ status: 'running', resumedAt: iso(NOW), updatedAt: iso(NOW) });
    expect(run.completedAt).toBeUndefined();
  });

  it('rien à reprendre : interrompu pendant l’analyse, autre statut, gids en nombre faux', () => {
    expect(isResumableAutoRun(makeRun('a', 'interrupted'))).toBe(false);
    const completed = interrupted();
    completed.status = 'completed';
    expect(resumableStepCount(completed)).toBe(0);
    expect(resumeInterruptedSteps(completed, ['n1', 'n2'], iso(NOW))).toBeUndefined();
    const run = interrupted();
    expect(resumeInterruptedSteps(run, ['n1'], iso(NOW))).toBeUndefined();
    expect(run.status).toBe('interrupted');
  });
});
