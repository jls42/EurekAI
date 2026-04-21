import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGenerate } from './generate';

vi.mock('../i18n/index', () => ({ getLocale: vi.fn(() => 'fr') }));
vi.mock('./helpers', () => ({ normalizeSummaryData: vi.fn() }));

globalThis.fetch = vi.fn();

// Provide document.querySelector for generateVoice's $nextTick callback
if (typeof globalThis.document === 'undefined') {
  (globalThis as any).document = { querySelector: vi.fn(() => null) };
}

const gen = createGenerate();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    currentProfile: { id: 'p1', chatEnabled: true, ageGroup: 'enfant', useModeration: false },
    sources: [],
    generations: [],
    selectedIds: [],
    loading: {
      summary: false,
      flashcards: false,
      quiz: false,
      podcast: false,
      'quiz-vocal': false,
      image: false,
      'fill-blank': false,
      auto: false,
      all: false,
      voice: false,
      websearch: false,
    },
    abortControllers: {},
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
    apiStatus: { mistral: true, ttsAvailable: true },
    generate: gen.generate,
    generateAll: gen.generateAll,
    generateAuto: gen.generateAuto,
    generateVoice: gen.generateVoice,
    _audioSectionOrder: gen._audioSectionOrder,
    playSection: gen.playSection,
    initSummaryAudio: gen.initSummaryAudio,
    isBatchComplete: gen.isBatchComplete,
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

  it('returns null when sources have no moderation field', () => {
    const ctx = makeContext({ sources: [{ id: 's1' }, { id: 's2' }] });
    expect(gen.blockedModerationStatus.call(ctx)).toBeNull();
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
});

// --- moderationBlockedMessage ---

describe('moderationBlockedMessage', () => {
  it('returns pending key for pending status', () => {
    const ctx = makeContext();
    gen.moderationBlockedMessage.call(ctx, 'pending');
    expect(ctx.t).toHaveBeenCalledWith('moderation.pending');
  });

  it('returns error key for error status', () => {
    const ctx = makeContext();
    gen.moderationBlockedMessage.call(ctx, 'error');
    expect(ctx.t).toHaveBeenCalledWith('moderation.error');
  });

  it('returns blocked key for other statuses', () => {
    const ctx = makeContext();
    gen.moderationBlockedMessage.call(ctx, 'unsafe');
    expect(ctx.t).toHaveBeenCalledWith('moderation.blocked');
  });
});

// --- generate ---

describe('generate', () => {
  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await gen.generate.call(ctx, 'summary');
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('returns early if already loading', async () => {
    const ctx = makeContext({ loading: { summary: true } });
    await gen.generate.call(ctx, 'summary');
    expect(globalThis.fetch).not.toHaveBeenCalled();
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
    );
    expect(ctx.loading.summary).toBe(false);
  });

  it('handles fetch error', async () => {
    mockFetchFail(500, { error: 'Server error' });
    const ctx = makeContext();
    await gen.generate.call(ctx, 'summary');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error', expect.any(Function));
    expect(ctx.generations).toHaveLength(0);
    expect(ctx.loading.summary).toBe(false);
  });

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
      (c: any[]) => c[0] === 'toast.error' && c[1] === 'error',
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
  });
});

// --- generateVoice ---

