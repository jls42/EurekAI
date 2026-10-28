import type { AppContext } from './app-context';
import type { PendingTrackerEntry } from '../../types';
import { pendingOfTypeExists } from './pending-utils';
import { cancelAutoLot } from './auto-launch';
import { abortSingleRuns } from './single-runs';
import { buildEventKey } from '../../helpers/event-key';

const TOAST_CANCELLED_ONE = 'toast.cancelledOne';
const GEN_AUTO = 'gen.auto';

// UUID v4 strict pour l'identifiant de génération côté backend (cf. routes/generate.ts
// readClientGid). Validation pré-fetch pour Codacy `rule-node-ssrf` : la regex
// borne le set de caractères injectables dans l'URL avant la concaténation.
const GID_UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// pid est un slug court généré côté serveur (cf. store.createProject) ; on
// borne aux caractères safe pour URL avant fetch — défense en profondeur.
const PID_SAFE = /^[a-zA-Z0-9_-]{1,64}$/;

// Defense in depth avant fetch : PID_SAFE + GID_UUID_V4 + encodeURIComponent
// sur chaque segment AVANT construction de l'URL.
//
// Retourne `true` si le serveur a confirmé le cancel (200) ou est déjà sans
// pending (404 = race avec un completion ; même résultat fonctionnel pour
// l'UI). Retourne `false` UNIQUEMENT en cas de réseau down / 5xx — l'UI
// rollbacke alors le pending pour ne pas mentir à l'utilisateur.
async function postCancel(pid: string, gid: string, allowedUrls: string[]): Promise<boolean> {
  if (!PID_SAFE.test(pid) || !GID_UUID_V4.test(gid)) return false;
  const safePid = encodeURIComponent(pid);
  const safeGid = encodeURIComponent(gid);
  const url = '/api/projects/' + safePid + '/generations/' + safeGid + '/cancel';
  // Shape exact `if (whitelist.includes(url)) { fetch(url, ...) }` recommandé
  // par Codacy `rule-node-ssrf` (OWASP). L'early-return négatif est
  // fonctionnellement équivalent mais NON reconnu par la règle Codacy LGPL —
  // il faut le bloc positif englobant pour que le taint analysis valide le sink.
  if (allowedUrls.includes(url)) {
    try {
      const res = await fetch(url, { method: 'POST' });
      if (res.ok) return true;
      // 404 pending_not_found = race avec un completion/cancel précédent : pour
      // l'UX on accepte (le pending est de toute façon parti). 4xx/5xx autres =
      // bug serveur, on rollback.
      if (res.status === 404) return true;
      console.warn('[cancel] POST /cancel non-ok', { pid, gid, status: res.status });
    } catch (err) {
      console.warn('[cancel] POST /cancel failed', { pid, gid, err: String(err) });
    }
  }
  return false;
}

// Construit la whitelist d'URLs /cancel autorisées pour ce projet à partir
// des gids actuellement présents dans pendingById. Ce shape (Array statique
// + .includes) est reconnu par la règle Codacy `rule-node-ssrf` comme
// sanitization explicite du flow taint.
function buildCancelWhitelist(pid: string, gids: string[]): string[] {
  const safePid = encodeURIComponent(pid);
  return gids
    .filter((g) => GID_UUID_V4.test(g))
    .map((g) => '/api/projects/' + safePid + '/generations/' + encodeURIComponent(g) + '/cancel');
}

// POST /cancel en échec (réseau down / 5xx) : pending restauré + toast, sur le cours de l'annulation
// seulement — changé entre-temps, ce pending ne doit pas apparaître dans un autre cours (il revient
// de lui-même au retour, relu du serveur). Race possible entre POST cancel échoué et SSE
// `completed` : si la gen est arrivée en `state.generations` entre-temps, ne pas restaurer le
// pending (toast trompeur "annulation échouée" alors que la gen a bel et bien complété).
const restoreAfterFailedCancel = (
  state: AppContext,
  pid: string,
  gid: string,
  snapshot: PendingTrackerEntry | undefined,
  label: string,
): void => {
  if (state.currentProjectId !== pid) return;
  if (state.generations.some((g) => g.id === gid)) return;
  if (snapshot && !state.pendingById[gid]) {
    state.pendingById[gid] = snapshot;
  }
  state.showToast(state.t('toast.cancelFailed', { type: label }), 'error');
};

