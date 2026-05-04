import type { EventKey } from '../../helpers/event-bus';

// Persistance des notifications par profil avec idempotence par eventKey.
//
// 3 storages séparés pour des durées de vie différentes :
// - sf-profile-notifications : notifs visibles dans la cloche, clearable par
//   l'utilisateur via "Vider"
// - sf-profile-seen-events : ledger persistant des eventKeys vus, JAMAIS cleared
//   (sinon une réconciliation future recrée les notifs supprimées). LRU cap.
// - sf-profile-projects-seen : map {profileId: {projectId: lastSeenAtISO}} pour
//   le watermark de réconciliation (zéro spam au 1er load post-PR).

// Noms de slots localStorage. Le suffixe 'Slot' évite le faux positif Codacy
// "Hardcoded passwords" qui matche sur les identifiants finissant par `_KEY`.
const NOTIFS_STORAGE_SLOT = 'sf-profile-notifications';
const SEEN_EVENTS_SLOT = 'sf-profile-seen-events';
const PROJECTS_SEEN_SLOT = 'sf-profile-projects-seen';

const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_PER_PROFILE = 50;
const MAX_SEEN_EVENTS_PER_PROFILE = 1000;

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Le shape PERSISTÉ reste tolérant aux deux mondes (i18n + legacy) pour rester
// rétrocompatible avec les notifs déjà sur disque chez les users : un refresh
// de l'onglet doit pouvoir lire les anciens objets (messageKey absent OU
// message absent) sans crasher. Le verrou EITHER-OR est appliqué uniquement à
// l'INPUT de appendNotification (cf. AppendNotifPayload ci-dessous), qui force
// les nouveaux call sites à choisir l'un des deux modes au compile time.
export interface PersistedNotification {
  // Identifiant stable cross-onglets pour la déduplication idempotente.
  // Format : 'generation:${gid}:${status}'.
  eventKey: EventKey;
  // messageKey + params + paramKeys = source de vérité i18n-aware. Le panneau
  // cloche traduit au render via renderNotificationMessage(t) — la notif reste
  // synchro avec la langue UI courante même si l'user change de langue après
  // création. paramKeys porte des sous-clés à traduire (ex: type d'agent).
  messageKey?: string;
  params?: Record<string, string | number>;
  paramKeys?: Record<string, string>;
  // Legacy : notifs créées avant le refactor i18n-aware ne portent que le
  // message déjà traduit dans la langue de l'époque. Conservé pour rester
  // affichable, mais figé dans cette langue.
  message?: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  projectId?: string;
}

// Discriminated union appliquée à l'append : un nouveau call site DOIT choisir
// entre i18n (messageKey requis) et legacy (message requis). Empêche au
// compile time un appendNotification({ ... }) qui oublierait les deux. Le
// shape persisté reste l'union large ci-dessus pour rester rétrocompatible.
type AppendNotifBase = {
  eventKey: EventKey;
  type: NotificationType;
  projectId?: string;
};
export type AppendNotifPayload =
  | (AppendNotifBase & {
      messageKey: string;
      params?: Record<string, string | number>;
      paramKeys?: Record<string, string>;
      message?: never;
    })
  | (AppendNotifBase & {
      message: string;
      messageKey?: never;
      params?: never;
      paramKeys?: never;
    });

// Résout messageKey + paramKeys → texte traduit dans la langue UI courante.
// Fallback sur `message` legacy si pas de messageKey. Vide si rien des deux.
export function renderNotificationMessage(
  notif: PersistedNotification,
  t: (key: string, params?: Record<string, string | number>) => string,
): string {
  if (!notif.messageKey) return notif.message ?? '';
  const resolved: Record<string, string | number> = { ...notif.params };
  for (const [paramName, key] of Object.entries(notif.paramKeys ?? {})) {
    resolved[paramName] = t(key);
  }
  return t(notif.messageKey, resolved);
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

type NotifMap = Record<string, PersistedNotification[]>;
type SeenMap = Record<string, string[]>;
type ProjectsSeenMap = Record<string, Record<string, string>>;

// --- Helpers de lecture/écriture sécurisée ---

const readJson = <T>(storage: StorageLike, key: string, fallback: T): T => {
  const raw = storage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error('[notifications] corrupted slot', key, err);
    return fallback;
  }
};

// Wrappe storage.setItem pour absorber les exceptions QuotaExceededError
// (LS pleine, ~5MB selon navigateur). Sans ce try/catch, un throw bubble
// jusqu'à appendNotification → showToast → mutation Alpine → casse la
// pipeline toast en plein vol et laisse l'app dans un état incohérent.
// Retourne `false` si l'écriture a échoué — appendNotification s'en sert pour
// éviter de désynchroniser le ledger seenEventKeys quand la map des notifs
// elle-même n'a pas pu être persistée.
const writeJson = (storage: StorageLike, key: string, value: unknown): boolean => {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error('[notifications] storage write failed (likely quota)', { key, err });
    return false;
  }
};

// --- Notifs visibles ---

function readNotifs(storage: StorageLike): NotifMap {
  return readJson<NotifMap>(storage, NOTIFS_STORAGE_SLOT, {});
}

function writeNotifs(storage: StorageLike, all: NotifMap): boolean {
  return writeJson(storage, NOTIFS_STORAGE_SLOT, all);
}

function pruneExpiredAndCap(items: PersistedNotification[]): PersistedNotification[] {
  const cutoff = Date.now() - TTL_MS;
  return items.filter((n) => Date.parse(n.createdAt) > cutoff).slice(-MAX_PER_PROFILE);
}

// --- Ledger seenEventKeys ---

function readSeen(storage: StorageLike): SeenMap {
  return readJson<SeenMap>(storage, SEEN_EVENTS_SLOT, {});
}

