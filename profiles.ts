import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import type { AgeGroup, Profile } from './types.js';
import type { VoiceId } from './helpers/voice-types.js';
import { logger } from './helpers/logger.js';

export function ageToGroup(age: number): AgeGroup {
  if (age <= 10) return 'enfant';
  if (age <= 15) return 'ado';
  if (age <= 25) return 'etudiant';
  return 'adulte';
}

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

// Filtre et warn les catégories inconnues. Extraction depuis update() pour
// limiter la cognitive complexity Sonar et isoler la responsabilité.
const applyModerationCategories = (raw: string[]): string[] => {
  const allowed = ALL_MODERATION_CATEGORIES as readonly string[];
  const rejected = raw.filter((c) => !allowed.includes(c));
  if (rejected.length > 0) {
    logger.warn(
      'profiles',
      `update: rejected unknown moderation categories: ${rejected.join(', ')}`,
    );
  }
  return raw.filter((c) => allowed.includes(c));
};

// Mute le profile.theme si valide ('dark' | 'light' | falsy=undefined), sinon
// warn. Extraction symétrique à applyModerationCategories.
const applyTheme = (profile: Profile, theme: 'dark' | 'light' | undefined): void => {
  const isValid = !theme || theme === 'dark' || theme === 'light';
  if (isValid) {
    profile.theme = theme || undefined;
  } else {
    logger.warn('profiles', `update: rejected invalid theme '${theme}'`);
  }
};

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

// Helper de logs pour filterValidEntries — séparé pour rester sous CCN 8 et
// garder un message diagnostique précis (null/array/string/number/etc.).
const describeEntryShape = (value: unknown): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

export class ProfileStore {
  private readonly filePath: string;
  // Mirror du pattern `lastLoadFailed` de config.ts — évite un overwrite silencieux
  // d'un profiles.json corrompu sans backup, en forçant un `.corrupt.bak` au prochain
  // save. Réinitialisé à false dès qu'un load réussit ou qu'un backup a été créé.
  private lastLoadFailed = false;
  // Compte des entrées droppées au dernier list() (rows malformées + migrations échouées).
  // Permet aux routes de surfacer un signal au frontend (header X-Profiles-Dropped)
  // sinon le user voit un picker partiel sans savoir que des profils ont été masqués.
  private lastDroppedCount = 0;

  constructor(outputDir: string) {
    this.filePath = join(outputDir, 'profiles.json');
  }

  list(): Profile[] {
    this.lastDroppedCount = 0;
    if (!existsSync(this.filePath)) {
      this.lastLoadFailed = false;
      return [];
    }
    const parsed = this.readAndParse();
    if (parsed === null) return [];
    return this.migrateAndPersist(parsed);
  }

