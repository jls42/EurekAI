import helmet, { type HelmetOptions } from 'helmet';

type ContentSecurityPolicyConfig = Exclude<
  NonNullable<HelmetOptions['contentSecurityPolicy']>,
  boolean
>;

const cspSelf = "'self'";
const cspUnsafeInline = "'unsafe-inline'";
const cspUnsafeEval = "'unsafe-eval'";
const viteDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const viteDevWsOrigins = ['ws://localhost:5173', 'ws://127.0.0.1:5173'];

function createContentSecurityPolicyConfig(isProduction: boolean): ContentSecurityPolicyConfig {
  const devDirectives: NonNullable<ContentSecurityPolicyConfig['directives']> = isProduction
    ? {}
    : {
        'connect-src': [cspSelf, ...viteDevOrigins, ...viteDevWsOrigins],
        'script-src': [cspSelf, cspUnsafeInline, cspUnsafeEval, ...viteDevOrigins],
        'style-src': [cspSelf, cspUnsafeInline, ...viteDevOrigins],
        'upgrade-insecure-requests': null,
      };

  return {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      // Alpine.js evalue les expressions x-data/x-text/x-on dynamiquement ;
      // unsafe-eval + unsafe-inline sont requis. Audit du DOM regulier
      // recommande pour detecter une injection.
      'script-src': [cspSelf, cspUnsafeInline, cspUnsafeEval],
      'style-src': [cspSelf, cspUnsafeInline],
      // Audio TTS et images generees servies en data:/blob:.
      'img-src': [cspSelf, 'data:', 'blob:'],
      'media-src': [cspSelf, 'blob:'],
      ...devDirectives,
    },
  };
}

export function createHelmetOptions(isProduction: boolean): HelmetOptions {
  return {
    contentSecurityPolicy: createContentSecurityPolicyConfig(isProduction),
    crossOriginEmbedderPolicy: false,
  };
}
