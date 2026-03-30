import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Save an audio buffer to disk and return the public URL path.
 * Used by podcast, quiz-vocal, and read-aloud routes.
 */
export function saveAudioFile(
  buffer: Buffer,
  projectDir: string,
  pid: string,
  prefix: string,
): string {
  const filename = `${prefix}-${Date.now()}.mp3`;
  writeFileSync(join(projectDir, filename), buffer);
  return `/output/projects/${pid}/${filename}`;
}
