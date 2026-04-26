import { normalizeSummaryData } from './helpers';
import type { AppContext } from './app-context';
import type { Generation, ProjectData, ProjectMeta } from '../../types';

// Clé legacy non-namespacée. Avant cette PR, un seul `sf-lastProjectId` global
// était stocké → un user qui switche de profil et reload retombe sur le projet
// d'un autre profil (qui sera filtré par le serveur, mais c'est pollué). Migré
// vers la map `sf-profile-last-project: {profileId: projectId}`.
const LS_LAST_PROJECT_ID_LEGACY = 'sf-lastProjectId';
const LS_PROFILE_LAST_PROJECT = 'sf-profile-last-project';

// Helpers en arrow pour ne pas être agglomérés par le parseur TS de Lizard
// (cf. CLAUDE.md piège connu : `function foo()` top-level consécutives sont
// fusionnées et leur CCN combiné dépasse 8).
const readProfileLastProjectMap = (): Record<string, string> => {
  const raw = localStorage.getItem(LS_PROFILE_LAST_PROJECT);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string',
      ),
    );
  } catch {
    return {};
  }
};

const writeProfileLastProjectMap = (map: Record<string, string>): void => {
  localStorage.setItem(LS_PROFILE_LAST_PROJECT, JSON.stringify(map));
};

const getLastProjectIdForProfile = (profileId: string): string | null =>
  readProfileLastProjectMap()[profileId] ?? null;

const setLastProjectIdForProfile = (profileId: string, projectId: string): void => {
  const map = readProfileLastProjectMap();
  map[profileId] = projectId;
  writeProfileLastProjectMap(map);
};

const clearLastProjectIdForProfile = (profileId: string): void => {
  const map = readProfileLastProjectMap();
  if (!(profileId in map)) return;
  delete map[profileId];
  writeProfileLastProjectMap(map);
};

// Migration silencieuse one-time : si l'ancienne clé globale existe et que le
// profil actif n'a pas encore d'entrée dans la map, déplace la valeur. Idempotent
// (no-op aux appels suivants car la legacy key est supprimée). Pas de logique
// "à quel profil ça appartient" : on assigne au profil actif au moment de la
// migration, ce qui correspond à la dernière session pré-PR.
function migrateLegacyLastProjectId(profileId: string): void {
  const legacy = localStorage.getItem(LS_LAST_PROJECT_ID_LEGACY);
  if (!legacy) return;
  const map = readProfileLastProjectMap();
  if (!(profileId in map)) {
    map[profileId] = legacy;
    writeProfileLastProjectMap(map);
  }
  localStorage.removeItem(LS_LAST_PROJECT_ID_LEGACY);
}

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
      const profileId = this.currentProfile?.id;
      if (!profileId) return;
      // Migration silencieuse one-time du sf-lastProjectId legacy vers la map
      // namespacée par profil. À ce stade le profil est forcément défini
      // (loadProjects est invoqué par selectProfile uniquement).
      migrateLegacyLastProjectId(profileId);
      const lastId = getLastProjectIdForProfile(profileId);
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
      const profileId = this.currentProfile?.id;
      if (profileId) setLastProjectIdForProfile(profileId, id);
      this.resetSession();
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
        // Démarre le stream SSE après le snapshot initial. La méthode interne
        // re-fetche le projet (réconciliation des notifs ratées) puis ouvre
        // l'EventSource. Stoppé par resetSession au switch projet/profil.
        if (typeof this.startPendingsStream === 'function') {
          this.startPendingsStream(id).catch(() => {
            /* silent: SSE optionnel, le snapshot ci-dessus suffit pour l'UI */
          });
        }
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
        const profileId = this.currentProfile?.id;
        if (profileId) clearLastProjectIdForProfile(profileId);
        this.resetSession();
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
