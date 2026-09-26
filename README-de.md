<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandelt beliebige Inhalte in ein interaktives Lernerlebnis – angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema – und die Idee entstand aus einer sehr konkreten Situation: Ich bereite regelmäßig Klassenarbeiten mit meiner Tochter vor und dachte mir, dass es dank KI möglich sein müsste, das Ganze spielerischer und interaktiver zu gestalten.

Das Ziel: **beliebige Eingaben** zu nehmen – ein Foto der Lektion, kopierten Text, eine Sprachaufnahme, eine Websuche – und daraus **Lernzettel, Flashcards, Quizze, Podcasts, Lückentexte, Illustrationen und mehr** zu erstellen. Das Ganze wird von den französischen Modellen von Mistral AI angetrieben, was es zu einer Lösung macht, die von Natur aus ideal für französischsprachige Schüler geeignet ist.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde innerhalb von 48 Stunden während des Hackathons als Proof of Concept rund um die Mistral-Dienste entwickelt – bereits funktionsfähig, aber begrenzt. Seitdem ist EurekAI zu einem echten Projekt herangewachsen: Lückentexte, Übungsnavigation, Web-Scraping, konfigurierbare elterliche Moderation, gründliche Code-Reviews und vieles mehr. Der gesamte Code wurde durch KI generiert – hauptsächlich mit [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Überblick

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Geführte Tour durch EurekAI: Quellen, Lernzettel, Quiz, Flashcards, Illustrationen" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — letzte Generierungen, geschätzte Kosten pro Karte und Gesamtprojekt, Schaltfläche „Auto — Magie!“ | ![Quellen](docs/screenshots/sources.webp)<br>**Quellen** — Import von Foto/PDF/Text/Sprache/Web, Ein-Klick-Generierung, Erkennung von Lernvorgaben |

Jede importierte Quelle zeigt ihren [OCR-Konfidenzwert, ihre Moderation und ihre geschätzten Kosten](docs/screenshots/sources-list.webp) an.

### Die Komponenten in Aktion

| | |
|---|---|
| ![Lernzettel](docs/screenshots/notes.gif)<br>**Lernzettel** — Kernpunkte, Wortschatz, belegte Zitate, Audio-Wiedergabe nach Abschnitten | ![Quiz](docs/screenshots/quiz.gif)<br>**Multiple-Choice-Quiz** — sofortiges Feedback mit Erklärung, schrittweise Navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — Karte zum Umdrehen und Selbsteinschätzung „Wusste ich / Wusste ich nicht“ | ![Lückentexte](docs/screenshots/fillblank.gif)<br>**Lückentexte** — Hinweis auf Abruf, fehlertolerante Validierung |
| ![Diktat](docs/screenshots/dictation.gif)<br>**Diktat** — diktiertes Wort per Audio, strikte Korrektur Buchstabe für Buchstabe | ![Sprach-Quiz](docs/screenshots/vocal-quiz.gif)<br>**Sprach-Quiz** — laut vorgelesene Frage, Antwort per Mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — Mini-Podcast mit 2 Stimmen, einsehbares Dialogskript | ![Illustrationen](docs/screenshots/illustrations.gif)<br>**Illustrationen** — durch Agenten generierte Lernbilder |
| ![KI-Tutor](docs/screenshots/chat.gif)<br>**KI-Tutor** — Chat verankert in Kursdokumenten, erklärte Antworten, kann Quiz und Flashcards generieren | |

### Erste Schritte

| | |
|---|---|
| ![Profilauswahl](docs/screenshots/login.gif)<br>**Profilauswahl** — jedes Kind hat seinen eigenen Bereich, Avatar und Sprache | ![Profilerstellung](docs/screenshots/profile-create.gif)<br>**Profilerstellung** — Alter, Avatar, Eltern-PIN für unter 15-Jährige |
| ![Kurserstellung](docs/screenshots/course.gif)<br>**Kurserstellung** — ein Projekt pro Lektion, bereit für die Aufnahme von Quellen | ![Einstellungen](docs/screenshots/settings.gif)<br>**Einstellungen** — API-Status, Auswahl der KI-Modelle mit Preisanzeige |

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Datei-Import** | Importieren Sie Ihre Lektionen – Foto, PDF (über Mistral OCR mit gemitteltem Konfidenzwert, Stufen `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sitzungen mit Wiederholungsversuchen pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Beliebigen Text direkt eingeben oder einfügen |
| 🎤 | **Spracheingabe** | Nehmen Sie Sprache auf – Voxtral STT transkribiert Ihre Stimme |
| 🌐 | **Web / URL** | URL einfügen (direktes Scraping via Readability + Lightpanda) oder Suchbegriffe eingeben (Mistral-Agent web_search) |
| 📄 | **Lernzettel** | Strukturierte Notizen mit Kernpunkten, Wortschatz, Zitaten, Anekdoten |
| 🃏 | **Flashcards** | Interaktive F&A-Karten, vorgelesener Dialog |
| ❓ | **Multiple-Choice-Quiz** | Multiple-Choice-Fragen mit adaptiver Wiederholung von Fehlern (konfigurierbare Anzahl) |
| ✏️ | **Lückentexte** | Ausfüllübungen mit Hinweisen und fehlertoleranter Validierung |
| 🔤 | **Diktat** | Diktierte Wörter per Audio (Voxtral TTS) aus einer importierten Liste, Tastatureingabe, strikte Korrektur Buchstabe für Buchstabe mit erklärter Rechtschreibregel |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio – Standard-Mistral-Stimmen oder benutzerdefinierte Stimmen (Eltern!) |
| 🖼️ | **Illustrationen** | Durch einen Mistral-Agenten generierte Lernbilder |
| 🗣️ | **Sprach-Quiz** | Laut vorgelesene Fragen (eigene Stimme möglich), mündliche Antwort, KI-Überprüfung |
| 💬 | **KI-Tutor** | Kontextbezogener Chat auf Basis Ihrer Kursdokumente mit Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 8 verfügbaren Typen vor |
| 🔒 | **Kindersicherung** | Konfigurierbare Moderation pro Profil (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachig** | Benutzeroberfläche in 9 Sprachen verfügbar; KI-Generierung in 15 Sprachen über Prompts steuerbar |
| 🔊 | **Vorlesefunktion** | Lernzettel und Flashcards anhören (Frage-Antwort-Dialog) über Mistral Voxtral TTS |
| 💶 | **API-Kostenverfolgung** | Transparente Schätzung der Kosten in € für jede Generierung und Quelle (Tokens / Zeichen / Seiten / Audiosekunden). Badge pro Karte + Gesamtsumme pro Projekt, sichtbar im Dashboard |
| 🎨 | **Design pro Profil** | Jedes Profil wählt sein `dark`- oder `light`-Design – bleibt beim Profilwechsel erhalten |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Modellzuordnung

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Benutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Im Detail — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Quellentypen, die je nach Profil moderiert werden (standardmäßig für Kinder und Teenager aktiviert):

- **Datei-Import** — JPG-, PNG- oder PDF-Dateien, verarbeitet mit Mistral OCR – **standardmäßig OCR 4 (`mistral-ocr-4-0`)** (beste Qualität), **optional OCR 3 (`mistral-ocr-2512`)** in den Einstellungen (günstiger, ~½ der Kosten) – für gedruckten Text, Tabellen und Handschrift; oder direkt importierte Textdateien (TXT, MD). Multi-Datei-Uploads nutzen ein System von **Upload-Sitzungen**: individueller Fortschritt pro Datei, Wiederholung fehlgeschlagener Dateien ohne erneutes Übertragen der anderen, Schließen der Sitzung nach Abschluss. Das OCR liefert einen gemittelten **Konfidenzwert** (`average`, begrenzt auf `[0,1]`, berechnet aus von Mistral zurückgegebenen `averagePageConfidenceScore`), der in der UI als Stufen-Badge `high` / `medium` / `low` angezeigt wird (Schwellenwerte ~0.9 / ~0.7) – warnt, ohne zu blockieren, wenn der Scan von schlechter Qualität ist. Die an Mistral für das OCR gesendete Dokumentkopie wird direkt nach Abschluss der Verarbeitung gelöscht, selbst im Fehlerfall.
- **Freitext** — Beliebigen Inhalt eingeben oder einfügen. Wird vor dem Speichern moderiert, falls die Moderation aktiv ist.
- **Spracheingabe** — Audio direkt im Browser aufnehmen. Transkribiert durch `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Eine oder mehrere URLs einfügen, um den Inhalt direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder Schlüsselwörter für eine Websuche über den Mistral-Agenten eingeben. Das Einzelfeld akzeptiert beides – URLs und Suchbegriffe werden automatisch getrennt, jedes Ergebnis erstellt eine eigenständige Quelle.

### KI-Inhaltsgenerierung

Acht Arten von generiertem Lernmaterial:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzettel** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Wortschatz, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | F&A-Karten mit Quellenverweisen (konfigurierbare Anzahl) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Multiple-Choice-Fragen, Erklärungen, adaptive Wiederholung (konfigurierbare Anzahl) |
| **Lückentexte** | `mistral-large-latest` | Lückensätze mit Hinweisen, fehlertolerante Validierung (Levenshtein) |
| **Diktat** | `mistral-large-latest` + Voxtral TTS | Schlüsselwörter per Audio diktiert (1 MP3/Wort) → Tastatureingabe → strikte Korrektur (Akzente) mit erklärter Regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | 2-Stimmen-Skript → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Lernbild über das Tool `image_generation` |
| **Sprach-Quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Überprüfung |

### KI-Tutor per Chat

Ein dialogorientierter Tutor mit vollständigem Zugriff auf die Kursdokumente:

- Verwendet `mistral-large-latest`
- **Tool-Aufrufe**: kann während der Unterhaltung Lernzettel, Flashcards, Quizze oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Moderation, falls für das Profil aktiviert: Die Nachricht wird überprüft, und gemeldete, fehlerhafte oder noch nicht überprüfte Quellen werden sowohl aus dem Kontext als auch aus den Tools ausgeschlossen (ihre Überprüfung wird zunächst erneut gestartet, maximal 5 s)

### Automatischer Router

Der Router verwendet `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und die relevantesten Generatoren unter den 8 verfügbaren vorzuschlagen. Die Benutzeroberfläche zeigt den Fortschritt in Echtzeit an: zuerst eine Analysephase, dann die einzelnen Generierungen mit Abbruchmöglichkeit.

### Adaptives Lernen

- **Quiz-Statistiken**: Erfassung von Versuchen und Genauigkeit pro Frage
- **Quiz-Wiederholung**: generiert 5–10 neue Fragen zu Schwachstellen auf Basis der Quellen des ursprünglichen Quiz (die Moderationsprüfung gilt für dieselben Quellen)
- **Erkennung von Lernvorgaben**: erkennt Lernanweisungen („Ich kann meine Lektion, wenn ich weiß...“) und priorisiert sie in kompatiblen textbasierten Generatoren (Lernzettel, Flashcards, Quiz, Lückentexte). Bei aktiver Moderation wartet die Erkennung auf die Verifizierung der Quellen und liest nur solche, die als sicher eingestuft wurden; die Lernvorgabe behält die Liste ihrer Ursprungsquellen, wird weder angezeigt noch angewendet, falls eine von ihnen gemeldet wird, und verschwindet mit ihr. Ihre Kosten werden erfasst

### Sicherheit & Kindersicherung

- **4 Altersgruppen**: Kind (≤10 Jahre), Teenager (11–15), Student (16–25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-2603` (Mistral Moderation 2) mit 11 verfügbaren Kategorien, 6 standardmäßig blockiert für neue Kind-/Teenager-Profile (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` hinzugefügt nach einem Test an 50 Lektionen, einschließlich Geschichte, ohne ein einziges False Positive). Kategorien pro Profil in den Einstellungen anpassbar; Moderation 2 hat die ehemalige Kategorie „Gefährliche Inhalte“ in `dangerous` + `criminal` aufgeteilt (bestehende Profile werden automatisch migriert, und blockierte Kategorien gelten auch für bereits importierte Quellen). Standardmäßige Sicherheit: Wenn die Antwort des Modells die Überprüfung einer blockierten Kategorie nicht zulässt, wird der Inhalt abgelehnt („Moderation nicht verfügbar“); bei aktiver Moderation schließen sowohl die Generierung als auch der Chat gemeldete, fehlerhafte oder in Prüfung befindliche Quellen aus. Eine nie geprüfte Quelle (bei deaktivierter Moderation importiert, altes verknüpftes Projekt) wird vor der Nutzung geprüft; eine durch Neustart unterbrochene oder fehlgeschlagene Moderation wird automatisch wieder aufgenommen (beim Start, sofern der Serverschlüssel dies erlaubt, andernfalls beim Öffnen des Projekts oder bei der nächsten Generierung), und eine Schaltfläche „Erneut prüfen“ startet sie auf Abruf neu. Der Inhalt einer gemeldeten oder in Prüfung befindlichen Quelle wird für das Kind verborgen (Vorschau, Text, Originaldokument); ein Elternteil kann ihn mit seiner PIN für die Dauer der Einsicht anzeigen lassen. Die mündliche Antwort beim Sprach-Quiz wird moderiert, bevor sie überprüft wird. Festgepinnte datierte ID in `helpers/moderation-model.ts`: Der veraltete Alias `-latest` wird von der API nicht mehr aufgeführt.
- **Eltern-PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren; maximal 10 falsche Codes pro Viertelstunde und IP-Adresse (429 `rate_limited`). Für einen produktiven Einsatz sollte ein langsamer Hash mit Salt (Argon2id, bcrypt) vorgesehen werden.
- **Serverdaten**: `/output` stellt nur die Medien der Projekte bereit (Audio, Bilder, importierte Dateien); `profiles.json`, `config.json` und die Projektdateien werden niemals öffentlich ausgeliefert
- **Chat-Einschränkungen**: KI-Chat für unter 16-Jährige standardmäßig deaktiviert, von Eltern aktivierbar

### Multi-Profil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- **Stimmen pro Profil** (`Profile.mistralVoices?: { host?, guest? }` — jede Rolle ist optional) — jedes Kind kann sein eigenes Stimmenpaar für Podcast/Sprach-Quiz haben
- **Design pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatischer Wechsel beim Profilwechsel, im Backend persistiert
- Projekte über `profileId` mit Profilen verknüpft; ein altes Projekt ohne Profil wird dem ersten Profil zugeordnet, das es öffnet, und anschließend gemäß diesem Profil moderiert
- Kaskadierende Löschung: Das Löschen eines Profils löscht alle zugehörigen Projekte

### API-Kostenverfolgung

Jeder abrechenbare Mistral-Aufruf (Chat, OCR, STT, TTS, Agenten), einschließlich Anweisungserkennung und mündlicher Antworten des Sprachquiz, wird instrumentiert, um dem Benutzer eine **transparente** Schätzung in € zu liefern. Die Moderation ist kostenlos und wird nicht mitgezählt. Die Tool-Gebühren der Agenten sind inbegriffen: 0,03 $ pro Websuche und 0,10 $ pro generiertem Bild (Mistral-Tarife), zuzüglich der von diesen Tools erzeugten Tokens, die zum Eingabetarif des Agentenmodells veranschlagt werden.

- **Maßgebliche Quelle**: `helpers/pricing.ts` — `MODEL_PRICING` nach Modell-Präfix (z. B.: `mistral-large` → Input 0,5 €/M Tokens, Output 1,5 €/M Tokens), `PRICING_SOURCES` mit Mistral-Dokumentations-URLs für periodisches erneutes Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — Konvertierung gesteuert durch `helpers/cost-calc.ts`
- **Instrumentierungskette**: `helpers/tracked-client.ts` (Mistral-Client-Wrapper) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Injektion in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulierte Gesamtsumme im Dashboard (`Project.totalCost`)
- **Endpunkte**: Die Antworten `/generate/*` und `/sources/*` versehen das zurückgegebene Objekt (Generation / Source) mit `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/route` fügt ein Feld `costDelta: number` allein für die Routing-Kosten hinzu; `POST /detect-consigne` (`{consigne, costDelta}`) und die Überprüfung einer mündlichen Antwort geben ebenfalls ihre `costDelta` zurück. `GET /projects/:pid` gibt das Projekt angereichert mit `totalCost` (berechnete Summe aus `costLog[]`) + den vollständigen Verlauf zurück

### TTS (Mistral Voxtral) & benutzerdefinierte Stimmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100 % Mistral-Sprachsynthese, kein zusätzlicher Schlüssel erforderlich
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API eigene Stimmen erstellen (aus einer Audiodatei) und diese den Rollen Moderator/Gast zuweisen – Podcasts und Sprachquizze werden dann mit der Stimme eines Elternteils vorgelesen, was das Erlebnis für das Kind noch immersiver macht
- Zwei konfigurierbare Sprecherrollen: **Moderator** (Haupterzähler) und **Gast** (zweite Stimme des Podcasts)
- Vollständiger Katalog der Mistral-Stimmen in den Einstellungen verfügbar, filterbar nach Sprache

### Internationalisierung

- Benutzeroberfläche in 9 Sprachen verfügbar: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache pro Profil konfigurierbar

---

## Technischer Stack

| Schicht | Technologie | Rolle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typsicherheit |
| **Backend** | Express 5.x | REST-API |
| **Dev-Server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partials, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Benutzeroberfläche, von Vite kompiliertes TypeScript |
| **Templating** | vite-plugin-handlebars | HTML-Komposition mittels Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agenten, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion von Hauptinhalten aus Webseiten (Firefox-Reader-View-Technologie) |
| **Headless-Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS/SPA-Seiten – Fallback-Scraping |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Verwaltung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Konkatenation von Audiosegmenten |
| **Tests** | Vitest | Unit-Tests – Abdeckung gemessen durch SonarCloud |
| **Persistenz** | JSON-Dateien | Abhängigkeitsfreie Speicherung |

---

## Modellreferenz

| Modell | Verwendung | Grund |
|---|---|---|
| `mistral-large-latest` | Lernzettel, Flashcards, Podcast, Quiz, Lückentexte, Chat, Überprüfung Sprachquiz, Bild-Agent, Web-Search-Agent, Anweisungserkennung | Beste Mehrsprachigkeit + Anweisungsbefolgung |
| `mistral-ocr-4-0` (OCR 4, Standard) | Dokumenten-OCR – überlegene Qualität | Gedruckter Text, Tabellen, Handschrift (4 $ / 1000 Seiten) |
| `mistral-ocr-2512` (OCR 3, Option) | Dokumenten-OCR | In Einstellungen wählbar, günstiger (2 $ / 1000 Seiten) |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Sprachquiz, Vorlesen |
| `mistral-moderation-2603` | Inhaltsmoderation | 6 blockierte Kategorien für Kinder/Teenager (darunter `jailbreaking`) |
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

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Provider – kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus erforderlich.

> **Vom Benutzer eingegebener API-Schlüssel**: `MISTRAL_API_KEY` ist jetzt **optional**. Fehlt er, startet die App trotzdem und fordert jeden Benutzer auf, **seinen eigenen Mistral-Schlüssel** in der Benutzeroberfläche einzugeben. Der Schlüssel wird **im Browser gespeichert** (verschlüsselt über Web Crypto + IndexedDB im sicheren Kontext) und pro Anfrage gesendet – **niemals auf dem Server persistiert**. Rangfolge: Profilschlüssel > globaler Browserschlüssel > `MISTRAL_API_KEY` (Env). Das Setzen von `EUREKAI_REQUIRE_USER_KEY=true` zwingt jeden Benutzer, seinen Schlüssel bereitzustellen (der Env-Schlüssel dient nur noch für Preloads).

> **Lokales HTTPS (Tablet/LAN)**: `localhost` ist bereits ein sicherer Kontext. Für einen LAN-Zugriff (Tablet) erzeugen Sie ein lokales Zertifikat und aktivieren Sie HTTPS, um die Browser-Verschlüsselung freizuschalten und den Schlüssel bei der Übertragung zu verschlüsseln:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral-API-Schlüssel (Chat, OCR, STT, Voxtral TTS, Agenten, Moderation). Wenn nicht vorhanden, gibt der Benutzer seinen Schlüssel in der App ein (im Browser gespeichert, niemals auf dem Server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → deaktiviert den Fallback auf `MISTRAL_API_KEY` für KI-Anfragen (jeder Benutzer MUSS seinen Schlüssel bereitstellen). Nützlich bei einer exponierten Instanz |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | TLS-Schlüssel-/Zertifikatspfade (siehe `scripts/gen-cert.sh`) → Express und Vite liefern über HTTPS aus (sicherer LAN-/Tablet-Kontext) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Wenn `production` → Express liefert das Frontend aus `dist/` aus (sonst `public/`) |
| `SONAR_TOKEN` | optional CI | — | Wird ausschließlich vom SonarCloud GitHub Actions-Workflow verwendet |

### Tests, Codequalität und Beitrag

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)**: `pre-commit` führt nacheinander `scripts/pre-commit-fast.sh` (Konflikte, große Dateien, ShellCheck), `lint-staged` und dann `npm test` aus; `pre-push` führt zuerst ein `npm audit`-Gate aus (blockiert bei transitiven kritischen Sicherheitslücken, siehe `scripts/audit-verdict.mjs`) und dann `npm run security`. Alle blockieren bei Fehlern den Commit/Push.

**Erforderliche externe Tools (optional, aber von `pretest` / `npm run security` verwendet)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Ohne diese Tools schlägt `npm test` bei `pretest` fehl (lizard fehlt) und `npm run security` schlägt fehl (opengrep fehlt). Die Husky-Hooks blockieren dann den Commit/Push.

---

## Bereitstellung mit Containern

Das Image wird in der **GitHub Container Registry** veröffentlicht:

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

> **`:U`** ist ein Podman-Rootless-Flag, das die Berechtigungen des Volumes automatisch anpasst.

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

> **Für KI-Mitwirkende**: Siehe [`CLAUDE.md`](CLAUDE.md) für den detaillierten Architekturkontext, die verbindlichen Regeln (Anti-Leak-Prompts, Fehlercodes, Kostenverfolgung) und bekannte Fallstricke (Lizard CCN, Opengrep, Codacy/Semgrep-Migration).

---

## API-Referenz

### Konfiguration
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Modell) |
| `GET` | `/api/config/status` | API-Status: `mistral` (Mistral-Schlüssel definiert), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Provider) |
| `POST` | `/api/config/reset` | Konfiguration auf Standard zurücksetzen |
| `GET` | `/api/config/voices` | Mistral TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Standardwerte nach Alter |
| `POST` | `/api/providers/mistral/validate` | Vom Benutzer eingegebenen Mistral-Schlüssel validieren — immer 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), kein Env-Fallback |

### Profile
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Profil erstellen |
| `PUT` | `/api/profiles/:id` | Profil bearbeiten (PIN erforderlich für < 15 Jahre; 10 falsche PINs / 15 Min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Profil löschen + Kaskade für Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Projekt `{name, profileId}` erstellen |
| `GET` | `/api/projects/:pid` | Projektdetails; `?profileId=` ordnet ein Projekt ohne Profil dem Profil zu, das es öffnet |
| `PUT` | `/api/projects/:pid` | Umbenennen `{name}` |
| `DELETE` | `/api/projects/:pid` | Projekt löschen |
| `GET` | `/api/projects/:pid/events` | Echtzeit-SSE-Stream (`event: generation`) von Generierungsübergängen (`completed`/`failed`/`cancelled`) + Keep-Alive-Heartbeat |

### Quellen
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateiimport (OCR für JPG/PNG/PDF, direktes Lesen für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Sprach-STT (Multipart-Audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück; 422 `url_blocked`, wenn alle Adressen abgelehnt werden (internes Netzwerk), 502 `all_sources_failed`, wenn keine Quelle erstellt werden konnte |
| `POST` | `/api/projects/:pid/sources/moderate` | Ausstehende oder fehlgeschlagene Moderationen wiederaufnehmen `{sourceIds?}` (höchstens 10 pro Aufruf, Wartezeit ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eine Quelle, ihre importierte Datei und die davon abhängige Anweisung löschen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderieren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Lernanweisungen erkennen (nur verifizierte Quellen) → `{consigne, costDelta}` |

### Generierung
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernzettel |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktat (Wörter + Beispielsätze + Regeln, 1 TTS-Audio pro Wort; auch vom Auto-Router vorgeschlagen) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprachquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Gezielter Wiederholungszettel zu den verfehlten Fragen eines Quiz `{generationId, weakQuestions}` — wird parallel zu `quiz-review` über die Schaltfläche „Meine Fehler üben“ aufgerufen |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der auszuführenden Generatoren) — gibt `{plan, costDelta}` zurück (Kosten nur für das Routing) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Backend-Generierung (Routing + 8 Typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallele Ausführung — setzt ein Mistral-Tier mit Rate-Limit ≥ 8 gleichzeitigen Anfragen voraus; andernfalls können mehrere 429-Fehler in `failedSteps` auftreten. |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; ein `lang`, der kein Sprachcode ist (z. B. `pt-BR`), oder ein unbekanntes `ageGroup` → 400 `invalid_input`, noch vor jedem KI-Aufruf. `quiz-review` und `remediation-summary` erfordern zusätzlich `{generationId, weakQuestions}` und beziehen sich auf die Quellen des ursprünglichen Quiz.

### CRUD Generierungen
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Diktat-Antworten übermitteln `{answers}` (strenge Server-Bewertung) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort überprüfen (Audio + questionIndex); moderierte Antwort (400 `quiz.answerBlocked`), Kosten zurückgegeben in `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Vorlesen (Lernzettel/Flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Eine laufende Generierung abbrechen (einziger Weg, ein Pending abzubrechen) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Umbenennen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generierung und ihre Medien (Audio, Bild) löschen |

### Chat
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Nachricht senden `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatverlauf löschen |

---

## Architekturentscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Speicherbedarf, leichtgewichtige Reaktivität mit von Vite kompiliertem TypeScript. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Null Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren – einfach starten und loslegen. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials zur Codeorganisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` – einfach zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungs-System** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID – ermöglicht mehrere Lernzettel, Quizze usw. pro Kurs. |
| **Altersangepasste Prompts** | 4 Altersgruppen mit unterschiedlichem Vokabular, unterschiedlicher Komplexität und Tonalität – derselbe Inhalt lehrt je nach Lernendem unterschiedlich. |
| **Agentenbasierte Funktionen** | Bildgenerierung und Websuche verwenden temporäre Mistral-Agenten – sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert URLs und Schlüsselwörter gemischt – URLs werden über Readability (statische Seiten) mit Fallback auf Lightpanda (JS/SPA-Seiten) gescrapt, Schlüsselwörter triggern einen Mistral-Agenten web_search. Jedes Ergebnis erzeugt eine unabhängige Quelle. |
| **100 % Mistral TTS** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus) – Sprachsynthese integriert in die Kostenkette und Stimmenauflösung nach Sprache. |

---

## Credits & Danksagung

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-First-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Extraktion von Webinhalten (Technologie der Firefox-Leseansicht)
- **[Lightpanda](https://lightpanda.io)** — Ultraschlanker Headless-Browser für das Scraping von JS/SPA-Seiten
- **[Luciole](https://luciole-vision.com)** — Schriftart für sehbehinderte Personen, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Option „Lesekomfort“ in den Profilen)

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig durch KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel übersetzt aus dem Französischen ins Deutsche mit gemini-3.8-flash-medium.**
