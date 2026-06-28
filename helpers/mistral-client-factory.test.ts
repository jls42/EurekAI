/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return -- Codacy lance son propre ESLint sans résolution de types (globals/mocks vitest typés `error`, accès indexés de mock) → faux positifs ; cf. CLAUDE.md section Codacy */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// trackClient mocké : on vérifie le "track-once" sans wrapper réellement le SDK.
vi.mock('./tracked-client.js', () => ({ trackClient: vi.fn() }));

import { trackClient } from './tracked-client.js';
import {
  validateKeyFormat,
  resolveApiKey,
  keyFingerprint,
  buildTrackedClient,
} from './mistral-client-factory.js';

const reqWith = (headers: Record<string, string | undefined>) => ({ headers }) as never;

describe('validateKeyFormat (anti-CRLF, Base64-friendly)', () => {
  it('accepte du printable ASCII y compris + / = . _ -', () => {
    expect(validateKeyFormat('sk-abcDEF123._-')).toBe(true);
    expect(validateKeyFormat('a+b/c=d')).toBe(true);
  });
  it('rejette CR/LF, espaces, tab, contrôles (injection header impossible)', () => {
    expect(validateKeyFormat('abc\r\ndef')).toBe(false);
    expect(validateKeyFormat('abc def')).toBe(false);
    expect(validateKeyFormat('abc\tdef')).toBe(false);
    expect(validateKeyFormat('')).toBe(false);
  });
  it('rejette > 512 chars et les non-string', () => {
    expect(validateKeyFormat('a'.repeat(513))).toBe(false);
    expect(validateKeyFormat(undefined)).toBe(false);
    expect(validateKeyFormat(123)).toBe(false);
  });
});

describe('resolveApiKey (précédence + anti-facturation silencieuse)', () => {
  const ORIG = { ...process.env };
  beforeEach(() => {
    delete process.env.MISTRAL_API_KEY;
    delete process.env.EUREKAI_REQUIRE_USER_KEY;
  });
  afterEach(() => {
    process.env = { ...ORIG };
  });

  it('header valide → kind header', () => {
    expect(resolveApiKey(reqWith({ 'x-eurekai-ai-key': 'goodkey123' }))).toEqual({
      kind: 'header',
      key: 'goodkey123',
    });
  });
  it('header malformé → header-invalid, JAMAIS de fallback env', () => {
    process.env.MISTRAL_API_KEY = 'env-key-1234';
    expect(resolveApiKey(reqWith({ 'x-eurekai-ai-key': 'bad\nkey' })).kind).toBe('header-invalid');
  });
  it('header absent + env présent → env', () => {
    process.env.MISTRAL_API_KEY = 'env-key-1234';
    expect(resolveApiKey(reqWith({})).kind).toBe('env');
  });
  it('header absent + pas d env → none', () => {
    expect(resolveApiKey(reqWith({})).kind).toBe('none');
  });
  it('header vide ("") traité comme absent → fallback env', () => {
    process.env.MISTRAL_API_KEY = 'env-key-1234';
    expect(resolveApiKey(reqWith({ 'x-eurekai-ai-key': '' })).kind).toBe('env');
  });
  it('EUREKAI_REQUIRE_USER_KEY=true → pas de fallback env (none)', () => {
    process.env.MISTRAL_API_KEY = 'env-key-1234';
    process.env.EUREKAI_REQUIRE_USER_KEY = 'true';
    expect(resolveApiKey(reqWith({})).kind).toBe('none');
  });
  it('allowEnv:false → pas de fallback env (none)', () => {
    process.env.MISTRAL_API_KEY = 'env-key-1234';
    expect(resolveApiKey(reqWith({}), { allowEnv: false }).kind).toBe('none');
  });
  it('provider ≠ mistral → unsupported-provider (pas de fallback)', () => {
    process.env.MISTRAL_API_KEY = 'env-key-1234';
    expect(
      resolveApiKey(reqWith({ 'x-eurekai-ai-provider': 'openai', 'x-eurekai-ai-key': 'k' })).kind,
    ).toBe('unsupported-provider');
  });
});

describe('keyFingerprint', () => {
  it('déterministe, distinct par clé, non réversible (hash djb2 non-crypto)', () => {
    const a = keyFingerprint('key-A');
    expect(a).toBe(keyFingerprint('key-A'));
    expect(a).not.toBe(keyFingerprint('key-B'));
    expect(a).toMatch(/^[0-9a-f]{1,8}$/);
    expect(a).not.toContain('key-A');
  });
});

describe('buildTrackedClient (track-once)', () => {
  it('appelle trackClient exactement une fois par instance', () => {
    vi.clearAllMocks();
    buildTrackedClient('k1');
    buildTrackedClient('k2');
    expect(trackClient).toHaveBeenCalledTimes(2);
  });
});
