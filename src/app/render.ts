import { marked } from 'marked';
import { escapeHtmlAttribute, escapeMarkdownHtml, sanitizeRenderedHtml } from './render-utils';
import { normalizeSourceMarkers } from './source-markers';

export function createRender() {
  return {
    renderMarkdown(content: string) {
      if (!content) return '';
      const escaped = escapeMarkdownHtml(content);
      const html = marked.parse(escaped, { breaks: true, gfm: true }) as string;
      return sanitizeRenderedHtml(html);
    },

    renderWithSources(this: any, content: string, gen: any) {
      if (!content) return '';
      const srcs = this.genSources(gen);
      const makeBadge = (num: string) => {
        const idx = Number.parseInt(num, 10) - 1;
        const src = srcs[idx];
        if (!src) return `<span class="source-badge">${num}</span>`;
        return `<button type="button" class="source-badge" data-source-id="${escapeHtmlAttribute(src.id)}" title="${escapeHtmlAttribute(src.filename)}">${num}</button>`;
      };
      // Première passe : normalise les formats dégradés ([Source 13, 20], [Source 13, Source 20])
      // en brackets adjacents canoniques. Helper partagé avec helpers.ts:referencedSourceNums
      // pour éviter toute divergence de tolérance future.
      const text = normalizeSourceMarkers(content);
      let html = this.renderMarkdown(text);
      html = html.replace(/\[Source\s*(\d+)\]/g, (_: string, num: string) => makeBadge(num)); // NOSONAR(S4043) — regex with g flag and capture group callback, replaceAll not applicable
      return html;
    },

    summaryData(this: any, gen: any) {
      const r = gen.data || {};
      if (!r.citations) r.citations = [];
      if (!r.vocabulary) r.vocabulary = [];
      if (!r.key_points) r.key_points = [];
      r.key_points = r.key_points.filter((pt: string) => pt?.trim());
      return r;
    },
  };
}
