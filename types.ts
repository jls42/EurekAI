import type { GenerationUsage } from './helpers/pricing.js';

// --- Profiles ---

export type AgeGroup = 'enfant' | 'ado' | 'etudiant' | 'adulte';

export interface Profile {
  id: string;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  avatar: string;
  locale: string;
  useModeration: boolean;
  moderationCategories?: string[];
  useConsigne: boolean;
  chatEnabled: boolean;
  mistralVoices?: { host: string; guest: string };
  theme?: 'dark' | 'light';
  pinHash?: string;
  hasPin?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// --- Sources ---

export type ModerationStatus = 'pending' | 'safe' | 'unsafe' | 'error';

export interface ModerationResult {
  status: ModerationStatus;
  categories: Record<string, boolean>;
}

/** Aggregated OCR confidence scores across all pages (values in 0..1 range). */
export interface OcrConfidence {
  /** Mean of per-page average confidence scores, clamped to [0, 1]. */
  average: number;
}

export interface Source {
  id: string;
  filename: string;
  markdown: string;
  uploadedAt: string;
  moderation?: ModerationResult;
  sourceType?: 'ocr' | 'text' | 'voice' | 'websearch';
  scrapeEngine?: 'readability' | 'lightpanda' | 'mistral';
  filePath?: string;
  estimatedCost?: number;
  usage?: GenerationUsage;
  costBreakdown?: string[];
  ocrConfidence?: OcrConfidence;
}

export interface StudyFiche {
  title: string;
  summary: string;
  key_points: string[];
  fun_fact?: string;
  vocabulary: { word: string; definition: string }[];
  citations?: Array<{ text: string; sourceRef: string }>;
  audioUrl?: string;
  audioUrls?: Record<string, string>;
}

export interface Flashcard {
  question: string;
  answer: string;
  source?: string;
  sourceRefs?: string[];
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  correct: number;
  explanation: string;
  sourceRefs?: string[];
}

export interface PodcastLine {
  speaker: 'host' | 'guest';
  text: string;
}

// --- Generation system (multi-results) ---

export interface GenerationMeta {
  id: string;
  title: string;
  createdAt: string;
  sourceIds: string[];
  usage?: GenerationUsage;
  estimatedCost?: number;
  costBreakdown?: string[];
}

export interface SummaryGeneration extends GenerationMeta {
  type: 'summary';
  data: StudyFiche;
  dataEN?: StudyFiche;
}

export interface FlashcardsGeneration extends GenerationMeta {
  type: 'flashcards';
  data: Flashcard[];
  dataEN?: Flashcard[];
}

export interface QuizGeneration extends GenerationMeta {
  type: 'quiz';
  data: QuizQuestion[];
  dataEN?: QuizQuestion[];
  stats?: QuizStats;
}

export interface PodcastGeneration extends GenerationMeta {
  type: 'podcast';
  data: { script: PodcastLine[]; audioUrl: string; sourceRefs?: string[] };
  // OPTIONAL ONLY FOR LEGACY DB READS. MUST BE PROVIDED ON CREATION.
  // Aligné sur QuizVocalGeneration (cf. ligne plus bas) : les anciennes générations
  // sans `lang` ne porteront pas de badge beta audio, pas de backfill.
  lang?: string;
}

export interface QuizVocalGeneration extends GenerationMeta {
  type: 'quiz-vocal';
  data: QuizQuestion[];
  audioUrls: string[];
  // OPTIONAL ONLY FOR LEGACY DB READS. MUST BE PROVIDED ON CREATION.
  // Le `?` permet de lire les anciennes générations sans ces champs (avec fallback
  // best-effort cf. décision produit #9), mais toute nouvelle création DOIT
  // renseigner ces deux champs (cf. routes/generate.ts:368).
  lang?: string;
  ageGroup?: AgeGroup;
}

export interface ImageGeneration extends GenerationMeta {
  type: 'image';
  data: { imageUrl: string; prompt: string };
}

export interface FillBlankItem {
  sentence: string;
  answer: string;
  hint: string;
  category: string;
  sourceRefs?: string[];
}

export interface FillBlankAttempt {
  date: string;
  answers: Record<number, string>;
  results: Record<number, boolean>;
  score: number;
  total: number;
}

export interface FillBlankStats {
  attempts: FillBlankAttempt[];
  questionStats: Record<number, { correct: number; wrong: number }>;
}

export interface FillBlankGeneration extends GenerationMeta {
  type: 'fill-blank';
  data: FillBlankItem[];
  dataEN?: FillBlankItem[];
  stats?: FillBlankStats;
}

export type Generation =
  | SummaryGeneration
  | FlashcardsGeneration
  | QuizGeneration
  | PodcastGeneration
  | QuizVocalGeneration
  | ImageGeneration
  | FillBlankGeneration;

// Codes d'erreur stables renvoyés par /generate/auto via FailedStep.
// Contrat client : les détails bruts (err.message, stack) restent dans les logs serveur.
// - quota_exceeded : 429 / tier limit / rate limit côté compte utilisateur.
// - upstream_unavailable : 503 / 529 / "overloaded" / "capacity" — saturation backend
//   non liée au budget utilisateur, retry typiquement utile.
// - auth_required : 401 / 403 upstream OU clé API locale non définie — action user.
//   Distingué de quota_exceeded (compte actif mais plafonné) et tts_upstream_error
//   (panne transitoire) parce que la réparation utilisateur est différente.
// - tts_upstream_error : pile audio (TTS + STT), libellé i18n explicite.
export type FailedStepCode =
  | 'llm_invalid_json'
  | 'quota_exceeded'
  | 'upstream_unavailable'
  | 'auth_required'
  | 'tts_upstream_error'
  | 'context_length_exceeded'
  | 'internal_error';

export interface FailedStep {
  // Toujours un agent exécutable par /generate/auto (cf. AUTO_AGENTS_SET) :
  // les étapes skippedSteps vont dans un champ distinct avant exécution.
  agent: import('./generators/auto-agents.js').AutoAgentType;
  code: FailedStepCode;
}

// --- Quiz adaptive learning ---

export interface QuizAttempt {
  date: string;
  answers: Record<number, number>;
  score: number;
  total: number;
}

export interface QuizStats {
  attempts: QuizAttempt[];
  questionStats: Record<number, { correct: number; wrong: number }>;
}

// --- Project ---

export interface ProjectMeta {
  id: string;
  name: string;
  profileId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResults {
  generations: Generation[];
}

export interface CostEntry {
  timestamp: string;
  route: string;
  cost: number;
  usage: GenerationUsage;
}

export interface Consigne {
  found: boolean;
  text: string;
  keyTopics: string[];
  // `status` absent = legacy record (considéré OK). `'failed'` = détection erreur
  // surface un badge UI sans bloquer la génération (cf. CLAUDE.md OCR tier).
  status?: 'ok' | 'failed';
  error?: string;
}

export interface ProjectData {
  meta: ProjectMeta;
  sources: Source[];
  results: ProjectResults;
  consigne?: Consigne;
  chat?: ChatHistory;
  costLog?: CostEntry[];
}

// --- Chat ---

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  generatedIds?: string[];
}

export interface ChatHistory {
  messages: ChatMessage[];
}

// --- App config ---

export interface AppConfig {
  models: {
    summary: string;
    flashcards: string;
    quiz: string;
    podcast: string;
    translate: string;
    ocr: string;
    quizVerify: string;
    chat: string;
  };
  ttsModel: string;
  mistralVoices: {
    host: string;
    guest: string;
  };
  // 'default' : valeurs initiales ou matchant LEGACY_DEFAULT_* (pas un choix utilisateur).
  // 'user'    : l'utilisateur a explicitement configuré les voix via settings.
  // Permet de traiter l'override global comme intentionnel ou non sans allonger
  // LEGACY_DEFAULT_* à chaque release qui change le défaut.
  mistralVoicesSource?: 'default' | 'user';
}
