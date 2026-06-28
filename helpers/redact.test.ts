import { describe, it, expect, afterEach } from 'vitest';
import { redactSecrets } from './redact.js';

describe('redactSecrets (structuré, honnête)', () => {
  const ORIG = { ...process.env };
  afterEach(() => {
    process.env = { ...ORIG };
  });

  it('masque les champs sensibles connus (headers credential)', () => {
    const out = redactSecrets({
      authorization: 'Bearer x',
      'x-eurekai-ai-key': 'k',
      foo: 'bar',
    });
    expect(out).toEqual({
      authorization: '[REDACTED]',
      'x-eurekai-ai-key': '[REDACTED]',
      foo: 'bar',
    });
  });

  it('masque la valeur de la clé env partout (string libre + imbriqué)', () => {
    process.env.MISTRAL_API_KEY = 'sk-supersecret-1234';
    expect(redactSecrets('error: sk-supersecret-1234 leaked')).toBe('error: [REDACTED] leaked');
    expect(redactSecrets({ msg: 'sk-supersecret-1234' })).toEqual({ msg: '[REDACTED]' });
  });

  it('laisse intacts les objets/valeurs sans secret (préserve l invariant logger.test)', () => {
    delete process.env.MISTRAL_API_KEY;
    expect(redactSecrets({ key: 'val' })).toEqual({ key: 'val' });
    expect(redactSecrets(42)).toBe(42);
    expect(redactSecrets('hello')).toBe('hello');
  });

  it('redacte un Error contenant la clé env (message), préserve le name', () => {
    process.env.MISTRAL_API_KEY = 'sk-secret-abcdef';
    const e = new Error('boom sk-secret-abcdef');
    const out = redactSecrets(e) as { name: string; message: string };
    expect(out.name).toBe('Error');
    expect(out.message).toBe('boom [REDACTED]');
  });

  it('retourne l Error inchangée (même référence) si aucun secret connu', () => {
    delete process.env.MISTRAL_API_KEY;
    const e = new Error('plain error');
    expect(redactSecrets(e)).toBe(e);
  });

  it('ne masque PAS une clé inconnue dans du texte libre (limite assumée)', () => {
    delete process.env.MISTRAL_API_KEY;
    expect(redactSecrets('header had abcXYZ123')).toBe('header had abcXYZ123');
  });
});
