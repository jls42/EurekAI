/* eslint-disable
   @typescript-eslint/no-non-null-assertion
   --
   Fixtures lues après une écriture réussie : le projet et le lot existent. */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore } from './store.js';
import { subscribeAutoRun, subscribeGeneration } from './helpers/event-bus.js';
import type { AutoRun, AutoRunEvent, Generation, GenerationEvent } from './types.js';

// Lots Auto côté serveur : le store tient chaque étape à jour à chaque transition de son entrée du
// tracker (même gid), dans la même écriture, et émet l'état complet du lot (SSE `auto`).

let store: ProjectStore;
let tempDir: string;
let pid: string;
let autoEvents: AutoRunEvent[];
let generationEvents: GenerationEvent[];
let unsubscribe: Array<() => void>;

const RUN_ID = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';

const newRun = (id = RUN_ID): AutoRun => ({
  id,
  status: 'analysing',
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  request: { lang: 'fr', ageGroup: 'enfant', sourceIds: ['s1'], useConsigne: true },
  steps: [],
  skipped: [],
});

const STEPS = [
  { agent: 'summary', gid: 'gid-summary' },
  { agent: 'quiz', gid: 'gid-quiz' },
] as const;

const gen = (id: string, type: 'summary' | 'quiz'): Generation =>
  ({ id, type, title: 't', createdAt: new Date().toISOString(), sourceIds: [], data: {} }) as any;

const startRun = (): AutoRun => {
  expect(store.createAutoRun(pid, newRun())).toBe('created');
  return store.startAutoRunSteps(pid, RUN_ID, [...STEPS], ['translate'])!;
};

const run = (): AutoRun => store.getAutoRun(pid, RUN_ID)!;
const stepStatuses = () => run().steps.map((s) => [s.agent, s.status, s.failureCode]);

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-autoruns-'));
  store = new ProjectStore(tempDir);
  pid = store.createProject('Auto').meta.id;
  autoEvents = [];
  generationEvents = [];
  unsubscribe = [
    subscribeAutoRun(pid, (e) => autoEvents.push(e)),
    subscribeGeneration(pid, (e) => generationEvents.push(e)),
  ];
});

afterEach(() => {
  unsubscribe.forEach((u) => u());
  rmSync(tempDir, { recursive: true, force: true });
});

describe('createAutoRun', () => {
  it('crée le lot en analyse et émet son état', () => {
    expect(store.createAutoRun(pid, newRun())).toBe('created');
    expect(run().status).toBe('analysing');
    expect(autoEvents.map((e) => e.run.status)).toEqual(['analysing']);
  });

  it('un seul lot actif par cours ; même runId renvoyé : duplicate ; cours absent : missing', () => {
    store.createAutoRun(pid, newRun());
    expect(store.createAutoRun(pid, newRun('ffffffff-bbbb-4ccc-8ddd-eeeeeeeeeeee'))).toBe('busy');
    expect(store.createAutoRun(pid, newRun())).toBe('duplicate');
    expect(store.createAutoRun('absent', newRun())).toBe('missing');
    expect(store.getProject(pid)!.results.autoRuns).toHaveLength(1);
  });

  it('un nouveau lot est possible une fois le précédent terminé', () => {
    store.createAutoRun(pid, newRun());
    store.cancelAutoRun(pid, RUN_ID);
    expect(store.createAutoRun(pid, newRun('ffffffff-bbbb-4ccc-8ddd-eeeeeeeeeeee'))).toBe(
      'created',
    );
  });
});

describe('startAutoRunSteps', () => {
  it('en une écriture : entrées du tracker (runId, sources du lancement), plan, running', () => {
    store.createAutoRun(pid, newRun());
    const save = vi.spyOn(store, 'saveProject');
    const started = store.startAutoRunSteps(pid, RUN_ID, [...STEPS], ['translate'])!;
    expect(save).toHaveBeenCalledTimes(1);
    expect(started.status).toBe('running');
    expect(started.skipped).toEqual(['translate']);
    expect(stepStatuses()).toEqual([
      ['summary', 'pending', undefined],
      ['quiz', 'pending', undefined],
    ]);
    const tracker = store.getProject(pid)!.results.pendingTracker!;
    expect(tracker.map((e) => [e.id, e.type, e.status, e.runId, e.sourceIds])).toEqual([
      ['gid-summary', 'summary', 'pending', RUN_ID, ['s1']],
      ['gid-quiz', 'quiz', 'pending', RUN_ID, ['s1']],
    ]);
    expect(generationEvents.map((e) => [e.gid, e.status, e.runId])).toEqual([
      ['gid-summary', 'pending', RUN_ID],
      ['gid-quiz', 'pending', RUN_ID],
    ]);
  });

  it('lot annulé pendant l’analyse : null, aucune entrée posée', () => {
    store.createAutoRun(pid, newRun());
    store.cancelAutoRun(pid, RUN_ID);
    expect(store.startAutoRunSteps(pid, RUN_ID, [...STEPS], [])).toBeNull();
    expect(store.getProject(pid)!.results.pendingTracker ?? []).toHaveLength(0);
  });

  it('plan vide : lot terminé d’emblée', () => {
    store.createAutoRun(pid, newRun());
    const started = store.startAutoRunSteps(pid, RUN_ID, [], ['translate'])!;
    expect(started.status).toBe('completed');
    expect(started.completedAt).toBeDefined();
  });
});

