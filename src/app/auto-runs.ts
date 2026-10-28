/**
 * Lots Auto suivis par cet onglet (`state.autoRuns`, par cours). Le lot vit sur le serveur
 * (routes/auto-runs.ts) : il continue quand la page est rechargée, qu'on change de cours ou de
 * profil. Ce module, sans réseau, reçoit son état (événement SSE `auto`, sondage, réponses, snapshot
 * du cours) et en tire l'affichage : puce « Auto — analyse… », coût de l'analyse compté une fois,
 * et bilan final une seule fois par onglet et par lot. Les étapes s'affichent comme des générations
 * simples (événements `generation`, avec leur `runId`). Lancement, sondage et annulation :
 * auto-launch.ts. Règles : .claude/rules/auto-runs.md (section « Navigateur »).
 */
import type { AppContext } from './app-context';
import type { AutoRun, AutoRunStatus, FailedStepCode, ProjectData } from '../../types';
import { addCostDelta } from './cost-utils';
import { hasSeenEvent } from './notifications';
import { buildAutoRunEventKey } from '../../helpers/event-key';
import { isResumableAutoRun } from '../../helpers/auto-run-state';

type AutoRunEntry = AppContext['autoRuns'][string];
type AutoRunsState = Pick<AppContext, 'autoRuns'>;

const ACTIVE_STATUSES: ReadonlySet<AutoRunStatus> = new Set(['analysing', 'running']);
const TOAST_ERROR = 'toast.error';

// Au niveau du module (resetSession n'y touche pas) : lots dont le bilan est déjà traité, avec leur
// statut final (un état reçu deux fois, SSE puis sondage ou snapshot, ne refait rien), et lots
// annulés en entier (leurs étapes annulées n'affichent pas chacune un toast : un message pour tout
// le lot).
const finishedRuns = new Map<string, AutoRunStatus>();
const cancelledRuns = new Set<string>();

// Bilan déjà traité ; un lot interrompu qui redevient actif (« Reprendre », ici ou ailleurs) est
// suivi de nouveau.
const alreadyFinished = (run: AutoRun): boolean => {
  const status = finishedRuns.get(run.id);
  if (status === undefined) return false;
  return status !== 'interrupted' || !ACTIVE_STATUSES.has(run.status);
};

/** Lot annulé en entier : ses étapes annulées n'ont pas de toast chacune. */
export const isCancelledRun = (runId?: string): boolean => {
  return runId !== undefined && cancelledRuns.has(runId);
};

/** Annulation demandée depuis cet onglet, avant même la réponse du serveur. */
export const markRunCancelled = (runId: string): void => {
  cancelledRuns.add(runId);
};

/** Lot actif (`run` null : lancement en cours, pré-contrôle ou requête de lancement). */
export const isActiveRun = (run: AutoRun | null): boolean => {
  return run === null || ACTIVE_STATUSES.has(run.status);
};

export const trackAutoRun = (ctx: AutoRunsState, projectId: string, entry: AutoRunEntry): void => {
  ctx.autoRuns[projectId] = entry;
};

/** Lancement annulé depuis cet onglet (« Tout annuler » pendant le pré-contrôle). */
export const isLaunchCancelled = (ctx: AutoRunsState, projectId: string): boolean => {
  return ctx.autoRuns[projectId]?.cancelledHere === true;
};

/** Lot oublié par l'onglet (cours supprimé, lancement refusé) : le serveur garde ce qu'il a fait. */
export const forgetAutoRun = (ctx: AutoRunsState, projectId: string): void => {
  delete ctx.autoRuns[projectId];
};

// Lot reçu sans avoir été lancé ici (autre onglet, rechargement) : suivi dès maintenant.
const adoptRun = (ctx: AppContext, projectId: string, run: AutoRun): AutoRunEntry => {
  const entry: AutoRunEntry = {
    runId: run.id,
    run,
    projectName: ctx.currentProject?.meta.name ?? '',
    profileId: ctx.currentProfile?.id ?? null,
    launchedHere: false,
    cancelledHere: false,
    analysisCostCounted: false,
  };
  trackAutoRun(ctx, projectId, entry);
  return entry;
};

