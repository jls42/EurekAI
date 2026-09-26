/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import { moderationRejection, pickBlockingSource } from './moderation-http.js';
import type { ModerationStatus } from '../types.js';

const src = (id: string, status?: string) => ({
  id,
  ...(status === undefined ? {} : { moderation: { status: status as ModerationStatus } }),
});

describe('moderationRejection', () => {
  it.each([undefined, 'safe'] as const)('%s → null (ne bloque pas)', (status) => {
    expect(moderationRejection(status)).toBeNull();
  });

  it('unsafe → 400 moderation.blocked par défaut', () => {
    expect(moderationRejection('unsafe')).toEqual({ status: 400, error: 'moderation.blocked' });
  });

  it('unsafe → 400 avec la clé passée (chat)', () => {
    expect(moderationRejection('unsafe', 'chat.moderationBlocked')).toEqual({
      status: 400,
      error: 'chat.moderationBlocked',
    });
  });

  it('error → 503 moderation.error, même avec une clé unsafe spécifique', () => {
    expect(moderationRejection('error')).toEqual({ status: 503, error: 'moderation.error' });
    expect(moderationRejection('error', 'chat.moderationBlocked')).toEqual({
      status: 503,
      error: 'moderation.error',
    });
  });

  it('pending → 409 moderation.pending', () => {
    expect(moderationRejection('pending')).toEqual({ status: 409, error: 'moderation.pending' });
  });

  it('statut inattendu (donnée disque corrompue) → 503 moderation.error (fail-closed)', () => {
    expect(moderationRejection('blocked' as ModerationStatus)).toEqual({
      status: 503,
      error: 'moderation.error',
    });
  });
});

describe('pickBlockingSource', () => {
  it('aucune source, sources sans statut ou safe → undefined', () => {
    expect(pickBlockingSource([])).toBeUndefined();
    expect(pickBlockingSource([src('a'), src('b', 'safe')])).toBeUndefined();
  });

  it("priorité unsafe > error > pending, quel que soit l'ordre des sources", () => {
    const all = [src('p', 'pending'), src('e', 'error'), src('u', 'unsafe')];
    expect(pickBlockingSource(all)?.id).toBe('u');
    expect(pickBlockingSource([src('p', 'pending'), src('e', 'error')])?.id).toBe('e');
    expect(pickBlockingSource([src('s', 'safe'), src('p', 'pending')])?.id).toBe('p');
  });

  it('à statut égal, la première source gagne', () => {
    expect(pickBlockingSource([src('u1', 'unsafe'), src('u2', 'unsafe')])?.id).toBe('u1');
  });

  it('statut inattendu : bloque en dernier recours, après les statuts connus', () => {
    expect(pickBlockingSource([src('x', 'blocked'), src('s', 'safe')])?.id).toBe('x');
    expect(pickBlockingSource([src('x', 'blocked'), src('p', 'pending')])?.id).toBe('p');
  });
});
