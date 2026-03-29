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
  pinHash?: string;
  createdAt: string;
}

// --- Sources ---

export type ModerationStatus = 'pending' | 'safe' | 'unsafe' | 'error';

export interface ModerationResult {
  status: ModerationStatus;
  categories: Record<string, boolean>;
}

export interface Source {
  id: string;
  filename: string;
  markdown: string;
  uploadedAt: string;
  moderation?: ModerationResult;
  sourceType?: 'ocr' | 'text' | 'voice' | 'websearch';
  filePath?: string;
}

export interface StudyFiche {
  title: string;
  summary: string;
  key_points: string[];
  fun_fact?: string;
  vocabulary: { word: string; definition: string }[];
  citations?: Array<{ text: string; sourceRef: string }>;
  audioUrl?: string;
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
}

export interface QuizVocalGeneration extends GenerationMeta {
  type: 'quiz-vocal';
  data: QuizQuestion[];
  audioUrls: string[];
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

export interface ProjectData {
  meta: ProjectMeta;
  sources: Source[];
  results: ProjectResults;
  consigne?: { found: boolean; text: string; keyTopics: string[] };
  chat?: ChatHistory;
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

export type TtsProvider = 'elevenlabs' | 'mistral';

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
  voices: {
    host: { id: string; name: string };
    guest: { id: string; name: string };
  };
  ttsModel: string;
  ttsProvider: TtsProvider;
  mistralVoices: {
    host: string;
    guest: string;
  };
}
