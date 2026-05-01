import type { AppContext } from './app-context';

// EventSource SSE qui pousse les transitions du pending tracker en temps réel.
// Démarré au selectProject après une phase de réconciliation (snapshot serveur
// + backfill notifications post-PR pour les events ratés). Arrêté par
// resetSession au switch profil/projet.
//
// Pas de buffering / replay côté serveur : un event émis avant la connexion
// SSE est perdu. La réconciliation initiale (et au reconnect) couvre ce cas
// pour tous les events postérieurs au lastSeenAt mais antérieurs à la
// connexion SSE.
//
// Backoff exponentiel sur erreur réseau, jusqu'à 30s max. La connexion est
// stoppée au switch projet via stopPendingsStream() depuis resetSession().

const RECONNECT_INITIAL_MS = 1000;
const RECONNECT_MAX_MS = 30_000;
// Cap sur les retries consécutifs : si le serveur renvoie 404 (projet supprimé
// dans un autre tab) ou si le réseau est durablement coupé, l'EventSource boucle
// sinon en backoff jusqu'à 30s ad vitam. Après 8 échecs (~ 8 × jusqu'à 30s
// = quelques minutes), on stop et on log explicitement — l'user peut switcher
// projet/refresh pour relancer.
const RECONNECT_MAX_RETRIES = 8;

const logReconnectError = (err: unknown): void => {
  console.error('[sse] reconnect failed', err);
};

export function createPendingsStream() {
  let source: EventSource | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let backoff = RECONNECT_INITIAL_MS;
  let consecutiveErrors = 0;

  const stop = () => {
    // EventSource.close() est idempotent par spec et ne throw jamais —
    // pas de try/catch défensif (cf. CLAUDE.md "no empty catch").
    source?.close();
    source = null;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  };

  return {
    async startPendingsStream(this: AppContext, projectId: string): Promise<void> {
      stop();
      // Watermark conservateur capturé AVANT tout fetch.
      const reconcileStartedAt = new Date().toISOString();
      await this.reconcilePendings(projectId, reconcileStartedAt);

      // Le user a peut-être switché entre temps (await long).
      if (this.currentProjectId !== projectId) {
        return;
      }

      const url = '/api/projects/' + projectId + '/events';
      source = new EventSource(url);
      source.addEventListener('generation', (msg: MessageEvent) => {
        if (this.currentProjectId !== projectId) return;
        try {
          const event = JSON.parse(msg.data);
          this.applyGenerationEvent(event);
        } catch (err) {
          // Malformed event = bug serveur (BigInt non-serializable, cycle JSON,
          // ...). Sans log, la cloche reste stale sans signal debug. Pas de
          // re-throw : on absorbe pour ne pas tuer l'EventSource.
          console.warn('[sse] malformed generation event', err, msg.data);
        }
        // Connexion saine : reset les compteurs d'échec pour repartir à plat.
        backoff = RECONNECT_INITIAL_MS;
        consecutiveErrors = 0;
      });
      source.onerror = () => {
        // EventSource auto-reconnect côté browser, mais on contrôle le backoff
        // via une fermeture explicite + retry programmé pour éviter le marteau.
        if (this.currentProjectId !== projectId) {
          stop();
          return;
        }
        consecutiveErrors++;
        console.warn(
          `[sse] connection error (attempt ${consecutiveErrors}/${RECONNECT_MAX_RETRIES})`,
        );
        source?.close();
        source = null;
        if (consecutiveErrors >= RECONNECT_MAX_RETRIES) {
          // Probable 404 (projet supprimé) ou réseau down durable. On stop
          // pour ne pas marteler — un selectProject/refresh ultérieur relance
          // une connexion fraîche avec compteurs réinitialisés.
          console.warn(
            `[sse] giving up after ${RECONNECT_MAX_RETRIES} consecutive errors for project ${projectId}`,
          );
          return;
        }
        // Recursive call retournant Promise — on .catch explicitement plutôt
        // que `void`-ifier pour éviter qu'une rejection (reconcile throw) ne
        // remonte en unhandled promise rejection. Extrait en const pour rester
        // sous la limite sonarjs/no-nested-functions (≤ 4 niveaux).
        const fireReconnect = (): void => {
          this.startPendingsStream(projectId).catch(logReconnectError);
        };
        reconnectTimer = setTimeout(fireReconnect, backoff);
        backoff = Math.min(backoff * 2, RECONNECT_MAX_MS);
      };
    },

    stopPendingsStream(): void {
      stop();
      backoff = RECONNECT_INITIAL_MS;
      consecutiveErrors = 0;
    },
  };
}