describe('étapes : chaque transition du tracker met le lot à jour', () => {
  it('étape promue → completed ; dernière étape terminée → lot completed', () => {
    startRun();
    store.promoteToGeneration(pid, 'gid-summary', gen('gid-summary', 'summary'));
    expect(run().status).toBe('running');
    store.markPendingFailed(pid, 'gid-quiz', 'quota_exceeded');
    expect(stepStatuses()).toEqual([
      ['summary', 'completed', undefined],
      ['quiz', 'failed', 'quota_exceeded'],
    ]);
    expect(run().status).toBe('completed');
    expect(run().completedAt).toBeDefined();
    expect(autoEvents.map((e) => e.run.status)).toEqual([
      'analysing',
      'running',
      'running',
      'completed',
    ]);
  });

  it('étape annulée par sa puce : seule elle s’arrête, le lot continue', () => {
    startRun();
    store.markPendingCancelled(pid, 'gid-quiz');
    expect(stepStatuses()).toEqual([
      ['summary', 'pending', undefined],
      ['quiz', 'cancelled', undefined],
    ]);
    expect(run().status).toBe('running');
  });

  it('entrée terminale : garde son runId (base commune jamais recopiée champ par champ)', () => {
    startRun();
    store.markPendingFailed(pid, 'gid-quiz', 'internal_error');
    const entry = store.getProject(pid)!.results.pendingTracker!.find((e) => e.id === 'gid-quiz');
    expect(entry).toMatchObject({ status: 'failed', runId: RUN_ID, sourceIds: ['s1'] });
    const failed = generationEvents.find((e) => e.status === 'failed');
    expect(failed?.runId).toBe(RUN_ID);
  });

  it('génération simple (sans runId) : aucun lot touché, aucun événement auto', () => {
    startRun();
    const before = autoEvents.length;
    store.addPendingEntry(pid, {
      id: 'gid-simple',
      type: 'summary',
      status: 'pending',
      startedAt: new Date().toISOString(),
      sourceIds: [],
    });
    store.markPendingFailed(pid, 'gid-simple', 'internal_error');
    expect(autoEvents).toHaveLength(before);
    expect(stepStatuses().map(([, status]) => status)).toEqual(['pending', 'pending']);
  });
});

describe('cancelAutoRun', () => {
  it('en une écriture : lot, étapes en cours et leurs entrées annulés ; promotion refusée ensuite', () => {
    startRun();
    store.promoteToGeneration(pid, 'gid-summary', gen('gid-summary', 'summary'));
    const save = vi.spyOn(store, 'saveProject');
    const cancelled = store.cancelAutoRun(pid, RUN_ID)!;
    expect(save).toHaveBeenCalledTimes(1);
    expect(cancelled.status).toBe('cancelled');
    expect(stepStatuses()).toEqual([
      ['summary', 'completed', undefined],
      ['quiz', 'cancelled', undefined],
    ]);
    const quizEntry = store
      .getProject(pid)!
      .results.pendingTracker!.find((e) => e.id === 'gid-quiz');
    expect(quizEntry).toMatchObject({ status: 'cancelled', runId: RUN_ID });
    expect(store.promoteToGeneration(pid, 'gid-quiz', gen('gid-quiz', 'quiz'))).toEqual({
      kind: 'cancelled',
    });
    expect(run().status).toBe('cancelled');
  });

  it('lot déjà terminé : rendu tel quel, sans écriture ; lot inconnu : null', () => {
    startRun();
    store.cancelAutoRun(pid, RUN_ID);
    const save = vi.spyOn(store, 'saveProject');
    expect(store.cancelAutoRun(pid, RUN_ID)?.status).toBe('cancelled');
    expect(save).not.toHaveBeenCalled();
    expect(store.cancelAutoRun(pid, 'inconnu')).toBeNull();
  });
});

describe('failAutoRun', () => {
  it('analyse en échec : lot failed avec son code ; sans effet hors analyse', () => {
    store.createAutoRun(pid, newRun());
    expect(store.failAutoRun(pid, RUN_ID, 'upstream_unavailable')).toMatchObject({
      status: 'failed',
      failureCode: 'upstream_unavailable',
    });
    expect(store.failAutoRun(pid, RUN_ID, 'internal_error')).toBeNull();
    expect(run().failureCode).toBe('upstream_unavailable');
  });
});

describe('démarrage du serveur (cancelAllPendingsAtBoot)', () => {
  it('lot en cours → interrupted, étapes en cours interrupted, leurs entrées cancelled', () => {
    startRun();
    store.promoteToGeneration(pid, 'gid-summary', gen('gid-summary', 'summary'));
    expect(store.cancelAllPendingsAtBoot()).toBe(1);
    expect(run().status).toBe('interrupted');
    expect(stepStatuses()).toEqual([
      ['summary', 'completed', undefined],
      ['quiz', 'interrupted', undefined],
    ]);
    const quizEntry = store
      .getProject(pid)!
      .results.pendingTracker!.find((e) => e.id === 'gid-quiz');
    expect(quizEntry).toMatchObject({ status: 'cancelled', runId: RUN_ID });
  });

  it('lot en analyse (aucune entrée) → interrupted et écrit sur disque', () => {
    store.createAutoRun(pid, newRun());
    store.cancelAllPendingsAtBoot();
    expect(run().status).toBe('interrupted');
    expect(run().completedAt).toBeDefined();
  });
});
