<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształca dowolną treść w interaktywne doświadczenie edukacyjne — napędzane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Bramka jakości"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Ocena bezpieczeństwa"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Ocena niezawodności"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Ocena łatwości utrzymania"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Pokrycie kodu"></a>
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

Projekt **EurekAI** narodził się podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([oficjalna strona](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł wziął się z czegoś bardzo konkretnego: regularnie przygotowuję się z córką do sprawdzianów i pomyślałem, że dzięki AI musi istnieć sposób, by uczynić to bardziej angażującym i interaktywnym.

Cel: wziąć **dowolne dane wejściowe** — zdjęcie lekcji, skopiowany i wklejony tekst, nagranie głosowe, wyniki wyszukiwania w sieci — i przekształcić je w **notatki do powtórek, fiszki, quizy, podcasty, teksty z lukami, ilustracje i wiele więcej**. Wszystko to napędzane modelami francuskiej firmy Mistral AI, co czyni EurekAI rozwiązaniem naturalnie dostosowanym do uczniów francuskojęzycznych.

[Pierwszy prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) powstał w 48 godzin podczas hackathonu jako dowód słuszności koncepcji oparty na usługach Mistral — już działający, ale ograniczony. Od tego czasu EurekAI stało się pełnoprawnym projektem: teksty z lukami, nawigacja po ćwiczeniach, web scraping, konfigurowalna moderacja rodzicielska, dogłębny przegląd kodu i wiele więcej. Cały kod został wygenerowany przez AI — głównie [Claude Code](https://code.claude.com/), z pewnym udziałem [Codex](https://openai.com/codex/) oraz [Gemini CLI](https://geminicli.com/).

---

## Podgląd

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Przewodnik po EurekAI: źródła, notatka, quiz, fiszki, ilustracje" width="820" />
</p>

| | |
|---|---|
| ![Panel główny](docs/screenshots/dashboard.webp)<br>**Panel główny** — ostatnie generacje, szacowany koszt na kartę i suma dla projektu, przycisk „Auto — Magia!” | ![Źródła](docs/screenshots/sources.webp)<br>**Źródła** — import zdjęć/PDF/tekstu/głosu/stron www, generowanie jednym kliknięciem, wykrywanie poleceń |

Każde zaimportowane źródło wyświetla swój [wskaźnik pewności OCR, status moderacji oraz szacowany koszt](docs/screenshots/sources-list.webp).

### Komponenty w akcji

| | |
|---|---|
| ![Notatka do powtórki](docs/screenshots/notes.gif)<br>**Notatka do powtórki** — kluczowe punkty, słownictwo, cytaty ze źródłami, odtwarzanie audio dla każdej sekcji | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz wielokrotnego wyboru** — jedna poprawna odpowiedź na pytanie, natychmiastowa informacja zwrotna z wyjaśnieniem, nawigacja krok po kroku |
| ![Fiszki](docs/screenshots/flashcards.gif)<br>**Fiszki** — odwracana karta oraz samoocena „wiedziałem / nie wiedziałem” | ![Teksty z lukami](docs/screenshots/fillblank.gif)<br>**Teksty z lukami** — podpowiedź na żądanie, tolerancyjna walidacja |
| ![Dyktando](docs/screenshots/dictation.gif)<br>**Dyktando** — słowo dyktowane głosowo, ścisłe sprawdzanie litera po literze | ![Quiz głosowy](docs/screenshots/vocal-quiz.gif)<br>**Quiz głosowy** — pytanie czytane na głos, odpowiedź przez mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast na 2 głosy, dostępny skrypt dialogu | ![Ilustracje](docs/screenshots/illustrations.gif)<br>**Ilustracje** — obrazy edukacyjne generowane przez Agenta |
| ![Tutor AI](docs/screenshots/chat.gif)<br>**Tutor AI** — czat osadzony w dokumentach kursu, wyjaśnione odpowiedzi, możliwość generowania quizów i fiszek | |

### Pierwsze kroki

| | |
|---|---|
| ![Wybór profilu](docs/screenshots/login.gif)<br>**Wybór profilu** — każde dziecko ma własną przestrzeń, awatar i język | ![Tworzenie profilu](docs/screenshots/profile-create.gif)<br>**Tworzenie profilu** — wiek, awatar, rodzicielski kod PIN dla osób poniżej 15. roku życia |
| ![Tworzenie kursu](docs/screenshots/course.gif)<br>**Tworzenie kursu** — jeden projekt na lekcję, gotowy na dodawanie źródeł | ![Ustawienia](docs/screenshots/settings.gif)<br>**Ustawienia** — status API, wybór modeli AI z wyświetlanymi stawkami |

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcia, pliki PDF (przez Mistral OCR z uśrednionym wskaźnikiem pewności, poziomy `high`/`medium`/`low`) lub pliki tekstowe (TXT, MD). Sesje przesyłania z ponawianiem prób dla pojedynczych plików i indywidualnym paskiem postępu |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wprowadzanie głosowe** | Nagraj się — Voxtral STT dokona transkrypcji Twojego głosu |
| 🌐 | **Sieć / URL** | Wklej adres URL (bezpośredni scraping przez Readability + Lightpanda) lub wpisz zapytanie (Agent Mistral web_search) |
| 📄 | **Notatki do powtórek** | Ustrukturyzowane notatki z kluczowymi punktami, słownictwem, cytatami i ciekawostkami |
| 🃏 | **Fiszki** | Interaktywne karty P/O, dialogowe odtwarzanie audio |
| ❓ | **Quiz wielokrotnego wyboru** | Pytania z 4 wariantami i jedną poprawną odpowiedzią, z adaptacyjną powtórką błędów (konfigurowalna liczba) |
| ✏️ | **Teksty z lukami** | Ćwiczenia polegające na uzupełnianiu luk z podpowiedziami i tolerancyjną walidacją |
| 🔤 | **Dyktando** | Słowa dyktowane głosowo (Voxtral TTS) z zaimportowanej listy, wpisywanie z klawiatury, ścisła korekta litera po literze z wyjaśnieniem zasady ortograficznej |
| 🎙️ | **Podcast** | Mini-podcast audio na 2 głosy — domyślne głosy Mistral lub głosy spersonalizowane (rodzice!) |
| 🖼️ | **Ilustracje** | Obrazy edukacyjne generowane przez Agenta Mistral |
| 🗣️ | **Quiz głosowy** | Pytania czytane na głos (możliwy własny głos), odpowiedź ustna, weryfikacja przez AI |
| 💬 | **Tutor AI** | Kontekstowy czat z dokumentami kursu, obsługujący wywoływanie narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje treść i proponuje kombinację generatorów spośród 8 dostępnych typów |
| 🔁 | **Ciągłość między kursami** | Importy, automatyczne generacje, nagrywanie mikrofonem, czat, wyszukiwanie w sieci i czytanie na głos są kontynuowane w przypisanym kursie po otwarciu innego; powiadomienie wskazuje nazwę kursu, gdy zadanie zakończy się w tle |
| 🔒 | **Kontrola rodzicielska** | Moderacja konfigurowalna dla każdego profilu (dostosowywane kategorie), rodzicielski kod PIN, ograniczenia czatu |
| 🌍 | **Wielojęzyczność** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach za pomocą promptów |
| 🔊 | **Czytanie na głos** | Słuchaj notatek i fiszek (dialog pytanie/odpowiedź) dzięki Mistral Voxtral TTS |
| 💶 | **Śledzenie kosztów API** | Przejrzyste szacowanie kosztu w € dla każdej generacji i źródła (tokeny / znaki / strony / sekundy audio). Plakietka na karcie + suma dla projektu widoczna w panelu głównym |
| 🎨 | **Motyw dla profilu** | Każdy profil wybiera swój motyw `dark` lub `light` — zapamiętywany w profilu i przywracany przy każdej zmianie profilu |

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
  <img src="public/assets/user-journey.webp" alt="Ścieżka edukacyjna ucznia" width="800" />
</p>

---

## Szczegółowe omówienie — Funkcje

### Wejście multimodalne

EurekAI obsługuje 4 typy źródeł, moderowanych w zależności od profilu (moderacja jest domyślnie włączona dla profili dziecięcych i nastoletnich):

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez OCR Mistral — domyślnie **OCR 4.1** (`mistral-ocr-4-1`), opcjonalnie **OCR 3** (`mistral-ocr-2512`) w Ustawieniach (tańszy, ok. ½ kosztu; lepiej odczytuje pismo odręczne) — dla tekstu drukowanego, tabel i pisma odręcznego; lub pliki tekstowe (TXT, MD) importowane bezpośrednio. Przesyłanie wielu plików korzysta z systemu **sesji przesyłania**: indywidualny postęp dla każdego pliku, ponawianie próby dla pliku, którego przesłanie się nie powiodło, bez konieczności ponownego wysyłania pozostałych, oraz zamknięcie sesji po zakończeniu. OCR udostępnia uśredniony **wskaźnik pewności** (`average`, ograniczony do przedziału `[0,1]`, obliczany na podstawie `averagePageConfidenceScore` zwracanych przez Mistral), wyświetlany w interfejsie użytkownika jako plakietka poziomu `high` / `medium` / `low` (progi ~0.9 / ~0.7) — ostrzega bez blokowania, jeśli skan jest niskiej jakości. Kopia dokumentu wysłana do Mistral w celu wykonania OCR jest usuwana natychmiast po zakończeniu przetwarzania, nawet w przypadku niepowodzenia.
- **Dowolny tekst** — Wpisz lub wklej dowolną treść. Moderowana przed zapisaniem, jeśli moderacja jest aktywna.
- **Wprowadzanie głosowe** — Nagraj dźwięk w przeglądarce. Domyślnie transkrybowany przez **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`); **Voxtral Mini Transcribe 3** oraz **Voxtral Small Transcribe 3** (wersja zapoznawcza Mistral) dostępne opcjonalnie w Ustawieniach. Język interfejsu jest przekazywany do modelu (`language`), aby zoptymalizować rozpoznawanie mowy.
- **Sieć / URL** — Wklej jeden lub więcej adresów URL, aby bezpośrednio pobrać treść (Readability + Lightpanda dla stron JS), lub wpisz słowa kluczowe, aby wyszukać informacje w sieci przez Agenta Mistral. Pojedyncze pole obsługuje oba formaty — adresy URL i słowa kluczowe są rozdzielane automatycznie, a każdy wynik tworzy niezależne źródło.

### Generowanie treści przez AI

Osiem typów generowanych materiałów edukacyjnych:

| Generator | Model | Wynik |
|---|---|---|
| **Notatka do powtórki** | `mistral-large-latest` | Tytuł, podsumowanie, kluczowe punkty, słownictwo, cytaty, ciekawostka |
| **Fiszki** | `mistral-large-latest` | Karty P/O z odniesieniami do źródeł (konfigurowalna liczba) |
| **Quiz wielokrotnego wyboru** | `mistral-large-latest` | Pytania z 4 wariantami i jedną poprawną odpowiedzią, wyjaśnienia, adaptacyjna powtórka (konfigurowalna liczba) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Dyktando** | `mistral-large-latest` + Voxtral TTS | Słowa kluczowe dyktowane głosowo (1 MP3/słowo) → wpisywanie z klawiatury → ścisła korekta (pominięty znak diakrytyczny liczy się jako błąd) z wyjaśnieniem reguły |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt na 2 głosy → plik audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny przy użyciu narzędzia `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja przez AI |

### Czat z Tutorem AI

Konwersacyjny tutor z pełnym dostępem do dokumentów kursu:

- Wykorzystuje `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować notatki, fiszki, quizy lub teksty z lukami w trakcie rozmowy
- Historia 50 wiadomości na kurs
- Moderacja, jeśli jest włączona dla profilu: wiadomość jest weryfikowana, a źródła zgłoszone, te, których weryfikacja się nie powiodła, oraz jeszcze niezweryfikowane są wykluczane z kontekstu i narzędzi (weryfikacja źródeł zakończonych błędem lub jeszcze niezweryfikowanych jest najpierw ponawiana, maksymalnie przez 5 s)

### Automatyczny router

Router wykorzystuje `mistral-small-latest` do analizy treści źródeł i zaproponowania najbardziej odpowiednich generatorów spośród 8 dostępnych. Interfejs wyświetla postęp w czasie rzeczywistym: najpierw fazę analizy, a następnie poszczególne generacje z możliwością ich anulowania.

Tryb Auto działa po stronie serwera: jest kontynuowany po odświeżeniu strony, otwarciu innego kursu lub zmianie profilu, a w ramach jednego kursu może działać tylko jeden proces Auto naraz (druga karta przeglądarki dołącza do trwającego procesu). Serwer uruchamia maksymalnie 3 generacje jednocześnie na jeden klucz Mistral. Każda zakończona generacja wyświetla własny komunikat, a na koniec jednokrotnie pojawia się podsumowanie końcowe; jeśli proces zakończy się podczas przeglądania innego kursu, komunikat wskaże nazwę właściwego kursu. Pojedyncza anulowana generacja nie jest liczona jako błąd w podsumowaniu. Przycisk „Anuluj wszystko” zatrzymuje całą partię dla danego kursu, wyświetlając jeden komunikat. Jeśli serwer zostanie zrestartowany w trakcie działania trybu Auto, proces zostanie oznaczony jako przerwany wraz z przyciskiem „Wznów”, który ponownie uruchamia tylko niedokończone generacje bez powtarzania analizy.

Jednocześnie mogą działać maksymalnie 3 długie generacje uruchomione z karty (generacje uruchamiane pojedynczo, karty przypomnień): kolejne czekają na swoją kolej, a kurs otwiera się bez czekania na zakończenie trwających generacji.

### Nauka adaptacyjna

- **Statystyki quizu**: śledzenie prób i trafności odpowiedzi dla każdego pytania
- **Powtórka quizu**: generuje 5–10 nowych pytań ukierunkowanych na słabiej opanowane zagadnienia, na podstawie źródeł pierwotnego quizu (ochrona moderacji obejmuje te same źródła)
- **Wykrywanie poleceń**: wykrywa instrukcje dotyczące powtórki („Umiem lekcję, jeśli potrafię...”) i nadaje im priorytet w kompatybilnych generatorach tekstowych (notatka, fiszki, quiz, teksty z lukami). Przy włączonej moderacji wykrywanie czeka na weryfikację źródeł i odczytuje tylko te uznane za bezpieczne; polecenie zachowuje listę swoich źródeł pochodzenia: jeśli któreś z nich zostanie zgłoszone przez moderację, polecenie nie jest ani wyświetlane, ani stosowane, a jeśli któreś zostanie usunięte, polecenie jest kasowane. Jego koszt jest wliczany do podsumowania

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11-15), student (16-25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-2603` (Mistral Moderation 2) z 11 dostępnymi kategoriami, z których 6 jest domyślnie zablokowanych dla nowych profili dzieci/nastolatków (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; kategorię `criminal` dodano po testach na 50 lekcjach, w tym z historii, bez ani jednego fałszywie dodatniego wyniku). Kategorie można dostosować dla każdego profilu w ustawieniach; Moderation 2 podzieliło dawną kategorię „niebezpieczne treści” na `dangerous` + `criminal` (istniejące profile są migrowane automatycznie, a zablokowane kategorie mają zastosowanie również do już zaimportowanych źródeł). Domyślne bezpieczeństwo: jeśli odpowiedź modelu nie pozwala na zweryfikowanie zablokowanej kategorii, treść zostaje odrzucona („Moderacja niedostępna”); przy aktywnej moderacji zarówno generowanie, jak i czat pomijają źródła zgłoszone, te, których weryfikacja się nie powiodła, oraz te w trakcie weryfikacji. Źródło nigdy wcześniej niezweryfikowane (zaimportowane, gdy moderacja była wyłączona, lub pochodzące ze starego projektu przypisanego do profilu) jest weryfikowane przed użyciem. Moderacja przerwana przez restart jest wznawiana przy uruchomieniu, jeśli pozwala na to klucz serwera; w przeciwnym razie, podobnie jak moderacja zakończona błędem, jest wznawiana przy otwarciu projektu lub przy kolejnym generowaniu. Przycisk „Zweryfikuj ponownie” uruchamia weryfikację na żądanie. Przy aktywnej moderacji, dopóki źródło nie zostanie uznane za bezpieczne, jego zawartość jest ukryta przed dzieckiem (podgląd, tekst, oryginalny dokument); rodzic może ją wyświetlić za pomocą kodu PIN na potrzeby jednorazowego wglądu. Odpowiedź ustna w quizie głosowym jest moderowana przed jej sprawdzeniem. Przypięty identyfikator z datą w `helpers/moderation-model.ts`: przestarzały alias `-latest` nie jest już zwracany przez API.
- **Rodzicielski kod PIN**: skrót SHA-256, wymagany dla profili poniżej 15. roku życia; maksymalnie 10 błędnych kodów na kwadrans i na adres IP (429 `rate_limited`). W przypadku wdrożenia produkcyjnego należy przewidzieć wolny skrót z solą (Argon2id, bcrypt).
- **Dane serwera**: `/output` udostępnia wyłącznie multimedia projektów (audio, obrazy, zaimportowane pliki); `profiles.json`, `config.json`, `projects.json` oraz `project.json` nigdy nie są serwowane
- **Ograniczenia czatu**: czat AI domyślnie wyłączony dla osób poniżej 16. roku życia, z możliwością włączenia przez rodziców

### System wieloprofilowy

- Wiele profili z imieniem, wiekiem, awatarem i preferencjami językowymi
- **Głos przypisany do profilu** (`Profile.mistralVoices?: { host?, guest? }` — każda rola jest opcjonalna) — każde dziecko może mieć własną parę głosów do podcastów/quizów głosowych
- **Motyw przypisany do profilu** (`Profile.theme: 'dark' | 'light'`) — automatyczne przełączanie przy zmianie profilu, utrwalane po stronie backendu
- Projekty powiązane z profilami za pomocą `profileId`; starszy projekt bez profilu zostaje przypisany do pierwszego profilu, który go otworzy, a następnie poddany moderacji zgodnie z tym profilem
- Usuwanie kaskadowe: usunięcie profilu powoduje usunięcie wszystkich jego projektów

### Śledzenie kosztów API

Każde płatne wywołanie Mistral (czat, OCR, STT, TTS, agenci), wliczając wykrywanie poleceń i odpowiedzi ustne w quizie głosowym, jest opomiarowane, aby zapewnić użytkownikowi **przejrzysty** szacunek kosztów w €. Bezpłatna moderacja nie jest wliczana. Uwzględniane są opłaty za narzędzia agentów: 0,03 $ za wyszukiwanie w sieci i 0,10 $ za wygenerowany obraz (stawki Mistral), a także tokeny wygenerowane przez te narzędzia, które w szacunkach są liczone według stawki wejściowej modelu agenta.

- **Źródło prawdy**: `helpers/pricing.ts` — `MODEL_PRICING` według prefiksu modelu (np. `mistral-large` → wejście 0.5 €/M tokenów, wyjście 1.5 €/M tokenów), `PRICING_SOURCES` z adresami URL dokumentacji Mistral do okresowego ponownego scrapowania
- **Obsługiwane jednostki**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — konwersja sterowana przez `helpers/cost-calc.ts`
- **Łańcuch instrumentacji**: `helpers/tracked-client.ts` (opakowuje klienta Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (wstrzykiwanie do odpowiedzi HTTP)
- **UI**: plakietka kosztu dla każdego generowania (`src/partials/cost-badge-gen.html`), dla każdego źródła (`cost-badge-src.html`) oraz skumulowana suma w panelu głównym (`Project.totalCost`)
- **Endpointy**: odpowiedzi `/generate/*` i `/sources/*` wzbogacają zwracany obiekt (`Generation` / `Source`) o pola `estimatedCost`, `usage` i `costBreakdown`. `POST /generate/route` dodaje pole `costDelta: number` dla samego kosztu routingu; `POST /detect-consigne` (`{consigne, costDelta}`) oraz weryfikacja odpowiedzi ustnej również zwracają swoje `costDelta`. `GET /projects/:pid` zwraca projekt wzbogacony o `totalCost` (suma obliczona na podstawie `costLog[]`) + pełną historię

### TTS (Mistral Voxtral) i niestandardowe głosy

- **Mistral Voxtral TTS**: domyślnie **Voxtral TTS** (`voxtral-mini-tts-2603`), opcjonalnie w Ustawieniach **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, wersja zapoznawcza Mistral, natywne głosy w większej liczbie języków); synteza mowy w 100% oparta na Mistral, niewymagająca dodatkowego klucza. Proponowane są wyłącznie głosy obsługiwane przez wybrany model: Voxtral TTS odrzuca głosy dodane w Voxtral 3
- **Niestandardowe głosy**: rodzice mogą tworzyć własne głosy za pośrednictwem API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról gospodarza/gościa — podcasty i quizy głosowe są wówczas odczytywane głosem rodzica, co czyni całe doświadczenie jeszcze bardziej angażującym dla dziecka
- Dwie konfigurowalne role głosowe: **gospodarz** (główny narrator) i **gość** (drugi głos w podcaście)
- Pełny katalog głosów Mistral dostępny w ustawieniach, z możliwością filtrowania według języka
- Odtwarzanie (notatka, podcast, słowo w dyktandzie) zostaje wstrzymane po opuszczeniu widoku i wznawia się w miejscu, w którym zostało przerwane
- Nagranie audio do głośnego czytania fiszek jest tworzone przy pierwszym odsłuchaniu, a następnie zachowywane w ramach ich generacji: nie jest tworzone na nowo ani ponownie naliczane przy każdym powrocie
- Znaczniki źródeł (`[Source N]`) nie są odczytywane na głos

### Internacjonalizacja

- Interfejs dostępny w 9 językach: fr, en, es, pt, it, nl, de, hi, ar
- Prompty AI obsługują 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Język konfigurowalny dla każdego profilu

---

## Stos technologiczny

| Warstwa | Technologia | Rola |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Serwer i bezpieczeństwo typów |
| **Backend** | Express 5.x | REST API |
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, szablony częściowe (partials) Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktywny interfejs, TypeScript kompilowany przez Vite |
| **System szablonów** | vite-plugin-handlebars | Kompozycja HTML za pomocą szablonów częściowych (partials) |
| **AI** | Mistral AI SDK | Czat, OCR, STT, TTS, Agenci, Moderacja |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (opcjonalnie Voxtral TTS 3), zintegrowana synteza mowy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Web scraping** | Readability + linkedom | Ekstrakcja głównej treści stron internetowych (technologia Firefox Reader View) |
| **Przeglądarka headless** | Lightpanda | Ultralekka przeglądarka headless (Zig + V8) dla stron JS/SPA — awaryjny scraping |
| **Markdown** | Marked | Renderowanie formatu Markdown na czacie |
| **Przesyłanie plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Łączenie segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie kodu mierzone przez SonarCloud |
| **Trwałość danych** | Pliki JSON | Przechowywanie danych bez zewnętrznych zależności |

---

## Wykaz modeli

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Notatka, Fiszki, Podcast, Quiz, Teksty z lukami, Czat, Weryfikacja quizu głosowego, Agent Obrazu, Agent Wyszukiwania w Sieci, Wykrywanie poleceń | Najlepsza wielojęzyczność i podążanie za instrukcjami |
| `mistral-ocr-4-1` (OCR 4.1, domyślny) | OCR dokumentów | Tekst drukowany, tabele, pismo odręczne ($4 / 1000 stron) |
| `mistral-ocr-2512` (OCR 3, opcja) | OCR dokumentów | Do wyboru w Ustawieniach, tańszy ($2 / 1000 stron), lepiej odczytuje pismo odręczne |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, domyślny) | Rozpoznawanie mowy (STT) | Wprowadzanie głosowe i odpowiedzi ustne w quizie głosowym ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, opcja, wersja zapoznawcza) | Rozpoznawanie mowy (STT) | Do wyboru w Ustawieniach ($0.0035 / min i $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, domyślny) | Synteza mowy (TTS) | Podcasty, quiz głosowy, dyktando, czytanie na głos ($16 / M znaków) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, opcja, wersja zapoznawcza) | Synteza mowy (TTS) | Do wyboru w Ustawieniach, natywne głosy w większej liczbie języków ($13 / M znaków) |
| `mistral-moderation-2603` | Moderacja treści | 6 kategorii zablokowanych dla dzieci/nastolatków (w tym `jailbreaking`) |
| `mistral-small-latest` | Automatyczny router | Szybka analiza treści na potrzeby decyzji o routingu |

