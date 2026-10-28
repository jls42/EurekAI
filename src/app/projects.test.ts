import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createProjects } from './projects';
import { createSession } from './session';
import { longRequestSlots, MAX_LONG_REQUESTS, withLongRequestSlot } from './request-slots';

vi.mock('./helpers', () => ({ normalizeSummaryData: vi.fn() }));

globalThis.fetch = vi.fn();

const proj = createProjects();

// Mock localStorage
const localStorageMock: Record<string, string> = {};
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: vi.fn((key: string) => localStorageMock[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete localStorageMock[key];
    }),
    clear: vi.fn(() => {
      for (const key of Object.keys(localStorageMock)) delete localStorageMock[key];
    }),
  },
  writable: true,
});

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: null as string | null,
    currentProject: null as any,
    currentProfile: { id: 'p1', chatEnabled: true, ageGroup: 'enfant', useModeration: false },
    projects: [] as any[],
    newProjectName: '',
    showNewProject: false,
    sources: [],
    generations: [],
    selectedIds: [],
    openGens: {} as Record<string, boolean>,
    editingTitle: null as string | null,
    activeView: 'dashboard',
    showTextInput: false,
    showWebInput: false,
    consigne: null,
    chatMessages: [],
    chatInput: '',
    chatLoading: false,
    chatInFlight: {} as Record<string, true>,
    projectLoading: false,
    projectLoadController: null as AbortController | null,
    uploadSessions: [] as any[],
    autoRuns: {} as Record<string, any>,
    singleRuns: {} as Record<string, any>,
    loading: {} as Record<string, boolean>,
    abortControllers: {} as Record<string, AbortController>,
    useConsigne: true,
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {},
    initGenProps: vi.fn(),
    resetSession: vi.fn(),
    resetState: proj.resetState,
    selectProject: proj.selectProject,
    currentProjectName: proj.currentProjectName,
    sortedProjects: proj.sortedProjects,
    loadProjects: proj.loadProjects,
    createProject: proj.createProject,
    deleteProject: proj.deleteProject,
    ...overrides,
  };
}

function mockFetchOk(data: any) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as any);
}

function mockFetchFail(status: number, data: any = {}) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: false,
    status,
    statusText: 'Error',
    json: async () => data,
  } as any);
}

beforeEach(() => {
  vi.mocked(globalThis.fetch).mockReset();
  for (const key of Object.keys(localStorageMock)) delete localStorageMock[key];
});

// --- sortedProjects ---

describe('sortedProjects', () => {
  it('sorts by createdAt descending', () => {
    const ctx = makeContext({
      projects: [
        { id: 'p1', createdAt: '2024-01-01T00:00:00Z' },
        { id: 'p3', createdAt: '2024-03-01T00:00:00Z' },
        { id: 'p2', createdAt: '2024-02-01T00:00:00Z' },
      ],
    });
    const sorted = proj.sortedProjects.call(ctx);
    expect(sorted[0].id).toBe('p3');
    expect(sorted[1].id).toBe('p2');
    expect(sorted[2].id).toBe('p1');
  });

  it('does not mutate the original array', () => {
    const projects = [
      { id: 'p1', createdAt: '2024-01-01T00:00:00Z' },
      { id: 'p2', createdAt: '2024-02-01T00:00:00Z' },
    ];
    const ctx = makeContext({ projects });
    proj.sortedProjects.call(ctx);
    expect(ctx.projects[0].id).toBe('p1');
  });

  it('returns empty array when no projects', () => {
    const ctx = makeContext({ projects: [] });
    expect(proj.sortedProjects.call(ctx)).toEqual([]);
  });
});

// --- loadProjects ---

