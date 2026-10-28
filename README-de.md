<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandelt jeden Inhalt in ein interaktives Lernerlebnis — angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam aus etwas sehr Konkretem: Ich bereite mich regelmäßig mit meiner Tochter auf Klassenarbeiten vor und dachte mir, dass es mithilfe von KI doch möglich sein müsste, das Ganze spielerischer und interaktiver zu gestalten.

Das Ziel: **jede beliebige Eingabe** — ein Foto der Unterrichtsstunde, einen kopierten Text, eine Sprachaufnahme, eine Websuche — zu nehmen und in **Lernzettel, Flashcards, Quizze, Podcasts, Lückentexte, Illustrationen und vieles mehr** zu verwandeln. Das alles angetrieben von den Modellen von Mistral AI, einem französischen Unternehmen, was EurekAI zu einer Lösung macht, die von Natur aus ideal auf französischsprachige Schülerinnen und Schüler zugeschnitten ist.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde während des Hackathons in 48 Stunden als Proof of Concept auf Basis der Mistral-Dienste entwickelt — bereits funktionsfähig, aber noch begrenzt. Seitdem ist EurekAI zu einem echten Projekt herangewachsen: Lückentexte, Navigation durch die Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliches Code-Review und vieles mehr. Der gesamte Code wird durch KI generiert — hauptsächlich mit [Claude Code](https://code.claude.com/), ergänzt durch einige Beiträge über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Vorschau

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Geführte Tour durch EurekAI: Quellen, Lernzettel, Quiz, Flashcards, Illustrationen" width="820" />
</p>

| | |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.webp)<br>**Dashboard** — letzte Generierungen, geschätzte Kosten pro Karte und Projektgesamtsumme, Button „Auto — Magie!“ | ![Quellen](docs/screenshots/sources.webp)<br>**Quellen** — Import von Foto/PDF/Text/Sprache/Web, Generierung mit einem Klick, Aufgabenerkennung |

Jede importierte Quelle zeigt ihren [OCR-Konfidenzwert, ihren Moderationsstatus und ihre geschätzten Kosten](docs/screenshots/sources-list.webp) an.

### Die Komponenten in Aktion

| | |
|---|---|
| ![Lernzettel](docs/screenshots/notes.gif)<br>**Lernzettel** — Kernpunkte, Vokabular, belegte Zitate, Audio-Vorlesefunktion pro Abschnitt | ![Quiz](docs/screenshots/quiz.gif)<br>**Multiple-Choice-Quiz** — nur eine richtige Antwort pro Frage, sofortiges Feedback mit Erklärung, Schritt-für-Schritt-Navigation |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — Karte zum Umdrehen mit anschließender Selbsteinschätzung „wusste ich / wusste ich nicht“ | ![Lückentexte](docs/screenshots/fillblank.gif)<br>**Lückentexte** — Hinweis auf Abruf, fehlertolerante Validierung |
| ![Diktat](docs/screenshots/dictation.gif)<br>**Diktat** — per Audio diktiertes Wort, strenge Korrektur Buchstabe für Buchstabe | ![Sprachquiz](docs/screenshots/vocal-quiz.gif)<br>**Sprachquiz** — laut vorgelesene Frage, Antwort über das Mikrofon |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — Mini-Podcast mit 2 Stimmen, einsehbares Dialogskript | ![Illustrationen](docs/screenshots/illustrations.gif)<br>**Illustrationen** — vom Agenten generierte Lernbilder |
| ![KI-Tutor](docs/screenshots/chat.gif)<br>**KI-Tutor** — in den Kursdokumenten verankerter Chat, erklärte Antworten, kann Quizze und Flashcards generieren | |

### Erste Schritte

