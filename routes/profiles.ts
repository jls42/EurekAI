import { Router, type Request, type Response } from 'express';
import { ProfileStore, verifyPin, profileToPublic } from '../profiles.js';
import { ProjectStore } from '../store.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import type { Profile } from '../types.js';

const ERR_PROFILE_NOT_FOUND = 'Profil introuvable';
const ERR_PIN_WRONG = 'Code PIN incorrect';
const ERR_PROFILE_DELETE_PARTIAL = 'profile_delete_partial';

const isValidName = (name: unknown): boolean => typeof name === 'string' && name.trim().length > 0;

const isValidAge = (age: unknown): age is number =>
  typeof age === 'number' && age >= 4 && age <= 120;

const isValidPin = (pin: unknown): pin is string => typeof pin === 'string' && /^\d{4}$/.test(pin);

interface RawCreateProfileBody {
  name?: unknown;
  age?: unknown;
  avatar?: string;
  locale?: string;
  pin?: unknown;
}

// Champs acceptés à la création (cf. buildCreateProfileArgs). Tout autre champ est
// silencieusement ignoré par store.create — un client UI stale qui POSTerait
// `mistralVoices` ou `theme` croirait avoir setté une valeur. On warn pour signaler
// le drop, symétrique au warn dans store.update().
const CREATE_PROFILE_ALLOWED_FIELDS = new Set(['name', 'age', 'avatar', 'locale', 'pin']);

const warnUnknownCreateFields = (body: Record<string, unknown>): void => {
  const unknown = Object.keys(body).filter((k) => !CREATE_PROFILE_ALLOWED_FIELDS.has(k));
  if (unknown.length > 0) {
    logger.warn(
      'profiles',
      `POST /: ignored fields not supported on creation: ${unknown.join(', ')}`,
    );
  }
};

export interface CreateProfileBody {
  name: string;
  age: number;
  avatar: string;
  locale: string;
  pin?: string;
}

const validateCreateProfileInput = (body: RawCreateProfileBody): string | null => {
  if (!isValidName(body?.name)) return 'Nom requis';
  if (!isValidAge(body?.age)) return 'Age invalide (4-120)';
  if (body.age < 15 && !isValidPin(body?.pin))
    return 'Code PIN 4 chiffres requis pour les moins de 15 ans';
  return null;
};

const isValidLocale = (locale: unknown): boolean =>
  typeof locale === 'string' && locale.trim().length > 0;

const isValidAvatar = (avatar: unknown): boolean => typeof avatar === 'string';
const isValidBoolean = (value: unknown): boolean => typeof value === 'boolean';
const isValidModerationCategories = (value: unknown): boolean =>
  Array.isArray(value) && value.every((category) => typeof category === 'string');

// Symétrique à validateCreateProfileInput, mais champs optionnels (PUT partial update).
// Lookup table plutôt qu'une chaîne de `if`s — garde la fonction sous CCN 8 (cf. CLAUDE.md).
// Sans cette validation, un client buggé qui POST `age:-50` ou `name: 12345` voyait
// `store.update` accepter le payload silencieusement (ageGroup recalculé en 'enfant'
// pour age négatif, name écrit en number/empty). Le store reste un layer persistance
// best-effort, la validation HTTP doit fail-closed à la frontière.
const UPDATE_FIELD_VALIDATORS: ReadonlyArray<{
  field:
    | 'name'
    | 'age'
    | 'locale'
    | 'avatar'
    | 'useModeration'
    | 'moderationCategories'
    | 'useConsigne'
    | 'chatEnabled';
  isValid: (v: unknown) => boolean;
  error: string;
}> = [
  { field: 'name', isValid: isValidName, error: 'Nom invalide' },
  { field: 'age', isValid: isValidAge, error: 'Age invalide (4-120)' },
  { field: 'locale', isValid: isValidLocale, error: 'Locale invalide' },
  { field: 'avatar', isValid: isValidAvatar, error: 'Avatar invalide' },
  { field: 'useModeration', isValid: isValidBoolean, error: 'Modération invalide' },
  {
    field: 'moderationCategories',
    isValid: isValidModerationCategories,
    error: 'Catégories de modération invalides',
  },
  { field: 'useConsigne', isValid: isValidBoolean, error: 'Consigne invalide' },
  { field: 'chatEnabled', isValid: isValidBoolean, error: 'Chat invalide' },
];

const validateUpdateProfileInput = (fields: Record<string, unknown>): string | null => {
  for (const { field, isValid, error } of UPDATE_FIELD_VALIDATORS) {
    if (fields[field] !== undefined && !isValid(fields[field])) return error;
  }
  return null;
};

