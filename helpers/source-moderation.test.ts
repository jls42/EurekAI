/* eslint-disable
   @typescript-eslint/no-non-null-assertion,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access
   --
   Codacy lance ESLint sans les types Vitest/mocks; lint:ci local reste type-aware. */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { Mistral } from '@mistralai/mistralai';
import { ProjectStore } from '../store.js';
import { ProfileStore } from '../profiles.js';
import type { ModerationResult, ModerationStatus } from '../types.js';
import { logger } from './logger.js';

vi.mock('../generators/moderation.js', () => ({
  moderateContent: vi.fn(async () => ({ status: 'safe', categories: {} })),
}));

import { moderateContent } from '../generators/moderation.js';
import {
  MODERATION_WAIT_MS,
  moderateSourceOnce,
  resumeModerationAtBoot,
  selectSources,
  settleSourceModeration,
  startSourceModeration,
} from './source-moderation.js';

const client = {} as Mistral;
const SAFE: ModerationResult = { status: 'safe', categories: {} };

let tmpDir: string;
let store: ProjectStore;
let profileStore: ProfileStore;

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
};

const addSource = (pid: string, id: string, status?: string) => {
  store.addSource(pid, {
    id,
    filename: `${id}.txt`,
    markdown: `MD-${id}`,
    uploadedAt: new Date().toISOString(),
    sourceType: 'text',
    ...(status && { moderation: { status: status as ModerationStatus, categories: {} } }),
  });
};

const statusOf = (pid: string, id: string) =>
  store.getProject(pid)!.sources.find((s) => s.id === id)?.moderation?.status;

const moderatedTexts = () => vi.mocked(moderateContent).mock.calls.map((c) => c[1]);

// Projet d'un profil enfant : modération active, défauts de l'âge.
const createModeratedProject = (): string => {
  const kid = profileStore.create('Kid', 9);
  return store.createProject('P', kid.id).meta.id;
};

const settle = (pid: string, sourceIds?: string[], waitMs: number = MODERATION_WAIT_MS.request) =>
  settleSourceModeration({ store, profileStore, client }, pid, { sourceIds, waitMs });

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), 'source-moderation-'));
  store = new ProjectStore(tmpDir);
  profileStore = new ProfileStore(tmpDir);
  vi.mocked(moderateContent).mockReset();
  vi.spyOn(logger, 'info').mockImplementation(() => undefined);
  vi.spyOn(logger, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  rmSync(tmpDir, { recursive: true, force: true });
});

describe('selectSources', () => {
  const sources = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

  it.each([undefined, []])('sourceIds %j : toutes les sources', (sourceIds) => {
    expect(selectSources(sources, sourceIds)).toEqual(sources);
  });

  it('sourceIds : seulement les sources visées, dans leur ordre', () => {
    expect(selectSources(sources, ['c', 'a', 'absente'])).toEqual([{ id: 'a' }, { id: 'c' }]);
  });
});

