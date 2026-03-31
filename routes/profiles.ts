import { Router } from 'express';
import { ProfileStore, verifyPin, profileToPublic } from '../profiles.js';
import { ProjectStore } from '../store.js';

export function profileRoutes(outputDir: string, projectStore: ProjectStore): Router {
  const store = new ProfileStore(outputDir);
  const router = Router();

  router.get('/', (_req, res) => {
    res.json(store.list().map(profileToPublic));
  });

  router.post('/', (req, res) => {
    const { name, age, avatar, locale, pin } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: 'Nom requis' });
      return;
    }
    if (typeof age !== 'number' || age < 4 || age > 120) {
      res.status(400).json({ error: 'Age invalide (4-120)' });
      return;
    }
    // PIN required for children under 15
    if (age < 15) {
      if (!pin || typeof pin !== 'string' || !/^\d{4}$/.test(pin)) {
        res.status(400).json({ error: 'Code PIN 4 chiffres requis pour les moins de 15 ans' });
        return;
      }
    }
    const profile = store.create(
      name.trim(),
      age,
      avatar || '0',
      locale || 'fr',
      age < 15 ? pin : undefined,
    );
    res.json(profileToPublic(profile));
  });

  const PARENTAL_FIELDS = ['useModeration', 'moderationCategories', 'chatEnabled'];

  router.put('/:id', (req, res) => {
    const profile = store.get(req.params.id);
    if (!profile) {
      res.status(404).json({ error: 'Profil introuvable' });
      return;
    }
    // PIN only required for parental control fields
    if (profile.pinHash) {
      const hasParentalChange = PARENTAL_FIELDS.some((f) => req.body[f] !== undefined);
      if (hasParentalChange) {
        const { pin } = req.body;
        if (!pin || !verifyPin(pin, profile.pinHash)) {
          res.status(403).json({ error: 'Code PIN incorrect' });
          return;
        }
      }
    }
    const updated = store.update(req.params.id, req.body);
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
    // If profile has PIN, verify it
    if (profile.pinHash) {
      const { pin } = req.body;
      if (!pin || !verifyPin(pin, profile.pinHash)) {
        res.status(403).json({ error: 'Code PIN incorrect' });
        return;
      }
    }
    // Cascade: delete all projects belonging to this profile
    const projects = projectStore.listProjects(profileId);
    let deletedProjects = 0;
    for (const p of projects) {
      if (p.profileId === profileId) {
        projectStore.deleteProject(p.id);
        deletedProjects++;
      }
    }
    const ok = store.delete(profileId);
    if (!ok) {
      res.status(404).json({ error: 'Profil introuvable' });
      return;
    }
    res.json({ ok: true, deletedProjects });
  });

  return router;
}
