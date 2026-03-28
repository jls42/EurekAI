export function createWebsearch() {
  return {
    async searchWeb(this: any) {
      const query = this.webQuery.trim();
      if (!query || !this.currentProjectId) return;
      this.loading.websearch = true;
      try {
        const res = await fetch(this.apiBase() + '/sources/websearch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, lang: this.locale, ageGroup: this.currentProfile?.ageGroup || 'enfant' }),
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
          );
          return;
        }
        const source = await res.json();
        this.sources.push(source);
        this.selectedIds.push(source.id);
        this.webQuery = '';
        this.showWebInput = false;
        this.showToast(this.t('toast.webSearchAdded'), 'success');
        this.$nextTick(() => this.refreshIcons());
        setTimeout(() => this.refreshModeration(), 2000);
      } catch (e: any) {
        this.showToast(this.t('toast.webSearchError', { error: e.message }), 'error', () =>
          this.searchWeb(),
        );
      } finally {
        this.loading.websearch = false;
      }
    },
  };
}
