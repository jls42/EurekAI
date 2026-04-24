# EurekAI

Application educative IA : photo/texte/voix -> fiches + flashcards + quiz + podcast + traduction.
Concu pour un enfant de 9 ans. Powered by Mistral AI.

## Stack & Lancement

- **Backend** : TypeScript, Express, tsx (dev)
- **Frontend** : Vite + HTML + TailwindCSS + Alpine.js (src/)
- **APIs** : Mistral AI (chat, OCR, STT, TTS Voxtral, agents, moderation)

```bash
npm install
npm run dev    # concurrently: tsx watch server.ts + vite -> http://localhost:5173
npm run test   # vitest
```

## Regles OBLIGATOIRES

### lang et ageGroup
Chaque route de generation et chaque appel IA DOIT recevoir `lang` et `ageGroup`.
Le frontend envoie via `getLocale()` et `currentProfile.ageGroup`. Ne JAMAIS hardcoder `"fr"` ou `"enfant"`.

### i18n frontend
- Tous les textes UI via `t('cle.traduction')` — jamais de texte en dur dans les templates HTML
- Ajouter chaque cle dans les **9 fichiers i18n** : `src/i18n/{fr,en,es,pt,it,nl,de,hi,ar}.ts`
- Le test `src/i18n/i18n-sync.test.ts` verifie la synchronisation entre toutes les langues

### TTS (Text-to-Speech)
- Provider unique : Mistral Voxtral TTS (`MISTRAL_API_KEY` suffit, pas de clé supplémentaire). Le support ElevenLabs historique (hackathon) a été retiré 2026-04 faute d'intégration au niveau Mistral (voix par langue, cost tracking) — une migration one-time dans `initConfig` nettoie les `config.json` legacy (`ttsProvider`/`voices`/`eleven_*`/`mistralVoices`/`mistralVoicesSource`). Réintégration ElevenLabs envisagée plus tard au même niveau de qualité.
- `apiStatus.ttsAvailable === apiStatus.mistral` (une seule source, plus de champ `elevenlabs`).
- Griser les boutons TTS avec `:disabled="!apiStatus.ttsAvailable"` + tooltip `t('gen.needsTts')`
- **Voix par langue** : `resolveVoices({ profileVoices?, lang, profileId, flow })` dans `config.ts` résout la voix finale selon la priorité : override profil non vide > sélection dynamique `selectVoices` (bucket langue, puis EN, puis any) > fallback interne. Les voix globales `mistralVoices`/`mistralVoicesSource` sont legacy, supprimées de `config.json` par `initConfig` ET rejetées avec `logger.warn` dans `saveConfig` (protection client stale entre deux restarts).
- **Appels `resolveVoices()`** : la signature impose un arg objet avec `lang: string`, `profileId: string | null`, `flow: VoiceFlow` (union `'podcast' | 'quiz-vocal' | 'read-aloud'` exportée depuis `types.ts`). Le typechecker bloque tout call site qui oublie `profileId` ou `flow` — sinon la rotation déterministe par profil se casse et les logs de fallback perdent leur contexte.

### Prompts IA (anti-leak lexical)
- Centralisés dans `prompts.ts` — les generators importent, ne redefinissent jamais de prompt inline
- **Ne JAMAIS mettre de tokens méta** (`"fiche"`, `"complete"`, `"exhaustive"`, `"synthese"`) au voisinage d'un champ JSON que le LLM produit sous forme de texte libre (surtout `title`, `word`, `question`) — le LLM recycle ces mots dans ses outputs (bug historique `"— Fiche de révision COMPLÈTE"` dans les titres)
- **Pas de blacklist explicite** (`"pas de 'Fiche'"`) qui réinjecte les mots — préférer règle positive + exemples positifs
- **Règle "title" summary** : `data.title` = sujet du cours uniquement, préfixe `"Fiche — "` ajouté par `helpers/auto-title.ts` pour la carte liste seulement ; la vue détail affiche `data.title` brut
- **Retry prompt** (`generators/summary.ts`) : même discipline que le prompt initial, pas d'écho des formulations problématiques
- Détails complets et règles sur emphases MAJUSCULES / few-shots / retry dans `.claude/rules/prompts.md`

