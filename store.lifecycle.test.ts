/* eslint-disable
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-non-null-assertion,
   @typescript-eslint/consistent-type-definitions
   --
   Codacy applique tseslint.recommendedTypeChecked avec son propre tsconfig
   qui exclut les test files → vitest globals (`vi`, `expect`, `describe`,
   `it`...) sont typés `error`, cascadant en 50+ unsafe-* + non-null
   assertions sur les fixtures. Localement `eslint.config.js`
   (projectService: true) résout les types correctement et
   `npm run lint:ci --max-warnings 0` couvre ce fichier. SonarCloud /
   SonarQube / CodeQL résolvent aussi les types proprement. Cf.
   sse-pendings.test.ts qui applique le pattern wrappers vanilla
   équivalent (plus lourd à dupliquer ici). */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore, DEFAULT_PRUNE_MAX_AGE_MS } from './store.js';
import type {
  FailedStepCode,
  Generation,
  PendingTrackerEntry,
  TrackedGenerationType,
} from './types.js';

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

// Helper de construction de PendingTrackerEntry pour les tests. Le discriminated
// union exige que les arms terminales (failed/cancelled) portent failureCode +
// completedAt, donc on résout l'override en arm approprié.
type EntryOverrides = {
  type?: TrackedGenerationType;
  status?: 'pending' | 'failed' | 'cancelled';
  startedAt?: string;
  sourceIds?: string[];
  failureCode?: FailedStepCode;
  completedAt?: string;
};

const buildEntryBase = (id: string, o: EntryOverrides) => ({
  id,
  type: o.type ?? ('summary' as TrackedGenerationType),
  startedAt: o.startedAt ?? new Date().toISOString(),
  sourceIds: o.sourceIds ?? [],
});

// Résout l'arm failed avec le constraint Exclude<FailedStepCode, 'cancelled'>.
const resolveFailedCode = (
  raw: FailedStepCode | undefined,
): Exclude<FailedStepCode, 'cancelled'> => {
  const code = raw ?? 'internal_error';
  return code === 'cancelled' ? 'internal_error' : code;
};

const makeEntry = (id: string, overrides: EntryOverrides = {}): PendingTrackerEntry => {
  const base = buildEntryBase(id, overrides);
  const status = overrides.status ?? 'pending';
  const completedAt = overrides.completedAt ?? new Date().toISOString();
  if (status === 'pending') return { ...base, status };
  if (status === 'cancelled') return { ...base, status, failureCode: 'cancelled', completedAt };
  return { ...base, status, failureCode: resolveFailedCode(overrides.failureCode), completedAt };
};

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

// Narrowing helper : remonte le PendingTrackerEntry au sous-type Terminal
// pour les assertions sur failureCode / completedAt qui n'existent que sur
// l'arm non-pending.
function expectTerminal(e: PendingTrackerEntry) {
  if (e.status === 'pending') {
    throw new Error(`expected terminal entry, got status=pending for ${e.id}`);
  }
  return e;
}

describe('markPendingFailed / markPendingCancelled', () => {
  it('markPendingFailed flippe le status, set failureCode et completedAt', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    expect(store.markPendingFailed(projectId, 'gid-1', 'upstream_unavailable')).toBe(true);
    const data = store.getProject(projectId)!;
    const entry = expectTerminal(data.results.pendingTracker![0]);
    expect(entry.status).toBe('failed');
    expect(entry.failureCode).toBe('upstream_unavailable');
    expect(entry.completedAt).toBeTruthy();
  });

  it('markPendingCancelled flippe le status à cancelled', () => {
    store.addPendingEntry(projectId, makeEntry('gid-1'));
    expect(store.markPendingCancelled(projectId, 'gid-1')).toBe(true);
    const data = store.getProject(projectId)!;
    const entry = expectTerminal(data.results.pendingTracker![0]);
    expect(entry.status).toBe('cancelled');
    expect(entry.failureCode).toBe('cancelled');
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
    const failed = expectTerminal(data.results.pendingTracker!.find((e) => e.id === 'gid-failed')!);
    expect(failed.status).toBe('failed');
    expect(failed.failureCode).toBe('internal_error');
  });

  // Test #13 — invariant boot : un nouveau process qui hérite de pendings sur
  // disque (process précédent crashé pendant une génération) DOIT les passer
  // tous en cancelled au démarrage. Simule la séquence en créant une 2e
  // ProjectStore sur le même tempDir après avoir persisté un pending.
  it('un nouveau ProjectStore re-monté sur le même dir cancelle les pendings persistés', () => {
    store.addPendingEntry(projectId, makeEntry('gid-survivor', { type: 'podcast' }));
    expect(store.getProject(projectId)!.results.pendingTracker![0].status).toBe('pending');

    // Simule le redémarrage : nouvelle instance qui lit project.json hérité.
    const rebooted = new ProjectStore(tempDir);
    const cancelled = rebooted.cancelAllPendingsAtBoot();
    expect(cancelled).toBe(1);

    const data = rebooted.getProject(projectId)!;
    const entry = expectTerminal(data.results.pendingTracker![0]);
    expect(entry.status).toBe('cancelled');
    expect(entry.failureCode).toBe('cancelled');
    expect(entry.completedAt).toBeTruthy();
  });

  it("retourne 0 si aucun pending n'existe", () => {
    expect(store.cancelAllPendingsAtBoot()).toBe(0);
  });

  // Régression-lock : un project.json corrompu ne doit pas tuer le boot. Le
  // sweep doit logger et continuer pour que les autres projets soient quand
  // même balayés (sinon une seule corruption laisse tous les pendings ghost).
  it('continue les autres projets quand un project.json est corrompu', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');

    // Projet 1 (corrompu) : pending posé puis project.json overwrite avec JSON invalide.
    store.addPendingEntry(projectId, makeEntry('gid-corrupt'));
    const corruptPath = path.join(tempDir, 'projects', projectId, 'project.json');
    fs.writeFileSync(corruptPath, '{not valid json');

    // Projet 2 (sain) : pending posé normalement.
    const healthyId = store.createProject('Healthy').meta.id;
    store.addPendingEntry(healthyId, makeEntry('gid-healthy'));

    // Sweep : doit cancel le pending sain (1) et skipper le corrompu sans throw.
    const count = store.cancelAllPendingsAtBoot();
    expect(count).toBe(1);

    // Le projet sain doit être balayé proprement.
    const healthyData = store.getProject(healthyId)!;
    const healthyEntry = expectTerminal(healthyData.results.pendingTracker![0]);
    expect(healthyEntry.status).toBe('cancelled');
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
        makeEntry(`gid-failed-${i}`, {
          status: 'failed',
          failureCode: 'internal_error',
          completedAt,
        }),
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
    // Crée une entrée plus vieille que la fenêtre par défaut, l'autre fraîche.
    const oldTimestamp = new Date(Date.now() - DEFAULT_PRUNE_MAX_AGE_MS - 1000).toISOString();
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

    store.prunePendingTracker(projectId, { maxAgeMs: DEFAULT_PRUNE_MAX_AGE_MS });
    const data = store.getProject(projectId)!;
    expect(data.results.pendingTracker!.map((e) => e.id)).toEqual(['gid-recent']);
  });

  it('retourne 0 si rien à prune', () => {
    expect(store.prunePendingTracker(projectId)).toBe(0);
  });
});
