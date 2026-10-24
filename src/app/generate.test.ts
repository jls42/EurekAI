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
import { createGenerate } from './generate';
import { setKey, _resetActiveKey } from './api-key';
import { createSession } from './session';
import { createConfirm } from './confirm';
import { abortAutoRun, restoreAutoAnalysis } from './auto-runs';
import { _resetLongRequestSlots, longRequestSlots, withLongRequestSlot } from './request-slots';

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
    loading: { ...defaultLoading },
    abortControllers: {},
    abortControllersByGid: {},
    pendingById: {},
    launchingByType: {},
    autoRuns: {} as Record<string, any>,
    shownToastEventKeys: new Set<string>(),
    notificationsVersion: 0,
    upsertGenerationById(gen: any) {
      const idx = this.generations.findIndex((g: any) => g.id === gen.id);
      if (idx === -1) this.generations.push(gen);
      else this.generations[idx] = gen;
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

  it('generateAuto : vérification avant l’analyse de route', async () => {
    const ctx = makeContext({
      currentProfile: moderatedProfile,
      sources: [{ id: 's1', moderation: { status: 'error', categories: {} } }],
      apiStatus: { ttsAvailable: false },
    });
    let autoLoadingDuringVerification: unknown;
    mockVerification('safe', () => {
      autoLoadingDuringVerification = ctx.loading.auto;
    });
    mockFetchOk({ plan: [{ agent: 'summary', reason: 'r' }] });
    mockFetchOk({ id: 'g1', type: 'summary' });

    await gen.generateAuto.call(ctx);

    expect(urls()).toEqual([
      '/api/projects/pid-1/sources/moderate',
      '/api/projects/pid-1/generate/route',
      '/api/projects/pid-1/generate/summary',
    ]);
    expect(autoLoadingDuringVerification).toBe(false);
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

describe('generateAuto', () => {
  it('fetches route then launches individual generations', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'test' },
        { agent: 'quiz', reason: 'test' },
      ],
      context: 'test context',
    };
    // Phase 1: route analysis
    mockFetchOk(routeResult);
    // Phase 2: individual generations
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchOk({ id: 'g2', type: 'quiz' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    const callUrls = vi.mocked(globalThis.fetch).mock.calls.map((c) => c[0]);
    expect(callUrls[0]).toContain('/generate/route');
    expect(callUrls[1]).toContain('/generate/summary');
    expect(callUrls[2]).toContain('/generate/quiz');
    expect(ctx.generations).toHaveLength(2);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.magicDone',
      'success',
      null,
      expect.objectContaining({ label: 'toast.view' }),
    );
    expect(ctx.loading.auto).toBe(false);
  });

  it('handles fetch error', async () => {
    mockFetchFail(500, { error: 'fail' });
    const ctx = makeContext();
    await gen.generateAuto.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error', expect.any(Function));
    expect(ctx.loading.auto).toBe(false);
  });

  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await gen.generateAuto.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('shows moderation toast if blocked', async () => {
    const ctx = makeContext({
      currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
      sources: [{ id: 's1', moderation: { status: 'unsafe' } }],
    });
    await gen.generateAuto.call(ctx);
    expect(ctx.showToast).toHaveBeenCalledWith('moderation.blocked', 'error');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('shows partial toast when some individual generations fail', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'test' },
        { agent: 'quiz', reason: 'test' },
        { agent: 'flashcards', reason: 'test' },
      ],
      context: 'test context',
    };
    // Phase 1: route
    mockFetchOk(routeResult);
    // Phase 2: 1 success, 2 failures
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchFail(500, { error: 'fail' });
    mockFetchFail(500, { error: 'fail' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    expect(ctx.generations).toHaveLength(1);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.partialGenerated', 'warning');
  });

  it('shows all-error toast when every individual generation fails', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'test' },
        { agent: 'quiz', reason: 'test' },
      ],
      context: 'test context',
    };
    // Phase 1: route
    mockFetchOk(routeResult);
    // Phase 2: all failures
    mockFetchFail(500, { error: 'fail' });
    mockFetchFail(500, { error: 'fail' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    expect(ctx.generations).toHaveLength(0);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.generationError', 'error');
  });

  it('shows autoError toast on non-AbortError exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network crash'));
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoError', 'error', expect.any(Function));
    expect(ctx.loading.auto).toBe(false);
  });

  it('ignores AbortError exception silently', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(abortError);
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    expect(ctx.showToast).not.toHaveBeenCalled();
    expect(ctx.loading.auto).toBe(false);
  });

  it('passes eventKey on per-step toast for SSE/HTTP idempotence', async () => {
    // Fix 4 : runAutoStep doit passer `generation:${gen.id}:completed` comme
    // eventKey à showToast. Idempotent avec l'event SSE 'completed' qui passe
    // le même eventKey via applyGenerationEvent → notif persistée et toast UI
    // dédupés. Sans ça, l'utilisateur verrait 2 toasts par génération auto.
    const routeResult = {
      plan: [{ agent: 'summary', reason: 'test' }],
      context: 'test context',
    };
    mockFetchOk(routeResult);
    mockFetchOk({ id: 'gen-summary-1', type: 'summary' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    const successCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[1] === 'success' && c[0] === 'toast.generationDone',
    );
    expect(successCall).toBeDefined();
    // Signature : (message, type, retryFn, action, eventKey)
    expect(successCall![4]).toBe('generation:gen-summary-1:completed');
  });

  it('emits distinct eventKeys across multi-step auto plan', async () => {
    // Régression : si un refactor cachait gen.id (closure capture) entre les
    // itérations de plan, les 2 toasts auraient le même eventKey et le 2e
    // serait dédupé via shownToastEventKeys → user voit 1 toast au lieu de 2.
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'a' },
        { agent: 'quiz', reason: 'b' },
      ],
      context: 'ctx',
    };
    mockFetchOk(routeResult);
    mockFetchOk({ id: 'gen-summary-1', type: 'summary' });
    mockFetchOk({ id: 'gen-quiz-2', type: 'quiz' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    const successCalls = ctx.showToast.mock.calls.filter(
      (c: any[]) => c[1] === 'success' && c[0] === 'toast.generationDone',
    );
    expect(successCalls).toHaveLength(2);
    const eventKeys = successCalls.map((c: any[]) => c[4]).sort();
    expect(eventKeys).toEqual([
      'generation:gen-quiz-2:completed',
      'generation:gen-summary-1:completed',
    ]);
  });

  it('logs error code from non-JSON failure body (raw text snippet)', async () => {
    // Fix : si le body !ok n'est pas JSON (HTML 502 proxy / plain-text upstream),
    // res.json().catch(()=>({})) jetait le body silencieusement. Désormais on lit
    // le body en text() et on log un snippet pour ne pas perdre le diagnostic.
    const routeResult = { plan: [{ agent: 'summary', reason: 'a' }], context: '' };
    mockFetchOk(routeResult);
    // Step request returns non-ok with non-JSON body
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      status: 502,
      statusText: 'Bad Gateway',
      text: () => Promise.resolve('<html>upstream timeout</html>'),
      json: () => Promise.reject(new Error('not json')),
    } as any);
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    const matched = errSpy.mock.calls.some(
      (c) =>
        String(c[0]).includes('summary failed (502)') && String(c[1]).includes('upstream timeout'),
    );
    expect(matched).toBe(true);
    errSpy.mockRestore();
  });
});

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
});

