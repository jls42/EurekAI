/* eslint-disable @typescript-eslint/no-unnecessary-condition -- `crypto.subtle` peut être undefined en contexte non sécurisé (app servie en HTTP non-localhost) ; le typage lib.dom (Crypto non-null) ne reflète pas ce cas runtime géré volontairement */
import type { Source } from '../../types';

/**
 * sha256 hex d'un fichier via Web Crypto. Retourne `null` si `crypto.subtle` est indisponible
 * (contexte non sécurisé — ex. app servie en HTTP sur un LAN) : le garde serveur rattrape alors la
 * détection au moment de l'upload. Identique au sha256 calculé côté serveur (mêmes octets bruts).
 */
export const hashFile = async (file: File): Promise<string | null> => {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;
  try {
    const digest = await subtle.digest('SHA-256', await file.arrayBuffer());
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
};

/**
 * Pré-check client : un fichier (hash + nom) duplique-t-il une source déjà présente dans le projet ?
 * Match par `contentHash` (fiable, byte-exact) ; à défaut — sources créées avant la feature, sans
 * hash — par nom de fichier, signalé `reason: 'filename'` pour un wording « même nom » plus prudent.
 */
export function findExistingDuplicate(
  hash: string | null,
  filename: string,
  existing: Source[],
): { source: Source; reason: 'hash' | 'filename' } | null {
  if (hash) {
    const byHash = existing.find((s) => s.contentHash === hash);
    if (byHash) return { source: byHash, reason: 'hash' };
  }
  const byName = existing.find((s) => !s.contentHash && s.filename === filename);
  return byName ? { source: byName, reason: 'filename' } : null;
}
