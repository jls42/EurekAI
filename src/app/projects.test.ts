import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createProjects } from './projects';

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
    uploadSessions: [] as any[],
    useConsigne: true,
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {},
    initGenProps: vi.fn(),
    resetState: proj.resetState,
    selectProject: proj.selectProject,
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
    expect(localStorage.setItem).toHaveBeenCalledWith('sf-lastProjectId', 'p1');
  });

  it('sets activeView to sources when no sources', async () => {
    mockFetchOk({ id: 'p1', sources: [], results: { generations: [] } });
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.activeView).toBe('sources');
  });

  it('handles fetch failure gracefully', async () => {
    mockFetchFail(404);
    const ctx = makeContext();
    await proj.selectProject.call(ctx, 'p1');
    expect(ctx.currentProjectId).toBe('p1');
    expect(ctx.sources).toEqual([]);
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

  it('resets state if current project deleted', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    const ctx = makeContext({
      currentProjectId: 'p1',
      projects: [{ id: 'p1' }],
    });
    await proj.deleteProject.call(ctx, 'p1');
    expect(ctx.currentProjectId).toBeNull();
    expect(ctx.currentProject).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith('sf-lastProjectId');
    expect(ctx.sources).toEqual([]);
    expect(ctx.generations).toEqual([]);
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
  });

  it('clears uploadSessions', () => {
    const ctx = makeContext({
      uploadSessions: [{ id: 'sess1', projectId: 'p1', cleanupScheduled: false, files: [] }],
    });
    proj.resetState.call(ctx);
    expect(ctx.uploadSessions).toEqual([]);
  });
});
