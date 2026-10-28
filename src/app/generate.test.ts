/* eslint-disable
   @typescript-eslint/no-confusing-void-expression,
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-non-null-assertion,
   @typescript-eslint/no-unsafe-argument,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/unbound-method
   --
   Codacy lance ESLint sans les types Vitest/mocks; lint:ci local reste type-aware. */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createGenerate, registerGeneration } from './generate';
import { setKey, _resetActiveKey } from './api-key';
import { createSession } from './session';
import { createConfirm } from './confirm';
import { _resetLongRequestSlots, longRequestSlots, withLongRequestSlot } from './request-slots';
import { restoreSingleRuns } from './single-runs';

vi.mock('../i18n/index', () => ({ getLocale: vi.fn(() => 'fr') }));
vi.mock('./helpers', () => ({ normalizeSummaryData: vi.fn() }));

globalThis.fetch = vi.fn();

// Provide document.querySelector for generateVoice's $nextTick callback
if (typeof globalThis.document === 'undefined') {
  (globalThis as any).document = { querySelector: vi.fn(() => null) };
}

const gen = createGenerate();

// Génération telle que la manipulent generateVoice et les helpers audio : GenerationUI (non
// exportée) = Generation + champs d'UI (_audioUrl_*, _generatingVoice_*, _playlistMode…). Les tests
// ne fournissent que les champs lus : conversion unique ici, sans copie (les assertions relisent
// les champs que la fonction pose sur CET objet).
type GenerationUI = Parameters<typeof gen.generateVoice>[0];
const asGenerationUI = <T extends object>(fields: T): T & GenerationUI => {
  return fields as unknown as T & GenerationUI;
};

const defaultLoading = {
  summary: false,
  flashcards: false,
  quiz: false,
  podcast: false,
  'quiz-vocal': false,
  image: false,
  'fill-blank': false,
  dictation: false,
  auto: false,
  all: false,
  voice: false,
  websearch: false,
};

const genBindings = {
  generate: gen.generate,
  generateAll: gen.generateAll,
  generateAuto: gen.generateAuto,
  generateVoice: gen.generateVoice,
  _audioSectionOrder: gen._audioSectionOrder,
  playSection: gen.playSection,
  initSummaryAudio: gen.initSummaryAudio,
  isBatchComplete: gen.isBatchComplete,
};

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    currentProject: { meta: { id: 'pid-1', name: 'Histoire' }, totalCost: 0 } as any,
    currentProfile: { id: 'p1', chatEnabled: true, ageGroup: 'enfant', useModeration: false },
    sources: [],
    generations: [],
    selectedIds: [],
    toasts: [],
    loading: { ...defaultLoading },
    abortControllers: {},
    abortControllersByGid: {},
    pendingById: {},
    launchingByType: {},
    autoRuns: {} as Record<string, any>,
    singleRuns: {} as Record<string, any>,
    shownToastEventKeys: new Set<string>(),
    notificationsVersion: 0,
    upsertGenerationById(gen: any) {
      const idx = this.generations.findIndex((g: any) => g.id === gen.id);
      if (idx === -1) this.generations.push(gen);
      else this.generations[idx] = gen;
      return idx === -1;
    },
    openGens: {},
    useConsigne: false,
    generateCount: 10,
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {},
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    goToView: vi.fn(),
    resolveError: vi.fn((e: string) => e),
    initGenProps: vi.fn(),
    locale: 'fr',
    blockedModerationSource: gen.blockedModerationSource,
    blockedModerationStatus: gen.blockedModerationStatus,
    moderationBlockedMessage: gen.moderationBlockedMessage,
    flaggedCategoryLabels: vi.fn(() => ''),
    configDraft: { models: { summary: 'mistral-large-latest' } },
    apiStatus: { mistral: true, ttsAvailable: true, voiceCacheReady: true, requireUserKey: false },
    ttsReady() {
      const ctx = this as { apiStatus?: { ttsAvailable?: boolean } };
      return Boolean(ctx.apiStatus?.ttsAvailable);
    },
    mistralReady() {
      const ctx = this as { apiStatus?: { mistral?: boolean } };
      return Boolean(ctx.apiStatus?.mistral);
    },
    ...genBindings,
    ...overrides,
  };
}

function mockFetchOk(data: any) {
  return vi.mocked(globalThis.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as any);
}

// Clé Mistral active (comme après selectProfile → refreshKeyState) ; remise à zéro après chaque test.
const activateKey = (plaintext: string) => {
  const data = new Map<string, string>();
  const storage = {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
  };
  return setKey({ scope: 'global', plaintext }, storage);
};

// Clé envoyée par le N-ième appel fetch (en-tête X-EurekAI-AI-Key), null sans en-tête.
const sentKey = (call: number): string | null => {
  const init = vi.mocked(globalThis.fetch).mock.calls[call][1] as RequestInit;
  return new Headers(init.headers).get('X-EurekAI-AI-Key');
};

afterEach(() => {
  _resetActiveKey();
  // Aucune place des requêtes longues ne fuit, quel que soit le scénario (succès, refus, erreur,
  // exception, annulation, changement de cours) : la file est partagée par tout l'onglet, une place
  // perdue ferait attendre toutes les générations suivantes. File neuve pour le test suivant.
  const left = longRequestSlots();
  _resetLongRequestSlots();
  expect(left).toEqual({ inFlight: 0, waiting: 0 });
});

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
});

// --- blockedModerationStatus ---

