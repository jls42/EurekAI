import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { saveAudioFile } from './audio-files.js';

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-audio-'));
});

afterEach(() => {
  vi.restoreAllMocks();
  rmSync(tempDir, { recursive: true, force: true });
});

describe('saveAudioFile', () => {
  it('writes the buffer to disk and returns the public URL', () => {
    const buffer = Buffer.from('fake-audio-data');
    const url = saveAudioFile(buffer, tempDir, 'pid-123', 'podcast');

    expect(url).toMatch(/^\/output\/projects\/pid-123\/podcast-\d+-[0-9a-f]{8}\.mp3$/);

    const files = readdirSync(tempDir);
    expect(files).toHaveLength(1);
    expect(files[0]).toMatch(/^podcast-\d+-[0-9a-f]{8}\.mp3$/);

    const written = readFileSync(join(tempDir, files[0]));
    expect(written).toEqual(buffer);
  });

  it('uses the prefix in the filename', () => {
    const buffer = Buffer.from('data');
    const url = saveAudioFile(buffer, tempDir, 'p1', 'quiz-vocal-q3');

    expect(url).toMatch(/quiz-vocal-q3-\d+-[0-9a-f]{8}\.mp3$/);
  });

  it('includes pid in the returned URL path', () => {
    const buffer = Buffer.from('data');
    const url = saveAudioFile(buffer, tempDir, 'my-project-id', 'read-aloud-abc');

    expect(url).toContain('/my-project-id/');
    expect(url).toMatch(/^\/output\/projects\/my-project-id\/read-aloud-abc-\d+-[0-9a-f]{8}\.mp3$/);
  });

  // Régression : `${prefix}-${Date.now()}.mp3` seul faisait écrire deux générations parallèles
  // (N quiz vocaux lancés d'affilée) dans le même fichier quand elles tombaient dans la même ms.
  it('deux écritures dans la même milliseconde produisent deux fichiers distincts', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000);

    const first = saveAudioFile(Buffer.from('gen-1'), tempDir, 'p1', 'quiz-vocal-q0');
    const second = saveAudioFile(Buffer.from('gen-2'), tempDir, 'p1', 'quiz-vocal-q0');

    expect(first).not.toBe(second);
    const files = readdirSync(tempDir);
    expect(files).toHaveLength(2);
    const contents = files.map((f) => readFileSync(join(tempDir, f), 'utf-8'));
    expect(contents).toEqual(expect.arrayContaining(['gen-1', 'gen-2']));
  });
});
