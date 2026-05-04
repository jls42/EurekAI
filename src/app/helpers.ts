import { createIcons, icons } from 'lucide';
import { extractSourceNums } from './source-markers';
import type { AppContext, CostPopoverItem, ItemWithRefs, MetaPopoverConfig } from './app-context';
import type {
  Consigne,
  Generation,
  GenerationEvent,
  PendingTrackerEntry,
  PodcastGeneration,
  PodcastLine,
  ProjectData,
  Source,
} from '../../types';
import type { EventKey } from '../../helpers/event-key';
import { buildEventKey } from '../../helpers/event-key';

export type { GenerationEvent } from '../../types';
import {
  appendNotification,
  clearNotifications,
  getProjectLastSeen,
  listProfileNotifications,
  markAllRead,
  markRead,
  renderNotificationMessage,
  setProjectLastSeen,
  type PersistedNotification,
} from './notifications';

const TEXT_TEXT_PRIMARY = 'text-text-primary';
const TEXT_TEXT_SECONDARY = 'text-text-secondary';
const COLOR_PRIMARY = 'var(--color-primary)';
const COLOR_ACCENT = 'var(--color-accent)';
const I18N_GEN_PREFIX = 'gen.';
const NOTIF_GENERATION_DONE_LABEL = 'notif.generationDone';

// `GenerationEvent` est désormais une discriminated union sur `status` exportée
// depuis types.ts (source unique partagée serveur ↔ client). `generation`
// existe uniquement sur l'arm 'completed', `failureCode` uniquement sur
// 'failed'/'cancelled'. Vite efface l'import type — pas de coût runtime.
// Re-export ci-dessus pour garder la rétrocompatibilité des `import` existants
// (`from './helpers'`).

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

// Parse un eventKey 'generation:${gid}:${status}' en (gid, status). Retourne
// null si le format ne matche pas — défensif pour les notifs legacy ou un
// eventKey corrompu (on évite d'inventer un gid). Arrow plutôt que `function`
// pour ne pas être agglomérée par le parseur TS de Lizard avec les `function`
// top-level voisines (cf. CLAUDE.md piège connu).
const parseGenerationEventKey = (eventKey: string): { gid: string; status: string } | null => {
  const parts = eventKey.split(':');
  if (parts.length !== 3 || parts[0] !== 'generation') return null;
  return { gid: parts[1], status: parts[2] };
};

// Extrait le type de génération depuis paramKeys.type (format 'gen.<type>').
// Renvoie null si paramKeys absent (notif legacy pré-i18n) ou format inattendu —
// la navigation est skippée plutôt que de router vers une vue invalide.
const extractNotifGenType = (paramKeys: Record<string, string> | undefined): string | null => {
  const typeParam = paramKeys?.type;
  if (!typeParam?.startsWith(I18N_GEN_PREFIX)) return null;
  return typeParam.slice(I18N_GEN_PREFIX.length);
};

