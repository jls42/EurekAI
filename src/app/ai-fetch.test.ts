import { describe, it, expect, beforeEach } from 'vitest';
import { withAiHeaders } from './ai-fetch';
import { setKey, _resetActiveKey } from './api-key';
import type { StorageLike } from './profile-locale';

function makeStorage(): StorageLike {
  const data: Record<string, string> = {};
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
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