describe('blockedModerationStatus', () => {
  it('returns null when no sources are blocked', () => {
    const ctx = makeContext({
      sources: [
        { id: 's1', moderation: { status: 'safe' } },
        { id: 's2', moderation: { status: 'safe' } },
      ],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBeNull();
  });

  // Source jamais vérifiée (sans objet moderation) : en attente pour la garde, comme le serveur
  // (gateModerationStatus). canStartGenerate ne l'applique qu'à un profil modéré.
  it('returns "pending" when a source was never checked (no moderation field)', () => {
    const ctx = makeContext({
      sources: [{ id: 's1', moderation: { status: 'safe' } }, { id: 's2' }],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBe('pending');
  });

  it('returns "unsafe" when a source is unsafe', () => {
    const ctx = makeContext({
      sources: [
        { id: 's1', moderation: { status: 'safe' } },
        { id: 's2', moderation: { status: 'unsafe' } },
      ],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBe('unsafe');
  });

  it('returns "pending" when a source is pending', () => {
    const ctx = makeContext({
      sources: [{ id: 's1', moderation: { status: 'pending' } }],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBe('pending');
  });

  it('respects selectedIds filter', () => {
    const ctx = makeContext({
      sources: [
        { id: 's1', moderation: { status: 'safe' } },
        { id: 's2', moderation: { status: 'unsafe' } },
      ],
      selectedIds: ['s1'],
    });
    // Only s1 is selected, which is safe
    expect(gen.blockedModerationStatus.call(ctx)).toBeNull();
  });

  it('detects blocked source within selectedIds', () => {
    const ctx = makeContext({
      sources: [
        { id: 's1', moderation: { status: 'safe' } },
        { id: 's2', moderation: { status: 'unsafe' } },
      ],
      selectedIds: ['s2'],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBe('unsafe');
  });

  // Même priorité que le serveur (unsafe > error > pending), quel que soit l'ordre des sources :
  // « Modération en cours » ne doit pas masquer une source déjà signalée.
  it.each([
    [['pending', 'unsafe'], 'unsafe'],
    [['pending', 'error'], 'error'],
    [['error', 'unsafe'], 'unsafe'],
    [['safe', 'pending'], 'pending'],
  ])('sources %j → %s', (statuses, expected) => {
    const ctx = makeContext({
      sources: statuses.map((status, i) => ({ id: `s${i}`, moderation: { status } })),
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBe(expected);
  });

  // Statut EFFECTIF (MOD-1) : source persistée `safe` mais `criminal: true` (v1.5.4 → v1.7.1).
  describe('statut effectif (catégories bloquées du profil courant)', () => {
    const flagged = {
      id: 'f1',
      moderation: { status: 'safe', categories: { sexual: false, criminal: true } },
    };

    it('profil bloquant criminal : la source safe est bloquante, statut unsafe', () => {
      const ctx = makeContext({
        currentProfile: {
          id: 'p1',
          ageGroup: 'enfant',
          useModeration: true,
          moderationCategories: ['criminal'],
        },
        sources: [{ id: 's0', moderation: { status: 'safe', categories: {} } }, flagged],
      });
      expect(gen.blockedModerationSource.call(ctx)?.id).toBe('f1');
      expect(gen.blockedModerationStatus.call(ctx)).toBe('unsafe');
    });

    it("sans liste propre : défauts de l'âge chargés depuis l'API (moderationDefaults)", () => {
      const ctx = makeContext({
        currentProfile: { id: 'p1', ageGroup: 'ado', useModeration: true },
        moderationDefaults: { ado: ['criminal'] },
        sources: [flagged],
      });
      expect(gen.blockedModerationStatus.call(ctx)).toBe('unsafe');
    });

    it('profil ne bloquant pas criminal : rien ne bloque', () => {
      const ctx = makeContext({
        currentProfile: {
          id: 'p1',
          ageGroup: 'enfant',
          useModeration: true,
          moderationCategories: ['sexual'],
        },
        sources: [flagged],
      });
      expect(gen.blockedModerationSource.call(ctx)).toBeNull();
      expect(gen.blockedModerationStatus.call(ctx)).toBeNull();
    });

    it('priorité sur le statut effectif : la source promue passe devant un pending', () => {
      const ctx = makeContext({
        currentProfile: {
          id: 'p1',
          ageGroup: 'enfant',
          useModeration: true,
          moderationCategories: ['criminal'],
        },
        sources: [{ id: 'p0', moderation: { status: 'pending' } }, flagged],
      });
      expect(gen.blockedModerationStatus.call(ctx)).toBe('unsafe');
    });
  });

  it('sourceIds explicites : priment sur la sélection ; liste vide = toutes les sources', () => {
    const ctx = makeContext({
      sources: [
        { id: 's1', moderation: { status: 'safe' } },
        { id: 's2', moderation: { status: 'unsafe' } },
      ],
      selectedIds: ['s1'],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBeNull();
    expect(gen.blockedModerationStatus.call(ctx, ['s2'])).toBe('unsafe');
    expect(gen.blockedModerationSource.call(ctx, ['s2'])?.id).toBe('s2');
    expect(gen.blockedModerationStatus.call(ctx, [])).toBe('unsafe');
    expect(gen.blockedModerationStatus.call({ ...ctx, selectedIds: ['s2'] }, ['s1'])).toBeNull();
  });

  it('applies the priority within selectedIds only', () => {
    const ctx = makeContext({
      sources: [
        { id: 's1', moderation: { status: 'unsafe' } },
        { id: 's2', moderation: { status: 'pending' } },
        { id: 's3', moderation: { status: 'error' } },
      ],
      selectedIds: ['s2', 's3'],
    });
    expect(gen.blockedModerationStatus.call(ctx)).toBe('error');
  });
});

// --- moderationBlockedMessage ---

describe('moderationBlockedMessage', () => {
  // 'unsafe' représente les autres statuts : ils retombent tous sur la clé « blocked ».
  it.each([
    ['pending', 'moderation.pending'],
    ['error', 'moderation.error'],
    ['unsafe', 'moderation.blocked'],
  ])('returns %s key for %s status', (status, key) => {
    const ctx = makeContext();
    gen.moderationBlockedMessage.call(ctx, status);
    expect(ctx.t).toHaveBeenCalledWith(key);
  });
});

// --- generate ---

describe('generate', () => {
  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await gen.generate.call(ctx, 'summary');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('allows a new generation of the same type even if one is already loading (N parallel)', async () => {
    const ctx = makeContext({ loading: { summary: true } });
    await gen.generate.call(ctx, 'summary');
    // Feature C : plus de verrou loading[type] — re-cliquer lance une génération de plus.
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  // Vécu le 2026-10-03 : ~18 appuis en 3 s d'une enfant sur « Quiz » → 18 générations.
  describe('anti-flood : au plus 3 générations du même type en cours', () => {
    const pending = (type: string, status = 'pending') => ({
      id: crypto.randomUUID(),
      type,
      status,
      startedAt: '2026-10-03T19:15:23.000Z',
      sourceIds: [],
    });
    const byId = (...entries: Array<ReturnType<typeof pending>>) =>
      Object.fromEntries(entries.map((e) => [e.id, e]));
    const busyToasts = (ctx: ReturnType<typeof makeContext>) =>
      ctx.showToast.mock.calls.filter((c: any[]) => c[0] === 'toast.generationBusy');

    it('3 générations du type en cours : rien n’est lancé, message doux', async () => {
      const ctx = makeContext({
        pendingById: byId(pending('quiz'), pending('quiz'), pending('quiz')),
      });
      await gen.generate.call(ctx, 'quiz');

      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(ctx.t).toHaveBeenCalledWith('toast.generationBusy', { type: 'gen.quiz', count: 3 });
      expect(ctx.showToast).toHaveBeenCalledWith('toast.generationBusy', 'info');
      expect(Object.keys(ctx.pendingById)).toHaveLength(3);
    });

    it('ne compte ni les autres types ni les générations terminées', async () => {
      const ctx = makeContext({
        pendingById: byId(
          pending('summary'),
          pending('summary'),
          pending('summary'),
          pending('quiz', 'failed'),
          pending('quiz', 'cancelled'),
        ),
      });
      mockFetchOk({ id: 'g1', type: 'quiz', data: {} });
      await gen.generate.call(ctx, 'quiz');

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(busyToasts(ctx)).toHaveLength(0);
    });

    it('rafale de 5 appuis : 3 générations lancées, 2 messages', async () => {
      const ctx = makeContext();
      await Promise.all(Array.from({ length: 5 }, () => gen.generate.call(ctx, 'quiz')));

      expect(globalThis.fetch).toHaveBeenCalledTimes(3);
      expect(busyToasts(ctx)).toHaveLength(2);
      expect(ctx.launchingByType).toEqual({});
    });

    it('le pending optimiste prend le relais de la réservation', async () => {
      const ctx = makeContext();
      let reservedDuringFetch: unknown;
      vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
        reservedDuringFetch = { ...ctx.launchingByType };
        return { ok: true, json: async () => ({ id: 'g1', type: 'quiz', data: {} }) } as any;
      });
      await gen.generate.call(ctx, 'quiz');

      expect(reservedDuringFetch).toEqual({});
    });

    it('une génération en échec ne compte plus : son réessai part', async () => {
      const ctx = makeContext({ pendingById: byId(pending('quiz'), pending('quiz')) });
      mockFetchFail(500, { error: 'internal_error' });
      await gen.generate.call(ctx, 'quiz');
      const retry = ctx.showToast.mock.calls.find((c: any[]) => c[0] === 'toast.typedError')![2];

      mockFetchOk({ id: 'g1', type: 'quiz', data: {} });
      await retry();

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
      expect(busyToasts(ctx)).toHaveLength(0);
    });

    it('refus de modération : la réservation est rendue', async () => {
      const ctx = makeContext({
        currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
        sources: [{ id: 's1', moderation: { status: 'unsafe' } }],
      });
      await gen.generate.call(ctx, 'quiz');

      expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
      expect(ctx.launchingByType).toEqual({});
    });
  });

  it('shows moderation toast if blocked and moderation enabled', async () => {
    const ctx = makeContext({
      currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
      sources: [{ id: 's1', moderation: { status: 'unsafe' } }],
    });
    await gen.generate.call(ctx, 'summary');
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('safe source flagging a blocked category (effective unsafe): blocked toast, no fetch', async () => {
    const ctx = makeContext({
      currentProfile: {
        id: 'p1',
        ageGroup: 'enfant',
        useModeration: true,
        moderationCategories: ['criminal'],
      },
      sources: [{ id: 'f1', moderation: { status: 'safe', categories: { criminal: true } } }],
    });
    await gen.generate.call(ctx, 'summary');
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('source pending listed first: the toast still reports the flagged source', async () => {
    const ctx = makeContext({
      currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
      sources: [
        { id: 's1', moderation: { status: 'pending' } },
        { id: 's2', moderation: { status: 'unsafe' } },
      ],
    });
    await gen.generate.call(ctx, 'summary');
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
    expect(ctx.showToast).not.toHaveBeenCalledWith('moderation.pending', 'error');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('makes fetch call on success and registers generation', async () => {
    const genData = { id: 'g1', type: 'summary', data: { summary: 'test' } };
    mockFetchOk(genData);
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(ctx.generations).toHaveLength(1);
    expect(ctx.generations[0]).toEqual(genData);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.generationDone',
      'success',
      null,
      expect.objectContaining({ label: 'toast.view' }),
      expect.stringMatching(/^generation:.+:completed$/),
      expect.objectContaining({
        messageKey: 'toast.generationDone',
        paramKeys: { type: 'gen.summary' },
      }),
    );
    expect(ctx.loading.summary).toBe(false);
  });

  it('handles fetch error', async () => {
    mockFetchFail(500, { error: 'Server error' });
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    // Échec nommé par son type : deux types en échec ne sont pas regroupés dans le même toast.
    expect(ctx.t).toHaveBeenCalledWith('toast.typedError', {
      type: 'gen.summary',
      error: 'Server error',
    });
    expect(ctx.showToast).toHaveBeenCalledWith('toast.typedError', 'error', expect.any(Function));
    expect(ctx.generations).toHaveLength(0);
    expect(ctx.loading.summary).toBe(false);
  });

  it('extraBody surcharge le body standard (register/sourceIds)', async () => {
    mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary', { sourceIds: ['s9'], register: 'falc' });
    const [url, init] = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(String(url)).toBe('/api/projects/pid-1/generate/summary');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.register).toBe('falc');
    expect(body.sourceIds).toEqual(['s9']);
    expect(body.lang).toBe('fr'); // le reste du body standard est conservé
  });

  it('generateSimplified régénère la fiche en falc avec ses sources', async () => {
    mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
    const ctx = makeContext();
    await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s1', 's2'] } as any);
    const [, init] = vi.mocked(globalThis.fetch).mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.register).toBe('falc');
    expect(body.sourceIds).toEqual(['s1', 's2']);
    expect(body.lang).toBe('fr'); // pas de lang stockée sur la fiche → langue UI
  });

  it('generateSimplified fait primer la langue de la fiche quand elle existe', async () => {
    mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
    const ctx = makeContext();
    await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s1'], lang: 'en' } as any);
    const [, init] = vi.mocked(globalThis.fetch).mock.calls[0];
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.lang).toBe('en');
  });

  // Version facile à lire : le pré-contrôle de modération, le pending et les réessais portent sur
  // les sources de la fiche d'origine (celles que le serveur garde), pas sur la sélection courante.
  describe('generateSimplified — sources de la fiche', () => {
    const moderatedProfile = { id: 'p1', ageGroup: 'enfant', useModeration: true };
    const bodyOf = (call: number) =>
      JSON.parse((vi.mocked(globalThis.fetch).mock.calls[call][1] as RequestInit).body as string);

    it('source unsafe sélectionnée mais hors de la fiche : la génération part', async () => {
      mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
      const ctx = makeContext({
        currentProfile: moderatedProfile,
        sources: [
          { id: 's-unsafe', moderation: { status: 'unsafe' } },
          { id: 's-fiche', moderation: { status: 'safe' } },
        ],
        selectedIds: ['s-unsafe'],
      });

      await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s-fiche'] } as any);

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
      expect(bodyOf(0).sourceIds).toEqual(['s-fiche']);
      expect(ctx.showToast).not.toHaveBeenCalledWith('moderation.blocked', 'error');
    });

    it('source unsafe de la fiche, non sélectionnée : toast moderation.blocked, aucun appel', async () => {
      const ctx = makeContext({
        currentProfile: moderatedProfile,
        sources: [
          { id: 's-selected', moderation: { status: 'safe' } },
          { id: 's-fiche', moderation: { status: 'unsafe' } },
        ],
        selectedIds: ['s-selected'],
      });

      await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s-fiche'] } as any);

      expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(ctx.pendingById).toEqual({});
    });

    it('fiche legacy sans sources (sourceIds: []) : toutes les sources, comme le serveur', async () => {
      const ctx = makeContext({
        currentProfile: moderatedProfile,
        sources: [
          { id: 's-selected', moderation: { status: 'safe' } },
          { id: 's-other', moderation: { status: 'unsafe' } },
        ],
        selectedIds: ['s-selected'],
      });

      await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: [] } as any);

      expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('fiche sans sourceIds (donnée ancienne) : [] envoyé, pré-contrôle sur toutes les sources', async () => {
      const ctx = makeContext({
        currentProfile: moderatedProfile,
        sources: [
          { id: 's-selected', moderation: { status: 'safe' } },
          { id: 's-other', moderation: { status: 'unsafe' } },
        ],
        selectedIds: ['s-selected'],
      });

      await gen.generateSimplified.call(ctx, { id: 'g1' } as any);
      expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
      expect(globalThis.fetch).not.toHaveBeenCalled();

      mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
      const safeCtx = makeContext({ sources: [{ id: 's1' }], selectedIds: ['s1'] });
      await gen.generateSimplified.call(safeCtx, { id: 'g1' } as any);
      expect(bodyOf(0).sourceIds).toEqual([]);
    });

    it('le pending optimiste porte les sources de la fiche', async () => {
      const ctx = makeContext({ sources: [{ id: 's1' }, { id: 's2' }], selectedIds: ['s1'] });
      let pendingSources: unknown;
      vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
        pendingSources = (Object.values(ctx.pendingById)[0] as { sourceIds: string[] }).sourceIds;
        return { ok: true, json: async () => ({ id: 'g-falc', type: 'summary', data: {} }) } as any;
      });

      await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s2'] } as any);

      expect(pendingSources).toEqual(['s2']);
    });

    it('réessai après erreur HTTP : même corps, registre falc et sources de la fiche', async () => {
      mockFetchFail(500, { error: 'upstream_unavailable' });
      const ctx = makeContext({ sources: [{ id: 's1' }, { id: 's2' }], selectedIds: ['s1'] });
      await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s2'] } as any);
      const retry = ctx.showToast.mock.calls.find((c: any[]) => c[0] === 'toast.typedError')![2];

      mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
      await retry();

      expect(bodyOf(1).register).toBe('falc');
      expect(bodyOf(1).sourceIds).toEqual(['s2']);
    });

    it('réessai après exception réseau : même corps, registre falc et sources de la fiche', async () => {
      vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('offline'));
      const ctx = makeContext({ sources: [{ id: 's1' }, { id: 's2' }], selectedIds: ['s1'] });
      await gen.generateSimplified.call(ctx, { id: 'g1', sourceIds: ['s2'] } as any);
      expect(ctx.t).toHaveBeenCalledWith('toast.typedError', {
        type: 'gen.summary',
        error: 'toast.generationError',
      });
      const retry = ctx.showToast.mock.calls.find((c: any[]) => c[0] === 'toast.typedError')![2];

      mockFetchOk({ id: 'g-falc', type: 'summary', data: {} });
      await retry();

      expect(bodyOf(1).register).toBe('falc');
      expect(bodyOf(1).sourceIds).toEqual(['s2']);
    });
  });

  // Refus de modération renvoyé par le serveur (front périmé) : réessayer donnerait le même refus.
  it('moderation.blocked du serveur : toast sans bouton Réessayer', async () => {
    mockFetchFail(400, { error: 'moderation.blocked' });
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.typedError', 'error', null);
  });

  it.each(['moderation.pending', 'moderation.error'])(
    '%s du serveur : toast avec Réessayer (état transitoire)',
    async (error) => {
      mockFetchFail(409, { error });
      const ctx = makeContext();
      await gen.generate.call(ctx, 'summary');
      expect(ctx.showToast).toHaveBeenCalledWith('toast.typedError', 'error', expect.any(Function));
    },
  );

  it('handles abort error (ignores)', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(abortError);
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    expect(ctx.showToast).not.toHaveBeenCalled();
    expect(ctx.loading.summary).toBe(false);
  });

  it('error retry callback calls generate again', async () => {
    // First call fails
    mockFetchFail(500, { error: 'Server error' });
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.typedError' && c[1] === 'error',
    );
    const retryFn = toastCall![2];

    // Retry succeeds
    const genData = { id: 'g1', type: 'summary', data: { summary: 'retry' } };
    mockFetchOk(genData);
    await retryFn();
    expect(ctx.generations).toHaveLength(1);
  });

  it('success toast action navigates to the generated type view', async () => {
    const genData = { id: 'g1', type: 'summary', data: { summary: 'test' } };
    mockFetchOk(genData);
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.generationDone' && c[1] === 'success',
    );
    expect(toastCall).toBeTruthy();
    const action = toastCall![3];
    expect(action).toBeDefined();
    action.fn();
    expect(ctx.goToView).toHaveBeenCalledWith('summary');
  });

  it('sets loading false in finally', async () => {
    const networkError = new Error('Network error');
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(networkError);
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.abortControllers.summary).toBeUndefined();
  });
});

// --- Pré-contrôle asynchrone (ensureGenerationAllowed) : sources en attente vérifiées AVANT le
// pending optimiste et avant tout appel de génération ---

describe('vérification des sources avant la génération', () => {
  const moderatedProfile = { id: 'p1', ageGroup: 'enfant', useModeration: true };
  const urls = () => vi.mocked(globalThis.fetch).mock.calls.map((c) => String(c[0]));

  // Réponse de POST /sources/moderate ; `during` observe l'état pendant la vérification.
  const mockVerification = (status: string, during?: () => void) =>
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      during?.();
      return {
        ok: true,
        json: async () => ({ sources: [{ id: 's1', moderation: { status, categories: {} } }] }),
      } as any;
    });

  it('source en attente vérifiée safe : vérification, puis génération (aucun pending avant)', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
    });
    let pendingDuringVerification: unknown;
    mockVerification('safe', () => {
      pendingDuringVerification = { ...ctx.pendingById };
    });
    mockFetchOk({ id: 'g1', type: 'summary', data: {} });

    await gen.generate.call(ctx, 'summary');

    expect(urls()).toEqual([
      '/api/projects/pid-1/sources/moderate',
      '/api/projects/pid-1/generate/summary',
    ]);
    expect(pendingDuringVerification).toEqual({});
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.checking', 'info');
    expect(ctx.generations).toHaveLength(1);
  });

  it('source toujours en attente : toast moderation.pending, ni génération ni pending', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
    });
    mockVerification('pending');

    await gen.generate.call(ctx, 'summary');

    expect(urls()).toEqual(['/api/projects/pid-1/sources/moderate']);
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.pending', 'error');
    expect(ctx.pendingById).toEqual({});
    expect(ctx.loading.summary).toBe(false);
  });

  // Inversé le 2026-10-21 (règle « ça continue même si on change de page ») : jusqu'en v1.7.11,
  // changer de cours pendant la vérification (jusqu'à 10 s) perdait la génération sans un mot.
  // Elle part vers son cours avec le corps du clic (le serveur refait la garde), sans rien poser
  // sur l'écran affiché.
  it('projet changé pendant la vérification : envoyée vers son cours, rien sur l’écran affiché', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
      selectedIds: ['s1'],
      generateCount: 20,
    });
    mockVerification('safe', () => {
      ctx.currentProjectId = 'pid-2';
      ctx.selectedIds = [];
      ctx.generateCount = 10;
    });
    mockFetchOk({ id: 'g1', type: 'summary', data: {} });

    await gen.generate.call(ctx, 'summary');

    expect(urls()).toEqual([
      '/api/projects/pid-1/sources/moderate',
      '/api/projects/pid-1/generate/summary',
    ]);
    const sent = JSON.parse(
      (vi.mocked(globalThis.fetch).mock.calls[1][1] as RequestInit).body as string,
    );
    expect(sent).toMatchObject({ sourceIds: ['s1'], count: 20 });
    expect(ctx.pendingById).toEqual({});
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.generations).toEqual([]);
    expect(ctx.launchingByType).toEqual({});
    expect(ctx.showToast).not.toHaveBeenCalledWith(
      'toast.generationDone',
      'success',
      null,
      expect.anything(),
      expect.anything(),
      expect.anything(),
    );
  });

  // Changement de profil pendant la vérification : la génération part avec la clé du profil qui a
  // cliqué, jamais avec celle du profil devenu actif (refreshKeyState de selectProfile).
  it('profil changé pendant la vérification : clé capturée au clic', async () => {
    await activateKey('sk-profil-a');
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
    });
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      ctx.currentProjectId = null;
      await activateKey('sk-profil-b');
      const moderation = { status: 'safe', categories: {} };
      return { ok: true, json: async () => ({ sources: [{ id: 's1', moderation }] }) } as any;
    });
    mockFetchOk({ id: 'g1', type: 'summary', data: {} });

    await gen.generate.call(ctx, 'summary');

    expect(urls()[1]).toBe('/api/projects/pid-1/generate/summary');
    expect(sentKey(1)).toBe('sk-profil-a');
  });

  // La vérification (jusqu'à 8 s) précède le pending optimiste : sans réservation synchrone, aucun
  // pending n'existe encore pendant une rafale et tous les appuis passent.
  it('anti-flood : rafale pendant une vérification en attente → 3 générations au plus', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
    });
    let release!: () => void;
    const verified = new Promise<void>((resolve) => {
      release = resolve;
    });
    vi.mocked(globalThis.fetch).mockImplementation(async (input) => {
      if (String(input).endsWith('/sources/moderate')) {
        await verified;
        const moderation = { status: 'safe', categories: {} };
        return { ok: true, json: async () => ({ sources: [{ id: 's1', moderation }] }) } as any;
      }
      return { ok: true, json: async () => ({ id: crypto.randomUUID(), type: 'quiz' }) } as any;
    });

    const taps = Array.from({ length: 5 }, () => gen.generate.call(ctx, 'quiz'));
    expect(ctx.launchingByType).toEqual({ quiz: 3 });
    release();
    await Promise.all(taps);

    expect(urls().filter((u) => u.endsWith('/generate/quiz'))).toHaveLength(3);
    const busy = ctx.showToast.mock.calls.filter((c: any[]) => c[0] === 'toast.generationBusy');
    expect(busy).toHaveLength(2);
    expect(ctx.launchingByType).toEqual({});
  });

  it('generateAuto : vérification avant le lancement du lot', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'error', categories: {} } }],
    });
    let autoLoadingDuringVerification: unknown;
    mockVerification('safe', () => {
      autoLoadingDuringVerification = ctx.loading.auto;
    });
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 202,
      json: async () => ({ run: { id: 'r1', status: 'analysing', steps: [], skipped: [] } }),
    } as any);

    await gen.generateAuto.call(ctx);

    expect(urls()).toEqual([
      '/api/projects/pid-1/sources/moderate',
      '/api/projects/pid-1/generate/auto/start',
    ]);
    expect(autoLoadingDuringVerification).toBe(false);
  });
  it('generateAuto : un second clic pendant la vérification est sans effet (un seul lot)', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'error', categories: {} } }],
    });
    mockVerification('safe', () => {
      void gen.generateAuto.call(ctx);
    });
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 202,
      json: async () => ({ run: { id: 'r1', status: 'analysing', steps: [], skipped: [] } }),
    } as any);

    await gen.generateAuto.call(ctx);

    expect(urls().filter((u) => u.endsWith('/generate/auto/start'))).toHaveLength(1);
  });

  it('generateAuto : « Tout annuler » pendant la vérification, le lot ne part pas', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'error', categories: {} } }],
    });
    mockVerification('safe', () => {
      ctx.autoRuns['pid-1'].cancelledHere = true;
    });

    await gen.generateAuto.call(ctx);

    expect(urls()).toEqual(['/api/projects/pid-1/sources/moderate']);
    expect(ctx.autoRuns['pid-1']).toBeUndefined();
  });

  it('source jamais vérifiée, profil modéré : vérifiée avant la génération', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1' }],
    });
    mockVerification('safe');
    mockFetchOk({ id: 'g1', type: 'summary', data: {} });

    await gen.generate.call(ctx, 'summary');

    expect(urls()).toEqual([
      '/api/projects/pid-1/sources/moderate',
      '/api/projects/pid-1/generate/summary',
    ]);
    expect(
      JSON.parse((vi.mocked(globalThis.fetch).mock.calls[0][1] as RequestInit).body as string),
    ).toEqual({ sourceIds: ['s1'] });
  });

  it('source jamais vérifiée, profil non modéré : ni vérification ni refus', async () => {
    const ctx = makeContext({ sources: [{ id: 's1' }] });
    mockFetchOk({ id: 'g1', type: 'summary', data: {} });

    await gen.generate.call(ctx, 'summary');

    expect(urls()).toEqual(['/api/projects/pid-1/generate/summary']);
    expect(ctx.showToast).not.toHaveBeenCalledWith('moderation.pending', 'error');
  });

  it('generateAll : vérification avant les trois générations', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
    });
    mockVerification('pending');

    await gen.generateAll.call(ctx);

    expect(urls()).toEqual(['/api/projects/pid-1/sources/moderate']);
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.pending', 'error');
  });
});