Na telefonie w Ustawieniach pod każdym selektorem wyświetlana jest pełna etykieta wybranego modelu (cena, „Zalecany” lub „Wersja zapoznawcza”), którą zamknięte menu wcześniej ucinało.

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

> **Klucz API wprowadzany przez użytkownika**: zmienna `MISTRAL_API_KEY` jest teraz **opcjonalna**. Jeśli jej brakuje, aplikacja mimo to uruchamia się i prosi każdego użytkownika o wprowadzenie **własnego klucza Mistral** w interfejsie. Klucz jest **przechowywany w przeglądarce** (zaszyfrowany za pomocą Web Crypto + IndexedDB w bezpiecznym kontekście) i wysyłany z każdym żądaniem — **nigdy nie jest zapisywany na serwerze**. Kolejność priorytetów: klucz profilu > globalny klucz przeglądarce > `MISTRAL_API_KEY` (env). Ustawienie `EUREKAI_REQUIRE_USER_KEY=true` wymusza na każdym użytkowniku podanie własnego klucza (klucz ze zmiennej środowiskowej służy wówczas wyłącznie do wstępnego ładowania).

> **Lokalny HTTPS (tablet/LAN)**: `localhost` jest już bezpiecznym kontekstem. W przypadku dostępu przez sieć LAN (tablet) wygeneruj lokalny certyfikat i włącz HTTPS: przeglądarka będzie wtedy mogła zaszyfrować przechowywany klucz, a sam klucz będzie również szyfrowany podczas przesyłania:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Zmienne środowiskowe

