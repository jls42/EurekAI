<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywne doświadczenie edukacyjne — zasilane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Angielski</a> · <a href="README-es.md">🇪🇸 Hiszpański</a> · <a href="README-pt.md">🇧🇷 Portugalski</a> · <a href="README-de.md">🇩🇪 Niemiecki</a> · <a href="README-it.md">🇮🇹 Włoski</a> · <a href="README-nl.md">🇳🇱 Holenderski</a> · <a href="README-ar.md">🇸🇦 Arabski</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chiński</a> · <a href="README-ja.md">🇯🇵 Japoński</a> · <a href="README-ko.md">🇰🇷 Koreański</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Rumuński</a> · <a href="README-sv.md">🇸🇪 Szwedzki</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Jakość kodu</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Bramka jakości"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Ocena bezpieczeństwa"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Ocena niezawodności"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Ocena utrzymywalności"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Pokrycie"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Luki w zabezpieczeniach"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Zapachy kodu"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Liczba linii kodu"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Odznaka Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Historia — Dlaczego EurekAI?

**EurekAI** narodził się podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł pojawił się z czegoś bardzo konkretnego: regularnie przygotowuję się do sprawdzianów z moją córką i pomyślałem, że powinno się dać zrobić to w bardziej zabawny i interaktywny sposób dzięki AI.

Cel: wziąć **dowolne wejście** — zdjęcie lekcji, skopiowany tekst, nagranie głosowe, wyszukiwanie w sieci — i przekształcić je w **notatki do powtórki, fiszki, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Wszystko to zasilane przez francuskie modele Mistral AI, co czyni to rozwiązaniem naturalnie dopasowanym do francuskojęzycznych uczniów.

