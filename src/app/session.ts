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

export function createSession() {
  return {
    resetSession(this: AppContext): void {
      // Stop EventSource SSE — sinon des events sur l'ancien contexte arrivent
      // après le switch et écrasent le nouveau (méthode injectée par
      // createPendingsStream).
      if (typeof this.stopPendingsStream === 'function') {
        this.stopPendingsStream();
      }
      // AbortController.abort() est idempotent par spec et ne throw jamais —
      // pas de try/catch défensif (cf. CLAUDE.md "no empty catch").
      for (const controller of Object.values(this.abortControllers)) {
        controller.abort();
      }
      this.abortControllers = {};
      for (const controller of Object.values(this.abortControllersByGid)) {
        controller.abort();
      }
      this.abortControllersByGid = {};
      // Reset toutes les clés à false sans bracket-write user-typed (warning
      // Codacy "Generic Object Injection Sink"). `Object.fromEntries` produit
      // un nouvel objet figé à cet instant ; on l'assigne à la place pour
      // remplacer la map d'un coup, ce qui reste compatible avec la reactivité
      // Alpine puisque `loading` est l'objet observé.
      this.loading = Object.fromEntries(
        Object.keys(this.loading).map((k) => [k, false]),
      ) as typeof this.loading;
      this.pendingById = {};
      this.toasts = [];
      this.toastCounter = 0;
      this.shownToastEventKeys = new Set<EventKey>();
      // chatLoading vit hors de loading{} (flag dédié) — un chat envoyé sur
      // profil A puis switch vers profil B garderait l'input désactivé sinon.
      this.chatLoading = false;
      // Reset confirm dialog en vol pour éviter qu'un callback orphelin
      // s'exécute sur le nouveau contexte (le user vient de switcher).
      this.confirmCallback = null;
      this.confirmTrigger = null;
    },
  };
}
