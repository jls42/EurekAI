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

const cascadeDeleteProjects = (projectStore: ProjectStore, profileId: string): number => {
  const projects = projectStore.listProjects(profileId);
  let deleted = 0;
  for (const p of projects) {
    if (p.profileId === profileId) {
      projectStore.deleteProject(p.id);
      deleted++;
    }
  }
  return deleted;
};

export function profileRoutes(outputDir: string, projectStore: ProjectStore): Router {
  const store = new ProfileStore(outputDir);
  const router = Router();

  // Wrap les handlers pour catcher les erreurs de persistence (ENOSPC, EACCES, EIO).
  // Sans ça, Express renvoie sa réponse par défaut — en dev, la stacktrace HTML peut
  // exposer le path absolu ~/.eurekai/output/profiles.json. Pattern aligné sur
  // routes/generate.ts (extractErrorCode + logger.error côté serveur).
  // Le générique préserve l'inférence Express<P, ...> pour que req.params.id reste typé `string`.
  const handle =
    <H extends (req: Request, res: Response) => void>(fn: H) =>
    (req: Parameters<H>[0], res: Parameters<H>[1]) => {
      try {
        fn(req, res);
      } catch (e) {
        logger.error('profiles', `${req.method} ${req.url} error:`, e);
        if (!res.headersSent) {
          res.status(500).json({ error: extractErrorCode(e, 'profiles') });
        }
      }
    };

  router.get(
    '/',
    handle((_req, res) => {
      res.json(store.list().map(profileToPublic));
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
      const deletedProjects = cascadeDeleteProjects(projectStore, profileId);
      const ok = store.delete(profileId);
      if (!ok) {
        res.status(404).json({ error: ERR_PROFILE_NOT_FOUND });
        return;
      }
      res.json({ ok: true, deletedProjects });
    }),
  );

  return router;
}
