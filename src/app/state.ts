import { UI_LANGUAGES } from '../i18n/languages';
import type {
  Consigne,
  Generation,
  Profile,
  ProjectData,
  ProjectMeta,
  Source,
  ChatMessage,
  PendingTrackerEntry,
} from '../../types';
import type { Toast } from './toast';

const PROFILE_AVATARS = Array.from({ length: 20 }, (_, i) => String(i));

// Catégories de navigation/génération — extraites pour limiter la longueur
// de createState() (warning Codacy `Method has X lines of code`).
const CATEGORIES_DEFAULT: ReadonlyArray<{
  key: string;
  labelKey: string;
  icon: string;
  color: string;
}> = [
  { key: 'dashboard', labelKey: 'nav.dashboard', icon: 'layout-grid', color: 'var(--color-primary)' },
  { key: 'sources', labelKey: 'nav.sources', icon: 'upload-cloud', color: 'var(--color-accent)' },
  { key: 'chat', labelKey: 'nav.chat', icon: 'message-circle', color: 'var(--color-primary)' },
  { key: 'summary', labelKey: 'nav.summary', icon: 'file-text', color: 'var(--color-gen-summary)' },
  { key: 'flashcards', labelKey: 'nav.flashcards', icon: 'layers', color: 'var(--color-gen-flashcards)' },
  { key: 'quiz', labelKey: 'nav.quiz', icon: 'brain', color: 'var(--color-gen-quiz)' },
  { key: 'quiz-vocal', labelKey: 'nav.quiz-vocal', icon: 'mic', color: 'var(--color-gen-quizvocal)' },
  { key: 'podcast', labelKey: 'nav.podcast', icon: 'headphones', color: 'var(--color-gen-podcast)' },
  { key: 'fill-blank', labelKey: 'nav.fill-blank', icon: 'pencil-line', color: 'var(--color-gen-fillblank)' },
  { key: 'image', labelKey: 'nav.image', icon: 'image', color: 'var(--color-gen-image)' },
];

