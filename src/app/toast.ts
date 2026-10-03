import type { AppContext } from './app-context';
import { appendNotification } from './notifications';
import type { EventKey } from '../../helpers/event-bus';

// Alias : un type de fonction écrit en ligne dans la signature de showToast faisait perdre son
// corps à Lizard (seule la signature était mesurée, cf. CLAUDE.md « Pièges Lizard »).
type ToastRetry = (() => void) | null;
type ToastActionSpec = { label: string; fn: () => void } | null;

export interface Toast {
  id: number;
  message: string;
  type: string;
  retryFn: ToastRetry;
  action: ToastActionSpec;
  // Occurrences regroupées : un toast identique (même type, même message) déjà affiché n'est pas
  // dupliqué, son compteur augmente (badge « ×N »). Vécu : les 18 échecs d'une rafale de quiz
  // empilaient 18 toasts sur tout l'écran d'un téléphone.
  count: number;
  // Échéance de fermeture automatique (Date.now(), en ms) ; null = persistant (erreur + réessai).
  expiresAt: number | null;
}

export interface NotifSpec {
  // Clé i18n persistée pour permettre re-traduction au render dans la cloche
  // (synchro avec la langue UI courante, même si user change après création).
  messageKey: string;
  // Paramètres scalaires (non-traduits) — ex: count, percent.
  params?: Record<string, string | number>;
  // Sous-clés à traduire au render — ex: { type: 'gen.summary' } pour résoudre
  // le label d'agent dans la langue UI courante.
  paramKeys?: Record<string, string>;
}

const AUTO_DISMISS_MS = 5000;
const AUTO_DISMISS_WITH_ACTION_MS = 8000;

// Une erreur qui propose « Réessayer » reste affichée jusqu'à ce que l'utilisateur agisse.
const isPersistent = (toast: Toast): boolean => {
  return toast.type === 'error' && toast.retryFn !== null;
};

const dismissDelay = (toast: Toast): number => {
  return toast.action ? AUTO_DISMISS_WITH_ACTION_MS : AUTO_DISMISS_MS;
};

// Le minuteur relit l'échéance : repoussée par un regroupement → nouveau minuteur pour le reste ;
// null (toast devenu persistant) ou toast déjà fermé → rien. Un minuteur d'avant resetSession (qui
// remet toastCounter à 0) ne ferme donc pas un nouveau toast au même id avant sa propre échéance.
const expireToast = (state: AppContext, id: number): void => {
  const toast = state.toasts.find((t) => t.id === id);
  if (toast?.expiresAt == null) return;
  const remaining = toast.expiresAt - Date.now();
  if (remaining > 0) setTimeout(() => expireToast(state, id), remaining);
  else state.dismissToast(id);
};

const armDismiss = (state: AppContext, toast: Toast): void => {
  if (isPersistent(toast)) return;
  const delay = dismissDelay(toast);
  toast.expiresAt = Date.now() + delay;
  setTimeout(() => expireToast(state, toast.id), delay);
};

// Toast identique déjà affiché : une occurrence de plus, dernier réessai et dernière action gardés
// (« Réessayer » relance UNE fois l'action la plus récente), échéance repoussée.
const regroupToast = (toast: Toast, retryFn: ToastRetry, action: ToastActionSpec): void => {
  toast.count++;
  toast.retryFn = retryFn ?? toast.retryFn;
  toast.action = action ?? toast.action;
  toast.expiresAt = isPersistent(toast) ? null : Date.now() + dismissDelay(toast);
};

// Dédup par événement, à 2 niveaux. Rend true si l'événement a déjà son toast dans cet onglet.
// 1. Persistée : le ledger seenEventKeys (localStorage, idempotent par eventKey) empêche les
//    doublons de la cloche entre onglets. L'écriture déclenche aussi le 'storage' event listener
//    qui bumpe notificationsVersion sur les autres onglets (cf. commit cloche).
// 2. Per-tab : shownToastEventKeys (Set en RAM) ; un événement déjà affiché dans l'onglet
//    (payload 200 + event SSE) ne produit ni nouveau toast ni nouveau compte du regroupement.
// notifSpec : clé i18n + params persistés au lieu du message déjà traduit (re-traduit au render
// de la cloche) ; sans lui, le `message` est persisté en string figé (mode legacy compat).
const recordToastEvent = (
  state: AppContext,
  message: string,
  type: string,
  eventKey: EventKey,
  notifSpec?: NotifSpec,
): boolean => {
  if (state.currentProfile) {
    const created = appendNotification(state.currentProfile.id, {
      eventKey,
      ...(notifSpec
        ? {
            messageKey: notifSpec.messageKey,
            params: notifSpec.params,
            paramKeys: notifSpec.paramKeys,
          }
        : { message }),
      type: type as 'info' | 'success' | 'warning' | 'error',
      projectId: state.currentProjectId ?? undefined,
    });
    if (created) state.notificationsVersion++;
  }
  if (state.shownToastEventKeys.has(eventKey)) return true;
  state.shownToastEventKeys.add(eventKey);
  return false;
};

export function createToast() {
  return {
    // Signature rétrocompatible : eventKey (5e) et notifSpec (6e) ajoutés après les 4 args
    // historiques pour ne pas casser les appels existants (cf. recordToastEvent).
    showToast(
      this: AppContext,
      message: string,
      type = 'info',
      retryFn: ToastRetry = null,
      action: ToastActionSpec = null,
      eventKey?: EventKey,
      notifSpec?: NotifSpec,
    ) {
      if (eventKey && recordToastEvent(this, message, type, eventKey, notifSpec)) return;
      const same = this.toasts.find((t) => t.type === type && t.message === message);
      if (same) {
        regroupToast(same, retryFn, action);
        return;
      }
      const id = ++this.toastCounter;
      const toast: Toast = { id, message, type, retryFn, action, count: 1, expiresAt: null };
      armDismiss(this, toast);
      this.toasts.push(toast);
      void this.$nextTick(() => this.refreshIcons());
    },

    dismissToast(this: AppContext, id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
  };
}
