import { describe, it, expect, vi } from 'vitest';
import {
  stripJsonMarkdown,
  safeParseJson,
  unwrapJsonArray,
  extractAllText,
  timer,
  parseWebInput,
  fetchPageContent,
} from './index.js';

describe('stripJsonMarkdown', () => {
  it('retire les blocs ```json ```', () => {
    const input = '```json\n{"a":1}\n```';
    expect(stripJsonMarkdown(input)).toBe('{"a":1}');
  });

  it('laisse le texte sans markdown inchange', () => {
    expect(stripJsonMarkdown('{"b":2}')).toBe('{"b":2}');
  });

  it('gere une string vide', () => {
    expect(stripJsonMarkdown('')).toBe('');
  });
});

describe('safeParseJson', () => {
  it('parse du JSON valide', () => {
    expect(safeParseJson('{"x":1}')).toEqual({ x: 1 });
  });

  it('parse du JSON wrappe dans du markdown', () => {
    expect(safeParseJson('```json\n{"x":1}\n```')).toEqual({ x: 1 });
  });

  it('throw sur du JSON invalide', () => {
    expect(() => safeParseJson('not json')).toThrow();
  });
});

describe('unwrapJsonArray', () => {
  it('retourne un array direct', () => {
    expect(unwrapJsonArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('unwrap un objet {key: [...]}', () => {
    expect(unwrapJsonArray({ items: [1, 2] })).toEqual([1, 2]);
  });

  it('retourne [] pour un objet sans array', () => {
    expect(unwrapJsonArray({ a: 'b' })).toEqual([]);
  });

  it('retourne [] pour null', () => {
    expect(unwrapJsonArray(null)).toEqual([]);
  });
});

describe('extractAllText', () => {
  it('extrait les proprietes .text', () => {
    const result = extractAllText([{ text: 'hello' }, { text: 'world' }]);
    expect(result).toBe('hello\nworld');
  });

  it('extrait les proprietes .content string', () => {
    const result = extractAllText([{ content: 'bonjour' }]);
    expect(result).toBe('bonjour');
  });

  it('extrait recursivement les .content array', () => {
    const result = extractAllText([{ content: [{ text: 'nested' }] }]);
    expect(result).toBe('nested');
  });

  it('extrait recursivement les .outputs', () => {
    const result = extractAllText([{ outputs: [{ text: 'deep' }] }]);
    expect(result).toBe('deep');
  });

  it('extrait les .output string et array', () => {
    const result = extractAllText([{ output: 'direct' }, { output: [{ text: 'arr' }] }]);
    expect(result).toBe('direct\narr');
  });

  it('gere un array vide', () => {
    expect(extractAllText([])).toBe('');
  });
});

describe('parseWebInput', () => {
  it('extracts URLs from input', () => {
    const result = parseWebInput('https://example.com');
    expect(result.urls).toEqual(['https://example.com']);
    expect(result.searchQuery).toBe('');
  });

  it('extracts search query without URLs', () => {
    const result = parseWebInput('les energies renouvelables');
    expect(result.urls).toEqual([]);
    expect(result.searchQuery).toBe('les energies renouvelables');
  });

  it('separates URLs and search query', () => {
    const result = parseWebInput('https://a.com https://b.com les energies');
    expect(result.urls).toEqual(['https://a.com', 'https://b.com']);
    expect(result.searchQuery).toBe('les energies');
  });

  it('handles multiple URLs without keywords', () => {
    const result = parseWebInput('https://a.com https://b.com');
    expect(result.urls).toEqual(['https://a.com', 'https://b.com']);
    expect(result.searchQuery).toBe('');
  });

  it('handles http URLs', () => {
    const result = parseWebInput('http://old-site.org/page');
    expect(result.urls).toEqual(['http://old-site.org/page']);
  });

  it('handles empty input', () => {
    const result = parseWebInput('');
    expect(result.urls).toEqual([]);
    expect(result.searchQuery).toBe('');
  });

  it('handles URL with path and query params', () => {
    const result = parseWebInput('https://site.com/path?q=test&lang=fr');
    expect(result.urls).toEqual(['https://site.com/path?q=test&lang=fr']);
    expect(result.searchQuery).toBe('');
  });
});

describe('fetchPageContent', () => {
  it('extracts text from HTML using Readability', async () => {
    const html = `<html><head><title>Test</title></head><body>
      <nav>Menu</nav>
      <article><h1>Title</h1><p>${'Content paragraph. '.repeat(20)}</p></article>
      <footer>Footer</footer>
    </body></html>`;
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    );
    const result = await fetchPageContent('https://example.com');
    expect(result.text).toContain('Content paragraph');
    expect(result.text.length).toBeGreaterThan(200);
    expect(result.engine).toBe('readability');
    vi.unstubAllGlobals();
  });

  it('throws on HTTP error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404, text: () => Promise.resolve('') }),
    );
    await expect(fetchPageContent('https://example.com/404')).rejects.toThrow('HTTP 404');
    vi.unstubAllGlobals();
  });

  it('returns engine readability when mode is readability', async () => {
    const html = `<html><body><article><p>${'Long content. '.repeat(20)}</p></article></body></html>`;
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    );
    const result = await fetchPageContent('https://example.com', 'readability');
    expect(result.engine).toBe('readability');
    vi.unstubAllGlobals();
  });

  it('returns engine readability in auto mode with sufficient content', async () => {
    const html = `<html><body><article><p>${'Enough content here. '.repeat(15)}</p></article></body></html>`;
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    );
    const result = await fetchPageContent('https://example.com', 'auto');
    expect(result.engine).toBe('readability');
    vi.unstubAllGlobals();
  });

  it('throws when readability mode returns empty content', async () => {
    const html = '<html><body><script>app.init()</script></body></html>';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    );
    await expect(fetchPageContent('https://spa.example.com', 'readability')).rejects.toThrow(
      'Readability could not extract content',
    );
    vi.unstubAllGlobals();
  });

  it('returns short readability content in readability mode', async () => {
    const html = '<html><body><article><p>Short.</p></article></body></html>';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    );
    const result = await fetchPageContent('https://example.com', 'readability');
    expect(result.engine).toBe('readability');
    expect(result.text).toContain('Short');
    vi.unstubAllGlobals();
  });
});

describe('timer', () => {
  it('retourne une fonction', () => {
    const stop = timer();
    expect(typeof stop).toBe('function');
  });

  it('retourne un temps >= 0', () => {
    const stop = timer();
    const elapsed = stop();
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });
});
