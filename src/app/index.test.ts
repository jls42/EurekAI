import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock localStorage and matchMedia for state.ts
const mockStorage: Record<string, string> = {};
vi.stubGlobal(
  'localStorage',
  Object.assign(Object.create(null), {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
  }),
);
vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

// Mock modules that access browser APIs or heavy dependencies at import time
vi.mock('../i18n/index', () => ({
  t: vi.fn((k: string) => k),
  setLocale: vi.fn(),
  getLocale: vi.fn(() => 'fr'),
}));

vi.mock('./profile-locale', () => ({
  setProfileLocale: vi.fn(),
  getProfileLocale: vi.fn(() => 'fr'),
  clearProfileLocale: vi.fn(),
}));

vi.mock('./render-utils', () => ({
  escapeHtmlAttribute: vi.fn((s: string) => s),
  escapeMarkdownHtml: vi.fn((s: string) => s),
  sanitizeRenderedHtml: vi.fn((s: string) => s),
}));

vi.mock('marked', () => ({
  marked: { parse: vi.fn((s: string) => s) },
}));

vi.mock('lucide', () => ({
  createIcons: vi.fn(),
  icons: {},
}));

import { readFileSync } from 'node:fs';
import { app } from './index.js';
import { createState } from './state';
import { createI18n } from './i18n';
import { createHelpers } from './helpers';
import { createNavigation } from './navigation';
import { createToast } from './toast';
import { createSession } from './session';
import { createPendingsStream } from './sse-pendings';
import { createConfirm } from './confirm';
import { createProfiles } from './profiles';
import { createProjects } from './projects';
import { createConfig } from './config';
import { createSources } from './sources';
import { createRecorder } from './recorder';
import { createWebsearch } from './websearch';
import { createConsigne } from './consigne';
import { createGenerate } from './generate';
import { createGenerations } from './generations';
import { createChat } from './chat';
import { createRender } from './render';

describe('app', () => {
  beforeEach(() => {
    for (const key of Object.keys(mockStorage)) delete mockStorage[key];
  });

  it('returns an object', () => {
    const a = app();
    expect(typeof a).toBe('object');
    expect(a).not.toBeNull();
  });

  it('has the init method', () => {
    const a = app();
    expect(typeof a.init).toBe('function');
  });

  it('includes state properties from createState', () => {
    const a = app();
    expect(a.profiles).toEqual([]);
    expect(a.currentProfile).toBeNull();
    expect(a.projects).toEqual([]);
    expect(a.sources).toEqual([]);
    expect(a.activeView).toBe('dashboard');
    expect(Array.isArray(a.categories)).toBe(true);
  });

  it('includes i18n methods from createI18n', () => {
    const a = app();
    expect(typeof a.t).toBe('function');
    expect(typeof a.setLocale).toBe('function');
  });

  it('includes helper methods from createHelpers', () => {
    const a = app();
    expect(typeof a.genIcon).toBe('function');
    expect(typeof a.genColor).toBe('function');
    expect(typeof a.apiBase).toBe('function');
    expect(typeof a.initGenProps).toBe('function');
    expect(typeof a.refreshIcons).toBe('function');
    expect(typeof a.resolveError).toBe('function');
  });

  it('includes navigation methods from createNavigation', () => {
    const a = app();
    expect(typeof a.goToView).toBe('function');
    expect(typeof a.checkMobile).toBe('function');
    expect(typeof a.toggleTheme).toBe('function');
  });

  it('includes toast methods from createToast', () => {
    const a = app();
    expect(typeof a.showToast).toBe('function');
    expect(typeof a.dismissToast).toBe('function');
  });

  it('includes confirm methods from createConfirm', () => {
    const a = app();
    expect(typeof a.confirmDelete).toBe('function');
  });

  it('includes profile methods from createProfiles', () => {
    const a = app();
    expect(typeof a.loadProfiles).toBe('function');
    expect(typeof a.selectProfile).toBe('function');
    expect(typeof a.createProfile).toBe('function');
    expect(typeof a.deleteProfile).toBe('function');
    expect(typeof a.updateProfile).toBe('function');
    expect(typeof a.startEditProfile).toBe('function');
    expect(typeof a.saveEditProfile).toBe('function');
    expect(typeof a.openProfilePicker).toBe('function');
    expect(typeof a.requirePin).toBe('function');
    expect(typeof a.submitPinVerify).toBe('function');
    expect(typeof a.closePinDialog).toBe('function');
  });

  it('includes project methods from createProjects', () => {
    const a = app();
    expect(typeof a.loadProjects).toBe('function');
    expect(typeof a.createProject).toBe('function');
    expect(typeof a.selectProject).toBe('function');
    expect(typeof a.deleteProject).toBe('function');
    expect(typeof a.resetState).toBe('function');
  });

  it('includes config methods from createConfig', () => {
    const a = app();
    expect(typeof a.loadConfig).toBe('function');
    expect(typeof a.saveSettings).toBe('function');
    expect(typeof a.resetSettings).toBe('function');
  });

  it('includes source methods from createSources', () => {
    const a = app();
    expect(typeof a.handleDrop).toBe('function');
    expect(typeof a.handleFiles).toBe('function');
    expect(typeof a.addText).toBe('function');
    expect(typeof a.deleteSource).toBe('function');
    expect(typeof a.retryFile).toBe('function');
    expect(typeof a.dismissFailedFile).toBe('function');
  });

  it('includes recorder methods from createRecorder', () => {
    const a = app();
    expect(typeof a.toggleRecording).toBe('function');
  });

  it('includes websearch methods from createWebsearch', () => {
    const a = app();
    expect(typeof a.searchWeb).toBe('function');
  });

  it('includes consigne methods from createConsigne', () => {
    const a = app();
    expect(typeof a.refreshConsigne).toBe('function');
  });

  it('includes generate methods from createGenerate', () => {
    const a = app();
    expect(typeof a.generate).toBe('function');
    expect(typeof a.generateAll).toBe('function');
    expect(typeof a.generateAuto).toBe('function');
    expect(typeof a.generateVoice).toBe('function');
  });

  it('includes generation CRUD methods from createGenerations', () => {
    const a = app();
    expect(typeof a.startEditTitle).toBe('function');
    expect(typeof a.saveTitle).toBe('function');
  });

  it('includes chat methods from createChat', () => {
    const a = app();
    expect(typeof a.sendChatMessage).toBe('function');
    expect(typeof a.clearChat).toBe('function');
  });

  it('includes render methods from createRender', () => {
    const a = app();
    expect(typeof a.renderMarkdown).toBe('function');
  });

  it('includes parental access methods from createProfiles', () => {
    const a = app();
    expect(typeof a.requireParentalAccess).toBe('function');
    expect(typeof a.requireProfilePin).toBe('function');
  });
});