| | |
|---|---|
| ![Profilauswahl](docs/screenshots/login.gif)<br>**Profilauswahl** — jedes Kind hat seinen eigenen Bereich, seinen Avatar und seine Sprache | ![Profilerstellung](docs/screenshots/profile-create.gif)<br>**Profilerstellung** — Alter, Avatar, Eltern-PIN für Kinder unter 15 Jahren |
| ![Kurserstellung](docs/screenshots/course.gif)<br>**Kurserstellung** — ein Projekt pro Lektion, bereit für das Hinzufügen von Quellen | ![Einstellungen](docs/screenshots/settings.gif)<br>**Einstellungen** — API-Status, Auswahl der KI-Modelle mit angezeigten Preisen |

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Datei-Import** | Importieren Sie Ihre Unterrichtsmaterialien — Foto, PDF (über Mistral OCR mit gemitteltem Konfidenzwert, Stufen `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sitzungen mit Wiederholungsversuch pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Tippen oder fügen Sie beliebigen Text direkt ein |
| 🎤 | **Spracheingabe** | Nehmen Sie sich selbst auf — Voxtral STT transkribiert Ihre Stimme |
| 🌐 | **Web / URL** | Fügen Sie eine URL ein (direktes Scraping über Readability + Lightpanda) oder geben Sie eine Suchanfrage ein (Mistral-Agent web_search) |
| 📄 | **Lernzettel** | Strukturierte Notizen mit Kernpunkten, Vokabular, Zitaten und Anekdoten |
| 🃏 | **Flashcards** | Interaktive Frage-/Antwort-Karten, dialogbasierte Audio-Wiedergabe |
| ❓ | **Multiple-Choice-Quiz** | Fragen mit 4 Auswahlmöglichkeiten und genau einer richtigen Antwort, mit adaptiver Wiederholung von Fehlern (Anzahl konfigurierbar) |
| ✏️ | **Lückentexte** | Ausfüllübungen mit Hinweisen und fehlertoleranter Validierung |
| 🔤 | **Diktat** | Per Audio diktierte Wörter (Voxtral TTS) aus einer importierten Liste, Tastatureingabe, strenge Korrektur Buchstabe für Buchstabe mit erklärter Rechtschreibregel |
| 🎙️ | **Podcast** | Audio-Mini-Podcast mit 2 Stimmen — Standardstimmen von Mistral oder benutzerdefinierte Stimmen (Eltern!) |
| 🖼️ | **Illustrationen** | Von einem Mistral-Agenten generierte Lernbilder |
| 🗣️ | **Sprachquiz** | Laut vorgelesene Fragen (eigene Stimme möglich), mündliche Antwort, KI-Überprüfung |
| 💬 | **KI-Tutor** | Kontextbezogener Chat mit Ihren Kursdokumenten, inklusive Tool-Aufrufen (Tool Calling) |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 8 verfügbaren Typen vor |
| 🔁 | **Kursübergreifende Kontinuität** | Importe, automatische Generierungen, Mikrofonaufnahmen, Chat, Websuche und Vorlesefunktion laufen in ihrem jeweiligen Kurs weiter, wenn ein anderer Kurs geöffnet wird; eine Benachrichtigung nennt den Kurs, sobald der Vorgang dort abgeschlossen ist |
| 🔒 | **Kindersicherung** | Pro Profil konfigurierbare Moderation (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachig** | Benutzeroberfläche in 9 Sprachen verfügbar; KI-Generierung über die Prompts in 15 Sprachen steuerbar |
| 🔊 | **Vorlesefunktion** | Hören Sie sich Lernzettel und Flashcards (Frage-/Antwort-Dialog) über Mistral Voxtral TTS an |
| 💶 | **API-Kostenverfolgung** | Transparente Schätzung der Kosten in € für jede Generierung und Quelle (Tokens / Zeichen / Seiten / Audio-Sekunden). Badge pro Karte + Gesamtsumme pro Projekt, sichtbar im Dashboard |
| 🎨 | **Design pro Profil** | Jedes Profil wählt sein eigenes Design `dark` oder `light` — wird mit dem Profil gespeichert und bei jedem Profilwechsel wieder angewendet |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architekturübersicht" width="800" />
</p>

---

## Modell-Einsatzkarte

<p align="center">
  <img src="public/assets/model-map.webp" alt="Zuordnung von KI-Modellen zu Aufgaben" width="800" />
</p>

---

## Benutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernreise der Schüler" width="800" />
</p>

---

## Detaillierter Einblick — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Arten von Quellen, die je nach Profil moderiert werden (Moderation ist für Kinder- und Teenager-Profile standardmäßig aktiviert):

- **Datei-Import** — JPG-, PNG- oder PDF-Dateien, die über Mistral OCR verarbeitet werden — standardmäßig **OCR 4.1** (`mistral-ocr-4-1`), optional **OCR 3** (`mistral-ocr-2512`) in den Einstellungen (günstiger, ~½ der Kosten; liest Handschrift besser) — für gedruckten Text, Tabellen und Handschrift; oder direkt importierte Textdateien (TXT, MD). Multi-Datei-Uploads nutzen ein System von **Upload-Sitzungen**: individueller Fortschritt pro Datei, erneuter Versuch für fehlgeschlagene Dateien ohne erneutes Hochladen der anderen, Schließen der Sitzung nach Abschluss. Die OCR liefert einen gemittelten **Konfidenzwert** (`average`, begrenzt auf `[0,1]`, berechnet aus den von Mistral zurückgegebenen `averagePageConfidenceScore`), der in der Benutzeroberfläche als Stufen-Badge `high` / `medium` / `low` (Schwellenwerte ~0.9 / ~0.7) angezeigt wird — warnt bei schlechter Scan-Qualität, ohne zu blockieren. Die zur OCR an Mistral gesendete Dokumentkopie wird sofort nach Abschluss der Verarbeitung gelöscht, selbst im Fehlerfall.
- **Freitext** — Tippen oder fügen Sie beliebige Inhalte ein. Wird vor dem Speichern moderiert, sofern die Moderation aktiviert ist.
- **Spracheingabe** — Nehmen Sie Audio direkt im Browser auf. Wird standardmäßig von **Voxtral Mini Transcribe 2** (`voxtral-mini-2602`) transkribiert; **Voxtral Mini Transcribe 3** und **Voxtral Small Transcribe 3** (Mistral-Vorschau) sind optional in den Einstellungen wählbar. Die Sprache der Benutzeroberfläche wird an das Modell übergeben (`language`), um die Erkennung zu optimieren.
- **Web / URL** — Fügen Sie eine oder mehrere URLs ein, um den Inhalt direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder geben Sie Suchbegriffe für eine Websuche über den Mistral-Agenten ein. Das einzelne Eingabefeld akzeptiert beides — URLs und Suchbegriffe werden automatisch getrennt, und jedes Ergebnis erstellt eine unabhängige Quelle.

### KI-Inhaltsgenerierung

Acht Arten von generiertem Lernmaterial:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzettel** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | Frage-/Antwort-Karten mit Quellenverweisen (Anzahl konfigurierbar) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Fragen mit 4 Auswahlmöglichkeiten und genau einer richtigen Antwort, Erklärungen, adaptive Wiederholung (Anzahl konfigurierbar) |
| **Lückentexte** | `mistral-large-latest` | Zu vervollständigende Sätze mit Hinweisen, fehlertolerante Validierung (Levenshtein) |
| **Diktat** | `mistral-large-latest` + Voxtral TTS | Per Audio diktierte Schlüsselwörter (1 MP3/Wort) → Tastatureingabe → strenge Korrektur (ein vergessener Akzent zählt als Fehler) mit erklärter Regel |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skript für 2 Stimmen → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Lernbild über das Tool `image_generation` |
| **Sprachquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Überprüfung |

### KI-Chat-Tutor

Ein dialogorientierter Tutor mit vollem Zugriff auf die Kursdokumente:

- Nutzt `mistral-large-latest`
- **Tool-Aufrufe (Tool Calling)**: kann während des Gesprächs Lernzettel, Flashcards, Quizze oder Lückentexte generieren
- Verlauf von 50 Nachrichten pro Kurs
- Moderation, falls für das Profil aktiviert: Die Nachricht wird überprüft, und gemeldete Quellen, Quellen mit fehlgeschlagener Überprüfung sowie noch nicht überprüfte Quellen werden aus dem Kontext und den Tools ausgeschlossen (die Überprüfung fehlgeschlagener oder noch nicht überprüfter Quellen wird zuvor erneut angestoßen, maximal 5 s)

### Automatischer Router

Der Router nutzt `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und die relevantesten Generatoren aus den 8 verfügbaren vorzuschlagen. Die Benutzeroberfläche zeigt den Fortschritt in Echtzeit an: zuerst eine Analysephase, danach die einzelnen Generierungen mit der Möglichkeit zum Abbrechen.

Der Auto-Modus läuft auf dem Server: Er läuft weiter, wenn die Seite neu geladen wird, wenn ein anderer Kurs geöffnet oder das Profil gewechselt wird, und pro Kurs läuft jeweils nur ein Auto-Vorgang gleichzeitig (ein zweiter Tab schließt sich dem laufenden Vorgang an). Der Server startet maximal 3 Generierungen gleichzeitig pro Mistral-Schlüssel. Jede abgeschlossene Generierung hat ihre eigene Meldung, und am Ende wird einmalig eine Gesamtbilanz angezeigt; wird der Vorgang abgeschlossen, während ein anderer Kurs geöffnet ist, nennt die Meldung den entsprechenden Kurs. Eine einzeln abgebrochene Generierung zählt in der Bilanz nicht als Fehler. „Alles abbrechen“ stoppt den gesamten Stapel des Kurses mit einer einzigen Meldung. Falls der Server während eines Auto-Vorgangs neu startet, wird dieser als unterbrochen markiert und bietet eine Schaltfläche „Fortsetzen“, die nur die noch nicht abgeschlossenen Generierungen neu startet, ohne die Analyse zu wiederholen.

Maximal 3 über den Tab gestartete lange Generierungen laufen gleichzeitig (einzeln gestartete Generierungen, Wiederholungs-Lernzettel): Die folgenden warten, bis sie an der Reihe sind, und ein Kurs lässt sich öffnen, ohne auf das Ende laufender Generierungen warten zu müssen.

### Adaptives Lernen

- **Quiz-Statistiken**: Verfolgung der Versuche und der Genauigkeit pro Frage
- **Quiz-Wiederholung**: generiert 5-10 neue Fragen, die gezielt auf Schwachstellen eingehen, basierend auf den Quellen des ursprünglichen Quiz (der Moderationsschutz bezieht sich auf genau diese Quellen)
- **Aufgabenerkennung**: erkennt Lernziele („Ich kann meine Lektion, wenn ich weiß...“) und priorisiert sie in den kompatiblen textbasierten Generatoren (Lernzettel, Flashcards, Quiz, Lückentexte). Bei aktiver Moderation wartet die Erkennung auf die Überprüfung der Quellen und liest nur diejenigen, die als sicher eingestuft wurden; das Lernziel speichert die Liste seiner Ursprungsquellen: Wird eine davon nachträglich gemeldet, wird das Lernziel weder angezeigt noch angewendet, und wird eine davon gelöscht, wird das Lernziel entfernt. Die Kosten dafür werden erfasst

### Sicherheit & Kindersicherung

- **4 Altersgruppen**: Kind (≤10 Jahre), Jugendlicher (11-15), Student (16-25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-2603` (Mistral Moderation 2) mit 11 verfügbaren Kategorien, davon 6 standardmäßig für neue Kinder-/Jugendprofile blockiert (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` wurde nach einer Auswertung von 50 Lektionen, einschließlich Geschichte, ohne ein einziges falsch-positives Ergebnis hinzugefügt). Kategorien sind pro Profil in den Einstellungen anpassbar; Moderation 2 hat die alte Kategorie „gefährliche Inhalte" in `dangerous` + `criminal` aufgeteilt (bestehende Profile werden automatisch migriert, und die blockierten Kategorien gelten auch für bereits importierte Quellen). Standardmäßige Sicherheit: Wenn die Antwort des Modells die Überprüfung einer blockierten Kategorie nicht zulässt, wird der Inhalt abgelehnt („Moderation nicht verfügbar"); bei aktiver Moderation schließen sowohl die Generierung als auch der Chat gemeldete Quellen, Quellen mit fehlgeschlagener Überprüfung sowie Quellen, die gerade überprüft werden, aus. Eine noch nie überprüfte Quelle (die importiert wurde, als die Moderation deaktiviert war, oder aus einem alten Projekt stammt, das einem Profil zugeordnet wurde) wird vor der Verwendung überprüft. Eine durch einen Neustart unterbrochene Moderation wird beim Start wieder aufgenommen, sofern der Serverschlüssel dies zulässt; andernfalls wird sie, genau wie eine fehlgeschlagene Moderation, beim Öffnen des Projekts oder bei der nächsten Generierung wieder aufgenommen. Über eine Schaltfläche „Erneut überprüfen" lässt sich die Überprüfung bei Bedarf neu starten. Solange eine Quelle bei aktiver Moderation nicht als sicher eingestuft wurde, wird ihr Inhalt für das Kind ausgeblendet (Vorschau, Text, Originaldokument); ein Elternteil kann ihn mit seiner PIN für eine einmalige Ansicht einblenden. Die mündliche Antwort beim Sprachquiz wird moderiert, bevor sie überprüft wird. Datierte ID fest in `helpers/moderation-model.ts` hinterlegt: Der veraltete Alias `-latest` wird von der API nicht mehr aufgeführt.
- **Eltern-PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren; maximal 10 falsche Codes pro Viertelstunde und IP-Adresse (429 `rate_limited`). Für einen Produktiveinsatz sollte ein langsamer Hash mit Salt (Argon2id, bcrypt) vorgesehen werden.
- **Serverdaten**: `/output` veröffentlicht nur die Medien der Projekte (Audio, Bilder, importierte Dateien); `profiles.json`, `config.json`, `projects.json` und die `project.json` werden niemals ausgeliefert
- **Chat-Einschränkungen**: KI-Chat für Nutzer unter 16 Jahren standardmäßig deaktiviert, durch Eltern aktivierbar

