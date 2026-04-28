import { EventEmitter } from 'node:events';
import type { GenerationEvent, GenerationStatus } from '../types.js';

// Bus d'événements en mémoire pour les changements d'état de pending tracker.
// Utilisé par les routes SSE (`GET /api/projects/:pid/events`) pour pousser les
// transitions pending → completed/failed/cancelled aux clients connectés en
// temps réel. Mono-process : pas de Redis ni pub/sub externe — un EventEmitter
// Node suffit pour le déploiement single-PC d'EurekAI.
//
// Le bus n'a pas de buffering / replay : un client qui se connecte après
// l'émission ne reçoit pas l'event passé. La réconciliation côté client
// (snapshot project.json + ledger seenEventKeys) couvre ce cas.
//
// `GenerationEvent` est une discriminated union sur `status` exportée depuis
// types.ts (source unique partagée serveur ↔ client) — `generation` n'existe
// que sur l'arm 'completed', `failureCode` que sur 'failed'/'cancelled'.

export type { GenerationEvent } from '../types.js';
export type EventKey = string & { readonly __brand: 'EventKey' };

const bus = new EventEmitter();
// 50 listeners suffisent : 1 par client SSE connecté + ~5 marges. Dépasser
// 50 indiquerait une fuite (handlers non désinscrits) plutôt qu'une vraie charge.
bus.setMaxListeners(50);

// Filet anti-uncaughtException : sans listener 'error', un throw d'un listener
// `generation` (ex: JSON.stringify circulaire, write-after-end non capturé)
// remonte en uncaughtException et tue le process. On absorbe ici en log error.
bus.on('error', (err) => {
  console.error('[event-bus] listener error:', err);
});

const EVENT_NAME = 'generation';

export function emitGenerationEvent(event: GenerationEvent): void {
  bus.emit(EVENT_NAME, event);
}

// Souscription filtrée par projectId. Retourne un unsubscribe à appeler dans
// le `req.on('close')` du handler SSE pour éviter les fuites de listeners.
// Le wrapped catch tout throw du handler client (writeGenerationEvent) pour
// éviter qu'une seule connexion SSE buggée ne crashe les N autres listeners.
export function subscribeGeneration(
  pid: string,
  handler: (event: GenerationEvent) => void,
): () => void {
  const wrapped = (event: GenerationEvent) => {
    if (event.pid !== pid) return;
    try {
      handler(event);
    } catch (err) {
      console.error('[event-bus] handler threw for pid=', pid, err);
    }
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
export function buildEventKey(gid: string, status: GenerationStatus): EventKey {
  return `generation:${gid}:${status}` as EventKey;
}
