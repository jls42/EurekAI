import { describe, expect, it } from 'vitest';
import { marked } from 'marked';
import { escapeHtmlAttribute, escapeMarkdownHtml, sanitizeRenderedHtml } from './render-utils.js';

describe('escapeMarkdownHtml', () => {
  it('neutralise le HTML brut avant le rendu markdown', () => {
    expect(escapeMarkdownHtml('<img src=x onerror=alert(1)>')).toBe(
      '&lt;img src=x onerror=alert(1)&gt;',
    );
  });
});

describe('sanitizeRenderedHtml', () => {
  it('supprime les attributs evenements et les liens javascript', () => {
    const html = '<a href="javascript:alert(1)" onclick="alert(2)">Lien</a>';
    expect(sanitizeRenderedHtml(html)).toBe('<a rel="noopener noreferrer">Lien</a>');
  });

  it('conserve les liens surs', () => {
    const html = '<a href="https://example.com">Lien</a>';
    expect(sanitizeRenderedHtml(html)).toBe(
      '<a href="https://example.com" rel="noopener noreferrer">Lien</a>',
    );
  });

  it('protege un rendu markdown complet contre le HTML brut', () => {
    const html = marked.parse(escapeMarkdownHtml('Bonjour <script>alert(1)</script> **monde**'), {
      breaks: true,
      gfm: true,
    }) as string;
    expect(sanitizeRenderedHtml(html)).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});

describe('escapeHtmlAttribute', () => {
  it('echappe les attributs HTML injectes par l application', () => {
    expect(escapeHtmlAttribute('"quoted" <tag>')).toBe('&quot;quoted&quot; &lt;tag&gt;');
  });
});