// --- generateAll ---

describe('generateAll', () => {
  it('makes 3 parallel fetches', async () => {
    const g1 = { id: 'g1', type: 'summary' };
    const g2 = { id: 'g2', type: 'flashcards' };
    const g3 = { id: 'g3', type: 'quiz' };
    mockFetchOk(g1);
    mockFetchOk(g2);
    mockFetchOk(g3);
    const ctx = makeContext();
    await gen.generateAll.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    expect(ctx.generations).toHaveLength(3);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.allGenerated',
      'success',
      null,
      expect.objectContaining({ label: 'toast.view' }),
    );
    expect(ctx.loading.all).toBe(false);
  });

  it('shows partial toast on some failures', async () => {
    const g1 = { id: 'g1', type: 'summary' };
    mockFetchOk(g1);
    mockFetchFail(500, { error: 'fail' });
    mockFetchOk({ id: 'g3', type: 'quiz' });
    const ctx = makeContext();
    await gen.generateAll.call(ctx);
    expect(ctx.generations).toHaveLength(2);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.partialGenerated', 'warning');
    expect(ctx.loading.all).toBe(false);
  });

  it('shows all-error toast when all fail', async () => {
    mockFetchFail(500, {});
    mockFetchFail(500, {});
    mockFetchFail(500, {});
    const ctx = makeContext();
    await gen.generateAll.call(ctx);
    expect(ctx.generations).toHaveLength(0);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.generationError', 'error');
  });

  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await gen.generateAll.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('shows moderation toast if blocked and moderation enabled', async () => {
    const ctx = makeContext({
      currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
      sources: [{ id: 's1', moderation: { status: 'unsafe' } }],
    });
    await gen.generateAll.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('shows error toast with retry callback on network exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network crash'));
    const ctx = makeContext();
    await gen.generateAll.call(ctx);

    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.generationError',
      'error',
      expect.any(Function),
    );
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.loading.flashcards).toBe(false);
    expect(ctx.loading.quiz).toBe(false);
  });

  it('network exception retry callback calls generateAll again', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network crash'));
    const ctx = makeContext();
    await gen.generateAll.call(ctx);

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.generationError' && c[1] === 'error',
    );
    const retryFn = toastCall![2];

    // Retry succeeds
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchOk({ id: 'g2', type: 'flashcards' });
    mockFetchOk({ id: 'g3', type: 'quiz' });
    await retryFn();
    expect(ctx.generations).toHaveLength(3);
  });

  it('ignores AbortError in generateAll', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(abortError);
    const ctx = makeContext();
    await gen.generateAll.call(ctx);
    expect(ctx.showToast).not.toHaveBeenCalled();
    expect(ctx.loading.summary).toBe(false);
  });

  it('success toast action navigates to dashboard', async () => {
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchOk({ id: 'g2', type: 'flashcards' });
    mockFetchOk({ id: 'g3', type: 'quiz' });
    const ctx = makeContext();
    await gen.generateAll.call(ctx);

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.allGenerated' && c[1] === 'success',
    );
    expect(toastCall).toBeTruthy();
    const action = toastCall![3];
    action.fn();
    expect(ctx.goToView).toHaveBeenCalledWith('dashboard');
  });
});