### Multi-Profil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- **Stimme pro Profil** (`Profile.mistralVoices?: { host?, guest? }` — jede Rolle ist optional) — jedes Kind kann sein eigenes Stimmenpaar für Podcast/Sprachquiz haben
- **Design pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatischer Wechsel beim Profilwechsel, im Backend gespeichert
- Projekte sind über `profileId` mit Profilen verknüpft; ein altes Projekt ohne Profil wird dem ersten Profil zugeordnet, das es öffnet, und anschließend gemäß diesem Profil moderiert
- Kaskadierende Löschung: Das Löschen eines Profils löscht alle zugehörigen Projekte

### API-Kostenverfolgung

Jeder kostenpflichtige Mistral-Aufruf (Chat, OCR, STT, TTS, Agenten), einschließlich Aufgabenerkennung und mündlicher Antworten im Sprachquiz, wird erfasst, um dem Benutzer eine **transparente** €-Schätzung bereitzustellen. Die kostenlose Moderation wird nicht mitgezählt. Die Tool-Gebühren der Agenten sind enthalten: 0,03 $ pro Websuche und 0,10 $ pro generiertem Bild (Mistral-Tarife) zuzüglich der von diesen Tools erzeugten Tokens, die bei der Schätzung zum Input-Tarif des Agentenmodells berechnet werden.

