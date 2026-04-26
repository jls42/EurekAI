import type { AppContext } from './app-context';

// Cancel un pending par gid : abort le fetch côté client + POST /cancel HTTP
// (best-effort silencieux si réseau down — le boot sweep + idempotence du
// store couvrent les pendings orphelins). UI optimiste : retire de pendingById
// immédiatement, l'event SSE 'cancelled' confirmera bientôt.
function cancelPendingByGid(state: AppContext, gid: string, type: string): void {
  const controller = state.abortControllersByGid[gid];
  if (controller) {
    try {
      controller.abort();
    } catch {
      /* déjà aborté */
    }
    delete state.abortControllersByGid[gid];
  }
  const pid = state.currentProjectId;
  if (pid) {
    fetch('/api/projects/' + pid + '/generations/' + gid + '/cancel', {
      method: 'POST',
    }).catch(() => {
      /* silent: best-effort, le boot sweep + idempotence couvrent */
    });
  }
  delete state.pendingById[gid];
  // legacy loading{} pour ce type : on laisse le finally du generate() le
  // remettre à false (dans le path cancelOne via gid, le finally s'exécute
  // toujours côté state.generate via AbortError).
  const label = state.t('gen.' + type) || type;
  state.showToast(state.t('toast.cancelledOne', { type: label }), 'info');
}

export function createConfirm() {
  return {
    confirmDelete(this: AppContext, target: string, callback: () => void) {
      const confirmLabels: Record<string, string> = {
        projet: 'confirm.project',
        source: 'confirm.source',
        generation: 'confirm.generation',
      };
      this.confirmTarget = confirmLabels[target] ? this.t(confirmLabels[target]) : target;
      this.confirmCallback = callback;
      this.confirmTrigger = document.activeElement as HTMLElement;
      (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.showModal();
    },

    executeConfirm(this: AppContext) {
      (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.close();
      if (this.confirmCallback) {
        this.confirmCallback();
        this.confirmCallback = null;
      }
      if (this.confirmTrigger) {
        this.$nextTick(() => {
          try {
            this.confirmTrigger?.focus();
          } catch {
            /* silent: focus restore peut throw si element demonte */
          }
          this.confirmTrigger = null;
        });
      }
    },

    closeConfirmDialog(this: AppContext) {
      (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.close();
      this.confirmCallback = null;
      if (this.confirmTrigger) {
        this.$nextTick(() => {
          try {
            this.confirmTrigger?.focus();
          } catch {
            /* silent: focus restore peut throw si element demonte */
          }
          this.confirmTrigger = null;
        });
      }
    },

    // Le `key` accepte soit un type (transient : auto/voice/websearch/...),
    // soit un gid (UUID v4) pour cibler un pending Generation spécifique.
    // Détection : un gid trouvé dans pendingById prime sur le type pour
    // permettre le cancel précis en multi-onglets / auto parallel.
    cancelOne(this: AppContext, key: string) {
      const pending = this.pendingById[key];
      if (pending) {
        cancelPendingByGid(this, key, pending.type);
        return;
      }
      // Fallback legacy : cancel par type (transients ou auto qui mute loading{})
      const controller = this.abortControllers[key];
      if (controller) {
        controller.abort();
        delete this.abortControllers[key];
      }
      this.loading[key] = false;
      const label = this.t('gen.' + key) || key;
      this.showToast(this.t('toast.cancelledOne', { type: label }), 'info');
    },

    cancelGeneration(this: AppContext) {
      // 1. Cancel tous les pendings par gid (envoi POST /cancel à chaque)
      for (const gid of Object.keys(this.pendingById)) {
        const entry = this.pendingById[gid];
        cancelPendingByGid(this, gid, entry.type);
      }
      // 2. Cancel les transients résiduels (auto/voice/websearch via abort
      //    controller par type seulement)
      for (const controller of Object.values(this.abortControllers)) {
        controller.abort();
      }
      this.abortControllers = {};
      for (const key of Object.keys(this.loading)) {
        this.loading[key] = false;
      }
      this.showToast(this.t('toast.cancelledGeneration'), 'info');
    },
  };
}
