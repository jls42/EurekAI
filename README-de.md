<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandle beliebige Inhalte in interaktive Lernerlebnisse — angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Englisch</a> · <a href="README-es.md">🇪🇸 Spanisch</a> · <a href="README-pt.md">🇧🇷 Portugiesisch</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italienisch</a> · <a href="README-nl.md">🇳🇱 Niederländisch</a> · <a href="README-ar.md">🇸🇦 Arabisch</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chinesisch</a> · <a href="README-ja.md">🇯🇵 Japanisch</a> · <a href="README-ko.md">🇰🇷 Koreanisch</a> · <a href="README-pl.md">🇵🇱 Polnisch</a> · <a href="README-ro.md">🇷🇴 Rumänisch</a> · <a href="README-sv.md">🇸🇪 Schwedisch</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-Demo"></a>
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

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Seite](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam sehr konkret: Ich bereite regelmäßig Tests mit meiner Tochter vor und dachte, man könnte das mit KI spielerischer und interaktiver gestalten.

Ziel: Beliebige Eingaben — ein Foto der Unterrichtsstunde, ein kopierter Text, eine Sprachaufnahme, eine Websuche — in **Lernzettel, Karteikarten, Quiz, Podcasts, Lückentexte, Illustrationen und mehr** umzuwandeln. Alles angetrieben von den französischen Modellen von Mistral AI, wodurch die Lösung natürlich gut für französischsprachige Schüler geeignet ist.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde in 48 Stunden während des Hackathons als Proof of Concept für die Mistral-Dienste entwickelt — bereits funktionsfähig, aber begrenzt. Seitdem ist EurekAI zu einem echten Projekt geworden: Lückentexte, Navigation in Übungen, Web-Scraping, konfigurierbare elterliche Moderation, umfassende Code-Reviews und vieles mehr. Der komplette Code wurde von KI erzeugt — hauptsächlich mit [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Datei-Import** | Importiere deine Unterrichtsmaterialien — Foto, PDF (via Mistral OCR) oder Textdatei (TXT, MD) |
| 📝 | **Texteingabe** | Tippe oder füge beliebigen Text direkt ein |
| 🎤 | **Spracheingabe** | Nimm deine Stimme auf — Voxtral STT transkribiert |
| 🌐 | **Web / URL** | Füge eine URL ein (Scraping direkt via Readability + Lightpanda) oder gib eine Suche ein (Agent Mistral web_search) |
| 📄 | **Lernzettel** | Strukturierte Notizen mit Kernaussagen, Vokabular, Zitaten, Anekdoten |
| 🃏 | **Karteikarten** | Frage-/Antwort-Karten mit Quellenverweisen für aktives Lernen (Anzahl konfigurierbar) |
| ❓ | **MCQ-Quiz** | Multiple-Choice-Fragen mit adaptiver Fehlerwiederholung (Anzahl konfigurierbar) |
| ✏️ | **Lückentexte** | Ausfüllübungen mit Hinweisen und toleranter Validierung |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio — Mistral-Stimmen standardmäßig oder personalisierte Stimmen (Eltern!) |
| 🖼️ | **Illustrationen** | Pädagogische Bilder generiert von einem Mistral-Agent |
| 🗣️ | **Sprachquiz** | Fragen werden laut vorgelesen (individuelle Stimme möglich), mündliche Antwort, KI-Überprüfung |
| 💬 | **KI-Tutor** | Kontextueller Chat mit deinen Unterrichtsdokumenten, mit Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein Router basierend auf `mistral-small-latest` analysiert den Inhalt und schlägt eine Kombination der 7 verfügbaren Generatoren vor |
| 🔒 | **Elterliche Kontrolle** | Konfigurierbare Moderation pro Profil (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachigkeit** | Oberfläche in 9 Sprachen verfügbar; KI-Generierung steuerbar in 15 Sprachen via Prompts |
| 🔊 | **Vorlesen** | Höre Lernzettel und Karteikarten via Mistral Voxtral TTS oder ElevenLabs |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architekturübersicht" width="800" />
</p>

---

## Modellnutzungs-Karte

<p align="center">
  <img src="public/assets/model-map.webp" alt="Zuordnung KI-Modell zu Aufgabe" width="800" />
</p>

---

## Nutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernreise des Schülers" width="800" />
</p>

---

## Deep Dive — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Quelltypen, moderiert je nach Profil (standardmäßig für Kind und Teen aktiviert):

- **Datei-Import** — JPG-, PNG- oder PDF-Dateien werden von `mistral-ocr-latest` verarbeitet (gedruckter Text, Tabellen, Handschrift), oder Textdateien (TXT, MD) werden direkt importiert.
- **Freitext** — Tippe oder füge beliebige Inhalte ein. Wird moderiert vor der Speicherung, falls Moderation aktiviert ist.
- **Spracheingabe** — Nimm Audio im Browser auf. Transkribiert von `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Füge eine oder mehrere URLs ein, um Inhalte direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder gib Stichwörter ein für eine Websuche via Agent Mistral. Das einzige Eingabefeld akzeptiert beides — URLs und Stichwörter werden automatisch getrennt, jedes Ergebnis erzeugt eine eigene Quelle.

### KI-Inhaltserzeugung

Sieben Typen von generierten Lernmaterialien:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzettel** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Karteikarten** | `mistral-large-latest` | Frage-/Antwort-Karten mit Quellenverweisen (Anzahl konfigurierbar) |
| **MCQ-Quiz** | `mistral-large-latest` | Multiple-Choice-Fragen, Erklärungen, adaptive Fehlerwiederholung (Anzahl konfigurierbar) |
| **Lückentexte** | `mistral-large-latest` | Auszufüllende Sätze mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | 2-Stimmen-Skript → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Pädagogisches Bild via Tool `image_generation` |
| **Sprachquiz** | `mistral-large-latest` + Voxtral TTS + STT | Fragen per TTS → Antwort per STT → KI-Verifizierung |

### KI-Tutor per Chat

Ein konversationeller Tutor mit vollem Zugriff auf Unterrichtsdokumente:

- Verwendet `mistral-large-latest`
- **Tool-Aufrufe**: kann während des Gesprächs Lernzettel, Karteikarten, Quiz oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Inhaltsmoderation, falls für das Profil aktiviert

### Automatischer Router

Der Router nutzt `mistral-small-latest` zur Analyse der Quelleninhalte und schlägt die passendsten Generatoren aus den 7 verfügbaren vor. Die Oberfläche zeigt den Fortschritt in Echtzeit: zuerst eine Analysephase, dann die einzelnen Generierungen mit möglicher Abbruchoption.

### Adaptives Lernen

- **Quiz-Statistiken**: Verfolgung von Versuchen und Genauigkeit pro Frage
- **Quiz-Revision**: erzeugt 5–10 neue Fragen, die auf schwache Konzepte zielen
- **Erkennung von Lernanweisungen**: erkennt Anweisungen zur Wiederholung („Ich weiß meine Lektion, wenn ich ... kann“) und priorisiert diese in kompatiblen Generatoren (Lernzettel, Karteikarten, Quiz, Lückentexte)

### Sicherheit & elterliche Kontrolle

- **4 Altersgruppen**: Kind (≤10 Jahre), Teen (11–15), Student (16–25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-latest` mit 10 verfügbaren Kategorien, 5 standardmäßig für Kind/Teen gesperrt (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorien sind im Profil anpassbar.
- **Eltern-PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren. Für Produktion langsame Hashes mit Salt einplanen (Argon2id, bcrypt).
- **Chat-Einschränkungen**: KI-Chat standardmäßig für Unter-16-Jährige deaktiviert, kann von Eltern aktiviert werden

### Multi-Profil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- Projekte sind Profilen über `profileId` zugeordnet
- Kaskadierende Löschung: Löscht man ein Profil, werden alle zugehörigen Projekte gelöscht

### Mehrere TTS-Provider & personalisierte Stimmen

- **Mistral Voxtral TTS** (Standard): `voxtral-mini-tts-latest`, keine zusätzliche Schlüssel nötig
- **ElevenLabs** (Alternative): `eleven_v3`, natürliche Stimmen, benötigt `ELEVENLABS_API_KEY`
- Provider in den App-Einstellungen konfigurierbar
- **Personalisierte Stimmen**: Eltern können eigene Stimmen über die Mistral Voices API aus einer Audioprobe erstellen und Rollen (Host/Gast) zuweisen — Podcasts und Sprach-Quizzes werden dann mit der Stimme eines Elternteils abgespielt, was das Erlebnis für das Kind noch immersiver macht
- Zwei konfigurierbare Sprechrollen: **Host** (Hauptsprecher) und **Gast** (zweite Podcast-Stimme)
- Komplettes Mistral-Stimmenkatalog in den Einstellungen verfügbar, nach Sprache filterbar

### Internationalisierung

- Oberfläche in 9 Sprachen verfügbar: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache pro Profil konfigurierbar

---

## Technischer Stack

| Schicht | Technologie | Rolle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typsicherheit |
| **Backend** | Express 5.x | REST-API |
| **Dev-Server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partials, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, TypeScript kompiliert durch Vite |
| **Templating** | vite-plugin-handlebars | HTML-Zusammensetzung via Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS (Standard)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **TTS (Alternative)** | ElevenLabs SDK 2.x | `eleven_v3`, natürliche Stimmen |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Technik wie Firefox Reader View) |
| **Headless-Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS/SPA-Seiten — Fallback-Scraping |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Multipart-Formular-Verwaltung |
| **Audio** | ffmpeg-static | Zusammenfügen von Audiostreams |
| **Tests** | Vitest | Unit-Tests — Coverage gemessen via SonarCloud |
| **Persistenz** | JSON-Dateien | Speicher ohne Abhängigkeit |

---

## Modellreferenz

| Modell | Nutzung | Warum |
|---|---|---|
| `mistral-large-latest` | Lernzettel, Karteikarten, Podcast, Quiz, Lückentexte, Chat, Überprüfung sprachlicher Quiz, Bild-Agent, Web-Search-Agent, Erkennung von Anweisungen | Beste Multilingualität + Befolgen von Anweisungen |
| `mistral-ocr-latest` | OCR von Dokumenten | Gedruckter Text, Tabellen, Handschrift |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Sprachquiz, Vorlesen |
| `mistral-moderation-latest` | Inhaltsmoderation | 5 Kategorien für Kind/Teen gesperrt (+ Jailbreaking) |
| `mistral-small-latest` | Automatischer Router | Schnelle Inhaltsanalyse zur Routing-Entscheidung |
| `eleven_v3` (ElevenLabs) | Sprachsynthese (TTS alternativ) | Natürliche Stimmen, konfigurierbare Alternative |

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

> **Hinweis** : Mistral Voxtral TTS ist der Standardprovider — kein zusätzlicher Schlüssel notwendig über `MISTRAL_API_KEY` hinaus. ElevenLabs ist ein alternativer TTS-Provider, konfigurierbar in den Einstellungen.

---

## Container-Deployment

Das Image ist auf **GitHub Container Registry** veröffentlicht:

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=votre_clé_ici \
  -e ELEVENLABS_API_KEY=votre_clé_ici \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** ist ein Podman rootless-Flag, das automatisch die Volume-Rechte anpasst.
> **`ELEVENLABS_API_KEY`** ist optional (alternativer TTS).

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

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
| `GET` | `/api/config/voices` | Liste der Mistral TTS-Stimmen (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Altersstandards |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Profil erstellen |
| `PUT` | `/api/profiles/:id` | Profil bearbeiten (PIN erforderlich für < 15 Jahre) |
| `DELETE` | `/api/profiles/:id` | Profil löschen + Kaskade Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Projekt erstellen `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetails |
| `PUT` | `/api/projects/:pid` | Umbenennen `{name}` |
| `DELETE` | `/api/projects/:pid` | Projekt löschen | ### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateien importieren (OCR für JPG/PNG/PDF, direkte Lesung für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freier Text `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Sprache STT (Multipart-Audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Quelle löschen |
| `POST` | `/api/projects/:pid/moderate` | Moderieren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Überarbeitungsanweisungen erkennen |

### Generierung
| Methode | Endpoint | Beschreibung |
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

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` erfordert zusätzlich `{generationId, weakQuestions}`.

### CRUD-Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort prüfen (Audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Vorlesen (Lernblätter/Karteikarten) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Umbenennen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generierung löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Eine Nachricht senden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatverlauf löschen |

---

## Architekturentscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimale Größe, leichte Reaktivität mit TypeScript, kompiliert durch Vite. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Keine Abhängigkeiten, sofortiger Start. Keine Datenbankkonfiguration — einfach starten und loslegen. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials zur Codeorganisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — einfach zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungssystem** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — erlaubt mehrere Lernblätter, Quiz usw. pro Kurs. |
| **Altersgerechte Prompts** | 4 Altersgruppen mit unterschiedlichem Vokabular, Komplexität und Ton — derselbe Inhalt lehrt je nach Lernendem unterschiedlich. |
| **Agentenbasierte Funktionen** | Bildgenerierung und Websuche verwenden temporäre Mistral-Agenten — eigener Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einzelnes Feld akzeptiert gemischte URLs und Schlüsselwörter — URLs werden über Readability (statische Seiten) gescraped mit Fallback Lightpanda (JS/SPA-Seiten), Schlüsselwörter lösen einen Mistral-Agenten web_search aus. Jedes Ergebnis erstellt eine eigenständige Quelle. |
| **Multi-Provider-TTS** | Standardmäßig Mistral Voxtral TTS (kein zusätzlicher Schlüssel), ElevenLabs als Alternative — konfigurierbar ohne Neustart. |

---

## Credits & Danksagungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternativer Sprachsynthesemotor (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Ikonenbibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Web-Inhalts-Extraktion (Technologie von Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser für das Scraping von JS/SPA-Seiten

Gestartet während des Mistral AI Worldwide Hackathon (März 2026), vollständig von KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Dieses Dokument wurde aus der fr-Version in die Sprache en unter Verwendung des Modells gpt-5-mini übersetzt. Für weitere Informationen zum Übersetzungsprozess konsultieren Sie https://gitlab.com/jls42/ai-powered-markdown-translator**

