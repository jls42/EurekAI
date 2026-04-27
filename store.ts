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
  FailedStepCode,
  GenerationStatus,
} from './types.js';
import { emitGenerationEvent, buildEventKey } from './helpers/event-bus.js';

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
// maxKeep et maxAgeMs s'appliquent en union : on garde une entrée si elle satisfait
// LES DEUX critères. Les pendings actifs (status === 'pending') sont toujours préservés.
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

  private projectDir(id: string): string {
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
    if (!data) return;
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
  // Modèle : pending tracker séparé de generations[]. Permet d'avoir un cycle de
  // vie (pending → completed/failed/cancelled) sans contaminer le typage strict
  // de Generation.data partout dans le code. À la promotion, l'entrée est retirée
  // du tracker et une Generation complète est ajoutée à generations[].
  //
  // Les races (réponse Mistral arrive juste après cancel HTTP) sont absorbées par
  // les checks d'idempotence : promoteToGeneration retourne {kind: 'cancelled'} si
  // l'entrée a été retirée du tracker entre-temps, et le handler HTTP renvoie 409
  // au lieu de 200 fantôme.

  addPendingEntry(projectId: string, entry: PendingTrackerEntry): boolean {
    const data = this.getProject(projectId);
    if (!data) return false;
    const tracker = (data.results.pendingTracker ??= []);
    if (tracker.some((e) => e.id === entry.id)) return false;
    tracker.push(entry);
    this.saveProject(projectId, data);
    this.emitTrackerEvent(projectId, entry, entry.status);
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
      return { kind: 'failed', code: entry.failureCode ?? 'internal_error' };
    }
    tracker.splice(idx, 1);
    const finalGen = { ...generation, completedAt: new Date().toISOString() } as Generation;
    data.results.generations.push(finalGen);
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    this.emitTrackerEvent(projectId, entry, 'completed', finalGen);
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
      if (!data) continue;
      const tracker = data.results.pendingTracker ?? [];
      const cancelled: PendingTrackerEntry[] = [];
      for (const entry of tracker) {
        if (entry.status === 'pending') {
          entry.status = 'cancelled';
          entry.failureCode = 'cancelled';
          entry.completedAt = new Date().toISOString();
          cancelled.push(entry);
          total++;
        }
      }
      if (cancelled.length > 0) {
        this.pruneTrackerIfNeeded(data);
        this.saveProject(meta.id, data);
        for (const entry of cancelled) {
          this.emitTrackerEvent(meta.id, entry, 'cancelled');
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
    const entry = tracker.find((e) => e.id === generationId);
    if (!entry || entry.status !== 'pending') return false;
    entry.status = nextStatus;
    entry.failureCode = code;
    entry.completedAt = new Date().toISOString();
    this.pruneTrackerIfNeeded(data);
    this.saveProject(projectId, data);
    this.emitTrackerEvent(projectId, entry, nextStatus);
    return true;
  }

  // Construit et émet un GenerationEvent à partir d'une entrée de tracker.
  // Centralisé pour que tous les helpers (add/promote/fail/cancel/boot sweep)
  // émettent au même format avec la même clé eventKey stable.
  private emitTrackerEvent(
    pid: string,
    entry: PendingTrackerEntry,
    status: GenerationStatus,
    generation?: Generation,
  ): void {
    emitGenerationEvent({
      pid,
      gid: entry.id,
      type: entry.type,
      status,
      failureCode: entry.failureCode,
      generation,
      at: entry.completedAt ?? entry.startedAt ?? new Date().toISOString(),
      eventKey: buildEventKey(entry.id, status),
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
