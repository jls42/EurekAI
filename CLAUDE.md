# EurekAI

Application educative IA : photo/texte/voix -> fiches + flashcards + quiz + podcast + traduction EN.
Concu pour un enfant de 9 ans. Powered by Mistral AI + ElevenLabs.

## Hackathon Rules (Mistral AI Worldwide Hackathon)

- Tout le projet doit etre construit pendant le hackathon
- Equipe de 1 a 4 participants
- Libs open-source, APIs et modeles pre-entraines autorises si credites
- Code + demo soumis avant la deadline finale
- Respect des lois, ethique IA et code of conduct
- APIs Mistral et sponsors utilisees selon leurs ToS
- Disqualification possible si regles violees ou pratiques deloyales

## Stack

- **Backend** : TypeScript, Express, tsx (dev)
- **Frontend** : HTML + TailwindCSS CDN + Alpine.js (pas de build)
- **APIs** : Mistral AI (chat, OCR, STT, agents, moderation), ElevenLabs (TTS)

## Lancement

```bash
npm install
npm run dev    # tsx watch server.ts -> http://localhost:3000
```

## Architecture

```
server.ts          — Point d'entree Express (~60 lignes), monte routes + config
config.ts          — Config runtime (modeles, voix, TTS) persistee dans output/config.json
store.ts           — ProjectStore : CRUD projets/sources/generations, persistence JSON
types.ts           — Types : Source, Generation (union 6 types), QuizStats, Profile, AppConfig
prompts.ts         — Tous les prompts AI centralises (system + user templates, 15 langues)
profiles.ts        — ProfileStore : gestion profils, PIN SHA-256

routes/
  projects.ts      — CRUD projets
  profiles.ts      — CRUD profils avec gestion PIN
  sources.ts       — Upload OCR, texte libre, voix (STT), recherche web, moderation
  generate.ts      — Generation summary/flashcards/quiz/quiz-vocal/podcast/image/auto
  generations.ts   — Quiz-attempt, vocal-answer, traduction, renommer, supprimer
  chat.ts          — Chat IA avec tool calling

generators/
  ocr.ts           — Upload + OCR Mistral (JPG, PNG, PDF)
  summary.ts       — Fiche de revision (JSON structure)
  flashcards.ts    — 5 flashcards Q/R
  quiz.ts          — Quiz QCM 10-20 questions + quiz-vocal (TTS-friendly) + quiz-review
  podcast.ts       — Script podcast 2 voix (host Alex + guest Zoe)
  quiz-vocal.ts    — TTS questions + STT reponses + verification IA
  image.ts         — Generation image via Agent Mistral (image_generation tool)
  chat.ts          — Chat tuteur IA avec tool calling (generate inline)
  router.ts        — Routeur intelligent (mistral-small, recommande les generateurs)
  consigne.ts      — Detection de consignes de revision
  tts.ts           — Audio ElevenLabs (eleven_v3, concat segments)
  translate.ts     — Traduction FR->EN (preserve JSON structure)
  moderation.ts    — Moderation contenu (9 categories)
  stt.ts           — Voxtral STT (transcription audio -> texte)
  websearch.ts     — Agent Mistral avec web_search tool

helpers/
  index.ts         — safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts         — collectStream (ReadableStream -> Buffer)

public/
  index.html       — HTML structure (sidebar + 3 zones)
  app.js           — Alpine.js app (quiz interactif, enregistrement vocal, settings)
```

## Modeles utilises

| Usage | Modele | Pourquoi |
|-------|--------|----------|
| Fiche, Flashcards, Podcast, Traduction | mistral-large-latest | Meilleur multilingual + instruction |
| Quiz (QCM) | mistral-large-latest | Raisonnement, questions pertinentes |
| OCR | mistral-ocr-latest | 96.6% tables, 88.9% handwriting |
| STT | voxtral-mini-latest | ~4% WER, langue=fr 4x+ rapide |
| Moderation | mistral-moderation-latest | 9 categories, garde-fou enfants |
| Web search | Agent mistral-large-latest + web_search | Recherche complementaire |
| TTS | eleven_v3 (ElevenLabs) | Voix naturelles FR |

## Patterns critiques

- **JSON agents** : `safeParseJson()` retire les blocs markdown, `unwrapJsonArray()` gere `{key:[...]}` vs `[...]`
- **OCR** : `purpose="ocr"` obligatoire pour upload, supporte JPG/PNG/PDF
- **Voxtral STT** : `language="fr"` = 4x+ rapide, `voxtral-mini-latest`
- **ElevenLabs TTS** : `eleven_v3`, voix configurable, `collectStream()` pour async iterable
- **Agent web_search** : creer agent temporaire, `extractAllText()` recursif sur outputs, cleanup apres
- **Multi-generations** : chaque generation = objet avec id/title/type/data/dataEN, stockees dans `results.generations[]`
- **Quiz adaptatif** : QuizStats avec tentatives + stats par question, quiz-review genere 5-10 nouvelles questions
- **Migration auto** : ancien format plat (summary/flashcards/quiz) -> generations[] au chargement

## Regles OBLIGATOIRES pour tout generateur/route

### Toujours passer `lang` et `ageGroup`
Chaque route de generation et chaque appel IA DOIT recevoir et transmettre :
- `lang` (depuis `req.body.lang`, defaut `"fr"`) — controle la langue du contenu genere ET des feedbacks IA
- `ageGroup` (depuis `req.body.ageGroup`, defaut `"enfant"`) — adapte vocabulaire et complexite

