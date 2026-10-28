/* eslint-disable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call
   --
   Contexte Alpine partiel : seuls les champs lus par le registre sont fournis. */
import { describe, it, expect, vi } from 'vitest';
import {
  applyAutoRunUpdate,
  isCancelledRun,
  markRunCancelled,
  restoreAutoRun,
  trackAutoRun,
} from './auto-runs';

// Registre des lots Auto suivis par l'onglet : affichage, coût de l'analyse compté une fois, bilan
// final une seule fois par onglet et par lot, rangé sous le cours du lot.

let seq = 0;
const newId = () => `run-${++seq}`;

const run = (
  id: string,
  status: string,
  steps: Array<[string, string, string?]> = [],
  extra = {},
) =>
  ({
    id,
    status,
    startedAt: '',
    updatedAt: '',
    request: {},
    skipped: [],
    steps: steps.map(([agent, s, failureCode], i) => ({
      agent,
      gid: `${id}-g${i}`,
      status: s,
      failureCode,
    })),
    ...extra,
  }) as any;

const makeCtx = (overrides: Record<string, unknown> = {}): any => ({
  currentProjectId: 'p1',
  currentProfile: { id: 'prof' },
  currentProject: { meta: { name: 'Histoire' }, totalCost: 0, costLog: [] },
  autoRuns: {},
  loading: {},
  showToast: vi.fn(),
  t: (key: string, params?: Record<string, unknown>) =>
    params ? `${key} ${JSON.stringify(params)}` : key,
  resolveError: (code: string) => `err:${code}`,
  goToView: vi.fn(),
  generateAuto: vi.fn(),
  ...overrides,
});

const launched = (ctx: any, runId: string, overrides = {}) =>
  trackAutoRun(ctx, 'p1', {
    runId,
    run: null,
    projectName: 'Histoire',
    profileId: 'prof',
    launchedHere: true,
    cancelledHere: false,
    analysisCostCounted: false,
    ...overrides,
  });

const toastKeys = (ctx: any) =>
  ctx.showToast.mock.calls.map(([msg]: [string]) => msg.split(' ')[0]);

describe('affichage et coût de l’analyse', () => {
  it('puce d’analyse pendant l’analyse ; coût de l’analyse ajouté une fois au cours affiché', () => {
    const ctx = makeCtx();
    const id = newId();
    applyAutoRunUpdate(ctx, 'p1', run(id, 'analysing'));
    expect(ctx.loading.auto).toBe(true);
    applyAutoRunUpdate(
      ctx,
      'p1',
      run(id, 'running', [['quiz', 'pending']], { analysisCost: 0.0003 }),
    );
    applyAutoRunUpdate(
      ctx,
      'p1',
      run(id, 'running', [['quiz', 'pending']], { analysisCost: 0.0003 }),
    );
    expect(ctx.loading.auto).toBe(false);
    expect(ctx.currentProject.totalCost).toBeCloseTo(0.0003);
    expect(ctx.autoRuns.p1).toMatchObject({ runId: id, launchedHere: false });
  });

  it('lot d’un autre cours : coût de l’analyse non ajouté au cours affiché', () => {
    const ctx = makeCtx({ currentProjectId: 'p2' });
    applyAutoRunUpdate(ctx, 'p1', run(newId(), 'running', [], { analysisCost: 0.0003 }));
    expect(ctx.currentProject.totalCost).toBe(0);
  });
});

