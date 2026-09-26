import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { mediaUrl, uniqueMediaName } from './generation-media.js';

/**
 * Save an audio buffer to disk and return the public URL path.
 * Used by podcast, quiz-vocal, dictation, and read-aloud routes.
 * Le nom est unique (uniqueMediaName) : deux générations parallèles ne s'écrasent plus.
 */
export function saveAudioFile(
  buffer: Buffer,
  projectDir: string,
  pid: string,
  prefix: string,
): string {
  const filename = uniqueMediaName(prefix, 'mp3');
  writeFileSync(join(projectDir, filename), buffer);
  return mediaUrl(pid, filename);
}
