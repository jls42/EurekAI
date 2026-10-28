/**
 * Réseau des lots Auto (état et affichage : auto-runs.ts). Lancement par
 * `POST …/generate/auto/start` : une requête courte, HORS de la file des requêtes longues de
 * l'onglet (request-slots.ts) — le serveur répond 202 et analyse puis génère en arrière-plan, au
 * plus 3 étapes en même temps par clé. Reprise d'un lot interrompu (`POST …/generate/auto/resume`),
 * suivie comme un lancement. Sondage de l'onglet lanceur pendant qu'un autre cours est affiché (le
 * flux SSE ne suit que le cours affiché). Annulation du lot entier en une requête.
 */
import type { AppContext } from './app-context';
import type { AutoRun } from '../../types';
import { withAiHeaders } from './ai-fetch';
import { PROJECT_ID_SAFE } from './moderation-gate';
import { applyAutoRunUpdate, forgetAutoRun, markRunCancelled, trackAutoRun } from './auto-runs';

/** Délai entre deux lectures de l'état d'un lot lancé ici, son cours n'étant pas affiché. */
export const AUTO_POLL_MS = 4000;

const RUN_ID_SAFE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Lancement capturé AU CLIC : cours, nom, corps et clé ne sont jamais relus à l'envoi. */
export type AutoLaunch = {
  projectId: string;
  projectName: string;
  runId: string;
  body: Record<string, unknown>;
  key: string;
  // « Réessayer » d'un lancement refusé : un nouveau lot par défaut, la même reprise pour une reprise.
  retry?: () => void;
};

type RunResponse = { run?: AutoRun; error?: string };

const jsonPost = (body: unknown): RequestInit => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/** Lot inscrit dès le clic (`run` null) : un second clic pendant le pré-contrôle est sans effet. */
export const beginAutoLaunch = (state: AppContext, launch: AutoLaunch): void => {
  trackAutoRun(state, launch.projectId, {
    runId: launch.runId,
    run: null,
    projectName: launch.projectName,
    profileId: state.currentProfile?.id ?? null,
    launchedHere: true,
    cancelledHere: false,
    analysisCostCounted: false,
  });
};

/** Lancement refusé ou en échec : toast sur le cours affiché, ou qui nomme le cours du lot. */
export const reportAutoStartError = (state: AppContext, launch: AutoLaunch, code: string): void => {
  if (state.currentProjectId !== launch.projectId) {
    state.showToast(state.t('toast.autoFailedIn', { project: launch.projectName }), 'error');
    return;
  }
  // Un refus de modération ne se réessaie pas (même refus à chaque fois).
  const again = launch.retry ?? (() => state.generateAuto());
  const retry = code === 'moderation.blocked' ? null : again;
  state.showToast(state.t('toast.error', { error: state.resolveError(code) }), 'error', retry);
};

// 202 : notre lot (ou le même runId renvoyé après une coupure). 409 `auto_busy` : un lot tourne déjà
// sur ce cours (autre onglet, autre appareil) → l'onglet le rejoint, jamais un second lot.
const joinRun = (state: AppContext, launch: AutoLaunch, run: AutoRun, busy: boolean): void => {
  const entry = state.autoRuns[launch.projectId];
  if (entry) entry.runId = run.id;
  if (busy && state.currentProjectId === launch.projectId) {
    state.showToast(state.t('toast.autoJoined'), 'info');
  }
  applyAutoRunUpdate(state, launch.projectId, run);
  if (state.autoRuns[launch.projectId]) watchAutoLot(state, launch.projectId);
};

const handleStartResponse = async (
  state: AppContext,
  launch: AutoLaunch,
  res: Response,
): Promise<void> => {
  const body: RunResponse = await res.json().catch(() => ({}));
  if (body.run && (res.status === 202 || res.status === 409)) {
    joinRun(state, launch, body.run, res.status === 409);
    return;
  }
  forgetAutoRun(state, launch.projectId);
  reportAutoStartError(state, launch, body.error ?? res.statusText);
};

/** Lancement du lot avec la clé et le corps du clic. URL validée avant le fetch (barrière SSRF). */
export async function launchAutoLot(state: AppContext, launch: AutoLaunch): Promise<void> {
  const url = `/api/projects/${launch.projectId}/generate/auto/start`;
  const allowedUrls = PROJECT_ID_SAFE.test(launch.projectId) ? [url] : [];
  if (allowedUrls.includes(url)) {
    const init = jsonPost({ ...launch.body, runId: launch.runId });
    const res = await fetch(url, withAiHeaders(init, { keyOverride: launch.key }));
    await handleStartResponse(state, launch, res);
    return;
  }
  forgetAutoRun(state, launch.projectId);
}

