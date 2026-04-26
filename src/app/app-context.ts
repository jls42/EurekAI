import type { createState } from './state';
import type {
  Consigne,
  Generation,
  PendingTrackerEntry,
  PodcastGeneration,
  PodcastLine,
  Profile,
  Source,
  StudyFiche,
} from '../../types';

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

type ToastAction = { label: string; fn: () => void };

export interface AppContext extends AppState {
  $nextTick(cb?: () => void): Promise<void>;
  $refs: Record<string, HTMLElement | HTMLDialogElement | undefined>;
  t: TFn;
  locale: string;

  showToast(
    message: string,
    type?: string,
    retryFn?: (() => void) | null,
    action?: ToastAction | null,
    eventKey?: string,
  ): void;
  dismissToast(id: number): void;

  refreshConsigne(): Promise<void>;

  refreshModeration(retries?: number): Promise<void>;
  handleFiles(fileList: FileList | null | undefined): Promise<void>;
  handleDrop(e: DragEvent): void;
  addText(): Promise<void>;
  deleteSource(id: string): Promise<void>;

  selectProfile(id: string): void;
  loadMistralVoices?(): Promise<void>;
  requirePin(callback: (pin: string) => void): void;
  confirmDelete(message: string, callback: () => void): void;
  setLocale(lang: string, skipProfileSync?: boolean): void;
  resetState(): void;
  loadProjects(): Promise<void>;
  applyProfileUpdate(id: string, updated: Profile): void;
  updateProfile(id: string, updates: Record<string, unknown>, signal?: AbortSignal): Promise<void>;
  autoSaveProfile(immediate?: boolean): void;
  autoSaveParental(): Promise<void>;
  applyThemeLive(): void;
  closePinDialog(): void;
  requireParentalAccess(callback: () => void): void;
  _toggleProfileProp(id: string, prop: string): Promise<void>;

  goToView(view: string): void;

  createProject(): Promise<void>;
  selectProject(id: string): Promise<void>;
  deleteProject(id: string): Promise<void>;
  openLightbox(url: string): void;

  toggleRecording(): Promise<void>;
  startRecording(): Promise<void>;
  stopRecording(): void;
  uploadVoice(blob: Blob): Promise<void>;

  checkMobile(): void;
  toggleTheme(): void;
  openSourceDialog(src: Source): void;

  loadProfiles(): Promise<void>;
  loadConfig(): Promise<void>;

  searchWeb(): Promise<void>;

  renderMarkdown(content: string): string;
  renderWithSources(content: string, gen: Generation): string;
  summaryData(gen: Generation): StudyFiche;

  sendChatMessage(): Promise<void>;
  loadChatHistory(): Promise<void>;
  clearChat(): Promise<void>;
  scrollChatBottom(): void;

  openSummaryDetail(gen: Generation): void;
  openGenerationDetail?(gen: Generation): void;

  startEditTitle(gen: Generation): void;
  saveTitle(gen: Generation): Promise<void>;
  deleteGen(gen: Generation): Promise<void>;

  translateEmotion(emotion: string): string;
  langToFlag(lang: string): string;
  podcastSpeakerName(gen: PodcastGeneration, line: PodcastLine): string;
  podcastSpeakerInitial(gen: PodcastGeneration, line: PodcastLine): string;
  podcastSpeakerTitle(gen: PodcastGeneration, line: PodcastLine): string;
  voiceLabel(voice: {
    id?: string;
    name?: string;
    speaker?: string;
    emotion?: string;
    lang?: string;
  }): string;
  defaultVoiceOptionLabel(role: 'host' | 'guest', locale: string, profileId?: string): string;
  saveSettings(): Promise<void>;
  resetSettings(): Promise<void>;
  closeSettingsDialog(): void;

  blockedModerationSource(): Source | null;
  blockedModerationStatus(): string | null;
  moderationBlockedMessage(status: string | null): string;
  generate(type: string): Promise<void>;
  generateAll(): Promise<void>;
  generateAuto(): Promise<void>;
  generateVoice(gen: Generation, section?: string): Promise<void>;
  playSection(gen: Generation, section: string | null): void;
  playNextSection(gen: Generation): void;
  isBatchComplete(gen: Generation): boolean;
  initSummaryAudio(gen: Generation): void;
  _audioSectionOrder: readonly string[];

  // UI-only extended draft on profile editing (verified PIN held in memory)
  editingProfile: (Profile & { _verifiedPin?: string; hasPin?: boolean }) | null;

  // Private fields du mixin profiles (auto-save debounce + abort controller)
  _autoSaveTimer: ReturnType<typeof setTimeout> | null;
  _saveController: AbortController | null;

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
  consigneStatus(consigne: Consigne | null | undefined): 'failed' | 'ok' | null;
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
  hasPendingOfType(type: string): boolean;
  isLoading(type: string): boolean;
  canStartGenerate(type: string): boolean;
  upsertGenerationById(gen: Generation): void;
  resetSession(): void;
  applyGenerationEvent(event: import('./helpers').GenerationEvent): void;
  reconcilePendings(projectId: string, reconcileStartedAt: string): Promise<void>;
  hydratePendingByIdFromTracker(tracker: PendingTrackerEntry[]): void;
  backfillCompletedNotifs(
    generations: Generation[],
    cutoff: number,
    profileId: string,
    projectId: string,
  ): void;
  backfillTerminalNotifs(
    tracker: PendingTrackerEntry[],
    cutoff: number,
    profileId: string,
    projectId: string,
  ): void;
  startPendingsStream(projectId: string): Promise<void>;
  stopPendingsStream(): void;
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