[Pierwotny prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) został zaprojektowany w 48 godzin podczas hackathonu jako proof of concept wokół usług Mistral — już działający, ale ograniczony. Od tego czasu EurekAI stał się prawdziwym projektem: teksty z lukami, nawigacja po ćwiczeniach, web scraping, konfigurowalna moderacja rodzicielska, dogłębny przegląd kodu i wiele więcej. Całość kodu jest generowana przez AI — głównie [Claude Code](https://code.claude.com/), z kilkoma wkładami przez [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcie, PDF (przez Mistral OCR ze średnią punktacją pewności, poziomy `high`/`medium`/`low`) lub plik tekstowy (TXT, MD). Sesje uploadu z ponowną próbą dla każdego pliku i indywidualnym postępem |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wejście głosowe** | Nagraj się — Voxtral STT transkrybuje Twój głos |
| 🌐 | **Sieć / URL** | Wklej URL (bezpośredni scraping przez Readability + Lightpanda) albo wpisz wyszukiwanie (Agent Mistral web_search) |
| 📄 | **Notatki do powtórki** | Strukturalne notatki z kluczowymi punktami, słownictwem, cytatami, anegdotami |
| 🃏 | **Fiszki** | Interaktywne karty pytanie/odpowiedź, dialogowe odtwarzanie audio |
| ❓ | **Quiz QCM** | Pytania wielokrotnego wyboru z adaptacyjną powtórką błędów (liczba konfigurowalna) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełnienia z podpowiedziami i tolerancyjną walidacją |
| 🎙️ | **Podcast** | Mini-podcast z 2 głosami w audio — domyślnie głosy Mistral lub głosy niestandardowe (dla rodziców!) |
| 🖼️ | **Ilustracje** | Edukacyjne obrazy generowane przez Agenta Mistral |
| 🗣️ | **Quiz głosowy** | Pytania czytane na głos (możliwy głos niestandardowy), odpowiedź ustna, weryfikacja AI |
| 💬 | **Korepetytor AI** | Kontekstowy czat z Twoimi materiałami z lekcji, z wywoływaniem narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 7 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Konfigurowalna moderacja według profilu (niestandardowe kategorie), PIN rodzicielski, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach przez prompty |
| 🔊 | **Czytanie na głos** | Słuchaj notatek i fiszek (dialog pytanie/odpowiedź) przez Mistral Voxtral TTS |
| 💶 | **Śledzenie kosztów API** | Przejrzysta estymacja kosztu € każdej generacji i źródła (tokeny / znaki / strony / sekundy audio). Odznaka per karta + suma per projekt, widoczna w dashboardzie |
| 🎨 | **Motyw per profil** | Każdy profil wybiera swój motyw `dark` lub `light` — zachowuje się po zmianie profilu |

---

## Przegląd architektury

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Przegląd architektury" width="800" />
</p>

---

## Mapa użycia modeli

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapowanie zadanie-model AI" width="800" />
</p>

---

## Ścieżka użytkownika

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Ścieżka nauki ucznia" width="800" />
</p>

---

## Dogłębne omówienie — Funkcje

### Wejście multimodalne

EurekAI akceptuje 4 typy źródeł, moderowanych zgodnie z profilem (włączone domyślnie dla dziecka i nastolatka) :

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez OCR Mistral — **OCR 3 (`mistral-ocr-2512`) domyślnie**, **OCR 4 (`mistral-ocr-4-0`) opcjonalnie** w Ustawieniach (lepsza jakość, ale 2× koszt) — dla tekstu drukowanego, tabel i pisma odręcznego; lub pliki tekstowe (TXT, MD) importowane bezpośrednio. Wieloplikowe uploady korzystają z systemu **sesji uploadu**: indywidualny postęp dla każdego pliku, ponowna próba dla pliku z błędem bez ponownego wysyłania pozostałych, zamknięcie sesji po zakończeniu. OCR udostępnia uśredniony **wynik pewności** (`average`, przycięty do `[0,1]`, obliczany na podstawie `averagePageConfidenceScore` zwróconych przez Mistral), wyświetlany w UI jako odznaka poziomu `high` / `medium` / `low` (progi ~0.9 / ~0.7) — ostrzega bez blokowania, jeśli skan jest słabej jakości.
- **Tekst swobodny** — Wpisz lub wklej dowolną treść. Moderowany przed zapisaniem, jeśli moderacja jest aktywna.
- **Wejście głosowe** — Nagraj audio w przeglądarce. Transkrybowane przez `voxtral-mini-latest`. Parametr `language="fr"` optymalizuje rozpoznawanie.
- **Sieć / URL** — Wklej jeden lub więcej URL-i, aby bezpośrednio scrapować treść (Readability + Lightpanda dla stron JS), albo wpisz słowa kluczowe do wyszukiwania w sieci przez Agenta Mistral. Pojedyncze pole obsługuje oba przypadki — URL-e i słowa kluczowe są automatycznie rozdzielane, a każdy wynik tworzy osobne źródło.

### Generowanie treści AI

Siedem typów generowanych materiałów edukacyjnych:

| Generator | Model | Wynik |
|---|---|---|
| **Notatka do powtórki** | `mistral-large-latest` | Tytuł, podsumowanie, kluczowe punkty, słownictwo, cytaty, anegdota |
| **Fiszki** | `mistral-large-latest` | Karty pytanie/odpowiedź z odniesieniami do źródeł (liczba konfigurowalna) |
| **Quiz QCM** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjna powtórka (liczba konfigurowalna) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt 2 głosów → audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny przez narzędzie `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja AI |

### Korepetytor AI przez czat

Konwersacyjny korepetytor z pełnym dostępem do materiałów z lekcji:

- Używa `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować notatki, fiszki, quizy lub teksty z lukami podczas rozmowy
- Historia 50 wiadomości na kurs
- Moderacja treści, jeśli aktywowana dla profilu

### Automatyczny router

Router używa `mistral-small-latest` do analizy treści źródeł i proponowania najbardziej trafnych generatorów spośród 7 dostępnych. Interfejs pokazuje postęp w czasie rzeczywistym: najpierw faza analizy, potem indywidualne generacje z możliwością anulowania.

### Nauka adaptacyjna

- **Statystyki quizów**: śledzenie prób i dokładności dla każdego pytania
- **Powtórka quizu**: generuje 5-10 nowych pytań ukierunkowanych na słabe pojęcia
- **Wykrywanie polecenia**: wykrywa instrukcje powtórki ("Znam lekcję, jeśli znam...") i priorytetyzuje je w zgodnych generatorach tekstowych (notatka, fiszki, quiz, teksty z lukami)

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11-15), student (16-25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-latest` z 10 dostępnymi kategoriami, 5 blokowanych domyślnie dla dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorie konfigurowalne per profil w ustawieniach.
- **PIN rodzicielski**: hash SHA-256, wymagany dla profili poniżej 15 lat. W środowisku produkcyjnym należy użyć wolnego hasha z solą (Argon2id, bcrypt).
- **Ograniczenia czatu**: czat AI domyślnie wyłączony dla osób poniżej 16 lat, może zostać włączony przez rodziców

### System wielu profili

- Wiele profili z nazwą, wiekiem, avatarem, preferencjami językowymi
- **Głosy per profil** (`Profile.mistralVoices?: { host, guest }`) — każde dziecko może mieć swoją parę głosów do podcastu/quizu głosowego
- **Motyw per profil** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie przy zmianie profilu, zapisywane po stronie backendu
- Projekty powiązane z profilami przez `profileId`
- Usuwanie kaskadowe: usunięcie profilu usuwa wszystkie jego projekty

### Śledzenie kosztów API

Każde wywołanie Mistral (czat, OCR, STT, TTS, moderacja, agenci) jest instrumentowane tak, aby dostarczać użytkownikowi **przejrzystą** estymację € — bez niespodzianek na fakturze.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` z URL-ami dokumentacji Mistral do okresowego ponownego scrapowania
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (owijanie klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzyknięcie do odpowiedzi HTTP)
- **UI**: odznaka kosztu na generację (`src/partials/cost-badge-gen.html`), na źródło (`cost-badge-src.html`), suma skumulowana w dashboardzie (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` i `/sources/*` dekorują zwracany obiekt (Generation / Source) o `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/auto/route` dodaje pole `costDelta: number` dla samego kosztu routingu. `GET /projects/:pid` zwraca projekt wzbogacony o `totalCost` (suma obliczona z `costLog[]`) + pełną historię

### Wielodostawczy TTS i głosy niestandardowe

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, synteza mowy w 100% od Mistral, bez potrzeby dodatkowego klucza
- **Głosy niestandardowe**: rodzice mogą tworzyć własne głosy przez API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról prowadzącego/gościa — podcasty i quizy głosowe są wtedy odtwarzane głosem rodzica, co czyni doświadczenie jeszcze bardziej immersyjnym dla dziecka
- Dwie konfigurowalne role głosowe: **prowadzący** (główny narrator) i **gość** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, z filtrowaniem według języka

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
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Responsywny interfejs, TypeScript kompilowany przez Vite |
| **Templating** | vite-plugin-handlebars | Składanie HTML przez partiale |
| **AI** | Mistral AI SDK 2.x | Czat, OCR, STT, TTS, agenci, moderacja |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, wbudowana synteza mowy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Web scraping** | Readability + linkedom | Ekstrakcja głównej treści stron internetowych (technologia Firefox Reader View) |
| **Przeglądarka headless** | Lightpanda | Ultralekka przeglądarka headless (Zig + V8) dla stron JS/SPA — fallback scraping |
| **Markdown** | Marked | Renderowanie markdown w czacie |
| **Upload plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Łączenie segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Trwałość** | Pliki JSON | Przechowywanie bez zależności |

---

## Referencja modeli

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Notatka, Fiszki, Podcast, Quiz, Teksty z lukami, Czat, Weryfikacja quizu głosowego, Agent obrazów, Agent Web Search, Wykrywanie polecenia | Najlepszy multilingual + śledzenie instrukcji |
| `mistral-ocr-2512` (OCR 3, domyślny) | OCR dokumentów | Tekst drukowany, tabele, pismo odręczne ($2 / 1000 stron) |
| `mistral-ocr-4-0` (OCR 4, opcja) | OCR dokumentów — wyższa jakość | Wybieralne w Ustawieniach, 2× koszt ($4 / 1000 stron) |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | Multilingwalny STT, zoptymalizowany z `language="fr"` |
| `voxtral-mini-tts-latest` | Synteza mowy (TTS) | Podcasty, quiz głosowy, czytanie na głos |
| `mistral-moderation-latest` | Moderacja treści | 5 kategorii blokowanych dla dziecka/nastolatka (+ jailbreaking) |
| `mistral-small-latest` | Automatyczny router | Szybka analiza treści do decyzji routingu |

---

## Szybki start

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
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Uwaga**: Mistral Voxtral TTS jest jedynym dostawcą TTS — nie jest potrzebny żaden dodatkowy klucz poza `MISTRAL_API_KEY`.

### Zmienne środowiskowe

| Zmienna | Wymagana | Domyślna | Rola |
|---|---|---|---|
| `MISTRAL_API_KEY` | ✅ | — | Klucz API Mistral (czat, OCR, STT, TTS Voxtral, agenci, moderacja) |
| `PORT` | opcjonalne | `3000` | Port HTTP backendu Express |
| `NODE_ENV` | opcjonalne | `development` | Jeśli `production` → Express serwuje frontend z `dist/` (w przeciwnym razie `public/`) |
| `SONAR_TOKEN` | opcjonalne CI | — | Używane wyłącznie przez workflow GitHub Actions SonarCloud |

### Testy, jakość kodu i współtworzenie

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooki Git (Husky)**: `pre-commit` uruchamia `npm test`, `pre-push` uruchamia `npm run security`. Oba blokują commit/push w razie błędu.

**Wymagane zewnętrzne narzędzia (opcjonalne, ale używane przez `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Bez tych narzędzi `npm test` kończy się niepowodzeniem na `pretest` (brak lizard), a `npm run security` kończy się niepowodzeniem (brak opengrep). Hooki husky blokują wtedy commit/push.

---

## Wdrożenie z kontenerem

Obraz jest publikowany w **GitHub Container Registry** :

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

> **`:U`** to flag Podman rootless, który automatycznie dostosowuje uprawnienia wolumenu.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---
## Struktura projektu

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
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
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

> **Dla współtwórców AI**: zobacz [`CLAUDE.md`](CLAUDE.md), aby uzyskać szczegółowy kontekst architektury, obowiązkowe zasady (anti-leak prompts, kody błędów, śledzenie kosztów) oraz znane pułapki (Lizard CCN, Opengrep, migracja Codacy/Semgrep).

---

## Dokumentacja API

### Konfiguracja
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Modyfikacja konfiguracji (modele, głosy, model TTS) |
| `GET` | `/api/config/status` | Status API: `mistral` (klucz Mistral ustawiony), `ttsAvailable` (alias `mistral`, Mistral Voxtral jest jedynym dostawcą TTS) |
| `POST` | `/api/config/reset` | Reset do domyślnej konfiguracji |
| `GET` | `/api/config/voices` | Wyświetl głosy Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Dostępne kategorie moderacji + domyślne według wieku |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Wyświetl wszystkie profile |
| `POST` | `/api/profiles` | Utwórz profil |
| `PUT` | `/api/profiles/:id` | Zmień profil (PIN wymagany dla < 15 lat) |
| `DELETE` | `/api/profiles/:id` | Usuń profil + kaskadowo projekty `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Wyświetl projekty (`?profileId=` opcjonalnie) |
| `POST` | `/api/projects` | Utwórz projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu |
| `PUT` | `/api/projects/:pid` | Zmień nazwę `{name}` |
| `DELETE` | `/api/projects/:pid` | Usuń projekt |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośredni odczyt dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Dowolny tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL lub wyszukiwanie w sieci `{query}` — zwraca tablicę źródeł |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usuń źródło |
| `POST` | `/api/projects/:pid/moderate` | Moderuj `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykryj instrukcje powtórki |

### Generowanie
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Karta powtórkowa |
| `POST` | `/api/projects/:pid/generate/flashcards` | Fiszki |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz wielokrotnego wyboru |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptacyjna powtórka `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) — zwraca `{plan, costDelta}` (koszt samego routingu) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczne generowanie backendowe (routing + 7 typów: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image). Wykonanie równoległe — zakłada tier Mistral z rate-limit ≥ 7 jednoczesnych żądań; w przeciwnym razie kilka 429 może trafić do `failedSteps`. |

Wszystkie trasy generowania akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` wymaga dodatkowo `{generationId, weakQuestions}`.

### CRUD generacji
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Prześlij odpowiedzi quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Prześlij odpowiedzi tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Sprawdź odpowiedź ustną (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odczyt TTS na głos (karty/fiszki) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmień nazwę `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usuń generację |

### Chat
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Pobierz historię czatu |
| `POST` | `/api/projects/:pid/chat` | Wyślij wiadomość `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Wyczyść historię czatu |

---

## Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| **Alpine.js zamiast React/Vue** | Minimalny narzut, lekka reaktywność z TypeScript kompilowanym przez Vite. Idealne na hackathon, gdzie liczy się szybkość. |
| **Trwałość w plikach JSON** | Zero zależności, natychmiastowy start. Nie trzeba konfigurować żadnej bazy danych — uruchamiasz i działa. |
| **Vite + Handlebars** | Najlepsze z obu światów: szybki HMR do 개발u, HTML partials do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty AI w `prompts.ts` — łatwo iterować, testować i dopasowywać do języka/grupy wiekowej. |
| **System wielokrotnych generacji** | Każda generacja jest niezależnym obiektem z własnym ID — pozwala tworzyć wiele kart, quizów itd. w ramach kursu. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, złożonością i tonem — ta sama treść uczy inaczej w zależności od ucznia. |
| **Funkcje oparte na Agentach** | Generowanie obrazów i wyszukiwanie w sieci używają tymczasowych Agentów Mistral — czysty cykl życia z automatycznym sprzątaniem. |
| **Inteligentny scraping URL** | Jedno pole akceptuje URL-e i wymieszane słowa kluczowe — URL-e są scrapowane przez Readability (strony statyczne) z fallbackiem Lightpanda (strony JS/SPA), a słowa kluczowe uruchamiają Agent Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **TTS w 100% Mistral** | Mistral Voxtral TTS (bez dodatkowego klucza poza `MISTRAL_API_KEY`) — synteza mowy zintegrowana z łańcuchem kosztów i rozpoznawaniem głosu według języka. |

---

## Podziękowania i wyróżnienia

- **[Mistral AI](https://mistral.ai)** — modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — lekki reaktywny framework
- **[TailwindCSS](https://tailwindcss.com)** — utilitarny framework CSS
- **[Vite](https://vitejs.dev)** — narzędzie do budowania frontendu
- **[Lucide](https://lucide.dev)** — biblioteka ikon
- **[Marked](https://marked.js.org)** — parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — ekstrakcja treści webowej (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — ultralekka przeglądarka headless do scrapingu stron JS/SPA

Rozpoczęty podczas Mistral AI Worldwide Hackathon (marzec 2026), opracowany w całości przez AI z użyciem [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artykuł przetłumaczony z fr na pl za pomocą gpt-5.4-mini.**
