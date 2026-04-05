import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { ProjectStore } from './store.js';
import type { Source, Generation } from './types.js';

let store: ProjectStore;
let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-test-'));
  store = new ProjectStore(tempDir);
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('listProjects', () => {
  it('retourne un tableau vide au depart', () => {
    expect(store.listProjects()).toEqual([]);
  });
});

describe('createProject', () => {
  it('retourne un ProjectData avec id unique', () => {
    const p = store.createProject('Mon projet');
    expect(p.meta.id).toBeTruthy();
    expect(p.meta.name).toBe('Mon projet');
    expect(p.sources).toEqual([]);
    expect(p.results.generations).toEqual([]);
  });

  it('genere des ids differents', () => {
    const p1 = store.createProject('A');
    const p2 = store.createProject('B');
    expect(p1.meta.id).not.toBe(p2.meta.id);
  });
});

describe('getProject', () => {
  it('retrouve le projet cree', () => {
    const created = store.createProject('Test');
    const found = store.getProject(created.meta.id);
    expect(found).not.toBeNull();
    expect(found!.meta.name).toBe('Test');
  });

  it('retourne null si inexistant', () => {
    expect(store.getProject('nope')).toBeNull();
  });
});

describe('renameProject', () => {
  it('met a jour le nom', () => {
    const p = store.createProject('Ancien');
    store.renameProject(p.meta.id, 'Nouveau');
    const updated = store.getProject(p.meta.id);
    expect(updated!.meta.name).toBe('Nouveau');
  });
});

describe('deleteProject', () => {
  it("supprime du disque et de l'index", () => {
    const p = store.createProject('A supprimer');
    store.deleteProject(p.meta.id);
    expect(store.getProject(p.meta.id)).toBeNull();
    expect(store.listProjects()).toEqual([]);
  });
});

describe('addSource / deleteSource', () => {
  it('ajoute une source', () => {
    const p = store.createProject('Src test');
    const source: Source = {
      id: 's1',
      filename: 'test.txt',
      markdown: '# Hello',
      uploadedAt: new Date().toISOString(),
    };
    const updated = store.addSource(p.meta.id, source);
    expect(updated!.sources).toHaveLength(1);
    expect(updated!.sources[0].id).toBe('s1');
  });

  it('supprime une source', () => {
    const p = store.createProject('Src test 2');
    const source: Source = {
      id: 's2',
      filename: 'test2.txt',
      markdown: '# World',
      uploadedAt: new Date().toISOString(),
    };
    store.addSource(p.meta.id, source);
    const updated = store.deleteSource(p.meta.id, 's2');
    expect(updated!.sources).toHaveLength(0);
  });
});

describe('addGeneration / deleteGeneration', () => {
  it('ajoute une generation', () => {
    const p = store.createProject('Gen test');
    const gen: Generation = {
      id: 'g1',
      title: 'Fiche',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'summary',
      data: {
        title: 'Test',
        summary: 'Resume',
        key_points: ['a'],
        vocabulary: [],
      },
    };
    store.addGeneration(p.meta.id, gen);
    const found = store.getProject(p.meta.id);
    expect(found!.results.generations).toHaveLength(1);
    expect(found!.results.generations[0].id).toBe('g1');
  });

  it('supprime une generation', () => {
    const p = store.createProject('Gen test 2');
    const gen: Generation = {
      id: 'g2',
      title: 'Quiz',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'quiz',
      data: [],
    };
    store.addGeneration(p.meta.id, gen);
    store.deleteGeneration(p.meta.id, 'g2');
    const found = store.getProject(p.meta.id);
    expect(found!.results.generations).toHaveLength(0);
  });
});

describe('getUploadDir', () => {
  it('cree le dossier uploads et retourne le path', () => {
    const p = store.createProject('Upload test');
    const dir = store.getUploadDir(p.meta.id);
    expect(dir).toContain('uploads');
    expect(existsSync(dir)).toBe(true);
  });
});

describe('getProjectDir', () => {
  it('cree le dossier projet et retourne le path', () => {
    const p = store.createProject('Dir test');
    const dir = store.getProjectDir(p.meta.id);
    expect(dir).toContain(p.meta.id);
    expect(existsSync(dir)).toBe(true);
  });
});

