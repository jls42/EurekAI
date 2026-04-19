# Refactor dette qualité — Plan de campagne

Ce fichier pilote la résorption progressive de la dette technique EurekAI sur **8 waves / 8 PRs**, chacune menée dans une session Claude Code dédiée après `/clear`. Les prompts de lancement sont fournis hors de ce fichier (côté utilisateur) mais chaque prompt **référence ce plan comme source de vérité**.

**À lire avant chaque session** : `CLAUDE.md` + `.claude/rules/prompts.md` + `.claude/todo-tooling.md` + ce fichier.

---

## Baseline mesurée — 2026-04-19

| Métrique | État | Détails |
|---|---|---|
| **Vitest** | ✅ 71 files / **1712 tests OK** | `npm test` — 3.45s |
| **Opengrep SAST** | ✅ **0 findings ERROR** | 153 rules / 175 files tracked |
| **ESLint** | ⚠ **263 warnings** (0 errors) | Plafond `--max-warnings 300` |
| ↳ `@typescript-eslint/no-explicit-any` | **226** | 86 % de la dette |
| ↳ `sonarjs/no-duplicate-string` | **37** | 14 % |
| **Lizard CCN > 8** (scope `-l typescript`) | ⚠ **28 fonctions** | Hors allowlist |
| **Allowlist Lizard actuelle** (`scripts/check-complexity.sh`) | 6 fichiers | `helpers/error-*.ts` + `src/app/helpers.ts` + `config.ts` |
| **GitHub checks sur `main`** | ✅ 4/4 verts | Codacy + CodeFactor + SonarCloud + SonarQube |

### Détail des 28 fonctions CCN > 8 (ordre décroissant)

| # | Fichier | Ligne | Fonction | CCN |
|---|---|---|---|---|
| 1 | `scripts/update-pricing.ts` | 13 | `fetchPricing` | **26** |
| 2 | `helpers/voice-selection.ts` | 59 | `scoreVoice` | 15 |
| 3 | `routes/chat.ts` | 38 | `validateChatRequest` | 15 |
| 4 | `routes/chat.ts` | 218 | (anonymous POST handler) | 15 |
| 5 | `routes/generate.ts` | 43 | `applyConsigne` | 14 |
| 6 | `routes/profiles.ts` | 13 | (anonymous GET handler) | 14 |
| 7 | `generators/tts-provider.ts` | 57 | `toMistralVoice` | 13 |
| 8 | `routes/generations.ts` | 30 | `sectionText` | 13 |
| 9 | `helpers/tracked-client.ts` | 39 | `client.audio.transcriptions.complete` wrapper | 12 |
| 10 | `routes/generations.ts` | 239 | (anonymous) | 12 |
| 11 | `routes/profiles.ts` | 42 | (anonymous PUT handler) | 12 |
| 12 | `helpers/cost-calc.ts` | 65 | `calculateTotalCost` | 12 |
| 13 | `scripts/generate-image.ts` | 65 | `generateImage` | 12 |
| 14 | `src/app/profiles.ts` | 139 | `createProfile` | 12 |
| 15 | `src/app/sources.ts` | 126 | `handleFiles` | 11 |
| 16 | `src/app/generate.ts` | 276 | `generate` | 11 |
| 17 | `routes/generations.ts` | 193 | (anonymous) | 11 |
| 18 | `generators/tts-provider.ts` | 70 | `listVoices` | 11 |
| 19 | `routes/sources.ts` | 50 | `getModerationCategories` | 10 |
| 20 | `src/app/sources.ts` | 50 | `_uploadSingleFile` | 10 |
| 21 | `src/app/profiles.ts` | 56 | `deleteConfirmMessage` | 10 |
| 22 | `helpers/index.ts` | 108 | `extractAllText` | 10 |
| 23 | `profiles.ts` | 86 | `list` | 10 |
| 24 | `src/i18n/index.ts` | 24 | `t` | 10 |
| 25 | `routes/sources.ts` | 209 | (anonymous) | 9 |
| 26 | `scripts/generate-image.ts` | 45 | (anonymous) | 9 |
| 27 | `helpers/choice-labels.ts` | 38 | `parseChoiceLabel` | 9 |
| 28 | `generators/image.ts` | 12 | `parseChunkRef` | 9 |

Rafraîchir : `pipx run lizard -l typescript --CCN 8 --warnings_only .`

---