- **Single Source of Truth**: `helpers/pricing.ts` — `MODEL_PRICING` nach Modellpräfix (z. B.: `mistral-large` → Input 0.5 €/M Tokens, Output 1.5 €/M Tokens), `PRICING_SOURCES` mit Mistral-Doku-URLs für regelmäßiges Re-Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — Umrechnung gesteuert durch `helpers/cost-calc.ts`
- **Instrumentierungskette**: `helpers/tracked-client.ts` (umschließt den Mistral-Client) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Injektion in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulierte Gesamtsumme im Dashboard (`Project.totalCost`)
- **Endpunkte**: Die Antworten von `/generate/*` und `/sources/*` ergänzen das zurückgegebene Objekt (`Generation` / `Source`) um `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/route` fügt ein Feld `costDelta: number` allein für die Routing-Kosten hinzu; `POST /detect-consigne` (`{consigne, costDelta}`) und die Überprüfung einer mündlichen Antwort geben ebenfalls ihre `costDelta` zurück. `GET /projects/:pid` gibt das Projekt angereichert mit `totalCost` (berechnete Summe aus `costLog[]`) + dem vollständigen Verlauf zurück

### TTS (Mistral Voxtral) & benutzerdefinierte Stimmen

- **Mistral Voxtral TTS**: **Voxtral TTS** (`voxtral-mini-tts-2603`) standardmäßig, **Voxtral TTS 3** (`voxtral-mini-tts-3-0`, Mistral-Vorschau, native Stimmen in weiteren Sprachen) als Option in den Einstellungen; Sprachsynthese zu 100 % von Mistral, kein zusätzlicher Schlüssel erforderlich. Es werden nur Stimmen angeboten, die das gewählte Modell akzeptiert: Voxtral TTS lehnt Stimmen ab, die mit Voxtral 3 hinzugefügt wurden
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API (aus einer Audioprobe) ihre eigenen Stimmen erstellen und sie den Rollen Moderator/Gast zuweisen — Podcasts und Sprachquizze werden dann mit der Stimme eines Elternteils vorgelesen, was das Erlebnis für das Kind noch immersiver macht
- Zwei konfigurierbare Sprecherrollen: **Moderator** (Haupterzähler) und **Gast** (zweite Stimme im Podcast)
- Vollständiger Katalog der Mistral-Stimmen in den Einstellungen verfügbar, nach Sprache filterbar
- Eine Wiedergabe (Lernblatt, Podcast, Diktatwort) wird pausiert, wenn man ihre Ansicht verlässt, und setzt dort fort, wo sie gestoppt wurde
- Das Audio für das Vorlesen der Lernkarten wird beim ersten Anhören erstellt und dann in deren Generierung gespeichert: Es wird bei einer Rückkehr weder neu erstellt noch erneut berechnet
- Die Quellenmarkierungen (`[Source N]`) werden nicht laut vorgelesen

