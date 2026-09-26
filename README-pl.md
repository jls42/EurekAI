<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywne doświadczenie edukacyjne — napędzane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo na YouTube"></a>
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

**EurekAI** powstał podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł zrodził się z bardzo konkretnej potrzeby: regularnie powtarzam materiał do sprawdzianów z moją córką i pomyślałem, że dzięki sztucznej inteligencji można uczynić to bardziej angażującym i interaktywnym.

Cel: wziąć **dowolne materiały wyjściowe** — zdjęcie lekcji, wklejony tekst, nagranie głosowe, wyszukiwanie w sieci — i przekształcić je w **notatki powtórkowe, fiszki, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Wszystko napędzane francuskimi modelami Mistral AI, co czyni to rozwiązanie naturalnie dostosowanym do uczniów francuskojęzycznych.

[Pierwotny prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) powstał w 48 godzin podczas hackathonu jako proof-of-concept oparty na usługach Mistral — był już funkcjonalny, ale ograniczony. Od tego czasu EurekAI stał się pełnoprawnym projektem: teksty z lukami, nawigacja po ćwiczeniach, web scraping, konfigurowalna kontrola rodzicielska, szczegółowy przegląd kodu i wiele więcej. Całość kodu została wygenerowana przez AI — głównie przez [Claude Code](https://code.claude.com/), z pewnym wkładem ze strony [Codex](https://openai.com/codex/) oraz [Gemini CLI](https://geminicli.com/).

---

## Przegląd

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Prezentacja EurekAI: źródła, notatki, quiz, fiszki, ilustracje" width="820" />
</p>

| | |
|---|---|
| ![Panel główny](docs/screenshots/dashboard.webp)<br>**Panel główny** — ostatnie generacje, szacowany koszt na kartę i łączny koszt projektu, przycisk „Auto — Magia!” | ![Źródła](docs/screenshots/sources.webp)<br>**Źródła** — import zdjęć/PDF/tekstu/głosu/sieci, generowanie jednym kliknięciem, wykrywanie poleceń |

Każde zaimportowane źródło wyświetla swój [wskaźnik pewności OCR, status moderacji i szacowany koszt](docs/screenshots/sources-list.webp).

### Komponenty w akcji

| | |
|---|---|
| ![Notatka powtórkowa](docs/screenshots/notes.gif)<br>**Notatka powtórkowa** — kluczowe punkty, słownictwo, cytaty ze źródłami, odtwarzanie audio według sekcji | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz testowy** — natychmiastowa informacja zwrotna z wyjaśnieniem, nawigacja krok po kroku |
| ![Fiszki](docs/screenshots/flashcards.gif)<br>**Fiszki** — odwracanie karty i samoocena „wiedziałem / nie wiedziałem” | ![Teksty z lukami](docs/screenshots/fillblank.gif)<br>**Teksty z lukami** — podpowiedź na żądanie, tolerancyjna walidacja |
| ![Dyktando](docs/screenshots/dictation.gif)<br>**Dyktando** — słowo dyktowane głosowo, ścisła korekta litera po literze | ![Quiz głosowy](docs/screenshots/vocal-quiz.gif)<br>**Quiz głosowy** — pytanie odczytywane na głos, odpowiedź do mikrofonu |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast na 2 głosy, dostępny skrypt dialogu | ![Ilustracje](docs/screenshots/illustrations.gif)<br>**Ilustracje** — obrazy edukacyjne generowane przez Agenta |
| ![Tutor AI](docs/screenshots/chat.gif)<br>**Tutor AI** — czat oparty na materiałach z kursu, wyjaśniane odpowiedzi, możliwość generowania quizów i fiszek | |

### Pierwsze kroki

| | |
|---|---|
| ![Wybór profilu](docs/screenshots/login.gif)<br>**Wybór profilu** — każde dziecko ma własną przestrzeń, awatar i język | ![Tworzenie profilu](docs/screenshots/profile-create.gif)<br>**Tworzenie profilu** — wiek, awatar, PIN rodzicielski dla dzieci poniżej 15. roku życia |
| ![Tworzenie kursu](docs/screenshots/course.gif)<br>**Tworzenie kursu** — jeden projekt na lekcję, gotowy na przyjęcie źródeł | ![Ustawienia](docs/screenshots/settings.gif)<br>**Ustawienia** — status API, wybór modeli AI z wyświetlanymi stawkami |

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcia, pliki PDF (przez Mistral OCR z uśrednionym wskaźnikiem pewności, poziomy `high`/`medium`/`low`) lub pliki tekstowe (TXT, MD). Sesje przesyłania z ponawianiem per plik i indywidualnym paskiem postępu |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wprowadzanie głosowe** | Nagraj się — Voxtral STT przetranskrybuje Twój głos |
| 🌐 | **Sieć / URL** | Wklej adres URL (bezpośredni scraping przez Readability + Lightpanda) lub wpisz zapytanie (Agent Mistral web_search) |
| 📄 | **Notatki powtórkowe** | Ustrukturyzowane notatki z kluczowymi punktami, słownictwem, cytatami i ciekawostkami |
| 🃏 | **Fiszki** | Interaktywne karty P/O, odtwarzanie audio w formie dialogu |
| ❓ | **Quiz testowy** | Pytania wielokrotnego wyboru z adaptacyjną powtórką błędnych odpowiedzi (konfigurowalna liczba) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełniania z podpowiedziami i tolerancyjną walidacją |
| 🔤 | **Dyktando** | Słowa dyktowane głosowo (Voxtral TTS) z zaimportowanej listy, wprowadzanie z klawiatury, ścisła korekta litera po literze z wyjaśnieniem reguły ortograficznej |
| 🎙️ | **Podcast** | Mini-podcast na 2 głosy w formacie audio — domyślne głosy Mistral lub głosy spersonalizowane (rodziców!) |
| 🖼️ | **Ilustracje** | Obrazy edukacyjne generowane przez Agenta Mistral |
| 🗣️ | **Quiz głosowy** | Pytania odczytywane na głos (możliwość własnego głosu), odpowiedź ustna, weryfikacja przez AI |
| 💬 | **Tutor AI** | Kontekstowy czat z materiałami z Twojego kursu, z wywoływaniem narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 8 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Konfigurowalna moderacja na poziomie profilu (dostosowywane kategorie), PIN rodzicielski, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach za pomocą promptów |
| 🔊 | **Czytanie na głos** | Odsłuchuj notatki i fiszki (dialog pytanie/odpowiedź) za pomocą Mistral Voxtral TTS |
| 💶 | **Śledzenie kosztów API** | Przejrzyste szacowanie kosztów w € dla każdej generacji i źródła (tokeny / znaki / strony / sekundy audio). Odznaka przy każdej karcie + suma dla projektu, widoczna w panelu głównym |
| 🎨 | **Motyw dla profilu** | Każdy profil wybiera swój motyw: `dark` lub `light` — zachowywany przy zmianie profilu |

---

## Przegląd architektury

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Mapa wykorzystania modeli

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Ścieżka użytkownika

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Szczegółowe omówienie — Funkcje

### Wprowadzanie multimodalne

EurekAI obsługuje 4 typy źródeł, moderowane w zależności od profilu (domyślnie włączone dla dziecka i nastolatka):

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez Mistral OCR — **domyślnie OCR 4 (`mistral-ocr-4-0`)** (najwyższa jakość), **opcjonalnie OCR 3 (`mistral-ocr-2512`)** w Ustawieniach (tańszy, ~½ kosztu) — dla tekstu drukowanego, tabel i pisma odręcznego; lub pliki tekstowe (TXT, MD) importowane bezpośrednio. Przesyłanie wielu plików korzysta z systemu **sesji przesyłania**: indywidualny pasek postępu dla każdego pliku, ponawianie tylko nieudanego pliku bez konieczności ponownego wysyłania pozostałych, zamykanie sesji po jej zakończeniu. OCR udostępnia uśredniony **wskaźnik pewności** (`average`, ograniczony do zakresu `[0,1]`, obliczany na podstawie `averagePageConfidenceScore` zwracanych przez Mistral), wyświetlany w interfejsie jako odznaka poziomu `high` / `medium` / `low` (progi ~0.9 / ~0.7) — ostrzega bez blokowania, jeśli skan jest słabej jakości. Kopia dokumentu wysłana do Mistral w celu wykonania OCR jest usuwana zaraz po zakończeniu przetwarzania, nawet w przypadku błędu.
- **Dowolny tekst** — Wpisz lub wklej dowolną treść. Moderowana przed zapisaniem, jeśli moderacja jest aktywna.
- **Wprowadzanie głosowe** — Nagraj dźwięk w przeglądarce. Transkrypcja przez `voxtral-mini-latest`. Parametr `language="fr"` optymalizuje rozpoznawanie mowy.
- **Sieć / URL** — Wklej jeden lub więcej adresów URL, aby bezpośrednio pobrać treść (Readability + Lightpanda dla stron z JS), lub wpisz słowa kluczowe, aby przeszukać sieć za pomocą Agenta Mistral. Jedno pole obsługuje oba przypadki — adresy URL i słowa kluczowe są rozdzielane automatycznie, a każdy wynik tworzy niezależne źródło.

### Generowanie treści przez AI

Osiem typów generowanych materiałów edukacyjnych:

| Generator | Model | Wynik |
|---|---|---|
| **Notatka powtórkowa** | `mistral-large-latest` | Tytuł, podsumowanie, kluczowe punkty, słownictwo, cytaty, ciekawostka |
| **Fiszki** | `mistral-large-latest` | Karty P/O z odniesieniami do źródeł (konfigurowalna liczba) |
| **Quiz testowy** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjna powtórka (konfigurowalna liczba) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Dyktando** | `mistral-large-latest` + Voxtral TTS | Słowa kluczowe dyktowane głosowo (1 plik MP3 na słowo) → wprowadzanie z klawiatury → ścisła korekta (znaki diakrytyczne) z wyjaśnioną regułą |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt na 2 głosy → audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny wygenerowany za pomocą narzędzia `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja przez AI |

### Tutor AI na czacie

Konwersacyjny tutor z pełnym dostępem do materiałów z kursu:

- Wykorzystuje `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować notatki, fiszki, quizy lub teksty z lukami w trakcie rozmowy
- Historia 50 wiadomości na kurs
- Moderacja, jeśli włączona dla profilu: wiadomość jest weryfikowana, a źródła zgłoszone, z błędami lub jeszcze niezweryfikowane są wykluczane z kontekstu oraz narzędzi (ich weryfikacja jest najpierw ponawiana, maksymalnie do 5 s)

### Automatyczny router

Router wykorzystuje `mistral-small-latest` do analizy zawartości źródeł i sugerowania najbardziej odpowiednich generatorów spośród 8 dostępnych. Interfejs wyświetla postęp w czasie rzeczywistym: najpierw faza analizy, a następnie poszczególne generacje z możliwością anulowania.

### Uczenie adaptacyjne

- **Statystyki quizów**: śledzenie liczby podejść i dokładności dla każdego pytania
- **Powtórka quizu**: generuje 5–10 nowych pytań ukierunkowanych na słabiej opanowane zagadnienia, na podstawie źródeł oryginalnego quizu (blokada moderacyjna obejmuje te same źródła)
- **Wykrywanie poleceń**: wykrywa instrukcje do powtórki („Umiem lekcję, jeśli potrafię...”) i nadaje im priorytet w kompatybilnych generatorach tekstowych (notatki, fiszki, quiz, teksty z lukami). Przy aktywnej moderacji wykrywanie czeka na weryfikację źródeł i odczytuje tylko te uznane za bezpieczne; polecenie zachowuje listę swoich źródeł pochodzenia, nie jest wyświetlane ani stosowane, jeśli którekolwiek z nich zostanie oznaczone jako nieodpowiednie, i znika wraz z nim. Jego koszt jest wliczany

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11–15), student (16–25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-2603` (Mistral Moderation 2) z 11 dostępnymi kategoriami, 6 zablokowanymi domyślnie dla nowych profili dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` dodana po pomiarach na 50 lekcjach, w tym z historii, bez żadnych fałszywych trafień). Kategorie konfigurowalne dla każdego profilu w ustawieniach; Moderation 2 rozdzieliło dawną kategorię „niebezpieczne treści” na `dangerous` + `criminal` (istniejące profile są migrowane automatycznie, a zablokowane kategorie mają zastosowanie również do wcześniej zaimportowanych źródeł). Domyślne bezpieczeństwo: jeśli odpowiedź modelu nie pozwala na zweryfikowanie zablokowanej kategorii, treść zostaje odrzucona („Moderacja niedostępna”); przy aktywnej moderacji zarówno generowanie, jak i czat odrzucają źródła zgłoszone, z błędami lub w trakcie weryfikacji. Źródło nigdy nieweryfikowane (zaimportowane przy wyłączonej moderacji, podpięty stary projekt) jest weryfikowane przed użyciem; moderacja przerwana przez restart lub zakończona błędem jest wznawiana automatycznie (przy starcie, jeśli pozwala na to klucz serwera, w przeciwnym razie przy otwarciu projektu lub kolejnej generacji), a przycisk „Zweryfikuj ponownie” umożliwia jej ponowne uruchomienie na żądanie. Treść źródła zgłoszonego lub będącego w trakcie weryfikacji jest ukryta przed dzieckiem (podgląd, tekst, oryginalny dokument); rodzic może ją wyświetlić za pomocą swojego kodu PIN na czas wglądu. Ustna odpowiedź w quizie głosowym jest moderowana przed weryfikacją. Wersjonowany identyfikator przypięty w `helpers/moderation-model.ts`: przestarzały alias `-latest` nie jest już zwracany przez API.
- **PIN rodzicielski**: hash SHA-256, wymagany dla profili poniżej 15. roku życia; maksymalnie 10 błędnych prób na kwadrans na adres IP (429 `rate_limited`). Na potrzeby wdrożenia produkcyjnego należy przewidzieć wolny hash z solą (Argon2id, bcrypt).
- **Dane serwera**: `/output` udostępnia wyłącznie multimedia projektów (audio, obrazy, zaimportowane pliki); `profiles.json`, `config.json` oraz pliki projektów nigdy nie są serwowane
- **Ograniczenia czatu**: czat AI jest domyślnie wyłączony dla osób poniżej 16. roku życia, z możliwością włączenia przez rodziców

