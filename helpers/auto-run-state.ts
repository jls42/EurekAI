import type {
  AutoRun,
  AutoRunStatus,
  AutoRunStep,
  AutoRunStepStatus,
  FailedStepCode,
  PendingTrackerEntryBase,
  ProjectData,
} from '../types.js';

// Transitions pures d'un lot Auto (`results.autoRuns`), appliquées par le store sur le projet
// qu'il vient de lire, avant son unique écriture. Aucune entrée/sortie ici : le store persiste
// et émet les événements. Règles : .claude/rules/auto-runs.md.

// Lots terminés gardés par cours : les 20 plus récents ET de moins de 7 jours (intersection,
// comme le tracker) ; un lot actif n'est jamais retiré.
export const MAX_KEPT_AUTO_RUNS = 20;
export const AUTO_RUN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const ACTIVE_STATUSES: ReadonlySet<AutoRunStatus> = new Set(['analysing', 'running']);

export const isActiveAutoRun = (run: AutoRun): boolean => ACTIVE_STATUSES.has(run.status);

export const findAutoRun = (data: ProjectData, runId: string): AutoRun | undefined => {
  return data.results.autoRuns?.find((run) => run.id === runId);
};

export const findActiveAutoRun = (data: ProjectData): AutoRun | undefined => {
  return data.results.autoRuns?.find(isActiveAutoRun);
};

type TerminalRunStatus = Exclude<AutoRunStatus, 'analysing' | 'running'>;
type TerminalStepStatus = Exclude<AutoRunStepStatus, 'pending'>;
// Échec d'une étape : son code, et pour un refus des gardes le code exact du refus.
type StepFailure = { code: Exclude<FailedStepCode, 'cancelled'>; refusal?: string };

const recordedFailure = (failure: StepFailure): Partial<AutoRunStep> => {
  const { code, refusal } = failure;
  return refusal ? { failureCode: code, refusal } : { failureCode: code };
};

const finishRun = (run: AutoRun, status: TerminalRunStatus, now: string): void => {
  run.status = status;
  run.updatedAt = now;
  run.completedAt = now;
};

// Étape d'un lot passée au statut terminal de son entrée du tracker (même gid) ; le lot en cours
// est terminé (`completed`) dès que plus aucune étape n'est en cours. Rend le lot modifié, ou
// undefined : entrée sans lot, lot ou étape inconnus, étape déjà terminée.
export const applyStepTransition = (
  data: ProjectData,
  entry: Pick<PendingTrackerEntryBase, 'id' | 'runId'>,
  status: TerminalStepStatus,
  now: string,
  failure?: StepFailure,
): AutoRun | undefined => {
  const run = entry.runId ? findAutoRun(data, entry.runId) : undefined;
  const step = run?.steps.find((s) => s.gid === entry.id);
  if (!run || step?.status !== 'pending') return undefined;
  step.status = status;
  if (status === 'failed' && failure) Object.assign(step, recordedFailure(failure));
  run.updatedAt = now;
  if (run.status === 'running' && run.steps.every((s) => s.status !== 'pending')) {
    finishRun(run, 'completed', now);
  }
  return run;
};

// Lot actif passé à un statut terminal posé de l'extérieur (annulation, analyse en échec) ; ses
// étapes encore en cours prennent `stepStatus`. Rend le lot modifié, ou undefined s'il n'est
// plus actif.
export const endAutoRun = (
  run: AutoRun,
  status: TerminalRunStatus,
  stepStatus: TerminalStepStatus,
  now: string,
): AutoRun | undefined => {
  if (!isActiveAutoRun(run)) return undefined;
  for (const step of run.steps) {
    if (step.status === 'pending') step.status = stepStatus;
  }
  finishRun(run, status, now);
  return run;
};

// Démarrage du serveur : tout lot encore actif sur disque vient d'un process mort, il passe
// `interrupted` avec ses étapes en cours (jamais repris sans demande).
export const interruptActiveAutoRuns = (data: ProjectData, now: string): AutoRun[] => {
  const interrupted: AutoRun[] = [];
  for (const run of data.results.autoRuns ?? []) {
    const ended = endAutoRun(run, 'interrupted', 'interrupted', now);
    if (ended) interrupted.push(ended);
  }
  return interrupted;
};

// Étapes en cours au redémarrage du serveur : celles que « Reprendre » relance.
const interruptedSteps = (run: AutoRun): AutoRunStep[] => {
  return run.status === 'interrupted' ? run.steps.filter((s) => s.status === 'interrupted') : [];
};

/** Lot interrompu pendant ses étapes : « Reprendre » relance ses étapes interrompues. Interrompu
 * pendant l'analyse, il n'a aucune étape à reprendre (un nouveau lot refait l'analyse). */
export const resumableStepCount = (run: AutoRun): number => interruptedSteps(run).length;

export const isResumableAutoRun = (run: AutoRun): boolean => resumableStepCount(run) > 0;

type ResumedStep = Pick<AutoRunStep, 'agent' | 'gid'>;

// Reprise : chaque étape interrompue repart `pending` sous le gid neuf de même rang dans `gids` (son
// ancienne entrée du tracker reste `cancelled`), dans l'ordre du plan, et le lot repart `running`.
// Rend les étapes reprises, ou undefined (lot pas reprenable, ou un gid par étape manquant).
export const resumeInterruptedSteps = (
  run: AutoRun,
  gids: string[],
  now: string,
): ResumedStep[] | undefined => {
  const steps = interruptedSteps(run);
  if (steps.length === 0 || steps.length !== gids.length) return undefined;
  const resumed = steps.map((step, i): ResumedStep => {
    step.gid = gids[i];
    step.status = 'pending';
    return { agent: step.agent, gid: step.gid };
  });
  run.status = 'running';
  run.updatedAt = now;
  run.resumedAt = now;
  delete run.completedAt;
  return resumed;
};

const runEndTime = (run: AutoRun): number => Date.parse(run.completedAt ?? run.updatedAt);

export const pruneAutoRuns = (data: ProjectData, nowMs: number): void => {
  const runs = data.results.autoRuns;
  if (!runs || runs.length === 0) return;
  const active = runs.filter(isActiveAutoRun);
  const keptTerminal = runs
    .filter((run) => !isActiveAutoRun(run) && nowMs - runEndTime(run) <= AUTO_RUN_MAX_AGE_MS)
    .sort((a, b) => runEndTime(b) - runEndTime(a))
    .slice(0, Math.max(0, MAX_KEPT_AUTO_RUNS - active.length));
  const kept = new Set([...active, ...keptTerminal]);
  data.results.autoRuns = runs.filter((run) => kept.has(run));
};
