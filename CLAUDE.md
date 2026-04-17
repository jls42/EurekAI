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
- Codes : `llm_invalid_json`, `quota_exceeded`, `tts_upstream_error`, `context_length_exceeded`, `internal_error`
- Status 502 quand tous les steps échouent (`allFailed`), 200 sinon
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

## SonarQube

- **JS/TS** : `// NOSONAR(S1234) — raison concise`
- **HTML** : NOSONAR ne fonctionne PAS en HTML. Ajouter un texte fallback statique dans les elements `x-text`.
- Details, faux positifs connus et solutions dans `.claude/rules/sonarqube.md` (charge auto sur fichiers src/)

## Conventions detaillees

Voir `.claude/rules/` pour :
- `architecture.md` — Structure fichiers, patterns critiques, modeles IA
- `api-routes.md` — Routes API completes
- `add-feature.md` — Checklist pour ajouter un generateur ou une source
- `prompts.md` — Conventions prompts IA (lang, ageGroup, TTS)
