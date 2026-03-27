import { normalizeSummaryData } from './helpers';

/** Normalize summary data and init gen props for all generations. */
function normalizeGenerations(state: any, generations: any[]): void {
  for (const gen of generations) {
    normalizeSummaryData(gen);
    state.initGenProps(gen);
  }
}

/** Find the latest generation per type and return their ids. */
function buildLatestByType(generations: any[]): string[] {
  const latestByType: Record<string, any> = {};
  for (const gen of generations) {
    if (!latestByType[gen.type] || gen.createdAt > latestByType[gen.type].createdAt) {
      latestByType[gen.type] = gen;
    }
  }
  return Object.values(latestByType).map((gen: any) => gen.id);
}

export function createProjects() {
  return {
    sortedProjects(this: any) {
      return [...this.projects].sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },

    openLightbox(this: any, url: string) {
      this.lightboxUrl = url;
      this.$refs.imageLightbox?.showModal();
    },

    async loadProjects(this: any) {
      try {
        const profileId = this.currentProfile?.id;
        const url = profileId ? `/api/projects?profileId=${profileId}` : '/api/projects';
        const res = await fetch(url);
        if (res.ok) this.projects = await res.json();
      } catch {}
      // Auto-restore last project (important for mobile)
      const lastId = localStorage.getItem('sf-lastProjectId');
      if (lastId && !this.currentProjectId && this.projects.some((p: any) => p.id === lastId)) {
        await this.selectProject(lastId);
      }
    },

    async createProject(this: any) {
      const name = this.newProjectName.trim();
      if (!name) return;
      try {
        const profileId = this.currentProfile?.id;
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, profileId }),
        });
        if (res.ok) {
          const meta = await res.json();
          this.projects.push(meta);
          this.newProjectName = '';
          this.showNewProject = false;
          await this.selectProject(meta.id);
          this.showToast(this.t('toast.courseCreated'), 'success');
        }
      } catch {
        this.showToast(this.t('toast.courseCreateError'), 'error', () => this.createProject());
      }
    },

    async selectProject(this: any, id: string) {
      this.currentProjectId = id;
      localStorage.setItem('sf-lastProjectId', id);
      this.resetState();
      try {
        const res = await fetch('/api/projects/' + id);
        if (!res.ok) return;
        const project = await res.json();
        this.currentProject = project;
        this.sources = project.sources || [];
        this.selectedIds = this.sources.map((s: any) => s.id);
        this.generations = project.results?.generations || [];
        this.consigne = project.consigne || null;
        this.useConsigne = localStorage.getItem(`consigne-dismissed-${id}`) !== 'true';
        this.chatMessages = project.chat?.messages || [];
        normalizeGenerations(this, this.generations);
        for (const genId of buildLatestByType(this.generations)) {
          this.openGens[genId] = true;
        }
        if (this.sources.length === 0) {
          this.activeView = 'sources';
        } else {
          this.activeView = 'dashboard';
        }
        this.$nextTick(() => this.refreshIcons());
      } catch {}
    },

    async deleteProject(this: any, id: string) {
      await fetch('/api/projects/' + id, { method: 'DELETE' });
      this.projects = this.projects.filter((p: any) => p.id !== id);
      if (this.currentProjectId === id) {
        this.currentProjectId = null;
        this.currentProject = null;
        localStorage.removeItem('sf-lastProjectId');
        this.resetState();
      }
      this.showToast(this.t('toast.projectDeleted'), 'info');
    },

    resetState(this: any) {
      this.sources = [];
      this.selectedIds = [];
      this.generations = [];
      this.openGens = {};
      this.editingTitle = null;
      this.activeView = 'dashboard';
      this.showTextInput = false;
      this.showWebInput = false;
      this.consigne = null;
      this.chatMessages = [];
      this.chatInput = '';
    },
  };
}
