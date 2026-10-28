import type { AppContext } from './app-context';
import type { EventKey } from '../../helpers/event-bus';
import { singleRunControllers } from './single-runs';

// Reset agressif du state RAM lié à la session courante (toasts, loading,
// abort controllers, pendings optimistes). À invoquer dès qu'on change de
// profil ou de projet pour empêcher la fuite cross-contexte des notifications
// et générations en cours.
//
// Bug que cela corrige : profil A lance un podcast long → switch sur profil B
// avant complétion → le toast `generationDone` apparaissait sur la session B.
// Cause : le state Alpine est unique par tab, et `resetState` (projects.ts)
// ne touchait ni `loading{}`, ni `toasts[]`, ni `abortControllers{}`.
//
// Le ledger seenEventKeys et la liste `notifications` (localStorage scopés
// profileId) ne sont PAS touchés — ils sont la mémoire persistante du profil
// et doivent être replay quand on revient sur un profil.
//
// Ce qui CONTINUE vers son cours (règle « on lance un truc, ça continue même si on change de
// page ») : l'Auto en cours (contrôleur épargné, cf. auto-runs.ts), une génération simple déjà
// envoyée (cf. single-runs.ts), l'import (sources.ts),
// le message du chat en attente de réponse (registre chatInFlight, chat-in-flight.ts) et
// l'enregistrement vocal, arrêté ici puis envoyé vers le cours où il a commencé (recorder.ts).

// AbortController.abort() est idempotent par spec et ne throw jamais — pas de try/catch défensif
// (cf. CLAUDE.md "no empty catch"). Les contrôleurs d'un Auto en cours sont épargnés.
const abortAllExcept = (
  controllers: Record<string, AbortController>,
  spared: Set<AbortController>,
): void => {
  for (const controller of Object.values(controllers)) {
    if (!spared.has(controller)) controller.abort();
  }
};

// Jamais d'enregistrement qui survit à un changement de cours ou de profil : arrêté ici, il part
// vers le cours où il a commencé (onstop, recorder.ts). Contexte partiel des tests toléré.
const stopActiveRecording = (ctx: AppContext): void => {
  if (ctx.recording && typeof ctx.stopRecording === 'function') ctx.stopRecording();
};

// Ouverture d'un cours encore en cours (selectProject) : supplantée par le cours suivant, un autre
// profil ou la suppression du cours. Son snapshot n'est plus attendu (il afficherait l'ancien cours)
// et sa requête, si elle attend encore une connexion, quitte la file. Contexte partiel toléré.
const abandonProjectLoad = (ctx: AppContext): void => {
  if (ctx.projectLoadController) ctx.projectLoadController.abort();
  ctx.projectLoadController = null;
  ctx.projectLoading = false;
};

// Codacy `no-unused-vars` natif flagge le `this: AppContext` binding comme
// paramètre non utilisé (la règle ignore que TypeScript résout le binding au
// niveau type). Extraction en arrow function `doResetSession(ctx)` privée +
// méthode object-literal qui forwarde via `this`. Workaround documenté ici une
// seule fois pour les deux sites concernés (`doResetSession` ci-dessous et
// `resetSession` dans le createSession factory).
// Toasts gardés au changement de cours : ceux dont l'action est persistante (« Reprendre » un lot
// Auto interrompu, qui nomme son cours et se reprend depuis n'importe quel cours) ; les nouveaux
// ids partent après les leurs. Le changement de profil les retire (selectProfile).
const keepPersistentToasts = (ctx: AppContext): void => {
  ctx.toasts = ctx.toasts.filter((t) => t.action?.persistent === true);
  ctx.toastCounter = ctx.toasts.reduce((max, t) => Math.max(max, t.id), 0);
};

function doResetSession(ctx: AppContext): void {
  // Stop EventSource SSE — sinon des events sur l'ancien contexte arrivent
  // après le switch et écrasent le nouveau (méthode injectée par
  // createPendingsStream).
  if (typeof ctx.stopPendingsStream === 'function') {
    ctx.stopPendingsStream();
  }
  stopActiveRecording(ctx);
  abandonProjectLoad(ctx);
  const spared = new Set(singleRunControllers(ctx));
  abortAllExcept(ctx.abortControllers, spared);
  ctx.abortControllers = {};
  abortAllExcept(ctx.abortControllersByGid, spared);
  ctx.abortControllersByGid = {};
  // Reset toutes les clés à false sans bracket-write user-typed (warning
  // Codacy "Generic Object Injection Sink"). `Object.fromEntries` produit
  // un nouvel objet figé à cet instant ; on l'assigne à la place pour
  // remplacer la map d'un coup, ce qui reste compatible avec la reactivité
  // Alpine puisque `loading` est l'objet observé.
  ctx.loading = Object.fromEntries(
    Object.keys(ctx.loading).map((k) => [k, false]),
  ) as typeof ctx.loading;
  ctx.pendingById = {};
  // Réservations de l'anti-flood : un lancement encore en attente la rend sur cette map neuve sans
  // jamais passer sous zéro (cf. releaseLaunch, generate.ts).
  ctx.launchingByType = {};
  keepPersistentToasts(ctx);
  ctx.shownToastEventKeys = new Set<EventKey>();
  // chatLoading et consigneLoading vivent hors de loading{} (flags dédiés) — un chat ou une
  // détection de consigne lancé sur le cours A garderait sinon, dans le cours B, l'input désactivé
  // ou les boutons sur « Analyse… ».
  ctx.chatLoading = false;
  ctx.consigneLoading = false;
  // Reset confirm dialog en vol pour éviter qu'un callback orphelin
  // s'exécute sur le nouveau contexte (le user vient de switcher).
  ctx.confirmCallback = null;
  ctx.confirmTrigger = null;
  // Contenu de source révélé par le PIN parental : valable pour une seule ouverture du
  // dialogue source, jamais pour le profil ou le projet suivant.
  ctx.revealedSourceIds = [];
}

export function createSession() {
  return {
    resetSession(): void {
      doResetSession(this as unknown as AppContext);
    },
  };
}
