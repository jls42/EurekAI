import { getLocale } from '../i18n/index';
import { normalizeSummaryData } from './helpers';
import { addCostDelta } from './cost-utils';
import { AUTO_AGENTS_SET, AUTO_AGENT_TYPES } from '../../generators/auto-agents';
import type { AppContext } from './app-context';
import type { Generation, Source } from '../../types';

const TOAST_GENERATION_ERROR = 'toast.generationError';
const TOAST_ERROR = 'toast.error';
const TOAST_VIEW = 'toast.view';

type GenerationUI = Generation & {
  _playlistMode?: boolean;
  _activeAudioSection?: string;
  [key: string]: unknown;
};

type FailedSection = {
  section: string;
  code: string;
};

type VoiceResult = {
  audioUrl?: string;
  audioUrls?: Record<string, string>;
  failedSections?: FailedSection[];
  costDelta?: number;
};

export function postJson(body: unknown, signal: AbortSignal): RequestInit {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
}

export function registerGeneration(state: AppContext, gen: Generation): void {
  normalizeSummaryData(gen);
  state.initGenProps(gen);
  // openGens AVANT upsert pour préserver la valeur initiale du `x-init $watch`
  // dans quizVocalComponent (cf. helpers.ts applyGenerationEvent même fix). Si
  // openGens est posé après le push, la transition undefined→true déclenche
  // playQuestion() et le quiz vocal démarre tout seul.
  state.openGens[gen.id] = true;
  // Idempotent : upsertGenerationById évite les doublons quand le payload 200
  // fallback ET l'event SSE 'completed' arrivent tous les deux dans le même
  // onglet. Si gid existe déjà dans state.generations, remplace au lieu de push.
  state.upsertGenerationById(gen);
  addCostDelta(state, gen.estimatedCost, `generate/${gen.type}`);
}

export async function aggregateGenerateResults(
  responses: Response[],
  state: AppContext,
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

export function showGenerateAllResult(failures: number, total: number, state: AppContext): void {
  if (failures > 0 && failures < total) {
    state.showToast(state.t('toast.partialGenerated', { count: total - failures }), 'warning');
  } else if (failures >= total) {
    state.showToast(state.t(TOAST_GENERATION_ERROR), 'error');
  } else {
    state.showToast(state.t('toast.allGenerated'), 'success', null, {
      label: state.t(TOAST_VIEW),
      fn: () => state.goToView('dashboard'),
    });
  }
}

type AutoBody = {
  sourceIds?: string[];
  lang: string;
  ageGroup: string;
  useConsigne: boolean;
  count: number;
};

type AutoRoute = { plan: Array<{ agent: string }>; costDelta?: number };

export function buildGenerateBody(state: AppContext): AutoBody {
  return {
    sourceIds: state.selectedIds.length > 0 ? state.selectedIds : undefined,
    lang: getLocale(),
    ageGroup: state.currentProfile?.ageGroup || 'enfant',
    useConsigne: state.useConsigne,
    count: state.generateCount,
  };
}

export async function runAutoRoute(
  state: AppContext,
  projectId: string,
  body: AutoBody,
  controller: AbortController,
): Promise<AutoRoute | null> {
  const routeRes = await fetch(
    // eslint-disable-next-line sonarjs/no-duplicate-string -- required: SSRF taint analysis needs literal inline near fetch
    '/api/projects/' + projectId + '/generate/route',
    postJson(body, controller.signal),
  );
  if (!routeRes.ok) {
    const err = await routeRes.json().catch(() => ({}));
    state.showToast(
      state.t(TOAST_ERROR, { error: state.resolveError(err.error || routeRes.statusText) }),
      'error',
      () => state.generateAuto(),
    );
    return null;
  }
  const route = (await routeRes.json()) as AutoRoute;
  if (route.costDelta) addCostDelta(state, route.costDelta, 'generate/route');
  return route;
}

export function populateAutoPlan(
  state: AppContext,
  plan: Array<{ agent: string }>,
  plannedTypes: string[],
  controller: AbortController,
): void {
  const ttsTypes = new Set(['podcast', 'quiz-vocal']);
  state.loading.auto = false;
  delete state.abortControllers.auto;
  for (const step of plan) {
    if (ttsTypes.has(step.agent) && !state.apiStatus.ttsAvailable) continue;
    // Whitelist defense-in-depth : rejette tout agent hors contrat serveur
    // (AUTO_AGENTS_SET, source unique dans generators/auto-agents.ts).
    if (!AUTO_AGENTS_SET.has(step.agent)) continue;
    plannedTypes.push(step.agent);
    state.loading[step.agent] = true;
    state.abortControllers[step.agent] = controller;
  }
}

type StepResult = 'success' | 'aborted' | 'failed';

export async function runAutoStep(
  state: AppContext,
  type: string,
  projectId: string,
  body: AutoBody,
  controller: AbortController,
  allowedUrls: Set<string>,
): Promise<StepResult> {
  if (!AUTO_AGENTS_SET.has(type)) return 'failed';
  // eslint-disable-next-line sonarjs/no-duplicate-string -- required: SSRF taint analysis needs literal inline near fetch
  const url = '/api/projects/' + projectId + '/generate/' + type;
  // Whitelist canonique (cf. commit 00af5f2, rule-node-ssrf) : `allowedUrls.has(url)`
  // immédiatement avant `fetch(url, ...)` dans la même fonction.
  if (!allowedUrls.has(url)) return 'failed';
  try {
    const res = await fetch(url, postJson(body, controller.signal));
    if (state.currentProjectId !== projectId) return 'aborted';
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error(`auto: ${type} failed (${res.status}):`, err.error || res.statusText);
      return 'failed';
    }
    registerGeneration(state, await res.json());
    state.showToast(
      state.t('toast.generationDone', { type: state.t('gen.' + type) }),
      'success',
      null,
      { label: state.t(TOAST_VIEW), fn: () => state.goToView(type) },
    );
    return 'success';
  } catch (e: unknown) {
    if (e instanceof Error && e.name === 'AbortError') return 'aborted';
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`auto: ${type} error:`, msg);
    return 'failed';
  } finally {
    state.loading[type] = false;
    delete state.abortControllers[type];
    state.$nextTick(() => state.refreshIcons());
  }
}

