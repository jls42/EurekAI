import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore } from './store.js';
import type { Generation, PendingTrackerEntry } from './types.js';

let store: ProjectStore;
let tempDir: string;
let projectId: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-lifecycle-'));
  store = new ProjectStore(tempDir);
  projectId = store.createProject('Lifecycle test').meta.id;
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

const makeEntry = (id: string, overrides: Partial<PendingTrackerEntry> = {}): PendingTrackerEntry => ({
  id,
  type: 'summary',
  status: 'pending',
  startedAt: new Date().toISOString(),
  sourceIds: [],
  ...overrides,
});

const makeGen = (id: string): Generation =>
  ({
    id,
    title: 'Test',
    createdAt: new Date().toISOString(),
    sourceIds: [],
    type: 'summary',
    data: { title: 'X', summary: 'Y', key_points: [], vocabulary: [] },
  }) as Generation;

describe('addPendingEntry', () => {
  it('ajoute une entrée au tracker', () => {
    expect(store.addPendingEntry(projectId, makeEntry('gid-1'))).toBe(true);
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker).toHaveLength(1);
    expect(data.results.pendingTracker![0].id).toBe('gid-1');
  });

  it('est idempotent : retourne false si gid existe déjà', () => {
    expect(store.addPendingEntry(projectId, makeEntry('gid-1'))).toBe(true);
    expect(store.addPendingEntry(projectId, makeEntry('gid-1'))).toBe(false);
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker).toHaveLength(1);
  });

  it('retourne false pour un projet inexistant', () => {
    expect(store.addPendingEntry('unknown-pid', makeEntry('gid-1'))).toBe(false);
  });
});

describe('promoteToGeneration', () => {
  it('promeut un pending : retire du tracker, ajoute à generations[], pose completedAt', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    const result = store.promoteToGeneration(projectId, 'gid-1', makeGen('gid-1'));
    expect(result.kind).toBe('promoted');
    if (result.kind !== 'promoted') throw new Error('expected promoted');
    expect(result.generation.completedAt).toBeTruthy();
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker).toEqual([]);
    expect(data.results.generations).toHaveLength(1);
    expect(data.results.generations[0].id).toBe('gid-1');
    expect(data.results.generations[0].completedAt).toBeTruthy();
  });

  it('retourne missing si gid jamais ajouté au tracker', () => {
    const result = store.promoteToGeneration(projectId, 'unknown-gid', makeGen('unknown-gid'));
    expect(result.kind).toBe('missing');
  });

  it('retourne cancelled si markPendingCancelled a gagné la course', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    store.markPendingCancelled(projectId, 'gid-1');
    const result = store.promoteToGeneration(projectId, 'gid-1', makeGen('gid-1'));
    expect(result.kind).toBe('cancelled');
    const data = store.getProject(projectId)!;
    // L'entrée reste cancelled dans le tracker, generations[] non mutée
    expect(data.results.generations).toHaveLength(0);
    expect(data.results.pendingTracker![0].status).toBe('cancelled');
  });

  it('retourne failed avec code si markPendingFailed a gagné la course', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    store.markPendingFailed(projectId, 'gid-1', 'quota_exceeded');
    const result = store.promoteToGeneration(projectId, 'gid-1', makeGen('gid-1'));
    expect(result.kind).toBe('failed');
    if (result.kind !== 'failed') throw new Error('expected failed');
    expect(result.code).toBe('quota_exceeded');
    const data = store.getProject(projectId)!;
    expect(data.results.generations).toHaveLength(0);
  });
});

describe('markPendingFailed / markPendingCancelled', () => {
  it('markPendingFailed flippe le status, set failureCode et completedAt', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    expect(store.markPendingFailed(projectId, 'gid-1', 'upstream_unavailable')).toBe(true);
    const data = store.getProject(projectId)!;
    const entry = data.results.pendingTracker![0];
    expect(entry.status).toBe('failed');
    expect(entry.failureCode).toBe('upstream_unavailable');
    expect(entry.completedAt).toBeTruthy();
  });

  it('markPendingCancelled flippe le status à cancelled', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    expect(store.markPendingCancelled(projectId, 'gid-1')).toBe(true);
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker![0].status).toBe('cancelled');
    expect(data.results.pendingTracker![0].failureCode).toBe('cancelled');
  });

  it('markPendingFailed est no-op (false) si déjà cancelled', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    store.markPendingCancelled(projectId, 'gid-1');
    expect(store.markPendingFailed(projectId, 'gid-1', 'quota_exceeded')).toBe(false);
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker![0].status).toBe('cancelled');
  });

  it('retourne false si gid inconnu', () => {
    expect(store.markPendingFailed(projectId, 'unknown', 'internal_error')).toBe(false);
    expect(store.markPendingCancelled(projectId, 'unknown')).toBe(false);
  });
});

