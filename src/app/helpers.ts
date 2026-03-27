import { createIcons, icons } from 'lucide';

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
      const t = this.inferSourceType(src);
      return (
        (
          { ocr: 'scan', text: 'pencil', voice: 'mic', websearch: 'globe' } as Record<
            string,
            string
          >
        )[t] || 'file-text'
      );
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
      const t = this.inferSourceType(src);
      return (
        (
          {
            ocr: 'bg-blue-100 text-blue-700',
            text: 'bg-green-100 text-green-700',
            voice: 'bg-orange-100 text-orange-700',
            websearch: 'bg-teal-100 text-teal-700',
          } as Record<string, string>
        )[t] || 'bg-gray-100 text-gray-700'
      );
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

    questionSources(this: any, gen: any, q: any) {
      const refs = q.sourceRefs || (q.sourceRef ? [q.sourceRef] : []);
      if (refs.length === 0) return [];
      const allSources = this.genSources(gen);
      return refs.map((ref: string) => this.resolveSourceRef(ref, allSources)).filter(Boolean);
    },

    flashcardSource(this: any, gen: any, fc: any) {
      const refs = fc.sourceRefs || (fc.source ? [fc.source] : []);
      if (refs.length === 0) return [];
      const allSources = this.genSources(gen);
      return refs.map((ref: string) => this.resolveSourceRef(ref, allSources)).filter(Boolean);
    },

    referencedSourceNums(gen: any) {
      const nums = new Set<number>();
      const extract = (refs: string[]) => {
        (refs || []).forEach((ref: string) => {
          const m = /source\s*(\d+)/i.exec(ref);
          if (m) nums.add(Number.parseInt(m[1], 10));
        });
      };
      if (gen.type === 'flashcards') {
        const fcs = gen.data?.flashcards || (Array.isArray(gen.data) ? gen.data : []);
        fcs.forEach((fc: any) => extract(fc.sourceRefs || (fc.source ? [fc.source] : [])));
      } else if (gen.type === 'quiz' || gen.type === 'quiz-vocal') {
        const qs = gen.data?.quiz || (Array.isArray(gen.data) ? gen.data : []);
        qs.forEach((q: any) => extract(q.sourceRefs || (q.sourceRef ? [q.sourceRef] : [])));
      } else if (gen.type === 'podcast') {
        extract(gen.data?.sourceRefs);
      } else if (gen.type === 'fill-blank') {
        const items = Array.isArray(gen.data) ? gen.data : [];
        items.forEach((item: any) => extract(item.sourceRefs));
      } else if (gen.type === 'summary') {
        const d = gen.data || {};
        (d.citations || []).forEach((cit: any) => {
          if (cit.sourceRef) extract([cit.sourceRef]);
        });
        const text = (d.summary || '') + ' ' + (d.key_points || []).join(' ');
        const matches = text.matchAll(/\[Source\s*(\d+)\]/gi);
        for (const m of matches) nums.add(Number.parseInt(m[1], 10));
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
        all: { labelKey: 'gen.all', icon: 'layers', color: 'var(--color-primary)' },
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
      gen._audioUrl = gen._audioUrl || null;
      gen._generatingVoice = gen._generatingVoice || false;
      if (gen.type === 'podcast') gen._scriptOpen = false;
    },
  };
}