### Agents auto-generables
- **Source unique de vérité** : `generators/auto-agents.ts` exporte `AUTO_AGENTS_SET` et `MAX_AUTO_PLAN_LENGTH` — utilisés par `router.ts` (`VALID_AGENTS`) ET `routes/generate.ts` (`AUTO_EXECUTABLE`). Ne jamais dupliquer la liste.
- **Politique `normalizePlan`** : choix du modèle prime, enrichment audio (podcast/quiz-vocal) budget-aware — on ne tronque jamais un agent explicitement choisi par le LLM (`image` pour contenu visuel p.ex.)

### Codes d'erreur API (FailedStep)
- `/generate/auto` retourne `failedSteps: FailedStep[]` avec codes stables (`types.ts` : `FailedStepCode`) — jamais `err.message` brut dans la réponse HTTP (fuite potentielle clés API / URLs internes)
- **Source unique** : `types.ts` exporte `FailedStepCode`. Toute addition casse `helpers/error-codes.test.ts` (_KNOWN_CODES) tant que le nouveau code n'est pas listé → force une revue volontaire des consommateurs (UI mapping, retry policy, observabilité).
- Codes : `llm_invalid_json`, `quota_exceeded`, `upstream_unavailable` (503/529 panne backend), `auth_required` (401/403 OU clé API locale non définie), `tts_upstream_error`, `context_length_exceeded`, `internal_error`
- Status 502 quand tous les steps échouent (réponse inclut `error: 'all_steps_failed'`), 200 sinon
- **Tous les endpoints** qui renvoient une erreur HTTP doivent utiliser `extractErrorCode(e, '<agent>')` plutôt que `err.message`/`String(e)` (cf. `helpers/error-codes.ts`) — ne pas en créer de nouveaux sans cette pratique.
- Le détail complet (stack, message) reste dans `logger.error` côté serveur
- **Architecture interne** : `helpers/error-codes.ts` est un re-export mince. La logique vit dans `helpers/error-code-resolution.ts` (orchestration), `helpers/error-code-rules.ts` (règles par agent), `helpers/error-matchers.ts` (matchers par pattern d'erreur — chaque matcher délimité `export function` pour contourner le parseur Lizard TS qui agglomère sinon les `function foo()` top-level consécutives).

### Cost tracking API
- **Objectif** : chaque appel Mistral (chat, OCR, STT, TTS, moderation, agents) est instrumenté pour exposer un coût € estimé à l'utilisateur, persisté par projet.
- **Source de vérité pricing** : `helpers/pricing.ts` — `MODEL_PRICING` (par prefix de modèle) + `PRICING_SOURCES` (URL doc Mistral pour scraping tarifaire). Prefix matching greedy (plus long gagne, ex: `mistral-large-2512` → `mistral-large`).
- **Chaîne de calcul** : `helpers/tracked-client.ts` wrappe le client Mistral (capture `ApiUsage`) → `helpers/usage-context.ts` (AsyncLocalStorage pour propager l'usage dans les pipelines async) → `helpers/cost-calc.ts` (conversion usage → € selon l'unité : `tokens` / `characters` / `pages` / `audio-seconds`) → `helpers/cost-persist.ts` (écriture dans `Project.costLog` + mise à jour `totalCost`) → `helpers/cost-middleware.ts` (injection du `costDelta` dans la réponse HTTP).
- **Contrat endpoint** : les réponses `/generate/*` et `/sources/*` décorent l'objet retourné (Generation ou Source) avec `estimatedCost: number`, `usage: GenerationUsage`, `costBreakdown: string[]`. **Seul** `POST /generate/auto/route` renvoie un champ top-level `costDelta: number` (coût du routage seul) — les autres `/generate/*` exposent leur coût via `gen.estimatedCost` uniquement. `GET /projects/:pid` retourne le projet enrichi de `totalCost` (somme calculée depuis `costLog[]`) + `costLog[]` historique.
- **Règle OBLIGATOIRE** : tout nouvel appel Mistral DOIT passer par `tracked-client` (jamais `new Mistral(...)` direct dans un generator). Sinon le coût échappe au tracking silencieusement — bug observabilité invisible côté UI.

### Persistance config.json
- **Dans `config.ts`**, toute écriture de `config.json` DOIT passer par le helper interne `persistConfig()` (jamais `writeFileSync(configPath, …)` direct). Sinon le backup `.corrupt.bak` n'est pas créé avant overwrite d'un fichier corrompu préservé → perte silencieuse du contenu user original. Ne s'applique pas aux fichiers ≠ `config.json` (logs, caches, etc.).
- Le flag module `lastLoadFailed` tracke l'état. Reset à `false` après le premier backup (un seul `.corrupt.bak` par cycle corrompu → restore).
- **Rejection legacy à saveConfig** : tout préfixe de champ migré one-time (actuellement `ttsModel: 'eleven_*'`) doit être rejeté côté `saveConfig` aussi, pas seulement dans `migrateLegacyElevenLabsFields`. Sinon une UI pré-PR ou client automatisé peut POSTer la valeur legacy entre 2 restart → fenêtre d'incohérence opaque. Pattern : `logger.warn` + garder la valeur courante (déjà non-legacy après boot), jamais reset vers DEFAULT.

### OCR confidence scores
- **Type** : `OcrConfidence = { average: number }` dans `types.ts` — stocké en `Source.ocrConfidence?` pour les sources PDF/image.
- **Extraction** : `generators/ocr.ts` passe `confidenceScoresGranularity: 'page'` à l'API Mistral OCR puis `extractConfidence()` (interne, non exporté) moyenne les `averagePageConfidenceScore` des pages, clampé dans `[0,1]`.
- **Tiers UI** : `src/app/helpers.ts` expose la méthode AppContext `ocrConfidenceTier(src: Source)` → `'high' | 'medium' | 'low' | null` (seuils ≥0.9 / ≥0.7, sinon `'low'`, `null` si `src.ocrConfidence` absent ou non-finite). Badges colorés dans la vue sources + i18n via clé `ocr.confidence` (9 langues). NB : la méthode prend un `Source` complet (pas un `score: number`) — utiliser `src.ocrConfidence?.average` en amont si tu n'as qu'un nombre.
- **Règle** : quand un score est bas, ne PAS bloquer la génération — afficher le badge warning et laisser l'utilisateur décider (les scores bas viennent souvent de scans de mauvaise qualité, pas d'un vrai problème de contenu).

