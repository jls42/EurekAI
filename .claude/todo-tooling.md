# TODO — Exploration outils dev

Pistes d'outils à évaluer pour renforcer la prévention des régressions qualité et éviter les allers-retours Codacy/SonarQube. Chaque entrée a un critère GO/NO-GO explicite pour décider après test.

## État actuel (2026-04-18)

- ✅ **Lizard** : garde-fou en pretest (`npm run lint:complexity`), scope **allowlist** de fichiers propres (CCN 8, strict `-i 0`, `-l typescript`). Via pipx/Python. Scope : `helpers/error-*.ts` + `src/app/helpers.ts` + `config.ts`. Section "Refactor progressif Lizard CCN" ci-dessous documente les 23 fonctions restantes à refactorer pour élargir le scope.
  - **Piège `-l javascript` (2026-04-18)** : Lizard en mode walk-dossier avec `-l javascript` ne parse PAS les `.ts` — silencieusement 0 warning. `-l typescript` est obligatoire. Le commit `928393c` avait introduit un garde-fou cassé (faux positif "0 violation"), Codacy a révélé que 23 fonctions > CCN 8 étaient cachées. Fix dans `<this-pr>` : scope restreint à l'allowlist + todo documentée.
  - **Piège `??=`** : chaque `??=` pèse 2 dans le comptage Lizard (nullish check + assignment). Une fonction avec 3 `??=` + un `if &&` monte à CCN 9 — à retenir lors de l'application du fix `prefer-nullish-coalescing`. Leçon vécue : commit `fa3d5f7` → CCN 9 → re-fix via boucle dans `dccd645`.
  - Refactor de `config.ts:saveConfig` (12→5), `config.ts:resolveVoices` (12→2) dans `01672a9` et `profiles.ts:executeDeleteProfile` (9→4) dans `c9d8cf9`.
- ✅ **knip** : garde-fou en pretest (`npm run lint:deadcode`), config minimale `knip.json` (entries = scripts CLI + `src/env.d.ts` ambient, plugins auto pour Express/Vite/Vitest/Husky). Exécution ~1.2s. Baseline post-cleanup : 0 finding. `ignoreExportsUsedInFile: true` pour accommoder le workaround Lizard sur `helpers/error-matchers.ts`. `tailwindcss` dans `ignoreDependencies` (peer de `@tailwindcss/vite`, consommé via classes HTML).
- ✅ **Opengrep** : garde-fou en **pre-push** (`npm run security` via `scripts/check-security.sh`). SAST v1.19.0 fork open-source de Semgrep CE, binaire standalone dans `~/.local/bin/` (install via `scripts/install-opengrep.sh`). Configs `p/security-audit + p/default + p/nodejsscan`, `--severity=ERROR --error`. Scan ~11.8s sur 171 fichiers (trop lent pour pretest). Baseline post-fix : 0 finding ERROR. 1 faux positif `detected-sonarqube-docs-api-key` (SHA256 GitHub Actions pinnee) exclu via `--exclude-rule` documente dans le script. Section dediee dans CLAUDE.md.
- ✅ **ESLint** : config pragmatique legacy (`eslint.config.js`), `@eslint/js` + `typescript-eslint` + `eslint-plugin-sonarjs`. Scripts : `npm run lint`, `npm run lint:fix`, `npm run lint:ci` (bloquant). **Actif en pretest** depuis descente à 0 error.
  - Baseline actuelle : **0 errors + 264 warnings** (2026-04-18 : -219 via refactor `AppContext` dans `src/app/helpers.ts`, `sources.ts`, `profiles.ts`, `generate.ts`). `lint:ci` = `eslint . --max-warnings 300` (baseline 264 + marge ~14 %). Toute nouvelle error ou dérive > 300 warnings bloque `npm run test`.
  - Règles bruyantes en `warn` le temps du refactor : `no-explicit-any`, `cognitive-complexity`, `no-duplicate-string`, `todo-tag`.
  - Override tests (`**/*.test.ts`) : `publicly-writable-directories`, `no-unsafe-function-type`, `no-clear-text-protocols`, `no-explicit-any`, `no-duplicate-string` désactivés (faux positifs contextuels dans des mocks/fixtures).
  - `complexity` désactivé dans ESLint (redondant avec Lizard).
- ✅ **Prettier** : `format:check` en workflow manuel (pas en pretest)
- ✅ **vitest** : 1711 tests, `npm run test`
- ⏳ **23 fonctions > CCN 8** dans le repo (audit `-l typescript` du 2026-04-18, post-fix `executeDeleteProfile`). L'audit précédent "0 fonction" était un faux positif du `-l javascript` qui ne parse pas les `.ts`. Scope `lint:complexity` restreint à l'allowlist `helpers/error-*.ts` + `src/app/helpers.ts` + `config.ts`. Les 23 fonctions sont à refactorer en PR(s) séparée(s) (cf. section "Refactor progressif Lizard CCN" ci-dessous).

## Refactor progressif ESLint warnings (status)

