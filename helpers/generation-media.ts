/**
 * Médias des générations (MP3, PNG et JPEG écrits sous `output/projects/<pid>/`) : nom unique,
 * URL publique, URLs portées par une génération et suppression sûre.
 *
 * Toute suppression passe par `mediaFileName` : seule une URL `/output/projects/<pid>/<nom>` du
 * projet visé, au nom simple (aucun séparateur, aucune traversée) et d'extension .mp3, .png ou
 * .jpg, désigne un fichier supprimable. Une URL externe (image hébergée par Mistral), celle d'un autre
 * projet ou un fichier importé (`uploads/`) est ignorée.
 */
import { randomUUID } from 'node:crypto';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { ProjectStore } from '../store.js';
import type { Generation } from '../types.js';
import { logger } from './logger.js';

// jpg : illustrations, enregistrées selon leur format réel (cf. generators/image.ts).
type MediaExtension = 'mp3' | 'png' | 'jpg';

// Noms produits par uniqueMediaName (préfixes podcast, quiz-vocal-q<i>, dictation-w<i>,
// read-aloud-<id8>-<section>, illustration) et leurs formes historiques sans suffixe aléatoire.
const MEDIA_FILE_NAME = /^[A-Za-z0-9][\w.-]*\.(?:mp3|png|jpg)$/;

const mediaUrlBase = (pid: string): string => `/output/projects/${pid}/`;

/** URL publique d'un média du projet, servie par le montage `/output` (cf. output-static.ts). */
export const mediaUrl = (pid: string, name: string): string => `${mediaUrlBase(pid)}${name}`;

/**
 * Nom de fichier unique d'un média. `Date.now()` seul ne suffit pas : deux générations parallèles
 * du même type (N quiz vocaux lancés d'affilée) écrivaient dans la même milliseconde le même
 * fichier et s'écrasaient.
 */
export const uniqueMediaName = (prefix: string, ext: MediaExtension): string => {
  return `${prefix}-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
};

/** Préfixe des fichiers de lecture à voix haute d'une génération (routes/generations.ts). */
export const readAloudPrefix = (generationId: string): string => {
  return `read-aloud-${generationId.slice(0, 8)}-`;
};

type MediaExtractor<G> = (gen: G) => unknown[]; // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars -- Codacy compte le nom du parametre de type comme unused.

// Table exhaustive (type mappé) : un nouveau type de génération sans extracteur casse la
// compilation au lieu de laisser ses médias orphelins.
type MediaExtractors = {
  [K in Generation['type']]: MediaExtractor<Extract<Generation, { type: K }>>;
};

const NO_MEDIA = (): unknown[] => [];

const MEDIA_EXTRACTORS: MediaExtractors = {
  // Lecture à voix haute par section ; `audioUrl` = ancien format (une seule piste).
  summary: (gen) => [gen.data.audioUrl, ...Object.values(gen.data.audioUrls ?? {})],
  // La lecture à voix haute des flashcards n'est jamais persistée : balayage par préfixe.
  flashcards: NO_MEDIA,
  quiz: NO_MEDIA,
  'fill-blank': NO_MEDIA,
  podcast: (gen) => [gen.data.audioUrl],
  'quiz-vocal': (gen) => gen.audioUrls,
  dictation: (gen) => gen.audioUrls,
  image: (gen) => [gen.data.imageUrl],
};

const isString = (v: unknown): v is string => typeof v === 'string';

/** URLs de médias portées par une génération (toutes, y compris externes : non filtrées). */
export const generationMediaUrls = (gen: Generation): string[] => {
  const extract = MEDIA_EXTRACTORS[gen.type] as MediaExtractor<Generation>;
  return extract(gen).filter(isString);
};

// Nom simple : `basename` identique (aucun séparateur, donc aucune traversée) et forme d'un média.
// Expression sans quantificateur imbriqué : temps linéaire, pas de ReDoS.
const isMediaFileName = (name: string): boolean => {
  return basename(name) === name && MEDIA_FILE_NAME.test(name);
};

/** Nom du fichier désigné par `url` dans le dossier du projet `pid`, ou null s'il n'y en a pas. */
export const mediaFileName = (url: unknown, pid: string): string | null => {
  if (typeof url !== 'string') return null;
  const base = mediaUrlBase(pid);
  if (!url.startsWith(base)) return null;
  const name = url.slice(base.length);
  return isMediaFileName(name) ? name : null;
};

const removeMediaFile = (path: string): boolean => {
  try {
    if (!existsSync(path)) return false;
    rmSync(path, { force: true });
    return true;
  } catch (e) {
    logger.warn('media', `suppression impossible : ${path}`, e);
    return false;
  }
};

/**
 * Supprime les fichiers désignés par `urls` dans `projectDir` (URLs hors projet ignorées, cf.
 * mediaFileName). Ne lève jamais : un échec est journalisé. Renvoie le nombre de fichiers supprimés.
 */
export const deleteMediaFiles = (
  projectDir: string,
  pid: string,
  urls: readonly unknown[],
): number => {
  const names = new Set(urls.map((url) => mediaFileName(url, pid)).filter(isString));
  let deleted = 0;
  for (const name of names) {
    if (removeMediaFile(join(projectDir, name))) deleted++;
  }
  return deleted;
};

// Lecture à voix haute de la génération retirée, retrouvée par son préfixe : celle des flashcards
// n'est jamais référencée, et une section relue remplace son URL sans supprimer l'ancien fichier.
// Aucun balayage si le préfixe d'une autre génération du projet commence pareil (id8 identiques).
const readAloudUrls = (
  projectDir: string,
  pid: string,
  removed: Generation,
  others: Generation[],
): string[] => {
  const prefix = readAloudPrefix(removed.id);
  if (others.some((g) => readAloudPrefix(g.id).startsWith(prefix))) return [];
  return readdirSync(projectDir)
    .filter((name) => name.startsWith(prefix) && name.endsWith('.mp3'))
    .map((name) => mediaUrl(pid, name));
};

/**
 * Supprime les médias d'une génération que `store.deleteGeneration` vient de retirer, sauf ceux
 * qu'une autre génération du projet référence encore (noms en collision avant les noms uniques).
 * Best-effort : ne lève jamais (la suppression de la génération est déjà persistée) ; en cas de
 * doute (projet absent ou illisible), rien n'est supprimé. Renvoie le nombre de fichiers supprimés.
 */
export const cleanupDeletedGeneration = (
  store: ProjectStore,
  pid: string,
  removed: Generation,
): number => {
  try {
    const project = store.getProject(pid);
    if (!project) return 0;
    const others = project.results.generations;
    const referenced = new Set(others.flatMap(generationMediaUrls));
    const projectDir = store.getProjectDir(pid);
    const candidates = [
      ...generationMediaUrls(removed),
      ...readAloudUrls(projectDir, pid, removed, others),
    ];
    return deleteMediaFiles(
      projectDir,
      pid,
      candidates.filter((url) => !referenced.has(url)),
    );
  } catch (e) {
    logger.warn('media', `nettoyage des médias de la génération ${removed.id} impossible`, e);
    return 0;
  }
};