describe('loadProjects', () => {
  it('fetches and sets projects', async () => {
    const projectsList = [
      { id: 'p1', name: 'Project 1', createdAt: '2024-01-01' },
      { id: 'p2', name: 'Project 2', createdAt: '2024-02-01' },
    ];
    mockFetchOk(projectsList);
    const ctx = makeContext();
    await proj.loadProjects.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects?profileId=p1');
    expect(ctx.projects).toEqual(projectsList);
  });

  it('fetches without profileId when no current profile', async () => {
    mockFetchOk([]);
    const ctx = makeContext({ currentProfile: null });
    await proj.loadProjects.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects');
  });

  it('restores lastProjectId from localStorage', async () => {
    const projectsList = [{ id: 'p1', name: 'Project 1' }];
    mockFetchOk(projectsList);
    localStorageMock['sf-lastProjectId'] = 'p1';

    // Mock for the selectProject call that will follow
    mockFetchOk({
      id: 'p1',
      sources: [],
      results: { generations: [] },
      chat: { messages: [] },
    });

    const ctx = makeContext();
    await proj.loadProjects.call(ctx);
    expect(ctx.currentProjectId).toBe('p1');
  });

  it('does not restore if lastProjectId not in projects list', async () => {
    mockFetchOk([{ id: 'p1', name: 'Project 1' }]);
    localStorageMock['sf-lastProjectId'] = 'p-unknown';
    const ctx = makeContext();
    await proj.loadProjects.call(ctx);
    expect(ctx.currentProjectId).toBeNull();
  });

  // T3 — Régression-lock : la migration legacy 'sf-lastProjectId' est idempotente.
  // Si la map namespacée existe déjà avec une entrée pour le profil courant, la
  // legacy key est juste effacée (pas d'override). Si la legacy reste sur disque
  // entre 2 boots (ne devrait pas arriver, mais robustesse), pas de resurrection.
  it('migration sf-lastProjectId : idempotente quand la map namespacée a déjà une entrée pour le profil', async () => {
    mockFetchOk([{ id: 'p-current', name: 'Project current' }]);
    // La map namespacée existe déjà : profil p1 → p-current
    localStorageMock['sf-profile-last-project'] = JSON.stringify({ p1: 'p-current' });
    // Une legacy key résiduelle pointe vers un autre projet
    localStorageMock['sf-lastProjectId'] = 'p-legacy';

    // Mock pour le selectProject('p-current') qui suivra
    mockFetchOk({ id: 'p-current', sources: [], results: { generations: [] } });

    const ctx = makeContext();
    await proj.loadProjects.call(ctx);

    // La legacy key a été effacée même si elle n'a pas écrasé la map
    expect(localStorage.removeItem).toHaveBeenCalledWith('sf-lastProjectId');
    // La map namespacée n'a PAS été écrasée par la legacy
    const map = JSON.parse(localStorageMock['sf-profile-last-project']);
    expect(map.p1).toBe('p-current');
    // Le projet courant restauré est bien celui de la map (pas de la legacy)
    expect(ctx.currentProjectId).toBe('p-current');
  });

  it('migration sf-lastProjectId : appel répété est no-op (legacy key déjà supprimée)', async () => {
    // Reset l'historique des calls localStorage hérité des tests précédents
    // (le mock global n'est pas reset entre tests, seul localStorageMock l'est).
    vi.mocked(localStorage.removeItem).mockClear();
    mockFetchOk([{ id: 'p1', name: 'Project 1' }]);
    // Premier load : pas de legacy key, map vide → migration no-op
    expect(localStorageMock['sf-lastProjectId']).toBeUndefined();

    const ctx = makeContext();
    await proj.loadProjects.call(ctx);
    // Pas d'appel à removeItem('sf-lastProjectId') puisque la legacy n'existait pas
    expect(localStorage.removeItem).not.toHaveBeenCalledWith('sf-lastProjectId');
  });
});

// --- createProject ---

describe('createProject', () => {
  it('creates project, adds to array, selects it', async () => {
    const meta = { id: 'p-new', name: 'My project', createdAt: '2024-06-01' };
    mockFetchOk(meta);
    // Mock for selectProject call
    mockFetchOk({
      id: 'p-new',
      sources: [],
      results: { generations: [] },
      chat: { messages: [] },
    });

    const ctx = makeContext({ newProjectName: '  My project  ' });
    await proj.createProject.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/projects',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'My project', profileId: 'p1' }),
      }),
    );
    expect(ctx.projects).toContainEqual(meta);
    expect(ctx.newProjectName).toBe('');
    expect(ctx.showNewProject).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.courseCreated', 'success');
  });

  it('returns early if name is empty', async () => {
    const ctx = makeContext({ newProjectName: '   ' });
    await proj.createProject.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('shows error toast on network failure', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network'));
    const ctx = makeContext({ newProjectName: 'Test' });
    await proj.createProject.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.courseCreateError',
      'error',
      expect.any(Function),
    );
  });
});