describe('bilan final, une fois par onglet et par lot', () => {
  it('tout réussi : « Magie terminée » avec « Voir », notification sous le cours du lot', () => {
    const ctx = makeCtx();
    const id = newId();
    launched(ctx, id);
    applyAutoRunUpdate(
      ctx,
      'p1',
      run(id, 'completed', [
        ['quiz', 'completed'],
        ['summary', 'completed'],
      ]),
    );
    applyAutoRunUpdate(
      ctx,
      'p1',
      run(id, 'completed', [
        ['quiz', 'completed'],
        ['summary', 'completed'],
      ]),
    );
    expect(ctx.showToast).toHaveBeenCalledTimes(1);
    const [msg, type, retry, action, eventKey, notif] = ctx.showToast.mock.calls[0];
    expect([msg, type, retry, eventKey]).toEqual([
      'toast.magicDone',
      'success',
      null,
      `auto:${id}:completed`,
    ]);
    expect(notif).toMatchObject({ messageKey: 'toast.magicDone', projectId: 'p1' });
    action.fn();
    expect(ctx.goToView).toHaveBeenCalledWith('dashboard');
    expect(ctx.autoRuns.p1).toBeUndefined();
  });

  it('étape annulée par sa puce : ni réussie ni échouée (« 2 sur 2 », jamais « 2 sur 3 »)', () => {
    const ctx = makeCtx();
    const id = newId();
    applyAutoRunUpdate(
      ctx,
      'p1',
      run(id, 'completed', [
        ['quiz', 'completed'],
        ['summary', 'completed'],
        ['image', 'cancelled'],
      ]),
    );
    expect(toastKeys(ctx)).toEqual(['toast.magicDone']);
  });

  it('partiel : « 1 sur 2 » ; tout en échec avec une clé refusée : message actionnable', () => {
    const ctx = makeCtx();
    applyAutoRunUpdate(
      ctx,
      'p1',
      run(newId(), 'completed', [
        ['quiz', 'completed'],
        ['summary', 'failed', 'internal_error'],
        ['image', 'cancelled'],
      ]),
    );
    applyAutoRunUpdate(ctx, 'p1', run(newId(), 'completed', [['quiz', 'failed', 'auth_required']]));
    expect(ctx.showToast.mock.calls[0][0]).toBe('toast.autoPartial {"count":1,"total":2}');
    expect(toastKeys(ctx)[1]).toBe('toast.audioAuthRequired');
  });

  it('analyse en échec : code traduit, avec « Réessayer »', () => {
    const ctx = makeCtx();
    applyAutoRunUpdate(ctx, 'p1', run(newId(), 'failed', [], { failureCode: 'quota_exceeded' }));
    const [msg, type, retry] = ctx.showToast.mock.calls[0];
    expect([msg, type]).toEqual(['toast.error {"error":"err:quota_exceeded"}', 'error']);
    retry();
    expect(ctx.generateAuto).toHaveBeenCalled();
  });

  it('serveur redémarré : un message « interrompu »', () => {
    const ctx = makeCtx();
    applyAutoRunUpdate(ctx, 'p1', run(newId(), 'interrupted', [['quiz', 'interrupted']]));
    expect(toastKeys(ctx)).toEqual(['toast.autoInterruptedIn']);
  });
});

describe('annulation du lot entier', () => {
  it('annulé ailleurs : un seul message, et ses étapes annulées sont reconnues (sans toast chacune)', () => {
    const ctx = makeCtx();
    const id = newId();
    applyAutoRunUpdate(ctx, 'p1', run(id, 'cancelled', [['quiz', 'cancelled']]));
    applyAutoRunUpdate(ctx, 'p1', run(id, 'cancelled', [['quiz', 'cancelled']]));
    expect(toastKeys(ctx)).toEqual(['toast.autoCancelledIn']);
    expect(isCancelledRun(id)).toBe(true);
  });

  it('annulé depuis cet onglet : aucun message de plus (le toast d’annulation suffit)', () => {
    const ctx = makeCtx();
    const id = newId();
    launched(ctx, id, { cancelledHere: true });
    markRunCancelled(id);
    expect(isCancelledRun(id)).toBe(true);
    applyAutoRunUpdate(ctx, 'p1', run(id, 'cancelled'));
    expect(ctx.showToast).not.toHaveBeenCalled();
    expect(ctx.autoRuns.p1).toBeUndefined();
  });
});

