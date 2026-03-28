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
    blockedModerationStatus: gen.blockedModerationStatus,
    moderationBlockedMessage: gen.moderationBlockedMessage,
    generate: gen.generate,
    generateAll: gen.generateAll,
    generateAuto: gen.generateAuto,
    generateVoice: gen.generateVoice,
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
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.error',
      'error',
      expect.any(Function),
    );
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
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.partialGenerated',
      'warning',
    );
    expect(ctx.loading.all).toBe(false);
  });

  it('shows all-error toast when all fail', async () => {
    mockFetchFail(500, {});
    mockFetchFail(500, {});
    mockFetchFail(500, {});
    const ctx = makeContext();
    await gen.generateAll.call(ctx);
    expect(ctx.generations).toHaveLength(0);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.generationError',
      'error',
    );
  });

  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await gen.generateAll.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
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
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.error',
      'error',
      expect.any(Function),
    );
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
});

// --- generateVoice ---

describe('generateVoice', () => {
  it('fetches read-aloud and sets audioUrl on success', async () => {
    mockFetchOk({ audioUrl: '/audio/gen1.mp3' });
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'summary', data: {} as any, _generatingVoice: false, _audioUrl: null as string | null };

    await gen.generateVoice.call(ctx, genObj);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(genObj.data.audioUrl).toBe('/audio/gen1.mp3');
    expect(genObj._audioUrl).toBe('/audio/gen1.mp3');
    expect(genObj._generatingVoice).toBe(false);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.audioDone', 'success');
  });

  it('returns early if already generating', async () => {
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'summary', data: {}, _generatingVoice: true };
    await gen.generateVoice.call(ctx, genObj);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('handles fetch error', async () => {
    mockFetchFail(500, { error: 'TTS unavailable' });
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'quiz', data: {}, _generatingVoice: false };
    await gen.generateVoice.call(ctx, genObj);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.error',
      'error',
      expect.any(Function),
    );
    expect(genObj._generatingVoice).toBe(false);
  });

  it('handles network exception', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network fail'));
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'quiz', data: {}, _generatingVoice: false };
    await gen.generateVoice.call(ctx, genObj);
    expect(ctx.showToast).toHaveBeenCalledWith(
      'toast.audioError',
      'error',
      expect.any(Function),
    );
    expect(genObj._generatingVoice).toBe(false);
  });

  it('does not set data.audioUrl for non-summary types', async () => {
    mockFetchOk({ audioUrl: '/audio/gen1.mp3' });
    const ctx = makeContext();
    const genObj = { id: 'g1', type: 'quiz', data: {}, _generatingVoice: false, _audioUrl: null as string | null };

    await gen.generateVoice.call(ctx, genObj);
    expect(genObj.data.audioUrl).toBeUndefined();
    expect(genObj._audioUrl).toBe('/audio/gen1.mp3');
  });
});
