<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandle beliebige Inhalte in ein interaktives Lernerlebnis — unterstützt von <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Qualitätsprüfung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Sicherheitsbewertung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Zuverlässigkeitsbewertung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Wartbarkeitsbewertung"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Testabdeckung"></a>
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

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) im März 2026. Ich brauchte ein Thema — und die Idee entstand aus etwas sehr Konkretem: Ich bereite regelmäßig mit meiner Tochter Klassenarbeiten vor und dachte mir, dass es möglich sein müsste, dies mithilfe von KI spielerischer und interaktiver zu gestalten.

Das Ziel: **beliebige Eingaben** — ein Foto der Lektion, kopierten und eingefügten Text, eine Sprachaufnahme, eine Websuche — in **Lernzettel, Flashcards, Quizze, Podcasts, Lückentexte, Illustrationen und mehr** zu verwandeln. Das Ganze wird von den Modellen des französischen Unternehmens Mistral AI unterstützt, wodurch EurekAI ganz natürlich auf die Bedürfnisse französischsprachiger Schülerinnen und Schüler zugeschnitten ist.

Der [ursprüngliche Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde während des Hackathons innerhalb von 48 Stunden als auf Mistral-Diensten basierender Machbarkeitsnachweis entwickelt — bereits funktionsfähig, aber eingeschränkt. Seitdem ist EurekAI zu einem echten Projekt geworden: Lückentexte, Navigation durch die Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliche Codeüberprüfung und vieles mehr. Der gesamte Code wurde durch KI generiert — hauptsächlich mit [Claude Code](https://code.claude.com/), ergänzt durch einige Beiträge über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Überblick

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Geführter Rundgang durch EurekAI: Quellen, Lernzettel, Quiz, Flashcards, Illustrationen" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — neueste Generierungen, geschätzte Kosten pro Karte und Gesamtkosten des Projekts, Schaltfläche „Auto — Magie!“ | ![Quellen](docs/screenshots/sources.webp)<br>**Quellen** — Import von Foto/PDF/Text/Sprache/Web, Generierung mit einem Klick, Erkennung von Lernanweisungen |

Für jede importierte Quelle werden ihr [OCR-Konfidenzwert, ihr Moderationsstatus und ihre geschätzten Kosten](docs/screenshots/sources-list.webp) angezeigt.

### Die Komponenten in Aktion

| | |
|---|---|
| ![Lernzettel](docs/screenshots/notes.gif)<br>**Lernzettel** — Kernpunkte, Vokabular, Quellenzitate, Audio-Wiedergabe pro Abschnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**Multiple-Choice-Quiz** — genau eine richtige Antwort pro Frage, sofortiges Feedback mit Erklärung, schrittweise Navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — Karten zum Umdrehen mit anschließender Selbsteinschätzung „Ich wusste es / Ich wusste es nicht“ | ![Lückentexte](docs/screenshots/fillblank.gif)<br>**Lückentexte** — Hinweis auf Anfrage, tolerante Validierung |
| ![Diktat](docs/screenshots/dictation.gif)<br>**Diktat** — als Audio diktiertes Wort, strenge Korrektur Buchstabe für Buchstabe | ![Sprachquiz](docs/screenshots/vocal-quiz.gif)<br>**Sprachquiz** — laut vorgelesene Frage, Antwort über das Mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — Mini-Podcast mit 2 Stimmen, einsehbares Dialogskript | ![Illustrationen](docs/screenshots/illustrations.gif)<br>**Illustrationen** — von einem Agent generierte Lernbilder |
| ![KI-Tutor](docs/screenshots/chat.gif)<br>**KI-Tutor** — in den Kursdokumenten verankerter Chat mit erklärten Antworten, der Quizze und Flashcards generieren kann | |

### Erste Schritte

| | |
|---|---|
| ![Profilauswahl](docs/screenshots/login.gif)<br>**Profilauswahl** — jedes Kind hat seinen eigenen Bereich, Avatar und seine eigene Sprache | ![Profilerstellung](docs/screenshots/profile-create.gif)<br>**Profilerstellung** — Alter, Avatar, Eltern-PIN für unter 15-Jährige |
| ![Kurserstellung](docs/screenshots/course.gif)<br>**Kurserstellung** — ein Projekt pro Lektion, bereit für die Aufnahme von Quellen | ![Einstellungen](docs/screenshots/settings.gif)<br>**Einstellungen** — API-Status, Auswahl der KI-Modelle mit angezeigten Preisen |

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Dateiimport** | Importieren Sie Ihre Lektionen — als Foto, PDF (über Mistral OCR mit gemitteltem Konfidenzwert und den Stufen `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sitzungen mit Wiederholungsoption pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Geben Sie beliebigen Text direkt ein oder fügen Sie ihn ein |
| 🎤 | **Spracheingabe** | Nehmen Sie Ihre Stimme auf — Voxtral STT transkribiert sie |
| 🌐 | **Web / URL** | Fügen Sie eine URL ein (direktes Scraping über Readability + Lightpanda) oder geben Sie eine Suchanfrage ein (Mistral Agent web_search) |
| 📄 | **Lernzettel** | Strukturierte Notizen mit Kernpunkten, Vokabular, Zitaten und Anekdoten |
| 🃏 | **Flashcards** | Interaktive Frage-Antwort-Karten, dialogische Audio-Wiedergabe |
| ❓ | **Multiple-Choice-Quiz** | Fragen mit 4 Auswahlmöglichkeiten und genau einer richtigen Antwort sowie adaptiver Wiederholung von Fehlern (Anzahl konfigurierbar) |
| ✏️ | **Lückentexte** | Ergänzungsübungen mit Hinweisen und toleranter Validierung |
| 🔤 | **Diktat** | Aus einer importierten Liste als Audio diktierte Wörter (Voxtral TTS), Tastatureingabe, strenge Korrektur Buchstabe für Buchstabe mit erklärter Rechtschreibregel |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio — standardmäßige Mistral-Stimmen oder personalisierte Stimmen (der Eltern!) |
| 🖼️ | **Illustrationen** | Von einem Mistral Agent generierte Lernbilder |
| 🗣️ | **Sprachquiz** | Laut vorgelesene Fragen (personalisierte Stimme möglich), mündliche Antwort, KI-Prüfung |
| 💬 | **KI-Tutor** | Kontextbezogener Chat mit Ihren Kursdokumenten und Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 8 verfügbaren Typen vor |
| 🔒 | **Elterliche Kontrolle** | Pro Profil konfigurierbare Moderation (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachigkeit** | Benutzeroberfläche in 9 Sprachen verfügbar; KI-Generierung über die Prompts in 15 Sprachen steuerbar |
| 🔊 | **Vorlesefunktion** | Hören Sie sich Lernzettel und Flashcards (Dialog aus Frage und Antwort) über Mistral Voxtral TTS an |
| 💶 | **Nachverfolgung der API-Kosten** | Transparente Schätzung der Kosten in € für jede Generierung und Quelle (Tokens / Zeichen / Seiten / Audiosekunden). Abzeichen pro Karte + Gesamtbetrag pro Projekt, sichtbar im Dashboard |
| 🎨 | **Profilbezogenes Theme** | Jedes Profil wählt sein Theme `dark` oder `light` — es wird mit dem Profil gespeichert und bei jedem Profilwechsel erneut angewendet |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architekturübersicht" width="800" />
</p>

---

## Übersicht zur Modellnutzung

<p align="center">
  <img src="public/assets/model-map.webp" alt="Zuordnung von KI-Modellen zu Aufgaben" width="800" />
</p>

---

## Benutzerablauf

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernablauf für Schülerinnen und Schüler" width="800" />
</p>

---

## Detaileinblick — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Arten von Quellen, die je nach Profil moderiert werden (für Kinder- und Jugendprofile ist die Moderation standardmäßig aktiviert):

- **Dateiimport** — JPG-, PNG- oder PDF-Dateien, die von Mistral OCR verarbeitet werden — standardmäßig **OCR 4.1 (`mistral-ocr-4-1`)**, optional **OCR 3 (`mistral-ocr-2512`)** in den Einstellungen (günstiger, etwa die Hälfte der Kosten; liest Handschrift besser) — für gedruckten Text, Tabellen und Handschrift; oder direkt importierte Textdateien (TXT, MD). Uploads mehrerer Dateien verwenden ein System von **Upload-Sitzungen**: individueller Fortschritt pro Datei, erneuter Versuch für eine fehlgeschlagene Datei, ohne die anderen erneut zu übermitteln, und Schließen der Sitzung nach Abschluss. OCR stellt einen gemittelten **Konfidenzwert** bereit (`average`, in `[0,1]` begrenzt und aus den von Mistral zurückgegebenen `averagePageConfidenceScore` berechnet), der in der Benutzeroberfläche als Abzeichen der Stufe `high` / `medium` / `low` angezeigt wird (Schwellenwerte etwa 0,9 / etwa 0,7) — er warnt bei schlechter Scanqualität, ohne den Vorgang zu blockieren. Die für OCR an Mistral gesendete Kopie des Dokuments wird unmittelbar nach Abschluss der Verarbeitung gelöscht, auch wenn diese fehlschlägt.
- **Freitext** — Geben Sie beliebige Inhalte ein oder fügen Sie sie ein. Bei aktiver Moderation werden sie vor dem Speichern moderiert.
- **Spracheingabe** — Nehmen Sie Audio im Browser auf. Die Transkription erfolgt durch `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Fügen Sie eine oder mehrere URLs ein, um den Inhalt direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder geben Sie Schlüsselwörter für eine Websuche über Mistral Agent ein. Das gemeinsame Feld akzeptiert beides — URLs und Schlüsselwörter werden automatisch getrennt, und jedes Ergebnis erzeugt eine eigene Quelle.

### Generierung von KI-Inhalten

Acht Arten generierter Lernmaterialien:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzettel** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | Frage-Antwort-Karten mit Quellenverweisen (Anzahl konfigurierbar) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Fragen mit 4 Auswahlmöglichkeiten und genau einer richtigen Antwort, Erklärungen, adaptive Wiederholung (Anzahl konfigurierbar) |
| **Lückentexte** | `mistral-large-latest` | Zu ergänzende Sätze mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Diktat** | `mistral-large-latest` + Voxtral TTS | Als Audio diktierte Schlüsselwörter (1 MP3/Wort) → Tastatureingabe → strenge Korrektur (ein fehlender Akzent zählt als Fehler) mit erklärter Regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skript mit 2 Stimmen → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Lernbild über das Tool `image_generation` |
| **Sprachquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Prüfung |

### KI-Tutor per Chat

Ein dialogorientierter Tutor mit vollständigem Zugriff auf die Kursdokumente:

- Verwendet `mistral-large-latest`
- **Tool-Aufrufe**: Kann während der Unterhaltung Lernzettel, Flashcards, Quizze oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Moderation, falls sie für das Profil aktiviert ist: Die Nachricht wird geprüft; markierte Quellen, Quellen mit fehlgeschlagener Prüfung und noch nicht geprüfte Quellen werden aus dem Kontext und den Tools ausgeschlossen (die Prüfung von Quellen mit fehlgeschlagener oder noch nicht erfolgter Prüfung wird zunächst erneut gestartet, höchstens 5 s lang)

### Automatischer Router

Der Router verwendet `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und aus den 8 verfügbaren Generatoren die relevantesten vorzuschlagen. Die Benutzeroberfläche zeigt den Fortschritt in Echtzeit an: zuerst eine Analysephase, anschließend die einzelnen Generierungen, die abgebrochen werden können.

### Adaptives Lernen

- **Quizstatistiken**: Nachverfolgung der Versuche und der Genauigkeit pro Frage
- **Quizwiederholung**: Generiert 5–10 neue Fragen, die auf schwache Konzepte abzielen, basierend auf den Quellen des ursprünglichen Quiz (die Moderationsprüfung bezieht sich auf dieselben Quellen)
- **Erkennung von Lernanweisungen**: Erkennt Lernanweisungen („Ich beherrsche meine Lektion, wenn ich … kann“) und priorisiert sie in kompatiblen textbasierten Generatoren (Lernzettel, Flashcards, Quizze, Lückentexte). Bei aktiver Moderation wartet die Erkennung auf die Prüfung der Quellen und liest nur diejenigen, die als sicher eingestuft wurden; die Lernanweisung behält die Liste ihrer ursprünglichen Quellen bei: Wird eine davon markiert, wird die Lernanweisung weder angezeigt noch angewendet, und wird eine davon gelöscht, wird auch die Lernanweisung gelöscht. Ihre Kosten werden erfasst

### Sicherheit & elterliche Kontrolle

- **4 Altersgruppen**: Kind (≤10 Jahre), Jugendlicher (11–15), Student (16–25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-2603` (Mistral Moderation 2) mit 11 verfügbaren Kategorien, von denen 6 bei neuen Kinder- und Jugendprofilen standardmäßig blockiert sind (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` wurde nach einer Auswertung von 50 Lektionen einschließlich Geschichte ohne einen einzigen Fehlalarm hinzugefügt). Die Kategorien können pro Profil in den Einstellungen angepasst werden; Moderation 2 hat die frühere Kategorie „gefährliche Inhalte“ in `dangerous` + `criminal` aufgeteilt (bestehende Profile werden automatisch migriert, und die blockierten Kategorien gelten auch für bereits importierte Quellen). Standardmäßige Sicherheit: Wenn sich anhand der Antwort des Modells eine blockierte Kategorie nicht überprüfen lässt, wird der Inhalt abgelehnt („Moderation nicht verfügbar“); bei aktiver Moderation schließen sowohl die Generierung als auch der Chat markierte Quellen, Quellen mit fehlgeschlagener Prüfung und Quellen aus, deren Prüfung noch läuft. Eine noch nie geprüfte Quelle (importiert, als die Moderation deaktiviert war, oder ein altes, einem Profil zugeordnetes Projekt) wird vor der Verwendung geprüft. Eine durch einen Neustart unterbrochene Moderation wird beim Start fortgesetzt, sofern der Serverschlüssel dies erlaubt; andernfalls wird sie ebenso wie eine fehlerhaft beendete Moderation beim Öffnen des Projekts oder bei der nächsten Generierung fortgesetzt. Eine Schaltfläche „Erneut prüfen“ startet die Prüfung bei Bedarf erneut. Bei aktiver Moderation bleibt der Inhalt einer Quelle für das Kind verborgen (Vorschau, Text, Originaldokument), solange sie nicht als sicher eingestuft wurde; ein Elternteil kann ihn mit seiner PIN für eine einmalige Ansicht einblenden. Die mündliche Antwort im Sprachquiz wird moderiert, bevor sie geprüft wird. Datierte ID, festgelegt in `helpers/moderation-model.ts`: Der veraltete Alias `-latest` wird von der API nicht mehr aufgeführt.
- **Eltern-PIN**: SHA-256-Hash, für Profile von unter 15-Jährigen erforderlich; höchstens 10 falsche Codes pro Viertelstunde und IP-Adresse (429 `rate_limited`). Für eine Produktionsbereitstellung sollte ein langsamer Hash mit Salt (Argon2id, bcrypt) verwendet werden.
- **Serverdaten**: `/output` veröffentlicht ausschließlich die Medien der Projekte (Audio, Bilder, importierte Dateien); `profiles.json`, `config.json`, `projects.json` und die `project.json` werden niemals bereitgestellt
- **Chat-Einschränkungen**: Der KI-Chat ist für unter 16-Jährige standardmäßig deaktiviert und kann von den Eltern aktiviert werden

### Mehrprofilsystem

- Mehrere Profile mit Name, Alter, Avatar und Spracheinstellungen
- **Stimmen pro Profil** (`Profile.mistralVoices?: { host?, guest? }` — jede Rolle ist optional) — jedes Kind kann sein eigenes Stimmenpaar für Podcast und Sprachquiz haben
- **Theme pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatischer Wechsel beim Profilwechsel, dauerhaft im Backend gespeichert
- Projekte werden über `profileId` mit Profilen verknüpft; ein altes Projekt ohne Profil wird dem ersten Profil zugeordnet, das es öffnet, und anschließend gemäß diesem Profil moderiert
- Kaskadierendes Löschen: Beim Löschen eines Profils werden alle zugehörigen Projekte gelöscht
### Nachverfolgung der API-Kosten

Jeder kostenpflichtige Mistral-Aufruf (Chat, OCR, STT, TTS, Agents), einschließlich Anweisungserkennung und mündlicher Antworten im Sprachquiz, wird instrumentiert, um dem Benutzer eine **transparente** Kostenschätzung in € bereitzustellen. Die kostenlose Moderation wird nicht berücksichtigt. Die Tool-Kosten der Agents sind enthalten: 0,03 $ pro Websuche und 0,10 $ pro generiertem Bild (Mistral-Tarife), zuzüglich der von diesen Tools erzeugten Tokens, die in der Schätzung zum Eingabetarif des Agent-Modells berechnet werden.

- **Single Source of Truth**: `helpers/pricing.ts` — `MODEL_PRICING` pro Modellpräfix (z. B. `mistral-large` → Eingabe 0,5 €/M Tokens, Ausgabe 1,5 €/M Tokens), `PRICING_SOURCES` mit URLs zur Mistral-Dokumentation für regelmäßiges erneutes Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — durch `helpers/cost-calc.ts` gesteuerte Umrechnung
- **Instrumentierungskette**: `helpers/tracked-client.ts` (umschließt den Mistral-Client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Einfügung in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulierte Gesamtsumme im Dashboard (`Project.totalCost`)
- **Endpoints**: Die Antworten `/generate/*` und `/sources/*` ergänzen das zurückgegebene Objekt (`Generation` / `Source`) um `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/route` fügt ein Feld `costDelta: number` ausschließlich für die Routing-Kosten hinzu; `POST /detect-consigne` (`{consigne, costDelta}`) und die Überprüfung einer mündlichen Antwort geben ebenfalls ihre `costDelta` zurück. `GET /projects/:pid` gibt das um `totalCost` angereicherte Projekt zurück (aus `costLog[]` berechnete Summe) sowie den vollständigen Verlauf

### TTS (Mistral Voxtral) und benutzerdefinierte Stimmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100 % Mistral-Sprachsynthese, kein zusätzlicher Schlüssel erforderlich
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API eigene Stimmen erstellen (ausgehend von einer Audioaufnahme) und sie den Rollen Host/Gast zuweisen — Podcasts und Sprachquiz werden dann mit der Stimme eines Elternteils vorgelesen, wodurch das Erlebnis für das Kind noch immersiver wird
- Zwei konfigurierbare Sprechrollen: **Host** (Haupterzähler) und **Gast** (zweite Stimme des Podcasts)
- Vollständiger Katalog der Mistral-Stimmen in den Einstellungen verfügbar, nach Sprache filterbar

### Internationalisierung

- Benutzeroberfläche in 9 Sprachen verfügbar: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache pro Profil konfigurierbar

---

## Technischer Stack

| Ebene | Technologie | Rolle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typsicherheit |
| **Backend** | Express 5.x | REST API |
| **Entwicklungsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partials, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Benutzeroberfläche, durch Vite kompiliertes TypeScript |
| **Templating** | vite-plugin-handlebars | HTML-Zusammenstellung aus Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Firefox-Reader-View-Technologie) |
| **Headless Browser** | Lightpanda | Extrem schlanker Headless Browser (Zig + V8) für JS-/SPA-Seiten — Scraping-Fallback |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Uploads** | Multer 2.x | Verarbeitung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Verkettung von Audiosegmenten |
| **Tests** | Vitest | Unit-Tests — Abdeckung gemessen durch SonarCloud |
| **Persistenz** | JSON-Dateien | Speicherung ohne Abhängigkeiten |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Lernblatt, Flashcards, Podcast, Quiz, Lückentexte, Chat, Überprüfung des Sprachquiz, Image Agent, Web Search Agent, Anweisungserkennung | Beste Mehrsprachigkeit + Befolgung von Anweisungen |
| `mistral-ocr-4-1` (OCR 4.1, Standard) | OCR von Dokumenten | Gedruckter Text, Tabellen, Handschrift (4 $ / 1000 Seiten) |
| `mistral-ocr-2512` (OCR 3, optional) | OCR von Dokumenten | In den Einstellungen auswählbar, günstiger (2 $ / 1000 Seiten), erkennt Handschrift besser |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Sprachquiz, Vorlesen |
| `mistral-moderation-2603` | Inhaltsmoderation | 6 für Kinder/Jugendliche gesperrte Kategorien (darunter `jailbreaking`) |
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

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Provider — über `MISTRAL_API_KEY` hinaus ist kein zusätzlicher Schlüssel erforderlich.

> **Vom Benutzer eingegebener API-Schlüssel**: `MISTRAL_API_KEY` ist jetzt **optional**. Fehlt er, startet die App trotzdem und fordert jeden Benutzer dazu auf, **seinen eigenen Mistral-Schlüssel** in der Benutzeroberfläche einzugeben. Der Schlüssel wird **im Browser gespeichert** (in einem sicheren Kontext mittels Web Crypto + IndexedDB verschlüsselt) und mit jeder Anfrage übertragen — **niemals auf dem Server persistiert**. Priorität: Profilschlüssel > globaler Browser-Schlüssel > `MISTRAL_API_KEY` (Umgebungsvariable). Durch das Setzen von `EUREKAI_REQUIRE_USER_KEY=true` muss jeder Benutzer seinen Schlüssel angeben (der Schlüssel aus der Umgebungsvariable dient dann nur noch zum Vorladen).

> **Lokales HTTPS (Tablet/LAN)**: `localhost` ist bereits ein sicherer Kontext. Generiere für den LAN-Zugriff (Tablet) ein lokales Zertifikat und aktiviere HTTPS: Der Browser kann dann den gespeicherten Schlüssel verschlüsseln, und der Schlüssel wird während der Übertragung verschlüsselt:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral-API-Schlüssel (Chat, OCR, STT, TTS Voxtral, Agents, Moderation). Fehlt er, gibt der Benutzer seinen Schlüssel in der App ein (im Browser gespeichert, niemals auf dem Server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → deaktiviert den Fallback auf `MISTRAL_API_KEY` für KI-Anfragen (jeder Benutzer MUSS seinen Schlüssel angeben). Nützlich bei einer öffentlich erreichbaren Instanz |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | Pfade zu TLS-Schlüssel/-Zertifikat (siehe `scripts/gen-cert.sh`) → Express und Vite stellen HTTPS bereit (sicherer Kontext für LAN/Tablet) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Bei `production` → Express stellt das Frontend aus `dist/` bereit (andernfalls `public/`) |
| `SONAR_TOKEN` | optional in CI | — | Wird ausschließlich vom GitHub-Actions-Workflow für SonarCloud verwendet |

### Tests, Codequalität und Mitwirkung

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)**: `pre-commit` führt nacheinander `scripts/pre-commit-fast.sh` (Konflikte, große Dateien, shellcheck), `lint-staged` und anschließend `npm test` aus; `pre-push` führt zuerst die blockierende Prüfung `npm audit` aus (blockiert, sobald eine Abhängigkeit, auch eine transitive, eine Schwachstelle der Stufe `critical` aufweist, siehe `scripts/audit-verdict.mjs`), danach `npm run security`. Jeder Hook blockiert den Commit/Push, sobald einer seiner Schritte fehlschlägt.

**Externe Tools (optional zum Starten der Anwendung, erforderlich für `pretest` und `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Ohne diese Tools schlägt `npm test` bei `pretest` fehl (lizard fehlt), und `npm run security` schlägt ebenfalls fehl (opengrep fehlt). Die Husky-Hooks blockieren dann den Commit/Push.

---

## Bereitstellung mit Container

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

> **`:U`**: Rootless-Podman-Flag, das die Berechtigungen des Volumes automatisch anpasst.

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

> **Für KI-Agents, die am Code mitwirken**: Siehe [`CLAUDE.md`](CLAUDE.md) für den detaillierten Architekturkontext, die verbindlichen Regeln (Fehlercodes, Cost Tracking und Prompts ohne Metawörter, also ohne Bezeichnungen des Dokuments wie dessen Typ, da das Modell diese Wörter in seine Ausgaben übernehmen würde) und bekannte Fallstricke (Lizard CCN, Opengrep, Codacy-/Semgrep-Migration).

---

## API-Referenz

### Konfiguration
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Modell) |
| `GET` | `/api/config/status` | API-Status: `mistral` (Mistral-Schlüssel definiert), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Provider) |
| `POST` | `/api/config/reset` | Standardkonfiguration wiederherstellen |
| `GET` | `/api/config/voices` | Mistral-TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Standardwerte nach Alter |
| `POST` | `/api/providers/mistral/validate` | Einen vom Benutzer eingegebenen Mistral-Schlüssel validieren — immer 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), kein Fallback auf die Umgebungsvariable |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Profil erstellen |
| `PUT` | `/api/profiles/:id` | Profil ändern (PIN für unter 15-Jährige erforderlich; 10 falsche PINs / 15 Min. → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Profil löschen + kaskadierendes Löschen der Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Projekt erstellen `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetails; `?profileId=` ordnet ein Projekt ohne Profil dem Profil zu, das es öffnet |
| `PUT` | `/api/projects/:pid` | `{name}` umbenennen |
| `DELETE` | `/api/projects/:pid` | Projekt löschen |
| `GET` | `/api/projects/:pid/events` | SSE-Echtzeit-Stream (`event: generation`) der Generierungsübergänge (`completed`/`failed`/`cancelled`) + Keep-alive-Heartbeat |

### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateiimport (OCR für JPG/PNG/PDF, direktes Lesen für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-Spracheingabe (Multipart-Audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Quellen-Array zurück; 422 `url_blocked`, wenn alle Adressen abgelehnt werden (internes Netzwerk), 502 `all_sources_failed`, wenn keine Quelle erstellt werden konnte |
| `POST` | `/api/projects/:pid/sources/moderate` | Ausstehende oder fehlerhafte Moderationen `{sourceIds?}` fortsetzen (höchstens 10 pro Aufruf, Wartezeit ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eine Quelle, ihre importierte Datei und die davon abhängige Anweisung löschen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | `{text}` moderieren |
| `POST` | `/api/projects/:pid/detect-consigne` | Lernanweisungen erkennen (nur verifizierte Quellen) → `{consigne, costDelta}` |

### Generierung
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernblatt |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz (4 Auswahlmöglichkeiten, nur eine richtige Antwort) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktat (Wörter + Beispielsätze + Regeln, 1 TTS-Audio pro Wort; wird auch vom Auto-Router vorgeschlagen) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprachquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptives Lernen `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Wiederholungsblatt, das gezielt auf die falsch beantworteten Fragen eines Quiz ausgerichtet ist `{generationId, weakQuestions}` — wird über die Schaltfläche zur Wiederholung in der Quizansicht parallel zu `quiz-review` aufgerufen |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der zu startenden Generatoren) — gibt `{plan, costDelta}` zurück (nur die Routing-Kosten) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Generierung im Backend (Routing + 8 Typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Parallele Ausführung — setzt einen Mistral-Tier mit einem Rate-Limit von ≥ 8 gleichzeitigen Anfragen voraus; andernfalls können mehrere 429-Fehler in `failedSteps` erscheinen. |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; ein unbekanntes `ageGroup` oder ein `lang`, das kein gültiger Sprachcode ist (erwartet: `fr`, `pt-BR` …), führt vor jedem KI-Aufruf zu 400 `invalid_input`. `quiz-review` und `remediation-summary` erfordern zusätzlich `{generationId, weakQuestions}` und beziehen sich auf die Quellen des ursprünglichen Quiz.

### CRUD für Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantworten übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antworten für Lückentexte übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Diktatantworten übermitteln `{answers}` (strenge serverseitige Bewertung) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort überprüfen (Audio + questionIndex); die mündliche Antwort wird vor der Überprüfung moderiert (Ablehnung: 400 `quiz.answerBlocked`), die Kosten werden in `costDelta` zurückgegeben |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Vorlesen per TTS (Lernblätter/Flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Laufende Generierung abbrechen (einzige Möglichkeit zum Abbrechen eines pending-Status) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` umbenennen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generierung und zugehörige Medien (Audio, Bild) löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Nachricht senden `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatverlauf löschen |

---

## Architekturentscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Footprint, schlanke Reaktivität mit durch Vite kompiliertem TypeScript. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Keine Abhängigkeiten, sofortiger Start. Keine zu konfigurierende Datenbank — starten und loslegen. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials für die Codeorganisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — einfach zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **System für mehrere Generierungen** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — ermöglicht mehrere Lernblätter, Quiz usw. pro Kurs. |
| **Altersgerechte Prompts** | 4 Altersgruppen mit unterschiedlichem Wortschatz, unterschiedlicher Komplexität und unterschiedlichem Ton — derselbe Inhalt wird je nach Lernendem unterschiedlich vermittelt. |
| **Auf Agents basierende Funktionen** | Die Bildgenerierung und Websuche verwenden temporäre Mistral Agents — sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert gemischte URLs und Schlüsselwörter — URLs werden über Readability (statische Seiten) mit Lightpanda als Fallback (JS-/SPA-Seiten) gescrapt, Schlüsselwörter lösen einen Mistral Agent mit web_search aus. Jedes Ergebnis erstellt eine eigenständige Quelle. |
| **100 % Mistral TTS** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus) — in die Kostenkette und die sprachabhängige Stimmenauflösung integrierte Sprachsynthese. |

---
## Danksagungen & Anerkennungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-First-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Extraktion von Webinhalten (Technologie der Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Besonders leichtgewichtiger Headless-Browser zum Scraping von JS-/SPA-Seiten
- **[Luciole](https://luciole-vision.com)** — Schriftart für sehbehinderte Leser, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Option „Lesekomfort“ der Profile)

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig durch KI mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/) entwickelt.

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel, der mit gpt-5.6-sol aus dem Französischen ins Deutsche übersetzt wurde.**
