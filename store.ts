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
} from './types.js';

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

  // --- Index ---

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

  // --- Project dir helpers ---

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

  // --- CRUD ---

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

  // --- Sources ---

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

  // --- Generations ---

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

  // --- Migration: old flat format -> generations[] ---

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

  // --- Migration from legacy sources.json ---

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

  // --- Private ---

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