// --- selectProject ---

describe('selectProject', () => {
  it('re-touching the open project resets nothing (an Auto analysis or an import keeps running)', async () => {
    const ctx = makeContext({
      currentProjectId: 'p1',
      currentProject: { meta: { id: 'p1', name: 'Histoire' } },
      sources: [{ id: 's1' }],
      activeView: 'quiz',
      loading: { auto: true },
    });
    await proj.selectProject.call(ctx, 'p1');
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(ctx.resetSession).not.toHaveBeenCalled();
    expect(ctx.sources).toEqual([{ id: 's1' }]); // resetState l'aurait vidé
    expect(ctx.loading).toEqual({ auto: true });
    expect(ctx.activeView).toBe('dashboard');
  });

  it('fetches project, sets sources/generations/chat, opens latest-by-type gens', async () => {
    const projectData = {
      id: 'p1',
      sources: [{ id: 's1' }, { id: 's2' }],
      results: {
        generations: [
          { id: 'g1', type: 'quiz', createdAt: '2024-01-01' },
          { id: 'g2', type: 'quiz', createdAt: '2024-02-01' },
          { id: 'g3', type: 'summary', createdAt: '2024-01-15' },
        ],
      },
      chat: { messages: [{ role: 'user', content: 'hello' }] },
    };
    mockFetchOk(projectData);
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.currentProjectId).toBe('p1');
    expect(ctx.sources).toEqual([{ id: 's1' }, { id: 's2' }]);
    expect(ctx.selectedIds).toEqual(['s1', 's2']);
    expect(ctx.generations).toHaveLength(3);
    expect(ctx.chatMessages).toEqual([{ role: 'user', content: 'hello' }]);
    // Latest quiz is g2, latest summary is g3
    expect(ctx.openGens['g2']).toBe(true);
    expect(ctx.openGens['g3']).toBe(true);
    expect(ctx.activeView).toBe('dashboard');
    // Namespacé par profil : la map `sf-profile-last-project` reçoit { 'p1': 'p1' }
    // (où le 1er 'p1' est le profileId mock et le 2nd 'p1' est le projectId).
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'sf-profile-last-project',
      expect.stringContaining('"p1":"p1"'),
    );
  });

  // Auto lancé sur ce cours avant d'en changer, encore en analyse : puce « Auto — analyse… »
  // rétablie et annulable ; sans elle, le bouton Auto redevenait cliquable (second Auto).
  // Lot Auto du serveur (rechargement, autre onglet, retour sur le cours) : suivi depuis le snapshot,
  // puce d'analyse rétablie pendant l'analyse ; plus de puce une fois les étapes lancées (leurs puces
  // viennent du tracker).
  const RUN = { id: 'r1', status: 'analysing', steps: [], skipped: [], request: {} };
  it('cours dont le lot Auto analyse encore : lot suivi, puce d’analyse rétablie', async () => {
    mockFetchOk({
      id: 'p1',
      meta: { id: 'p1', name: 'Histoire' },
      sources: [{ id: 's1' }],
      results: { generations: [], autoRuns: [RUN] },
    });
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.loading.auto).toBe(true);
    expect(ctx.autoRuns.p1).toMatchObject({ runId: 'r1', launchedHere: false });
    // Relu pendant l'analyse : pas encore facturée, son coût sera ajouté à son arrivée.
    expect(ctx.autoRuns.p1.analysisCostCounted).toBe(false);
  });

  it('cours dont le lot Auto envoie ses étapes : lot suivi, pas de puce d’analyse', async () => {
    mockFetchOk({
      id: 'p1',
      meta: { id: 'p1', name: 'Histoire' },
      sources: [{ id: 's1' }],
      results: { generations: [], autoRuns: [{ ...RUN, id: 'r2', status: 'running' }] },
    });
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.loading.auto).toBe(false);
    expect(ctx.autoRuns.p1.runId).toBe('r2');
  });

  // Génération simple partie avant de changer de cours : au retour, sa puce (relue du serveur) doit
  // aborter son fetch, sinon la réponse 409 `cancelled` s'afficherait en erreur.
  it('retour sur un cours : ses générations simples en vol redeviennent annulables', async () => {
    mockFetchOk({ id: 'p1', sources: [{ id: 's1' }], results: { generations: [] } });
    const mine = new AbortController();
    const other = new AbortController();
    const ctx = makeContext({
      abortControllersByGid: {},
      singleRuns: {
        g1: { projectId: 'p1', controller: mine },
        g2: { projectId: 'p2', controller: other },
      },
    });
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.abortControllersByGid).toEqual({ g1: mine });
  });

  // Tour assistant vide enregistré avant le correctif serveur : repli lisible dès l'ouverture du
  // projet (l'historique vient du snapshot du projet). Un tour vide qui a
  // lancé une génération garde son badge seul.
  it('historique avec un tour assistant vide : bulle chat.emptyReply à l’ouverture', async () => {
    mockFetchOk({
      id: 'p1',
      sources: [],
      results: { generations: [] },
      chat: {
        messages: [
          { role: 'user', content: 'hello' },
          { role: 'assistant', content: '' },
          { role: 'assistant', content: '', generatedIds: ['g1'] },
        ],
      },
    });
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.chatMessages.map((m: any) => m.content)).toEqual(['hello', 'chat.emptyReply', '']);
  });

  // Le profil courant accompagne l'ouverture : le serveur y rattache un projet orphelin.
  it('envoie le profil courant qui ouvre le projet (profileId encodé)', async () => {
    mockFetchOk({ id: 'p1', sources: [], results: { generations: [] } });
    const ctx = makeContext({ currentProfile: { id: 'profil 1&x', ageGroup: 'enfant' } });
    await proj.selectProject.call(ctx, 'p1');
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/p1?profileId=profil%201%26x', {
      signal: expect.any(AbortSignal),
    });
  });

  it('sans profil courant : ouverture sans profileId', async () => {
    mockFetchOk({ id: 'p1', sources: [], results: { generations: [] } });
    const ctx = makeContext({ currentProfile: null });
    await proj.selectProject.call(ctx, 'p1');
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/p1', {
      signal: expect.any(AbortSignal),
    });
  });

  it('sets activeView to sources when no sources', async () => {
    mockFetchOk({ id: 'p1', sources: [], results: { generations: [] } });
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.activeView).toBe('sources');
  });

  it('reset currentProjectId + toast actionnable sur fetch !ok (UI dead-state)', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockFetchFail(404);
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.currentProjectId).toBeNull();
    expect(ctx.sources).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.projectLoadError',
      'error',
      expect.any(Function),
    );
    // Chargement terminé : la liste des cours revient, sans indicateur resté affiché.
    expect(ctx.projectLoading).toBe(false);
    expect(ctx.projectLoadController).toBeNull();
    warnSpy.mockRestore();
  });

  // Mesuré au release-test du 2026-10-21 : pendant qu'un Auto occupait les connexions, le snapshot
  // du cours choisi arrivait 10 à 15 s après le clic ; l'écran montrait l'en-tête de l'AUTRE cours
  // et « Ajoute tes premières sources » avec 0 source (un enfant pouvait croire ses sources perdues).
  describe('ouverture d’un cours : le cours choisi et un chargement, dès le clic', () => {
    const projects = [
      { id: 'p0', name: 'Ancien cours' },
      { id: 'p1', name: 'Histoire' },
      { id: 'p2', name: 'Sciences' },
    ];
    const snapshotOf = (id: string, name: string) => ({
      meta: { id, name },
      sources: [{ id: 's-' + id }],
      results: { generations: [] },
    });
    // Réponse retenue jusqu'à `release`, ou rejetée en AbortError quand son signal est aborté.
    const holdFetch = () => {
      let release!: (value: unknown) => void;
      let signal: AbortSignal | undefined;
      vi.mocked(globalThis.fetch).mockImplementationOnce((_url, init) => {
        signal = init?.signal ?? undefined;
        return new Promise((resolve, reject) => {
          release = resolve;
          signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          );
        }) as any;
      });
      return {
        respond: (data: unknown) => release({ ok: true, json: async () => data }),
        aborted: () => signal?.aborted === true,
      };
    };
    const openCourse = () =>
      makeContext({
        projects,
        currentProjectId: 'p0',
        currentProject: snapshotOf('p0', 'Ancien cours'),
        sources: [{ id: 's-p0' }],
      });

    it('pendant le chargement : rien de l’ancien cours, nom du cours choisi, puis son snapshot', async () => {
      const held = holdFetch();
      const ctx = openCourse();

      const opening = proj.selectProject.call(ctx, 'p1');

      expect(ctx.currentProjectId).toBe('p1');
      expect(ctx.currentProject).toBeNull();
      expect(ctx.sources).toEqual([]);
      expect(ctx.projectLoading).toBe(true);
      expect(proj.currentProjectName.call(ctx)).toBe('Histoire');

      held.respond(snapshotOf('p1', 'Histoire'));
      await opening;

      expect(ctx.projectLoading).toBe(false);
      expect(ctx.projectLoadController).toBeNull();
      expect(ctx.currentProject?.meta.name).toBe('Histoire');
      expect(ctx.sources).toEqual([{ id: 's-p1' }]);
      expect(proj.currentProjectName.call(ctx)).toBe('Histoire');
    });

    it('panne réseau pendant le chargement : chargement terminé, liste des cours et toast', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'));
      const ctx = openCourse();

      await proj.selectProject.call(ctx, 'p1');

      expect(ctx.projectLoading).toBe(false);
      expect(ctx.currentProjectId).toBeNull();
      expect(ctx.currentProject).toBeNull();
      expect(proj.currentProjectName.call(ctx)).toBe('');
      expect(ctx.showToast).toHaveBeenCalledWith(
        'toast.projectLoadError',
        'error',
        expect.any(Function),
      );
      warnSpy.mockRestore();
    });

    // resetSession (vrai) abandonne l'ouverture précédente : sa requête est abortée et quitte la
    // file du navigateur, sans toast d'erreur.
    it('autre cours choisi pendant le chargement : requête précédente abortée, sans toast', async () => {
      const session = createSession();
      const first = holdFetch();
      const second = holdFetch();
      const ctx = openCourse();
      Object.assign(ctx, {
        abortControllersByGid: {},
        resetSession: session.resetSession,
      });

      const openingFirst = proj.selectProject.call(ctx, 'p1');
      const openingSecond = proj.selectProject.call(ctx, 'p2');
      await openingFirst;

      expect(first.aborted()).toBe(true);
      expect(ctx.showToast).not.toHaveBeenCalled();
      expect(ctx.currentProjectId).toBe('p2');
      expect(ctx.projectLoading).toBe(true);
      expect(proj.currentProjectName.call(ctx)).toBe('Sciences');

      second.respond(snapshotOf('p2', 'Sciences'));
      await openingSecond;
      expect(ctx.projectLoading).toBe(false);
      expect(ctx.sources).toEqual([{ id: 's-p2' }]);
    });

    // Réponse déjà en route quand l'autre cours est choisi : ignorée, rien de ce cours ne s'affiche
    // pendant le chargement du suivant (ni sources, ni flux SSE, ni fin du chargement).
    it('réponse tardive d’une ouverture supplantée : ignorée', async () => {
      const first = holdFetch();
      const second = holdFetch();
      const startPendingsStream = vi.fn(async () => {});
      const ctx = makeContext({ projects, startPendingsStream });

      const openingFirst = proj.selectProject.call(ctx, 'p1');
      const openingSecond = proj.selectProject.call(ctx, 'p2');
      first.respond(snapshotOf('p1', 'Histoire'));
      await openingFirst;

      expect(ctx.currentProjectId).toBe('p2');
      expect(ctx.currentProject).toBeNull();
      expect(ctx.sources).toEqual([]);
      expect(ctx.projectLoading).toBe(true);
      expect(startPendingsStream).not.toHaveBeenCalled();

      second.respond(snapshotOf('p2', 'Sciences'));
      await openingSecond;
      expect(ctx.sources).toEqual([{ id: 's-p2' }]);
      expect(startPendingsStream).toHaveBeenCalledTimes(1);
      expect(startPendingsStream).toHaveBeenCalledWith('p2');
    });

    it('cours re-touché pendant son chargement : ni remise à zéro ni seconde requête', async () => {
      const held = holdFetch();
      const ctx = openCourse();

      const opening = proj.selectProject.call(ctx, 'p1');
      await proj.selectProject.call(ctx, 'p1');

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(ctx.resetSession).toHaveBeenCalledTimes(1);
      expect(ctx.projectLoading).toBe(true);

      held.respond(snapshotOf('p1', 'Histoire'));
      await opening;
      expect(ctx.sources).toEqual([{ id: 's-p1' }]);
    });

    // Mesuré le 2026-10-21 : deux Auto occupaient toutes les connexions du navigateur et le GET du
    // cours attendait derrière leurs étapes. Les requêtes longues (générations) sont limitées à 3 et
    // font la queue entre elles (request-slots.ts) ; l'ouverture d'un cours n'y passe jamais.
    it('les 3 places des requêtes longues prises, d’autres en file : le GET du cours part tout de suite', async () => {
      const releases: Array<() => void> = [];
      const generations = Array.from({ length: MAX_LONG_REQUESTS + 2 }, () =>
        withLongRequestSlot(() => new Promise<void>((resolve) => releases.push(resolve))),
      );
      expect(longRequestSlots()).toEqual({ inFlight: MAX_LONG_REQUESTS, waiting: 2 });
      const held = holdFetch();
      const ctx = openCourse();

      const opening = proj.selectProject.call(ctx, 'p1');

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(vi.mocked(globalThis.fetch).mock.calls[0][0]).toBe('/api/projects/p1?profileId=p1');
      expect(longRequestSlots()).toEqual({ inFlight: MAX_LONG_REQUESTS, waiting: 2 });
      held.respond(snapshotOf('p1', 'Histoire'));
      await opening;
      expect(ctx.sources).toEqual([{ id: 's-p1' }]);

      // Places rendues une à une : les générations en file partent à leur tour, puis se terminent.
      for (let finished = 0; finished < generations.length; finished++) {
        await vi.waitFor(() => expect(releases.length).toBeGreaterThan(0));
        releases.shift()!();
      }
      await Promise.all(generations);
      expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 });
    });
  });

  // Message envoyé au tuteur, puis changement de cours avant sa réponse : au retour, l'indicateur
  // et le champ inactif sont rétablis tant que la requête de CE cours est en vol (chat-in-flight.ts).
  it('retour sur un cours dont un message attend la réponse du tuteur : chatLoading rétabli', async () => {
    mockFetchOk({ id: 'p1', sources: [], results: { generations: [] } });
    const ctx = makeContext({ chatInFlight: { p1: true } });
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.chatLoading).toBe(true);
  });

  it('retour sur un cours sans message en attente (seul un autre cours attend) : chatLoading false', async () => {
    mockFetchOk({ id: 'p1', sources: [], results: { generations: [] } });
    const ctx = makeContext({ chatInFlight: { p2: true } });
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.chatLoading).toBe(false);
  });

  // Reprise à l'ouverture : profil modéré et source en attente, en erreur ou jamais vérifiée →
  // POST /sources/moderate en arrière-plan (l'ouverture n'attend pas), statuts fusionnés au retour.
  describe('reprise des modérations à l’ouverture', () => {
    const moderated = { id: 'p1', ageGroup: 'enfant', useModeration: true };
    const urls = () => vi.mocked(globalThis.fetch).mock.calls.map((c) => String(c[0]));
    const projectWith = (sources: any[]) => ({ id: 'p1', sources, results: { generations: [] } });
    const safe = { status: 'safe', categories: {} };

    it('source jamais vérifiée : vérification en arrière-plan, puis fusion', async () => {
      mockFetchOk(projectWith([{ id: 's1' }, { id: 's2', moderation: safe }]));
      let release!: (value: unknown) => void;
      vi.mocked(globalThis.fetch).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            release = resolve;
          }) as any,
      );
      const ctx = makeContext({ currentProfile: moderated });

      await proj.selectProject.call(ctx, 'p1');

      // Ouverture terminée pendant que la vérification est encore en cours.
      expect(ctx.sources).toHaveLength(2);
      expect(urls()).toEqual([
        '/api/projects/p1?profileId=p1',
        '/api/projects/p1/sources/moderate',
      ]);
      const init = vi.mocked(globalThis.fetch).mock.calls[1][1] as RequestInit;
      expect(init.method).toBe('POST');
      expect(JSON.parse(init.body as string)).toEqual({});
      release({ ok: true, json: async () => ({ sources: [{ id: 's1', moderation: safe }] }) });
      await vi.waitFor(() => expect((ctx.sources[0] as any).moderation?.status).toBe('safe'));
    });

    it.each(['pending', 'error'])('source %s : vérifiée à l’ouverture', async (status) => {
      mockFetchOk(projectWith([{ id: 's1', moderation: { status, categories: {} } }]));
      mockFetchOk({ sources: [] });
      const ctx = makeContext({ currentProfile: moderated });

      await proj.selectProject.call(ctx, 'p1');

      expect(urls()).toContain('/api/projects/p1/sources/moderate');
    });

    it('profil non modéré : aucune vérification', async () => {
      mockFetchOk(projectWith([{ id: 's1' }]));
      const ctx = makeContext();

      await proj.selectProject.call(ctx, 'p1');

      expect(urls()).toEqual(['/api/projects/p1?profileId=p1']);
    });

    it('sources toutes vérifiées (safe, unsafe) : aucune vérification', async () => {
      mockFetchOk(
        projectWith([
          { id: 's1', moderation: safe },
          { id: 's2', moderation: { status: 'unsafe', categories: {} } },
        ]),
      );
      const ctx = makeContext({ currentProfile: moderated });

      await proj.selectProject.call(ctx, 'p1');

      expect(urls()).toEqual(['/api/projects/p1?profileId=p1']);
    });
  });

  it('logs fetch exceptions et reset currentProjectId pour eviter le freeze UI', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('offline'));
    const ctx = makeContext();

    await proj.selectProject.call(ctx, 'p1');

    expect(warnSpy).toHaveBeenCalledWith('[selectProject] failed', expect.any(Error));
    expect(ctx.currentProjectId).toBeNull();
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.projectLoadError',
      'error',
      expect.any(Function),
    );
    warnSpy.mockRestore();
  });
});

