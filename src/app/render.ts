import { marked } from 'marked';
import { escapeHtmlAttribute, escapeMarkdownHtml, sanitizeRenderedHtml } from './render-utils';
import { normalizeSourceMarkers } from './source-markers';
import type { AppContext } from './app-context';
import type { Generation, StudyFiche } from '../../types';

const SUMMARY_ARRAY_KEYS = ['citations', 'vocabulary', 'key_points'] as const;

export function createRender() {
  return {
    renderMarkdown(content: string) {
      if (!content) return '';
      const escaped = escapeMarkdownHtml(content);
      const html = marked.parse(escaped, { breaks: true, gfm: true }) as string;
      return sanitizeRenderedHtml(html);
    },

    renderWithSources(this: AppContext, content: string, gen: Generation) {
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

    summaryData(this: AppContext, gen: Generation): StudyFiche {
      const raw = (gen as { data?: Partial<StudyFiche> }).data ?? {};
      const r = raw as StudyFiche;
      for (const k of SUMMARY_ARRAY_KEYS) {
        (r as unknown as Record<string, unknown[]>)[k] ??= [];
      }
      r.key_points = r.key_points.filter((pt: string) => pt?.trim());
      return r;
    },
  };
}
