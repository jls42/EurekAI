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
      // .mjs scripts utilisent leur propre runtime (Node sans tsconfig) —
      // hors du scope du typed-linting, projectService ne les résout pas.
      'scripts/**/*.mjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      // projectService: tseslint v8 auto-détecte le tsconfig le plus proche
      // pour chaque fichier (racine pour server/, src/tsconfig.json pour
      // src/). Sans ça, le typed-linting de Codacy résout les types des
      // src/**/*.test.ts via le tsconfig racine qui exclut src/ → vi/spyOn
      // typés `error/any` → règles @typescript-eslint/no-unsafe-* en cascade.
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
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
    // Config test files : relâcher les règles strictes.
    // Les règles désactivées ci-dessous sont des faux positifs récurrents dans un
    // contexte de tests : mocks de fonctions, chemins /tmp contrôlés par le test,
    // URLs http:// dans des fixtures non exposées.
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/publicly-writable-directories': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
    },
  },
  {
    // i18n files contiennent naturellement des traductions répétées entre clés
    // (ex: "Quiz" pour nav.quiz et gen.quiz) — extraire en const n'améliore pas
    // la lisibilité pour des catalogues statiques.
    files: ['src/i18n/*.ts'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
    },
  },
];
