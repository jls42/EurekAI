type Level = 'info' | 'warn' | 'error';

const FN: Record<Level, (...data: unknown[]) => void> = {
  info: (...data) => console.log(...data),
  warn: (...data) => console.warn(...data),
  error: (...data) => console.error(...data),
};

function log(level: Level, prefix: string, ...args: unknown[]) {
  const ts = new Date().toISOString().slice(11, 23); // HH:mm:ss.SSS
  FN[level](`${ts} ${level.toUpperCase()} [${prefix}]`, ...args);
}

export const logger = {
  info: (prefix: string, ...args: unknown[]) => log('info', prefix, ...args),
  warn: (prefix: string, ...args: unknown[]) => log('warn', prefix, ...args),
  error: (prefix: string, ...args: unknown[]) => log('error', prefix, ...args),
};
