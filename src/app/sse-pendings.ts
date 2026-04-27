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

export function createPendingsStream() {
  let source: EventSource | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let backoff = RECONNECT_INITIAL_MS;

  const stop = () => {
    if (source) {
      try {
        source.close();
      } catch {
        /* déjà fermé */
      }
      source = null;
    }
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
        } catch {
          /* malformed event, ignore */
        }
        backoff = RECONNECT_INITIAL_MS;
      });
      source.onerror = () => {
        // EventSource auto-reconnect côté browser, mais on contrôle le backoff
        // via une fermeture explicite + retry programmé pour éviter le marteau.
        if (this.currentProjectId !== projectId) {
          stop();
          return;
        }
        try {
          source?.close();
        } catch {
          /* ignore */
        }
        source = null;
        reconnectTimer = setTimeout(() => {
          this.startPendingsStream(projectId);
        }, backoff);
        backoff = Math.min(backoff * 2, RECONNECT_MAX_MS);
      };
    },

    stopPendingsStream(): void {
      stop();
      backoff = RECONNECT_INITIAL_MS;
    },
  };
}
