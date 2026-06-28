/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return -- Codacy lance son propre ESLint sans résolution de types (globals/mocks vitest typés `error`, accès indexés de mock) → faux positifs ; cf. CLAUDE.md section Codacy */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  resolveRecord,
  hasStoredKey,
  setKey,
  getActiveKey,
  loadActiveKey,
  clearProfileApiKey,
  purgeKeyring,
  encryptWithKey,
  decryptWithKey,
  _resetActiveKey,
  type KeyRecord,
} from './api-key';
import type { StorageLike } from './profile-locale';

function makeStorage(): StorageLike {
  const data = new Map<string, string>();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => {
      data.set(k, v);
    },
  };
}

function parseStoredJson(storage: StorageLike, slot: string): unknown {
  const raw = storage.getItem(slot);
  if (raw === null) throw new Error(`slot missing: ${slot}`);
  return JSON.parse(raw) as unknown;
}

const genKey = () =>
  globalThis.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, [
    'encrypt',
    'decrypt',
  ]);

beforeEach(() => {
  _resetActiveKey();
});

describe('resolveRecord (précédence profil > global)', () => {
  it('profil prime, sinon global, sinon null', () => {
    const st = makeStorage();
    st.setItem('sf-api-keys-global', JSON.stringify({ mistral: { encrypted: false, value: 'G' } }));
    st.setItem(
      'sf-profile-api-keys',
      JSON.stringify({ p1: { mistral: { encrypted: false, value: 'P' } } }),
    );
    expect(resolveRecord(st, 'p1')?.scope).toBe('profile');
    expect(resolveRecord(st, 'p2')?.scope).toBe('global');
    expect(resolveRecord(st, undefined)?.scope).toBe('global');
    expect(resolveRecord(makeStorage(), 'p1')).toBeNull();
  });
});

describe('setKey / loadActiveKey (mode dégradé node : pas d IndexedDB → clair)', () => {
  it('setKey global stocke (clair) + active immédiatement', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'sk-global' }, st);
    expect(getActiveKey()).toBe('sk-global');
    expect(parseStoredJson(st, 'sf-api-keys-global')).toEqual({
      mistral: { encrypted: false, value: 'sk-global' },
    });
  });

  it('loadActiveKey : profil prime sur global', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'G' }, st);
    await setKey({ scope: 'profile', profileId: 'p1', plaintext: 'P' }, st);
    _resetActiveKey();
    expect(await loadActiveKey('p1', st)).toBe('ok');
    expect(getActiveKey()).toBe('P');
    _resetActiveKey();
    expect(await loadActiveKey('p2', st)).toBe('ok');
    expect(getActiveKey()).toBe('G');
  });

  it('loadActiveKey sans clé → absent', async () => {
    expect(await loadActiveKey('p1', makeStorage())).toBe('absent');
    expect(getActiveKey()).toBeNull();
  });
});

describe('suppression / purge', () => {
  it('clearProfileApiKey retire la clé profil → retombe sur global', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'G' }, st);
    await setKey({ scope: 'profile', profileId: 'p1', plaintext: 'P' }, st);
    clearProfileApiKey('p1', st);
    expect(resolveRecord(st, 'p1')?.scope).toBe('global');
  });

  it('purgeKeyring vide tout + reset mémoire', async () => {
    const st = makeStorage();
    await setKey({ scope: 'global', plaintext: 'G' }, st);
    purgeKeyring(st);
    expect(hasStoredKey(undefined, st)).toBe(false);
    expect(getActiveKey()).toBeNull();
  });
});

describe('crypto round-trip (AES-GCM, clé injectée)', () => {
  it('encrypt → decrypt restitue le plaintext', async () => {
    const key = await genKey();
    const rec = await encryptWithKey(key, 'super-secret-key');
    expect(rec.encrypted).toBe(true);
    expect(await decryptWithKey(key, rec as Extract<KeyRecord, { encrypted: true }>)).toBe(
      'super-secret-key',
    );
  });

  it('decrypt avec une autre master key → null (clé perdue/purgée)', async () => {
    const rec = (await encryptWithKey(await genKey(), 'x')) as Extract<
      KeyRecord,
      { encrypted: true }
    >;
    expect(await decryptWithKey(await genKey(), rec)).toBeNull();
  });
});
