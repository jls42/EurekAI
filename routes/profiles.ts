import { Router, type Request, type Response } from 'express';
import { ProfileStore, verifyPin, profileToPublic } from '../profiles.js';
import { ProjectStore } from '../store.js';
import { logger } from '../helpers/logger.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import type { Profile } from '../types.js';

const ERR_PROFILE_NOT_FOUND = 'Profil introuvable';
const ERR_PIN_WRONG = 'Code PIN incorrect';

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

const isStaleWrite = (profile: ProfileRecord, updatedAt: unknown): boolean =>
  !!updatedAt && !!profile.updatedAt && (updatedAt as string) < profile.updatedAt;

// Cascade isolée par projet : un fail rmSync (EBUSY/EACCES Windows, FS RO) ou
// writeIndex throw n'interrompt plus la boucle — on collecte les ids restants pour
// que le client puisse réessayer. Avant cette protection, le compteur retourné dans
// la 200 OK mentait sur les projets effectivement supprimés.
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
      logger.warn('profiles', `cascade delete failed for project ${p.id}:`, e);
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
      const { pin, _updatedAt, ...fields } = req.body;

      if (pinMismatch(profile, pin)) {
        res.status(403).json({ error: ERR_PIN_WRONG });
        return;
      }
      if (Object.keys(fields).length === 0) {
        res.json(profileToPublic(profile));
        return;
      }
      if (requiresPinForParentalChange(profile, pin, fields)) {
        res.status(403).json({ error: ERR_PIN_WRONG });
        return;
      }
      if (isStaleWrite(profile, _updatedAt)) {
        res.status(409).json({ error: 'stale', profile: profileToPublic(profile) });
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
      // Delete profile AVANT cascade : si store.delete fail (race avec un autre DELETE,
      // corruption détectée à la save), on ne touche pas aux projets. Sinon le user
      // verrait "404 Profil introuvable" alors que ses projets ont déjà été supprimés.
      const ok = store.delete(profileId);
      if (!ok) {
        res.status(404).json({ error: ERR_PROFILE_NOT_FOUND });
        return;
      }
      const { deleted, failed } = cascadeDeleteProjects(projectStore, profileId);
      if (failed.length > 0) {
        logger.warn(
          'profiles',
          `${failed.length} project(s) orphaned after profile ${profileId} delete: ${failed.join(', ')}`,
        );
      }
      const response: {
        ok: true;
        deletedProjects: number;
        failedProjects?: string[];
      } = { ok: true, deletedProjects: deleted };
      if (failed.length > 0) response.failedProjects = failed;
      res.json(response);
    }),
  );

  return router;
}