describe('generateAuto — additional coverage', () => {
  it('skips TTS types (podcast, quiz-vocal) when ttsAvailable is false', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'overview' },
        { agent: 'podcast', reason: 'audio' },
        { agent: 'quiz-vocal', reason: 'vocal quiz' },
      ],
      context: 'test context',
    };
    // Phase 1: route analysis
    mockFetchOk(routeResult);
    // Phase 2: only summary should be launched (podcast + quiz-vocal skipped)
    mockFetchOk({ id: 'g1', type: 'summary' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    // Should only have 2 fetch calls: route + summary (not podcast or quiz-vocal)
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    const callUrls = vi.mocked(globalThis.fetch).mock.calls.map((c) => c[0]);
    expect(callUrls[0]).toContain('/generate/route');
    expect(callUrls[1]).toContain('/generate/summary');
    expect(ctx.generations).toHaveLength(1);
    // Loading for podcast and quiz-vocal should never have been set
    expect(ctx.loading.podcast).toBe(false);
    expect(ctx.loading['quiz-vocal']).toBe(false);
  });

  // La dictée lit chaque mot en audio (TTS) : sans TTS, l'auto l'écarte comme le podcast.
  it('écarte aussi la dictée quand le TTS est indisponible', async () => {
    mockFetchOk({
      plan: [
        { agent: 'summary', reason: 'overview' },
        { agent: 'dictation', reason: 'words' },
      ],
      context: 'test context',
    });
    mockFetchOk({ id: 'g1', type: 'summary' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    const callUrls = vi.mocked(globalThis.fetch).mock.calls.map((c) => c[0]);
    expect(callUrls).toHaveLength(2);
    expect(callUrls[1]).toContain('/generate/summary');
    expect(ctx.loading.dictation).toBe(false);
  });

  it('does NOT skip TTS types when ttsAvailable is true', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'overview' },
        { agent: 'podcast', reason: 'audio' },
      ],
      context: 'test context',
    };
    mockFetchOk(routeResult);
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchOk({ id: 'g2', type: 'podcast' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: true } });
    await gen.generateAuto.call(ctx);

    // Should have 3 fetch calls: route + summary + podcast
    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    expect(ctx.generations).toHaveLength(2);
  });

  it('success toast action navigates to dashboard', async () => {
    const routeResult = {
      plan: [{ agent: 'summary', reason: 'test' }],
      context: 'test context',
    };
    mockFetchOk(routeResult);
    mockFetchOk({ id: 'g1', type: 'summary' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    // Extract the action object from the success toast call
    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.magicDone' && c[1] === 'success',
    );
    expect(toastCall).toBeTruthy();
    const action = toastCall![3];
    expect(action).toBeDefined();
    expect(typeof action.fn).toBe('function');

    // Invoke the callback and verify it navigates to dashboard
    action.fn();
    expect(ctx.goToView).toHaveBeenCalledWith('dashboard');
  });

  it('autoError retry callback calls generateAuto again', async () => {
    // First call: network crash
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network crash'));
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    const toastCall = ctx.showToast.mock.calls.find(
      (c: any[]) => c[0] === 'toast.autoError' && c[1] === 'error',
    );
    expect(toastCall).toBeTruthy();
    const retryFn = toastCall![2];
    expect(typeof retryFn).toBe('function');

    // Mock successful retry
    const routeResult = {
      plan: [{ agent: 'summary', reason: 'test' }],
      context: 'ctx',
    };
    mockFetchOk(routeResult);
    mockFetchOk({ id: 'g1', type: 'summary' });

    await retryFn();
    expect(ctx.generations).toHaveLength(1);
  });
});