/** Ensures summary data arrays are initialized (citations, vocabulary, key_points). */
export function normalizeSummaryData(gen: Generation): void {
  if (gen.type !== 'summary' || !gen.data) return;
  const data = gen.data as Record<(typeof SUMMARY_ARRAY_KEYS)[number], unknown[]>;
  for (const key of SUMMARY_ARRAY_KEYS) {
    data[key] ??= [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers méthodes (extraites de createHelpers pour éviter que Lizard agglomère
// le CCN de toutes les méthodes dans la fonction parente). Chaque helper est
// déclaré individuellement → Lizard mesure leur CCN propre. createHelpers
// retombe à un simple object spread (CCN 1).
// ─────────────────────────────────────────────────────────────────────────────

const generationsByType = function (this: AppContext, type: string) {
  return this.generations
    .filter((g: Generation) => g.type === type)
    .sort(
      (a: Generation, b: Generation) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
};

const toggleGen = function (this: AppContext, id: string) {
  this.openGens[id] = !this.openGens[id];
  this.$nextTick(() => this.refreshIcons());
};

const apiBase = function (this: AppContext) {
  return '/api/projects/' + this.currentProjectId;
};

const currentFlag = function (this: AppContext): string {
  return this.uiLanguages.find((l) => l.code === this.locale)?.flag || '\u{1F310}';
};

const langLabel = function (this: AppContext, code: string): string {
  return this.uiLanguages.find((l) => l.code === code)?.label || code;
};

const langFlag = function (this: AppContext, code: string): string {
  return this.uiLanguages.find((l) => l.code === code)?.flag || '\u{1F310}';
};

const iconChipClass = function (type: string) {
  const map: Record<string, string> = {
    'quiz-vocal': 'icon-chip-quizvocal',
    'fill-blank': 'icon-chip-fillblank',
  };
  return map[type] || `icon-chip-${type}`;
};

const genIcon = function (type: string) {
  const map: Record<string, string> = {
    summary: 'file-text',
    flashcards: 'layers',
    quiz: 'brain',
    podcast: 'headphones',
    'quiz-vocal': 'mic',
    image: 'image',
    'fill-blank': 'pencil-line',
    auto: 'sparkles',
  };
  return map[type] || 'sparkles';
};

const genSources = function (this: AppContext, gen: Generation) {
  if (!gen.sourceIds || gen.sourceIds.length === 0) return this.sources;
  return this.sources.filter((s: Source) => gen.sourceIds.includes(s.id));
};

const inferSourceType = function (src: Source) {
  if (src.sourceType) return src.sourceType;
  if (src.filename === 'Texte libre') return 'text';
  if (src.filename === 'Enregistrement vocal') return 'voice';
  if (src.filename.startsWith('Recherche web')) return 'websearch';
  return 'ocr';
};

const isOcrSource = function (this: AppContext, src: Source) {
  return this.inferSourceType(src) === 'ocr';
};

const getOriginalFileUrl = function (src: Source) {
  if (src.filePath) return '/output/' + src.filePath;
  return null;
};

const isImageFile = function (filename: string) {
  return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filename);
};

const isPdfFile = function (filename: string) {
  return /\.pdf$/i.test(filename);
};

const sourceTypeIcon = function (this: AppContext, src: Source) {
  const map: Record<string, string> = {
    ocr: 'scan',
    text: 'pencil',
    voice: 'mic',
    websearch: 'globe',
  };
  return map[this.inferSourceType(src)] || 'file-text';
};

const sourceTypeBadge = function (this: AppContext, src: Source) {
  const type = this.inferSourceType(src);
  const keys: Record<string, string> = {
    ocr: 'sourceBadge.ocr',
    text: 'sourceBadge.text',
    voice: 'sourceBadge.voice',
    websearch: 'sourceBadge.web',
  };
  return this.t(keys[type] || 'Source');
};

const sourceTypeBadgeColor = function (this: AppContext, src: Source) {
  const colors: Record<string, string> = {
    ocr: 'bg-blue-100 text-blue-700',
    text: 'bg-green-100 text-green-700',
    voice: 'bg-orange-100 text-orange-700',
    websearch: 'bg-teal-100 text-teal-700',
  };
  return colors[this.inferSourceType(src)] || 'bg-gray-100 text-gray-700';
};

const consigneStatus = function (consigne: Consigne | null | undefined): 'failed' | 'ok' | null {
  if (!consigne) return null;
  if (consigne.status === 'failed') return 'failed';
  return 'ok';
};

const ocrConfidenceTier = function (src: Source): string | null {
  if (!src?.ocrConfidence) return null;
  const avg = src.ocrConfidence.average;
  if (!Number.isFinite(avg)) return null;
  if (avg >= 0.9) return 'high';
  if (avg >= 0.7) return 'medium';
  return 'low';
};

const ocrConfidenceColor = function (this: AppContext, src: Source) {
  const tier = this.ocrConfidenceTier(src);
  if (tier === 'high') return 'bg-success-light text-success-dark';
  if (tier === 'medium') return 'bg-warning-light text-warning-dark';
  if (tier === 'low') return 'bg-danger-light text-danger-dark';
  return '';
};

const ocrConfidencePercent = function (src: Source) {
  if (!src?.ocrConfidence || !Number.isFinite(src.ocrConfidence.average)) return '';
  return Math.round(src.ocrConfidence.average * 100) + '%';
};

const ocrConfidenceIcon = function (this: AppContext, src: Source) {
  const tier = this.ocrConfidenceTier(src);
  if (tier === 'high') return 'check-circle';
  if (tier === 'medium') return 'alert-circle';
  if (tier === 'low') return 'alert-triangle';
  return '';
};

const ocrConfidenceToneClass = function (this: AppContext, src: Source) {
  const tier = this.ocrConfidenceTier(src);
  if (tier === 'high') return 'text-success-dark';
  if (tier === 'medium') return 'text-warning-dark';
  if (tier === 'low') return 'text-danger-dark';
  return TEXT_TEXT_PRIMARY;
};

const moderationStatus = function (src: Source): string | null {
  return src?.moderation?.status ?? null;
};

const podcastSpeakerName = function (gen: PodcastGeneration, line: PodcastLine): string {
  return resolvePodcastSpeaker(gen, line).name;
};

const podcastSpeakerInitial = function (gen: PodcastGeneration, line: PodcastLine): string {
  const { name, role } = resolvePodcastSpeaker(gen, line);
  return (name || role).charAt(0).toUpperCase();
};

const podcastSpeakerTitle = function (
  this: AppContext,
  gen: PodcastGeneration,
  line: PodcastLine,
): string {
  const { name, role } = resolvePodcastSpeaker(gen, line);
  if (name) return name;
  return this.t(role === 'host' ? 'podcast.speakerHost' : 'podcast.speakerGuest');
};

const moderationBadgeColor = function (this: AppContext, src: Source) {
  const status = this.moderationStatus(src);
  if (status === 'safe') return 'bg-success-light text-success-dark';
  if (status === 'unsafe') return 'bg-danger-light text-danger-dark';
  if (status === 'pending') return 'bg-primary-light text-primary';
  if (status === 'error') return 'bg-warning-light text-warning-dark';
  return '';
};

const moderationBadgeIcon = function (this: AppContext, src: Source) {
  const status = this.moderationStatus(src);
  if (status === 'safe') return 'shield-check';
  if (status === 'unsafe') return 'shield-alert';
  if (status === 'pending') return 'loader-circle';
  if (status === 'error') return 'shield-x';
  return '';
};

const moderationBadgeIconClass = function (this: AppContext, src: Source) {
  return this.moderationStatus(src) === 'pending' ? 'animate-spin' : '';
};

const moderationBadgeTitle = function (this: AppContext, src: Source) {
  const status = this.moderationStatus(src);
  if (status === 'safe') return this.t('moderation.safe');
  if (status === 'unsafe') {
    const labels = this.flaggedCategoryLabels(src);
    return labels ? `${this.t('moderation.unsafe')} — ${labels}` : this.t('moderation.unsafe');
  }
  if (status === 'pending') return this.t('moderation.pending');
  if (status === 'error') return this.t('moderation.error');
  return '';
};

const moderationToneClass = function (this: AppContext, src: Source) {
  const status = this.moderationStatus(src);
  if (status === 'safe') return 'text-success-dark';
  if (status === 'unsafe') return 'text-danger-dark';
  if (status === 'pending') return 'text-primary';
  if (status === 'error') return 'text-warning-dark';
  return TEXT_TEXT_PRIMARY;
};

const showMetaPopover = function (this: AppContext, el: HTMLElement, config: MetaPopoverConfig) {
  this._metaPopoverPos = el.getBoundingClientRect();
  this._metaPopoverTitle = config?.title || '';
  this._metaPopoverLines = config?.lines || [];
  this._metaPopoverLineClass = config?.lineClass || TEXT_TEXT_SECONDARY;
  this._metaPopoverFooter = config?.footer || '';
  this._metaPopoverFooterClass = config?.footerClass || TEXT_TEXT_PRIMARY;
};

const hideMetaPopover = function (this: AppContext) {
  this._metaPopoverPos = null;
  this._metaPopoverTitle = '';
  this._metaPopoverLines = [];
  this._metaPopoverLineClass = TEXT_TEXT_SECONDARY;
  this._metaPopoverFooter = '';
  this._metaPopoverFooterClass = TEXT_TEXT_PRIMARY;
};

const metaPopoverStyle = function (this: AppContext) {
  if (!this._metaPopoverPos) return 'display:none';
  const pos = this._metaPopoverPos;
  const vertical =
    pos.top > 200
      ? 'bottom:' + (window.innerHeight - pos.top + 4) + 'px'
      : 'top:' + (pos.bottom + 4) + 'px';
  return vertical + ';left:' + pos.left + 'px';
};

const showCostPopover = function (this: AppContext, el: HTMLElement, item: CostPopoverItem) {
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
};

const showOcrPopover = function (this: AppContext, el: HTMLElement, src: Source) {
  this.showMetaPopover(el, {
    title: this.t('ocr.confidence'),
    lines: [this.ocrConfidencePercent(src)],
    lineClass: this.ocrConfidenceToneClass(src) + ' font-semibold',
  });
};

const showModerationPopover = function (this: AppContext, el: HTMLElement, src: Source) {
  const labels = this.flaggedCategoryLabels(src);
  this.showMetaPopover(el, {
    title: this.moderationBadgeTitle(src),
    lines: labels ? [labels] : [],
    lineClass: labels ? TEXT_TEXT_SECONDARY : this.moderationToneClass(src) + ' font-semibold',
  });
};

const SOURCE_REF_NUM_RE = /source\s*(\d+)/i;

const resolveSourceRef = function (ref: string, allSources: Source[]) {
  const numMatch = SOURCE_REF_NUM_RE.exec(ref);
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
};

const itemSources = function (this: AppContext, gen: Generation, item: ItemWithRefs) {
  return resolveItemSources(this, gen, item);
};

const questionSources = function (this: AppContext, gen: Generation, q: ItemWithRefs) {
  return resolveItemSources(this, gen, q);
};

const flashcardSource = function (this: AppContext, gen: Generation, fc: ItemWithRefs) {
  return resolveItemSources(this, gen, fc);
};

// Map type → clé d'extraction des items pour referencedSourceNums.
const REFERENCED_DATA_KEY: Record<string, string> = {
  flashcards: 'flashcards',
  quiz: 'quiz',
  'quiz-vocal': 'quiz',
};

const collectRefNums = (refs: string[] | undefined, nums: Set<number>): void => {
  for (const ref of refs ?? []) {
    const m = SOURCE_REF_NUM_RE.exec(ref);
    if (m) nums.add(Number.parseInt(m[1], 10));
  }
};

const collectFromSummary = (data: unknown, nums: Set<number>): void => {
  const summaryData = (data ?? {}) as {
    citations?: Array<{ sourceRef?: string }>;
    summary?: string;
    key_points?: string[];
  };
  for (const cit of summaryData.citations ?? []) {
    if (cit.sourceRef) collectRefNums([cit.sourceRef], nums);
  }
  const text = (summaryData.summary ?? '') + ' ' + (summaryData.key_points ?? []).join(' ');
  for (const n of extractSourceNums(text)) nums.add(n);
};

const referencedSourceNums = function (gen: Generation) {
  const nums = new Set<number>();
  const dataKey = REFERENCED_DATA_KEY[gen.type];
  if (dataKey) {
    const genData = gen.data as Record<string, ItemWithRefs[]> | ItemWithRefs[];
    const items: ItemWithRefs[] = Array.isArray(genData) ? genData : genData[dataKey] || [];
    items.forEach((item: ItemWithRefs) => collectRefNums(extractItemRefs(item), nums));
  } else if (gen.type === 'podcast') {
    collectRefNums(gen.data?.sourceRefs, nums);
  } else if (gen.type === 'fill-blank') {
    const items: ItemWithRefs[] = Array.isArray(gen.data) ? gen.data : [];
    items.forEach((item: ItemWithRefs) => collectRefNums(item.sourceRefs, nums));
  } else if (gen.type === 'summary') {
    collectFromSummary(gen.data, nums);
  }
  return nums;
};

const isSourceReferenced = function (this: AppContext, gen: Generation, srcIdx: number) {
  const nums = this.referencedSourceNums(gen);
  if (nums.size === 0) return true;
  return nums.has(srcIdx + 1);
};

const genColor = function (type: string) {
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
};

const recentGenerations = function (this: AppContext) {
  return [...this.generations]
    .sort(
      (a: Generation, b: Generation) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);
};

const dashboardStats = function (this: AppContext) {
  const stats: Record<string, number> = {};
  for (const cat of this.categories) {
    if (!['dashboard', 'sources'].includes(cat.key)) {
      stats[cat.key] = this.generations.filter((g: Generation) => g.type === cat.key).length;
    }
  }
  return stats;
};

const PROJECT_COLORS = [
  COLOR_PRIMARY,
  'var(--color-success)',
  'var(--color-gen-flashcards)',
  COLOR_ACCENT,
  'var(--color-gen-podcast)',
  'var(--color-warning)',
  'var(--color-danger)',
  'var(--color-gen-quizvocal)',
];

const projectColor = function (index: number) {
  return PROJECT_COLORS[index % PROJECT_COLORS.length];
};

const hasPendingOfType = function (this: AppContext, type: string): boolean {
  return Object.values(this.pendingById).some((p) => p.type === type && p.status === 'pending');
};

const isLoading = function (this: AppContext, type: string): boolean {
  if (TRACKED_TYPES.has(type)) {
    return this.loading[type] === true || this.hasPendingOfType(type);
  }
  return this.loading[type] === true;
};

const canStartGenerate = function (this: AppContext, type: string): boolean {
  return !this.isLoading(type);
};

const upsertGenerationById = function (this: AppContext, gen: Generation): void {
  const idx = this.generations.findIndex((g) => g.id === gen.id);
  if (idx === -1) this.generations.push(gen);
  else this.generations[idx] = gen;
};

// Sous-helpers extraits d'applyGenerationEvent pour fragmenter le CCN.
const applyPendingEvent = (
  ctx: AppContext,
  event: Extract<GenerationEvent, { status: 'pending' }>,
): void => {
  const { gid, type } = event;
  // L'event SSE `pending` n'inclut pas `sourceIds` — merge non-destructif
  // pour préserver les sources sélectionnées posées par state.generate(type).
  const prev = ctx.pendingById[gid];
  ctx.pendingById[gid] = {
    ...prev,
    id: gid,
    type,
    status: 'pending',
    startedAt: event.at,
    sourceIds: prev?.sourceIds ?? [],
  } as PendingTrackerEntry;
};

const applyCompletedEvent = (
  ctx: AppContext,
  event: Extract<GenerationEvent, { status: 'completed' }>,
): void => {
  const generation = event.generation;
  if (!generation) {
    console.warn('[sse] completed event missing generation payload', event);
    return;
  }
  // openGens AVANT upsert : l'upsert push dans state.generations ce qui
  // déclenche l'instanciation du composant Alpine. Son `x-init $watch` lirait
  // `undefined` initial → bug "audio joue tout seul" sans cette pose préalable.
  ctx.openGens[generation.id] = true;
  ctx.upsertGenerationById(generation);
  ctx.showToast(
    ctx.t(NOTIF_GENERATION_DONE_LABEL, { type: ctx.t(I18N_GEN_PREFIX + event.type) }),
    'success',
    null,
    null,
    event.eventKey,
    {
      messageKey: NOTIF_GENERATION_DONE_LABEL,
      paramKeys: { type: I18N_GEN_PREFIX + event.type },
    },
  );
};

const applyTerminalEvent = (
  ctx: AppContext,
  event: Extract<GenerationEvent, { status: 'failed' | 'cancelled' }>,
): void => {
  const cancelled = event.status === 'cancelled';
  const messageKey = cancelled ? 'notif.generationCancelled' : 'notif.generationFailed';
  const toastType = cancelled ? 'info' : 'error';
  ctx.showToast(
    ctx.t(messageKey, { type: ctx.t(I18N_GEN_PREFIX + event.type) }),
    toastType,
    null,
    null,
    event.eventKey,
    { messageKey, paramKeys: { type: I18N_GEN_PREFIX + event.type } },
  );
};

const applyGenerationEvent = function (this: AppContext, event: GenerationEvent): void {
  if (!this.currentProfile) return;
  if (event.status === 'pending') {
    applyPendingEvent(this, event);
    return;
  }
  delete this.pendingById[event.gid];
  if (event.status === 'completed') {
    applyCompletedEvent(this, event);
    return;
  }
  applyTerminalEvent(this, event);
};

// Sous-helper de reconcilePendings : applique le snapshot serveur (hydratation
// + merge generations + backfill notifs) en une seule étape try-catché.
const applyReconciledSnapshot = (
  ctx: AppContext,
  project: ProjectData,
  cutoff: number,
  profileId: string,
  projectId: string,
): void => {
  ctx.hydratePendingByIdFromTracker(project.results.pendingTracker ?? []);
  ctx.mergeReconciledGenerations(project.results.generations, cutoff);
  ctx.backfillCompletedNotifs(project.results.generations, cutoff, profileId, projectId);
  ctx.backfillTerminalNotifs(project.results.pendingTracker ?? [], cutoff, profileId, projectId);
};

const reconcilePendings = async function (
  this: AppContext,
  projectId: string,
  reconcileStartedAt: string,
): Promise<void> {
  if (!this.currentProfile) return;
  const profileId = this.currentProfile.id;
  // 1. Fetch + parse snapshot — offline / 5xx / non-JSON = acceptable.
  let project: ProjectData;
  try {
    const res = await fetch('/api/projects/' + projectId);
    if (!res.ok) return;
    project = (await res.json()) as ProjectData;
  } catch (err) {
    console.warn('[reconcile] snapshot fetch failed for project', projectId, err);
    return;
  }
  if (this.currentProjectId !== projectId) return;

  // 2. Application locale + watermark POSÉ MÊME EN CAS D'EXCEPTION.
  try {
    const cutoff = computeReconcileCutoff(profileId, projectId, reconcileStartedAt);
    applyReconciledSnapshot(this, project, cutoff, profileId, projectId);
  } catch (err) {
    console.error('[reconcile] backfill threw for project', projectId, err);
  } finally {
    setProjectLastSeen(profileId, projectId, reconcileStartedAt);
    this.notificationsVersion++;
  }
};

const hydratePendingByIdFromTracker = function (
  this: AppContext,
  tracker: PendingTrackerEntry[],
): void {
  this.pendingById = {};
  for (const t of tracker) {
    if (t.status === 'pending') this.pendingById[t.id] = t;
  }
};

const mergeReconciledGenerations = function (
  this: AppContext,
  generations: Generation[],
  cutoff: number,
): void {
  for (const gen of generations) {
    if (!gen.completedAt) continue;
    if (Date.parse(gen.completedAt) <= cutoff) continue;
    this.upsertGenerationById(gen);
  }
};

const backfillCompletedNotifs = function (
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
      eventKey: buildEventKey(gen.id, 'completed'),
      messageKey: NOTIF_GENERATION_DONE_LABEL,
      paramKeys: { type: 'gen.' + gen.type },
      type: 'success',
      projectId,
    });
  }
};

const backfillTerminalNotifs = function (
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
      eventKey: buildEventKey(t.id, t.status),
      messageKey: cancelled ? 'notif.generationCancelled' : 'notif.generationFailed',
      paramKeys: { type: 'gen.' + t.type },
      type: cancelled ? 'info' : 'error',
      projectId,
    });
  }
};

