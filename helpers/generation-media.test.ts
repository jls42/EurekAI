import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const { loggerWarn } = vi.hoisted(() => ({ loggerWarn: vi.fn() }));
vi.mock('./logger.js', () => ({
  logger: { info: vi.fn(), warn: loggerWarn, error: vi.fn() },
}));

import { ProjectStore } from '../store.js';
import type { Generation } from '../types.js';
import {
  cleanupDeletedGeneration,
  deleteMediaFiles,
  generationMediaUrls,
  mediaFileName,
  mediaUrl,
  readAloudPrefix,
  uniqueMediaName,
} from './generation-media.js';

const NOW = new Date().toISOString();
const meta = (id: string) => ({ id, title: 't', createdAt: NOW, sourceIds: [] });

const summaryGen = (id: string, audio: { audioUrl?: string; audioUrls?: Record<string, string> }) =>
  ({
    ...meta(id),
    type: 'summary',
    data: { title: 'T', summary: 'S', key_points: [], vocabulary: [], ...audio },
  }) as Generation;

const quizVocalGen = (id: string, audioUrls: string[]) =>
  ({ ...meta(id), type: 'quiz-vocal', data: [], audioUrls }) as Generation;

const flashcardsGen = (id: string) => ({ ...meta(id), type: 'flashcards', data: [] }) as Generation;

describe('uniqueMediaName', () => {
  afterEach(() => vi.restoreAllMocks());

  it('préfixe-horodatage-suffixe aléatoire, extension demandée', () => {
    expect(uniqueMediaName('podcast', 'mp3')).toMatch(/^podcast-\d+-[0-9a-f]{8}\.mp3$/);
    expect(uniqueMediaName('illustration', 'png')).toMatch(/^illustration-\d+-[0-9a-f]{8}\.png$/);
  });

  it('deux noms produits dans la même milliseconde diffèrent', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000);
    expect(uniqueMediaName('quiz-vocal-q0', 'mp3')).not.toBe(
      uniqueMediaName('quiz-vocal-q0', 'mp3'),
    );
  });

  it('le nom produit est accepté par mediaFileName', () => {
    const name = uniqueMediaName('read-aloud-0123abcd-key_points', 'mp3');
    expect(mediaFileName(mediaUrl('p1', name), 'p1')).toBe(name);
  });
});

describe('readAloudPrefix', () => {
  it('read-aloud- suivi des 8 premiers caractères de l’id et d’un tiret', () => {
    expect(readAloudPrefix('0123abcd-ffff-4fff-8fff-ffffffffffff')).toBe('read-aloud-0123abcd-');
  });
});

describe('generationMediaUrls', () => {
  it('summary : ancien audioUrl + une URL par section lue à voix haute', () => {
    const gen = summaryGen('g', {
      audioUrl: '/output/projects/p/legacy.mp3',
      audioUrls: { intro: '/output/projects/p/intro.mp3', vocabulary: '/output/projects/p/v.mp3' },
    });
    expect(generationMediaUrls(gen)).toEqual([
      '/output/projects/p/legacy.mp3',
      '/output/projects/p/intro.mp3',
      '/output/projects/p/v.mp3',
    ]);
  });

  it('summary sans lecture à voix haute : aucune URL', () => {
    expect(generationMediaUrls(summaryGen('g', {}))).toEqual([]);
  });

  it('podcast : data.audioUrl', () => {
    const gen = {
      ...meta('g'),
      type: 'podcast',
      data: { script: [], audioUrl: '/output/projects/p/podcast.mp3' },
    } as Generation;
    expect(generationMediaUrls(gen)).toEqual(['/output/projects/p/podcast.mp3']);
  });

  it('quiz-vocal et dictation : audioUrls (un MP3 par question / par mot)', () => {
    const urls = ['/output/projects/p/q0.mp3', '/output/projects/p/q1.mp3'];
    const dictation = { ...meta('d'), type: 'dictation', data: [], audioUrls: urls } as Generation;
    expect(generationMediaUrls(quizVocalGen('g', urls))).toEqual(urls);
    expect(generationMediaUrls(dictation)).toEqual(urls);
  });

  it('image : data.imageUrl, même externe (filtrée plus tard par mediaFileName)', () => {
    const gen = {
      ...meta('g'),
      type: 'image',
      data: { imageUrl: 'https://cdn.example.com/x.png', prompt: 'p' },
    } as Generation;
    expect(generationMediaUrls(gen)).toEqual(['https://cdn.example.com/x.png']);
  });

  it.each(['flashcards', 'quiz', 'fill-blank'])('%s : aucun média persisté', (type) => {
    expect(generationMediaUrls({ ...meta('g'), type, data: [] } as Generation)).toEqual([]);
  });
});