### HTML interactif
- Ne JAMAIS imbriquer de `<button>` dans un `<button>` (HTML invalide, casse le layout)
- Utiliser `<div role="button" tabindex="0" @click @keydown.enter>` quand le conteneur cliquable contient des boutons enfants
- Les boutons de generation dans view-sources sont dynamiques via `x-for` sur `categories` — ne pas hardcoder

## Code quality

- Fonctions courtes et focalisees (~30 lignes max, ~50 en cas de necessite)
- Extraire en helpers/fonctions utilitaires des qu'une fonction grandit
- Preferer la composition (mixins, spread) a la duplication de code
- Templates HTML : extraire en partials quand un bloc depasse ~100 lignes
- Pas de listes hardcodees de types/categories : utiliser une source de verite unique (`categories` dans state.ts)
- Les composants interactifs (quiz, fill-blank, flashcards) utilisent le mixin `step-by-step.ts`
- **Lint** : `npm run lint` (ESLint + typescript-eslint + sonarjs, config `eslint.config.js`) — `lint:fix` pour les auto-fixables. Actif en `pretest` via `lint:ci = eslint . --max-warnings 0` (verrou strict, 0 warning toléré), en complément de `lint:complexity` (Lizard CCN 8 full-repo) et `lint:deadcode` (knip). Règles `no-explicit-any`, `cognitive-complexity`, `no-duplicate-string`, `todo-tag` encore configurées en `warn` mais baseline à 0 — toute nouvelle occurrence bloque `npm test`.
- **Autres scripts utiles** : `format` / `format:check` (prettier), `test:coverage` / `test:watch` (vitest), `build` / `preview` / `start` (vite + prod), `dev:server` / `dev:web` (splits isolés du `dev` combiné).

