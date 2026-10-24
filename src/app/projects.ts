import { normalizeSummaryData } from './helpers';
import { openingProfileQuery } from './project-snapshot';
import { resumeProjectModeration } from './moderation-gate';
import { withReplyFallback } from './chat-reply';
import { abortAutoRun, restoreAutoAnalysis } from './auto-runs';
import { abortSingleRuns, restoreSingleRuns } from './single-runs';
import { restoreChatLoading } from './chat-in-flight';
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

// ─────────────────────────────────────────────────────────────────────────────
// Méthodes extraites de createProjects pour ne pas agglomérer leur CCN dans la
// factory. `const = function` plutôt que `function` (cf. CLAUDE.md piège connu).
// ─────────────────────────────────────────────────────────────────────────────

const sortedProjects = function (this: AppContext): ProjectMeta[] {
  return [...this.projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

const openLightbox = function (this: AppContext, url: string) {
  this.lightboxUrl = url;
  (this.$refs.imageLightbox as HTMLDialogElement | undefined)?.showModal();
};

const fetchProjectsList = async function (state: AppContext): Promise<void> {
  try {
    const profileId = state.currentProfile?.id;
    const url = profileId ? `/api/projects?profileId=${profileId}` : '/api/projects';
    const res = await fetch(url);
    if (res.ok) state.projects = (await res.json()) as ProjectMeta[];
  } catch {
    /* silent: offline, liste projets vide acceptable */
  }
};

const loadProjects = async function (this: AppContext) {
  await fetchProjectsList(this);
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
};

const createProject = async function (this: AppContext) {
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
};

// Pré-extrait les champs liste avec leurs valeurs par défaut. Sépare le calcul
// des `??` du reste de l'hydratation pour rester sous CCN 8 (chaque `??` pèse 2
// dans le comptage Lizard, cf. CLAUDE.md piège connu).
const extractProjectLists = function (project: ProjectData): {
  sources: ProjectData['sources'];
  generations: Generation[];
  chatMessages: NonNullable<ProjectData['chat']>['messages'];
} {
  const sources = project.sources ?? [];
  const generations = project.results?.generations ?? [];
  const chatMessages = project.chat?.messages ?? [];
  return { sources, generations, chatMessages };
};

// Hydrate les champs scalaires/listes du state à partir du snapshot serveur.
const hydrateProjectFields = function (state: AppContext, project: ProjectData, id: string): void {
  const { sources, generations, chatMessages } = extractProjectLists(project);
  state.currentProject = project;
  state.sources = sources;
  state.selectedIds = sources.map((s) => s.id);
  state.generations = generations;
  state.consigne = project.consigne ?? null;
  state.useConsigne = localStorage.getItem(`consigne-dismissed-${id}`) !== 'true';
  state.chatMessages = withReplyFallback(state, chatMessages);
};

const startSseStreamSafely = function (state: AppContext, id: string): void {
  if (typeof state.startPendingsStream !== 'function') return;
  state.startPendingsStream(id).catch((err: unknown) => {
    // SSE optionnel (snapshot suffit pour l'UI), mais on log l'erreur :
    // un échec persistant ici masque les notifications temps réel et
    // doit être visible en dev — pas de catch totalement silencieux.
    console.error('[sse] startPendingsStream failed', err);
  });
};

// Orchestrateur léger : hydrate + ouvre les dernières gens par type + démarre SSE. Retour sur un
// cours dont l'Auto analyse encore (lancé avant un changement de cours) : puce « Auto — analyse… »
// rétablie, annulable, et bouton Auto désactivé (isGenerating) au lieu d'en permettre un second ;
// dont un message du chat attend encore sa réponse : indicateur rétabli, champ inactif.
const applyProjectSnapshot = function (state: AppContext, project: ProjectData, id: string): void {
  hydrateProjectFields(state, project, id);
  normalizeGenerations(state, state.generations);
  for (const genId of buildLatestByType(state.generations)) {
    state.openGens[genId] = true;
  }
  state.activeView = state.sources.length === 0 ? 'sources' : 'dashboard';
  restoreAutoAnalysis(state, id);
  restoreSingleRuns(state, id);
  restoreChatLoading(state, id);
  void state.$nextTick(() => state.refreshIcons());
  startSseStreamSafely(state, id);
};

// Nom du cours affiché : celui de son snapshot, sinon celui de la liste des cours, connu dès le clic
// (ouverture en cours : l'en-tête nomme le cours CHOISI, jamais le précédent).
const currentProjectName = function (this: AppContext): string {
  const loaded = this.currentProject?.meta?.name;
  if (loaded) return loaded;
  const listed = this.projects.find((p) => p.id === this.currentProjectId);
  return listed?.name ?? '';
};

// Cours déjà ouvert, ou en cours d'ouverture, re-touché dans la liste (barre latérale, onglet
// « Cours ») : aucune remise à zéro. Elle annulait toute action en cours (analyse Auto, import,
// enregistrement…) : vécu le 2026-10-21, « l'analyse Auto disparaît et rien n'arrive » ; pendant
// l'ouverture, elle relancerait la requête du snapshot. Retour à l'accueil du cours seulement, que
// le snapshot choisit lui-même s'il n'est pas encore arrivé.
const retouchOpenProject = (state: AppContext, id: string): boolean => {
  if (id !== state.currentProjectId) return false;
  if (state.projectLoading) return true;
  if (state.currentProject === null) return false;
  state.activeView = state.sources.length === 0 ? 'sources' : 'dashboard';
  return true;
};

// Ouverture d'un cours, dès le clic : rien de l'ancien cours ne reste à l'écran (currentProject à
// null : en-tête et titre au nom tiré de la liste, currentProjectName) et un chargement remplace
// l'état vide « Ajoute tes premières sources » jusqu'au snapshot. Mesuré au release-test du
// 2026-10-21 : 10 à 15 s d'attente quand les étapes d'un Auto occupent les connexions du
// navigateur ; un enfant pouvait croire ses sources perdues. resetSession abandonne l'ouverture
// précédente (cours re-choisi avant la fin du chargement).
const beginProjectLoad = (
  state: AppContext,
  id: string,
  profileId: string | undefined,
): AbortController => {
  state.currentProjectId = id;
  if (profileId) setLastProjectIdForProfile(profileId, id);
  state.resetSession();
  state.resetState();
  state.currentProject = null;
  state.projectLoading = true;
  const controller = new AbortController();
  state.projectLoadController = controller;
  return controller;
};

// Ouverture toujours la plus récente : un autre cours, un autre profil ou la suppression du cours
// l'a supplantée sinon, et son snapshot afficherait un cours qui n'est plus choisi.
const isCurrentLoad = (state: AppContext, load: AbortController): boolean => {
  return state.projectLoadController === load;
};

// Fin du chargement (snapshot appliqué ou échec) : seulement pour l'ouverture la plus récente.
const endProjectLoad = (state: AppContext, load: AbortController): void => {
  if (!isCurrentLoad(state, load)) return;
  state.projectLoadController = null;
  state.projectLoading = false;
};

// Sans toast + reset, l'UI resterait sur un projet partiellement sélectionné (currentProjectId muté
// + state vidé via resetState) → sources vides, generates qui partent vers
// /api/projects/<deleted-id>/... → 404.
const failProjectLoad = (state: AppContext, id: string): void => {
  state.currentProjectId = null;
  state.showToast(state.t('toast.projectLoadError'), 'error', () => state.selectProject(id));
};

// Réponse de l'ouverture la plus récente : snapshot appliqué, sauf s'il arrive après qu'une autre
// l'a supplantée pendant la lecture du corps.
const applyProjectResponse = async (
  state: AppContext,
  id: string,
  res: Response,
  load: AbortController,
): Promise<void> => {
  if (!res.ok) {
    console.warn('[selectProject] non-ok', { id, status: res.status });
    failProjectLoad(state, id);
    return;
  }
  // Corps typé par une variable : `(await res.json()) as …` coupait la mesure Lizard.
  const snapshot: unknown = await res.json();
  if (!isCurrentLoad(state, load)) return;
  applyProjectSnapshot(state, snapshot as ProjectData, id);
  // Sources en attente, en erreur ou jamais vérifiées d'un profil modéré : vérifiées en fond.
  resumeProjectModeration(state, id);
};

const selectProject = async function (this: AppContext, id: string) {
  if (retouchOpenProject(this, id)) return;
  const profileId = this.currentProfile?.id;
  const load = beginProjectLoad(this, id, profileId);
  try {
    // profileId : un projet encore orphelin est rattaché au profil qui l'ouvre (côté serveur).
    const res = await fetch('/api/projects/' + id + openingProfileQuery(profileId), {
      signal: load.signal,
    });
    if (isCurrentLoad(this, load)) await applyProjectResponse(this, id, res, load);
  } catch (err) {
    // Ouverture supplantée (requête abortée par resetSession) : rien à signaler.
    if (isCurrentLoad(this, load)) {
      console.warn('[selectProject] failed', err);
      failProjectLoad(this, id);
    }
  } finally {
    endProjectLoad(this, load);
  }
};

const deleteProject = async function (this: AppContext, id: string) {
  // Vérifier res.ok AVANT mutation state.projects : sinon en cas de 404/500
  // (projet locked, FS error), l'UI affiche succès mais le projet réapparaît
  // au reload — incohérence opaque côté utilisateur.
  let res: Response;
  try {
    res = await fetch('/api/projects/' + id, { method: 'DELETE' });
  } catch (err) {
    console.error('[deleteProject] network failure', err);
    this.showToast(this.t('toast.projectDeleteError'), 'error', () => this.deleteProject(id));
    return;
  }
  if (!res.ok) {
    console.error('[deleteProject] non-ok', { id, status: res.status });
    this.showToast(this.t('toast.projectDeleteError'), 'error', () => this.deleteProject(id));
    return;
  }
  this.projects = this.projects.filter((p) => p.id !== id);
  // Import en cours vers ce cours : sa session disparaît, la boucle s'arrête au fichier suivant.
  this.uploadSessions = this.uploadSessions.filter((s) => s.projectId !== id);
  // Auto en cours sur ce cours : arrêté (resetSession l'épargnerait), aucune étape n'est envoyée ;
  // ses générations simples en vol aussi.
  abortAutoRun(this, id);
  abortSingleRuns(this, id);
  if (this.currentProjectId === id) {
    this.currentProjectId = null;
    this.currentProject = null;
    const profileId = this.currentProfile?.id;
    if (profileId) clearLastProjectIdForProfile(profileId);
    this.resetSession();
    this.resetState();
  }
  this.showToast(this.t('toast.projectDeleted'), 'info');
};

const resetState = function (this: AppContext) {
  this.sources = [];
  this.selectedIds = [];
  // uploadSessions gardées : un import continue en arrière-plan vers son cours (cf. sources.ts,
  // _isSessionAlive) ; seules celles du cours affiché sont montrées (projectUploadSessions).
  this.generations = [];
  this.openGens = {};
  this.editingTitle = null;
  this.activeView = 'dashboard';
  this.showTextInput = false;
  this.showWebInput = false;
  // Saisies d'un texte ou d'une recherche : propres au cours quitté (déjà envoyées, elles
  // réapparaissaient dans le cours suivant).
  this.textInput = '';
  this.webQuery = '';
  this.consigne = null;
  this.chatMessages = [];
  this.chatInput = '';
};

export function createProjects() {
  return {
    sortedProjects,
    openLightbox,
    loadProjects,
    createProject,
    currentProjectName,
    selectProject,
    deleteProject,
    resetState,
  };
}