describe('mediaFileName', () => {
  it.each([
    [
      '/output/projects/p1/podcast-1700000000000-0123abcd.mp3',
      'podcast-1700000000000-0123abcd.mp3',
    ],
    [
      '/output/projects/p1/illustration-1700000000000-0123abcd.png',
      'illustration-1700000000000-0123abcd.png',
    ],
    // Noms historiques sans suffixe aléatoire (avant les noms uniques)
    [
      '/output/projects/p1/read-aloud-0123abcd-1700000000000.mp3',
      'read-aloud-0123abcd-1700000000000.mp3',
    ],
  ])('%s → %s', (url, name) => {
    expect(mediaFileName(url, 'p1')).toBe(name);
  });

  it.each([
    ['URL externe', 'https://cdn.example.com/output/projects/p1/x.png'],
    ['autre projet', '/output/projects/p2/podcast-1.mp3'],
    ['traversée', '/output/projects/p1/../p2/podcast-1.mp3'],
    ['traversée encodée', '/output/projects/p1/%2e%2e%2fp2%2fpodcast-1.mp3'],
    ['fichier importé (uploads/)', '/output/projects/p1/uploads/photo.png'],
    ['données du projet', '/output/projects/p1/project.json'],
    ['extension non média', '/output/projects/p1/notes.txt'],
    ['fichier caché', '/output/projects/p1/.mp3'],
    ['nom vide', '/output/projects/p1/'],
    ['préfixe de pid seulement', '/output/projects/p10/podcast-1.mp3'],
  ])('%s → null', (_label, url) => {
    expect(mediaFileName(url, 'p1')).toBeNull();
  });

  it.each([undefined, null, 42, { url: '/output/projects/p1/x.mp3' }])('%s → null', (value) => {
    expect(mediaFileName(value, 'p1')).toBeNull();
  });
});

describe('deleteMediaFiles', () => {
  let root: string;
  let projectDir: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'eurekai-media-'));
    projectDir = join(root, 'projects', 'p1');
    mkdirSync(join(projectDir, 'uploads'), { recursive: true });
    loggerWarn.mockClear();
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  const touch = (...parts: string[]) => writeFileSync(join(...parts), 'x');

  it('supprime les médias désignés et renvoie leur nombre', () => {
    touch(projectDir, 'a.mp3');
    touch(projectDir, 'b.png');
    touch(projectDir, 'project.json');

    const n = deleteMediaFiles(projectDir, 'p1', [
      mediaUrl('p1', 'a.mp3'),
      mediaUrl('p1', 'b.png'),
    ]);

    expect(n).toBe(2);
    expect(readdirSync(projectDir).sort((a, b) => a.localeCompare(b))).toEqual([
      'project.json',
      'uploads',
    ]);
  });

  it('ignore les URLs hors projet (externe, autre pid, traversée, uploads)', () => {
    touch(root, 'secret.mp3');
    touch(projectDir, 'uploads', 'photo.png');

    const n = deleteMediaFiles(projectDir, 'p1', [
      'https://cdn.example.com/a.png',
      '/output/projects/p2/a.mp3',
      '/output/projects/p1/../../secret.mp3',
      '/output/projects/p1/uploads/photo.png',
    ]);

    expect(n).toBe(0);
    expect(existsSync(join(root, 'secret.mp3'))).toBe(true);
    expect(existsSync(join(projectDir, 'uploads', 'photo.png'))).toBe(true);
  });

  it('fichier déjà absent : ignoré, non compté ; doublon compté une fois', () => {
    touch(projectDir, 'a.mp3');
    const url = mediaUrl('p1', 'a.mp3');

    expect(deleteMediaFiles(projectDir, 'p1', [url, url, mediaUrl('p1', 'absent.mp3')])).toBe(1);
  });

  it('échec de suppression : journalisé, jamais levé', () => {
    mkdirSync(join(projectDir, 'dossier.mp3'));

    expect(deleteMediaFiles(projectDir, 'p1', [mediaUrl('p1', 'dossier.mp3')])).toBe(0);
    expect(loggerWarn).toHaveBeenCalledWith(
      'media',
      expect.stringContaining('dossier.mp3'),
      expect.anything(),
    );
  });
});