describe('moderateSourceOnce', () => {
  it('persiste le résultat avec les catégories reçues', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');

    await moderateSourceOnce(store, client, pid, { id: 's1', markdown: 'MD-s1' }, ['criminal']);

    expect(moderateContent).toHaveBeenCalledWith(client, 'MD-s1', ['criminal']);
    expect(statusOf(pid, 's1')).toBe('safe');
    expect(logger.info).toHaveBeenCalledWith('moderation', 'SAFE (source s1)');
  });

  it('deux demandes concurrentes : un seul appel, la même promesse', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    const gate = deferred<ModerationResult>();
    vi.mocked(moderateContent).mockReturnValueOnce(gate.promise);
    const source = { id: 's1', markdown: 'MD-s1' };

    const first = moderateSourceOnce(store, client, pid, source, ['sexual']);
    const second = moderateSourceOnce(store, client, pid, source, ['sexual']);

    expect(second).toBe(first);
    expect(moderateContent).toHaveBeenCalledTimes(1);
    gate.resolve({ status: 'unsafe', categories: { sexual: true } });
    await Promise.all([first, second]);
    expect(statusOf(pid, 's1')).toBe('unsafe');
  });

  it('modération terminée : une nouvelle demande relance un appel', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    vi.mocked(moderateContent).mockResolvedValue(SAFE);
    const source = { id: 's1', markdown: 'MD-s1' };

    await moderateSourceOnce(store, client, pid, source, []);
    await moderateSourceOnce(store, client, pid, source, []);

    expect(moderateContent).toHaveBeenCalledTimes(2);
  });

  it("exception de l'API : `error` persisté, logger.error, ne lève pas", async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    vi.mocked(moderateContent).mockRejectedValueOnce(new Error('upstream 503'));

    await expect(
      moderateSourceOnce(store, client, pid, { id: 's1', markdown: 'MD-s1' }, []),
    ).resolves.toBeUndefined();

    expect(statusOf(pid, 's1')).toBe('error');
    expect(logger.error).toHaveBeenCalledWith(
      'moderation',
      'error (source s1):',
      expect.any(Error),
    );
  });

  it('source supprimée pendant la modération : rien n’est recréé', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    const gate = deferred<ModerationResult>();
    vi.mocked(moderateContent).mockReturnValueOnce(gate.promise);

    const run = moderateSourceOnce(store, client, pid, { id: 's1', markdown: 'MD-s1' }, []);
    store.deleteSource(pid, 's1');
    gate.resolve(SAFE);
    await run;

    expect(store.getProject(pid)!.sources).toEqual([]);
  });

  it('écriture impossible : journalisée, ne lève pas', async () => {
    vi.mocked(moderateContent).mockResolvedValueOnce(SAFE);
    const failingStore = {
      getProject: () => null,
      setSourceModeration: () => {
        throw new Error('EROFS');
      },
    };

    await expect(
      moderateSourceOnce(failingStore, client, 'p', { id: 's1', markdown: 'x' }, []),
    ).resolves.toBeUndefined();

    expect(logger.error).toHaveBeenCalledWith(
      'moderation',
      'persist failed (source s1)',
      expect.any(Error),
    );
  });
});

describe('startSourceModeration', () => {
  it("une génération arrivée pendant l'import attend la même modération", async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    const gate = deferred<ModerationResult>();
    vi.mocked(moderateContent).mockReturnValueOnce(gate.promise);

    startSourceModeration(store, client, pid, { id: 's1', markdown: 'MD-s1' }, ['sexual']);
    const waiting = settle(pid);
    gate.resolve(SAFE);
    await waiting;

    expect(moderateContent).toHaveBeenCalledTimes(1);
    expect(statusOf(pid, 's1')).toBe('safe');
  });
});