// Coût de l'analyse : ajouté une fois au total du cours affiché. Ailleurs, rien à ajouter : le total
// du cours sera relu sur le serveur à son ouverture, analyse comprise. Lot repris (`resumedAt`) :
// son analyse est déjà dans le total (comptée avant l'interruption, ou relue).
const countAnalysisCost = (ctx: AppContext, entry: AutoRunEntry, shown: boolean): void => {
  if (entry.analysisCostCounted || entry.run?.resumedAt || !entry.run?.analysisCost) return;
  entry.analysisCostCounted = true;
  if (shown) addCostDelta(ctx, entry.run.analysisCost, 'generate/auto/route');
};

type FinalToast = {
  key: string;
  type: 'success' | 'warning' | 'error' | 'info';
  params?: Record<string, string | number>;
  retry?: boolean;
  view?: boolean;
  resume?: boolean;
};

// Codes d'échec connus (types.ts : FailedStepCode) ; un code inattendu compte comme internal_error.
const KNOWN_FAILED_STEP_CODES: ReadonlySet<FailedStepCode> = new Set<FailedStepCode>([
  'content_refused',
  'refused',
  'llm_invalid_json',
  'quota_exceeded',
  'upstream_unavailable',
  'auth_required',
  'tts_upstream_error',
  'context_length_exceeded',
  'internal_error',
  'cancelled',
]);

const knownCode = (code: FailedStepCode | undefined): FailedStepCode => {
  return code && KNOWN_FAILED_STEP_CODES.has(code) ? code : 'internal_error';
};

const failureCodes = (run: AutoRun): FailedStepCode[] => {
  return run.steps.filter((s) => s.status === 'failed').map((s) => knownCode(s.failureCode));
};

// Un code actionnable (clé, quota) prime sur le message générique.
const actionableFailure = (codes: FailedStepCode[]): FinalToast | null => {
  if (codes.includes('auth_required')) return { key: 'toast.audioAuthRequired', type: 'error' };
  if (codes.includes('quota_exceeded')) return { key: 'toast.audioQuotaExceeded', type: 'warning' };
  return null;
};

const completedElsewhereToast = (ok: number, total: number, project: string): FinalToast => {
  if (ok === total) return { key: 'toast.autoDoneIn', type: 'success', params: { project } };
  if (ok === 0) return { key: 'toast.autoFailedIn', type: 'error', params: { project } };
  return { key: 'toast.autoPartialIn', type: 'warning', params: { project, count: ok, total } };
};

// Lot dont toutes les étapes ont fini. Une étape annulée par sa puce ne compte ni comme réussie ni
// comme échouée (« 7 sur 7 », jamais « 7 sur 8 ») ; toutes annulées : rien de plus (chacune a eu
// son toast).
const completedToast = (run: AutoRun, shown: boolean, project: string): FinalToast | null => {
  const counted = run.steps.filter((s) => s.status !== 'cancelled');
  const ok = counted.filter((s) => s.status === 'completed').length;
  const total = counted.length;
  if (total === 0) return null;
  if (!shown) return completedElsewhereToast(ok, total, project);
  if (ok === total) return { key: 'toast.magicDone', type: 'success', view: true };
  const actionable = actionableFailure(failureCodes(run));
  if (actionable) return actionable;
  if (ok === 0) return { key: 'toast.generationError', type: 'error' };
  return { key: 'toast.autoPartial', type: 'warning', params: { count: ok, total } };
};

const failedToast = (shown: boolean, project: string): FinalToast => {
  if (shown) return { key: TOAST_ERROR, type: 'error', retry: true };
  return { key: 'toast.autoFailedIn', type: 'error', params: { project } };
};

// Lot interrompu : « Reprendre » relance ses étapes interrompues ; interrompu pendant l'analyse (rien
// à reprendre), « Réessayer » lance un nouveau lot sur le cours affiché.
const interruptedToast = (run: AutoRun, shown: boolean, project: string): FinalToast => {
  const toast: FinalToast = {
    key: 'toast.autoInterruptedIn',
    type: 'warning',
    params: { project },
  };
  if (isResumableAutoRun(run)) toast.resume = true;
  else toast.retry = shown;
  return toast;
};

