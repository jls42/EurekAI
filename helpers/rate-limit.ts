import rateLimit, { type Options, type RateLimitRequestHandler } from 'express-rate-limit';

const COMMON_OPTS: Partial<Options> = {
  standardHeaders: 'draft-7',
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
