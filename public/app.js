// --- Quiz component (per-generation) ---
function quizComponent(gen) {
  return {
    gen,
    answers: {},
    submitted: false,
    reviewing: false,

    initQuiz() {
      this.answers = {};
      this.submitted = false;
    },

    questions() {
      if (this.gen._lang === 'en' && this.gen.dataEN) return this.gen.dataEN;
      return this.gen.data || [];
    },

    answer(qi, ci) {
      this.answers[qi] = ci;
    },

    allAnswered() {
      return (
        this.questions().length > 0 && Object.keys(this.answers).length === this.questions().length
      );
    },

    score() {
      let s = 0;
      for (const [qi, ci] of Object.entries(this.answers)) {
        if (this.questions()[Number(qi)]?.correct === Number(ci)) s++;
      }
      return s;
    },

    async submitAttempt() {
      const pid = this.currentProjectId;
      try {
        const res = await fetch(
          '/api/projects/' + pid + '/generations/' + this.gen.id + '/quiz-attempt',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: this.answers }),
          },
        );
        if (res.ok) {
          const result = await res.json();
          this.gen.stats = result.stats;
          this.submitted = true;
          this.showToast('Score enregistre !', 'success');
        }
      } catch (e) {
        this.showToast('Erreur enregistrement du score', 'error', () => this.submitAttempt());
      }
    },

    async reviewErrors() {
      const pid = this.currentProjectId;
      const weakQuestions = [];
      for (const [qi, ci] of Object.entries(this.answers)) {
        if (this.gen.data[Number(qi)]?.correct !== Number(ci)) {
          weakQuestions.push(this.gen.data[Number(qi)]);
        }
      }
      if (weakQuestions.length === 0) return;

      this.reviewing = true;
      try {
        const res = await fetch('/api/projects/' + pid + '/generate/quiz-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            generationId: this.gen.id,
            weakQuestions,
          }),
        });
        if (res.ok) {
          const newGen = await res.json();
          this.generations.push(newGen);
          this.openGens[newGen.id] = true;
          this.showToast('Quiz de revision genere !', 'success');
        }
      } catch (e) {
        this.showToast('Erreur generation de revision', 'error', () => this.reviewErrors());
      } finally {
        this.reviewing = false;
      }
    },

    resetQuiz() {
      this.answers = {};
      this.submitted = false;
    },
  };
}

// --- Quiz Vocal component ---
function quizVocalComponent(gen) {
  return {
    gen,
    currentQ: 0,
    audioPlaying: false,
    vocalRecording: false,
    vocalRecorder: null,
    feedback: null,
    score: 0,
    finished: false,

    questions() {
      return this.gen.data || [];
    },

    currentAudioUrl() {
      return this.gen.audioUrls?.[this.currentQ] || '';
    },

    questionAudio() {
      return this.$refs?.questionAudio || null;
    },

    stopQuestion() {
      const audio = this.questionAudio();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      this.audioPlaying = false;
    },

    playQuestion() {
      const audio = this.questionAudio();
      if (!audio || !this.currentAudioUrl()) return;
      audio.pause();
      audio.currentTime = 0;
      audio.load();
      this.audioPlaying = true;
      audio.play().catch(() => {
        this.audioPlaying = false;
      });
    },

    async startVocalRecording() {
      try {
        this.stopQuestion();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.vocalRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const chunks = [];
        this.vocalRecorder.ondataavailable = (e) => chunks.push(e.data);
        this.vocalRecorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: 'audio/webm' });
          await this.submitVocalAnswer(blob);
        };
        this.vocalRecorder.start();
        this.vocalRecording = true;
      } catch (e) {
        this.showToast("Impossible d'acceder au micro: " + e.message, 'error');
      }
    },

    stopVocalRecording() {
      if (this.vocalRecorder && this.vocalRecorder.state === 'recording') {
        this.vocalRecorder.stop();
      }
      this.vocalRecording = false;
    },

    async submitVocalAnswer(blob) {
      const pid = this.currentProjectId;
      this.feedback = { loading: true };
      try {
        const formData = new FormData();
        formData.append('audio', blob, 'answer.webm');
        formData.append('questionIndex', String(this.currentQ));
        const res = await fetch(
          '/api/projects/' + pid + '/generations/' + this.gen.id + '/vocal-answer',
          { method: 'POST', body: formData },
        );
        if (res.ok) {
          const result = await res.json();
          this.feedback = result;
          if (result.correct) this.score++;
        } else {
          this.feedback = { correct: false, feedback: 'Erreur de verification', transcription: '' };
        }
      } catch (e) {
        this.feedback = { correct: false, feedback: 'Erreur: ' + e.message, transcription: '' };
      }
    },

    nextQuestion() {
      this.stopQuestion();
      this.feedback = null;
      this.currentQ++;
      if (this.currentQ >= this.questions().length) {
        this.finished = true;
      } else {
        this.$nextTick(() => this.playQuestion());
      }
    },

    resetVocalQuiz() {
      this.stopQuestion();
      this.currentQ = 0;
      this.score = 0;
      this.finished = false;
      this.feedback = null;
      this.$nextTick(() => this.playQuestion());
    },
  };
}