describe('cancelAllPendingsAtBoot', () => {
  it('annule tous les pendings de tous les projets, retourne le compte', () => {
    store.addPendingEntry(projectId, makeEntry('gid-a'));
    store.addPendingEntry(projectId, makeEntry('gid-b'));
    const otherProjectId = store.createProject('Other').meta.id;
    store.addPendingEntry(otherProjectId, makeEntry('gid-c'));

    const count = store.cancelAllPendingsAtBoot();
    expect(count).toBe(3);

    const data1 = store.getProject(projectId)!;
    expect(data1.results.pendingTracker!.every((e) => e.status === 'cancelled')).toBe(true);
    const data2 = store.getProject(otherProjectId)!;
    expect(data2.results.pendingTracker!.every((e) => e.status === 'cancelled')).toBe(true);
  });

  it('ignore les entrées déjà failed/cancelled', () => {
    store.addPendingEntry(projectId, makeEntry('gid-pending'));
    store.addPendingEntry(projectId, makeEntry('gid-failed'));
    store.markPendingFailed(projectId, 'gid-failed', 'internal_error');

    const count = store.cancelAllPendingsAtBoot();
    expect(count).toBe(1);

    const data = store.getProject(projectId)!;
    const failed = data.results.pendingTracker!.find((e) => e.id === 'gid-failed')!;
    expect(failed.status).toBe('failed');
    expect(failed.failureCode).toBe('internal_error');
  });

  it('retourne 0 si aucun pending n\'existe', () => {
    expect(store.cancelAllPendingsAtBoot()).toBe(0);
  });
});

describe('prunePendingTracker', () => {
  it('préserve les pending actifs même au-delà du maxKeep', () => {
    for (let i = 0; i < 60; i++) {
      store.addPendingEntry(projectId, makeEntry(`gid-pending-${i}`));
    }
    const removed = store.prunePendingTracker(projectId, { maxKeep: 10 });
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker).toHaveLength(60);
    expect(removed).toBe(0);
  });

  it('prune les terminals (failed/cancelled) au-delà du maxKeep', () => {
    // On injecte directement des entrées failed via addPendingEntry (le tracker
    // accepte n'importe quel status à l'insertion) pour éviter le pruning auto
    // déclenché par markPendingFailed au-delà de DEFAULT_PRUNE_MAX_KEEP.
    for (let i = 0; i < 5; i++) {
      store.addPendingEntry(projectId, makeEntry(`gid-pending-${i}`));
    }
    for (let i = 0; i < 30; i++) {
      // completedAt étalé pour qu'un tri par récence soit déterministe
      const completedAt = new Date(Date.now() - i * 1000).toISOString();
      store.addPendingEntry(
        projectId,
        makeEntry(`gid-failed-${i}`, { status: 'failed', failureCode: 'internal_error', completedAt }),
      );
    }
    const removed = store.prunePendingTracker(projectId, { maxKeep: 20 });
    const data = store.getProject(projectId)!;
    // 5 pendings préservés + 15 terminals (maxKeep 20 - 5 pendings = 15)
    expect(data.results.pendingTracker).toHaveLength(20);
    expect(data.results.pendingTracker!.filter((e) => e.status === 'pending')).toHaveLength(5);
    expect(removed).toBe(15);
  });

  it('prune les terminals trop anciens (maxAgeMs)', () => {
    const oldTimestamp = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
    const recent = makeEntry('gid-recent', {
      status: 'failed',
      failureCode: 'internal_error',
      completedAt: new Date().toISOString(),
    });
    const old = makeEntry('gid-old', {
      status: 'failed',
      failureCode: 'internal_error',
      startedAt: oldTimestamp,
      completedAt: oldTimestamp,
    });
    store.addPendingEntry(projectId, recent);
    store.addPendingEntry(projectId, old);

    store.prunePendingTracker(projectId, { maxAgeMs: 7 * 24 * 60 * 60 * 1000 });
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker!.map((e) => e.id)).toEqual(['gid-recent']);
  });

  it('retourne 0 si rien à prune', () => {
    expect(store.prunePendingTracker(projectId)).toBe(0);
  });
});
