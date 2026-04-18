import type { createState } from './state';
import type { Generation, Source } from '../../types';

export type AppState = ReturnType<typeof createState>;

type TFn = (key: string, params?: Record<string, string | number>) => string;

export interface MetaPopoverConfig {
  title?: string;
  lines?: string[];
  lineClass?: string;
  footer?: string;
  footerClass?: string;
}

export interface CostPopoverItem {
  costBreakdown?: string[];
  usage?: { totalTokens?: number; callCount?: number };
  estimatedCost?: number;
}

export interface ItemWithRefs {
  sourceRefs?: string[];
  sourceRef?: string;
  source?: string;
}

export interface AppContext extends AppState {
  $nextTick(cb?: () => void): Promise<void>;
  t: TFn;
  locale: string;

  generationsByType(type: string): Generation[];
  toggleGen(id: string): void;
  apiBase(): string;
  currentFlag(): string;
  langLabel(code: string): string;
  langFlag(code: string): string;
  iconChipClass(type: string): string;
  genIcon(type: string): string;
  genSources(gen: Generation): Source[];
  inferSourceType(src: Source): string;
  isOcrSource(src: Source): boolean;
  getOriginalFileUrl(src: Source): string | null;
  isImageFile(filename: string): boolean;
  isPdfFile(filename: string): boolean;
  sourceTypeIcon(src: Source): string;
  sourceTypeBadge(src: Source): string;
  sourceTypeBadgeColor(src: Source): string;
  ocrConfidenceTier(src: Source): string | null;
  ocrConfidenceColor(src: Source): string;
  ocrConfidencePercent(src: Source): string;
  ocrConfidenceIcon(src: Source): string;
  ocrConfidenceToneClass(src: Source): string;
  moderationStatus(src: Source): string | null;
  moderationBadgeColor(src: Source): string;
  moderationBadgeIcon(src: Source): string;
  moderationBadgeIconClass(src: Source): string;
  moderationBadgeTitle(src: Source): string;
  moderationToneClass(src: Source): string;
  showMetaPopover(el: HTMLElement, config: MetaPopoverConfig): void;
  hideMetaPopover(): void;
  metaPopoverStyle(): string;
  showCostPopover(el: HTMLElement, item: CostPopoverItem): void;
  showOcrPopover(el: HTMLElement, src: Source): void;
  showModerationPopover(el: HTMLElement, src: Source): void;
  resolveSourceRef(ref: string, allSources: Source[]): Source | undefined;
  itemSources(gen: Generation, item: ItemWithRefs): Source[];
  questionSources(gen: Generation, q: ItemWithRefs): Source[];
  flashcardSource(gen: Generation, fc: ItemWithRefs): Source[];
  referencedSourceNums(gen: Generation): Set<number>;
  isSourceReferenced(gen: Generation, srcIdx: number): boolean;
  genColor(type: string): string;
  recentGenerations(): Generation[];
  dashboardStats(): Record<string, number>;
  projectColor(index: number): string;
  isGenerating(): boolean;
  activeGenerations(): Array<{ key: string; label: string; color: string; icon: string }>;
  getQuizScores(): Array<{
    gen: Generation;
    lastScore: number;
    total: number;
    attempts: number;
  }>;
  resolveError(error: string): string;
  refreshIcons(): void;
  formatDuration(seconds: number): string;
  avatarStyle(key: string): string;
  initGenProps(gen: Generation): void;
  flaggedCategories(src: Source): string[];
  flaggedCategoryLabels(src: Source): string;
  defaultModerationCategories(ageGroup: string): string[];
}
