import type { AppContext } from './app-context';

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

    cancelOne(this: AppContext, key: string) {
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
