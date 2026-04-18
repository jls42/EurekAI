import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';
import { addCostDelta } from './cost-utils';
import { AUTO_AGENTS_SET } from '../../generators/auto-agents';

/** Build POST options with JSON body and abort signal for generate endpoints. */
function postJson(body: unknown, signal: AbortSignal): RequestInit {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
}

/** Normalize and register a generation into the app state. */
export function registerGeneration(state: any, gen: any): void {
  normalizeSummaryData(gen);
  state.initGenProps(gen);
  state.generations.push(gen);
  state.openGens[gen.id] = true;
  addCostDelta(state, gen.estimatedCost, `generate/${gen.type}`);
}

/** Process responses from generateAll, returns failure count. */
async function aggregateGenerateResults(responses: Response[], state: any): Promise<number> {
  let failures = 0;
  for (const r of responses) {
    if (r.ok) {
      registerGeneration(state, await r.json());
    } else {
      failures++;
      const err = await r.json().catch(() => ({}));
      console.error(`generateAll failed (${r.status}):`, err.error || r.statusText);
    }
  }
  return failures;
}

/** Show appropriate toast after generateAll completes. */
function showGenerateAllResult(failures: number, total: number, state: any): void {
  if (failures > 0 && failures < total) {
    state.showToast(state.t('toast.partialGenerated', { count: total - failures }), 'warning');
  } else if (failures >= total) {
    state.showToast(state.t('toast.generationError', { error: 'all' }), 'error');
  } else {
    state.showToast(state.t('toast.allGenerated'), 'success', null, {
      label: state.t('toast.view'),
      fn: () => state.goToView('dashboard'),
    });
  }
}

function applyVoiceResult(state: any, gen: any, result: any, section?: string): void {
  if (result.audioUrls) {
    const sectionOrder = state._audioSectionOrder;
    for (const [s, url] of Object.entries(result.audioUrls)) {
      gen[`_audioUrl_${s}`] = url;
    }
    gen._activeAudioSection = sectionOrder.find((s: string) => result.audioUrls[s]) || 'intro';
    gen._playlistMode = true;
    if (result.failedSections?.length) {
      state.showToast(state.t('toast.audioPartial'), 'warning');
    }
  } else {
    gen[`_audioUrl_${section || 'all'}`] = result.audioUrl;
    gen._activeAudioSection = section || 'intro';
    gen._playlistMode = false;
  }
  if (result.costDelta) addCostDelta(state, result.costDelta, 'read-aloud');
  state.showToast(state.t('toast.audioDone'), 'success');
  state.$nextTick(() => {
    const audioEl = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
    if (audioEl) {
      audioEl.load();
      audioEl.play().catch((e: any) => console.warn('Auto-play blocked:', e.message));
    }
  });
}

