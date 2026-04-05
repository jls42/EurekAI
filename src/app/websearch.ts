import { addCostDelta } from './cost-utils';

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
          body: JSON.stringify({ query, lang: this.locale, ageGroup: this.currentProfile?.ageGroup || 'enfant', scrapeMode: this.scrapeMode }),
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
          );
          return;
        }
        const result = await res.json();
        const sources = Array.isArray(result) ? result : [result];
        for (const source of sources) {
          this.sources.push(source);
          this.selectedIds.push(source.id);
          addCostDelta(this, source.estimatedCost, 'sources/websearch');
        }
        this.webQuery = '';
        this.showWebInput = false;
        const msg =
          sources.length > 1
            ? this.t('toast.webSearchAddedMulti', { count: sources.length })
            : this.t('toast.webSearchAdded');
        this.showToast(msg, 'success');
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
