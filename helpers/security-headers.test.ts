/* eslint-disable @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-return --
   Codacy typed lint resolves Vitest/expect imports as error typed on new test files. */
import { describe, expect, it } from 'vitest';

import { createHelmetOptions } from './security-headers.js';

function directivesFor(options: ReturnType<typeof createHelmetOptions>) {
  return options.contentSecurityPolicy.directives;
}

describe('createHelmetOptions', () => {
  it('garde CSP active en production avec les directives applicatives', () => {
    const options = createHelmetOptions(true);
    const directives = directivesFor(options);

    expect(options.crossOriginEmbedderPolicy).toBe(false);
    expect(options.contentSecurityPolicy).not.toBe(false);
    expect(directives['script-src']).toEqual(["'self'", "'unsafe-inline'", "'unsafe-eval'"]);
    expect(directives['style-src']).toEqual(["'self'", "'unsafe-inline'"]);
    expect(directives['img-src']).toEqual(["'self'", 'data:', 'blob:']);
    expect(directives['media-src']).toEqual(["'self'", 'blob:']);
    expect(directives['upgrade-insecure-requests']).toBeUndefined();
    expect(directives['connect-src']).toBeUndefined();
  });

  it('garde CSP active en dev avec les exceptions Vite HMR', () => {
    const options = createHelmetOptions(false);
    const directives = directivesFor(options);

    expect(options.contentSecurityPolicy).not.toBe(false);
    expect(directives['connect-src']).toEqual([
      "'self'",
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'ws://localhost:5173',
      'ws://127.0.0.1:5173',
    ]);
    expect(directives['script-src']).toEqual([
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ]);
    expect(directives['style-src']).toEqual([
      "'self'",
      "'unsafe-inline'",
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ]);
    expect(directives['upgrade-insecure-requests']).toBeNull();
  });
});
