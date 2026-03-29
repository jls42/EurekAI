import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { createHash } from 'crypto';
import {
  ageToGroup,
  hashPin,
  verifyPin,
  profileToPublic,
  MODERATION_CATEGORIES,
  ALL_MODERATION_CATEGORIES,
  AGE_GROUP_CONFIG,
  ProfileStore,
} from './profiles.js';
import type { Profile } from './types.js';

// =============================================================================
// Pure functions (no mocks needed)
// =============================================================================

describe('ageToGroup', () => {
  it('returns enfant for age 0', () => {
    expect(ageToGroup(0)).toBe('enfant');
  });

  it('returns enfant for age 9', () => {
    expect(ageToGroup(9)).toBe('enfant');
  });

  it('returns enfant for age 10 (boundary)', () => {
    expect(ageToGroup(10)).toBe('enfant');
  });

  it('returns ado for age 11', () => {
    expect(ageToGroup(11)).toBe('ado');
  });

  it('returns ado for age 14', () => {
    expect(ageToGroup(14)).toBe('ado');
  });

  it('returns ado for age 15 (boundary)', () => {
    expect(ageToGroup(15)).toBe('ado');
  });

  it('returns etudiant for age 17', () => {
    expect(ageToGroup(17)).toBe('etudiant');
  });

  it('returns etudiant for age 18', () => {
    expect(ageToGroup(18)).toBe('etudiant');
  });

  it('returns etudiant for age 25 (boundary)', () => {
    expect(ageToGroup(25)).toBe('etudiant');
  });

  it('returns adulte for age 26', () => {
    expect(ageToGroup(26)).toBe('adulte');
  });

  it('returns adulte for age 99', () => {
    expect(ageToGroup(99)).toBe('adulte');
  });
});

