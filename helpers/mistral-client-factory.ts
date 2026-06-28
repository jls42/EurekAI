// Source UNIQUE de construction d'un client Mistral (cf. CLAUDE.md "Clé Mistral navigateur").
// Aucun `new Mistral(...)` ni `trackClient(...)` ne doit exister hors de ce fichier.
//
// La clé n'est jamais persistée côté serveur : elle arrive par requête via le header
// `X-EurekAI-AI-Key` (résolu par le navigateur) avec fallback sur `MISTRAL_API_KEY` (env).
// Les clients construits depuis un header NE sont PAS cachés (la clé utilisateur ne doit
// pas rester en mémoire au-delà de la requête) ; seul l'`envClient` est un singleton.

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-redundant-type-constituents -- Codacy lance son propre ESLint sans résolution de types (Mistral typé `any`, réponses SDK en `error`, accès `req.headers[name]` avec un nom constant) → faux positifs ; cf. CLAUDE.md section Codacy. Notre lint:ci type-aware ne les flague pas. */
import { Mistral as MistralSdk } from '@mistralai/mistralai';
import type { Mistral } from '@mistralai/mistralai';
import type { Request, Response, NextFunction } from 'express';
import { trackClient } from './tracked-client.js';
import { recordUsage } from './usage-context.js';
import { getModelLimits, setModelLimits } from '../config.js';
import { logger } from './logger.js';

const TIMEOUT_MS = 120_000;
const RETRY_CONFIG = {
  strategy: 'backoff' as const,
  backoff: { initialInterval: 500, maxInterval: 10_000, exponent: 1.5, maxElapsedTime: 120_000 },
  retryConnectionErrors: true,
};

const MAX_KEY_LEN = 512;
// Printable ASCII sans espace ni contrôle : anti-CRLF (la clé finit dans un header
// HTTP vers Mistral) tout en restant compatible Base64 (+ / = . autorisés). On ne
// suppose PAS le charset exact Mistral, juste l'absence d'injection d'en-tête.
const KEY_FORMAT_RE = /^[\x21-\x7E]+$/;

export function validateKeyFormat(raw: unknown): raw is string {
  return (
    typeof raw === 'string' &&
    raw.length > 0 &&
    raw.length <= MAX_KEY_LEN &&
    KEY_FORMAT_RE.test(raw)
  );
}

// Discriminant opaque NON réversible d'une clé pour le coalescing consigne (pid+fingerprint).
// CE N'EST PAS un hash de mot de passe stocké/vérifié → un hash NON-crypto (djb2) suffit pour
// distinguer deux clés ; il évite aussi le faux positif CodeQL `js/insufficient-password-hash`
// (qui flague un hash crypto appliqué à un secret). Le fingerprint reste en mémoire, jamais loggé.
export function keyFingerprint(key: string): string {
  let h = 5381;
  for (const ch of key) h = (Math.imul(h, 33) + (ch.codePointAt(0) ?? 0)) >>> 0;
  return h.toString(16);
}

function createRawMistralClient(apiKey: string): unknown {
  return new MistralSdk({ apiKey, timeoutMs: TIMEOUT_MS, retryConfig: RETRY_CONFIG });
}

export function buildTrackedClient(apiKey: string): Mistral {
  const rawClient = createRawMistralClient(apiKey);
  const client = rawClient as Mistral;
  trackClient(client, recordUsage); // track-once : appelé UNE fois par instance.
  return client;
}

interface ModelCard {
  id: string;
  maxContextLength?: number;
  aliases?: string[];
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((alias) => typeof alias === 'string');
}

function modelData(models: unknown): unknown[] {
  if (!models || typeof models !== 'object') return [];
  const descriptor = Object.getOwnPropertyDescriptor(models, 'data');
  const data: unknown = descriptor?.value;
  return Array.isArray(data) ? data : [];
}

function isModelCard(value: unknown): value is ModelCard {
  if (!value || typeof value !== 'object') return false;
  const card = value as { id?: unknown; maxContextLength?: unknown; aliases?: unknown };
  if (typeof card.id !== 'string') return false;
  if (card.maxContextLength !== undefined && typeof card.maxContextLength !== 'number')
    return false;
  return card.aliases === undefined || isStringArray(card.aliases);
}

/** Aplati la liste de modèles Mistral → { id|alias: maxContextLength }. */
export function extractModelLimits(models: unknown): Record<string, number> {
  const limits = new Map<string, number>();
  for (const m of modelData(models)) {
    if (!isModelCard(m)) continue;
    const card = m;
    if (!card.maxContextLength) continue;
    limits.set(card.id, card.maxContextLength);
    for (const alias of card.aliases ?? []) limits.set(alias, card.maxContextLength);
  }
  return modelLimitsRecord(limits);
}