  getLastDroppedCount(): number {
    return this.lastDroppedCount;
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

  // Skip les entries non-object (null, primitives, arrays imbriqués) plutôt que de
  // laisser remonter l'exception à list(). Avant ce filet, un tableau JSON valide avec
  // une seule entrée corrompue (ex: legacy row=null) faisait crasher tous les endpoints
  // /api/profiles en 500 — alors que le pre-refactor try/catch monolithique convertissait
  // ça en [] silencieusement. Compromis : on log.warn par entrée invalide (visibilité)
  // et on garde les entries valides (résilience). Le fichier disque reste intact, l'admin
  // peut intervenir via .corrupt.bak si la corruption s'étend.
  private filterValidEntries(profiles: unknown[]): Profile[] {
    const valid: Profile[] = [];
    for (const [idx, entry] of profiles.entries()) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        logger.warn(
          'profiles',
          `dropped malformed entry at index ${idx} (type=${describeEntryShape(entry)})`,
        );
        continue;
      }
      valid.push(entry as Profile);
    }
    return valid;
  }

  // Itérer sur une copie : valid peut être muté par splice (drop on throw), et `for…of`
  // standard saute alors l'entrée d'après. Retourne {migrated, droppedByMigration}.
  // migrateProfile peut throw sur des shapes hostiles qui passent le typeof object
  // (ex: champ obligatoire manquant lu comme undefined → cascade TypeError) — on drop
  // l'entrée IN-MEMORY mais on N'EFFACE PAS la donnée du disque (caller-side).
  // Arrow class field plutôt que `private method()` : casse l'agglomération du parseur
  // TS Lizard avec migrateAndPersist (cf. CLAUDE.md "Pièges connus").
  private migrateInPlace = (
    valid: Profile[],
  ): { migrated: boolean; droppedByMigration: boolean } => {
    let migrated = false;
    let droppedByMigration = false;
    for (const p of [...valid]) {
      try {
        if (migrateProfile(p)) migrated = true;
      } catch (e) {
        logger.warn('profiles', `dropped entry id=${p.id ?? '<no-id>'} (migration failed):`, e);
        const idx = valid.indexOf(p);
        if (idx >= 0) valid.splice(idx, 1);
        droppedByMigration = true;
      }
    }
    return { migrated, droppedByMigration };
  };

  private migrateAndPersist(profiles: Profile[]): Profile[] {
    const before = profiles.length;
    const valid = this.filterValidEntries(profiles);
    const filterDropped = valid.length !== profiles.length;
    const { migrated: migratedFromLoop, droppedByMigration } = this.migrateInPlace(valid);
    this.lastDroppedCount = before - valid.length;
    this.lastLoadFailed = false;
    // Backup AVANT le early return droppedByMigration : si filterDropped et migration
    // throw coexistent (rows null + rows hostiles dans le même fichier), on retournait
    // sans aucun backup créé — l'admin n'avait alors aucun signal disque que des shapes
    // invalides traînaient. Le backup est idempotent (skip si déjà créé), donc safe à
    // déclencher avant le branchement. Le disque reste intact dans tous les cas (pas de
    // save sur droppedByMigration — cf. ligne au-dessous).
    if (filterDropped && existsSync(this.filePath)) {
      this.backupCorrupt();
    }
    // Drops par migration (throw) : NE save PAS la liste filtrée, sinon les profils
    // corrompus seraient définitivement perdus du disque. Le user perd l'accès tant
    // qu'un correctif n'est pas déployé, mais ses données restent inspectables.
    if (droppedByMigration) return valid;
    if (filterDropped || migratedFromLoop) {
      try {
        this.save(valid);
      } catch (e) {
        // Migration auto-save failure : on ne re-throw pas (le load reste valide en
        // mémoire), log.error pour observabilité. La prochaine save() user-initiée
        // tentera à nouveau (idempotent en pratique).
        logger.error('profiles', 'migration persist failed (continuing in-memory):', e);
      }
    }
    return valid;
  }

  private save(profiles: Profile[]) {
    // Si le boot précédent a détecté un fichier corrompu, tenter un backup `.corrupt.bak`
    // avant overwrite. Fichier supprimé manuellement entre list() et save() : rien à backup.
    // Reset systématique après writeFileSync réussi (miroir config.ts) : si write throw,
    // l'exception propage avant le reset → flag préservé → retry correct au prochain save.
    // Si write réussit mais backup avait échoué, le contenu corrompu est de toute façon
    // perdu (overwrite) — garder le flag risquerait de backup le NOUVEAU contenu valide.
    if (this.lastLoadFailed && existsSync(this.filePath) && this.diskStillCorrupt()) {
      this.backupCorrupt();
    }
    try {
      writeFileSync(this.filePath, JSON.stringify(profiles, null, 2));
    } catch (e) {
      logger.error('profiles', 'failed to persist profiles.json:', e);
      throw e;
    }
    this.lastLoadFailed = false;
  }

  // Re-vérifie le contenu disque avant de créer .corrupt.bak. Couvre le scénario où
  // l'admin a réparé manuellement profiles.json entre le list() qui a flag lastLoadFailed
  // et le save() courant — sans cette garde on backup le contenu désormais valide comme
  // s'il était corrompu (false positive .corrupt.bak qui peut affoler le post-mortem).
  private diskStillCorrupt(): boolean {
    try {
      const raw = JSON.parse(readFileSync(this.filePath, 'utf-8'));
      return !Array.isArray(raw);
    } catch {
      return true;
    }
  }

  private backupCorrupt(): void {
    const backupPath = `${this.filePath}.corrupt.bak`;
    if (existsSync(backupPath)) return;
    try {
      copyFileSync(this.filePath, backupPath);
      logger.warn('profiles', `backed up corrupt profiles.json to ${backupPath}`);
    } catch (e) {
      // logger.error (pas warn) : on est sur le chemin "fichier corrompu va être
      // écrasé sans backup possible" — perte de données réelle, pas une simple
      // condition warn. Sévérité ERROR alignée sur config.ts:217 (même cas).
      logger.error(
        'profiles',
        'failed to create .corrupt.bak (corrupt content will be lost on overwrite):',
        e,
      );
    }
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
      profile.moderationCategories = applyModerationCategories(updates.moderationCategories);
    }
    if (updates.useConsigne !== undefined) profile.useConsigne = updates.useConsigne;
    if (updates.chatEnabled !== undefined) profile.chatEnabled = updates.chatEnabled;
    if (updates.mistralVoices !== undefined) {
      // Accepte uniquement null (reset) ou objet structuré. Primitives (string/number/
      // boolean) ET arrays sont rejetés avec warn — sans ça, un client buggé qui POSTe
      // `mistralVoices: "Marie"` ou `mistralVoices: []` recevrait 200 OK alors que ses
      // voix existantes seraient écrasées (typeof [] === 'object', donc passerait dans
      // normalizeMistralVoices qui retournerait undefined faute de host/guest).
      // Cohérent avec normalizeMistralVoices.warnIfSilentDrop.
      if (Array.isArray(updates.mistralVoices)) {
        logger.warn('profiles', 'update: rejected array mistralVoices payload');
      } else if (updates.mistralVoices === null || typeof updates.mistralVoices === 'object') {
        profile.mistralVoices = normalizeMistralVoices(updates.mistralVoices);
      } else {
        logger.warn(
          'profiles',
          `update: rejected non-object mistralVoices (type=${typeof updates.mistralVoices})`,
        );
      }
    }
    if (updates.theme !== undefined) {
      applyTheme(profile, updates.theme);
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
