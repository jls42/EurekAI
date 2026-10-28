import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, renameSync } from 'node:fs';
import { basename, join } from 'node:path';
import type {
  ProjectMeta,
  ProjectData,
  Source,
  Generation,
  SummaryGeneration,
  FlashcardsGeneration,
  QuizGeneration,
  PodcastGeneration,
  ChatMessage,
  CostEntry,
  ModerationResult,
  PendingTrackerEntry,
  PendingTrackerEntryActive,
  PendingTrackerEntryBase,
  PendingTrackerEntryTerminal,
  FailedStepCode,
  GenerationStatus,
  AutoRun,
  AutoRunStep,
} from './types.js';
import { emitAutoRunEvent, emitGenerationEvent } from './helpers/event-bus.js';
import {
  applyStepTransition,
  endAutoRun,
  findActiveAutoRun,
  findAutoRun,
  interruptActiveAutoRuns,
  pruneAutoRuns,
  resumableStepCount,
  resumeInterruptedSteps,
} from './helpers/auto-run-state.js';
import { buildEventKey, type EventKey } from './helpers/event-key.js';
import { logger } from './helpers/logger.js';

// Alias : un type indexé écrit dans la signature cachait la méthode à Lizard.
type PendingStatus = PendingTrackerEntry['status'];

// Résultat d'une tentative de promotion d'un pending vers une Generation finale.
// Permet au handler HTTP de répondre 200 (promoted) ou 409 (cancelled/failed/missing)
// avec une sémantique non ambiguë — pas de réponse 200 fantôme si un cancel a gagné
// la course pendant que Mistral renvoyait son résultat.
export type PromoteResult =
  | { kind: 'promoted'; generation: Generation }
  | { kind: 'cancelled' }
  | { kind: 'failed'; code: FailedStepCode }
  | { kind: 'missing' };

// Defaults pour le pruning du tracker (failed/cancelled accumulent sinon).
// maxKeep et maxAgeMs s'appliquent en intersection (AND) : une entrée terminale est
// gardée seulement si elle satisfait À LA FOIS la fenêtre temporelle ET le quota
// maxKeep (les plus récentes au-dessus de la limite sont prunées). Les pendings
// actifs (status === 'pending') sont toujours préservés indépendamment.
export const DEFAULT_PRUNE_MAX_KEEP = 50;
export const DEFAULT_PRUNE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Alias plutôt qu'un type fonction écrit dans la signature de replacePendingWithTerminal : Lizard
// y coupait la méthode et ne mesurait plus aucune méthode de la classe après elle.
type TerminalBuilder = (base: PendingTrackerEntryBase) => PendingTrackerEntryTerminal; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

// Lancement d'un lot Auto (cf. createAutoRun).
export type CreateAutoRunResult = 'created' | 'missing' | 'busy' | 'duplicate';

// Étape d'un lot au moment où ses entrées du tracker sont posées.
export type AutoRunStepInit = Pick<AutoRunStep, 'agent' | 'gid'>;

// Reprise d'un lot interrompu (cf. resumeAutoRun).
export type ResumeAutoRunResult =
  | { status: 'resumed'; run: AutoRun; steps: AutoRunStepInit[] }
  | { status: 'missing' | 'busy' | 'not_resumable' };

// Entrée du tracker de chaque étape posée : runId du lot et sources retenues au lancement.
const stepTrackerEntries = (
  run: AutoRun,
  steps: AutoRunStepInit[],
  now: string,
): PendingTrackerEntryActive[] => {
  const { sourceIds } = run.request;
  return steps.map((step): PendingTrackerEntryActive => {
    return {
      id: step.gid,
      type: step.agent,
      status: 'pending',
      startedAt: now,
      sourceIds,
      runId: run.id,
    };
  });
};

// Entrée en cours sans son statut : la base commune, `runId` compris (jamais recopiée champ par
// champ : un champ ajouté à la base était perdu au passage en terminal).
const trackerBase = (entry: PendingTrackerEntryActive): PendingTrackerEntryBase => {
  const base: Partial<PendingTrackerEntryActive> = { ...entry };
  delete base.status;
  return base as PendingTrackerEntryBase;
};

// Nom de fichier simple : ni vide, ni `.`/`..`, sans séparateur (basename identique).
const isSimpleFileName = (name: string): boolean => {
  return name !== '' && name !== '.' && name !== '..' && basename(name) === name;
};

// Consigne tirée (au moins en partie) de la source supprimée : la source figure dans sa
// provenance, ou la consigne est legacy (sans provenance : elle a pu venir de n'importe quelle
// source). Elle ne doit pas survivre au document dont elle vient.
const consigneDependsOn = (consigne: ProjectData['consigne'], sourceId: string): boolean => {
  if (!consigne) return false;
  const provenance = consigne.sourceIds;
  return !Array.isArray(provenance) || provenance.includes(sourceId);
};

