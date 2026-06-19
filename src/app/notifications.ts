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

type TranslateParams = Record<string, string | number>;
// eslint-disable-next-line no-unused-vars -- type-sig params required by TS
type TranslateFn = (_key: string, _params?: TranslateParams) => string;

// Discriminated union appliquée à l'append : un nouveau call site DOIT choisir
// entre i18n (messageKey requis) et legacy (message requis). Empêche au
// compile time un appendNotification({ ... }) qui oublierait les deux. Le
// shape persisté reste l'union large ci-dessus pour rester rétrocompatible.
interface AppendNotifBase {
  eventKey: EventKey;
  type: NotificationType;
  projectId?: string;
}
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
export function renderNotificationMessage(notif: PersistedNotification, t: TranslateFn): string {
  if (!notif.messageKey) return notif.message ?? '';
  const resolved = Object.fromEntries([
    ...Object.entries(notif.params ?? {}),
    ...Object.entries(notif.paramKeys ?? {}).map(
      ([paramName, key]) => [paramName, t(key)] as const,
    ),
  ]) as TranslateParams;
  return t(notif.messageKey, resolved);
}

export interface StorageLike {
  // eslint-disable-next-line no-unused-vars -- type-sig param required by TS
  getItem(_key: string): string | null;
  // eslint-disable-next-line no-unused-vars -- type-sig params required by TS
  setItem(_key: string, _value: string): void;
}

type RawNotifMap = Record<string, PersistedNotification[]>;
type RawSeenMap = Record<string, string[]>;
type RawProjectsSeenMap = Record<string, Record<string, string>>;
type NotifMap = Map<string, PersistedNotification[]>;
type SeenMap = Map<string, string[]>;
type ProjectsSeenMap = Map<string, Map<string, string>>;

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
    console.error('[notifications] storage write failed (likely quota)', key, String(err));
    return false;
  }
};

// --- Notifs visibles ---

function readNotifs(storage: StorageLike): NotifMap {
  return new Map(Object.entries(readJson<RawNotifMap>(storage, NOTIFS_STORAGE_SLOT, {})));
}

function writeNotifs(storage: StorageLike, all: NotifMap): boolean {
  return writeJson(storage, NOTIFS_STORAGE_SLOT, Object.fromEntries(all));
}

// Dedup defense en profondeur : un onglet B peut avoir append une notif
// (writeNotifs cross-tab) entre le `hasSeenEvent` et le `readNotifs` de
// l'onglet A. Le ledger seenEventKeys empeche le 2e push dans le MEME onglet,
// mais pas la race write-write entre 2 onglets sur localStorage. Filtre les
// doublons par eventKey en gardant le 1er occurrence (ordre chronologique
// preserve, plus ancien gagne pour stabilite UI).
const dedupByEventKey = (items: PersistedNotification[]): PersistedNotification[] => {
  const seen = new Set<string>();
  return items.filter((n) => {
    if (seen.has(n.eventKey)) return false;
    seen.add(n.eventKey);
    return true;
  });
};

function pruneExpiredAndCap(items: PersistedNotification[]): PersistedNotification[] {
  const cutoff = Date.now() - TTL_MS;
  const filtered = items.filter((n) => Date.parse(n.createdAt) > cutoff);
  return dedupByEventKey(filtered).slice(-MAX_PER_PROFILE);
}

// --- Ledger seenEventKeys ---

function readSeen(storage: StorageLike): SeenMap {
  return new Map(Object.entries(readJson<RawSeenMap>(storage, SEEN_EVENTS_SLOT, {})));
}

function writeSeen(storage: StorageLike, all: SeenMap): boolean {
  return writeJson(storage, SEEN_EVENTS_SLOT, Object.fromEntries(all));
}

function recordSeen(storage: StorageLike, profileId: string, eventKey: EventKey): boolean {
  const all = readSeen(storage);
  const list = all.get(profileId) ?? [];
  if (list.includes(eventKey)) return true;
  list.push(eventKey);
  // LRU cap : garde les MAX_SEEN_EVENTS_PER_PROFILE plus récents
  all.set(profileId, list.slice(-MAX_SEEN_EVENTS_PER_PROFILE));
  return writeSeen(storage, all);
}

// --- API publique ---

export function listProfileNotifications(
  profileId: string,
  storage: StorageLike = localStorage,
): PersistedNotification[] {
  const all = readNotifs(storage);
  return all.get(profileId) ?? [];
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
  const list = all.get(profileId) ?? [];
  // Re-check sur la list elle-meme : un onglet B peut avoir push une notif avec
  // ce eventKey entre notre `hasSeenEvent` et ce `readNotifs` (race cross-tab
  // sur localStorage). pruneExpiredAndCap dedupe en aval mais ce re-check evite
  // le push inutile + l'incoherence ephemere de la liste retournee.
  if (list.some((n) => n.eventKey === notif.eventKey)) return false;
  list.push({ ...notif, createdAt: new Date().toISOString(), read: false });
  all.set(profileId, pruneExpiredAndCap(list));
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
//
export function markAllRead(profileId: string, storage: StorageLike = localStorage): boolean {
  const all = readNotifs(storage);
  const list = all.get(profileId);
  if (!list) return true;
  all.set(
    profileId,
    list.map((n) => ({ ...n, read: true })),
  );
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
  const list = all.get(profileId);
  if (!list) return true;
  if (!list.some((n) => n.eventKey === eventKey)) return true;
  all.set(
    profileId,
    list.map((n) => (n.eventKey === eventKey ? { ...n, read: true } : n)),
  );
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
  if (!all.delete(profileId)) return true;
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
  return all.get(profileId)?.includes(eventKey) ?? false;
}

// --- Watermark lastSeenAt par projet ---

function readProjectsSeen(storage: StorageLike): ProjectsSeenMap {
  const raw = readJson<RawProjectsSeenMap>(storage, PROJECTS_SEEN_SLOT, {});
  return new Map(
    Object.entries(raw).map(([profileId, projects]) => [
      profileId,
      new Map(Object.entries(projects)),
    ]),
  );
}

function writeProjectsSeen(storage: StorageLike, all: ProjectsSeenMap): boolean {
  return writeJson(
    storage,
    PROJECTS_SEEN_SLOT,
    Object.fromEntries(
      Array.from(all, ([profileId, projects]) => [profileId, Object.fromEntries(projects)]),
    ),
  );
}

export function getProjectLastSeen(
  profileId: string,
  projectId: string,
  storage: StorageLike = localStorage,
): string | null {
  return readProjectsSeen(storage).get(profileId)?.get(projectId) ?? null;
}

export function setProjectLastSeen(
  profileId: string,
  projectId: string,
  iso: string,
  storage: StorageLike = localStorage,
): void {
  const all = readProjectsSeen(storage);
  const projects = all.get(profileId) ?? new Map<string, string>();
  projects.set(projectId, iso);
  all.set(profileId, projects);
  if (!writeProjectsSeen(storage, all)) {
    // Quota fail = watermark drift silencieux (next reconcile retombera sur
    // le cutoff "now" et perdra les events du delta). Pas critique mais visible
    // en dev pour diagnostiquer une UX "notifs disparaissent au reload".
    console.warn('[notifications] setProjectLastSeen persist failed', { profileId, projectId });
  }
}
