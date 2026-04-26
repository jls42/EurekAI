import type { AppContext } from './app-context';

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
      // 0. Stop EventSource SSE en cours pour ne plus recevoir d'events sur
      //    le contexte précédent. La méthode est ajoutée par createPendingsStream.
      if (typeof this.stopPendingsStream === 'function') {
        this.stopPendingsStream();
      }
      // 1. Aborter les fetches en vol (libère les sockets côté client).
      //    Le serveur continue son travail — pas de cancel HTTP automatique
      //    (cf. invariant "refresh ≠ cancel" dans le plan).
      for (const controller of Object.values(this.abortControllers)) {
        try {
          controller.abort();
        } catch {
          /* déjà aborté */
        }
      }
      this.abortControllers = {};
      for (const controller of Object.values(this.abortControllersByGid)) {
        try {
          controller.abort();
        } catch {
          /* déjà aborté */
        }
      }
      this.abortControllersByGid = {};

      // 2. Vider les flags loading (mais conserver la structure pour les keys
      //    transient : auto/all/voice/websearch). Le pending lifecycle pour
      //    les 7 Generation est tracké dans pendingById.
      for (const key of Object.keys(this.loading)) {
        this.loading[key] = false;
      }

      // 3. Vider les pendings optimistes locaux. La réconciliation au prochain
      //    selectProject ré-hydrate depuis project.results.pendingTracker côté
      //    serveur si on revient sur le même contexte.
      this.pendingById = {};

      // 4. Vider la file toast UI + le set de dédup per-tab. L'archive
      //    notifications.ts (cloche) reste intacte côté localStorage.
      this.toasts = [];
      this.toastCounter = 0;
      this.shownToastEventKeys = new Set<string>();

      // 5. Reset confirm dialog en vol pour éviter qu'un callback orphelin
      //    s'exécute sur le nouveau contexte.
      this.confirmCallback = null;
      this.confirmTrigger = null;
    },
  };
}