describe('cleanupDeletedGeneration', () => {
  let root: string;
  let store: ProjectStore;
  let pid: string;
  let projectDir: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'eurekai-media-cleanup-'));
    store = new ProjectStore(root);
    pid = store.createProject('Médias').meta.id;
    projectDir = join(root, 'projects', pid);
    loggerWarn.mockClear();
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  // Écrit les fichiers et renvoie leurs URLs publiques.
  const media = (...names: string[]) =>
    names.map((name) => {
      writeFileSync(join(projectDir, name), 'x');
      return mediaUrl(pid, name);
    });

  const deleteAndClean = (gid: string): number => {
    const removed = store.deleteGeneration(pid, gid);
    if (!removed) throw new Error(`generation ${gid} absente`);
    return cleanupDeletedGeneration(store, pid, removed);
  };

  it('supprime les médias de la génération retirée', () => {
    const urls = media('quiz-vocal-q0-1-aaaaaaaa.mp3', 'quiz-vocal-q1-1-bbbbbbbb.mp3');
    store.addGeneration(pid, quizVocalGen('11111111-0000-4000-8000-000000000000', urls));

    expect(deleteAndClean('11111111-0000-4000-8000-000000000000')).toBe(2);
    expect(readdirSync(projectDir)).toEqual(['project.json']);
  });

  it('garde un fichier encore référencé par une autre génération (collision passée)', () => {
    const [shared, own] = media('quiz-vocal-q0-1700000000000.mp3', 'quiz-vocal-q1-1.mp3');
    store.addGeneration(pid, quizVocalGen('11111111-0000-4000-8000-000000000000', [shared, own]));
    store.addGeneration(pid, quizVocalGen('22222222-0000-4000-8000-000000000000', [shared]));

    expect(deleteAndClean('11111111-0000-4000-8000-000000000000')).toBe(1);
    expect(existsSync(join(projectDir, 'quiz-vocal-q0-1700000000000.mp3'))).toBe(true);
    expect(existsSync(join(projectDir, 'quiz-vocal-q1-1.mp3'))).toBe(false);
  });

  it('balaie la lecture à voix haute non référencée (flashcards, ancienne section relue)', () => {
    const gid = '0123abcd-0000-4000-8000-000000000000';
    const other = '99999999-0000-4000-8000-000000000000';
    media(
      'read-aloud-0123abcd-all-1-aaaaaaaa.mp3',
      'read-aloud-0123abcd-all-2-bbbbbbbb.mp3',
      'read-aloud-99999999-all-1-cccccccc.mp3',
    );
    store.addGeneration(pid, flashcardsGen(gid));
    store.addGeneration(pid, flashcardsGen(other));

    expect(deleteAndClean(gid)).toBe(2);
    expect(readdirSync(projectDir).sort((a, b) => a.localeCompare(b))).toEqual([
      'project.json',
      'read-aloud-99999999-all-1-cccccccc.mp3',
    ]);
  });

  it('aucun balayage si une autre génération partage le préfixe read-aloud (id8 identiques)', () => {
    media('read-aloud-0123abcd-all-1-aaaaaaaa.mp3');
    store.addGeneration(pid, flashcardsGen('0123abcd-0000-4000-8000-000000000000'));
    store.addGeneration(pid, flashcardsGen('0123abcd-1111-4000-8000-000000000000'));

    expect(deleteAndClean('0123abcd-0000-4000-8000-000000000000')).toBe(0);
    expect(existsSync(join(projectDir, 'read-aloud-0123abcd-all-1-aaaaaaaa.mp3'))).toBe(true);
  });

  it('summary : sections, ancien format et fichiers read-aloud orphelins supprimés', () => {
    const gid = '0123abcd-0000-4000-8000-000000000000';
    const [legacy, intro] = media(
      'read-aloud-0123abcd-1600000000000.mp3',
      'read-aloud-0123abcd-intro-2-bbbbbbbb.mp3',
      'read-aloud-0123abcd-intro-1-aaaaaaaa.mp3',
    );
    store.addGeneration(pid, summaryGen(gid, { audioUrl: legacy, audioUrls: { intro } }));

    expect(deleteAndClean(gid)).toBe(3);
    expect(readdirSync(projectDir)).toEqual(['project.json']);
  });

  it('image externe : aucune suppression, aucune erreur', () => {
    const gid = '0123abcd-0000-4000-8000-000000000000';
    store.addGeneration(pid, {
      ...meta(gid),
      type: 'image',
      data: { imageUrl: 'https://cdn.example.com/x.png', prompt: 'p' },
    } as Generation);

    expect(deleteAndClean(gid)).toBe(0);
    expect(loggerWarn).not.toHaveBeenCalled();
  });

  it('projet absent : rien supprimé, ne lève pas', () => {
    const [url] = media('podcast-1-aaaaaaaa.mp3');
    const removed = {
      ...meta('0123abcd-0000-4000-8000-000000000000'),
      type: 'podcast',
      data: { script: [], audioUrl: url },
    } as Generation;

    expect(cleanupDeletedGeneration(store, 'projet-inconnu', removed)).toBe(0);
    expect(existsSync(join(projectDir, 'podcast-1-aaaaaaaa.mp3'))).toBe(true);
  });

  it('pid invalide (traversée) : rien supprimé, avertissement journalisé', () => {
    const removed = flashcardsGen('0123abcd-0000-4000-8000-000000000000');

    expect(cleanupDeletedGeneration(store, '../escape', removed)).toBe(0);
    expect(loggerWarn).toHaveBeenCalledWith(
      'media',
      expect.stringContaining('0123abcd'),
      expect.anything(),
    );
  });
});