type CreateProfileArgs = Parameters<ProfileStore['create']>;

const buildCreateProfileArgs = (body: RawCreateProfileBody): CreateProfileArgs => [
  (body.name as string).trim(),
  body.age as number,
  body.avatar || '0',
  body.locale || 'fr',
  (body.age as number) < 15 ? (body.pin as string) : undefined,
];

const PARENTAL_FIELDS = ['useModeration', 'moderationCategories', 'chatEnabled', 'age'] as const;

type ProfileRecord = ReturnType<ProfileStore['get']> & {};
type ProfileUpdateFields = Partial<Profile>;
type UpdateBody = Record<string, unknown>;
type UpdateGuardResult = { status?: number; body: Record<string, unknown> };

const isUpdateBody = (body: unknown): body is UpdateBody =>
  !!body && typeof body === 'object' && !Array.isArray(body);

const parentalFieldChanged = (
  profile: ProfileRecord,
  fields: ProfileUpdateFields,
  key: (typeof PARENTAL_FIELDS)[number],
): boolean => {
  if (fields[key] === undefined) return false;
  if (key === 'moderationCategories') {
    return JSON.stringify(fields[key]) !== JSON.stringify(profile[key]);
  }
  return fields[key] !== profile[key];
};

const hasParentalChange = (profile: ProfileRecord, fields: ProfileUpdateFields): boolean =>
  PARENTAL_FIELDS.some((f) => parentalFieldChanged(profile, fields, f));

const requiresPinForParentalChange = (
  profile: ProfileRecord,
  pin: unknown,
  fields: ProfileUpdateFields,
): boolean => !!profile.pinHash && !pin && hasParentalChange(profile, fields);

const pinMismatch = (profile: ProfileRecord, pin: unknown): boolean =>
  !!profile.pinHash && !!pin && !verifyPin(pin as string, profile.pinHash);

const isStaleWrite = (profile: ProfileRecord, updatedAt: unknown): boolean => {
  // Refuse les types non-string (number, object, array...) qui coerceraient en NaN
  // dans le `<` : `0 < 'iso-string'` retourne `false` silencieusement → stale-write
  // protection contournée. On traite ces shapes comme "client n'a pas envoyé de tag",
  // équivalent à `_updatedAt` absent — pas de blocage mais pas de faux pass non plus.
  if (typeof updatedAt !== 'string' || !updatedAt) return false;
  if (!profile.updatedAt) return false;
  return updatedAt < profile.updatedAt;
};

const buildUpdateGuardResult = (
  profile: ProfileRecord,
  pin: unknown,
  fields: ProfileUpdateFields & UpdateBody,
  updatedAt: unknown,
): UpdateGuardResult | null => {
  if (pinMismatch(profile, pin)) return { status: 403, body: { error: ERR_PIN_WRONG } };
  if (Object.keys(fields).length === 0) return { body: profileToPublic(profile) };
  const validationError = validateUpdateProfileInput(fields);
  if (validationError) return { status: 400, body: { error: validationError } };
  if (requiresPinForParentalChange(profile, pin, fields)) {
    return { status: 403, body: { error: ERR_PIN_WRONG } };
  }
  if (isStaleWrite(profile, updatedAt)) {
    return { status: 409, body: { error: 'stale', profile: profileToPublic(profile) } };
  }
  return null;
};

const sendUpdateGuardResult = (res: Response, result: UpdateGuardResult): void => {
  if (result.status) res.status(result.status);
  res.json(result.body);
};

// Cascade isolée par projet : un fail rmSync (EBUSY/EACCES Windows, FS RO) ou
// writeIndex throw n'interrompt plus la boucle. On supprime le profil uniquement si
// tous ses projets ont disparu ; sinon le profil reste présent pour permettre un retry.
const cascadeDeleteProjects = (
  projectStore: ProjectStore,
  profileId: string,
): { deleted: number; failed: string[] } => {
  const projects = projectStore.listProjects(profileId);
  let deleted = 0;
  const failed: string[] = [];
  for (const p of projects) {
    if (p.profileId !== profileId) continue;
    try {
      projectStore.deleteProject(p.id);
      deleted++;
    } catch (e) {
      // Logger args list (pas de template literal) : évite le faux positif Codacy
      // 'tainted-sql-string' qui flagge ${p.id} dans un string contenant 'delete'.
      // Pas de SQL ici, mais la rule pattern-match sur keyword + user input.
      logger.warn('profiles', 'cascade delete failed for project', p.id, e);
      failed.push(p.id);
    }
  }
  return { deleted, failed };
};

