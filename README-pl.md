<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywne doświadczenie edukacyjne — zasilane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Démo YouTube"></a>
</p>

<h4 align="center">📊 Jakość kodu</h4>

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

## Historia — Dlaczego EurekAI?

**EurekAI** powstało podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł przyszedł z czegoś bardzo konkretnego: regularnie przygotowuję sprawdziany z moją córką i pomyślałem, że dałoby się to zrobić bardziej w formie zabawy i interaktywnie dzięki AI.

Cel: wziąć **dowolne wejście** — zdjęcie lekcji, skopiowany tekst, nagranie głosowe, wyszukiwanie w sieci — i przekształcić je w **notatki do powtórki, fiszki, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Całość napędzana przez francuskie modele Mistral AI, co czyni to rozwiązaniem naturalnie dopasowanym do uczniów francuskojęzycznych.

[Pierwotny prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) został zbudowany w 48 godzin podczas hackathonu jako proof of concept wokół usług Mistral — już działający, ale ograniczony. Od tego czasu EurekAI stało się prawdziwym projektem: teksty z lukami, nawigacja po ćwiczeniach, scraping sieci, konfigurowalna kontrola rodzicielska, dogłębny przegląd kodu i wiele więcej. Cały kod jest generowany przez AI — głównie przez [Claude Code](https://code.claude.com/), z pewnymi wkładami przez [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Funkcjonalności

| | Funkcjonalność | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcie, PDF (przez Mistral OCR ze średnim wynikiem pewności, progi `high`/`medium`/`low`) lub plik tekstowy (TXT, MD). Sesje wysyłania z retry dla każdego pliku i indywidualnym postępem |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wejście głosowe** | Nagraj się — Voxtral STT transkrybuje Twój głos |
| 🌐 | **Web / URL** | Wklej URL (bezpośredni scraping przez Readability + Lightpanda) albo wpisz wyszukiwanie (Agent Mistral web_search) |
| 📄 | **Notatki do powtórki** | Strukturalne notatki z kluczowymi punktami, słownictwem, cytatami, anegdotami |
| 🃏 | **Fiszki** | Interaktywne karty Q/A, dialogowe odtwarzanie audio |
| ❓ | **Quiz MCQ** | Pytania wielokrotnego wyboru z adaptacyjną powtórką błędów (konfigurowalna liczba) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełnienia z podpowiedziami i tolerancyjną walidacją |
| 🎙️ | **Podcast** | Mini-podcast w 2 głosy w audio — domyślne głosy Mistral lub własne głosy (dla rodziców!) |
| 🖼️ | **Ilustracje** | Edukacyjne obrazy generowane przez Agenta Mistral |
| 🗣️ | **Quiz głosowy** | Pytania czytane na głos (możliwy własny głos), odpowiedź ustna, weryfikacja AI |
| 💬 | **Tutor AI** | Kontekstowy czat z materiałami z Twoich zajęć, z wywoływaniem narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 7 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Konfigurowalna moderacja per profil (dostosowywane kategorie), PIN rodzicielski, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach przez prompty |
| 🔊 | **Czytanie na głos** | Słuchaj notatek i fiszek (dialog pytanie/odpowiedź) przez Mistral Voxtral TTS lub ElevenLabs |
| 💶 | **Śledzenie kosztów API** | Przejrzyste szacowanie kosztu € każdej generacji i źródła (tokeny / znaki / strony / sekundy audio). Odznaka per karta + suma per projekt, widoczna w panelu |
| 🎨 | **Motyw per profil** | Każdy profil wybiera swój motyw `dark` lub `light` — utrzymywany po zmianie profilu |

---

## Przegląd architektury

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Mapa użycia modeli

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Ścieżka użytkownika

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Szczegółowo — Funkcje

### Wejście multimodalne

EurekAI akceptuje 4 typy źródeł, moderowanych zależnie od profilu (domyślnie aktywne dla dziecka i nastolatka) :

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez `mistral-ocr-latest` (tekst drukowany, tabele, pismo odręczne) lub pliki tekstowe (TXT, MD) importowane bezpośrednio. Wysyłanie wielu plików używa systemu **sesji uploadu**: indywidualny postęp dla każdego pliku, retry pliku z błędem bez ponownego wysyłania pozostałych, zamknięcie sesji po zakończeniu. OCR udostępnia **średni wynik pewności** (`average`, ograniczony do `[0,1]`, obliczany na podstawie `averagePageConfidenceScore` zwracanych przez Mistral), wyświetlany w UI jako odznaka poziomu `high` / `medium` / `low` (progi ~0.9 / ~0.7) — ostrzega bez blokowania, jeśli skan jest niskiej jakości.
- **Dowolny tekst** — Wpisz lub wklej dowolną treść. Moderowana przed zapisaniem, jeśli moderacja jest aktywna.
- **Wejście głosowe** — Nagraj audio w przeglądarce. Transkrybowane przez `voxtral-mini-latest`. Parametr `language="fr"` optymalizuje rozpoznawanie.
- **Web / URL** — Wklej jeden lub więcej URL-i, aby bezpośrednio scrapować treść (Readability + Lightpanda dla stron JS), albo wpisz słowa kluczowe do wyszukiwania w sieci przez Agenta Mistral. Jedno pole obsługuje oba przypadki — URL-e i słowa kluczowe są separowane automatycznie, a każdy wynik tworzy osobne źródło.

### Generowanie treści AI

Siedem typów generowanych materiałów edukacyjnych:

| Generator | Model | Wynik |
|---|---|---|
| **Notatka do powtórki** | `mistral-large-latest` | Tytuł, podsumowanie, kluczowe punkty, słownictwo, cytaty, anegdota |
| **Fiszki** | `mistral-large-latest` | Karty Q/A z odwołaniami do źródeł (konfigurowalna liczba) |
| **Quiz MCQ** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjna powtórka (konfigurowalna liczba) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt 2 głosy → audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny przez narzędzie `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja AI |

### Tutor AI przez czat

Konwersacyjny tutor z pełnym dostępem do materiałów z zajęć:

- Korzysta z `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować notatki, fiszki, quizy lub teksty z lukami podczas rozmowy
- Historia 50 wiadomości na kurs
- Moderacja treści, jeśli jest aktywna dla profilu

### Automatyczny router

Router używa `mistral-small-latest` do analizy treści źródeł i proponuje najbardziej odpowiednie generatory spośród 7 dostępnych. Interfejs pokazuje postęp w czasie rzeczywistym: najpierw fazę analizy, potem indywidualne generacje z możliwością anulowania.

### Uczenie adaptacyjne

- **Statystyki quizów**: śledzenie prób i trafności dla każdego pytania
- **Powtórka quizu**: generuje 5-10 nowych pytań celujących w słabe koncepcje
- **Wykrywanie polecenia**: wykrywa instrukcje powtórkowe ("Znam lekcję, jeśli znam...") i priorytetyzuje je w kompatybilnych generatorach tekstowych (notatka, fiszki, quiz, teksty z lukami)

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11-15), student (16-25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-latest` z 10 dostępnymi kategoriami, 5 zablokowanych domyślnie dla dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorie konfigurowalne per profil w ustawieniach.
- **PIN rodzicielski**: hash SHA-256, wymagany dla profili poniżej 15 lat. Przy wdrożeniu produkcyjnym należy przewidzieć wolny hash z solą (Argon2id, bcrypt).
- **Ograniczenia czatu**: czat AI domyślnie wyłączony dla osób poniżej 16 lat, włączany przez rodziców

### System wielu profili

- Wiele profili z nazwą, wiekiem, avatarem, preferencjami językowymi
- **Głos per profil** (`Profile.mistralVoices?: { host, guest }`) — każde dziecko może mieć własną parę głosów do podcastu/quizu głosowego
- **Motyw per profil** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie przy zmianie profilu, utrwalone po stronie backendu
- Projekty powiązane z profilami przez `profileId`
- Kaskadowe usuwanie: usunięcie profilu usuwa wszystkie jego projekty

### Śledzenie kosztów API

Każde wywołanie Mistral (chat, OCR, STT, TTS, moderacja, agenci) jest instrumentowane, aby zapewnić użytkownikowi **przejrzyste** szacowanie € — bez niespodzianek w rozliczeniach.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → input 0.5 €/M tokenów, output 1.5 €/M tokenów), `PRICING_SOURCES` z URL-ami dokumentacji Mistral do okresowego ponownego scrapowania
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (wrap klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzyknięcie do odpowiedzi HTTP)
- **UI**: odznaka kosztu per generacja (`src/partials/cost-badge-gen.html`), per źródło (`cost-badge-src.html`), suma skumulowana w dashboardzie (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` i `/sources/*` dekorują zwracany obiekt (Generation / Source) o `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/auto/route` dodaje pole `costDelta: number` dla kosztu samego routingu. `GET /projects/:pid` zwraca projekt wzbogacony o `totalCost` (suma wyliczona z `costLog[]`) + pełną historię

### TTS wieloproducentowe i własne głosy

- **Mistral Voxtral TTS** (domyślnie) : `voxtral-mini-tts-latest`, bez potrzeby dodatkowego klucza
- **ElevenLabs** (alternatywa) : `eleven_v3`, naturalne głosy, wymaga `ELEVENLABS_API_KEY`
- Dostawca konfigurowalny w ustawieniach aplikacji
- **Własne głosy**: rodzice mogą tworzyć własne głosy przez API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról hosta/gościa — podcasty i quizy głosowe są wtedy odtwarzane głosem rodzica, co czyni doświadczenie jeszcze bardziej immersyjnym dla dziecka
- Dwa konfigurowalne role głosowe: **host** (główny narrator) i **gość** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, z filtrowaniem po języku

### Internacjonalizacja

- Interfejs dostępny w 9 językach: fr, en, es, pt, it, nl, de, hi, ar
- Prompty AI obsługują 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Język konfigurowalny per profil

---

## Stos techniczny

| Warstwa | Technologia | Rola |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Serwer i bezpieczeństwo typów |
| **Backend** | Express 5.x | API REST |
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, partiale Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfejs reaktywny, TypeScript kompilowany przez Vite |
| **Szablonowanie** | vite-plugin-handlebars | Składanie HTML przez partiale |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, agenci, moderacja |
| **TTS (domyślny)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, zintegrowana synteza mowy |
| **TTS (alternatywny)** | ElevenLabs SDK 2.x | `eleven_v3`, naturalne głosy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Scraping web** | Readability + linkedom | Ekstrakcja głównej treści stron internetowych (technologia Firefox Reader View) |
| **Przeglądarka headless** | Lightpanda | Ultra-lekka przeglądarka headless (Zig + V8) dla stron JS/SPA — fallback scraping |
| **Markdown** | Marked | Renderowanie markdown w czacie |
| **Upload plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Łączenie segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Trwałość danych** | Pliki JSON | Przechowywanie bez zależności |

---

## Odwołanie do modeli | Model | Use | Why |
|---|---|---|
| `mistral-large-latest` | Cheat sheet, Flashcards, Podcast, Quiz, Fill-in-the-blanks, Chat, Voice quiz verification, Image Agent, Web Search Agent, Instruction detection | Best multilingual + instruction following |
| `mistral-ocr-latest` | Document OCR | Printed text, tables, handwritten writing |
| `voxtral-mini-latest` | Voice recognition (STT) | Multilingual STT, optimized with `language="fr"` |
| `voxtral-mini-tts-latest` | Voice synthesis (TTS) | Podcasts, voice quiz, read aloud |
| `mistral-moderation-latest` | Content moderation | 5 blocked categories for child/teen (+ jailbreaking) |
| `mistral-small-latest` | Automatic router | Fast content analysis for routing decisions |
| `eleven_v3` (ElevenLabs) | Voice synthesis (alternative TTS) | Natural voices, configurable alternative |

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

> **Note**: Mistral Voxtral TTS is the default provider — no additional key required beyond `MISTRAL_API_KEY`. ElevenLabs is an alternative TTS provider configurable in the settings.

### Environment variables

| Variable | Required | Default | Role |
|---|---|---|---|
| `MISTRAL_API_KEY` | ✅ | — | Mistral API key (chat, OCR, STT, Voxtral TTS, agents, moderation) |
| `ELEVENLABS_API_KEY` | ⚠ optional | — | ElevenLabs key; required only if TTS provider = ElevenLabs |
| `PORT` | optional | `3000` | Express backend HTTP port |
| `NODE_ENV` | optional | `development` | If `production` → Express serves the frontend from `dist/` (otherwise `public/`) |
| `SONAR_TOKEN` | optional CI | — | Used only by the GitHub Actions SonarCloud workflow |

### Tests, code quality and contribution

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git hooks (Husky)**: `pre-commit` runs `npm test`, `pre-push` runs `npm run security`. Both block commit/push on failure.

**Required external tools (optional but used by `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Without these tools, `npm test` fails at `pretest` (lizard absent) and `npm run security` fails (opengrep absent). The husky hooks then block commit/push.

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
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (7 agents) + MAX_AUTO_PLAN_LENGTH
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
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

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **For AI contributors**: see [`CLAUDE.md`](CLAUDE.md) for detailed architecture context, mandatory rules (anti-leak prompts, error codes, cost tracking) and known pitfalls (Lizard CCN, Opengrep, Codacy/Semgrep migration).

---

## API reference

### Config
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Current configuration |
| `PUT` | `/api/config` | Modify config (models, voices, TTS provider) |
| `GET` | `/api/config/status` | API status: `mistral` (Mistral key defined), `elevenlabs` (ElevenLabs key defined), `ttsAvailable` (true if the configured TTS provider key is present) |
| `POST` | `/api/config/reset` | Reset to default config |
| `GET` | `/api/config/voices` | List Mistral TTS voices (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Available moderation categories + age defaults |

### Profiles
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles` | List all profiles |
| `POST` | `/api/profiles` | Create a profile |
| `PUT` | `/api/profiles/:id` | Modify a profile (PIN required for < 15 years old) |
| `DELETE` | `/api/profiles/:id` | Delete profile + cascading projects `{pin?}` → `{ok, deletedProjects}` |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | List projects (`?profileId=` optional) |
| `POST` | `/api/projects` | Create a `{name, profileId}` project |
| `GET` | `/api/projects/:pid` | Project details |
| `PUT` | `/api/projects/:pid` | Rename `{name}` |
| `DELETE` | `/api/projects/:pid` | Delete project |

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
| `POST` | `/api/projects/:pid/generate/fill-blank` | Fill-in-the-blanks |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Voice quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive revision `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routing analysis (plan of generators to run) — returns `{plan, costDelta}` (routing cost only) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatic backend generation (routing + 7 types: summary, flashcards, quiz, fill-blank, podcast, voice-quiz, image). Parallel execution — assumes a Mistral tier with rate limit ≥ 7 simultaneous requests; otherwise several 429s may appear in `failedSteps`. |

All generation routes accept `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` also requires `{generationId, weakQuestions}`.

### CRUD Generations
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Submit quiz answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Submit fill-in-the-blanks answers `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verify an oral answer (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Read aloud TTS (sheets/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Rename `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Delete generation |

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
| **Persistence in JSON files** | Zero dependency, instant startup. No database to configure — just start and go. |
| **Vite + Handlebars** | Best of both worlds: fast HMR for development, HTML partials for code organization, Tailwind JIT. |
| **Centralized prompts** | All AI prompts in `prompts.ts` — easy to iterate, test, and adapt by language/age group. |
| **Multi-generation system** | Each generation is an independent object with its own ID — allows multiple sheets, quizzes, etc. per course. |
| **Age-adapted prompts** | 4 age groups with different vocabulary, complexity and tone — the same content teaches differently depending on the learner. |
| **Agent-based features** | Image generation and web search use temporary Mistral Agents — clean lifecycle with automatic cleanup. |
| **Smart URL scraping** | A single field accepts mixed URLs and keywords — URLs are scraped via Readability (static pages) with Lightpanda fallback (JS/SPA pages), keywords trigger a Mistral web_search Agent. Each result creates an independent source. |
| **Multi-provider TTS** | Mistral Voxtral TTS by default (no additional key), ElevenLabs as an alternative — configurable without restart. |

---

## Credits & thanks

- **[Mistral AI](https://mistral.ai)** — AI models (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternative text-to-speech engine (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lightweight reactive framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS framework
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

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu gpt-5.4-mini. Aby uzyskać więcej informacji o procesie tłumaczenia, odwiedź https://gitlab.com/jls42/ai-powered-markdown-translator**

