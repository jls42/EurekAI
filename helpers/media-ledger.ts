/**
 * Registre des médias écrits pendant une génération (calqué sur usage-context.ts).
 *
 * `saveAudioFile` et l'illustration (generators/image.ts) y inscrivent l'URL de chaque fichier
 * écrit. Le registre sert à supprimer les médias d'une génération qui n'aboutit pas : échec en
 * cours de route (quiz vocal en échec à la question N : les N-1 MP3 déjà écrits) ou promotion
 * refusée (annulation, échec ou entrée disparue du tracker). Un contexte par génération : chaque
 * étape de /generate/auto a le sien, même quand les étapes tournent en parallèle.
 */
import { AsyncLocalStorage } from 'node:async_hooks';
import { deleteMediaFiles } from './generation-media.js';

const ledger = new AsyncLocalStorage<string[]>();

// Alias plutôt qu'un type fonction écrit dans la signature : Lizard y couperait la fonction.
type AsyncThunk<T> = () => Promise<T>;

/** Inscrit l'URL d'un média écrit dans le registre courant. Sans effet hors contexte. */
export const recordMediaUrl = (url: string): void => {
  ledger.getStore()?.push(url);
};

/**
 * Exécute `fn` dans un registre de médias et renvoie son résultat avec les URLs écrites. Si `fn`
 * lève, les fichiers déjà écrits sont supprimés AVANT de relancer l'erreur : aucune boucle
 * d'écriture n'a à gérer son échec partiel.
 */
export const runWithMediaLedger = async <T>(
  projectDir: string,
  pid: string,
  fn: AsyncThunk<T>,
): Promise<{ result: T; mediaUrls: string[] }> => {
  const mediaUrls: string[] = [];
  try {
    const result = await ledger.run(mediaUrls, fn);
    return { result, mediaUrls };
  } catch (err) {
    deleteMediaFiles(projectDir, pid, mediaUrls);
    throw err;
  }
};