export function profileRoutes(outputDir: string, projectStore: ProjectStore): Router {
  const store = new ProfileStore(outputDir);
  const router = Router();

  // Wrap les handlers pour catcher les erreurs de persistence (ENOSPC, EACCES, EIO).
  // Sans ça, Express renvoie sa réponse par défaut — en dev, la stacktrace HTML peut
  // exposer le path absolu ~/.eurekai/output/profiles.json. Pattern aligné sur
  // routes/generate.ts (extractErrorCode + logger.error côté serveur).
  // Le générique préserve l'inférence Express<P, ...> pour que req.params.id reste typé `string`.
  // Garde-fou async : si un futur handler retourne une Promise, on attache un .catch()
  // — le `try/catch` sync ne capturerait sinon que le throw synchrone et un async error
  // remonterait au error-handler Express par défaut (fuite path en dev).
  const reportHandlerError = (req: Request, res: Response, e: unknown) => {
    logger.error('profiles', `${req.method} ${req.url} error:`, e);
    if (!res.headersSent) {
      res.status(500).json({ error: extractErrorCode(e, 'profiles') });
    }
  };
  const handle =
    <H extends (req: Request, res: Response) => void | Promise<void>>(fn: H) =>
    (req: Parameters<H>[0], res: Parameters<H>[1]) => {
      try {
        const result = fn(req, res) as unknown;
        if (result && typeof (result as Promise<unknown>).then === 'function') {
          (result as Promise<unknown>).catch((e) => reportHandlerError(req, res, e));
        }
      } catch (e) {
        reportHandlerError(req, res, e);
      }
    };

  router.get(
    '/',
    handle((_req, res) => {
      const profiles = store.list().map(profileToPublic);
      // Signal au frontend les entrées masquées (rows malformées, migration failed) —
      // sinon le user voit un picker partiel sans savoir que des profils existent
      // sur disque mais ne sont pas exposés (cf. PR review I3).
      const dropped = store.getLastDroppedCount();
      if (dropped > 0) {
        res.setHeader('X-Profiles-Dropped', String(dropped));
      }
      res.json(profiles);
    }),
  );

  router.post(
    '/',
    handle((req, res) => {
      const validationError = validateCreateProfileInput(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }
      warnUnknownCreateFields(req.body);
      const profile = store.create(...buildCreateProfileArgs(req.body));
      res.json(profileToPublic(profile));
    }),
  );

  router.put(
    '/:id',
    handle((req, res) => {
      const id = req.params.id as string;
      const profile = store.get(id);
      if (!profile) {
        res.status(404).json({ error: ERR_PROFILE_NOT_FOUND });
        return;
      }
      if (!isUpdateBody(req.body)) {
        res.status(400).json({ error: 'Payload invalide' });
        return;
      }
      const { pin, _updatedAt, ...fields } = req.body;
      const guardResult = buildUpdateGuardResult(profile, pin, fields, _updatedAt);
      if (guardResult) {
        sendUpdateGuardResult(res, guardResult);
        return;
      }
      const updated = store.update(id, fields);
      if (!updated) {
        res.status(404).json({ error: ERR_PROFILE_NOT_FOUND });
        return;
      }
      res.json(profileToPublic(updated));
    }),
  );

  router.delete(
    '/:id',
    handle((req, res) => {
      const profileId = req.params.id as string;
      const profile = store.get(profileId);
      if (!profile) {
        res.status(404).json({ error: ERR_PROFILE_NOT_FOUND });
        return;
      }
      if (profile.pinHash) {
        const { pin } = req.body;
        if (!pin || !verifyPin(pin, profile.pinHash)) {
          res.status(403).json({ error: ERR_PIN_WRONG });
          return;
        }
      }
      const { deleted, failed } = cascadeDeleteProjects(projectStore, profileId);
      if (failed.length > 0) {
        logger.warn(
          'profiles',
          `${failed.length} project(s) blocked profile ${profileId} delete: ${failed.join(', ')}`,
        );
        res.status(500).json({
          error: ERR_PROFILE_DELETE_PARTIAL,
          deletedProjects: deleted,
          failedProjects: failed,
        });
        return;
      }
      const ok = store.delete(profileId);
      if (!ok) {
        res.status(404).json({ error: ERR_PROFILE_NOT_FOUND });
        return;
      }
      const response: {
        ok: true;
        deletedProjects: number;
      } = { ok: true, deletedProjects: deleted };
      res.json(response);
    }),
  );

  return router;
}
