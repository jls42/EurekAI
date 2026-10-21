/**
 * Générations automatiques en cours, par cours (`state.autoRuns`). Règle du propriétaire
 * (2026-10-21) : « on lance un truc, ça continue même si on change de page, sauf si techniquement on
 * ne peut rien y faire ». Jusqu'en v1.7.11, resetSession (changement de cours ou de profil) abortait
 * l'analyse Auto en vol : le serveur la facturait et aucune génération ne partait.
 * - resetSession épargne les contrôleurs de ce registre (autoRunControllers) ;
 * - seule une annulation explicite arrête un Auto : puce « Auto — analyse… » (cancelOne('auto')),
 *   « Tout annuler », suppression de son cours (abortAutoRun) ;
 * - retour sur le cours pendant l'analyse : puce rétablie (restoreAutoAnalysis), et un nouveau clic
 *   « Auto » sur ce cours reste sans effet tant que le premier tourne (generate.ts).
 * Module dédié, sans dépendance : partagé par generate.ts, session.ts et projects.ts.
 */
import type { AppContext } from './app-context';

type AutoRunsState = Pick<AppContext, 'autoRuns'>;
type AutoRunDisplayState = Pick<AppContext, 'autoRuns' | 'loading' | 'abortControllers'>;

/** Contrôleurs des Auto en cours : resetSession ne les aborte pas (contexte partiel toléré). */
export const autoRunControllers = (ctx: Partial<AutoRunsState>): Set<AbortController> => {
  return new Set(Object.values(ctx.autoRuns ?? {}).map((run) => run.controller));
};

/** Inscrit l'Auto lancé sur ce cours, en phase d'analyse. */
export const registerAutoRun = (
  ctx: AutoRunsState,
  projectId: string,
  controller: AbortController,
): void => {
  ctx.autoRuns[projectId] = { controller, analysing: true };
};

/** Analyse terminée : l'Auto envoie ses étapes (la puce d'analyse n'est plus rétablie au retour). */
export const markAutoRunSteps = (ctx: AutoRunsState, projectId: string): void => {
  const run = ctx.autoRuns[projectId];
  if (run) run.analysing = false;
};

/** Fin de l'Auto : retiré du registre, sauf s'il a déjà été remplacé ou retiré (cours supprimé). */
export const endAutoRun = (
  ctx: AutoRunsState,
  projectId: string,
  controller: AbortController,
): void => {
  if (ctx.autoRuns[projectId]?.controller === controller) delete ctx.autoRuns[projectId];
};

/** Retour sur un cours dont l'Auto analyse encore : puce « Auto — analyse… » rétablie, annulable. */
export const restoreAutoAnalysis = (ctx: AutoRunDisplayState, projectId: string): void => {
  const run = ctx.autoRuns[projectId];
  if (!run?.analysing) return;
  ctx.loading.auto = true;
  ctx.abortControllers.auto = run.controller;
};

/** Cours supprimé : son Auto s'arrête (comme son import), aucune étape n'est plus envoyée. */
export const abortAutoRun = (ctx: AutoRunsState, projectId: string): void => {
  const run = ctx.autoRuns[projectId];
  if (!run) return;
  run.controller.abort();
  delete ctx.autoRuns[projectId];
};