describe('updateGeneration', () => {
  it('met a jour partiellement une generation', () => {
    const p = store.createProject('Update gen');
    const gen: Generation = {
      id: 'g-upd',
      title: 'Fiche',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'summary',
      data: { title: 'T', summary: 'S', key_points: [], vocabulary: [] },
    };
    store.addGeneration(p.meta.id, gen);
    const updated = store.updateGeneration(p.meta.id, 'g-upd', { title: 'Fiche MAJ' });
    expect(updated).not.toBeNull();
    expect(updated!.title).toBe('Fiche MAJ');
  });

  it('retourne null si projet inexistant', () => {
    expect(store.updateGeneration('nope', 'g1', { title: 'X' })).toBeNull();
  });

  it('retourne null si generation inexistante', () => {
    const p = store.createProject('Update gen 2');
    expect(store.updateGeneration(p.meta.id, 'nope', { title: 'X' })).toBeNull();
  });
});

describe('getGeneration', () => {
  it('retrouve une generation par id', () => {
    const p = store.createProject('Get gen');
    const gen: Generation = {
      id: 'g-get',
      title: 'Quiz',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'quiz',
      data: [],
    };
    store.addGeneration(p.meta.id, gen);
    const found = store.getGeneration(p.meta.id, 'g-get');
    expect(found).not.toBeNull();
    expect(found!.id).toBe('g-get');
  });

  it('retourne null si inexistant', () => {
    const p = store.createProject('Get gen 2');
    expect(store.getGeneration(p.meta.id, 'nope')).toBeNull();
  });
});

describe('chat helpers', () => {
  it('ajoute des messages sans ecraser les generations existantes', () => {
    const p = store.createProject('Chat merge');
    const gen1: Generation = {
      id: 'g-chat-1',
      title: 'Fiche',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'summary',
      data: { title: 'T1', summary: 'S1', key_points: ['a'], vocabulary: [] },
    };
    const gen2: Generation = {
      id: 'g-chat-2',
      title: 'Quiz',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'quiz',
      data: [],
    };

    store.addGeneration(p.meta.id, gen1);
    store.appendChatMessage(p.meta.id, {
      role: 'user',
      content: 'Explique-moi la lecon',
      timestamp: new Date().toISOString(),
    });
    store.addGeneration(p.meta.id, gen2);
    store.appendChatMessage(p.meta.id, {
      role: 'assistant',
      content: 'Voici un resume',
      timestamp: new Date().toISOString(),
      generatedIds: ['g-chat-2'],
    });

    const found = store.getProject(p.meta.id);
    expect(found!.results.generations.map((g) => g.id)).toEqual(['g-chat-1', 'g-chat-2']);
    expect(found!.chat?.messages).toHaveLength(2);
  });

  it("vide l'historique du chat", () => {
    const p = store.createProject('Chat clear');
    store.appendChatMessage(p.meta.id, {
      role: 'user',
      content: 'Bonjour',
      timestamp: new Date().toISOString(),
    });

    expect(store.clearChat(p.meta.id)).toBe(true);
    expect(store.getProject(p.meta.id)?.chat?.messages).toEqual([]);
  });
});

