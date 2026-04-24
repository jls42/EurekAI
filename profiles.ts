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

// Avertit l'admin quand un champ host/guest était défini en input non-falsy mais
// rejeté (nombre, null explicite, objet, etc.) — le drop silencieux masque des bugs
// client (UI stale, storage altéré) ou des régressions de validation côté route.
// Ne throw pas : la normalisation reste best-effort pour ne jamais bloquer le flux
// profil-update. C'est la route qui devrait retourner 400 si elle veut être stricte.
const warnIfSilentDrop = (field: 'host' | 'guest', rawValue: unknown): void => {
  if (rawValue === undefined) return;
  if (typeof rawValue === 'string' && rawValue) return;
  logger.warn(
    'profiles',
    `normalizeMistralVoices: dropped invalid voices.${field} (type=${typeof rawValue})`,
  );
};

function normalizeMistralVoices(
  voices: MistralVoicesInput,
): { host?: VoiceId; guest?: VoiceId } | undefined {
  if (!voices || typeof voices !== 'object') return undefined;
  const host = toVoiceIdOrUndefined(voices.host);
  const guest = toVoiceIdOrUndefined(voices.guest);
  warnIfSilentDrop('host', voices.host);
  warnIfSilentDrop('guest', voices.guest);
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
  if (!sameVoices(normalizedVoices, p.mistralVoices)) {
    p.mistralVoices = normalizedVoices;
    changed = true;
  }
  return changed;
}

// Comparaison structurée plutôt que JSON.stringify : robuste à l'ordre des clés
// et aux champs optionnels undefined (host? | guest?). Les deux operandes sont
// toujours normalizedMistralVoices ou undefined, pas de cas pathologiques.
// Arrow `const` et pas `function` : agglomération Lizard adjacente à migrateProfile
// (cf. CLAUDE.md "Pièges connus").
const sameVoices = (
  a: { host?: VoiceId; guest?: VoiceId } | undefined,
  b: { host?: VoiceId; guest?: VoiceId } | null | undefined,
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.host === b.host && a.guest === b.guest;
};

export class ProfileStore {
  private readonly filePath: string;
  // Mirror du pattern `lastLoadFailed` de config.ts — évite un overwrite silencieux
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
    const parsed = this.readAndParse();
    if (parsed === null) return [];
    return this.migrateAndPersist(parsed);
  }

  // Scinde le catch monolithique : JSON.parse fail = vraie corruption, shape invalide
  // (pas un array) = fichier écrit par un client cassé, ni fail de migration ni fail de
  // save ne sont signalés comme "corrupt". Chaque cause a son log dédié, le flag
  // lastLoadFailed ne se déclenche que sur corruption/shape invalide réelle.
  private readAndParse(): Profile[] | null {
    let raw: unknown;
    try {
      raw = JSON.parse(readFileSync(this.filePath, 'utf-8'));
    } catch (e) {
      logger.error('profiles', 'Failed to parse profiles.json (corrupt, preserved on disk):', e);
      this.lastLoadFailed = true;
      return null;
    }
    if (!Array.isArray(raw)) {
      logger.error('profiles', 'profiles.json has invalid shape (not an array, preserved on disk)');
      this.lastLoadFailed = true;
      return null;
    }
    return raw as Profile[];
  }

  private migrateAndPersist(profiles: Profile[]): Profile[] {
    let migrated = false;
    for (const p of profiles) {
      if (migrateProfile(p)) migrated = true;
    }
    this.lastLoadFailed = false;
    if (migrated) {
      try {
        this.save(profiles);
      } catch (e) {
        // Migration auto-save failure : on ne re-throw pas (le load de base reste
        // valide en mémoire), mais on log.error pour observabilité. L'appelant obtient
        // les profiles migrés même si la persistence a échoué.
        logger.error('profiles', 'migration persist failed (continuing in-memory):', e);
      }
    }
    return profiles;
  }

  private save(profiles: Profile[]) {
    // Si le boot précédent a détecté un fichier corrompu, tenter un backup `.corrupt.bak`
    // avant overwrite. Fichier supprimé manuellement entre list() et save() : reset OK
    // (rien à préserver). Backup échoue : on garde le flag à true pour retenter au
    // prochain save. Write échoue : flag préservé quel que soit le cas.
    let shouldResetFlag = !this.lastLoadFailed;
    if (this.lastLoadFailed) {
      if (!existsSync(this.filePath)) {
        shouldResetFlag = true;
      } else {
        const backupPath = `${this.filePath}.corrupt.bak`;
        if (existsSync(backupPath)) {
          shouldResetFlag = true;
        } else {
          try {
            copyFileSync(this.filePath, backupPath);
            logger.warn('profiles', `backed up corrupt profiles.json to ${backupPath}`);
            shouldResetFlag = true;
          } catch (e) {
            logger.warn('profiles', 'failed to create .corrupt.bak (keeping flag for retry):', e);
          }
        }
      }
    }
    try {
      writeFileSync(this.filePath, JSON.stringify(profiles, null, 2));
    } catch (e) {
      logger.error('profiles', 'failed to persist profiles.json:', e);
      throw e;
    }
    if (shouldResetFlag) this.lastLoadFailed = false;
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