### Internationalisierung

- Benutzeroberfläche verfügbar in 9 Sprachen: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache pro Profil konfigurierbar

---

## Technischer Stack

| Schicht | Technologie | Rolle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typsicherheit |
| **Backend** | Express 5.x | REST-API |
| **Entwicklungsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Partials, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, TypeScript kompiliert durch Vite |
| **Templating** | vite-plugin-handlebars | HTML-Komposition über Partials |
| **KI** | Mistral AI SDK | Chat, OCR, STT, TTS, Agenten, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603` (Voxtral TTS 3 als Option), integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Technologie aus Firefox Reader View) |
| **Headless Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS-/SPA-Seiten — Scraping-Fallback |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Verarbeitung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Verkettung von Audiosegmenten |
| **Tests** | Vitest | Unit-Tests — Abdeckung gemessen durch SonarCloud |
| **Persistenz** | JSON-Dateien | Abhängigkeitsfreie Speicherung |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Lernblatt, Lernkarten, Podcast, Quiz, Lückentexte, Chat, Sprachquiz-Überprüfung, Bild-Agent, Web-Search-Agent, Aufgabenerkennung | Beste Mehrsprachigkeit + Befolgung von Anweisungen |
| `mistral-ocr-4-1` (OCR 4.1, Standard) | Dokumenten-OCR | Gedruckter Text, Tabellen, Handschrift ($4 / 1000 Seiten) |
| `mistral-ocr-2512` (OCR 3, Option) | Dokumenten-OCR | Auswählbar in den Einstellungen, günstiger ($2 / 1000 Seiten), liest Handschrift besser |
| `voxtral-mini-2602` (Voxtral Mini Transcribe 2, Standard) | Spracherkennung (STT) | Spracheingabe und mündliche Antworten im Sprachquiz ($0.003 / min) |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0` (Transcribe 3, Option, Vorschau) | Spracherkennung (STT) | Auswählbar in den Einstellungen ($0.0035 / min und $0.004 / min) |
| `voxtral-mini-tts-2603` (Voxtral TTS, Standard) | Sprachsynthese (TTS) | Podcasts, Sprachquiz, Diktat, Vorlesen ($16 / M Zeichen) |
| `voxtral-mini-tts-3-0` (Voxtral TTS 3, Option, Vorschau) | Sprachsynthese (TTS) | Auswählbar in den Einstellungen, native Stimmen in weiteren Sprachen ($13 / M Zeichen) |
| `mistral-moderation-2603` | Inhaltsmoderation | 6 blockierte Kategorien für Kinder/Jugendliche (darunter `jailbreaking`) |
| `mistral-small-latest` | Automatischer Router | Schnelle Inhaltsanalyse für Routing-Entscheidungen |