// --- deleteProject ---

describe('deleteProject', () => {
  it('deletes and removes from array', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    const ctx = makeContext({
      currentProjectId: 'p2',
      projects: [{ id: 'p1' }, { id: 'p2' }],
    });
    await proj.deleteProject.call(ctx, 'p1');
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/p1', { method: 'DELETE' });
    expect(ctx.projects).toHaveLength(1);
    expect(ctx.projects[0].id).toBe('p2');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.projectDeleted', 'info');
    // Did not reset since we deleted a different project
    expect(ctx.currentProjectId).toBe('p2');
  });

  it('drops the upload sessions of the deleted project (its import stops), keeps the others', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    const ctx = makeContext({
      currentProjectId: 'p2',
      projects: [{ id: 'p1' }, { id: 'p2' }],
      uploadSessions: [
        { id: 's1', projectId: 'p1', cleanupScheduled: false, files: [] },
        { id: 's2', projectId: 'p2', cleanupScheduled: false, files: [] },
      ],
    });
    await proj.deleteProject.call(ctx, 'p1');
    expect(ctx.uploadSessions.map((s: { id: string }) => s.id)).toEqual(['s2']);
  });

  // resetSession épargne un Auto en cours : la suppression de son cours l'arrête explicitement.
  it('oublie le lot Auto du cours supprimé (le serveur l’arrête avec le cours), garde les autres', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    const entry = { runId: 'r', run: null, launchedHere: true } as any;
    const ctx = makeContext({
      currentProjectId: 'p1',
      projects: [{ id: 'p1' }, { id: 'p2' }],
      autoRuns: { p1: entry, p2: entry },
    });
    await proj.deleteProject.call(ctx, 'p1');
    expect(Object.keys(ctx.autoRuns)).toEqual(['p2']);
  });

  it('aborts the single generations in flight for the deleted project, keeps the others', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    const deleted = new AbortController();
    const other = new AbortController();
    const ctx = makeContext({
      currentProjectId: 'p1',
      projects: [{ id: 'p1' }, { id: 'p2' }],
      singleRuns: {
        g1: { projectId: 'p1', controller: deleted },
        g2: { projectId: 'p2', controller: other },
      },
    });
    await proj.deleteProject.call(ctx, 'p1');
    expect(deleted.signal.aborted).toBe(true);
    expect(other.signal.aborted).toBe(false);
    expect(Object.keys(ctx.singleRuns)).toEqual(['g2']);
  });

  it('resets state if current project deleted', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    // Pre-condition : la map namespacée a une entrée pour le profil courant
    localStorageMock['sf-profile-last-project'] = JSON.stringify({ p1: 'p1' });
    const ctx = makeContext({
      currentProjectId: 'p1',
      projects: [{ id: 'p1' }],
    });
    await proj.deleteProject.call(ctx, 'p1');
    expect(ctx.currentProjectId).toBeNull();
    expect(ctx.currentProject).toBeNull();
    // Le projet est retiré de la map namespacée du profil courant
    const map = JSON.parse(localStorageMock['sf-profile-last-project'] ?? '{}');
    expect(map.p1).toBeUndefined();
    expect(ctx.sources).toEqual([]);
    expect(ctx.generations).toEqual([]);
  });

  it('rollback + toast erreur si fetch DELETE throw (network down)', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('ECONNREFUSED'));
    const ctx = makeContext({ projects: [{ id: 'p1' }, { id: 'p2' }] });

    await proj.deleteProject.call(ctx, 'p1');

    // Pas de mutation : projects intact + toast erreur affiché
    expect(ctx.projects).toHaveLength(2);
    expect(errorSpy).toHaveBeenCalledWith('[deleteProject] network failure', expect.any(Error));
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.projectDeleteError',
      'error',
      expect.any(Function),
    );
    errorSpy.mockRestore();
  });

  it('rollback + toast erreur si fetch DELETE renvoie non-ok (5xx)', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: false, status: 500 } as any);
    const ctx = makeContext({ projects: [{ id: 'p1' }] });

    await proj.deleteProject.call(ctx, 'p1');

    expect(ctx.projects).toHaveLength(1);
    expect(errorSpy).toHaveBeenCalledWith(
      '[deleteProject] non-ok',
      expect.objectContaining({ id: 'p1', status: 500 }),
    );
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.projectDeleteError',
      'error',
      expect.any(Function),
    );
    errorSpy.mockRestore();
  });
});

