/* eslint-disable @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- (1) crypto.subtle / indexedDB peuvent être undefined hors secure context (le typage lib.dom non-null ne reflète pas ce cas runtime géré). (2) Codacy lance son propre ESLint sans résolution de types (DOM/crypto/IndexedDB typés `error`, accès indexés du keyring) → faux positifs ; notre lint:ci type-aware ne les flague pas. Cf. CLAUDE.md section Codacy. */

// Trousseau de clés API côté navigateur (cf. CLAUDE.md "Clé Mistral navigateur").
//
// - La clé n'est JAMAIS persistée côté serveur ; elle vit ici, envoyée par requête
//   via le header X-EurekAI-AI-Key (cf. ai-fetch.ts).
// - Au repos : chiffrée AES-GCM avec une master key non-extractable auto-générée dans
//   IndexedDB (secure context). Hors secure context / IndexedDB bloqué (incognito) :
//   fallback clair, derrière consentement explicite côté UI, re-chiffré au retour.
// - Précédence de résolution : clé du profil > clé globale navigateur > (puis le
//   serveur retombe sur la clé d'env si aucun header).

import type { StorageLike } from './profile-locale';

const GLOBAL_SLOT = 'sf-api-keys-global';
const PROFILE_SLOT = 'sf-profile-api-keys';
const PROVIDER = 'mistral';
const IDB_NAME = 'sf-keyring';
const IDB_STORE = 'keys';
const MASTER_KEY_ID = 'master-v1';

export type KeyRecord =
  | { encrypted: true; iv: string; ct: string }
  | { encrypted: false; value: string };

type ProviderRecord = Partial<Record<string, KeyRecord>>;

// --- Storage (localStorage, schéma { [provider]: KeyRecord }) -----------------

function readSlot(storage: StorageLike, slot: string): Record<string, unknown> {
  const raw = storage.getItem(slot);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
  } catch (e) {
    console.warn('[api-key] slot corrompu', slot, e);
    return {};
  }
}

function writeSlot(storage: StorageLike, slot: string, value: unknown): void {
  try {
    storage.setItem(slot, JSON.stringify(value));
  } catch (e) {
    console.error('[api-key] write storage échoué (quota ?)', slot, String(e));
  }
}

function readGlobal(storage: StorageLike): ProviderRecord {
  return readSlot(storage, GLOBAL_SLOT) as ProviderRecord;
}
function readProfiles(storage: StorageLike): Record<string, ProviderRecord> {
  return readSlot(storage, PROFILE_SLOT) as Record<string, ProviderRecord>;
}

function globalRecord(storage: StorageLike): KeyRecord | undefined {
  return readGlobal(storage)[PROVIDER];
}
function profileRecord(storage: StorageLike, profileId: string): KeyRecord | undefined {
  return readProfiles(storage)[profileId]?.[PROVIDER];
}

/** Résout le KeyRecord effectif pour un profil : profil > global. */
export function resolveRecord(
  storage: StorageLike,
  profileId: string | undefined,
): { rec: KeyRecord; scope: 'profile' | 'global' } | null {
  if (profileId) {
    const p = profileRecord(storage, profileId);
    if (p) return { rec: p, scope: 'profile' };
  }
  const g = globalRecord(storage);
  return g ? { rec: g, scope: 'global' } : null;
}

/** Présence (synchrone) d'un ciphertext pour ce profil. NB : ne garantit pas le déchiffrement. */
export function hasStoredKey(
  profileId: string | undefined,
  storage: StorageLike = localStorage,
): boolean {
  return resolveRecord(storage, profileId) !== null;
}

function persistRecord(
  storage: StorageLike,
  scope: 'profile' | 'global',
  profileId: string | undefined,
  rec: KeyRecord,
): void {
  if (scope === 'global') {
    const g = readGlobal(storage);
    g[PROVIDER] = rec;
    writeSlot(storage, GLOBAL_SLOT, g);
    return;
  }
  if (!profileId) return;
  const all = readProfiles(storage);
  all[profileId] ??= {};
  all[profileId][PROVIDER] = rec;
  writeSlot(storage, PROFILE_SLOT, all);
}

// --- Crypto (AES-GCM + master key non-extractable IndexedDB) ------------------

const enc = new TextEncoder();
const dec = new TextDecoder();

const toB64 = (buf: ArrayBuffer): string => {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (const b of bytes) s += String.fromCodePoint(b);
  return btoa(s);
};
const fromB64 = (b64: string): ArrayBuffer => {
  const s = atob(b64);
  const buf = new ArrayBuffer(s.length);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) bytes[i] = s.codePointAt(i) ?? 0;
  return buf;
};

function idbRequest<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB request failed'));
  });
}

function openKeyDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'));
  });
}

async function loadOrCreateMasterKey(): Promise<CryptoKey | null> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle || typeof indexedDB === 'undefined') return null;
  try {
    const db = await openKeyDb();
    const existing = (await idbRequest(
      db.transaction(IDB_STORE, 'readonly').objectStore(IDB_STORE).get(MASTER_KEY_ID),
    )) as CryptoKey | undefined;
    if (existing) return existing;
    const key = await subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, [
      'encrypt',
      'decrypt',
    ]);
    await idbRequest(
      db.transaction(IDB_STORE, 'readwrite').objectStore(IDB_STORE).put(key, MASTER_KEY_ID),
    );
    return key;
  } catch (e) {
    console.warn('[api-key] master key indisponible (IndexedDB bloqué ?) → mode clair', e);
    return null;
  }
}

