type Level = 'info' | 'warn' | 'error';

function log(level: Level, prefix: string, ...args: unknown[]) {
  const ts = new Date().toISOString().slice(11, 23); // HH:mm:ss.SSS
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  fn(`${ts} ${level.toUpperCase()} [${prefix}]`, ...args);
}

export const logger = {
  info: (prefix: string, ...args: unknown[]) => log('info', prefix, ...args),
  warn: (prefix: string, ...args: unknown[]) => log('warn', prefix, ...args),
  error: (prefix: string, ...args: unknown[]) => log('error', prefix, ...args),
};