const finalToast = (entry: AutoRunEntry, run: AutoRun, shown: boolean): FinalToast | null => {
  const project = entry.projectName;
  switch (run.status) {
    case 'completed':
      return completedToast(run, shown, project);
    case 'failed':
      return failedToast(shown, project);
    case 'cancelled':
      if (entry.cancelledHere) return null;
      return { key: 'toast.autoCancelledIn', type: 'info', params: { project } };
    case 'interrupted':
      return interruptedToast(run, shown, project);
    default:
      return null;
  }
};

// Texte du bilan : l'échec de l'analyse traduit son code (toast.error {error}).
const toastText = (ctx: AppContext, toast: FinalToast, run: AutoRun): string => {
  if (toast.key !== TOAST_ERROR) return ctx.t(toast.key, toast.params);
  return ctx.t(TOAST_ERROR, { error: ctx.resolveError(knownCode(run.failureCode)) });
};

// Hors écran, un bilan n'a de sens que pour un lot lancé ici et un profil inchangé : sinon la
// notification irait sous un autre profil, et l'enfant verrait le bilan d'un autre.
const finalVisible = (ctx: AppContext, entry: AutoRunEntry, shown: boolean): boolean => {
  if (shown) return true;
  return entry.launchedHere && entry.profileId === (ctx.currentProfile?.id ?? null);
};

const runEventKey = (run: AutoRun) => buildAutoRunEventKey(run.id, run.status, run.resumedAt);

// « Voir » le tableau de bord, ou « Reprendre » le lot interrompu (toast persistant : il reste
// affiché jusqu'au clic ou à sa fermeture). resumeAuto gère ses erreurs (toast).
const finalAction = (
  ctx: AppContext,
  projectId: string,
  entry: AutoRunEntry,
  toast: FinalToast,
) => {
  if (toast.view) return { label: ctx.t('toast.view'), fn: () => ctx.goToView('dashboard') };
  if (!toast.resume) return null;
  const fn = () => {
    void ctx.resumeAuto(projectId, entry.runId, entry.projectName);
  };
  return { label: ctx.t('toast.resume'), fn, persistent: true };
};

// Bilan rangé sous le cours du lot (NotifSpec.projectId), dédoublonné entre onglets par sa clé.
const showFinal = (
  ctx: AppContext,
  projectId: string,
  entry: AutoRunEntry,
  shown: boolean,
): void => {
  const run = entry.run;
  if (!run || !finalVisible(ctx, entry, shown)) return;
  const toast = finalToast(entry, run, shown);
  if (!toast) return;
  const retry = toast.retry ? () => ctx.generateAuto() : null;
  const action = finalAction(ctx, projectId, entry, toast);
  const notif = { messageKey: toast.key, params: toast.params, projectId };
  ctx.showToast(toastText(ctx, toast, run), toast.type, retry, action, runEventKey(run), notif);
};

// Entrée qui suit ce lot : celle du cours, sinon une nouvelle (lot d'un autre onglet). null : le
// cours suit un autre lot en cours (état périmé d'un lot précédent).
const entryFor = (ctx: AppContext, projectId: string, run: AutoRun): AutoRunEntry | null => {
  const known = ctx.autoRuns[projectId];
  if (!known) return adoptRun(ctx, projectId, run);
  if (known.runId === run.id) return known;
  return known.run === null ? null : adoptRunIfIdle(ctx, projectId, run, known);
};

const adoptRunIfIdle = (
  ctx: AppContext,
  projectId: string,
  run: AutoRun,
  known: AutoRunEntry,
): AutoRunEntry | null => {
  return isActiveRun(known.run) ? null : adoptRun(ctx, projectId, run);
};

/**
 * Nouvel état d'un lot (SSE `auto`, sondage, réponse au lancement ou à l'annulation, snapshot).
 * Lot d'un autre onglet : suivi dès maintenant. Lot terminé : bilan une fois, puis oublié.
 */