| Zmienna | Wymagana | Domyślnie | Rola |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcjonalnie | — | Klucz API Mistral (czat, OCR, STT, TTS Voxtral, agenci, moderacja). Jeśli go brakuje, użytkownik wprowadza własny klucz w aplikacji (przechowywany w przeglądarce, nigdy na serwerze) |
| `EUREKAI_REQUIRE_USER_KEY` | opcjonalnie | `false` | `true` → wyłącza awaryjne użycie `MISTRAL_API_KEY` dla żądań AI (każdy użytkownik MUSI podać własny klucz). Przydatne w przypadku publicznie dostępnej instancji |
| `HTTPS_KEY` / `HTTPS_CERT` | opcjonalnie | — | Ścieżki klucza/certyfikatu TLS (zob. `scripts/gen-cert.sh`) → Express i Vite działają przez HTTPS (bezpieczny kontekst LAN/tablet) |
| `PORT` | opcjonalnie | `3000` | Port HTTP backendu Express |
| `NODE_ENV` | opcjonalnie | `development` | Jeśli `production` → Express serwuje frontend z `dist/` (w przeciwnym razie `public/`) |
| `SONAR_TOKEN` | opcjonalnie CI | — | Używany wyłącznie przez przepływ pracy GitHub Actions SonarCloud |