// Cancel un pending par gid : abort le fetch côté client + POST /cancel HTTP.
// UI optimiste avec rollback sur erreur HTTP : retire de pendingById
// immédiatement (feedback instantané), puis si le POST /cancel échoue (réseau
// down / 5xx serveur), restaure l'entrée pending + toast erreur. Sans rollback,
// l'utilisateur croirait que c'est annulé alors que le backend continue, et
// recevrait plus tard un event SSE 'completed' pour un gid disparu côté UI.
// Sans toast de confirmation : « Tout annuler » l'appelle pour chaque génération et n'en affiche
// qu'un en tout (cinq toasts d'un coup au release-test du 2026-10-22) ; la puce ✕ passe par
// cancelPendingByGid, qui nomme le type annulé.
const cancelPendingSilently = (state: AppContext, gid: string, type: string): void => {
  const controller = state.abortControllersByGid[gid];
  const hadLocalController = Boolean(controller);
  if (controller) {
    // AbortController.abort() est idempotent par spec et ne throw jamais — pas
    // de try/catch défensif (cf. CLAUDE.md "no empty catch").
    controller.abort();
    delete state.abortControllersByGid[gid];
  }
  const snapshot = state.pendingById[gid];
  delete state.pendingById[gid];
  // Cas server-owned (gid généré par le serveur pour une étape d'un lot Auto, pas par
  // state.generate) : aucun controller local n'a été aborté donc le finally
  // de la fetch ne s'exécutera pas pour ce type. Clear loading[type]
  // explicitement pour libérer le bouton/spinner UI sans attendre la fin du
  // bulk auto fetch (qui peut être 60s+).
  if (
    !hadLocalController &&
    state.loading[type] === true &&
    !pendingOfTypeExists(state.pendingById, type)
  ) {
    state.loading[type] = false;
  }
  const label = state.t('gen.' + type) || type;
  // L'événement SSE `cancelled` de ce gid afficherait un toast : il est marqué comme déjà vu dans
  // l'onglet. Sa notification persistée reste écrite par le SSE (source de vérité serveur).
  state.shownToastEventKeys.add(buildEventKey(gid, 'cancelled'));

  const pid = state.currentProjectId;
  if (!pid) return;
  const allowedUrls = buildCancelWhitelist(pid, [gid, ...Object.keys(state.pendingById)]);
  postCancel(pid, gid, allowedUrls)
    .then((ok) => {
      if (!ok) restoreAfterFailedCancel(state, pid, gid, snapshot, label);
    })
    .catch((err: unknown) => {
      // postCancel ne reject jamais (tous les chemins return un boolean), mais
      // un .catch est nécessaire pour satisfaire le contrat "no floating promise"
      // sans recourir au `void` operator interdit par sonarjs/void-use.
      console.error('[cancel] unexpected postCancel error', err);
    });
};

// Puce ✕ d'une génération : annulation, puis un toast qui nomme son type.
function cancelPendingByGid(state: AppContext, gid: string, type: string): void {
  cancelPendingSilently(state, gid, type);
  const label = state.t('gen.' + type) || type;
  state.showToast(state.t(TOAST_CANCELLED_ONE, { type: label }), 'info');
}

// ─────────────────────────────────────────────────────────────────────────────
// Méthodes extraites de createConfirm pour ne pas agglomérer leur CCN dans la
// factory. `const = function` (pas `function`) car les `function name(this: T)`
// consécutifs sont agglomérés par Lizard TS (cf. CLAUDE.md piège connu).
// ─────────────────────────────────────────────────────────────────────────────

const CONFIRM_LABELS: Record<string, string> = {
  projet: 'confirm.project',
  source: 'confirm.source',
  generation: 'confirm.generation',
};