// --- generateAuto ---

describe('anti-leak e.message in toasts', () => {
  const TOKEN = 'SECRET_LEAK_TEST_TOKEN';

  it('generate() never surfaces raw e.message in any toast call', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error(TOKEN));
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    expect(JSON.stringify(ctx.showToast.mock.calls)).not.toContain(TOKEN);
  });

  it('generateAll() never surfaces raw e.message in any toast call', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error(TOKEN));
    const ctx = makeContext();
    await gen.generateAll.call(ctx);
    expect(JSON.stringify(ctx.showToast.mock.calls)).not.toContain(TOKEN);
  });

  it('generateAuto() never surfaces raw e.message in any toast call', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error(TOKEN));
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);
    expect(JSON.stringify(ctx.showToast.mock.calls)).not.toContain(TOKEN);
  });

  it('resumeAuto() : erreur réseau sans e.message, lot oublié, « Réessayer » refait la reprise', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error(TOKEN));
    const ctx = makeContext({ resumeAuto: vi.fn() });
    const runId = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
    await gen.resumeAuto.call(ctx, 'pid-1', runId, 'Cours');
    const urls = vi.mocked(globalThis.fetch).mock.calls.map((c) => String(c[0]));
    expect(urls).toEqual(['/api/projects/pid-1/generate/auto/resume']);
    expect(JSON.stringify(ctx.showToast.mock.calls)).not.toContain(TOKEN);
    expect(ctx.autoRuns['pid-1']).toBeUndefined();
    ctx.showToast.mock.calls[0][2]();
    expect(ctx.resumeAuto).toHaveBeenCalledWith('pid-1', runId, 'Cours');
  });
});

