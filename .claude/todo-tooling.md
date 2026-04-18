# TODO — Exploration outils dev

Pistes d'outils à évaluer pour renforcer la prévention des régressions qualité et éviter les allers-retours Codacy/SonarQube. Chaque entrée a un critère GO/NO-GO explicite pour décider après test.

## État actuel (2026-04-18)

- ✅ **Lizard** : garde-fou en pretest (`npm run lint:complexity`), scope `helpers/error-*.ts` uniquement (CCN 8, strict `-i 0`). Via pipx/Python.
- ✅ **ESLint** : config pragmatique legacy (`eslint.config.js`), `@eslint/js` + `typescript-eslint` + `eslint-plugin-sonarjs`. Scripts : `npm run lint`, `npm run lint:fix`. **Pas en pretest** tant que baseline > 50 errors.
  - Baseline actuelle : **79 errors + 482 warnings** (top errors : `sonarjs/publicly-writable-directories` 31, `no-empty` 8, `sonarjs/slow-regex` 5, `sonarjs/no-identical-functions` 3).
  - Règles bruyantes en `warn` le temps du refactor : `no-explicit-any`, `cognitive-complexity`, `no-duplicate-string`, `todo-tag`.
  - `complexity` désactivé dans ESLint (redondant avec Lizard).
- ✅ **Prettier** : `format:check` en workflow manuel (pas en pretest)
- ✅ **vitest** : 1711 tests, `npm run test`
- ⚠️ **24 fonctions legacy** dépassent CCN 8 dans `generators/`, `routes/`, `src/`, `helpers/` (hors scope error-*) — non bloquant actuellement car `lint:complexity` ne les check pas

## Refactor progressif ESLint errors

Objectif : passer de 79 errors → 0 errors, puis activer `--max-warnings N` progressif en pretest.

1. **`sonarjs/publicly-writable-directories`** (31) — audit : chaque occurrence est-elle légitime (serveur Node manipulant `/tmp` sous contrôle) ou vraie vulnérabilité ? Soit fix, soit eslint-disable ciblé avec raison.
2. **`no-empty`** (8) — catch blocks vides. Ajouter au minimum un commentaire expliquant pourquoi on swallow.
3. **`sonarjs/slow-regex`** (5) — potentiel ReDoS. Revoir les regex concernées, possiblement remplacer par parseur déterministe (pattern déjà utilisé dans `helpers/choice-labels.ts`).
4. **`sonarjs/no-identical-functions`** (3) — factoriser les duplicatas.
5. Autres (< 5 chacun) — cas par cas.

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
