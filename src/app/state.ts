import { UI_LANGUAGES } from '../i18n/languages';

const PROFILE_AVATARS = Array.from({ length: 20 }, (_, i) => String(i));

export function createState() {
  return {
    // Supported UI languages
    uiLanguages: UI_LANGUAGES,

    // Profile state
    profiles: [] as any[],
    currentProfile: null as any,
    showProfilePicker: false,
    showProfileForm: false,
    editingProfile: null as any,
    newProfileName: '',
    newProfileAge: '',
    newProfileAvatar: '0',
    newProfileLocale: 'fr',
    profileAvatars: PROFILE_AVATARS,

    // Project state
    projects: [] as any[],
    currentProjectId: null as string | null,
    currentProject: null as any,
    newProjectName: '',
    showNewProject: false,

    // Source state
    sources: [] as any[],
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
      return this.uploadSessions.some(s => s.files.some(f => f.status === 'pending' || f.status === 'uploading'));
    },
    dragging: false,
    viewSource: null as any,
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
    consigne: null as any,
    consigneLoading: false,
    useConsigne: true,

    // Generation state
    generateCount: 10,
    countOptions: [10, 20, 30, 42, 50],
    generations: [] as any[],
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

    // AbortControllers for cancellation
    abortControllers: {} as Record<string, AbortController>,

    // Settings
    showSettings: false,
    apiStatus: { mistral: false, elevenlabs: false, ttsAvailable: false },
    allModerationCategories: [] as string[],
    moderationDefaults: {} as Record<string, string[]>,
    mistralVoicesList: [] as Array<{
      id: string;
      name: string;
      speaker: string;
      emotion: string;
      lang: string;
      langFull: string;
    }>,
    configDraft: {
      models: { summary: '', flashcards: '', quiz: '', podcast: '', translate: '', ocr: '' },
      voices: { host: { id: '', name: '' }, guest: { id: '', name: '' } },
      ttsModel: '',
      ttsProvider: 'mistral' as string,
      mistralVoices: { host: 'Oliver', guest: 'Marie' },
    },

    // Theme
    theme: (function () {
      const t = localStorage.getItem('sf-theme');
      if (!t) return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return t;
    })(),

    // Navigation & Layout
    sidebarOpen: false,
    sidebarCollapsed: false,
    mobileTab: 'magic',
    isMobile: false,
    activeView: 'dashboard',

    // Chat state
    chatMessages: [] as any[],
    chatInput: '',
    chatLoading: false,

    categories: [
      {
        key: 'dashboard',
        labelKey: 'nav.dashboard',
        icon: 'layout-grid',
        color: 'var(--color-primary)',
      },
      {
        key: 'sources',
        labelKey: 'nav.sources',
        icon: 'upload-cloud',
        color: 'var(--color-accent)',
      },
      { key: 'chat', labelKey: 'nav.chat', icon: 'message-circle', color: 'var(--color-primary)' },
      {
        key: 'summary',
        labelKey: 'nav.summary',
        icon: 'file-text',
        color: 'var(--color-gen-summary)',
      },
      {
        key: 'flashcards',
        labelKey: 'nav.flashcards',
        icon: 'layers',
        color: 'var(--color-gen-flashcards)',
      },
      { key: 'quiz', labelKey: 'nav.quiz', icon: 'brain', color: 'var(--color-gen-quiz)' },
      {
        key: 'quiz-vocal',
        labelKey: 'nav.quiz-vocal',
        icon: 'mic',
        color: 'var(--color-gen-quizvocal)',
      },
      {
        key: 'podcast',
        labelKey: 'nav.podcast',
        icon: 'headphones',
        color: 'var(--color-gen-podcast)',
      },
      {
        key: 'fill-blank',
        labelKey: 'nav.fill-blank',
        icon: 'pencil-line',
        color: 'var(--color-gen-fillblank)',
      },
      { key: 'image', labelKey: 'nav.image', icon: 'image', color: 'var(--color-gen-image)' },
    ],

    // Lightbox
    lightboxUrl: '',

    // Toasts
    toasts: [] as any[],
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
