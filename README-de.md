<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandle beliebige Inhalte in ein interaktives Lernerlebnis — powered by <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-Demo"></a>
</p>

<h4 align="center">📊 Codequalität</h4>

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

## Die Geschichte — Warum EurekAI?

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam aus etwas sehr Konkretem: Ich bereite regelmäßig die Klassenarbeiten mit meiner Tochter vor und dachte, dass es möglich sein müsste, das mit KI spielerischer und interaktiver zu gestalten.

Das Ziel: **jede beliebige Eingabe** — ein Foto der Lektion, kopierter Text, eine Sprachaufnahme, eine Websuche — in **Lernkarten, Flashcards, Quizze, Podcasts, Lückentexte, Illustrationen und mehr** verwandeln. Alles powered by den französischen Modellen von Mistral AI, was die Lösung natürlich besonders gut für französischsprachige Schülerinnen und Schüler geeignet macht.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde in 48 Stunden während des Hackathons als Proof of Concept rund um die Mistral-Dienste entwickelt — bereits funktionsfähig, aber begrenzt. Seitdem ist EurekAI zu einem echten Projekt geworden: Lückentexte, Navigation in den Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliche Code-Reviews und vieles mehr. Der gesamte Code wird von KI generiert — hauptsächlich durch [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Überblick

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Geführte Tour durch EurekAI: Quellen, Lernkarte, Quiz, Flashcards, Illustrationen" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — aktuelle Generierungen, geschätzte Kosten pro Karte und Projektgesamt, Button „Auto — Magie!“ | ![Quellen](docs/screenshots/sources.webp)<br>**Quellen** — Import von Foto/PDF/Text/Stimme/Web, Generierung mit einem Klick, Aufgabenerkennung |

Jede importierte Quelle zeigt ihren [OCR-Konfidenzscore, ihre Moderation und ihre geschätzten Kosten](docs/screenshots/sources-list.webp).

### Die Komponenten in Aktion

| | |
|---|---|
| ![Lernkarte](docs/screenshots/notes.gif)<br>**Lernkarte** — Kernpunkte, Vokabular, quellenbasierte Zitate, Audio-Wiedergabe pro Abschnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**Multiple-Choice-Quiz** — sofortiges Feedback mit Erklärung, schrittweise Navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — Karte umdrehen, dann Selbstbewertung „wusste ich / wusste ich nicht“ | ![Lückentexte](docs/screenshots/fillblank.gif)<br>**Lückentexte** — Hinweis auf Abruf, tolerante Validierung |
| ![Diktat](docs/screenshots/dictation.gif)<br>**Diktat** — Wort per Audio diktiert, strikte Korrektur Buchstabe für Buchstabe | ![Sprachquiz](docs/screenshots/vocal-quiz.gif)<br>**Sprachquiz** — Frage laut vorgelesen, Antwort per Mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — Mini-Podcast mit 2 Stimmen, einsehbares Dialogskript | ![Illustrationen](docs/screenshots/illustrations.gif)<br>**Illustrationen** — von Agent generierte Bildungsbilder |
| ![KI-Tutor](docs/screenshots/chat.gif)<br>**KI-Tutor** — Chat verankert in den Kursdokumenten, erklärte Antworten, kann Quizze und Flashcards generieren | |

### Erste Schritte

| | |
|---|---|
| ![Profilauswahl](docs/screenshots/login.gif)<br>**Profilauswahl** — jedes Kind hat seinen eigenen Bereich, Avatar und Sprache | ![Profilerstellung](docs/screenshots/profile-create.gif)<br>**Profilerstellung** — Alter, Avatar, Eltern-PIN für unter 15-Jährige |
| ![Kurserstellung](docs/screenshots/course.gif)<br>**Kurserstellung** — ein Projekt pro Lektion, bereit für Quellen | ![Einstellungen](docs/screenshots/settings.gif)<br>**Einstellungen** — API-Status, Auswahl der KI-Modelle mit angezeigten Tarifen |

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Dateiimport** | Importieren Sie Ihre Lektionen — Foto, PDF (über Mistral OCR mit gemitteltem Konfidenzscore, Stufen `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sitzungen mit Retry pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Tippen oder fügen Sie beliebigen Text direkt ein |
| 🎤 | **Spracheingabe** | Nehmen Sie sich auf — Voxtral STT transkribiert Ihre Stimme |
| 🌐 | **Web / URL** | Fügen Sie eine URL ein (direktes Scraping über Readability + Lightpanda) oder geben Sie eine Suche ein (Agent Mistral web_search) |
| 📄 | **Lernkarten** | Strukturierte Notizen mit Kernpunkten, Vokabular, Zitaten, Anekdoten |
| 🃏 | **Flashcards** | Interaktive F/A-Karten, dialogische Audio-Wiedergabe |
| ❓ | **Multiple-Choice-Quiz** | Multiple-Choice-Fragen mit adaptiver Fehlerwiederholung (konfigurierbare Anzahl) |
| ✏️ | **Lückentexte** | Ergänzungsübungen mit Hinweisen und toleranter Validierung |
| 🔤 | **Diktat** | Per Audio diktierte Wörter (Voxtral TTS) aus einer importierten Liste, Tastatureingabe, strikte Korrektur Buchstabe für Buchstabe mit erklärter Rechtschreibregel |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio — Standard-Mistral-Stimmen oder benutzerdefinierte Stimmen (Eltern!) |
| 🖼️ | **Illustrationen** | Bildungsbilder, generiert von einem Agent Mistral |
| 🗣️ | **Sprachquiz** | Laut vorgelesene Fragen (benutzerdefinierte Stimme möglich), mündliche Antwort, KI-Prüfung |
| 💬 | **KI-Tutor** | Kontextueller Chat mit Ihren Kursdokumenten, mit Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren unter den 8 verfügbaren Typen vor |
| 🔒 | **Kinderschutz** | Pro Profil konfigurierbare Moderation (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachig** | Oberfläche in 9 Sprachen verfügbar; KI-Generierung über Prompts in 15 Sprachen steuerbar |
| 🔊 | **Vorlesen** | Hören Sie Lernkarten und Flashcards (Frage/Antwort-Dialog) über Mistral Voxtral TTS |
| 💶 | **API-Kostenverfolgung** | Transparente Schätzung der €-Kosten jeder Generierung und Quelle (Tokens / Zeichen / Seiten / Audiosunden). Badge pro Karte + Gesamt pro Projekt, sichtbar im Dashboard |
| 🎨 | **Thema pro Profil** | Jedes Profil wählt sein Thema `dark` oder `light` — bleibt beim Profilwechsel erhalten |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Modellnutzungskarte

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Nutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Tiefgang — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Quellentypen, moderiert je nach Profil (standardmäßig für Kind und Teenager aktiviert):

- **Dateiimport** — JPG-, PNG- oder PDF-Dateien, verarbeitet durch OCR Mistral — **OCR 4 (`mistral-ocr-4-0`) standardmäßig** (beste Qualität), **OCR 3 (`mistral-ocr-2512`) optional** in den Einstellungen (günstiger, ~½ der Kosten) — für gedruckten Text, Tabellen und Handschrift; oder Textdateien (TXT, MD), die direkt importiert werden. Multi-Datei-Uploads nutzen ein System von **Upload-Sitzungen**: individueller Fortschritt pro Datei, Retry der fehlgeschlagenen Datei ohne erneutes Einreichen der anderen, Schließen der Sitzung nach Abschluss. Die OCR liefert einen gemittelten **Konfidenzscore** (`average`, geclampt in `[0,1]`, berechnet aus von Mistral zurückgegebenen `averagePageConfidenceScore`), in der UI als Badge der Stufe `high` / `medium` / `low` angezeigt (Schwellenwerte ~0.9 / ~0.7) — warnt ohne zu blockieren, wenn der Scan von schlechter Qualität ist.
- **Freitext** — Tippen oder fügen Sie beliebige Inhalte ein. Moderiert vor der Speicherung, wenn die Moderation aktiv ist.
- **Spracheingabe** — Nehmen Sie Audio im Browser auf. Transkribiert durch `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Fügen Sie eine oder mehrere URLs ein, um den Inhalt direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder geben Sie Schlüsselwörter für eine Websuche über Agent Mistral ein. Das einzige Feld akzeptiert beides — URLs und Schlüsselwörter werden automatisch getrennt, jedes Ergebnis erstellt eine unabhängige Quelle.

### KI-Inhaltsgenerierung

Acht Typen von generiertem Lernmaterial:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernkarte** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | F/A-Karten mit Quellenverweisen (konfigurierbare Anzahl) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Multiple-Choice-Fragen, Erklärungen, adaptive Wiederholung (konfigurierbare Anzahl) |
| **Lückentexte** | `mistral-large-latest` | Zu vervollständigende Sätze mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Diktat** | `mistral-large-latest` + Voxtral TTS | Schlüsselwörter per Audio diktiert (1 MP3/Wort) → Tastatureingabe → strikte Korrektur (Akzente) mit erklärter Regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | 2-Stimmen-Skript → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Bildungsbild über das Tool `image_generation` |
| **Sprachquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Prüfung |

### KI-Tutor per Chat

Ein Gesprächstutor mit vollständigem Zugriff auf die Kursdokumente:

- Nutzt `mistral-large-latest`
- **Tool-Aufruf**: kann während des Gesprächs Lernkarten, Flashcards, Quizze oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Inhaltsmoderation, falls für das Profil aktiviert

### Automatischer Router

Der Router nutzt `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und die relevantesten Generatoren unter den 8 verfügbaren vorzuschlagen. Die Oberfläche zeigt den Fortschritt in Echtzeit: zuerst eine Analysephase, dann die einzelnen Generierungen mit möglicher Abbruchoption.

### Adaptives Lernen

- **Quiz-Statistiken**: Verfolgung der Versuche und der Genauigkeit pro Frage
- **Quiz-Wiederholung**: generiert 5–10 neue Fragen, die auf schwache Konzepte abzielen
- **Aufgabenerkennung**: erkennt Wiederholungsanweisungen („Ich kann meine Lektion, wenn ich weiß…“) und priorisiert sie in den kompatiblen Textgeneratoren (Lernkarte, Flashcards, Quiz, Lückentexte)

### Sicherheit & Kinderschutz

- **4 Altersgruppen**: Kind (≤10 Jahre), Teenager (11–15), Student (16–25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-2603` (Mistral Moderation 2) mit 11 verfügbaren Kategorien, 5 standardmäßig für Kind/Teenager blockiert (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Pro Profil in den Einstellungen anpassbare Kategorien; Moderation 2 hat die frühere Kategorie „gefährliche Inhalte“ in `dangerous` + `criminal` aufgeteilt (bestehende Profile werden automatisch migriert, und die blockierten Kategorien gelten auch für bereits importierte Quellen). Standardsicherheit: wenn die Antwort des Modells die Prüfung einer blockierten Kategorie nicht erlaubt, wird der Inhalt abgelehnt („Moderation nicht verfügbar“); bei aktiver Moderation schließen Generierung und Chat gemeldete, fehlerhafte oder in Prüfung befindliche Quellen aus (eine importierte Quelle mit deaktivierter Moderation wird nicht erneut geprüft). Festes Datums-Id in `helpers/moderation-model.ts`: der Alias `-latest`, veraltet, wird von der API nicht mehr aufgeführt.
- **Eltern-PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren. Für einen Produktionseinsatz einen langsamen Hash mit Salt vorsehen (Argon2id, bcrypt).
- **Chat-Einschränkungen**: KI-Chat standardmäßig für unter 16-Jährige deaktiviert, von Eltern aktivierbar

### Mehrprofil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- **Stimmen pro Profil** (`Profile.mistralVoices?: { host?, guest? }` — jede Rolle ist optional) — jedes Kind kann sein eigenes Stimmenpaar für Podcast/Sprachquiz haben
- **Thema pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatischer Wechsel beim Profilwechsel, serverseitig persistiert
- Projekte mit Profilen verknüpft über `profileId`
- Kaskadenlöschung: das Löschen eines Profils löscht alle seine Projekte

### API-Kostenverfolgung

Jeder abrechenbare Mistral-Aufruf (Chat, OCR, STT, TTS, Agents) wird instrumentiert, um dem Nutzer eine **transparente** €-Schätzung zu liefern. Die kostenlose Moderation wird nicht gezählt. Bekannte Einschränkung: die Tool-Gebühren der Agents (Websuche 30 $/1000 Aufrufe, Bildgenerierung 100 $/1000 Bilder) werden noch nicht gezählt — die angezeigten Kosten einer Illustration sind unterschätzt.

- **Quelle der Wahrheit**: `helpers/pricing.ts` — `MODEL_PRICING` pro Modell-Präfix (z. B.: `mistral-large` → Input 0.5 €/M Tokens, Output 1.5 €/M Tokens), `PRICING_SOURCES` mit Mistral-Dokumentations-URLs für periodisches Re-Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — Umrechnung gesteuert durch `helpers/cost-calc.ts`
- **Instrumentierungskette**: `helpers/tracked-client.ts` (wrapt Mistral-Client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Injection in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulierte Summe im Dashboard (`Project.totalCost`)
- **Endpoints**: die Antworten `/generate/*` und `/sources/*` dekorieren das zurückgegebene Objekt (Generation / Source) mit `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/route` fügt ein Feld `costDelta: number` für die Kosten des Routings allein hinzu. `GET /projects/:pid` gibt das Projekt angereichert um `totalCost` zurück (Summe berechnet aus `costLog[]`) + den vollständigen Verlauf

### TTS (Mistral Voxtral) & benutzerdefinierte Stimmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100 % Mistral-Sprachsynthese, kein zusätzlicher Schlüssel nötig
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API eigene Stimmen erstellen (aus einer Audio-Probe) und den Rollen Host/Gast zuweisen — Podcasts und Sprachquizze werden dann mit der Stimme eines Elternteils vorgelesen und machen das Erlebnis für das Kind noch immersiver
- Zwei konfigurierbare Stimmrollen: **Host** (Hauptnarrator) und **Gast** (zweite Stimme des Podcasts)
- Vollständiger Katalog der Mistral-Stimmen in den Einstellungen verfügbar, filterbar nach Sprache
### Internationalisierung

- Oberfläche verfügbar in 9 Sprachen: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache konfigurierbar pro Profil

---

## Technischer Stack

| Schicht | Technologie | Rolle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typsicherheit |
| **Backend** | Express 5.x | REST-API |
| **Dev-Server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partials, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, TypeScript kompiliert durch Vite |
| **Templating** | vite-plugin-handlebars | HTML-Zusammensetzung über Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Technik von Firefox Reader View) |
| **Headless browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS/SPA-Seiten — Scraping-Fallback |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Verwaltung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Konkatenation von Audio-Segmenten |
| **Tests** | Vitest | Unit-Tests — Abdeckung gemessen durch SonarCloud |
| **Persistenz** | JSON-Dateien | Speicherung ohne Abhängigkeit |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Merkblatt, Flashcards, Podcast, Quiz, Lückentexte, Chat, Überprüfung Quiz vocal, Agent Image, Agent Web Search, Anweisungserkennung | Bestes Multilingual + Befolgung von Anweisungen |
| `mistral-ocr-4-0` (OCR 4, Standard) | Dokumenten-OCR — höhere Qualität | Gedruckter Text, Tabellen, Handschrift ($4 / 1000 Seiten) |
| `mistral-ocr-2512` (OCR 3, Option) | Dokumenten-OCR | Auswählbar in den Einstellungen, günstiger ($2 / 1000 Seiten) |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Quiz vocal, Vorlesen |
| `mistral-moderation-2603` | Inhaltsmoderation | 5 blockierte Kategorien für Kind/Jugendliche (darunter `jailbreaking`) |
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

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Provider — kein zusätzlicher Schlüssel erforderlich außer `MISTRAL_API_KEY`.

> **Vom Benutzer eingegebener API-Schlüssel**: `MISTRAL_API_KEY` ist nun **optional**. Fehlt er, startet die App trotzdem und fordert jeden Benutzer auf, **seinen eigenen Mistral-Schlüssel** in der Oberfläche einzugeben. Der Schlüssel wird **im Browser gespeichert** (verschlüsselt über Web Crypto + IndexedDB in sicherem Kontext) und pro Anfrage gesendet — **niemals auf dem Server persistiert**. Vorrang: Profilschlüssel > globaler Browser-Schlüssel > `MISTRAL_API_KEY` (env). Das Setzen von `EUREKAI_REQUIRE_USER_KEY=true` zwingt jeden Benutzer, seinen Schlüssel anzugeben (der Env-Schlüssel dient dann nur noch für Vorladungen).

> **Lokales HTTPS (Tablet/LAN)**: `localhost` ist bereits ein sicherer Kontext. Für LAN-Zugriff (Tablet) ein lokales Zertifikat erzeugen und HTTPS aktivieren, um die Browser-Verschlüsselung freizuschalten und den Schlüssel während der Übertragung zu verschlüsseln:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral-API-Schlüssel (Chat, OCR, STT, TTS Voxtral, Agents, Moderation). Fehlt er, gibt der Benutzer seinen Schlüssel in der App ein (im Browser gespeichert, nie auf dem Server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → deaktiviert den Fallback auf `MISTRAL_API_KEY` für KI-Anfragen (jeder Benutzer MUSS seinen Schlüssel angeben). Nützlich bei einer exponierten Instanz |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | Pfade zu TLS-Schlüssel/Zertifikat (vgl. `scripts/gen-cert.sh`) → Express und Vite dienen über HTTPS (sicherer Kontext LAN/Tablet) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Wenn `production` → Express dient das Frontend aus `dist/` (sonst `public/`) |
| `SONAR_TOKEN` | optional CI | — | Wird ausschließlich vom GitHub-Actions-Workflow SonarCloud verwendet |

### Tests, Codequalität und Beitrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)**: `pre-commit` verkettet `scripts/pre-commit-fast.sh` (Konflikte, große Dateien, shellcheck), `lint-staged` dann `npm test` ; `pre-push` führt zuerst ein Gate `npm audit` aus (blockiert bei kritischer transitiver Schwachstelle, vgl. `scripts/audit-verdict.mjs`) und danach `npm run security`. Alle blockieren Commit/Push bei Fehlschlag.

**Erforderliche externe Tools (optional, aber verwendet von `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Ohne diese Tools schlägt `npm test` bei `pretest` fehl (lizard fehlt) und `npm run security` schlägt fehl (opengrep fehlt). Die Husky-Hooks blockieren dann Commit/Push.

---

## Bereitstellung mit Container

Das Image wird im **GitHub Container Registry** veröffentlicht:

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

> **`:U`** ist ein Podman-rootless-Flag, das die Volume-Berechtigungen automatisch anpasst.

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

> **Für KI-Mitwirkende**: [`CLAUDE.md`](CLAUDE.md) für den detaillierten Architekturkontext, die verpflichtenden Regeln (Anti-Leak-Prompts, Fehlercodes, Cost Tracking) und bekannte Fallstricke (Lizard CCN, Opengrep, Codacy/Semgrep-Migration) konsultieren.

---

## API-Referenz

### Config
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Modell) |
| `GET` | `/api/config/status` | Status der APIs: `mistral` (Mistral-Schlüssel gesetzt), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Provider) |
| `POST` | `/api/config/reset` | Konfiguration auf Standardwerte zurücksetzen |
| `GET` | `/api/config/voices` | Mistral-TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + altersabhängige Standardwerte |
| `POST` | `/api/providers/mistral/validate` | Vom Benutzer eingegebenen Mistral-Schlüssel validieren — immer 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), kein Env-Fallback |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Ein Profil erstellen |
| `PUT` | `/api/profiles/:id` | Ein Profil ändern (PIN erforderlich für < 15 Jahre) |
| `DELETE` | `/api/profiles/:id` | Ein Profil löschen + Kaskade Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Ein Projekt erstellen `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetails |
| `PUT` | `/api/projects/:pid` | Umbenennen `{name}` |
| `DELETE` | `/api/projects/:pid` | Das Projekt löschen |
| `GET` | `/api/projects/:pid/events` | Echtzeit-SSE-Stream (`event: generation`) der Generierungsübergänge (`completed`/`failed`/`cancelled`) + Heartbeat keep-alive |

### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateiimport (OCR für JPG/PNG/PDF, Direktlesen für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Stimme STT (Audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eine Quelle löschen |
| `POST` | `/api/projects/:pid/moderate` | Moderieren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Wiederholungsanweisungen erkennen |

### Generierung
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Wiederholungsmerkblatt |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktat (Wörter + Beispielsätze + Regeln, 1 TTS-Audio pro Wort; auch vom Auto-Router vorgeschlagen) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Erinnerungsmerkblatt gezielt auf die falsch beantworteten Fragen eines Quiz `{generationId, weakQuestions}` — parallel zu `quiz-review` vom Button „An meinen Fehlern üben“ aufgerufen |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der zu startenden Generatoren) — gibt `{plan, costDelta}` zurück (Kosten nur des Routings) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Backend-Generierung (Routing + 8 Typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallele Ausführung — setzt einen Mistral-Tier mit Rate-Limit ≥ 8 gleichzeitigen Anfragen voraus; andernfalls können mehrere 429 in `failedSteps` erscheinen. |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` und `remediation-summary` erfordern zusätzlich `{generationId, weakQuestions}`.

### CRUD Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Diktat-Antworten einreichen `{answers}` (strenger Server-Score) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort prüfen (Audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Vorlesen (Merkblätter/Flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Eine laufende Generierung abbrechen (einziger Abbruchweg für ein pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Umbenennen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Die Generierung löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chat-Verlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Eine Nachricht senden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chat-Verlauf löschen |

---

## Architekturentscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Footprint, leichte Reaktivität mit durch Vite kompiliertem TypeScript. Ideal für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Null Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren — starten und loslegen. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials für die Code-Organisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — leicht zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungs-System** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — ermöglicht mehrere Merkblätter, Quizze usw. pro Kurs. |
| **Altersangepasste Prompts** | 4 Altersgruppen mit unterschiedlichem Wortschatz, Komplexität und Ton — derselbe Inhalt lehrt je nach Lernendem unterschiedlich. |
| **Agentenbasierte Funktionen** | Bildgenerierung und Websuche nutzen temporäre Mistral-Agents — sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert gemischte URLs und Schlüsselwörter — URLs werden über Readability (statische Seiten) mit Lightpanda-Fallback (JS/SPA-Seiten) gescrapt, Schlüsselwörter lösen einen Mistral-Agent web_search aus. Jedes Ergebnis erzeugt eine unabhängige Quelle. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel außer `MISTRAL_API_KEY`) — Sprachsynthese integriert in die Kostenkette und die sprachabhängige Stimmzuordnung. |

---

## Credits & Danksagungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtes reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Extraktion von Webinhalten (Technik von Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser für das Scraping von JS/SPA-Seiten
- **[Luciole](https://luciole-vision.com)** — Schriftart für sehbehinderte Leser, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Option „Lesekomfort“ der Profile)

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig mit KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel von fr nach de übersetzt mit grok-4.5.**
