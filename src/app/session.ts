import type { AppContext } from './app-context';
import type { EventKey } from '../../helpers/event-bus';

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

// Le binding `this: AppContext` directement dans la signature de la méthode
// déclenche un faux positif Codacy `no-unused-vars` (la règle native voit le
// type-binding comme un paramètre non utilisé, alors que TypeScript le résout
// au niveau type uniquement). On extrait l'implémentation en arrow function
// qui prend `ctx` explicitement, et la méthode object-literal forwarde via
// `this`. Mêmes garanties de typage, plus de faux positif.
function doResetSession(ctx: AppContext): void {
  // Stop EventSource SSE — sinon des events sur l'ancien contexte arrivent
  // après le switch et écrasent le nouveau (méthode injectée par
  // createPendingsStream).
  if (typeof ctx.stopPendingsStream === 'function') {
    ctx.stopPendingsStream();
  }
  // AbortController.abort() est idempotent par spec et ne throw jamais —
  // pas de try/catch défensif (cf. CLAUDE.md "no empty catch").
  for (const controller of Object.values(ctx.abortControllers)) {
    controller.abort();
  }
  ctx.abortControllers = {};
  for (const controller of Object.values(ctx.abortControllersByGid)) {
    controller.abort();
  }
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
  ctx.toasts = [];
  ctx.toastCounter = 0;
  ctx.shownToastEventKeys = new Set<EventKey>();
  // chatLoading vit hors de loading{} (flag dédié) — un chat envoyé sur
  // profil A puis switch vers profil B garderait l'input désactivé sinon.
  ctx.chatLoading = false;
  // Reset confirm dialog en vol pour éviter qu'un callback orphelin
  // s'exécute sur le nouveau contexte (le user vient de switcher).
  ctx.confirmCallback = null;
  ctx.confirmTrigger = null;
}

export function createSession() {
  return {
    // Pas de `this: AppContext` binding ici — Codacy `no-unused-vars` natif
    // (purement syntaxique) le flag faussement comme paramètre non utilisé,
    // même quand `this` est référencé dans le body. Cast local équivalent
    // côté typage, plus de faux positif.
    resetSession(): void {
      doResetSession(this as unknown as AppContext);
    },
  };
}
