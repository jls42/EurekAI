<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Przekształć dowolną treść w interaktywne doświadczenie nauki — napędzane przez <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Angielski</a> · <a href="README-es.md">🇪🇸 Hiszpański</a> · <a href="README-pt.md">🇧🇷 Portugalski</a> · <a href="README-de.md">🇩🇪 Niemiecki</a> · <a href="README-it.md">🇮🇹 Włoski</a> · <a href="README-nl.md">🇳🇱 Niderlandzki</a> · <a href="README-ar.md">🇸🇦 Arabski</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chiński</a> · <a href="README-ja.md">🇯🇵 Japoński</a> · <a href="README-ko.md">🇰🇷 Koreański</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Rumuński</a> · <a href="README-sv.md">🇸🇪 Szwedzki</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstracja YouTube"></a>
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

---

## Historia — Dlaczego EurekAI?

**EurekAI** powstało podczas [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([strona oficjalna](https://worldwide-hackathon.mistral.ai/)) (marzec 2026). Potrzebowałem tematu — a pomysł pojawił się z czegoś bardzo konkretnego: regularnie przygotowuję sprawdziany z moją córką i pomyślałem, że dzięki AI można to uczynić bardziej zabawnym i interaktywnym.

Cel: wziąć **dowolne wejście** — zdjęcie lekcji, tekst skopiowany i wklejony, nagranie głosowe, wyszukiwanie w sieci — i przekształcić je w **fiszki, flashcardy, quizy, podcasty, teksty z brakami, ilustracje i więcej**. Wszystko napędzane modelami Mistral AI, co czyni to rozwiązanie naturalnie dopasowanym do uczniów francuskojęzycznych.

[Pierwotny prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) został stworzony w 48 godzin podczas hackathonu jako proof of concept wokół usług Mistral — już działający, ale ograniczony. Od tego czasu EurekAI stało się prawdziwym projektem: teksty z brakami, nawigacja w ćwiczeniach, scraping webowy, konfigurowalna moderacja rodzicielska, dogłębne przeglądy kodu i wiele więcej. Cały kod jest generowany przez AI — głównie przez [Claude Code](https://code.claude.com/), z kilkoma wkładami przez [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Funkcje

| | Funkcja | Opis |
|---|---|---|
| 📷 | **Import de fichiers** | Importuj swoje lekcje — zdjęcie, PDF (przez Mistral OCR) lub plik tekstowy (TXT, MD) |
| 📝 | **Saisie texte** | Wpisz lub wklej dowolny tekst bezpośrednio |
| 🎤 | **Entrée vocale** | Nagraj się — Voxtral STT transkrybuje twój głos |
| 🌐 | **Web / URL** | Wklej URL (scraping bezpośredni przez Readability + Lightpanda) lub wpisz zapytanie (Agent Mistral web_search) |
| 📄 | **Fiches de révision** | Zorganizowane notatki z kluczowymi punktami, słownictwem, cytatami, anegdotami |
| 🃏 | **Flashcards** | Interaktywne karty Q/A, dialogowe odczyty audio |
| ❓ | **Quiz QCM** | Pytania wielokrotnego wyboru z adaptacyjną powtórką błędów (liczba konfigurowalna) |
| ✏️ | **Textes à trous** | Ćwiczenia z uzupełnianiem luk z podpowiedziami i tolerancyjną walidacją |
| 🎙️ | **Podcast** | Mini-podcast na 2 głosy w formacie audio — głosy Mistral domyślnie lub głosy personalizowane (rodzice!) |
| 🖼️ | **Illustrations** | Obrazy edukacyjne generowane przez Agenta Mistral |
| 🗣️ | **Quiz vocal** | Pytania czytane na głos (możliwość głosu niestandardowego), odpowiedź ustna, weryfikacja przez AI |
| 💬 | **Tuteur IA** | Czat kontekstowy z dostępem do Twoich dokumentów kursowych, z możliwością wywołania narzędzi |
| 🧠 | **Routeur automatique** | Router oparty na `mistral-small-latest` analizuje zawartość i proponuje kombinację generatorów spośród 7 dostępnych typów |
| 🔒 | **Contrôle parental** | Konfigurowalna moderacja według profilu (kategorie personalizowalne), PIN rodzica, ograniczenia czatu |
| 🌍 | **Multilingue** | Interfejs dostępny w 9 językach; generacja AI możliwa w 15 językach za pomocą promptów |
| 🔊 | **Lecture à voix haute** | Odtwarzaj fiszki i flashcardy (dialog pytanie/odpowiedź) przez Mistral Voxtral TTS lub ElevenLabs |

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

## Głębsze spojrzenie — Funkcje

### Wejście multimodalne

EurekAI akceptuje 4 typy źródeł, moderowane zgodnie z profilem (włączone domyślnie dla dziecka i nastolatka):

- **Import de fichiers** — Pliki JPG, PNG lub PDF przetwarzane przez `mistral-ocr-latest` (tekst drukowany, tabele, pismo ręczne), lub pliki tekstowe (TXT, MD) importowane bezpośrednio.
- **Texte libre** — Wpisz lub wklej dowolną treść. Moderowane przed zapisaniem, jeśli moderacja jest aktywna.
- **Entrée vocale** — Nagraj audio w przeglądarce. Transkrybowane przez `voxtral-mini-latest`. Ustawienie `language="fr"` optymalizuje rozpoznawanie.
- **Web / URL** — Wklej jedną lub kilka URLi, aby zebrać treść bezpośrednio (Readability + Lightpanda dla stron JS), lub wpisz słowa kluczowe do wyszukiwania przez Agent Mistral. Pojedyncze pole obsługuje oba — URL i słowa kluczowe są oddzielane automatycznie, każdy wynik tworzy niezależne źródło.

### Generowanie treści przez AI

Siedem typów materiałów edukacyjnych generowanych:

| Generator | Model | Wyjście |
|---|---|---|
| **Fiche de révision** | `mistral-large-latest` | Tytuł, streszczenie, punkty kluczowe, słownictwo, cytaty, anegdota |
| **Flashcards** | `mistral-large-latest` | Karty Q/A z odniesieniami do źródeł (liczba konfigurowalna) |
| **Quiz QCM** | `mistral-large-latest` | Pytania wielokrotnego wyboru, wyjaśnienia, adaptacyjna powtórka (liczba konfigurowalna) |
| **Textes à trous** | `mistral-large-latest` | Zdania do uzupełnienia z podpowiedziami, tolerancyjna walidacja (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skrypt na 2 głosy → audio MP3 |
| **Illustration** | Agent `mistral-large-latest` | Obraz edukacyjny przez narzędzie `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Pytania TTS → odpowiedź STT → weryfikacja przez AI |

### Opiekun AI przez czat

Czatowy opiekun z pełnym dostępem do dokumentów kursowych:

- Używa `mistral-large-latest`
- **Wywoływanie narzędzi**: może generować fiszki, flashcardy, quizy lub teksty z brakami podczas rozmowy
- Historia 50 wiadomości na kurs
- Moderacja treści, jeśli jest włączona dla profilu

### Automatyczny router

Router używa `mistral-small-latest` do analizy zawartości źródeł i proponuje najbardziej odpowiednie generatory spośród 7 dostępnych. Interfejs pokazuje postęp w czasie rzeczywistym: najpierw faza analizy, potem indywidualne generacje z możliwością anulowania.

### Uczenie adaptacyjne

- **Statystyki quizu**: śledzenie prób i dokładności na pytanie
- **Powtórka quizu**: generuje 5–10 nowych pytań ukierunkowanych na słabe pojęcia
- **Wykrywanie poleceń**: wykrywa instrukcje odnośnie powtórki ("Je sais ma leçon si je sais...") i priorytetyzuje je w kompatybilnych generatorach tekstowych (fiszka, flashcards, quiz, textes à trous)

### Bezpieczeństwo i kontrola rodzicielska

- **4 grupy wiekowe**: dziecko (≤10 lat), nastolatek (11–15), uczeń (16–25), dorosły (26+)
- **Moderacja treści**: `mistral-moderation-latest` z 10 dostępnymi kategoriami, 5 zablokowanych domyślnie dla dziecka/nastolatka (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorie możliwe do personalizacji w ustawieniach profilu.
- **PIN rodzica**: hash SHA-256, wymagany dla profili poniżej 15 lat. W produkcyjnym wdrożeniu zaleca się użycie hashy wolnych z saltem (Argon2id, bcrypt).
- **Ograniczenia czatu**: czat AI wyłączony domyślnie dla osób poniżej 16 lat, możliwy do włączenia przez rodziców

### System wielu profili

- Wiele profili z imieniem, wiekiem, awatarem, preferencjami językowymi
- Projekty powiązane z profilami przez `profileId`
- Usuwanie kaskadowe: usunięcie profilu usuwa wszystkie jego projekty

### Wielu dostawców TTS i głosy spersonalizowane

- **Mistral Voxtral TTS** (domyślnie): `voxtral-mini-tts-latest`, brak dodatkowego klucza wymaganego
- **ElevenLabs** (alternatywa): `eleven_v3`, głosy naturalne, wymaga `ELEVENLABS_API_KEY`
- Dostawca konfigurowalny w ustawieniach aplikacji
- **Głosy personalizowane**: rodzice mogą tworzyć własne głosy przez API Mistral Voices (na podstawie próbki audio) i przypisywać je do ról gospodarza/gościa — podcasty i quizy głosowe są wtedy odtwarzane głosem rodzica, co zwiększa immersję dla dziecka
- Dwie role głosowe konfigurowalne: **hôte** (gospodarz) i **invité** (drugi głos podcastu)
- Pełny katalog głosów Mistral dostępny w ustawieniach, możliwy do filtrowania wg języka

### Internacjonalizacja

- Interfejs dostępny w 9 językach: fr, en, es, pt, it, nl, de, hi, ar
- Prompty AI obsługują 15 języków (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
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
| **IA** | Mistral AI SDK 2.x | Czat, OCR, STT, TTS, Agenci, Moderacja |
| **TTS (domyślnie)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, wbudowana synteza mowy |
| **TTS (alternatywnie)** | ElevenLabs SDK 2.x | `eleven_v3`, głosy naturalne |
| **Ikony** | Lucide 1.x | Biblioteka ikon SVG |
| **Scraping web** | Readability + linkedom | Ekstrakcja głównej treści stron (technologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultra-lekki headless browser (Zig + V8) dla stron JS/SPA — fallback scraping |
| **Markdown** | Marked | Renderowanie markdown w czacie |
| **Upload plików** | Multer 2.x | Obsługa formularzy multipart |
| **Audio** | ffmpeg-static | Konkatenacja segmentów audio |
| **Testy** | Vitest | Testy jednostkowe — pokrycie mierzone przez SonarCloud |
| **Persistencja** | Pliki JSON | Przechowywanie bez zależności |

---

## Referencja modeli

| Model | Zastosowanie | Dlaczego |
|---|---|---|
| `mistral-large-latest` | Fiszka, Flashcards, Podcast, Quiz, Textes à trous, Czat, Weryfikacja quizu głosowego, Agent obrazu, Agent wyszukiwania web, Wykrywanie poleceń | Najlepszy multilingual + podążanie za instrukcjami |
| `mistral-ocr-latest` | OCR dokumentów | Tekst drukowany, tabele, pismo ręczne |
| `voxtral-mini-latest` | Rozpoznawanie mowy (STT) | STT wielojęzyczne, optymalizowane z `language="fr"` |
| `voxtral-mini-tts-latest` | Synteza mowy (TTS) | Podcasty, quiz głosowy, czytanie na głos |
| `mistral-moderation-latest` | Moderacja treści | 5 kategorii zablokowanych dla dziecka/nastolatka (+ jailbreak) |
| `mistral-small-latest` | Automatyczny router | Szybka analiza treści do decyzji routingu |
| `eleven_v3` (ElevenLabs) | Synteza mowy (alternatywne TTS) | Głosy naturalne, alternatywa konfigurowalna |

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
#   ELEVENLABS_API_KEY=<your_api_key>        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Uwaga** : Mistral Voxtral TTS jest domyślnym dostawcą — nie jest potrzebny dodatkowy klucz poza `MISTRAL_API_KEY`. ElevenLabs to alternatywny dostawca TTS konfigurowalny w ustawieniach.

---

## Wdrażanie z kontenerem

Obraz jest opublikowany w **GitHub Container Registry** :

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

> **`:U`** to flaga Podman rootless, która automatycznie dopasowuje uprawnienia wolumenu.
> **`ELEVENLABS_API_KEY`** jest opcjonalne (alternatywne TTS).

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
| `GET` | `/api/config` | Bieżąca konfiguracja |
| `PUT` | `/api/config` | Modyfikuj konfigurację (modele, głosy, dostawca TTS) |
| `GET` | `/api/config/status` | Status API (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Zresetuj konfigurację do domyślnej |
| `GET` | `/api/config/voices` | Lista głosów Mistral TTS (opcjonalne `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Kategorie moderacji dostępne + domyślne wg wieku |

### Profile
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/profiles` | Wyświetl wszystkie profile |
| `POST` | `/api/profiles` | Utwórz profil |
| `PUT` | `/api/profiles/:id` | Edytuj profil (PIN wymagany dla < 15 lat) |
| `DELETE` | `/api/profiles/:id` | Usuń profil + kaskada projektów `{pin?}` → `{ok, deletedProjects}` |

### Projekty
| Metoda | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/projects` | Lista projektów (`?profileId=` opcjonalne) |
| `POST` | `/api/projects` | Utwórz projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Szczegóły projektu |
| `PUT` | `/api/projects/:pid` | Zmień nazwę `{name}` |
| `DELETE` | `/api/projects/:pid` | Usuń projekt | ### Źródła
| Metoda | Punkt końcowy | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import plików multipart (OCR dla JPG/PNG/PDF, bezpośrednie odczytywanie dla TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Tekst dowolny `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Głos STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scrapowanie URL lub wyszukiwanie w sieci `{query}` — zwraca tablicę źródeł |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Usunąć źródło |
| `POST` | `/api/projects/:pid/moderate` | Moderować `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wykryć wskazówki do powtórki |

### Generowanie
| Metoda | Punkt końcowy | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Karta powtórkowa |
| `POST` | `/api/projects/:pid/generate/flashcards` | Fiszki |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz wielokrotnego wyboru (QCM) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Teksty z lukami |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustracja |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz głosowy |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptacyjna powtórka `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analiza routingu (plan generatorów do uruchomienia) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatyczne generowanie backendu (routing + 5 typów: streszczenie, fiszki, quiz, uzupełnianie luk, podcast) |

Wszystkie trasy generowania akceptują `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` wymaga dodatkowo `{generationId, weakQuestions}`.

### CRUD Generacji
| Metoda | Punkt końcowy | Opis |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Przesłać odpowiedzi z quizu `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Przesłać odpowiedzi do tekstów z lukami `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Weryfikować odpowiedź ustną (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Odtwarzanie TTS na głos (karty/fiszki) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Zmienić nazwę `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Usunąć generację |

### Czat
| Metoda | Punkt końcowy | Opis |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Pobrać historię czatu |
| `POST` | `/api/projects/:pid/chat` | Wysłać wiadomość `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Wyczyścić historię czatu |

---

## Decyzje architektoniczne

| Decyzja | Uzasadnienie |
|---|---|
| **Alpine.js zamiast React/Vue** | Minimalny ślad, lekka reaktywność z TypeScript kompilowanym przez Vite. Idealne na hackathon, gdzie liczy się szybkość. |
| **Przechowywanie w plikach JSON** | Brak zależności, natychmiastowy start. Żadnej bazy danych do skonfigurowania — uruchamiasz i gotowe. |
| **Vite + Handlebars** | Najlepsze z obu światów: szybki HMR dla dewelopmentu, partiale HTML dla organizacji kodu, Tailwind JIT. |
| **Scentralizowane prompty** | Wszystkie prompt'y SI w `prompts.ts` — łatwe do iteracji, testowania i dostosowania do języka/grupy wiekowej. |
| **System wielogeneracyjny** | Każda generacja jest niezależnym obiektem z własnym ID — pozwala na wiele kart, quizów itd. w ramach kursu. |
| **Prompty dostosowane do wieku** | 4 grupy wiekowe z różnym słownictwem, złożonością i tonem — ta sama treść uczy inaczej w zależności od ucznia. |
| **Funkcje oparte na Agentach** | Generowanie obrazów i wyszukiwanie w sieci używają tymczasowych Agentów Mistral — czysty cykl życia z automatycznym sprzątaniem. |
| **Inteligentne scrapowanie URL-i** | Jedno pole akceptuje mieszane URL-e i słowa kluczowe — URL-e są scrapowane przez Readability (strony statyczne) z fallbackiem Lightpanda (strony JS/SPA), słowa kluczowe uruchamiają Agenta Mistral web_search. Każdy wynik tworzy niezależne źródło. |
| **Wielodostawczy TTS** | Domyślnie Mistral Voxtral TTS (bez dodatkowego klucza), ElevenLabs jako alternatywa — konfigurowalne bez restartu. |

---

## Podziękowania i źródła

- **[Mistral AI](https://mistral.ai)** — Modele SI (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternatywny silnik syntezy mowy (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lekki framework reaktywny
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first framework CSS
- **[Vite](https://vitejs.dev)** — Narzędzie do budowania frontendu
- **[Lucide](https://lucide.dev)** — Biblioteka ikon
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Ekstrakcja treści webowej (technologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultra-lekki headless browser do scrapowania stron JS/SPA

Rozpoczęty podczas Mistral AI Worldwide Hackathon (marzec 2026), opracowany w całości przez SI przy użyciu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) i [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencja

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Ten dokument został przetłumaczony z wersji fr na język pl przy użyciu modelu gpt-5-mini. Aby uzyskać więcej informacji o procesie tłumaczenia, zobacz https://gitlab.com/jls42/ai-powered-markdown-translator**

