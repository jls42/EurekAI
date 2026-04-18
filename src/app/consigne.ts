export function createConsigne() {
  return {
    async refreshConsigne(this: any) {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch('/api/projects/' + this.currentProjectId);
        if (res.ok) {
          const project = await res.json();
          if (project.consigne) {
            this.consigne = project.consigne;
            this.$nextTick(() => this.refreshIcons());
          }
        }
      } catch {
        /* silent: offline fallback, consigne absent OK */
      }
    },

    async detectConsigne(this: any) {
      if (!this.currentProjectId) return;
      this.$refs.consigneDialog?.close();
      this.consigneLoading = true;
      this.showToast(this.t('toast.consigneAnalyzing'), 'info');
      try {
        const res = await fetch(this.apiBase() + '/detect-consigne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lang: this.locale }),
        });
        if (res.ok) {
          this.consigne = await res.json();
          this.showToast(
            this.consigne.found ? this.t('toast.consigneDetected') : this.t('toast.noConsigne'),
            this.consigne.found ? 'success' : 'info',
          );
          if (this.consigne.found) {
            this.$nextTick(() => {
              this.$refs.consigneDialog?.showModal();
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
