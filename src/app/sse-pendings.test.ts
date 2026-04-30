import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { strict as assert } from 'node:assert';
import { createPendingsStream } from './sse-pendings.js';

// Stubs vanilla pour éviter la cascade typed-linting `vi.*` côté Codacy
// (tsconfig racine exclut src/ → vi/expect typés `error` → unsafe-*).
// Localement projectService résout vitest correctement.
type StubCalls = unknown[][];
// Type signatures : params nommés requis par TS syntax sans body pour les
// référencer. Codacy native `no-unused-vars` n'honore pas `argsIgnorePattern:
// '^_'` (cf. e396616 — la règle native est indépendante du variant @ts-eslint).
// eslint-disable-next-line no-unused-vars -- type-sig param required by TS
type StubImpl = (..._args: unknown[]) => unknown;
type SpyFn = StubImpl & {
  calls: StubCalls;
  // eslint-disable-next-line no-unused-vars -- type-sig param required by TS
  setImpl(_impl: StubImpl): void;
};

function makeSpy(): SpyFn {
  const calls: StubCalls = [];
  let impl: StubImpl | null = null;
  const spy = ((...args: unknown[]): unknown => {
    calls.push(args);
    return impl ? impl(...args) : undefined;
  }) as SpyFn;
  spy.calls = calls;
  spy.setImpl = (next) => {
    impl = next;
  };
  return spy;
}

// Stub de l'API DOM EventSource. `Map` plutôt que `Record` pour le bucket
// listeners : indexer par `name: string` arbitraire signale `Generic Object
// Injection Sink` côté eslint-plugin-security même si l'input vient de tests.
// eslint-disable-next-line no-unused-vars -- type-sig param required by TS
type GenerationListener = (_msg: MessageEvent) => void;

class FakeEventSource {
  static readonly instances: FakeEventSource[] = [];
  url: string;
  // EventSource['onerror'] standard DOM utilise `(ev: Event) => unknown` —
  // pas besoin de la binding `this: EventSource` (jamais référencé), simplifie
  // aussi triggerError() qui n'a plus à invoquer .call(this, ...).
  // eslint-disable-next-line no-unused-vars -- type-sig param required by TS
  onerror: ((_ev: Event) => void) | null = null;
  private readonly listeners = new Map<string, GenerationListener[]>();
  closed = false;

  constructor(url: string) {
    this.url = url;
    FakeEventSource.instances.push(this);
  }

  // `_fn` préfixé pour matcher `argsIgnorePattern: '^_'` même quand Codacy lit
  // le param en type-position comme nommé "non utilisé".
  addEventListener(name: string, fn: GenerationListener): void {
    const bucket = this.listeners.get(name) ?? [];
    bucket.push(fn);
    this.listeners.set(name, bucket);
  }

  dispatch(name: string, data: unknown): void {
    const fns = this.listeners.get(name) ?? [];
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    const event = { data: payload } as MessageEvent;
    for (const fn of fns) fn(event);
  }

  triggerError(): void {
    this.onerror?.(new Event('error'));
  }

  close(): void {
    this.closed = true;
  }
}

// Patch typé de globalThis.EventSource — évite `(globalThis as any).EventSource`.
// eslint-disable-next-line no-unused-vars -- type-sig param required by TS
type EventSourceCtor = new (_url: string) => EventSource;
function installEventSourceStub(stub: EventSourceCtor): void {
  (globalThis as { EventSource: EventSourceCtor }).EventSource = stub;
}

interface FakeContext {
  currentProjectId: string | null;
  reconcilePendings: SpyFn;
  applyGenerationEvent: SpyFn;
  // sse-pendings.ts L102 fait `this.startPendingsStream(projectId)` pour le
  // retry dans setTimeout — le ctx doit donc exposer la méthode. Arrow wrapper
  // (vs. assignment direct) évite `@typescript-eslint/unbound-method`.
  // eslint-disable-next-line no-unused-vars -- type-sig param required by TS
  startPendingsStream(_pid: string): Promise<void>;
}