describe('openLightbox', () => {
  it('set lightboxUrl et appelle showModal sur la dialog ref', () => {
    const showModal = vi.fn();
    const ctx = makeContext({
      $refs: { imageLightbox: { showModal } },
      lightboxUrl: '',
      openLightbox: proj.openLightbox,
    });

    ctx.openLightbox.call(ctx, '/image/foo.png');

    expect(ctx.lightboxUrl).toBe('/image/foo.png');
    expect(showModal).toHaveBeenCalledOnce();
  });
});

// --- resetState ---

describe('resetState', () => {
  it('clears all state', () => {
    const ctx = makeContext({
      sources: [{ id: 's1' }],
      selectedIds: ['s1'],
      generations: [{ id: 'g1' }],
      openGens: { g1: true },
      editingTitle: 'title',
      activeView: 'quiz',
      showTextInput: true,
      showWebInput: true,
      consigne: { text: 'test' },
      chatMessages: [{ role: 'user', content: 'hi' }],
      chatInput: 'typing...',
      textInput: 'texte déjà envoyé',
      webQuery: 'les volcans',
    });
    proj.resetState.call(ctx);
    expect(ctx.sources).toEqual([]);
    expect(ctx.selectedIds).toEqual([]);
    expect(ctx.generations).toEqual([]);
    expect(ctx.openGens).toEqual({});
    expect(ctx.editingTitle).toBeNull();
    expect(ctx.activeView).toBe('dashboard');
    expect(ctx.showTextInput).toBe(false);
    expect(ctx.showWebInput).toBe(false);
    expect(ctx.consigne).toBeNull();
    expect(ctx.chatMessages).toEqual([]);
    expect(ctx.chatInput).toBe('');
    expect(ctx.uploadSessions).toEqual([]);
    // Saisies du cours quitté : elles réapparaissaient dans le cours suivant.
    expect(ctx.textInput).toBe('');
    expect(ctx.webQuery).toBe('');
  });

  it('keeps uploadSessions: an import continues in the background after a project change', () => {
    const sessions = [{ id: 'sess1', projectId: 'p1', cleanupScheduled: false, files: [] }];
    const ctx = makeContext({ uploadSessions: sessions });
    proj.resetState.call(ctx);
    expect(ctx.uploadSessions).toEqual(sessions);
  });
});