describe('generateAuto — per-type progress', () => {
  it('shows per-type toast with view action as each generation completes', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'test' },
        { agent: 'quiz', reason: 'test' },
      ],
      context: 'test context',
    };
    mockFetchOk(routeResult);
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchOk({ id: 'g2', type: 'quiz' });

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    // Each successful type gets its own toast with view action
    const doneCalls = ctx.showToast.mock.calls.filter(
      (c: any[]) => c[0] === 'toast.generationDone' && c[1] === 'success',
    );
    expect(doneCalls).toHaveLength(2);
    expect(doneCalls[0][3]).toHaveProperty('fn');
    expect(doneCalls[0][3]).toHaveProperty('label', 'toast.view');
  });

  it('handles individual generation network error without crashing', async () => {
    const routeResult = {
      plan: [
        { agent: 'summary', reason: 'test' },
        { agent: 'quiz', reason: 'test' },
      ],
      context: 'test context',
    };
    mockFetchOk(routeResult);
    // summary succeeds, quiz throws network error
    mockFetchOk({ id: 'g1', type: 'summary' });
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network down'));

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    expect(ctx.generations).toHaveLength(1);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.partialGenerated', 'warning');
  });

  it('ignores AbortError on individual generation', async () => {
    const routeResult = {
      plan: [{ agent: 'summary', reason: 'test' }],
      context: 'test context',
    };
    mockFetchOk(routeResult);
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new DOMException('Aborted', 'AbortError'));

    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    await gen.generateAuto.call(ctx);

    // AbortError should not count as failure — final toast is magicDone (0 failures)
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.magicDone',
      'success',
      null,
      expect.objectContaining({ label: 'toast.view' }),
    );
  });

  it('skips result if project switched during generation', async () => {
    const routeResult = {
      plan: [{ agent: 'summary', reason: 'test' }],
      context: 'test context',
    };
    // Phase 1: route succeeds normally
    mockFetchOk(routeResult);
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    // Phase 2: individual generation — project switches during fetch
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      ctx.currentProjectId = 'different-project';
      return { ok: true, json: async () => ({ id: 'g1', type: 'summary' }) } as any;
    });

    await gen.generateAuto.call(ctx);

    // Generation should NOT be registered since project switched
    expect(ctx.generations).toHaveLength(0);
    // Ajouté le 2026-10-21 : l'étape réussie compte (l'Auto continue vers son cours) et la fin est
    // annoncée par un toast qui nomme ce cours, au lieu de s'arrêter sans un mot.
    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoDoneIn', 'success');
    expect(ctx.t).toHaveBeenCalledWith('toast.autoDoneIn', { project: 'Histoire' });
  });
});