- ✅ **Errors** : 79 → 0 (PR `feat/prompts-improvements`, 6 commits séquentiels). `lint:ci` bloquant activé en pretest avec plafond `--max-warnings 500` → 450 → 300 (2026-04-18).
- ⏳ **Warnings** : 482 → 264 (refactors `AppContext` helpers.ts + sources.ts + profiles.ts + generate.ts, 2026-04-18, 4 commits). Plafond actuel 300. Prochaine étape : descendre à 250 (cibles candidates : `src/app/projects.ts` 17 any, `src/components/quiz-vocal.ts` 17 any, `helpers/tracked-client.ts` 15 any via SDK Mistral types). Règles dominantes :
  - `@typescript-eslint/no-explicit-any` (plus gros volume)
  - `sonarjs/cognitive-complexity` (fonctions héritées en `src/app/*`, `generators/*`, `routes/*`)
  - `sonarjs/no-duplicate-string` (strings de constantes de tests + templates)
  - `sonarjs/todo-tag` (TODO sans owner/date)

Pour chaque descente de plafond : mesurer `npm run lint 2>&1 | grep -c warning`, descendre le seuil à `measured + 10-20` marge, commiter séparément. Ne jamais baisser sans refactor réel sous-jacent.

## Refactor progressif Lizard CCN (status)

**Scope `lint:complexity` actuel** (allowlist stricte, CCN 8) : `helpers/error-code-resolution.ts`, `helpers/error-matchers.ts`, `helpers/error-code-rules.ts`, `helpers/error-codes.ts`, `src/app/helpers.ts`, `config.ts`.

**Scan complet (`pipx run lizard -l typescript --CCN 8 --warnings_only --exclude '*.test.ts' src/ generators/ routes/ helpers/ config.ts server.ts store.ts types.ts`) — 23 violations au 2026-04-18** :

| Fichier | Fonction | CCN | Priorité |
|---|---|---|---|
| `helpers/voice-selection.ts:59` | `scoreVoice` | **15** | P1 — plafond |
| `routes/chat.ts:38` | `validateChatRequest` | **15** | P1 — plafond |
| `routes/chat.ts:218` | (anonymous) | **15** | P1 — plafond |
| `routes/generate.ts:43` | `applyConsigne` | 14 | P1 |
| `routes/profiles.ts:13` | (anonymous) | 14 | P1 |
| `generators/tts-provider.ts:57` | `toMistralVoice` | 13 | P2 |
| `routes/generations.ts:30` | `sectionText` | 13 | P2 |
| `routes/generations.ts:239` | (anonymous) | 12 | P2 |
| `routes/profiles.ts:42` | (anonymous) | 12 | P2 |
| `helpers/tracked-client.ts:39` | `client.audio.transcriptions.complete` (wrapper) | 12 | P2 |
| `helpers/cost-calc.ts:65` | `calculateTotalCost` | 12 | P2 |
| `src/app/profiles.ts:135` | `createProfile` | 12 | P2 |
| `src/app/sources.ts:126` | `handleFiles` | 11 | P2 |
| `src/app/generate.ts:128` | `generate` | 11 | P2 |
| `generators/tts-provider.ts:70` | `listVoices` | 11 | P2 |
| `routes/generations.ts:193` | (anonymous) | 11 | P2 |
| `src/i18n/index.ts:24` | `t` | 10 | P3 |
| `src/app/sources.ts:50` | `_uploadSingleFile` | 10 | P3 |
| `src/app/profiles.ts:52` | `deleteConfirmMessage` | 10 | P3 |
| `routes/sources.ts:50` | `getModerationCategories` | 10 | P3 |
| `helpers/index.ts:108` | `extractAllText` | 10 | P3 |
| `generators/image.ts:12` | `parseChunkRef` | 9 | P3 |
| `helpers/choice-labels.ts:38` | `parseChoiceLabel` | 9 | P3 |

**Ordre de traitement suggéré** :
1. **P1** (CCN ≥ 14, 5 fonctions) — plafond haut, refactor structurant le plus utile
2. **P2** (CCN 11-13, 11 fonctions) — dette modérée
3. **P3** (CCN 9-10, 7 fonctions) — petit nettoyage, parfois un simple early-return suffit

**Protocole** : 1 PR par dossier (`routes/`, `helpers/`, `src/app/`, `generators/`, `src/i18n/`) pour garder la revue focalisée. À chaque fix, ajouter le fichier à l'allowlist du script.

**Ne pas oublier** : le script `scripts/check-complexity.sh` utilise `-l typescript` depuis 2026-04-18 (précédent `-l javascript` ne parsait pas les `.ts` en walk). Toujours vérifier localement avec `pipx run lizard -l typescript --CCN 8 --warnings_only <fichier>` avant de push.

## Priorité haute

### ~~knip~~ — adopté 2026-04-18

Installé en `devDependencies` (v6.4.1). Config `knip.json` minimale, intégré en `pretest` via `lint:deadcode`. Baseline 0 finding après cleanup (3 exports morts supprimés : `getVoiceCache`, re-export `addCostDelta`, type `LangCode`). Exécution ~1.2s, pas de latence notable sur le pretest.