export async function runAutoSteps(
  state: AppContext,
  plannedTypes: string[],
  projectId: string,
  body: AutoBody,
  controller: AbortController,
): Promise<number> {
  const allowedUrls = new Set(
    AUTO_AGENT_TYPES.map((t) => '/api/projects/' + projectId + '/generate/' + t),
  );
  let failures = 0;
  const promises = plannedTypes.map(async (type) => {
    const result = await runAutoStep(state, type, projectId, body, controller, allowedUrls);
    if (result === 'failed') failures++;
  });
  await Promise.all(promises);
  return failures;
}

export function showAutoResult(state: AppContext, failures: number, plannedCount: number): void {
  if (failures > 0 && failures < plannedCount) {
    state.showToast(
      state.t('toast.partialGenerated', { count: plannedCount - failures }),
      'warning',
    );
  } else if (failures >= plannedCount) {
    state.showToast(state.t(TOAST_GENERATION_ERROR), 'error');
  } else {
    state.showToast(state.t('toast.magicDone'), 'success', null, {
      label: state.t(TOAST_VIEW),
      fn: () => state.goToView('dashboard'),
    });
  }
}

export function handleGenerateHttpError(
  state: AppContext,
  type: string,
  res: Response,
  err: { error?: string },
): void {
  state.showToast(
    state.t(TOAST_ERROR, { error: state.resolveError(err.error || res.statusText) }),
    'error',
    () => state.generate(type),
  );
}

export function handleGenerateSuccess(state: AppContext, type: string, gen: Generation): void {
  registerGeneration(state, gen);
  // showToast avec eventKey idempotent : si l'event SSE 'completed' arrive en
  // premier (peu probable mais possible), le toast UI ne sera pas dupliqué et
  // la notif persistée n'aura qu'une seule entrée pour ce gid.
  state.showToast(
    state.t('toast.generationDone', { type: state.t('gen.' + type) }),
    'success',
    null,
    { label: state.t(TOAST_VIEW), fn: () => state.goToView(type) },
    `generation:${gen.id}:completed`,
  );
}

/** Pre-flight check for generate / generateAll / generateAuto. Returns false
 * (with optional moderation toast) when the action cannot proceed. Caller
 * reads `this.currentProjectId` directly afterwards — keeping the projectId
 * source as a literal property access avoids re-tainting the URL flow for
 * Codacy `rule-node-ssrf`. */
export function canStartGenerate(state: AppContext, type?: string): boolean {
  if (!state.currentProjectId) return false;
  if (type && state.loading[type]) return false;
  const moderationStatus = state.blockedModerationStatus();
  if (state.currentProfile?.useModeration && moderationStatus) {
    state.showToast(state.moderationBlockedMessage(moderationStatus), 'error');
    return false;
  }
  return true;
}

export function handleGenerateError(state: AppContext, type: string, e: unknown): void {
  if (e instanceof Error && e.name === 'AbortError') return;
  console.error('[generate]', type, e);
  state.showToast(state.t(TOAST_GENERATION_ERROR), 'error', () => state.generate(type));
}