let masterKeyPromise: Promise<CryptoKey | null> | null = null;
function getMasterKey(): Promise<CryptoKey | null> {
  masterKeyPromise ??= loadOrCreateMasterKey();
  return masterKeyPromise;
}

/** Chiffre avec une master key donnée (testable en node : crypto.subtle natif). */
export async function encryptWithKey(masterKey: CryptoKey, plaintext: string): Promise<KeyRecord> {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const ct = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    masterKey,
    enc.encode(plaintext),
  );
  return { encrypted: true, iv: toB64(iv.buffer), ct: toB64(ct) };
}

/** Déchiffre ; retourne null si la master key ne correspond pas (clé purgée/corrompue). */
export async function decryptWithKey(
  masterKey: CryptoKey,
  rec: Extract<KeyRecord, { encrypted: true }>,
): Promise<string | null> {
  try {
    const pt = await globalThis.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromB64(rec.iv) },
      masterKey,
      fromB64(rec.ct),
    );
    return dec.decode(pt);
  } catch {
    return null;
  }
}

async function encryptKey(plaintext: string): Promise<KeyRecord> {
  const mk = await getMasterKey();
  if (!mk) return { encrypted: false, value: plaintext }; // mode dégradé (consenti côté UI)
  return encryptWithKey(mk, plaintext);
}

async function decryptRecord(rec: KeyRecord): Promise<string | null> {
  if (!rec.encrypted) return rec.value;
  const mk = await getMasterKey();
  if (!mk) return null;
  return decryptWithKey(mk, rec);
}

// --- API publique (état mémoire + cycle de vie) -------------------------------

let activeKey: string | null = null;
export type KeyStatus = 'absent' | 'ok' | 'broken';

/** Clé active en clair, lue SYNCHRONIQUEMENT par le wrapper fetch. */
export function getActiveKey(): string | null {
  return activeKey;
}

/** Le stockage au repos est-il chiffrable ? false = secure context indisponible (UI : bandeau). */
export async function isStorageEncryptable(): Promise<boolean> {
  return (await getMasterKey()) !== null;
}

/**
 * Charge la clé active (profil > global) en mémoire. Re-chiffre une clé stockée en clair
 * si on est repassé en secure context. Retourne le statut pour piloter le gate UI.
 */
export async function loadActiveKey(
  profileId: string | undefined,
  storage: StorageLike = localStorage,
): Promise<KeyStatus> {
  const resolved = resolveRecord(storage, profileId);
  if (!resolved) {
    activeKey = null;
    return 'absent';
  }
  const plain = await decryptRecord(resolved.rec);
  if (plain === null) {
    activeKey = null;
    return 'broken';
  }
  activeKey = plain;
  if (!resolved.rec.encrypted && (await getMasterKey())) {
    // Migration : clair → chiffré dès qu'un secure context est disponible.
    persistRecord(storage, resolved.scope, profileId, await encryptKey(plain));
  }
  return 'ok';
}

/** Enregistre une clé (chiffrée si possible) pour la portée donnée et l'active. */
export async function setKey(
  opts: { scope: 'global' | 'profile'; profileId?: string; plaintext: string },
  storage: StorageLike = localStorage,
): Promise<void> {
  persistRecord(storage, opts.scope, opts.profileId, await encryptKey(opts.plaintext));
  activeKey = opts.plaintext;
}

function removeFromGlobal(storage: StorageLike): void {
  const g = readGlobal(storage);
  if (g[PROVIDER]) {
    delete g[PROVIDER];
    writeSlot(storage, GLOBAL_SLOT, g);
  }
}

/** Supprime la clé d'un profil du trousseau (appelé aussi à la suppression du profil). */
export function clearProfileApiKey(profileId: string, storage: StorageLike = localStorage): void {
  const all = readProfiles(storage);
  if (all[profileId]) {
    delete all[profileId];
    writeSlot(storage, PROFILE_SLOT, all);
  }
}

/** Supprime une clé (portée). N'efface l'`activeKey` mémoire que si plus rien ne résout. */
export async function clearKey(
  opts: { scope: 'global' | 'profile'; profileId?: string },
  storage: StorageLike = localStorage,
): Promise<void> {
  if (opts.scope === 'global') removeFromGlobal(storage);
  else if (opts.profileId) clearProfileApiKey(opts.profileId, storage);
  await loadActiveKey(opts.profileId, storage);
}

/**
 * Master key perdue (purge navigateur) → les ciphertexts sont indéchiffrables.
 * On nettoie tout le trousseau et on réinitialise la master key, puis l'UI rouvre le gate.
 */
export function purgeKeyring(storage: StorageLike = localStorage): void {
  writeSlot(storage, GLOBAL_SLOT, {});
  writeSlot(storage, PROFILE_SLOT, {});
  masterKeyPromise = null;
  activeKey = null;
}

/** Réinitialise le cache mémoire (tests / reset session). */
export function _resetActiveKey(): void {
  activeKey = null;
}
