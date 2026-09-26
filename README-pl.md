<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywną doświadczenie edukacyjne — napędzane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Jakość kodu</h4>

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

## Historia — Dlaczego EurekAI?

**EurekAI** powstało podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł wziął się z czegoś bardzo konkretnego: regularnie przygotowuję się z córką do sprawdzianów i pomyślałem, że dzięki AI powinno dać się uczynić to bardziej zabawnym i interaktywnym.

Cel: wziąć **dowolne wejście** — zdjęcie lekcji, skopiowany tekst, nagranie głosowe, wyszukiwanie w sieci — i przekształcić je w **fiszki powtórkowe, flashcards, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Wszystko napędzane francuskimi modelami Mistral AI, co czyni to rozwiązaniem naturalnie dopasowanym do uczniów frankofońskich.

[Początkowy prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) powstał w 48 godzin podczas hackathonu jako proof of concept wokół usług Mistral — już działający, ale ograniczony. Od tego czasu EurekAI stało się prawdziwym projektem: teksty z lukami, nawigacja po ćwiczeniach, scraping stron, konfigurowalna moderacja rodzicielska, dogłębny przegląd kodu i wiele więcej. Cały kod jest generowany przez AI — głównie [Claude Code](https://code.claude.com/), z udziałami [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Przegląd

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Wycieczka po EurekAI: źródła, fiszka, quiz, flashcards, ilustracje" width="820" />
</p>

| | |
|---|---|
| ![Panel główny](docs/screenshots/dashboard.webp)<br>**Panel główny** — ostatnie generacje, szacowany koszt na kartę i łącznie dla projektu, przycisk « Auto — Magia! » | ![Źródła](docs/screenshots/sources.webp)<br>**Źródła** — import zdjęcia/PDF/tekstu/głosu/sieci, generowanie jednym kliknięciem, wykrywanie poleceń |

Każde zaimportowane źródło wyświetla swój [wynik pewności OCR, moderację i szacowany koszt](docs/screenshots/sources-list.webp).

### Komponenty w działaniu

| | |
|---|---|
| ![Fiszka powtórkowa](docs/screenshots/notes.gif)<br>**Fiszka powtórkowa** — kluczowe punkty, słownictwo, cytaty ze źródłami, odczyt audio według sekcji | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz QCM** — natychmiastowa informacja zwrotna z wyjaśnieniem, nawigacja krok po kroku |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — karta do odwrócenia, potem samoocena « wiedziałem / nie wiedziałem » | ![Teksty z lukami](docs/screenshots/fillblank.gif)<br>**Teksty z lukami** — wskazówka na żądanie, tolerancyjna walidacja |
| ![Dyktando](docs/screenshots/dictation.gif)<br>**Dyktando** — słowo dyktowane audio, ścisła korekta litera po literze | ![Quiz głosowy](docs/screenshots/vocal-quiz.gif)<br>**Quiz głosowy** — pytanie odczytywane na głos, odpowiedź przez mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast 2 głosy, przeglądany skrypt dialogowy | ![Ilustracje](docs/screenshots/illustrations.gif)<br>**Ilustracje** — obrazy edukacyjne generowane przez Agent |
| ![Tutor AI](docs/screenshots/chat.gif)<br>**Tutor AI** — czat zakotwiczony w dokumentach kursu, wyjaśnione odpowiedzi, może generować quizy i flashcards | |

### Pierwsze kroki

| | |
|---|---|
| ![Wybór profilu](docs/screenshots/login.gif)<br>**Wybór profilu** — każde dziecko ma swoją przestrzeń, awatar i język | ![Tworzenie profilu](docs/screenshots/profile-create.gif)<br>**Tworzenie profilu** — wiek, awatar, PIN rodzicielski dla osób poniżej 15 lat |
| ![Tworzenie kursu](docs/screenshots/course.gif)<br>**Tworzenie kursu** — jeden projekt na lekcję, gotowy na źródła | ![Ustawienia](docs/screenshots/settings.gif)<br>**Ustawienia** — status API, wybór modeli AI z wyświetlanymi cenami |

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj lekcje — zdjęcie, PDF (przez Mistral OCR ze średnim wynikiem pewności, poziomy `high`/`medium`/`low`) lub plik tekstowy (TXT, MD). Sesje przesyłania z ponowieniem dla każdego pliku i indywidualnym postępem |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wejście głosowe** | Nagraj się — Voxtral STT transkrybuje Twój głos |
| 🌐 | **Web / URL** | Wklej URL (bezpośredni scraping przez Readability + Lightpanda) lub wpisz wyszukiwanie (Agent Mistral web_search) |
| 📄 | **Fiszki powtórkowe** | Ustrukturyzowane notatki z kluczowymi punktami, słownictwem, cytatami, anegdotami |
| 🃏 | **Flashcards** | Interaktywne karty P/O, dialogowy odczyt audio |
| ❓ | **Quiz QCM** | Pytania wielokrotnego wyboru z adaptacyjną powtórką błędów (konfigurowalna liczba) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełnienia ze wskazówkami i tolerancyjną walidacją |
| 🔤 | **Dyktando** | Słowa dyktowane audio (Voxtral TTS) z zaimportowanej listy, wpisywanie z klawiatury, ścisła korekta litera po literze z wyjaśnioną regułą ortografii |
| 🎙️ | **Podcast** | Mini-podcast 2 głosy w audio — domyślne głosy Mistral lub własne głosy (rodzice!) |
| 🖼️ | **Ilustracje** | Obrazy edukacyjne generowane przez Agent Mistral |
| 🗣️ | **Quiz głosowy** | Pytania odczytywane na głos (możliwy własny głos), odpowiedź ustna, weryfikacja AI |
| 💬 | **Tutor AI** | Kontekstowy czat z dokumentami kursu, z wywołaniem narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 8 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Konfigurowalna moderacja według profilu (dostosowywalne kategorie), PIN rodzicielski, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach przez prompty |
| 🔊 | **Odczyt na głos** | Słuchaj fiszek i flashcards (dialog pytanie/odpowiedź) przez Mistral Voxtral TTS |
| 💶 | **Śledzenie kosztów API** | Przejrzyste szacowanie kosztu € każdej generacji i źródła (tokeny / znaki / strony / sekundy audio). Odznaka na kartę + suma na projekt, widoczna w panelu głównym |
| 🎨 | **Motyw według profilu** | Każdy profil wybiera motyw `dark` lub `light` — zachowywany przy zmianie profilu |

---

## Przegląd architektury

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Przegląd architektury" width="800" />
</p>

---

## Mapa użycia modeli

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapowanie modeli AI na zadania" width="800" />
</p>

---

## Ścieżka użytkownika

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Ścieżka nauki ucznia" width="800" />
</p>

---

## Głębsze spojrzenie — Funkcje

### Wejście multimodalne

EurekAI akceptuje 4 typy źródeł, moderowane według profilu (domyślnie włączone dla dziecka i nastolatka):

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez OCR Mistral — **OCR 4 (`mistral-ocr-4-0`) domyślnie** (lepsza jakość), **OCR 3 (`mistral-ocr-2512`) opcjonalnie** w Ustawieniach (tańszy, ~½ kosztu) — dla tekstu drukowanego, tabel i pisma ręcznego; lub pliki tekstowe (TXT, MD) importowane bezpośrednio. Przesyłanie wielu plików korzysta z systemu **sesji przesyłania**: indywidualny postęp dla każdego pliku, ponowienie nieudanego pliku bez ponownego przesyłania pozostałych, zamknięcie sesji po zakończeniu. OCR udostępnia uśredniony **wynik pewności** (`average`, ograniczony do `[0,1]`, obliczany z `averagePageConfidenceScore` zwracanych przez Mistral), wyświetlany w UI jako odznaka poziomu `high` / `medium` / `low` (progi ~0.9 / ~0.7) — ostrzega bez blokowania, gdy skan jest słabej jakości.
- **Wolny tekst** — Wpisz lub wklej dowolną treść. Moderowany przed zapisem, jeśli moderacja jest aktywna.
- **Wejście głosowe** — Nagraj audio w przeglądarce. Transkrybowane przez `voxtral-mini-latest`. Parametr `language="fr"` optymalizuje rozpoznawanie.
- **Web / URL** — Wklej jeden lub więcej URL-i, aby bezpośrednio zescrapować treść (Readability + Lightpanda dla stron JS), albo wpisz słowa kluczowe do wyszukiwania w sieci przez Agent Mistral. Jedno pole akceptuje oba — URL-e i słowa kluczowe są rozdzielane automatycznie, każdy wynik tworzy niezależne źródło.

### Generowanie treści AI

Osiem typów generowanego materiału edukacyjnego:

| Generator | Model | Wynik |
|---|---|---|
| **Fiszka powtórkowa** | `mistral-large-latest` | Tytuł, streszczenie, kluczowe punkty, słownictwo, cytaty, anegdota |
| **Flashcards** | `mistral-large-latest` | Karty P/O z odniesieniami do źródeł (konfigurowalna liczba) |
| **Quiz QCM** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjna powtórka (konfigurowalna liczba) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia ze wskazówkami, tolerancyjna walidacja (Levenshtein) |
| **Dyktando** | `mistral-large-latest` + Voxtral TTS | Kluczowe słowa dyktowane audio (1 MP3/słowo) → wpisywanie z klawiatury → ścisła korekta (akcenty) z wyjaśnioną regułą |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt 2 głosy → audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny przez narzędzie `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja AI |

### Tutor AI przez czat

Konwersacyjny tutor z pełnym dostępem do dokumentów kursu:

- Używa `mistral-large-latest`
- **Wywołanie narzędzi**: może generować fiszki, flashcards, quizy lub teksty z lukami podczas rozmowy
- Historia 50 wiadomości na kurs
- Moderacja treści, jeśli włączona dla profilu

### Automatyczny router

Router używa `mistral-small-latest` do analizy treści źródeł i proponowania najbardziej trafnych generatorów spośród 8 dostępnych. Interfejs wyświetla postęp w czasie rzeczywistym: najpierw faza analizy, potem poszczególne generacje z możliwością anulowania.

### Adaptacyjne uczenie

- **Statystyki quizu**: śledzenie prób i dokładności według pytania
- **Powtórka quizu**: generuje 5–10 nowych pytań celujących w słabe koncepcje
- **Wykrywanie poleceń**: wykrywa instrukcje powtórki (« Wiem lekcję, jeśli potrafię… ») i priorytetyzuje je w kompatybilnych generatorach tekstowych (fiszka, flashcards, quiz, teksty z lukami)

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11–15), student (16–25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-2603` (Mistral Moderation 2) z 11 dostępnymi kategoriami, 5 domyślnie blokowanych dla dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorie dostosowywalne według profilu w ustawieniach; Moderation 2 podzieliła dawną kategorię « niebezpieczna treść » na `dangerous` + `criminal` (istniejące profile są migrowane automatycznie, a zablokowane kategorie dotyczą także już zaimportowanych źródeł). Bezpieczeństwo domyślne: jeśli odpowiedź modelu nie pozwala zweryfikować zablokowanej kategorii, treść jest odrzucana (« Moderacja niedostępna »); przy aktywnej moderacji generowanie i czat pomijają źródła oznaczone, błędne lub w trakcie weryfikacji (źródło zaimportowane przy wyłączonej moderacji nie jest ponownie sprawdzane). Datowany identyfikator przypięty w `helpers/moderation-model.ts`: alias `-latest`, przestarzały, nie jest już listowany przez API.
- **PIN rodzicielski**: hash SHA-256, wymagany dla profili poniżej 15 lat. W wdrożeniu produkcyjnym przewidzieć wolny hash z solą (Argon2id, bcrypt).
- **Ograniczenia czatu**: czat AI domyślnie wyłączony dla osób poniżej 16 lat, możliwy do włączenia przez rodziców

### System wielu profili

- Wiele profili z imieniem, wiekiem, awatarem, preferencjami języka
- **Głosy według profilu** (`Profile.mistralVoices?: { host?, guest? }` — każda rola jest opcjonalna) — każde dziecko może mieć swoją parę głosów podcast/quiz głosowy
- **Motyw według profilu** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie przy zmianie profilu, zapisywane po stronie backendu
- Projekty powiązane z profilami przez `profileId`
- Usuwanie kaskadowe: usunięcie profilu usuwa wszystkie jego projekty

### Śledzenie kosztów API

Każde płatne wywołanie Mistral (chat, OCR, STT, TTS, agents) jest instrumentowane, aby zapewnić użytkownikowi **przejrzyste** szacowanie €. Moderacja, bezpłatna, nie jest liczona. Znane ograniczenie: opłaty za narzędzia agentów (wyszukiwanie w sieci 30 $/1000 wywołań, generowanie obrazu 100 $/1000 obrazów) nie są jeszcze liczone — wyświetlany koszt ilustracji jest niedoszacowany.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → input 0.5 €/M tokenów, output 1.5 €/M tokenów), `PRICING_SOURCES` z URL-ami dokumentacji Mistral do okresowego ponownego scrapingu
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (opakowanie klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzyknięcie do odpowiedzi HTTP)
- **UI**: odznaka kosztu na generację (`src/partials/cost-badge-gen.html`), na źródło (`cost-badge-src.html`), suma skumulowana w panelu głównym (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` i `/sources/*` dekorują zwrócony obiekt (Generation / Source) polami `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/route` dodaje pole `costDelta: number` dla samego kosztu routingu. `GET /projects/:pid` zwraca projekt wzbogacony o `totalCost` (suma obliczona z `costLog[]`) + pełną historię

### TTS (Mistral Voxtral) i własne głosy

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, synteza mowy 100% Mistral, bez dodatkowej klucza
- **Własne głosy**: rodzice mogą tworzyć własne głosy przez API Mistral Voices (z próbki audio) i przypisywać je do ról gospodarz/gość — podcasty i quizy głosowe są wtedy odczytywane głosem rodzica, czyniąc doświadczenie jeszcze bardziej immersyjnym dla dziecka
- Dwie konfigurowalne role głosowe: **gospodarz** (główny narrator) i **gość** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, filtrowalny według języka
### Internacjonalizacja

- Interfejs dostępny w 9 językach : fr, en, es, pt, it, nl, de, hi, ar
- Prompty IA obsługują 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Język konfigurowalny per profil

---

## Stack techniczny

| Warstwa | Technologia | Rola |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Serwer i bezpieczeństwo typów |
| **Backend** | Express 5.x | API REST |
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfejs reaktywny, TypeScript kompilowany przez Vite |
| **Templating** | vite-plugin-handlebars | Kompozycja HTML przez partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderacja |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, wbudowana synteza mowy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Scraping web** | Readability + linkedom | Ekstrakcja głównej treści stron internetowych (technologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralekka przeglądarka headless (Zig + V8) dla stron JS/SPA — fallback scrapingu |
| **Markdown** | Marked | Renderowanie markdown w czacie |
| **Upload plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Konkatenacja segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Trwałość** | Pliki JSON | Przechowywanie bez zależności |

---

## Referencja modeli

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Fiszka, Flashcards, Podcast, Quiz, Teksty z lukami, Chat, Weryfikacja quizu głosowego, Agent Image, Agent Web Search, Wykrywanie polecenia | Najlepszy multilingual + przestrzeganie instrukcji |
| `mistral-ocr-4-0` (OCR 4, domyślny) | OCR dokumentów — wyższa jakość | Tekst drukowany, tabele, pismo odręczne ($4 / 1000 stron) |
| `mistral-ocr-2512` (OCR 3, opcja) | OCR dokumentów | Wybieralny w Ustawieniach, tańszy ($2 / 1000 stron) |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | STT wielojęzyczne, zoptymalizowane z `language="fr"` |
| `voxtral-mini-tts-latest` | Synteza mowy (TTS) | Podcasty, quiz głosowy, czytanie na głos |
| `mistral-moderation-2603` | Moderacja treści | 5 kategorii zablokowanych dla dziecka/nastolatka (w tym `jailbreaking`) |
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

> **Uwaga** : Mistral Voxtral TTS jest jedynym providerem TTS — nie jest potrzebny żaden dodatkowy klucz poza `MISTRAL_API_KEY`.

> **Klucz API wprowadzany przez użytkownika** : `MISTRAL_API_KEY` jest teraz **opcjonalny**. Jeśli go brakuje, aplikacja i tak się uruchamia i prosi każdego użytkownika o wprowadzenie **własnego klucza Mistral** w interfejsie. Klucz jest **przechowywany w przeglądarce** (szyfrowany przez Web Crypto + IndexedDB w bezpiecznym kontekście) i wysyłany w każdym żądaniu — **nigdy nie jest utrwalany na serwerze**. Precedencja : klucz profilu > klucz globalny przeglądarki > `MISTRAL_API_KEY` (env). Ustawienie `EUREKAI_REQUIRE_USER_KEY=true` wymusza, aby każdy użytkownik podał swój klucz (klucz env służy już tylko do preloadów).

> **HTTPS lokalny (tablet/LAN)** : `localhost` jest już bezpiecznym kontekstem. Do dostępu LAN (tablet) wygeneruj lokalny certyfikat i włącz HTTPS, aby odblokować szyfrowanie w przeglądarce oraz szyfrować klucz w transicie :
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Zmienne środowiskowe

| Zmienna | Wymagane | Domyślnie | Rola |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcjonalne | — | Klucz API Mistral (chat, OCR, STT, TTS Voxtral, agents, moderacja). Jeśli nieobecny, użytkownik wprowadza swój klucz w aplikacji (przechowywany w przeglądarce, nigdy na serwerze) |
| `EUREKAI_REQUIRE_USER_KEY` | opcjonalne | `false` | `true` → wyłącza fallback na `MISTRAL_API_KEY` dla zapytań IA (każdy użytkownik MUSI podać swój klucz). Przydatne na wystawionej instancji |
| `HTTPS_KEY` / `HTTPS_CERT` | opcjonalne | — | Ścieżki klucz/cert TLS (zob. `scripts/gen-cert.sh`) → Express i Vite serwują przez HTTPS (secure context LAN/tablet) |
| `PORT` | opcjonalne | `3000` | Port HTTP backendu Express |
| `NODE_ENV` | opcjonalne | `development` | Jeśli `production` → Express serwuje frontend z `dist/` (w przeciwnym razie `public/`) |
| `SONAR_TOKEN` | opcjonalne CI | — | Używane wyłącznie przez workflow GitHub Actions SonarCloud |

### Testy, jakość kodu i wkład

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooki Git (Husky)** : `pre-commit` uruchamia łańcuchowo `scripts/pre-commit-fast.sh` (konflikty, duże pliki, shellcheck), `lint-staged` następnie `npm test` ; `pre-push` wykonuje najpierw gate `npm audit` (blokuje przy krytycznej podatności przechodniej, zob. `scripts/audit-verdict.mjs`), a potem `npm run security`. Wszystkie blokują commit/push w przypadku niepowodzenia.

**Wymagane narzędzia zewnętrzne (opcjonalne, ale używane przez `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Bez tych narzędzi `npm test` kończy się niepowodzeniem przy `pretest` (brak lizard) oraz `npm run security` kończy się niepowodzeniem (brak opengrep). Hooki husky blokują wtedy commit/push.

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

> **`:U`** to flaga Podman rootless, która automatycznie dostosowuje uprawnienia wolumenu.

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
  moderation-model.ts     — Modèle de modération épinglé + ses 11 catégories + migration des catégories legacy
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours)
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

> **Dla współtwórców IA** : zobacz [`CLAUDE.md`](CLAUDE.md), aby uzyskać szczegółowy kontekst architektury, obowiązkowe reguły (anti-leak prompts, kody błędów, cost tracking) oraz znane pułapki (Lizard CCN, Opengrep, migracja Codacy/Semgrep).

---

## Referencja API

### Config
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Zmiana konfiguracji (modele, głosy, model TTS) |
| `GET` | `/api/config/status` | Status API : `mistral` (klucz Mistral zdefiniowany), `ttsAvailable` (alias `mistral`, Mistral Voxtral jest jedynym providerem TTS) |
| `POST` | `/api/config/reset` | Reset konfiguracji do domyślnej |
| `GET` | `/api/config/voices` | Lista głosów Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Dostępne kategorie moderacji + domyślne według wieku |
| `POST` | `/api/providers/mistral/validate` | Walidacja klucza Mistral wprowadzonego przez użytkownika — zawsze 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), bez fallbacku env |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Lista wszystkich profili |
| `POST` | `/api/profiles` | Utworzenie profilu |
| `PUT` | `/api/profiles/:id` | Modyfikacja profilu (PIN wymagany dla < 15 lat) |
| `DELETE` | `/api/profiles/:id` | Usunięcie profilu + kaskada projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Lista projektów (`?profileId=` opcjonalne) |
| `POST` | `/api/projects` | Utworzenie projektu `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu |
| `PUT` | `/api/projects/:pid` | Zmiana nazwy `{name}` |
| `DELETE` | `/api/projects/:pid` | Usunięcie projektu |
| `GET` | `/api/projects/:pid/events` | Strumień SSE w czasie rzeczywistym (`event: generation`) przejść generacji (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośredni odczyt dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Wolny tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL lub wyszukiwanie w sieci `{query}` — zwraca tablicę źródeł |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usunięcie źródła |
| `POST` | `/api/projects/:pid/moderate` | Moderacja `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykrywanie poleceń powtórki |

### Generacja
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fiszka powtórkowa |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/dictation` | Dyktando (słowa + zdania-przykłady + reguły, 1 audio TTS na słowo ; także proponowane przez auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptacyjna powtórka `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Fiszka przypominająca ukierunkowana na błędne odpowiedzi quizu `{generationId, weakQuestions}` — wywoływana równolegle z `quiz-review` przez przycisk « Ćwiczę na swoich błędach » |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) — zwraca `{plan, costDelta}` (koszt samego routingu) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczna generacja backend (routing + 8 typów : summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Wykonanie równoległe — zakłada tier Mistral z rate-limit ≥ 8 równoczesnych żądań ; w przeciwnym razie kilka 429 może pojawić się w `failedSteps`. |

Wszystkie trasy generacji akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` i `remediation-summary` wymagają dodatkowo `{generationId, weakQuestions}`.

### CRUD Generacje
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Przesłanie odpowiedzi quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Przesłanie odpowiedzi tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Przesłanie odpowiedzi dyktanda `{answers}` (ścisły wynik serwerowy) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Weryfikacja odpowiedzi ustnej (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odczyt TTS na głos (fiszki/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anulowanie trwającej generacji (jedyna ścieżka anulowania pending) |
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
| **Alpine.js zamiast React/Vue** | Minimalny footprint, lekka reaktywność z TypeScript kompilowanym przez Vite. Idealne na hackathon, gdzie liczy się szybkość. |
| **Trwałość w plikach JSON** | Zero zależności, natychmiastowy start. Żadnej bazy danych do konfiguracji — uruchamiasz i działa. |
| **Vite + Handlebars** | Najlepsze z obu światów : szybki HMR do developmentu, partials HTML do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty IA w `prompts.ts` — łatwe do iteracji, testowania i dostosowania według języka/grupy wiekowej. |
| **System multi-generacji** | Każda generacja to niezależny obiekt z własnym ID — umożliwia wiele fiszek, quizów itd. na kurs. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, złożonością i tonem — ta sama treść uczy inaczej w zależności od ucznia. |
| **Funkcje oparte na Agents** | Generacja obrazów i wyszukiwanie w sieci używają tymczasowych Agentów Mistral — czysty cykl życia z automatycznym czyszczeniem. |
| **Inteligentny scraping URL** | Jedno pole akceptuje wymieszane URL-e i słowa kluczowe — URL-e są scrapowane przez Readability (strony statyczne) z fallbackiem Lightpanda (strony JS/SPA), słowa kluczowe uruchamiają Agenta Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (bez dodatkowego klucza poza `MISTRAL_API_KEY`) — synteza mowy zintegrowana z łańcuchem kosztów i resolucją głosu według języka. |

---

## Podziękowania

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lekki framework reaktywny
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie build frontendu
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Ekstrakcja treści web (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralekka przeglądarka headless do scrapingu stron JS/SPA
- **[Luciole](https://luciole-vision.com)** — Czcionka zaprojektowana dla osób słabowidzących, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opcja « Komfort czytania » profili)

Rozpoczęte podczas Mistral AI Worldwide Hackathon (marzec 2026), w całości rozwinięte przez IA z [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artykuł przetłumaczony z fr na pl za pomocą grok-4.5.**
