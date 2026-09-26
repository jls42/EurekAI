<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandle beliebige Inhalte in eine interaktive Lernerfahrung — angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Qualitäts-Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Sicherheitsbewertung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Zuverlässigkeitsbewertung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Wartbarkeitsbewertung"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Abdeckung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Schwachstellen"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code-Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Codezeilen"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-Abzeichen"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Die Geschichte — Warum EurekAI?

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam aus etwas sehr Konkretem: Ich bereite mit meiner Tochter regelmäßig Klassenarbeiten vor, und ich dachte, dass es mit KI möglich sein müsste, das spielerischer und interaktiver zu gestalten.

Das Ziel: **beliebige Eingaben** — ein Foto der Lektion, kopierter Text, eine Sprachaufnahme, eine Websuche — nehmen und in **Lernzettel, Flashcards, Quizze, Podcasts, Lückentexte, Illustrationen und mehr** verwandeln. Das Ganze wird von den französischen Modellen von Mistral AI angetrieben, was es zu einer natürlich passenden Lösung für französischsprachige Schüler macht.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde innerhalb von 48 Stunden während des Hackathons als proof of concept rund um die Mistral-Dienste entwickelt — bereits funktionsfähig, aber begrenzt. Seitdem ist EurekAI zu einem echten Projekt geworden: Lückentexte, Navigation durch Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliches Code-Review und vieles mehr. Der gesamte Code wird von KI generiert — hauptsächlich [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Überblick

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI-geführte Tour: Quellen, Lernzettel, Quiz, Flashcards, Illustrationen" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — letzte Generierungen, geschätzte Kosten pro Karte und gesamtes Projekt, Schaltfläche «Auto — Magie!» | ![Quellen](docs/screenshots/sources.webp)<br>**Quellen** — Import von Foto/PDF/Text/Sprache/Web, Generierung mit einem Klick, Erkennung von Aufgabenstellungen |

Jede importierte Quelle zeigt ihren [OCR-Vertrauensscore, ihre Moderation und ihre geschätzten Kosten](docs/screenshots/sources-list.webp).

### Die Komponenten in Aktion

| | |
|---|---|
| ![Lernzettel](docs/screenshots/notes.gif)<br>**Lernzettel** — Kernpunkte, Vokabular, belegte Zitate, Audio-Lesen pro Abschnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**MC-Quiz** — sofortiges Feedback mit Erklärung, schrittweise Navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — Karte umdrehen und dann Selbsteinschätzung «Ich wusste es / ich wusste es nicht» | ![Lückentexte](docs/screenshots/fillblank.gif)<br>**Lückentexte** — Hinweis auf Anfrage, tolerante Validierung |
| ![Diktat](docs/screenshots/dictation.gif)<br>**Diktat** — vorgegebenes Wort als Audio, strenge buchstabenweise Korrektur | ![Sprachquiz](docs/screenshots/vocal-quiz.gif)<br>**Sprachquiz** — Frage laut vorgelesen, Antwort per Mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — Mini-Podcast mit 2 Stimmen, dialogischer, einsehbarer Text | ![Illustrationen](docs/screenshots/illustrations.gif)<br>**Illustrationen** — von Agent generierte Bildungsbilder |
| ![KI-Tutor](docs/screenshots/chat.gif)<br>**KI-Tutor** — Chat, verankert in den Kursdokumenten, erklärte Antworten, kann Quizze und Flashcards generieren | |

### Erste Schritte

| | |
|---|---|
| ![Profilauswahl](docs/screenshots/login.gif)<br>**Profilauswahl** — jedes Kind hat seinen eigenen Bereich, Avatar und seine eigene Sprache | ![Profil erstellen](docs/screenshots/profile-create.gif)<br>**Profil erstellen** — Alter, Avatar, elterliche PIN für unter 15-Jährige |
| ![Kurs erstellen](docs/screenshots/course.gif)<br>**Kurs erstellen** — ein Projekt pro Lektion, bereit zum Empfang von Quellen | ![Einstellungen](docs/screenshots/settings.gif)<br>**Einstellungen** — API-Status, Auswahl der KI-Modelle mit angezeigten Preisen |

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Dateiimport** | Importiere deine Lektionen — Foto, PDF (via Mistral OCR mit gemitteltem Vertrauensscore, Stufen `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sitzungen mit Retry pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Tippe oder kopiere beliebigen Text direkt ein |
| 🎤 | **Spracheingabe** | Nimm dich auf — Voxtral STT transkribiert deine Stimme |
| 🌐 | **Web / URL** | Füge eine URL ein (direktes Scraping via Readability + Lightpanda) oder gib eine Suche ein (Agent Mistral web_search) |
| 📄 | **Lernzettel** | Strukturierte Notizen mit Kernpunkten, Vokabular, Zitaten, Anekdoten |
| 🃏 | **Flashcards** | Interaktive Frage-Antwort-Karten, dialogisches Audio-Lesen |
| ❓ | **MC-Quiz** | Multiple-Choice-Fragen mit adaptiver Fehlerwiederholung (konfigurierbare Anzahl) |
| ✏️ | **Lückentexte** | Übungen zum Ausfüllen mit Hinweisen und toleranter Validierung |
| 🔤 | **Diktat** | Als Audio diktierte Wörter (Voxtral TTS) aus einer importierten Liste, Eingabe über Tastatur, strenge buchstabenweise Korrektur mit erklärter Rechtschreibregel |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio — standardmäßig Mistral-Stimmen oder benutzerdefinierte Stimmen (für Eltern!) |
| 🖼️ | **Illustrationen** | Von einem Mistral-Agenten generierte Bildungsbilder |
| 🗣️ | **Sprachquiz** | Laut vorgelesene Fragen (benutzerdefinierte Stimme möglich), mündliche Antwort, KI-Überprüfung |
| 💬 | **KI-Tutor** | Kontext-Chat mit deinen Kursdokumenten, mit Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 8 verfügbaren Typen vor |
| 🔒 | **Elterliche Kontrolle** | Pro Profil konfigurierbare Moderation (anpassbare Kategorien), elterliche PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachig** | Oberfläche in 9 Sprachen verfügbar; KI-Generierung per Prompt in 15 Sprachen steuerbar |
| 🔊 | **Vorlesen** | Höre Lernzettel und Flashcards (Frage-/Antwort-Dialog) über Mistral Voxtral TTS |
| 💶 | **API-Kostenverfolgung** | Transparente Schätzung der €-Kosten jeder Generierung und Quelle (Token / Zeichen / Seiten / Audio-Sekunden). Abzeichen pro Karte + Gesamtsumme pro Projekt, sichtbar im Dashboard |
| 🎨 | **Thema pro Profil** | Jedes Profil wählt sein Thema `dark` oder `light` — bleibt beim Profilwechsel erhalten |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architekturübersicht" width="800" />
</p>

---

## Modellnutzungskarte

<p align="center">
  <img src="public/assets/model-map.webp" alt="Zuordnung von KI-Modellen zu Aufgaben" width="800" />
</p>

---

## Benutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernreise von Schülern" width="800" />
</p>

---

## Tiefer Einblick — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Arten von Quellen, moderiert je nach Profil (standardmäßig für Kinder und Jugendliche aktiviert):

- **Dateiimport** — JPG-, PNG- oder PDF-Dateien werden per Mistral OCR verarbeitet — **OCR 4 (`mistral-ocr-4-0`) standardmäßig** (beste Qualität), **OCR 3 (`mistral-ocr-2512`) optional** in den Einstellungen (günstiger, ~½ der Kosten) — für gedruckten Text, Tabellen und Handschrift; oder Textdateien (TXT, MD) werden direkt importiert. Multi-File-Uploads verwenden ein **Upload-Sitzung**-System: individueller Fortschritt pro Datei, erneuter Versuch für fehlgeschlagene Dateien, ohne die anderen erneut einzureichen, Sitzung verwerfen, wenn sie abgeschlossen ist. Das OCR liefert einen gemittelten **Vertrauensscore** (`average`, in `[0,1]` begrenzt, berechnet aus den von Mistral zurückgegebenen `averagePageConfidenceScore`), der in der UI als Badge der Stufe `high` / `medium` / `low` angezeigt wird (Schwellenwerte ~0.9 / ~0.7) — warnt, blockiert aber nicht, wenn der Scan von schlechter Qualität ist.
- **Freitext** — Tippe oder füge beliebigen Inhalt ein. Vor dem Speichern moderiert, wenn die Moderation aktiv ist.
- **Spracheingabe** — Nimm Audio im Browser auf. Transkribiert von `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Füge eine oder mehrere URLs ein, um den Inhalt direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder gib Schlüsselwörter für eine Websuche über Agent Mistral ein. Das einzelne Feld akzeptiert beides — URLs und Schlüsselwörter werden automatisch getrennt, jedes Ergebnis erstellt eine unabhängige Quelle.

### KI-Content-Generierung

Acht Typen generierter Lernmaterialien:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzettel** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | Frage-/Antwort-Karten mit Quellenverweisen (konfigurierbare Anzahl) |
| **MC-Quiz** | `mistral-large-latest` | Multiple-Choice-Fragen, Erklärungen, adaptive Wiederholung (konfigurierbare Anzahl) |
| **Lückentexte** | `mistral-large-latest` | Sätze zum Ausfüllen mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Diktat** | `mistral-large-latest` + Voxtral TTS | Als Audio diktierte Schlüsselwörter (1 MP3/Wort) → Eingabe über Tastatur → strenge Korrektur (Akzente) mit erklärter Regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skript mit 2 Stimmen → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Bildungsbild über das Werkzeug `image_generation` |
| **Sprachquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Überprüfung |

### KI-Tutor per Chat

Ein konversationeller Tutor mit vollem Zugriff auf die Kursdokumente:

- Nutzt `mistral-large-latest`
- **Tool-Aufruf**: kann während der Unterhaltung Lernzettel, Flashcards, Quizze oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Inhaltsmoderation, wenn sie für das Profil aktiviert ist

### Automatischer Router

Der Router verwendet `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und die relevantesten Generatoren aus den 8 verfügbaren vorzuschlagen. Die Oberfläche zeigt den Fortschritt in Echtzeit an: zuerst eine Analysephase, dann die einzelnen Generierungen mit Möglichkeit zum Abbrechen.

### Adaptives Lernen

- **Quiz-Statistiken**: Verfolgung von Versuchen und Genauigkeit pro Frage
- **Quiz-Wiederholung**: generiert 5-10 neue Fragen, die auf schwache Konzepte abzielen
- **Erkennung von Aufgabenstellungen**: erkennt Lernanweisungen ("Ich kann meine Lektion, wenn ich ... kann") und priorisiert sie in kompatiblen textbasierten Generatoren (Lernzettel, Flashcards, Quiz, Lückentexte)

### Sicherheit & elterliche Kontrolle

- **4 Altersgruppen**: Kind (≤10 Jahre), Jugendlicher (11-15), Student (16-25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-2603` (Mistral Moderation 2) mit 10 verfügbaren Kategorien, 5 standardmäßig für Kinder/Jugendliche blockiert (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorien pro Profil in den Einstellungen anpassbar. Der Alias `-latest` wird absichtlich vermieden (er verweist noch auf eine veraltete Version).
- **Elterliche PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren. Für einen produktiven Einsatz einen langsamen Hash mit Salz vorsehen (Argon2id, bcrypt).
- **Chat-Einschränkungen**: KI-Chat standardmäßig für unter 16-Jährige deaktiviert, durch Eltern aktivierbar

### Multi-Profil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- **Stimmen pro Profil** (`Profile.mistralVoices?: { host?, guest? }` — jede Rolle ist optional) — jedes Kind kann sein eigenes Podcast-/Sprachquiz-Stimmenpaar haben
- **Thema pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatisches Umschalten beim Profilwechsel, serverseitig gespeichert
- Projekte, die über `profileId` mit Profilen verknüpft sind
- Kaskadenlöschung: Das Löschen eines Profils entfernt alle seine Projekte

### API-Kostenverfolgung

Jeder Mistral-Aufruf (Chat, OCR, STT, TTS, Moderation, Agenten) wird instrumentiert, um dem Nutzer eine **transparente** €-Schätzung zu liefern — keine Überraschungen bei der Abrechnung.

- **Quelle der Wahrheit**: `helpers/pricing.ts` — `MODEL_PRICING` pro Modellpräfix (z. B. `mistral-large` → input 0.5 €/M Tokens, output 1.5 €/M Tokens), `PRICING_SOURCES` mit Mistral-Doku-URLs für periodisches erneutes Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — Umrechnung gesteuert durch `helpers/cost-calc.ts`
- **Instrumentierungskette**: `helpers/tracked-client.ts` (wrap client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Einfügung in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulative Gesamtsumme im Dashboard (`Project.totalCost`)
- **Endpunkte**: Die Antworten `/generate/*` und `/sources/*` dekorieren das zurückgegebene Objekt (Generation / Source) mit `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/route` fügt ein Feld `costDelta: number` für die Kosten des reinen Routings hinzu. `GET /projects/:pid` gibt das mit `totalCost` angereicherte Projekt zurück (aus `costLog[]` berechnete Summe) + den vollständigen Verlauf

### TTS (Mistral Voxtral) & benutzerdefinierte Stimmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-Sprachsynthese, kein zusätzlicher Schlüssel erforderlich
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API ihre eigenen Stimmen erstellen (ausgehend von einem Audio-Sample) und sie den Rollen Host/Gast zuweisen — Podcasts und Sprachquizze werden dann mit der Stimme eines Elternteils vorgelesen, was das Erlebnis für das Kind noch immersiver macht
- Zwei konfigurierbare Sprachrollen: **Host** (Hauptnarrator) und **Gast** (zweite Podcast-Stimme)
- Vollständiger Katalog der Mistral-Stimmen in den Einstellungen verfügbar, nach Sprache filterbar

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
| **Entwicklungsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partial, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, von Vite kompiliertes TypeScript |
| **Templating** | vite-plugin-handlebars | HTML-Zusammenstellung über Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Firefox-Reader-View-Technologie) |
| **Headless-Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS-/SPA-Seiten — Fallback-Scraping |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Verwaltung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Zusammenführung von Audiosegmenten |
| **Tests** | Vitest | Unit-Tests — Coverage gemessen durch SonarCloud |
| **Persistenz** | JSON-Dateien | Speicherung ohne Abhängigkeit |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Lernblatt, Flashcards, Podcast, Quiz, Lückentexte, Chat, Überprüfung von Sprachquiz, Bild-Agent, Web-Search-Agent, Anweisungserkennung | Beste Multilingualität + Befolgung von Anweisungen |
| `mistral-ocr-4-0` (OCR 4, Standard) | OCR von Dokumenten — höchste Qualität | Gedruckter Text, Tabellen, Handschrift ($4 / 1000 Seiten) |
| `mistral-ocr-2512` (OCR 3, Option) | OCR von Dokumenten | In den Einstellungen auswählbar, günstiger ($2 / 1000 Seiten) |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Sprachquiz, Vorlesen |
| `mistral-moderation-2603` | Inhaltsmoderation | 5 für Kinder/Jugendliche blockierte Kategorien (darunter `jailbreaking`) |
| `mistral-small-latest` | Automatischer Router | Schnelle Inhaltsanalyse für Routing-Entscheidungen |

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
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Provider — keine zusätzliche Schlüssel erforderlich über `MISTRAL_API_KEY` hinaus.

> **Vom Benutzer eingegebener API-Schlüssel**: `MISTRAL_API_KEY` ist jetzt **optional**. Wenn er fehlt, startet die App trotzdem und fordert jeden Benutzer auf, **seinen eigenen Mistral-Schlüssel** in der Oberfläche einzugeben. Der Schlüssel wird **im Browser gespeichert** (verschlüsselt via Web Crypto + IndexedDB in einem sicheren Kontext) und per Anfrage gesendet — **niemals auf dem Server persistiert**. Priorität: Profilschlüssel > globaler Browser-Schlüssel > `MISTRAL_API_KEY` (env). Das Setzen von `EUREKAI_REQUIRE_USER_KEY=true` erzwingt, dass jeder Benutzer seinen Schlüssel bereitstellt (der Env-Schlüssel dient dann nur noch für Vorladungen).

> **Lokales HTTPS (Tablet/LAN)**: `localhost` ist bereits ein sicherer Kontext. Für LAN-Zugriff (Tablet) generiere ein lokales Zertifikat und aktiviere HTTPS, um die Browser-Verschlüsselung freizuschalten + den Schlüssel während der Übertragung zu verschlüsseln:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert falls verfügbar, sonst openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite in HTTPS
> ```

### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral-API-Schlüssel (Chat, OCR, STT, TTS Voxtral, Agents, Moderation). Falls fehlt, gibt der Benutzer seinen Schlüssel in der App ein (im Browser gespeichert, niemals auf dem Server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → deaktiviert den Fallback auf `MISTRAL_API_KEY` für KI-Anfragen (jeder Benutzer MUSS seinen Schlüssel bereitstellen). Nützlich bei einer exponierten Instanz |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | TLS-Schlüssel-/Zertifikatpfade (siehe `scripts/gen-cert.sh`) → Express und Vite werden über HTTPS ausgeliefert (secure context LAN/Tablet) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Wenn `production` → Express liefert das Frontend aus `dist/` aus (sonst `public/`) |
| `SONAR_TOKEN` | optional CI | — | Wird nur vom GitHub-Actions-SonarCloud-Workflow verwendet |

### Tests, Codequalität und Beitrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)**: `pre-commit` führt `scripts/pre-commit-fast.sh` nacheinander aus (Konflikte, große Dateien, shellcheck), danach `lint-staged` und schließlich `npm test`; `pre-push` führt zuerst ein `npm audit`-Gate aus (blockiert bei kritischer transitorischer Sicherheitslücke, siehe `scripts/audit-verdict.mjs`) und danach `npm run security`. Alle blockieren den Commit/Push im Fehlerfall.

**Erforderliche externe Werkzeuge (optional, aber verwendet von `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Ohne diese Werkzeuge schlägt `npm test` bei `pretest` fehl (lizard fehlt) und `npm run security` schlägt fehl (opengrep fehlt). Die Husky-Hooks blockieren dann Commit/Push.

---

## Bereitstellung mit Container

Das Image wird auf **GitHub Container Registry** veröffentlicht:

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

> **`:U`** ist ein Rootless-Podman-Flag, das die Volume-Berechtigungen automatisch anpasst.

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

> **Für KI-Mitwirkende**: siehe [`CLAUDE.md`](CLAUDE.md) für den detaillierten Architekturkontext, die obligatorischen Regeln (Anti-Leak-Prompts, Fehlercodes, Kostenverfolgung) und bekannte Fallstricke (Lizard CCN, Opengrep, Codacy/Semgrep-Migration).

---

## API-Referenz

### Config
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimme, TTS-Modell) |
| `GET` | `/api/config/status` | API-Status: `mistral` (Mistral-Schlüssel definiert), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Provider) |
| `POST` | `/api/config/reset` | Konfiguration auf Standard zurücksetzen |
| `GET` | `/api/config/voices` | Mistral-TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Alters-Standards |
| `POST` | `/api/providers/mistral/validate` | Einen vom Benutzer eingegebenen Mistral-Schlüssel validieren — immer 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), kein Env-Fallback |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Ein Profil erstellen |
| `PUT` | `/api/profiles/:id` | Ein Profil ändern (PIN erforderlich für < 15 Jahre) |
| `DELETE` | `/api/profiles/:id` | Profil löschen + Projekt-Kaskade `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Ein Projekt `{name, profileId}` erstellen |
| `GET` | `/api/projects/:pid` | Projektdetails |
| `PUT` | `/api/projects/:pid` | `{name}` umbenennen |
| `DELETE` | `/api/projects/:pid` | Projekt löschen |
| `GET` | `/api/projects/:pid/events` | Echtzeit-SSE-Stream (`event: generation`) der Generierungsübergänge (`completed`/`failed`/`cancelled`) + Keep-alive-Heartbeat |

### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateien importieren (OCR für JPG/PNG/PDF, Direktlesen für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-Stimme (Audio-Multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eine Quelle löschen |
| `POST` | `/api/projects/:pid/moderate` | `{text}` moderieren |
| `POST` | `/api/projects/:pid/detect-consigne` | Überarbeitungsanweisungen erkennen |

### Generierung
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernblatt |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktat (Wörter + Beispielsätze + Regeln, 1 TTS-Audio pro Wort; auch vom Auto-Router vorgeschlagen) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprachquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Gezieltes Wiederholungsblatt zu den in einem Quiz `{generationId, weakQuestions}` verpassten Fragen — wird parallel zu `quiz-review` über den Button « Mit meinen Fehlern trainieren » aufgerufen |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der zu startenden Generatoren) — gibt `{plan, costDelta}` zurück (Kosten nur für das Routing) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Backend-Generierung (Routing + 8 Typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Ausführung parallel — setzt einen Mistral-Tier mit Rate-Limit ≥ 8 gleichzeitige Requests voraus; andernfalls können mehrere 429 in `failedSteps` zurückgemeldet werden. |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` und `remediation-summary` erfordern zusätzlich `{generationId, weakQuestions}`.

