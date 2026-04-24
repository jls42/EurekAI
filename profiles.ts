import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import type { AgeGroup, Profile } from './types.js';
import type { VoiceId } from './helpers/voice-types.js';
import { logger } from './helpers/logger.js';

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
  enfant: ['sexual', 'hate_and_discrimination', 'violence_and_threats', 'selfharm', 'jailbreaking'],
  ado: ['sexual', 'hate_and_discrimination', 'violence_and_threats', 'selfharm', 'jailbreaking'],
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
  const candidate = Buffer.from(hashPin(pin), 'hex');
  let expected: Buffer;
  try {
    expected = Buffer.from(hash, 'hex');
  } catch {
    return false;
  }
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export function profileToPublic(profile: Profile): Omit<Profile, 'pinHash'> & { hasPin: boolean } {
  const { pinHash, ...rest } = profile;
  return { ...rest, hasPin: !!pinHash };
}

type MistralVoicesInput = Partial<Record<'host' | 'guest', unknown>> | null | undefined;

const toVoiceIdOrUndefined = (value: unknown): VoiceId | undefined =>
  typeof value === 'string' && value ? (value as VoiceId) : undefined;

function normalizeMistralVoices(
  voices: MistralVoicesInput,
): { host?: VoiceId; guest?: VoiceId } | undefined {
  if (!voices || typeof voices !== 'object') return undefined;
  const host = toVoiceIdOrUndefined(voices.host);
  const guest = toVoiceIdOrUndefined(voices.guest);
  if (!host && !guest) return undefined;
  return { ...(host ? { host } : {}), ...(guest ? { guest } : {}) };
}

function migrateProfile(p: Profile): boolean {
  let changed = false;
  if (!p.locale) {
    p.locale = 'fr';
    changed = true;
  }
  if ((p as { chatEnabled?: boolean }).chatEnabled === undefined) {
    p.chatEnabled = p.age >= 15;
    changed = true;
  }
  if (!p.moderationCategories) {
    p.moderationCategories = [...MODERATION_CATEGORIES[p.ageGroup]];
    changed = true;
  }
  if (!p.updatedAt) {
    p.updatedAt = p.createdAt || new Date().toISOString();
    changed = true;
  }
  const normalizedVoices = normalizeMistralVoices(p.mistralVoices);
  if (JSON.stringify(normalizedVoices) !== JSON.stringify(p.mistralVoices)) {
    p.mistralVoices = normalizedVoices;
    changed = true;
  }
  return changed;
}

export class ProfileStore {
  private readonly filePath: string;
  // I4 : mirror du pattern `lastLoadFailed` de config.ts — évite un overwrite silencieux
  // d'un profiles.json corrompu sans backup, en forçant un `.corrupt.bak` au prochain
  // save. Réinitialisé à false dès qu'un load réussit ou qu'un backup a été créé.
  private lastLoadFailed = false;

  constructor(outputDir: string) {
    this.filePath = join(outputDir, 'profiles.json');
  }

  list(): Profile[] {
    if (!existsSync(this.filePath)) {
      this.lastLoadFailed = false;
      return [];
    }
    try {
      const profiles: Profile[] = JSON.parse(readFileSync(this.filePath, 'utf-8'));
      let migrated = false;
      for (const p of profiles) {
        if (migrateProfile(p)) migrated = true;
      }
      this.lastLoadFailed = false;
      if (migrated) this.save(profiles);
      return profiles;
    } catch (e) {
      logger.error('profiles', 'Failed to load profiles (file preserved on disk):', e);
      this.lastLoadFailed = true;
      return [];
    }
  }

  private save(profiles: Profile[]) {
    // Si le boot précédent a détecté un fichier corrompu, tenter un backup `.corrupt.bak`
    // avant overwrite. Une seule fois par cycle (idempotent via lastLoadFailed reset).
    if (this.lastLoadFailed && existsSync(this.filePath)) {
      const backupPath = `${this.filePath}.corrupt.bak`;
      if (!existsSync(backupPath)) {
        try {
          copyFileSync(this.filePath, backupPath);
          logger.warn('profiles', `backed up corrupt profiles.json to ${backupPath}`);
        } catch (e) {
          logger.warn('profiles', 'failed to create .corrupt.bak (proceeding with save):', e);
        }
      }
      this.lastLoadFailed = false;
    }
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
    if (
      updates.mistralVoices !== undefined &&
      (updates.mistralVoices === null || typeof updates.mistralVoices === 'object')
    ) {
      profile.mistralVoices = normalizeMistralVoices(updates.mistralVoices);
    }
    if (
      updates.theme !== undefined &&
      (!updates.theme || updates.theme === 'dark' || updates.theme === 'light')
    ) {
      profile.theme = updates.theme || undefined;
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