export const applyAutoRunUpdate = (ctx: AppContext, projectId: string, run: AutoRun): void => {
  if (alreadyFinished(run)) return;
  const entry = entryFor(ctx, projectId, run);
  if (!entry) return;
  entry.run = run;
  const shown = ctx.currentProjectId === projectId;
  if (shown) ctx.loading.auto = run.status === 'analysing';
  countAnalysisCost(ctx, entry, shown);
  if (ACTIVE_STATUSES.has(run.status)) {
    finishedRuns.delete(run.id);
    return;
  }
  finishedRuns.set(run.id, run.status);
  if (run.status === 'cancelled') cancelledRuns.add(run.id);
  forgetAutoRun(ctx, projectId);
  showFinal(ctx, projectId, entry, shown);
};

// Coût de l'analyse déjà dans le total relu : seulement si le lot relu le porte (relu pendant
// l'analyse, il n'est pas encore facturé : l'événement suivant l'ajoutera).
const inReloadedTotal = (run: AutoRun, totalReloaded: boolean): boolean => {
  return totalReloaded && run.analysisCost !== undefined;
};

// Lot déjà suivi : état relu (lancement encore en cours : rien à relire).
const refreshKnownRun = (
  ctx: AppContext,
  projectId: string,
  known: AutoRunEntry,
  runs: AutoRun[],
  totalReloaded: boolean,
): void => {
  const latest = known.run ? runs.find((r) => r.id === known.runId) : undefined;
  if (!latest) return;
  if (inReloadedTotal(latest, totalReloaded)) known.analysisCostCounted = true;
  applyAutoRunUpdate(ctx, projectId, latest);
};

const adoptActiveRun = (
  ctx: AppContext,
  projectId: string,
  active: AutoRun,
  totalReloaded: boolean,
): void => {
  if (alreadyFinished(active)) return;
  adoptRun(ctx, projectId, active).analysisCostCounted = inReloadedTotal(active, totalReloaded);
  ctx.loading.auto = active.status === 'analysing';
};

// Sans lot suivi (page rechargée, onglet ouvert après le redémarrage du serveur) : le dernier lot du
// cours, interrompu avec des étapes à reprendre et dont le bilan n'a été vu dans aucun onglet de ce
// profil (registre des notifications), affiche son bilan et « Reprendre ». Son analyse est déjà
// dans le total du cours.
const offerUnseenResume = (ctx: AppContext, projectId: string, runs: AutoRun[]): void => {
  const last = runs.at(-1);
  const profileId = ctx.currentProfile?.id;
  if (!last || !profileId || !isResumableAutoRun(last)) return;
  if (finishedRuns.has(last.id) || hasSeenEvent(profileId, runEventKey(last))) return;
  adoptRun(ctx, projectId, last).analysisCostCounted = true;
  applyAutoRunUpdate(ctx, projectId, last);
};

/**
 * Cours relu (ouverture, ou reconnexion du flux SSE après une coupure ou un redémarrage du
 * serveur) : son lot actif est suivi (puce d'analyse rétablie, bouton Auto désactivé ; les puces
 * des étapes viennent du tracker) ; un lot déjà suivi prend l'état relu, et son bilan s'affiche s'il
 * s'est terminé entre-temps (`interrupted` après un redémarrage, avec « Reprendre ») ; sans lot
 * suivi, un dernier lot interrompu jamais vu propose « Reprendre ». `totalReloaded` : le total du
 * cours vient d'être relu (ouverture), il comprend déjà l'analyse.
 */
export const restoreAutoRun = (
  ctx: AppContext,
  projectId: string,
  project: ProjectData,
  totalReloaded: boolean,
): void => {
  const runs = project.results.autoRuns ?? [];
  const known = ctx.autoRuns[projectId];
  if (known) {
    refreshKnownRun(ctx, projectId, known, runs, totalReloaded);
    return;
  }
  const active = runs.find((r) => ACTIVE_STATUSES.has(r.status));
  if (active) adoptActiveRun(ctx, projectId, active, totalReloaded);
  else offerUnseenResume(ctx, projectId, runs);
};
