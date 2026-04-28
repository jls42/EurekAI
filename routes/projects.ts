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
//
// Garde-fou writableEnded + try/catch : entre le `bus.emit` et le `res.write`,
// le socket peut s'être fermé (req.on('close') pas encore exécuté → unsubscribe
// pas encore appelé). Sans cette garde, res.write throw ERR_STREAM_WRITE_AFTER_END
// et l'EventEmitter propage l'erreur au listener (Node default = uncaught dans le
// callback → process crash). Pas besoin de logger en succès — c'est attendu.
function writeGenerationEvent(res: Response, event: GenerationEvent): void {
  if (res.writableEnded) return;
  try {
    res.write(`event: generation\n`);
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  } catch (err) {
    logger.warn('sse', `write after close, dropping event: ${String(err)}`);
  }
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
    // 404 explicite si le projet n'existe pas — sinon on laisserait un listener
    // EventEmitter attaché à vie sur un pid bidon (cap 50 → MaxListenersWarning
    // au bout de quelques typos client) et le stream pousserait des heartbeats
    // dans le vide jusqu'à TCP keepalive. Code stable pour mapping i18n côté UI.
    if (!store.getProject(pid)) {
      res.status(404).json({ error: 'project_not_found' });
      return;
    }
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
    // la connexion vivante. Compteur de throws consécutifs : si req.on('close')
    // ne fire jamais (bug Node socket half-open observé en prod), on stoppe
    // l'interval après 3 échecs au lieu de tourner ad vitam.
    const HEARTBEAT_MAX_CONSECUTIVE_THROWS = 3;
    let heartbeatThrows = 0;
    let cleanedUp = false;
    const cleanup = (reason: string) => {
      // Idempotent : req.on('close') ET res.on('error') peuvent firer ensemble
      // sur reset TCP brutal — on ne veut pas double-log + double-unsubscribe.
      if (cleanedUp) return;
      cleanedUp = true;
      clearInterval(heartbeat);
      unsubscribe();
      if (reason.startsWith('error:')) {
        logger.warn('sse', `client ${reason} from project ${pid}`);
        return;
      }
      logger.info('sse', `client ${reason} from project ${pid}`);
    };
    const heartbeat = setInterval(() => {
      if (res.writableEnded) return;
      try {
        res.write(`: keep-alive\n\n`);
        heartbeatThrows = 0;
      } catch (err) {
        heartbeatThrows++;
        if (heartbeatThrows >= HEARTBEAT_MAX_CONSECUTIVE_THROWS) {
          // Socket pourri sans close fire — cleanup forcé pour éviter la fuite.
          logger.warn(
            'sse',
            `heartbeat write throwing repeatedly, forcing cleanup: ${String(err)}`,
          );
          cleanup('heartbeat-stuck');
        }
      }
    }, SSE_HEARTBEAT_MS);

    req.on('close', () => cleanup('disconnected'));
    // Listener err sur res : si le serveur tente d'écrire après reset TCP brutal,
    // Node émet 'error' sur res. Sans listener, ça remonte uncaught et crash.
    res.on('error', (err) => cleanup(`error: ${String(err)}`));
  });

  return router;
}
