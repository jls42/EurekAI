# EurekAI

Application educative IA : photo/texte/voix -> fiches + flashcards + quiz + podcast + traduction.
Concu pour un enfant de 9 ans. Powered by Mistral AI (+ ElevenLabs optionnel).

## Stack & Lancement

- **Backend** : TypeScript, Express, tsx (dev)
- **Frontend** : Vite + HTML + TailwindCSS + Alpine.js (src/)
- **APIs** : Mistral AI (chat, OCR, STT, TTS Voxtral, agents, moderation), ElevenLabs (TTS alternatif)

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
- Deux providers : Mistral (Voxtral TTS) ou ElevenLabs, configurable dans les settings
- Mistral TTS : utilise `MISTRAL_API_KEY` (deja requis), pas de cle supplementaire
- ElevenLabs : necessite `ELEVENLABS_API_KEY`
- `apiStatus.ttsAvailable` indique si le provider actif est configure
- Griser les boutons TTS avec `:disabled="!apiStatus.ttsAvailable"` + tooltip `t('gen.needsTts')`
- **Voix par langue** : `resolveVoices(config, profileVoices?, lang?, profileId?, flow?)` dans `config.ts` résout la voix finale selon la priorité : profil > override global explicite (`mistralVoicesSource === 'user'`) > sélection dynamique `selectVoices` (9 langues UI) > DEFAULT_CONFIG. Le flag `mistralVoicesSource` (`'default' | 'user'`) est migré one-time dans `initConfig` via `LEGACY_DEFAULT_HOSTS/GUESTS` — un config.json existant avec un ancien ID par défaut reste classé `'default'` pour que l'utilisateur bénéficie automatiquement des voix EN/ES/etc.
- **Appels `resolveVoices()`** : sur tout nouveau chemin TTS, TOUJOURS passer `profileId` et `flow` (ex: `'podcast' | 'quiz-vocal' | 'read-aloud'`). Sinon la rotation déterministe par profil se casse (seed `__default__` partagé) et les logs de fallback portent `flow='unknown'` — observabilité dégradée.

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
- **Lint** : `npm run lint` (ESLint + typescript-eslint + sonarjs, config `eslint.config.js`). `npm run lint:fix` pour les auto-fixables. Pas encore en pretest car baseline > 50 errors — viser zéro errors pour activer bloquant. Config tunée en `warn` les règles legacy-bruyantes (`no-explicit-any`, `cognitive-complexity`) le temps du refactor progressif. Détails : `.claude/todo-tooling.md`.

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

- **JS/TS** : `// NOSONAR(S1234) — raison concise`
- **HTML** : NOSONAR ne fonctionne PAS en HTML. Ajouter un texte fallback statique dans les elements `x-text`.
- Details, faux positifs connus et solutions dans `.claude/rules/sonarqube.md` (charge auto sur fichiers src/)

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
- **Couverture actuelle** : SSRF (fix commit 4027c37 + pattern whitelist `00af5f2`), timing attacks (fix commit 7e0fb32), XSS, injection, secrets hardcodes, expressjs patterns dangereux. 153 règles actives sur 171 fichiers. Baseline post-fix : 0 finding ERROR.

## Mesurer > deviner (règle OBLIGATOIRE)

**Dès qu'un fait est mesurable factuellement, mesurer AVANT de raisonner dessus.** Ne jamais estimer/supposer quand une vérification coûte quelques secondes. L'intuition est souvent fausse et les itérations basées sur elle coûtent 10× plus cher que la mesure directe.

Cas concrets (non exhaustif) :
- **Calcul** (somme, produit, pourcentage, unités, dates) : bash/python/calculette, jamais à la tête
- **Comptage** : `wc -l`, `grep -c`, `.length`, jamais "à peu près N"
- **Contenu fichier / comportement code** : lire le fichier, `grep`, lancer le test, jamais depuis la mémoire
- **Outils externes** (Codacy CCN, SonarQube, CI warnings) : lancer l'outil localement (`pipx run lizard`, `sonar-scanner`, etc.) pour voir ce qu'il voit réellement, jamais deviner la cause d'un flag
- **Dates relatives** (utilisateur dit "jeudi", "le mois dernier") : convertir en absolu via le contexte date, jamais extrapoler mentalement

**Anti-pattern documenté** : série de 9 commits (`977b535..68ed476`) sur un faux positif Lizard `matchStatus` résolus en 2 min dès qu'on a lancé `pipx run lizard` local — cause racine = parseur TS de Lizard qui agglomère les `function foo()` top-level consécutives. Fix propre via extraction dans `helpers/error-matchers.ts` (chaque matcher `export function` délimité proprement). Leçon : ne JAMAIS itérer à l'aveugle sur un signal d'outil externe.

Garde-fou local actuel : `npm run test` déclenche `pretest` → `lint:complexity` → `scripts/check-complexity.sh` (Lizard CCN 8 strict, scope **allowlist** : `helpers/error-*.ts`, `src/app/helpers.ts`, `config.ts`). Le reste du repo contient 23 fonctions > CCN 8 à refactorer en PR(s) séparée(s) — liste complète et priorités dans `.claude/todo-tooling.md` section "Refactor progressif Lizard CCN". Pièges connus :
- **`-l javascript` ne parse pas les `.ts` en walk-dossier** — Lizard doit être invoqué avec `-l typescript` explicitement, sinon 0 violation silencieusement (faux positif "tout est clean"). Bug vécu 2026-04-18, Codacy a révélé 23 fonctions cachées.
- **`??=` pèse 2 dans le comptage Lizard** (nullish check + assignment) — à retenir lors de l'application du fix `prefer-nullish-coalescing` (cf. `dccd645` : re-fix via boucle).

## Conventions detaillees

Voir `.claude/rules/` pour :
- `architecture.md` — Structure fichiers, patterns critiques, modeles IA
- `api-routes.md` — Routes API completes
- `add-feature.md` — Checklist pour ajouter un generateur ou une source
- `prompts.md` — Conventions prompts IA (lang, ageGroup, TTS)
