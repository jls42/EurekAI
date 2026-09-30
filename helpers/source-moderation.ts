/**
 * Modération des sources côté serveur, source unique : lancement à l'import, reprise des
 * modérations interrompues (source restée `pending` après un redémarrage) ou en échec (`error`),
 * attente bornée avant une génération, un message de chat ou une revérification, balayage au
 * démarrage. Aucune route n'appelle moderateContent pour une source hors de ce module.
 *
 * Registre `inFlight` (clé `pid:sid`) : une seule modération en vol par source. Une génération
 * qui arrive pendant l'import attend la même promesse au lieu de relancer un appel facturé.
 */
import type { Mistral } from '@mistralai/mistralai';
import type { ModerationResult, Source } from '../types.js';
import type { ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import { moderateContent } from '../generators/moderation.js';
import { logger } from './logger.js';
import { activeModerationCategories, moderationProfileOf } from './moderation-profile.js';
import { awaitsModeration } from './moderation-http.js';

/**
 * Attente maximale d'une vérification, par usage. Un délai dépassé ne coupe rien : la modération
 * continue en arrière-plan via le registre et la réponse garde le statut du disque (409
 * moderation.pending pour une génération). Latence mesurée : 0,2 à 0,7 s par tranche de 20 000
 * caractères (MODERATION_CHUNK_SIZE), tranches traitées l'une après l'autre. `consigne` : attente
 * de la détection de consigne (lot suivant).
 */
export const MODERATION_WAIT_MS = {
  request: 8000,
  chat: 5000,
  recheck: 10_000,
  consigne: 60_000,
} as const;

// Nouvelles modérations lancées au plus par appel de settleSourceModeration (les modérations déjà
// en vol sont rejointes sans compter).
const MAX_NEW_MODERATIONS_PER_CALL = 10;

type SourceModerationStore = Pick<ProjectStore, 'getProject' | 'setSourceModeration'>;
type BootModerationStore = SourceModerationStore & Pick<ProjectStore, 'listProjects'>;
type ModeratedSource = Pick<Source, 'id' | 'markdown'>;

const inFlight = new Map<string, Promise<void>>();

const registryKey = (pid: string, sourceId: string): string => `${pid}:${sourceId}`;

const errorModeration = (): ModerationResult => ({ status: 'error', categories: {} });

const shortId = (sourceId: string): string => sourceId.slice(0, 8);

// Écrit le résultat. Une écriture qui lève (disque, identifiant invalide) est journalisée, jamais
// propagée. false = source ou projet disparus, ou écriture impossible.
const persistModeration = (
  store: SourceModerationStore,
  pid: string,
  sourceId: string,
  result: ModerationResult,
): boolean => {
  try {
    return store.setSourceModeration(pid, sourceId, result) !== null;
  } catch (e) {
    logger.error('moderation', `persist failed (source ${shortId(sourceId)})`, e);
    return false;
  }
};

const runModeration = async (
  store: SourceModerationStore,
  client: Mistral,
  pid: string,
  source: ModeratedSource,
  categories: readonly string[],
): Promise<void> => {
  try {
    const result = await moderateContent(client, source.markdown, [...categories]);
    if (persistModeration(store, pid, source.id, result)) {
      logger.info('moderation', `${result.status.toUpperCase()} (source ${shortId(source.id)})`);
    }
  } catch (e) {
    logger.error('moderation', `error (source ${shortId(source.id)}):`, e);
    persistModeration(store, pid, source.id, errorModeration());
  }
};

/**
 * Modération d'une source, une seule en vol par source : rejoint la promesse en cours si elle
 * existe, sinon lance moderateContent et persiste le résultat ; l'entrée quitte le registre en
 * finally. Ne lève jamais : une exception (API, résultat illisible) persiste `error` et passe par
 * logger.error.
 */
export const moderateSourceOnce = (
  store: SourceModerationStore,
  client: Mistral,
  pid: string,
  source: ModeratedSource,
  categories: readonly string[],
): Promise<void> => {
  const key = registryKey(pid, source.id);
  const current = inFlight.get(key);
  if (current) return current;
  const run = runModeration(store, client, pid, source, categories).finally(() => {
    inFlight.delete(key);
  });
  inFlight.set(key, run);
  return run;
};

/** Import d'une source : modération lancée sans attente, via le registre (moderateSourceOnce). */
export const startSourceModeration = (
  store: SourceModerationStore,
  client: Mistral,
  pid: string,
  source: ModeratedSource,
  categories: readonly string[],
): void => {
  void moderateSourceOnce(store, client, pid, source, categories);
};

/**
 * Source à (re)vérifier (awaitsModeration) : jamais vérifiée (sans objet `moderation` : importée
 * quand la modération était inactive, projet orphelin rattaché, donnée legacy), modération en
 * attente (en cours ou interrompue), en erreur, ou statut inattendu (donnée corrompue).
 * `safe`/`unsafe` : déjà vérifiée.
 */
const needsModeration = (source: Source): boolean => awaitsModeration(source.moderation);

/** Sources visées : `sourceIds` absent ou vide = toutes, comme la génération (getMarkdownOrNull). */
export const selectSources = <T extends { id: string }>(
  sources: readonly T[],
  sourceIds?: readonly string[],
): T[] => {
  if (!sourceIds || sourceIds.length === 0) return [...sources];
  return sources.filter((s) => sourceIds.includes(s.id));
};

export interface SettleDeps {
  store: SourceModerationStore;
  profileStore: Pick<ProfileStore, 'get'>;
  client: Mistral;
}

export interface SettleOptions {
  /** Sources visées ; absent ou [] = toutes. */
  sourceIds?: readonly string[];
  /** Attente maximale (MODERATION_WAIT_MS). */
  waitMs: number;
}

// Rejoint les modérations en vol des cibles et en lance au plus MAX_NEW_MODERATIONS_PER_CALL
// nouvelles ; les suivantes attendent un prochain appel (journalisé : pas de plafond silencieux).
const launchModerations = (
  deps: SettleDeps,
  pid: string,
  targets: readonly Source[],
  categories: readonly string[],
): Promise<void>[] => {
  const runs: Promise<void>[] = [];
  let launched = 0;
  let deferred = 0;
  for (const source of targets) {
    const joined = inFlight.get(registryKey(pid, source.id));
    if (joined) {
      runs.push(joined);
    } else if (launched < MAX_NEW_MODERATIONS_PER_CALL) {
      launched++;
      runs.push(moderateSourceOnce(deps.store, deps.client, pid, source, categories));
    } else {
      deferred++;
    }
  }
  if (deferred > 0) {
    logger.info(
      'moderation',
      `settle: ${deferred} source(s) left for a later call (max ${MAX_NEW_MODERATIONS_PER_CALL} new per call)`,
    );
  }
  return runs;
};

// Modérations attendues pour les sources visées : aucune si le projet n'existe pas ou si son
// profil propriétaire n'est pas modéré (activeModerationCategories null).
const startSettle = (
  deps: SettleDeps,
  pid: string,
  sourceIds?: readonly string[],
): Promise<void>[] => {
  const project = deps.store.getProject(pid);
  if (!project) return [];
  const categories = activeModerationCategories(moderationProfileOf(project, deps.profileStore));
  if (!categories) return [];
  const targets = selectSources(project.sources, sourceIds).filter(needsModeration);
  return launchModerations(deps, pid, targets, categories);
};

// Attend `work` au plus `ms` ; true si le travail a fini avant le délai. Un délai dépassé ne coupe
// rien. Minuteur unref() (ne retient jamais le process), retiré en finally.
const waitAtMost = async (work: Promise<unknown>, ms: number): Promise<boolean> => {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<false>((resolve) => {
    timer = setTimeout(resolve, ms, false);
    timer.unref();
  });
  const done = work.then(() => true as const);
  try {
    return await Promise.race([done, timeout]);
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Reprise des modérations en attente, en erreur ou jamais faites des sources visées, avant une
 * génération, un message de chat ou une revérification : seulement si le profil propriétaire du
 * projet est modéré, avec ses catégories. Attend au plus `waitMs` ; le délai dépassé, les
 * modérations continuent en arrière-plan et l'appelant relit le projet tel quel (statut toujours
 * en attente). Ne lève jamais (identifiant de projet invalide compris) : l'appelant poursuit avec
 * ses propres gardes.
 */
export const settleSourceModeration = async (
  deps: SettleDeps,
  pid: string,
  options: SettleOptions,
): Promise<void> => {
  try {
    const runs = startSettle(deps, pid, options.sourceIds);
    if (runs.length === 0) return;
    const completed = await waitAtMost(Promise.allSettled(runs), options.waitMs);
    if (!completed) {
      logger.info(
        'moderation',
        `settle: ${runs.length} moderation(s) still running after ${options.waitMs} ms`,
      );
    }
  } catch (e) {
    logger.error('moderation', 'settle failed', e);
  }
};

const isPending = (source: Source): boolean => source.moderation?.status === 'pending';

// Relecture juste avant de remodérer : une source vérifiée entre-temps (génération, chat,
// « Revérifier ») n'est pas refacturée.
const isStillPending = (store: SourceModerationStore, pid: string, sourceId: string): boolean => {
  const source = store.getProject(pid)?.sources.find((s) => s.id === sourceId);
  return source !== undefined && isPending(source);
};

const resumeProjectAtBoot = async (
  store: SourceModerationStore,
  profileStore: Pick<ProfileStore, 'get'>,
  client: Mistral,
  pid: string,
): Promise<number> => {
  const project = store.getProject(pid);
  if (!project) return 0;
  const categories = activeModerationCategories(moderationProfileOf(project, profileStore));
  if (!categories) return 0;
  let resumed = 0;
  // Une par une : isStillPending relit la source juste avant son tour, ce qui n'a de sens que si
  // les modérations précédentes sont terminées (une source vérifiée entre-temps n'est pas refacturée).
  for (const source of project.sources.filter(isPending)) {
    if (!isStillPending(store, pid, source.id)) continue;
    // eslint-disable-next-line no-await-in-loop -- reprise une par une, cf. ci-dessus
    await moderateSourceOnce(store, client, pid, source, categories); // NOSONAR(S9382) — reprise une par une
    resumed++;
  }
  return resumed;
};

// Échec d'un projet journalisé et compté 0 : la reprise continue avec les projets suivants.
const resumeProjectOrZero = (
  store: SourceModerationStore,
  profileStore: Pick<ProfileStore, 'get'>,
  client: Mistral,
  pid: string,
): Promise<number> =>
  resumeProjectAtBoot(store, profileStore, client, pid).catch((e: unknown) => {
    logger.error('moderation', `boot resume failed for project ${pid}`, e);
    return 0;
  });

/**
 * Démarrage : sources restées `pending` (modération interrompue par l'arrêt du process) des
 * projets dont le profil propriétaire est modéré, remodérées une par une via le registre avec le
 * client de fond (clé d'env, cf. getBackgroundClient). Les sources en erreur ou jamais vérifiées
 * attendent leur prochain usage. Ne lève jamais ; journalise le nombre de sources reprises.
 */
export const resumeModerationAtBoot = async (
  store: BootModerationStore,
  profileStore: Pick<ProfileStore, 'get'>,
  client: Mistral,
): Promise<number> => {
  let resumed = 0;
  try {
    // Projets un par un, comme leurs sources : au démarrage, une seule modération à la fois part
    // vers Mistral avec la clé d'environnement.
    for (const meta of store.listProjects()) {
      // eslint-disable-next-line no-await-in-loop -- reprise une par une, cf. ci-dessus
      resumed += await resumeProjectOrZero(store, profileStore, client, meta.id); // NOSONAR(S9382) — reprise une par une
    }
  } catch (e) {
    logger.error('moderation', 'boot resume failed', e);
  }
  if (resumed > 0) logger.info('moderation', `boot: resumed moderation of ${resumed} source(s)`);
  return resumed;
};
