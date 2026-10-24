/**
 * Générations simples déjà ENVOYÉES au serveur, par gid (`state.singleRuns`). Règle du propriétaire
 * (2026-10-21) : « on lance un truc, ça continue même si on change de page ». Jusqu'au 2026-10-24,
 * resetSession abortait leur fetch au changement de cours : le serveur terminait la génération,
 * mais le navigateur n'en recevait plus la réponse, et aucun toast ne nommait son cours.
 * - resetSession épargne ces contrôleurs (singleRunControllers) : la réponse arrive, et un toast
 *   nomme le cours si un autre est affiché (notifySingleElsewhere, generate.ts) ;
 * - retour sur le cours : contrôleurs remis dans abortControllersByGid (restoreSingleRuns), pour
 *   que la puce ✕ et « Tout annuler » abortent le fetch (sinon la réponse 409 `cancelled`
 *   s'afficherait en erreur) ;
 * - cours supprimé ou « Tout annuler » sur ce cours : fetchs abortés (abortSingleRuns).
 * La requête garde sa place parmi les requêtes longues de l'onglet (request-slots.ts) jusqu'à sa
 * réponse : c'est une vraie requête en vol. Module sans dépendance, comme auto-runs.ts.
 */
import type { AppContext } from './app-context';

type SingleRunsState = Pick<AppContext, 'singleRuns'>;
type SingleRunsDisplayState = Pick<AppContext, 'singleRuns' | 'abortControllersByGid'>;

/** Contrôleurs des générations simples envoyées : resetSession ne les aborte pas. */
export const singleRunControllers = (ctx: Partial<SingleRunsState>): Set<AbortController> => {
  return new Set(Object.values(ctx.singleRuns ?? {}).map((run) => run.controller));
};

/** Inscrit une génération simple au moment où sa requête part. */
export const registerSingleRun = (
  ctx: SingleRunsState,
  gid: string,
  projectId: string,
  controller: AbortController,
): void => {
  ctx.singleRuns[gid] = { projectId, controller };
};

/** Réponse reçue, ou requête abortée : retirée du registre. */
export const endSingleRun = (ctx: SingleRunsState, gid: string): void => {
  delete ctx.singleRuns[gid];
};

/** Retour sur un cours : ses générations encore en vol redeviennent annulables par l'écran. */
export const restoreSingleRuns = (ctx: SingleRunsDisplayState, projectId: string): void => {
  for (const [gid, run] of Object.entries(ctx.singleRuns)) {
    if (run.projectId === projectId) ctx.abortControllersByGid[gid] = run.controller;
  }
};

/** Cours supprimé, ou « Tout annuler » sur ce cours : ses générations en vol sont abortées. */
export const abortSingleRuns = (ctx: SingleRunsState, projectId: string): void => {
  for (const [gid, run] of Object.entries(ctx.singleRuns)) {
    if (run.projectId !== projectId) continue;
    run.controller.abort();
    delete ctx.singleRuns[gid];
  }
};
