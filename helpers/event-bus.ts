import { EventEmitter } from 'node:events';
import type {
  FailedStepCode,
  Generation,
  GenerationStatus,
  TrackedGenerationType,
} from '../types.js';

// Bus d'événements en mémoire pour les changements d'état de pending tracker.
// Utilisé par les routes SSE (`GET /api/projects/:pid/events`) pour pousser les
// transitions pending → completed/failed/cancelled aux clients connectés en
// temps réel. Mono-process : pas de Redis ni pub/sub externe — un EventEmitter
// Node suffit pour le déploiement single-PC d'EurekAI.
//
// Le bus n'a pas de buffering / replay : un client qui se connecte après
// l'émission ne reçoit pas l'event passé. La réconciliation côté client
// (snapshot project.json + ledger seenEventKeys) couvre ce cas.

export interface GenerationEvent {
  pid: string;
  gid: string;
  type: TrackedGenerationType;
  status: GenerationStatus;
  failureCode?: FailedStepCode;
  // Présent uniquement si status === 'completed' (le tracker n'a pas le payload
  // data ; on l'attache à l'event pour permettre au client de mettre à jour son
  // state.generations sans refetch).
  generation?: Generation;
  at: string;
  // Identifiant stable cross-onglets pour la déduplication idempotente côté
  // client (notifications.appendNotification + shownToastEventKeys).
  eventKey: string;
}

const bus = new EventEmitter();
// 50 listeners suffisent : 1 par client SSE connecté + ~5 marges. Dépasser
// 50 indiquerait une fuite (handlers non désinscrits) plutôt qu'une vraie charge.
bus.setMaxListeners(50);

const EVENT_NAME = 'generation';

export function emitGenerationEvent(event: GenerationEvent): void {
  bus.emit(EVENT_NAME, event);
}

// Souscription filtrée par projectId. Retourne un unsubscribe à appeler dans
// le `req.on('close')` du handler SSE pour éviter les fuites de listeners.
export function subscribeGeneration(
  pid: string,
  handler: (event: GenerationEvent) => void,
): () => void {
  const wrapped = (event: GenerationEvent) => {
    if (event.pid === pid) handler(event);
  };
  bus.on(EVENT_NAME, wrapped);
  return () => {
    bus.off(EVENT_NAME, wrapped);
  };
}

// Construit un eventKey stable à partir du gid et du status (transition).
// Utilisé par les helpers store ET par les call sites client (réconciliation,
// payload 200 fallback) pour garantir que la même transition produit toujours
// la même clé, indépendamment du chemin (HTTP fetch, SSE, snapshot).
export function buildEventKey(gid: string, status: GenerationStatus): string {
  return `generation:${gid}:${status}`;
}