describe('project field helpers', () => {
  it('met a jour la consigne sans perdre les sources', () => {
    const p = store.createProject('Consigne');
    store.addSource(p.meta.id, {
      id: 'src-1',
      filename: 'cours.md',
      markdown: '# Hello',
      uploadedAt: new Date().toISOString(),
    });

    store.setConsigne(p.meta.id, {
      found: true,
      text: 'Reviser les dates importantes',
      keyTopics: ['dates'],
    });

    const found = store.getProject(p.meta.id);
    expect(found!.sources).toHaveLength(1);
    expect(found!.consigne?.keyTopics).toEqual(['dates']);
  });

  it('met a jour la moderation d une source ciblee', () => {
    const p = store.createProject('Moderation');
    store.addSource(p.meta.id, {
      id: 'src-2',
      filename: 'cours.md',
      markdown: '# Hello',
      uploadedAt: new Date().toISOString(),
    });

    const updated = store.setSourceModeration(p.meta.id, 'src-2', {
      status: 'unsafe',
      categories: { violence_and_threats: true },
    });

    expect(updated?.moderation?.status).toBe('unsafe');
    expect(store.getProject(p.meta.id)?.sources[0].moderation?.categories).toEqual({
      violence_and_threats: true,
    });
  });

  it('migre le format legacy safe:boolean vers status', () => {
    const p = store.createProject('Legacy moderation');
    const projectPath = join(tempDir, 'projects', p.meta.id, 'project.json');
    const legacyProject = {
      meta: p.meta,
      sources: [
        {
          id: 'src-legacy',
          filename: 'legacy.txt',
          markdown: 'ancien format',
          uploadedAt: new Date().toISOString(),
          moderation: { safe: true, categories: { violence_and_threats: false } },
        },
      ],
      results: { generations: [] },
    };

    writeFileSync(projectPath, JSON.stringify(legacyProject, null, 2));

    const found = store.getProject(p.meta.id);
    expect(found?.sources[0].moderation).toEqual({
      status: 'safe',
      categories: { violence_and_threats: false },
    });
  });
});

describe('migrateFromLegacy', () => {
  it('importe un sources.json legacy et renomme en .bak', () => {
    const legacyPath = join(tempDir, 'sources.json');
    const sources: Source[] = [
      { id: 's1', filename: 'doc.txt', markdown: '# Hello', uploadedAt: new Date().toISOString() },
    ];
    writeFileSync(legacyPath, JSON.stringify(sources));

    store.migrateFromLegacy(legacyPath);

    const projects = store.listProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Projet importe');
    expect(existsSync(legacyPath + '.bak')).toBe(true);
    expect(existsSync(legacyPath)).toBe(false);
  });

  it("no-op si l'index n'est pas vide", () => {
    store.createProject('Existant');
    const legacyPath = join(tempDir, 'sources2.json');
    writeFileSync(
      legacyPath,
      JSON.stringify([{ id: 's1', filename: 'a', markdown: 'b', uploadedAt: '' }]),
    );

    store.migrateFromLegacy(legacyPath);

    expect(store.listProjects()).toHaveLength(1);
    expect(existsSync(legacyPath)).toBe(true); // pas renomme
  });

  it('no-op si fichier absent', () => {
    store.migrateFromLegacy(join(tempDir, 'inexistant.json'));
    expect(store.listProjects()).toEqual([]);
  });
});

describe('listProjects with profileId filter', () => {
  it('filtre les projets par profileId', () => {
    store.createProject('Projet Alice', 'profile-alice');
    store.createProject('Projet Bob', 'profile-bob');
    store.createProject('Projet sans profil');

    const aliceProjects = store.listProjects('profile-alice');
    expect(aliceProjects).toHaveLength(2); // profile-alice + sans profileId
    expect(aliceProjects.some((p) => p.name === 'Projet Alice')).toBe(true);
    expect(aliceProjects.some((p) => p.name === 'Projet sans profil')).toBe(true);
    expect(aliceProjects.some((p) => p.name === 'Projet Bob')).toBe(false);

    const bobProjects = store.listProjects('profile-bob');
    expect(bobProjects).toHaveLength(2); // profile-bob + sans profileId
    expect(bobProjects.some((p) => p.name === 'Projet Bob')).toBe(true);
    expect(bobProjects.some((p) => p.name === 'Projet sans profil')).toBe(true);

    const allProjects = store.listProjects();
    expect(allProjects).toHaveLength(3);
  });
});