## Objectif final (après 8 waves)

- ✅ **Lizard CCN > 8 = 0 fonction** (allowlist élargie à tout le repo, `-l typescript`)
- ✅ **ESLint warnings = 0** (`--max-warnings 0` en `lint:ci`)
- ✅ **Tests** ≥ 1712 verts (tests de non-régression ajoutés ponctuellement si refactor en révèle)
- ✅ **Security** 0 findings ERROR maintenu
- ✅ **Zéro régression comportementale** (signatures publiques + contrats d'erreurs inchangés)

---

## Règles communes — À LIRE AVANT CHAQUE SESSION

1. **Branche par wave** : `refactor/wave-N-<scope>` (ex: `refactor/wave-1-scripts`). Partir de `main` à jour.
2. **Pas de push main** — toujours PR (règle CLAUDE.md).
3. **Skill `/commit` obligatoire** (règle CLAUDE.md). Jamais `git commit -m` direct sans skill sauf cas spécial (pre-commit hook bloque et exige revalidation).
4. **Tests first** : `npm test` vert en baseline avant tout refactor, vert après chaque commit. Un test qui casse et dont le fix n'est pas évident en 20 min → **stop, rapport, demande**.
5. **Pas de changement comportemental** : signature publique, contrat d'erreurs, sortie = identiques. Si tu DOIS changer le comportement, stop + demande.
6. **Mesurer avant/après** (règle CLAUDE.md "Mesurer > deviner") :
   - **CCN** : `pipx run lizard -l typescript --CCN 8 <fichier>` → afficher le delta dans le commit message
   - **ESLint** : `npm run lint 2>&1 | grep -c warning` → afficher delta
   - **Tests** : `npm test 2>&1 | tail -5`
7. **Allowlist Lizard** : dès qu'un fichier est propre (CCN ≤ 8 partout), l'ajouter à `scripts/check-complexity.sh` dans la même PR. Verrou de régression.
8. **Descente plafond `--max-warnings`** : ne baisser le seuil que si on a effectivement réduit les warnings d'au moins autant. Marge 10-20 warnings de buffer. Jamais baisser à l'aveugle.
9. **Workflow post-push** (règle CLAUDE.md L100) : attendre 60s, `gh pr checks <num>`, surveiller jusqu'à vert. Si fail → **reproduire localement** avant fix (pas itérer à l'aveugle).
10. **Commits atomiques** : 1 commit = 1 fonction refactorée ou 1 logique. Pas de commit "refacto tout le fichier" si découpable. Permet de bisecter facilement.
11. **Pas d'abstraction prématurée** : extraire un helper local si la fonction dépasse 30 lignes ou a un bloc répété 2+ fois. Pas de "helper générique" pour un seul appelant (règle CLAUDE.md "Don't add features…").
12. **Pièges Lizard connus** :
    - `-l typescript` **obligatoire** (sinon parse silencieusement les `.ts` comme JS → 0 violation faux positif)
    - `??=` **compte pour 2** dans le CCN (nullish check + assignment) — à retenir pour `prefer-nullish-coalescing`
    - `export function` top-level consécutifs peuvent être agglomérés par le parseur TS (workaround cf. `helpers/error-matchers.ts`)
13. **Prompts IA — si tu touches à `prompts.ts` ou `generators/*.ts`** : relire `.claude/rules/prompts.md` (anti-leak tokens méta, emphases MAJUSCULES, few-shots — **critique** sinon régression prod).
14. **Cost tracking — si tu touches à `generators/*.ts` ou `helpers/tracked-client.ts`** : tout appel Mistral DOIT rester via `tracked-client`. Jamais `new Mistral(...)` direct dans un generator (règle CLAUDE.md).
15. **NOSONAR / nosemgrep / nosonar** : n'ajouter que si **mesuré** que le finding est un faux positif (règle CLAUDE.md "Mesurer > deviner"). Syntaxe : `// NOSONAR(Sxxxx) — raison` en fin de ligne.
16. **Fin de wave** : mettre à jour le tableau d'avancement de ce fichier (un commit séparé `docs: mark wave N complete` AVANT le push final).

---

## Waves détaillées

### Wave 1 — Pilote `scripts/` (CCN, 3 fonctions)

**Scope** : scripts CLI hors runtime user. Risque minimal — permet de **calibrer la méthode** sur du code sûr.

