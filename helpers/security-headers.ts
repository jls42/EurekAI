type CspDirectives = Record<string, null | readonly string[]>;
export interface HelmetSecurityOptions {
  contentSecurityPolicy: {
    directives: CspDirectives;
  };
  crossOriginEmbedderPolicy: false;
}

const cspSelf = "'self'";
const cspUnsafeInline = "'unsafe-inline'";
const cspUnsafeEval = "'unsafe-eval'";
const viteDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const viteDevWsOrigins = ['ws://localhost:5173', 'ws://127.0.0.1:5173'];

function createContentSecurityPolicyDirectives(isProduction: boolean): CspDirectives {
  const devDirectives: CspDirectives = isProduction
    ? {}
    : {
        'connect-src': [cspSelf, ...viteDevOrigins, ...viteDevWsOrigins],
        'script-src': [cspSelf, cspUnsafeInline, cspUnsafeEval, ...viteDevOrigins],
        'style-src': [cspSelf, cspUnsafeInline, ...viteDevOrigins],
        'upgrade-insecure-requests': null,
      };

  return {
    // Helmet ajoute ses directives CSP par defaut tant que useDefaults reste actif.
    // Alpine.js evalue les expressions x-data/x-text/x-on dynamiquement ;
    // unsafe-eval + unsafe-inline sont requis. Audit du DOM regulier recommande.
    'script-src': [cspSelf, cspUnsafeInline, cspUnsafeEval],
    'style-src': [cspSelf, cspUnsafeInline],
    // Audio TTS et images generees servies en data:/blob:.
    'img-src': [cspSelf, 'data:', 'blob:'],
    'media-src': [cspSelf, 'blob:'],
    ...devDirectives,
  };
}

export function createHelmetOptions(isProduction: boolean): HelmetSecurityOptions {
  return {
    contentSecurityPolicy: {
      directives: createContentSecurityPolicyDirectives(isProduction),
    },
    crossOriginEmbedderPolicy: false,
  };
}
