import { Router } from 'express';
import { ProfileStore, verifyPin, profileToPublic } from '../profiles.js';
import { ProjectStore } from '../store.js';

const isValidName = (name: unknown): boolean => typeof name === 'string' && name.trim().length > 0;

const isValidAge = (age: unknown): age is number =>
  typeof age === 'number' && age >= 4 && age <= 120;

const isValidPin = (pin: unknown): pin is string => typeof pin === 'string' && /^\d{4}$/.test(pin);

const validateCreateProfileInput = (body: any): string | null => {
  if (!isValidName(body?.name)) return 'Nom requis';
  if (!isValidAge(body?.age)) return 'Age invalide (4-120)';
  if (body.age < 15 && !isValidPin(body?.pin))
    return 'Code PIN 4 chiffres requis pour les moins de 15 ans';
  return null;
};

type CreateProfileArgs = Parameters<ProfileStore['create']>;

const buildCreateProfileArgs = (body: any): CreateProfileArgs => [
  body.name.trim(),
  body.age,
  body.avatar || '0',
  body.locale || 'fr',
  body.age < 15 ? body.pin : undefined,
];

const PARENTAL_FIELDS = ['useModeration', 'moderationCategories', 'chatEnabled', 'age'] as const;

type ProfileRecord = ReturnType<ProfileStore['get']> & {};

const parentalFieldChanged = (profile: ProfileRecord, fields: any, key: string): boolean => {
  if (fields[key] === undefined) return false;
  if (key === 'moderationCategories') {
    return JSON.stringify(fields[key]) !== JSON.stringify(profile[key]);
  }
  return fields[key] !== (profile as any)[key];
};

const hasParentalChange = (profile: ProfileRecord, fields: any): boolean =>
  PARENTAL_FIELDS.some((f) => parentalFieldChanged(profile, fields, f));

const requiresPinForParentalChange = (profile: ProfileRecord, pin: unknown, fields: any): boolean =>
  !!profile.pinHash && !pin && hasParentalChange(profile, fields);

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

  router.get('/', (_req, res) => {
    res.json(store.list().map(profileToPublic));
  });

  router.post('/', (req, res) => {
    const validationError = validateCreateProfileInput(req.body);
    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }
    const profile = store.create(...buildCreateProfileArgs(req.body));
    res.json(profileToPublic(profile));
  });

  router.put('/:id', (req, res) => {
    const profile = store.get(req.params.id);
    if (!profile) {
      res.status(404).json({ error: 'Profil introuvable' });
      return;
    }
    const { pin, _updatedAt, ...fields } = req.body;

    if (pinMismatch(profile, pin)) {
      res.status(403).json({ error: 'Code PIN incorrect' });
      return;
    }
    if (Object.keys(fields).length === 0) {
      res.json(profileToPublic(profile));
      return;
    }
    if (requiresPinForParentalChange(profile, pin, fields)) {
      res.status(403).json({ error: 'Code PIN incorrect' });
      return;
    }
    if (isStaleWrite(profile, _updatedAt)) {
      res.status(409).json({ error: 'stale', profile: profileToPublic(profile) });
      return;
    }
    const updated = store.update(req.params.id, fields);
    if (!updated) {
      res.status(404).json({ error: 'Profil introuvable' });
      return;
    }
    res.json(profileToPublic(updated));
  });

  router.delete('/:id', (req, res) => {
    const profileId = req.params.id;
    const profile = store.get(profileId);
    if (!profile) {
      res.status(404).json({ error: 'Profil introuvable' });
      return;
    }
    if (profile.pinHash) {
      const { pin } = req.body;
      if (!pin || !verifyPin(pin, profile.pinHash)) {
        res.status(403).json({ error: 'Code PIN incorrect' });
        return;
      }
    }
    const deletedProjects = cascadeDeleteProjects(projectStore, profileId);
    const ok = store.delete(profileId);
    if (!ok) {
      res.status(404).json({ error: 'Profil introuvable' });
      return;
    }
    res.json({ ok: true, deletedProjects });
  });

  return router;
}
