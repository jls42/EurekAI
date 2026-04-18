import { createIcons, icons } from 'lucide';
import { extractSourceNums } from './source-markers';
import type { AppContext, CostPopoverItem, ItemWithRefs, MetaPopoverConfig } from './app-context';
import type { Generation, Source } from '../../types';

/** Extract source refs from any item (quiz question, flashcard, etc.). */
function extractItemRefs(item: ItemWithRefs | null | undefined): string[] {
  if (!item) return [];
  if (item.sourceRefs) return item.sourceRefs;
  if (item.sourceRef) return [item.sourceRef];
  if (item.source) return [item.source];
  return [];
}

type SourceResolverCtx = Pick<AppContext, 'genSources' | 'resolveSourceRef'>;

/** Resolve source references for any item against a generation's sources. */
function resolveItemSources(ctx: SourceResolverCtx, gen: Generation, item: ItemWithRefs): Source[] {
  const refs = extractItemRefs(item);
  if (refs.length === 0) return [];
  const allSources = ctx.genSources(gen);
  return refs
    .map((ref: string) => ctx.resolveSourceRef(ref, allSources))
    .filter((s): s is Source => Boolean(s));
}

const SUMMARY_ARRAY_KEYS = ['citations', 'vocabulary', 'key_points'] as const;

/** Ensures summary data arrays are initialized (citations, vocabulary, key_points). */
export function normalizeSummaryData(gen: Generation): void {
  if (gen.type !== 'summary' || !gen.data) return;
  const data = gen.data as Record<(typeof SUMMARY_ARRAY_KEYS)[number], unknown[]>;
  for (const key of SUMMARY_ARRAY_KEYS) {
    data[key] ??= [];
  }
}

