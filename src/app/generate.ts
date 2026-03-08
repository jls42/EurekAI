import { getLocale } from '../i18n/index';

export function createGenerate() {
  return {
    blockedModerationStatus(this: any): string | null {
      const selected =
        this.selectedIds.length > 0
          ? this.sources.filter((s: any) => this.selectedIds.includes(s.id))
          : this.sources;
      return (
        selected.find((s: any) => s.moderation && s.moderation.status !== 'safe')?.moderation
          ?.status ?? null
      );
    },

    moderationBlockedMessage(this: any, status: string | null): string {
      if (status === 'pending') return this.t('moderation.pending');
      if (status === 'error') return this.t('moderation.error');
      return this.t('moderation.blocked');
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
        };
        const res = await fetch('/api/projects/' + projectId + '/generate/' + type, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
            () => this.generate(type),
          );
          return;
        }
        if (this.currentProjectId !== projectId) return;
        const gen = await res.json();
        if (gen.type === 'summary' && gen.data) {
          if (!gen.data.citations) gen.data.citations = [];
          if (!gen.data.vocabulary) gen.data.vocabulary = [];
          if (!gen.data.key_points) gen.data.key_points = [];
        }
        this.initGenProps(gen);
        this.generations.push(gen);
        this.openGens[gen.id] = true;
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
      this.loading.all = true;

      const controller = new AbortController();
      this.abortControllers.all = controller;

      const body = {
        sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
        lang: getLocale(),
        ageGroup: this.currentProfile?.ageGroup || 'enfant',
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
        for (const r of [summaryRes, flashcardsRes, quizRes]) {
          if (r.ok) {
            const gen = await r.json();
            if (gen.type === 'summary' && gen.data) {
              if (!gen.data.citations) gen.data.citations = [];
              if (!gen.data.vocabulary) gen.data.vocabulary = [];
              if (!gen.data.key_points) gen.data.key_points = [];
            }
            this.initGenProps(gen);
            this.generations.push(gen);
            this.openGens[gen.id] = true;
          }
        }
        this.showToast(this.t('toast.allGenerated'), 'success', null, {
          label: this.t('toast.view'),
          fn: () => this.goToView('dashboard'),
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        this.showToast(this.t('toast.generationError', { error: e.message }), 'error', () =>
          this.generateAll(),
        );
      } finally {
        this.loading.all = false;
        delete this.abortControllers.all;
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

      try {
        const body = {
          sourceIds: this.selectedIds.length > 0 ? this.selectedIds : undefined,
          lang: getLocale(),
          ageGroup: this.currentProfile?.ageGroup || 'enfant',
        };
        const res = await fetch('/api/projects/' + projectId + '/generate/auto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json();
          this.showToast(
            this.t('toast.error', { error: this.resolveError(err.error || res.statusText) }),
            'error',
            () => this.generateAuto(),
          );
          return;
        }
        if (this.currentProjectId !== projectId) return;
        const result = await res.json();
        if (result.generations) {
          for (const gen of result.generations) {
            if (gen.type === 'summary' && gen.data) {
              if (!gen.data.citations) gen.data.citations = [];
              if (!gen.data.vocabulary) gen.data.vocabulary = [];
              if (!gen.data.key_points) gen.data.key_points = [];
            }
            this.initGenProps(gen);
            this.generations.push(gen);
            this.openGens[gen.id] = true;
          }
        }
        this.showToast(this.t('toast.magicDone'), 'success', null, {
          label: this.t('toast.view'),
          fn: () => this.goToView('dashboard'),
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return;
        this.showToast(this.t('toast.autoError', { error: e.message }), 'error', () =>
          this.generateAuto(),
        );
      } finally {
        this.loading.auto = false;
        delete this.abortControllers.auto;
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
              audioEl.play().catch(() => {});
            }
          });
        }
      } catch {
        this.showToast(this.t('toast.audioError'), 'error', () => this.generateVoice(gen));
      } finally {
        gen._generatingVoice = false;
      }
    },
  };
}
