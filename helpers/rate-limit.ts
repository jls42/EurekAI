import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';

const COMMON_OPTS = {
  standardHeaders: 'draft-7' as const,
  legacyHeaders: false,
};

export const authLimiter: RateLimitRequestHandler = rateLimit({
  ...COMMON_OPTS,
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Trop de requetes — reessayez plus tard.' },
});

export const aiLimiter: RateLimitRequestHandler = rateLimit({
  ...COMMON_OPTS,
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Trop de requetes IA — patientez quelques secondes.' },
});