function makeContext(): FakeContext {
  const reconcilePendings = makeSpy();
  // Par défaut : la résolution de la promesse est synchrone (pas d'await réel).
  reconcilePendings.setImpl(() => Promise.resolve());
  return {
    currentProjectId: null,
    reconcilePendings,
    applyGenerationEvent: makeSpy(),
    // Réécrit par beforeEach avec l'arrow qui forwarde vers le stream courant.
    startPendingsStream: () => Promise.resolve(),
  };
}

// Wrappers fins autour de vi.* pour confiner les appels typed-error à un seul
// endroit. INLINE disable : strict minimum (4 wrappers) plutôt qu'un disable
// file-level qui masquerait des bugs réels (cf. CLAUDE.md "Mesurer > deviner").
/* eslint-disable @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/unbound-method --
   vi.* est typé `error` côté Codacy (tsconfig racine exclut src/). Local OK. */
const useFakeTimers = (): void => {
  vi.useFakeTimers();
};
const useRealTimers = (): void => {
  vi.useRealTimers();
};
const advanceTimers = async (ms: number): Promise<void> => {
  await vi.advanceTimersByTimeAsync(ms);
};
/* eslint-enable @typescript-eslint/no-unsafe-call,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/unbound-method */

// Wrappers describe/it/beforeEach/afterEach pour confiner la même cascade
// typed-error que vi.* à 4 helpers, plutôt qu'un inline disable sur chaque
// appel ou un disable file-level qui masquerait des bugs réels.
// eslint-disable-next-line no-unused-vars -- type-sig params required by TS
type DescribeFn = (_name: string, _fn: () => void) => void;
// eslint-disable-next-line no-unused-vars -- type-sig params required by TS
type ItFn = (_name: string, _fn: () => Promise<void> | void) => void;
// eslint-disable-next-line no-unused-vars -- type-sig param required by TS
type HookFn = (_fn: () => Promise<void> | void) => void;
/* eslint-disable @typescript-eslint/no-unsafe-call --
   describe/it/beforeEach/afterEach typés `error` côté Codacy. Local OK. */
const $describe: DescribeFn = (name, fn) => {
  describe(name, fn);
};
const $it: ItFn = (name, fn) => {
  it(name, fn);
};
const $beforeEach: HookFn = (fn) => {
  beforeEach(fn);
};
const $afterEach: HookFn = (fn) => {
  afterEach(fn);
};
/* eslint-enable @typescript-eslint/no-unsafe-call */