const initialTheme = (): 'dark' | 'light' => {
  const t = localStorage.getItem('sf-theme');
  if (t === 'dark' || t === 'light') return t;
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function createState() {
  return {
    // Supported UI languages
    uiLanguages: UI_LANGUAGES,

    // Profile state
    profiles: [] as Profile[],
    currentProfile: null as Profile | null,
    showProfilePicker: false,
    showProfileForm: false,
    editingProfile: null as Profile | null,
    newProfileName: '',
    newProfileAge: '',
    newProfileAvatar: '0',
    newProfileLocale: 'fr',
    profileAvatars: PROFILE_AVATARS,

    // Project state
    projects: [] as ProjectMeta[],
    currentProjectId: null as string | null,
    currentProject: null as ProjectData | null,
    newProjectName: '',
    showNewProject: false,

    // Source state
    sources: [] as Source[],
    selectedIds: [] as string[],
    uploadSessions: [] as Array<{
      id: string;
      projectId: string;
      cleanupScheduled: boolean;
      files: Array<{
        id: string;
        name: string;
        file: File | null;
        status: 'pending' | 'uploading' | 'done' | 'error';
        errorMsg: string | null;
      }>;
    }>,
    get uploading(): boolean {
      return this.uploadSessions.some((s) =>
        s.files.some((f) => f.status === 'pending' || f.status === 'uploading'),
      );
    },
    dragging: false,
    viewSource: null as Source | null,
    viewSourceMode: 'ocr' as string,
    viewSourceZoom: 1,
    viewSourceRotation: 0,
    viewSourceRotations: {} as Record<string, number>,
    viewSourceDragging: false,
    viewSourceDragStart: { x: 0, y: 0 },
    viewSourcePanX: 0,
    viewSourcePanY: 0,
    viewSourcePanStart: { x: 0, y: 0 },
    viewSourceCompareVertical: true,
    textInput: '',
    webQuery: '',
    scrapeMode: 'auto' as 'auto' | 'readability' | 'lightpanda',
    showTextInput: false,
    showWebInput: false,

    // Shared badge popover hover state
    _metaPopoverPos: null as DOMRect | null,
    _metaPopoverTitle: '',
    _metaPopoverLines: [] as string[],
    _metaPopoverLineClass: 'text-text-secondary',
    _metaPopoverFooter: '',
    _metaPopoverFooterClass: 'text-text-primary',

    // Voice recording
    recording: false,
    recorder: null as MediaRecorder | null,
    recordingDuration: 0,
    recordingTimer: null as ReturnType<typeof setInterval> | null,

    // Consigne
    consigne: null as Consigne | null,
    consigneLoading: false,
    useConsigne: true,

    // Generation state
    generateCount: 10,
    countOptions: [10, 20, 30, 42, 50],
    generations: [] as Generation[],
    openGens: {} as Record<string, boolean>,
    editingTitle: null as string | null,
    editTitleValue: '',

    // Loading
    loading: {
      summary: false,
      flashcards: false,
      quiz: false,
      podcast: false,
      'quiz-vocal': false,
      image: false,
      'fill-blank': false,
      auto: false,
      all: false,
      voice: false,
      websearch: false,
    } as Record<string, boolean>,

    // AbortControllers for cancellation (legacy par type, conservé pour le commit
    // pending lifecycle qui migrera vers abortControllersByGid).
    abortControllers: {} as Record<string, AbortController>,

    // --- Pending lifecycle (post-PR) ---
    // Source de vérité pour les 7 Generation persistées. Multi-pendings même type
    // possibles (multi-onglets, /generate/auto parallel). Hydraté depuis
    // project.results.pendingTracker au selectProject + via events SSE.
    pendingById: {} as Record<string, PendingTrackerEntry>,

    // AbortControllers indexés par gid (UUID v4 généré côté client) — permet de
    // cibler précisément un pending à canceller même quand plusieurs pendings du
    // même type coexistent.
    abortControllersByGid: {} as Record<string, AbortController>,

    // Dédup toast UI per-tab (mémoire onglet, non persistée). Combiné avec
    // appendNotification (dédup persistée localStorage), garantit qu'un même
    // eventKey produit max 1 toast UI par onglet ET max 1 notif persistée
    // cross-tabs (cf. notifications.ts).
    shownToastEventKeys: new Set<string>(),

    // Compteur incrémenté à chaque appendNotification réussi pour déclencher
    // la reactivity Alpine sur la cloche header (badge unread + liste).
    notificationsVersion: 0,

    // Settings
    showSettings: false,
    apiStatus: { mistral: false, ttsAvailable: false, voiceCacheReady: false },
    allModerationCategories: [] as string[],
    moderationDefaults: {} as Record<string, string[]>,
    mistralVoicesList: [] as Array<{
      id: string;
      name: string;
      languages: string[];
      gender?: string;
      tags?: string[];
      speaker: string;
      emotion: string;
      lang: string;
      langFull: string;
    }>,
    configDraft: {
      models: {
        summary: '',
        flashcards: '',
        quiz: '',
        podcast: '',
        translate: '',
        ocr: '',
        quizVerify: '',
        chat: '',
      },
      ttsModel: '',
    },

    // Theme
    theme: initialTheme(),

    // Navigation & Layout
    sidebarOpen: false,
    sidebarCollapsed: false,
    mobileTab: 'magic',
    isMobile: false,
    activeView: 'dashboard',

    // Chat state
    chatMessages: [] as ChatMessage[],
    chatInput: '',
    chatLoading: false,

    categories: CATEGORIES_DEFAULT.map((c) => ({ ...c })),

    // Lightbox
    lightboxUrl: '',

    // Toasts
    toasts: [] as Toast[],
    toastCounter: 0,

    // Confirm dialog
    confirmCallback: null as (() => void) | null,
    confirmTarget: '',
    confirmTrigger: null as HTMLElement | null,

    // PIN parental dialog
    newProfilePin: '',
    newProfilePinConfirm: '',
    pinVerifyInput: '',
    pinVerifyCallback: null as ((pin: string) => void) | null,
    showPinDialog: false,
  };
}