describe('init', () => {
  let a: any;
  let windowListeners: Record<string, Function[]>;
  let documentListeners: Record<string, Function[]>;
  let origDocument: any;
  let origWindow: any;

  beforeEach(() => {
    vi.useFakeTimers();

    // Track event listeners
    windowListeners = {};
    documentListeners = {};

    // Stub window with addEventListener
    origWindow = globalThis.window;
    vi.stubGlobal('window', {
      addEventListener: vi.fn((event: string, handler: Function) => {
        windowListeners[event] ??= [];
        windowListeners[event].push(handler);
      }),
    });

    // Stub document with addEventListener and documentElement
    origDocument = globalThis.document;
    vi.stubGlobal('document', {
      documentElement: { dataset: {} },
      addEventListener: vi.fn((event: string, handler: Function) => {
        documentListeners[event] ??= [];
        documentListeners[event].push(handler);
      }),
    });

    a = app();
    // Mock methods that init() calls
    a.checkMobile = vi.fn();
    a.loadProfiles = vi.fn().mockResolvedValue(undefined);
    a.loadConfig = vi.fn().mockResolvedValue(undefined);
    a.refreshIcons = vi.fn();
    a.openSourceDialog = vi.fn();
    a.$nextTick = vi.fn((cb: () => void) => cb());
    a.$watch = vi.fn();
    a.theme = 'light';
    a.sources = [{ id: 'src-1', text: 'hello' }];
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.stubGlobal('document', origDocument);
    vi.stubGlobal('window', origWindow);
  });

  it('calls checkMobile, loadProfiles, loadConfig and refreshIcons', async () => {
    await a.init();
    expect(a.checkMobile).toHaveBeenCalled();
    expect(a.loadProfiles).toHaveBeenCalled();
    expect(a.loadConfig).toHaveBeenCalled();
    expect(a.refreshIcons).toHaveBeenCalled();
  });

  it('observe activeView : le son de la vue quittée est coupé (view-media.ts)', async () => {
    await a.init();
    expect(a.$watch).toHaveBeenCalledWith('activeView', expect.any(Function));
  });

  it('sets theme on document element dataset', async () => {
    await a.init();
    expect((document as any).documentElement.dataset.theme).toBe('light');
  });

  it('debounces resize to checkMobile', async () => {
    await a.init();
    expect(windowListeners['resize']).toBeDefined();
    const resizeHandler = windowListeners['resize'][0];

    // Call resize handler multiple times
    a.checkMobile.mockClear();
    resizeHandler();
    resizeHandler();
    resizeHandler();

    // Before debounce timeout, checkMobile not called again
    expect(a.checkMobile).not.toHaveBeenCalled();

    // After 150ms, should fire once
    vi.advanceTimersByTime(150);
    expect(a.checkMobile).toHaveBeenCalledTimes(1);
  });

  it('click handler opens source dialog for matching source', async () => {
    await a.init();
    expect(documentListeners['click']).toBeDefined();
    const clickHandler = documentListeners['click'][0];

    // Create a mock element that simulates a badge with data-source-id
    const mockBadge = { dataset: { sourceId: 'src-1' } };
    const mockTarget = {
      closest: vi.fn().mockReturnValue(mockBadge),
    };
    // Make target pass instanceof Element check by using Object.create(Element.prototype)
    // Instead, since init uses `target instanceof Element`, we create a real-like element
    // Actually in our stubbed env, Element may not exist, so init() will return early.
    // The check is: if (!(target instanceof Element)) return;
    // We need to provide a target that passes this check.
    // In Node without JSDOM, Element is not defined, so `instanceof Element` will throw.
    // Let's stub Element too.
    const MockElement = function () {} as any;
    vi.stubGlobal('Element', MockElement);
    Object.setPrototypeOf(mockTarget, MockElement.prototype);

    clickHandler({ target: mockTarget });
    expect(a.openSourceDialog).toHaveBeenCalledWith({ id: 'src-1', text: 'hello' });
  });

  it('click handler ignores non-element targets', async () => {
    await a.init();
    const clickHandler = documentListeners['click'][0];

    const MockElement = function () {} as any;
    vi.stubGlobal('Element', MockElement);

    // Non-element target (plain string, not instanceof Element)
    clickHandler({ target: 'not-an-element' });
    expect(a.openSourceDialog).not.toHaveBeenCalled();
  });

  it('click handler ignores when no source-id badge found', async () => {
    await a.init();
    const clickHandler = documentListeners['click'][0];

    const MockElement = function () {} as any;
    vi.stubGlobal('Element', MockElement);
    const mockTarget = { closest: vi.fn().mockReturnValue(null) };
    Object.setPrototypeOf(mockTarget, MockElement.prototype);

    clickHandler({ target: mockTarget });
    expect(a.openSourceDialog).not.toHaveBeenCalled();
  });

  it('click handler ignores when source not found in state', async () => {
    await a.init();
    const clickHandler = documentListeners['click'][0];

    const MockElement = function () {} as any;
    vi.stubGlobal('Element', MockElement);
    const mockBadge = { dataset: { sourceId: 'nonexistent-id' } };
    const mockTarget = { closest: vi.fn().mockReturnValue(mockBadge) };
    Object.setPrototypeOf(mockTarget, MockElement.prototype);

    clickHandler({ target: mockTarget });
    expect(a.openSourceDialog).not.toHaveBeenCalled();
  });
});

