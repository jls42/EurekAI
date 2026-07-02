import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';

const codacySecurityCompatPlugin = {
  rules: {
    'detect-non-literal-fs-filename': {
      meta: { type: 'problem', schema: [] },
      create: () => ({}),
    },
  },
};

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
      // Config legacy destinée au seul ESLint 8 de Codacy (cf. en-tête du
      // fichier) : hors tsconfig.eslint.json, ne pas la typed-linter ici.
      '.eslintrc.cjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    // reportUnusedDisableDirectives off global : on garde des
    // /* eslint-disable */ ciblés Codacy (qui ne respecte pas certains
    // argsIgnorePattern, ou qui résout des types en `error` côté son
    // typed-linting). Localement ces directives apparaissent "unused"
    // car ESLint trouve déjà la rule inactive — sans cette option,
    // `lint:ci --max-warnings 0` échouerait.
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      // tsconfig.eslint.json : config dédiée au linting qui inclut TOUT le
      // code TS (racine + src/) avec lib DOM + types vitest. Sans ça, le
      // tsconfig racine qui exclut src/ ferait résoudre vi/spyOn en `error`
      // côté typed-linting → cascade @typescript-eslint/no-unsafe-*.
      // Ce tsconfig est utilisé UNIQUEMENT par ESLint (et par les outils qui
      // respectent parserOptions.project comme Codacy) ; tsc --noEmit utilise
      // toujours tsconfig.json racine.
      parserOptions: {
        project: './tsconfig.eslint.json',
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
    plugins: {
      // Compat locale pour les suppressions inline de règles Codacy-only.
      // La sécurité réelle reste portée par npm run security, CodeQL et Sonar.
      security: codacySecurityCompatPlugin,
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
