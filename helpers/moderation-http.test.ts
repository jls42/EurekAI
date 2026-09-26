/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect } from 'vitest';
import {
  blockingModerationStatus,
  effectiveModerationStatus,
  moderationRejection,
  pickBlockingSource,
  profileBlockedCategories,
} from './moderation-http.js';
import type { ModerationStatus } from '../types.js';

const NO_BLOCKED: readonly string[] = [];

const src = (id: string, status?: string, categories?: Record<string, boolean>) => ({
  id,
  ...(status === undefined
    ? {}
    : { moderation: { status: status as ModerationStatus, ...(categories && { categories }) } }),
});

const mod = (status: string, categories?: Record<string, boolean>) => ({
  status: status as ModerationStatus,
  ...(categories && { categories }),
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
    expect(pickBlockingSource([], NO_BLOCKED)).toBeUndefined();
    expect(pickBlockingSource([src('a'), src('b', 'safe')], NO_BLOCKED)).toBeUndefined();
  });

  it("priorité unsafe > error > pending, quel que soit l'ordre des sources", () => {
    const all = [src('p', 'pending'), src('e', 'error'), src('u', 'unsafe')];
    expect(pickBlockingSource(all, NO_BLOCKED)?.id).toBe('u');
    const pendingError = [src('p', 'pending'), src('e', 'error')];
    expect(pickBlockingSource(pendingError, NO_BLOCKED)?.id).toBe('e');
    const safePending = [src('s', 'safe'), src('p', 'pending')];
    expect(pickBlockingSource(safePending, NO_BLOCKED)?.id).toBe('p');
  });

  it('à statut égal, la première source gagne', () => {
    const twoUnsafe = [src('u1', 'unsafe'), src('u2', 'unsafe')];
    expect(pickBlockingSource(twoUnsafe, NO_BLOCKED)?.id).toBe('u1');
  });

  it('statut inattendu : bloque en dernier recours, après les statuts connus', () => {
    expect(pickBlockingSource([src('x', 'blocked'), src('s', 'safe')], NO_BLOCKED)?.id).toBe('x');
    const withPending = [src('x', 'blocked'), src('p', 'pending')];
    expect(pickBlockingSource(withPending, NO_BLOCKED)?.id).toBe('p');
  });

  it('priorité sur le statut EFFECTIF : un safe promu unsafe passe devant un pending', () => {
    const sources = [src('p', 'pending'), src('s', 'safe', { criminal: true })];
    expect(pickBlockingSource(sources, ['criminal'])?.id).toBe('s');
    expect(pickBlockingSource(sources, ['sexual'])?.id).toBe('p');
  });
});

describe('profileBlockedCategories', () => {
  const DEFAULTS = { enfant: ['sexual', 'selfharm'], adulte: [] };

  it('la liste du profil prime sur les défauts, même vide', () => {
    expect(
      profileBlockedCategories(
        { moderationCategories: ['criminal'], ageGroup: 'enfant' },
        DEFAULTS,
      ),
    ).toEqual(['criminal']);
    expect(
      profileBlockedCategories({ moderationCategories: [], ageGroup: 'enfant' }, DEFAULTS),
    ).toEqual([]);
  });

  it("sans liste : défauts de l'âge", () => {
    expect(profileBlockedCategories({ ageGroup: 'enfant' }, DEFAULTS)).toEqual([
      'sexual',
      'selfharm',
    ]);
  });

  it.each([['inconnu'], ['constructor'], ['__proto__'], [undefined]])(
    'âge sans défauts (%s), profil absent → aucune catégorie',
    (ageGroup) => {
      expect(profileBlockedCategories({ ageGroup }, DEFAULTS)).toEqual([]);
      expect(profileBlockedCategories(null, DEFAULTS)).toEqual([]);
      expect(profileBlockedCategories(undefined, DEFAULTS)).toEqual([]);
    },
  );
});

describe('effectiveModerationStatus', () => {
  it('safe + catégorie BLOQUÉE à true → unsafe (sources persistées de v1.5.4 à v1.7.1)', () => {
    expect(effectiveModerationStatus(mod('safe', { criminal: true }), ['criminal'])).toBe('unsafe');
    expect(
      effectiveModerationStatus(mod('safe', { dangerous: true }), ['sexual', 'dangerous']),
    ).toBe('unsafe');
  });

  it('safe + catégorie NON bloquée à true, ou bloquée à false → safe', () => {
    expect(effectiveModerationStatus(mod('safe', { criminal: true }), ['sexual'])).toBe('safe');
    expect(effectiveModerationStatus(mod('safe', { criminal: false }), ['criminal'])).toBe('safe');
    expect(effectiveModerationStatus(mod('safe', { criminal: true }), NO_BLOCKED)).toBe('safe');
    expect(effectiveModerationStatus(mod('safe'), ['criminal'])).toBe('safe');
  });

  it('clé legacy 2411 stockée à true : compte pour ses successeurs', () => {
    const legacy = mod('safe', { dangerous_and_criminal_content: true });
    expect(effectiveModerationStatus(legacy, ['criminal'])).toBe('unsafe');
    expect(effectiveModerationStatus(legacy, ['dangerous'])).toBe('unsafe');
    expect(effectiveModerationStatus(legacy, ['sexual'])).toBe('safe');
  });

  it('liste bloquée portant la clé legacy : étendue à ses successeurs', () => {
    const criminal = mod('safe', { criminal: true });
    expect(effectiveModerationStatus(criminal, ['dangerous_and_criminal_content'])).toBe('unsafe');
  });

  it.each(['unsafe', 'error', 'pending', 'blocked'])(
    '%s : jamais de déclassement, statut rendu tel quel',
    (status) => {
      expect(effectiveModerationStatus(mod(status, { criminal: false }), ['criminal'])).toBe(
        status,
      );
      expect(effectiveModerationStatus(mod(status), NO_BLOCKED)).toBe(status);
    },
  );

  it('sans objet moderation (import modération inactive) → undefined', () => {
    expect(effectiveModerationStatus(undefined, ['criminal'])).toBeUndefined();
  });

  it('catégories persistées corrompues → pas de promotion, sans exception', () => {
    const corrupt = { status: 'safe' as ModerationStatus, categories: 'criminal' as never };
    expect(effectiveModerationStatus(corrupt, ['criminal'])).toBe('safe');
    const nullCats = { status: 'safe' as ModerationStatus, categories: null as never };
    expect(effectiveModerationStatus(nullCats, ['criminal'])).toBe('safe');
  });
});

describe('blockingModerationStatus', () => {
  it('rend le statut EFFECTIF de la source bloquante (pas le safe persisté)', () => {
    const promoted = src('s', 'safe', { criminal: true });
    expect(promoted.moderation?.status).toBe('safe');
    expect(blockingModerationStatus([promoted], ['criminal'])).toBe('unsafe');
  });

  it('undefined quand rien ne bloque', () => {
    expect(
      blockingModerationStatus([src('s', 'safe', { criminal: true }), src('n')], ['sexual']),
    ).toBe(undefined);
  });
});
