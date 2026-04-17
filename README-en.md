<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Turn any content into an interactive learning experience — powered by <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Démo YouTube"></a>
</p>

<h4 align="center">📊 Code quality</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Security Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Reliability Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Maintainability Rating"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Vulnerabilities"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Lines of Code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Story — Why EurekAI?

**EurekAI** was born during the [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([official site](https://worldwide-hackathon.mistral.ai/)) (March 2026). I needed a topic — and the idea came from something very concrete: I regularly prepare tests with my daughter, and I thought it should be possible to make that more fun and interactive with AI.

The goal: take **any input** — a photo of the lesson, copied-and-pasted text, a voice recording, a web search — and turn it into **revision sheets, flashcards, quizzes, podcasts, fill-in-the-blank exercises, illustrations, and more**. All powered by Mistral AI's French models, making it a naturally suitable solution for French-speaking students.

The [initial prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) was built in 48 hours during the hackathon as a proof of concept around Mistral's services — already functional, but limited. Since then, EurekAI has become a real project: fill-in-the-blank exercises, exercise navigation, web scraping, configurable parental moderation, thorough code review, and much more. All the code is AI-generated — mainly by [Claude Code](https://code.claude.com/), with some contributions via [Codex](https://openai.com/codex/) and [Gemini CLI](https://geminicli.com/).

---

## Features

| | Feature | Description |
|---|---|---|
| 📷 | **File import** | Import your lessons — photo, PDF (via Mistral OCR with confidence score) or text file (TXT, MD) |
| 📝 | **Text input** | Type or paste any text directly |
| 🎤 | **Voice input** | Record yourself — Voxtral STT transcribes your voice |
| 🌐 | **Web / URL** | Paste a URL (direct scraping via Readability + Lightpanda) or type a search (Mistral web_search Agent) |
| 📄 | **Revision sheets** | Structured notes with key points, vocabulary, quotes, anecdotes |
| 🃏 | **Flashcards** | Interactive Q&A cards, narrated audio reading |
| ❓ | **MCQ quiz** | Multiple-choice questions with adaptive review of mistakes (configurable number) |
| ✏️ | **Fill-in-the-blank exercises** | Exercises to complete with hints and tolerant validation |
| 🎙️ | **Podcast** | Two-voice mini-podcast in audio — Mistral voice by default or custom voices (parents!) |
| 🖼️ | **Illustrations** | Educational images generated by a Mistral Agent |
| 🗣️ | **Voice quiz** | Questions read aloud (custom voice possible), spoken answer, AI verification |
| 💬 | **AI tutor** | Contextual chat with your course documents, with tool calling |
| 🧠 | **Automatic router** | A router based on `mistral-small-latest` analyzes the content and suggests a combination of generators among the 7 available types |
| 🔒 | **Parental control** | Configurable moderation by profile (customizable categories), parental PIN, chat restrictions |
| 🌍 | **Multilingual** | Interface available in 9 languages; AI generation controllable in 15 languages via prompts |
| 🔊 | **Read aloud** | Listen to sheets and flashcards (question/answer dialogue) via Mistral Voxtral TTS or ElevenLabs |

---

## Architecture overview

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Model usage map

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## User journey

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Deep dive — Features

### Multi-modal input

EurekAI accepts 4 types of sources, moderated according to the profile (enabled by default for child and teen) :

- **File import** — JPG, PNG or PDF files processed by `mistral-ocr-latest` (printed text, tables, handwriting), or text files (TXT, MD) imported directly.
- **Free text** — Type or paste any content. Moderated before storage if moderation is active.
- **Voice input** — Record audio in the browser. Transcribed by `voxtral-mini-latest`. The `language="fr"` parameter optimizes recognition.
- **Web / URL** — Paste one or more URLs to scrape content directly (Readability + Lightpanda for JS pages), or type keywords for a web search via Mistral Agent. The single field accepts both — URLs and keywords are automatically separated, each result creates an independent source.

### AI content generation

Seven types of generated learning material:

| Generator | Model | Output |
|---|---|---|
| **Revision sheet** | `mistral-large-latest` | Title, summary, key points, vocabulary, quotes, anecdote |
| **Flashcards** | `mistral-large-latest` | Q&A cards with source references (configurable number) |
| **MCQ quiz** | `mistral-large-latest` | Multiple-choice questions, explanations, adaptive review (configurable number) |
| **Fill-in-the-blank exercises** | `mistral-large-latest` | Sentences to complete with hints, tolerant validation (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | 2-voice script → MP3 audio |
| **Illustration** | Mistral `mistral-large-latest` | Educational image via the `image_generation` tool |
| **Voice quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS questions → STT answer → AI verification |

### AI chat tutor

A conversational tutor with full access to course documents:

- Uses `mistral-large-latest`
- **Tool calling**: can generate revision sheets, flashcards, quizzes or fill-in-the-blank exercises during the conversation
- 50-message history per course
- Content moderation if enabled for the profile

### Automatic router

The router uses `mistral-small-latest` to analyze source content and suggest the most relevant generators among the 7 available. The interface shows real-time progress: first an analysis phase, then individual generations with cancellation available.

### Adaptive learning

- **Quiz statistics**: tracks attempts and accuracy per question
- **Quiz review**: generates 5-10 new questions targeting weak concepts
- **Instruction detection**: detects revision instructions ("I know my lesson if I know...") and prioritizes them in compatible text generators (sheet, flashcards, quiz, fill-in-the-blank exercises)

### Security & parental control

- **4 age groups**: child (≤10 years), teen (11-15), student (16-25), adult (26+)
- **Content moderation**: `mistral-moderation-latest` with 10 available categories, 5 blocked by default for child/teen (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categories customizable by profile in settings.
- **Parental PIN**: SHA-256 hash, required for profiles under 15 years old. For a production deployment, use a slow hash with salt (Argon2id, bcrypt).
- **Chat restrictions**: AI chat disabled by default for under 16s, can be enabled by parents

### Multi-profile system

- Multiple profiles with name, age, avatar, language preferences
- Projects linked to profiles via `profileId`
- Cascading delete: deleting a profile deletes all its projects

### Multi-provider TTS & custom voices

- **Mistral Voxtral TTS** (default) : `voxtral-mini-tts-latest`, no additional key needed
- **ElevenLabs** (alternative) : `eleven_v3`, natural voices, requires `ELEVENLABS_API_KEY`
- Provider configurable in the app settings
- **Custom voices**: parents can create their own voices via the Mistral Voices API (from an audio sample) and assign them to the host/guest roles — podcasts and voice quizzes are then read in a parent's voice, making the experience even more immersive for the child
- Two configurable voice roles: **host** (main narrator) and **guest** (second voice in the podcast)
- Full Mistral voice catalog available in settings, filterable by language

### Internationalization

- Interface available in 9 languages: fr, en, es, pt, it, nl, de, hi, ar
- AI prompts support 15 languages (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Language configurable by profile

---

## Tech stack

| Layer | Technology | Role |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server and type safety |
| **Backend** | Express 5.x | REST API |
| **Dev server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactive interface, TypeScript compiled by Vite |
| **Templating** | vite-plugin-handlebars | HTML composition by partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS (default)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrated voice synthesis |
| **TTS (alternative)** | ElevenLabs SDK 2.x | `eleven_v3`, natural voices |
| **Icons** | Lucide 1.x | SVG icon library |
| **Web scraping** | Readability + linkedom | Extraction of the main content from web pages (Firefox Reader View tech) |
| **Headless browser** | Lightpanda | Ultra-light headless browser (Zig + V8) for JS/SPA pages — scraping fallback |
| **Markdown** | Marked | Markdown rendering in chat |
| **File upload** | Multer 2.x | Multipart form handling |
| **Audio** | ffmpeg-static | Concatenation of audio segments |
| **Tests** | Vitest | Unit tests — coverage measured by SonarCloud |
| **Persistence** | JSON files | Dependency-free storage |

---

## Model reference

| Model | Use | Why |
|---|---|---|
| `mistral-large-latest` | Sheet, Flashcards, Podcast, Quiz, Fill-in-the-blank exercises, Chat, Voice quiz verification, Image Agent, Web Search Agent, Instruction detection | Best multilingual + instruction following |
| `mistral-ocr-latest` | Document OCR | Printed text, tables, handwriting |
| `voxtral-mini-latest` | Speech recognition (STT) | Multilingual STT, optimized with `language="fr"` |
| `voxtral-mini-tts-latest` | Text-to-speech (TTS) | Podcasts, voice quiz, read aloud |
| `mistral-moderation-latest` | Content moderation | 5 categories blocked for child/teen (+ jailbreaking) |
| `mistral-small-latest` | Automatic router | Fast content analysis for routing decisions |
| `eleven_v3` (ElevenLabs) | Text-to-speech (alternative TTS) | Natural voices, configurable alternative |

---

## Quick start

```bash
# Cloner le dépôt
git clone https://github.com/jls42/EurekAI.git
cd EurekAI

# Installer les dépendances
npm install

# Configurer les clés API
cp .env.example .env
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=<your_api_key>           (requis)
#   ELEVENLABS_API_KEY=<your_api_key>        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Note**: Mistral Voxtral TTS is the default provider — no additional key needed beyond `MISTRAL_API_KEY`. ElevenLabs is an alternative TTS provider configurable in the settings.

---

## Container deployment

The image is published on **GitHub Container Registry** :

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=<your_api_key> \
  -e ELEVENLABS_API_KEY=<your_api_key> \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** is a Podman rootless flag that automatically adjusts volume permissions.
> **`ELEVENLABS_API_KEY`** is optional (alternative TTS).

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Project structure

```
server.ts                 — Point d'entrée Express, monte les routes + config
config.ts                 — Config runtime (modèles, voix, TTS provider), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (7 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF)
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (5-50, configurable)
  quiz.ts                 — Quiz QCM (5-50 questions, configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
  podcast.ts              — Script podcast 2 voix
  quiz-vocal.ts           — Quiz vocal : questions TTS + réponses STT + vérification IA
  image.ts                — Génération d'image via Agent Mistral (outil image_generation)
  chat.ts                 — Tuteur IA par chat avec appel d'outils
  router.ts               — Routeur automatique (contenu → générateurs recommandés)
  consigne.ts             — Détection de consignes de révision
  tts-provider.ts         — Dispatch TTS multi-provider (Mistral Voxtral / ElevenLabs)
  tts.ts                  — Génération audio multi-voix (podcast + flashcards, concaténation de segments)
  stt.ts                  — Voxtral STT (audio → texte)
  websearch.ts            — Agent Mistral avec outil web_search (fallback)
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Import fichiers (OCR + texte brut), texte libre, voix STT, scraping URL + recherche web, modération
  generate.ts             — Endpoints de génération (7 types + auto + route)
  generations.ts          — Tentatives de quiz/fill-blank, réponses vocales, lecture à voix haute
  chat.ts                 — Chat IA avec appel d'outils

helpers/
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, randomSeed)

src/                      — Frontend (Vite + Handlebars)
  index.html              — Point d'entrée HTML principal
  main.ts                 — Entrée frontend (init Alpine.js + icônes Lucide)
  app/                    — Modules applicatifs Alpine.js
    state.ts              — Gestion d'état réactif
    navigation.ts         — Routage des vues + gardes par âge
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, auto 2 phases)
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    config.ts             — Interface de configuration (modèles, voix, TTS provider)
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
    fill-blank.ts         — Composant textes à trous
    flashcards.ts         — Composant flashcards avec retournement
    step-by-step.ts       — Mixin navigation pas-à-pas (quiz, fill-blank, flashcards)
  i18n/
    fr.ts, en.ts, es.ts, — Dictionnaires par langue (9 langues)
    pt.ts, it.ts, nl.ts,
    de.ts, hi.ts, ar.ts
    languages.ts          — Registre des langues UI disponibles
    index.ts              — Chargeur i18n
  partials/               — Partials HTML Handlebars (header, sidebar, dialogues, vues)
  styles/
    main.css              — Entrée TailwindCSS
    theme.css             — Variables de thème personnalisées

public/assets/            — Ressources statiques (logo, avatars)
output/                   — Données d'exécution (projets, config, fichiers audio)
```

---

## API reference

### Config
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Current configuration |
| `PUT` | `/api/config` | Modify config (models, voices, TTS provider) |
| `GET` | `/api/config/status` | API status (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Reset to default config |
| `GET` | `/api/config/voices` | List Mistral TTS voices (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Available moderation categories + age defaults |

### Profiles
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles` | List all profiles |
| `POST` | `/api/profiles` | Create a profile |
| `PUT` | `/api/profiles/:id` | Update a profile (PIN required for < 15 years old) |
| `DELETE` | `/api/profiles/:id` | Delete a profile + cascading projects `{pin?}` → `{ok, deletedProjects}` | ### Projects
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | List projects (`?profileId=` optional) |
| `POST` | `/api/projects` | Create a project `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Project details |
| `PUT` | `/api/projects/:pid` | Rename `{name}` |
| `DELETE` | `/api/projects/:pid` | Delete the project |

### Sources
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import multipart files (OCR for JPG/PNG/PDF, direct reading for TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Free text `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT voice (multipart audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL scraping or web search `{query}` — returns an array of sources |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Delete a source |
| `POST` | `/api/projects/:pid/moderate` | Moderate `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detect revision instructions |

### Generation
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Revision sheet |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | MCQ quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Fill-in-the-blanks texts |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Voice quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive revision `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routing analysis (plan of generators to launch) |
| `POST` | `/api/projects/:pid/generate/auto` | Auto backend generation (routing + 7 types: summary, flashcards, quiz, fill-blank, podcast, voice-quiz, image). Parallel execution — assumes a Mistral tier with rate limit ≥ 7 simultaneous requests; otherwise several 429s may be returned in `failedSteps`. |

All generation routes accept `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` also requires `{generationId, weakQuestions}`.

### Generation CRUD
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Submit quiz answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Submit fill-in-the-blank answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Check an oral answer (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS reading aloud (sheets/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Rename `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Delete the generation |

### Chat
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Retrieve chat history |
| `POST` | `/api/projects/:pid/chat` | Send a message `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Clear chat history |

---

## Architectural decisions

| Decision | Justification |
|---|---|
| **Alpine.js rather than React/Vue** | Minimal footprint, lightweight reactivity with TypeScript compiled by Vite. Perfect for a hackathon where speed matters. |
| **Persistence in JSON files** | Zero dependencies, instant startup. No database to configure — just start and go. |
| **Vite + Handlebars** | The best of both worlds: fast HMR for development, HTML partials for code organization, Tailwind JIT. |
| **Centralized prompts** | All AI prompts in `prompts.ts` — easy to iterate, test, and adapt by language/age group. |
| **Multi-generation system** | Each generation is an independent object with its own ID — allows multiple sheets, quizzes, etc. per course. |
| **Age-adapted prompts** | 4 age groups with different vocabulary, complexity, and tone — the same content teaches differently depending on the learner. |
| **Agent-based features** | Image generation and web search use temporary Mistral Agents — clean lifecycle with automatic cleanup. |
| **Intelligent URL scraping** | A single field accepts mixed URLs and keywords — URLs are scraped via Readability (static pages) with Lightpanda fallback (JS/SPA pages), keywords trigger a Mistral web_search Agent. Each result creates an independent source. |
| **Multi-provider TTS** | Mistral Voxtral TTS by default (no extra key), ElevenLabs as an alternative — configurable without restarting. |

---

## Credits & thanks

- **[Mistral AI](https://mistral.ai)** — AI models (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternative text-to-speech engine (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lightweight reactive framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility CSS framework
- **[Vite](https://vitejs.dev)** — Frontend build tool
- **[Lucide](https://lucide.dev)** — Icon library
- **[Marked](https://marked.js.org)** — Markdown parser
- **[Readability](https://github.com/mozilla/readability)** — Web content extraction (Firefox Reader View technology)
- **[Lightpanda](https://lightpanda.io)** — Ultra-light headless browser for scraping JS/SPA pages

Started during the Mistral AI Worldwide Hackathon (March 2026), developed entirely by AI with [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) and [Gemini CLI](https://geminicli.com/).

---

## Author

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## License

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**This document has been translated from the fr version into the en language using the gpt-5.4-mini model. For more information about the translation process, see https://gitlab.com/jls42/ai-powered-markdown-translator**