// Fin d'une entrée terminale pour le pruning (completedAt ; startedAt pour une donnée ancienne).
const terminalEndTime = (e: PendingTrackerEntryTerminal): number => {
  return e.completedAt ? Date.parse(e.completedAt) : Date.parse(e.startedAt);
};

type TerminalPruning = { maxAgeMs: number; keep: number; nowMs: number };

// Terminales gardées : récentes (maxAgeMs) ET parmi les `keep` plus récentes.
const recentTerminals = (
  tracker: PendingTrackerEntry[],
  pruning: TerminalPruning,
): PendingTrackerEntryTerminal[] => {
  return tracker
    .filter((e): e is PendingTrackerEntryTerminal => e.status !== 'pending')
    .filter((e) => pruning.nowMs - terminalEndTime(e) <= pruning.maxAgeMs)
    .sort((a, b) => terminalEndTime(b) - terminalEndTime(a))
    .slice(0, pruning.keep);
};

type LegacySafeModeration = { safe?: boolean; categories?: Record<string, boolean> };

const legacySafeModeration = (moderation: LegacySafeModeration): ModerationResult => ({
  status: moderation.safe ? 'safe' : 'unsafe',
  categories: moderation.categories ?? {},
});

const normalizeModeration = (
  moderation: Source['moderation'] | LegacySafeModeration | undefined,
): ModerationResult | undefined => {
  if (!moderation) return undefined;
  if ('status' in moderation && moderation.status) {
    return { status: moderation.status, categories: moderation.categories ?? {} };
  }
  if ('safe' in moderation) return legacySafeModeration(moderation);
  console.warn('Unknown moderation format during migration:', JSON.stringify(moderation));
  return { status: 'error', categories: {} };
};

interface LegacyResults {
  generations?: unknown;
  summary?: SummaryGeneration['data'];
  summaryEN?: SummaryGeneration['data'];
  flashcards?: FlashcardsGeneration['data'];
  flashcardsEN?: FlashcardsGeneration['data'];
  quiz?: QuizGeneration['data'];
  quizEN?: QuizGeneration['data'];
  podcast?: PodcastGeneration['data'];
}

type LegacyField = { type: Generation['type']; title: string; data: unknown; dataEN?: unknown };

const legacyGeneration = (field: LegacyField, now: string): Generation => {
  const { type, title, data, dataEN } = field;
  const gen = { id: randomUUID(), title, createdAt: now, sourceIds: [], type, data } as Generation;
  if (dataEN) (gen as { dataEN?: unknown }).dataEN = dataEN;
  return gen;
};

// Une génération par champ présent de l'ancien format, dans cet ordre (version anglaise gardée en
// `dataEN`, sauf pour le podcast qui n'en avait pas).
const legacyGenerations = (r: LegacyResults, now: string): Generation[] => {
  const summaryTitle = r.summary?.title || 'Fiche de revision';
  const fields: LegacyField[] = [
    { type: 'summary', title: summaryTitle, data: r.summary, dataEN: r.summaryEN },
    { type: 'flashcards', title: 'Flashcards', data: r.flashcards, dataEN: r.flashcardsEN },
    { type: 'quiz', title: 'Quiz QCM', data: r.quiz, dataEN: r.quizEN },
    { type: 'podcast', title: 'Podcast', data: r.podcast },
  ];
  return fields.filter((f) => f.data).map((f) => legacyGeneration(f, now));
};

export class ProjectStore {
  private readonly indexPath: string;
  private readonly projectsDir: string;

  constructor(outputDir: string) {
    this.indexPath = join(outputDir, 'projects.json');
    this.projectsDir = join(outputDir, 'projects');
    mkdirSync(this.projectsDir, { recursive: true });
  }

  private readIndex(): ProjectMeta[] {
    if (existsSync(this.indexPath)) {
      try {
        return JSON.parse(readFileSync(this.indexPath, 'utf-8'));
      } catch (e) {
        console.error(`Failed to read project index at ${this.indexPath}:`, e);
        return [];
      }
    }
    return [];
  }

  private writeIndex(index: ProjectMeta[]) {
    writeFileSync(this.indexPath, JSON.stringify(index, null, 2));
  }

  // Sanitization defense-in-depth contre js/path-injection (CodeQL).
  // Trois neutralisations cumulées :
  //   1. `basename(id)` strip tout segment parent ; si le résultat diffère de
  //      `id`, l'entrée contenait un séparateur ('/', '\\') ou '..' → reject.
  //      `basename` est explicitement reconnu par CodeQL comme path sanitizer.
  //   2. Regex stricte sur le segment safe (chars URL/fs-safe).
  //   3. Le résultat est toujours `join(projectsDir, safeId)` — confiné sous
  //      le baseDir contrôlé par la classe.
  // Un id non conforme provient nécessairement d'un client malicieux
  // (req.params.pid manipulé) — on throw plutôt que de construire un path joint
  // avec '../'. Le try/catch existant dans getProject convertit en null return.
  private static readonly SAFE_PROJECT_ID = /^[a-zA-Z0-9_-]{1,64}$/;

