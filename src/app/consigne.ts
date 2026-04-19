import type { AppContext } from './app-context';
import type { ProjectData } from '../../types';

type Consigne = { found: boolean; text: string; keyTopics: string[] };

export function createConsigne() {
  return {
    async refreshConsigne(this: AppContext) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch('/api/projects/' + this.currentProjectId);
        if (res.ok) {
          const project = (await res.json()) as ProjectData;
          if (project.consigne) {
            this.consigne = project.consigne;
            this.$nextTick(() => this.refreshIcons());
          }
        }
      } catch {
        /* silent: offline fallback, consigne absent OK */
      }
    },

    async detectConsigne(this: AppContext) {
      if (!this.currentProjectId) return;
      (this.$refs.consigneDialog as HTMLDialogElement | undefined)?.close();
      this.consigneLoading = true;
      this.showToast(this.t('toast.consigneAnalyzing'), 'info');
      try {
        const res = await fetch(this.apiBase() + '/detect-consigne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lang: this.locale }),
        });
        if (res.ok) {
          this.consigne = (await res.json()) as Consigne;
          this.showToast(
            this.consigne.found ? this.t('toast.consigneDetected') : this.t('toast.noConsigne'),
            this.consigne.found ? 'success' : 'info',
          );
          if (this.consigne.found) {
            this.$nextTick(() => {
              (this.$refs.consigneDialog as HTMLDialogElement | undefined)?.showModal();
              this.refreshIcons();
            });
          }
        }
      } catch {
        this.showToast(this.t('toast.consigneError'), 'error');
      } finally {
        this.consigneLoading = false;
        this.$nextTick(() => this.refreshIcons());
      }
    },
  };
}
