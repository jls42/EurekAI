import { createIcons, icons } from 'lucide';
import { extractSourceNums } from './source-markers';
import type { AppContext, CostPopoverItem, ItemWithRefs, MetaPopoverConfig } from './app-context';
import type {
  Consigne,
  Generation,
  GenerationStatus,
  PendingTrackerEntry,
  PodcastGeneration,
  PodcastLine,
  ProjectData,
  Source,
} from '../../types';
import {
  appendNotification,
  clearNotifications,
  getProjectLastSeen,
  listProfileNotifications,
  markAllRead,
  markRead,
  setProjectLastSeen,
  type PersistedNotification,
} from './notifications';

const TEXT_TEXT_PRIMARY = 'text-text-primary';
const TEXT_TEXT_SECONDARY = 'text-text-secondary';
const COLOR_PRIMARY = 'var(--color-primary)';
const COLOR_ACCENT = 'var(--color-accent)';

// Event SSE poussé par le serveur sur GET /api/projects/:pid/events.
// Schéma aligné sur helpers/event-bus.ts (côté serveur). Pas d'import direct
// car ce module sert au frontend (Vite) et le shape reste stable côté backend.
export interface GenerationEvent {
  pid: string;
  gid: string;
  type: PendingTrackerEntry['type'];
  status: GenerationStatus;
  failureCode?: string;
  generation?: Generation;
  at: string;
  eventKey: string;
}

// Calcul du cutoff utilisé par reconcilePendings : si lastSeenAt absent (1er load
// post-PR), retombe sur reconcileStartedAt → zéro backfill historique.
function computeReconcileCutoff(
  profileId: string,
  projectId: string,
  reconcileStartedAt: string,
): number {
  const lastSeenIso = getProjectLastSeen(profileId, projectId);
  return Date.parse(lastSeenIso ?? reconcileStartedAt);
}

// Types Generation suivis par le pending tracker (cf. types.ts TrackedGenerationType).
// Garde locale pour éviter d'importer un type runtime côté Alpine — la définition
// reste single-source côté types.ts et toute évolution casse à compile-time les
// call sites qui s'écarteraient.
const TRACKED_TYPES: ReadonlySet<string> = new Set([
  'summary',
  'flashcards',
  'quiz',
  'podcast',
  'quiz-vocal',
  'image',
  'fill-blank',
]);

// Catégories transientes affichées dans la bannière mais hors `categories[]`
// (auto = orchestration ; voice/websearch = opérations serveur sans tracker UI).
// Cancel via `cancelOne(type)` fallback legacy = abort local + loading=false.
const EXTRA_KEYS: Record<string, { labelKey: string; icon: string; color: string }> = {
  auto: { labelKey: 'gen.auto', icon: 'sparkles', color: COLOR_PRIMARY },
  voice: { labelKey: 'gen.voice', icon: 'volume-2', color: COLOR_ACCENT },
  websearch: { labelKey: 'gen.websearch', icon: 'search', color: COLOR_ACCENT },
};

type ChipCategory = { key: string; color: string; icon: string };
type GenerationChip = { key: string; label: string; color: string; icon: string };

// Helper extrait pour respecter la limite Lizard CCN ≤ 8 sur activeGenerations.
// Arrow plutôt que `function` pour éviter l'agglomération Lizard TS des
// `function foo()` top-level consécutives (cf. CLAUDE.md règle).
const buildTrackedChips = (
  cat: ChipCategory,
  pendings: PendingTrackerEntry[],
  loading: Record<string, boolean>,
  t: (key: string) => string,
): GenerationChip[] => {
  const matched = TRACKED_TYPES.has(cat.key)
    ? pendings.filter((p) => p.type === cat.key && p.status === 'pending')
    : [];
  const label = t('gen.' + cat.key);
  if (matched.length > 0) {
    // 1 chip par gid : permet `cancelOne(gid)` qui POST /cancel au backend.
    return matched.map((p) => ({ key: p.id, label, color: cat.color, icon: cat.icon }));
  }
  // Fallback type : `loading[type]` actif sans pending tracker hydraté
  // (fenêtre transitoire HTTP→SSE pour generateAll/generateAuto).
  if (loading[cat.key] === true) {
    return [{ key: cat.key, label, color: cat.color, icon: cat.icon }];
  }
  return [];
};

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

