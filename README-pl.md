<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywne doświadczenie nauki — zasilane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Ocena łatwości utrzymania"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Pokrycie"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Podatności"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Zapachy kodu"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Linie kodu"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Odznaka Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Historia — Dlaczego EurekAI?

**EurekAI** powstał podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — i pomysł przyszedł z czegoś bardzo konkretnego: regularnie przygotowuję się do sprawdzianów z moją córką i pomyślałem, że musi istnieć sposób, by zrobić to bardziej zabawnie i interaktywnie dzięki AI.

Cel: wziąć **dowolne wejście** — zdjęcie lekcji, skopiowany tekst, nagranie głosowe, wyszukiwanie w sieci — i przekształcić je w **notatki powtórkowe, fiszki, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Wszystko zasilane przez francuskie modele Mistral AI, co czyni to rozwiązanie naturalnie dopasowanym do uczniów francuskojęzycznych.

[Początkowy prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) został zaprojektowany w 48 godzin podczas hackathonu jako proof of concept wokół usług Mistral — już działający, ale ograniczony. Od tego czasu EurekAI stał się prawdziwym projektem: teksty z lukami, nawigacja po ćwiczeniach, web scraping, konfigurowalna moderacja rodzicielska, dogłębny przegląd kodu i wiele więcej. Cały kod jest generowany przez AI — głównie [Claude Code](https://code.claude.com/), z pewnym udziałem [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcie, PDF (przez Mistral OCR z uśrednionym wynikiem ufności, poziomy `high`/`medium`/`low`) lub plik tekstowy (TXT, MD). Sesje przesyłania z ponawianiem dla każdego pliku i indywidualnym postępem |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wejście głosowe** | Nagraj się — Voxtral STT transkrybuje twój głos |
| 🌐 | **Sieć / URL** | Wklej URL (bezpośrednie scrapowanie przez Readability + Lightpanda) albo wpisz wyszukiwanie (Agent Mistral web_search) |
| 📄 | **Notatki powtórkowe** | Ustrukturyzowane notatki z kluczowymi punktami, słownictwem, cytatami, anegdotami |
| 🃏 | **Fiszki** | Interaktywne karty pytań i odpowiedzi, dialogowa lektura audio |
| ❓ | **Quiz wielokrotnego wyboru** | Pytania wielokrotnego wyboru z adaptacyjnym przeglądem błędów (konfigurowalna liczba) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełnienia z podpowiedziami i tolerancyjną walidacją |
| 🔤 | **Dyktando** | Słowa dyktowane audio (Voxtral TTS) z zaimportowanej listy, wpisywanie z klawiatury, ścisła korekta litera po literze z wyjaśnioną zasadą ortograficzną |
| 🎙️ | **Podcast** | Minipodcast w dwóch głosach — domyślnie głos Mistral lub głosy niestandardowe (dla rodziców!) |
| 🖼️ | **Ilustracje** | Edukacyjne obrazy generowane przez Agent Mistral |
| 🗣️ | **Quiz głosowy** | Pytania czytane na głos (możliwy własny głos), odpowiedź ustna, weryfikacja AI |
| 💬 | **Tutor AI** | Kontekstowy czat z twoimi materiałami z zajęć, z wywoływaniem narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 8 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Konfigurowalna moderacja na profil (dostosowywane kategorie), PIN rodzicielski, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach poprzez prompty |
| 🔊 | **Czytanie na głos** | Słuchaj notatek i fiszek (dialog pytanie/odpowiedź) przez Mistral Voxtral TTS |
| 💶 | **Śledzenie kosztów API** | Przejrzyste oszacowanie kosztu € każdej generacji i źródła (tokeny / znaki / strony / sekundy audio). Odznaka dla każdej karty + suma dla projektu, widoczna w dashboardzie |
| 🎨 | **Motyw na profil** | Każdy profil wybiera swój motyw `dark` lub `light` — zachowuje się po zmianie profilu |

---

## Przegląd architektury

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Przegląd architektury" width="800" />
</p>

---

## Mapa wykorzystania modeli

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapowanie modeli AI do zadań" width="800" />
</p>

---

## Ścieżka użytkownika

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Ścieżka nauki ucznia" width="800" />
</p>

---

## Szczegółowe omówienie — funkcje

### Wejście multimodalne

EurekAI akceptuje 4 typy źródeł, moderowane zgodnie z profilem (domyślnie włączone dla dziecka i nastolatka) :

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez OCR Mistral — **OCR 3 (`mistral-ocr-2512`) domyślnie**, **OCR 4 (`mistral-ocr-4-0`) opcjonalnie** w Ustawieniach (lepsza jakość, ale 2× koszt) — dla tekstu drukowanego, tabel i pisma odręcznego; albo pliki tekstowe (TXT, MD) importowane bezpośrednio. Wieloplikowe uploady używają systemu **sesji uploadu**: indywidualny postęp dla każdego pliku, ponowna próba dla pliku, który się nie powiódł, bez ponownego wysyłania pozostałych, zamknięcie sesji po zakończeniu. OCR udostępnia **uśredniony wynik ufności** (`average`, przycięty do `[0,1]`, obliczony na podstawie `averagePageConfidenceScore` zwróconych przez Mistral), wyświetlany w UI jako odznaka poziomu `high` / `medium` / `low` (progi ~0.9 / ~0.7) — ostrzega bez blokowania, jeśli skan jest słabej jakości.
- **Swobodny tekst** — Wpisz lub wklej dowolną treść. Moderowany przed zapisaniem, jeśli moderacja jest aktywna.
- **Wejście głosowe** — Nagraj audio w przeglądarce. Transkrybowane przez `voxtral-mini-latest`. Parametr `language="fr"` optymalizuje rozpoznawanie.
- **Sieć / URL** — Wklej jeden lub więcej URL-i, aby bezpośrednio scrapować treść (Readability + Lightpanda dla stron JS) albo wpisz słowa kluczowe do wyszukiwania w sieci przez Agenta Mistral. Jedno pole obsługuje oba przypadki — URL-e i słowa kluczowe są rozdzielane automatycznie, a każdy wynik tworzy niezależne źródło.

### Generowanie treści przez AI

Osiem typów generowanych materiałów edukacyjnych:

| Generator | Model | Wynik |
|---|---|---|
| **Notatka powtórkowa** | `mistral-large-latest` | Tytuł, podsumowanie, kluczowe punkty, słownictwo, cytaty, anegdota |
| **Fiszki** | `mistral-large-latest` | Karty pytań i odpowiedzi z odniesieniami do źródeł (konfigurowalna liczba) |
| **Quiz wielokrotnego wyboru** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjny przegląd (konfigurowalna liczba) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Dyktando** | `mistral-large-latest` + Voxtral TTS | Słowa kluczowe dyktowane audio (1 MP3/słowo) → wpisywanie z klawiatury → ścisła korekta (akcenty) z wyjaśnioną zasadą |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt w 2 głosach → audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny przez narzędzie `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja AI |

### Tutor AI przez czat

Konwersacyjny tutor z pełnym dostępem do materiałów z zajęć:

- Używa `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować notatki, fiszki, quizy lub teksty z lukami w trakcie rozmowy
- Historia 50 wiadomości na kurs
- Moderacja treści, jeśli aktywowana dla profilu

### Automatyczny router

Router używa `mistral-small-latest` do analizy treści źródeł i proponowania najbardziej trafnych generatorów spośród 8 dostępnych. Interfejs pokazuje postęp w czasie rzeczywistym: najpierw faza analizy, potem indywidualne generacje z możliwością anulowania.

### Nauka adaptacyjna

- **Statystyki quizu**: śledzenie prób i dokładności dla każdego pytania
- **Przegląd quizu**: generuje 5-10 nowych pytań celujących w słabe pojęcia
- **Wykrywanie instrukcji**: wykrywa instrukcje powtórkowe („Umiem lekcję, jeśli umiem...”) i nadaje im priorytet w zgodnych generatorach tekstowych (notatka, fiszki, quiz, teksty z lukami)

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11-15), student (16-25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-latest` z 10 dostępnymi kategoriami, 5 blokowanych domyślnie dla dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorie konfigurowalne dla każdego profilu w ustawieniach.
- **PIN rodzicielski**: hash SHA-256, wymagany dla profili poniżej 15 lat. W przypadku wdrożenia produkcyjnego należy użyć wolnego hasha z solą (Argon2id, bcrypt).
- **Ograniczenia czatu**: czat AI domyślnie wyłączony dla osób poniżej 16 lat, możliwy do włączenia przez rodziców

### System wielu profili

- Wiele profili z nazwą, wiekiem, avatarem, preferencjami językowymi
- **Głosy na profil** (`Profile.mistralVoices?: { host, guest }`) — każde dziecko może mieć własną parę głosów do podcastu/quizu głosowego
- **Motyw na profil** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie przy zmianie profilu, zachowane po stronie backendu
- Projekty powiązane z profilami przez `profileId`
- Usuwanie kaskadowe: usunięcie profilu usuwa wszystkie jego projekty

### Śledzenie kosztów API

Każde wywołanie Mistral (czat, OCR, STT, TTS, moderacja, agenci) jest instrumentowane, aby zapewnić użytkownikowi **przejrzyste** oszacowanie kosztu € — bez niespodzianek na rachunku.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → input 0.5 €/M tokenów, output 1.5 €/M tokenów), `PRICING_SOURCES` z URL-ami dokumentacji Mistral do okresowego ponownego scrapowania
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (wrap klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzyknięcie do odpowiedzi HTTP)
- **UI**: odznaka kosztu dla każdej generacji (`src/partials/cost-badge-gen.html`), dla każdego źródła (`cost-badge-src.html`), łączna suma w dashboardzie (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` i `/sources/*` dekorują zwracany obiekt (Generation / Source) o `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/auto/route` dodaje pole `costDelta: number` dla kosztu samego routingu. `GET /projects/:pid` zwraca projekt wzbogacony o `totalCost` (suma obliczona z `costLog[]`) + pełną historię

### TTS wielu dostawców i niestandardowe głosy

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, synteza mowy w 100% od Mistral, bez potrzeby dodatkowego klucza
- **Głosy niestandardowe**: rodzice mogą tworzyć własne głosy przez API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról prowadzącego/gościa — podcasty i quizy głosowe są wtedy odtwarzane głosem jednego z rodziców, co czyni doświadczenie jeszcze bardziej wciągającym dla dziecka
- Dwie konfigurowalne role głosowe: **prowadzący** (główny narrator) i **gość** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, z filtrowaniem według języka

### Internacjonalizacja

- Interfejs dostępny w 9 językach: fr, en, es, pt, it, nl, de, hi, ar
- Prompty AI obsługują 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Język konfigurowalny dla każdego profilu

---

## Stos technologiczny

| Warstwa | Technologia | Rola |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Serwer i bezpieczeństwo typów |
| **Backend** | Express 5.x | API REST |
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, partiale Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktywny interfejs, TypeScript kompilowany przez Vite |
| **Szablony** | vite-plugin-handlebars | Składanie HTML z partiali |
| **AI** | Mistral AI SDK 2.x | Czat, OCR, STT, TTS, agenci, moderacja |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, wbudowana synteza mowy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Web scraping** | Readability + linkedom | Ekstrakcja głównej treści stron WWW (technologia Firefox Reader View) |
| **Przeglądarka headless** | Lightpanda | Ultralekka przeglądarka headless (Zig + V8) dla stron JS/SPA — zapasowe scrapowanie |
| **Markdown** | Marked | Renderowanie markdownu na czacie |
| **Upload plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Łączenie segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Persistencja** | Pliki JSON | Przechowywanie bez zależności |

---

## Referencja modeli

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Notatka, fiszki, podcast, quiz, teksty z lukami, czat, weryfikacja quizu głosowego, agent obrazów, agent wyszukiwania w sieci, wykrywanie instrukcji | Najlepsza wielojęzyczność + śledzenie instrukcji |
| `mistral-ocr-2512` (OCR 3, domyślnie) | OCR dokumentów | Tekst drukowany, tabele, pismo odręczne ($2 / 1000 stron) |
| `mistral-ocr-4-0` (OCR 4, opcjonalnie) | OCR dokumentów — wyższa jakość | Możliwy do wyboru w Ustawieniach, 2× koszt ($4 / 1000 stron) |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | Wielojęzyczny STT, zoptymalizowany z `language="fr"` |
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
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Uwaga**: Mistral Voxtral TTS to jedyny dostawca TTS — nie jest potrzebny żaden dodatkowy klucz poza `MISTRAL_API_KEY`.

> **Klucz API wprowadzany przez użytkownika**: `MISTRAL_API_KEY` jest teraz **opcjonalny**. Jeśli go brakuje, aplikacja i tak uruchamia się i prosi każdego użytkownika o wpisanie **własnego klucza Mistral** w interfejsie. Klucz jest **przechowywany w przeglądarce** (zaszyfrowany przez Web Crypto + IndexedDB w bezpiecznym kontekście) i wysyłany w żądaniu — **nigdy nie jest utrwalany na serwerze**. Kolejność pierwszeństwa: klucz profilu > globalny klucz przeglądarki > `MISTRAL_API_KEY` (env). Ustawienie `EUREKAI_REQUIRE_USER_KEY=true` wymusza na każdym użytkowniku podanie własnego klucza (klucz z env służy już tylko do wstępnych ładowań).

> **Lokalne HTTPS (tabletka/LAN)**: `localhost` to już bezpieczny kontekst. Dla dostępu przez LAN (tablet) wygeneruj lokalny certyfikat i włącz HTTPS, aby odblokować szyfrowanie po stronie przeglądarki + szyfrowanie klucza w tranzycie:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert jeśli dostępny, w przeciwnym razie self-signed openssl
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite w HTTPS
> ```

### Zmienne środowiskowe

| Zmienna | Wymagane | Domyślnie | Rola |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcjonalny | — | Klucz API Mistral (chat, OCR, STT, TTS Voxtral, agenci, moderacja). Jeśli brak, użytkownik wpisuje swój klucz w aplikacji (przechowywany w przeglądarce, nigdy na serwerze) |
| `EUREKAI_REQUIRE_USER_KEY` | opcjonalny | `false` | `true` → wyłącza fallback na `MISTRAL_API_KEY` dla zapytań AI (każdy użytkownik MUSI podać własny klucz). Przydatne na wystawionej instancji |
| `HTTPS_KEY` / `HTTPS_CERT` | opcjonalny | — | Ścieżki klucza/certyfikatu TLS (zob. `scripts/gen-cert.sh`) → Express i Vite działają przez HTTPS (secure context LAN/tablet) |
| `PORT` | opcjonalny | `3000` | Port HTTP backendu Express |
| `NODE_ENV` | opcjonalny | `development` | Jeśli `production` → Express serwuje frontend z `dist/` (w przeciwnym razie `public/`) |
| `SONAR_TOKEN` | opcjonalny CI | — | Używane wyłącznie przez workflow GitHub Actions SonarCloud |

### Testy, jakość kodu i współpraca

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooki Git (Husky)**: `pre-commit` uruchamia `npm test`, `pre-push` uruchamia `npm run security`. Oba blokują commit/push w przypadku błędu.

**Wymagane zewnętrzne narzędzia (opcjonalne, ale używane przez `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Bez tych narzędzi `npm test` kończy się niepowodzeniem na `pretest` (brak lizard), a `npm run security` kończy się niepowodzeniem (brak opengrep). Hooki husky blokują wtedy commit/push.

---

## Wdrażanie z kontenerem

Obraz jest publikowany w **GitHub Container Registry**:

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

> **`:U`** to flaga Podman rootless, która automatycznie dostosowuje uprawnienia woluminu.

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
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
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

> **Dla współpracowników AI**: zobacz [`CLAUDE.md`](CLAUDE.md) po szczegółowy kontekst architektury, obowiązkowe zasady (anti-leak prompts, kody błędów, śledzenie kosztów) oraz znane pułapki (Lizard CCN, Opengrep, migracja Codacy/Semgrep).

---

## Referencja API

### Konfiguracja
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Zmiana konfiguracji (modele, głos, model TTS) |
| `GET` | `/api/config/status` | Status API: `mistral` (klucz Mistral zdefiniowany), `ttsAvailable` (alias `mistral`, Mistral Voxtral to jedyny dostawca TTS) |
| `POST` | `/api/config/reset` | Reset konfiguracji do domyślnej |
| `GET` | `/api/config/voices` | Lista głosów Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Dostępne kategorie moderacji + domyślne ustawienia według wieku |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Lista wszystkich profili |
| `POST` | `/api/profiles` | Utworzenie profilu |
| `PUT` | `/api/profiles/:id` | Modyfikacja profilu (PIN wymagany dla < 15 lat) |
| `DELETE` | `/api/profiles/:id` | Usunięcie profilu + kaskadowe usunięcie projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Lista projektów (`?profileId=` opcjonalnie) |
| `POST` | `/api/projects` | Utworzenie projektu `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu |
| `PUT` | `/api/projects/:pid` | Zmiana nazwy `{name}` |
| `DELETE` | `/api/projects/:pid` | Usunięcie projektu |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośredni odczyt dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Wolny tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL lub wyszukiwanie w sieci `{query}` — zwraca tablicę źródeł |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usunięcie źródła |
| `POST` | `/api/projects/:pid/moderate` | Moderowanie `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykrywanie instrukcji do powtórki |

### Generowanie
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Karta powtórki |
| `POST` | `/api/projects/:pid/generate/flashcards` | Fiszki |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz wielokrotnego wyboru |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/dictation` | Dyktando (słowa + przykładowe zdania + reguły, 1 audio TTS na słowo; także proponowane przez auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Powtórka adaptacyjna `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Karta powtórkowa ukierunkowana na pytania, na które udzielono błędnych odpowiedzi w quizie `{generationId, weakQuestions}` — wywoływana równolegle z `quiz-review` przez przycisk „Ćwiczę na swoich błędach” |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) — zwraca `{plan, costDelta}` (koszt samego routingu) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczne generowanie backendowe (routing + 8 typów: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Wykonanie równoległe — zakłada poziom Mistral z rate-limit ≥ 8 jednoczesnych żądań; w przeciwnym razie wiele 429 może zostać zwróconych w `failedSteps`. |

Wszystkie trasy generowania akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` i `remediation-summary` wymagają dodatkowo `{generationId, weakQuestions}`.

### CRUD generacji
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Przesłanie odpowiedzi do quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Przesłanie odpowiedzi do tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Przesłanie odpowiedzi do dyktanda `{answers}` (ścisły wynik po stronie serwera) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Sprawdzenie odpowiedzi ustnej (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Głośne odczytanie TTS (karty/fiszki) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmiana nazwy `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usunięcie generacji |

### Chat
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Pobranie historii czatu |
| `POST` | `/api/projects/:pid/chat` | Wysłanie wiadomości `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Wyczyszczenie historii czatu |

---

## Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| **Alpine.js zamiast React/Vue** | Minimalny ślad, lekka reaktywność z TypeScript kompilowanym przez Vite. Idealne na hackathon, gdzie liczy się szybkość. |
| **Trwałość w plikach JSON** | Zero zależności, natychmiastowy start. Brak bazy danych do skonfigurowania — uruchamiasz i działa. |
| **Vite + Handlebars** | Najlepsze z obu światów: szybki HMR do разработки, HTML partials do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty AI w `prompts.ts` — łatwo iterować, testować i dostosowywać je według języka/grupy wiekowej. |
| **System wielogeneracyjny** | Każda generacja jest niezależnym obiektem z własnym ID — pozwala na wiele kart, quizów itd. na kurs. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, złożonością i tonem — ta sama treść uczy inaczej w zależności od ucznia. |
| **Funkcje oparte na Agentach** | Generowanie obrazów i wyszukiwanie w sieci wykorzystują tymczasowych Agentów Mistral — czysty cykl życia z automatycznym sprzątaniem. |
| **Inteligentne scrapingowanie URL** | Jedno pole akceptuje mieszankę URL-i i słów kluczowych — URL-e są scrapowane przez Readability (strony statyczne) z fallbackiem Lightpanda (strony JS/SPA), a słowa kluczowe uruchamiają web_search Agenta Mistral. Każdy wynik tworzy niezależne źródło. |
| **TTS w 100% Mistral** | Mistral Voxtral TTS (bez dodatkowego klucza poza `MISTRAL_API_KEY`) — synteza mowy zintegrowana z łańcuchem kosztów i rozpoznawaniem głosu według języka. |

---

## Podziękowania i uznanie

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lekki reaktywny framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie do budowania frontendowego
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Ekstrakcja treści webowych (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralekka przeglądarka headless do scrapowania stron JS/SPA
- **[Luciole](https://luciole-vision.com)** — Czcionka zaprojektowana dla osób słabowidzących, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opcja „Komfort czytania” w profilach)

Zainicjowane podczas Mistral AI Worldwide Hackathon (marzec 2026), rozwijane w całości przez AI z użyciem [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Prawa autorskie (C) 2026 Julien LS

**Artykuł przetłumaczony z fr na pl za pomocą gpt-5.4-mini.**
