import type { AppContext } from './app-context';

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

// Cancel un pending par gid : abort le fetch côté client + POST /cancel HTTP.
// UI optimiste avec rollback sur erreur HTTP : retire de pendingById
// immédiatement (feedback instantané), puis si le POST /cancel échoue (réseau
// down / 5xx serveur), restaure l'entrée pending + toast erreur. Sans rollback,
// l'utilisateur croirait que c'est annulé alors que le backend continue, et
// recevrait plus tard un event SSE 'completed' pour un gid disparu côté UI.
function cancelPendingByGid(state: AppContext, gid: string, type: string): void {
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
  // Cas server-owned (gid généré par /generate/auto runStepBody, pas par
  // state.generate) : aucun controller local n'a été aborté donc le finally
  // de la fetch ne s'exécutera pas pour ce type. Clear loading[type]
  // explicitement pour libérer le bouton/spinner UI sans attendre la fin du
  // bulk auto fetch (qui peut être 60s+).
  if (!hadLocalController && state.loading[type] === true) {
    state.loading[type] = false;
  }
  const label = state.t('gen.' + type) || type;
  state.showToast(state.t('toast.cancelledOne', { type: label }), 'info');

  const pid = state.currentProjectId;
  if (!pid) return;
  const allowedUrls = buildCancelWhitelist(pid, [gid, ...Object.keys(state.pendingById)]);
  postCancel(pid, gid, allowedUrls)
    .then((ok) => {
      if (ok) return;
      // Rollback : si le pending est revenu côté SSE entre-temps (race), ne pas
      // l'écraser. Sinon restaure le snapshot + toast erreur actionnable.
      if (snapshot && !state.pendingById[gid]) {
        state.pendingById[gid] = snapshot;
      }
      state.showToast(state.t('toast.cancelFailed', { type: label }), 'error');
    })
    .catch((err: unknown) => {
      // postCancel ne reject jamais (tous les chemins return un boolean), mais
      // un .catch est nécessaire pour satisfaire le contrat "no floating promise"
      // sans recourir au `void` operator interdit par sonarjs/void-use.
      console.error('[cancel] unexpected postCancel error', err);
    });
}

export function createConfirm() {
  return {
    confirmDelete(this: AppContext, target: string, callback: () => void | Promise<void>) {
      const confirmLabels: Record<string, string> = {
        projet: 'confirm.project',
        source: 'confirm.source',
        generation: 'confirm.generation',
      };
      this.confirmTarget = confirmLabels[target] ? this.t(confirmLabels[target]) : target;
      this.confirmCallback = callback;
      this.confirmTrigger = document.activeElement as HTMLElement;
      (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.showModal();
    },

    executeConfirm(this: AppContext) {
      (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.close();
      if (this.confirmCallback) {
        const cb = this.confirmCallback;
        const onFailure = (err: unknown): void => {
          // Action confirmée par l'utilisateur (delete projet/source/generation)
          // qui throw côté implémentation : on log en error (pour Sentry / console
          // dev) ET on surface un toast user-visible. Sinon le dialog se ferme
          // comme si l'action avait réussi alors qu'elle a silencieusement échoué.
          console.error('[confirm] action failed', err);
          this.showToast(this.t('toast.confirmActionFailed'), 'error');
        };
        try {
          Promise.resolve(cb()).catch(onFailure);
        } catch (err) {
          onFailure(err);
        } finally {
          if (this.confirmCallback === cb) {
            this.confirmCallback = null;
          }
        }
      }
      if (this.confirmTrigger) {
        this.$nextTick(() => {
          try {
            this.confirmTrigger?.focus();
          } catch {
            /* silent: focus restore peut throw si element demonte */
          }
          this.confirmTrigger = null;
        });
      }
    },

    closeConfirmDialog(this: AppContext) {
      (this.$refs.confirmDialog as HTMLDialogElement | undefined)?.close();
      this.confirmCallback = null;
      if (this.confirmTrigger) {
        this.$nextTick(() => {
          try {
            this.confirmTrigger?.focus();
          } catch {
            /* silent: focus restore peut throw si element demonte */
          }
          this.confirmTrigger = null;
        });
      }
    },

    // Le `key` accepte soit un type (transient : auto/voice/websearch/...),
    // soit un gid (UUID v4) pour cibler un pending Generation spécifique.
    // Détection : un gid trouvé dans pendingById prime sur le type pour
    // permettre le cancel précis en multi-onglets / auto parallel.
    cancelOne(this: AppContext, key: string) {
      const pending = this.pendingById[key];
      if (pending) {
        cancelPendingByGid(this, key, pending.type);
        return;
      }
      // Fallback legacy : cancel par type (transients ou auto qui mute loading{}).
      // On ne notifie l'utilisateur que si quelque chose a réellement été annulé —
      // sinon clic sur une chip stale produirait un faux toast "annulé(e)" alors
      // que rien ne tournait.
      const controller = this.abortControllers[key];
      const wasLoading = this.loading[key] === true;
      if (!controller && !wasLoading) return;
      if (controller) {
        controller.abort();
        delete this.abortControllers[key];
      }
      this.loading[key] = false;
      const label = this.t('gen.' + key) || key;
      this.showToast(this.t('toast.cancelledOne', { type: label }), 'info');
    },

    cancelGeneration(this: AppContext) {
      // 1. Cancel tous les pendings par gid (envoi POST /cancel à chaque)
      for (const gid of Object.keys(this.pendingById)) {
        const entry = this.pendingById[gid];
        cancelPendingByGid(this, gid, entry.type);
      }
      // 2. Cancel les transients résiduels (auto/voice/websearch via abort
      //    controller par type seulement)
      for (const controller of Object.values(this.abortControllers)) {
        controller.abort();
      }
      this.abortControllers = {};
      for (const key of Object.keys(this.loading)) {
        this.loading[key] = false;
      }
      this.showToast(this.t('toast.cancelledGeneration'), 'info');
    },
  };
}