describe('requêtes longues : au plus 3 en même temps pour tout l’onglet', () => {
  const session = createSession();
  const confirm = createConfirm();
  const allAgents = [
    'summary',
    'flashcards',
    'quiz',
    'fill-blank',
    'podcast',
    'quiz-vocal',
    'image',
    'dictation',
  ];
  const isRoute = (url: unknown) => String(url).endsWith('/generate/route');
  const isCancel = (url: unknown) => String(url).endsWith('/cancel');
  const routeReply = () =>
    ({ ok: true, json: async () => ({ plan: allAgents.map((agent) => ({ agent })) }) }) as any;
  // Générations envoyées (étapes Auto et générations simples), dans l'ordre d'envoi, avec le gid de
  // leur corps : seules les générations simples en portent un.
  const sentGenerations = () =>
    vi
      .mocked(globalThis.fetch)
      .mock.calls.filter(([url]) => !isRoute(url) && !isCancel(url))
      .map(([url, init]) => ({
        url: String(url),
        gid: JSON.parse(String(init?.body)).gid as string | undefined,
      }));
  const stepUrls = () => sentGenerations().map((g) => g.url);
  const nextMacrotask = () => new Promise((resolve) => setTimeout(resolve, 0));
  // Changement de cours tel que selectProject le fait (le cours suivant, puis resetSession).
  const switchCourse = (ctx: any, projectId: string | null) => {
    ctx.currentProjectId = projectId;
    session.resetSession.call(ctx);
  };

  // Générations tenues jusqu'à ce que le test les termine, la plus ancienne d'abord, ou abortées par
  // leur signal ; compte celles en vol et le maximum atteint. Analyse de route immédiate ; annulation
  // (POST /cancel) acceptée par le 404 du serveur, qui ne connaît pas une génération jamais envoyée.
  const holdGenerations = () => {
    const finishers: Array<() => void> = [];
    const stats = { inFlight: 0, max: 0 };
    vi.mocked(globalThis.fetch).mockImplementation(async (url, init) => {
      if (isRoute(url)) return routeReply();
      if (isCancel(url)) return { ok: false, status: 404 } as any;
      stats.inFlight++;
      stats.max = Math.max(stats.max, stats.inFlight);
      try {
        await new Promise<void>((resolve, reject) => {
          finishers.push(resolve);
          init?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });
      } finally {
        stats.inFlight--;
      }
      const type = String(url).split('/generate/')[1];
      return { ok: true, json: async () => ({ id: crypto.randomUUID(), type, data: {} }) } as any;
    });
    return { finishers, stats, finishOldest: () => finishers.shift()!() };
  };

  // Places prises par d'autres requêtes longues de l'onglet, toutes rendues par `free`.
  const occupySlots = (count: number) => {
    const releases: Array<() => void> = [];
    const requests = Array.from({ length: count }, () =>
      withLongRequestSlot(() => new Promise<void>((resolve) => releases.push(resolve))),
    );
    return {
      free: async () => {
        await vi.waitFor(() => expect(releases).toHaveLength(count));
        for (const release of releases) release();
        await Promise.all(requests);
      },
    };
  };

  it('génération simple annulée par sa puce pendant son attente : rien n’est envoyé, elle sort de la file et la suivante passe', async () => {
    const ctx = makeContext();
    const held = holdGenerations();
    const others = occupySlots(3);
    const summary = gen.generate.call(ctx, 'summary');
    const quiz = gen.generate.call(ctx, 'quiz');
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 2 }));
    // Puces affichées pendant l'attente.
    const pendingOf = (type: string) =>
      Object.values(ctx.pendingById).find((p: any) => p.type === type) as any;
    const summaryGid = pendingOf('summary').id;
    expect(pendingOf('quiz')).toBeDefined();
    expect([ctx.loading.summary, ctx.loading.quiz]).toEqual([true, true]);

    confirm.cancelOne.call(ctx, summaryGid);
    await summary;

    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 1 });
    expect(ctx.pendingById[summaryGid]).toBeUndefined();
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.cancelledOne', 'info');
    expect(ctx.showToast).not.toHaveBeenCalledWith(
      'toast.typedError',
      'error',
      expect.any(Function),
    );
    expect(vi.mocked(globalThis.fetch).mock.calls.map((c) => String(c[0]))).toEqual([
      `/api/projects/pid-1/generations/${summaryGid}/cancel`,
    ]);

    await others.free();
    await vi.waitFor(() => expect(stepUrls()).toEqual(['/api/projects/pid-1/generate/quiz']));
    held.finishOldest();
    await quiz;
    expect(stepUrls()).toEqual(['/api/projects/pid-1/generate/quiz']);
    expect(ctx.loading.quiz).toBe(false);
  });

  it('cours quitté pendant l’attente : jamais partie, la génération part à son tour vers son cours, avec la clé et le corps du clic, puis un toast nomme ce cours', async () => {
    await activateKey('sk-profil-a');
    const ctx = makeContext({ selectedIds: ['s1'] });
    const held = holdGenerations();
    const others = occupySlots(3);
    const run = gen.generate.call(ctx, 'summary');
    await vi.waitFor(() => expect(longRequestSlots().waiting).toBe(1));

    switchCourse(ctx, 'pid-2');
    ctx.selectedIds = [];
    await activateKey('sk-profil-b');
    await run;

    expect(stepUrls()).toEqual([]);
    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 1 }); // repartie en arrière-plan
    await others.free();
    await vi.waitFor(() => expect(stepUrls()).toEqual(['/api/projects/pid-1/generate/summary']));
    expect(sentKey(0)).toBe('sk-profil-a');
    const body = JSON.parse(String(vi.mocked(globalThis.fetch).mock.calls[0][1]?.body));
    expect(body).toMatchObject({ sourceIds: ['s1'], count: 10 });
    held.finishOldest();
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 }));

    // Rien sur l'écran du cours affiché (ni puce, ni chargement, ni génération), sauf un toast qui
    // nomme le cours de la génération (jusqu'au 2026-10-24 : aucun signe).
    expect(ctx.pendingById).toEqual({});
    expect(ctx.loading.summary).toBe(false);
    expect(ctx.generations).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledTimes(1);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.generationDoneIn', 'success');
    expect(ctx.t).toHaveBeenCalledWith('toast.generationDoneIn', {
      type: 'gen.summary',
      project: 'Histoire',
    });
  });

  // Les trois cas suivants partent d'une génération en attente d'une place, cours quitté.
  const leaveWhileWaiting = async (ctx: any) => {
    const others = occupySlots(3);
    const run = gen.generate.call(ctx, 'summary');
    await vi.waitFor(() => expect(longRequestSlots().waiting).toBe(1));
    switchCourse(ctx, 'pid-2');
    await run;
    await others.free();
  };

  it('cours quitté : un échec en arrière-plan est signalé par un toast qui nomme le cours', async () => {
    const ctx = makeContext({ selectedIds: ['s1'] });
    vi.mocked(globalThis.fetch).mockImplementation(async (url) => {
      if (isRoute(url)) return routeReply();
      return {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'content_refused' }),
      } as any;
    });
    await leaveWhileWaiting(ctx);
    await vi.waitFor(() =>
      expect(ctx.showToast).toHaveBeenCalledWith('toast.generationFailedIn', 'error'),
    );
    expect(ctx.resolveError).toHaveBeenCalledWith('content_refused');
    expect(ctx.t).toHaveBeenCalledWith('toast.generationFailedIn', {
      type: 'gen.summary',
      project: 'Histoire',
      error: 'content_refused',
    });
  });

  // Annulée par un autre onglet pendant qu'on est ailleurs : le serveur répond 409 `cancelled`,
  // rien n'est affiché (comme après l'annulation d'un Auto).
  it('cours quitté : une génération annulée ailleurs n’affiche rien', async () => {
    const ctx = makeContext({ selectedIds: ['s1'] });
    vi.mocked(globalThis.fetch).mockImplementation(async (url) => {
      if (isRoute(url)) return routeReply();
      return {
        ok: false,
        status: 409,
        statusText: 'Conflict',
        json: async () => ({ error: 'cancelled', gid: 'x' }),
      } as any;
    });
    await leaveWhileWaiting(ctx);
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 }));
    await nextMacrotask();
    expect(ctx.showToast).not.toHaveBeenCalled();
  });

  it('revenu sur le cours avant la réponse : pas de toast « dans le cours », le SSE prend le relais', async () => {
    const ctx = makeContext({ selectedIds: ['s1'] });
    const held = holdGenerations();
    await leaveWhileWaiting(ctx);
    await vi.waitFor(() => expect(stepUrls()).toEqual(['/api/projects/pid-1/generate/summary']));
    switchCourse(ctx, 'pid-1');
    held.finishOldest();
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 }));
    await nextMacrotask();
    expect(ctx.showToast).not.toHaveBeenCalledWith('toast.generationDoneIn', 'success');
  });

  it('profil changé avant la réponse : aucun toast du cours de l’autre profil', async () => {
    const ctx = makeContext({ selectedIds: ['s1'] });
    const held = holdGenerations();
    await leaveWhileWaiting(ctx);
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(1));
    ctx.currentProfile = { ...ctx.currentProfile, id: 'p2' };
    held.finishOldest();
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 }));
    await nextMacrotask();
    expect(ctx.showToast).not.toHaveBeenCalled();
  });

  // Déjà envoyée : elle continue vers son cours (single-runs.ts, épargnée par resetSession), garde
  // sa place jusqu'à la réponse, n'est pas renvoyée, et sa réponse nomme le cours (jusqu'au
  // 2026-10-24 : fetch aborté, réponse perdue, aucun toast).
  it('génération déjà partie puis cours quitté : elle continue, puis un toast nomme son cours', async () => {
    const ctx = makeContext();
    const held = holdGenerations();
    const run = gen.generate.call(ctx, 'summary');
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(1));
    const signal = vi.mocked(globalThis.fetch).mock.calls[0][1]?.signal;

    switchCourse(ctx, 'pid-2');
    await nextMacrotask();

    expect(signal?.aborted).toBe(false);
    expect(longRequestSlots()).toEqual({ inFlight: 1, waiting: 0 });
    expect(Object.keys(ctx.singleRuns)).toHaveLength(1);

    held.finishOldest();
    await run;

    expect(stepUrls()).toEqual(['/api/projects/pid-1/generate/summary']);
    expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 });
    expect(ctx.singleRuns).toEqual({});
    expect(ctx.generations).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledTimes(1);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.generationDoneIn', 'success');
  });

  // Retour sur le cours : la puce relue du serveur aborte le fetch gardé (restoreSingleRuns, comme
  // à l'ouverture d'un cours), sans quoi la réponse 409 `cancelled` s'afficherait en erreur.
  it('partie, cours quitté puis retrouvé : l’annulation par la puce aborte le fetch, sans erreur', async () => {
    const ctx = makeContext();
    holdGenerations();
    const run = gen.generate.call(ctx, 'summary');
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(1));
    const signal = vi.mocked(globalThis.fetch).mock.calls[0][1]?.signal;
    const gid = Object.keys(ctx.singleRuns)[0];

    switchCourse(ctx, 'pid-2');
    switchCourse(ctx, 'pid-1');
    restoreSingleRuns(ctx, 'pid-1');
    expect(ctx.abortControllersByGid[gid]).toBeDefined();

    ctx.abortControllersByGid[gid].abort();
    await run;

    expect(signal?.aborted).toBe(true);
    expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 });
    expect(ctx.singleRuns).toEqual({});
    expect(ctx.showToast).not.toHaveBeenCalled();
  });

  it('réponse en erreur ou exception réseau : la place est rendue, les générations en file partent', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const ctx = makeContext();
    const replies: Array<(outcome: 'http-error' | 'network' | 'ok') => void> = [];
    vi.mocked(globalThis.fetch).mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const type = String(url).split('/generate/')[1];
          replies.push((outcome) => {
            if (outcome === 'network') reject(new TypeError('Failed to fetch'));
            else if (outcome === 'ok') {
              resolve({ ok: true, json: async () => ({ id: 'g-' + type, type, data: {} }) } as any);
            } else {
              const error = { error: 'internal_error' };
              resolve({
                ok: false,
                status: 500,
                statusText: 'Error',
                json: async () => error,
              } as any);
            }
          });
        }) as any,
    );
    const types = ['summary', 'flashcards', 'quiz', 'fill-blank', 'image'];
    const runs = types.map((type) => gen.generate.call(ctx, type));
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 2 }));

    replies[0]('http-error');
    await vi.waitFor(() => expect(replies).toHaveLength(4));
    replies[1]('network');
    await vi.waitFor(() => expect(replies).toHaveLength(5));
    for (const reply of replies.slice(2)) reply('ok');
    await Promise.all(runs);

    expect(stepUrls()).toEqual(types.map((type) => '/api/projects/pid-1/generate/' + type));
    expect(ctx.generations.map((g: any) => g.type)).toEqual(['quiz', 'fill-blank', 'image']);
    const errorToasts = ctx.showToast.mock.calls.filter((c: any[]) => c[0] === 'toast.typedError');
    expect(errorToasts).toHaveLength(2);
    errorSpy.mockRestore();
  });
});

