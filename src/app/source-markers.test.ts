import { describe, it, expect } from 'vitest';
import { extractSourceNums, normalizeSourceMarkers } from './source-markers';

describe('extractSourceNums', () => {
  it('extracts a single source number', () => {
    expect(extractSourceNums('voir [Source 7] et fin')).toEqual([7]);
  });

  it('extracts canonical multi-source [Source N][Source M]', () => {
    expect(extractSourceNums('a [Source 13][Source 20] b')).toEqual([13, 20]);
  });

  it('extracts degraded list [Source N, M]', () => {
    expect(extractSourceNums('a [Source 13, 20] b')).toEqual([13, 20]);
  });

  it('extracts degraded list without space [Source N,M]', () => {
    expect(extractSourceNums('a [Source 13,20] b')).toEqual([13, 20]);
  });

  it('extracts hybrid form [Source N, Source M]', () => {
    expect(extractSourceNums('a [Source 13, Source 20] b')).toEqual([13, 20]);
  });

  it('extracts numbers across multiple markers in one string', () => {
    const text = 'debut [Source 1] milieu [Source 2, 3] fin [Source 4][Source 5]';
    expect(extractSourceNums(text)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns empty when no marker present', () => {
    expect(extractSourceNums('plain text without markers')).toEqual([]);
  });

  it('does not match [Foo N] (wrong prefix)', () => {
    expect(extractSourceNums('voir [Foo 13] et [Bar 20]')).toEqual([]);
  });

  it('is case-insensitive on the Source keyword', () => {
    expect(extractSourceNums('[source 7] and [SOURCE 8]')).toEqual([7, 8]);
  });
});

describe('normalizeSourceMarkers', () => {
  it('leaves canonical single brackets unchanged', () => {
    expect(normalizeSourceMarkers('a [Source 7] b')).toBe('a [Source 7] b');
  });

  it('splits [Source N, M] into adjacent brackets', () => {
    expect(normalizeSourceMarkers('a [Source 13, 20] b')).toBe('a [Source 13][Source 20] b');
  });

  it('splits [Source N,M] without space', () => {
    expect(normalizeSourceMarkers('a [Source 13,20] b')).toBe('a [Source 13][Source 20] b');
  });

  it('splits hybrid [Source N, Source M] form', () => {
    expect(normalizeSourceMarkers('a [Source 13, Source 20] b')).toBe('a [Source 13][Source 20] b');
  });

  it('is idempotent', () => {
    const input = 'a [Source 13, 20] et [Source 5, Source 7] et [Source 9]';
    const once = normalizeSourceMarkers(input);
    const twice = normalizeSourceMarkers(once);
    expect(once).toBe(twice);
    expect(once).toBe('a [Source 13][Source 20] et [Source 5][Source 7] et [Source 9]');
  });

  it('does not touch non-source brackets', () => {
    expect(normalizeSourceMarkers('[Note] voir [Source 1] et [X]')).toBe(
      '[Note] voir [Source 1] et [X]',
    );
  });
});
