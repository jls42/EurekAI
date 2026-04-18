import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
export default defineConfig({
  // Alias aligné sur vite.config.ts pour que les imports `@helpers` compilent en test.
  resolve: { alias: { '@helpers': resolve(__dirname, 'helpers') } },
  test: {
    globals: true,
    include: ['**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'public'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts', 'routes/**/*.ts', 'generators/**/*.ts', 'helpers/**/*.ts', '*.ts'],
      exclude: [
        '**/*.test.ts',
        'node_modules/**',
        'dist/**',
        'vitest.config.ts',
        'vite.config.ts',
        'vite-env.d.ts',
        'src/env.d.ts',
        'types.ts',
        'server.ts',
        'src/components/fill-blank-validate.ts',
      ],
    },
  },
});