// Réponse qui n'arrive jamais, rejetée en AbortError quand son signal est aborté (vrai fetch).
const pendingUntilAbort = (_url: unknown, init?: RequestInit) =>
  new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => {
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

// Règle du propriétaire (2026-10-21) : « on lance un truc, ça continue même si on change de page ».
// Jusqu'en v1.7.11, resetSession (changement de cours ou de profil) abortait l'analyse Auto en vol :
// le serveur la facturait et aucune étape ne partait.
describe('generateAuto — continue vers son cours quand on change de cours ou de profil', () => {
  const session = createSession();
  const confirm = createConfirm();
  const urls = () => vi.mocked(globalThis.fetch).mock.calls.map((c) => String(c[0]));
  const sentBody = (call: number) =>
    JSON.parse((vi.mocked(globalThis.fetch).mock.calls[call][1] as RequestInit).body as string);
  // Changement de cours tel que selectProject le fait (resetSession, puis le cours suivant).
  const switchCourse = (ctx: any, projectId: string | null) => {
    ctx.currentProjectId = projectId;
    session.resetSession.call(ctx);
  };
  const plan = (...agents: string[]) => ({ plan: agents.map((agent) => ({ agent })) });

  it('cours changé pendant l’analyse : rien n’est annulé, étapes vers le cours d’origine avec le corps et la clé du clic, toast final qui le nomme', async () => {
    await activateKey('sk-profil-a');
    const ctx = makeContext({
      apiStatus: { ttsAvailable: false },
      selectedIds: ['s1'],
      generateCount: 20,
    });
    let routeSignal: AbortSignal | null | undefined;
    vi.mocked(globalThis.fetch).mockImplementationOnce(async (_url, init) => {
      routeSignal = init?.signal;
      switchCourse(ctx, 'pid-2');
      ctx.selectedIds = [];
      await activateKey('sk-profil-b');
      return {
        ok: true,
        json: async () => ({ ...plan('summary', 'quiz'), costDelta: 0.01 }),
      } as any;
    });
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchOk({ id: 'g2', type: 'quiz' });

    await gen.generateAuto.call(ctx);

    expect(routeSignal?.aborted).toBe(false);
    expect(urls()).toEqual([
      '/api/projects/pid-1/generate/route',
      '/api/projects/pid-1/generate/summary',
      '/api/projects/pid-1/generate/quiz',
    ]);
    expect([sentKey(0), sentKey(1), sentKey(2)]).toEqual([
      'sk-profil-a',
      'sk-profil-a',
      'sk-profil-a',
    ]);
    expect(sentBody(1)).toMatchObject({ sourceIds: ['s1'], count: 20 });
    // Rien sur l'écran du cours affiché : ni générations, ni chargement, ni coût, ni toast d'étape.
    expect(ctx.generations).toEqual([]);
    expect([ctx.loading.auto, ctx.loading.summary, ctx.loading.quiz]).toEqual([
      false,
      false,
      false,
    ]);
    expect(ctx.currentProject.totalCost).toBe(0);
    const stepToasts = ctx.showToast.mock.calls.filter(
      (c: any[]) => c[0] === 'toast.generationDone',
    );
    expect(stepToasts).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoDoneIn', 'success');
    expect(ctx.t).toHaveBeenCalledWith('toast.autoDoneIn', { project: 'Histoire' });
    expect(ctx.autoRuns).toEqual({});
  });

  it('cours changé pendant une étape : l’étape n’est pas annulée, l’état du cours affiché reste intact', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    mockFetchOk(plan('summary'));
    let stepSignal: AbortSignal | null | undefined;
    vi.mocked(globalThis.fetch).mockImplementationOnce(async (_url, init) => {
      stepSignal = init?.signal;
      switchCourse(ctx, 'pid-2');
      // Le cours pid-2 a sa propre fiche en cours : la fin de l'étape de pid-1 n'y touche pas.
      ctx.loading.summary = true;
      return { ok: true, json: async () => ({ id: 'g1', type: 'summary' }) } as any;
    });

    await gen.generateAuto.call(ctx);

    expect(stepSignal?.aborted).toBe(false);
    expect(ctx.loading.summary).toBe(true);
    expect(ctx.generations).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoDoneIn', 'success');
  });

  it('cours changé pendant la vérification de modération : l’analyse part vers le cours d’origine', async () => {
    const ctx = makeContext({
      currentProfile: { id: 'p1', ageGroup: 'enfant', useModeration: true },
      sources: [{ id: 's1', moderation: { status: 'pending', categories: {} } }],
      apiStatus: { ttsAvailable: false },
    });
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      switchCourse(ctx, 'pid-2');
      const moderation = { status: 'safe', categories: {} };
      return { ok: true, json: async () => ({ sources: [{ id: 's1', moderation }] }) } as any;
    });
    mockFetchOk(plan('summary'));
    mockFetchOk({ id: 'g1', type: 'summary' });

    await gen.generateAuto.call(ctx);

    expect(urls()).toEqual([
      '/api/projects/pid-1/sources/moderate',
      '/api/projects/pid-1/generate/route',
      '/api/projects/pid-1/generate/summary',
    ]);
    expect(ctx.loading.auto).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoDoneIn', 'success');
  });

  it('échec de l’analyse hors écran : toast qui nomme le cours, sans « Réessayer »', async () => {
    const ctx = makeContext();
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      switchCourse(ctx, 'pid-2');
      return { ok: false, status: 503, statusText: 'Error', json: async () => ({}) } as any;
    });

    await gen.generateAuto.call(ctx);

    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoFailedIn', 'error');
    expect(ctx.t).toHaveBeenCalledWith('toast.autoFailedIn', { project: 'Histoire' });
    expect(ctx.showToast).not.toHaveBeenCalledWith('toast.error', 'error', expect.any(Function));
  });

  it('étapes en partie en échec hors écran : toast partiel qui nomme le cours', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    vi.mocked(globalThis.fetch).mockImplementationOnce(async () => {
      switchCourse(ctx, 'pid-2');
      return { ok: true, json: async () => plan('summary', 'quiz') } as any;
    });
    mockFetchOk({ id: 'g1', type: 'summary' });
    mockFetchFail(500, { error: 'internal_error' });

    await gen.generateAuto.call(ctx);

    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoPartialIn', 'warning');
    expect(ctx.t).toHaveBeenCalledWith('toast.autoPartialIn', {
      project: 'Histoire',
      count: 1,
      total: 2,
    });
  });

  it('retour sur le cours pendant l’analyse : puce rétablie, cancelOne(auto) l’annule (aucune étape)', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    vi.mocked(globalThis.fetch).mockImplementationOnce(pendingUntilAbort);
    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
    expect(ctx.loading.auto).toBe(true);

    switchCourse(ctx, 'pid-2');
    expect(ctx.loading.auto).toBe(false);
    switchCourse(ctx, 'pid-1');
    restoreAutoAnalysis(ctx, 'pid-1'); // comme applyProjectSnapshot au retour
    expect(ctx.loading.auto).toBe(true);
    confirm.cancelOne.call(ctx, 'auto');
    await run;

    expect(urls()).toEqual(['/api/projects/pid-1/generate/route']);
    expect(ctx.loading.auto).toBe(false);
    expect(ctx.autoRuns).toEqual({});
    expect(ctx.showToast).not.toHaveBeenCalledWith('toast.autoFailedIn', 'error');
  });

  it('un second clic Auto sur le même cours pendant qu’il tourne est sans effet', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    vi.mocked(globalThis.fetch).mockImplementationOnce(pendingUntilAbort);
    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    await gen.generateAuto.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    ctx.autoRuns['pid-1'].controller.abort();
    await run;
  });

  it('cours supprimé pendant l’analyse : Auto arrêté, ni étape ni toast', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    vi.mocked(globalThis.fetch).mockImplementationOnce(pendingUntilAbort);
    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));

    switchCourse(ctx, null);
    abortAutoRun(ctx, 'pid-1'); // comme deleteProject
    await run;

    expect(urls()).toEqual(['/api/projects/pid-1/generate/route']);
    expect(ctx.showToast).not.toHaveBeenCalled();
    expect(ctx.autoRuns).toEqual({});
  });
});