describe('generateVoice', () => {
  it('fetches read-aloud batch and sets section audioUrls on success', async () => {
    mockFetchOk({ audioUrls: { intro: '/audio/intro.mp3', key_points: '/audio/kp.mp3' } });
    const ctx = makeContext();
    const genObj = {
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    } as any;

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
    const genObj = {
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_intro: false,
    } as any;

    await gen.generateVoice.call(ctx, genObj, 'intro');
    expect(genObj._audioUrl_intro).toBe('/audio/intro.mp3');
    expect(genObj._activeAudioSection).toBe('intro');
    expect(genObj._playlistMode).toBe(false);
  });

  it('returns early if already generating', async () => {
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'summary', data: {} as any, _generatingVoice_all: true };
    await gen.generateVoice.call(ctx, genObj);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('handles fetch error', async () => {
    mockFetchFail(500, { error: 'TTS unavailable' });
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'quiz', data: {} as any, _generatingVoice_all: false };
    await gen.generateVoice.call(ctx, genObj);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.error', 'error', expect.any(Function));
    expect(genObj._generatingVoice_all).toBe(false);
  });

  it('handles network exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network fail'));
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'quiz', data: {} as any, _generatingVoice_all: false };
    await gen.generateVoice.call(ctx, genObj);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.audioError', 'error', expect.any(Function));
    expect(genObj._generatingVoice_all).toBe(false);
  });

  it('sets _audioUrl_all for non-summary types (single response)', async () => {
    mockFetchOk({ audioUrl: '/audio/gen1.mp3' });
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'quiz', data: {} as any, _generatingVoice_all: false } as any;

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
    const genObj = {
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    } as any;

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
    const genObj = {
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    } as any;

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
    const genObj = { id: 'g1', type: 'summary', data: {} as any, _generatingVoice_all: false };
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
    const genObj = {
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
      _audioUrl_intro: null as string | null,
    };
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
    const genObj = {
      id: 'g1',
      type: 'summary',
      data: {} as any,
      _generatingVoice_all: false,
    } as any;
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

describe('isBatchComplete', () => {
  it('returns false when no audio at all', () => {
    const genObj = { data: { fun_fact: 'fact', vocabulary: ['word'] } };
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns false when only intro exists', () => {
    const genObj = { _audioUrl_intro: '/a.mp3', data: { fun_fact: 'fact', vocabulary: ['word'] } };
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns true when all required sections have audio (no optional)', () => {
    const genObj = { _audioUrl_intro: '/a.mp3', _audioUrl_key_points: '/b.mp3', data: {} };
    expect(gen.isBatchComplete(genObj)).toBe(true);
  });

  it('returns false when fun_fact content exists but no audio', () => {
    const genObj = {
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: { fun_fact: 'Wow!' },
    };
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns false when vocabulary content exists but no audio', () => {
    const genObj = {
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: { vocabulary: ['w'] },
    };
    expect(gen.isBatchComplete(genObj)).toBe(false);
  });

  it('returns true when all sections including optionals have audio', () => {
    const genObj = {
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      _audioUrl_fun_fact: '/c.mp3',
      _audioUrl_vocabulary: '/d.mp3',
      data: { fun_fact: 'Wow!', vocabulary: ['w'] },
    };
    expect(gen.isBatchComplete(genObj)).toBe(true);
  });

  it('ignores empty vocabulary array', () => {
    const genObj = {
      _audioUrl_intro: '/a.mp3',
      _audioUrl_key_points: '/b.mp3',
      data: { vocabulary: [] },
    };
    expect(gen.isBatchComplete(genObj)).toBe(true);
  });
});

describe('playNextSection', () => {
  it('advances from intro to key_points', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = {
      id: 'g1',
      _playlistMode: true,
      _activeAudioSection: 'intro',
      _audioUrl_key_points: '/kp.mp3',
    };
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._activeAudioSection).toBe('key_points');
  });

  it('skips sections without audio URL', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = {
      id: 'g1',
      _playlistMode: true,
      _activeAudioSection: 'intro',
      _audioUrl_vocabulary: '/vocab.mp3',
      // no key_points or fun_fact audio
    };
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._activeAudioSection).toBe('vocabulary');
  });

  it('disables playlist at the end', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = {
      id: 'g1',
      _playlistMode: true,
      _activeAudioSection: 'vocabulary',
    };
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._playlistMode).toBe(false);
  });

  it('does nothing when playlist mode is off', () => {
    const ctx = makeContext({
      _audioSectionOrder: gen._audioSectionOrder,
      playNextSection: gen.playNextSection,
    });
    const genObj = {
      id: 'g1',
      _playlistMode: false,
      _activeAudioSection: 'intro',
      _audioUrl_key_points: '/kp.mp3',
    };
    gen.playNextSection.call(ctx, genObj);
    expect(genObj._activeAudioSection).toBe('intro');
  });
});