describe('settleSourceModeration', () => {
  it('reprend les sources en attente, en erreur, au statut inattendu ou jamais vérifiées', async () => {
    const pid = createModeratedProject();
    for (const [id, status] of [
      ['s-pending', 'pending'],
      ['s-error', 'error'],
      ['s-weird', 'blocked'],
      ['s-safe', 'safe'],
      ['s-unsafe', 'unsafe'],
      ['s-none', undefined],
    ] as const) {
      addSource(pid, id, status);
    }
    vi.mocked(moderateContent).mockResolvedValue(SAFE);

    await settle(pid);

    expect(moderatedTexts().sort((a, b) => a.localeCompare(b))).toEqual([
      'MD-s-error',
      'MD-s-none',
      'MD-s-pending',
      'MD-s-weird',
    ]);
    expect(statusOf(pid, 's-pending')).toBe('safe');
    expect(statusOf(pid, 's-error')).toBe('safe');
    expect(statusOf(pid, 's-unsafe')).toBe('unsafe');
    // Jamais vérifiée (import modération inactive, projet rattaché) : vérifiée à son tour.
    expect(statusOf(pid, 's-none')).toBe('safe');
  });

  it('profil non modéré : une source jamais vérifiée n’est pas modérée', async () => {
    const pid = store.createProject('P', profileStore.create('A', 30).id).meta.id;
    addSource(pid, 's-none');

    await settle(pid);

    expect(moderateContent).not.toHaveBeenCalled();
    expect(statusOf(pid, 's-none')).toBeUndefined();
  });

  it('sourceIds : seulement les sources visées ; [] = toutes', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    addSource(pid, 's2', 'pending');
    vi.mocked(moderateContent).mockResolvedValue(SAFE);

    await settle(pid, ['s2']);
    expect(moderatedTexts()).toEqual(['MD-s2']);
    expect(statusOf(pid, 's1')).toBe('pending');

    await settle(pid, []);
    expect(moderatedTexts()).toEqual(['MD-s2', 'MD-s1']);
  });

  it('catégories du profil propriétaire transmises, liste vide comprise', async () => {
    const kid = profileStore.create('Kid', 9);
    profileStore.update(kid.id, { moderationCategories: [] });
    const pid = store.createProject('P', kid.id).meta.id;
    addSource(pid, 's1', 'pending');
    vi.mocked(moderateContent).mockResolvedValue(SAFE);

    await settle(pid);

    expect(moderateContent).toHaveBeenCalledWith(client, 'MD-s1', []);
  });

  it.each([
    ['profil non modéré', () => store.createProject('P', profileStore.create('A', 30).id).meta.id],
    ['projet sans profil', () => store.createProject('P').meta.id],
  ])('%s : aucune modération lancée', async (_label, create) => {
    const pid = create();
    addSource(pid, 's1', 'pending');

    await settle(pid);

    expect(moderateContent).not.toHaveBeenCalled();
    expect(statusOf(pid, 's1')).toBe('pending');
  });

  it.each(['inconnu', '../evasion'])('projet %s : rend la main sans lever', async (pid) => {
    await expect(settle(pid)).resolves.toBeUndefined();
    expect(moderateContent).not.toHaveBeenCalled();
  });

  it('au plus 10 nouvelles modérations par appel, le reste journalisé puis repris', async () => {
    const pid = createModeratedProject();
    for (let i = 1; i <= 12; i++) addSource(pid, `s${i}`, 'pending');
    vi.mocked(moderateContent).mockResolvedValue(SAFE);

    await settle(pid);

    expect(moderateContent).toHaveBeenCalledTimes(10);
    expect(logger.info).toHaveBeenCalledWith(
      'moderation',
      'settle: 2 source(s) left for a later call (max 10 new per call)',
    );
    await settle(pid);
    expect(moderateContent).toHaveBeenCalledTimes(12);
    expect(store.getProject(pid)!.sources.every((s) => s.moderation?.status === 'safe')).toBe(true);
  });

  it('les modérations déjà en vol sont rejointes sans compter dans le plafond', async () => {
    const pid = createModeratedProject();
    for (let i = 1; i <= 11; i++) addSource(pid, `s${i}`, 'pending');
    const gate = deferred<ModerationResult>();
    vi.mocked(moderateContent).mockReturnValueOnce(gate.promise).mockResolvedValue(SAFE);
    startSourceModeration(store, client, pid, { id: 's1', markdown: 'MD-s1' }, []);

    const waiting = settle(pid);
    gate.resolve(SAFE);
    await waiting;

    expect(moderateContent).toHaveBeenCalledTimes(11);
    expect(statusOf(pid, 's11')).toBe('safe');
  });

  it('délai dépassé : rend la main, la modération continue en arrière-plan', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    const gate = deferred<ModerationResult>();
    vi.mocked(moderateContent).mockReturnValueOnce(gate.promise);

    let settled = false;
    const waiting = settle(pid, undefined, 8000).then(() => {
      settled = true;
    });
    await vi.advanceTimersByTimeAsync(7999);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    await waiting;

    expect(statusOf(pid, 's1')).toBe('pending');
    expect(logger.info).toHaveBeenCalledWith(
      'moderation',
      'settle: 1 moderation(s) still running after 8000 ms',
    );
    gate.resolve(SAFE);
    // Rejoint la modération restée en vol : elle aboutit après la réponse.
    await moderateSourceOnce(store, client, pid, { id: 's1', markdown: 'MD-s1' }, []);
    expect(statusOf(pid, 's1')).toBe('safe');
    expect(moderateContent).toHaveBeenCalledTimes(1);
  });

  it('modération finie avant le délai : minuteur retiré', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    vi.mocked(moderateContent).mockResolvedValueOnce(SAFE);

    await settle(pid);

    expect(statusOf(pid, 's1')).toBe('safe');
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('resumeModerationAtBoot', () => {
  it('sources pending des projets modérés seulement, une par une', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    addSource(pid, 's2', 'pending');
    addSource(pid, 's-error', 'error');
    addSource(pid, 's-none');
    const adultPid = store.createProject('A', profileStore.create('A', 30).id).meta.id;
    addSource(adultPid, 'a1', 'pending');
    const orphanPid = store.createProject('O').meta.id;
    addSource(orphanPid, 'o1', 'pending');
    const first = deferred<ModerationResult>();
    vi.mocked(moderateContent).mockReturnValueOnce(first.promise).mockResolvedValue(SAFE);

    const resuming = resumeModerationAtBoot(store, profileStore, client);
    await vi.waitFor(() => expect(moderateContent).toHaveBeenCalledTimes(1));
    // Séquentiel : la seconde source attend la fin de la première.
    await new Promise((r) => setTimeout(r, 10));
    expect(moderateContent).toHaveBeenCalledTimes(1);
    first.resolve(SAFE);

    await expect(resuming).resolves.toBe(2);
    expect(moderatedTexts()).toEqual(['MD-s1', 'MD-s2']);
    expect(statusOf(pid, 's-error')).toBe('error');
    expect(statusOf(adultPid, 'a1')).toBe('pending');
    expect(statusOf(orphanPid, 'o1')).toBe('pending');
    expect(logger.info).toHaveBeenCalledWith(
      'moderation',
      'boot: resumed moderation of 2 source(s)',
    );
  });

  it('source vérifiée entre-temps : pas de nouvel appel', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    addSource(pid, 's2', 'pending');
    // Pendant la reprise de s1, s2 est vérifiée par un autre chemin (génération, « Revérifier »).
    vi.mocked(moderateContent).mockImplementationOnce(async () => {
      store.setSourceModeration(pid, 's2', SAFE);
      return SAFE;
    });

    await expect(resumeModerationAtBoot(store, profileStore, client)).resolves.toBe(1);
    expect(moderatedTexts()).toEqual(['MD-s1']);
  });

  it('projet illisible : journalisé, les autres projets sont repris', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'pending');
    vi.mocked(moderateContent).mockResolvedValue(SAFE);
    const brokenStore = {
      listProjects: () =>
        [{ id: 'broken' }, { id: pid }] as ReturnType<ProjectStore['listProjects']>,
      getProject: (id: string) => {
        if (id === 'broken') throw new Error('EACCES');
        return store.getProject(id);
      },
      setSourceModeration: store.setSourceModeration.bind(store),
    };

    await expect(resumeModerationAtBoot(brokenStore, profileStore, client)).resolves.toBe(1);
    expect(logger.error).toHaveBeenCalledWith(
      'moderation',
      'boot resume failed for project broken',
      expect.any(Error),
    );
    expect(statusOf(pid, 's1')).toBe('safe');
  });

  it('rien à reprendre : aucun appel, aucun journal', async () => {
    const pid = createModeratedProject();
    addSource(pid, 's1', 'safe');

    await expect(resumeModerationAtBoot(store, profileStore, client)).resolves.toBe(0);
    expect(moderateContent).not.toHaveBeenCalled();
    expect(logger.info).not.toHaveBeenCalledWith('moderation', expect.stringContaining('boot'));
  });
});