Auf dem Smartphone zeigen die Einstellungen unter jedem Auswahlfeld die vollständige Bezeichnung des gewählten Modells an (Preis, „Empfohlen" oder „Vorschau"), die im geschlossenen Menü abgeschnitten wurde.

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

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Anbieter — über `MISTRAL_API_KEY` hinaus ist kein zusätzlicher Schlüssel erforderlich.

> **Vom Benutzer eingegebener API-Schlüssel**: `MISTRAL_API_KEY` ist jetzt **optional**. Fehlt er, startet die App trotzdem und fordert jeden Benutzer auf, **seinen eigenen Mistral-Schlüssel** in der Oberfläche einzugeben. Der Schlüssel wird **im Browser gespeichert** (in einem sicheren Kontext über Web Crypto + IndexedDB verschlüsselt) und pro Anfrage mitgesendet — **niemals auf dem Server gespeichert**. Rangfolge: Profilschlüssel > globaler Browserschlüssel > `MISTRAL_API_KEY` (env). Das Setzen von `EUREKAI_REQUIRE_USER_KEY=true` zwingt jeden Benutzer dazu, seinen eigenen Schlüssel anzugeben (der Umgebungsschlüssel dient dann nur noch zum Vorladen).

> **Lokales HTTPS (Tablet/LAN)**: `localhost` ist bereits ein sicherer Kontext. Generiere für den LAN-Zugriff (Tablet) ein lokales Zertifikat und aktiviere HTTPS: Der Browser kann dann den gespeicherten Schlüssel verschlüsseln, und der Schlüssel ist während der Übertragung verschlüsselt:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral-API-Schlüssel (Chat, OCR, STT, Voxtral TTS, Agenten, Moderation). Falls nicht vorhanden, gibt der Benutzer seinen Schlüssel in der App ein (im Browser gespeichert, niemals auf dem Server) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → deaktiviert den Fallback auf `MISTRAL_API_KEY` für KI-Anfragen (jeder Benutzer MUSS seinen Schlüssel angeben). Nützlich bei einer öffentlich erreichbaren Instanz |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | Pfade zu TLS-Schlüssel/-Zertifikat (vgl. `scripts/gen-cert.sh`) → Express und Vite liefern über HTTPS aus (Secure Context für LAN/Tablet) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Wenn `production` → Express liefert das Frontend aus `dist/` aus (andernfalls `public/`) |
| `SONAR_TOKEN` | optional CI | — | Wird ausschließlich vom GitHub-Actions-Workflow für SonarCloud verwendet |

