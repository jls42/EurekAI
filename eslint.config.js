import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';

// Config pragmatique pour projet TS legacy sans ESLint précédent.
// Stratégie : règles à fort ROI en error, règles bruyantes en warn le temps
// du refactor progressif, règles redondantes avec d'autres outils en off.
// Activer `--max-warnings 0` en pretest quand la baseline warnings sera < 50.
export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'output/**',
      'coverage/**',
      '.scannerwork/**',
      'public/**',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        fetch: 'readonly',
        crypto: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
      },
    },
    rules: {
      // Gardes à fort ROI — error
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Legacy noise — warn le temps du refactor progressif
      '@typescript-eslint/no-explicit-any': 'warn',
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/todo-tag': 'warn',

      // Redondant avec outil dédié
      complexity: 'off', // Géré par Lizard via scripts/check-complexity.sh
    },
  },
  {
    // Config test files : relâcher les règles strictes
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },
];
