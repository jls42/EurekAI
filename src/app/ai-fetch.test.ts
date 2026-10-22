/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return -- Codacy lance son propre ESLint sans résolution de types (globals/mocks vitest typés `error`, accès indexés de mock) → faux positifs ; cf. CLAUDE.md section Codacy */
import { describe, it, expect, beforeEach } from 'vitest';
import { captureAiKey, withAiHeaders } from './ai-fetch';
import { setKey, _resetActiveKey } from './api-key';
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

beforeEach(() => {
  _resetActiveKey();
});

describe('withAiHeaders', () => {
  it('omet les headers (retourne init inchangé) si aucune clé active', () => {
    const init = { method: 'POST' };
    expect(withAiHeaders(init)).toBe(init);
  });

  it('ajoute provider + clé quand une clé est active', async () => {
    await setKey({ scope: 'global', plaintext: 'sk-test-123' }, makeStorage());
    const h = new Headers(withAiHeaders({ method: 'POST' }).headers);
    expect(h.get('X-EurekAI-AI-Provider')).toBe('mistral');
    expect(h.get('X-EurekAI-AI-Key')).toBe('sk-test-123');
  });

  it('ne pose JAMAIS de Content-Type (préserve le boundary FormData)', async () => {
    await setKey({ scope: 'global', plaintext: 'sk-test-123' }, makeStorage());
    expect(new Headers(withAiHeaders({}).headers).has('Content-Type')).toBe(false);
  });

  it('keyOverride prime, merge immuable (ne mute pas init, préserve les headers existants)', () => {
    const init = { headers: { 'Content-Type': 'application/json' } };
    const out = withAiHeaders(init, { keyOverride: 'draft-key' });
    expect(out).not.toBe(init);
    const h = new Headers(out.headers);
    expect(h.get('X-EurekAI-AI-Key')).toBe('draft-key');
    expect(h.get('Content-Type')).toBe('application/json');
    expect((init.headers as Record<string, string>)['X-EurekAI-AI-Key']).toBeUndefined();
  });

  it('omet la clé si malformée (CRLF anti-injection header)', () => {
    expect(
      new Headers(withAiHeaders({}, { keyOverride: 'bad\r\nkey' }).headers).has('X-EurekAI-AI-Key'),
    ).toBe(false);
  });
});

// Action longue (Auto, import, enregistrement vocal) qui continue après un changement de profil :
// la clé est celle capturée à son lancement, jamais la clé active au moment de l'envoi.
describe('captureAiKey', () => {
  it('rend la clé active au moment de la capture', async () => {
    await setKey({ scope: 'global', plaintext: 'sk-profil-a' }, makeStorage());
    expect(captureAiKey()).toBe('sk-profil-a');
  });

  it('clé capturée envoyée même si une autre clé est devenue active depuis', async () => {
    await setKey({ scope: 'global', plaintext: 'sk-profil-a' }, makeStorage());
    const captured = captureAiKey();
    await setKey({ scope: 'global', plaintext: 'sk-profil-b' }, makeStorage());
    const h = new Headers(withAiHeaders({}, { keyOverride: captured }).headers);
    expect(h.get('X-EurekAI-AI-Key')).toBe('sk-profil-a');
  });

  it("aucune clé à la capture : '' omet les en-têtes (clé d'env), jamais la clé active depuis", async () => {
    const captured = captureAiKey();
    await setKey({ scope: 'global', plaintext: 'sk-profil-b' }, makeStorage());
    const init = { method: 'POST' };
    expect(captured).toBe('');
    expect(withAiHeaders(init, { keyOverride: captured })).toBe(init);
  });
});
