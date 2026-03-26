import { marked } from 'marked';
import { escapeHtmlAttribute, escapeMarkdownHtml, sanitizeRenderedHtml } from './render-utils';

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
      // prettier-ignore
      let text = content.replace( // NOSONAR(S4043) — regex with g flag and capture group callback, replaceAll not applicable
        /\[(Source\s*\d+(?:\s*,\s*Source\s*\d+)*)\]/g, // NOSONAR — no backtracking risk: each iteration consumes literal tokens
        (_: string, inner: string) => {
          return inner
            .split(/\s*,\s*/) // NOSONAR — simple comma split, input from AI-generated content
            .map((s: string) => '[' + s.trim() + ']')
            .join('');
        },
      );
      let html = this.renderMarkdown(text);
      html = html.replace(/\[Source\s*(\d+)\]/g, (_: string, num: string) => makeBadge(num)); // NOSONAR(S4043) — regex with g flag and capture group callback, replaceAll not applicable
      return html;
    },

    summaryData(this: any, gen: any) {
      const r = gen.data || {};
      if (!r.citations) r.citations = [];
      if (!r.vocabulary) r.vocabulary = [];
      if (!r.key_points) r.key_points = [];
      r.key_points = r.key_points.filter((pt: string) => pt && pt.trim());
      return r;
    },

};
}
