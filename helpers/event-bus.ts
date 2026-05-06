import { EventEmitter } from 'node:events';
import type { GenerationEvent } from '../types.js';

// Bus d'événements en mémoire pour le pending tracker (single-process). Les
// transitions sont reconstruites côté client via le snapshot project.json + le
// ledger seenEventKeys — pas de buffering ici.

export type { GenerationEvent } from '../types.js';
// Re-export pour les call sites historiques (server.ts, store.ts, src/app/*).
// Source canonique : helpers/event-key.ts (client-safe, zéro dep Node).
export { buildEventKey, type EventKey } from './event-key.js';

const bus = new EventEmitter();
// 50 listeners suffisent : 1 par client SSE connecté + ~5 marges. Dépasser
// 50 indiquerait une fuite (handlers non désinscrits) plutôt qu'une vraie charge.
bus.setMaxListeners(50);

const EVENT_NAME = 'generation';
const ERROR_EVENT = 'error';

// Filet anti-uncaughtException : par défaut Node throw "Unhandled error event"
// si quelqu'un appelle `bus.emit(ERROR_EVENT, ...)` sans listener attaché — ce
// qui est exactement notre chemin de propagation depuis `subscribeGeneration`
// quand un handler client throw. Le listener garantit que ces erreurs ne tuent
// pas le process et restent observables (console.error → captures Sentry).
bus.on(ERROR_EVENT, (err) => {
  console.error('[event-bus] listener error:', err);
});

export function emitGenerationEvent(event: GenerationEvent): void {
  bus.emit(EVENT_NAME, event);
}

// Helper test-only : nombre de listeners actuellement attachés sur le canal
// 'generation'. Permet de verrouiller "404 sur pid inconnu ne fuit aucun
// listener" sans exposer le bus brut. Pas de dépendance ergonomique côté
// production code (les call sites passent par subscribeGeneration uniquement).
export function generationListenerCount(): number {
  return bus.listenerCount(EVENT_NAME);
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
  // eslint-disable-next-line no-unused-vars -- type-sig param required by TS
  handler: (_event: GenerationEvent) => void,
): () => void {
  const wrapped = (event: GenerationEvent) => {
    if (event.pid !== pid) return;
    try {
      handler(event);
    } catch (err) {
      const wrappedErr = err instanceof Error ? err : new Error(String(err));
      bus.emit(ERROR_EVENT, wrappedErr);
    }
  };
  bus.on(EVENT_NAME, wrapped);
  return () => {
    bus.off(EVENT_NAME, wrapped);
  };
}