Le frontend envoie ces valeurs via `getLocale()` et `currentProfile.ageGroup`. Ne JAMAIS hardcoder `"fr"` ou `"enfant"`.

### Systeme de traduction i18n (frontend)
- Tous les textes UI utilisent `t('cle.traduction')` via le systeme i18n Alpine.js
- Les traductions sont dans `src/i18n/fr.ts` et `src/i18n/en.ts`
- Ne JAMAIS ecrire de texte en dur dans les templates HTML — toujours utiliser `x-text="t('...')"` ou `:placeholder="t('...')"`
- Quand on ajoute un texte visible, ajouter la cle dans les DEUX fichiers (fr + en)
- Le test `src/i18n/i18n-sync.test.ts` verifie que les cles sont synchronisees

### Prompts adaptes au contexte
- `langInstruction(lang)` dans `prompts.ts` ajoute l'instruction de langue aux prompts IA
- `ageInstruction(ageGroup)` adapte le ton et la complexite (enfant/ado/etudiant/adulte)
- Pour le quiz vocal : utiliser les prompts `quizVocalSystem/quizVocalUser` qui ajoutent des regles TTS (chiffres romains en toutes lettres, abreviations developpees, etc.)

### Features needing ElevenLabs
- Podcast et Quiz vocal necessitent `ELEVENLABS_API_KEY`
- Cote frontend : griser les boutons avec `:disabled="!apiStatus.elevenlabs"` + tooltip `t('gen.needsElevenLabs')`
- `apiStatus` est charge au demarrage depuis `GET /api/config/status`

## Ajouter un generateur

1. Creer `generators/mon_generateur.ts` avec signature `(client, markdown, model?) -> data`
2. Ajouter le type dans `types.ts` (union Generation)
3. Ajouter la route dans `routes/generate.ts`
4. Ajouter le bouton dans `public/index.html` zone 2
5. Ajouter l'affichage dans `public/index.html` zone 3

## Ajouter une source

1. Creer le generateur dans `generators/` si besoin
2. Ajouter la route dans `routes/sources.ts`
3. Ajouter l'UI dans `public/index.html` + `public/app.js`

## Routes API

### Config
- `GET /api/config` — Config courante
- `PUT /api/config` — Modifier config (modeles, voix, TTS)
- `GET /api/config/status` — Statut APIs (mistral, elevenlabs)

### Projets
- `GET /api/projects` — Liste projets
- `POST /api/projects` — Creer projet `{name}`
- `GET /api/projects/:pid` — Detail projet
- `PUT /api/projects/:pid` — Renommer `{name}`
- `DELETE /api/projects/:pid` — Supprimer

### Sources
- `POST /api/projects/:pid/sources/upload` — Upload OCR (multipart files)
- `POST /api/projects/:pid/sources/text` — Texte libre `{text}`
- `POST /api/projects/:pid/sources/voice` — Voix STT (multipart audio)
- `POST /api/projects/:pid/sources/websearch` — Recherche web `{query}`
- `DELETE /api/projects/:pid/sources/:sid` — Supprimer source
- `POST /api/projects/:pid/moderate` — Moderer `{text}`

### Profils
- `GET /api/profiles` — Liste profils
- `POST /api/profiles` — Creer profil
- `PUT /api/profiles/:id` — Modifier (PIN requis < 15 ans)
- `DELETE /api/profiles/:id` — Supprimer + cascade projets

### Generation
Toutes les routes acceptent `{sourceIds?, lang?, ageGroup?}` :
- `POST /api/projects/:pid/generate/summary` — Fiche
- `POST /api/projects/:pid/generate/flashcards` — Flashcards
- `POST /api/projects/:pid/generate/quiz` — Quiz QCM
- `POST /api/projects/:pid/generate/quiz-vocal` — Quiz vocal (TTS-friendly, necessite ElevenLabs)
- `POST /api/projects/:pid/generate/podcast` — Podcast (necessite ElevenLabs)
- `POST /api/projects/:pid/generate/image` — Illustration
- `POST /api/projects/:pid/generate/auto` — Routeur intelligent
- `POST /api/projects/:pid/generate/quiz-review` — Revision `{generationId, weakQuestions}`

### Generations CRUD
- `POST /api/projects/:pid/generations/:gid/quiz-attempt` — Score `{answers}`
- `POST /api/projects/:pid/generations/:gid/vocal-answer` — Reponse vocale (multipart audio + questionIndex + lang)
- `POST /api/projects/:pid/generations/:gid/translate` — Traduire EN
- `PUT /api/projects/:pid/generations/:gid` — Renommer `{title}`
- `DELETE /api/projects/:pid/generations/:gid` — Supprimer

### Chat
- `POST /api/projects/:pid/chat` — Message `{message}`
- `DELETE /api/projects/:pid/chat` — Effacer historique

## SonarQube — NOSONAR conventions

Ce projet utilise Alpine.js qui genere du contenu dynamique invisible a l'analyse statique de SonarQube.
Quand une remontee SonarQube est un faux positif, annoter la ligne avec le pattern :

- **JS/TS** : `// NOSONAR(S1234) — raison concise du skip`
- **HTML** : `<!-- NOSONAR(S1234) — raison concise du skip -->`

Faux positifs connus dans ce projet :
- `S5254` Headings vides — Alpine.js `x-text` remplit le contenu au runtime
- `S5765` Labels non associes — Labels avec `x-text` suivis d'inputs avec `x-model`
- `S4043` replace vs replaceAll — Regex avec flag `g` + callback avec capture groups
- `S1082` Keyboard handlers sur div — Alpine.js `@keydown` equivalent a `onKeyDown` natif