// --- generateVoice ---

describe('generateVoice', () => {
  it('fetches read-aloud batch and sets section audioUrls on success', async () => {
    mockFetchOk({ audioUrls: { intro: '/audio/intro.mp3', key_points: '/audio/kp.mp3' } });
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    });

    await gen.generateVoice.call(ctx, genObj);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(genObj._audioUrl_intro).toBe('/audio/intro.mp3');
    expect(genObj._audioUrl_key_points).toBe('/audio/kp.mp3');
    expect(genObj._activeAudioSection).toBe('intro');
    expect(genObj._playlistMode).toBe(true);
    expect(genObj._generatingVoice_all).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.audioDone', 'success');
  });

  it('fetches single section and sets audioUrl', async () => {
    mockFetchOk({ audioUrl: '/audio/intro.mp3' });
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_intro: false,
    });

    await gen.generateVoice.call(ctx, genObj, 'intro');
    expect(genObj._audioUrl_intro).toBe('/audio/intro.mp3');
    expect(genObj._activeAudioSection).toBe('intro');
    expect(genObj._playlistMode).toBe(false);
  });

  it('returns early if already generating', async () => {
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: true,
    });
    await gen.generateVoice.call(ctx, genObj);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('handles fetch error', async () => {
    mockFetchFail(500, { error: 'TTS unavailable' });
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'quiz',
      data: {} as any,
      _generatingVoice_all: false,
    });
    await gen.generateVoice.call(ctx, genObj);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error', expect.any(Function));
    expect(genObj._generatingVoice_all).toBe(false);
  });

  // Code stable traduit (resolveError), jamais le code brut : 429 de aiLimiter compris.
  it('refus HTTP : code traduit par resolveError (rate_limited)', async () => {
    mockFetchFail(429, { error: 'rate_limited' });
    const ctx = makeContext({
      resolveError: vi.fn((code: string) => `<${code}>`),
      t: vi.fn((key: string, params?: Record<string, string>) =>
        params?.error ? `${key}:${params.error}` : key,
      ),
    });
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'quiz',
      data: {} as any,
      _generatingVoice_all: false,
    });

    await gen.generateVoice.call(ctx, genObj);

    expect(ctx.resolveError).toHaveBeenCalledWith('rate_limited');
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.error:<rate_limited>',
      'error',
      expect.any(Function),
    );
  });

  it('handles network exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network fail'));
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'quiz',
      data: {} as any,
      _generatingVoice_all: false,
    });
    await gen.generateVoice.call(ctx, genObj);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.audioError', 'error', expect.any(Function));
    expect(genObj._generatingVoice_all).toBe(false);
  });

  it('sets _audioUrl_all for non-summary types (single response)', async () => {
    mockFetchOk({ audioUrl: '/audio/gen1.mp3' });
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'quiz',
      data: {} as any,
      _generatingVoice_all: false,
    });

    await gen.generateVoice.call(ctx, genObj);
    expect(genObj._audioUrl_all).toBe('/audio/gen1.mp3');
  });

  it('loads and plays audio element when present in DOM', async () => {
    mockFetchOk({ audioUrls: { intro: '/audio/intro.mp3' } });
    const mockAudioEl = {
      load: vi.fn(),
      play: vi.fn().mockResolvedValue(undefined),
    };
    const origQuerySelector = document.querySelector;
    document.querySelector = vi.fn().mockReturnValue(mockAudioEl);

    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    });

    await gen.generateVoice.call(ctx, genObj);

    expect(document.querySelector).toHaveBeenCalledWith('audio[data-gen-id="g1"]');
    expect(mockAudioEl.load).toHaveBeenCalled();
    expect(mockAudioEl.play).toHaveBeenCalled();

    document.querySelector = origQuerySelector;
  });

  it('handles play() rejection gracefully (autoplay blocked)', async () => {
    mockFetchOk({ audioUrls: { intro: '/audio/intro.mp3' } });
    const mockAudioEl = {
      load: vi.fn(),
      play: vi.fn().mockRejectedValue(new Error('Autoplay blocked')),
    };
    const origQuerySelector = document.querySelector;
    document.querySelector = vi.fn().mockReturnValue(mockAudioEl);

    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    });

    // Should not throw
    await gen.generateVoice.call(ctx, genObj);

    expect(mockAudioEl.load).toHaveBeenCalled();
    expect(mockAudioEl.play).toHaveBeenCalled();
    expect(genObj._audioUrl_intro).toBe('/audio/intro.mp3');

    document.querySelector = origQuerySelector;
  });

  it('error response shows toast with retry callback', async () => {
    mockFetchFail(500, { error: 'TTS unavailable' });
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    });
    await gen.generateVoice.call(ctx, genObj);

    // Verify the retry callback is passed as the third argument
    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.error' && c[1] === 'error',
    );
    expect(toastCall).toBeTruthy();
    expect(typeof toastCall![2]).toBe('function');
  });

  it('error response retry callback invokes generateVoice again', async () => {
    // First call fails
    mockFetchFail(500, { error: 'TTS unavailable' });
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
      _audioUrl_intro: null as string | null,
    });
    await gen.generateVoice.call(ctx, genObj);

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.error' && c[1] === 'error',
    );
    const retryFn = toastCall![2];

    // Second call succeeds (batch)
    mockFetchOk({ audioUrls: { intro: '/audio/retry.mp3' } });
    await retryFn();
    expect(genObj._audioUrl_intro).toBe('/audio/retry.mp3');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.audioDone', 'success');
  });

  it('network exception retry callback invokes generateVoice again', async () => {
    // First call throws network error
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network fail'));
    const ctx = makeContext();
    const genObj = asGenerationUI({
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    });
    await gen.generateVoice.call(ctx, genObj);

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.audioError' && c[1] === 'error',
    );
    expect(toastCall).toBeTruthy();
    const retryFn = toastCall![2];

    // Retry succeeds (batch)
    mockFetchOk({ audioUrls: { intro: '/audio/retry2.mp3' } });
    await retryFn();
    expect(genObj._audioUrl_intro).toBe('/audio/retry2.mp3');
  });
});

