# TODO — Exploration outils dev

Pistes d'outils à évaluer pour renforcer la prévention des régressions qualité et éviter les allers-retours Codacy/SonarQube. Chaque entrée a un critère GO/NO-GO explicite pour décider après test.

## État actuel (2026-04-18)

- ✅ **Lizard** : garde-fou en pretest (`npm run lint:complexity`), scope `helpers/error-*.ts` uniquement (CCN 8, strict `-i 0`). Via pipx/Python.
- ✅ **ESLint** : config pragmatique legacy (`eslint.config.js`), `@eslint/js` + `typescript-eslint` + `eslint-plugin-sonarjs`. Scripts : `npm run lint`, `npm run lint:fix`, `npm run lint:ci` (bloquant). **Actif en pretest** depuis descente à 0 error.
  - Baseline actuelle : **0 errors + 482 warnings**. `lint:ci` = `eslint . --max-warnings 500` (baseline 482 + marge ~4 %). Toute nouvelle error ou dérive > 500 warnings bloque `npm run test`.
  - Règles bruyantes en `warn` le temps du refactor : `no-explicit-any`, `cognitive-complexity`, `no-duplicate-string`, `todo-tag`.
  - Override tests (`**/*.test.ts`) : `publicly-writable-directories`, `no-unsafe-function-type`, `no-clear-text-protocols`, `no-explicit-any`, `no-duplicate-string` désactivés (faux positifs contextuels dans des mocks/fixtures).
  - `complexity` désactivé dans ESLint (redondant avec Lizard).
- ✅ **Prettier** : `format:check` en workflow manuel (pas en pretest)
- ✅ **vitest** : 1711 tests, `npm run test`
- ⚠️ **24 fonctions legacy** dépassent CCN 8 dans `generators/`, `routes/`, `src/`, `helpers/` (hors scope error-*) — non bloquant actuellement car `lint:complexity` ne les check pas

## Refactor progressif ESLint warnings (status)

- ✅ **Errors** : 79 → 0 (PR `feat/prompts-improvements`, 6 commits séquentiels). `lint:ci` bloquant activé en pretest avec plafond `--max-warnings 500`.
- ⏳ **Warnings** : 482 (baseline). Prochaine étape : descendre progressivement le plafond (450 → 400 → …) au fil des refactors. Règles dominantes :
  - `@typescript-eslint/no-explicit-any` (plus gros volume)
  - `sonarjs/cognitive-complexity` (fonctions héritées en `src/app/*`, `generators/*`, `routes/*`)
  - `sonarjs/no-duplicate-string` (strings de constantes de tests + templates)
  - `sonarjs/todo-tag` (TODO sans owner/date)

Pour chaque descente de plafond : mesurer `npm run lint 2>&1 | grep -c warning`, descendre le seuil à `measured + 10-20` marge, commiter séparément. Ne jamais baisser sans refactor réel sous-jacent.

## Priorité haute

### knip — exports / fichiers / deps non utilisés

**But** : empêcher l'accumulation de code mort. Aurait détecté les résidus des 9 itérations Codacy (`statusCodeFor`, `matchByPattern`, `matchRule`) avant nettoyage manuel.

**Effort** : faible. `npm i -D knip && npx knip`.

**À tester** :
1. Lancer `npx knip` sur l'état actuel, voir le volume de findings
2. Créer `knip.config.ts` avec entry points (`server.ts`, `src/main.ts`, fichiers de test)
3. Intégrer en `pretest` ou `prepush` si signal/bruit acceptable

**Critère GO** : < 15 findings légitimes après config. Si 100+, effort de config disproportionné.

### ESLint + `complexity` rule + `eslint-plugin-sonarjs`

**But** : deuxième garde-fou complexité avec **parseur TS réel** (évite les faux positifs Lizard qu'on a combattus). Apporte aussi `cognitive-complexity` (métrique plus moderne que CCN), `no-duplicated-branches`, `no-identical-functions`.

**Effort** : moyen. Config ESLint from scratch.

**À tester** :
1. `npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-sonarjs`
2. Config minimale : `complexity: ["error", 8]` + `sonarjs/recommended`
3. Lancer sur full codebase, comparer findings avec Lizard sur les 24 legacy warnings
4. Mesurer le taux de faux positifs de chaque outil

**Critère GO** : coverage ≥ Lizard avec moins de faux positifs sur 3 échantillons représentatifs.

## Priorité moyenne

### jscpd — duplication detection

**But** : détecter copy-paste inter-fichiers. Utile quand un refactor split mal (ex: helpers dupliqués dans 2 routes).

**Effort** : faible. `npx jscpd . --threshold 5`.

**À tester** : lancer en one-shot, regarder top 10 findings. Si duplication réelle < 3%, outil surdimensionné pour ce projet.

### dependency-cruiser

**But** : valider règles d'architecture via graph (ex: `error-matchers` ne doit pas importer `error-code-resolution`, circular deps interdits).

**Effort** : moyen (config `.dependency-cruiser.cjs`).

**À tester** : quand l'architecture en couches devient critique (si on ajoute plus de 2 niveaux de helpers internes).

## Priorité basse / optionnel

### Biome

**But** : remplacer ESLint + Prettier par outil unique, plus rapide. Complexity checks inclus.

**Effort** : élevé (migration config + rewrite rules).

**À tester** : seulement si la latence Prettier devient un problème ou si on veut consolider après adoption ESLint.

### Codacy CLI (local)

**But** : reproduire Codacy exactement avant push (Docker/Java).

**Effort** : moyen (setup runner).

**À tester** : uniquement si les allers-retours Codacy redeviennent fréquents malgré les garde-fous npm-natifs (Lizard + ESLint).

## Scope élargissement garde-fou actuel

Quand les 24 warnings CCN legacy seront refactorés (ou documentés via `.codacy.yaml` ignore), élargir le scope de `scripts/check-complexity.sh` :

1. `helpers/*.ts` (ajouter choice-labels, tracked-client, voice-selection, cost-calc, index)
2. `generators/*.ts`
3. `routes/*.ts`
4. `src/**/*.ts`

Chaque élargissement = un commit séparé avec refactor préalable des fonctions > CCN 8 dans le nouveau scope.