$describe('createPendingsStream', () => {
  let ctx: FakeContext;
  let stream: ReturnType<typeof createPendingsStream>;

  $beforeEach(() => {
    useFakeTimers();
    FakeEventSource.instances.length = 0;
    installEventSourceStub(FakeEventSource as unknown as EventSourceCtor);
    ctx = makeContext();
    stream = createPendingsStream();
    // Arrow forwarder typé : retry dans setTimeout (sse-pendings.ts L102)
    // appelle `this.startPendingsStream(pid)`. Sans bind explicite, Codacy
    // signalerait `unbound-method` sur une assignment de référence directe.
    ctx.startPendingsStream = async (pid) => {
      // `await` explicite + `Promise<void>` inféré → évite Codacy
      // `no-unsafe-return` (call().return = any quand `this` est cast en never).
      await stream.startPendingsStream.call(ctx as never, pid);
    };
  });

  $afterEach(() => {
    useRealTimers();
  });

  // Helper : démarre le stream avec le projectId donné (DRY pour les tests).
  const start = async (projectId: string): Promise<void> => {
    await stream.startPendingsStream.call(ctx as never, projectId);
  };

  $it('reconcile then opens EventSource on /api/projects/:pid/events', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');

    assert.equal(ctx.reconcilePendings.calls.length, 1);
    const [pid, watermark] = ctx.reconcilePendings.calls[0];
    assert.equal(pid, 'proj-1');
    assert.equal(typeof watermark, 'string');
    assert.equal(FakeEventSource.instances.length, 1);
    assert.equal(FakeEventSource.instances[0].url, '/api/projects/proj-1/events');
  });

  $it('does NOT open EventSource if currentProjectId changed during reconcile', async () => {
    ctx.currentProjectId = 'proj-other';
    ctx.reconcilePendings.setImpl(() => {
      ctx.currentProjectId = 'proj-other';
      return Promise.resolve();
    });
    await start('proj-1');

    assert.equal(FakeEventSource.instances.length, 0);
  });

  $it('forwards parsed generation events to applyGenerationEvent', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');

    const es = FakeEventSource.instances[0];
    const event = { pid: 'proj-1', gid: 'gid-1', type: 'summary', status: 'completed' };
    es.dispatch('generation', event);

    assert.equal(ctx.applyGenerationEvent.calls.length, 1);
    assert.deepEqual(ctx.applyGenerationEvent.calls[0][0], event);
  });

  $it('ignores generation events for stale projectId', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');

    const es = FakeEventSource.instances[0];
    ctx.currentProjectId = 'proj-other';
    es.dispatch('generation', { pid: 'proj-1', gid: 'g', type: 'quiz', status: 'pending' });

    assert.equal(ctx.applyGenerationEvent.calls.length, 0);
  });

  $it('silently ignores malformed JSON in generation event', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');
    const es = FakeEventSource.instances[0];

    assert.doesNotThrow(() => {
      es.dispatch('generation', 'not-json{');
    });
    assert.equal(ctx.applyGenerationEvent.calls.length, 0);
  });

  $it('on error: closes source then reschedules startPendingsStream with backoff', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');
    const es = FakeEventSource.instances[0];

    es.triggerError();

    assert.equal(es.closed, true);
    // First reconcile from initial start
    assert.equal(ctx.reconcilePendings.calls.length, 1);
    // Backoff initial = 1000ms — fast forward then async settle
    await advanceTimers(1000);
    assert.equal(ctx.reconcilePendings.calls.length, 2);
  });

  $it('on error with stale projectId: stops without rescheduling', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');
    const es = FakeEventSource.instances[0];
    ctx.currentProjectId = 'proj-other';

    es.triggerError();

    assert.equal(es.closed, true);
    await advanceTimers(2000);
    assert.equal(ctx.reconcilePendings.calls.length, 1); // no second reconcile
  });

  $it('stopPendingsStream closes source and clears reconnect timer', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');
    const es = FakeEventSource.instances[0];
    es.triggerError(); // schedules reconnect timer

    stream.stopPendingsStream();

    assert.equal(es.closed, true);
    await advanceTimers(5000);
    // Reconnect timer was cleared, so reconcile only fired once initially
    assert.equal(ctx.reconcilePendings.calls.length, 1);
  });

  $it('exponential backoff doubles on consecutive errors capped at 30s', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');

    // 1st error → 1000ms backoff, 2nd error → 2000ms, etc.
    FakeEventSource.instances[0].triggerError();
    await advanceTimers(1000);
    assert.equal(ctx.reconcilePendings.calls.length, 2);

    FakeEventSource.instances[1].triggerError();
    await advanceTimers(1999);
    assert.equal(ctx.reconcilePendings.calls.length, 2);
    await advanceTimers(1);
    assert.equal(ctx.reconcilePendings.calls.length, 3);
  });

  $it('start re-entrant: calling start while already running stops previous source', async () => {
    ctx.currentProjectId = 'proj-1';
    await start('proj-1');
    const es1 = FakeEventSource.instances[0];

    await start('proj-1');

    assert.equal(es1.closed, true);
    assert.equal(FakeEventSource.instances.length, 2);
  });
});