describe('edge cases: non-existent project', () => {
  it('deleteSource retourne null pour projet inexistant', () => {
    expect(store.deleteSource('nope', 's1')).toBeNull();
  });

  it('setConsigne retourne null pour projet inexistant', () => {
    const result = store.setConsigne('nope', {
      found: true,
      text: 'Test',
      keyTopics: [],
    });
    expect(result).toBeNull();
  });

  it('setSourceModeration retourne null pour projet inexistant', () => {
    const result = store.setSourceModeration('nope', 's1', {
      status: 'safe',
      categories: {},
    });
    expect(result).toBeNull();
  });

  it('setSourceModeration retourne null pour source inexistante', () => {
    const p = store.createProject('Mod edge');
    const result = store.setSourceModeration(p.meta.id, 'nope', {
      status: 'safe',
      categories: {},
    });
    expect(result).toBeNull();
  });

  it('clearChat retourne false pour projet inexistant', () => {
    expect(store.clearChat('nope')).toBe(false);
  });

  it('appendChatMessage retourne null pour projet inexistant', () => {
    const result = store.appendChatMessage('nope', {
      role: 'user',
      content: 'Hello',
      timestamp: new Date().toISOString(),
    });
    expect(result).toBeNull();
  });

  it('getGeneration retourne null pour projet inexistant', () => {
    expect(store.getGeneration('nope', 'g1')).toBeNull();
  });

  it('addSource retourne null pour projet inexistant', () => {
    const result = store.addSource('nope', {
      id: 's1',
      filename: 'test.txt',
      markdown: '# Hello',
      uploadedAt: new Date().toISOString(),
    });
    expect(result).toBeNull();
  });
});

describe('results format migration', () => {
  it('migrates old flat format to generations array', () => {
    const p = store.createProject('Flat migration');
    const projectPath = join(tempDir, 'projects', p.meta.id, 'project.json');

    const oldFormat = {
      meta: p.meta,
      sources: [],
      results: {
        summary: { title: 'Ma fiche', summary: 'Resume', key_points: ['a'], vocabulary: [] },
        summaryEN: { title: 'My sheet', summary: 'Summary', key_points: ['a'], vocabulary: [] },
        quiz: [{ question: 'Q?', choices: ['A', 'B'], answer: 0 }],
        quizEN: [{ question: 'Q?', choices: ['A', 'B'], answer: 0 }],
        flashcards: [{ question: 'Q', answer: 'A' }],
        flashcardsEN: [{ question: 'Q', answer: 'A' }],
        podcast: { script: 'Hello', audioUrl: '/audio.mp3' },
      },
    };

    writeFileSync(projectPath, JSON.stringify(oldFormat, null, 2));

    const loaded = store.getProject(p.meta.id);
    expect(loaded).not.toBeNull();
    expect(Array.isArray(loaded!.results.generations)).toBe(true);
    expect(loaded!.results.generations.length).toBe(4);

    const types = loaded!.results.generations.map((g) => g.type);
    expect(types).toContain('summary');
    expect(types).toContain('quiz');
    expect(types).toContain('flashcards');
    expect(types).toContain('podcast');

    const summaryGen = loaded!.results.generations.find((g) => g.type === 'summary');
    expect(summaryGen!.title).toBe('Ma fiche');
    expect((summaryGen as any).dataEN).toBeDefined();

    const quizGen = loaded!.results.generations.find((g) => g.type === 'quiz');
    expect((quizGen as any).dataEN).toBeDefined();
  });

  it('does not re-migrate if generations array already exists', () => {
    const p = store.createProject('Already migrated');
    const gen: Generation = {
      id: 'g-existing',
      title: 'Quiz',
      createdAt: new Date().toISOString(),
      sourceIds: [],
      type: 'quiz',
      data: [],
    };
    store.addGeneration(p.meta.id, gen);

    const loaded = store.getProject(p.meta.id);
    expect(loaded!.results.generations).toHaveLength(1);
    expect(loaded!.results.generations[0].id).toBe('g-existing');
  });
});