| Fichier | Fonction | CCN actuel | Cible |
|---|---|---|---|
| `scripts/update-pricing.ts` | `fetchPricing` (L13-52) | **26** | ≤ 8 |
| `scripts/generate-image.ts` | `generateImage` (L65-111) | 12 | ≤ 8 |
| `scripts/generate-image.ts` | (anonymous) (L45-60) | 9 | ≤ 8 |

**Nature** :
- `fetchPricing` : scrape HTML de la doc pricing Mistral pour régénérer `helpers/pricing.ts`. Parse tabulaire + regex.
- `generateImage` : génère une image via Agent Mistral, télécharge le résultat.

**Stratégie suggérée** (non-contraignante) :
- `fetchPricing` CCN 26 : la plus grosse dette. Probablement plusieurs extractions :
  - `parseHtmlTable(html) → rows`
  - `extractModelPrefix(row) → string`
  - `extractPriceColumns(row) → { input, output, unit }`
  - `buildPricingEntry(model, columns) → ModelPricingEntry`
  - Puis `fetchPricing` = `fetch + parseHtmlTable + rows.map(row => buildPricingEntry(...))`
- `generateImage` : isoler le prompt Mistral, le téléchargement, la persistance. Probablement 3-4 helpers privés.

**Critères d'acceptation** :
- ✅ CCN ≤ 8 sur les 3 fonctions (mesuré)
- ✅ Tests existants passent (pas de test spécifique sur `scripts/` mais `npm test` complet doit rester vert)
- ✅ Exécution manuelle sanity (si faisable) : `npx tsx scripts/update-pricing.ts` output plausible
- ✅ Allowlist mise à jour : ajouter `scripts/update-pricing.ts` + `scripts/generate-image.ts`

**Action post-session** : merge PR → `/clear` → wave 2.

---

### Wave 2 — `helpers/` CCN (5 fonctions)

**Scope** : helpers = logique pure ou wrappers fins, excellente couverture de tests.

| Fichier | Fonction | CCN actuel | Cible |
|---|---|---|---|
| `helpers/voice-selection.ts` | `scoreVoice` (L59-127) | 15 | ≤ 8 |
| `helpers/cost-calc.ts` | `calculateTotalCost` (L65-135) | 12 | ≤ 8 |
| `helpers/tracked-client.ts` | `client.audio.transcriptions.complete` wrapper (L39-49) | 12 | ≤ 8 |
| `helpers/index.ts` | `extractAllText` (L108+) | 10 | ≤ 8 |
| `helpers/choice-labels.ts` | `parseChoiceLabel` (L38+) | 9 | ≤ 8 |

**Stratégie suggérée** :
- `scoreVoice` : extraire les critères de scoring en tableaux de règles `[{ match: (v, ctx) => bool, weight: number }]`, puis `scoreVoice = rules.reduce(...)`. Chaque règle devient testable unitairement.
- `calculateTotalCost` : probablement un switch/case sur l'unit (tokens / characters / pages / audio-seconds). Extraire `costByUnit(usage, pricing, unit) → number`.
- `tracked-client` STT wrapper : la complexité vient probablement de plusieurs branches try/catch + parsing. Extraire `extractTtsMetadata(result) → { audioSeconds, model }`.
- `extractAllText` : walk recursif des sources (text / ocr / voice / websearch). Extraire `sourceText(source) → string`, puis `sources.map(sourceText).join('\n')`.
- `parseChoiceLabel` : parsing label (A. / B) / 3. / etc.). Extraire regex + normalisation.

**Attention Cost tracking** (règle 14) : `tracked-client.ts` est CRITIQUE. Tout refactor doit préserver exactement le contrat `wrap(client, context)` et l'injection `ApiUsage`. **Impératif** : relire `tracked-client.test.ts` avant de toucher.