### Testy, jakość kodu i współtworzenie

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooki Git (Husky)**: `pre-commit` uruchamia kolejno `scripts/pre-commit-fast.sh` (konflikty, duże pliki, shellcheck), `lint-staged`, a następnie `npm test`; `pre-push` wykonuje najpierw blokującą kontrolę `npm audit` (blokuje, gdy tylko jakakolwiek zależność, nawet przechodnia, ma podatność na poziomie `critical`, zob. `scripts/audit-verdict.mjs`), a następnie `npm run security`. Każdy hook blokuje commit/push w momencie, gdy którykolwiek z jego kroków zakończy się niepowodzeniem.

**Narzędzia zewnętrzne (opcjonalne do uruchomienia aplikacji, niezbędne dla `pretest` oraz `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Bez tych narzędzi `npm test` kończy się błędem na etapie `pretest` (brak narzędzia lizard), a `npm run security` kończy się niepowodzeniem (brak narzędzia opengrep). Hooki husky blokują wówczas operację commit/push.

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

> **`:U`**: flaga Podmana w trybie rootless, która automatycznie dostosowuje uprawnienia woluminu.

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
  generate.ts             — Endpoints de génération (8 types + route)
  auto-runs.ts            — Lots Auto côté serveur : lancement, analyse et étapes en arrière-plan, état, annulation
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
  keyed-slots.ts          — Places par clé (au plus 3 étapes d'Auto en même temps par clé Mistral)
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
  stt-models.ts           — Source de vérité sélection transcription (Mini Transcribe 2 défaut / Transcribe 3 option) + normalizeSttModel
  tts-models.ts           — Source de vérité sélection synthèse vocale (Voxtral TTS défaut / TTS 3 option) + compatibilité des voix
  tts-text.ts             — Texte envoyé au TTS : marqueurs de sources et crochets retirés (Voxtral les lit ou avale le mot)
  source-markers.ts       — Regex des marqueurs `[Source N]` des fiches (pastilles côté navigateur, texte lu côté serveur)
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
  event-bus.ts            — Bus d'événements de génération et de lots Auto en mémoire (dispatch SSE, filet anti-uncaughtException)
  auto-run-state.ts       — Transitions d'un lot Auto (fonctions pures, appliquées par le store)
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
    view-media.ts         — Pause du son au changement de vue (position gardée)
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, Auto)
    auto-launch.ts        — Lancement d'un Auto côté serveur, suivi pendant qu'un autre cours est affiché, annulation
    auto-runs.ts          — Auto suivis par l'onglet : état reçu du serveur, bilan affiché une seule fois, coût de l'analyse
    request-slots.ts      — Au plus 3 générations longues en même temps pour l'onglet, file d'attente FIFO
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    chat-in-flight.ts     — Messages du chat en attente de réponse, par cours
    config.ts             — Interface de configuration (modèles de chat, d'OCR, de transcription et de TTS, voix)
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

> **Dla agentów AI współtworzących kod**: zapoznaj się z plikiem [`CLAUDE.md`](CLAUDE.md) (zasady przekrojowe, indeks) oraz szczegółowymi regułami w katalogu [`.claude/rules/`](.claude/rules/), ładowanymi na żądanie w zależności od odczytywanych lub modyfikowanych plików, aby poznać szczegółowy kontekst architektoniczny, obowiązkowe zasady (kody błędów, śledzenie kosztów oraz prompty bez metasłów, czyli bez określeń opisujących dokument, takich jak jego typ, ponieważ model kopiowałby te słowa do swoich wyników) oraz znane pułapki (Lizard CCN, Opengrep, migracja Codacy/Semgrep).

---

## Dokumentacja API

### Konfiguracja
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Modyfikacja konfiguracji (modele, głosy, model TTS) |
| `GET` | `/api/config/status` | Status API: `mistral` (zdefiniowany klucz Mistral), `ttsAvailable` (alias dla `mistral`, Mistral Voxtral jest jedynym dostawcą TTS) |
| `POST` | `/api/config/reset` | Przywrócenie domyślnej konfiguracji |
| `GET` | `/api/config/voices` | Pobranie listy głosów Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Dostępne kategorie moderacji + wartości domyślne według wieku |
| `POST` | `/api/providers/mistral/validate` | Walidacja klucza Mistral wprowadzonego przez użytkownika — zawsze 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), bez awaryjnego użycia zmiennej środowiskowej |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Pobranie listy wszystkich profili |
| `POST` | `/api/profiles` | Utworzenie profilu |
| `PUT` | `/api/profiles/:id` | Modyfikacja profilu (wymagany kod PIN dla wieku < 15 lat; 10 błędnych kodów PIN / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Usunięcie profilu + kaskadowe usunięcie projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Pobranie listy projektów (opcjonalnie `?profileId=`) |
| `POST` | `/api/projects` | Utworzenie projektu `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu; `?profileId=` przypisuje projekt bez profilu do profilu, który go otwiera |
| `PUT` | `/api/projects/:pid` | Zmiana nazwy `{name}` |
| `DELETE` | `/api/projects/:pid` | Usunięcie projektu |
| `GET` | `/api/projects/:pid/events` | Strumień SSE w czasie rzeczywistym (`event: generation`) zmian stanów generowania (`completed`/`failed`/`cancelled`) + sygnał heartbeat podtrzymujący połączenie (keep-alive) |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośredni odczyt dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Dowolny tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping adresu URL lub wyszukiwanie w sieci `{query}` — zwraca tablicę źródeł; 422 `url_blocked`, jeśli wszystkie adresy zostaną odrzucone (sieć wewnętrzna), 502 `all_sources_failed`, jeśli nie udało się utworzyć żadnego źródła |
| `POST` | `/api/projects/:pid/sources/moderate` | Wznowienie moderacji oczekujących lub zakończonych błędem `{sourceIds?}` (maksymalnie 10 na wywołanie, czas oczekiwania ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usunięcie źródła, zaimportowanego pliku oraz zależnego od niego polecenia → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderacja `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykrycie poleceń powtórkowych (tylko zweryfikowane źródła) → `{consigne, costDelta}` |

### Generowanie
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Karta powtórkowa |
| `POST` | `/api/projects/:pid/generate/flashcards` | Fiszki |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz wielokrotnego wyboru (4 opcje, tylko jedna poprawna odpowiedź) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/dictation` | Dyktando (słowa + przykładowe zdania + reguły, 1 nagranie audio TTS na słowo; proponowane również przez auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Powtórka adaptacyjna `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Karta przypominająca ukierunkowana na błędne odpowiedzi z quizu `{generationId, weakQuestions}` — wywoływana równolegle z `quiz-review` przez przycisk poprawy w widoku quizu |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) — zwraca `{plan, costDelta}` (koszt samego routingu) |
| `POST` | `/api/projects/:pid/generate/auto/start` | Uruchomienie wsadu Auto po stronie serwera `{runId, …}`: natychmiastowa odpowiedź 202, a następnie analiza i etapy w tle, maksymalnie 3 etapy jednocześnie na klucz Mistral; wsad jest kontynuowany po przeładowaniu strony. 409 `auto_busy`, jeśli wsad jest już uruchomiony dla tego kursu |
| `POST` | `/api/projects/:pid/generate/auto/resume` | Wznowienie wsadu Auto przerwanego przez restart serwera `{runId}`: jego przerwane etapy ruszają ponownie z kluczem z tego żądania, bez powtarzania analizy (odpowiedź 202) |
| `GET` | `/api/projects/:pid/auto-runs/:runId` | Stan wsadu Auto: analiza, etapy i wynik każdego z nich |
| `POST` | `/api/projects/:pid/auto-runs/:runId/cancel` | Anulowanie całego wsadu Auto (pojedynczy etap anuluje się jak zwykłą generację) |

Wszystkie ścieżki generowania akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; nieznany `ageGroup` lub `lang`, który nie jest prawidłowym kodem języka (oczekiwano: `fr`, `pt-BR`…) → 400 `invalid_input`, przed jakimkolwiek wywołaniem AI. `quiz-review` i `remediation-summary` wymagają dodatkowo `{generationId, weakQuestions}` i działają na źródłach oryginalnego quizu.

### CRUD generacji
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Przesłanie odpowiedzi z quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Przesłanie odpowiedzi z tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Przesłanie odpowiedzi z dyktanda `{answers}` (ścisła punktacja po stronie serwera) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Weryfikacja odpowiedzi ustnej (audio + questionIndex); odpowiedź ustna jest moderowana przed weryfikacją (odrzucenie: 400 `quiz.answerBlocked`), koszt zwracany w `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odczyt TTS na głos (karty powtórkowe/fiszki) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Anulowanie trwającej generacji (jedyna ścieżka anulowania zadania o statusie pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmiana nazwy `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usunięcie generacji i powiązanych multimediów (audio, obraz) |

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
| **Alpine.js zamiast React/Vue** | Minimalny narzut, lekka reaktywność z TypeScriptem kompilowanym przez Vite. Idealne rozwiązanie na hackathon, gdzie liczy się szybkość. |
| **Trwałość danych w plikach JSON** | Zero zależności, natychmiastowy start. Brak bazy danych do konfiguracji — uruchamiasz i działa. |
| **Vite + Handlebars** | Najlepsze z obu światów: szybki HMR podczas programowania, szablony częściowe (partials) HTML do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty AI w `prompts.ts` — łatwe iterowanie, testowanie i dostosowywanie według języka/grupy wiekowej. |
| **System wielu generacji** | Każda generacja jest niezależnym obiektem z własnym ID — pozwala na wiele kart powtórkowych, quizów itp. w ramach jednego kursu. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, złożonością i tonem — ta sama treść uczy w inny sposób w zależności od ucznia. |
| **Funkcje oparte na Agentach** | Generowanie obrazów i wyszukiwanie w sieci wykorzystują tymczasowych Agentów Mistral — czysty cykl życia z automatycznym czyszczeniem. |
| **Inteligentny scraping adresów URL** | Jedno pole akceptuje przemieszane adresy URL i słowa kluczowe — adresy URL są scrapowane przez Readability (strony statyczne) z użyciem Lightpanda jako fallbacku (strony JS/SPA), a słowa kluczowe uruchamiają Agenta Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **TTS w 100% od Mistral** | Mistral Voxtral TTS (brak dodatkowego klucza poza `MISTRAL_API_KEY`) — synteza mowy zintegrowana z łańcuchem kosztów i doborem głosu według języka. |

---

## Wykorzystane technologie i podziękowania

- **[Mistral AI](https://mistral.ai)** — Modele AI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Lekki reaktywny framework
- **[TailwindCSS](https://tailwindcss.com)** — Użytkowy framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie do budowania frontendu
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Ekstrakcja treści ze stron internetowych (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralekka przeglądarka headless do scrapowania stron JS/SPA
- **[Luciole](https://luciole-vision.com)** — Czcionka zaprojektowana dla osób słabowidzących, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opcja „Komfort czytania” w profilach)

Projekt zapoczątkowany podczas Mistral AI Worldwide Hackathon (marzec 2026), stworzony w całości przez AI przy użyciu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) oraz [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artykuł przetłumaczony z fr na pl za pomocą gemini-4-argon-high.**
