---
paths:
  - "sonar-project.properties"
  - ".eslintrc.cjs"
  - "eslint.config.js"
  - "knip.json"
  - ".github/workflows/*.yml"
  - "src/styles/*.css"
  - "src/**/*.html"
  - "scripts/check-*.sh"
---

# SonarQube et Codacy

Déplacé tel quel depuis CLAUDE.md (sections « SonarQube », sauf les deux puces sur la quality gate restées dans CLAUDE.md, et « Codacy »), le 2026-10-21.

## SonarQube

- **`void` sur une promesse** : S3735 (« "void" should not be used ») est actif mais exempte les promesses (mesuré : 12 `void <promesse>` préexistants, aucune issue S3735). `void f()` est la forme que reconnaissent S9383 et `no-floating-promises`.
- **JS/TS** : `// NOSONAR(S1234) — raison concise` en **fin de ligne** flaggée (pratique réelle, cf. `generators/image.ts`, `helpers/index.ts`) ou ligne au-dessus.
- **Faux positif `S4325` (assertion inutile)** : le moteur de types de SonarQube est plus permissif que `tsc` (ex: il ignore certains `null` imbriqués). Avant de retirer un cast flaggé S4325, **retirer puis lancer `npm run typecheck`** : si tsc casse, le cast est porteur → faux positif, garder le cast + `// NOSONAR(S4325)` en fin de ligne avec la raison. Sinon, retirer (fix réel). Vérifier aussi qu'aucun import de type ne devient orphelin (eslint/knip).
- **HTML** : NOSONAR ne fonctionne PAS en HTML. Ajouter un texte fallback statique dans les elements `x-text` pour satisfaire les règles d'accessibilité (ex: `<span x-text="title">Chargement…</span>`).
- **CSS : jamais de `!important`** (règle `css:S9423`, ajoutée au profil SonarCloud le 2026-10-18 : 34 issues d'un coup dans `src/styles/main.css`). Inutile avec Tailwind 4 : ses utilitaires vivent dans la couche `utilities`, et une règle de `main.css`, hors couche, l'emporte quelle que soit sa spécificité. Toute animation ou transition du site vit sous `@media (prefers-reduced-motion: no-preference)`, imbriqué dans sa règle : le bloc `reduce` ne remplace plus que les utilitaires et les transitions d'Alpine, sans `!important`. Verrou : `src/styles/styles.test.ts` (aucun `!important`, aucune animation hors de ces blocs). NOSONAR n'est pas documenté pour le CSS : corriger, jamais supprimer.
- Faux positifs fréquents : `S1192` (string duplication) — souvent préférable d'extraire une constante plutôt qu'ignorer. `S3776` / `S6324` (complexity) — croiser avec `npm run lint:complexity` (Lizard CCN 8) avant de supprimer.

## Codacy

- **✅ Correctif systémique en place — `.eslintrc.cjs`** : le moteur de Codacy est **ESLint 8**, qui ne lit QUE le format legacy `.eslintrc.*` (PAS notre flat `eslint.config.js` / ESLint 10). Sans config lisible, il retombait sur son « Default coding standard » type-aveugle → **~3700 faux positifs `no-unsafe-*`** (mesuré via l'API : 4105/4109 findings = son ESLint, dont 3132 `no-unsafe-*`). On fournit désormais un **`.eslintrc.cjs`** (socle `eslint:recommended` + `@typescript-eslint/recommended`, **sans type-checking** car Codacy ne résout pas `parserServices`) que Codacy lit **à la place** de son standard → les FP disparaissent. ESLint 10 (local + CI) **ignore** ce fichier : il est dans les `ignores` de `eslint.config.js` ET dans `ignore` de `knip.json`. **La vérité type-aware reste `npm run lint:ci`** (flat config + `tsconfig.eslint.json`), bloquant en CI. **NE PAS supprimer `.eslintrc.cjs`, NE PAS y porter la logique réelle** (c'est un shim externe : les deps `@typescript-eslint/*` qu'il référence sont fournies par l'environnement Codacy, d'où le `knip.json` `ignore`).
- **Contexte / pourquoi ces FP** (historique, avant le shim) — Codacy lance son PROPRE ESLint qui ne résout AUCUN type (pas de `parserOptions.project` fonctionnel dans son sandbox) et n'honore pas notre `argsIgnorePattern: '^_'`. Conséquence : sur tout fichier nouveau/modifié, faux positifs massifs (épisode PR #41 : 55 d'un coup) :
  - `@typescript-eslint/no-unsafe-call` / `-member-access` / `-assignment` car `describe/it/expect` de vitest ET les imports cross-module (ex: `resolvePricing` depuis `@helpers/*`) sont typés `error`.
  - `no-unused-vars` sur les **noms de params de signatures** (méthodes d'interface, alias de type fonction `(key: string) => string`) — purement documentaires mais flaggés « defined but never used ».
- **Codacy HONORE les `eslint-disable` inline** (vérifié : 55 → 0). C'est LE levier de suppression — **JAMAIS `.codacy.yml exclude_paths`** qui retire des fichiers entiers de l'analyse (perte de couverture, refusé sur ce repo). Pattern : `/* eslint-disable <règles> -- raison */` en tête de fichier (tests, petits helpers comme `helpers/ocr-models.test.ts`, `src/app/model-pricing.ts`) ou `// eslint-disable-next-line <règles> -- raison` sur la ligne (fichiers larges, suppression chirurgicale, cf. `src/app/app-context.ts`).
- **Viable en local** car `eslint.config.js` a `reportUnusedDisableDirectives: 'off'` : une directive sans effet local (la règle ne fire pas, types résolus correctement) ne casse PAS `lint:ci --max-warnings 0`. Sans ce flag, les disables seraient « unused » → fail local. Ne PAS réactiver ce flag.
- **Piège nom de règle** : « `'x' is defined but never used` » vient de la règle **base `no-unused-vars`**, PAS `@typescript-eslint/no-unused-vars` (même message, règle différente) — lister LES DEUX : `no-unused-vars, @typescript-eslint/no-unused-vars`. Les findings « unsafe » sont bien les `@typescript-eslint/no-unsafe-*`. Toujours **mesurer** le delta de findings après push (API `gh api repos/jls42/EurekAI/check-runs/<id>/annotations`) avant de conclure quelle règle cibler.
- **`.codacy.yml` ne peut PAS activer/désactiver un outil** (seulement le dashboard Code Patterns) ; il ne supporte que `exclude_paths`/`include_paths` (Java glob, fichier débutant par `---`). La correction de fond est **repo-side via `.eslintrc.cjs`** (cf. 1er point) — préférée au dashboard car **versionnée et reproductible** (forks/CI, pas d'état invisible hors repo). `exclude_paths` reste refusé (perte de couverture). Les `eslint-disable` inline restent le recours **ponctuel** si un finding résiduel passe malgré le shim.
- Rappel (cf. Sécurité) : `// codacy:ignore-next-line` n'existe PAS. Finding **Opengrep/Semgrep** via Codacy → `// nosemgrep` ; finding **ESLint** via Codacy → `// eslint-disable-*` (ci-dessus) ; ne jamais mélanger les syntaxes.