const profileNotifications = function (this: AppContext): PersistedNotification[] {
  // Lire notificationsVersion via un `if` impossible-en-pratique déclare la
  // dépendance Alpine reactivity sans utiliser le `void` operator.
  if (this.notificationsVersion < 0) return [];
  if (!this.currentProfile) return [];
  return listProfileNotifications(this.currentProfile.id);
};

const unreadNotificationsCount = function (this: AppContext): number {
  if (this.notificationsVersion < 0) return 0;
  if (!this.currentProfile) return 0;
  return listProfileNotifications(this.currentProfile.id).filter((n) => !n.read).length;
};

const markAllNotificationsRead = function (this: AppContext): void {
  if (!this.currentProfile) return;
  markAllRead(this.currentProfile.id);
  this.notificationsVersion++;
};

const markNotificationRead = function (this: AppContext, eventKey: EventKey): void {
  if (!this.currentProfile) return;
  markRead(this.currentProfile.id, eventKey);
  this.notificationsVersion++;
};

const navigateToNotification = async function (
  this: AppContext,
  notif: PersistedNotification,
): Promise<void> {
  this.markNotificationRead(notif.eventKey);
  const parsed = parseGenerationEventKey(notif.eventKey);
  if (parsed?.status !== 'completed') return;
  if (notif.projectId && notif.projectId !== this.currentProjectId) {
    await this.selectProject(notif.projectId);
  }
  const type = extractNotifGenType(notif.paramKeys);
  if (type) this.goToView(type);
  // openGens posé APRÈS selectProject. Guard sur projectId (notif legacy) pour
  // éviter de polluer openGens avec un gid d'un autre projet.
  if (notif.projectId) {
    this.openGens[parsed.gid] = true;
  }
};