// Source unique pour les 3 helpers podcastSpeaker* : résout le nom du speaker
// pour une ligne donnée et garantit que les 3 méthodes restent cohérentes entre
// elles (name/initial/title dérivent tous du même couple gen+line). `name = ''`
// signifie "speakers absent" (legacy) OU "speakers présent mais champ vide"
// (bug générateur) — les méthodes appelantes décident du fallback visuel.
function resolvePodcastSpeaker(
  gen: PodcastGeneration,
  line: PodcastLine,
): { name: string; role: 'host' | 'guest' } {
  const speakers = gen.data?.speakers;
  const role = line.speaker === 'host' ? 'host' : 'guest';
  const raw = role === 'host' ? speakers?.host : speakers?.guest;
  return { name: (raw ?? '').trim(), role };
}

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

    consigneStatus(consigne: Consigne | null | undefined): 'failed' | 'ok' | null {
      if (!consigne) return null;
      if (consigne.status === 'failed') return 'failed';
      return 'ok';
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
      return TEXT_TEXT_PRIMARY;
    },

    moderationStatus(src: Source): string | null {
      return src?.moderation?.status ?? null;
    },

    podcastSpeakerName(gen: PodcastGeneration, line: PodcastLine): string {
      return resolvePodcastSpeaker(gen, line).name;
    },

    podcastSpeakerInitial(gen: PodcastGeneration, line: PodcastLine): string {
      const { name, role } = resolvePodcastSpeaker(gen, line);
      // Fallback sur la 1re lettre du rôle (H/G) plutôt que des lettres arbitraires —
      // reste cohérent avec le title i18n-isé ci-dessous sans exposer du texte anglais.
      return (name || role).charAt(0).toUpperCase();
    },

    podcastSpeakerTitle(this: AppContext, gen: PodcastGeneration, line: PodcastLine): string {
      const { name, role } = resolvePodcastSpeaker(gen, line);
      if (name) return name;
      return this.t(role === 'host' ? 'podcast.speakerHost' : 'podcast.speakerGuest');
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
      return TEXT_TEXT_PRIMARY;
    },

    showMetaPopover(this: AppContext, el: HTMLElement, config: MetaPopoverConfig) {
      this._metaPopoverPos = el.getBoundingClientRect();
      this._metaPopoverTitle = config?.title || '';
      this._metaPopoverLines = config?.lines || [];
      this._metaPopoverLineClass = config?.lineClass || TEXT_TEXT_SECONDARY;
      this._metaPopoverFooter = config?.footer || '';
      this._metaPopoverFooterClass = config?.footerClass || TEXT_TEXT_PRIMARY;
    },

    hideMetaPopover(this: AppContext) {
      this._metaPopoverPos = null;
      this._metaPopoverTitle = '';
      this._metaPopoverLines = [];
      this._metaPopoverLineClass = TEXT_TEXT_SECONDARY;
      this._metaPopoverFooter = '';
      this._metaPopoverFooterClass = TEXT_TEXT_PRIMARY;
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
        lineClass: labels ? TEXT_TEXT_SECONDARY : this.moderationToneClass(src) + ' font-semibold',
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
      return colors[type] || COLOR_PRIMARY;
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
        COLOR_PRIMARY,
        'var(--color-success)',
        'var(--color-gen-flashcards)',
        COLOR_ACCENT,
        'var(--color-gen-podcast)',
        'var(--color-warning)',
        'var(--color-danger)',
        'var(--color-gen-quizvocal)',
      ];
      return colors[index % colors.length];
    },

    // 7 types Generation persistés. Pour ces types, isLoading consulte
    // pendingById en plus de loading[type] — permet de couvrir les pendings
    // hydratés depuis le tracker serveur (refresh, multi-onglets, /generate/auto).
    // Les autres types (auto/all/voice/websearch) restent purement booléens
    // dans loading{} car ils ne produisent pas de Generation persistée.
    hasPendingOfType(this: AppContext, type: string): boolean {
      return Object.values(this.pendingById).some((p) => p.type === type && p.status === 'pending');
    },

    isLoading(this: AppContext, type: string): boolean {
      if (TRACKED_TYPES.has(type)) {
        return this.loading[type] === true || this.hasPendingOfType(type);
      }
      return this.loading[type] === true;
    },

    canStartGenerate(this: AppContext, type: string): boolean {
      return !this.isLoading(type);
    },

    // Idempotence côté client : remplace une Generation existante au même id,
    // sinon push. Évite les doublons quand le payload 200 fallback ET l'event
    // SSE 'completed' arrivent tous les deux dans le même onglet.
    upsertGenerationById(this: AppContext, gen: Generation): void {
      const idx = this.generations.findIndex((g) => g.id === gen.id);
      if (idx === -1) this.generations.push(gen);
      else this.generations[idx] = gen;
    },

    // Applique un event SSE au state local. Idempotent par gid (upsertById)
    // et par eventKey (showToast/appendNotification dédup). Si payload 200 a
    // déjà appliqué la même transition, l'event SSE est absorbé sans effet.
    applyGenerationEvent(this: AppContext, event: GenerationEvent): void {
      if (!this.currentProfile) return;
      const { gid, type, status, eventKey, generation } = event;
      if (status === 'pending') {
        // Hydrate / refresh le pending optimiste (peut écraser un déjà existant
        // côté client avec les vrais startedAt/sourceIds backend).
        this.pendingById[gid] = {
          id: gid,
          type,
          status: 'pending',
          startedAt: event.at,
          sourceIds: [],
        } as PendingTrackerEntry;
        return;
      }
      // Transition terminale : retirer du pendingById
      delete this.pendingById[gid];
      if (status === 'completed' && generation) {
        // openGens AVANT upsert : la generation est `push` dans state.generations
        // par upsertGenerationById, ce qui déclenche l'instanciation du composant
        // quizVocalComponent côté Alpine. Son `x-init $watch(() => openGens[gen.id])`
        // lirait `undefined` comme valeur initiale si on ne pose pas openGens
        // d'abord — puis le payload 200 fallback set openGens=true et le watch
        // détecte la transition undefined→true → playQuestion() lance l'audio
        // automatiquement (bug observé). En posant openGens AVANT le push, la
        // valeur initiale du watch est déjà `true` donc pas de transition.
        this.openGens[generation.id] = true;
        this.upsertGenerationById(generation);
        this.showToast(
          this.t('notif.generationDone', { type: this.t('gen.' + type) }),
          'success',
          null,
          null,
          eventKey,
        );
        return;
      }
      const toastType = status === 'cancelled' ? 'info' : 'error';
      const messageKey =
        status === 'cancelled' ? 'notif.generationCancelled' : 'notif.generationFailed';
      this.showToast(
        this.t(messageKey, { type: this.t('gen.' + type) }),
        toastType,
        null,
        null,
        eventKey,
      );
    },

    // Phase de réconciliation au selectProject + reconnect SSE :
    // 1. Hydrate state.generations + pendingById depuis le snapshot serveur.
    // 2. Backfill notifs persistées pour les events ratés depuis lastSeenAt
    //    (zéro spam historique au 1er load post-PR : lastSeenAt = now).
    // 3. Set lastSeenAt = reconcileStartedAt (watermark conservateur, pré-fetch).
    async reconcilePendings(
      this: AppContext,
      projectId: string,
      reconcileStartedAt: string,
    ): Promise<void> {
      if (!this.currentProfile) return;
      const profileId = this.currentProfile.id;
      try {
        const res = await fetch('/api/projects/' + projectId);
        if (!res.ok) return;
        const project = (await res.json()) as ProjectData;
        if (this.currentProjectId !== projectId) return;
        this.hydratePendingByIdFromTracker(project.results.pendingTracker ?? []);
        const cutoff = computeReconcileCutoff(profileId, projectId, reconcileStartedAt);
        // Merge des générations apparues dans le snapshot post-cutoff (events SSE
        // ratés pendant un drop réseau) : sans ce merge, le notif "généré ✓"
        // est créé mais la carte reste invisible jusqu'à reload complet.
        this.mergeReconciledGenerations(project.results.generations, cutoff);
        this.backfillCompletedNotifs(project.results.generations, cutoff, profileId, projectId);
        this.backfillTerminalNotifs(
          project.results.pendingTracker ?? [],
          cutoff,
          profileId,
          projectId,
        );
        // Watermark écrit avec le timestamp PRÉ-fetch : si une génération se
        // termine entre le snapshot et l'ouverture SSE, son event sera quand
        // même surfacé au prochain reconnect/reload (pas masqué par lastSeenAt).
        setProjectLastSeen(profileId, projectId, reconcileStartedAt);
        this.notificationsVersion++;
      } catch {
        /* silent: réseau down, on retentera au reconnect SSE */
      }
    },

    hydratePendingByIdFromTracker(this: AppContext, tracker: PendingTrackerEntry[]): void {
      this.pendingById = {};
      for (const t of tracker) {
        if (t.status === 'pending') this.pendingById[t.id] = t;
      }
    },

    // Merge les Generation completed > cutoff dans state.generations via
    // upsertGenerationById (idempotent par id). Couvre la fenêtre où SSE
    // était down et a manqué l'event 'completed' : sans ce merge, le user
    // verrait la notif sans la carte associée.
    mergeReconciledGenerations(this: AppContext, generations: Generation[], cutoff: number): void {
      for (const gen of generations) {
        if (!gen.completedAt) continue;
        if (Date.parse(gen.completedAt) <= cutoff) continue;
        this.upsertGenerationById(gen);
      }
    },

    backfillCompletedNotifs(
      this: AppContext,
      generations: Generation[],
      cutoff: number,
      profileId: string,
      projectId: string,
    ): void {
      for (const gen of generations) {
        if (!gen.completedAt) continue;
        if (Date.parse(gen.completedAt) <= cutoff) continue;
        appendNotification(profileId, {
          eventKey: `generation:${gen.id}:completed`,
          message: this.t('notif.generationDone', { type: this.t('gen.' + gen.type) }),
          type: 'success',
          projectId,
        });
      }
    },

    backfillTerminalNotifs(
      this: AppContext,
      tracker: PendingTrackerEntry[],
      cutoff: number,
      profileId: string,
      projectId: string,
    ): void {
      for (const t of tracker) {
        if (t.status === 'pending') continue;
        if (!t.completedAt || Date.parse(t.completedAt) <= cutoff) continue;
        const cancelled = t.status === 'cancelled';
        appendNotification(profileId, {
          eventKey: `generation:${t.id}:${t.status}`,
          message: this.t(cancelled ? 'notif.generationCancelled' : 'notif.generationFailed', {
            type: this.t('gen.' + t.type),
          }),
          type: cancelled ? 'info' : 'error',
          projectId,
        });
      }
    },

    // --- Notifications cloche header ---
    profileNotifications(this: AppContext): PersistedNotification[] {
      // notificationsVersion référencé pour Alpine reactivity (re-render quand
      // appendNotification ou storage event bumpe le compteur). Le && évite
      // le `void` operator que sonarjs interdit, sans changer la sémantique.
      if (this.notificationsVersion < 0) return [];
      if (!this.currentProfile) return [];
      return listProfileNotifications(this.currentProfile.id);
    },

    unreadNotificationsCount(this: AppContext): number {
      if (this.notificationsVersion < 0) return 0;
      if (!this.currentProfile) return 0;
      return listProfileNotifications(this.currentProfile.id).filter((n) => !n.read).length;
    },

    markAllNotificationsRead(this: AppContext): void {
      if (!this.currentProfile) return;
      markAllRead(this.currentProfile.id);
      this.notificationsVersion++;
    },

    markNotificationRead(this: AppContext, eventKey: string): void {
      if (!this.currentProfile) return;
      markRead(this.currentProfile.id, eventKey);
      this.notificationsVersion++;
    },

    clearProfileNotifications(this: AppContext): void {
      if (!this.currentProfile) return;
      clearNotifications(this.currentProfile.id);
      this.notificationsVersion++;
    },

    formatRelativeTime(this: AppContext, iso: string): string {
      const elapsed = Date.now() - Date.parse(iso);
      if (elapsed < 60_000) return this.t('notif.justNow');
      const minutes = Math.floor(elapsed / 60_000);
      if (minutes < 60) return this.t('notif.minutesAgo', { count: minutes });
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return this.t('notif.hoursAgo', { count: hours });
      const days = Math.floor(hours / 24);
      return this.t('notif.daysAgo', { count: days });
    },

    isGenerating(this: AppContext) {
      const pendingValues = Object.values(this.pendingById ?? {});
      return (
        Object.values(this.loading).some(Boolean) ||
        pendingValues.some((p) => p.status === 'pending')
      );
    },

    activeGenerations(
      this: AppContext,
    ): Array<{ key: string; label: string; color: string; icon: string }> {
      // Fallback `?? {}` pour les tests qui mockent un AppContext partiel sans
      // pendingById. En prod, Alpine merge tout dans le state du composant.
      const pendings = Object.values(this.pendingById ?? {});
      const result: Array<{ key: string; label: string; color: string; icon: string }> = [];
      const t = (k: string): string => this.t(k);
      // Tracked : 1 chip par gid (cancel précis via POST /cancel) ; fallback
      // type quand `loading[type]` actif sans pending tracker hydraté
      // (fenêtre transitoire entre fetch envoyé et SSE 'pending' reçu).
      for (const cat of this.categories) {
        result.push(...buildTrackedChips(cat, pendings, this.loading, t));
      }
      // Transients (auto/voice/websearch) : 1 chip par type, fallback legacy
      // `cancelOne(type)` côté UI (pas de pendingTracker entry direct, donc
      // pas de POST /cancel envoyé — décision design assumée, cf. CLAUDE.md
      // limitation SDK Mistral non-interruptible).
      for (const [key, meta] of Object.entries(EXTRA_KEYS)) {
        if (this.loading[key] === true) {
          result.push({ key, label: t(meta.labelKey), color: meta.color, icon: meta.icon });
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