const runUrlAllowed = (projectId: string, runId: string): boolean => {
  return PROJECT_ID_SAFE.test(projectId) && RUN_ID_SAFE.test(runId);
};

/**
 * Reprise d'un lot interrompu (« Reprendre » de son bilan) avec la clé du clic : le serveur relance
 * ses étapes interrompues, sans refaire l'analyse. 202 (repris, ou déjà repris ailleurs) et 409 (un
 * autre lot tourne sur ce cours) : suivi comme un lancement ; 200 (lot terminé entre-temps, rien à
 * reprendre) : lot oublié. URL validée avant le fetch (barrière SSRF).
 */
export async function resumeAutoLot(state: AppContext, launch: AutoLaunch): Promise<void> {
  const url = `/api/projects/${launch.projectId}/generate/auto/resume`;
  const allowedUrls = runUrlAllowed(launch.projectId, launch.runId) ? [url] : [];
  if (allowedUrls.includes(url)) {
    const init = jsonPost({ runId: launch.runId });
    const res = await fetch(url, withAiHeaders(init, { keyOverride: launch.key }));
    if (res.status === 200) forgetAutoRun(state, launch.projectId);
    else await handleStartResponse(state, launch, res);
    return;
  }
  forgetAutoRun(state, launch.projectId);
}

const applyRunResponse = async (state: AppContext, projectId: string, res: Response) => {
  if (res.status === 404) {
    forgetAutoRun(state, projectId);
    return;
  }
  if (!res.ok) return;
  const body: RunResponse = await res.json();
  if (body.run) applyAutoRunUpdate(state, projectId, body.run);
};

// État du lot relu ; une erreur réseau attend le tour suivant (le lot continue sur le serveur).
const pollAutoLot = async (state: AppContext, projectId: string, runId: string): Promise<void> => {
  const url = `/api/projects/${projectId}/auto-runs/${runId}`;
  const allowedUrls = runUrlAllowed(projectId, runId) ? [url] : [];
  if (allowedUrls.includes(url)) {
    try {
      const res = await fetch(url);
      await applyRunResponse(state, projectId, res);
    } catch (e: unknown) {
      console.warn('[auto] lecture du lot impossible, nouvel essai au prochain tour', e);
    }
  }
};

// Un tour : rien à lire si le lot est terminé ou oublié, ni si son cours est affiché (le flux SSE le
// suit) ; sinon son état relu. Puis le tour suivant, tant que le lot reste suivi.
const pollTick = async (state: AppContext, projectId: string): Promise<void> => {
  const entry = state.autoRuns[projectId];
  if (!entry?.launchedHere) return;
  if (state.currentProjectId !== projectId) await pollAutoLot(state, projectId, entry.runId);
  if (state.autoRuns[projectId]) watchAutoLot(state, projectId);
};

/** Sondage du lot lancé ici, toutes les AUTO_POLL_MS, jusqu'à sa fin (minuteurs en chaîne). */
export const watchAutoLot = (state: AppContext, projectId: string): void => {
  setTimeout(() => {
    pollTick(state, projectId).catch((e: unknown) => console.warn('[auto] sondage arrêté', e));
  }, AUTO_POLL_MS);
};

/**
 * Annulation du lot entier (puce « Auto — analyse… », « Tout annuler ») : une requête, le serveur
 * annule le lot et ses étapes en cours en une écriture. Lancement pas encore parti (pré-contrôle) :
 * il ne partira pas. Vrai si l'annulation est acquise.
 */
export async function cancelAutoLot(state: AppContext, projectId: string): Promise<boolean> {
  const entry = state.autoRuns[projectId];
  if (!entry) return false;
  entry.cancelledHere = true;
  if (!entry.run) return true;
  markRunCancelled(entry.runId);
  const url = `/api/projects/${projectId}/auto-runs/${entry.runId}/cancel`;
  const allowedUrls = runUrlAllowed(projectId, entry.runId) ? [url] : [];
  if (allowedUrls.includes(url)) {
    const res = await fetch(url, { method: 'POST' });
    await applyRunResponse(state, projectId, res);
    return res.ok;
  }
  return false;
}