// --- Main app ---
function app() {
  return {
    // Project state
    projects: [],
    currentProjectId: null,
    currentProject: null,
    newProjectName: '',
    showNewProject: false,

    // Source state
    sources: [],
    selectedIds: [],
    uploading: false,
    uploadProgress: { current: 0, total: 0, filename: '' },
    dragging: false,
    viewSource: null,
    viewSourceMode: 'ocr',
    viewSourceZoom: 1,
    viewSourceRotation: 0,
    viewSourceDragging: false,
    viewSourceDragStart: { x: 0, y: 0 },
    viewSourceScrollStart: { x: 0, y: 0 },
    textInput: '',
    webQuery: '',
    showTextInput: false,
    showWebInput: false,

    // Voice recording
    recording: false,
    recorder: null,
    recordingDuration: 0,
    recordingTimer: null,

    // Consigne
    consigne: null,
    consigneLoading: false,
    useConsigne: true,

    // Generation state
    generations: [],
    openGens: {},
    editingTitle: null,
    editTitleValue: '',

    // Loading
    loading: {
      summary: false,
      flashcards: false,
      quiz: false,
      podcast: false,
      'quiz-vocal': false,
      image: false,
      auto: false,
      all: false,
      voice: false,
      websearch: false,
    },

    // AbortControllers for cancellation (one per generation type)
    abortControllers: {},

    // Settings
    showSettings: false,
    apiStatus: { mistral: false, elevenlabs: false },
    configDraft: {
      models: { summary: '', flashcards: '', quiz: '', podcast: '', translate: '', ocr: '' },
      voices: { host: { id: '', name: '' }, guest: { id: '', name: '' } },
      ttsModel: '',
    },

    // Theme
    theme: (function () {
      var t = localStorage.getItem('sf-theme');
      if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return t;
    })(),

    // Navigation & Layout
    sidebarOpen: false,
    sidebarCollapsed: false,
    mobileTab: 'magic',
    isMobile: false,
    activeView: 'dashboard',

    // Chat state
    chatMessages: [],
    chatInput: '',
    chatLoading: false,

    categories: [
      { key: 'dashboard', label: 'Dashboard', icon: 'layout-grid', color: 'var(--color-primary)' },
      { key: 'sources', label: 'Sources', icon: 'upload-cloud', color: 'var(--color-accent)' },
      { key: 'chat', label: 'Chat', icon: 'message-circle', color: 'var(--color-primary)' },
      { key: 'summary', label: 'Fiches', icon: 'file-text', color: 'var(--color-gen-summary)' },
      {
        key: 'flashcards',
        label: 'Flashcards',
        icon: 'layers',
        color: 'var(--color-gen-flashcards)',
      },
      { key: 'quiz', label: 'Quiz', icon: 'brain', color: 'var(--color-gen-quiz)' },
      {
        key: 'quiz-vocal',
        label: 'Quiz vocal',
        icon: 'mic',
        color: 'var(--color-gen-quizvocal)',
      },
      { key: 'podcast', label: 'Podcasts', icon: 'headphones', color: 'var(--color-gen-podcast)' },
      { key: 'image', label: 'Illustrations', icon: 'image', color: 'var(--color-gen-image)' },
    ],

    // Lightbox
    lightboxUrl: '',

    // Parent Gate
    parentGateUnlocked: false,
    parentGateExpiry: null,
    parentGateCallback: null,
    parentGateChallenge: { a: 0, b: 0, answer: 0 },
    parentGateAnswer: '',
    parentGateError: false,

    // Toasts
    toasts: [],
    toastCounter: 0,

    // Confirm dialog
    confirmCallback: null,
    confirmTarget: '',
    confirmTrigger: null,

    // --- Helpers ---
    generationsByType(type) {
      return this.generations.filter((g) => g.type === type);
    },

    toggleGen(id) {
      this.openGens[id] = !this.openGens[id];
      this.$nextTick(() => this.refreshIcons());
    },

    get apiBase() {
      return '/api/projects/' + this.currentProjectId;
    },

    genIcon(type) {
      const icons = {
        summary: 'file-text',
        flashcards: 'layers',
        quiz: 'brain',
        podcast: 'headphones',
        'quiz-vocal': 'mic',
        image: 'image',
        auto: 'sparkles',
      };
      return icons[type] || 'sparkles';
    },

    genSources(gen) {
      if (!gen.sourceIds || gen.sourceIds.length === 0) return this.sources;
      return this.sources.filter((s) => gen.sourceIds.includes(s.id));
    },

    inferSourceType(src) {
      if (src.sourceType) return src.sourceType;
      if (src.filename === 'Texte libre') return 'text';
      if (src.filename === 'Enregistrement vocal') return 'voice';
      if (src.filename.startsWith('Recherche web')) return 'websearch';
      return 'ocr';
    },

    isOcrSource(src) {
      return this.inferSourceType(src) === 'ocr';
    },

    getOriginalFileUrl(src) {
      if (src.filePath) return '/output/' + src.filePath;
      return null;
    },

    isImageFile(filename) {
      return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filename);
    },

    isPdfFile(filename) {
      return /\.pdf$/i.test(filename);
    },

    sourceTypeIcon(src) {
      const t = this.inferSourceType(src);
      return { ocr: 'scan', text: 'pencil', voice: 'mic', websearch: 'globe' }[t] || 'file-text';
    },

    sourceTypeBadge(src) {
      const t = this.inferSourceType(src);
      return { ocr: 'OCR', text: 'Texte', voice: 'Voix', websearch: 'Web' }[t] || 'Source';
    },

    sourceTypeBadgeColor(src) {
      const t = this.inferSourceType(src);
      return (
        {
          ocr: 'bg-blue-100 text-blue-700',
          text: 'bg-green-100 text-green-700',
          voice: 'bg-orange-100 text-orange-700',
          websearch: 'bg-teal-100 text-teal-700',
        }[t] || 'bg-gray-100 text-gray-700'
      );
    },

    resolveSourceRef(ref, allSources) {
      // Match "Source N" pattern → index N-1
      const numMatch = ref.match(/source\s*(\d+)/i);
      if (numMatch) {
        const idx = Number.parseInt(numMatch[1], 10) - 1;
        if (allSources[idx]) return allSources[idx];
      }
      // Fallback: match by filename
      const r = ref.toLowerCase();
      return allSources.find(
        (s) =>
          s.filename.toLowerCase() === r ||
          r.includes(s.filename.toLowerCase()) ||
          s.filename.toLowerCase().includes(r),
      );
    },

    questionSources(gen, q) {
      const refs = q.sourceRefs || (q.sourceRef ? [q.sourceRef] : []);
      if (refs.length === 0) return [];
      const allSources = this.genSources(gen);
      const matched = refs.map((ref) => this.resolveSourceRef(ref, allSources)).filter(Boolean);
      return matched;
    },

    flashcardSource(gen, fc) {
      const refs = fc.sourceRefs || (fc.source ? [fc.source] : []);
      if (refs.length === 0) return [];
      const allSources = this.genSources(gen);
      const matched = refs.map((ref) => this.resolveSourceRef(ref, allSources)).filter(Boolean);
      return matched;
    },

    // Returns a Set of 1-indexed source numbers actually referenced in a generation
    referencedSourceNums(gen) {
      const nums = new Set();
      const extract = (refs) => {
        (refs || []).forEach((ref) => {
          const m = ref.match(/source\s*(\d+)/i);
          if (m) nums.add(Number.parseInt(m[1], 10));
        });
      };
      if (gen.type === 'flashcards') {
        const fcs = gen.data?.flashcards || (Array.isArray(gen.data) ? gen.data : []);
        fcs.forEach((fc) => extract(fc.sourceRefs || (fc.source ? [fc.source] : [])));
      } else if (gen.type === 'quiz' || gen.type === 'quiz-vocal') {
        const qs = gen.data?.quiz || (Array.isArray(gen.data) ? gen.data : []);
        qs.forEach((q) => extract(q.sourceRefs || (q.sourceRef ? [q.sourceRef] : [])));
      } else if (gen.type === 'podcast') {
        const d = gen.data || {};
        extract(d.sourceRefs);
      } else if (gen.type === 'summary') {
        const d = gen.data || {};
        (d.citations || []).forEach((cit) => {
          if (cit.sourceRef) extract([cit.sourceRef]);
        });
        // Also scan key_points and summary for [Source N] patterns
        const text = (d.summary || '') + ' ' + (d.key_points || []).join(' ');
        const matches = text.matchAll(/\[Source\s*(\d+)\]/gi);
        for (const m of matches) nums.add(Number.parseInt(m[1], 10));
      }
      return nums;
    },

    isSourceReferenced(gen, srcIdx) {
      const nums = this.referencedSourceNums(gen);
      // If no refs found at all (podcast, image, etc.), treat all as referenced
      if (nums.size === 0) return true;
      return nums.has(srcIdx + 1);
    },

    genColor(type) {
      const colors = {
        summary: 'var(--color-gen-summary)',
        flashcards: 'var(--color-gen-flashcards)',
        quiz: 'var(--color-gen-quiz)',
        podcast: 'var(--color-gen-podcast)',
        'quiz-vocal': 'var(--color-gen-quizvocal)',
        image: 'var(--color-gen-image)',
      };
      return colors[type] || 'var(--color-primary)';
    },

    recentGenerations() {
      return [...this.generations]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);
    },

    dashboardStats() {
      const stats = {};
      for (const cat of ['summary', 'flashcards', 'quiz', 'podcast']) {
        stats[cat] = this.generations.filter((g) => g.type === cat).length;
      }
      return stats;
    },

    sortedProjects() {
      return [...this.projects].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },

    projectColor(index) {
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

    isGenerating() {
      return Object.values(this.loading).some(Boolean);
    },

    getQuizScores() {
      return this.generations
        .filter((g) => g.type === 'quiz' && g.stats && g.stats.attempts.length > 0)
        .map((g) => {
          const last = g.stats.attempts[g.stats.attempts.length - 1];
          return {
            gen: g,
            lastScore: last.score,
            total: last.total,
            attempts: g.stats.attempts.length,
          };
        });
    },

    // --- Lucide Icons refresh ---
    refreshIcons() {
      try {
        lucide.createIcons();
      } catch (e) {
        // Lucide not loaded yet, will initialize later
      }
    },

    // --- View Transitions ---
    goToView(view) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !prefersReducedMotion) {
        document.startViewTransition(() => {
          this.activeView = view;
          this.$nextTick(() => this.refreshIcons());
        });
      } else {
        this.activeView = view;
        this.$nextTick(() => this.refreshIcons());
      }
      window.scrollTo(0, 0);
    },

    // --- Toast system ---
    showToast(message, type = 'info', retryFn = null) {
      const id = ++this.toastCounter;
      this.toasts.push({ id, message, type, retryFn });
      this.$nextTick(() => this.refreshIcons());

      // Auto-dismiss (errors with retry persist)
      if (!(type === 'error' && retryFn)) {
        setTimeout(() => this.dismissToast(id), 5000);
      }
    },

    dismissToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },

    // --- Parent Gate ---
    generateChallenge() {
      this.parentGateChallenge = {
        a: Math.floor(Math.random() * 80) + 20, // NOSONAR — child-deterrent math challenge, not cryptographic
        b: Math.floor(Math.random() * 80) + 20, // NOSONAR
        answer: 0,
      };
      this.parentGateChallenge.answer = this.parentGateChallenge.a + this.parentGateChallenge.b;
      this.parentGateAnswer = '';
      this.parentGateError = false;
    },

    checkParentGate() {
      if (!this.parentGateUnlocked) return false;
      if (!this.parentGateExpiry) return false;
      return Date.now() < this.parentGateExpiry;
    },

    requireParentGate(callback) {
      if (this.checkParentGate()) {
        callback();
        return;
      }
      this.parentGateCallback = callback;
      this.generateChallenge();
      this.$refs.parentGateDialog?.showModal();
    },

    validateParentGate() {
      if (Number(this.parentGateAnswer) === this.parentGateChallenge.answer) {
        this.parentGateUnlocked = true;
        this.parentGateExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
        this.$refs.parentGateDialog?.close();
        if (this.parentGateCallback) {
          this.parentGateCallback();
          this.parentGateCallback = null;
        }
      } else {
        this.parentGateError = true;
        this.parentGateAnswer = '';
      }
    },

    closeParentGate() {
      this.$refs.parentGateDialog?.close();
      this.parentGateCallback = null;
    },

    // --- Confirm dialog ---
    confirmDelete(target, callback) {
      this.requireParentGate(() => {
        this.confirmTarget =
          target === 'projet'
            ? 'ce projet et toutes ses donnees'
            : target === 'source'
              ? 'cette source'
              : target === 'generation'
                ? 'cette generation'
                : target;
        this.confirmCallback = callback;
        this.confirmTrigger = document.activeElement;
        this.$refs.confirmDialog?.showModal();
      });
    },

    executeConfirm() {
      this.$refs.confirmDialog?.close();
      if (this.confirmCallback) {
        this.confirmCallback();
        this.confirmCallback = null;
      }
      // Return focus to trigger
      if (this.confirmTrigger) {
        this.$nextTick(() => {
          try {
            this.confirmTrigger.focus();
          } catch {}
          this.confirmTrigger = null;
        });
      }
    },

    closeConfirmDialog() {
      this.$refs.confirmDialog?.close();
      this.confirmCallback = null;
      if (this.confirmTrigger) {
        this.$nextTick(() => {
          try {
            this.confirmTrigger.focus();
          } catch {}
          this.confirmTrigger = null;
        });
      }
    },

    cancelGeneration() {
      for (const controller of Object.values(this.abortControllers)) {
        controller.abort();
      }
      this.abortControllers = {};
      for (const key of Object.keys(this.loading)) {
        this.loading[key] = false;
      }
      this.showToast('Generation annulee', 'info');
    },

    // --- Init reactive properties for generations ---
    initGenProps(gen) {
      gen._audioUrl = gen._audioUrl || null;
      gen._generatingVoice = gen._generatingVoice || false;
      gen._lang = gen._lang || 'fr';
      gen._translating = gen._translating || false;
      if (gen.type === 'flashcards') gen._flipped = gen._flipped || {};
      if (gen.type === 'podcast') gen._scriptOpen = false;
    },

    // --- Responsive ---
    checkMobile() {
      this.isMobile = window.innerWidth < 1024;
    },

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('sf-theme', this.theme);
      this.$nextTick(() => this.refreshIcons());
    },

    // Init
    async init() {
      // Apply theme on startup
      document.documentElement.setAttribute('data-theme', this.theme);

      this.checkMobile();
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this.checkMobile(), 150);
      });

      // Global bridge for source badges in rendered HTML
      window._openSource = (id) => {
        const src = this.sources.find((s) => s.id === id);
        if (src) this.openSourceDialog(src);
      };

      await this.loadProjects();
      await this.loadConfig();

      this.$nextTick(() => this.refreshIcons());
    },

    // --- Config ---
    async loadConfig() {
      try {
        const [configRes, statusRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/config/status'),
        ]);
        if (configRes.ok) {
          const config = await configRes.json();
          this.configDraft = JSON.parse(JSON.stringify(config));
        }
        if (statusRes.ok) this.apiStatus = await statusRes.json();
      } catch {}
    },

    async saveSettings() {
      try {
        const res = await fetch('/api/config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.configDraft),
        });
        if (res.ok) {
          const saved = await res.json();
          this.configDraft = JSON.parse(JSON.stringify(saved));
          this.$refs.settingsDialog?.close();
          this.showToast('Parametres sauvegardes', 'success');
        }
      } catch (e) {
        this.showToast('Erreur sauvegarde parametres', 'error', () => this.saveSettings());
      }
    },

    closeSettingsDialog() {
      this.$refs.settingsDialog?.close();
    },

    // --- Lightbox ---
    openLightbox(url) {
      this.lightboxUrl = url;
      this.$refs.imageLightbox?.showModal();
    },

    // --- Projects ---
    async loadProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) this.projects = await res.json();
      } catch {}
      // Auto-restore last project (important for mobile)
      const lastId = localStorage.getItem('sf-lastProjectId');
      if (lastId && !this.currentProjectId && this.projects.find((p) => p.id === lastId)) {
        await this.selectProject(lastId);
      }
    },

    async createProject() {
      const name = this.newProjectName.trim();
      if (!name) return;
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
        if (res.ok) {
          const meta = await res.json();
          this.projects.push(meta);
          this.newProjectName = '';
          this.showNewProject = false;
          await this.selectProject(meta.id);
          this.showToast('Cours cree !', 'success');
        }
      } catch (e) {
        this.showToast('Erreur creation du cours', 'error', () => this.createProject());
      }
    },

    async selectProject(id) {
      this.currentProjectId = id;
      localStorage.setItem('sf-lastProjectId', id);
      this.resetState();
      try {
        const res = await fetch('/api/projects/' + id);
        if (!res.ok) return;
        const project = await res.json();
        this.currentProject = project;
        this.sources = project.sources || [];
        this.selectedIds = this.sources.map((s) => s.id);
        this.generations = project.results?.generations || [];
        this.consigne = project.consigne || null;
        this.chatMessages = project.chat?.messages || [];
        // Normalize generation data
        for (const gen of this.generations) {
          if (gen.type === 'summary' && gen.data) {
            if (!gen.data.citations) gen.data.citations = [];
            if (!gen.data.vocabulary) gen.data.vocabulary = [];
            if (!gen.data.key_points) gen.data.key_points = [];
          }
          this.initGenProps(gen);
        }
        // Auto-open latest of each type
        const latestByType = {};
        for (const gen of this.generations) {
          if (!latestByType[gen.type] || gen.createdAt > latestByType[gen.type].createdAt) {
            latestByType[gen.type] = gen;
          }
        }
        for (const gen of Object.values(latestByType)) {
          this.openGens[gen.id] = true;
        }
        // Determine starting view
        if (this.sources.length === 0) {
          this.activeView = 'sources';
        } else {
          this.activeView = 'dashboard';
        }
        this.$nextTick(() => this.refreshIcons());
      } catch {}
    },

    async deleteProject(id) {
      await fetch('/api/projects/' + id, { method: 'DELETE' });
      this.projects = this.projects.filter((p) => p.id !== id);
      if (this.currentProjectId === id) {
        this.currentProjectId = null;
        this.currentProject = null;
        localStorage.removeItem('sf-lastProjectId');
        this.resetState();
      }
      this.showToast('Projet supprime', 'info');
    },

    resetState() {
      this.sources = [];
      this.selectedIds = [];
      this.generations = [];
      this.openGens = {};
      this.editingTitle = null;
      this.activeView = 'dashboard';
      this.showTextInput = false;
      this.showWebInput = false;
      this.consigne = null;
      this.chatMessages = [];
      this.chatInput = '';
    },

    // --- Title editing ---
    startEditTitle(gen) {
      this.editingTitle = gen.id;
      this.editTitleValue = gen.title;
      this.$nextTick(() => {
        const input = document.querySelector('input[x-ref="titleInput"]');
        if (input) input.focus();
      });
    },

    async saveTitle(gen) {
      const title = this.editTitleValue.trim();
      this.editingTitle = null;
      if (!title || title === gen.title) return;
      gen.title = title;
      await fetch(this.apiBase + '/generations/' + gen.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
    },

    // --- Delete generation ---
    async deleteGen(gen) {
      await fetch(this.apiBase + '/generations/' + gen.id, { method: 'DELETE' });
      this.generations = this.generations.filter((g) => g.id !== gen.id);
      this.showToast('Generation supprimee', 'info');
    },

    // --- Translate generation ---
    async translateGen(gen) {
      if (gen.dataEN || gen._translating) return;
      gen._translating = true;
      try {
        const res = await fetch(this.apiBase + '/generations/' + gen.id + '/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          gen.dataEN = await res.json();
          gen._lang = 'en';
          this.showToast('Traduction terminee !', 'success');
        }
      } catch (e) {
        this.showToast('Erreur de traduction', 'error', () => this.translateGen(gen));
      } finally {
        gen._translating = false;
      }
    },

    // --- Upload ---
    handleDrop(e) {
      this.dragging = false;
      this.handleFiles(e.dataTransfer.files);
    },

    async handleFiles(fileList) {
      if (!fileList || fileList.length === 0 || !this.currentProjectId) return;
      this.uploading = true;
      this.uploadProgress = { current: 0, total: fileList.length, filename: '' };

      for (let i = 0; i < fileList.length; i++) {
        const f = fileList[i];
        this.uploadProgress = { current: i + 1, total: fileList.length, filename: f.name };
        const formData = new FormData();
        formData.append('files', f);
        try {
          const res = await fetch(this.apiBase + '/sources/upload', {
            method: 'POST',
            body: formData,
          });
          if (!res.ok) {
            const err = await res.json();
            this.showToast('Erreur: ' + (err.error || res.statusText), 'error');
            continue;
          }
          const newSources = await res.json();
          this.sources.push(...newSources);
          this.selectedIds.push(...newSources.map((s) => s.id));
        } catch (e) {
          this.showToast('Erreur upload ' + f.name + ': ' + e.message, 'error');
        }
      }
      this.uploading = false;
      this.uploadProgress = { current: 0, total: 0, filename: '' };
      if (this.sources.length > 0) {
        this.showToast('Sources ajoutees !', 'success');
      }
      this.$nextTick(() => this.refreshIcons());
      // Re-detect consigne in background after adding sources
      setTimeout(() => this.refreshConsigne(), 3000);
    },

    async addText() {
      const text = this.textInput.trim();
      if (!text || !this.currentProjectId) return;
      this.uploading = true;
      try {
        const res = await fetch(this.apiBase + '/sources/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast('Erreur: ' + (err.error || res.statusText), 'error');
          return;
        }
        const source = await res.json();
        this.sources.push(source);
        this.selectedIds.push(source.id);
        this.textInput = '';
        this.showTextInput = false;
        this.showToast('Texte ajoute !', 'success');
        this.$nextTick(() => this.refreshIcons());
      } catch (e) {
        this.showToast('Erreur: ' + e.message, 'error', () => this.addText());
      } finally {
        this.uploading = false;
      }
    },

    async deleteSource(id) {
      await fetch(this.apiBase + '/sources/' + id, { method: 'DELETE' });
      this.sources = this.sources.filter((s) => s.id !== id);
      this.selectedIds = this.selectedIds.filter((sid) => sid !== id);
      this.showToast('Source supprimee', 'info');
    },

    // --- Source viewer dialog ---
    openSourceDialog(src) {
      this.viewSource = src;
      this.viewSourceMode = 'ocr';
      this.viewSourceZoom = 1;
      this.viewSourceRotation = 0;
      const dialog = document.querySelector('[x-ref="sourceDialog"]');
      if (dialog) dialog.showModal();
      this.$nextTick(() => this.refreshIcons());
    },

    zoomIn() {
      this.viewSourceZoom = Math.min(3, this.viewSourceZoom + 0.25);
    },
    zoomOut() {
      this.viewSourceZoom = Math.max(0.5, this.viewSourceZoom - 0.25);
    },
    resetZoom() {
      this.viewSourceZoom = 1;
      this.viewSourceRotation = 0;
    },
    rotateLeft() {
      this.viewSourceRotation -= 90;
    },
    rotateRight() {
      this.viewSourceRotation += 90;
    },

    startDrag(e) {
      if (this.viewSourceZoom <= 1) return;
      this.viewSourceDragging = true;
      const point = e.touches ? e.touches[0] : e;
      const container = e.currentTarget;
      this.viewSourceDragStart = { x: point.clientX, y: point.clientY };
      this.viewSourceScrollStart = { x: container.scrollLeft, y: container.scrollTop };
      container.style.cursor = 'grabbing';
      e.preventDefault();
    },
    onDrag(e) {
      if (!this.viewSourceDragging) return;
      const point = e.touches ? e.touches[0] : e;
      const container = e.currentTarget;
      container.scrollLeft =
        this.viewSourceScrollStart.x - (point.clientX - this.viewSourceDragStart.x);
      container.scrollTop =
        this.viewSourceScrollStart.y - (point.clientY - this.viewSourceDragStart.y);
      e.preventDefault();
    },
    stopDrag() {
      this.viewSourceDragging = false;
    },

    renderMarkdown(content) {
      if (!content) return '';
      if (typeof marked !== 'undefined') {
        return marked.parse(content, { breaks: true, gfm: true });
      }
      return content.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    },

    renderWithSources(content, gen) {
      if (!content) return '';
      const srcs = this.genSources(gen);
      const makeBadge = (num) => {
        const idx = Number.parseInt(num, 10) - 1;
        const src = srcs[idx];
        if (!src) return `<span class="source-badge">${num}</span>`;
        return `<button onclick="window._openSource('${src.id}')" class="source-badge" title="${src.filename}">${num}</button>`;
      };
      // Pre-process: expand grouped refs [Source 2, Source 4, Source 10] into individual [Source N]
      // prettier-ignore
      let text = content.replace( // NOSONAR(S4043) — regex with g flag and capture group callback, replaceAll not applicable
        /\[(Source\s*\d+(?:\s*,\s*Source\s*\d+)*)\]/g, (_, inner) => {
        // NOSONAR — no backtracking risk: each group iteration consumes literal "," + "Source" + digits
        return inner
          .split(/\s*,\s*/) // NOSONAR — simple comma split, input from AI-generated content
          .map((s) => '[' + s.trim() + ']')
          .join('');
      });
      let html = this.renderMarkdown(text);
      // Replace individual [Source N] with clickable badges
      html = html.replace(/\[Source\s*(\d+)\]/g, (_, num) => makeBadge(num)); // NOSONAR(S4043) — regex with g flag and capture group callback, replaceAll not applicable
      return html;
    },

    closeSourceDialog() {
      this.$refs.sourceDialog?.close();
      this.viewSource = null;
    },

    // --- Voice recording ---
    async toggleRecording() {
      if (this.recording) {
        this.stopRecording();
      } else {
        await this.startRecording();
      }
    },

    async startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const chunks = [];
        this.recorder.ondataavailable = (e) => chunks.push(e.data);
        this.recorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: 'audio/webm' });
          await this.uploadVoice(blob);
        };
        this.recorder.start();
        this.recording = true;
        this.recordingDuration = 0;
        this.recordingTimer = setInterval(() => {
          this.recordingDuration++;
        }, 1000);
      } catch (e) {
        this.showToast("Impossible d'acceder au micro: " + e.message, 'error');
      }
    },

    stopRecording() {
      if (this.recorder && this.recorder.state === 'recording') {
        this.recorder.stop();
      }
      this.recording = false;
      if (this.recordingTimer) {
        clearInterval(this.recordingTimer);
        this.recordingTimer = null;
      }
    },

    async uploadVoice(blob) {
      if (!this.currentProjectId) return;
      this.loading.voice = true;
      try {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');
        const res = await fetch(this.apiBase + '/sources/voice', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast('Erreur: ' + (err.error || res.statusText), 'error');
          return;
        }
        const source = await res.json();
        this.sources.push(source);
        this.selectedIds.push(source.id);
        this.showToast('Voix transcrite !', 'success');
        this.$nextTick(() => this.refreshIcons());
      } catch (e) {
        this.showToast('Erreur transcription: ' + e.message, 'error');
      } finally {
        this.loading.voice = false;
      }
    },

    // --- Web search ---
    async searchWeb() {
      const query = this.webQuery.trim();
      if (!query || !this.currentProjectId) return;
      this.loading.websearch = true;
      try {
        const res = await fetch(this.apiBase + '/sources/websearch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast('Erreur: ' + (err.error || res.statusText), 'error');
          return;
        }
        const source = await res.json();
        this.sources.push(source);
        this.selectedIds.push(source.id);
        this.webQuery = '';
        this.showWebInput = false;
        this.showToast('Recherche web ajoutee !', 'success');
        this.$nextTick(() => this.refreshIcons());
      } catch (e) {
        this.showToast('Erreur recherche: ' + e.message, 'error', () => this.searchWeb());
      } finally {
        this.loading.websearch = false;
      }
    },

    // Consigne silent refresh (after source add)
    async refreshConsigne() {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch('/api/projects/' + this.currentProjectId);
        if (res.ok) {
          const project = await res.json();
          if (project.consigne) {
            this.consigne = project.consigne;
            this.$nextTick(() => this.refreshIcons());
          }
        }
      } catch {}
    },

    // Consigne detection
    async detectConsigne() {
      if (!this.currentProjectId) return;
      this.consigneLoading = true;
      try {
        const res = await fetch(this.apiBase + '/detect-consigne', { method: 'POST' });
        if (res.ok) {
          this.consigne = await res.json();
          this.showToast(
            this.consigne.found ? 'Consigne de revision detectee !' : 'Aucune consigne detectee',
            this.consigne.found ? 'success' : 'info',
          );
        }
      } catch (e) {
        this.showToast('Erreur detection consigne', 'error');
      } finally {
        this.consigneLoading = false;
        this.$nextTick(() => this.refreshIcons());
      }
    },

    // Moderation
    async moderateSource(src) {
      try {
        const res = await fetch(this.apiBase + '/moderate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: src.markdown }),
        });
        if (res.ok) {
          src.moderation = await res.json();
          this.$nextTick(() => this.refreshIcons());
        }
      } catch {}
    },

    // --- Generation (parallel, non-blocking) ---
    async generate(type) {
      if (!this.currentProjectId || this.loading[type]) return;
      const projectId = this.currentProjectId;
      this.loading[type] = true;

      const controller = new AbortController();
      this.abortControllers[type] = controller;

      try {
        const body = {
          sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
        };
        const res = await fetch('/api/projects/' + projectId + '/generate/' + type, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast('Erreur: ' + (err.error || res.statusText), 'error', () =>
            this.generate(type),
          );
          return;
        }
        if (this.currentProjectId !== projectId) return;
        const gen = await res.json();
        if (gen.type === 'summary' && gen.data) {
          if (!gen.data.citations) gen.data.citations = [];
          if (!gen.data.vocabulary) gen.data.vocabulary = [];
          if (!gen.data.key_points) gen.data.key_points = [];
        }
        this.initGenProps(gen);
        this.generations.push(gen);
        this.openGens[gen.id] = true;
        this.goToView(type);
        this.showToast('Generation terminee !', 'success');
      } catch (e) {
        if (e.name === 'AbortError') return;
        this.showToast('Erreur generation: ' + e.message, 'error', () => this.generate(type));
      } finally {
        this.loading[type] = false;
        delete this.abortControllers[type];
        this.$nextTick(() => this.refreshIcons());
      }
    },

    async generateAll() {
      if (!this.currentProjectId) return;
      const projectId = this.currentProjectId;
      this.loading.all = true;

      const controller = new AbortController();
      this.abortControllers.all = controller;

      const body = {
        sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
      };
      const makeOpts = () => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      try {
        const base = '/api/projects/' + projectId;
        const [summaryRes, flashcardsRes, quizRes] = await Promise.all([
          fetch(base + '/generate/summary', makeOpts()),
          fetch(base + '/generate/flashcards', makeOpts()),
          fetch(base + '/generate/quiz', makeOpts()),
        ]);
        if (this.currentProjectId !== projectId) return;
        for (const r of [summaryRes, flashcardsRes, quizRes]) {
          if (r.ok) {
            const gen = await r.json();
            if (gen.type === 'summary' && gen.data) {
              if (!gen.data.citations) gen.data.citations = [];
              if (!gen.data.vocabulary) gen.data.vocabulary = [];
              if (!gen.data.key_points) gen.data.key_points = [];
            }
            this.initGenProps(gen);
            this.generations.push(gen);
            this.openGens[gen.id] = true;
          }
        }
        this.goToView('dashboard');
        this.showToast('Tout genere !', 'success');
      } catch (e) {
        if (e.name === 'AbortError') return;
        this.showToast('Erreur generation: ' + e.message, 'error', () => this.generateAll());
      } finally {
        this.loading.all = false;
        delete this.abortControllers.all;
        this.$nextTick(() => this.refreshIcons());
      }
    },

    // --- Smart routing (auto) ---
    async generateAuto() {
      if (!this.currentProjectId) return;
      const projectId = this.currentProjectId;
      this.loading.auto = true;

      const controller = new AbortController();
      this.abortControllers.auto = controller;

      try {
        const body = {
          sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
        };
        const res = await fetch('/api/projects/' + projectId + '/generate/auto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast('Erreur: ' + (err.error || res.statusText), 'error', () =>
            this.generateAuto(),
          );
          return;
        }
        if (this.currentProjectId !== projectId) return;
        const result = await res.json();
        if (result.generations) {
          for (const gen of result.generations) {
            if (gen.type === 'summary' && gen.data) {
              if (!gen.data.citations) gen.data.citations = [];
              if (!gen.data.vocabulary) gen.data.vocabulary = [];
              if (!gen.data.key_points) gen.data.key_points = [];
            }
            this.initGenProps(gen);
            this.generations.push(gen);
            this.openGens[gen.id] = true;
          }
        }
        this.goToView('dashboard');
        this.showToast('Magie terminee !', 'success');
      } catch (e) {
        if (e.name === 'AbortError') return;
        this.showToast('Erreur generation auto: ' + e.message, 'error', () => this.generateAuto());
      } finally {
        this.loading.auto = false;
        delete this.abortControllers.auto;
        this.$nextTick(() => this.refreshIcons());
      }
    },

    // --- Voice Generation (TTS) ---
    async generateVoice(gen) {
      if (gen._generatingVoice) return;
      gen._generatingVoice = true;
      try {
        const res = await fetch(this.apiBase + '/generations/' + gen.id + '/read-aloud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const result = await res.json();
          if (gen.type === 'summary') {
            gen.data.audioUrl = result.audioUrl;
          }
          gen._audioUrl = result.audioUrl;
          this.showToast('Audio genere !', 'success');
          this.$nextTick(() => {
            const audioEl = document.querySelector(`audio[data-gen-id="${gen.id}"]`);
            if (audioEl) {
              audioEl.load();
              audioEl.play().catch(() => {});
            }
          });
        }
      } catch (e) {
        this.showToast('Erreur generation audio', 'error', () => this.generateVoice(gen));
      } finally {
        gen._generatingVoice = false;
      }
    },

    // --- Data helpers ---
    summaryData(gen) {
      const r = (gen._lang === 'en' && gen.dataEN ? gen.dataEN : gen.data) || {};
      if (!r.citations) r.citations = [];
      if (!r.vocabulary) r.vocabulary = [];
      if (!r.key_points) r.key_points = [];
      return r;
    },

    flashcardsData(gen) {
      return (gen._lang === 'en' && gen.dataEN ? gen.dataEN : gen.data) || [];
    },

    toggleFlip(gen, idx) {
      if (!gen._flipped) gen._flipped = {};
      gen._flipped[idx] = !gen._flipped[idx];
    },

    isFlipped(gen, idx) {
      return gen._flipped && gen._flipped[idx];
    },

    // --- Chat ---
    async loadChatHistory() {
      if (!this.currentProjectId) return;
      try {
        const res = await fetch(this.apiBase + '/chat');
        if (res.ok) {
          const data = await res.json();
          this.chatMessages = data.messages || [];
        }
      } catch {}
    },

    async sendChatMessage() {
      const msg = this.chatInput.trim();
      if (!msg || this.chatLoading || !this.currentProjectId) return;
      this.chatInput = '';
      this.chatMessages.push({ role: 'user', content: msg, timestamp: new Date().toISOString() });
      this.chatLoading = true;
      this.$nextTick(() => this.scrollChatBottom());

      try {
        const res = await fetch(this.apiBase + '/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg }),
        });
        if (res.ok) {
          const data = await res.json();
          this.chatMessages.push({
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toISOString(),
            generatedIds: data.generatedIds,
          });
          // Add generated content to local state
          if (data.generations && data.generations.length > 0) {
            for (const gen of data.generations) {
              if (gen.type === 'summary' && gen.data) {
                if (!gen.data.citations) gen.data.citations = [];
                if (!gen.data.vocabulary) gen.data.vocabulary = [];
                if (!gen.data.key_points) gen.data.key_points = [];
              }
              this.initGenProps(gen);
              this.generations.push(gen);
              this.openGens[gen.id] = true;
            }
            this.showToast('Generation via chat terminee !', 'success');
          }
        } else {
          const err = await res.json();
          this.chatMessages.push({
            role: 'assistant',
            content: "Oups, une erreur s'est produite. Reessaie !",
            timestamp: new Date().toISOString(),
          });
          this.showToast('Erreur chat: ' + (err.error || ''), 'error');
        }
      } catch (e) {
        this.chatMessages.push({
          role: 'assistant',
          content: "Oups, je n'ai pas pu repondre. Verifie ta connexion.",
          timestamp: new Date().toISOString(),
        });
        this.showToast('Erreur chat', 'error');
      } finally {
        this.chatLoading = false;
        this.$nextTick(() => {
          this.scrollChatBottom();
          this.refreshIcons();
        });
      }
    },

    async clearChat() {
      if (!this.currentProjectId) return;
      try {
        await fetch(this.apiBase + '/chat', { method: 'DELETE' });
        this.chatMessages = [];
        this.showToast('Conversation effacee', 'info');
      } catch {}
    },

    scrollChatBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },

    // --- Formatting helpers ---
    formatDuration(seconds) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    },
  };
}