### Tests, Codequalität und Mitwirkung

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)**: `pre-commit` führt nacheinander `scripts/pre-commit-fast.sh` (Konflikte, große Dateien, shellcheck), `lint-staged` und anschließend `npm test` aus; `pre-push` führt zuerst eine blockierende Prüfung `npm audit` aus (blockiert, sobald eine Abhängigkeit, auch transitiv, eine Schwachstelle der Stufe `critical` aufweist, vgl. `scripts/audit-verdict.mjs`) und danach `npm run security`. Jeder Hook blockiert den Commit/Push, sobald einer seiner Schritte fehlschlägt.

**Externe Tools (optional zum Starten der Anwendung, unerlässlich für `pretest` und `npm run security`)**:

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

> **Für KI-Agenten, die zum Code beitragen**: Siehe [`CLAUDE.md`](CLAUDE.md) (übergreifende Regeln, Index) und die detaillierten Regeln in [`.claude/rules/`](.claude/rules/), die je nach gelesenen oder geänderten Dateien bei Bedarf geladen werden, für den detaillierten Architekturkontext, die verbindlichen Regeln (Fehlercodes, Cost Tracking und Prompts ohne Meta-Wörter, d. h. ohne Beschreibungen des Dokuments wie etwa dessen Typ, da das Modell diese Wörter in seine Ausgaben übernehmen würde) sowie bekannte Stolpersteine (Lizard CCN, Opengrep, Codacy/Semgrep-Migration).

---

## API-Referenz

### Config
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Modell) |
| `GET` | `/api/config/status` | Status der APIs: `mistral` (Mistral-Schlüssel gesetzt), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Anbieter) |
| `POST` | `/api/config/reset` | Konfiguration auf Standardwerte zurücksetzen |
| `GET` | `/api/config/voices` | Mistral-TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Standardwerte nach Alter |
| `POST` | `/api/providers/mistral/validate` | Einen vom Benutzer eingegebenen Mistral-Schlüssel validieren — immer 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), kein Env-Fallback |