describe('hashPin', () => {
  it('returns a 64-char hex string', () => {
    const hash = hashPin('1234');
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('matches expected SHA-256 for known input', () => {
    const expected = createHash('sha256').update('1234').digest('hex');
    expect(hashPin('1234')).toBe(expected);
  });

  it('produces different hashes for different pins', () => {
    expect(hashPin('1234')).not.toBe(hashPin('5678'));
  });

  it('produces identical hashes for identical pins', () => {
    expect(hashPin('abcd')).toBe(hashPin('abcd'));
  });
});

describe('verifyPin', () => {
  it('returns true for correct pin', () => {
    const hash = hashPin('secret');
    expect(verifyPin('secret', hash)).toBe(true);
  });

  it('returns false for wrong pin', () => {
    const hash = hashPin('secret');
    expect(verifyPin('wrong', hash)).toBe(false);
  });

  it('returns false for empty pin against real hash', () => {
    const hash = hashPin('1234');
    expect(verifyPin('', hash)).toBe(false);
  });
});

describe('profileToPublic', () => {
  const baseProfile: Profile = {
    id: 'p1',
    name: 'Alice',
    age: 9,
    ageGroup: 'enfant',
    avatar: '2',
    locale: 'fr',
    useModeration: true,
    useConsigne: true,
    chatEnabled: false,
    createdAt: '2025-01-01T00:00:00.000Z',
  };

  it('removes pinHash and sets hasPin to false when no pin', () => {
    const pub = profileToPublic(baseProfile);
    expect(pub).not.toHaveProperty('pinHash');
    expect(pub.hasPin).toBe(false);
    expect(pub.id).toBe('p1');
    expect(pub.name).toBe('Alice');
  });

  it('removes pinHash and sets hasPin to true when pin exists', () => {
    const withPin: Profile = { ...baseProfile, pinHash: hashPin('1234') };
    const pub = profileToPublic(withPin);
    expect(pub).not.toHaveProperty('pinHash');
    expect(pub.hasPin).toBe(true);
  });

  it('preserves all other fields', () => {
    const pub = profileToPublic(baseProfile);
    expect(pub.age).toBe(9);
    expect(pub.ageGroup).toBe('enfant');
    expect(pub.avatar).toBe('2');
    expect(pub.locale).toBe('fr');
    expect(pub.useModeration).toBe(true);
    expect(pub.useConsigne).toBe(true);
    expect(pub.chatEnabled).toBe(false);
    expect(pub.createdAt).toBe('2025-01-01T00:00:00.000Z');
  });
});

// =============================================================================
// Constants
// =============================================================================

describe('MODERATION_CATEGORIES', () => {
  it('has entries for all four age groups', () => {
    expect(Object.keys(MODERATION_CATEGORIES)).toEqual(
      expect.arrayContaining(['enfant', 'ado', 'etudiant', 'adulte']),
    );
  });

  it('enfant and ado have non-empty arrays of strings', () => {
    expect(MODERATION_CATEGORIES.enfant.length).toBeGreaterThan(0);
    expect(MODERATION_CATEGORIES.ado.length).toBeGreaterThan(0);
    for (const cat of MODERATION_CATEGORIES.enfant) {
      expect(typeof cat).toBe('string');
    }
  });

  it('etudiant and adulte have empty arrays', () => {
    expect(MODERATION_CATEGORIES.etudiant).toEqual([]);
    expect(MODERATION_CATEGORIES.adulte).toEqual([]);
  });
});

describe('AGE_GROUP_CONFIG', () => {
  it('has entries for all four age groups', () => {
    expect(Object.keys(AGE_GROUP_CONFIG)).toEqual(
      expect.arrayContaining(['enfant', 'ado', 'etudiant', 'adulte']),
    );
  });

  it('each entry has the three expected boolean fields', () => {
    for (const group of ['enfant', 'ado', 'etudiant', 'adulte'] as const) {
      const cfg = AGE_GROUP_CONFIG[group];
      expect(typeof cfg.moderationDefault).toBe('boolean');
      expect(typeof cfg.consigneDefault).toBe('boolean');
      expect(typeof cfg.chatDefault).toBe('boolean');
    }
  });

  it('enfant defaults: moderation on, consigne on, chat off', () => {
    expect(AGE_GROUP_CONFIG.enfant).toEqual({
      moderationDefault: true,
      consigneDefault: true,
      chatDefault: false,
    });
  });

  it('adulte defaults: moderation off, consigne off, chat on', () => {
    expect(AGE_GROUP_CONFIG.adulte).toEqual({
      moderationDefault: false,
      consigneDefault: false,
      chatDefault: true,
    });
  });
});

// =============================================================================
// ProfileStore (real temp directory, same pattern as store.test.ts)
// =============================================================================

let store: ProfileStore;
let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-profiles-test-'));
  store = new ProfileStore(tempDir);
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('ProfileStore.list', () => {
  it('returns empty array when no file exists', () => {
    expect(store.list()).toEqual([]);
  });

  it('returns profiles after creation', () => {
    store.create('Alice', 9);
    const profiles = store.list();
    expect(profiles).toHaveLength(1);
    expect(profiles[0].name).toBe('Alice');
  });
});

describe('ProfileStore.create', () => {
  it('creates a profile with generated id and correct defaults for enfant', () => {
    const p = store.create('Bob', 8);
    expect(p.id).toBeTruthy();
    expect(p.name).toBe('Bob');
    expect(p.age).toBe(8);
    expect(p.ageGroup).toBe('enfant');
    expect(p.avatar).toBe('0');
    expect(p.locale).toBe('fr');
    expect(p.useModeration).toBe(true);
    expect(p.useConsigne).toBe(true);
    expect(p.chatEnabled).toBe(false);
    expect(p.createdAt).toBeTruthy();
    expect(p.pinHash).toBeUndefined();
  });

  it('creates a profile with correct defaults for adulte', () => {
    const p = store.create('Charlie', 30);
    expect(p.ageGroup).toBe('adulte');
    expect(p.useModeration).toBe(false);
    expect(p.useConsigne).toBe(false);
    expect(p.chatEnabled).toBe(true);
  });

  it('uses custom avatar and locale', () => {
    const p = store.create('Dana', 12, '5', 'en');
    expect(p.avatar).toBe('5');
    expect(p.locale).toBe('en');
  });

  it('hashes pin when provided', () => {
    const p = store.create('Eve', 9, '0', 'fr', '1234');
    expect(p.pinHash).toBe(hashPin('1234'));
  });

  it('generates unique ids for each profile', () => {
    const p1 = store.create('A', 10);
    const p2 = store.create('B', 10);
    expect(p1.id).not.toBe(p2.id);
  });

  it('persists profile to disk', () => {
    store.create('Frank', 15);
    const freshStore = new ProfileStore(tempDir);
    const profiles = freshStore.list();
    expect(profiles).toHaveLength(1);
    expect(profiles[0].name).toBe('Frank');
  });
});

describe('ProfileStore.get', () => {
  it('returns profile by id', () => {
    const created = store.create('Grace', 20);
    const found = store.get(created.id);
    expect(found).not.toBeNull();
    expect(found!.name).toBe('Grace');
    expect(found!.id).toBe(created.id);
  });

  it('returns null for unknown id', () => {
    expect(store.get('nonexistent')).toBeNull();
  });
});

describe('ProfileStore.update', () => {
  it('updates name', () => {
    const p = store.create('Heidi', 12);
    const updated = store.update(p.id, { name: 'Heidi Updated' });
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe('Heidi Updated');
  });

  it('updates age and recalculates ageGroup', () => {
    const p = store.create('Ivan', 9);
    expect(p.ageGroup).toBe('enfant');
    const updated = store.update(p.id, { age: 16 });
    expect(updated!.age).toBe(16);
    expect(updated!.ageGroup).toBe('etudiant');
  });

  it('updates avatar', () => {
    const p = store.create('Judy', 10);
    const updated = store.update(p.id, { avatar: '7' });
    expect(updated!.avatar).toBe('7');
  });

  it('updates locale', () => {
    const p = store.create('Karl', 10);
    const updated = store.update(p.id, { locale: 'en' });
    expect(updated!.locale).toBe('en');
  });

  it('updates boolean flags', () => {
    const p = store.create('Liam', 9);
    expect(p.useModeration).toBe(true);
    const updated = store.update(p.id, {
      useModeration: false,
      useConsigne: false,
      chatEnabled: true,
    });
    expect(updated!.useModeration).toBe(false);
    expect(updated!.useConsigne).toBe(false);
    expect(updated!.chatEnabled).toBe(true);
  });

  it('returns null for unknown id', () => {
    expect(store.update('nonexistent', { name: 'X' })).toBeNull();
  });

  it('persists update to disk', () => {
    const p = store.create('Mia', 14);
    store.update(p.id, { name: 'Mia Updated' });
    const freshStore = new ProfileStore(tempDir);
    const found = freshStore.get(p.id);
    expect(found!.name).toBe('Mia Updated');
  });

  it('does not modify other profiles', () => {
    const p1 = store.create('Nora', 10);
    const p2 = store.create('Oscar', 12);
    store.update(p1.id, { name: 'Nora Updated' });
    const found = store.get(p2.id);
    expect(found!.name).toBe('Oscar');
  });
});

describe('ProfileStore.delete', () => {
  it('removes profile and returns true', () => {
    const p = store.create('Pat', 18);
    const result = store.delete(p.id);
    expect(result).toBe(true);
    expect(store.get(p.id)).toBeNull();
    expect(store.list()).toHaveLength(0);
  });

  it('returns false for unknown id', () => {
    expect(store.delete('nonexistent')).toBe(false);
  });

  it('does not remove other profiles', () => {
    const p1 = store.create('Quinn', 10);
    const p2 = store.create('Ruth', 12);
    store.delete(p1.id);
    expect(store.list()).toHaveLength(1);
    expect(store.get(p2.id)).not.toBeNull();
  });

  it('persists deletion to disk', () => {
    const p = store.create('Sam', 20);
    store.delete(p.id);
    const freshStore = new ProfileStore(tempDir);
    expect(freshStore.list()).toHaveLength(0);
  });
});

describe('ProfileStore legacy migration', () => {
  it('adds missing locale field on read', () => {
    // Create a profile, then manually strip locale from the file
    store.create('Legacy', 10);
    const filePath = join(tempDir, 'profiles.json');
    const profiles = JSON.parse(readFileSync(filePath, 'utf-8'));
    delete profiles[0].locale;
    writeFileSync(filePath, JSON.stringify(profiles));

    const freshStore = new ProfileStore(tempDir);
    const list = freshStore.list();
    expect(list[0].locale).toBe('fr');
  });

  it('adds missing chatEnabled field on read', () => {
    store.create('Legacy2', 20);
    const filePath = join(tempDir, 'profiles.json');
    const profiles = JSON.parse(readFileSync(filePath, 'utf-8'));
    delete profiles[0].chatEnabled;
    writeFileSync(filePath, JSON.stringify(profiles));

    const freshStore = new ProfileStore(tempDir);
    const list = freshStore.list();
    // age 20 >= 15, so chatEnabled should be true
    expect(list[0].chatEnabled).toBe(true);
  });

  it('sets chatEnabled false for young profiles missing the field', () => {
    store.create('Legacy3', 9);
    const filePath = join(tempDir, 'profiles.json');
    const profiles = JSON.parse(readFileSync(filePath, 'utf-8'));
    delete profiles[0].chatEnabled;
    writeFileSync(filePath, JSON.stringify(profiles));

    const freshStore = new ProfileStore(tempDir);
    const list = freshStore.list();
    // age 9 < 15, so chatEnabled should be false
    expect(list[0].chatEnabled).toBe(false);
  });

  it('adds missing moderationCategories field on read', () => {
    store.create('Legacy4', 9);
    const filePath = join(tempDir, 'profiles.json');
    const profiles = JSON.parse(readFileSync(filePath, 'utf-8'));
    delete profiles[0].moderationCategories;
    writeFileSync(filePath, JSON.stringify(profiles));

    const freshStore = new ProfileStore(tempDir);
    const list = freshStore.list();
    expect(list[0].moderationCategories).toEqual(MODERATION_CATEGORIES.enfant);
  });

  it('adds empty moderationCategories for adulte on migration', () => {
    store.create('Legacy5', 30);
    const filePath = join(tempDir, 'profiles.json');
    const profiles = JSON.parse(readFileSync(filePath, 'utf-8'));
    delete profiles[0].moderationCategories;
    writeFileSync(filePath, JSON.stringify(profiles));

    const freshStore = new ProfileStore(tempDir);
    const list = freshStore.list();
    expect(list[0].moderationCategories).toEqual([]);
  });
});

describe('ALL_MODERATION_CATEGORIES', () => {
  it('contains 10 categories', () => {
    expect(ALL_MODERATION_CATEGORIES).toHaveLength(10);
  });

  it('includes all default enfant categories', () => {
    for (const cat of MODERATION_CATEGORIES.enfant) {
      expect(ALL_MODERATION_CATEGORIES).toContain(cat);
    }
  });
});

describe('ProfileStore.create moderationCategories', () => {
  it('sets moderationCategories from enfant defaults', () => {
    const p = store.create('Kid', 9);
    expect(p.moderationCategories).toEqual(MODERATION_CATEGORIES.enfant);
  });

  it('sets empty moderationCategories for adulte', () => {
    const p = store.create('Adult', 30);
    expect(p.moderationCategories).toEqual([]);
  });
});

describe('ProfileStore.update moderationCategories', () => {
  it('updates moderationCategories with valid values', () => {
    const p = store.create('Test', 9);
    const updated = store.update(p.id, { moderationCategories: ['sexual', 'selfharm'] });
    expect(updated!.moderationCategories).toEqual(['sexual', 'selfharm']);
  });

  it('filters out invalid categories on update', () => {
    const p = store.create('Test2', 9);
    const updated = store.update(p.id, { moderationCategories: ['sexual', 'fake_category'] });
    expect(updated!.moderationCategories).toEqual(['sexual']);
  });

  it('allows empty array to disable all categories', () => {
    const p = store.create('Test3', 9);
    const updated = store.update(p.id, { moderationCategories: [] });
    expect(updated!.moderationCategories).toEqual([]);
  });
});
