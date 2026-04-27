import { Router, type Response } from 'express';
import type { ProjectStore } from '../store.js';
import { subscribeGeneration, type GenerationEvent } from '../helpers/event-bus.js';
import { logger } from '../helpers/logger.js';

const SSE_HEARTBEAT_MS = 25_000;

// Écrit un event SSE au format spécifié par le client EventSource :
//   event: generation
//   data: {...JSON...}
//
// La ligne `event: generation` est obligatoire pour matcher
// addEventListener('generation', ...) côté client. Sans elle, l'event serait
// dispatché comme 'message' (générique).
function writeGenerationEvent(res: Response, event: GenerationEvent): void {
  res.write(`event: generation\n`);
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

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
    const totalCost = (project.costLog ?? []).reduce((sum, e) => sum + e.cost, 0);
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

  // SSE : flux temps réel des transitions du pending tracker pour ce projet.
  // Le client (EventSource) souscrit au boot de chaque selectProject et reçoit
  // les events pending → completed/failed/cancelled au fil de l'eau.
  //
  // Pas de buffering / replay : un event émis avant la connexion est perdu.
  // La réconciliation côté client (snapshot project.json + ledger seenEventKeys)
  // couvre ce cas pour les events ratés (refresh, coupure réseau).
  router.get('/:pid/events', (req, res) => {
    const pid = req.params.pid;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // Désactive le buffering proxy (nginx, etc.) qui sinon retient les events.
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    const unsubscribe = subscribeGeneration(pid, (event) => {
      writeGenerationEvent(res, event);
    });

    // Heartbeat pour empêcher les proxies de couper la connexion idle. Les
    // commentaires SSE (`: ...`) sont ignorés par le client mais maintiennent
    // la connexion vivante.
    const heartbeat = setInterval(() => {
      res.write(`: keep-alive\n\n`);
    }, SSE_HEARTBEAT_MS);

    req.on('close', () => {
      clearInterval(heartbeat);
      unsubscribe();
      logger.info('sse', `client disconnected from project ${pid}`);
    });
  });

  return router;
}