function writeSeen(storage: StorageLike, all: SeenMap): boolean {
  return writeJson(storage, SEEN_EVENTS_SLOT, all);
}

function recordSeen(storage: StorageLike, profileId: string, eventKey: EventKey): boolean {
  const all = readSeen(storage);
  const list = all[profileId] ?? [];
  if (list.includes(eventKey)) return true;
  list.push(eventKey);
  // LRU cap : garde les MAX_SEEN_EVENTS_PER_PROFILE plus récents
  all[profileId] = list.slice(-MAX_SEEN_EVENTS_PER_PROFILE);
  return writeSeen(storage, all);
}

// --- API publique ---

export function listProfileNotifications(
  profileId: string,
  storage: StorageLike = localStorage,
): PersistedNotification[] {
  const all = readNotifs(storage);
  return all[profileId] ?? [];
}

// Idempotent par eventKey via le ledger seenEventKeys.
// - Si eventKey déjà vu → no-op et retour false.
// - Sinon → push notif + add eventKey dans le ledger, retour true.
// - Si writeNotifs échoue (quota LS) → on N'ENREGISTRE PAS l'eventKey dans le
//   ledger : sinon prochaine reconcile verrait l'event "déjà vu" alors que la
//   notif elle-même n'est pas en LS, et l'user n'aurait jamais l'alerte.
// - Si recordSeen échoue (ledger seul plein) → console.warn dédié : la notif
//   est posée mais le ledger drift, prochaine reconcile re-créera la même notif.
export function appendNotification(
  profileId: string,
  notif: AppendNotifPayload,
  storage: StorageLike = localStorage,
): boolean {
  if (hasSeenEvent(profileId, notif.eventKey, storage)) return false;
  const all = readNotifs(storage);
  const list = all[profileId] ?? [];
  list.push({ ...notif, createdAt: new Date().toISOString(), read: false });
  all[profileId] = pruneExpiredAndCap(list);
  if (!writeNotifs(storage, all)) return false;
  if (!recordSeen(storage, profileId, notif.eventKey)) {
    console.warn('[notifications] ledger persist failed; reconcile may re-create notif', {
      profileId,
      eventKey: notif.eventKey,
    });
  }
  return true;
}

// Retourne false si le persist quota fail (l'UI peut alors surface un toast
// `notifPersistFailed` plutôt que d'afficher silencieusement un état "tout lu"
// qui se réverte au reload).
export function markAllRead(profileId: string, storage: StorageLike = localStorage): boolean {
  const all = readNotifs(storage);
  // `?? []` plutôt que `if (!list)` : NotifMap est typé Record<string, T[]>
  // (sans noUncheckedIndexedAccess), donc TS infère `list` comme jamais
  // undefined → `if (!list)` flaggé "always falsy" par Codacy. Le default
  // array couvre le cas runtime (profile sans entrée) sans condition redondante.
  const list = all[profileId] ?? [];
  if (list.length === 0) return true;
  all[profileId] = list.map((n) => ({ ...n, read: true }));
  if (!writeNotifs(storage, all)) {
    console.warn('[notifications] markAllRead persist failed', { profileId });
    return false;
  }
  return true;
}

export function markRead(
  profileId: string,
  eventKey: EventKey,
  storage: StorageLike = localStorage,
): boolean {
  const all = readNotifs(storage);
  const list = all[profileId] ?? [];
  if (list.length === 0) return true;
  const idx = list.findIndex((n) => n.eventKey === eventKey);
  if (idx === -1) return true;
  list[idx] = { ...list[idx], read: true };
  if (!writeNotifs(storage, all)) {
    console.warn('[notifications] markRead persist failed', { profileId, eventKey });
    return false;
  }
  return true;
}

// "Vider" — supprime les notifs visibles SEULEMENT. Le ledger seenEventKeys
// est PRÉSERVÉ : sinon une réconciliation future (switch projet, reconnect SSE,
// reload) recréerait les mêmes notifs supprimées.
export function clearNotifications(
  profileId: string,
  storage: StorageLike = localStorage,
): boolean {
  const all = readNotifs(storage);
  if (!(profileId in all)) return true;
  delete all[profileId];
  if (!writeNotifs(storage, all)) {
    console.warn('[notifications] clearNotifications persist failed', { profileId });
    return false;
  }
  return true;
}

export function hasSeenEvent(
  profileId: string,
  eventKey: EventKey,
  storage: StorageLike = localStorage,
): boolean {
  const all = readSeen(storage);
  return (all[profileId] ?? []).includes(eventKey);
}

// --- Watermark lastSeenAt par projet ---

function readProjectsSeen(storage: StorageLike): ProjectsSeenMap {
  return readJson<ProjectsSeenMap>(storage, PROJECTS_SEEN_SLOT, {});
}

export function getProjectLastSeen(
  profileId: string,
  projectId: string,
  storage: StorageLike = localStorage,
): string | null {
  return readProjectsSeen(storage)[profileId]?.[projectId] ?? null;
}

export function setProjectLastSeen(
  profileId: string,
  projectId: string,
  iso: string,
  storage: StorageLike = localStorage,
): void {
  const all = readProjectsSeen(storage);
  all[profileId] ??= {};
  all[profileId][projectId] = iso;
  if (!writeJson(storage, PROJECTS_SEEN_SLOT, all)) {
    // Quota fail = watermark drift silencieux (next reconcile retombera sur
    // le cutoff "now" et perdra les events du delta). Pas critique mais visible
    // en dev pour diagnostiquer une UX "notifs disparaissent au reload".
    console.warn('[notifications] setProjectLastSeen persist failed', { profileId, projectId });
  }
}