export function createGenerate() {
  return {
    blockedModerationSource(this: any) {
      const selected =
        this.selectedIds.length > 0
          ? this.sources.filter((s: any) => this.selectedIds.includes(s.id))
          : this.sources;
      return selected.find((s: any) => s.moderation && s.moderation.status !== 'safe') ?? null;
    },

    blockedModerationStatus(this: any): string | null {
      return this.blockedModerationSource()?.moderation?.status ?? null;
    },

    moderationBlockedMessage(this: any, status: string | null): string {
      if (status === 'pending') return this.t('moderation.pending');
      if (status === 'error') return this.t('moderation.error');
      const src = this.blockedModerationSource();
      const cats = src ? this.flaggedCategoryLabels(src) : '';
      return this.t('moderation.blocked') + (cats ? ` (${cats})` : '');
    },

    async generate(this: any, type: string) {
      if (!this.currentProjectId || this.loading[type]) return;
      const moderationStatus = this.blockedModerationStatus();
      if (this.currentProfile?.useModeration && moderationStatus) {
        this.showToast(this.moderationBlockedMessage(moderationStatus), 'error');
        return;
      }
      const projectId = this.currentProjectId;
      this.loading[type] = true;

      const controller = new AbortController();
      this.abortControllers[type] = controller;

      try {
        const body = {
          sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
          lang: getLocale(),
          ageGroup: this.currentProfile?.ageGroup || 'enfant',
          useConsigne: this.useConsigne,
          count: this.generateCount,
        };
        const res = await fetch('/api/projects/' + projectId + '/generate/' + type, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
            () => this.generate(type),
          );
          return;
        }
        if (this.currentProjectId !== projectId) return;
        registerGeneration(this, await res.json());
        this.showToast(
          this.t('toast.generationDone', { type: this.t('gen.' + type) }),
          'success',
          null,
          { label: this.t('toast.view'), fn: () => this.goToView(type) },
        );
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        this.showToast(this.t('toast.generationError', { error: e.message }), 'error', () =>
          this.generate(type),
        );
      } finally {
        this.loading[type] = false;
        delete this.abortControllers[type];
        this.$nextTick(() => this.refreshIcons());
      }
    },

    async generateAll(this: any) {
      if (!this.currentProjectId) return;
      const moderationStatus = this.blockedModerationStatus();
      if (this.currentProfile?.useModeration && moderationStatus) {
        this.showToast(this.moderationBlockedMessage(moderationStatus), 'error');
        return;
      }
      const projectId = this.currentProjectId;
      const allTypes = ['summary', 'flashcards', 'quiz'];
      const controller = new AbortController();
      for (const type of allTypes) {
        this.loading[type] = true;
        this.abortControllers[type] = controller;
      }

      const body = {
        sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
        lang: getLocale(),
        ageGroup: this.currentProfile?.ageGroup || 'enfant',
        useConsigne: this.useConsigne,
      };
      try {
        const base = '/api/projects/' + projectId;
        const [summaryRes, flashcardsRes, quizRes] = await Promise.all([
          fetch(base + '/generate/summary', postJson(body, controller.signal)),
          fetch(base + '/generate/flashcards', postJson(body, controller.signal)),
          fetch(base + '/generate/quiz', postJson(body, controller.signal)),
        ]);
        if (this.currentProjectId !== projectId) return;
        const responses = [summaryRes, flashcardsRes, quizRes];
        const failures = await aggregateGenerateResults(responses, this);
        showGenerateAllResult(failures, responses.length, this);
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        this.showToast(this.t('toast.generationError', { error: e.message }), 'error', () =>
          this.generateAll(),
        );
      } finally {
        for (const type of allTypes) {
          this.loading[type] = false;
          delete this.abortControllers[type];
        }
        this.$nextTick(() => this.refreshIcons());
      }
    },

    async generateAuto(this: any) {
      if (!this.currentProjectId) return;
      const moderationStatus = this.blockedModerationStatus();
      if (this.currentProfile?.useModeration && moderationStatus) {
        this.showToast(this.moderationBlockedMessage(moderationStatus), 'error');
        return;
      }
      const projectId = this.currentProjectId;
      this.loading.auto = true;

      const controller = new AbortController();
      this.abortControllers.auto = controller;
      const plannedTypes: string[] = [];

      try {
        const body = {
          sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
          lang: getLocale(),
          ageGroup: this.currentProfile?.ageGroup || 'enfant',
          useConsigne: this.useConsigne,
          count: this.generateCount,
        };

        // Phase 1: route analysis — shows "Auto — analyse..." chip
        const routeRes = await fetch(
          '/api/projects/' + projectId + '/generate/route',
          postJson(body, controller.signal),
        );
        if (!routeRes.ok) {
          const err = await routeRes.json().catch(() => ({}));
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || routeRes.statusText) }),
            'error',
            () => this.generateAuto(),
          );
          return;
        }
        if (this.currentProjectId !== projectId) return;
        const route = await routeRes.json();
        if (route.costDelta) addCostDelta(this, route.costDelta, 'generate/route');

        // Phase 2: switch to individual type chips (skip TTS types if unavailable)
        const ttsTypes = new Set(['podcast', 'quiz-vocal']);
        this.loading.auto = false;
        delete this.abortControllers.auto;
        for (const step of route.plan) {
          if (ttsTypes.has(step.agent) && !this.apiStatus.ttsAvailable) continue;
          // Whitelist defense-in-depth : rejette tout agent hors contrat serveur
          // (AUTO_AGENTS_SET, source unique dans generators/auto-agents.ts).
          // Evite tout SSRF meme en cas de reponse /generate/route corrompue.
          if (!AUTO_AGENTS_SET.has(step.agent)) continue;
          plannedTypes.push(step.agent);
          this.loading[step.agent] = true;
          this.abortControllers[step.agent] = controller;
        }

        // Launch individual generations in parallel, process each as it completes
        const base = '/api/projects/' + projectId;
        let failures = 0;
        const promises = plannedTypes.map(async (type) => {
          if (!AUTO_AGENTS_SET.has(type)) return;
          try {
            // URL relative same-origin /api/projects/:pid/generate/:type — projectId est
            // un UUID genere backend (randomUUID dans store.ts), type est whiteliste
            // deux fois via AUTO_AGENTS_SET.has() (lignes 255 et 265). Pas de SSRF
            // possible (URL relative same-origin, pas de control externe).
            // nosemgrep: rule-node-ssrf
            const res = await fetch(base + '/generate/' + type, postJson(body, controller.signal));
            if (this.currentProjectId !== projectId) return;
            if (res.ok) {
              registerGeneration(this, await res.json());
              this.showToast(
                this.t('toast.generationDone', { type: this.t('gen.' + type) }),
                'success',
                null,
                { label: this.t('toast.view'), fn: () => this.goToView(type) },
              );
            } else {
              failures++;
              const err = await res.json().catch(() => ({}));
              console.error(`auto: ${type} failed (${res.status}):`, err.error || res.statusText);
            }
          } catch (e: any) {
            if (e.name === 'AbortError') return;
            failures++;
            console.error(`auto: ${type} error:`, e.message);
          } finally {
            this.loading[type] = false;
            delete this.abortControllers[type];
            this.$nextTick(() => this.refreshIcons());
          }
        });
        await Promise.all(promises);
        if (this.currentProjectId !== projectId) return;

        if (failures > 0 && failures < plannedTypes.length) {
          this.showToast(
            this.t('toast.partialGenerated', { count: plannedTypes.length - failures }),
            'warning',
          );
        } else if (failures >= plannedTypes.length) {
          this.showToast(this.t('toast.generationError', { error: 'all' }), 'error');
        } else {
          this.showToast(this.t('toast.magicDone'), 'success', null, {
            label: this.t('toast.view'),
            fn: () => this.goToView('dashboard'),
          });
        }
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        this.showToast(this.t('toast.autoError', { error: e.message }), 'error', () =>
          this.generateAuto(),
        );
      } finally {
        this.loading.auto = false;
        delete this.abortControllers.auto;
        // Individual types clean themselves up in their own finally blocks;
        // this catches any leftovers (e.g. early abort before promises start)
        for (const type of plannedTypes) {
          this.loading[type] = false;
          delete this.abortControllers[type];
        }
        this.$nextTick(() => this.refreshIcons());
      }
    },

    /** Playlist section order for summary read-aloud */
    _audioSectionOrder: ['intro', 'key_points', 'fun_fact', 'vocabulary'],

    /** Check if all expected sections for a summary have audio generated */
    isBatchComplete(gen: any): boolean {
      if (!gen._audioUrl_intro || !gen._audioUrl_key_points) return false;
      const d = gen.data;
      if (d?.fun_fact && !gen._audioUrl_fun_fact) return false;
      if (d?.vocabulary?.length && !gen._audioUrl_vocabulary) return false;
      return true;
    },

    /** Play next section in playlist mode */
    playNextSection(this: any, gen: any) {
      if (!gen._playlistMode) return;
      const order = this._audioSectionOrder;
      const idx = order.indexOf(gen._activeAudioSection);
      for (let i = idx + 1; i < order.length; i++) {
        if (gen[`_audioUrl_${order[i]}`]) {
          gen._activeAudioSection = order[i];
          this.$nextTick(() => {
            const a = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
            if (a) {
              a.load();
              a.play().catch((e: any) => console.warn('Audio play failed:', e.message));
            }
          });
          return;
        }
      }
      gen._playlistMode = false;
    },

    /** Initialize audio state from persisted summary data */
    initSummaryAudio(gen: any) {
      if (gen.data.audioUrls) {
        for (const [s, url] of Object.entries(gen.data.audioUrls)) {
          gen[`_audioUrl_${s}`] = url;
        }
        gen._activeAudioSection = Object.keys(gen.data.audioUrls)[0];
      } else if (gen.data.audioUrl) {
        gen._audioUrl_intro = gen.data.audioUrl;
        gen._activeAudioSection = 'intro';
      }
    },

    /** Play a specific section or trigger generation if not yet available */
    playSection(this: any, gen: any, section: string | null) {
      if (section && gen[`_audioUrl_${section}`]) {
        gen._playlistMode = false;
        gen._activeAudioSection = section;
      } else if (!section && this.isBatchComplete(gen)) {
        gen._playlistMode = true;
        gen._activeAudioSection =
          this._audioSectionOrder.find((s: string) => gen[`_audioUrl_${s}`]) || 'intro';
      } else {
        this.generateVoice(gen, section || undefined);
        return;
      }
      this.$nextTick(() => {
        const a = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
        if (a) {
          a.load();
          a.play().catch((e: any) => console.warn('Audio play failed:', e.message));
        }
      });
    },

    async generateVoice(this: any, gen: any, section?: string) {
      const key = section || 'all';
      const busyKey = `_generatingVoice_${key}`;
      if (gen[busyKey]) return;
      gen[busyKey] = true;
      try {
        const body: any = { lang: getLocale() };
        if (section) body.section = section;
        const res = await fetch(this.apiBase() + '/generations/' + gen.id + '/read-aloud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          applyVoiceResult(this, gen, await res.json(), section);
        } else {
          const err = await res.json().catch(() => ({}));
          this.showToast(
            this.t('toast.error', { error: err.error || res.statusText }),
            'error',
            () => this.generateVoice(gen, section),
          );
        }
      } catch (e) {
        console.error('Voice generation error:', e);
        this.showToast(this.t('toast.audioError'), 'error', () => this.generateVoice(gen, section));
      } finally {
        gen[busyKey] = false;
      }
    },
  };
}
