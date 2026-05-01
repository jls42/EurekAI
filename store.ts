import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, renameSync } from 'node:fs';
import { join } from 'node:path';
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
  PendingTrackerEntryTerminal,
  FailedStepCode,
  GenerationStatus,
} from './types.js';
import { emitGenerationEvent, buildEventKey } from './helpers/event-bus.js';
import { logger } from './helpers/logger.js';

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
const DEFAULT_PRUNE_MAX_KEEP = 50;
const DEFAULT_PRUNE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export class ProjectStore {
  private readonly baseDir: string;
  private readonly indexPath: string;
  private readonly projectsDir: string;

  constructor(outputDir: string) {
    this.baseDir = outputDir;
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

  // Sanitization defense-in-depth contre js/path-injection : tout id qui sert
  // à construire un path doit matcher cette regex stricte (UUID v4-like + chars
  // safe pour migrations legacy). Un id non conforme provient nécessairement
  // d'un client malicieux (req.params.pid manipulé) — on throw plutôt que de
  // construire un path joint avec '../'. Utilisé par tous les helpers fs-bound
  // ci-dessous pour neutraliser le taint flow vu par CodeQL js/path-injection.
  private static readonly SAFE_PROJECT_ID = /^[a-zA-Z0-9_-]{1,64}$/;

  private assertSafeProjectId(id: string): void {
    if (typeof id !== 'string' || !ProjectStore.SAFE_PROJECT_ID.test(id)) {
      throw new Error('invalid_project_id');
    }
  }

  private projectDir(id: string): string {
    this.assertSafeProjectId(id);
    return join(this.projectsDir, id);
  }

  private projectFilePath(id: string): string {
    return join(this.projectDir(id), 'project.json');
  }

  getUploadDir(id: string): string {
    const dir = join(this.projectDir(id), 'uploads');
    mkdirSync(dir, { recursive: true });
    return dir;
  }

  getProjectDir(id: string): string {
    const dir = this.projectDir(id);
    mkdirSync(dir, { recursive: true });
    return dir;
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
      console.error(`Failed to read project ${id} at ${path}:`, e);
      return null;
    }
  }

  saveProject(id: string, data: ProjectData) {
    data.meta.updatedAt = new Date().toISOString();
    writeFileSync(this.projectFilePath(id), JSON.stringify(data, null, 2));
    this.touchIndex(id, data.meta);
  }

  deleteProject(id: string) {
    const dir = this.projectDir(id);
    if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
    const index = this.readIndex().filter((p) => p.id !== id);
    this.writeIndex(index);
  }

  renameProject(id: string, name: string) {
    const data = this.getProject(id);
    if (!data) return;
    data.meta.name = name;
    this.saveProject(id, data);
  }

  addSource(projectId: string, source: Source): ProjectData | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    data.sources.push(source);
    this.saveProject(projectId, data);
    return data;
  }

  deleteSource(projectId: string, sourceId: string): ProjectData | null {
    const data = this.getProject(projectId);
    if (!data) return null;
    data.sources = data.sources.filter((s) => s.id !== sourceId);
    this.saveProject(projectId, data);
    return data;
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

  deleteGeneration(projectId: string, generationId: string): void {
    const data = this.getProject(projectId);
    if (!data) return;
    data.results.generations = data.results.generations.filter((g) => g.id !== generationId);
    this.saveProject(projectId, data);
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
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    this.emitCompletedEvent(projectId, entry, finalGen);
    return { kind: 'promoted', generation: finalGen };
  }

  markPendingFailed(projectId: string, generationId: string, code: FailedStepCode): boolean {
    return this.terminatePending(projectId, generationId, 'failed', code);
  }

  markPendingCancelled(projectId: string, generationId: string): boolean {
    return this.terminatePending(projectId, generationId, 'cancelled', 'cancelled');
  }

  // Cas boot : process précédent mort, tous les pendings sur disque sont par
  // construction orphelins (aucun process ne les portera à terme). Marque tous
  // les pending → cancelled. Pas de TTL. Retourne le nombre d'entrées affectées.
  cancelAllPendingsAtBoot(): number {
    let total = 0;
    for (const meta of this.readIndex()) {
      const data = this.getProject(meta.id);
      if (!data) {
        // getProject swallow déjà l'erreur JSON parse en console.error mais le
        // boot sweep doit signaler explicitement les pendings ghost laissés en
        // place : un project.json corrompu = aucun pending purgé pour ce projet.
        // Niveau error (pas warn) parce qu'un project.json corrompu = bug
        // observabilité critique (l'user verra une bannière "génération en cours"
        // stuck à vie pour ce projet tant que le fichier n'est pas réparé).
        logger.error('store', `boot sweep skipped unreadable project ${meta.id}`);
        continue;
      }
      const tracker = data.results.pendingTracker ?? [];
      const cancelled: PendingTrackerEntryTerminal[] = [];
      for (let i = 0; i < tracker.length; i++) {
        const entry = tracker[i];
        if (entry.status !== 'pending') continue;
        // Construit une nouvelle entrée terminale (le discriminated union
        // empêche la mutation in-place : flipper status sans poser failureCode
        // + completedAt produirait un état impossible).
        const terminal: PendingTrackerEntryTerminal = {
          id: entry.id,
          type: entry.type,
          startedAt: entry.startedAt,
          sourceIds: entry.sourceIds,
          status: 'cancelled',
          failureCode: 'cancelled',
          completedAt: new Date().toISOString(),
        };
        tracker[i] = terminal;
        cancelled.push(terminal);
        total++;
      }
      if (cancelled.length > 0) {
        this.pruneTrackerIfNeeded(data);
        this.saveProject(meta.id, data);
        for (const entry of cancelled) {
          this.emitTerminalEvent(meta.id, entry);
        }
      }
    }
    return total;
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

  private terminatePending(
    projectId: string,
    generationId: string,
    nextStatus: 'failed' | 'cancelled',
    code: FailedStepCode,
  ): boolean {
    const data = this.getProject(projectId);
    if (!data) return false;
    const tracker = data.results.pendingTracker ?? [];
    const idx = tracker.findIndex((e) => e.id === generationId);
    if (idx === -1) return false;
    const entry = tracker[idx];
    if (entry.status !== 'pending') return false;
    // Remplace l'entrée par une terminale fraîche (le discriminated union
    // interdit la mutation status-only sans poser failureCode + completedAt).
    const terminal: PendingTrackerEntryTerminal = {
      id: entry.id,
      type: entry.type,
      startedAt: entry.startedAt,
      sourceIds: entry.sourceIds,
      status: nextStatus,
      failureCode: code,
      completedAt: new Date().toISOString(),
    };
    tracker[idx] = terminal;
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    this.emitTerminalEvent(projectId, terminal);
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
  ): { pid: string; gid: string; type: PendingTrackerEntry['type']; at: string; eventKey: string } {
    const isTerminal = entry.status === 'failed' || entry.status === 'cancelled';
    const completedAt = isTerminal ? entry.completedAt : undefined;
    return {
      pid,
      gid: entry.id,
      type: entry.type,
      at: completedAt ?? entry.startedAt ?? new Date().toISOString(),
      eventKey: buildEventKey(entry.id, status),
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
    emitGenerationEvent({
      ...this.buildEventBase(pid, entry, entry.status),
      status: entry.status,
      failureCode: entry.failureCode,
    });
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
    const now = Date.now();
    const pendings = tracker.filter((e) => e.status === 'pending');
    const terminals = tracker
      .filter((e) => e.status !== 'pending')
      .filter((e) => {
        const ts = e.completedAt ? Date.parse(e.completedAt) : Date.parse(e.startedAt);
        return now - ts <= maxAgeMs;
      })
      .sort(
        (a, b) =>
          Date.parse(b.completedAt ?? b.startedAt) - Date.parse(a.completedAt ?? a.startedAt),
      )
      .slice(0, Math.max(0, maxKeep - pendings.length));
    data.results.pendingTracker = [...pendings, ...terminals];
  }

  private normalizeModeration(
    moderation:
      | Source['moderation']
      | { safe?: boolean; categories?: Record<string, boolean> }
      | undefined,
  ): ModerationResult | undefined {
    if (!moderation) return undefined;
    if ('status' in moderation && moderation.status) {
      return {
        status: moderation.status,
        categories: moderation.categories ?? {},
      };
    }
    if ('safe' in moderation) {
      return {
        status: moderation.safe ? 'safe' : 'unsafe',
        categories: moderation.categories ?? {},
      };
    }
    console.warn('Unknown moderation format during migration:', JSON.stringify(moderation));
    return { status: 'error', categories: {} };
  }

  private migrateModerationFormat(data: ProjectData): void {
    for (const source of data.sources) {
      source.moderation = this.normalizeModeration(
        source.moderation as Parameters<typeof this.normalizeModeration>[0],
      );
    }
  }

  private migrateResultsFormat(data: ProjectData): void {
    // Legacy format : results.{summary|flashcards|quiz|podcast} à plat, remplacé
    // par results.generations[]. Les champs lus ici disparaissent en sortie.
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
    const r = data.results as LegacyResults;
    if (Array.isArray(r.generations)) return;

    const generations: Generation[] = [];
    const now = new Date().toISOString();

    if (r.summary) {
      const gen = {
        id: randomUUID(),
        title: (r.summary as { title?: string }).title || 'Fiche de revision',
        createdAt: now,
        sourceIds: [],
        type: 'summary',
        data: r.summary,
      } as Generation;
      if (r.summaryEN) (gen as { dataEN?: Generation['data'] }).dataEN = r.summaryEN;
      generations.push(gen);
    }

    if (r.flashcards) {
      const gen = {
        id: randomUUID(),
        title: 'Flashcards',
        createdAt: now,
        sourceIds: [],
        type: 'flashcards',
        data: r.flashcards,
      } as Generation;
      if (r.flashcardsEN) (gen as { dataEN?: Generation['data'] }).dataEN = r.flashcardsEN;
      generations.push(gen);
    }

    if (r.quiz) {
      const gen = {
        id: randomUUID(),
        title: 'Quiz QCM',
        createdAt: now,
        sourceIds: [],
        type: 'quiz',
        data: r.quiz,
      } as Generation;
      if (r.quizEN) (gen as { dataEN?: Generation['data'] }).dataEN = r.quizEN;
      generations.push(gen);
    }

    if (r.podcast) {
      generations.push({
        id: randomUUID(),
        title: 'Podcast',
        createdAt: now,
        sourceIds: [],
        type: 'podcast',
        data: r.podcast,
      });
    }

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
