<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywne doświadczenie edukacyjne — oparte na <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Brama jakości"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Ocena bezpieczeństwa"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Ocena niezawodności"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Ocena łatwości utrzymania"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Pokrycie"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Podatności"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Problemy z jakością kodu"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Liczba wierszy kodu"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Odznaka Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Historia — Dlaczego EurekAI?

**EurekAI** narodziło się podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł zrodził się z czegoś bardzo konkretnego: regularnie przygotowuję się z córką do sprawdzianów i pomyślałem, że dzięki AI można uczynić to przyjemniejszym i bardziej interaktywnym.

Cel: wykorzystać **dowolne dane wejściowe** — zdjęcie lekcji, skopiowany i wklejony tekst, nagranie głosowe, wyszukiwanie w internecie — i przekształcić je w **notatki do powtórek, flashcards, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Wszystko działa dzięki modelom francuskiej firmy Mistral AI, co sprawia, że EurekAI jest rozwiązaniem naturalnie dostosowanym do uczniów francuskojęzycznych.

[Początkowy prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) powstał w ciągu 48 godzin podczas hackathonu jako demonstracja koncepcji oparta na usługach Mistral — był już funkcjonalny, ale ograniczony. Od tamtej pory EurekAI stało się pełnoprawnym projektem: teksty z lukami, nawigacja po ćwiczeniach, scraping stron internetowych, konfigurowalna kontrola rodzicielska, gruntowny przegląd kodu i wiele więcej. Cały kod został wygenerowany przez AI — głównie [Claude Code](https://code.claude.com/), z pewnym wkładem za pośrednictwem [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Podgląd

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Przewodnik po EurekAI: źródła, notatki, quizy, flashcards, ilustracje" width="820" />
</p>

| | |
|---|---|
| ![Panel główny](docs/screenshots/dashboard.webp)<br>**Panel główny** — ostatnie generacje, szacowany koszt każdej karty i całego projektu, przycisk „Automatycznie — Magia!” | ![Źródła](docs/screenshots/sources.webp)<br>**Źródła** — import zdjęć/PDF/tekstu/głosu/stron internetowych, generowanie jednym kliknięciem, wykrywanie instrukcji |

Każde zaimportowane źródło wyświetla swój [wynik wiarygodności OCR, status moderacji i szacowany koszt](docs/screenshots/sources-list.webp).

### Komponenty w działaniu

| | |
|---|---|
| ![Notatki do powtórek](docs/screenshots/notes.gif)<br>**Notatki do powtórek** — kluczowe punkty, słownictwo, cytaty ze źródłami, odczytywanie każdej sekcji | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz wielokrotnego wyboru** — tylko jedna poprawna odpowiedź na każde pytanie, natychmiastowa informacja zwrotna z wyjaśnieniem, nawigacja krok po kroku |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — odwracanie kart, a następnie samoocena „wiedziałem / nie wiedziałem” | ![Teksty z lukami](docs/screenshots/fillblank.gif)<br>**Teksty z lukami** — podpowiedź na żądanie, tolerancyjna walidacja |
| ![Dyktando](docs/screenshots/dictation.gif)<br>**Dyktando** — słowo odtwarzane jako nagranie, ścisłe sprawdzanie litera po literze | ![Quiz głosowy](docs/screenshots/vocal-quiz.gif)<br>**Quiz głosowy** — pytanie odczytywane na głos, odpowiedź przez mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — krótki podcast z 2 głosami i dostępnym scenariuszem dialogu | ![Ilustracje](docs/screenshots/illustrations.gif)<br>**Ilustracje** — obrazy edukacyjne generowane przez Agenta |
| ![Korepetytor AI](docs/screenshots/chat.gif)<br>**Korepetytor AI** — czat oparty na dokumentach z lekcji, odpowiedzi z wyjaśnieniami, możliwość generowania quizów i flashcards | |

### Pierwsze kroki

| | |
|---|---|
| ![Wybór profilu](docs/screenshots/login.gif)<br>**Wybór profilu** — każde dziecko ma własną przestrzeń, awatar i język | ![Tworzenie profilu](docs/screenshots/profile-create.gif)<br>**Tworzenie profilu** — wiek, awatar, rodzicielski PIN dla osób poniżej 15. roku życia |
| ![Tworzenie kursu](docs/screenshots/course.gif)<br>**Tworzenie kursu** — jeden projekt na każdą lekcję, gotowy do przyjmowania źródeł | ![Ustawienia](docs/screenshots/settings.gif)<br>**Ustawienia** — status API, wybór modeli AI z wyświetlanymi cenami |

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcie, PDF (za pośrednictwem Mistral OCR z uśrednionym wynikiem wiarygodności i poziomami `high`/`medium`/`low`) lub plik tekstowy (TXT, MD). Sesje przesyłania z ponawianiem dla każdego pliku i indywidualnym postępem |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wprowadzanie głosowe** | Nagraj swój głos — Voxtral STT dokona jego transkrypcji |
| 🌐 | **Strona internetowa / URL** | Wklej URL (bezpośredni scraping przez Readability + Lightpanda) lub wpisz zapytanie (Agent Mistral web_search) |
| 📄 | **Notatki do powtórek** | Uporządkowane notatki z kluczowymi punktami, słownictwem, cytatami i ciekawostkami |
| 🃏 | **Flashcards** | Interaktywne karty z pytaniami i odpowiedziami, odczytywanie dialogu |
| ❓ | **Quiz wielokrotnego wyboru** | Pytania z 4 opcjami i tylko jedną poprawną odpowiedzią oraz adaptacyjną powtórką błędów (konfigurowalna liczba) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełnienia z podpowiedziami i tolerancyjną walidacją |
| 🔤 | **Dyktando** | Słowa odtwarzane jako nagrania (Voxtral TTS) z zaimportowanej listy, wpisywanie na klawiaturze, ścisłe sprawdzanie litera po literze z wyjaśnieniem reguły pisowni |
| 🎙️ | **Podcast** | Krótki podcast z 2 głosami — domyślne głosy Mistral lub głosy niestandardowe (rodziców!) |
| 🖼️ | **Ilustracje** | Obrazy edukacyjne generowane przez Agenta Mistral |
| 🗣️ | **Quiz głosowy** | Pytania odczytywane na głos (możliwy niestandardowy głos), odpowiedź ustna, weryfikacja przez AI |
| 💬 | **Korepetytor AI** | Czat kontekstowy z dokumentami z lekcji i wywoływaniem narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 8 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Moderacja konfigurowalna dla każdego profilu (personalizowane kategorie), rodzicielski PIN, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie przez AI obsługiwane w 15 językach za pośrednictwem promptów |
| 🔊 | **Odczytywanie na głos** | Słuchaj notatek i flashcards (dialog pytanie–odpowiedź) za pośrednictwem Mistral Voxtral TTS |
| 💶 | **Śledzenie kosztów API** | Przejrzyste szacowanie kosztu w € każdego generowania i źródła (tokeny / znaki / strony / sekundy nagrania). Odznaka na każdej karcie + łączna kwota projektu, widoczna w panelu głównym |
| 🎨 | **Motyw profilu** | Każdy profil wybiera motyw `dark` lub `light` — zapisywany wraz z profilem i stosowany ponownie po każdej zmianie profilu |

---

## Przegląd architektury

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Przegląd architektury" width="800" />
</p>

---

## Mapa zastosowań modeli

<p align="center">
  <img src="public/assets/model-map.webp" alt="Przypisanie modeli AI do zadań" width="800" />
</p>

---

## Ścieżka użytkownika

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Ścieżka edukacyjna ucznia" width="800" />
</p>

---

## Szczegółowy opis — Funkcje

### Wielomodalne dane wejściowe

EurekAI obsługuje 4 typy źródeł, moderowane zależnie od profilu (moderacja jest domyślnie włączona dla profili dzieci i nastolatków):

- **Import plików** — pliki JPG, PNG lub PDF przetwarzane przez Mistral OCR — domyślnie **OCR 4.1 (`mistral-ocr-4-1`)**, opcjonalnie **OCR 3 (`mistral-ocr-2512`)** w Ustawieniach (tańszy, kosztuje około połowę mniej; lepiej odczytuje pismo odręczne) — dla tekstu drukowanego, tabel i pisma odręcznego; pliki tekstowe (TXT, MD) są importowane bezpośrednio. Przesyłanie wielu plików korzysta z systemu **sesji przesyłania**: indywidualny postęp dla każdego pliku, ponawianie pliku zakończonego błędem bez ponownego przesyłania pozostałych oraz zamknięcie sesji po jej zakończeniu. OCR udostępnia uśredniony **wynik wiarygodności** (`average`, ograniczony w `[0,1]`, obliczony na podstawie `averagePageConfidenceScore` zwracanych przez Mistral), wyświetlany w interfejsie jako odznaka poziomu `high` / `medium` / `low` (progi około 0,9 / około 0,7) — ostrzega, ale nie blokuje, jeśli skan jest niskiej jakości. Kopia dokumentu wysłana do Mistral na potrzeby OCR jest usuwana natychmiast po zakończeniu przetwarzania, także w przypadku błędu.
- **Tekst swobodny** — wpisz lub wklej dowolną treść. Jeśli moderacja jest aktywna, treść zostaje sprawdzona przed zapisaniem.
- **Wprowadzanie głosowe** — nagraj dźwięk w przeglądarce. Transkrypcję wykonuje `voxtral-mini-latest`. Parametr `language="fr"` optymalizuje rozpoznawanie.
- **Strona internetowa / URL** — wklej jeden lub kilka adresów URL, aby bezpośrednio pobrać treść (Readability + Lightpanda dla stron JS), albo wpisz słowa kluczowe, aby wyszukać je w internecie za pośrednictwem Agenta Mistral. Jedno pole obsługuje oba rodzaje danych — adresy URL i słowa kluczowe są rozdzielane automatycznie, a każdy wynik tworzy niezależne źródło.

### Generowanie treści przez AI

Osiem typów generowanych materiałów edukacyjnych:

| Generator | Model | Wynik |
|---|---|---|
| **Notatki do powtórek** | `mistral-large-latest` | Tytuł, podsumowanie, kluczowe punkty, słownictwo, cytaty, ciekawostka |
| **Flashcards** | `mistral-large-latest` | Karty z pytaniami i odpowiedziami oraz odwołaniami do źródeł (konfigurowalna liczba) |
| **Quiz wielokrotnego wyboru** | `mistral-large-latest` | Pytania z 4 opcjami i tylko jedną poprawną odpowiedzią, wyjaśnienia, adaptacyjna powtórka (konfigurowalna liczba) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Dyktando** | `mistral-large-latest` + Voxtral TTS | Słowa kluczowe odtwarzane jako nagrania (1 plik MP3 na słowo) → wpisywanie na klawiaturze → ścisłe sprawdzanie (pominięty znak diakrytyczny liczy się jako błąd) z wyjaśnieniem reguły |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Scenariusz z 2 głosami → nagranie MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny za pośrednictwem narzędzia `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja przez AI |

### Korepetytor AI na czacie

Konwersacyjny korepetytor z pełnym dostępem do dokumentów z lekcji:

- Używa `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować notatki, flashcards, quizy lub teksty z lukami podczas rozmowy
- Historia 50 wiadomości na kurs
- Moderacja, jeśli jest włączona dla profilu: wiadomość jest sprawdzana, a źródła oznaczone, źródła, których weryfikacja się nie powiodła, oraz źródła jeszcze niesprawdzone są wykluczane z kontekstu i narzędzi (weryfikacja źródeł zakończonych błędem lub jeszcze niesprawdzonych jest najpierw ponawiana przez maksymalnie 5 s)

### Automatyczny router

Router używa `mistral-small-latest` do analizy treści źródeł i proponowania najodpowiedniejszych generatorów spośród 8 dostępnych. Interfejs wyświetla postęp w czasie rzeczywistym: najpierw etap analizy, a następnie poszczególne operacje generowania z możliwością ich anulowania.

### Nauka adaptacyjna

- **Statystyki quizu**: śledzenie prób i dokładności dla każdego pytania
- **Powtórka quizu**: generuje 5–10 nowych pytań dotyczących słabo opanowanych zagadnień na podstawie źródeł pierwotnego quizu (kontrola moderacji obejmuje te same źródła)
- **Wykrywanie instrukcji**: wykrywa instrukcje dotyczące powtórki („Znam lekcję, jeśli potrafię...”) i nadaje im priorytet w zgodnych generatorach tekstowych (notatki, flashcards, quizy, teksty z lukami). Gdy moderacja jest aktywna, wykrywanie czeka na weryfikację źródeł i odczytuje tylko te uznane za bezpieczne; instrukcja zachowuje listę swoich pierwotnych źródeł: jeśli którekolwiek z nich zostanie oznaczone, instrukcja nie jest ani wyświetlana, ani stosowana, a jeśli którekolwiek zostanie usunięte, instrukcja również zostaje usunięta. Jej koszt jest uwzględniany

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11–15), student (16–25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-2603` (Mistral Moderation 2) z 11 dostępnymi kategoriami, z których 6 jest domyślnie blokowanych dla nowych profili dzieci i nastolatków (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` dodano po wykonaniu pomiaru na 50 lekcjach, w tym historii, bez żadnych wyników fałszywie dodatnich). Kategorie można dostosować dla każdego profilu w ustawieniach; Moderation 2 podzieliło dawną kategorię „niebezpieczna treść” na `dangerous` + `criminal` (istniejące profile są migrowane automatycznie, a zablokowane kategorie mają zastosowanie również do wcześniej zaimportowanych źródeł). Domyślne zabezpieczenie: jeśli odpowiedź modelu nie pozwala zweryfikować zablokowanej kategorii, treść zostaje odrzucona („Moderacja niedostępna”); gdy moderacja jest aktywna, zarówno generowanie, jak i czat wykluczają źródła oznaczone, źródła, których weryfikacja się nie powiodła, oraz źródła w trakcie weryfikacji. Źródło, które nigdy nie zostało sprawdzone (zaimportowane przy wyłączonej moderacji lub stary projekt przypisany do profilu), jest weryfikowane przed użyciem. Moderacja przerwana wskutek ponownego uruchomienia jest wznawiana przy starcie, jeśli pozwala na to klucz serwera; w przeciwnym razie, podobnie jak moderacja zakończona błędem, zostaje wznowiona po otwarciu projektu lub przy następnym generowaniu. Przycisk „Sprawdź ponownie” uruchamia weryfikację na żądanie. Gdy moderacja jest aktywna, dopóki źródło nie zostanie uznane za bezpieczne, jego treść jest ukryta przed dzieckiem (podgląd, tekst, oryginalny dokument); rodzic może ją wyświetlić przy użyciu swojego kodu PIN tylko na czas jednego przeglądania. Ustna odpowiedź w quizie głosowym jest moderowana przed weryfikacją. Identyfikator z datą przypięty w `helpers/moderation-model.ts`: przestarzały alias `-latest` nie jest już wymieniany przez API.
- **Rodzicielski PIN**: hash SHA-256, wymagany dla profili osób poniżej 15. roku życia; maksymalnie 10 błędnych kodów na kwadrans i adres IP (429 `rate_limited`). W przypadku wdrożenia produkcyjnego należy zastosować wolny hash z solą (Argon2id, bcrypt).
- **Dane serwera**: `/output` udostępnia wyłącznie multimedia projektów (nagrania, obrazy, zaimportowane pliki); `profiles.json`, `config.json`, `projects.json` i `project.json` nigdy nie są udostępniane
- **Ograniczenia czatu**: czat AI jest domyślnie wyłączony dla osób poniżej 16. roku życia i może zostać włączony przez rodziców

