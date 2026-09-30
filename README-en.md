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
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube Demo"></a>
</p>

<h4 align="center">📊 Code Quality</h4>

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

**EurekAI** was born during the [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([official website](https://worldwide-hackathon.mistral.ai/)) (March 2026). I needed a topic — and the idea came from something very practical: I regularly help my daughter study for tests, and I thought there had to be a way to make it more fun and interactive using AI.

The goal: take **any input** — a photo of a lesson, copied-and-pasted text, a voice recording, a web search — and turn it into **study notes, flashcards, quizzes, podcasts, fill-in-the-blank exercises, illustrations, and more**. Everything is powered by models from Mistral AI, a French company, making EurekAI a naturally suitable solution for French-speaking students.

The [initial prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) was built in 48 hours during the hackathon as a proof of concept based on Mistral services — already functional, but limited. Since then, EurekAI has become a full-fledged project: fill-in-the-blank exercises, exercise navigation, web scraping, configurable parental moderation, in-depth code review, and much more. All the code is AI-generated — primarily with [Claude Code](https://code.claude.com/), with a few contributions via [Codex](https://openai.com/codex/) and [Gemini CLI](https://geminicli.com/).

---

## Overview

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI guided tour: sources, study notes, quizzes, flashcards, illustrations" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — recent generations, estimated cost per card and total project cost, “Auto — Magic!” button | ![Sources](docs/screenshots/sources.webp)<br>**Sources** — photo/PDF/text/voice/web import, one-click generation, instruction detection |

Each imported source displays its [OCR confidence score, moderation status, and estimated cost](docs/screenshots/sources-list.webp).

### Components in Action

| | |
|---|---|
| ![Study notes](docs/screenshots/notes.gif)<br>**Study notes** — key points, vocabulary, sourced quotes, audio playback by section | ![Quiz](docs/screenshots/quiz.gif)<br>**Multiple-choice quiz** — only one correct answer per question, immediate feedback with an explanation, step-by-step navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — flip the card, then self-assess with “I knew it / I didn't know it” | ![Fill-in-the-blank exercises](docs/screenshots/fillblank.gif)<br>**Fill-in-the-blank exercises** — hint on demand, tolerant validation |
| ![Dictation](docs/screenshots/dictation.gif)<br>**Dictation** — word dictated through audio, strict letter-by-letter correction | ![Voice quiz](docs/screenshots/vocal-quiz.gif)<br>**Voice quiz** — question read aloud, answer given via microphone |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — two-voice mini-podcast with a viewable dialogue script | ![Illustrations](docs/screenshots/illustrations.gif)<br>**Illustrations** — educational images generated by an Agent |
| ![AI Tutor](docs/screenshots/chat.gif)<br>**AI Tutor** — chat grounded in course documents, answers with explanations, can generate quizzes and flashcards | |

### Getting Started

| | |
|---|---|
| ![Profile selection](docs/screenshots/login.gif)<br>**Profile selection** — each child has their own space, avatar, and language | ![Profile creation](docs/screenshots/profile-create.gif)<br>**Profile creation** — age, avatar, parental PIN for users under 15 |
| ![Course creation](docs/screenshots/course.gif)<br>**Course creation** — one project per lesson, ready to receive sources | ![Settings](docs/screenshots/settings.gif)<br>**Settings** — API status, AI model selection with displayed pricing |

---

## Features

| | Feature | Description |
|---|---|---|
| 📷 | **File import** | Import your lessons — photo, PDF (via Mistral OCR with an averaged confidence score and `high`/`medium`/`low` tiers), or text file (TXT, MD). Upload sessions with per-file retry and individual progress |
| 📝 | **Text input** | Type or paste any text directly |
| 🎤 | **Voice input** | Record yourself — Voxtral STT transcribes your voice |
| 🌐 | **Web / URL** | Paste a URL (direct scraping via Readability + Lightpanda) or enter a search query (Mistral web_search Agent) |
| 📄 | **Study notes** | Structured notes with key points, vocabulary, quotes, and fun facts |
| 🃏 | **Flashcards** | Interactive Q&A cards with dialogue-style audio playback |
| ❓ | **Multiple-choice quizzes** | Questions with four choices and only one correct answer, with adaptive review of mistakes (configurable number) |
| ✏️ | **Fill-in-the-blank exercises** | Exercises to complete with hints and tolerant validation |
| 🔤 | **Dictation** | Words dictated through audio (Voxtral TTS) from an imported list, keyboard input, strict letter-by-letter correction with an explained spelling rule |
| 🎙️ | **Podcast** | Two-voice audio mini-podcast — default Mistral voices or custom voices (parents!) |
| 🖼️ | **Illustrations** | Educational images generated by a Mistral Agent |
| 🗣️ | **Voice quiz** | Questions read aloud (custom voice available), spoken answer, AI verification |
| 💬 | **AI Tutor** | Contextual chat with your course documents, with tool calling |
| 🧠 | **Automatic router** | A router based on `mistral-small-latest` analyzes the content and suggests a combination of generators from the eight available types |
| 🔒 | **Parental controls** | Configurable moderation per profile (customizable categories), parental PIN, chat restrictions |
| 🌍 | **Multilingual** | Interface available in nine languages; AI generation can be controlled in 15 languages through prompts |
| 🔊 | **Read aloud** | Listen to study notes and flashcards (question-and-answer dialogue) via Mistral Voxtral TTS |
| 💶 | **API cost tracking** | Transparent estimated € cost for each generation and source (tokens / characters / pages / audio seconds). Badge on each card + project total, visible on the dashboard |
| 🎨 | **Theme per profile** | Each profile selects its `dark` or `light` theme — saved with the profile and reapplied whenever the profile changes |

---

## Architecture Overview

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Model Usage Map

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## User Journey

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Deep Dive — Features

### Multimodal Input

EurekAI accepts four types of sources, moderated according to the profile (moderation enabled by default for child and teen profiles):

- **File import** — JPG, PNG, or PDF files processed by Mistral OCR — **OCR 4.1 (`mistral-ocr-4-1`) by default**, with **OCR 3 (`mistral-ocr-2512`) available as an option** in Settings (cheaper, ~½ the cost; better at reading handwriting) — for printed text, tables, and handwriting; or text files (TXT, MD) imported directly. Multi-file uploads use an **upload session** system: individual progress per file, retry the failed file without resubmitting the others, and dismiss the session when complete. OCR provides an averaged **confidence score** (`average`, clamped in `[0,1]`, calculated from the `averagePageConfidenceScore` returned by Mistral), displayed in the UI as a `high` / `medium` / `low` tier badge (thresholds ~0.9 / ~0.7) — warning without blocking when the scan quality is poor. The document copy sent to Mistral for OCR is deleted as soon as processing ends, even if it fails.
- **Free text** — Type or paste any content. Moderated before storage if moderation is enabled.
- **Voice input** — Record audio in the browser. Transcribed by `voxtral-mini-latest`. The `language="fr"` parameter optimizes recognition.
- **Web / URL** — Paste one or more URLs to scrape content directly (Readability + Lightpanda for JS pages), or enter keywords for a web search via a Mistral Agent. The single field accepts both — URLs and keywords are separated automatically, and each result creates an independent source.

### AI Content Generation

Eight types of generated learning material:

| Generator | Model | Output |
|---|---|---|
| **Study notes** | `mistral-large-latest` | Title, summary, key points, vocabulary, quotes, fun fact |
| **Flashcards** | `mistral-large-latest` | Q&A cards with source references (configurable number) |
| **Multiple-choice quiz** | `mistral-large-latest` | Questions with four choices and only one correct answer, explanations, adaptive review (configurable number) |
| **Fill-in-the-blank exercises** | `mistral-large-latest` | Sentences to complete with hints and tolerant validation (Levenshtein) |
| **Dictation** | `mistral-large-latest` + Voxtral TTS | Key words dictated through audio (1 MP3/word) → keyboard input → strict correction (a missing accent counts as an error) with an explained rule |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Two-voice script → MP3 audio |
| **Illustration** | `mistral-large-latest` Agent | Educational image via the `image_generation` tool |
| **Voice quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS questions → STT answer → AI verification |

### AI Chat Tutor

A conversational tutor with full access to course documents:

- Uses `mistral-large-latest`
- **Tool calling**: can generate study notes, flashcards, quizzes, or fill-in-the-blank exercises during the conversation
- History of 50 messages per course
- Moderation if enabled for the profile: the message is checked, while flagged sources, sources whose checks failed, and sources not yet checked are excluded from the context and tools (checks are first retried for failed and not-yet-checked sources, for up to 5 seconds)

### Automatic Router

The router uses `mistral-small-latest` to analyze source content and suggest the most relevant generators from the eight available. The interface displays real-time progress: first an analysis phase, then individual generations, which can be canceled.

### Adaptive Learning

- **Quiz statistics**: tracks attempts and accuracy per question
- **Quiz review**: generates 5–10 new questions targeting weak concepts from the original quiz sources (the moderation guard applies to those same sources)
- **Instruction detection**: detects study instructions (“I know my lesson if I can...”) and prioritizes them in compatible text generators (study notes, flashcards, quizzes, fill-in-the-blank exercises). When moderation is enabled, detection waits for source checks and reads only sources deemed safe; the instruction retains the list of its original sources: if any of them becomes flagged, the instruction is neither displayed nor applied, and if any of them is deleted, the instruction is cleared. Its cost is tracked

### Security & Parental Controls

- **Four age groups**: child (≤10), teen (11–15), student (16–25), adult (26+)
- **Content moderation**: `mistral-moderation-2603` (Mistral Moderation 2) with 11 available categories, six blocked by default for new child/teen profiles (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` added after testing on 50 lessons, including history, with no false positives). Categories can be customized per profile in the settings; Moderation 2 split the former “dangerous content” category into `dangerous` + `criminal` (existing profiles are migrated automatically, and blocked categories also apply to previously imported sources). Secure by default: if the model's response does not allow a blocked category to be checked, the content is rejected (“Moderation unavailable”); when moderation is enabled, both generation and chat exclude flagged sources, sources whose checks failed, and sources currently being checked. A source that has never been checked (imported while moderation was disabled, or an older project attached to a profile) is checked before use. Moderation interrupted by a restart resumes on startup if the server key allows it; otherwise, like moderation that encountered an error, it resumes when the project is opened or upon the next generation. A “Recheck” button reruns the check on demand. When moderation is enabled, until a source is deemed safe, its content is hidden from the child (preview, text, original document); a parent can display it with their PIN for a single viewing. The spoken voice-quiz answer is moderated before being checked. Dated ID pinned in `helpers/moderation-model.ts`: the deprecated `-latest` alias is no longer listed by the API.
- **Parental PIN**: SHA-256 hash, required for profiles under 15; no more than 10 incorrect codes per 15-minute period and per IP address (429 `rate_limited`). For a production deployment, use a slow salted hash (Argon2id, bcrypt).
- **Server data**: `/output` exposes only project media (audio, images, imported files); `profiles.json`, `config.json`, `projects.json`, and `project.json` are never served
- **Chat restrictions**: AI chat disabled by default for users under 16, with parental enablement available

### Multi-Profile System

- Multiple profiles with name, age, avatar, and language preferences
- **Voices per profile** (`Profile.mistralVoices?: { host?, guest? }` — each role is optional) — each child can have their own pair of podcast/voice-quiz voices
- **Theme per profile** (`Profile.theme: 'dark' | 'light'`) — switches automatically when the profile changes and persists in the backend
- Projects linked to profiles via `profileId`; an older project without a profile is attached to the first profile that opens it, then moderated according to that profile
- Cascading deletion: deleting a profile deletes all its projects
### API Cost Tracking

Every billable Mistral call (chat, OCR, STT, TTS, agents), including instruction detection and spoken answers in the voice quiz, is instrumented to provide a **transparent** € estimate to the user. Moderation, which is free, is not counted. Agent tool fees are included: $0.03 per web search and $0.10 per generated image (Mistral pricing), plus the tokens produced by these tools, which the estimate counts at the agent model's input rate.

- **Source of truth**: `helpers/pricing.ts` — `MODEL_PRICING` by model prefix (e.g. `mistral-large` → input €0.5/M tokens, output €1.5/M tokens), `PRICING_SOURCES` with Mistral documentation URLs for periodic re-scraping
- **Supported units**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversion driven by `helpers/cost-calc.ts`
- **Instrumentation chain**: `helpers/tracked-client.ts` (wraps the Mistral client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injection into the HTTP response)
- **UI**: cost badge per generation (`src/partials/cost-badge-gen.html`), per source (`cost-badge-src.html`), cumulative total in the dashboard (`Project.totalCost`)
- **Endpoints**: `/generate/*` and `/sources/*` responses decorate the returned object (`Generation` / `Source`) with `estimatedCost`, `usage`, and `costBreakdown`. `POST /generate/route` adds a `costDelta: number` field for routing cost alone; `POST /detect-consigne` (`{consigne, costDelta}`) and spoken-answer verification also return their `costDelta`. `GET /projects/:pid` returns the project enriched with `totalCost` (sum calculated from `costLog[]`) + the complete history

### TTS (Mistral Voxtral) & Custom Voices

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral speech synthesis, no additional key required
- **Custom voices**: parents can create their own voices through the Mistral Voices API (from an audio sample) and assign them to the host/guest roles — podcasts and voice quizzes are then read in a parent's voice, making the experience even more immersive for the child
- Two configurable voice roles: **host** (main narrator) and **guest** (second podcast voice)
- Full catalog of Mistral voices available in settings, filterable by language

### Internationalization

- Interface available in 9 languages: fr, en, es, pt, it, nl, de, hi, ar
- AI prompts support 15 languages (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Language configurable per profile

---

## Technical Stack

| Layer | Technology | Role |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server and type safety |
| **Backend** | Express 5.x | REST API |
| **Development server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactive interface, TypeScript compiled by Vite |
| **Templating** | vite-plugin-handlebars | HTML composition using partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrated speech synthesis |
| **Icons** | Lucide 1.x | SVG icon library |
| **Web scraping** | Readability + linkedom | Extraction of the main content from web pages (Firefox Reader View technology) |
| **Headless browser** | Lightpanda | Ultra-lightweight headless browser (Zig + V8) for JS/SPA pages — scraping fallback |
| **Markdown** | Marked | Markdown rendering in chat |
| **File uploads** | Multer 2.x | Multipart form handling |
| **Audio** | ffmpeg-static | Audio segment concatenation |
| **Tests** | Vitest | Unit tests — coverage measured by SonarCloud |
| **Persistence** | JSON files | Dependency-free storage |

---

## Model Reference

| Model | Usage | Why |
|---|---|---|
| `mistral-large-latest` | Study Guide, Flashcards, Podcast, Quiz, Fill-in-the-Blanks, Chat, Voice Quiz Verification, Image Agent, Web Search Agent, Instruction Detection | Best multilingual performance + instruction following |
| `mistral-ocr-4-1` (OCR 4.1, default) | Document OCR | Printed text, tables, handwriting ($4 / 1000 pages) |
| `mistral-ocr-2512` (OCR 3, optional) | Document OCR | Selectable in Settings, cheaper ($2 / 1000 pages), reads handwriting better |
| `voxtral-mini-latest` | Speech recognition (STT) | Multilingual STT, optimized with `language="fr"` |
| `voxtral-mini-tts-latest` | Speech synthesis (TTS) | Podcasts, voice quizzes, read-aloud |
| `mistral-moderation-2603` | Content moderation | 6 categories blocked for children/teens (including `jailbreaking`) |
| `mistral-small-latest` | Automatic router | Fast content analysis for routing decisions |

---

## Quick Start

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

> **Note**: Mistral Voxtral TTS is the only TTS provider — no additional key is required beyond `MISTRAL_API_KEY`.

> **User-provided API key**: `MISTRAL_API_KEY` is now **optional**. If absent, the app still starts and prompts each user to enter **their own Mistral key** in the interface. The key is **stored in the browser** (encrypted via Web Crypto + IndexedDB in a secure context) and sent with each request — **never persisted on the server**. Precedence: profile key > global browser key > `MISTRAL_API_KEY` (env). Setting `EUREKAI_REQUIRE_USER_KEY=true` forces every user to provide their key (the environment key is then used only for preloading).

> **Local HTTPS (tablet/LAN)**: `localhost` is already a secure context. For LAN access (tablet), generate a local certificate and enable HTTPS: the browser can then encrypt the key it stores, and the key is encrypted in transit:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Environment Variables

| Variable | Required | Default | Role |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral API key (chat, OCR, STT, Voxtral TTS, agents, moderation). If absent, the user enters their key in the app (stored in the browser, never on the server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → disables fallback to `MISTRAL_API_KEY` for AI requests (every user MUST provide their key). Useful on a publicly accessible instance |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | TLS key/certificate paths (see `scripts/gen-cert.sh`) → Express and Vite serve over HTTPS (secure LAN/tablet context) |
| `PORT` | optional | `3000` | Express backend HTTP port |
| `NODE_ENV` | optional | `development` | If `production` → Express serves the frontend from `dist/` (otherwise `public/`) |
| `SONAR_TOKEN` | optional in CI | — | Used only by the SonarCloud GitHub Actions workflow |

### Tests, Code Quality, and Contributing

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git hooks (Husky)**: `pre-commit` runs `scripts/pre-commit-fast.sh` (conflicts, large files, shellcheck), `lint-staged`, then `npm test`; `pre-push` first runs a blocking `npm audit` check (blocks as soon as any dependency, even transitive, has a `critical`-level vulnerability; see `scripts/audit-verdict.mjs`), then `npm run security`. Each hook blocks the commit/push if any of its steps fails.

**External tools (optional for running the application, required for `pretest` and `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Without these tools, `npm test` fails at `pretest` (lizard missing) and `npm run security` fails (opengrep missing). The Husky hooks then block the commit/push.

---

## Container Deployment

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

> **`:U`**: rootless Podman flag that automatically adjusts volume permissions.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Project Structure

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
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, tryParseJson, retryTurns, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  generation-media.ts     — Noms uniques des médias (MP3/PNG) et suppression avec leur génération
  media-ledger.ts         — Médias écrits pendant une génération, supprimés si elle échoue ou est annulée
  keyed-lock.ts           — File d'attente par clé (OCR sérialisé par contenu)
  logger.ts               — Logger structuré (niveaux, contexte JSON)

  # Génération & UX
  auto-title.ts           — autoTitle(type, data, lang) : préfixe auto pour carte liste (Fiche, Note, Quiz, etc.)
  choice-labels.ts        — Labels localisés des choix (quiz, quiz-vocal) — 9 langues
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, `diversityParams` : temperature/presencePenalty/randomSeed)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  dictation-diff.ts       — Comparaison stricte lettre à lettre pour la correction de dictée (local, zéro coût IA)
  reading-comfort.ts      — Option « Confort de lecture » par profil (police Luciole, espacements) — partagé serveur/client
  ocr-models.ts           — Source de vérité sélection OCR (OCR 4 défaut / OCR 3 option) + normalizeOcrModel
  moderation-model.ts     — Modèle de modération épinglé + ses 11 catégories + migration des catégories legacy
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours), statut effectif, garde de la consigne
  moderation-profile.ts   — Profil propriétaire du projet et catégories actives (source unique des routes)
  source-moderation.ts    — Modérations en vol et reprise (démarrage, génération, chat, « Revérifier »)
  input-moderation.ts     — Modération d'un texte saisi ou dicté (texte libre, recherche web, réponse orale)
  chat-sources.ts         — Sources accessibles au chat (sans les sources non vérifiées si la modération est active)

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
  rate-limit.ts           — Rate-limiters Express (authLimiter, pinLimiter, aiLimiter / aiPathLimiter, generalLimiter), 429 `rate_limited`
  request-validation.ts   — Validation de lang / ageGroup sur toutes les routes IA (400 invalid_input)
  output-static.ts        — Liste blanche du montage statique /output (médias des projets seulement)
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
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
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

> **For AI agents contributing to the code**: see [`CLAUDE.md`](CLAUDE.md) for detailed architecture context, mandatory rules (error codes, cost tracking, and prompts without meta words, meaning without document qualifiers such as its type, because the model would copy those words into its outputs), and known pitfalls (Lizard CCN, Opengrep, Codacy/Semgrep migration).

---

## API Reference

### Config
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Current configuration |
| `PUT` | `/api/config` | Modify the config (models, voices, TTS model) |
| `GET` | `/api/config/status` | API status: `mistral` (Mistral key configured), `ttsAvailable` (alias of `mistral`, Mistral Voxtral is the only TTS provider) |
| `POST` | `/api/config/reset` | Reset to the default config |
| `GET` | `/api/config/voices` | List Mistral TTS voices (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Available moderation categories + defaults by age |
| `POST` | `/api/providers/mistral/validate` | Validate a user-provided Mistral key — always 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), no environment fallback |

### Profiles
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles` | List all profiles |
| `POST` | `/api/profiles` | Create a profile |
| `PUT` | `/api/profiles/:id` | Modify a profile (PIN required for users under 15; 10 incorrect PINs / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Delete a profile + cascade projects `{pin?}` → `{ok, deletedProjects}` |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | List projects (optional `?profileId=`) |
| `POST` | `/api/projects` | Create a project `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Project details; `?profileId=` attaches a project without a profile to the profile that opens it |
| `PUT` | `/api/projects/:pid` | Rename `{name}` |
| `DELETE` | `/api/projects/:pid` | Delete the project |
| `GET` | `/api/projects/:pid/events` | Real-time SSE stream (`event: generation`) for generation transitions (`completed`/`failed`/`cancelled`) + keep-alive heartbeat |

### Sources
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import multipart files (OCR for JPG/PNG/PDF, direct reading for TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Free-form text `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT voice input (multipart audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL scraping or web search `{query}` — returns an array of sources; 422 `url_blocked` if all addresses are rejected (internal network), 502 `all_sources_failed` if no source could be created |
| `POST` | `/api/projects/:pid/sources/moderate` | Resume pending or failed moderations `{sourceIds?}` (at most 10 per call, wait ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Delete a source, its imported file, and the instruction that depends on it → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderate `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detect study instructions (verified sources only) → `{consigne, costDelta}` |

### Generation
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Study guide |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-choice quiz (4 choices, exactly one correct answer) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Fill-in-the-blank exercises |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictation (words + example sentences + rules, 1 TTS audio clip per word; also offered by the auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Voice quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive review `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Review sheet focused on questions answered incorrectly in a quiz `{generationId, weakQuestions}` — called in parallel with `quiz-review` by the remediation button in the quiz view |
| `POST` | `/api/projects/:pid/generate/route` | Routing analysis (plan of generators to run) — returns `{plan, costDelta}` (routing cost only) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatic backend generation (routing + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallel execution — assumes a Mistral tier with a rate limit ≥ 8 simultaneous requests; otherwise, multiple 429 errors may appear in `failedSteps`. |

All generation routes accept `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; an unknown `ageGroup` or a `lang` that is not a valid language code (expected: `fr`, `pt-BR`…) → 400 `invalid_input`, before any AI call. `quiz-review` and `remediation-summary` additionally require `{generationId, weakQuestions}` and operate on the sources of the original quiz.

### Generation CRUD
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Submit quiz answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Submit fill-in-the-blank answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Submit dictation answers `{answers}` (strict server-side scoring) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verify a spoken answer (audio + questionIndex); the spoken answer is moderated before verification (rejection: 400 `quiz.answerBlocked`), cost returned in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS read-aloud (study guides/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancel an ongoing generation (the only cancellation path for a pending generation) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Rename `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Delete the generation and its media (audio, image) |

### Chat
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Retrieve chat history |
| `POST` | `/api/projects/:pid/chat` | Send a message `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Clear chat history |

---

## Architectural Decisions

| Decision | Rationale |
|---|---|
| **Alpine.js rather than React/Vue** | Minimal footprint, lightweight reactivity with TypeScript compiled by Vite. Perfect for a hackathon where speed matters. |
| **JSON file persistence** | Zero dependencies, instant startup. No database to configure — just start and go. |
| **Vite + Handlebars** | The best of both worlds: fast HMR for development, HTML partials for code organization, Tailwind JIT. |
| **Centralized prompts** | All AI prompts in `prompts.ts` — easy to iterate, test, and adapt by language/age group. |
| **Multi-generation system** | Each generation is an independent object with its own ID — allows multiple study guides, quizzes, etc. per course. |
| **Age-adapted prompts** | 4 age groups with different vocabulary, complexity, and tone — the same content is taught differently depending on the learner. |
| **Agent-based features** | Image generation and web search use temporary Mistral Agents — clean lifecycle with automatic cleanup. |
| **Intelligent URL scraping** | A single field accepts mixed URLs and keywords — URLs are scraped using Readability (static pages) with a Lightpanda fallback (JS/SPA pages), while keywords trigger a Mistral web_search Agent. Each result creates an independent source. |
| **100% Mistral TTS** | Mistral Voxtral TTS (no additional key beyond `MISTRAL_API_KEY`) — speech synthesis integrated into the cost chain and language-based voice resolution. |

---
## Credits & acknowledgments

- **[Mistral AI](https://mistral.ai)** — AI models (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lightweight reactive framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS framework
- **[Vite](https://vitejs.dev)** — Frontend build tool
- **[Lucide](https://lucide.dev)** — Icon library
- **[Marked](https://marked.js.org)** — Markdown parser
- **[Readability](https://github.com/mozilla/readability)** — Web content extraction (Firefox Reader View technology)
- **[Lightpanda](https://lightpanda.io)** — Ultra-lightweight headless browser for scraping JS/SPA pages
- **[Luciole](https://luciole-vision.com)** — Font designed for visually impaired readers, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (the “Reading comfort” profile option)

Initiated during the Mistral AI Worldwide Hackathon (March 2026), developed entirely by AI using [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/), and [Gemini CLI](https://geminicli.com/).

---

## Author

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## License

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Article translated from fr to en with gpt-5.6-sol.**