### CRUD-Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antworten auf Lückentexte übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Diktatantworten übermitteln `{answers}` (strenger Server-Score) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort prüfen (Audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Vorlesen laut (Lernblätter/Flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Eine laufende Generierung abbrechen (einziger Abbruchpfad eines pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` umbenennen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Die Generierung löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Den Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Eine Nachricht senden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Den Chatverlauf löschen |

---

## Architektonische Entscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Footprint, leichte Reaktivität mit von Vite kompiliertem TypeScript. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Keine Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren — man startet einfach los. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials für die Codeorganisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — leicht zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungs-System** | Jede Generierung ist ein eigenständiges Objekt mit eigener ID — ermöglicht mehrere Lernblätter, Quiz usw. pro Kurs. |
| **Altersangepasste Prompts** | 4 Altersgruppen mit unterschiedlichem Vokabular, unterschiedlicher Komplexität und unterschiedlichem Ton — derselbe Inhalt lehrt je nach Lernendem anders. |
| **Auf Agents basierende Funktionen** | Die Bildgenerierung und die Websuche verwenden temporäre Mistral-Agents — sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert gemischte URLs und Schlüsselwörter — die URLs werden via Readability (statische Seiten) gescrapt, mit Lightpanda-Fallback (JS-/SPA-Seiten); die Schlüsselwörter lösen einen Mistral-web_search-Agenten aus. Jedes Ergebnis erzeugt eine eigenständige Quelle. |
| **100 % Mistral-TTS** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus) — integrierte Sprachsynthese in der Kostenkette und bei der Sprachauflösung nach Sprache. |

---

## Danksagungen & Anerkennungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-First-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Web-Inhaltsextraktion (Firefox-Reader-View-Technologie)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser für das Scraping von JS-/SPA-Seiten
- **[Luciole](https://luciole-vision.com)** — Schriftart für sehbehinderte Leser, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Profiloption « Lesekomfort »)

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig durch KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Aus dem Französischen ins Deutsche mit gpt-5.4-mini übersetzter Artikel.**