// La lecture à voix haute est enregistrée dans la génération par le serveur (relue à l'ouverture
// du cours) : sa réponse ne s'applique qu'au cours affiché, sur l'objet génération à jour.
describe('generateVoice — cours changé pendant la lecture', () => {
  const summary = () =>
    asGenerationUI({ id: 'g1', type: 'summary', data: {} as any, _generatingVoice_all: false });

  it('autre cours affiché : ni audio, ni coût, ni toast sur l’écran affiché', async () => {
    const ctx = makeContext();
    const genObj = summary();
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      ctx.currentProjectId = 'pid-2';
      return { ok: true, json: async () => ({ audioUrl: '/a.mp3', costDelta: 0.02 }) } as any;
    });

    await gen.generateVoice.call(ctx, genObj);

    expect(genObj._audioUrl_all).toBeUndefined();
    expect(ctx.currentProject.totalCost).toBe(0);
    expect(ctx.showToast).not.toHaveBeenCalled();
    expect(genObj._generatingVoice_all).toBe(false);
  });

  it('refus ou panne alors qu’un autre cours est affiché : aucun toast', async () => {
    const ctx = makeContext();
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      ctx.currentProjectId = 'pid-2';
      throw new Error('network');
    });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await gen.generateVoice.call(ctx, summary());

    expect(ctx.showToast).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('retour sur le cours : audio posé sur la génération relue, nouveau clic sans 2e requête', async () => {
    const ctx = makeContext();
    const before = summary();
    const after = summary(); // même génération, relue du serveur au retour sur le cours
    let respond!: (value: unknown) => void;
    vi.mocked(globalThis.fetch).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          respond = resolve;
        }) as any,
    );

    const reading = gen.generateVoice.call(ctx, before);
    ctx.generations = [after];
    await gen.generateVoice.call(ctx, after); // clic sur l'objet neuf pendant la lecture
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(after._generatingVoice_all).toBe(true);

    respond({ ok: true, json: async () => ({ audioUrl: '/a.mp3' }) });
    await reading;

    expect(after._audioUrl_all).toBe('/a.mp3');
    expect(after._generatingVoice_all).toBe(false);
    expect(before._generatingVoice_all).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.audioDone', 'success');
  });
});

