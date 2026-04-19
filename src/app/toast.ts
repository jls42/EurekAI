import type { AppContext } from './app-context';

export interface Toast {
  id: number;
  message: string;
  type: string;
  retryFn: (() => void) | null;
  action: { label: string; fn: () => void } | null;
}

export function createToast() {
  return {
    showToast(
      this: AppContext,
      message: string,
      type = 'info',
      retryFn: (() => void) | null = null,
      action: { label: string; fn: () => void } | null = null,
    ) {
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