  private safeProjectSegment(id: string): string {
    if (typeof id !== 'string') throw new Error('invalid_project_id');
    const safe = basename(id);
    if (safe !== id || !ProjectStore.SAFE_PROJECT_ID.test(safe)) {
      throw new Error('invalid_project_id');
    }
    return safe;
  }

  private projectDir(id: string): string {
    return join(this.projectsDir, this.safeProjectSegment(id));
  }

  private projectFilePath(id: string): string {
    return join(this.projectDir(id), 'project.json');
  }

  // Crée seulement `uploads/`, SANS récursivité : si le projet n'existe plus, mkdirSync lève
  // ENOENT au lieu de recréer un dossier projet fantôme (multer écrit via cette méthode).
  getUploadDir(id: string): string {
    const dir = join(this.projectDir(id), 'uploads');
    try {
      mkdirSync(dir);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e;
    }
    return dir;
  }

  // Ne crée rien : le dossier existe depuis createProject. Une génération qui écrit après la
  // suppression du projet échoue (ENOENT) au lieu de recréer un dossier fantôme.
  getProjectDir(id: string): string {
    return this.projectDir(id);
  }

  listProjects(profileId?: string): ProjectMeta[] {
    const all = this.readIndex();
    if (!profileId) return all;
    return all.filter((p) => p.profileId === profileId || !p.profileId);
  }

  createProject(name: string, profileId?: string): ProjectData {
    const now = new Date().toISOString();
    const meta: ProjectMeta = {
      id: randomUUID(),
      name,
      profileId,
      createdAt: now,
      updatedAt: now,
    };
    const data: ProjectData = { meta, sources: [], results: { generations: [] } };

    mkdirSync(this.projectDir(meta.id), { recursive: true });
    writeFileSync(this.projectFilePath(meta.id), JSON.stringify(data, null, 2));

    const index = this.readIndex();
    index.push(meta);
    this.writeIndex(index);

    return data;
  }

  getProject(id: string): ProjectData | null {
    const path = this.projectFilePath(id);
    if (!existsSync(path)) return null;
    try {
      const data = JSON.parse(readFileSync(path, 'utf-8')) as ProjectData;
      this.migrateResultsFormat(data);
      this.migrateModerationFormat(data);
      return data;
    } catch (e) {
      // Pass tainted values as separate args (not as template literal) so the
      // format string remains a static literal — neutralizes CodeQL
      // js/tainted-format-string. The `id` here is the same value that
      // safeProjectSegment validated above; logging is best-effort.
      logger.error('store', 'Failed to read project', id, 'at', path, e);
      return null;
    }
  }

  saveProject(id: string, data: ProjectData) {
    data.meta.updatedAt = new Date().toISOString();
    writeFileSync(this.projectFilePath(id), JSON.stringify(data, null, 2));
    this.touchIndex(id, data.meta);
  }

  // Sous-helper extrait : capture l'état pending → terminal pour émission
  // post-rmSync (sinon les chips orphelins persistent jusqu'à
  // RECONNECT_MAX_RETRIES sur le prochain reconnect SSE).
  private capturePendingTerminalsForDelete(id: string): PendingTrackerEntryTerminal[] {
    const data = this.getProject(id);
    if (!data) return [];
    const terminals: PendingTrackerEntryTerminal[] = [];
    const tracker = data.results.pendingTracker ?? [];
    for (const entry of tracker) {
      if (entry.status !== 'pending') continue;
      terminals.push({
        id: entry.id,
        type: entry.type,
        startedAt: entry.startedAt,
        sourceIds: entry.sourceIds,
        status: 'cancelled',
        failureCode: 'cancelled',
        completedAt: new Date().toISOString(),
      });
    }
    return terminals;
  }

  deleteProject(id: string): boolean {
    // Retourne false UNIQUEMENT si l'opération filesystem échoue (rmSync /
    // writeIndex throw : EACCES, EBUSY, ENOSPC, EROFS). Project absent =
    // no-op succès (true) — le caller voulait juste s'assurer qu'il n'y est
    // plus, et c'est le cas. Cf. routes/projects.ts qui mappe false → 500.
    const pendingTerminals = this.capturePendingTerminalsForDelete(id);
    try {
      const dir = this.projectDir(id);
      if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
      const index = this.readIndex().filter((p) => p.id !== id);
      this.writeIndex(index);
    } catch (err) {
      logger.error('deleteProject: filesystem failure', id, err);
      return false;
    }
    for (const entry of pendingTerminals) {
      this.emitTerminalEvent(id, entry);
    }
    return true;
  }

  renameProject(id: string, name: string) {
    const data = this.getProject(id);
    if (!data) return;
    data.meta.name = name;
    this.saveProject(id, data);
  }