describe('isBatchComplete', () => {
  it('returns false when no audio at all', () => {
    const genObj = asGenerationUI({ data: { fun_fact: 'fact', vocabulary: ['word'] } });
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns false when only intro exists', () => {
    const genObj = asGenerationUI({
      _audioUrl_intro: '/a.mp3',
      data: { fun_fact: 'fact', vocabulary: ['word'] },
    });
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns true when all required sections have audio (no optional)', () => {
    const genObj = asGenerationUI({
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: {},
    });
    expect(gen.isBatchComplete(genObj)).toBe(true);
  });

  it('returns false when fun_fact content exists but no audio', () => {
    const genObj = asGenerationUI({
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: { fun_fact: 'Wow!' },
    });
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns false when vocabulary content exists but no audio', () => {
    const genObj = asGenerationUI({
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: { vocabulary: ['w'] },
    });
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns true when all sections including optionals have audio', () => {
    const genObj = asGenerationUI({
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      _audioUrl_fun_fact: '/c.mp3',
      _audioUrl_vocabulary: '/d.mp3',
      data: { fun_fact: 'Wow!', vocabulary: ['w'] },
    });
    expect(gen.isBatchComplete(genObj)).toBe(true);
  });

  it('ignores empty vocabulary array', () => {
    const genObj = asGenerationUI({
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: { vocabulary: [] },
    });
    expect(gen.isBatchComplete(genObj)).toBe(true);
  });
});

describe('playNextSection', () => {
  it('advances from intro to key_points', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = asGenerationUI({
      id: 'g1',
      _playlistMode: true,
      _activeAudioSection: 'intro',
      _audioUrl_key_points: '/kp.mp3',
    });
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._activeAudioSection).toBe('key_points');
  });

  it('skips sections without audio URL', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = asGenerationUI({
      id: 'g1',
      _playlistMode: true,
      _activeAudioSection: 'intro',
      _audioUrl_vocabulary: '/vocab.mp3',
      // no key_points or fun_fact audio
    });
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._activeAudioSection).toBe('vocabulary');
  });

  it('disables playlist at the end', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = asGenerationUI({
      id: 'g1',
      _playlistMode: true,
      _activeAudioSection: 'vocabulary',
    });
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._playlistMode).toBe(false);
  });

  it('does nothing when playlist mode is off', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = asGenerationUI({
      id: 'g1',
      _playlistMode: false,
      _activeAudioSection: 'intro',
      _audioUrl_key_points: '/kp.mp3',
    });
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._activeAudioSection).toBe('intro');
  });
});

// Coût d'une génération compté une fois dans l'onglet, que l'événement SSE `completed` (souvent
// reçu avant la réponse) ou la réponse 200 arrive en premier.
describe('registerGeneration — coût compté une fois', () => {
  const gen = () => ({ id: 'g-cost', type: 'quiz', data: [], estimatedCost: 0.004 }) as any;

  it('réponse 200 seule : coût ajouté', () => {
    const ctx: any = makeContext({ initGenProps: vi.fn() });
    registerGeneration(ctx, gen());
    expect(ctx.currentProject.totalCost).toBeCloseTo(0.004);
  });

  it('réponse 200 après l’événement SSE (génération déjà présente) : pas de second ajout', () => {
    const ctx: any = makeContext({ initGenProps: vi.fn() });
    ctx.generations.push(gen());
    registerGeneration(ctx, gen());
    expect(ctx.currentProject.totalCost).toBe(0);
    expect(ctx.generations).toHaveLength(1);
  });
});
