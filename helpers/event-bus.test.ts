import { describe, it, expect, vi } from 'vitest';
import {
  buildEventKey,
  emitGenerationEvent,
  subscribeGeneration,
  type GenerationEvent,
} from './event-bus.js';

const makeEvent = (overrides: Partial<GenerationEvent> = {}): GenerationEvent => ({
  pid: 'project-1',
  gid: 'gid-1',
  type: 'summary',
  status: 'completed',
  at: new Date().toISOString(),
  eventKey: buildEventKey('gid-1', 'completed'),
  ...overrides,
});

describe('event-bus', () => {
  it('subscribeGeneration relaie les événements du bon projet', () => {
    const handler = vi.fn();
    const unsubscribe = subscribeGeneration('project-1', handler);
    emitGenerationEvent(makeEvent());
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].gid).toBe('gid-1');
    unsubscribe();
  });

  it('filtre les événements par pid (un autre projet ne déclenche pas le handler)', () => {
    const handler = vi.fn();
    const unsubscribe = subscribeGeneration('project-1', handler);
    emitGenerationEvent(makeEvent({ pid: 'project-2' }));
    expect(handler).not.toHaveBeenCalled();
    unsubscribe();
  });

  it("unsubscribe arrête de recevoir les événements (pas de fuite de listener)", () => {
    const handler = vi.fn();
    const unsubscribe = subscribeGeneration('project-1', handler);
    emitGenerationEvent(makeEvent());
    expect(handler).toHaveBeenCalledTimes(1);
    unsubscribe();
    emitGenerationEvent(makeEvent());
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('plusieurs souscripteurs sur le même pid reçoivent tous l\'événement', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    const u1 = subscribeGeneration('project-1', h1);
    const u2 = subscribeGeneration('project-1', h2);
    emitGenerationEvent(makeEvent());
    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(1);
    u1();
    u2();
  });

  it('buildEventKey produit une clé stable et idempotente', () => {
    expect(buildEventKey('abc', 'completed')).toBe('generation:abc:completed');
    expect(buildEventKey('abc', 'cancelled')).toBe('generation:abc:cancelled');
    expect(buildEventKey('abc', 'failed')).toBe('generation:abc:failed');
    expect(buildEventKey('abc', 'pending')).toBe('generation:abc:pending');
  });
});