describe('moderation normalization', () => {
  it('normalizes old safe:true format to status:safe', () => {
    const p = store.createProject('Mod norm safe');
    const projectPath = join(tempDir, 'projects', p.meta.id, 'project.json');

    const data = {
      meta: p.meta,
      sources: [
        {
          id: 'src-old-safe',
          filename: 'safe.txt',
          markdown: 'contenu safe',
          uploadedAt: new Date().toISOString(),
          moderation: { safe: true },
        },
      ],
      results: { generations: [] },
    };

    writeFileSync(projectPath, JSON.stringify(data, null, 2));
    const loaded = store.getProject(p.meta.id);
    expect(loaded!.sources[0].moderation).toEqual({ status: 'safe', categories: {} });
  });

  it('normalizes old safe:false with categories to status:unsafe', () => {
    const p = store.createProject('Mod norm unsafe');
    const projectPath = join(tempDir, 'projects', p.meta.id, 'project.json');

    const data = {
      meta: p.meta,
      sources: [
        {
          id: 'src-old-unsafe',
          filename: 'unsafe.txt',
          markdown: 'contenu unsafe',
          uploadedAt: new Date().toISOString(),
          moderation: { safe: false, categories: { violence: true } },
        },
      ],
      results: { generations: [] },
    };

    writeFileSync(projectPath, JSON.stringify(data, null, 2));
    const loaded = store.getProject(p.meta.id);
    expect(loaded!.sources[0].moderation).toEqual({
      status: 'unsafe',
      categories: { violence: true },
    });
  });

  it('preserves already-new format moderation unchanged', () => {
    const p = store.createProject('Mod norm new');
    const projectPath = join(tempDir, 'projects', p.meta.id, 'project.json');

    const data = {
      meta: p.meta,
      sources: [
        {
          id: 'src-new-fmt',
          filename: 'new.txt',
          markdown: 'nouveau format',
          uploadedAt: new Date().toISOString(),
          moderation: { status: 'safe', categories: {} },
        },
      ],
      results: { generations: [] },
    };

    writeFileSync(projectPath, JSON.stringify(data, null, 2));
    const loaded = store.getProject(p.meta.id);
    expect(loaded!.sources[0].moderation).toEqual({ status: 'safe', categories: {} });
  });

  it('handles source without moderation field', () => {
    const p = store.createProject('Mod norm none');
    const projectPath = join(tempDir, 'projects', p.meta.id, 'project.json');

    const data = {
      meta: p.meta,
      sources: [
        {
          id: 'src-no-mod',
          filename: 'nomod.txt',
          markdown: 'pas de moderation',
          uploadedAt: new Date().toISOString(),
        },
      ],
      results: { generations: [] },
    };

    writeFileSync(projectPath, JSON.stringify(data, null, 2));
    const loaded = store.getProject(p.meta.id);
    expect(loaded!.sources[0].moderation).toBeUndefined();
  });
});

describe('appendCostEntry', () => {
  it('creates costLog array and adds entry', () => {
    const p = store.createProject('Cost test');
    store.appendCostEntry(p.meta.id, {
      timestamp: new Date().toISOString(),
      route: 'POST /generate/summary',
      cost: 0.005,
      usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150, callCount: 1 },
    });

    const found = store.getProject(p.meta.id);
    expect(found!.costLog).toHaveLength(1);
    expect(found!.costLog![0].cost).toBe(0.005);
    expect(found!.costLog![0].route).toBe('POST /generate/summary');
  });

  it('does nothing for non-existent project', () => {
    store.appendCostEntry('non-existent-id', {
      timestamp: new Date().toISOString(),
      route: 'POST /gen',
      cost: 0.01,
      usage: { promptTokens: 50, completionTokens: 25, totalTokens: 75, callCount: 1 },
    });

    // Should not throw and no project should be created
    expect(store.getProject('non-existent-id')).toBeNull();
  });
});

describe('legacy migration edge cases', () => {
  it('migrateFromLegacy skips empty sources array', () => {
    const legacyPath = join(tempDir, 'sources-empty.json');
    writeFileSync(legacyPath, JSON.stringify([]));

    store.migrateFromLegacy(legacyPath);
    expect(store.listProjects()).toEqual([]);
    expect(existsSync(legacyPath)).toBe(true); // not renamed
  });

  it('migrateFromLegacy handles invalid JSON gracefully', () => {
    const legacyPath = join(tempDir, 'sources-bad.json');
    writeFileSync(legacyPath, '{not valid json!!!');

    store.migrateFromLegacy(legacyPath);
    expect(store.listProjects()).toEqual([]);
  });
});
