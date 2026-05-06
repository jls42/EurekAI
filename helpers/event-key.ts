import type { GenerationStatus } from '../types.js';

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
