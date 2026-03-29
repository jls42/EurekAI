<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolne treści w interaktywne doświadczenie nauki — napędzane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Angielski</a> · <a href="README-es.md">🇪🇸 Hiszpański</a> · <a href="README-pt.md">🇧🇷 Portugalski</a> · <a href="README-de.md">🇩🇪 Niemiecki</a> · <a href="README-it.md">🇮🇹 Włoski</a> · <a href="README-nl.md">🇳🇱 Niderlandzki</a> · <a href="README-ar.md">🇸🇦 Arabski</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chiński</a> · <a href="README-ja.md">🇯🇵 Japoński</a> · <a href="README-ko.md">🇰🇷 Koreański</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Rumuński</a> · <a href="README-sv.md">🇸🇪 Szwedzki</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Obejrzyj demo na YouTube"></a>
</p>

<h4 align="center">📊 Jakość kodu</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Stan jakości"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Ocena bezpieczeństwa"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Ocena niezawodności"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Ocena utrzymywalności"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Pokrycie"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Luki bezpieczeństwa"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Problemy w kodzie"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Linie kodu"></a>
</p>

---

## Historia — Dlaczego EurekAI?

**EurekAI** powstało podczas [Ogólnoświatowego Hackathonu Mistral AI](https://luma.com/mistralhack-online) ([strona oficjalna](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — i pomysł przyszedł z czegoś bardzo konkretnego: regularnie przygotowuję moją córkę do sprawdzianów i pomyślałem, że dzięki AI można to uczynić bardziej zabawnym i interaktywnym.

Cel: przyjąć **dowolne wejście** — zdjęcie notatek, skopiowany tekst, nagranie głosowe, wynik wyszukiwania w sieci — i przekształcić je w **karty powtórkowe, fiszki, quizy, podcasty, teksty z lukami, ilustracje i więcej**. Całość napędzana modelami Mistral AI, co czyni rozwiązanie naturalnie dopasowanym do uczniów francuskojęzycznych.

[Pierwotny prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) został przygotowany w 48 godzin podczas hackathonu jako proof of concept wokół usług Mistral — działał, ale był ograniczony. Od tego czasu EurekAI stało się prawdziwym projektem: teksty z lukami, nawigacja po ćwiczeniach, scraping WWW, konfigurowalna moderacja rodzicielska, głęboka rewizja kodu i wiele innych. Cały kod jest generowany przez AI — głównie przez [Claude Code](https://code.claude.com/), z kilkoma wkładami przez [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Funkcjonalności

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import plików** | Importuj swoje lekcje — zdjęcie, PDF (przez Mistral OCR) lub plik tekstowy (TXT, MD) |
| 📝 | **Wprowadzanie tekstu** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Wejście głosowe** | Nagraj się — Voxtral STT transkrybuje twój głos |
| 🌐 | **Web / URL** | Wklej URL (scraping bezpośredni przez Readability + Lightpanda) lub wpisz wyszukiwanie (Agent Mistral web_search) |
| 📄 | **Karty powtórkowe** | Strukturyzowane notatki z punktami kluczowymi, słownictwem, cytatami, anegdotami |
| 🃏 | **Fiszki** | Karty pytanie/odpowiedź z odniesieniami do źródeł dla aktywnego zapamiętywania (liczba konfigurowalna) |
| ❓ | **Quiz (pytania wielokrotnego wyboru)** | Pytania wielokrotnego wyboru z adaptacyjną powtórką błędów (liczba konfigurowalna) |
| ✏️ | **Teksty z lukami** | Ćwiczenia do uzupełnienia z podpowiedziami i tolerancyjną walidacją |
| 🎙️ | **Podcast** | Mini-podcast na 2 głosy w audio — głosy Mistral domyślnie lub głosy spersonalizowane (rodzice!) |
| 🖼️ | **Ilustracje** | Obrazy edukacyjne generowane przez Agenta Mistral |
| 🗣️ | **Quiz głosowy** | Pytania odczytywane na głos (możliwość głosu niestandardowego), odpowiedź ustna, weryfikacja przez AI |
| 💬 | **Tutor AI** | Czat kontekstowy z twoimi dokumentami kursu, z możliwością wywołania narzędzi |
| 🧠 | **Automatyczny router** | Router oparty na `mistral-small-latest` analizuje zawartość i proponuje kombinację generatorów spośród 7 dostępnych typów |
| 🔒 | **Kontrola rodzicielska** | Moderacja konfigurowalna per profil (kategorie konfigurowalne), PIN rodzicielski, ograniczenia czatu |
| 🌍 | **Wielojęzyczny** | Interfejs dostępny w 9 językach; generowanie AI sterowane w 15 językach poprzez prompty |
| 🔊 | **Odtwarzanie na głos** | Odtwarzaj karty i fiszki przez Mistral Voxtral TTS lub ElevenLabs |

---

## Przegląd architektury

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Import fichiers<br/><i>OCR / texte brut</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Web / URL<br/><i>Readability + Lightpanda<br/>ou Agent Mistral</i>"]
    end

    subgraph "🛡️ Modération (async, si activée par profil)"
        MOD["Modération<br/><i>mistral-moderation-latest</i>"]
    end

    CON["📋 Détection de consigne<br/><i>mistral-large-latest</i>"]

    subgraph "🧠 Générateurs IA"
        SUM["📄 Fiche"]
        FC["🃏 Flashcards"]
        QZ["❓ Quiz QCM"]
        FB["✏️ Textes à trous"]
        POD["🎙️ Podcast"]
        IMG["🖼️ Illustration"]
        QV["🗣️ Quiz vocal"]
        CHAT["💬 Tuteur IA"]
    end

    subgraph "📤 Sortie"
        TTS["🔊 TTS<br/><i>Mistral Voxtral / ElevenLabs</i>"]
        JSON["📦 Persistance JSON"]
        UI["🖥️ Interface interactive"]
    end

    OCR & TXT & MIC & WEB --> MOD
    OCR & TXT & MIC & WEB --> CON
    MOD -.->|garde| SUM & FC & QZ & FB & POD & IMG & QV & CHAT
    CON -.->|consigne| SUM & FC & QZ & FB
    POD --> TTS
    QV --> TTS
    SUM & FC -->|lecture à voix haute| TTS
    SUM & FC & QZ & FB & POD & IMG & QV & CHAT --> JSON
    JSON --> UI
    TTS --> UI
```

---

## Mapa użycia modeli

```mermaid
flowchart LR
    subgraph "Modèles Mistral"
        ML["mistral-large-latest"]
        MO["mistral-ocr-latest"]
        MV["voxtral-mini-latest"]
        MMod["mistral-moderation-latest"]
        MS["mistral-small-latest"]
        MTTS["voxtral-mini-tts-latest"]
    end

    subgraph "Tâches"
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Quiz vocal / Textes à trous / Vérification quiz / Consigne"]
        T2["OCR — documents, tableaux, écriture manuscrite (JPG, PNG, PDF)"]
        T3["Reconnaissance vocale — STT optimisé FR"]
        T4["Modération de contenu — filtrage par âge"]
        T5["Routeur automatique — analyse du contenu"]
        T6["Génération d'image — Agent + outil image_generation"]
        T7["Web / URL — Scraping direct ou Agent web_search"]
        T8["Synthèse vocale — podcasts, quiz vocal, lecture à voix haute"]
    end

    ML --> T1
    MO --> T2
    MV --> T3
    MMod --> T4
    MS --> T5
    ML --> T6
    ML --> T7
    MTTS --> T8
```

---

## Ścieżka użytkownika

```mermaid
sequenceDiagram
    actor Élève as Élève
    participant App as EurekAI
    participant AI as Mistral AI
    participant TTS as TTS (Voxtral / ElevenLabs)

    Élève->>App: Créer un profil (nom, âge, avatar)
    Élève->>App: Créer un cours
    Élève->>App: Ajouter des sources (photo / texte / voix / web)
    App->>AI: Modérer le contenu (si activé par profil)
    App->>AI: Détecter les consignes de révision
    Élève->>App: Générer du matériel d'étude
    App->>AI: Fiche / Flashcards / Quiz / Textes à trous / Podcast
    AI-->>App: Réponses JSON structurées
    App->>TTS: Convertir le script podcast en audio
    TTS-->>App: Fichier audio MP3
    Élève->>App: Écouter une fiche ou des flashcards
    App->>TTS: Synthèse TTS du contenu
    TTS-->>App: Audio MP3
    Élève->>App: Passer le quiz
    App->>AI: Réviser les erreurs → nouvelles questions
    Élève->>App: Passer le quiz vocal
    App->>TTS: TTS lit la question à voix haute
    Élève->>App: Répondre à voix haute
    App->>AI: Transcription STT + vérification IA
    Élève->>App: Discuter avec le tuteur IA
    App->>AI: Chat contextuel avec appel d'outils
```

---

## Głębsze spojrzenie — Funkcjonalności

### Wejście multimodalne

EurekAI akceptuje 4 typy źródeł, moderowane zgodnie z profilem (włączone domyślnie dla dziecka i nastolatka):

- **Import plików** — Pliki JPG, PNG lub PDF przetwarzane przez `mistral-ocr-latest` (tekst drukowany, tabele, pismo ręczne), lub pliki tekstowe (TXT, MD) importowane bezpośrednio.
- **Tekst dowolny** — Wpisz lub wklej dowolną treść. Moderowana przed zapisem, jeśli moderacja jest aktywna.
- **Wejście głosowe** — Nagraj audio w przeglądarce. Transkrybowane przez `voxtral-mini-latest`. Ustawienie `language="fr"` optymalizuje rozpoznawanie.
- **Web / URL** — Wklej jedną lub kilka URLi, aby scrapować treść bezpośrednio (Readability + Lightpanda dla stron JS), lub wpisz słowa kluczowe do wyszukiwania webowego przez Agenta Mistral. Pole akceptuje oba rodzaje — URL i słowa kluczowe są automatycznie rozdzielane, każdy wynik tworzy niezależne źródło.

### Generowanie treści przez AI

Siedem typów materiałów edukacyjnych generowanych:

| Generator | Model | Wyjście |
|---|---|---|
| **Karta powtórkowa** | `mistral-large-latest` | Tytuł, podsumowanie, punkty kluczowe, słownictwo, cytaty, anegdota |
| **Fiszki** | `mistral-large-latest` | Karty pytanie/odpowiedź z odniesieniami do źródeł (liczba konfigurowalna) |
| **Quiz (pytania wielokrotnego wyboru)** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjna powtórka (liczba konfigurowalna) |
| **Teksty z lukami** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Scenariusz na 2 głosy → audio MP3 |
| **Ilustracja** | Agent `mistral-large-latest` | Obraz edukacyjny przez narzędzie `image_generation` |
| **Quiz głosowy** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja AI |

### Tutor AI przez czat

Tutor konwersacyjny z pełnym dostępem do dokumentów kursu:

- Wykorzystuje `mistral-large-latest`
- **Wywołanie narzędzi**: może generować karty, fiszki, quizy lub teksty z lukami w trakcie rozmowy
- Historia 50 wiadomości na kurs
- Moderacja treści, jeśli włączona dla profilu

### Automatyczny router

Router wykorzystuje `mistral-small-latest` do analizy treści źródeł i proponuje najbardziej odpowiednie generatory spośród 7 dostępnych. Interfejs pokazuje postęp w czasie rzeczywistym: najpierw faza analizy, potem indywidualne generacje z możliwością anulowania.

### Uczenie adaptacyjne

- **Statystyki quizu**: śledzenie prób i dokładności na pytanie
- **Powtórka quizu**: generuje 5–10 nowych pytań ukierunkowanych na słabe koncepcje
- **Wykrywanie instrukcji**: wykrywa polecenia do powtórki ("Znam lekcję, jeśli potrafię...") i nadaje im priorytet w kompatybilnych generatorach tekstowych (karta, fiszki, quiz, teksty z lukami)

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11–15), student (16–25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-latest` z 10 dostępnymi kategoriami, 5 zablokowanych domyślnie dla dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorie konfigurowalne per profil w ustawieniach.
- **PIN rodzicielski**: hash SHA-256, wymagany dla profili poniżej 15 lat. W produkcji zalecany powolny hash z solą (Argon2id, bcrypt).
- **Ograniczenia czatu**: czat AI wyłączony domyślnie dla osób poniżej 16. roku życia, aktywowany przez rodziców

### System wieloprofilowy

- Wiele profili z imieniem, wiekiem, avatarem, preferencjami językowymi
- Projekty powiązane z profilami przez `profileId`
- Usuwanie kaskadowe: usunięcie profilu usuwa wszystkie jego projekty

### Wielu dostawców TTS & głosy spersonalizowane

- **Mistral Voxtral TTS** (domyślny): `voxtral-mini-tts-latest`, brak dodatkowego klucza wymaganego
- **ElevenLabs** (alternatywa): `eleven_v3`, naturalne głosy, wymaga `ELEVENLABS_API_KEY`
- Dostawca konfigurowalny w ustawieniach aplikacji
- **Głosy spersonalizowane**: rodzice mogą tworzyć własne głosy przez API Mistral Voices (na podstawie próbki audio) i przypisywać je rolom gospodarza/gościa — podcasty i quizy głosowe będą wtedy odtwarzane głosem rodzica, co zwiększa immersję dla dziecka
- Dwie role głosowe konfigurowalne: **gospodarz** (główny narrator) i **gość** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, filtrowalny wg języka

### Internacjonalizacja

- Interfejs dostępny w 9 językach: fr, en, es, pt, it, nl, de, hi, ar
- Prompty AI wspierają 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Język konfigurowalny per profil

---

## Stos technologiczny

| Warstwa | Technologia | Rola |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Serwer i bezpieczeństwo typów |
| **Backend** | Express 5.x | API REST |
| **Serwer deweloperski** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfejs reaktywny, TypeScript kompilowany przez Vite |
| **Templating** | vite-plugin-handlebars | Kompozycja HTML przez partials |
| **AI** | Mistral AI SDK 2.x | Czat, OCR, STT, TTS, Agenci, Moderacja |
| **TTS (domyślnie)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, wbudowana synteza mowy |
| **TTS (alternatywnie)** | ElevenLabs SDK 2.x | `eleven_v3`, naturalne głosy |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Scraping web** | Readability + linkedom | Ekstrakcja głównej zawartości stron WWW (technologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultra-lekki headless browser (Zig + V8) dla stron JS/SPA — fallback scraping |
| **Markdown** | Marked | Renderowanie markdown w czacie |
| **Upload plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Konkatenacja segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Pamięć** | Pliki JSON | Przechowywanie bez zależności |

---

## Przegląd modeli

| Model | Użycie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Karta, Fiszki, Podcast, Quiz, Teksty z lukami, Czat, Weryfikacja quizu głosowego, Agent obrazu, Agent wyszukiwania web, Wykrywanie instrukcji | Najlepsze wielojęzyczne + śledzenie instrukcji |
| `mistral-ocr-latest` | OCR dokumentów | Tekst drukowany, tabele, pismo ręczne |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | STT wielojęzyczne, optymalizowane z `language="fr"` |
| `voxtral-mini-tts-latest` | Synteza mowy (TTS) | Podcasty, quiz głosowy, odtwarzanie na głos |
| `mistral-moderation-latest` | Moderacja treści | 5 kategorii zablokowanych dla dziecka/nastolatka (+ jailbreaking) |
| `mistral-small-latest` | Router automatyczny | Szybka analiza treści dla decyzji routingowych |
| `eleven_v3` (ElevenLabs) | Synteza mowy (alternatywny TTS) | Naturalne głosy, alternatywa konfigurowalna |

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
#   MISTRAL_API_KEY=votre_clé_ici           (requis)
#   ELEVENLABS_API_KEY=votre_clé_ici        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Uwaga** : Mistral Voxtral TTS jest domyślnym dostawcą — nie jest wymagany żaden dodatkowy klucz poza `MISTRAL_API_KEY`. ElevenLabs to alternatywny dostawca TTS konfigurowalny w ustawieniach.

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
  tts.ts                  — Génération audio podcast (concaténation de segments)
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

## Referencje API

### Konfiguracja
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/config` | Aktualna konfiguracja |
| `PUT` | `/api/config` | Zmodyfikuj konfigurację (modele, głosy, dostawca TTS) |
| `GET` | `/api/config/status` | Status API (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Zresetuj konfigurację do domyślnej |
| `GET` | `/api/config/voices` | Lista dostępnych głosów Mistral TTS (opcjonalnie `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Kategorie moderacji dostępne + domyślne według wieku |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Wypisz wszystkie profile |
| `POST` | `/api/profiles` | Utwórz profil |
| `PUT` | `/api/profiles/:id` | Modyfikuj profil (PIN wymagany dla < 15 lat) |
| `DELETE` | `/api/profiles/:id` | Usuń profil + kaskada projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Wypisz projekty (`?profileId=` opcjonalnie) |
| `POST` | `/api/projects` | Utwórz projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu |
| `PUT` | `/api/projects/:pid` | Zmień nazwę `{name}` |
| `DELETE` | `/api/projects/:pid` | Usuń projekt |

### Źródła
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, odczyt bezpośredni dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Tekst dowolny `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL lub wyszukiwanie web `{query}` — zwraca tablicę źródeł |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usuń źródło |
| `POST` | `/api/projects/:pid/moderate` | Moderuj `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykryj instrukcje powtórki | ### Generowanie
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fiszka do powtórki |
| `POST` | `/api/projects/:pid/generate/flashcards` | Fiszki |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz wielokrotnego wyboru |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Powtórka adaptacyjna `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczne generowanie backend (routing + 5 typów: summary, flashcards, quiz, fill-blank, podcast) |

Wszystkie trasy generowania akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` wymaga dodatkowo `{generationId, weakQuestions}`.

### CRUD Generacji
| Metoda | Endpoint | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Prześlij odpowiedzi quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Prześlij odpowiedzi do tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Sprawdź odpowiedź ustną (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odtwarzanie TTS na głos (fiszki/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmień nazwę `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usuń generację |

### Czat
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Pobierz historię czatu |
| `POST` | `/api/projects/:pid/chat` | Wyślij wiadomość `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Wyczyść historię czatu |

---

## Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| **Alpine.js zamiast React/Vue** | Minimalny ślad, lekka reaktywność dzięki TypeScript kompilowanemu przez Vite. Idealne na hackathon, gdzie liczy się szybkość. |
| **Przechowywanie w plikach JSON** | Zero zależności, natychmiastowy start. Brak bazy danych do skonfigurowania — uruchamiamy i działamy. |
| **Vite + Handlebars** | Najlepsze z obu światów: szybki HMR do developmentu, fragmenty HTML do organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompty AI w `prompts.ts` — łatwe do iteracji, testowania i dostosowania wg języka/grupy wiekowej. |
| **System wielu generacji** | Każda generacja jest niezależnym obiektem z własnym ID — umożliwia wiele fiszek, quizów itp. na kurs. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, złożonością i tonem — ta sama treść uczy inaczej w zależności od ucznia. |
| **Funkcje oparte na Agentach** | Generowanie obrazów i wyszukiwanie w sieci używają tymczasowych Agentów Mistral — własny cykl życia z automatycznym sprzątaniem. |
| **Inteligentne scrapowanie URL** | Jedno pole akceptuje mieszaninę URL i słów kluczowych — URL-e są scrapowane przez Readability (strony statyczne) z fallbackem Lightpanda (strony JS/SPA), słowa kluczowe uruchamiają Agenta Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **TTS z wieloma dostawcami** | Mistral Voxtral TTS domyślnie (bez dodatkowego klucza), ElevenLabs jako alternatywa — konfigurowalne bez restartu. |

---

## Podziękowania i źródła

- **[Mistral AI](https://mistral.ai)** — Modele SI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternatywny silnik syntezy mowy (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lekki reaktywny framework
- **[TailwindCSS](https://tailwindcss.com)** — Narzędziowy framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie do budowy frontendu
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Ekstrakcja treści z sieci (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultra-lekki headless browser do scrapowania stron JS/SPA

Zainicjowane podczas Mistral AI Worldwide Hackathon (marzec 2026), w pełni rozwinięte przez SI z użyciem [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu gpt-5-mini. Aby uzyskać więcej informacji na temat procesu tłumaczenia, zobacz https://gitlab.com/jls42/ai-powered-markdown-translator**

