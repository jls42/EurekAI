<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandelt beliebige Inhalte in interaktive Lernerlebnisse — angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Englisch</a> · <a href="README-es.md">🇪🇸 Spanisch</a> · <a href="README-pt.md">🇧🇷 Portugiesisch</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italienisch</a> · <a href="README-nl.md">🇳🇱 Niederländisch</a> · <a href="README-ar.md">🇸🇦 Arabisch</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chinesisch</a> · <a href="README-ja.md">🇯🇵 Japanisch</a> · <a href="README-ko.md">🇰🇷 Koreanisch</a> · <a href="README-pl.md">🇵🇱 Polnisch</a> · <a href="README-ro.md">🇷🇴 Rumänisch</a> · <a href="README-sv.md">🇸🇪 Schwedisch</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Demo_ansehen-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-Demo"></a>
</p>

<h4 align="center">📊 Codequalität</h4>

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

## Die Geschichte — Warum EurekAI?

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Seite](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam von etwas sehr Konkretem: Ich bereite regelmäßig Tests mit meiner Tochter vor und dachte, dass es möglich sein müsste, das mithilfe von KI spielerischer und interaktiver zu gestalten.

Ziel: Beliebige Eingaben nehmen — ein Foto der Lektion, kopierter Text, eine Sprachaufnahme, eine Websuche — und diese in **Lernzusammenfassungen, Karteikarten, Quiz, Podcasts, Lückentexte, Illustrationen und mehr** verwandeln. Alles betrieben mit den französischen Modellen von Mistral AI, wodurch die Lösung natürlich gut für französischsprachige Schülerinnen und Schüler geeignet ist.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde in 48 Stunden während des Hackathons als Proof-of-Concept rund um die Dienste von Mistral entwickelt — bereits funktionsfähig, aber eingeschränkt. Seitdem ist EurekAI zu einem echten Projekt geworden: Lückentexte, Navigation in Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliche Code-Reviews und mehr. Der gesamte Code wurde von KI generiert — hauptsächlich mit [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Dateiimport** | Importieren Sie Ihre Lektionen — Foto, PDF (via Mistral OCR) oder Textdatei (TXT, MD) |
| 📝 | **Texteingabe** | Tippen oder fügen Sie beliebigen Text direkt ein |
| 🎤 | **Sprachaufnahme** | Nehmen Sie sich auf — Voxtral STT transkribiert Ihre Stimme |
| 🌐 | **Web / URL** | Fügen Sie eine URL ein (direktes Scraping via Readability + Lightpanda) oder geben Sie eine Suche ein (Agent Mistral web_search) |
| 📄 | **Lernzusammenfassungen** | Strukturierte Notizen mit Schlüsselpunkten, Vokabular, Zitaten, Anekdoten |
| 🃏 | **Karteikarten** | Q/A-Karten mit Quellenreferenzen für aktives Lernen (Anzahl konfigurierbar) |
| ❓ | **Multiple-Choice-Quiz** | Multiple-Choice-Fragen mit adaptiver Fehlerüberprüfung (Anzahl konfigurierbar) |
| ✏️ | **Lückentexte** | Auszufüllende Übungen mit Hinweisen und toleranter Validierung |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio — Mistral-Stimmen standardmäßig oder personalisierte Stimmen (Eltern!) |
| 🖼️ | **Illustrationen** | Pädagogische Bilder, generiert von einem Mistral-Agent |
| 🗣️ | **Sprachliches Quiz** | Fragen, die laut vorgelesen werden (benutzerdefinierte Stimme möglich), mündliche Antwort, KI-Überprüfung |
| 💬 | **KI-Tutor** | Kontextbasierter Chat mit Ihren Kursdokumenten und Toolaufrufen |
| 🧠 | **Automatischer Router** | Ein Router auf Basis von `mistral-small-latest` analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 7 verfügbaren Typen vor |
| 🔒 | **Elterliche Kontrolle** | Konfigurierbare Moderation pro Profil (anpassbare Kategorien), Eltern-PIN, Chat-Beschränkungen |
| 🌍 | **Mehrsprachig** | Oberfläche in 9 Sprachen verfügbar; KI-Generierung in 15 Sprachen über Prompts steuerbar |
| 🔊 | **Vorlesen** | Hören Sie Zusammenfassungen und Karteikarten via Mistral Voxtral TTS oder ElevenLabs |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architekturübersicht" width="800" />
</p>

---

## Übersicht der Modellzuordnung

<p align="center">
  <img src="public/assets/model-map.webp" alt="Zuordnung Modelle zu Aufgaben" width="800" />
</p>

---

## Nutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernreise der Schülerin / des Schülers" width="800" />
</p>

---

## Tiefere Einblicke — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Quelltypen, moderiert je nach Profil (standardmäßig für Kind und Teenager aktiviert):

- **Dateiimport** — JPG-, PNG- oder PDF-Dateien werden von `mistral-ocr-latest` verarbeitet (gedruckter Text, Tabellen, Handschrift), oder Textdateien (TXT, MD) werden direkt importiert.
- **Freitext** — Tippen oder Einfügen beliebiger Inhalte. Bei aktiver Moderation wird vor der Speicherung moderiert.
- **Sprachaufnahme** — Nehmen Sie im Browser Audio auf. Transkribiert von `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Fügen Sie eine oder mehrere URLs ein, um Inhalte direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder geben Sie Stichworte für eine Websuche via Agent Mistral ein. Das Eingabefeld akzeptiert beides — URLs und Stichworte werden automatisch getrennt, jedes Ergebnis erzeugt eine eigene Quelle.

### KI-Inhaltserstellung

Sieben Typen erzeugter Lernmaterialien:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzusammenfassung** | `mistral-large-latest` | Titel, Zusammenfassung, Schlüsselpunkte, Vokabular, Zitate, Anekdote |
| **Karteikarten** | `mistral-large-latest` | Q/A-Karten mit Quellenverweisen (Anzahl konfigurierbar) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Multiple-Choice-Fragen, Erklärungen, adaptive Wiederholung (Anzahl konfigurierbar) |
| **Lückentexte** | `mistral-large-latest` | Auszufüllende Sätze mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | 2-Stimmen-Skript → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Pädagogisches Bild via Tool `image_generation` |
| **Sprachliches Quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Überprüfung |

### KI-Tutor per Chat

Ein konversationeller Tutor mit vollem Zugriff auf Kursdokumente:

- Nutzt `mistral-large-latest`
- **Toolaufrufe** : kann während des Gesprächs Zusammenfassungen, Karteikarten, Quiz oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Inhaltsmoderation, falls für das Profil aktiviert

### Automatischer Router

Der Router verwendet `mistral-small-latest` zur Analyse der Quelleninhalte und schlägt die passendsten Generatoren aus den 7 verfügbaren vor. Die Oberfläche zeigt den Fortschritt in Echtzeit: zuerst eine Analysephase, dann die einzelnen Generierungen mit möglicher Abbruchsoption.

### Adaptives Lernen

- **Quiz-Statistiken** : Verfolgung von Versuchen und Genauigkeit pro Frage
- **Quiz-Revision** : Generiert 5–10 neue Fragen, die auf schwache Konzepte abzielen
- **Anweisungs-Erkennung** : Erkennt Wiederholungsanweisungen ("Ich weiß meine Lektion, wenn ich ... kann") und priorisiert diese in kompatiblen Textgeneratoren (Zusammenfassung, Karteikarten, Quiz, Lückentexte)

### Sicherheit & elterliche Kontrolle

- **4 Altersgruppen** : Kind (≤10 Jahre), Teenager (11–15), Studierende (16–25), Erwachsene (26+)
- **Inhaltsmoderation** : `mistral-moderation-latest` mit 10 verfügbaren Kategorien, 5 standardmäßig für Kind/Teenager blockiert (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorien pro Profil anpassbar in den Einstellungen.
- **Eltern-PIN** : SHA-256-Hash, erforderlich für Profile unter 15 Jahren. Für den Produktionseinsatz einen langsamen Hash mit Salt (Argon2id, bcrypt) vorsehen.
- **Chat-Beschränkungen** : KI-Chat standardmäßig für unter 16-Jährige deaktiviert, durch Eltern aktivierbar

### Multi-Profil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- Projekte pro Profil verknüpft via `profileId`
- Kaskadierende Löschung : Löschen eines Profils entfernt alle zugehörigen Projekte

### TTS Multi-Provider & personalisierte Stimmen

- **Mistral Voxtral TTS** (Standard) : `voxtral-mini-tts-latest`, keine zusätzliche Key erforderlich
- **ElevenLabs** (Alternative) : `eleven_v3`, natürliche Stimmen, erfordert `ELEVENLABS_API_KEY`
- Provider in den App-Einstellungen konfigurierbar
- **Personalisierte Stimmen** : Eltern können eigene Stimmen über die Mistral Voices API (aus einer Audioprobe) erstellen und diesen die Rollen Host/Gast zuweisen — Podcasts und Sprach-Quiz werden dann mit der Stimme eines Elternteils abgespielt, was das Erlebnis für das Kind immersiver macht
- Zwei konfigurierbare Sprachrollen : **Host** (Hauptsprecher) und **Gast** (zweite Podcast-Stimme)
- Vollständiger Katalog der Mistral-Stimmen in den Einstellungen, nach Sprache filterbar

### Internationalisierung

- Oberfläche in 9 Sprachen verfügbar: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache pro Profil konfigurierbar

---

## Technologiestack

| Ebene | Technologie | Aufgabe |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typensicherheit |
| **Backend** | Express 5.x | REST-API |
| **Dev-Server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partial-Rendering, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, TypeScript von Vite kompiliert |
| **Templating** | vite-plugin-handlebars | HTML-Zusammenstellung mittels Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS (Standard)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **TTS (Alternative)** | ElevenLabs SDK 2.x | `eleven_v3`, natürliche Stimmen |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Firefox Reader View Technologie) |
| **Headless-Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS/SPA-Seiten — Fallback-Scraping |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Uploads** | Multer 2.x | Multipart-Formular-Verarbeitung |
| **Audio** | ffmpeg-static | Zusammensetzen von Audio-Segmenten |
| **Tests** | Vitest | Unit-Tests — Coverage gemessen via SonarCloud |
| **Persistenz** | JSON-Dateien | Speicherung ohne Abhängigkeit |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Zusammenfassungen, Karteikarten, Podcast, Quiz, Lückentexte, Chat, Prüfung sprachlicher Quiz-Antworten, Image-Agent, Web-Search-Agent, Anweisungserkennung | Beste Multilingualität + gutes Instruktions-Following |
| `mistral-ocr-latest` | OCR von Dokumenten | Gedruckter Text, Tabellen, Handschrift |
| `voxtral-mini-latest` | Spracherkennung (STT) | Multilinguales STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, sprachliches Quiz, Vorlesen |
| `mistral-moderation-latest` | Inhaltsmoderation | 5 für Kind/Teenager blockierte Kategorien (+ Jailbreaking-Erkennung) |
| `mistral-small-latest` | Automatischer Router | Schnelle Inhaltsanalyse zur Routing-Entscheidung |
| `eleven_v3` (ElevenLabs) | Sprachsynthese (alternative TTS) | Natürliche Stimmen, alternative Konfiguration |

---

## Schnellstart

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

> **Hinweis** : Mistral Voxtral TTS ist der Standardprovider — es ist kein zusätzlicher Schlüssel erforderlich außer `MISTRAL_API_KEY`. ElevenLabs ist ein konfigurierbarer alternativer TTS-Provider in den Einstellungen.

---

## Projektstruktur

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

## API-Referenz

### Konfiguration
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Provider) |
| `GET` | `/api/config/status` | API-Status (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Konfiguration auf Standard zurücksetzen |
| `GET` | `/api/config/voices` | Liste der Mistral-TTS-Stimmen (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Altersstandards |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Profil erstellen |
| `PUT` | `/api/profiles/:id` | Profil bearbeiten (PIN erforderlich für < 15 Jahre) |
| `DELETE` | `/api/profiles/:id` | Profil löschen + kaskadierende Projektlöschung `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Projekt erstellen `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetails |
| `PUT` | `/api/projects/:pid` | Umbenennen `{name}` |
| `DELETE` | `/api/projects/:pid` | Projekt löschen |

### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Datei-Import (OCR für JPG/PNG/PDF, direkte Lesung für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Sprach-STT (Audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Quelle löschen |
| `POST` | `/api/projects/:pid/moderate` | Moderieren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Anweisungen zur Wiederholung erkennen | ### Generierung
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernblatt |
| `POST` | `/api/projects/:pid/generate/flashcards` | Karteikarten |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprachquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der zu startenden Generatoren) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Backend-Generierung (Routing + 5 Typen: Zusammenfassung, Karteikarten, Quiz, Lückentext, Podcast) |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` benötigt außerdem `{generationId, weakQuestions}`.

### CRUD Generierungen
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort prüfen (Audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Vorlese-Funktion (Lernblätter/Karteikarten) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Umbenennen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generierung löschen |

### Chat
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Eine Nachricht senden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatverlauf löschen |

---

## Architekturentscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Geringer Fußabdruck, leichte Reaktivität mit TypeScript, kompiliert durch Vite. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Keine Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren — einfach starten und loslegen. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partialtemplates zur Organisation des Codes, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — einfach zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungssystem** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — ermöglicht mehrere Lernblätter, Quiz usw. pro Kurs. |
| **Altersgerechte Prompts** | 4 Altersgruppen mit unterschiedlichem Wortschatz, Komplexität und Ton — derselbe Inhalt lehrt je nach Lernendem unterschiedlich. |
| **Agent-basierte Funktionen** | Bildgenerierung und Websuche verwenden temporäre Mistral-Agents — eigener Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert URLs und gemischte Schlüsselwörter — URLs werden via Readability (statische Seiten) gescraped mit Fallback auf Lightpanda (JS/SPA-Seiten), Schlüsselwörter lösen einen Mistral-Agent web_search aus. Jedes Ergebnis erzeugt eine eigene Quelle. |
| **Multi-Provider TTS** | Mistral Voxtral TTS standardmäßig (kein zusätzlicher Schlüssel), ElevenLabs als Alternative — konfigurierbar ohne Neustart. |

---

## Credits & Danksagungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternativer Sprachsynthesemotor (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Webinhalts-Extraktion (Technologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser für das Scraping von JS/SPA-Seiten

Gestartet während des Mistral AI Worldwide Hackathon (März 2026), vollständig von KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Dieses Dokument wurde aus der fr-Version in die en-Sprache unter Verwendung des Modells gpt-5-mini übersetzt. Für weitere Informationen über den Übersetzungsprozess konsultieren Sie https://gitlab.com/jls42/ai-powered-markdown-translator**