// Serveur en HTTP/1.1 : le navigateur n'ouvre que 6 connexions par hôte, dont une pour le flux SSE.
// Les 8 étapes d'un Auto, lancées ensemble, faisaient attendre l'ouverture d'un autre cours 10 à
// 15 s (release-test du 2026-10-21) ; limitées ensuite à 4 par Auto, deux Auto (deux cours) en
// envoyaient encore 8 et bloquaient le chargement de chaque cours ouvert (mesuré le 2026-10-21 chez
// le propriétaire). Limite GLOBALE (request-slots.ts) : au plus 3 requêtes longues pour tout
// l'onglet, étapes Auto et générations simples confondues ; les suivantes dès qu'une se termine.
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
  const planUrls = (projectId: string) =>
    allAgents.map((type) => `/api/projects/${projectId}/generate/${type}`);
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

  it('un Auto de 8 étapes : jamais plus de 3 requêtes à la fois, chaque fin en libère une, toutes partent dans l’ordre', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: true } });
    const held = holdGenerations();

    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(3));
    await nextMacrotask();
    expect(stepUrls()).toHaveLength(3); // les 5 suivantes attendent qu'une étape se termine
    for (let started = 4; started <= allAgents.length; started++) {
      held.finishOldest();
      await vi.waitFor(() => expect(stepUrls()).toHaveLength(started));
    }
    for (const finish of held.finishers.splice(0)) finish();
    await run;

    expect(held.stats.max).toBe(3);
    expect(stepUrls()).toEqual(planUrls('pid-1'));
    expect(ctx.generations).toHaveLength(allAgents.length);
    expect(allAgents.map((type) => ctx.loading[type])).toEqual(allAgents.map(() => false));
    expect(ctx.autoRuns).toEqual({});
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.magicDone',
      'success',
      null,
      expect.objectContaining({ label: 'toast.view' }),
    );
  });

  it('deux Auto de 8 étapes (deux cours) et deux générations simples : jamais plus de 3 requêtes à la fois, toutes partent, chaque Auto dans l’ordre de son plan', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: true } });
    const held = holdGenerations();
    const autoSteps = (projectId: string) =>
      sentGenerations()
        .filter((g) => !g.gid && g.url.startsWith(`/api/projects/${projectId}/`))
        .map((g) => g.url);

    const autoA = gen.generateAuto.call(ctx); // cours pid-1
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(3));
    switchCourse(ctx, 'pid-2'); // l'Auto du cours pid-1 continue
    const autoB = gen.generateAuto.call(ctx);
    const singles = [gen.generate.call(ctx, 'summary'), gen.generate.call(ctx, 'quiz')];
    // 3 étapes de pid-1 en vol ; en file : les 2 générations simples et une étape par voie de pid-2.
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 5 }));

    const total = 2 * allAgents.length + singles.length;
    while (held.finishers.length > 0) {
      const started = stepUrls().length;
      held.finishOldest();
      if (started < total) await vi.waitFor(() => expect(stepUrls()).toHaveLength(started + 1));
    }
    await Promise.all([autoA, autoB, ...singles]);

    expect(held.stats.max).toBe(3);
    expect(stepUrls()).toHaveLength(total);
    expect(autoSteps('pid-1')).toEqual(planUrls('pid-1'));
    expect(autoSteps('pid-2')).toEqual(planUrls('pid-2'));
    expect(sentGenerations().filter((g) => g.gid)).toEqual([
      { url: '/api/projects/pid-2/generate/summary', gid: expect.any(String) },
      { url: '/api/projects/pid-2/generate/quiz', gid: expect.any(String) },
    ]);
    // Les autres passent entre les étapes du 1er Auto, sans attendre qu'elles soient toutes parties.
    const lastStepOfA = stepUrls().lastIndexOf(planUrls('pid-1').at(-1)!);
    expect(stepUrls().findIndex((url) => url.startsWith('/api/projects/pid-2/'))).toBeLessThan(
      lastStepOfA,
    );
    expect(sentGenerations().findIndex((g) => g.gid)).toBeLessThan(lastStepOfA);
    // Cours affiché (pid-2) : ses étapes et ses deux générations ; l'Auto de pid-1 annonce sa fin.
    expect(ctx.generations).toHaveLength(allAgents.length + singles.length);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.autoDoneIn', 'success');
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.magicDone',
      'success',
      null,
      expect.objectContaining({ label: 'toast.view' }),
    );
    expect(ctx.autoRuns).toEqual({});
  });

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

  // Déjà envoyée : resetSession aborte son fetch (connexion libérée), le serveur la termine et
  // l'enregistre. La renvoyer en ferait une seconde.
  it('génération déjà partie puis cours quitté : pas renvoyée, sa place est rendue', async () => {
    const ctx = makeContext();
    holdGenerations();
    const run = gen.generate.call(ctx, 'summary');
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(1));
    const signal = vi.mocked(globalThis.fetch).mock.calls[0][1]?.signal;

    switchCourse(ctx, 'pid-2');
    await run;
    await nextMacrotask();

    expect(signal?.aborted).toBe(true);
    expect(stepUrls()).toEqual(['/api/projects/pid-1/generate/summary']);
    expect(longRequestSlots()).toEqual({ inFlight: 0, waiting: 0 });
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

  it('Auto annulé (« Tout annuler ») pendant que ses étapes attendent leur place : elles sortent de la file sans partir', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: true } });
    holdGenerations();
    const others = occupySlots(3);
    const run = gen.generateAuto.call(ctx);
    // Une étape par voie de l'Auto, en file derrière les 3 places prises.
    await vi.waitFor(() => expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 3 }));

    confirm.cancelGeneration.call(ctx);
    await run;

    expect(longRequestSlots()).toEqual({ inFlight: 3, waiting: 0 });
    expect(stepUrls()).toEqual([]);
    expect(ctx.generations).toEqual([]);
    expect(allAgents.map((type) => ctx.loading[type])).toEqual(allAgents.map(() => false));
    expect(ctx.autoRuns).toEqual({});
    await others.free();
  });

  it('annulation (« Tout annuler ») : les 3 étapes en vol sont abortées, celles en file ne partent pas', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: true } });
    const signals: AbortSignal[] = [];
    vi.mocked(globalThis.fetch).mockImplementation(async (url, init) => {
      if (isRoute(url)) return routeReply();
      if (init?.signal) signals.push(init.signal);
      return pendingUntilAbort(url, init);
    });

    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(3));
    confirm.cancelGeneration.call(ctx);
    await run;

    expect(signals.map((signal) => signal.aborted)).toEqual([true, true, true]);
    expect(stepUrls()).toEqual(planUrls('pid-1').slice(0, 3));
    expect(ctx.generations).toEqual([]);
    expect(allAgents.map((type) => ctx.loading[type])).toEqual(allAgents.map(() => false));
    expect(ctx.autoRuns).toEqual({});
    // Seul le toast d'annulation : « Magie terminée ! » le suivait (release-test du 2026-10-22).
    expect(ctx.showToast.mock.calls.map((call: any[]) => call[0])).toEqual([
      'toast.cancelledGeneration',
    ]);
  });

  it('retour sur le cours pendant les étapes de son Auto : « Tout annuler » arrête aussi celles en file', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: true } });
    const held = holdGenerations();
    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(3));
    switchCourse(ctx, 'pid-2');
    switchCourse(ctx, 'pid-1'); // retour : le contrôleur de l'Auto n'est plus dans abortControllers

    confirm.cancelGeneration.call(ctx);
    // Sans l'arrêt de l'Auto, chaque étape en vol qui se termine libérait sa voie, et l'étape
    // suivante partait (vécu à la recette du 2026-10-21 : un texte à trous généré après l'annulation).
    for (const finish of held.finishers.splice(0)) finish();
    await nextMacrotask();
    expect(stepUrls()).toEqual(planUrls('pid-1').slice(0, 3));

    await run;
    expect(ctx.generations).toEqual([]);
    expect(ctx.autoRuns).toEqual({});
    expect(ctx.showToast.mock.calls.map((call: any[]) => call[0])).toEqual([
      'toast.cancelledGeneration',
    ]);
  });

  it('moins de 3 étapes : toutes partent ensemble, sans attendre', async () => {
    const ctx = makeContext({ apiStatus: { ttsAvailable: false } });
    vi.mocked(globalThis.fetch).mockImplementation(async (url, init) => {
      if (isRoute(url)) {
        return {
          ok: true,
          json: async () => ({ plan: [{ agent: 'summary' }, { agent: 'quiz' }] }),
        } as any;
      }
      return pendingUntilAbort(url, init);
    });

    const run = gen.generateAuto.call(ctx);
    await vi.waitFor(() => expect(stepUrls()).toHaveLength(2));
    ctx.autoRuns['pid-1'].controller.abort();
    await run;

    expect(stepUrls()).toEqual([
      '/api/projects/pid-1/generate/summary',
      '/api/projects/pid-1/generate/quiz',
    ]);
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
