import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';

/** Normalize and register a generation into the app state. */
function registerGeneration(state: any, gen: any): void {
  normalizeSummaryData(gen);
  state.initGenProps(gen);
  state.generations.push(gen);
  state.openGens[gen.id] = true;
}

/** Process responses from generateAll, returns failure count. */
async function aggregateGenerateResults(
  responses: Response[],
  state: any,
): Promise<number> {
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

export function createGenerate() {
  return {
    blockedModerationSource(this: any): any | null {
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
        const gen = await res.json();
        registerGeneration(this, gen);
        const viewType = type;
        this.showToast(
          this.t('toast.generationDone', { type: this.t('gen.' + type) }),
          'success',
          null,
          { label: this.t('toast.view'), fn: () => this.goToView(viewType) },
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
      const makeOpts = () => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      try {
        const base = '/api/projects/' + projectId;
        const [summaryRes, flashcardsRes, quizRes] = await Promise.all([
          fetch(base + '/generate/summary', makeOpts()),
          fetch(base + '/generate/flashcards', makeOpts()),
          fetch(base + '/generate/quiz', makeOpts()),
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
        const fetchOpts = () => ({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        // Phase 1: route analysis — shows "Auto — analyse..." chip
        const routeRes = await fetch('/api/projects/' + projectId + '/generate/route', fetchOpts());
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

        // Phase 2: switch to individual type chips (skip TTS types if unavailable)
        const ttsTypes = new Set(['podcast', 'quiz-vocal']);
        this.loading.auto = false;
        delete this.abortControllers.auto;
        for (const step of route.plan) {
          if (ttsTypes.has(step.agent) && !this.apiStatus.ttsAvailable) continue;
          plannedTypes.push(step.agent);
          this.loading[step.agent] = true;
          this.abortControllers[step.agent] = controller;
        }

        // Launch individual generations in parallel
        const base = '/api/projects/' + projectId;
        const responses = await Promise.all(
          plannedTypes.map((type) => fetch(base + '/generate/' + type, fetchOpts())),
        );
        if (this.currentProjectId !== projectId) return;

        let failures = 0;
        for (const r of responses) {
          if (r.ok) {
            registerGeneration(this, await r.json());
          } else {
            failures++;
          }
        }

        if (failures > 0 && failures < plannedTypes.length) {
          this.showToast(this.t('toast.partialGenerated', { count: plannedTypes.length - failures }), 'warning');
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
        for (const type of plannedTypes) {
          this.loading[type] = false;
          delete this.abortControllers[type];
        }
        this.$nextTick(() => this.refreshIcons());
      }
    },

    async generateVoice(this: any, gen: any) {
      if (gen._generatingVoice) return;
      gen._generatingVoice = true;
      try {
        const res = await fetch(this.apiBase() + '/generations/' + gen.id + '/read-aloud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const result = await res.json();
          if (gen.type === 'summary') {
            gen.data.audioUrl = result.audioUrl;
          }
          gen._audioUrl = result.audioUrl;
          this.showToast(this.t('toast.audioDone'), 'success');
          this.$nextTick(() => {
            const audioEl = document.querySelector(
              `audio[data-gen-id="${gen.id}"]`,
            ) as HTMLAudioElement;
            if (audioEl) {
              audioEl.load();
              audioEl.play().catch((e) => console.warn('Auto-play blocked:', e.message));
            }
          });
        } else {
          const err = await res.json().catch(() => ({}));
          this.showToast(
            this.t('toast.error', { error: err.error || res.statusText }),
            'error',
            () => this.generateVoice(gen),
          );
        }
      } catch (e) {
        console.error('Voice generation error:', e);
        this.showToast(this.t('toast.audioError'), 'error', () => this.generateVoice(gen));
      } finally {
        gen._generatingVoice = false;
      }
    },
  };
}
