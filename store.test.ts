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
