# EurekAI

Application educative IA : photo/texte/voix -> fiches + flashcards + quiz + podcast + traduction.
Concu pour un enfant de 9 ans. Powered by Mistral AI.

## Stack & Lancement

- **Backend** : TypeScript, Express, tsx (dev)
- **Frontend** : Vite + HTML + TailwindCSS + Alpine.js (src/)
- **APIs** : Mistral AI (chat, OCR, STT, TTS Voxtral, agents, moderation)

```bash
npm ci         # install reproductible depuis package-lock
npm run dev    # concurrently: tsx watch server.ts + vite -> http://localhost:5173
npm run test   # pretest quality gate + vitest
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
- **Appels `resolveVoices()`** : la signature impose un arg objet avec `lang: string`, `profileId: string | undefined`, `flow: VoiceFlow` (union `'podcast' | 'quiz-vocal' | 'read-aloud'` exportée depuis `types.ts`). Pas de `null` : un seul sentinel "absent" pour les call sites (cf. commentaire `ResolveVoicesArgs` dans `config.ts`). Le typechecker bloque tout call site qui oublie l'un des trois champs. `profileId` seed la **rotation déterministe** par profil (avec `langMatched`, cf. `helpers/voice-selection.ts`) — un même profil garde une identité sonore cohérente à travers les flows. `flow` n'entre **PAS** dans le seed : il existe uniquement pour **contextualiser les logs de fallback** dans `resolveMistralDefaults` (observabilité : savoir quel pipeline a tiré la voix quand on debug).

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
- **OCR 3/OCR 4 + medium** : `MODEL_PRICING` distingue `mistral-ocr-4` ($4/1000 pages, OCR 4 `mistral-ocr-4-0`) de `mistral-ocr` ($2/1000, OCR 3 `mistral-ocr-2512`) — le greedy-prefix (plus long gagne) résout le bon tarif via le `response.model` daté capturé par `tracked-client`. `mistral-medium` ($1.5/$7.5 /M tokens) ajouté. **Tarifs affichés dans les sélecteurs Réglages** via `src/app/model-pricing.ts` (`modelPriceLabel` dérive de `MODEL_PRICING`, seul le suffixe d'unité est traduit → zéro duplication de prix dans l'i18n ; `toFixed(2)` sur tokens).
- **Chaîne de calcul** : `helpers/tracked-client.ts` wrappe le client Mistral (capture `ApiUsage`) → `helpers/usage-context.ts` (AsyncLocalStorage pour propager l'usage dans les pipelines async) → `helpers/cost-calc.ts` (conversion usage → € selon l'unité : `tokens` / `characters` / `pages` / `audio-seconds`) → `helpers/cost-persist.ts` (écriture dans `Project.costLog` + mise à jour `totalCost`) → `helpers/cost-middleware.ts` (injection du `costDelta` dans la réponse HTTP).
- **Contrat endpoint** : les réponses `/generate/*` et `/sources/*` décorent l'objet retourné (Generation ou Source) avec `estimatedCost: number`, `usage: GenerationUsage`, `costBreakdown: string[]`. **Seul** `POST /generate/auto/route` renvoie un champ top-level `costDelta: number` (coût du routage seul) — les autres `/generate/*` exposent leur coût via `gen.estimatedCost` uniquement. `GET /projects/:pid` retourne le projet enrichi de `totalCost` (somme calculée depuis `costLog[]`) + `costLog[]` historique.
- **Règle OBLIGATOIRE** : tout nouvel appel Mistral DOIT passer par `tracked-client` (jamais `new Mistral(...)` direct dans un generator). Sinon le coût échappe au tracking silencieusement — bug observabilité invisible côté UI.

### Persistance config.json
- **Dans `config.ts`**, toute écriture de `config.json` DOIT passer par le helper interne `persistConfig()` (jamais `writeFileSync(configPath, …)` direct). Sinon le backup `.corrupt.bak` n'est pas créé avant overwrite d'un fichier corrompu préservé → perte silencieuse du contenu user original. Ne s'applique pas aux fichiers ≠ `config.json` (logs, caches, etc.).
- Le flag module `lastLoadFailed` tracke l'état. Reset à `false` après tout `writeFileSync` réussi de `persistConfig`, indépendamment du succès du backup — un seul `.corrupt.bak` par cycle corrompu → restore (idempotence via `existsSync` dans `backupCorrupt()`).
- **Rejection legacy à saveConfig** : tout préfixe de champ migré one-time (actuellement `ttsModel: 'eleven_*'`) doit être rejeté côté `saveConfig` aussi, pas seulement dans `migrateLegacyElevenLabsFields`. Sinon une UI pré-PR ou client automatisé peut POSTer la valeur legacy entre 2 restart → fenêtre d'incohérence opaque. Pattern : `logger.warn` + garder la valeur courante (déjà non-legacy après boot), jamais reset vers DEFAULT.

### OCR confidence scores
- **Type** : `OcrConfidence = { average: number }` dans `types.ts` — stocké en `Source.ocrConfidence?` pour les sources PDF/image.
- **Extraction** : `generators/ocr.ts` passe `confidenceScoresGranularity: 'page'` à l'API Mistral OCR puis `extractConfidence()` (interne, non exporté) moyenne les `averagePageConfidenceScore` des pages, clampé dans `[0,1]`.
- **Tiers UI** : `src/app/helpers.ts` expose la méthode AppContext `ocrConfidenceTier(src: Source)` → `'high' | 'medium' | 'low' | null` (seuils ≥0.9 / ≥0.7, sinon `'low'`, `null` si `src.ocrConfidence` absent ou non-finite). Badges colorés dans la vue sources + i18n via clé `ocr.confidence` (9 langues). NB : la méthode prend un `Source` complet (pas un `score: number`) — utiliser `src.ocrConfidence?.average` en amont si tu n'as qu'un nombre.
- **Règle** : quand un score est bas, ne PAS bloquer la génération — afficher le badge warning et laisser l'utilisateur décider (les scores bas viennent souvent de scans de mauvaise qualité, pas d'un vrai problème de contenu).

### OCR model selection (OCR 3 défaut / OCR 4 option)
- **Source unique** : `helpers/ocr-models.ts` exporte `OCR_MODELS` (`['mistral-ocr-2512', 'mistral-ocr-4-0']`), le type `OcrModel`, `DEFAULT_OCR_MODEL = 'mistral-ocr-2512'` (OCR 3, $2/1000) et `normalizeOcrModel(v: unknown): OcrModel`. OCR 4 (`mistral-ocr-4-0`, $4/1000, 2× plus cher) reste opt-in — réservé aux scans difficiles. L'API ne change pas (`client.ocr.process` + `confidenceScoresGranularity: 'page'` compatible OCR 3 et 4).
- **Câblage** : `config.models.ocr` (longtemps champ mort, jamais lu) est désormais propagé — `routes/sources.ts` passe `normalizeOcrModel(getConfig().models.ocr)` à `ocrFile(client, path, name, model)`. Le sélecteur vit dans `dialog-settings.html` (2 `<option>` explicites bindées `configDraft._ocrModel`, style identique au dropdown Génération).
- **Anti-piège legacy** : `mergeSafe` préserve la valeur disque → un `config.json` avec l'ancien alias `mistral-ocr-latest` partirait silencieusement sur OCR 4. Parade à 3 niveaux : migration one-time `migrateLegacyOcrModel` dans `initConfig` (réécrit → OCR 3 + persiste via `persistConfig`), rejet symétrique dans `saveConfig` (cf. « Rejection legacy à saveConfig »), et `normalizeOcrModel` défensif au call site. `normalizeOcrModel(v: unknown)` : signature `unknown` + guard `typeof` OBLIGATOIRE sous `strict` (sinon `.includes(string | undefined)` casse le typecheck).

### HTML interactif
- Ne JAMAIS imbriquer de `<button>` dans un `<button>` (HTML invalide, casse le layout)
- Utiliser `<div role="button" tabindex="0" @click @keydown.enter>` quand le conteneur cliquable contient des boutons enfants
- Les boutons de generation dans view-sources sont dynamiques via `x-for` sur `categories` — ne pas hardcoder

### Pending generations & notifications

Cycle de vie des générations en cours :

- **Refresh / switch profil ≠ cancel**. Invariant absolu : la fermeture du socket HTTP côté client (refresh, switch onglet, switch profil, navigation, perte réseau) **ne déclenche AUCUN cancel serveur**. La génération continue, persiste son résultat en `completed` même si `res.json()` part dans le vide. Le seul chemin d'annulation = `POST /api/projects/:pid/generations/:gid/cancel` explicite. Ne JAMAIS brancher `req.on('close')` pour annuler une génération.
- **gid généré côté client** (`crypto.randomUUID()` dans `src/app/generate.ts`), passé au backend via `body.gid`. Permet `abortControllersByGid[gid]` immédiat et identifiant stable utilisable au moment du payload 200 fallback ou de l'event SSE. Le backend valide UUID v4 STRICT (`readClientGid` dans `routes/generate.ts` — version nibble = `4`, variant nibble dans `[89ab]`, aligné sur la regex client `confirm.ts:GID_UUID_V4`) ou retombe sur `randomUUID()` en cas de gid invalide. Pour `/generate/auto` (batch), la route NE LIT PAS `body.gid` : chaque step reçoit un gid serveur propre, car un body.gid global serait incohérent avec N générations.
- **Race promote/cancel** : `store.promoteToGeneration` retourne `PromoteResult = { kind: 'promoted', generation } | { kind: 'cancelled' } | { kind: 'failed', code } | { kind: 'missing' }`. Le handler dispatche : `200 generation` si promoted, `409 PromoteErrorResponse` (`types.ts`, `PromoteErrorOutcome = 'cancelled' | 'failed'` — pas `'missing'`) sinon. **Le `kind: 'missing'` du store est remappé server-side vers `error: 'failed'` côté wire** (cf. `routes/generate.ts:365` et `:1065`) car `'missing'` = symptôme bug observabilité (entry retirée du tracker entre cancel et promote), surfaceable seulement par `logger.error` (Sentry), jamais comme code applicatif côté client. Le type HTTP est découplé du discriminant store pour qu'un futur rename de `kind` ne casse pas le client. Plus de réponse 200 fantôme quand un cancel arrive pendant que Mistral travaille.
- **Boot sweep** : `store.cancelAllPendingsAtBoot()` au démarrage marque tous les `pendingTracker[].status === 'pending'` comme `cancelled`. Pas de TTL — par construction, tout pending sur disque vient d'un process mort. Si `getProject(meta.id)` retourne null (project.json corrompu), `logger.error` dédié (niveau **error volontaire** : project.json corrompu = bug observabilité critique, pas un warn) pour signaler les pendings ghost laissés en place. Le tracker est aussi pruné à chaque save : `pruneTrackerIfNeeded` applique en permanence l'intersection **max 50 terminaux ET ≤ 7 jours d'âge** (un terminal gardé doit satisfaire les deux contraintes ; les pendings actifs ne sont jamais prunés). Appelé sur **chaque save**, pas seulement quand `length > 50`, sinon des terminaux > 7j s'accumulent silencieusement sous le seuil.
- **`pendingTracker` séparé de `generations[]`** dans `ProjectData.results` (`types.ts`). Évite de polluer `generations: Generation[]` avec des entrées sans `data`. Promotion = remove du tracker + push dans generations atomique dans le même `saveProject`. Les terminaux ne suivent pas ce chemin : `markPendingFailed`/`markPendingCancelled` (et le helper privé `replacePendingWithTerminal`) remplacent l'entrée par index avec l'arm terminale et la gardent jusqu'au pruning.
- **`PendingTrackerEntry` est une discriminated union sur `status`** (`types.ts`) : `PendingTrackerEntryActive` (status: 'pending') | `PendingTrackerEntryTerminal` (status: 'failed' | 'cancelled', `failureCode` + `completedAt` OBLIGATOIRES). Conséquence : `markPendingFailed`/`markPendingCancelled`/`cancelAllPendingsAtBoot` ne peuvent PAS muter `entry.status` in-place — ils construisent un nouvel objet terminal et remplacent par index dans le tracker (cf. `replacePendingWithTerminal`). Ferme à compile-time l'état impossible `{status: 'pending', failureCode: 'cancelled'}`.
- **SSE format obligatoire** sur `GET /api/projects/:pid/events` : `event: generation\ndata: {...}\n\n`. La ligne `event:` est obligatoire pour matcher `addEventListener('generation', ...)` côté client. Sans elle, l'event tombe sur le canal `'message'` générique. Heartbeat `: keep-alive\n\n` toutes les 25s, avec compteur `HEARTBEAT_MAX_CONSECUTIVE_THROWS=3` pour cleanup forcé si `req.on('close')` ne fire jamais (bug Node socket half-open). Le payload SSE est typé `GenerationEvent` (`types.ts`), discriminated union sur `status` partagée serveur ↔ client : `generation` n'existe que sur `'completed'`, `failureCode` que sur `'failed'`/`'cancelled'`.
- **Idempotence à 2 niveaux côté client** :
  - `appendNotification(profileId, {eventKey, ...})` dans `src/app/notifications.ts` est idempotent par `eventKey` via le ledger localStorage `sf-profile-seen-events` (LRU cap 1000/profil, **JAMAIS cleared** — sinon réconciliation recrée les notifs supprimées). LRU régression-lockée dans `notifications.test.ts` (push 1001 → 1er évincé).
  - `shownToastEventKeys: Set<EventKey>` (type branded importé depuis `helpers/event-bus`) dans le state Alpine est la dédup tab-locale du toast UI. Un même eventKey produit max 1 toast UI par onglet.
  - Combinés : payload 200 + event SSE `completed` dans le même onglet → 1 toast et 1 notif persistée. SSE dans 2 onglets → 2 toasts (UX cohérente où l'user regarde) + 1 notif persistée cross-tabs.
- **Notifications i18n-aware** : `PersistedNotification` porte `messageKey` + `params` + `paramKeys` (sous-clés à traduire au render — ex: `{ type: 'gen.summary' }`), traduit via `renderNotificationMessage(t)` au moment du `x-text` dans le panneau cloche. La même notif persistée donne une sortie différente selon la langue UI courante. Champ `message: string` legacy conservé en fallback pour les notifs créées avant le refactor i18n.
- **Watermark conservateur lastSeenAt** : `reconcileStartedAt = new Date().toISOString()` capturé AVANT le fetch snapshot. Cutoff de réconciliation = `Date.parse(lastSeenIso ?? reconcileStartedAt)`. Au 1er load après migration, `lastSeenAt` est absent → cutoff = now → zéro backfill historique (pas de spam de 200 notifs sur un projet existant). Set du watermark se fait avec `reconcileStartedAt` (pas `now` post-backfill) pour ne jamais masquer un event arrivé entre snapshot et ouverture SSE.
- **`resetSession()`** (`src/app/session.ts`) invoqué par `selectProfile`, `selectProject`, `deleteProject`. Stop EventSource SSE, abort tous les `abortControllers` + `abortControllersByGid`, vide `loading{}`, `pendingById`, `toasts[]`, `shownToastEventKeys`, reset `confirmCallback` + `confirmTrigger`. **NE TOUCHE PAS** au ledger `seenEventKeys` ni à la liste `notifications` (mémoire persistante du profil, replay au retour). Régression-lockée par les tests négatifs `src/app/session.test.ts`.
- **Validations early extraites des generators** (`routes/generate.ts`) : tout `return null + res.status(4xx)` doit être SORTI en pre-handler AVANT `addPendingEntry`. Sinon un input invalide laisse un pending tracker entry orphelin. Helper `validateQuizReviewInputs` montre le pattern.
- **`storage` event cross-tab** : `src/main.ts` appelle `installCrossTabSync(globalThis, document)` (cf. `src/app/cross-tab-sync.ts`) qui enregistre le `addEventListener('storage', ...)` et bumpe `state.notificationsVersion` quand `sf-profile-notifications` change dans un autre onglet. Le storage event ne fire pas dans le tab qui écrit, donc combiné avec le bump local sur `appendNotification`, tous les onglets convergent. Le helper externalisé permet le test unitaire avec un `globalThis` stubbé.
- **`sf-lastProjectId` namespacé par profil** : map `sf-profile-last-project: {profileId: projectId}` (cf. `src/app/projects.ts` helpers en arrow). Migration silencieuse one-time au boot de la clé legacy `sf-lastProjectId`. Idempotent.
- **Limite documentée Mistral SDK** : la requête en cours côté serveur n'est PAS interruptible. Le cancel ne stoppe pas la facturation, il signifie "on ignore la réponse quand elle arrive" (via `promoteToGeneration` qui retourne `cancelled` et le handler 409).
- **SSE handler garde 404 + write-after-close protection** : `GET /api/projects/:pid/events` vérifie l'existence du projet AVANT `flushHeaders` (sinon listener `EventEmitter` orphelin sur pid bidon, cap 50 → MaxListenersWarning au bout de quelques typos client). `writeGenerationEvent` wrappe les `res.write` dans try/catch + `res.writableEnded` guard (race entre dispatch event-bus et `req.on('close')` → `ERR_STREAM_WRITE_AFTER_END` propagé au listener crashait le process). `res.on('error', ...)` attaché pour cleanup sur reset TCP brutal.
- **Cancel UI optimiste avec rollback** (`src/app/confirm.ts`) : `cancelPendingByGid` retire `pendingById[gid]` immédiatement (feedback instantané), mais si `POST /cancel` échoue (réseau down / 5xx) le snapshot est restauré + toast `cancelFailed`. Sans rollback, l'user croyait que c'était annulé alors que le backend continuait. `postCancel` retourne `boolean` (true si 200 ou 404 = race acceptée, false sinon).
- **`runAutoStep` propage le `errorCode` parsé** dans le tuple retourné (`{kind: 'failed', code}`) — `showAutoResult` priorise un toast actionnable (auth_required → settings, quota_exceeded → wait) sur le `partialGenerated` générique.
- **EventSource cap retries** (`src/app/sse-pendings.ts`) : après `RECONNECT_MAX_RETRIES = 8` échecs consécutifs (typiquement projet supprimé dans un autre tab → 404 répété, ou réseau durablement down), on stop la boucle de reconnect au lieu de marteler en backoff exp ad vitam. `console.warn` à chaque retry pour visibilité debug. Un `selectProject`/refresh ultérieur relance avec compteurs réinitialisés.
- **Bus filet anti-uncaughtException** (`helpers/event-bus.ts`) : `subscribeGeneration` wrappe le handler client dans try/catch + `bus.on('error', ...)` global. Sans ce filet, un throw d'un handler SSE (ex: `JSON.stringify` cyclique sur un payload buggué, write-after-end non capturé) remonte en `uncaughtException` et tue le process.

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
- Lancer `npm run test` apres chaque modification code. Pour une modif doc-only, `npx prettier --check CLAUDE.md` suffit sauf si la doc decrit un comportement de test/build a verifier.
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
  5. Si un check est `fail` : récupérer le finding (API `gh`, URL Codacy dans la colonne link), **reproduire localement** (`pipx run lizard -l typescript`, `npm run security`, `npm run lint`) AVANT de proposer un fix — jamais d'itération à l'aveugle (règle "Mesurer > deviner"). Appliquer le fix, `npm run test && npx prettier --check <fichiers> && npm run security` verts, skill `/commit`, `git push`. Utiliser `npm run format` seulement si l'intention est de reformater le repo.
  6. Reboucler jusqu'à tous verts ou finding non-trivial (dans ce cas stop et demander aide).
  7. Pièges connus : extraire un `fetch(url, ...)` hors de la fonction qui construit l'URL réactive `rule-node-ssrf` (cf. section Sécurité). `??=` pèse 2 dans Lizard. Pour les findings Codacy dont la source est Opengrep/Semgrep, `// nosemgrep: <rule-id>` est la syntaxe documentée ; `// codacy:ignore-next-line` n'existe pas, et il ne faut pas combiner `codeql[...]` + `nosemgrep` sur un seul commentaire.

## SonarQube

- **⚠️ Le quality gate SonarQube/SonarCloud d'une PR ne juge que le _code nouveau/modifié_ de la PR — PAS l'état global du projet.** Un check `SonarQube pass` / `SonarCloud pass` vert sur une PR NE signifie PAS « 0 issue sur le projet » : une PR qui ne touche que `package.json` (bump version/deps) passe le gate alors que des dizaines d'issues préexistantes restent ouvertes sur `main`. **Ne JAMAIS annoncer un codebase ou une release « tout au vert / 0 finding » sur la seule foi des checks CI verts** (idem `npm run security` Opengrep, qui couvre le SAST local, pas la dette SonarQube). Avant toute affirmation de propreté globale, lister les issues réelles via l'API (projet public, lecture anonyme) : `curl -s "https://sonarcloud.io/api/issues/search?componentKeys=jls42_EurekAI&resolved=false&ps=100"`. Toujours distinguer « gate de la PR vert » de « 0 dette projet » (règle « Mesurer > deviner »).
- **JS/TS** : `// NOSONAR(S1234) — raison concise` en **fin de ligne** flaggée (pratique réelle, cf. `generators/image.ts`, `helpers/index.ts`) ou ligne au-dessus.
- **Faux positif `S4325` (assertion inutile)** : le moteur de types de SonarQube est plus permissif que `tsc` (ex: il ignore certains `null` imbriqués). Avant de retirer un cast flaggé S4325, **retirer puis lancer `npm run typecheck`** : si tsc casse, le cast est porteur → faux positif, garder le cast + `// NOSONAR(S4325)` en fin de ligne avec la raison. Sinon, retirer (fix réel). Vérifier aussi qu'aucun import de type ne devient orphelin (eslint/knip).
- **HTML** : NOSONAR ne fonctionne PAS en HTML. Ajouter un texte fallback statique dans les elements `x-text` pour satisfaire les règles d'accessibilité (ex: `<span x-text="title">Chargement…</span>`).
- Faux positifs fréquents : `S1192` (string duplication) — souvent préférable d'extraire une constante plutôt qu'ignorer. `S3776` / `S6324` (complexity) — croiser avec `npm run lint:complexity` (Lizard CCN 8) avant de supprimer.

## Codacy

- **Codacy lance son PROPRE ESLint** — il ne lit PAS notre `eslint.config.js` (flat config ESLint 9), ne résout AUCUN type (pas de `parserOptions.project` fonctionnel dans son sandbox) et n'honore pas notre `argsIgnorePattern: '^_'`. Conséquence : sur tout fichier nouveau/modifié, faux positifs massifs (épisode PR #41 : 55 d'un coup) :
  - `@typescript-eslint/no-unsafe-call` / `-member-access` / `-assignment` car `describe/it/expect` de vitest ET les imports cross-module (ex: `resolvePricing` depuis `@helpers/*`) sont typés `error`.
  - `no-unused-vars` sur les **noms de params de signatures** (méthodes d'interface, alias de type fonction `(key: string) => string`) — purement documentaires mais flaggés « defined but never used ».
- **Codacy HONORE les `eslint-disable` inline** (vérifié : 55 → 0). C'est LE levier de suppression — **JAMAIS `.codacy.yml exclude_paths`** qui retire des fichiers entiers de l'analyse (perte de couverture, refusé sur ce repo). Pattern : `/* eslint-disable <règles> -- raison */` en tête de fichier (tests, petits helpers comme `helpers/ocr-models.test.ts`, `src/app/model-pricing.ts`) ou `// eslint-disable-next-line <règles> -- raison` sur la ligne (fichiers larges, suppression chirurgicale, cf. `src/app/app-context.ts`).
- **Viable en local** car `eslint.config.js` a `reportUnusedDisableDirectives: 'off'` : une directive sans effet local (la règle ne fire pas, types résolus correctement) ne casse PAS `lint:ci --max-warnings 0`. Sans ce flag, les disables seraient « unused » → fail local. Ne PAS réactiver ce flag.
- **Piège nom de règle** : « `'x' is defined but never used` » vient de la règle **base `no-unused-vars`**, PAS `@typescript-eslint/no-unused-vars` (même message, règle différente) — lister LES DEUX : `no-unused-vars, @typescript-eslint/no-unused-vars`. Les findings « unsafe » sont bien les `@typescript-eslint/no-unsafe-*`. Toujours **mesurer** le delta de findings après push (API `gh api repos/jls42/EurekAI/check-runs/<id>/annotations`) avant de conclure quelle règle cibler.
- **`.codacy.yml` ne peut PAS activer/désactiver un outil** (seulement le dashboard Code Patterns) ; il ne supporte que `exclude_paths`/`include_paths` (Java glob, fichier débutant par `---`). La correction de fond — Codacy ESLint étant redondant avec notre `lint:ci` type-aware et cassé ici — serait de désactiver l'engine ESLint côté **dashboard Codacy** (action humaine, hors repo).
- Rappel (cf. Sécurité) : `// codacy:ignore-next-line` n'existe PAS. Finding **Opengrep/Semgrep** via Codacy → `// nosemgrep` ; finding **ESLint** via Codacy → `// eslint-disable-*` (ci-dessus) ; ne jamais mélanger les syntaxes.