const clearProfileNotifications = function (this: AppContext): void {
  if (!this.currentProfile) return;
  clearNotifications(this.currentProfile.id);
  this.shownToastEventKeys.clear();
  this.notificationsVersion++;
};

const notificationMessage = function (this: AppContext, notif: PersistedNotification): string {
  return renderNotificationMessage(notif, this.t.bind(this));
};

const formatRelativeTime = function (this: AppContext, iso: string): string {
  const elapsed = Date.now() - Date.parse(iso);
  if (elapsed < 60_000) return this.t('notif.justNow');
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 60) return this.t('notif.minutesAgo', { count: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return this.t('notif.hoursAgo', { count: hours });
  const days = Math.floor(hours / 24);
  return this.t('notif.daysAgo', { count: days });
};

const isGenerating = function (this: AppContext) {
  const pendingValues = Object.values(this.pendingById ?? {});
  return (
    Object.values(this.loading).some(Boolean) || pendingValues.some((p) => p.status === 'pending')
  );
};

const activeGenerations = function (this: AppContext): GenerationChip[] {
  // Fallback `?? {}` pour les tests qui mockent un AppContext partiel.
  const pendings = Object.values(this.pendingById ?? {});
  const result: GenerationChip[] = [];
  const t = (k: string): string => this.t(k);
  for (const cat of this.categories) {
    result.push(...buildTrackedChips(cat, pendings, this.loading, t));
  }
  for (const [key, meta] of Object.entries(EXTRA_KEYS)) {
    if (this.loading[key] === true) {
      result.push({ key, label: t(meta.labelKey), color: meta.color, icon: meta.icon });
    }
  }
  return result;
};

const getQuizScores = function (this: AppContext) {
  return this.generations
    .filter(
      (g: Generation) =>
        g.type === 'quiz' && 'stats' in g && g.stats && g.stats.attempts.length > 0,
    )
    .map((g: Generation) => {
      const stats = (g as { stats: { attempts: Array<{ score: number; total: number }> } }).stats;
      const last = stats.attempts.at(-1)!;
      return {
        gen: g,
        lastScore: last.score,
        total: last.total,
        attempts: stats.attempts.length,
      };
    });
};

const CONTEXT_TOO_LARGE_RE = /^context_too_large:(\d+)$/;
const ERROR_CODE_RE = /^[a-z_]+$/;

const resolveError = function (this: AppContext, error: string): string {
  const ctxMatch = CONTEXT_TOO_LARGE_RE.exec(error);
  if (ctxMatch) return this.t('gen.contextTooLarge', { pct: ctxMatch[1] });
  if (ERROR_CODE_RE.test(error)) {
    const codeKey = 'errorCode.' + error;
    const fromCode = this.t(codeKey);
    if (fromCode !== codeKey) return fromCode;
  }
  const translated = this.t(error);
  return translated === error ? error : translated;
};

const refreshIcons = function () {
  try {
    createIcons({ icons });
  } catch {
    /* not loaded yet */
  }
};

const formatDuration = function (seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
};

// Sprite: 5 cols x 4 rows = 20 avatars, seamless 1024x1024 grid
const AVATAR_LEGACY_MAP: Record<string, number> = {
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

const avatarStyle = function (key: string) {
  const idx = key in AVATAR_LEGACY_MAP ? AVATAR_LEGACY_MAP[key] : Number.parseInt(key, 10) || 0;
  const col = idx % 5;
  const row = Math.floor(idx / 5);
  const x = col === 0 ? '0%' : (col / 4) * 100 + '%';
  const y = row === 0 ? '0%' : (row / 3) * 100 + '%';
  return `background-image:url('/avatars.webp');background-size:500% 400%;background-position:${x} ${y};background-repeat:no-repeat;`;
};

const initGenProps = function (gen: Generation) {
  const g = gen as Generation & { _generatingVoice_all?: boolean; _scriptOpen?: boolean };
  g._generatingVoice_all = g._generatingVoice_all || false;
  if (gen.type === 'podcast') g._scriptOpen = false;
};

const flaggedCategories = function (src: Source): string[] {
  if (!src?.moderation?.categories) return [];
  return Object.entries(src.moderation.categories)
    .filter(([, flagged]) => flagged)
    .map(([cat]) => cat);
};

const flaggedCategoryLabels = function (this: AppContext, src: Source): string {
  return this.flaggedCategories(src)
    .map((cat: string) => this.t(`moderation.cat.${cat}`))
    .join(', ');
};

const defaultModerationCategories = function (this: AppContext, ageGroup: string): string[] {
  return [...(this.moderationDefaults?.[ageGroup] || [])];
};

export function createHelpers() {
  return {
    generationsByType,
    toggleGen,
    apiBase,
    currentFlag,
    langLabel,
    langFlag,
    iconChipClass,
    genIcon,
    genSources,
    inferSourceType,
    isOcrSource,
    getOriginalFileUrl,
    isImageFile,
    isPdfFile,
    sourceTypeIcon,
    sourceTypeBadge,
    sourceTypeBadgeColor,
    consigneStatus,
    ocrConfidenceTier,
    ocrConfidenceColor,
    ocrConfidencePercent,
    ocrConfidenceIcon,
    ocrConfidenceToneClass,
    moderationStatus,
    podcastSpeakerName,
    podcastSpeakerInitial,
    podcastSpeakerTitle,
    moderationBadgeColor,
    moderationBadgeIcon,
    moderationBadgeIconClass,
    moderationBadgeTitle,
    moderationToneClass,
    showMetaPopover,
    hideMetaPopover,
    metaPopoverStyle,
    showCostPopover,
    showOcrPopover,
    showModerationPopover,
    resolveSourceRef,
    itemSources,
    questionSources,
    flashcardSource,
    referencedSourceNums,
    isSourceReferenced,
    genColor,
    recentGenerations,
    dashboardStats,
    projectColor,
    hasPendingOfType,
    isLoading,
    canStartGenerate,
    upsertGenerationById,
    applyGenerationEvent,
    reconcilePendings,
    hydratePendingByIdFromTracker,
    mergeReconciledGenerations,
    backfillCompletedNotifs,
    backfillTerminalNotifs,
    profileNotifications,
    unreadNotificationsCount,
    markAllNotificationsRead,
    markNotificationRead,
    navigateToNotification,
    clearProfileNotifications,
    notificationMessage,
    formatRelativeTime,
    isGenerating,
    activeGenerations,
    getQuizScores,
    resolveError,
    refreshIcons,
    formatDuration,
    avatarStyle,
    initGenProps,
    flaggedCategories,
    flaggedCategoryLabels,
    defaultModerationCategories,
  };
}
