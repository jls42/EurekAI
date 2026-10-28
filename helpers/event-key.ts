import type { AutoRunStatus, GenerationStatus } from '../types.js';

// Brand client/serveur partagé (zéro runtime, zéro dépendance Node) — peut être
// importé depuis src/ sans tirer node:events. event-bus.ts re-export pour
// rétrocompat.
//
// Format canonique : 'generation:${gid}:${status}'. Source unique des call sites
// d'émission (store.buildEventBase, payload 200 fallback côté client) →
// dédup idempotente cross-tabs garantie tant que personne ne mint un EventKey
// hors `buildEventKey`.
export type EventKey = string & { readonly __brand: 'EventKey' };

export function buildEventKey(gid: string, status: GenerationStatus): EventKey {
  return `generation:${gid}:${status}` as EventKey;
}

// Bilan d'un lot Auto (toast final et notification) : 'auto:${runId}:${status}'. Même brand, même
// dédup idempotente des notifications entre onglets.
export function buildAutoRunEventKey(runId: string, status: AutoRunStatus): EventKey {
  return `auto:${runId}:${status}` as EventKey;
}
