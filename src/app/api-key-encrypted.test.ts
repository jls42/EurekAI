/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return -- Codacy lance son propre ESLint sans résolution de types (globals/mocks vitest typés `error`, accès indexés de mock) → faux positifs ; cf. CLAUDE.md section Codacy */
// Chemin CHIFFRÉ (secure context) : `fake-indexeddb/auto` fournit un `indexedDB`
// global → loadOrCreateMasterKey() crée/charge une master key AES-GCM réelle
// (crypto.subtle natif node). Fichier SÉPARÉ du test "mode dégradé" (api-key.test.ts)
// car vitest isole le registre de modules par fichier : ici IndexedDB EXISTE.
import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  setKey,
  loadActiveKey,
  getActiveKey,
  clearKey,
  isStorageEncryptable,
  hasStoredKey,
  purgeKeyring,
  encryptWithKey,
  _resetActiveKey,
  type KeyRecord,
} from './api-key';
import type { StorageLike } from './profile-locale';

// Master key "étrangère" (≠ celle de l'IDB) pour fabriquer un ciphertext indéchiffrable.
const genForeignKey = () =>
  globalThis.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, [
    'encrypt',
    'decrypt',
  ]);

function makeStorage(): StorageLike {
  const data = new Map<string, string>();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => {
      data.set(k, v);
    },
  };
}

beforeEach(() => {
  // purgeKeyring réinitialise la master key mémoïsée → chaque test repart propre.
  purgeKeyring(makeStorage());
  _resetActiveKey();
});

describe('api-key — chemin chiffré (IndexedDB master key)', () => {
  it('isStorageEncryptable → true quand IndexedDB est disponible', async () => {
    expect(await isStorageEncryptable()).toBe(true);
  });

  it('setKey persiste un KeyRecord CHIFFRÉ (encrypted:true, iv+ct)', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'sk-secret-xyz' }, st);
    const rec = JSON.parse(st.getItem('sf-api-keys-global')!).mistral as KeyRecord;
    expect(rec.encrypted).toBe(true);
    if (rec.encrypted) {
      expect(typeof rec.iv).toBe('string');
      expect(typeof rec.ct).toBe('string');
      expect(JSON.stringify(rec)).not.toContain('sk-secret-xyz');
    }
    // getActiveKey reste le clair en mémoire (lu sync par le wrapper fetch).
    expect(getActiveKey()).toBe('sk-secret-xyz');
  });

  it('round-trip : setKey chiffré → loadActiveKey déchiffre via la même master key', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'sk-roundtrip' }, st);
    _resetActiveKey();
    expect(getActiveKey()).toBeNull();
    expect(await loadActiveKey(undefined, st)).toBe('ok');
    expect(getActiveKey()).toBe('sk-roundtrip');
  });

  it('migration clair → chiffré : une clé clair pré-existante est re-chiffrée au load', async () => {
    const st = makeStorage();
    // Simule un enregistrement clair (mode dégradé antérieur) écrit directement.
    st.setItem(
      'sf-api-keys-global',
      JSON.stringify({ mistral: { encrypted: false, value: 'sk-plain' } }),
    );
    expect(await loadActiveKey(undefined, st)).toBe('ok');
    expect(getActiveKey()).toBe('sk-plain');
    // Au retour en secure context, le record sur disque devient chiffré.
    const rec = JSON.parse(st.getItem('sf-api-keys-global')!).mistral as KeyRecord;
    expect(rec.encrypted).toBe(true);
  });

  it('clearKey global retire le record + vide activeKey si plus rien ne résout', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'G' }, st);
    await clearKey({ scope: 'global' }, st);
    expect(hasStoredKey(undefined, st)).toBe(false);
    expect(getActiveKey()).toBeNull();
  });

  it('clearKey profil retombe sur la clé globale (re-résolue + active)', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'G' }, st);
    await setKey({ scope: 'profile', profileId: 'p1', plaintext: 'P' }, st);
    await clearKey({ scope: 'profile', profileId: 'p1' }, st);
    // p1 n'a plus de clé profil → résout la globale.
    expect(await loadActiveKey('p1', st)).toBe('ok');
    expect(getActiveKey()).toBe('G');
  });

  it('loadActiveKey → "broken" si le ciphertext est indéchiffrable (master key perdue)', async () => {
    const st = makeStorage();
    // Ciphertext fabriqué avec une master key ÉTRANGÈRE : simule une purge navigateur
    // (la master key IDB courante ≠ celle ayant chiffré le record) → déchiffrement impossible.
    const orphan = await encryptWithKey(await genForeignKey(), 'sk-lost');
    st.setItem('sf-api-keys-global', JSON.stringify({ mistral: orphan }));
    expect(await loadActiveKey(undefined, st)).toBe('broken');
    expect(getActiveKey()).toBeNull();
  });

  it('slot localStorage corrompu (JSON invalide) → traité comme vide', async () => {
    const st = makeStorage();
    st.setItem('sf-api-keys-global', '{ pas du json');
    expect(hasStoredKey(undefined, st)).toBe(false);
    expect(await loadActiveKey(undefined, st)).toBe('absent');
  });
});