// Toast dispatché par code pour les partial-fails (action user vs warning vs partial générique),
// sinon success final. Pas de double toast (warning + success) sur partial — ambigu pour l'user.
const showVoiceToast = (state: AppContext, failed?: FailedSection[]): void => {
  if (!failed?.length) {
    state.showToast(state.t('toast.audioDone'), 'success');
    return;
  }
  const codes = new Set(failed.map((f) => f.code));
  if (codes.has('auth_required')) state.showToast(state.t('toast.audioAuthRequired'), 'error');
  else if (codes.has('quota_exceeded'))
    state.showToast(state.t('toast.audioQuotaExceeded'), 'warning');
  else state.showToast(state.t('toast.audioPartial'), 'warning');
};

export function applyVoiceResult(
  state: AppContext,
  gen: GenerationUI,
  result: VoiceResult,
  section?: string,
): void {
  if (result.audioUrls) {
    const audioUrls = result.audioUrls;
    const sectionOrder = state._audioSectionOrder;
    for (const [s, url] of Object.entries(audioUrls)) {
      gen[`_audioUrl_${s}`] = url;
    }
    gen._activeAudioSection = sectionOrder.find((s: string) => audioUrls[s]) || 'intro';
    gen._playlistMode = true;
  } else {
    gen[`_audioUrl_${section || 'all'}`] = result.audioUrl;
    gen._activeAudioSection = section || 'intro';
    gen._playlistMode = false;
  }
  if (result.costDelta) addCostDelta(state, result.costDelta, 'read-aloud');
  showVoiceToast(state, result.failedSections);
  state.$nextTick(() => {
    const audioEl = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
    if (audioEl) {
      audioEl.load();
      audioEl.play().catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn('Auto-play blocked:', msg);
      });
    }
  });
}

