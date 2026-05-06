import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChat } from './chat';

vi.mock('../i18n/index', () => ({ getLocale: vi.fn(() => 'fr') }));
vi.mock('./helpers', () => ({ normalizeSummaryData: vi.fn() }));

globalThis.fetch = vi.fn();

// Provide window.scrollTo and document.body for scrollChatBottom
if (typeof globalThis.window === 'undefined') {
  (globalThis as any).window = { scrollTo: vi.fn() };
}
if (typeof globalThis.document === 'undefined') {
  (globalThis as any).document = { body: { scrollHeight: 1000 } };
}

const chat = createChat();

function makeContext(overrides: any = {}) {
  return {
    currentProjectId: 'pid-1',
    currentProfile: { id: 'p1', chatEnabled: true, ageGroup: 'enfant', useModeration: false },
    sources: [],
    generations: [],
    selectedIds: [],
    openGens: {} as Record<string, boolean>,
    chatMessages: [] as any[],
    chatInput: '',
    chatLoading: false,
    t: vi.fn((key: string) => key),
    showToast: vi.fn(),
    refreshIcons: vi.fn(),
    $nextTick: vi.fn((cb: () => void) => cb()),
    $refs: {},
    apiBase: vi.fn(() => '/api/projects/pid-1'),
    initGenProps: vi.fn(),
    upsertGenerationById(gen: any) {
      const idx = this.generations.findIndex((g: any) => g.id === gen.id);
      if (idx === -1) this.generations.push(gen);
      else this.generations[idx] = gen;
    },
    scrollChatBottom: chat.scrollChatBottom,
    loadChatHistory: chat.loadChatHistory,
    sendChatMessage: chat.sendChatMessage,
    clearChat: chat.clearChat,
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

// --- loadChatHistory ---

describe('loadChatHistory', () => {
  it('fetches and sets chatMessages', async () => {
    const messages = [
      { role: 'user', content: 'hello' },
      { role: 'assistant', content: 'hi' },
    ];
    mockFetchOk({ messages });
    const ctx = makeContext();
    await chat.loadChatHistory.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/chat');
    expect(ctx.chatMessages).toEqual(messages);
  });

  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await chat.loadChatHistory.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('handles fetch failure gracefully', async () => {
    mockFetchFail(500);
    const ctx = makeContext();
    await chat.loadChatHistory.call(ctx);
    expect(ctx.chatMessages).toEqual([]);
  });

  it('handles empty messages', async () => {
    mockFetchOk({});
    const ctx = makeContext();
    await chat.loadChatHistory.call(ctx);
    expect(ctx.chatMessages).toEqual([]);
  });
});

// --- sendChatMessage ---

describe('sendChatMessage', () => {
  it('adds user message optimistically, fetches, adds assistant reply', async () => {
    mockFetchOk({ reply: 'Hello back!' });
    const ctx = makeContext({ chatInput: 'Hello' });
    await chat.sendChatMessage.call(ctx);
    expect(ctx.chatInput).toBe('');
    // User message added optimistically
    expect(ctx.chatMessages[0].role).toBe('user');
    expect(ctx.chatMessages[0].content).toBe('Hello');
    // Assistant reply added
    expect(ctx.chatMessages[1].role).toBe('assistant');
    expect(ctx.chatMessages[1].content).toBe('Hello back!');
    expect(ctx.chatLoading).toBe(false);
  });

  it('sends correct request body with locale and ageGroup', async () => {
    mockFetchOk({ reply: 'ok' });
    const ctx = makeContext({ chatInput: 'test msg' });
    await chat.sendChatMessage.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'test msg', lang: 'fr', ageGroup: 'enfant' }),
    });
  });

  it('adds generations from response', async () => {
    const genData = [
      { id: 'g1', type: 'summary', data: { summary: 'test' } },
      { id: 'g2', type: 'quiz', data: { quiz: [] } },
    ];
    mockFetchOk({ reply: 'Generated!', generations: genData, generatedIds: ['g1', 'g2'] });
    const ctx = makeContext({ chatInput: 'generate stuff' });
    await chat.sendChatMessage.call(ctx);
    expect(ctx.generations).toHaveLength(2);
    expect(ctx.openGens['g1']).toBe(true);
    expect(ctx.openGens['g2']).toBe(true);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.chatGenDone', 'success');
  });

  it('handles moderation blocked: pops user message, shows error toast', async () => {
    mockFetchFail(403, { error: 'chat.moderationBlocked' });
    const ctx = makeContext({ chatInput: 'bad content' });
    await chat.sendChatMessage.call(ctx);
    // The optimistic user message should be popped
    expect(ctx.chatMessages).toHaveLength(0);
    expect(ctx.showToast).toHaveBeenCalledWith('chat.moderationBlocked', 'error');
    expect(ctx.chatLoading).toBe(false);
  });

  it('handles age restricted: pops user message, shows error toast', async () => {
    mockFetchFail(403, { error: 'chat.ageRestricted' });
    const ctx = makeContext({ chatInput: 'restricted' });
    await chat.sendChatMessage.call(ctx);
    expect(ctx.chatMessages).toHaveLength(0);
    expect(ctx.showToast).toHaveBeenCalledWith('chat.ageRestricted', 'error');
  });

  it('handles non-moderation API error: adds error assistant message', async () => {
    mockFetchFail(500, { error: 'server crash' });
    const ctx = makeContext({ chatInput: 'test' });
    await chat.sendChatMessage.call(ctx);
    expect(ctx.chatMessages).toHaveLength(2);
    expect(ctx.chatMessages[1].role).toBe('assistant');
    expect(ctx.chatMessages[1].content).toBe('chat.errorReply');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.chatErrorMsg', 'error');
  });

  it('handles network error: adds connection error message', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network fail'));
    const ctx = makeContext({ chatInput: 'test' });
    await chat.sendChatMessage.call(ctx);
    expect(ctx.chatMessages).toHaveLength(2);
    expect(ctx.chatMessages[1].role).toBe('assistant');
    expect(ctx.chatMessages[1].content).toBe('chat.connectionError');
    expect(ctx.showToast).toHaveBeenCalledWith('toast.chatError', 'error');
    expect(ctx.chatLoading).toBe(false);
  });

  it('returns early if chatEnabled is false', async () => {
    const ctx = makeContext({
      chatInput: 'test',
      currentProfile: { id: 'p1', chatEnabled: false, ageGroup: 'enfant' },
    });
    await chat.sendChatMessage.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('returns early if message is empty', async () => {
    const ctx = makeContext({ chatInput: '   ' });
    await chat.sendChatMessage.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('returns early if already loading', async () => {
    const ctx = makeContext({ chatInput: 'test', chatLoading: true });
    await chat.sendChatMessage.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('returns early if no projectId', async () => {
    const ctx = makeContext({ chatInput: 'test', currentProjectId: null });
    await chat.sendChatMessage.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});

// --- clearChat ---

describe('clearChat', () => {
  it('deletes and resets chatMessages', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({ ok: true } as any);
    const ctx = makeContext({
      chatMessages: [{ role: 'user', content: 'hi' }],
    });
    await chat.clearChat.call(ctx);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/projects/pid-1/chat', { method: 'DELETE' });
    expect(ctx.chatMessages).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledWith('toast.chatCleared', 'info');
  });

  it('returns early if no projectId', async () => {
    const ctx = makeContext({ currentProjectId: null });
    await chat.clearChat.call(ctx);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});

// --- scrollChatBottom ---

describe('scrollChatBottom', () => {
  it('calls window.scrollTo', () => {
    const origScrollTo = globalThis.window.scrollTo;
    globalThis.window.scrollTo = vi.fn() as any;
    chat.scrollChatBottom();
    expect(globalThis.window.scrollTo).toHaveBeenCalledWith({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
    globalThis.window.scrollTo = origScrollTo;
  });
});