### ~~Opengrep~~ — adopté 2026-04-18

Installé en binaire standalone (v1.19.0, ~40Mo) via `scripts/install-opengrep.sh` dans `~/.local/bin/` (pas de devDependency, le placeholder npm `opengrep@1.0.0` est vide). Garde-fou en **pre-push** (`.husky/pre-push` → `npm run security` → `scripts/check-security.sh`). Configs actives : `p/security-audit + p/default + p/nodejsscan`, `--severity=ERROR --error`.

**Baseline scan complet** (toutes sévérités, configs élargies à `p/trailofbits + p/expressjs + p/typescript + p/javascript + p/owasp-top-ten`) : 28 findings totaux, dont :
- **1 true positive fixé** : `timing_attack_node` sur `profiles.ts:verifyPin` (commit `7e0fb32`) — comparaison hex non constante sur HTTP auth. Fix via `crypto.timingSafeEqual` + check longueur.
- **27 faux positifs** :
  - `detected-sonarqube-docs-api-key` (1x) — SHA256 de GitHub Action pinnee (SonarSource/sonarqube-scan-action@fd88b7d...), pas une vraie API key. **Exclu via `--exclude-rule` global dans check-security.sh**.
  - `autoescape-disabled` (4x) — règle Java JSF flaggant Alpine.js `@keydown.escape="..."` (propriété événement Escape, aucun rapport avec HTML escape). Exclu naturellement par le filtre severity=ERROR (warning).
  - `replaceall-sanitization` (6x) dans `render-utils.ts` — le module entier EST la sanitization HTML, `replaceAll` patterns constants voulus. Note-level.
  - `unsafe-formatstring` (6x) — `console.error(\`...${var}...\`)` template literals JS non vulnérables (printf-style uniquement en C). Note-level.
  - `hardcoded_secrets.node_api_key` (9x) dans `config.test.ts` — `vi.stubEnv('MISTRAL_API_KEY', 'test-key')`, fixtures de test. Exclu par `--exclude='*.test.ts'`.
  - `helmet_header_x_powered_by` (1x) dans `server.ts` — règle "good pattern" qui signale l'absence de `app.disable('x-powered-by')`, or on l'appelle bien. Note-level.

**Timing** : scan complet 11.8s sur 171 fichiers. Trop lent pour pretest (< 5s cible), positionné en pre-push uniquement.

**Pistes d'élargissement** (hors scope PR actuelle) :
- Descendre à `--severity=WARNING` si on veut inclure autoescape-disabled (nécessite suppressions inline Alpine.js — bruit élevé).
- Ajouter `p/owasp-top-ten` en prepush si on veut couvrir plus de patterns (testé : 0 finding supplémentaire sur la baseline actuelle).
- Migrer vers Codacy CLI local si convergence SARIF devient pertinente (même moteur sous-jacent).

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

### ~~jscpd~~ — évalué 2026-04-18, NO-GO

One-shot mesure via `npx jscpd . --threshold 5 --ignore "node_modules/**,dist/**,output/**,coverage/**,.scannerwork/**,public/**,**/*.test.ts"` (hors tests pour mesurer signal code prod).

**Résultats par format** (159 fichiers, 28 455 lignes) :
- TypeScript : **1.41%** (213/15 160 lignes, 23 clones) — **sous seuil 3%**
- Markup HTML : 5.47% (240/4 389 lignes, 19 clones) — patterns Alpine.js légitimes
- Markdown : 32.8% (2 362/7 202 lignes, 69 clones) — traductions README, non-actionnable (générées par `scripts/translate-readme.sh`)
- CSS/JSON/YAML/Bash/JS : 0%

**Verdict NO-GO** : code prod TS déjà propre. Aucun clone TS ne dépasse 14 lignes (bien sous le seuil actionnable de 50 LOC du plan). Pas d'install, pas de config permanente.

**Findings intéressants pour refactor futur ciblé** (hors scope jscpd pretest) :
- `routes/chat.ts` ↔ `routes/generate.ts` : 4 clones de ~12 lignes chacun (lignes 89-151 vs 258-555) — probablement préparation d'appels Mistral factorisable en helper partagé, ~48 lignes totales.
- `src/app/generate.ts` : 5 clones intra-fichier de 8-12 lignes — suggère un helper UI manquant.
- `src/components/quiz.ts` ↔ `flashcards.ts`/`fill-blank.ts`/`quiz-vocal.ts` : 3 clones de 13-14 lignes (Alpine.js setup déjà partiellement factorisé via `step-by-step.ts`, mais restes exploitables).

Ces clones sont trop petits pour justifier jscpd en garde-fou pretest mais peuvent être attaqués opportunément lors de refactors ciblés.

**Re-tester dans 6 mois** si la codebase grossit significativement, ou évaluer **fallow** (Rust, suffix-array, plus performant que jscpd mais jeune en 2026).

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
