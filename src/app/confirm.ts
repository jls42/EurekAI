import type { AppContext } from './app-context';

// UUID v4 strict pour l'identifiant de génération côté backend (cf. routes/generate.ts
// readClientGid). Validation pré-fetch pour Codacy `rule-node-ssrf` : la regex
// borne le set de caractères injectables dans l'URL avant la concaténation.
const GID_UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// pid est un slug court généré côté serveur (cf. store.createProject) ; on
// borne aux caractères safe pour URL avant fetch — défense en profondeur.
const PID_SAFE = /^[a-zA-Z0-9_-]{1,64}$/;

// Sanitization avant fetch — pattern whitelist canonique recommandé
// explicitement par Codacy `rule-node-ssrf` (cf. exemple LGPL OWASP) :
//   const whitelist = [...]
//   if (whitelist.includes(url)) { fetch(url, ...) }
// Defense in depth : regex PID_SAFE + GID_UUID_V4 + encodeURIComponent
// sur chaque segment AVANT construction de l'URL.
async function postCancel(pid: string, gid: string, allowedUrls: string[]): Promise<void> {
  if (!PID_SAFE.test(pid) || !GID_UUID_V4.test(gid)) return;
  const safePid = encodeURIComponent(pid);
  const safeGid = encodeURIComponent(gid);
  const url = '/api/projects/' + safePid + '/generations/' + safeGid + '/cancel';
  if (!allowedUrls.includes(url)) return;
  try {
    const res = await fetch(url, { method: 'POST' });
    if (!res.ok) {
      console.warn('[cancel] POST /cancel non-ok', { pid, gid, status: res.status });
    }
  } catch (err) {
    console.warn('[cancel] POST /cancel failed', { pid, gid, err: String(err) });
  }
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
// Best-effort sur la POST mais on log les erreurs (4xx/5xx/réseau) pour ne pas
// masquer un bug serveur ou un desync client/serveur. UI optimiste : retire de
// pendingById immédiatement, l'event SSE 'cancelled' confirmera bientôt.
function cancelPendingByGid(state: AppContext, gid: string, type: string): void {
  const controller = state.abortControllersByGid[gid];
  const hadLocalController = Boolean(controller);
  if (controller) {
    try {
      controller.abort();
    } catch {
      /* déjà aborté */
    }
    delete state.abortControllersByGid[gid];
  }
  const pid = state.currentProjectId;
  if (pid) {
    const allowedUrls = buildCancelWhitelist(pid, Object.keys(state.pendingById));
    void postCancel(pid, gid, allowedUrls);
  }
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
}

export function createConfirm() {
  return {
    confirmDelete(this: AppContext, target: string, callback: () => void) {
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
        this.confirmCallback();
        this.confirmCallback = null;
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
      // Fallback legacy : cancel par type (transients ou auto qui mute loading{})
      const controller = this.abortControllers[key];
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