## Sécurité (SAST local)

- **Source de vérité locale** : Opengrep (fork open-source de Semgrep CE) via `npm run security` → `scripts/check-security.sh`. Configs `p/security-audit` + `p/default` + `p/nodejsscan`, `--severity=ERROR --error` (exit 1 sur toute error).
- **Intégration** : `.husky/pre-push` — bloque tout push avec finding ERROR. Pas dans pretest (scan ~12s, trop lent pour boucle commit).
- **Install** : `./scripts/install-opengrep.sh` (binaire standalone ~40Mo dans `~/.local/bin/`, auto-detect linux/osx x86/arm). Pas de devDependency npm (placeholder vide sur registry).
- **Procédure finding SAST avant fix** : (1) identifier le moteur réel et le rule-id exact dans l'annotation (CodeQL, Opengrep/Semgrep via Codacy, SonarQube, ESLint plugin, etc.) ; (2) lire la doc officielle courante de ce moteur/règle ; (3) reproduire localement quand possible (`npm run security`, `npm run lint`, `npm run lint:complexity`, test ciblé) ; (4) chercher les patterns existants dans le repo (`rg "<rule-id>|allowedUrls|nosemgrep|codeql\\[|NOSONAR"`), puis seulement coder. Toujours préférer un fix structurel compréhensible par l'outil à une suppression.
- **Suppression faux positifs** : deux mécanismes
  - Inline : `// nosemgrep: <rule-id> -- <raison>` (ou `// nosemgrep` seul pour ignore générique ligne suivante) immédiatement au-dessus de la ligne flaggée. Sur la MÊME ligne : `<code>; // nosemgrep: <rule-id>`. Multiples rules séparées par virgule.
  - Global : `--exclude-rule=<rule-id>` dans `scripts/check-security.sh` avec commentaire expliquant le pattern récurrent