export function createGenerate() {
  return {
    blockedModerationSource(this: AppContext) {
      const selected =
        this.selectedIds.length > 0
          ? this.sources.filter((s: Source) => this.selectedIds.includes(s.id))
          : this.sources;
      return selected.find((s: Source) => s.moderation && s.moderation.status !== 'safe') ?? null;
    },

    blockedModerationStatus(this: AppContext): string | null {
      return this.blockedModerationSource()?.moderation?.status ?? null;
    },

    moderationBlockedMessage(this: AppContext, status: string | null): string {
      if (status === 'pending') return this.t('moderation.pending');
      if (status === 'error') return this.t('moderation.error');
      const src = this.blockedModerationSource();
      const cats = src ? this.flaggedCategoryLabels(src) : '';
      return this.t('moderation.blocked') + (cats ? ` (${cats})` : '');
    },

    async generate(this: AppContext, type: string) {
      if (!canStartGenerate(this, type)) return;
      const projectId = this.currentProjectId;
      if (!projectId) return;
      // gid généré côté client = identifiant stable utilisable IMMÉDIATEMENT par
      // pendingById, abortControllersByGid et l'eventKey de la notif fallback.
      // Pas besoin d'attendre la réponse serveur pour relier l'event SSE au fetch.
      const gid = crypto.randomUUID();
      this.loading[type] = true;
      const controller = new AbortController();
      this.abortControllers[type] = controller;
      this.abortControllersByGid[gid] = controller;
      this.pendingById[gid] = {
        id: gid,
        type: type as 'summary' | 'flashcards' | 'quiz' | 'podcast' | 'quiz-vocal' | 'image' | 'fill-blank',
        status: 'pending',
        startedAt: new Date().toISOString(),
        sourceIds: [...this.selectedIds],
      };
      try {
        // fetch inline avec projectId lu directement de this.currentProjectId pour
        // préserver l'analyse taint Codacy `rule-node-ssrf` — cf. CLAUDE.md section Sécurité.
        const res = await fetch(
          '/api/projects/' + projectId + '/generate/' + type,
          postJson({ ...buildGenerateBody(this), gid }, controller.signal),
        );
        if (this.currentProjectId !== projectId) return;
        if (!res.ok) {
          // Validation early serveur (no_sources, context_too_large, moderation,
          // duplicate_gid, race cancel/fail = 409). Aucun event SSE ne nettoiera
          // le pending optimiste — cleanup local ici.
          delete this.pendingById[gid];
          handleGenerateHttpError(this, type, res, await res.json().catch(() => ({})));
          return;
        }
        // Payload 200 fallback IDEMPOTENT avec SSE : si SSE down au moment du
        // retour, cette branche garantit le feedback. SSE rejouera mais
        // upsertGenerationById + showToast(eventKey) sont idempotents.
        delete this.pendingById[gid];
        handleGenerateSuccess(this, type, await res.json());
      } catch (e: unknown) {
        if (this.currentProjectId !== projectId) return;
        // AbortError (cancel local) ou autre : cleanup pending optimiste local.
        delete this.pendingById[gid];
        handleGenerateError(this, type, e);
      } finally {
        // Guard projectId au cleanup pour ne pas effacer un nouveau pending si
        // l'utilisateur a switché de projet entre temps. Le pending courant
        // est nettoyé par les branches above ou par event SSE.
        if (this.currentProjectId === projectId) {
          this.loading[type] = false;
          delete this.abortControllers[type];
          delete this.abortControllersByGid[gid];
        }
        this.$nextTick(() => this.refreshIcons());
      }
    },

    async generateAll(this: AppContext) {
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
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') return;
        console.error('[generate:all]', e);
        this.showToast(this.t(TOAST_GENERATION_ERROR), 'error', () => this.generateAll());
      } finally {
        for (const type of allTypes) {
          this.loading[type] = false;
          delete this.abortControllers[type];
        }
        this.$nextTick(() => this.refreshIcons());
      }
    },

    async generateAuto(this: AppContext) {
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
        const body = buildGenerateBody(this);
        const route = await runAutoRoute(this, projectId, body, controller);
        if (!route) return;
        if (this.currentProjectId !== projectId) return;
        populateAutoPlan(this, route.plan, plannedTypes, controller);
        const failures = await runAutoSteps(this, plannedTypes, projectId, body, controller);
        if (this.currentProjectId !== projectId) return;
        showAutoResult(this, failures, plannedTypes.length);
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') return;
        console.error('[generate:auto]', e);
        this.showToast(this.t('toast.autoError'), 'error', () => this.generateAuto());
      } finally {
        this.loading.auto = false;
        delete this.abortControllers.auto;
        // Les types individuels se nettoient dans leurs propres finally ; ceci
        // attrape les cas d'abort précoce avant que les promises démarrent.
        for (const type of plannedTypes) {
          this.loading[type] = false;
          delete this.abortControllers[type];
        }
        this.$nextTick(() => this.refreshIcons());
      }
    },

    _audioSectionOrder: ['intro', 'key_points', 'fun_fact', 'vocabulary'],

    isBatchComplete(gen: GenerationUI): boolean {
      if (!gen._audioUrl_intro || !gen._audioUrl_key_points) return false;
      const d = gen.data as { fun_fact?: string; vocabulary?: unknown[] } | undefined;
      if (d?.fun_fact && !gen._audioUrl_fun_fact) return false;
      if (d?.vocabulary?.length && !gen._audioUrl_vocabulary) return false;
      return true;
    },

    playNextSection(this: AppContext, gen: GenerationUI) {
      if (!gen._playlistMode) return;
      const order = this._audioSectionOrder;
      const idx = order.indexOf(gen._activeAudioSection ?? 'intro');
      for (let i = idx + 1; i < order.length; i++) {
        if (gen[`_audioUrl_${order[i]}`]) {
          gen._activeAudioSection = order[i];
          this.$nextTick(() => {
            const a = document.querySelector(`audio[data-gen-id="${gen.id}"]`) as HTMLAudioElement;
            if (a) {
              a.load();
              a.play().catch((e: unknown) => {
                const msg = e instanceof Error ? e.message : String(e);
                console.warn('Audio play failed:', msg);
              });
            }
          });
          return;
        }
      }
      gen._playlistMode = false;
    },

    initSummaryAudio(gen: GenerationUI) {
      const d = gen.data as { audioUrls?: Record<string, string>; audioUrl?: string } | undefined;
      if (!d) return;
      if (d.audioUrls) {
        for (const [s, url] of Object.entries(d.audioUrls)) {
          gen[`_audioUrl_${s}`] = url;
        }
        gen._activeAudioSection = Object.keys(d.audioUrls)[0];
      } else if (d.audioUrl) {
        gen._audioUrl_intro = d.audioUrl;
        gen._activeAudioSection = 'intro';
      }
    },

    playSection(this: AppContext, gen: GenerationUI, section: string | null) {
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
          a.play().catch((e: unknown) => {
            const msg = e instanceof Error ? e.message : String(e);
            console.warn('Audio play failed:', msg);
          });
        }
      });
    },

    async generateVoice(this: AppContext, gen: GenerationUI, section?: string) {
      const key = section || 'all';
      const busyKey = `_generatingVoice_${key}`;
      if (gen[busyKey]) return;
      gen[busyKey] = true;
      try {
        const body: Record<string, unknown> = { lang: getLocale() };
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
          this.showToast(this.t(TOAST_ERROR, { error: err.error || res.statusText }), 'error', () =>
            this.generateVoice(gen, section),
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