// Objet RÉELLEMENT donné à Alpine : le `...createState()` de app() fige les getters à leur valeur
// initiale. Un état calculé lu par un gabarit doit donc être une méthode ; vécu le 2026-10-21 :
// un getter `projectUploadSessions` valait `[]` en permanence (liste d'import jamais affichée),
// alors que les tests de createState() seul passaient.
describe('app() — état composé', () => {
  it("projectUploadSessions() suit le cours affiché sur l'objet composé", () => {
    const a = app();
    expect(typeof a.projectUploadSessions).toBe('function');
    a.uploadSessions = [
      { id: 's1', projectId: 'p1', cleanupScheduled: false, files: [] },
      { id: 's2', projectId: 'p2', cleanupScheduled: false, files: [] },
    ];
    a.currentProjectId = 'p1';
    expect(a.projectUploadSessions().map((s) => s.id)).toEqual(['s1']);
    a.currentProjectId = 'p2';
    expect(a.projectUploadSessions().map((s) => s.id)).toEqual(['s2']);
  });

  // `uploading` (getter de createState) valait false en permanence dans l'app réelle depuis #14 :
  // bloc « Générer » jamais masqué pendant un import, « Ajouter » (texte) jamais désactivé.
  it("isUploading() suit l'import du cours affiché sur l'objet composé", () => {
    const a = app();
    const file = {
      id: 'f1',
      name: 'a.pdf',
      file: null,
      status: 'uploading' as const,
      errorMsg: null,
    };
    a.uploadSessions = [{ id: 's1', projectId: 'p1', cleanupScheduled: false, files: [file] }];
    a.currentProjectId = 'p1';
    expect(a.isUploading()).toBe(true);
    a.currentProjectId = 'p2';
    expect(a.isUploading()).toBe(false);
  });

  // Ouverture d'un cours : en-tête et chargement nomment le cours CHOISI (liste des cours) tant que
  // son snapshot n'est pas arrivé, puis le nom du snapshot.
  it('currentProjectName() suit le cours choisi sur l’objet composé, avant et après son snapshot', () => {
    const a = app();
    const meta = (id: string, name: string) => ({ id, name, createdAt: '', updatedAt: '' });
    a.projects = [meta('p1', 'Histoire'), meta('p2', 'Sciences')];
    expect(a.currentProjectName()).toBe('');
    a.currentProjectId = 'p2';
    expect(a.currentProjectName()).toBe('Sciences');
    a.currentProject = { meta: meta('p2', 'Sciences (renommé)'), sources: [] } as any;
    expect(a.currentProjectName()).toBe('Sciences (renommé)');
  });
});

