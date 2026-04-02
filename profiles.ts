import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import type { AgeGroup, Profile } from './types.js';

// --- Age group derivation ---

export function ageToGroup(age: number): AgeGroup {
  if (age <= 10) return 'enfant';
  if (age <= 15) return 'ado';
  if (age <= 25) return 'etudiant';
  return 'adulte';
}

// --- Defaults per age group ---

// All categories available from mistral-moderation-latest
export const ALL_MODERATION_CATEGORIES = [
  'sexual',
  'hate_and_discrimination',
  'violence_and_threats',
  'dangerous_and_criminal_content',
  'selfharm',
  'health',
  'financial',
  'law',
  'pii',
  'jailbreaking',
] as const;

// Default blocked categories per age group
// dangerous_and_criminal_content removed — too many false positives on educational content (electricity, chemistry, energy)
export const MODERATION_CATEGORIES: Record<AgeGroup, string[]> = {
  enfant: [
    'sexual',
    'hate_and_discrimination',
    'violence_and_threats',
    'selfharm',
    'jailbreaking',
  ],
  ado: [
    'sexual',
    'hate_and_discrimination',
    'violence_and_threats',
    'selfharm',
    'jailbreaking',
  ],
  etudiant: [],
  adulte: [],
};

export const AGE_GROUP_CONFIG: Record<
  AgeGroup,
  {
    moderationDefault: boolean;
    consigneDefault: boolean;
    chatDefault: boolean;
  }
> = {
  enfant: { moderationDefault: true, consigneDefault: true, chatDefault: false },
  ado: { moderationDefault: true, consigneDefault: true, chatDefault: false },
  etudiant: { moderationDefault: false, consigneDefault: false, chatDefault: true },
  adulte: { moderationDefault: false, consigneDefault: false, chatDefault: true },
};

// --- PIN helpers ---

export function hashPin(pin: string): string {
  return createHash('sha256').update(pin).digest('hex');
}

export function verifyPin(pin: string, hash: string): boolean {
  return hashPin(pin) === hash;
}

export function profileToPublic(profile: Profile): Omit<Profile, 'pinHash'> & { hasPin: boolean } {
  const { pinHash, ...rest } = profile;
  return { ...rest, hasPin: !!pinHash };
}

// --- Profile store ---

export class ProfileStore {
  private readonly filePath: string;

  constructor(outputDir: string) {
    this.filePath = join(outputDir, 'profiles.json');
  }

  list(): Profile[] {
    if (!existsSync(this.filePath)) return [];
    try {
      const profiles: Profile[] = JSON.parse(readFileSync(this.filePath, 'utf-8'));
      // Migrate legacy profiles
      let migrated = false;
      for (const p of profiles) {
        if (!p.locale) {
          p.locale = 'fr';
          migrated = true;
        }
        if ((p as any).chatEnabled === undefined) {
          p.chatEnabled = p.age >= 15;
          migrated = true;
        }
        if (!p.moderationCategories) {
          p.moderationCategories = [...MODERATION_CATEGORIES[p.ageGroup]];
          migrated = true;
        }
        if (!p.updatedAt) {
          p.updatedAt = p.createdAt || new Date().toISOString();
          migrated = true;
        }
      }
      if (migrated) this.save(profiles);
      return profiles;
    } catch (e) {
      console.error('Failed to load profiles:', e);
      return [];
    }
  }

  private save(profiles: Profile[]) {
    writeFileSync(this.filePath, JSON.stringify(profiles, null, 2));
  }

  create(
    name: string,
    age: number,
    avatar: string = '0',
    locale: string = 'fr',
    pin?: string,
  ): Profile {
    const ageGroup = ageToGroup(age);
    const defaults = AGE_GROUP_CONFIG[ageGroup];
    const profile: Profile = {
      id: randomUUID(),
      name,
      age,
      ageGroup,
      avatar,
      locale,
      useModeration: defaults.moderationDefault,
      moderationCategories: [...MODERATION_CATEGORIES[ageGroup]],
      useConsigne: defaults.consigneDefault,
      chatEnabled: defaults.chatDefault,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (pin) profile.pinHash = hashPin(pin);
    const profiles = this.list();
    profiles.push(profile);
    this.save(profiles);
    return profile;
  }

  get(id: string): Profile | null {
    return this.list().find((p) => p.id === id) ?? null;
  }

  update(
    id: string,
    updates: Partial<
      Pick<
        Profile,
        | 'name'
        | 'age'
        | 'avatar'
        | 'locale'
        | 'useModeration'
        | 'moderationCategories'
        | 'useConsigne'
        | 'chatEnabled'
        | 'mistralVoices'
        | 'theme'
      >
    >,
  ): Profile | null {
    const profiles = this.list();
    const idx = profiles.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const profile = profiles[idx];
    if (updates.name !== undefined) profile.name = updates.name;
    if (updates.avatar !== undefined) profile.avatar = updates.avatar;
    if (updates.locale !== undefined) profile.locale = updates.locale;
    if (updates.useModeration !== undefined) profile.useModeration = updates.useModeration;
    if (updates.moderationCategories !== undefined) {
      const valid = updates.moderationCategories.filter((c) =>
        (ALL_MODERATION_CATEGORIES as readonly string[]).includes(c),
      );
      profile.moderationCategories = valid;
    }
    if (updates.useConsigne !== undefined) profile.useConsigne = updates.useConsigne;
    if (updates.chatEnabled !== undefined) profile.chatEnabled = updates.chatEnabled;
    if (updates.mistralVoices !== undefined) {
      if (updates.mistralVoices === null || (typeof updates.mistralVoices === 'object' && typeof updates.mistralVoices.host === 'string' && typeof updates.mistralVoices.guest === 'string')) {
        profile.mistralVoices = updates.mistralVoices || undefined;
      }
    }
    if (updates.theme !== undefined) {
      if (!updates.theme || updates.theme === 'dark' || updates.theme === 'light') {
        profile.theme = updates.theme || undefined;
      }
    }
    if (updates.age !== undefined) {
      profile.age = updates.age;
      profile.ageGroup = ageToGroup(updates.age);
    }
    profile.updatedAt = new Date().toISOString();
    profiles[idx] = profile;
    this.save(profiles);
    return profile;
  }

  delete(id: string): boolean {
    const profiles = this.list();
    const filtered = profiles.filter((p) => p.id !== id);
    if (filtered.length === profiles.length) return false;
    this.save(filtered);
    return true;
  }
}
