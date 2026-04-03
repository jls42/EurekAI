import { Router } from 'express';
import type { ProjectStore } from '../store.js';

export function projectRoutes(store: ProjectStore): Router {
  const router = Router();

  router.get('/', (req, res) => {
    const profileId = req.query.profileId as string | undefined;
    res.json(store.listProjects(profileId));
  });

  router.post('/', (req, res) => {
    const { name, profileId } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: 'Nom requis' });
      return;
    }
    const project = store.createProject(name.trim(), profileId);
    res.json(project.meta);
  });

  router.get('/:pid', (req, res) => {
    const project = store.getProject(req.params.pid);
    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }
    const totalCost = [
      ...(project.costLog ?? []).map((e) => e.cost),
      ...project.results.generations.map((g) => g.estimatedCost ?? 0),
      ...project.sources.map((s) => s.estimatedCost ?? 0),
    ].reduce((a, b) => a + b, 0);
    res.json({ ...project, totalCost: Math.round(totalCost * 1_000_000) / 1_000_000 });
  });

  router.put('/:pid', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: 'Nom requis' });
      return;
    }
    store.renameProject(req.params.pid, name.trim());
    res.json({ ok: true });
  });

  router.delete('/:pid', (req, res) => {
    store.deleteProject(req.params.pid);
    res.json({ ok: true });
  });

  return router;
}