- **Codacy / Opengrep / Semgrep** : quand l'annotation Codacy indique une source Opengrep/Semgrep, utiliser la doc Semgrep/Opengrep pour la syntaxe. **La syntaxe `// codacy:ignore-next-line` n'existe PAS** — c'est une invention LLM fréquente. Pour ignorer inline côté Opengrep/Semgrep, utiliser `// nosemgrep` ou `// nosemgrep: <rule-id>`. Attention : les rule-ids peuvent être namespacés côté Codacy (ex: `Semgrep_rules_lgpl_javascript_ssrf_rule-node-ssrf`) et ne sont pas toujours présents dans nos packs locaux ; si le ciblage exact est incertain, préférer un fix structurel ou, en dernier recours seulement, `// nosemgrep` seul avec justification.
- **Règle** : avant d'ajouter un ignore (inline ou global), **mesurer** en lançant le scan local pertinent — ne jamais ignorer à l'aveugle un finding Codacy/SonarQube/CodeQL sans avoir identifié le moteur et reproduit quand c'est possible (principe "Mesurer > deviner" ci-dessous). Note : certaines règles utilisées par les services SaaS ne sont PAS dans nos packs locaux ; dans ce cas, le seul moyen de valider le fix est le rescan post-push, donc minimiser les hypothèses et garder le patch structurel.
- **Fix `rule-node-ssrf` préféré = pattern whitelist.includes canonique** (pas d'ignore). Construire `allowedUrls`, puis faire englober directement le `fetch(url, ...)` par un bloc positif `if (allowedUrls.includes(url)) { ... }`. Les early-returns négatifs ou helpers trop éloignés peuvent être fonctionnellement équivalents mais rester invisibles pour l'analyse taint. **Variante URL libre (scraper user-provided)** : quand l'URL n'est pas dans une liste finie, construire une allowlist d'un élément à partir de l'URL déjà validée/canonisée (`buildFetchAllowlist(safeUrlStr) = [safeUrlStr]`), puis `if (allowedUrls.includes(safeUrlStr))` englobe directement le `fetch`. Cette variante est une barrière taint pour scanner, **pas** une validation SSRF autonome : ne jamais la copier sans validation upstream stricte (protocoles, hostnames, IPs privées/réservées, DNS, redirects). Toujours chercher un pattern existant dans le repo avant d'en inventer un nouveau (`rg "allowedUrls|rule-node-ssrf|nosemgrep|codeql\\["`).
- **Suppressions multi-outils** : ne jamais supposer qu'un commentaire vaut pour plusieurs moteurs. CodeQL utilise `// codeql[<query-id>]` sur une ligne de commentaire seule avant l'alerte ; Opengrep/Semgrep utilise `// nosemgrep` ou `// nosemgrep: <rule-id>` ; SonarQube utilise `NOSONAR`. Ne pas combiner deux syntaxes sur le même commentaire : placer des commentaires séparés, chacun au format exact de son outil, avec la justification dans un commentaire lisible au-dessus. Si Codacy affiche un rule-id `Semgrep_rules_... | Source Opengrep`, traiter le finding comme Opengrep même si l'UI mentionne aussi une catégorie générique.
- **Audit SSRF — pièges souvent oubliés** : (1) **RFC 2544 benchmark range `198.18.0.0/15`** (à ajouter aux private ranges avec 0.0/8, 10.0/8, 127.0/8, 169.254/16, 172.16/12, 192.0/24, 192.88/24, 192.168/16, 100.64/10) — un attaquant peut router via cette plage sur certains réseaux internes. (2) **IPv4-mapped IPv6 en format hex** : `::ffff:7f00:0001` est sémantiquement `127.0.0.1` mais le suffix `7f00:0001` ne parse PAS comme IPv4 littéral. Si `isPrivateIPv6` ne reconnaît que la forme textuelle `::ffff:127.0.0.1`, l'attaque hex passe. Fix : tenter `parseMappedIPv4Hex(suffix)` après échec `isIPv4(suffix)`, puis **fail-closed** (`return true`) si ni l'un ni l'autre ne parse — jamais `return false` par défaut sur un suffix `::ffff:` ambigu.
- **Effet secondaire subtil cleanup de dead code** : retirer un export ou un helper apparemment inutilisé peut faire ré-évaluer le graphe de taint par Codacy/Opengrep et **réactiver des findings dormants**. Quand un finding SAST apparaît après un commit "inoffensif", vérifier si la surface d'exports ou le shape du data-flow d'un fichier impliqué a changé.
- **Couverture actuelle** : SSRF (validation URL + pattern allowlist visible scanner + IPv4-mapped IPv6 hex / RFC 2544), timing attacks, XSS (sanitization HTML : attention aux boucles jusqu'au point fixe sur regex transformantes ; les regex qui ré-écrivent/échappent peuvent ne pas converger, réserver `stripUntilStable` aux regex qui SUPPRIMENT), injection, secrets hardcodes, expressjs patterns dangereux (rate-limiting sur routes auth & AI). Baseline attendue : 0 finding ERROR local et checks PR verts.

## Mesurer > deviner (règle OBLIGATOIRE)

**Dès qu'un fait est mesurable factuellement, mesurer AVANT de raisonner dessus.** Ne jamais estimer/supposer quand une vérification coûte quelques secondes. L'intuition est souvent fausse et les itérations basées sur elle coûtent 10× plus cher que la mesure directe.

Cas concrets (non exhaustif) :
- **Calcul** (somme, produit, pourcentage, unités, dates) : bash/python/calculette, jamais à la tête
- **Comptage** : `wc -l`, `grep -c`, `.length`, jamais "à peu près N"
- **Contenu fichier / comportement code** : lire le fichier, `grep`, lancer le test, jamais depuis la mémoire
- **Outils externes** (Codacy CCN, SonarQube, CI warnings) : lancer l'outil localement (`pipx run lizard`, `sonar-scanner`, etc.) pour voir ce qu'il voit réellement, jamais deviner la cause d'un flag
- **Dates relatives** (utilisateur dit "jeudi", "le mois dernier") : convertir en absolu via le contexte date, jamais extrapoler mentalement
- **Syntaxe/annotation d'un outil tiers** (CodeQL, SonarQube, Codacy, Semgrep, ESLint plugin externe…) : **toujours vérifier la syntaxe dans la doc officielle EN COURS** (WebSearch / context7 / docs de l'outil) **AVANT** de pousser une annotation. Mémoire LLM = syntaxes anciennes ou mélangées entre outils. Coût d'une recherche doc = quelques secondes, coût d'une mauvaise annotation = au moins un round-trip CI complet.

**Anti-patterns documentés** :
- Itérer plusieurs commits sur un signal Lizard/SAST sans reproduire localement ni lire la sortie exacte. Les parseurs SAST/complexité ont parfois des quirks (ex: fonctions top-level consécutives agglomérées, data-flow modifié par une extraction). Mesurer d'abord, puis changer le minimum.
- Tenter une suppression SSRF avant de savoir si le finding vient de CodeQL, Opengrep/Semgrep, SonarQube ou d'une combinaison. Les syntaxes se ressemblent mais ne sont pas interchangeables ; lire la doc du moteur exact, chercher les patterns locaux, préférer un fix structurel reconnu (`allowedUrls.includes(...)`) et vérifier les checks PR réels.

Garde-fou local actuel : `npm test` déclenche `pretest` → enchaîne **`typecheck` + `lint:complexity` + `lint:ci` + `lint:deadcode`** (sortie pipeline en cas d'échec d'un seul). `lint:complexity` → `scripts/check-complexity.sh` (Lizard CCN 8 strict, scope **full-repo `-l typescript`** — toute régression bloque `npm test`). Pièges connus :
- **`-l javascript` ne parse pas les `.ts` en walk-dossier** — Lizard doit être invoqué avec `-l typescript` explicitement, sinon 0 violation silencieusement.
- **`??=` pèse 2 dans le comptage Lizard** (nullish check + assignment) — à retenir lors de l'application du fix `prefer-nullish-coalescing`.
- **`function foo()` top-level consécutives agglomérées** — le parseur Lizard TS peut agglomérer des `function` déclarations consécutives en une seule fonction pour compter le CCN. Fix standard : convertir un des helpers adjacents en `const foo = (): T => { ... }` arrow — Lizard ne les agglomère pas. `export function` délimite aussi correctement. À retenir quand on ajoute un helper privé à côté d'un existant.

## Conventions detaillees

Voir `.claude/rules/` pour :
- `add-feature.md` — Checklist pour ajouter un generateur ou une source
- `prompts.md` — Conventions prompts IA (lang, ageGroup, anti-leak, retry, few-shots)

Structure fichiers, routes API et patterns critiques : voir directement la section **Structure du projet** du `README.md` (détaillée et maintenue), ou lire les sources — `server.ts`, `routes/*.ts`, `generators/*.ts`, `helpers/*.ts`.