const confirmDelete = function (
  this: AppContext,
  target: string,
  callback: () => void | Promise<void>,
) {
  this.confirmTarget = CONFIRM_LABELS[target] ? this.t(CONFIRM_LABELS[target]) : target;
  this.confirmMessage = '';
  this.confirmCta = '';
  this.confirmCallback = callback;
  this.confirmTrigger = document.activeElement as HTMLElement;
  (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.showModal();
};

/* Variante générique du dialog de confirmation pour les actions non-suppression
   (ex. reset des réglages) : message et libellé du CTA fournis directement. */
const confirmAction = function (
  this: AppContext,
  message: string,
  cta: string,
  callback: () => void | Promise<void>,
) {
  this.confirmTarget = '';
  this.confirmMessage = message;
  this.confirmCta = cta;
  this.confirmCallback = callback;
  this.confirmTrigger = document.activeElement as HTMLElement;
  (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.showModal();
};

// Restaure le focus sur le déclencheur après fermeture du dialog (a11y).
// Try/catch silencieux : focus() peut throw si l'élément a été démonté entre
// l'ouverture et la fermeture du dialog (ex: liste rerendered).
const restoreConfirmTriggerFocus = function (state: AppContext): void {
  if (!state.confirmTrigger) return;
  void state.$nextTick(() => {
    try {
      state.confirmTrigger?.focus();
    } catch {
      /* silent: focus restore peut throw si element demonte */
    }
    state.confirmTrigger = null;
  });
};

const runConfirmCallback = function (state: AppContext, cb: () => void | Promise<void>): void {
  const onFailure = (err: unknown): void => {
    // Action confirmée par l'utilisateur (delete projet/source/generation)
    // qui throw côté implémentation : on log en error (pour Sentry / console
    // dev) ET on surface un toast user-visible. Sinon le dialog se ferme
    // comme si l'action avait réussi alors qu'elle a silencieusement échoué.
    console.error('[confirm] action failed', err);
    state.showToast(state.t('toast.confirmActionFailed'), 'error');
  };
  try {
    Promise.resolve(cb()).catch(onFailure);
  } catch (err) {
    onFailure(err);
  } finally {
    if (state.confirmCallback === cb) {
      state.confirmCallback = null;
    }
  }
};

const executeConfirm = function (this: AppContext) {
  (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.close();
  if (this.confirmCallback) {
    runConfirmCallback(this, this.confirmCallback);
  }
  restoreConfirmTriggerFocus(this);
};

const closeConfirmDialog = function (this: AppContext) {
  (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.close();
  this.confirmCallback = null;
  restoreConfirmTriggerFocus(this);
};

// Annulation du lot Auto : un échec réseau est signalé (le lot continue sur le serveur).
const cancelLotQuietly = async (state: AppContext, projectId: string): Promise<boolean> => {
  try {
    return await cancelAutoLot(state, projectId);
  } catch (e: unknown) {
    console.warn('[auto] annulation du lot impossible', e);
    return false;
  }
};

const cancelAutoRunWithToast = (state: AppContext, projectId: string): void => {
  state.loading.auto = false;
  state.showToast(state.t(TOAST_CANCELLED_ONE, { type: state.t(GEN_AUTO) }), 'info');
  void cancelLotQuietly(state, projectId).then((ok) => {
    if (!ok) state.showToast(state.t('toast.cancelFailed', { type: state.t(GEN_AUTO) }), 'error');
  });
};

// Puce « Auto — analyse… » : le lot entier du cours affiché est annulé sur le serveur (une
// requête). Faux s'il n'y a pas de lot sur ce cours.
const cancelDisplayedAutoChip = (state: AppContext): boolean => {
  const projectId = state.currentProjectId;
  if (!projectId || !state.autoRuns[projectId]) return false;
  cancelAutoRunWithToast(state, projectId);
  return true;
};

// Fallback legacy : cancel par type (transients, voix, recherche web). On ne notifie
// l'utilisateur que si quelque chose a réellement été annulé — sinon clic sur une chip stale
// produirait un faux toast "annulé(e)" alors que rien ne tournait.
const cancelTransient = (state: AppContext, key: string): void => {
  const controller = state.abortControllers[key];
  const wasLoading = state.loading[key] === true;
  if (!controller && !wasLoading) return;
  if (controller) {
    controller.abort();
    delete state.abortControllers[key];
  }
  if (!pendingOfTypeExists(state.pendingById, key)) state.loading[key] = false;
  const label = state.t('gen.' + key) || key;
  state.showToast(state.t(TOAST_CANCELLED_ONE, { type: label }), 'info');
};

// Le `key` accepte soit un type (transient : auto/voice/websearch/...),
// soit un gid (UUID v4) pour cibler un pending Generation spécifique.
// Détection : un gid trouvé dans pendingById prime sur le type pour
// permettre le cancel précis en multi-onglets / étapes d'un lot Auto.
const cancelOne = function (this: AppContext, key: string) {
  const pending = this.pendingById[key];
  if (pending) {
    cancelPendingByGid(this, key, pending.type);
    return;
  }
  if (key === 'auto' && cancelDisplayedAutoChip(this)) return;
  cancelTransient(this, key);
};

// Lot Auto du cours affiché, dans toutes ses phases : une requête annule le lot et ses étapes en
// cours sur le serveur. Rend son runId (ses étapes ne sont pas annulées une à une).
const cancelDisplayedLot = (state: AppContext): string | undefined => {
  const projectId = state.currentProjectId;
  const lotId = projectId ? state.autoRuns[projectId]?.runId : undefined;
  if (projectId && lotId) void cancelLotQuietly(state, projectId);
  return lotId;
};

// Tous les autres pendings par gid (POST /cancel à chaque), sans un toast par génération.
const cancelOtherPendings = (state: AppContext, lotId: string | undefined): void => {
  for (const gid of Object.keys(state.pendingById)) {
    const entry = state.pendingById[gid];
    if (lotId && entry.runId === lotId) continue;
    cancelPendingSilently(state, gid, entry.type);
  }
};

// Transients résiduels (voix, recherche web : abort controller par type).
const abortTransients = (state: AppContext): void => {
  for (const controller of Object.values(state.abortControllers)) {
    controller.abort();
  }
  state.abortControllers = {};
};

// « Tout annuler » : lot Auto, générations en cours, transients et générations simples en vol du
// cours affiché ; un seul toast pour tout.
const cancelGeneration = function (this: AppContext) {
  cancelOtherPendings(this, cancelDisplayedLot(this));
  abortTransients(this);
  // Générations simples encore en vol du cours (gardées au changement de cours, single-runs.ts).
  if (this.currentProjectId) abortSingleRuns(this, this.currentProjectId);
  for (const key of Object.keys(this.loading)) {
    this.loading[key] = false;
  }
  this.showToast(this.t('toast.cancelledGeneration'), 'info');
};

export function createConfirm() {
  return {
    confirmDelete,
    confirmAction,
    executeConfirm,
    closeConfirmDialog,
    cancelOne,
    cancelGeneration,
  };
}