### Profile
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Ein Profil erstellen |
| `PUT` | `/api/profiles/:id` | Ein Profil bearbeiten (PIN erforderlich für < 15 Jahre; 10 falsche PINs / 15 Min. → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Ein Profil löschen + kaskadierende Löschung der Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Ein Projekt erstellen `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetails; `?profileId=` ordnet ein Projekt ohne Profil dem Profil zu, das es öffnet |
| `PUT` | `/api/projects/:pid` | Umbenennen `{name}` |
| `DELETE` | `/api/projects/:pid` | Projekt löschen |
| `GET` | `/api/projects/:pid/events` | Echtzeit-SSE-Stream (`event: generation`) der Generierungsübergänge (`completed`/`failed`/`cancelled`) + Keep-Alive-Heartbeat |

### Quellen
| Methode | Endpunkt | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateiimport (OCR für JPG/PNG/PDF, direktes Lesen für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-Sprache (Multipart-Audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück; 422 `url_blocked`, wenn alle Adressen abgelehnt werden (internes Netzwerk), 502 `all_sources_failed`, wenn keine Quelle erstellt werden konnte |
| `POST` | `/api/projects/:pid/sources/moderate` | Ausstehende oder fehlgeschlagene Moderationen wieder aufnehmen `{sourceIds?}` (höchstens 10 pro Aufruf, Wartezeit ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eine Quelle, ihre importierte Datei und die davon abhängige Anweisung löschen → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderieren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Lernanweisungen erkennen (nur überprüfte Quellen) → `{consigne, costDelta}` |

### Generierung
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernzettel |
| `POST` | `/api/projects/:pid/generate/flashcards` | Karteikarten |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz (4 Auswahlmöglichkeiten, nur eine richtige Antwort) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/dictation` | Diktat (Wörter + Beispielsätze + Regeln, 1 TTS-Audio pro Wort; wird auch vom Auto-Router vorgeschlagen) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprachquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Gezieltes Merkblatt zu den falsch beantworteten Fragen eines Quiz `{generationId, weakQuestions}` — wird über die Schaltfläche zur Nachbereitung in der Quiz-Ansicht parallel zu `quiz-review` aufgerufen |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der zu startenden Generatoren) — gibt `{plan, costDelta}` zurück (nur Kosten für das Routing) |
| `POST` | `/api/projects/:pid/generate/auto/start` | Einen serverseitigen Auto-Batch starten `{runId, …}`: sofortige 202-Antwort, danach Analyse und Schritte im Hintergrund, maximal 3 Schritte gleichzeitig pro Mistral-Schlüssel; der Batch läuft weiter, wenn die Seite neu geladen wird. 409 `auto_busy`, falls für diesen Kurs bereits ein Batch läuft |
| `POST` | `/api/projects/:pid/generate/auto/resume` | Einen durch einen Serverneustart unterbrochenen Auto-Batch fortsetzen `{runId}`: seine unterbrochenen Schritte starten mit dem Schlüssel dieser Anfrage neu, ohne die Analyse erneut durchzuführen (202-Antwort) |
| `GET` | `/api/projects/:pid/auto-runs/:runId` | Status eines Auto-Batches: Analyse, Schritte und Ergebnis jedes einzelnen Schritts |
| `POST` | `/api/projects/:pid/auto-runs/:runId/cancel` | Einen gesamten Auto-Batch abbrechen (ein einzelner Schritt wird wie eine reguläre Generierung abgebrochen) |

Alle Generierungs-Routen akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; eine unbekannte `ageGroup` oder ein `lang`, der kein gültiger Sprachcode ist (erwartet: `fr`, `pt-BR`…) → 400 `invalid_input`, noch vor jedem KI-Aufruf. `quiz-review` und `remediation-summary` erfordern zusätzlich `{generationId, weakQuestions}` und beziehen sich auf die Quellen des ursprünglichen Quiz.

### CRUD Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten einreichen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Diktat-Antworten einreichen `{answers}` (strenge serverseitige Bewertung) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort überprüfen (Audio + questionIndex); die mündliche Antwort wird vor der Überprüfung moderiert (Ablehnung: 400 `quiz.answerBlocked`), Kosten werden in `costDelta` zurückgegeben |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Vorlesefunktion (Lernzettel/Karteikarten) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Eine laufende Generierung abbrechen (einziger Weg zum Abbrechen eines Pending-Status) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Umbenennen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Die Generierung und ihre Medien (Audio, Bild) löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Eine Nachricht senden `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatverlauf löschen |

---

## Architekturentscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Footprint, leichtgewichtige Reaktivität mit durch Vite kompiliertem TypeScript. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Null Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren — einfach starten und loslegen. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials für die Code-Organisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — einfach zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungs-System** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — ermöglicht mehrere Lernzettel, Quizze usw. pro Kurs. |
| **Altersgerechte Prompts** | 4 Altersgruppen mit unterschiedlichem Vokabular, Komplexitätsgrad und Tonfall — derselbe Inhalt wird je nach Lernendem unterschiedlich vermittelt. |
| **Agentenbasierte Funktionen** | Die Bildgenerierung und die Websuche nutzen temporäre Mistral-Agenten — sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Eingabefeld akzeptiert eine Mischung aus URLs und Suchbegriffen — URLs werden über Readability (statische Seiten) mit Lightpanda-Fallback (JS-/SPA-Seiten) gescrapt, Suchbegriffe lösen einen Mistral-Agenten mit web_search aus. Jedes Ergebnis erstellt eine unabhängige Quelle. |
| **100 % Mistral-TTS** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus erforderlich) — Sprachsynthese integriert in die Kostenkette und die sprachabhängige Stimmauflösung. |

---

## Credits & Danksagungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-First-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Extraktion von Webinhalten (Technologie der Firefox-Leseansicht)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser für das Scraping von JS-/SPA-Seiten
- **[Luciole](https://luciole-vision.com)** — Schriftart für sehbehinderte Leser, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Profiloption „Lesekomfort“)

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig durch KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel übersetzt von fr nach de mit gemini-4-argon-high.**
