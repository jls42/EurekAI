import type { AppContext } from './app-context';
import { appendNotification } from './notifications';

export interface Toast {
  id: number;
  message: string;
  type: string;
  retryFn: (() => void) | null;
  action: { label: string; fn: () => void } | null;
}

export function createToast() {
  return {
    // Signature rétrocompatible : eventKey ajouté en 5e position pour ne pas
    // casser les appels existants (4 args max). Si fourni, déclenche la dédup
    // à 2 niveaux :
    // 1. Persistance cross-tab via appendNotification (idempotent par eventKey
    //    dans le ledger localStorage).
    // 2. UI per-tab via shownToastEventKeys (Set en RAM, scope onglet).
    // Si l'eventKey est déjà vu côté UI, retour immédiat — pas de toast UI
    // dupliqué quand payload 200 + event SSE arrivent dans le même onglet.
    showToast(
      this: AppContext,
      message: string,
      type = 'info',
      retryFn: (() => void) | null = null,
      action: { label: string; fn: () => void } | null = null,
      eventKey?: string,
    ) {
      if (eventKey) {
        // Dédup persistée : le ledger seenEventKeys empêche les doublons
        // entre onglets. L'écriture côté localStorage déclenche aussi le
        // 'storage' event listener pour bumper notificationsVersion sur les
        // autres onglets (cf. commit cloche).
        if (this.currentProfile) {
          const created = appendNotification(this.currentProfile.id, {
            eventKey,
            message,
            type: type as 'info' | 'success' | 'warning' | 'error',
            projectId: this.currentProjectId ?? undefined,
          });
          if (created) this.notificationsVersion++;
        }
        // Dédup per-tab du toast UI : si déjà affiché dans ce tab pour ce
        // eventKey, no-op total (ni nouveau toast, ni nouveau push notif —
        // le push a déjà été tenté ci-dessus avec idempotence).
        if (this.shownToastEventKeys.has(eventKey)) return;
        this.shownToastEventKeys.add(eventKey);
      }
      const id = ++this.toastCounter;
      this.toasts.push({ id, message, type, retryFn, action });
      this.$nextTick(() => this.refreshIcons());
      if (!(type === 'error' && retryFn)) {
        setTimeout(() => this.dismissToast(id), action ? 8000 : 5000);
      }
    },

    dismissToast(this: AppContext, id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
  };
}
