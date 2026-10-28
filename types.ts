import type { GenerationUsage } from './helpers/pricing.js';
import type { VoiceId } from './helpers/voice-types.js';
import type { EventKey } from './helpers/event-key.js';
import type { ReadingComfort } from './helpers/reading-comfort.js';

export type { ReadingComfort } from './helpers/reading-comfort.js';

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
  mistralVoices?: { host?: VoiceId; guest?: VoiceId };
  theme?: 'dark' | 'light';
  readingComfort?: ReadingComfort;
  pinHash?: string;
  hasPin?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Registre d'écriture des fiches : 'falc' = « facile à lire et à comprendre »
// (phrases courtes, mots simples) — cf. prompts.ts registerInstruction.
export type SummaryRegister = 'standard' | 'falc';

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
  /** sha256 hex du fichier source brut (image/pdf/txt) — détecte les ré-imports (dédup). */
  contentHash?: string;
}

/** Doublon détecté à l'upload (même contentHash qu'une source existante ou un fichier du même lot). */
export interface DuplicateUpload {
  filename: string;
  contentHash: string;
  existingSourceId?: string;
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

export interface PodcastSpeakers {
  host: string;
  guest: string;
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
  // Posé par store.promoteToGeneration uniquement. Absent sur les générations
  // pré-pending-lifecycle → ignorées par la réconciliation client (évite le
  // spam de notifications historiques au 1er load après migration).
  completedAt?: string;
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
  /** MP3 de la lecture à voix haute (toutes les cartes, question puis réponse), écrit par
   * POST …/read-aloud et rejoué sans nouvel appel. Au niveau de la génération, pas dans `data` :
   * une propriété posée sur un tableau disparaît à la sérialisation JSON. Absent tant que la
   * lecture n'a pas été demandée (et sur les générations lues avant son enregistrement). */
  audioUrl?: string;
}

export interface QuizGeneration extends GenerationMeta {
  type: 'quiz';
  data: QuizQuestion[];
  dataEN?: QuizQuestion[];
  stats?: QuizStats;
}

export interface PodcastGeneration extends GenerationMeta {
  type: 'podcast';
  data: {
    script: PodcastLine[];
    audioUrl: string;
    sourceRefs?: string[];
    speakers?: PodcastSpeakers;
  };
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
  // Autres écritures justes de la même réponse (« 15e » pour « XVe », « Jésus » pour « Jésus-Christ ») ;
  // absent des exercices générés avant son ajout. Lu par helpers/fill-blank-validate.ts.
  accepted?: string[];
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

export interface DictationItem {
  /** Le mot à écrire, exactement tel qu'il apparaît dans la liste source. */
  word: string;
  /** Phrase-exemple contenant le mot (affichée à trou avant validation). */
  sentence: string;
  /** Règle d'orthographe utile pour ce mot (affichée après une erreur). */
  rule: string;
  sourceRefs?: string[];
}

export interface DictationAttempt {
  date: string;
  answers: Record<number, string>;
  results: Record<number, boolean>;
  score: number;
  total: number;
}

export interface DictationStats {
  attempts: DictationAttempt[];
  questionStats: Record<number, { correct: number; wrong: number }>;
}

export interface DictationGeneration extends GenerationMeta {
  type: 'dictation';
  data: DictationItem[];
  /** Un MP3 par mot — la répétition et les pauses sont orchestrées côté client
   * (Voxtral TTS n'a ni contrôle de vitesse ni SSML, cf. plan vague 1). */
  audioUrls: string[];
  // OPTIONAL ONLY FOR LEGACY DB READS. MUST BE PROVIDED ON CREATION
  // (aligné sur QuizVocalGeneration).
  lang?: string;
  ageGroup?: AgeGroup;
  stats?: DictationStats;
}

export type Generation =
  | SummaryGeneration
  | FlashcardsGeneration
  | QuizGeneration
  | PodcastGeneration
  | QuizVocalGeneration
  | ImageGeneration
  | FillBlankGeneration
  | DictationGeneration;

// Codes d'erreur stables d'une génération en échec (entrée du tracker, étape d'un lot Auto, réponse
// des routes /generate/<type>).
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
  // Refus du garde-fou de Mistral (403, `guardrail_violation`, code 1920) : le contenu est en cause,
  // pas la clé. Déterministe : jamais rejoué.
  | 'content_refused'
  // Étape d'un lot Auto refusée par ses gardes (modération, sources, limite de contexte) : le code
  // exact du refus suit dans `refusal`. Posé par le cœur de génération, jamais par extractErrorCode.
  | 'refused'
  | 'internal_error'
  // Posé explicitement par store.markPendingCancelled / cancelAllPendingsAtBoot.
  // Jamais dérivé d'une exception via extractErrorCode (pas de mapping dans error-matchers).
  | 'cancelled';

// Section read-aloud (intro/key_points/fun_fact/vocabulary) qui a échoué pendant un batch.
// Code stable (FailedStepCode) sur la surface partial-success HTTP 200 — l'UI peut
// dispatcher un toast actionnable selon le code (auth_required → settings, quota_exceeded
// → message attente, sinon partial générique). Cohérence interne avec extractErrorCode
// utilisé déjà dans le catch global de /read-aloud.
export interface FailedSection {
  section: string;
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
  // Cycle de vie des générations en cours / échouées / annulées. Séparé de
  // `generations[]` pour ne pas contaminer les call sites qui lisent `g.data`
  // sans guard : le tracker contient uniquement les métadonnées de cycle de vie
  // (pas de payload data).
  pendingTracker?: PendingTrackerEntry[];
  // Lots Auto lancés côté serveur (analyse puis étapes) : un lot actif au plus par cours, gardé
  // sur disque pour survivre au rechargement de la page et au redémarrage du serveur
  // (cf. .claude/rules/auto-runs.md).
  autoRuns?: AutoRun[];
}

// --- Lot Auto côté serveur ---
// - 'analysing' : routage en cours (aucune étape encore) ;
// - 'running' : étapes lancées, au moins une encore en cours ;
// - 'completed' : toutes les étapes terminées, quelle que soit leur issue ;
// - 'failed' : l'analyse a échoué (`failureCode`), aucune étape n'est partie ;
// - 'cancelled' : lot annulé en entier ;
// - 'interrupted' : serveur redémarré pendant l'analyse ou les étapes.
export type AutoRunStatus =
  'analysing' | 'running' | 'completed' | 'failed' | 'cancelled' | 'interrupted';

// Statut d'une étape, tenu à jour par le store à chaque transition de son entrée du tracker (même
// gid) ; 'interrupted' : en cours au redémarrage du serveur.
export type AutoRunStepStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'interrupted';

export interface AutoRunStep {
  agent: import('./generators/auto-agents.js').AutoAgentType;
  // gid de l'entrée du tracker, puis de la génération produite.
  gid: string;
  status: AutoRunStepStatus;
  // Présent seulement sur une étape 'failed'.
  failureCode?: Exclude<FailedStepCode, 'cancelled'>;
  // failureCode 'refused' : code stable du refus des gardes, à traduire pour le message de l'étape.
  refusal?: string;
}

// Corps capturé au lancement : chaque étape refait ses gardes avec lui, sur les sources retenues
// au lancement (une source ajoutée pendant le lot n'y entre pas).
export interface AutoRunRequest {
  lang: string;
  ageGroup: AgeGroup;
  sourceIds: string[];
  useConsigne: boolean;
  // Nombre d'éléments demandé (quiz, flashcards…), absent = défaut de chaque générateur.
  count?: number;
}

export interface AutoRun {
  // runId : UUID v4 envoyé par le navigateur au lancement.
  id: string;
  status: AutoRunStatus;
  startedAt: string;
  updatedAt: string;
  // Présent dès que le lot est terminé (completed, failed, cancelled, interrupted).
  completedAt?: string;
  request: AutoRunRequest;
  // Vide pendant l'analyse ; ensuite une étape par agent du plan, dans l'ordre du plan.
  steps: AutoRunStep[];
  // Agents du plan qui ne seront pas exécutés (non auto-exécutables, TTS indisponible).
  skipped: string[];
  // Présent seulement sur un lot 'failed' (analyse en échec).
  failureCode?: FailedStepCode;
  // Coût de l'analyse (routage), que le navigateur ajoute une fois au total du cours : aucun
  // événement de génération ne le porte.
  analysisCost?: number;
}

// Statut du cycle de vie d'une génération suivie par le tracker.
// - 'pending' : génération en cours côté serveur (pas encore complétée)
// - 'completed' : déplacée vers `generations[]` via promoteToGeneration (entrée retirée du tracker)
// - 'failed' : erreur durant la génération, conserve `failureCode`
// - 'cancelled' : annulée explicitement (POST /cancel) ou au boot (process précédent mort)
export type GenerationStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

// Source unique de vérité = `Generation['type']`. Lié au compile-time pour
// qu'un nouveau Generation arm soit automatiquement trackable (ou nécessite
// une exclusion explicite si non-trackable). Évite la dérive de la liste
// dupliquée constatée précédemment (voice/websearch/read-aloud ne sont déjà
// pas dans `Generation['type']` — flows séparés sans persistance Generation).
export type TrackedGenerationType = Generation['type'];

// Champs communs aux entrées actives et terminales du tracker.
export interface PendingTrackerEntryBase {
  // gid stable (généré côté client via crypto.randomUUID, ou côté serveur pour une étape d'un lot Auto).
  // Identique au `id` de la `Generation` finale après promotion.
  id: string;
  type: TrackedGenerationType;
  startedAt: string;
  sourceIds: string[];
  // Lot Auto qui a lancé cette génération (absent : génération simple). Le store tient l'étape du
  // lot à jour à chaque transition de l'entrée.
  runId?: string;
}

// Discriminated union sur `status` : verrouille à compile-time que les champs
// terminaux (failureCode, completedAt) sont OBLIGATOIRES dès qu'on flippe le
// status, et ABSENTS sur l'arm pending. Empêche l'état impossible
// `{status:'pending', failureCode:'cancelled'}` qui contournerait la sémantique.
//
// L'arm 'cancelled' verrouille `failureCode: 'cancelled'` au niveau du literal
// (cf. CLAUDE.md "'cancelled' posé explicitement par markPendingCancelled /
// cancelAllPendingsAtBoot, jamais dérivé via extractErrorCode"). Symétriquement
// l'arm 'failed' exclut le literal 'cancelled' — un vrai bug (extractErrorCode
// produisant 'cancelled' par erreur) compilerait silencieusement sans cette
// restriction.
export interface PendingTrackerEntryActive extends PendingTrackerEntryBase {
  status: 'pending';
}

export interface PendingTrackerEntryFailed extends PendingTrackerEntryBase {
  status: 'failed';
  failureCode: Exclude<FailedStepCode, 'cancelled'>;
  completedAt: string;
  // failureCode 'refused' : code stable du refus des gardes (`moderation.blocked`, `no_sources`…).
  refusal?: string;
}

export interface PendingTrackerEntryCancelled extends PendingTrackerEntryBase {
  status: 'cancelled';
  failureCode: 'cancelled';
  completedAt: string;
}

export type PendingTrackerEntryTerminal = PendingTrackerEntryFailed | PendingTrackerEntryCancelled;

// Le tracker ne stocke jamais 'completed' : à la promotion, l'entrée est retirée
// du tracker et la Generation est ajoutée à `generations[]`.
export type PendingTrackerEntry = PendingTrackerEntryActive | PendingTrackerEntryTerminal;

// Réponse HTTP 409 quand la promotion échoue (routes /generate/:type). Découple le contrat HTTP du
// discriminant interne `PromoteResult.kind` — sinon renommer le discriminant
// store casserait le client sans warning compile. Le `'missing'` interne du
// store est volontairement absent : c'est un signal observabilité (tracker
// entry retirée sous nos pieds) qui doit être remappé côté serveur en
// 'failed' avant d'atteindre le wire — pas un code stable client.
export type PromoteErrorOutcome = 'cancelled' | 'failed';
export interface PromoteErrorResponse {
  error: PromoteErrorOutcome;
  gid: string;
}

// Event SSE poussé sur GET /api/projects/:pid/events. Discriminated union sur
// `status` : `generation` est présent UNIQUEMENT sur l'arm 'completed' — sans
// ce verrou, le call site applyGenerationEvent doit checker `status === 'completed'
// && generation` à chaque fois et un bug serveur (status='failed' avec generation
// renseigné par erreur) compilerait silencieusement. Source unique de vérité
// partagée serveur (helpers/event-bus.ts) ↔ client (src/app/helpers.ts) via
// `import type` cross-frontière (pas de coût runtime — Vite efface).
interface GenerationEventBase {
  pid: string;
  gid: string;
  type: TrackedGenerationType;
  at: string;
  // Identifiant stable cross-onglets pour la déduplication idempotente.
  // Format : 'generation:${gid}:${status}'. Toujours minté via buildEventKey
  // (helpers/event-key.ts) — le brand empêche les call sites d'inventer la
  // chaîne et de drift le format.
  eventKey: EventKey;
  // Lot Auto de la génération (absent : génération simple).
  runId?: string;
}

export interface GenerationEventPending extends GenerationEventBase {
  status: 'pending';
}

export interface GenerationEventCompleted extends GenerationEventBase {
  status: 'completed';
  // Le tracker n'a pas le payload data ; on l'attache à l'event pour permettre
  // au client de mettre à jour state.generations sans refetch.
  generation: Generation;
}

export interface GenerationEventTerminal extends GenerationEventBase {
  status: 'failed' | 'cancelled';
  failureCode: FailedStepCode;
  // failureCode 'refused' (étape d'un lot Auto) : code exact du refus, pour un message précis.
  refusal?: string;
}

export type GenerationEvent =
  GenerationEventPending | GenerationEventCompleted | GenerationEventTerminal;

// Event SSE `auto` (même flux GET /api/projects/:pid/events) : état COMPLET d'un lot à chaque
// changement (lancement, plan, étape, fin). Le client le remplace en bloc, sans fusion.
export interface AutoRunEvent {
  pid: string;
  run: AutoRun;
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
  // Provenance : ids des sources réellement envoyées au LLM de détection (les seules sources sûres
  // pour le profil propriétaire). Absent = consigne ancienne (legacy), qui vaut pour toutes les
  // sources actuelles. Lue par consigneUsable (helpers/moderation-http.ts) et store.deleteSource.
  sourceIds?: string[];
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
  /** Somme du costLog calculée par GET /projects/:pid — jamais persistée sur disque. */
  totalCost?: number;
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

// --- TTS flow (voice selection context) ---

// Identifie le contexte d'appel TTS. Utilisé uniquement pour contextualiser les logs
// de fallback dans resolveMistralDefaults (config.ts) — la rotation déterministe de
// selectVoices a pour seed `profileId + langMatched` (helpers/voice-selection.ts), pas
// `flow`. Intentionnel : un même profil garde une identité sonore cohérente entre les
// flux (podcast, quiz-vocal, read-aloud). Ce paramètre existe surtout pour que les
// logs de fallback identifient quel pipeline a tiré la voix quand on debug.
export type VoiceFlow = 'podcast' | 'quiz-vocal' | 'read-aloud' | 'dictation';

// --- App config ---

export interface AppConfig {
  models: {
    summary: string;
    flashcards: string;
    quiz: string;
    podcast: string;
    translate: string;
    ocr: string;
    /** Modèle de transcription (STT), id de STT_MODELS (helpers/stt-models.ts). */
    stt: string;
    quizVerify: string;
    chat: string;
  };
  ttsModel: string;
}