export function createHelpers() {
  return {
    generationsByType(this: AppContext, type: string) {
      return this.generations
        .filter((g: Generation) => g.type === type)
        .sort(
          (a: Generation, b: Generation) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    },

    toggleGen(this: AppContext, id: string) {
      this.openGens[id] = !this.openGens[id];
      this.$nextTick(() => this.refreshIcons());
    },

    apiBase(this: AppContext) {
      return '/api/projects/' + this.currentProjectId;
    },

    currentFlag(this: AppContext): string {
      return this.uiLanguages.find((l) => l.code === this.locale)?.flag || '\u{1F310}';
    },

    langLabel(this: AppContext, code: string): string {
      return this.uiLanguages.find((l) => l.code === code)?.label || code;
    },

    langFlag(this: AppContext, code: string): string {
      return this.uiLanguages.find((l) => l.code === code)?.flag || '\u{1F310}';
    },

    iconChipClass(type: string) {
      const map: Record<string, string> = {
        'quiz-vocal': 'icon-chip-quizvocal',
        'fill-blank': 'icon-chip-fillblank',
      };
      return map[type] || `icon-chip-${type}`;
    },

    genIcon(type: string) {
      const icons: Record<string, string> = {
        summary: 'file-text',
        flashcards: 'layers',
        quiz: 'brain',
        podcast: 'headphones',
        'quiz-vocal': 'mic',
        image: 'image',
        'fill-blank': 'pencil-line',
        auto: 'sparkles',
      };
      return icons[type] || 'sparkles';
    },

    genSources(this: AppContext, gen: Generation) {
      if (!gen.sourceIds || gen.sourceIds.length === 0) return this.sources;
      return this.sources.filter((s: Source) => gen.sourceIds.includes(s.id));
    },

    inferSourceType(src: Source) {
      if (src.sourceType) return src.sourceType;
      if (src.filename === 'Texte libre') return 'text';
      if (src.filename === 'Enregistrement vocal') return 'voice';
      if (src.filename.startsWith('Recherche web')) return 'websearch';
      return 'ocr';
    },

    isOcrSource(this: AppContext, src: Source) {
      return this.inferSourceType(src) === 'ocr';
    },

    getOriginalFileUrl(src: Source) {
      if (src.filePath) return '/output/' + src.filePath;
      return null;
    },

    isImageFile(filename: string) {
      return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filename);
    },

    isPdfFile(filename: string) {
      return /\.pdf$/i.test(filename);
    },

    sourceTypeIcon(this: AppContext, src: Source) {
      const icons: Record<string, string> = {
        ocr: 'scan',
        text: 'pencil',
        voice: 'mic',
        websearch: 'globe',
      };
      return icons[this.inferSourceType(src)] || 'file-text';
    },

    sourceTypeBadge(this: AppContext, src: Source) {
      const type = this.inferSourceType(src);
      const keys: Record<string, string> = {
        ocr: 'sourceBadge.ocr',
        text: 'sourceBadge.text',
        voice: 'sourceBadge.voice',
        websearch: 'sourceBadge.web',
      };
      return this.t(keys[type] || 'Source');
    },

    sourceTypeBadgeColor(this: AppContext, src: Source) {
      const colors: Record<string, string> = {
        ocr: 'bg-blue-100 text-blue-700',
        text: 'bg-green-100 text-green-700',
        voice: 'bg-orange-100 text-orange-700',
        websearch: 'bg-teal-100 text-teal-700',
      };
      return colors[this.inferSourceType(src)] || 'bg-gray-100 text-gray-700';
    },

    ocrConfidenceTier(src: Source): string | null {
      if (!src?.ocrConfidence) return null;
      const avg = src.ocrConfidence.average;
      if (!Number.isFinite(avg)) return null;
      if (avg >= 0.9) return 'high';
      if (avg >= 0.7) return 'medium';
      return 'low';
    },

    ocrConfidenceColor(this: AppContext, src: Source) {
      const tier = this.ocrConfidenceTier(src);
      if (tier === 'high') return 'bg-success-light text-success-dark';
      if (tier === 'medium') return 'bg-warning-light text-warning-dark';
      if (tier === 'low') return 'bg-danger-light text-danger-dark';
      return '';
    },

    ocrConfidencePercent(src: Source) {
      if (!src?.ocrConfidence || !Number.isFinite(src.ocrConfidence.average)) return '';
      return Math.round(src.ocrConfidence.average * 100) + '%';
    },

    ocrConfidenceIcon(this: AppContext, src: Source) {
      const tier = this.ocrConfidenceTier(src);
      if (tier === 'high') return 'check-circle';
      if (tier === 'medium') return 'alert-circle';
      if (tier === 'low') return 'alert-triangle';
      return '';
    },

    ocrConfidenceToneClass(this: AppContext, src: Source) {
      const tier = this.ocrConfidenceTier(src);
      if (tier === 'high') return 'text-success-dark';
      if (tier === 'medium') return 'text-warning-dark';
      if (tier === 'low') return 'text-danger-dark';
      return 'text-text-primary';
    },

    moderationStatus(src: Source): string | null {
      return src?.moderation?.status ?? null;
    },

    moderationBadgeColor(this: AppContext, src: Source) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return 'bg-success-light text-success-dark';
      if (status === 'unsafe') return 'bg-danger-light text-danger-dark';
      if (status === 'pending') return 'bg-primary-light text-primary';
      if (status === 'error') return 'bg-warning-light text-warning-dark';
      return '';
    },

    moderationBadgeIcon(this: AppContext, src: Source) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return 'shield-check';
      if (status === 'unsafe') return 'shield-alert';
      if (status === 'pending') return 'loader-circle';
      if (status === 'error') return 'shield-x';
      return '';
    },

    moderationBadgeIconClass(this: AppContext, src: Source) {
      return this.moderationStatus(src) === 'pending' ? 'animate-spin' : '';
    },

    moderationBadgeTitle(this: AppContext, src: Source) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return this.t('moderation.safe');
      if (status === 'unsafe') {
        const labels = this.flaggedCategoryLabels(src);
        return labels ? `${this.t('moderation.unsafe')} — ${labels}` : this.t('moderation.unsafe');
      }
      if (status === 'pending') return this.t('moderation.pending');
      if (status === 'error') return this.t('moderation.error');
      return '';
    },

    moderationToneClass(this: AppContext, src: Source) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return 'text-success-dark';
      if (status === 'unsafe') return 'text-danger-dark';
      if (status === 'pending') return 'text-primary';
      if (status === 'error') return 'text-warning-dark';
      return 'text-text-primary';
    },

    showMetaPopover(this: AppContext, el: HTMLElement, config: MetaPopoverConfig) {
      this._metaPopoverPos = el.getBoundingClientRect();
      this._metaPopoverTitle = config?.title || '';
      this._metaPopoverLines = config?.lines || [];
      this._metaPopoverLineClass = config?.lineClass || 'text-text-secondary';
      this._metaPopoverFooter = config?.footer || '';
      this._metaPopoverFooterClass = config?.footerClass || 'text-text-primary';
    },

    hideMetaPopover(this: AppContext) {
      this._metaPopoverPos = null;
      this._metaPopoverTitle = '';
      this._metaPopoverLines = [];
      this._metaPopoverLineClass = 'text-text-secondary';
      this._metaPopoverFooter = '';
      this._metaPopoverFooterClass = 'text-text-primary';
    },

    metaPopoverStyle(this: AppContext) {
      if (!this._metaPopoverPos) return 'display:none';
      const pos = this._metaPopoverPos;
      const vertical =
        pos.top > 200
          ? 'bottom:' + (window.innerHeight - pos.top + 4) + 'px'
          : 'top:' + (pos.bottom + 4) + 'px';
      return vertical + ';left:' + pos.left + 'px';
    },

    showCostPopover(this: AppContext, el: HTMLElement, item: CostPopoverItem) {
      let lines: string[] = [];
      if (item?.costBreakdown?.length) lines = item.costBreakdown;
      else if (item?.usage)
        lines = [
          `${item.usage.totalTokens} tokens · ${item.usage.callCount} ${this.t('gen.apiCalls')}`,
        ];
      this.showMetaPopover(el, {
        title: this.t('gen.estimatedCost'),
        lines,
        lineClass: 'text-text-secondary font-mono',
        footer:
          item?.estimatedCost == null
            ? ''
            : this.t('dashboard.totalCost') + ' ~$' + item.estimatedCost.toFixed(4),
        footerClass: 'text-accent',
      });
    },

    showOcrPopover(this: AppContext, el: HTMLElement, src: Source) {
      this.showMetaPopover(el, {
        title: this.t('ocr.confidence'),
        lines: [this.ocrConfidencePercent(src)],
        lineClass: this.ocrConfidenceToneClass(src) + ' font-semibold',
      });
    },

    showModerationPopover(this: AppContext, el: HTMLElement, src: Source) {
      const labels = this.flaggedCategoryLabels(src);
      this.showMetaPopover(el, {
        title: this.moderationBadgeTitle(src),
        lines: labels ? [labels] : [],
        lineClass: labels
          ? 'text-text-secondary'
          : this.moderationToneClass(src) + ' font-semibold',
      });
    },

    resolveSourceRef(ref: string, allSources: Source[]) {
      const numMatch = /source\s*(\d+)/i.exec(ref);
      if (numMatch) {
        const idx = Number.parseInt(numMatch[1], 10) - 1;
        if (allSources[idx]) return allSources[idx];
      }
      const r = ref.toLowerCase();
      return allSources.find(
        (s: Source) =>
          s.filename.toLowerCase() === r ||
          r.includes(s.filename.toLowerCase()) ||
          s.filename.toLowerCase().includes(r),
      );
    },

    /** Resolve source references for any item (quiz question, flashcard, etc.). */
    itemSources(this: AppContext, gen: Generation, item: ItemWithRefs) {
      return resolveItemSources(this, gen, item);
    },

    questionSources(this: AppContext, gen: Generation, q: ItemWithRefs) {
      return resolveItemSources(this, gen, q);
    },

    flashcardSource(this: AppContext, gen: Generation, fc: ItemWithRefs) {
      return resolveItemSources(this, gen, fc);
    },

    referencedSourceNums(gen: Generation) {
      const nums = new Set<number>();
      const extractNums = (refs: string[]) => {
        for (const ref of refs || []) {
          const m = /source\s*(\d+)/i.exec(ref);
          if (m) nums.add(Number.parseInt(m[1], 10));
        }
      };
      const DATA_KEY: Record<string, string> = {
        flashcards: 'flashcards',
        quiz: 'quiz',
        'quiz-vocal': 'quiz',
      };
      const dataKey = DATA_KEY[gen.type];
      if (dataKey) {
        const genData = gen.data as Record<string, ItemWithRefs[]> | ItemWithRefs[];
        const items: ItemWithRefs[] = Array.isArray(genData) ? genData : genData[dataKey] || [];
        items.forEach((item: ItemWithRefs) => extractNums(extractItemRefs(item)));
      } else if (gen.type === 'podcast') {
        extractNums(gen.data?.sourceRefs || []);
      } else if (gen.type === 'fill-blank') {
        const items: ItemWithRefs[] = Array.isArray(gen.data) ? gen.data : [];
        items.forEach((item: ItemWithRefs) => extractNums(item.sourceRefs || []));
      } else if (gen.type === 'summary') {
        const summaryData = (gen.data || {}) as {
          citations?: Array<{ sourceRef?: string }>;
          summary?: string;
          key_points?: string[];
        };
        for (const cit of summaryData.citations || []) {
          if (cit.sourceRef) extractNums([cit.sourceRef]);
        }
        const text = (summaryData.summary || '') + ' ' + (summaryData.key_points || []).join(' ');
        for (const n of extractSourceNums(text)) nums.add(n);
      }
      return nums;
    },

    isSourceReferenced(this: AppContext, gen: Generation, srcIdx: number) {
      const nums = this.referencedSourceNums(gen);
      if (nums.size === 0) return true;
      return nums.has(srcIdx + 1);
    },

    genColor(type: string) {
      const colors: Record<string, string> = {
        summary: 'var(--color-gen-summary)',
        flashcards: 'var(--color-gen-flashcards)',
        quiz: 'var(--color-gen-quiz)',
        podcast: 'var(--color-gen-podcast)',
        'quiz-vocal': 'var(--color-gen-quizvocal)',
        image: 'var(--color-gen-image)',
        'fill-blank': 'var(--color-gen-fillblank)',
      };
      return colors[type] || 'var(--color-primary)';
    },

    recentGenerations(this: AppContext) {
      return [...this.generations]
        .sort(
          (a: Generation, b: Generation) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 8);
    },

    dashboardStats(this: AppContext) {
      const stats: Record<string, number> = {};
      for (const cat of this.categories) {
        if (!['dashboard', 'sources'].includes(cat.key)) {
          stats[cat.key] = this.generations.filter((g: Generation) => g.type === cat.key).length;
        }
      }
      return stats;
    },

    projectColor(index: number) {
      const colors = [
        'var(--color-primary)',
        'var(--color-success)',
        'var(--color-gen-flashcards)',
        'var(--color-accent)',
        'var(--color-gen-podcast)',
        'var(--color-warning)',
        'var(--color-danger)',
        'var(--color-gen-quizvocal)',
      ];
      return colors[index % colors.length];
    },

    isGenerating(this: AppContext) {
      return Object.values(this.loading).some(Boolean);
    },

    activeGenerations(
      this: AppContext,
    ): Array<{ key: string; label: string; color: string; icon: string }> {
      const EXTRA_KEYS: Record<string, { labelKey: string; icon: string; color: string }> = {
        auto: { labelKey: 'gen.auto', icon: 'sparkles', color: 'var(--color-primary)' },
        voice: { labelKey: 'gen.voice', icon: 'volume-2', color: 'var(--color-accent)' },
        websearch: { labelKey: 'gen.websearch', icon: 'search', color: 'var(--color-accent)' },
      };
      const result: Array<{ key: string; label: string; color: string; icon: string }> = [];
      for (const cat of this.categories) {
        if (this.loading[cat.key]) {
          result.push({
            key: cat.key,
            label: this.t('gen.' + cat.key),
            color: cat.color,
            icon: cat.icon,
          });
        }
      }
      for (const [key, meta] of Object.entries(EXTRA_KEYS)) {
        if (this.loading[key]) {
          result.push({ key, label: this.t(meta.labelKey), color: meta.color, icon: meta.icon });
        }
      }
      return result;
    },

    getQuizScores(this: AppContext) {
      return this.generations
        .filter(
          (g: Generation) =>
            g.type === 'quiz' && 'stats' in g && g.stats && g.stats.attempts.length > 0,
        )
        .map((g: Generation) => {
          const stats = (g as { stats: { attempts: Array<{ score: number; total: number }> } })
            .stats;
          const last = stats.attempts.at(-1)!;
          return {
            gen: g,
            lastScore: last.score,
            total: last.total,
            attempts: stats.attempts.length,
          };
        });
    },

    resolveError(this: AppContext, error: string): string {
      const ctxMatch = /^context_too_large:(\d+)$/.exec(error);
      if (ctxMatch) return this.t('gen.contextTooLarge', { pct: ctxMatch[1] });
      if (/^[a-z_]+$/.test(error)) {
        const codeKey = 'errorCode.' + error;
        const fromCode = this.t(codeKey);
        if (fromCode !== codeKey) return fromCode;
      }
      const translated = this.t(error);
      return translated === error ? error : translated;
    },

    refreshIcons() {
      try {
        createIcons({ icons });
      } catch {
        /* not loaded yet */
      }
    },

    formatDuration(seconds: number) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    },

    avatarStyle(key: string) {
      // Sprite: 5 cols x 4 rows = 20 avatars, seamless 1024x1024 grid
      const legacyMap: Record<string, number> = {
        rocket: 0,
        star: 1,
        cat: 2,
        book: 3,
        heart: 4,
        sun: 5,
        moon: 6,
        tree: 7,
        fish: 8,
        bird: 9,
        flower: 10,
        music: 11,
      };
      const idx = key in legacyMap ? legacyMap[key] : Number.parseInt(key, 10) || 0;
      const col = idx % 5;
      const row = Math.floor(idx / 5);
      const x = col === 0 ? '0%' : (col / 4) * 100 + '%';
      const y = row === 0 ? '0%' : (row / 3) * 100 + '%';
      return `background-image:url('/avatars.webp');background-size:500% 400%;background-position:${x} ${y};background-repeat:no-repeat;`;
    },

    initGenProps(gen: Generation) {
      const g = gen as Generation & { _generatingVoice_all?: boolean; _scriptOpen?: boolean };
      g._generatingVoice_all = g._generatingVoice_all || false;
      if (gen.type === 'podcast') g._scriptOpen = false;
    },

    flaggedCategories(src: Source): string[] {
      if (!src?.moderation?.categories) return [];
      return Object.entries(src.moderation.categories)
        .filter(([, flagged]) => flagged)
        .map(([cat]) => cat);
    },

    flaggedCategoryLabels(this: AppContext, src: Source): string {
      return this.flaggedCategories(src)
        .map((cat: string) => this.t(`moderation.cat.${cat}`))
        .join(', ');
    },

    defaultModerationCategories(this: AppContext, ageGroup: string): string[] {
      return [...(this.moderationDefaults?.[ageGroup] || [])];
    },
  };
}