// Ouverture d'un cours (selectProject) : currentProject reste nul jusqu'au snapshot. Le bloc de
// chargement vit donc HORS du bloc du cours (qui l'attend), et ce qui nomme le cours passe par
// currentProjectName(), connu dès le clic. Jusqu'au release-test du 2026-10-21, l'en-tête gardait
// le nom de l'AUTRE cours et le tableau de bord vide « Ajoute tes premières sources » s'affichait.
describe('gabarits — ouverture d’un cours', () => {
  const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf-8');

  it('chargement affiché hors du bloc du cours, avec le nom du cours choisi', () => {
    const index = read('../index.html');
    const loading = index.indexOf('x-show="currentProjectId && projectLoading"');
    const course = index.indexOf('<template x-if="currentProjectId && currentProject">');
    expect(loading).toBeGreaterThan(-1);
    expect(course).toBeGreaterThan(loading);
    const block = index.slice(loading, course);
    expect(block).toContain('x-text="currentProjectName()"');
    expect(block).toContain('x-text="t(\'common.loading\')"');
  });

  it.each(['../partials/header.html', '../partials/view-dashboard.html'])(
    '%s : nom du cours par currentProjectName(), jamais par le seul snapshot',
    (path) => {
      const html = read(path);
      expect(html).toContain('x-text="currentProjectName()"');
      expect(html).not.toContain('currentProject?.meta?.name');
    },
  );
});

// Aucune fabrique ne doit exposer d'accesseur : app() compose l'état par `...createX()`, et un
// spread copie la VALEUR d'un getter, pas le getter (vécu : `uploading` figé à false depuis #14,
// un getter `projectUploadSessions` figé à [] le 2026-10-21). Parcourir l'objet app() seul ne
// suffit pas : le spread y a déjà effacé le getter. Chaque fabrique est donc parcourue elle-même,
// et leur liste est relue dans index.ts (une fabrique ajoutée sans être listée ici fait échouer).
describe('app() — aucune fabrique n’expose d’accesseur (get/set)', () => {
  const factories: Record<string, () => object> = {
    createState,
    createI18n,
    createHelpers,
    createNavigation,
    createToast,
    createSession,
    createPendingsStream,
    createConfirm,
    createProfiles,
    createProjects,
    createConfig,
    createSources,
    createRecorder,
    createWebsearch,
    createConsigne,
    createGenerate,
    createGenerations,
    createChat,
    createRender,
  };

  const accessorsOf = (obj: object): string[] => {
    return Object.entries(Object.getOwnPropertyDescriptors(obj))
      .filter(([, descriptor]) => descriptor.get !== undefined || descriptor.set !== undefined)
      .map(([name]) => name);
  };

  it('la liste couvre toutes les fabriques composées par app() (index.ts)', () => {
    const source = readFileSync(new URL('./index.ts', import.meta.url), 'utf-8');
    const composed = [...source.matchAll(/\.\.\.(create\w+)\(\)/g)].map((m) => m[1]);
    const byName = (a: string, b: string) => a.localeCompare(b);
    expect(composed.length).toBeGreaterThan(0);
    expect([...composed].sort(byName)).toEqual(Object.keys(factories).sort(byName));
  });

  it.each(Object.keys(factories))('%s() : aucun accesseur', (name) => {
    expect(accessorsOf(factories[name]())).toEqual([]);
  });

  it('objet app() : aucun accesseur', () => {
    expect(accessorsOf(app())).toEqual([]);
  });

  // Le test attrape bien le cas qu'il doit signaler (getter d'une fabrique, effacé par le spread).
  it('détecte un getter de fabrique, invisible sur l’objet composé', () => {
    const factory = () => ({
      get busy() {
        return true;
      },
    });
    expect(accessorsOf(factory())).toEqual(['busy']);
    expect(accessorsOf({ ...factory() })).toEqual([]);
  });
});
