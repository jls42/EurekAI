/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition -- Codacy lance ESLint sans resolution des types vitest (faux positifs) ; couvert par lint:ci local type-aware */
import { describe, it, expect, vi } from 'vitest';
import { hashFile, findExistingDuplicate } from './source-dedup.js';
import type { Source } from '../../types';

const src = (over: Partial<Source>): Source => ({
  id: 'x',
  filename: 'f',
  markdown: '',
  uploadedAt: '',
  ...over,
});

describe('findExistingDuplicate', () => {
  it('matches by contentHash regardless of filename (reason: hash)', () => {
    const existing = [src({ id: 's1', filename: 'a.pdf', contentHash: 'abc' })];
    expect(findExistingDuplicate('abc', 'renamed.pdf', existing)).toEqual({
      source: existing[0],
      reason: 'hash',
    });
  });

  it('falls back to filename for legacy sources without a hash (reason: filename)', () => {
    const existing = [src({ id: 's1', filename: 'scan.pdf' })];
    expect(findExistingDuplicate('zzz', 'scan.pdf', existing)).toEqual({
      source: existing[0],
      reason: 'filename',
    });
  });

  it('does not match on filename when the existing source already has a hash', () => {
    const existing = [src({ id: 's1', filename: 'scan.pdf', contentHash: 'abc' })];
    expect(findExistingDuplicate('different', 'scan.pdf', existing)).toBeNull();
  });

  it('returns null when nothing matches', () => {
    expect(findExistingDuplicate('h', 'n', [])).toBeNull();
  });
});

describe('hashFile', () => {
  it('returns null when crypto.subtle is unavailable (HTTP-LAN degradation)', async () => {
    vi.stubGlobal('crypto', undefined);
    try {
      expect(await hashFile(new File(['x'], 'x.txt'))).toBeNull();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('computes a stable lowercase-hex sha256 when subtle is available', async () => {
    if (!globalThis.crypto?.subtle) return; // skip si l'environnement de test n'expose pas subtle
    const h = await hashFile(new File(['hello'], 'a.txt'));
    expect(h).toMatch(/^[0-9a-f]{64}$/);
    expect(await hashFile(new File(['hello'], 'b.txt'))).toBe(h); // déterministe (contenu identique)
  });
});