**Critères d'acceptation** :
- ✅ CCN ≤ 8 sur les 5 fonctions
- ✅ Tests existants passent, particulièrement `helpers/voice-selection.test.ts`, `helpers/cost-calc.test.ts`, `helpers/tracked-client.test.ts` (si présents — vérifier d'abord, ajouter tests de non-régression sinon)
- ✅ Warnings ESLint ne doivent pas augmenter
- ✅ Allowlist mise à jour : ajouter les 5 fichiers helpers

**Action post-session** : merge → `/clear` → wave 3.

---

### Wave 3 — `routes/` P1 (CCN 14-15, 4 fonctions)

**Scope** : handlers HTTP à forte complexité. **Risque élevé** — tests E2E à blinder.

| Fichier | Fonction | CCN actuel | Cible |
|---|---|---|---|
| `routes/chat.ts` | `validateChatRequest` (L38-69) | 15 | ≤ 8 |
| `routes/chat.ts` | (anonymous POST /:pid/chat) (L218-294) | 15 | ≤ 8 |
| `routes/generate.ts` | `applyConsigne` (L43-90) | 14 | ≤ 8 |
| `routes/profiles.ts` | (anonymous POST /api/profiles) (L13-38) | 14 | ≤ 8 |

**Stratégie suggérée** :
- `validateChatRequest` : probablement validation séquentielle de plusieurs champs. Extraire `validateField_X(input) → error | null`, combiner via `[...].find(e => e !== null)` ou `runValidators`.
- `chat POST handler` : gros handler avec modération + tool calls + persistance + réponse. Extraire `handleModeration`, `executeChatFlow`, `persistAndRespond`.
- `applyConsigne` : 7 params → forte indication que la fonction fait trop. Extraire `prepareConsigneContext(sources, consigne) → ctx` puis `applyContext(ctx, prompt) → string`.
- `profiles POST handler` : création profil avec validation + PIN + défauts. Extraire `buildProfileFromRequest`, `validateProfileInput`.

**Attention** : handlers Express = tests via supertest fréquents. Vérifier qu'ils existent (`routes/*.test.ts`). Si absents → **ajouter des tests de non-régression avant de refactorer** (sinon risque de casse invisible).

**Critères d'acceptation** :
- ✅ CCN ≤ 8 sur les 4 fonctions
- ✅ Tests route-level passent (`routes/chat.test.ts` / `routes/generate.test.ts` / `routes/profiles.test.ts` si présents)
- ✅ **Contrat HTTP inchangé** : mêmes codes statut, mêmes payloads d'erreur (vérifier via `helpers/error-codes.ts` extractErrorCode)
- ✅ Allowlist mise à jour pour les 3 fichiers routes
- ✅ `npm run security` 0 finding (handlers HTTP = hotspots SAST)

**Action post-session** : merge → `/clear` → wave 4.

---

### Wave 4 — `routes/` P2-P3 (CCN 9-13, 6 fonctions)

**Scope** : handlers restants.

| Fichier | Fonction | CCN actuel | Cible |
|---|---|---|---|
| `routes/generations.ts` | `sectionText` (L30-72) | 13 | ≤ 8 |
| `routes/generations.ts` | (anonymous L239) | 12 | ≤ 8 |
| `routes/generations.ts` | (anonymous L193) | 11 | ≤ 8 |
| `routes/profiles.ts` | (anonymous PUT L42) | 12 | ≤ 8 |
| `routes/sources.ts` | `getModerationCategories` (L50-80) | 10 | ≤ 8 |
| `routes/sources.ts` | (anonymous L209) | 9 | ≤ 8 |

**Stratégie suggérée** :
- `sectionText` (7 params) : candidat à objet de config `SectionContext` regroupant les params liés.
- handlers anonymous : mêmes patterns d'extraction que wave 3.
- `getModerationCategories` (9 params !) : **gros smell**. Probablement un objet options à passer au lieu de 9 positionnels.

**Critères d'acceptation** : idem Wave 3 + **attention particulière `getModerationCategories`** (9 params → refactor interface, mais **ne changer la signature publique que si aucun appelant externe**).

**Action post-session** : merge → `/clear` → wave 5.

---

### Wave 5 — `src/app/` frontend (CCN 10-12, 5 fonctions)

**Scope** : composants Alpine frontend. **Risque élevé UI** — test manuel dans navigateur obligatoire.

| Fichier | Fonction | CCN actuel | Cible |
|---|---|---|---|
| `src/app/profiles.ts` | `createProfile` (L139-179) | 12 | ≤ 8 |
| `src/app/sources.ts` | `handleFiles` (L126-160) | 11 | ≤ 8 |
| `src/app/generate.ts` | `generate` (L276-318) | 11 | ≤ 8 |
| `src/app/sources.ts` | `_uploadSingleFile` (L50-99) | 10 | ≤ 8 |
| `src/app/profiles.ts` | `deleteConfirmMessage` (L56-74) | 10 | ≤ 8 |

**Stratégie suggérée** :
- `createProfile` : validation + défauts + appel API. Extraire `buildProfilePayload`, `postProfile`, `handleProfileResponse`.
- `handleFiles` / `_uploadSingleFile` : session upload multi-fichiers. Probablement gestion état + retry. Extraire `createUploadSession`, `processFile`.
- `generate` : déclencheur génération avec plusieurs branches (type, loading, erreurs). Extraire `prepareGenerationRequest`, `handleGenerationResponse`.
- `deleteConfirmMessage` : génération message localisé selon contexte. Extraire `buildMessageKey`, `formatMessage`.

**Attention** :
- Ces fonctions sont des **méthodes de contextes Alpine** (`AppContext`). Attention à `this` binding.
- Les composants UI ne sont PAS testés automatiquement → **test manuel dans navigateur obligatoire** pour chaque modif (upload fichier, création profil, génération, suppression).
- `apiStatus.ttsAvailable` et autres flags doivent continuer de fonctionner.

**Critères d'acceptation** :
- ✅ CCN ≤ 8 sur les 5 fonctions
- ✅ Tests `npm test` passent
- ✅ **Test manuel navigateur** : golden path upload PDF + création profil + génération quiz + suppression profil avec cascade. **Obligatoire, pas optionnel**.
- ✅ Allowlist mise à jour

**Action post-session** : merge → `/clear` → wave 6.

---

### Wave 6 — Reste CCN (5 fonctions, fin de la dette CCN)

**Scope** : dernières fonctions hors dossiers précédents. **Fin de la dette Lizard**.

| Fichier | Fonction | CCN actuel | Cible |
|---|---|---|---|
| `generators/tts-provider.ts` | `toMistralVoice` (L57-68) | 13 | ≤ 8 |
| `generators/tts-provider.ts` | `listVoices` (L70-84) | 11 | ≤ 8 |
| `generators/image.ts` | `parseChunkRef` (L12-34) | 9 | ≤ 8 |
| `profiles.ts` | `list` (L86-116) — store racine | 10 | ≤ 8 |
| `src/i18n/index.ts` | `t` (L24-33) | 10 | ≤ 8 |

**Stratégie suggérée** :
- `toMistralVoice` / `listVoices` : mapping SDK Mistral → format interne. Extraire `mapVoiceEntry`, `filterByLang`.
- `parseChunkRef` : parsing références chunks (5 params !). Extraire `extractChunkId`, `extractText`.
- `profiles.ts:list` : filtrage + tri. Extraire `filterProfiles`, `sortProfiles`.
- `i18n/t` : résolution clé + fallback. Extraire `resolveKey`, `applyInterpolation`.

**Attention** :
- `tts-provider.ts` : règle cost tracking (14) + prompts IA (13) s'appliquent si tu touches la logique TTS.
- `i18n/t` : fondation du frontend — un bug ici casse tout l'UI. Test manuel obligatoire.

**Critères d'acceptation** :
- ✅ CCN ≤ 8 sur les 5 fonctions
- ✅ **Vérification finale** : `pipx run lizard -l typescript --CCN 8 --warnings_only .` retourne **0 fonction** (toute la dette CCN éliminée)
- ✅ Allowlist élargie à TOUT le scope `-l typescript` (pas juste un sous-ensemble)
- ✅ Tests + security verts

**Action post-session** : merge → `/clear` → wave 7. **Étape majeure** : toute la dette CCN est réglée.

---

### Wave 7 — ESLint `no-explicit-any` SDK Mistral backend

**Scope** : typer correctement les interactions avec le SDK Mistral (+ types ApiUsage, ChatResponse, etc.).

**Cibles** (fichiers avec le plus de `no-explicit-any`) :
- `helpers/tracked-client.ts` : ~15 warnings
- `generators/summary.ts` : ~7
- `generators/image.ts` : ~5-6
- `generators/chat.ts` : ~2
- `generators/tts-provider.ts` : variable
- `store.ts` : ~5 (dans `writeProject`, `validateProject`)

**Stratégie** :
- Importer les types concrets du SDK Mistral (`import type { ChatCompletionResponse, OCRResponse, TtsVoice } from '@mistralai/mistralai/models/components'` — à valider dans le package)
- Créer des types internes quand le SDK ne couvre pas (ex: `TrackedUsage`, `GenerationMetadata`)
- **Ne JAMAIS remplacer un `any` par un `unknown` aveugle** : soit on type correctement, soit on garde le `any` avec `// NOSONAR(…) -- raison` (mais il faut justifier)

**Attention** : le SDK Mistral v2.x expose beaucoup de types via `@mistralai/mistralai/models/*`. Explorer avant de deviner.

**Critères d'acceptation** :
- ✅ Warnings `no-explicit-any` réduits d'au moins **60** (baseline 226 → ≤ 166)
- ✅ Descente plafond `--max-warnings` dans `package.json` de **300 → 200** (marge ~15 %)
- ✅ `npm test` vert, tests SDK Mistral passent
- ✅ Types exportés/importés cohérents (pas de `any` remplacé par un alias ré-exporté qui est en fait `any`)

**Action post-session** : merge → `/clear` → wave 8.

---

### Wave 8 — ESLint frontend + `no-duplicate-string` + clôture (`--max-warnings 0`)

**Scope** : finir tous les warnings restants, clôturer la dette.

**Cibles `no-explicit-any` frontend** :
- `src/app/projects.ts` : ~17 warnings
- `src/components/quiz-vocal.ts` : ~17
- `src/app/*.ts` restants

**Cibles `no-duplicate-string`** : 37 warnings — extraire en constantes (souvent strings i18n ou templates).

**Stratégie** :
- Frontend : créer types Alpine concrets pour `AppContext` (`types/app-context.ts` potentiel, ou étendre `src/app/state.ts`).
- `no-duplicate-string` : extraire constantes `const SOME_KEY = 'value'` au top du fichier. Éviter d'exporter sauf si réutilisé ailleurs.
- **Clôture** : une fois 0 warnings mesuré, descendre `--max-warnings 300` → `--max-warnings 0` dans `package.json` (transition définitive).

**Critères d'acceptation** :
- ✅ `npm run lint 2>&1 | grep -c warning` = **0**
- ✅ `--max-warnings 0` dans `package.json` (verrou final)
- ✅ `npm test` vert
- ✅ `pipx run lizard -l typescript --CCN 8 .` = 0 warning (vérif finale)
- ✅ Security 0 findings ERROR
- ✅ Mettre à jour CLAUDE.md : retirer mention "transitoire" sur `--max-warnings 300`, retirer mention "28 fonctions CCN>8 à refactorer"
- ✅ Mettre à jour `.claude/todo-tooling.md` : marquer la campagne refactor comme ✅ complétée
- ✅ Mettre à jour ce fichier : tableau d'avancement 8/8 ✅

**Action post-session** : merge → fin de campagne 🎉 — la dette qualité historique est éradiquée.

---

## Tableau d'avancement

| Wave | Scope | PR | Status | Date |
|---|---|---|---|---|
| **Plan** | `.claude/refactor-quality-debt.md` | [# TBD] | ⏳ En cours | 2026-04-19 |
| 1 | Pilote `scripts/` | — | ⏸ Pending | — |
| 2 | `helpers/` CCN | — | ⏸ Pending | — |
| 3 | `routes/` P1 | — | ⏸ Pending | — |
| 4 | `routes/` P2-P3 | — | ⏸ Pending | — |
| 5 | `src/app/` frontend | — | ⏸ Pending | — |
| 6 | Reste CCN | — | ⏸ Pending | — |
| 7 | ESLint any backend | — | ⏸ Pending | — |
| 8 | ESLint clôture | — | ⏸ Pending | — |

**À chaque wave** : l'agent de la session met à jour cette ligne avec `Status: ✅ Done`, la `Date`, et le `PR #<num>` AVANT le push final (commit séparé `docs: mark wave N complete`).

---

## Fin de campagne — attendus

Après Wave 8 mergée :
- Lizard CCN > 8 = **0**
- ESLint warnings = **0**
- `scripts/check-complexity.sh` couvre **tout le scope** `-l typescript`
- `package.json` : `lint:ci` sans plafond `--max-warnings` (ou `--max-warnings 0`)
- CLAUDE.md à jour (plus de mention de dette transitoire)
- `.claude/todo-tooling.md` : campagne marquée ✅ complétée

**Prochaine passe qualité potentielle** : élargir Opengrep à `--severity=WARNING`, réduire l'Avg.CCN global, migrer ESLint règles bruyantes de `warn` → `error`. Hors scope de cette campagne.
