import { redactSecrets } from './redact.js';

type Level = 'info' | 'warn' | 'error';

function writeLog(level: Level, ...data: unknown[]): void {
  switch (level) {
    case 'info':
      console.log(...data);
      return;
    case 'warn':
      console.warn(...data);
      return;
    case 'error':
      console.error(...data);
      return;
  }
}

// Redaction structurée centrale : aucun chemin warn/error/info ne peut fuiter un
// secret connu (clé d'env, headers `x-eurekai-ai-key`/`authorization`). Cf. redact.ts.
function log(level: Level, prefix: string, ...args: unknown[]) {
  const ts = new Date().toISOString().slice(11, 23); // HH:mm:ss.SSS
  const safe = args.map((a) => redactSecrets(a));
  writeLog(level, `${ts} ${level.toUpperCase()} [${prefix}]`, ...safe);
}

export const logger = {
  info: (prefix: string, ...args: unknown[]) => log('info', prefix, ...args),
  warn: (prefix: string, ...args: unknown[]) => log('warn', prefix, ...args),
  error: (prefix: string, ...args: unknown[]) => log('error', prefix, ...args),
};
