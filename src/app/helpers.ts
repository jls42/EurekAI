import { createIcons, icons } from 'lucide';

/** Extract source refs from any item (quiz question, flashcard, etc.). */
function extractItemRefs(item: any): string[] {
  if (item.sourceRefs) return item.sourceRefs;
  if (item.sourceRef) return [item.sourceRef];
  if (item.source) return [item.source];
  return [];
}

/** Resolve source references for any item against a generation's sources. */
function resolveItemSources(ctx: any, gen: any, item: any): any[] {
  const refs = extractItemRefs(item);
  if (refs.length === 0) return [];
  const allSources = ctx.genSources(gen);
  return refs.map((ref: string) => ctx.resolveSourceRef(ref, allSources)).filter(Boolean);
}

/** Ensures summary data arrays are initialized (citations, vocabulary, key_points). */
export function normalizeSummaryData(gen: any): void {
  if (gen.type === 'summary' && gen.data) {
    if (!gen.data.citations) gen.data.citations = [];
    if (!gen.data.vocabulary) gen.data.vocabulary = [];
    if (!gen.data.key_points) gen.data.key_points = [];
  }
}

export function createHelpers() {
  return {
    generationsByType(this: any, type: string) {
      return this.generations
        .filter((g: any) => g.type === type)
        .sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    },

    toggleGen(this: any, id: string) {
      this.openGens[id] = !this.openGens[id];
      this.$nextTick(() => this.refreshIcons());
    },

    apiBase(this: any) {
      return '/api/projects/' + this.currentProjectId;
    },

    currentFlag(this: any): string {
      return this.uiLanguages.find((l: any) => l.code === this.locale)?.flag || '\u{1F310}';
    },

    langLabel(this: any, code: string): string {
      return this.uiLanguages.find((l: any) => l.code === code)?.label || code;
    },

    langFlag(this: any, code: string): string {
      return this.uiLanguages.find((l: any) => l.code === code)?.flag || '\u{1F310}';
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

    genSources(this: any, gen: any) {
      if (!gen.sourceIds || gen.sourceIds.length === 0) return this.sources;
      return this.sources.filter((s: any) => gen.sourceIds.includes(s.id));
    },

    inferSourceType(src: any) {
      if (src.sourceType) return src.sourceType;
      if (src.filename === 'Texte libre') return 'text';
      if (src.filename === 'Enregistrement vocal') return 'voice';
      if (src.filename.startsWith('Recherche web')) return 'websearch';
      return 'ocr';
    },

    isOcrSource(this: any, src: any) {
      return this.inferSourceType(src) === 'ocr';
    },

    getOriginalFileUrl(src: any) {
      if (src.filePath) return '/output/' + src.filePath;
      return null;
    },

    isImageFile(filename: string) {
      return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filename);
    },

    isPdfFile(filename: string) {
      return /\.pdf$/i.test(filename);
    },

    sourceTypeIcon(this: any, src: any) {
      const icons: Record<string, string> = { ocr: 'scan', text: 'pencil', voice: 'mic', websearch: 'globe' };
      return icons[this.inferSourceType(src)] || 'file-text';
    },

    sourceTypeBadge(this: any, src: any) {
      const type = this.inferSourceType(src);
      const keys: Record<string, string> = {
        ocr: 'sourceBadge.ocr',
        text: 'sourceBadge.text',
        voice: 'sourceBadge.voice',
        websearch: 'sourceBadge.web',
      };
      return this.t(keys[type] || 'Source');
    },

    sourceTypeBadgeColor(this: any, src: any) {
      const colors: Record<string, string> = {
        ocr: 'bg-blue-100 text-blue-700',
        text: 'bg-green-100 text-green-700',
        voice: 'bg-orange-100 text-orange-700',
        websearch: 'bg-teal-100 text-teal-700',
      };
      return colors[this.inferSourceType(src)] || 'bg-gray-100 text-gray-700';
    },

    ocrConfidenceTier(src: any): string | null {
      if (!src?.ocrConfidence) return null;
      const avg = src.ocrConfidence.average;
      if (!Number.isFinite(avg)) return null;
      if (avg >= 0.9) return 'high';
      if (avg >= 0.7) return 'medium';
      return 'low';
    },

    ocrConfidenceColor(this: any, src: any) {
      const tier = this.ocrConfidenceTier(src);
      if (tier === 'high') return 'bg-success-light text-success-dark';
      if (tier === 'medium') return 'bg-warning-light text-warning-dark';
      if (tier === 'low') return 'bg-danger-light text-danger-dark';
      return '';
    },

    ocrConfidencePercent(src: any) {
      if (!src?.ocrConfidence || !Number.isFinite(src.ocrConfidence.average)) return '';
      return Math.round(src.ocrConfidence.average * 100) + '%';
    },

    ocrConfidenceIcon(this: any, src: any) {
      const tier = this.ocrConfidenceTier(src);
      if (tier === 'high') return 'check-circle';
      if (tier === 'medium') return 'alert-circle';
      if (tier === 'low') return 'alert-triangle';
      return '';
    },

    ocrConfidenceToneClass(src: any) {
      const tier = this.ocrConfidenceTier(src);
      if (tier === 'high') return 'text-success-dark';
      if (tier === 'medium') return 'text-warning-dark';
      if (tier === 'low') return 'text-danger-dark';
      return 'text-text-primary';
    },

    moderationStatus(src: any): string | null {
      return src?.moderation?.status ?? null;
    },

    moderationBadgeColor(this: any, src: any) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return 'bg-success-light text-success-dark';
      if (status === 'unsafe') return 'bg-danger-light text-danger-dark';
      if (status === 'pending') return 'bg-primary-light text-primary';
      if (status === 'error') return 'bg-warning-light text-warning-dark';
      return '';
    },

    moderationBadgeIcon(this: any, src: any) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return 'shield-check';
      if (status === 'unsafe') return 'shield-alert';
      if (status === 'pending') return 'loader-circle';
      if (status === 'error') return 'shield-x';
      return '';
    },

    moderationBadgeIconClass(this: any, src: any) {
      return this.moderationStatus(src) === 'pending' ? 'animate-spin' : '';
    },

    moderationBadgeTitle(this: any, src: any) {
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

    moderationToneClass(this: any, src: any) {
      const status = this.moderationStatus(src);
      if (status === 'safe') return 'text-success-dark';
      if (status === 'unsafe') return 'text-danger-dark';
      if (status === 'pending') return 'text-primary';
      if (status === 'error') return 'text-warning-dark';
      return 'text-text-primary';
    },

    showMetaPopover(this: any, el: HTMLElement, config: any) {
      this._metaPopoverPos = el.getBoundingClientRect();
      this._metaPopoverTitle = config?.title || '';
      this._metaPopoverLines = config?.lines || [];
      this._metaPopoverLineClass = config?.lineClass || 'text-text-secondary';
      this._metaPopoverFooter = config?.footer || '';
      this._metaPopoverFooterClass = config?.footerClass || 'text-text-primary';
    },

    hideMetaPopover(this: any) {
      this._metaPopoverPos = null;
      this._metaPopoverTitle = '';
      this._metaPopoverLines = [];
      this._metaPopoverLineClass = 'text-text-secondary';
      this._metaPopoverFooter = '';
      this._metaPopoverFooterClass = 'text-text-primary';
    },

    metaPopoverStyle(this: any) {
      if (!this._metaPopoverPos) return 'display:none';
      const pos = this._metaPopoverPos;
      const vertical =
        pos.top > 200
          ? 'bottom:' + (window.innerHeight - pos.top + 4) + 'px'
          : 'top:' + (pos.bottom + 4) + 'px';
      return vertical + ';left:' + pos.left + 'px';
    },

    showCostPopover(this: any, el: HTMLElement, item: any) {
      let lines: string[] = [];
      if (item?.costBreakdown?.length) lines = item.costBreakdown;
      else if (item?.usage) lines = [`${item.usage.totalTokens} tokens · ${item.usage.callCount} ${this.t('gen.apiCalls')}`];
      this.showMetaPopover(el, {
        title: this.t('gen.estimatedCost'),
        lines,
        lineClass: 'text-text-secondary font-mono',
        footer: item?.estimatedCost == null ? '' : this.t('dashboard.totalCost') + ' ~$' + item.estimatedCost.toFixed(4),
        footerClass: 'text-accent',
      });
    },

    showOcrPopover(this: any, el: HTMLElement, src: any) {
      this.showMetaPopover(el, {
        title: this.t('ocr.confidence'),
        lines: [this.ocrConfidencePercent(src)],
        lineClass: this.ocrConfidenceToneClass(src) + ' font-semibold',
      });
    },

    showModerationPopover(this: any, el: HTMLElement, src: any) {
      const labels = this.flaggedCategoryLabels(src);
      this.showMetaPopover(el, {
        title: this.moderationBadgeTitle(src),
        lines: labels ? [labels] : [],
        lineClass: labels ? 'text-text-secondary' : this.moderationToneClass(src) + ' font-semibold',
      });
    },

    resolveSourceRef(ref: string, allSources: any[]) {
      const numMatch = /source\s*(\d+)/i.exec(ref);
      if (numMatch) {
        const idx = Number.parseInt(numMatch[1], 10) - 1;
        if (allSources[idx]) return allSources[idx];
      }
      const r = ref.toLowerCase();
      return allSources.find(
        (s: any) =>
          s.filename.toLowerCase() === r ||
          r.includes(s.filename.toLowerCase()) ||
          s.filename.toLowerCase().includes(r),
      );
    },

    /** Resolve source references for any item (quiz question, flashcard, etc.). */
    itemSources(this: any, gen: any, item: any) {
      return resolveItemSources(this, gen, item);
    },

    questionSources(this: any, gen: any, q: any) {
      return resolveItemSources(this, gen, q);
    },

    flashcardSource(this: any, gen: any, fc: any) {
      return resolveItemSources(this, gen, fc);
    },

    referencedSourceNums(gen: any) {
      const nums = new Set<number>();
      const extractNums = (refs: string[]) => {
        for (const ref of refs || []) {
          const m = /source\s*(\d+)/i.exec(ref);
          if (m) nums.add(Number.parseInt(m[1], 10));
        }
      };
      const DATA_KEY: Record<string, string> = { flashcards: 'flashcards', quiz: 'quiz', 'quiz-vocal': 'quiz' };
      const dataKey = DATA_KEY[gen.type];
      if (dataKey) {
        const items = gen.data?.[dataKey] || (Array.isArray(gen.data) ? gen.data : []);
        items.forEach((item: any) => extractNums(extractItemRefs(item)));
      } else if (gen.type === 'podcast') {
        extractNums(gen.data?.sourceRefs);
      } else if (gen.type === 'fill-blank') {
        const items = Array.isArray(gen.data) ? gen.data : [];
        items.forEach((item: any) => extractNums(item.sourceRefs));
      } else if (gen.type === 'summary') {
        const d = gen.data || {};
        for (const cit of d.citations || []) {
          if (cit.sourceRef) extractNums([cit.sourceRef]);
        }
        const text = (d.summary || '') + ' ' + (d.key_points || []).join(' ');
        for (const m of text.matchAll(/\[Source\s*(\d+)\]/gi)) {
          nums.add(Number.parseInt(m[1], 10));
        }
      }
      return nums;
    },

    isSourceReferenced(this: any, gen: any, srcIdx: number) {
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

    recentGenerations(this: any) {
      return [...this.generations]
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);
    },

    dashboardStats(this: any) {
      const stats: Record<string, number> = {};
      for (const cat of this.categories) {
        if (!['dashboard', 'sources'].includes(cat.key)) {
          stats[cat.key] = this.generations.filter((g: any) => g.type === cat.key).length;
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

    isGenerating(this: any) {
      return Object.values(this.loading).some(Boolean);
    },

    activeGenerations(this: any): Array<{ key: string; label: string; color: string; icon: string }> {
      const EXTRA_KEYS: Record<string, { labelKey: string; icon: string; color: string }> = {
        auto: { labelKey: 'gen.auto', icon: 'sparkles', color: 'var(--color-primary)' },
        voice: { labelKey: 'gen.voice', icon: 'volume-2', color: 'var(--color-accent)' },
        websearch: { labelKey: 'gen.websearch', icon: 'search', color: 'var(--color-accent)' },
      };
      const result: Array<{ key: string; label: string; color: string; icon: string }> = [];
      for (const cat of this.categories) {
        if (this.loading[cat.key]) {
          result.push({ key: cat.key, label: this.t('gen.' + cat.key), color: cat.color, icon: cat.icon });
        }
      }
      for (const [key, meta] of Object.entries(EXTRA_KEYS)) {
        if (this.loading[key]) {
          result.push({ key, label: this.t(meta.labelKey), color: meta.color, icon: meta.icon });
        }
      }
      return result;
    },

    getQuizScores(this: any) {
      return this.generations
        .filter((g: any) => g.type === 'quiz' && g.stats && g.stats.attempts.length > 0)
        .map((g: any) => {
          const last = g.stats.attempts[g.stats.attempts.length - 1];
          return {
            gen: g,
            lastScore: last.score,
            total: last.total,
            attempts: g.stats.attempts.length,
          };
        });
    },

    resolveError(this: any, error: string): string {
      const ctxMatch = /^context_too_large:(\d+)$/.exec(error);
      if (ctxMatch) return this.t('gen.contextTooLarge', { pct: ctxMatch[1] });
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

    initGenProps(gen: any) {
      gen._generatingVoice_all = gen._generatingVoice_all || false;
      if (gen.type === 'podcast') gen._scriptOpen = false;
    },

    flaggedCategories(src: any): string[] {
      if (!src?.moderation?.categories) return [];
      return Object.entries(src.moderation.categories)
        .filter(([, flagged]) => flagged)
        .map(([cat]) => cat);
    },

    flaggedCategoryLabels(this: any, src: any): string {
      return this.flaggedCategories(src)
        .map((cat: string) => this.t(`moderation.cat.${cat}`))
        .join(', ');
    },

    defaultModerationCategories(this: any, ageGroup: string): string[] {
      return [...(this.moderationDefaults?.[ageGroup] || [])];
    },
  };
}
