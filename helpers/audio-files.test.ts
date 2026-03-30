import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { saveAudioFile } from './audio-files.js';

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'eurekai-audio-'));
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

describe('saveAudioFile', () => {
  it('writes the buffer to disk and returns the public URL', () => {
    const buffer = Buffer.from('fake-audio-data');
    const url = saveAudioFile(buffer, tempDir, 'pid-123', 'podcast');

    expect(url).toMatch(/^\/output\/projects\/pid-123\/podcast-\d+\.mp3$/);

    const files = readdirSync(tempDir);
    expect(files).toHaveLength(1);
    expect(files[0]).toMatch(/^podcast-\d+\.mp3$/);

    const written = readFileSync(join(tempDir, files[0]));
    expect(written).toEqual(buffer);
  });

  it('uses the prefix in the filename', () => {
    const buffer = Buffer.from('data');
    const url = saveAudioFile(buffer, tempDir, 'p1', 'quiz-vocal-q3');

    expect(url).toMatch(/quiz-vocal-q3-\d+\.mp3$/);
  });

  it('includes pid in the returned URL path', () => {
    const buffer = Buffer.from('data');
    const url = saveAudioFile(buffer, tempDir, 'my-project-id', 'read-aloud-abc');

    expect(url).toContain('/my-project-id/');
    expect(url).toMatch(/^\/output\/projects\/my-project-id\/read-aloud-abc-\d+\.mp3$/);
  });
});
