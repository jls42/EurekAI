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

// Filet anti-uncaughtException : par défaut Node throw "Unhandled error event"
// si quelqu'un appelle `bus.emit('error', ...)` sans listener attaché — ce qui
// est exactement notre chemin de propagation depuis `subscribeGeneration` quand
// un handler client throw. Le listener garantit que ces erreurs ne tuent pas
// le process et restent observables (console.error → captures Sentry).
bus.on('error', (err) => {
  console.error('[event-bus] listener error:', err);
});

const EVENT_NAME = 'generation';

export function emitGenerationEvent(event: GenerationEvent): void {
  bus.emit(EVENT_NAME, event);
}

// Souscription filtrée par projectId. Retourne un unsubscribe à appeler à la
// fermeture du stream SSE (close listener, error listener, ou heartbeat-stuck
// cleanup) pour éviter les fuites de listeners.
// Le wrapper attrape tout throw du handler client et re-emit sur le canal
// 'error' du bus — pour qu'une seule connexion SSE buggée ne crashe pas les N
// autres listeners ET que le filet `bus.on('error', ...)` ci-dessus soit le
// point unique de log/observabilité (pas de console.error in-line dispersés).
export function subscribeGeneration(
  pid: string,
  handler: (event: GenerationEvent) => void,
): () => void {
  const wrapped = (event: GenerationEvent) => {
    if (event.pid !== pid) return;
    try {
      handler(event);
    } catch (err) {
      bus.emit('error', err instanceof Error ? err : new Error(String(err)));
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
