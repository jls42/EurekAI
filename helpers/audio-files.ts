import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { mediaUrl, uniqueMediaName } from './generation-media.js';
import { recordMediaUrl } from './media-ledger.js';

/**
 * Save an audio buffer to disk and return the public URL path.
 * Used by podcast, quiz-vocal, dictation, and read-aloud routes.
 * Le nom est unique (uniqueMediaName) : deux générations parallèles ne s'écrasent plus.
 * L'URL est inscrite au registre de la génération en cours (media-ledger) : si la génération
 * échoue ou n'est pas promue, le fichier est supprimé. Sans effet hors génération (read-aloud).
 */
export function saveAudioFile(
  buffer: Buffer,
  projectDir: string,
  pid: string,
  prefix: string,
): string {
  const filename = uniqueMediaName(prefix, 'mp3');
  writeFileSync(join(projectDir, filename), buffer);
  const url = mediaUrl(pid, filename);
  recordMediaUrl(url);
  return url;
}
