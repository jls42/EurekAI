/**
 * .eslintrc.cjs — configuration ESLint LEGACY destinée UNIQUEMENT au moteur
 * ESLint 8 de Codacy.
 *
 * Pourquoi ce fichier existe :
 *   Codacy analyse le code avec ESLint 8, qui ne lit QUE le format legacy
 *   `.eslintrc.*`. Notre configuration réelle est `eslint.config.js` (flat
 *   config, ESLint 10) — qu'ESLint 8 ne sait pas lire. Sans ce fichier, Codacy
 *   ne trouve aucune config, retombe sur son « Default coding standard » et
 *   signale des milliers de faux positifs `no-unsafe-*` : des règles type-aware
 *   qu'il évalue SANS résoudre les types (il voit `vi`, `expect` et les imports
 *   comme `any`). Notre `npm run lint:ci` type-aware, lui, remonte 0.
 *
 * Rôle de ce fichier : donner à Codacy un socle de règles sain, SANS
 * type-checking (Codacy ne résout pas `parserServices`). Les règles type-aware
 * (no-unsafe-*, no-floating-promises, …) restent pleinement appliquées, AVEC
 * les types, par `npm run lint:ci` (eslint.config.js + tsconfig.eslint.json),
 * qui tourne en local ET en CI — c'est la source de vérité du projet.
 *
 * IMPORTANT :
 *   - ESLint 10 (dev local + CI) IGNORE ce fichier au profit de eslint.config.js.
 *   - Ne pas y porter la logique de lint réelle : garder un simple socle
 *     « recommended ». La vérité vit dans eslint.config.js.
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2024, sourceType: 'module' },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: { browser: true, node: true, es2024: true },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'output/',
    'coverage/',
    '.scannerwork/',
    'public/',
    '*.config.js',
    '*.config.ts',
  ],
  rules: {
    // Aligné sur eslint.config.js : bruit legacy assumé, non bloquant chez nous.
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
  overrides: [
    {
      // Fichiers de test : mocks Vitest → fonctions vides et paramètres de
      // signature non consommés sont attendus (pas de dette réelle).
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
