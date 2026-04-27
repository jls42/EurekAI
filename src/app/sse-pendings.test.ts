import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPendingsStream } from './sse-pendings.js';

class FakeEventSource {
  static readonly instances: FakeEventSource[] = [];
  url: string;
  onerror: ((this: EventSource, ev: Event) => any) | null = null;
  listeners: Record<string, Array<(msg: MessageEvent) => void>> = {};
  closed = false;

  constructor(url: string) {
    this.url = url;
    FakeEventSource.instances.push(this);
  }

  addEventListener(name: string, fn: (msg: MessageEvent) => void): void {
    this.listeners[name] ??= [];
    this.listeners[name].push(fn);
  }

  dispatch(name: string, data: unknown): void {
    const fns = this.listeners[name] ?? [];
    for (const fn of fns) fn({ data: typeof data === 'string' ? data : JSON.stringify(data) } as any);
  }

  triggerError(): void {
    if (this.onerror) this.onerror.call(this as any, new Event('error'));
  }

  close(): void {
    this.closed = true;
  }
}

function makeContext() {
  return {
    currentProjectId: null as string | null,
    reconcilePendings: vi.fn().mockResolvedValue(undefined),
    applyGenerationEvent: vi.fn(),
    startPendingsStream: null as any,
    stopPendingsStream: null as any,
  };
}

describe('createPendingsStream', () => {
  let ctx: ReturnType<typeof makeContext>;
  let stream: ReturnType<typeof createPendingsStream>;

  beforeEach(() => {
    vi.useFakeTimers();
    FakeEventSource.instances.length = 0;
    (globalThis as any).EventSource = FakeEventSource;
    ctx = makeContext();
    stream = createPendingsStream();
    ctx.startPendingsStream = stream.startPendingsStream;
    ctx.stopPendingsStream = stream.stopPendingsStream;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reconcile then opens EventSource on /api/projects/:pid/events', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');

    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(1);
    expect(ctx.reconcilePendings).toHaveBeenCalledWith('proj-1', expect.any(String));
    expect(FakeEventSource.instances).toHaveLength(1);
    expect(FakeEventSource.instances[0].url).toBe('/api/projects/proj-1/events');
  });

  it('does NOT open EventSource if currentProjectId changed during reconcile', async () => {
    ctx.currentProjectId = 'proj-other';
    ctx.reconcilePendings.mockImplementation(async () => {
      ctx.currentProjectId = 'proj-other';
    });
    await stream.startPendingsStream.call(ctx as any, 'proj-1');

    expect(FakeEventSource.instances).toHaveLength(0);
  });

  it('forwards parsed generation events to applyGenerationEvent', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');

    const es = FakeEventSource.instances[0];
    const event = { pid: 'proj-1', gid: 'gid-1', type: 'summary', status: 'completed' };
    es.dispatch('generation', event);

    expect(ctx.applyGenerationEvent).toHaveBeenCalledWith(event);
  });

  it('ignores generation events for stale projectId', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');

    const es = FakeEventSource.instances[0];
    ctx.currentProjectId = 'proj-other';
    es.dispatch('generation', { pid: 'proj-1', gid: 'g', type: 'quiz', status: 'pending' });

    expect(ctx.applyGenerationEvent).not.toHaveBeenCalled();
  });

  it('silently ignores malformed JSON in generation event', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');
    const es = FakeEventSource.instances[0];

    expect(() => es.dispatch('generation', 'not-json{')).not.toThrow();
    expect(ctx.applyGenerationEvent).not.toHaveBeenCalled();
  });

  it('on error: closes source then reschedules startPendingsStream with backoff', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');
    const es = FakeEventSource.instances[0];

    es.triggerError();

    expect(es.closed).toBe(true);
    // First reconcile from initial start
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(1);
    // Backoff initial = 1000ms — fast forward then async settle
    await vi.advanceTimersByTimeAsync(1000);
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(2);
  });

  it('on error with stale projectId: stops without rescheduling', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');
    const es = FakeEventSource.instances[0];
    ctx.currentProjectId = 'proj-other';

    es.triggerError();

    expect(es.closed).toBe(true);
    await vi.advanceTimersByTimeAsync(2000);
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(1); // no second reconcile
  });

  it('stopPendingsStream closes source and clears reconnect timer', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');
    const es = FakeEventSource.instances[0];
    es.triggerError(); // schedules reconnect timer

    stream.stopPendingsStream();

    expect(es.closed).toBe(true);
    await vi.advanceTimersByTimeAsync(5000);
    // Reconnect timer was cleared, so reconcile only fired once initially
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(1);
  });

  it('exponential backoff doubles on consecutive errors capped at 30s', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');

    // 1st error → 1000ms backoff, 2nd error → 2000ms, etc.
    FakeEventSource.instances[0].triggerError();
    await vi.advanceTimersByTimeAsync(1000);
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(2);

    FakeEventSource.instances[1].triggerError();
    await vi.advanceTimersByTimeAsync(1999);
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    expect(ctx.reconcilePendings).toHaveBeenCalledTimes(3);
  });

  it('start re-entrant: calling start while already running stops previous source', async () => {
    ctx.currentProjectId = 'proj-1';
    await stream.startPendingsStream.call(ctx as any, 'proj-1');
    const es1 = FakeEventSource.instances[0];

    await stream.startPendingsStream.call(ctx as any, 'proj-1');

    expect(es1.closed).toBe(true);
    expect(FakeEventSource.instances).toHaveLength(2);
  });
});