## Workflow

- **Ne JAMAIS committer directement sur `main`** — toujours creer une branche (`feat/`, `fix/`, `chore/`, etc.) et merger via PR
- **Toujours utiliser le skill `/commit` pour creer les commits** (mandatory)
- Verifier visuellement chaque modif UI (navigateur ou Claude in Chrome)
- Lancer `npm run test` apres chaque modification
- **Si le commit contient des modifications de `README.md`** : montrer le diff README.md a l'utilisateur pour validation, puis lancer `./scripts/translate-readme.sh` avant de committer pour regenerer les 14 traductions (README-en.md, README-de.md, etc.)
- **Verifier regulierement les dependances** : utiliser le skill `/check-sdk-updates` qui lance `check-deps.sh`, fetch les changelogs GitHub et analyse les nouvelles capabilities API. A lancer avant chaque release ou quand une API renvoie des erreurs inattendues.
- Quand une erreur ou mauvaise approche est identifiee, ajouter une regle ici ou dans `.claude/rules/`
- Pour les taches complexes : commencer en Plan mode, iterer sur le plan, puis implementer
- Apres implementation : verifier l'integration complete (pas de bouton manquant, pas de type oublie)
- **Avant chaque commit** : verifier si `CLAUDE.md`, `.claude/rules/` ou `README.md` doivent etre mis a jour pour refleter les changements. Mettre a jour si necessaire, montrer le diff README a l'utilisateur pour validation avant traduction
- **Après chaque `git push`** (sur une PR, jamais main) : surveiller les checks GitHub automatiquement.
  1. Attendre ~30-60s que Codacy / SonarQube / SonarCloud / CodeFactor scannent.
  2. `gh pr checks <num>` pour lire l'état.
  3. Si tous `pass` → signaler à l'utilisateur et stop.
  4. Si un check est `pending` → re-check dans 60-90s.
  5. Si un check est `fail` : récupérer le finding (API `gh`, URL Codacy dans la colonne link), **reproduire localement** (`pipx run lizard -l typescript`, `npm run security`, `npm run lint`) AVANT de proposer un fix — jamais d'itération à l'aveugle (règle "Mesurer > deviner"). Appliquer le fix, `npm run test && npm run format && npm run security` verts, skill `/commit`, `git push`.
  6. Reboucler jusqu'à tous verts ou finding non-trivial (dans ce cas stop et demander aide).
  7. Pièges connus : extraire un `fetch(url, ...)` hors de la fonction qui construit l'URL réactive `rule-node-ssrf` (cf. section Sécurité). `??=` pèse 2 dans Lizard. Les règles Codacy suivent l'Opengrep depuis 2026-02 : `// nosemgrep: <rule-id>` fonctionne, `// codacy:ignore-next-line` n'existe pas.

## SonarQube

- **JS/TS** : `// NOSONAR(S1234) — raison concise` en **fin de ligne** flaggée (pratique réelle, cf. `generators/image.ts`, `helpers/index.ts`) ou ligne au-dessus.
- **HTML** : NOSONAR ne fonctionne PAS en HTML. Ajouter un texte fallback statique dans les elements `x-text` pour satisfaire les règles d'accessibilité (ex: `<span x-text="title">Chargement…</span>`).
- Faux positifs fréquents : `S1192` (string duplication) — souvent préférable d'extraire une constante plutôt qu'ignorer. `S3776` / `S6324` (complexity) — croiser avec `npm run lint:complexity` (Lizard CCN 8) avant de supprimer.

