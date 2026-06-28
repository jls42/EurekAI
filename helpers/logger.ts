import { redactSecrets } from './redact.js';

type Level = 'info' | 'warn' | 'error';

const FN: Record<Level, (...data: unknown[]) => void> = {
  info: (...data) => console.log(...data),
  warn: (...data) => console.warn(...data),
  error: (...data) => console.error(...data),
};

// Redaction structurée centrale : aucun chemin warn/error/info ne peut fuiter un
// secret connu (clé d'env, headers `x-eurekai-ai-key`/`authorization`). Cf. redact.ts.
function log(level: Level, prefix: string, ...args: unknown[]) {
  const ts = new Date().toISOString().slice(11, 23); // HH:mm:ss.SSS
  const safe = args.map((a) => redactSecrets(a));
  FN[level](`${ts} ${level.toUpperCase()} [${prefix}]`, ...safe);
}

export const logger = {
  info: (prefix: string, ...args: unknown[]) => log('info', prefix, ...args),
  warn: (prefix: string, ...args: unknown[]) => log('warn', prefix, ...args),
  error: (prefix: string, ...args: unknown[]) => log('error', prefix, ...args),
};