describe('lot terminé pendant qu’un autre cours est affiché', () => {
  it('lancé ici, même profil : toast qui nomme le cours, notification sous son cours', () => {
    const ctx = makeCtx({ currentProjectId: 'p2' });
    const id = newId();
    launched(ctx, id);
    applyAutoRunUpdate(ctx, 'p1', run(id, 'completed', [['quiz', 'completed']]));
    expect(ctx.showToast.mock.calls[0][0]).toBe('toast.autoDoneIn {"project":"Histoire"}');
    expect(ctx.showToast.mock.calls[0][5].projectId).toBe('p1');
  });

  it('profil changé depuis le lancement, ou lot non lancé ici : rien', () => {
    const changed = makeCtx({ currentProjectId: 'p2', currentProfile: { id: 'autre' } });
    const id = newId();
    launched(changed, id);
    applyAutoRunUpdate(changed, 'p1', run(id, 'completed', [['quiz', 'completed']]));
    const notMine = makeCtx({ currentProjectId: 'p2' });
    const other = newId();
    launched(notMine, other, { launchedHere: false });
    applyAutoRunUpdate(notMine, 'p1', run(other, 'completed', [['quiz', 'completed']]));
    expect(changed.showToast).not.toHaveBeenCalled();
    expect(notMine.showToast).not.toHaveBeenCalled();
  });
});

describe('ouverture d’un cours (snapshot)', () => {
  it('lot actif : suivi, puce d’analyse, coût de l’analyse déjà compris dans le total relu', () => {
    const ctx = makeCtx();
    const id = newId();
    restoreAutoRun(
      ctx,
      'p1',
      {
        results: { generations: [], autoRuns: [run(id, 'analysing', [], { analysisCost: 0.001 })] },
      } as any,
      true,
    );
    expect(ctx.loading.auto).toBe(true);
    expect(ctx.autoRuns.p1).toMatchObject({ runId: id, analysisCostCounted: true });
    applyAutoRunUpdate(ctx, 'p1', run(id, 'running', [], { analysisCost: 0.001 }));
    expect(ctx.currentProject.totalCost).toBe(0);
  });

  it('relu pendant l’analyse (pas encore facturée) : coût de l’analyse ajouté à son arrivée', () => {
    const ctx = makeCtx();
    const id = newId();
    restoreAutoRun(
      ctx,
      'p1',
      { results: { generations: [], autoRuns: [run(id, 'analysing')] } } as any,
      true,
    );
    applyAutoRunUpdate(ctx, 'p1', run(id, 'running', [], { analysisCost: 0.0003 }));
    expect(ctx.currentProject.totalCost).toBeCloseTo(0.0003);
  });

  it('lot suivi, terminé entre-temps : son bilan s’affiche au retour', () => {
    const ctx = makeCtx();
    const id = newId();
    launched(ctx, id);
    ctx.autoRuns.p1.run = run(id, 'running');
    restoreAutoRun(
      ctx,
      'p1',
      {
        results: { generations: [], autoRuns: [run(id, 'completed', [['quiz', 'completed']])] },
      } as any,
      true,
    );
    expect(toastKeys(ctx)).toEqual(['toast.magicDone']);
  });

  it('reconnexion après un redémarrage du serveur : lot interrompu signalé, bouton libéré', () => {
    const ctx = makeCtx();
    const id = newId();
    launched(ctx, id);
    ctx.autoRuns.p1.run = run(id, 'running', [['quiz', 'pending']]);
    restoreAutoRun(
      ctx,
      'p1',
      {
        results: { generations: [], autoRuns: [run(id, 'interrupted', [['quiz', 'interrupted']])] },
      } as any,
      false,
    );
    expect(toastKeys(ctx)).toEqual(['toast.autoInterruptedIn']);
    expect(ctx.autoRuns.p1).toBeUndefined();
  });

  it('état d’un autre lot pendant qu’un lot tourne : ignoré', () => {
    const ctx = makeCtx();
    const id = newId();
    launched(ctx, id);
    ctx.autoRuns.p1.run = run(id, 'running');
    applyAutoRunUpdate(ctx, 'p1', run(newId(), 'completed', [['quiz', 'completed']]));
    expect(ctx.autoRuns.p1.runId).toBe(id);
    expect(ctx.showToast).not.toHaveBeenCalled();
  });
});
