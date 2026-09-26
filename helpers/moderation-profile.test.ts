/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Codacy lance ESLint sans resolution des types vitest (describe/it/expect typés error) : faux positifs ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import {
  activeModerationCategories,
  moderationProfileOf,
  type ModerationProfile,
} from './moderation-profile.js';
import { MODERATION_CATEGORIES } from '../profiles.js';
import type { Profile } from '../types.js';

describe('moderationProfileOf', () => {
  it('profil propriétaire du projet (meta.profileId)', () => {
    const owner = { id: 'p1', useModeration: true } as Profile;
    const get = vi.fn(() => owner);
    expect(moderationProfileOf({ meta: { profileId: 'p1' } }, { get })).toBe(owner);
    expect(get).toHaveBeenCalledWith('p1');
  });

  it.each([undefined, ''])('projet sans profil (%j) : null, sans lire le store', (profileId) => {
    const get = vi.fn(() => ({ id: 'autre' }) as Profile);
    expect(moderationProfileOf({ meta: { profileId } }, { get })).toBeNull();
    expect(get).not.toHaveBeenCalled();
  });

  it('profil supprimé : null', () => {
    expect(moderationProfileOf({ meta: { profileId: 'gone' } }, { get: () => null })).toBeNull();
  });
});

describe('activeModerationCategories', () => {
  it.each([
    ['modération inactive', { useModeration: false, moderationCategories: ['sexual'] }],
    ['pas de profil (null)', null],
    ['pas de profil (undefined)', undefined],
  ])('%s → null (pas de modération)', (_label, profile) => {
    expect(activeModerationCategories(profile)).toBeNull();
  });

  it('liste du profil, rendue en copie', () => {
    const own = ['criminal'];
    const result = activeModerationCategories({
      useModeration: true,
      moderationCategories: own,
      ageGroup: 'enfant',
    });
    expect(result).toEqual(['criminal']);
    expect(result).not.toBe(own);
  });

  // Comportement conservé : `[]` n'est PAS null (les sources restent modérées, catégories stockées).
  it('liste vide conservée : modération active sans catégorie bloquée', () => {
    expect(
      activeModerationCategories({
        useModeration: true,
        moderationCategories: [],
        ageGroup: 'ado',
      }),
    ).toEqual([]);
  });

  it("sans liste : défauts de l'âge, sans exposer MODERATION_CATEGORIES", () => {
    const result = activeModerationCategories({ useModeration: true, ageGroup: 'ado' });
    expect(result).toEqual(MODERATION_CATEGORIES.ado);
    result?.push('pii');
    expect(MODERATION_CATEGORIES.ado).not.toContain('pii');
  });

  it("sans liste, âge aux défauts vides (etudiant) : aucune catégorie, pas les défauts d'enfant", () => {
    expect(activeModerationCategories({ useModeration: true, ageGroup: 'etudiant' })).toEqual([]);
  });

  // Fail-closed : un âge illisible (inconnu, absent ou hostile) ne remonte jamais au prototype et
  // prend les défauts d'enfant (protection maximale, même règle que la migration des profils).
  it.each(['constructor', '__proto__', 'toString', 'hasOwnProperty', 'inconnu', undefined])(
    'âge %s sans liste : défauts enfant, jamais le prototype',
    (ageGroup) => {
      const profile = { useModeration: true, ageGroup } as ModerationProfile;
      expect(activeModerationCategories(profile)).toEqual(MODERATION_CATEGORIES.enfant);
    },
  );

  it.each([
    ['chaîne', 'sexual'],
    ['objet', { sexual: true }],
    ['nombre', 3],
  ])("liste corrompue (%s) : défauts de l'âge, jamais la valeur telle quelle", (_label, raw) => {
    const corrupt = (ageGroup: string) =>
      ({
        useModeration: true,
        ageGroup,
        moderationCategories: raw,
      }) as unknown as ModerationProfile;
    expect(activeModerationCategories(corrupt('etudiant'))).toEqual([]);
    expect(activeModerationCategories(corrupt('constructor'))).toEqual(
      MODERATION_CATEGORIES.enfant,
    );
  });
});
