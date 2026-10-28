import { Router, type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';
import type { Mistral } from '@mistralai/mistralai';
import type { AutoRunStepInit, ProjectStore } from '../store.js';
import type { ProfileStore } from '../profiles.js';
import type { AutoRun, AutoRunRequest, FailedStepCode } from '../types.js';
import { resolveClient } from '../helpers/mistral-client-factory.js';
import { withKeyedSlots } from '../helpers/keyed-slots.js';
import { extractErrorCode } from '../helpers/error-codes.js';
import { persistUsage } from '../helpers/cost-persist.js';
import type { ApiUsage } from '../helpers/pricing.js';
import { logger } from '../helpers/logger.js';
import { INVALID_INPUT, isUuidV4 } from '../helpers/request-validation.js';
import {
  buildGenerationDefs,
  planAutoRun,
  prepareAutoLaunch,
  runTrackedGeneration,
  type GenContextBase,
} from './generate.js';

// Lot Auto côté serveur : le navigateur lance (POST …/generate/auto/start, réponse 202 immédiate),
// le serveur analyse puis enchaîne les étapes, chacune par le cœur des générations simples. Le
// lot survit au rechargement de la page ; règles et décisions : .claude/rules/auto-runs.md.

// Décisions du propriétaire du 2026-10-25.
export const MAX_ACTIVE_AUTO_RUNS = 10;
export const MAX_STEPS_PER_KEY = 3;
export const AUTO_RUN_MAX_MS = 30 * 60 * 1000;
const BUSY_RETRY_AFTER_S = 30;

const ERR_AUTO_BUSY = 'auto_busy';
const ERR_AUTO_RUN_NOT_FOUND = 'auto_run_not_found';
const ERR_PROJECT_NOT_FOUND = 'project_not_found';

type StepFailureCode = Exclude<FailedStepCode, 'cancelled'>;

// Lot en cours dans CE process. Le client Mistral (clé du lancement) ne vit qu'ici : jamais écrit
// sur disque, dans un événement ou un journal, et oublié à la fin du lot ou à son délai maximal.
interface ActiveAutoRun {
  client: Mistral;
  // Empreinte de la clé : places des étapes (MAX_STEPS_PER_KEY par clé, tous lots confondus).
  fingerprint: string;
  // Délai maximal atteint ou erreur inattendue : plus aucune étape ne part.
  stopped: boolean;
}

// Clé du registre : cours ET runId (le runId vient du navigateur : deux cours lancés avec le même
// partageaient une entrée, le plafond était contourné et la fin de l'un retirait l'autre).
const activeRuns = new Map<string, ActiveAutoRun>();

const activeRunKey = (pid: string, runId: string): string => `${pid}:${runId}`;

// Retire l'entrée seulement si c'est encore la sienne.
const forgetActiveRun = (pid: string, runId: string, active: ActiveAutoRun): void => {
  const key = activeRunKey(pid, runId);
  if (activeRuns.get(key) === active) activeRuns.delete(key);
};

/** Lots en cours dans ce process (plafond MAX_ACTIVE_AUTO_RUNS, tests). */
export const activeAutoRunCount = (): number => activeRuns.size;

interface AutoBatch {
  store: ProjectStore;
  profileStore: ProfileStore;
  pid: string;
  runId: string;
  ctx: GenContextBase;
  request: AutoRunRequest;
  active: ActiveAutoRun;
}

type GenerationDefs = ReturnType<typeof buildGenerationDefs>;

// Corps d'une étape : celui capturé au lancement, sources retenues au lancement comprises.
const stepBody = (request: AutoRunRequest): Record<string, unknown> => ({ ...request });

// Lot arrêté de l'intérieur (délai maximal, erreur inattendue) : analyse en échec avec `code`, ou
// étapes encore en cours en échec avec `code` (le lot se termine alors en `completed`).
const abandonAutoRun = (b: AutoBatch, code: StepFailureCode): void => {
  b.active.stopped = true;
  if (b.store.failAutoRun(b.pid, b.runId, code)) return;
  const run = b.store.getAutoRun(b.pid, b.runId);
  for (const step of run?.steps ?? []) {
    if (step.status === 'pending') b.store.markPendingFailed(b.pid, step.gid, code);
  }
};

// Délai maximal (30 min) : étapes encore en cours en échec `upstream_unavailable` (le code d'un délai
// dépassé chez Mistral), clé oubliée tout de suite. Un appel déjà en vol finit sans être promu.
const expireAutoRun = (b: AutoBatch): void => {
  logger.warn('auto', `run expired after ${AUTO_RUN_MAX_MS / 60000} min: run=${b.runId}`);
  forgetActiveRun(b.pid, b.runId, b.active);
  abandonAutoRun(b, 'upstream_unavailable');
};

const failedAnalysis = (b: AutoBatch, e: unknown): void => {
  const failedUsage = (e as { apiUsage?: ApiUsage[] }).apiUsage;
  if (failedUsage?.length) {
    const route = `POST /api/projects/${b.pid}/generate/auto/route/failed`;
    persistUsage(b.store, b.pid, route, failedUsage);
  }
  logger.error('auto', 'analysis error:', e);
  b.store.failAutoRun(b.pid, b.runId, extractErrorCode(e, 'route'));
};

const routePlan = async (b: AutoBatch) => {
  try {
    return await planAutoRun(b.store, b.active.client, b.ctx);
  } catch (e) {
    failedAnalysis(b, e);
    return null;
  }
};

// Analyse, puis toutes les étapes posées en une écriture. null : analyse en échec, ou lot plus en
// analyse (annulé pendant le routage, délai dépassé, cours supprimé) — aucune étape ne part.
const analyseAutoRun = async (b: AutoBatch): Promise<AutoRunStepInit[] | null> => {
  const plan = await routePlan(b);
  if (!plan) return null;
  const steps = plan.executable.map((step) => ({ agent: step.agent, gid: randomUUID() }));
  const skipped = plan.skipped.map((step) => step.agent);
  const started = b.store.startAutoRunSteps(b.pid, b.runId, steps, skipped, plan.cost);
  return started ? steps : null;
};

// Une étape, à son tour parmi les places de sa clé. Annulée pendant l'attente (sa puce, le lot) ou
// lot arrêté : rien ne part. Sinon le cœur refait toutes les gardes ; son issue est déjà dans le
// tracker et dans le lot (refus, échec, annulation : les autres étapes continuent).
const runAutoStep = async (
  b: AutoBatch,
  step: AutoRunStepInit,
  defs: GenerationDefs,
): Promise<void> => {
  if (b.active.stopped || b.store.pendingStatus(b.pid, step.gid) !== 'pending') return;
  try {
    const outcome = await runTrackedGeneration({
      store: b.store,
      profileStore: b.profileStore,
      client: b.active.client,
      pid: b.pid,
      gid: step.gid,
      body: stepBody(b.request),
      def: defs[step.agent],
      preTracked: true,
    });
    logger.info('auto', `${step.agent}: ${outcome.kind}`);
  } catch (e) {
    logger.error('auto', `${step.agent} unexpected error:`, e);
    b.store.markPendingFailed(b.pid, step.gid, extractErrorCode(e, step.agent));
  }
};

// Étapes dans l'ordre du plan, au plus MAX_STEPS_PER_KEY en vol par clé (tous lots confondus) : la
// file de withKeyedSlots suit l'ordre des appels, donc celui du plan.
const runAutoSteps = async (b: AutoBatch, steps: AutoRunStepInit[]): Promise<void> => {
  const defs = buildGenerationDefs(b.store);
  await Promise.all(
    steps.map((step) =>
      withKeyedSlots(b.active.fingerprint, MAX_STEPS_PER_KEY, () => runAutoStep(b, step, defs)),
    ),
  );
};

const runAutoBatch = async (b: AutoBatch): Promise<void> => {
  const deadline = setTimeout(() => expireAutoRun(b), AUTO_RUN_MAX_MS);
  deadline.unref();
  try {
    const steps = await analyseAutoRun(b);
    if (steps) await runAutoSteps(b, steps);
  } catch (e) {
    logger.error('auto', `unexpected batch error: run=${b.runId}`, e);
    abandonAutoRun(b, 'internal_error');
  } finally {
    clearTimeout(deadline);
    forgetActiveRun(b.pid, b.runId, b.active);
  }
};

// Réponse au lancement qui ne crée pas de lot : renvoi du même runId (202, le lot existant), autre
// lot actif sur ce cours (409 auto_busy, avec ce lot), trop de lots dans ce process (429).
type StartShortcut = { status: number; body: Record<string, unknown>; retryAfter?: number };

const conflictFor = (store: ProjectStore, pid: string, runId: string): StartShortcut | null => {
  const existing = store.getAutoRun(pid, runId);
  if (existing) return { status: 202, body: { run: existing } };
  const active = store.getActiveAutoRun(pid);
  if (active) return { status: 409, body: { error: ERR_AUTO_BUSY, run: active } };
  if (activeRuns.size >= MAX_ACTIVE_AUTO_RUNS) {
    return { status: 429, body: { error: 'rate_limited' }, retryAfter: BUSY_RETRY_AFTER_S };
  }
  return null;
};

const sendShortcut = (res: Response, shortcut: StartShortcut): void => {
  if (shortcut.retryAfter) res.setHeader('Retry-After', String(shortcut.retryAfter));
  res.status(shortcut.status).json(shortcut.body);
};

const requestOf = (ctx: GenContextBase, body: unknown): AutoRunRequest => {
  const useConsigne = (body as { useConsigne?: unknown }).useConsigne !== false;
  const request: AutoRunRequest = {
    lang: ctx.lang,
    ageGroup: ctx.ageGroup,
    sourceIds: ctx.sourceIds,
    useConsigne,
  };
  if (ctx.count !== undefined) request.count = ctx.count;
  return request;
};

const newAutoRun = (runId: string, request: AutoRunRequest): AutoRun => {
  const now = new Date().toISOString();
  return {
    id: runId,
    status: 'analysing',
    startedAt: now,
    updatedAt: now,
    request,
    steps: [],
    skipped: [],
  };
};

interface AutoLaunch {
  store: ProjectStore;
  profileStore: ProfileStore;
  pid: string;
  runId: string;
  ctx: GenContextBase;
  request: AutoRunRequest;
  active: ActiveAutoRun;
}

// Création atomique (store.createAutoRun re-vérifie le lot actif et le runId), puis analyse et
// étapes en arrière-plan : la réponse part tout de suite.
const launchAutoRun = (l: AutoLaunch, res: Response): void => {
  const shortcut = conflictFor(l.store, l.pid, l.runId);
  if (shortcut) {
    sendShortcut(res, shortcut);
    return;
  }
  const run = newAutoRun(l.runId, l.request);
  const created = l.store.createAutoRun(l.pid, run);
  if (created !== 'created') {
    const fallback = { status: 404, body: { error: ERR_PROJECT_NOT_FOUND } };
    sendShortcut(res, conflictFor(l.store, l.pid, l.runId) ?? fallback);
    return;
  }
  activeRuns.set(activeRunKey(l.pid, l.runId), l.active);
  runAutoBatch(l).catch((e: unknown) =>
    logger.error('auto', `batch cleanup error: run=${l.runId}`, e),
  );
  res.status(202).json({ run });
};

// Ordre des gardes : clé (auth-first), runId, projet, lot déjà lancé ou actif, plafond de lots,
// puis celles de l'analyse de route (reprise des modérations jusqu'à 8 s, corps, modération,
// sources, consigne, contexte) ; avant tout appel facturé et toute écriture.
const startAutoRun = async (
  store: ProjectStore,
  profileStore: ProfileStore,
  req: Request,
  res: Response,
): Promise<void> => {
  const resolved = resolveClient(req);
  if (!resolved.ok) {
    res.status(resolved.status).json({ error: resolved.error });
    return;
  }
  const pid = String(req.params.pid);
  const runId: unknown = (req.body as { runId?: unknown } | undefined)?.runId;
  if (!isUuidV4(runId)) {
    res.status(400).json({ error: INVALID_INPUT });
    return;
  }
  const early = store.getProject(pid)
    ? conflictFor(store, pid, runId)
    : { status: 404, body: { error: ERR_PROJECT_NOT_FOUND } };
  if (early) {
    sendShortcut(res, early);
    return;
  }
  const built = await prepareAutoLaunch(store, profileStore, resolved.client, pid, req.body);
  if (!built.ok) {
    res.status(built.status).json({ error: built.error });
    return;
  }
  const active = { client: resolved.client, fingerprint: resolved.fingerprint, stopped: false };
  const request = requestOf(built.ctx, req.body);
  launchAutoRun({ store, profileStore, pid, runId, ctx: built.ctx, request, active }, res);
};

export function autoRunRoutes(store: ProjectStore, profileStore: ProfileStore): Router {
  const router = Router();
  router.post('/:pid/generate/auto/start', (req, res) =>
    startAutoRun(store, profileStore, req, res),
  );
  router.get('/:pid/auto-runs/:runId', (req, res) => {
    const run = store.getAutoRun(String(req.params.pid), String(req.params.runId));
    if (!run) {
      res.status(404).json({ error: ERR_AUTO_RUN_NOT_FOUND });
      return;
    }
    res.json({ run });
  });
  // Lot entier, en une écriture (store.cancelAutoRun) ; une étape seule passe par
  // POST /generations/:gid/cancel et le lot continue. Lot déjà terminé : rendu tel quel.
  router.post('/:pid/auto-runs/:runId/cancel', (req, res) => {
    const run = store.cancelAutoRun(String(req.params.pid), String(req.params.runId));
    if (!run) {
      res.status(404).json({ error: ERR_AUTO_RUN_NOT_FOUND });
      return;
    }
    res.json({ run });
  });
  return router;
}