  // Rattache DÉFINITIVEMENT un projet orphelin (sans meta.profileId, listé pour tous les profils)
  // au profil qui l'ouvre : project.json ET index (saveProject → touchIndex). Un projet déjà
  // rattaché n'est jamais réattribué. Rend le projet (à jour ou inchangé), null s'il n'existe
  // pas. Lecture et écriture synchrones : deux ouvertures concurrentes ne s'entrelacent pas, la
  // seconde voit le rattachement de la première. Le profil est validé par l'appelant.
  adoptProject(id: string, profileId: string): ProjectData | null {
    const data = this.getProject(id);
    if (!data || data.meta.profileId) return data;
    data.meta.profileId = profileId;
    this.saveProject(id, data);
    logger.info('store', 'orphan project adopted', id, profileId);
    return data;
  }

  addSource(projectId: string, source: Source): ProjectData | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    data.sources.push(source);
    this.saveProject(projectId, data);
    return data;
  }

  // Consigne effacée avec la source dont elle dépend (consigneDependsOn), dans la même écriture ;
  // gardée sinon, et intacte si l'id ne désigne aucune source. La route renvoie la consigne restante.
  deleteSource(projectId: string, sourceId: string): ProjectData | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    const removed = data.sources.find((s) => s.id === sourceId);
    data.sources = data.sources.filter((s) => s.id !== sourceId);
    if (removed && consigneDependsOn(data.consigne, sourceId)) delete data.consigne;
    this.saveProject(projectId, data);
    // Fichier importé (photo, PDF, texte) : orphelin sinon. Gardé s'il sert encore à une source.
    const filePath = removed?.filePath;
    if (filePath && !data.sources.some((s) => s.filePath === filePath)) {
      this.removeUploadFile(projectId, filePath);
    }
    return data;
  }

  // Garde de chemin : `filePath` (lu dans project.json) ne désigne un fichier supprimable que sous
  // la forme `projects/<pid>/uploads/<nom simple>` du projet visé — jamais de traversée.
  private removeUploadFile(projectId: string, filePath: string): void {
    const prefix = `projects/${projectId}/uploads/`;
    const name = filePath.startsWith(prefix) ? filePath.slice(prefix.length) : '';
    if (!isSimpleFileName(name)) {
      logger.warn('store', 'deleteSource: upload path refused', projectId);
      return;
    }
    try {
      rmSync(join(this.projectDir(projectId), 'uploads', name), { force: true });
    } catch (e) {
      logger.warn('store', 'deleteSource: upload file removal failed', projectId, e);
    }
  }

  addGeneration(projectId: string, generation: Generation): void {
    const data = this.getProject(projectId);
    if (!data) {
      logger.warn('store', 'addGeneration: project missing', projectId);
      return;
    }
    data.results.generations.push(generation);
    this.saveProject(projectId, data);
  }

  appendCostEntry(projectId: string, entry: CostEntry): void {
    const data = this.getProject(projectId);
    if (!data) return;
    data.costLog ??= [];
    data.costLog.push(entry);
    this.saveProject(projectId, data);
  }

  appendChatMessage(
    projectId: string,
    message: ChatMessage,
    maxMessages = 50,
  ): ChatMessage[] | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    data.chat ??= { messages: [] };
    data.chat.messages.push(message);
    if (data.chat.messages.length > maxMessages) {
      data.chat.messages = data.chat.messages.slice(-maxMessages);
    }
    this.saveProject(projectId, data);
    return data.chat.messages;
  }

  clearChat(projectId: string): boolean {
    const data = this.getProject(projectId);
    if (!data) return false;
    data.chat = { messages: [] };
    this.saveProject(projectId, data);
    return true;
  }

  setConsigne(
    projectId: string,
    consigne: ProjectData['consigne'],
  ): ProjectData['consigne'] | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    data.consigne = consigne;
    this.saveProject(projectId, data);
    return data.consigne ?? null;
  }

  setConsigneError(projectId: string, errorCode: string): ProjectData['consigne'] | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    data.consigne = {
      found: false,
      text: '',
      keyTopics: [],
      status: 'failed',
      error: errorCode,
    };
    this.saveProject(projectId, data);
    return data.consigne;
  }

  setSourceModeration(
    projectId: string,
    sourceId: string,
    moderation: Source['moderation'],
  ): Source | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    const source = data.sources.find((s) => s.id === sourceId);
    if (!source) return null;
    source.moderation = moderation;
    this.saveProject(projectId, data);
    return source;
  }

  deleteGeneration(projectId: string, generationId: string): Generation | null {
    // Retourne la génération effectivement retirée, null sinon : la route delete
    // renvoie 404 sur null (cf. CLAUDE.md : double-delete entre 2 onglets ne doit
    // pas masquer un toast "supprimé" trompeur) et supprime les médias de la
    // génération retirée (helpers/generation-media.ts).
    const data = this.getProject(projectId);
    if (!data) return null;
    const removed = data.results.generations.find((g) => g.id === generationId);
    if (!removed) return null;
    data.results.generations = data.results.generations.filter((g) => g.id !== generationId);
    this.saveProject(projectId, data);
    return removed;
  }

  updateGeneration(
    projectId: string,
    generationId: string,
    partial: Partial<Generation>,
  ): Generation | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    const gen = data.results.generations.find((g) => g.id === generationId);
    if (!gen) return null;
    Object.assign(gen, partial);
    this.saveProject(projectId, data);
    return gen;
  }

  getGeneration(projectId: string, generationId: string): Generation | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    return data.results.generations.find((g) => g.id === generationId) ?? null;
  }

  // --- Pending tracker lifecycle ---
  //
  // Modèle détaillé et invariants : voir CLAUDE.md "Pending generations &
  // notifications". Ici, le store applique seulement les transitions atomiques
  // tracker → generations[] et tracker pending → terminal.

  // Statut d'une entrée du tracker (null si absente) : une génération mise en file derrière une
  // autre du même type peut avoir été annulée pendant son attente (cf. withSameTypeQueue).
  pendingStatus(projectId: string, generationId: string): PendingStatus | null {
    const tracker = this.getProject(projectId)?.results.pendingTracker ?? [];
    return tracker.find((e) => e.id === generationId)?.status ?? null;
  }

  addPendingEntry(projectId: string, entry: PendingTrackerEntry): boolean {
    const data = this.getProject(projectId);
    if (!data) return false;
    const tracker = (data.results.pendingTracker ??= []);
    if (tracker.some((e) => e.id === entry.id)) return false;
    tracker.push(entry);
    this.saveProject(projectId, data);
    // Une entrée fraîchement ajoutée est par construction `pending` (la create
    // path n'utilise jamais le tracker pour persister un terminal initial).
    if (entry.status === 'pending') {
      this.emitPendingEvent(projectId, entry);
    } else {
      this.emitTerminalEvent(projectId, entry);
    }
    return true;
  }

  promoteToGeneration(
    projectId: string,
    generationId: string,
    generation: Generation,
  ): PromoteResult {
    const data = this.getProject(projectId);
    if (!data) return { kind: 'missing' };
    const tracker = data.results.pendingTracker ?? [];
    const idx = tracker.findIndex((e) => e.id === generationId);
    if (idx === -1) return { kind: 'missing' };
    const entry = tracker[idx];
    if (entry.status === 'cancelled') return { kind: 'cancelled' };
    if (entry.status === 'failed') {
      // failureCode est obligatoire sur l'arm terminale (cf. types.ts
      // PendingTrackerEntryTerminal). Pas de fallback `??` : surfacer une vraie
      // drift (entrée terminale sans failureCode = bug type) plutôt que masquer.
      return { kind: 'failed', code: entry.failureCode };
    }
    tracker.splice(idx, 1);
    const finalGen = { ...generation, completedAt: new Date().toISOString() } as Generation;
    data.results.generations.push(finalGen);
    const run = applyStepTransition(data, entry, 'completed', finalGen.completedAt as string);
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    this.emitCompletedEvent(projectId, entry, finalGen);
    this.emitAutoRunChange(projectId, run);
    return { kind: 'promoted', generation: finalGen };
  }

  // `refusal` : code exact d'un refus des gardes (failureCode 'refused', étape d'un lot Auto).
  markPendingFailed(
    projectId: string,
    generationId: string,
    code: Exclude<FailedStepCode, 'cancelled'>,
    refusal?: string,
  ): boolean {
    return this.replacePendingWithTerminal(projectId, generationId, (base) => ({
      ...base,
      status: 'failed',
      failureCode: code,
      completedAt: new Date().toISOString(),
      ...(refusal && { refusal }),
    }));
  }

  markPendingCancelled(projectId: string, generationId: string): boolean {
    return this.replacePendingWithTerminal(projectId, generationId, (base) => ({
      ...base,
      status: 'cancelled',
      failureCode: 'cancelled',
      completedAt: new Date().toISOString(),
    }));
  }

  // Cas boot : process précédent mort, tous les pendings sur disque sont par
  // construction orphelins (aucun process ne les portera à terme). Marque tous
  // les pending → cancelled. Pas de TTL. Retourne le nombre d'entrées affectées.
  cancelAllPendingsAtBoot(): number {
    let total = 0;
    for (const meta of this.readIndex()) {
      // Try/catch par projet : un saveProject qui throw (EACCES, disk full,
      // EROFS) sur un projet ne doit pas tuer le boot — les autres projets
      // doivent quand même être balayés. Sinon une seule corruption disque
      // laisserait tous les pendings ghost en place sans signal.
      try {
        total += this.sweepPendingsForProject(meta.id);
      } catch (e) {
        logger.error('store', `boot sweep failed for project ${meta.id}`, e);
      }
    }
    return total;
  }

  private sweepPendingsForProject(projectId: string): number {
    const data = this.getProject(projectId);
    if (!data) {
      // getProject swallow déjà l'erreur JSON parse en console.error mais le
      // boot sweep doit signaler explicitement les pendings ghost laissés en
      // place : un project.json corrompu = aucun pending purgé pour ce projet.
      // Niveau error (pas warn) parce qu'un project.json corrompu = bug
      // observabilité critique (l'user verra une bannière "génération en cours"
      // stuck à vie pour ce projet tant que le fichier n'est pas réparé).
      logger.error('store', `boot sweep skipped unreadable project ${projectId}`);
      return 0;
    }
    const now = new Date().toISOString();
    const cancelled = this.cancelPendingEntries(data, now);
    // Lots actifs : `interrupted`, leurs étapes en cours aussi (et non `cancelled` : rien ne les
    // a annulées, elles pourront être relancées).
    const interrupted = interruptActiveAutoRuns(data, now);
    if (cancelled.length > 0 || interrupted.length > 0) {
      this.pruneTrackerIfNeeded(data);
      this.saveProject(projectId, data);
      for (const entry of cancelled) {
        this.emitTerminalEvent(projectId, entry);
      }
      for (const run of interrupted) this.emitAutoRunChange(projectId, run);
    }
    return cancelled.length;
  }

  prunePendingTracker(projectId: string, opts?: { maxKeep?: number; maxAgeMs?: number }): number {
    const data = this.getProject(projectId);
    if (!data) return 0;
    const before = data.results.pendingTracker?.length ?? 0;
    this.pruneTracker(data, opts);
    const after = data.results.pendingTracker?.length ?? 0;
    if (after !== before) this.saveProject(projectId, data);
    return before - after;
  }

  // Remplace une entrée pending par une terminale fraîche (le discriminated
  // union interdit la mutation status-only sans poser failureCode +
  // completedAt). Le builder reçoit la base commune (id/type/startedAt/sourceIds/runId)
  // et produit l'arm spécialisée — chaque appelant locke ainsi son literal
  // ('failed' avec failureCode ≠ 'cancelled', 'cancelled' avec failureCode
  // strictement 'cancelled').
  private replacePendingWithTerminal(
    projectId: string,
    generationId: string,
    builder: TerminalBuilder,
  ): boolean {
    const data = this.getProject(projectId);
    if (!data) return false;
    const tracker = data.results.pendingTracker ?? [];
    const idx = tracker.findIndex((e) => e.id === generationId);
    if (idx === -1) return false;
    const entry = tracker[idx];
    if (entry.status !== 'pending') return false;
    const terminal = builder(trackerBase(entry));
    tracker[idx] = terminal;
    const run = this.applyTerminalToRun(data, terminal);
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    this.emitTerminalEvent(projectId, terminal);
    this.emitAutoRunChange(projectId, run);
    return true;
  }

  // Construit la base commune à tous les events (pid, gid, type, at, eventKey).
  // Centralisé pour garantir que tous les emit*** en sortie portent la même
  // clé stable. `status` paramètre est utilisé pour le buildEventKey ; les
  // helpers spécialisés ci-dessous le repassent en `as const`.
  private buildEventBase(
    pid: string,
    entry: PendingTrackerEntry,
    status: GenerationStatus,
  ): {
    pid: string;
    gid: string;
    type: PendingTrackerEntry['type'];
    at: string;
    eventKey: EventKey;
    runId?: string;
  } {
    const isTerminal = entry.status === 'failed' || entry.status === 'cancelled';
    const completedAt = isTerminal ? entry.completedAt : undefined;
    return {
      pid,
      gid: entry.id,
      type: entry.type,
      at: completedAt ?? entry.startedAt ?? new Date().toISOString(),
      eventKey: buildEventKey(entry.id, status),
      ...(entry.runId && { runId: entry.runId }),
    };
  }

  // 3 helpers d'émission, un par arm de la discriminated union. Chacun impose
  // ses paramètres requis à compile-time : impossible d'émettre 'completed'
  // sans generation, ou 'failed'/'cancelled' sans failureCode. Remplace
  // l'ancien `emitTrackerEvent` qui devait runtime-checker chaque combinaison.

  private emitPendingEvent(pid: string, entry: PendingTrackerEntry): void {
    emitGenerationEvent({ ...this.buildEventBase(pid, entry, 'pending'), status: 'pending' });
  }

  private emitCompletedEvent(
    pid: string,
    entry: PendingTrackerEntry,
    generation: Generation,
  ): void {
    emitGenerationEvent({
      ...this.buildEventBase(pid, entry, 'completed'),
      status: 'completed',
      generation,
    });
  }

  private emitTerminalEvent(pid: string, entry: PendingTrackerEntryTerminal): void {
    const refusal = entry.status === 'failed' ? entry.refusal : undefined;
    emitGenerationEvent({
      ...this.buildEventBase(pid, entry, entry.status),
      status: entry.status,
      failureCode: entry.failureCode,
      ...(refusal && { refusal }),
    });
  }

  // --- Lots Auto (results.autoRuns) ---
  //
  // Transitions pures : helpers/auto-run-state.ts ; règles : .claude/rules/auto-runs.md. Chaque
  // changement d'un lot émet son état complet (SSE `auto`) après l'écriture.

  getAutoRun(projectId: string, runId: string): AutoRun | null {
    const data = this.getProject(projectId);
    return (data && findAutoRun(data, runId)) ?? null;
  }

  getActiveAutoRun(projectId: string): AutoRun | null {
    const data = this.getProject(projectId);
    return (data && findActiveAutoRun(data)) ?? null;
  }

  // Un lot actif au plus par cours (`busy` tant qu'un autre analyse ou tourne) ; `duplicate` : ce
  // runId existe déjà (lancement renvoyé après une coupure réseau).
  createAutoRun(projectId: string, run: AutoRun): CreateAutoRunResult {
    const data = this.getProject(projectId);
    if (!data) return 'missing';
    if (findAutoRun(data, run.id)) return 'duplicate';
    if (findActiveAutoRun(data)) return 'busy';
    const runs = (data.results.autoRuns ??= []);
    runs.push(run);
    pruneAutoRuns(data, Date.now());
    this.saveProject(projectId, data);
    this.emitAutoRunChange(projectId, run);
    return 'created';
  }

  // Fin de l'analyse, en UNE écriture : une entrée du tracker par étape (runId, sources retenues au
  // lancement), plan et statut `running` (`completed` d'emblée sans étape). null si le lot n'est
  // plus en analyse (annulé pendant le routage, cours supprimé) : aucune étape ne part.
  startAutoRunSteps(
    projectId: string,
    runId: string,
    steps: AutoRunStepInit[],
    skipped: string[],
    analysisCost?: number,
  ): AutoRun | null {
    const data = this.getProject(projectId);
    const run = data ? findAutoRun(data, runId) : undefined;
    if (!data || run?.status !== 'analysing') return null;
    const now = new Date().toISOString();
    const entries = stepTrackerEntries(run, steps, now);
    const tracker = (data.results.pendingTracker ??= []);
    tracker.push(...entries);
    run.steps = steps.map((step) => ({ ...step, status: 'pending' }));
    run.skipped = skipped;
    if (analysisCost) run.analysisCost = analysisCost;
    run.status = 'running';
    run.updatedAt = now;
    if (steps.length === 0) endAutoRun(run, 'completed', 'completed', now);
    this.saveProject(projectId, data);
    for (const entry of entries) this.emitPendingEvent(projectId, entry);
    this.emitAutoRunChange(projectId, run);
    return run;
  }

  // Reprise d'un lot `interrupted` (« Reprendre »), en UNE écriture : chaque étape interrompue repart
  // avec un gid neuf et sa propre entrée du tracker, le lot repart `running`. `busy` : un autre lot
  // est actif sur ce cours (re-vérifié ici, au moment d'écrire) ; `not_resumable` : lot pas
  // interrompu, ou interrompu pendant l'analyse (aucune étape à reprendre).
  resumeAutoRun(projectId: string, runId: string): ResumeAutoRunResult {
    const data = this.getProject(projectId);
    const run = data ? findAutoRun(data, runId) : undefined;
    if (!data || !run) return { status: 'missing' };
    const count = resumableStepCount(run);
    if (count === 0) return { status: 'not_resumable' };
    if (findActiveAutoRun(data)) return { status: 'busy' };
    const gids = Array.from({ length: count }, () => randomUUID());
    const steps = this.writeResumedSteps(projectId, data, run, gids);
    return { status: 'resumed', run, steps };
  }

  private writeResumedSteps(
    projectId: string,
    data: ProjectData,
    run: AutoRun,
    gids: string[],
  ): AutoRunStepInit[] {
    const now = new Date().toISOString();
    const steps = resumeInterruptedSteps(run, gids, now) ?? [];
    const entries = stepTrackerEntries(run, steps, now);
    const tracker = (data.results.pendingTracker ??= []);
    tracker.push(...entries);
    this.saveProject(projectId, data);
    for (const entry of entries) this.emitPendingEvent(projectId, entry);
    this.emitAutoRunChange(projectId, run);
    return steps;
  }

  // Analyse en échec : lot `failed` avec son code, aucune étape n'est partie. null si le lot n'est
  // plus en analyse.
  failAutoRun(projectId: string, runId: string, code: FailedStepCode): AutoRun | null {
    const data = this.getProject(projectId);
    const run = data ? findAutoRun(data, runId) : undefined;
    if (!data || run?.status !== 'analysing') return null;
    endAutoRun(run, 'failed', 'failed', new Date().toISOString());
    run.failureCode = code;
    this.saveProject(projectId, data);
    this.emitAutoRunChange(projectId, run);
    return run;
  }

  // Annulation du lot entier, en UNE écriture : le lot, ses étapes en cours et leurs entrées du
  // tracker passent `cancelled` (une étape en vol chez Mistral ne sera pas promue). Lot déjà
  // terminé : rendu tel quel, sans écriture. null si le lot est inconnu.
  cancelAutoRun(projectId: string, runId: string): AutoRun | null {
    const data = this.getProject(projectId);
    const run = data ? findAutoRun(data, runId) : undefined;
    if (!data || !run) return null;
    const now = new Date().toISOString();
    if (!endAutoRun(run, 'cancelled', 'cancelled', now)) return run;
    const cancelled = this.cancelPendingEntries(data, now, runId);
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    // Le lot d'abord : un autre onglet le sait annulé avant de recevoir ses étapes annulées, et
    // n'affiche qu'un message pour tout le lot.
    this.emitAutoRunChange(projectId, run);
    for (const entry of cancelled) this.emitTerminalEvent(projectId, entry);
    return run;
  }

  // Entrées en cours passées `cancelled` (toutes, ou celles du lot `runId`). Chacune est une
  // NOUVELLE entrée terminale : le discriminated union empêche la mutation in-place (flipper
  // status sans poser failureCode + completedAt produirait un état impossible).
  private cancelPendingEntries(
    data: ProjectData,
    now: string,
    runId?: string,
  ): PendingTrackerEntryTerminal[] {
    const tracker = data.results.pendingTracker ?? [];
    const cancelled: PendingTrackerEntryTerminal[] = [];
    tracker.forEach((entry, i) => {
      if (entry.status !== 'pending') return;
      if (runId !== undefined && entry.runId !== runId) return;
      const terminal: PendingTrackerEntryTerminal = {
        ...trackerBase(entry),
        status: 'cancelled',
        failureCode: 'cancelled',
        completedAt: now,
      };
      tracker[i] = terminal;
      cancelled.push(terminal);
    });
    return cancelled;
  }

  // Étape du lot de l'entrée passée en terminal (annulation par sa puce, échec) : le lot continue.
  private applyTerminalToRun(
    data: ProjectData,
    terminal: PendingTrackerEntryTerminal,
  ): AutoRun | undefined {
    const now = terminal.completedAt;
    if (terminal.status === 'cancelled') {
      return applyStepTransition(data, terminal, 'cancelled', now);
    }
    const { failureCode: code, refusal } = terminal;
    return applyStepTransition(data, terminal, 'failed', now, { code, refusal });
  }

  // Copie : l'événement garde l'état du lot à l'émission.
  private emitAutoRunChange(pid: string, run: AutoRun | undefined): void {
    if (run) emitAutoRunEvent({ pid, run: structuredClone(run) });
  }

  private pruneTrackerIfNeeded(data: ProjectData): void {
    const tracker = data.results.pendingTracker;
    if (!tracker || tracker.length <= DEFAULT_PRUNE_MAX_KEEP) return;
    this.pruneTracker(data);
  }

  private pruneTracker(data: ProjectData, opts?: { maxKeep?: number; maxAgeMs?: number }): void {
    const tracker = data.results.pendingTracker;
    if (!tracker || tracker.length === 0) return;
    const maxKeep = opts?.maxKeep ?? DEFAULT_PRUNE_MAX_KEEP;
    const maxAgeMs = opts?.maxAgeMs ?? DEFAULT_PRUNE_MAX_AGE_MS;
    const pendings = tracker.filter((e) => e.status === 'pending');
    const keep = Math.max(0, maxKeep - pendings.length);
    const terminals = recentTerminals(tracker, { maxAgeMs, keep, nowMs: Date.now() });
    data.results.pendingTracker = [...pendings, ...terminals];
  }

  private migrateModerationFormat(data: ProjectData): void {
    for (const source of data.sources) {
      source.moderation = normalizeModeration(source.moderation);
    }
  }

  private migrateResultsFormat(data: ProjectData): void {
    // Legacy format : results.{summary|flashcards|quiz|podcast} à plat, remplacé
    // par results.generations[]. Les champs lus ici disparaissent en sortie.
    const r = data.results as LegacyResults;
    if (Array.isArray(r.generations)) return;
    const generations = legacyGenerations(r, new Date().toISOString());
    data.results = { generations };
    if (generations.length > 0) {
      console.log(`  Migration resultats: ${generations.length} generation(s) converties`);
    }
  }

  migrateFromLegacy(legacyPath: string) {
    if (!existsSync(legacyPath)) return;
    if (this.readIndex().length > 0) return;

    let sources: Source[];
    try {
      sources = JSON.parse(readFileSync(legacyPath, 'utf-8'));
    } catch (e) {
      console.error(`Failed to read legacy sources at ${legacyPath}:`, e);
      return;
    }
    if (!Array.isArray(sources) || sources.length === 0) return;

    const project = this.createProject('Projet importe');
    project.sources = sources;
    this.saveProject(project.meta.id, project);

    renameSync(legacyPath, legacyPath + '.bak');
    console.log(`  Migration: ${sources.length} sources -> projet "${project.meta.name}"`);
  }

  private touchIndex(id: string, meta: ProjectMeta) {
    const index = this.readIndex();
    const idx = index.findIndex((p) => p.id === id);
    if (idx !== -1) {
      index[idx] = {
        id: meta.id,
        name: meta.name,
        profileId: meta.profileId,
        createdAt: meta.createdAt,
        updatedAt: meta.updatedAt,
      };
    }
    this.writeIndex(index);
  }
}