### System wielu profili

- Wiele profili z imieniem, wiekiem, awatarem i preferencjami językowymi
- **Głosy dla profilu** (`Profile.mistralVoices?: { host?, guest? }` — każda rola jest opcjonalna) — każde dziecko może mieć własną parę głosów do podcastu/quizu głosowego
- **Motyw dla profilu** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie przy zmianie profilu, zapisywane po stronie backendu
- Projekty powiązane z profilami przez `profileId`; stary projekt bez przypisanego profilu zostaje dołączony do pierwszego profilu, który go otworzy, a następnie moderowany zgodnie z tym profilem
- Kaskadowe usuwanie: usunięcie profilu usuwa wszystkie powiązane z nim projekty

### Śledzenie kosztów API

Każde płatne wywołanie Mistral (czat, OCR, STT, TTS, agenci), w tym wykrywanie poleceń oraz odpowiedzi ustne w quizie głosowym, jest instrumentowane w celu zapewnienia użytkownikowi **przejrzystego** szacunku w €. Moderacja, jako bezpłatna, nie jest wliczana. Opłaty za narzędzia agentów są uwzględnione: 0,03 $ za wyszukiwanie w sieci i 0,10 $ za wygenerowany obraz (cennik Mistral), plus tokeny wygenerowane przez te narzędzia, liczone według stawki wejściowej modelu agenta.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → input 0.5 €/M tokenów, output 1.5 €/M tokenów), `PRICING_SOURCES` z adresami URL dokumentacji Mistral do okresowego ponownego scrapowania
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (wrap klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzyknięcie do odpowiedzi HTTP)
- **UI**: plakietka kosztu na generację (`src/partials/cost-badge-gen.html`), na źródło (`cost-badge-src.html`), łączna suma w panelu (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` oraz `/sources/*` dekorują zwracany obiekt (Generation / Source) polami `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/route` dodaje pole `costDelta: number` dla samego kosztu routingu; `POST /detect-consigne` (`{consigne, costDelta}`) i weryfikacja odpowiedzi ustnej zwracają również swój `costDelta`. `GET /projects/:pid` zwraca projekt wzbogacony o `totalCost` (suma obliczona z `costLog[]`) + pełną historię

### TTS (Mistral Voxtral) i spersonalizowane głosy

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, synteza mowy w 100% od Mistral, bez konieczności posiadania dodatkowego klucza
- **Spersonalizowane głosy**: rodzice mogą tworzyć własne głosy za pośrednictwem API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról gospodarza/gościa — podcasty i quizy głosowe są wtedy odczytywane głosem rodzica, co czyni doświadczenie jeszcze bardziej immersyjnym dla dziecka
- Dwie konfigurowalne role głosowe: **gospodarz** (główny narrator) i **gość** (drugi głos w podcaście)
- Pełny katalog głosów Mistral dostępny w ustawieniach, z możliwością filtrowania według języka

### Internacjonalizacja

- Interfejs dostępny w 9 językach: fr, en, es, pt, it, nl, de, hi, ar
- Prompty AI obsługują 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Język konfigurowalny na poziomie profilu

---

## Stack technologiczny

| Warstwa | Technologia | Rola |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Serwer i bezpieczeństwo typów |
| **Backend** | Express 5.x | REST API |
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, partiale Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktywny interfejs, TypeScript kompilowany przez Vite |
| **Szablonowanie** | vite-plugin-handlebars | Kompozycja HTML za pomocą partiali |
| **AI** | Mistral AI SDK 2.x | Czat, OCR, STT, TTS, agenci, moderacja |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, zintegrowana synteza mowy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Web scraping** | Readability + linkedom | Ekstrakcja głównej zawartości stron internetowych (technologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralekka przeglądarka headless (Zig + V8) dla stron JS/SPA — awaryjny fallback do scrapingu |
| **Markdown** | Marked | Renderowanie Markdownu na czacie |
| **Przesyłanie plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Konkatenacja segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Trwałość danych** | Pliki JSON | Przechowywanie danych bez dodatkowych zależności |

---

## Zestawienie modeli

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Notatka powtórkowa, fiszki, podcast, quiz, teksty z lukami, czat, weryfikacja quizu głosowego, agent obrazów, agent wyszukiwania w sieci, wykrywanie poleceń | Najlepsza wielojęzyczność + precyzyjne podążanie za instrukcjami |
| `mistral-ocr-4-0` (OCR 4, domyślny) | OCR dokumentów — najwyższa jakość | Tekst drukowany, tabele, pismo odręczne ($4 / 1000 stron) |
| `mistral-ocr-2512` (OCR 3, opcja) | OCR dokumentów | Do wyboru w Ustawieniach, tańszy ($2 / 1000 stron) |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | Wielojęzyczny STT, zoptymalizowany pod kątem `language="fr"` |
| `voxtral-mini-tts-latest` | Synteza mowy (TTS) | Podcasty, quiz głosowy, czytanie na głos |
| `mistral-moderation-2603` | Moderacja treści | 6 kategorii zablokowanych dla dzieci/młodzieży (w tym `jailbreaking`) |
| `mistral-small-latest` | Automatyczny router | Szybka analiza zawartości do podejmowania decyzji o routingu |

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

> **Uwaga**: Mistral Voxtral TTS jest jedynym dostawcą TTS — poza `MISTRAL_API_KEY` nie jest wymagany żaden dodatkowy klucz.

> **Klucz API wprowadzany przez użytkownika**: `MISTRAL_API_KEY` jest obecnie **opcjonalny**. Jeśli go brakuje, aplikacja i tak się uruchamia i prosi każdego użytkownika o wprowadzenie **własnego klucza Mistral** w interfejsie. Klucz jest **przechowywany w przeglądarce** (szyfrowany za pomocą Web Crypto + IndexedDB w bezpiecznym kontekście) i przesyłany z każdym żądaniem — **nigdy nie jest utrwalany na serwerze**. Priorytet: klucz profilu > globalny klucz przeglądarki > `MISTRAL_API_KEY` (zmienna środowiskowa). Ustawienie `EUREKAI_REQUIRE_USER_KEY=true` wymusza na każdym użytkowniku podanie własnego klucza (klucz ze zmiennych środowiskowych służy wtedy wyłącznie do wstępnego ładowania).

> **Lokalny HTTPS (tablet/LAN)**: `localhost` jest już bezpiecznym kontekstem. W przypadku dostępu z sieci LAN (tablet) wygeneruj lokalny certyfikat i aktywuj HTTPS, aby odblokować szyfrowanie w przeglądarce + szyfrować klucz w tranzycie:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert jeśli dostępny, w przeciwnym razie samopodpisany certyfikat openssl
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite w trybie HTTPS
> ```

### Zmienne środowiskowe

| Zmienna | Wymagana | Domyślnie | Rola |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcjonalna | — | Klucz API Mistral (czat, OCR, STT, TTS Voxtral, agenci, moderacja). W przypadku braku użytkownik wprowadza swój klucz w aplikacji (przechowywany w przeglądarce, nigdy na serwerze) |
| `EUREKAI_REQUIRE_USER_KEY` | opcjonalna | `false` | `true` → wyłącza fallback na `MISTRAL_API_KEY` dla zapytań AI (każdy użytkownik MUSI podać swój klucz). Przydatne na publicznie wystawionej instancji |
| `HTTPS_KEY` / `HTTPS_CERT` | opcjonalna | — | Ścieżki klucza/certyfikatu TLS (por. `scripts/gen-cert.sh`) → Express i Vite serwują po HTTPS (bezpieczny kontekst LAN/tablet) |
| `PORT` | opcjonalna | `3000` | Port HTTP backendu Express |
| `NODE_ENV` | opcjonalna | `development` | Jeśli `production` → Express serwuje frontend z `dist/` (w przeciwnym razie z `public/`) |
| `SONAR_TOKEN` | opcjonalna (CI) | — | Używana wyłącznie przez workflow GitHub Actions SonarCloud |

### Testy, jakość kodu i kontrybucja

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooki Gita (Husky)**: `pre-commit` uruchamia kolejno `scripts/pre-commit-fast.sh` (konflikty, duże pliki, shellcheck), `lint-staged`, a następnie `npm test`; `pre-push` wykonuje najpierw bramkę `npm audit` (blokuje przy krytycznych podatnościach przechodnich, por. `scripts/audit-verdict.mjs`), a potem `npm run security`. Wszystkie blokują commit/push w przypadku niepowodzenia.

**Wymagane narzędzia zewnętrzne (opcjonalne, ale używane przez `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Bez tych narzędzi `npm test` kończy się błędem na etapie `pretest` (brak lizarda), a `npm run security` zawodzi (brak opengrepa). Hooki Husky blokują wtedy commit/push.

---

## Wdrażanie z użyciem kontenerów

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

> **`:U`** to flaga rootless Podmana, która automatycznie dostosowuje uprawnienia wolumenu.

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

> **Dla kontrybutorów AI**: zobacz [`CLAUDE.md`](CLAUDE.md), aby poznać szczegółowy kontekst architektoniczny, obowiązkowe reguły (ochrona promptów przed wyciekiem, kody błędów, śledzenie kosztów) oraz znane pułapki (Lizard CCN, Opengrep, migracja Codacy/Semgrep).

---

## Dokumentacja API

### Konfiguracja
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Modyfikacja konfiguracji (modele, głosy, model TTS) |
| `GET` | `/api/config/status` | Status interfejsów API: `mistral` (zdefiniowany klucz Mistral), `ttsAvailable` (alias dla `mistral`, Mistral Voxtral jest jedynym dostawcą TTS) |
| `POST` | `/api/config/reset` | Przywrócenie domyślnej konfiguracji |
| `GET` | `/api/config/voices` | Lista głosów Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Dostępne kategorie moderacji + ustawienia domyślne według wieku |
| `POST` | `/api/providers/mistral/validate` | Walidacja klucza Mistral wprowadzonego przez użytkownika — zawsze 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), brak fallbacku na zmienne środowiskowe |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Lista wszystkich profili |
| `POST` | `/api/profiles` | Tworzenie profilu |
| `PUT` | `/api/profiles/:id` | Modyfikacja profilu (PIN wymagany dla osób poniżej 15. roku życia; 10 błędnych kodów PIN / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Usunięcie profilu + kaskadowe usuwanie projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Lista projektów (opcjonalny `?profileId=`) |
| `POST` | `/api/projects` | Tworzenie projektu `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu; `?profileId=` przypisuje projekt bez profilu do profilu, który go otwiera |
| `PUT` | `/api/projects/:pid` | Zmiana nazwy `{name}` |
| `DELETE` | `/api/projects/:pid` | Usunięcie projektu |
| `GET` | `/api/projects/:pid/events` | Strumień SSE w czasie rzeczywistym (`event: generation`) przejść generowania (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośredni odczyt dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Dowolny tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping adresu URL lub wyszukiwanie w sieci `{query}` — zwraca tablicę źródeł; 422 `url_blocked`, jeśli wszystkie adresy zostały odrzucone (sieć wewnętrzna), 502 `all_sources_failed`, jeśli nie udało się utworzyć żadnego źródła |
| `POST` | `/api/projects/:pid/sources/moderate` | Wznowienie oczekujących lub zakończonych błędem moderacji `{sourceIds?}` (maksymalnie 10 na wywołanie, oczekiwanie ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usunięcie źródła, jego zaimportowanego pliku oraz zależnego od niego polecenia → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderowanie `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykrywanie poleceń do powtórki (tylko zweryfikowane źródła) → `{consigne, costDelta}` |

### Generowanie
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Notatka powtórkowa |
| `POST` | `/api/projects/:pid/generate/flashcards` | Fiszki |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz testowy |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/dictation` | Dyktando (słowa + przykładowe zdania + reguły, 1 nagranie audio TTS na słowo; proponowane również przez auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Powtórka adaptacyjna `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Karta powtórkowa ukierunkowana na błędne pytania z quizu `{generationId, weakQuestions}` — wywoływana równolegle z `quiz-review` za pomocą przycisku „Przećwicz moje błędy” |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) — zwraca `{plan, costDelta}` (koszt samego routingu) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczne generowanie w backendzie (routing + 8 typów: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Wykonywanie równoległe — wymaga poziomu (tier) Mistral z limitem zapytań (rate-limit) ≥ 8 jednoczesnych żądań; w przeciwnym razie w `failedSteps` może pojawić się kilka błędów 429. |

Wszystkie trasy generowania akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; parametr `lang`, który nie jest kodem języka (np. `pt-BR`) lub nieznany `ageGroup` → 400 `invalid_input`, jeszcze przed jakimkolwiek wywołaniem AI. `quiz-review` oraz `remediation-summary` wymagają dodatkowo `{generationId, weakQuestions}` i odnoszą się do źródeł z oryginalnego quizu.

### CRUD generacji
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Przesłanie odpowiedzi do quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Przesłanie odpowiedzi do tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Przesłanie odpowiedzi do dyktanda `{answers}` (ścisła punktacja po stronie serwera) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Weryfikacja odpowiedzi ustnej (audio + questionIndex); odpowiedź moderowana (400 `quiz.answerBlocked`), koszt zwrócony w `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odczyt TTS na głos (notatki/fiszki) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anulowanie trwającego generowania (jedyna ścieżka anulowania stanu pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmiana nazwy `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usunięcie generacji i powiązanych z nią multimediów (audio, obraz) |

### Czat
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Pobranie historii czatu |
| `POST` | `/api/projects/:pid/chat` | Wysłanie wiadomości `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Wyczyszczenie historii czatu |

---

## Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| **Alpine.js zamiast React/Vue** | Minimalny narzut, lekka reaktywność z TypeScriptem kompilowanym przez Vite. Idealne na hackathon, gdzie liczy się szybkość. |
| **Trwałość danych w plikach JSON** | Zero zależności, natychmiastowy start. Brak konieczności konfigurowania bazy danych — po prostu uruchamiasz i działa. |
| **Vite + Handlebars** | To, co najlepsze z obu światów: szybki HMR podczas developmentu, partiale HTML do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty AI w `prompts.ts` — łatwe iterowanie, testowanie i dostosowywanie według języka/grupy wiekowej. |
| **System wielu generacji** | Każda generacja to niezależny obiekt z własnym ID — pozwala na tworzenie wielu notatek, quizów itp. dla danej lekcji. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe o różnym słownictwie, złożoności i tonie — ta sama treść uczy inaczej w zależności od odbiorcy. |
| **Funkcjonalności oparte na agentach** | Generowanie obrazów i wyszukiwanie w sieci korzystają z tymczasowych agentów Mistral — przejrzysty cykl życia z automatycznym czyszczeniem. |
| **Inteligentny scraping adresów URL** | Jedno pole przyjmuje zarówno adresy URL, jak i słowa kluczowe — adresy URL są scrapowane za pomocą Readability (strony statyczne) z fallbackiem do Lightpanda (strony JS/SPA), a słowa kluczowe uruchamiają agenta Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **TTS w 100% od Mistral** | Mistral Voxtral TTS (brak dodatkowego klucza poza `MISTRAL_API_KEY`) — synteza mowy zintegrowana z łańcuchem kosztów i doborem głosu według języka. |

---

## Twórcy i podziękowania

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lekki reaktywny framework
- **[TailwindCSS](https://tailwindcss.com)** — Narzędziowy framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie do budowania frontendu
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Ekstrakcja treści internetowych (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralekka przeglądarka headless do scrapingu stron JS/SPA
- **[Luciole](https://luciole-vision.com)** — Czcionka zaprojektowana dla osób słabowidzących, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opcja „Komfort czytania” w profilach)

Zainicjowany podczas Mistral AI Worldwide Hackathon (marzec 2026), w całości opracowany przez AI za pomocą [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artykuł przetłumaczony z fr na pl za pomocą gemini-3.8-flash-medium.**