## Sécurité (SAST local)

- **Source de vérité locale** : Opengrep (fork open-source de Semgrep CE) via `npm run security` → `scripts/check-security.sh`. Configs `p/security-audit` + `p/default` + `p/nodejsscan`, `--severity=ERROR --error` (exit 1 sur toute error).
- **Intégration** : `.husky/pre-push` — bloque tout push avec finding ERROR. Pas dans pretest (scan ~12s, trop lent pour boucle commit).
- **Install** : `./scripts/install-opengrep.sh` (binaire standalone ~40Mo dans `~/.local/bin/`, auto-detect linux/osx x86/arm). Pas de devDependency npm (placeholder vide sur registry).
- **Suppression faux positifs** : deux mécanismes
  - Inline : `// nosemgrep: <rule-id> -- <raison>` (ou `// nosemgrep` seul pour ignore générique ligne suivante) immédiatement au-dessus de la ligne flaggée. Sur la MÊME ligne : `<code>; // nosemgrep: <rule-id>`. Multiples rules séparées par virgule.
  - Global : `--exclude-rule=<rule-id>` dans `scripts/check-security.sh` avec commentaire expliquant le pattern récurrent
- **Codacy ≡ Opengrep (depuis 2026-02)** : Codacy a migré de Semgrep vers Opengrep en février 2026. **La syntaxe `// codacy:ignore-next-line` n'existe PAS** — c'est une invention LLM fréquente. Codacy ne supporte AUCUN skip inline propre : seuls les skip tags commit (`[ci skip]`, `[codacy skip]`) existent côté Codacy. Pour ignorer inline, utiliser la syntaxe Opengrep/Semgrep `// nosemgrep` (cf. ci-dessus). Si le rule-id Codacy est le nom LGPL complet (ex: `Semgrep_rules_lgpl_javascript_ssrf_rule-node-ssrf`), le rule-id court (`rule-node-ssrf`) peut ne pas matcher — fallback : `// nosemgrep` seul.
- **Règle** : avant d'ajouter un ignore (inline ou global), **mesurer** en lançant `npm run security` localement — ne jamais ignorer à l'aveugle un finding Codacy/SonarQube sans reproduire via Opengrep d'abord (principe "Mesurer > deviner" ci-dessous). Note : certaines règles LGPL utilisées par Codacy ne sont PAS dans nos packs locaux (`p/security-audit + p/default + p/nodejsscan`) — dans ce cas, opengrep local ne reproduit pas, et le seul moyen de valider un fix est le rescan Codacy post-push.
- **Fix `rule-node-ssrf` préféré = pattern whitelist.includes canonique** (pas d'ignore). Exemple dans `src/app/generate.ts` (commit `00af5f2`) : construire `allowedUrls` comme `AUTO_AGENT_TYPES.map(...)`, puis `if (!allowedUrls.includes(url)) return;` avant le `fetch(url, ...)`. C'est le pattern "safe" officiellement documenté par Codacy et il éteint le flag sans suppression.
- **Effet secondaire subtil cleanup de dead code** : retirer un `export` même inutilisé peut faire ré-évaluer le graphe de taint par Codacy/Opengrep et **réactiver des findings dormants** (cas vécu : commit knip `817fb2d` a retiré un re-export `addCostDelta` → Codacy a re-flaggé un `fetch` qui était accepté depuis `4027c37`). Quand un finding SAST apparaît après un commit "inoffensif", vérifier s'il n'a pas modifié la surface d'exports d'un fichier impliqué.
- **Couverture actuelle** : SSRF (fix commit 4027c37 + pattern whitelist `00af5f2`), timing attacks (fix commit 7e0fb32), XSS, injection, secrets hardcodes, expressjs patterns dangereux. 153 règles actives sur 175 fichiers tracked git (snapshot 2026-04-19, dérive lente avec nouveaux fichiers). Baseline post-fix : 0 finding ERROR.

## Mesurer > deviner (règle OBLIGATOIRE)

**Dès qu'un fait est mesurable factuellement, mesurer AVANT de raisonner dessus.** Ne jamais estimer/supposer quand une vérification coûte quelques secondes. L'intuition est souvent fausse et les itérations basées sur elle coûtent 10× plus cher que la mesure directe.

Cas concrets (non exhaustif) :
- **Calcul** (somme, produit, pourcentage, unités, dates) : bash/python/calculette, jamais à la tête
- **Comptage** : `wc -l`, `grep -c`, `.length`, jamais "à peu près N"
- **Contenu fichier / comportement code** : lire le fichier, `grep`, lancer le test, jamais depuis la mémoire
- **Outils externes** (Codacy CCN, SonarQube, CI warnings) : lancer l'outil localement (`pipx run lizard`, `sonar-scanner`, etc.) pour voir ce qu'il voit réellement, jamais deviner la cause d'un flag
- **Dates relatives** (utilisateur dit "jeudi", "le mois dernier") : convertir en absolu via le contexte date, jamais extrapoler mentalement

**Anti-pattern documenté** : série de 5 commits (`977b535..68ed476`) sur un faux positif Lizard `matchStatus` résolus en 2 min dès qu'on a lancé `pipx run lizard` local — cause racine = parseur TS de Lizard qui agglomère les `function foo()` top-level consécutives. Fix propre via extraction dans `helpers/error-matchers.ts` (chaque matcher `export function` délimité proprement). Leçon : ne JAMAIS itérer à l'aveugle sur un signal d'outil externe.

Garde-fou local actuel : `npm test` déclenche `pretest` → enchaîne **`typecheck` + `lint:complexity` + `lint:ci` + `lint:deadcode`** (sortie pipeline en cas d'échec d'un seul). `lint:complexity` → `scripts/check-complexity.sh` (Lizard CCN 8 strict, scope **full-repo `-l typescript`** depuis 2026-04-20 — 0 fonction > CCN 8 confirmée, toute régression bloque `npm test`). Pièges connus :
- **`-l javascript` ne parse pas les `.ts` en walk-dossier** — Lizard doit être invoqué avec `-l typescript` explicitement, sinon 0 violation silencieusement (faux positif "tout est clean"). Bug vécu 2026-04-18, Codacy a révélé 23 fonctions cachées.
- **`??=` pèse 2 dans le comptage Lizard** (nullish check + assignment) — à retenir lors de l'application du fix `prefer-nullish-coalescing` (cf. `dccd645` : re-fix via boucle).
- **`function foo()` top-level consécutives agglomérées** — parseur Lizard TS agglomère les `function` déclarations consécutives en une seule fonction pour compter le CCN (bug vécu 3× : `matchStatus` `977b535..`, `removeLegacyTtsFields` 2026-04-21, `persistConfig` 2026-04-22). Fix standard : convertir un des helpers adjacents en `const foo = (): T => { ... }` arrow — Lizard ne les agglomère pas. `export function` délimite aussi correctement (cf. `helpers/error-matchers.ts`). À retenir quand on ajoute un helper privé à côté d'un existant.

## Conventions detaillees

Voir `.claude/rules/` pour :
- `add-feature.md` — Checklist pour ajouter un generateur ou une source
- `prompts.md` — Conventions prompts IA (lang, ageGroup, anti-leak, retry, few-shots)

Structure fichiers, routes API et patterns critiques : voir directement la section **Structure du projet** du `README.md` (détaillée et maintenue), ou lire les sources — `server.ts`, `routes/*.ts`, `generators/*.ts`, `helpers/*.ts`.
