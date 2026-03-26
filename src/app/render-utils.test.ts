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

  it('bloque javascript: encode en entites HTML', () => {
    const html = '<a href="java&#x09;script:alert(1)">x</a>';
    expect(sanitizeRenderedHtml(html)).toBe('<a rel="noopener noreferrer">x</a>');
  });

  it('bloque le protocole data:', () => {
    const html = '<a href="data:text/html,<script>alert(1)</script>">x</a>';
    expect(sanitizeRenderedHtml(html)).toBe('<a rel="noopener noreferrer">x</a>');
  });

  it('bloque le protocole vbscript:', () => {
    const html = '<a href="vbscript:MsgBox(1)">x</a>';
    expect(sanitizeRenderedHtml(html)).toBe('<a rel="noopener noreferrer">x</a>');
  });

  it('supprime les balises iframe, style, object, embed', () => {
    expect(sanitizeRenderedHtml('<iframe src="evil.com"></iframe>')).toBe('');
    expect(sanitizeRenderedHtml('<style>body{display:none}</style>')).not.toContain('<style');
    expect(sanitizeRenderedHtml('<object data="x"></object>')).toBe('');
    expect(sanitizeRenderedHtml('<embed src="x">')).toBe('');
  });

  it('supprime les attributs style inline', () => {
    const html = '<div style="background:url(evil.com)">x</div>';
    expect(sanitizeRenderedHtml(html)).toBe('<div>x</div>');
  });

  it('sanitise src avec javascript: sur img', () => {
    const html = '<img src="javascript:alert(1)">';
    expect(sanitizeRenderedHtml(html)).toBe('<img>');
  });

  it('sanitise les attributs URL avec simple quotes', () => {
    const html = "<a href='javascript:alert(1)'>x</a>";
    expect(sanitizeRenderedHtml(html)).toBe('<a rel="noopener noreferrer">x</a>');
  });

  it('sanitise les attributs URL sans quotes', () => {
    const html = '<a href=javascript:alert(1)>x</a>';
    expect(sanitizeRenderedHtml(html)).toBe('<a rel="noopener noreferrer">x</a>');
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