function modelLimitsRecord(limits: Map<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [modelId, maxContextLength] of limits) {
    Object.defineProperty(out, modelId, {
      value: maxContextLength,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }
  return out;
}

// Charge paresseusement les limites de contexte au 1er client résolu si le boot ne
// les a pas chargées (cas .env vide → warmups skippés, mais une clé utilisateur
// arrive). Fire-and-forget, idempotent, ne bloque jamais la requête.
let modelLimitsWarmStarted = false;
async function loadModelLimits(client: Mistral): Promise<void> {
  try {
    const models: unknown = await client.models.list();
    setModelLimits(extractModelLimits(models));
  } catch (e: unknown) {
    modelLimitsWarmStarted = false;
    const message = e instanceof Error ? e.message : String(e);
    logger.warn('models', `lazy limits load failed: ${message}`);
  }
}

function warmModelLimitsOnce(client: Mistral): void {
  if (modelLimitsWarmStarted || Object.keys(getModelLimits()).length > 0) return;
  modelLimitsWarmStarted = true;
  void loadModelLimits(client);
}

// Singleton env : construit au plus une fois si la clé d'env existe (warmups + fallback).
let envClient: Mistral | null | undefined;
export function getEnvClient(): Mistral | null {
  if (envClient !== undefined) return envClient;
  const key = process.env.MISTRAL_API_KEY;
  if (key) {
    envClient = buildTrackedClient(key);
    return envClient;
  }
  envClient = null;
  return envClient;
}
export function hasEnvKey(): boolean {
  return process.env.MISTRAL_API_KEY !== undefined && process.env.MISTRAL_API_KEY !== '';
}
function envFallbackAllowed(allowEnv: boolean): boolean {
  return allowEnv && process.env.EUREKAI_REQUIRE_USER_KEY !== 'true' && hasEnvKey();
}

// Discriminants extraits en const (évite no-duplicate-string sonarjs sur 3 usages runtime).
const KIND_HEADER_INVALID = 'header-invalid';
const KIND_UNSUPPORTED = 'unsupported-provider';

type KeyResolution =
  | { kind: 'header'; key: string }
  | { kind: typeof KIND_HEADER_INVALID }
  | { kind: typeof KIND_UNSUPPORTED }
  | { kind: 'env' }
  | { kind: 'none' };

// Normalise un en-tête (string | string[] | undefined) → première valeur string.
// Accès aux headers par clé LITTÉRALE au call site (cf. resolveApiKey) — évite le faux
// positif "object injection" sur un accès indexé par variable.
function firstHeaderValue(v: string | string[] | undefined): string | undefined {
  if (typeof v === 'string') return v;
  return Array.isArray(v) ? v[0] : undefined;
}

/**
 * Résout la clé d'une requête. Règle anti-facturation silencieuse : un header présent
 * mais malformé NE retombe JAMAIS sur l'env (sinon une clé navigateur cassée facturerait
 * l'hôte). Le fallback env n'est utilisé que si le header est strictement absent.
 */
export function resolveApiKey(req: Request, opts: { allowEnv?: boolean } = {}): KeyResolution {
  const provider = firstHeaderValue(req.headers['x-eurekai-ai-provider']);
  if (provider !== undefined && provider !== 'mistral') return { kind: KIND_UNSUPPORTED };
  const raw = firstHeaderValue(req.headers['x-eurekai-ai-key']);
  if (raw !== undefined && raw !== '') {
    return validateKeyFormat(raw) ? { kind: 'header', key: raw } : { kind: KIND_HEADER_INVALID };
  }
  return envFallbackAllowed(opts.allowEnv !== false) ? { kind: 'env' } : { kind: 'none' };
}

export type ClientResolution =
  | { ok: true; client: Mistral; fingerprint: string }
  | { ok: false; status: 400; error: 'invalid_api_key' | 'unsupported_provider' }
  | { ok: false; status: 401; error: 'auth_required' };

function envResolution(): ClientResolution {
  const client = getEnvClient();
  if (client === null) return { ok: false, status: 401, error: 'auth_required' };
  warmModelLimitsOnce(client);
  return { ok: true, client, fingerprint: keyFingerprint(process.env.MISTRAL_API_KEY ?? '') };
}

function okClientResolution(client: Mistral, key: string): ClientResolution {
  warmModelLimitsOnce(client);
  return { ok: true, client, fingerprint: keyFingerprint(key) };
}

/** Résout un client tracké prêt à l'emploi, ou une erreur HTTP stable (400/401). */
export function resolveClient(req: Request, opts: { allowEnv?: boolean } = {}): ClientResolution {
  const r = resolveApiKey(req, opts);
  if (r.kind === 'header') {
    return okClientResolution(buildTrackedClient(r.key), r.key);
  }
  if (r.kind === 'env') return envResolution();
  if (r.kind === KIND_HEADER_INVALID) return { ok: false, status: 400, error: 'invalid_api_key' };
  if (r.kind === KIND_UNSUPPORTED) {
    return { ok: false, status: 400, error: 'unsupported_provider' };
  }
  return { ok: false, status: 401, error: 'auth_required' };
}

/**
 * Garde Express PRÉ-multer : rejette une requête sans clé utilisable AVANT que multer
 * n'écrive des fichiers temporaires (uploads OCR/STT/quiz-vocal). Ne construit PAS de
 * client (juste un check présence/format) — le handler appelle resolveClient ensuite.
 * (On évite d'augmenter Express.Request, qui casse le typage de req.params.)
 */
export function requireKeyMiddleware(req: Request, res: Response, next: NextFunction): void {
  const r = resolveApiKey(req);
  if (r.kind === 'header' || r.kind === 'env') {
    next();
    return;
  }
  if (r.kind === KIND_UNSUPPORTED) {
    res.status(400).json({ error: 'unsupported_provider' });
    return;
  }
  if (r.kind === KIND_HEADER_INVALID) {
    res.status(400).json({ error: 'invalid_api_key' });
    return;
  }
  res.status(401).json({ error: 'auth_required' });
}
