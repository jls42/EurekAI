import { normalizeSummaryData } from './helpers';
import type { AppContext } from './app-context';
import type { Generation, ProjectData, ProjectMeta } from '../../types';

function normalizeGenerations(state: AppContext, generations: Generation[]): void {
  for (const gen of generations) {
    normalizeSummaryData(gen);
    state.initGenProps(gen);
  }
}

function buildLatestByType(generations: Generation[]): string[] {
  const latestByType: Record<string, Generation> = {};
  for (const gen of generations) {
    const prev = latestByType[gen.type];
    if (!prev || gen.createdAt > prev.createdAt) {
      latestByType[gen.type] = gen;
    }
  }
  return Object.values(latestByType).map((gen) => gen.id);
}

export function createProjects() {
  return {
    sortedProjects(this: AppContext): ProjectMeta[] {
      return [...this.projects].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },

    openLightbox(this: AppContext, url: string) {
      this.lightboxUrl = url;
      (this.$refs.imageLightbox as HTMLDialogElement | undefined)?.showModal();
    },

    async loadProjects(this: AppContext) {
      try {
        const profileId = this.currentProfile?.id;
        const url = profileId ? `/api/projects?profileId=${profileId}` : '/api/projects';
        const res = await fetch(url);
        if (res.ok) this.projects = (await res.json()) as ProjectMeta[];
      } catch {
        /* silent: offline, liste projets vide acceptable */
      }
      const lastId = localStorage.getItem('sf-lastProjectId');
      if (lastId && !this.currentProjectId && this.projects.some((p) => p.id === lastId)) {
        await this.selectProject(lastId);
      }
    },

    async createProject(this: AppContext) {
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
          const meta = (await res.json()) as ProjectMeta;
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

    async selectProject(this: AppContext, id: string) {
      this.currentProjectId = id;
      localStorage.setItem('sf-lastProjectId', id);
      this.resetState();
      try {
        const res = await fetch('/api/projects/' + id);
        if (!res.ok) return;
        const project = (await res.json()) as ProjectData;
        this.currentProject = project;
        this.sources = project.sources || [];
        this.selectedIds = this.sources.map((s) => s.id);
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
      } catch {
        /* silent: offline project select, state reset deja fait */
      }
    },

    async deleteProject(this: AppContext, id: string) {
      await fetch('/api/projects/' + id, { method: 'DELETE' });
      this.projects = this.projects.filter((p) => p.id !== id);
      if (this.currentProjectId === id) {
        this.currentProjectId = null;
        this.currentProject = null;
        localStorage.removeItem('sf-lastProjectId');
        this.resetState();
      }
      this.showToast(this.t('toast.projectDeleted'), 'info');
    },

    resetState(this: AppContext) {
      this.sources = [];
      this.selectedIds = [];
      this.uploadSessions = [];
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
