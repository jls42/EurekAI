import type { RequestHandler } from 'express';
import rateLimit, { type Options, type RateLimitRequestHandler } from 'express-rate-limit';

// Corps de TOUT refus d'un limiteur (429) : code stable, traduit par le front
// (`errorCode.rate_limited`, `profile.pinRateLimited` pour le PIN), jamais de texte libre (cf.
// CLAUDE.md « Codes d'erreur API »). Le délai d'attente part dans l'en-tête `Retry-After`
// (secondes), posé par express-rate-limit sur le 429 dès que `standardHeaders` est actif.
const RATE_LIMITED_BODY = { error: 'rate_limited' };

const COMMON_OPTS: Partial<Options> = {
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: RATE_LIMITED_BODY,
};

const ONE_MINUTE_MS = 60 * 1000;
const FIFTEEN_MINUTES_MS = 15 * ONE_MINUTE_MS;

// Création de profil (POST /api/profiles) : 30 / 15 min par IP. La liste des profils n'a que
// generalLimiter, leurs modifications et suppressions passent par pinLimiter.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- express-rate-limit types resolve loosely under Codacy's strict ESLint config
export const authLimiter: RateLimitRequestHandler = rateLimit({
  ...COMMON_OPTS,
  windowMs: FIFTEEN_MINUTES_MS,
  limit: 30,
});

// Tentative de PIN : même règle que les routes, qui ne vérifient qu'un `pin` non vide.
const hasPinAttempt = (body: unknown): boolean => {
  return Boolean((body as { pin?: unknown } | null | undefined)?.pin);
};

// PIN parental (PUT et DELETE /api/profiles/:id) : 10 PIN faux / 15 min par IP. Seuls les refus
// (403) comptent : une requête sans PIN n'est ni comptée ni bloquée (`skip`), un bon PIN et toute
// autre réponse sont décomptés à la fin de la réponse (`skipSuccessfulRequests`), le 429 compris
// (le verrou ne s'allonge pas). Au-delà : 429 pour tout PIN, bon compris, jusqu'à la fin de la
// fenêtre. Monté après express.json (lit req.body). Compteurs en mémoire : un redémarrage du
// serveur les remet à zéro. Limite connue (mesurée) : une requête avec PIN interrompue par le
// client avant la fin de la réponse reste comptée (le décompte suit l'événement `finish`).
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- express-rate-limit types resolve loosely under Codacy's strict ESLint config
export const pinLimiter: RateLimitRequestHandler = rateLimit({
  ...COMMON_OPTS,
  windowMs: FIFTEEN_MINUTES_MS,
  limit: 10,
  skip: (req) => !hasPinAttempt(req.body),
  skipSuccessfulRequests: true,
  requestWasSuccessful: (_req, res) => res.statusCode !== 403,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- express-rate-limit types resolve loosely under Codacy's strict ESLint config
export const aiLimiter: RateLimitRequestHandler = rateLimit({
  ...COMMON_OPTS,
  windowMs: ONE_MINUTE_MS,
  limit: 60,
});

// Limiter general "anti-flood" pour TOUTES les routes /api. Volontairement
// permissif (300 req/min ~= 5 req/s par IP) pour ne pas casser le polling
// frontend (status, projects refresh, SSE setup). Defense en profondeur contre
// scrappers ou clients buggués, pas une protection metier (cf. authLimiter/aiLimiter).
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- express-rate-limit types resolve loosely under Codacy's strict ESLint config
export const generalLimiter: RateLimitRequestHandler = rateLimit({
  ...COMMON_OPTS,
  windowMs: ONE_MINUTE_MS,
  limit: 300,
});

// Routes qui appellent l'IA (LLM, TTS, STT, OCR, modération) sous /api/projects/:pid/ :
// generate, sources, chat, detect-consigne, moderate, et sous generations/:gid/ les deux seules
// routes IA de generationCrudRoutes (vocal-answer, read-aloud). Drapeau `i` et barre finale
// tolérée : le routage d'Express 5 ignore la casse et accepte `/read-aloud/` (mesuré), sans eux
// `/GENERATE/summary` échappait à la limite. /events (SSE) et les tentatives, renommage,
// suppression et annulation d'une génération n'appellent pas l'IA : hors aiLimiter.
export const AI_PATH_RE =
  /^\/api\/projects\/[^/]+\/(?:(?:generate|sources|chat|detect-consigne|moderate)(?:\/|$)|generations\/[^/]+\/(?:vocal-answer|read-aloud)\/?$)/i;

// Monté au niveau de l'app, AVANT les routeurs : une seule passe par requête (un routeur qui
// montait aussi aiLimiter comptait deux fois le chat), avant la résolution de la clé et multer.
export const aiPathLimiter: RequestHandler = (req, res, next) => {
  if (AI_PATH_RE.test(req.path)) {
    aiLimiter(req, res, next);
    return;
  }
  next();
};