### System wielu profili

- Wiele profili z imieniem, wiekiem, awatarem i preferencjami językowymi
- **Głosy dla każdego profilu** (`Profile.mistralVoices?: { host?, guest? }` — każda rola jest opcjonalna) — każde dziecko może mieć własną parę głosów do podcastu i quizu głosowego
- **Motyw dla każdego profilu** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie po zmianie profilu, zapisane po stronie backendu
- Projekty powiązane z profilami przez `profileId`; stary projekt bez profilu zostaje przypisany do pierwszego profilu, który go otworzy, a następnie podlega moderacji zgodnie z tym profilem
- Usuwanie kaskadowe: usunięcie profilu powoduje usunięcie wszystkich jego projektów
### Śledzenie kosztów API

Każde płatne wywołanie Mistral (chat, OCR, STT, TTS, agenci), w tym wykrywanie instrukcji i odpowiedzi ustne w quizie głosowym, jest monitorowane, aby zapewnić użytkownikowi **przejrzyste** oszacowanie kosztu w €. Bezpłatna moderacja nie jest uwzględniana. Opłaty za narzędzia agentów są wliczone: 0,03 $ za wyszukiwanie internetowe i 0,10 $ za wygenerowany obraz (stawki Mistral), wraz z tokenami wygenerowanymi przez te narzędzia, które w oszacowaniu są rozliczane według stawki wejściowej modelu agenta.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → input 0.5 €/M tokenów, output 1.5 €/M tokenów), `PRICING_SOURCES` z adresami URL dokumentacji Mistral do okresowego ponownego scrapowania
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (opakowuje klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzyknięcie do odpowiedzi HTTP)
- **UI**: plakietka kosztu dla każdego generowania (`src/partials/cost-badge-gen.html`), dla każdego źródła (`cost-badge-src.html`), łączna suma w dashboardzie (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` i `/sources/*` rozszerzają zwracany obiekt (`Generation` / `Source`) o `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/route` dodaje pole `costDelta: number` dotyczące wyłącznie kosztu routingu; `POST /detect-consigne` (`{consigne, costDelta}`) oraz weryfikacja odpowiedzi ustnej również zwracają swój `costDelta`. `GET /projects/:pid` zwraca projekt rozszerzony o `totalCost` (suma obliczona na podstawie `costLog[]`) oraz pełną historię

### TTS (Mistral Voxtral) i głosy niestandardowe

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, synteza mowy w 100% oparta na Mistral, bez konieczności używania dodatkowego klucza
- **Głosy niestandardowe**: rodzice mogą tworzyć własne głosy za pomocą API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról prowadzącego/gościa — podcasty i quizy głosowe są wówczas odczytywane głosem rodzica, dzięki czemu doświadczenie dziecka staje się jeszcze bardziej angażujące
- Dwie konfigurowalne role głosowe: **prowadzący** (główny narrator) i **gość** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, z możliwością filtrowania według języka

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
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktywny interfejs, TypeScript kompilowany przez Vite |
| **Templating** | vite-plugin-handlebars | Komponowanie HTML za pomocą partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, agenci, moderacja |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, zintegrowana synteza mowy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Scraping sieci** | Readability + linkedom | Wyodrębnianie głównej treści stron internetowych (technologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultralekka przeglądarka headless (Zig + V8) do stron JS/SPA — awaryjny mechanizm scrapowania |
| **Markdown** | Marked | Renderowanie Markdown w chacie |
| **Przesyłanie plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Łączenie segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Trwałość danych** | Pliki JSON | Przechowywanie bez zależności |

---

## Informacje o modelach

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Notatka, Flashcards, Podcast, Quiz, Teksty z lukami, Chat, Weryfikacja quizu głosowego, Agent Image, Agent Web Search, Wykrywanie instrukcji | Najlepsza wielojęzyczność i wykonywanie instrukcji |
| `mistral-ocr-4-1` (OCR 4.1, domyślnie) | OCR dokumentów | Tekst drukowany, tabele, pismo odręczne ($4 / 1000 stron) |
| `mistral-ocr-2512` (OCR 3, opcjonalnie) | OCR dokumentów | Możliwość wyboru w Ustawieniach, niższy koszt ($2 / 1000 stron), lepiej odczytuje pismo odręczne |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | Wielojęzyczny STT, zoptymalizowany za pomocą `language="fr"` |
| `voxtral-mini-tts-latest` | Synteza mowy (TTS) | Podcasty, quiz głosowy, odczytywanie na głos |
| `mistral-moderation-2603` | Moderacja treści | 6 kategorii blokowanych dla dzieci/nastolatków (w tym `jailbreaking`) |
| `mistral-small-latest` | Automatyczny router | Szybka analiza treści na potrzeby decyzji o routingu |

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

> **Uwaga**: Mistral Voxtral TTS jest jedynym dostawcą TTS — nie jest wymagany żaden dodatkowy klucz poza `MISTRAL_API_KEY`.

> **Klucz API wprowadzany przez użytkownika**: `MISTRAL_API_KEY` jest teraz **opcjonalny**. Jeśli go nie ma, aplikacja i tak się uruchamia i prosi każdego użytkownika o wprowadzenie **własnego klucza Mistral** w interfejsie. Klucz jest **przechowywany w przeglądarce** (zaszyfrowany za pomocą Web Crypto + IndexedDB w bezpiecznym kontekście) i wysyłany z każdym żądaniem — **nigdy nie jest trwale przechowywany na serwerze**. Kolejność pierwszeństwa: klucz profilu > globalny klucz przeglądarki > `MISTRAL_API_KEY` (env). Ustawienie `EUREKAI_REQUIRE_USER_KEY=true` wymusza na każdym użytkowniku podanie klucza (klucz ze zmiennej środowiskowej służy już tylko do wstępnego ładowania).

> **Lokalny HTTPS (tablet/LAN)**: `localhost` jest już bezpiecznym kontekstem. Aby uzyskać dostęp przez LAN (tablet), wygeneruj lokalny certyfikat i włącz HTTPS: przeglądarka będzie wtedy mogła szyfrować przechowywany klucz, a klucz będzie szyfrowany podczas przesyłania:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Zmienne środowiskowe

| Zmienna | Wymagana | Domyślnie | Rola |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcjonalna | — | Klucz API Mistral (chat, OCR, STT, TTS Voxtral, agenci, moderacja). Jeśli go nie ma, użytkownik wprowadza klucz w aplikacji (przechowywany w przeglądarce, nigdy na serwerze) |
| `EUREKAI_REQUIRE_USER_KEY` | opcjonalna | `false` | `true` → wyłącza fallback do `MISTRAL_API_KEY` dla żądań AI (każdy użytkownik MUSI podać swój klucz). Przydatne w publicznie dostępnej instancji |
| `HTTPS_KEY` / `HTTPS_CERT` | opcjonalna | — | Ścieżki do klucza/certyfikatu TLS (zob. `scripts/gen-cert.sh`) → Express i Vite udostępniają usługę przez HTTPS (bezpieczny kontekst LAN/tablet) |
| `PORT` | opcjonalna | `3000` | Port HTTP backendu Express |
| `NODE_ENV` | opcjonalna | `development` | Jeśli `production` → Express udostępnia frontend z `dist/` (w przeciwnym razie `public/`) |
| `SONAR_TOKEN` | opcjonalna w CI | — | Używana wyłącznie przez workflow GitHub Actions SonarCloud |

### Testy, jakość kodu i współtworzenie

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooki Git (Husky)**: `pre-commit` uruchamia kolejno `scripts/pre-commit-fast.sh` (konflikty, duże pliki, shellcheck), `lint-staged`, a następnie `npm test`; `pre-push` najpierw wykonuje blokującą kontrolę `npm audit` (blokuje, gdy dowolna zależność, nawet przechodnia, ma podatność na poziomie `critical`, zob. `scripts/audit-verdict.mjs`), a następnie `npm run security`. Każdy hook blokuje commit/push, jeśli którykolwiek z jego etapów zakończy się niepowodzeniem.

**Narzędzia zewnętrzne (opcjonalne do uruchomienia aplikacji, niezbędne dla `pretest` i `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Bez tych narzędzi `npm test` kończy się niepowodzeniem na `pretest` (brak lizard), a `npm run security` kończy się niepowodzeniem (brak opengrep). Hooki Husky blokują wtedy commit/push.

---

## Wdrożenie w kontenerze

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

> **`:U`**: flaga Podman rootless, która automatycznie dostosowuje uprawnienia woluminu.

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

> **Dla agentów AI współtworzących kod**: zapoznaj się z [`CLAUDE.md`](CLAUDE.md), aby poznać szczegółowy kontekst architektury, obowiązkowe reguły (kody błędów, cost tracking oraz prompty bez słów meta, czyli bez określeń dokumentu, takich jak jego typ, ponieważ model kopiowałby te słowa do swoich wyników) i znane pułapki (Lizard CCN, Opengrep, migracja Codacy/Semgrep).

---

## Dokumentacja API

### Konfiguracja
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Modyfikowanie konfiguracji (modele, głosy, model TTS) |
| `GET` | `/api/config/status` | Status API: `mistral` (zdefiniowany klucz Mistral), `ttsAvailable` (alias `mistral`, Mistral Voxtral jest jedynym dostawcą TTS) |
| `POST` | `/api/config/reset` | Przywracanie konfiguracji domyślnej |
| `GET` | `/api/config/voices` | Wyświetlanie listy głosów Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Dostępne kategorie moderacji i wartości domyślne według wieku |
| `POST` | `/api/providers/mistral/validate` | Weryfikowanie klucza Mistral wprowadzonego przez użytkownika — zawsze 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), bez fallbacku do zmiennej środowiskowej |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Wyświetlanie wszystkich profili |
| `POST` | `/api/profiles` | Tworzenie profilu |
| `PUT` | `/api/profiles/:id` | Modyfikowanie profilu (PIN wymagany dla osób poniżej 15 lat; 10 błędnych kodów PIN / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Usuwanie profilu i kaskadowe usuwanie projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Wyświetlanie projektów (opcjonalnie `?profileId=`) |
| `POST` | `/api/projects` | Tworzenie projektu `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu; `?profileId=` przypisuje projekt bez profilu do profilu, który go otwiera |
| `PUT` | `/api/projects/:pid` | Zmienianie nazwy `{name}` |
| `DELETE` | `/api/projects/:pid` | Usuwanie projektu |
| `GET` | `/api/projects/:pid/events` | Strumień SSE w czasie rzeczywistym (`event: generation`) dla przejść między stanami generowania (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośredni odczyt dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Dowolny tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Mowa STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL lub wyszukiwanie internetowe `{query}` — zwraca tablicę źródeł; 422 `url_blocked`, jeśli wszystkie adresy zostaną odrzucone (sieć wewnętrzna), 502 `all_sources_failed`, jeśli nie udało się utworzyć żadnego źródła |
| `POST` | `/api/projects/:pid/sources/moderate` | Wznawianie moderacji oczekujących lub zakończonych błędem `{sourceIds?}` (maksymalnie 10 na wywołanie, oczekiwanie ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usuwanie źródła, jego zaimportowanego pliku oraz zależnej od niego instrukcji → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderowanie `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykrywanie instrukcji powtórkowych (wyłącznie zweryfikowane źródła) → `{consigne, costDelta}` |

### Generowanie
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Notatka powtórkowa |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz wielokrotnego wyboru (4 opcje, tylko jedna poprawna odpowiedź) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/dictation` | Dyktando (słowa + zdania przykładowe + reguły, 1 nagranie TTS na słowo; proponowane również przez auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Powtórka adaptacyjna `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Notatka przypominająca skupiona na błędnie rozwiązanych pytaniach quizu `{generationId, weakQuestions}` — wywoływana równolegle z `quiz-review` przez przycisk uzupełniania braków w widoku quizu |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) — zwraca `{plan, costDelta}` (wyłącznie koszt routingu) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczne generowanie w backendzie (routing + 8 typów: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Wykonywane równolegle — zakłada tier Mistral z rate-limit ≥ 8 jednoczesnych żądań; w przeciwnym razie w `failedSteps` może pojawić się kilka błędów 429. |

Wszystkie trasy generowania przyjmują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; nieznany `ageGroup` lub `lang`, który nie jest prawidłowym kodem języka (oczekiwane: `fr`, `pt-BR`…) → 400 `invalid_input` przed jakimkolwiek wywołaniem AI. `quiz-review` i `remediation-summary` wymagają dodatkowo `{generationId, weakQuestions}` i dotyczą źródeł pierwotnego quizu.

### CRUD generowań
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Przesyłanie odpowiedzi do quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Przesyłanie odpowiedzi do tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Przesyłanie odpowiedzi do dyktanda `{answers}` (ścisła punktacja po stronie serwera) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Weryfikowanie odpowiedzi ustnej (audio + questionIndex); odpowiedź ustna jest moderowana przed weryfikacją (odrzucenie: 400 `quiz.answerBlocked`), koszt zwracany w `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odczytywanie na głos za pomocą TTS (notatki/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anulowanie trwającego generowania (jedyna ścieżka anulowania stanu pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmienianie nazwy `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usuwanie generowania i powiązanych z nim multimediów (audio, obraz) |

### Chat
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Pobieranie historii chatu |
| `POST` | `/api/projects/:pid/chat` | Wysyłanie wiadomości `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Czyszczenie historii chatu |

---

## Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| **Alpine.js zamiast React/Vue** | Minimalny rozmiar, lekka reaktywność z TypeScript kompilowanym przez Vite. Idealne rozwiązanie na hackathon, gdzie liczy się szybkość. |
| **Trwałość danych w plikach JSON** | Zero zależności, natychmiastowe uruchomienie. Nie trzeba konfigurować żadnej bazy danych — wystarczy uruchomić i można zaczynać. |
| **Vite + Handlebars** | Najlepsze z obu światów: szybki HMR podczas programowania, partials HTML do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty AI w `prompts.ts` — łatwe iterowanie, testowanie i dostosowywanie do języka/grupy wiekowej. |
| **System wielu generowań** | Każde generowanie jest niezależnym obiektem z własnym ID — umożliwia tworzenie wielu notatek, quizów itd. dla jednego kursu. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, poziomem złożoności i tonem — ta sama treść jest przekazywana inaczej w zależności od ucznia. |
| **Funkcje oparte na agentach** | Generowanie obrazów i wyszukiwanie internetowe wykorzystują tymczasowych agentów Mistral — prawidłowy cykl życia z automatycznym czyszczeniem. |
| **Inteligentny scraping URL** | Jedno pole przyjmuje wymieszane adresy URL i słowa kluczowe — adresy URL są scrapowane za pomocą Readability (strony statyczne) z fallbackiem do Lightpanda (strony JS/SPA), a słowa kluczowe uruchamiają agenta Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **TTS w 100% oparty na Mistral** | Mistral Voxtral TTS (bez dodatkowego klucza poza `MISTRAL_API_KEY`) — synteza mowy zintegrowana z łańcuchem kosztów i doborem głosu według języka. |

---
## Autorzy i podziękowania

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lekki framework reaktywny
- **[TailwindCSS](https://tailwindcss.com)** — Narzędziowy framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie do budowania frontendu
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Wyodrębnianie treści internetowych (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralekka przeglądarka headless do scrapowania stron JS/SPA
- **[Luciole](https://luciole-vision.com)** — Krój pisma zaprojektowany dla czytelników słabowidzących, © Laurent Bourcellier i Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opcja „Komfort czytania” w profilach)

Projekt zapoczątkowany podczas Mistral AI Worldwide Hackathon (marzec 2026), opracowany w całości przez AI przy użyciu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artykuł przetłumaczony z fr na pl za pomocą gpt-5.6-sol.**
