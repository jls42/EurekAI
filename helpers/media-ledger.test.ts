import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { recordMediaUrl, runWithMediaLedger } from './media-ledger.js';
import { saveAudioFile } from './audio-files.js';

let projectDir: string;

beforeEach(() => {
  projectDir = mkdtempSync(join(tmpdir(), 'eurekai-ledger-'));
});

afterEach(() => {
  rmSync(projectDir, { recursive: true, force: true });
});

const tick = () => new Promise((r) => setTimeout(r, 0));

describe('runWithMediaLedger', () => {
  it('renvoie le résultat et les URLs inscrites (saveAudioFile inscrit la sienne)', async () => {
    const { result, mediaUrls } = await runWithMediaLedger(projectDir, 'p1', async () => {
      const url = saveAudioFile(Buffer.from('a'), projectDir, 'p1', 'podcast');
      return `ok:${url}`;
    });

    expect(mediaUrls).toHaveLength(1);
    expect(mediaUrls[0]).toMatch(/^\/output\/projects\/p1\/podcast-\d+-[0-9a-f]{8}\.mp3$/);
    expect(result).toBe(`ok:${mediaUrls[0]}`);
    expect(readdirSync(projectDir)).toHaveLength(1);
  });

  it('échec partiel : supprime les fichiers déjà écrits puis relance la même erreur', async () => {
    const boom = new Error('tts down at q2');

    await expect(
      runWithMediaLedger(projectDir, 'p1', async () => {
        saveAudioFile(Buffer.from('q0'), projectDir, 'p1', 'quiz-vocal-q0');
        await tick();
        saveAudioFile(Buffer.from('q1'), projectDir, 'p1', 'quiz-vocal-q1');
        throw boom;
      }),
    ).rejects.toBe(boom);

    expect(readdirSync(projectDir)).toEqual([]);
  });

  it('succès : ne supprime rien (la décision revient à l’appelant)', async () => {
    const { mediaUrls } = await runWithMediaLedger(projectDir, 'p1', async () => {
      saveAudioFile(Buffer.from('a'), projectDir, 'p1', 'podcast');
    });

    const name = mediaUrls[0].split('/').pop()!;
    expect(existsSync(join(projectDir, name))).toBe(true);
  });

  it('contextes parallèles isolés (étapes /generate/auto concurrentes)', async () => {
    const step = (prefix: string) =>
      runWithMediaLedger(projectDir, 'p1', async () => {
        recordMediaUrl(`/output/projects/p1/${prefix}-1.mp3`);
        await tick();
        recordMediaUrl(`/output/projects/p1/${prefix}-2.mp3`);
      });

    const [a, b] = await Promise.all([step('podcast'), step('dictation-w0')]);

    expect(a.mediaUrls).toEqual([
      '/output/projects/p1/podcast-1.mp3',
      '/output/projects/p1/podcast-2.mp3',
    ]);
    expect(b.mediaUrls).toEqual([
      '/output/projects/p1/dictation-w0-1.mp3',
      '/output/projects/p1/dictation-w0-2.mp3',
    ]);
  });

  it('contexte imbriqué : l’URL va au registre le plus proche', async () => {
    const outer = await runWithMediaLedger(projectDir, 'p1', async () => {
      recordMediaUrl('/output/projects/p1/outer.mp3');
      const inner = await runWithMediaLedger(projectDir, 'p1', async () => {
        recordMediaUrl('/output/projects/p1/inner.mp3');
      });
      return inner.mediaUrls;
    });

    expect(outer.result).toEqual(['/output/projects/p1/inner.mp3']);
    expect(outer.mediaUrls).toEqual(['/output/projects/p1/outer.mp3']);
  });
});

describe('recordMediaUrl', () => {
  it('hors contexte : sans effet (lecture à voix haute, hors génération)', () => {
    expect(() => recordMediaUrl('/output/projects/p1/read-aloud-x.mp3')).not.toThrow();
    const url = saveAudioFile(Buffer.from('a'), projectDir, 'p1', 'read-aloud-0123abcd-intro');
    expect(existsSync(join(projectDir, url.split('/').pop()!))).toBe(true);
  });
});
