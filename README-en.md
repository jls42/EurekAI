<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transform any content into an interactive learning experience — powered by <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Spanish</a> · <a href="README-pt.md">🇧🇷 Portuguese</a> · <a href="README-de.md">🇩🇪 German</a> · <a href="README-it.md">🇮🇹 Italian</a> · <a href="README-nl.md">🇳🇱 Dutch</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polish</a> · <a href="README-ro.md">🇷🇴 Romanian</a> · <a href="README-sv.md">🇸🇪 Swedish</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube demo"></a>
</p>

<h4 align="center">📊 Code quality</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Security Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Reliability Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Maintainability Rating"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilities"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Lines of Code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## The Story — Why EurekAI?

**EurekAI** was born during the [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([official site](https://worldwide-hackathon.mistral.ai/)) (March 2026). I needed a topic — and the idea came from something very concrete: I regularly prepare tests with my daughter, and I thought it should be possible to make that more fun and interactive with AI.

The goal: take **any input** — a photo of the lesson, copied-and-pasted text, a voice recording, a web search — and turn it into **revision sheets, flashcards, quizzes, podcasts, fill-in-the-blanks, illustrations, and more**. All powered by French Mistral AI models, making it a solution naturally suited to French-speaking students.

The [initial prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) was built in 48 hours during the hackathon as a proof of concept around Mistral services — already functional, but limited. Since then, EurekAI has become a real project: fill-in-the-blanks, exercise navigation, web scraping, configurable parental moderation, in-depth code review, and much more. All of the code is AI-generated — mainly [Claude Code](https://code.claude.com/), with a few contributions via [Codex](https://openai.com/codex/) and [Gemini CLI](https://geminicli.com/).

---

## Overview

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI guided tour: sources, sheet, quiz, flashcards, illustrations" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recent generations, estimated cost per card and project total, “Auto — Magic!” button | ![Sources](docs/screenshots/sources.webp)<br>**Sources** — photo/PDF/text/voice/web import, one-click generation, instruction detection |

Each imported source displays its [OCR confidence score, moderation, and estimated cost](docs/screenshots/sources-list.webp).

### Components in action

| | |
|---|---|
| ![Revision sheet](docs/screenshots/notes.gif)<br>**Revision sheet** — key points, vocabulary, sourced quotes, audio reading by section | ![Quiz](docs/screenshots/quiz.gif)<br>**Multiple-choice quiz** — immediate feedback with explanation, step-by-step navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — flip card then self-assessment “I knew it / I didn't know it” | ![Fill-in-the-blanks](docs/screenshots/fillblank.gif)<br>**Fill-in-the-blanks** — hint on demand, lenient validation |
| ![Dictation](docs/screenshots/dictation.gif)<br>**Dictation** — word dictated in audio, strict letter-by-letter correction | ![Voice quiz](docs/screenshots/vocal-quiz.gif)<br>**Voice quiz** — question read aloud, answer by microphone |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — 2-voice mini-podcast, conversational script viewable | ![Illustrations](docs/screenshots/illustrations.gif)<br>**Illustrations** — educational images generated by an Agent |
| ![AI Tutor](docs/screenshots/chat.gif)<br>**AI Tutor** — chat grounded in the course documents, explained answers, can generate quizzes and flashcards | |

### Getting started

| | |
|---|---|
| ![Profile selection](docs/screenshots/login.gif)<br>**Profile selection** — each child has their own space, avatar and language | ![Profile creation](docs/screenshots/profile-create.gif)<br>**Profile creation** — age, avatar, parental PIN for under-15s |
| ![Course creation](docs/screenshots/course.gif)<br>**Course creation** — one project per lesson, ready to receive sources | ![Settings](docs/screenshots/settings.gif)<br>**Settings** — API status, choice of AI models with displayed pricing |

---

## Features

| | Feature | Description |
|---|---|---|
| 📷 | **File import** | Import your lessons — photo, PDF (via Mistral OCR with averaged confidence score, tier `high`/`medium`/`low`) or text file (TXT, MD). Upload sessions with per-file retry and individual progress |
| 📝 | **Text input** | Type or paste any text directly |
| 🎤 | **Voice input** | Record yourself — Voxtral STT transcribes your voice |
| 🌐 | **Web / URL** | Paste a URL (direct scraping via Readability + Lightpanda) or type a search (Mistral web_search Agent) |
| 📄 | **Revision sheets** | Structured notes with key points, vocabulary, quotes, anecdotes |
| 🃏 | **Flashcards** | Interactive Q/A cards, conversational audio reading |
| ❓ | **Multiple-choice quiz** | Multiple-choice questions with adaptive review of mistakes (configurable count) |
| ✏️ | **Fill-in-the-blanks** | Exercises to complete with hints and lenient validation |
| 🔤 | **Dictation** | Words dictated in audio (Voxtral TTS) from an imported list, keyboard entry, strict letter-by-letter correction with explained spelling rule |
| 🎙️ | **Podcast** | 2-voice mini-podcast in audio — default Mistral voices or custom voices (parents!) |
| 🖼️ | **Illustrations** | Educational images generated by a Mistral Agent |
| 🗣️ | **Voice quiz** | Questions read aloud (custom voice possible), spoken answer, AI verification |
| 💬 | **AI Tutor** | Contextual chat with your course documents, with tool calling |
| 🧠 | **Automatic router** | A router based on `mistral-small-latest` analyzes the content and suggests a combination of generators from the 8 available types |
| 🔒 | **Parental controls** | Configurable moderation by profile (custom categories), parental PIN, chat restrictions |
| 🌍 | **Multilingual** | Interface available in 9 languages; AI generation can be driven in 15 languages via prompts |
| 🔊 | **Read aloud** | Listen to sheets and flashcards (question/answer dialogue) via Mistral Voxtral TTS |
| 💶 | **API cost tracking** | Transparent € cost estimate for each generation and source (tokens / characters / pages / audio seconds). Per-card badge + project total, visible in the dashboard |
| 🎨 | **Profile theme** | Each profile chooses its `dark` or `light` theme — persists when switching profiles |

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

### Multimodal input

EurekAI accepts 4 source types, moderated according to the profile (enabled by default for child and teen):

- **File import** — JPG, PNG, or PDF files processed by Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) by default** (best quality), **OCR 3 (`mistral-ocr-2512`) optional** in Settings (cheaper, ~½ the cost) — for printed text, tables, and handwriting; or text files (TXT, MD) imported directly. Multi-file uploads use an **upload session** system: individual progress per file, retry the failed file without resubmitting the others, dismiss the session when finished. OCR exposes an **averaged confidence score** (`average`, clamped to `[0,1]`, calculated from `averagePageConfidenceScore` returned by Mistral), displayed in the UI as tier badge `high` / `medium` / `low` (thresholds ~0.9 / ~0.7) — warns without blocking if the scan is of poor quality.
- **Free text** — Type or paste any content. Moderated before storage if moderation is active.
- **Voice input** — Record audio in the browser. Transcribed by `voxtral-mini-latest`. The `language="fr"` setting optimizes recognition.
- **Web / URL** — Paste one or more URLs to scrape content directly (Readability + Lightpanda for JS pages), or type keywords for a web search via Mistral Agent. The single field accepts both — URLs and keywords are separated automatically, and each result creates an independent source.

### AI content generation

Eight types of generated learning material:

| Generator | Model | Output |
|---|---|---|
| **Revision sheet** | `mistral-large-latest` | Title, summary, key points, vocabulary, quotes, anecdote |
| **Flashcards** | `mistral-large-latest` | Q/A cards with source references (configurable count) |
| **Multiple-choice quiz** | `mistral-large-latest` | Multiple-choice questions, explanations, adaptive review (configurable count) |
| **Fill-in-the-blanks** | `mistral-large-latest` | Sentences to complete with hints, lenient validation (Levenshtein) |
| **Dictation** | `mistral-large-latest` + Voxtral TTS | Key words dictated in audio (1 MP3/word) → keyboard entry → strict correction (accents) with explained rule |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | 2-voice script → MP3 audio |
| **Illustration** | `mistral-large-latest` Agent | Educational image via the `image_generation` tool |
| **Voice quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS questions → STT answer → AI verification |

### AI tutor via chat

A conversational tutor with full access to the course documents:

- Uses `mistral-large-latest`
- **Tool calling**: can generate sheets, flashcards, quizzes, or fill-in-the-blanks during the conversation
- 50-message history per course
- Content moderation if enabled for the profile

### Automatic router

The router uses `mistral-small-latest` to analyze source content and suggest the most relevant generators from the 8 available. The interface shows progress in real time: first an analysis phase, then individual generations with the option to cancel.

### Adaptive learning

- **Quiz statistics**: tracking attempts and accuracy per question
- **Quiz review**: generates 5-10 new questions targeting weak concepts
- **Instruction detection**: detects revision instructions ("I know my lesson if I know...") and prioritizes them in compatible text generators (sheet, flashcards, quiz, fill-in-the-blanks)

### Safety & parental controls

- **4 age groups**: child (≤10 years), teen (11-15), student (16-25), adult (26+)
- **Content moderation**: `mistral-moderation-2603` (Mistral Moderation 2) with 10 available categories, 5 blocked by default for child/teen (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categories customizable by profile in settings. The `-latest` alias is intentionally avoided (it still points to a deprecated version).
- **Parental PIN**: SHA-256 hash, required for profiles under 15. For a production deployment, use a slow salted hash (Argon2id, bcrypt).
- **Chat restrictions**: AI chat disabled by default for under-16s, can be enabled by parents

### Multi-profile system

- Multiple profiles with name, age, avatar, language preferences
- **Voice per profile** (`Profile.mistralVoices?: { host?, guest? }` — each role is optional) — each child can have their own podcast/oral-quiz voice pair
- **Theme per profile** (`Profile.theme: 'dark' | 'light'`) — automatic switching when changing profile, persisted on the backend
- Projects linked to profiles via `profileId`
- Cascading deletion: deleting a profile deletes all of its projects

### API cost tracking

Each Mistral call (chat, OCR, STT, TTS, moderation, agents) is instrumented to provide a **transparent** € estimate to the user — no billing surprises.

- **Source of truth**: `helpers/pricing.ts` — `MODEL_PRICING` by model prefix (e.g. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` with Mistral doc URLs for periodic re-scraping
- **Supported units**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversion driven by `helpers/cost-calc.ts`
- **Instrumentation chain**: `helpers/tracked-client.ts` (wrap Mistral client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injection into the HTTP response)
- **UI**: cost badge per generation (`src/partials/cost-badge-gen.html`), per source (`cost-badge-src.html`), accumulated total in the dashboard (`Project.totalCost`)
- **Endpoints**: `/generate/*` and `/sources/*` responses decorate the returned object (Generation / Source) with `estimatedCost`, `usage`, and `costBreakdown`. `POST /generate/route` adds a `costDelta: number` field for routing cost only. `GET /projects/:pid` returns the enriched project with `totalCost` (sum calculated from `costLog[]`) + full history

### TTS (Mistral Voxtral) & custom voices

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral voice synthesis, no extra key required
- **Custom voices**: parents can create their own voices via the Mistral Voices API (from an audio sample) and assign them to the host/guest roles — podcasts and voice quizzes are then read with a parent’s voice, making the experience even more immersive for the child
- Two configurable voice roles: **host** (main narrator) and **guest** (second podcast voice)
- Full Mistral voice catalog available in settings, filterable by language

### Internationalization

- Interface available in 9 languages: fr, en, es, pt, it, nl, de, hi, ar
- AI prompts support 15 languages (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Language configurable per profile

---
## Technical stack

| Layer | Technology | Role |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server and type safety |
| **Backend** | Express 5.x | REST API |
| **Development server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactive interface, TypeScript compiled by Vite |
| **Templating** | vite-plugin-handlebars | HTML composition via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, built-in speech synthesis |
| **Icons** | Lucide 1.x | SVG icon library |
| **Web scraping** | Readability + linkedom | Extraction of the main content from web pages (Firefox Reader View tech) |
| **Headless browser** | Lightpanda | Ultra-light headless browser (Zig + V8) for JS/SPA pages — scraping fallback |
| **Markdown** | Marked | Markdown rendering in chat |
| **File upload** | Multer 2.x | Multipart form handling |
| **Audio** | ffmpeg-static | Audio segment concatenation |
| **Tests** | Vitest | Unit tests — coverage measured by SonarCloud |
| **Persistence** | JSON files | Dependency-free storage |

---

## Model reference

| Model | Use | Why |
|---|---|---|
| `mistral-large-latest` | Study sheet, Flashcards, Podcast, Fill-in-the-blanks, Chat, Voice quiz checking, Image Agent, Web Search Agent, Instruction detection | Best multilingual + instruction following |
| `mistral-ocr-4-0` (OCR 4, default) | Document OCR — superior quality | Printed text, tables, handwriting ($4 / 1000 pages) |
| `mistral-ocr-2512` (OCR 3, optional) | Document OCR | Selectable in Settings, cheaper ($2 / 1000 pages) |
| `voxtral-mini-latest` | Speech recognition (STT) | Multilingual STT, optimized with `language="fr"` |
| `voxtral-mini-tts-latest` | Speech synthesis (TTS) | Podcasts, voice quiz, read aloud |
| `mistral-moderation-2603` | Content moderation | 5 categories blocked for children/teens (including `jailbreaking`) |
| `mistral-small-latest` | Automatic router | Fast content analysis for routing decisions |

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
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Note**: Mistral Voxtral TTS is the only TTS provider — no additional key is needed beyond `MISTRAL_API_KEY`.

> **User-entered API key**: `MISTRAL_API_KEY` is now **optional**. If it is missing, the app still starts and prompts each user to enter **their own Mistral key** in the interface. The key is **stored in the browser** (encrypted via Web Crypto + IndexedDB in a secure context) and sent with each request — **never persisted on the server**. Precedence: profile key > global browser key > `MISTRAL_API_KEY` (env). Setting `EUREKAI_REQUIRE_USER_KEY=true` forces each user to provide their key (the env key is then only used for preloads).

> **Local HTTPS (tablet/LAN)**: `localhost` is already a secure context. For LAN access (tablet), generate a local certificate and enable HTTPS to unlock browser-side encryption + encrypt the key in transit:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert if available, otherwise self-signed openssl
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite over HTTPS
> ```

### Environment variables

| Variable | Required | Default | Role |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral API key (chat, OCR, STT, Voxtral TTS, agents, moderation). If missing, the user enters their key in the app (stored in the browser, never on the server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → disables fallback to `MISTRAL_API_KEY` for AI requests (each user MUST provide their key). Useful on an exposed instance |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | TLS key/cert paths (see `scripts/gen-cert.sh`) → Express and Vite serve over HTTPS (secure LAN/tablet context) |
| `PORT` | optional | `3000` | Express backend HTTP port |
| `NODE_ENV` | optional | `development` | If `production` → Express serves the frontend from `dist/` (otherwise `public/`) |
| `SONAR_TOKEN` | optional CI | — | Used only by the GitHub Actions SonarCloud workflow |

### Tests, code quality, and contribution

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git hooks (Husky)**: `pre-commit` chains `scripts/pre-commit-fast.sh` (conflicts, large files, shellcheck), `lint-staged` then `npm test`; `pre-push` first runs a `npm audit` gate (blocks on critical transitive vulnerability, see `scripts/audit-verdict.mjs`) then `npm run security`. All of them block commit/push on failure.

**Required external tools (optional but used by `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Without these tools, `npm test` fails at `pretest` (lizard missing) and `npm run security` fails (opengrep missing). The Husky hooks then block the commit/push.

---

## Container deployment

The image is published on **GitHub Container Registry**:

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=<your_api_key> \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** is a rootless Podman flag that automatically adjusts volume permissions.

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
config.ts                 — Config runtime (modèles, voix, modèle TTS), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
  generation-types.ts     — Types générables individuellement (SINGLE_GENERATE_TYPES, coïncide avec les 8 agents auto)
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (nombre configurable)
  quiz.ts                 — Quiz QCM (nombre configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
  dictation.ts            — Dictée : mots + phrases-exemples + règles, 1 audio TTS par mot (8e agent auto)
  podcast.ts              — Script podcast 2 voix
  quiz-vocal.ts           — Quiz vocal : questions TTS + réponses STT + vérification IA
  image.ts                — Génération d'image via Agent Mistral (outil image_generation)
  chat.ts                 — Tuteur IA par chat avec appel d'outils
  router.ts               — Routeur automatique (contenu → générateurs recommandés)
  consigne.ts             — Détection de consignes de révision
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
  tts.ts                  — Génération audio multi-voix (podcast + flashcards, concaténation de segments)
  stt.ts                  — Voxtral STT (audio → texte)
  websearch.ts            — Agent Mistral avec outil web_search (fallback)
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Import fichiers (OCR + texte brut), texte libre, voix STT, scraping URL + recherche web, modération
  generate.ts             — Endpoints de génération (8 types + auto + route)
  generations.ts          — Tentatives de quiz/fill-blank, réponses vocales, lecture à voix haute
  chat.ts                 — Chat IA avec appel d'outils

helpers/
  # IO & parsing
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  logger.ts               — Logger structuré (niveaux, contexte JSON)

  # Génération & UX
  auto-title.ts           — autoTitle(type, data, lang) : préfixe auto pour carte liste (Fiche, Note, Quiz, etc.)
  choice-labels.ts        — Labels localisés des choix (quiz, quiz-vocal) — 9 langues
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, `diversityParams` : temperature/presencePenalty/randomSeed)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  dictation-diff.ts       — Comparaison stricte lettre à lettre pour la correction de dictée (local, zéro coût IA)
  reading-comfort.ts      — Option « Confort de lecture » par profil (police Luciole, espacements) — partagé serveur/client
  ocr-models.ts           — Source de vérité sélection OCR (OCR 4 défaut / OCR 3 option) + normalizeOcrModel

  # Codes d'erreur stables
  error-codes.ts              — Re-export mince de l'API publique
  error-code-resolution.ts    — Orchestration extractErrorCode(e, agent) → FailedStepCode
  error-code-rules.ts         — Règles de mapping par agent/step
  error-matchers.ts           — Matchers par pattern d'erreur HTTP/LLM (délimités pour Lizard)

  # Cost tracking API (suivi coûts €)
  pricing.ts              — MODEL_PRICING + PRICING_SOURCES (tarifs Mistral par prefix de modèle)
  cost-calc.ts            — Conversion ApiUsage → coût € (tokens / characters / pages / audio-seconds)
  cost-persist.ts         — Écriture dans Project.costLog + totalCost
  cost-middleware.ts      — Injection de costDelta dans la réponse HTTP
  tracked-client.ts       — Wrap du client Mistral (capture ApiUsage automatiquement)
  usage-context.ts        — AsyncLocalStorage pour propager l'usage dans les pipelines async

  # Clé API Mistral & sécurité
  mistral-client-factory.ts — Source UNIQUE de construction du client Mistral (buildTrackedClient, resolveClient, requireKeyMiddleware)
  rate-limit.ts           — Rate-limiters Express (authLimiter, aiLimiter, generalLimiter)
  security-headers.ts     — Options Helmet / CSP (createHelmetOptions)
  redact.ts               — Redaction des secrets dans les logs (clé API, headers sensibles)
  mistral-retry.ts        — Retry avec backoff sur erreurs transitoires Mistral (3 tentatives)

  # Événements & notifications (SSE)
  event-bus.ts            — Bus d'événements de génération en mémoire (dispatch SSE, filet anti-uncaughtException)
  event-key.ts            — Clé d'événement typée partagée client/serveur (idempotence notifications)

  # Voix & profils
  voice-selection.ts      — selectVoices : rotation déterministe par profil + langue (host/guest)
  voice-types.ts          — Type MistralVoice (importable côté frontend sans embarquer le SDK Mistral)

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
    config.ts             — Interface de configuration (modèles, voix, modèle TTS)
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
    fill-blank.ts         — Composant textes à trous
    fill-blank-validate.ts — Ré-export client de la validation textes à trous (validateAnswer)
    flashcards.ts         — Composant flashcards avec retournement
    dictation.ts          — Composant dictée interactif
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

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits, prompts des diagrammes) + screenshots du README
scripts/                  — Tooling : check-deps, check-models, check-security, check-complexity, gen-cert, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **For AI contributors**: see [`CLAUDE.md`](CLAUDE.md) for the detailed architecture context, the mandatory rules (anti-leak prompts, error codes, cost tracking), and known pitfalls (Lizard CCN, Opengrep, Codacy/Semgrep migration).

---

## API reference

### Config
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Current configuration |
| `PUT` | `/api/config` | Update the config (models, voices, TTS model) |
| `GET` | `/api/config/status` | API status: `mistral` (Mistral key set), `ttsAvailable` (alias for `mistral`, Mistral Voxtral is the only TTS provider) |
| `POST` | `/api/config/reset` | Reset to default config |
| `GET` | `/api/config/voices` | List Mistral TTS voices (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Available moderation categories + age-based defaults |
| `POST` | `/api/providers/mistral/validate` | Validate a user-entered Mistral key — always returns 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), no env fallback |

### Profiles
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles` | List all profiles |
| `POST` | `/api/profiles` | Create a profile |
| `PUT` | `/api/profiles/:id` | Update a profile (PIN required for under 15) |
| `DELETE` | `/api/profiles/:id` | Delete profile + project cascade `{pin?}` → `{ok, deletedProjects}` |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | List projects (`?profileId=` optional) |
| `POST` | `/api/projects` | Create a `{name, profileId}` project |
| `GET` | `/api/projects/:pid` | Project details |
| `PUT` | `/api/projects/:pid` | Rename `{name}` |
| `DELETE` | `/api/projects/:pid` | Delete the project |
| `GET` | `/api/projects/:pid/events` | Real-time SSE stream (`event: generation`) of generation transitions (`completed`/`failed`/`cancelled`) + keep-alive heartbeat |

### Sources
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart file import (OCR for JPG/PNG/PDF, direct reading for TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Free text `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT voice (multipart audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL scraping or web search `{query}` — returns an array of sources |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Delete a source |
| `POST` | `/api/projects/:pid/moderate` | Moderate `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detect revision instructions |

### Generation
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Study sheet |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-choice quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Fill-in-the-blanks |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictation (words + example sentences + rules, 1 TTS audio per word; also offered by the auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Voice quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive revision `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Targeted recap sheet focused on the questions missed in a `{generationId, weakQuestions}` quiz — called in parallel with `quiz-review` by the “Train me on my mistakes” button |
| `POST` | `/api/projects/:pid/generate/route` | Routing analysis (plan of generators to launch) — returns `{plan, costDelta}` (routing cost only) |
| `POST` | `/api/projects/:pid/generate/auto` | Backend auto-generation (routing + 8 types: summary, flashcards, quiz, fill-blank, podcast, voice quiz, image, dictation). Runs in parallel — assumes a Mistral tier with rate limit ≥ 8 simultaneous requests; otherwise multiple 429s may bubble up in `failedSteps`. |

All generation routes accept `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` and `remediation-summary` also require `{generationId, weakQuestions}`.

### Generation CRUD
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Submit quiz answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Submit fill-in-the-blank answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Submit dictation answers `{answers}` (strict server-side scoring) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Check an oral answer (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS read-aloud (study sheets/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancel an in-progress generation (the only cancellation path for a pending one) |
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
| **Alpine.js instead of React/Vue** | Minimal footprint, lightweight reactivity with TypeScript compiled by Vite. Perfect for a hackathon where speed matters. |
| **Persistence in JSON files** | Zero dependency, instant startup. No database to configure — you start and you’re off. |
| **Vite + Handlebars** | The best of both worlds: fast HMR for development, HTML partials for code organization, Tailwind JIT. |
| **Centralized prompts** | All AI prompts in `prompts.ts` — easy to iterate, test, and adapt by language/age group. |
| **Multi-generation system** | Each generation is an independent object with its own ID — allows multiple sheets, quizzes, etc. per course. |
| **Age-adapted prompts** | 4 age groups with different vocabulary, complexity, and tone — the same content teaches differently depending on the learner. |
| **Agent-based features** | Image generation and web search use temporary Mistral Agents — clean lifecycle with automatic cleanup. |
| **Smart URL scraping** | A single field accepts mixed URLs and keywords — URLs are scraped via Readability (static pages) with Lightpanda fallback (JS/SPA pages), keywords trigger a Mistral web_search Agent. Each result creates an independent source. |
| **100% Mistral TTS** | Mistral Voxtral TTS (no additional key beyond `MISTRAL_API_KEY`) — speech synthesis integrated into the cost chain and language-by-language voice selection. |

---

## Credits & acknowledgements

- **[Mistral AI](https://mistral.ai)** — AI models (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lightweight reactive framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS framework
- **[Vite](https://vitejs.dev)** — Frontend build tool
- **[Lucide](https://lucide.dev)** — Icon library
- **[Marked](https://marked.js.org)** — Markdown parser
- **[Readability](https://github.com/mozilla/readability)** — Web content extraction (Firefox Reader View tech)
- **[Lightpanda](https://lightpanda.io)** — Ultra-light headless browser for scraping JS/SPA pages
- **[Luciole](https://luciole-vision.com)** — Font designed for visually impaired readers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (profile “Reading comfort” option)

Started during the Mistral AI Worldwide Hackathon (March 2026), developed entirely by AI with [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/), and [Gemini CLI](https://geminicli.com/).

---

## Author

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## License

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Article translated from fr to en with gpt-5.4-mini.**
