<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandelt beliebige Inhalte in ein interaktives Lernerlebnis — angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Englisch</a> · <a href="README-es.md">🇪🇸 Spanisch</a> · <a href="README-pt.md">🇧🇷 Portugiesisch</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italienisch</a> · <a href="README-nl.md">🇳🇱 Niederländisch</a> · <a href="README-ar.md">🇸🇦 Arabisch</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chinesisch</a> · <a href="README-ja.md">🇯🇵 Japanisch</a> · <a href="README-ko.md">🇰🇷 Koreanisch</a> · <a href="README-pl.md">🇵🇱 Polnisch</a> · <a href="README-ro.md">🇷🇴 Rumänisch</a> · <a href="README-sv.md">🇸🇪 Schwedisch</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-Demo"></a>
</p>

<h4 align="center">📊 Code-Qualität</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Sicherheitsbewertung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Zuverlässigkeitsbewertung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Wartbarkeitsbewertung"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Abdeckung"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Schwachstellen"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Codezeilen"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-Abzeichen"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Die Geschichte — Warum EurekAI?

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam aus etwas ganz Konkretem: Ich bereite regelmäßig mit meiner Tochter die Klassenarbeiten vor, und ich dachte mir, dass es mit KI möglich sein müsste, das spielerischer und interaktiver zu machen.

Das Ziel: **beliebige Eingaben** — ein Foto der Lektion, ein kopierter Text, eine Sprachaufnahme, eine Websuche — aufnehmen und in **Lernzettel, Flashcards, Quiz, Podcasts, Lückentexte, Illustrationen und mehr** verwandeln. Alles angetrieben von den französischen Modellen von Mistral AI, was es zu einer natürlich passenden Lösung für deutschsprachige Schülerinnen und Schüler macht.

Der [erste Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde innerhalb von 48 Stunden während des Hackathons als Proof of Concept rund um die Mistral-Dienste entwickelt — bereits funktionsfähig, aber begrenzt. Seitdem hat sich EurekAI zu einem echten Projekt entwickelt: Lückentexte, Navigation in Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliche Code-Reviews und vieles mehr. Der gesamte Code wird per KI generiert — hauptsächlich mit [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Dateiimport** | Importieren Sie Ihre Lektionen — Foto, PDF (über Mistral OCR mit gemitteltem Vertrauenswert, Drittel `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sitzungen mit Retry pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Tippen oder fügen Sie beliebigen Text direkt ein |
| 🎤 | **Spracheingabe** | Nehmen Sie sich auf — Voxtral STT transkribiert Ihre Stimme |
| 🌐 | **Web / URL** | Fügen Sie eine URL ein (direktes Scraping über Readability + Lightpanda) oder geben Sie eine Suche ein (Agent Mistral web_search) |
| 📄 | **Lernzettel** | Strukturierte Notizen mit Kernpunkten, Vokabular, Zitaten, Anekdoten |
| 🃏 | **Flashcards** | Interaktive Q/A-Karten, dialogische Audio-Wiedergabe |
| ❓ | **Multiple-Choice-Quiz** | Fragen mit mehreren Antwortmöglichkeiten und adaptiver Fehlerwiederholung (konfigurierbare Anzahl) |
| ✏️ | **Lückentexte** | Übungen zum Ausfüllen mit Hinweisen und toleranter Validierung |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen in Audio — standardmäßig Mistral-Stimmen oder benutzerdefinierte Stimmen (für Eltern!) |
| 🖼️ | **Illustrationen** | Bildungsbilder, generiert von einem Mistral-Agenten |
| 🗣️ | **Sprach-Quiz** | Laut vorgelesene Fragen (benutzerdefinierte Stimme möglich), mündliche Antwort, KI-Prüfung |
| 💬 | **KI-Tutor** | Kontext-Chat mit Ihren Kursunterlagen, mit Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 7 verfügbaren Typen vor |
| 🔒 | **Kindersicherung** | Konfigurierbare Moderation pro Profil (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachig** | Oberfläche in 9 Sprachen verfügbar; KI-Generierung in 15 Sprachen über die Prompts steuerbar |
| 🔊 | **Vorlesen** | Hören Sie Lernzettel und Flashcards (Frage/Antwort-Dialog) über Mistral Voxtral TTS |
| 💶 | **API-Kostenverfolgung** | Transparente Kostenschätzung in € für jede Generierung und Quelle (Tokens / Zeichen / Seiten / Audiominuten). Badge pro Karte + Gesamt pro Projekt, sichtbar im Dashboard |
| 🎨 | **Profil-Theme** | Jedes Profil wählt sein Theme `dark` oder `light` — bleibt beim Profilwechsel erhalten |

---

## Architekturübersicht

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architekturübersicht" width="800" />
</p>

---

## Modell-Einsatzkarte

<p align="center">
  <img src="public/assets/model-map.webp" alt="Zuordnung von KI-Modell zu Aufgabe" width="800" />
</p>

---

## Nutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernreise der Studierenden" width="800" />
</p>

---

## Tiefere Einblicke — Funktionen

### Mehrmodale Eingabe

EurekAI akzeptiert 4 Arten von Quellen, moderiert je nach Profil (standardmäßig für Kinder und Jugendliche aktiviert) :

- **Dateiimport** — JPG-, PNG- oder PDF-Dateien, verarbeitet per Mistral OCR — **OCR 3 (`mistral-ocr-2512`) standardmäßig**, **OCR 4 (`mistral-ocr-4-0`) optional** in den Einstellungen (bessere Qualität, aber 2× Kosten) — für gedruckten Text, Tabellen und Handschrift; oder Textdateien (TXT, MD), direkt importiert. Multi-Datei-Uploads nutzen ein **Upload-Sitzungssystem**: individueller Fortschritt pro Datei, Retry der fehlgeschlagenen Datei ohne erneutes Senden der anderen, Beenden der Sitzung, wenn abgeschlossen. Das OCR liefert einen **gemittelten Vertrauenswert** (`average`, begrenzt auf `[0,1]`, berechnet aus von Mistral zurückgegebenen `averagePageConfidenceScore`), angezeigt in der UI als Badge der Stufe `high` / `medium` / `low` (Schwellenwerte ~0.9 / ~0.7) — warnt, blockiert aber nicht, wenn der Scan von schlechter Qualität ist.
- **Freier Text** — Tippen oder fügen Sie beliebigen Inhalt ein. Vor der Speicherung moderiert, wenn die Moderation aktiv ist.
- **Spracheingabe** — Nehmen Sie Audio im Browser auf. Transkribiert von `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Fügen Sie eine oder mehrere URLs ein, um Inhalte direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder geben Sie Schlüsselwörter für eine Websuche über Agent Mistral ein. Das einzelne Feld akzeptiert beides — URLs und Schlüsselwörter werden automatisch getrennt, jedes Ergebnis erzeugt eine unabhängige Quelle.

### KI-Inhaltserzeugung

Sieben Typen von generierten Lernmaterialien:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernzettel** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | Q/A-Karten mit Quellenverweisen (konfigurierbare Anzahl) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Fragen mit mehreren Antwortmöglichkeiten, Erklärungen, adaptive Wiederholung (konfigurierbare Anzahl) |
| **Lückentexte** | `mistral-large-latest` | Sätze zum Ergänzen mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skript mit 2 Stimmen → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Bildungsbild über das Tool `image_generation` |
| **Sprach-Quiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Prüfung |

### KI-Tutor per Chat

Ein dialogischer Tutor mit vollem Zugriff auf die Kursunterlagen:

- Nutzt `mistral-large-latest`
- **Tool-Aufrufe**: kann während der Unterhaltung Lernzettel, Flashcards, Quiz oder Lückentexte erzeugen
- Verlauf von 50 Nachrichten pro Kurs
- Inhaltsmoderation, falls für das Profil aktiviert

### Automatischer Router

Der Router nutzt `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und die relevantesten Generatoren aus den 7 verfügbaren vorzuschlagen. Die Oberfläche zeigt den Fortschritt in Echtzeit an: zuerst eine Analysephase, dann die einzelnen Generierungen mit möglicher Abbruchoption.

### Adaptives Lernen

- **Quiz-Statistiken**: Verfolgung von Versuchen und Genauigkeit pro Frage
- **Quiz-Wiederholung**: erzeugt 5-10 neue Fragen, die auf schwache Konzepte abzielen
- **Aufgabenerkennung**: erkennt Wiederholungsanweisungen ("Ich kann meine Lektion, wenn ich ...") und priorisiert sie in den kompatiblen textbasierten Generatoren (Lernzettel, Flashcards, Quiz, Lückentexte)

### Sicherheit & Kindersicherung

- **4 Altersgruppen**: Kind (≤10 Jahre), Teenager (11-15), Studierende (16-25), Erwachsene (26+)
- **Inhaltsmoderation**: `mistral-moderation-latest` mit 10 verfügbaren Kategorien, 5 standardmäßig für Kind/Teenager blockiert (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorien pro Profil in den Einstellungen anpassbar.
- **Eltern-PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren. Für einen Produktionseinsatz sollte ein langsamer Hash mit Salt verwendet werden (Argon2id, bcrypt).
- **Chat-Einschränkungen**: KI-Chat standardmäßig für unter 16-Jährige deaktiviert, von Eltern aktivierbar

### Mehrprofil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- **Stimmen pro Profil** (`Profile.mistralVoices?: { host, guest }`) — jedes Kind kann sein eigenes Paar Podcast-/Sprach-Quiz-Stimmen haben
- **Theme pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatisches Umschalten beim Profilwechsel, backendseitig gespeichert
- Projekte, die mit Profilen über `profileId` verknüpft sind
- Kaskadenlöschung: Wenn ein Profil gelöscht wird, werden alle seine Projekte gelöscht

### API-Kostenverfolgung

Jeder Mistral-Aufruf (Chat, OCR, STT, TTS, Moderation, Agenten) wird instrumentiert, um dem Nutzer eine **transparente** Kostenschätzung in € zu liefern — keine Überraschungen bei der Abrechnung.

- **Single Source of Truth**: `helpers/pricing.ts` — `MODEL_PRICING` pro Modellpräfix (z. B. `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` mit Mistral-Dokumentations-URLs für periodisches erneutes Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — Umrechnung gesteuert durch `helpers/cost-calc.ts`
- **Instrumentierungskette**: `helpers/tracked-client.ts` (Mistral-Client-Wrap) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Einbettung in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulativ im Dashboard (`Project.totalCost`)
- **Endpoints**: Die Antworten `/generate/*` und `/sources/*` dekorieren das zurückgegebene Objekt (Generation / Source) mit `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/auto/route` fügt ein Feld `costDelta: number` für die Kosten des Routings allein hinzu. `GET /projects/:pid` gibt das angereicherte Projekt mit `totalCost` zurück (berechnet als Summe aus `costLog[]`) + vollständigem Verlauf

### Multi-Provider-TTS & benutzerdefinierte Stimmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-Sprachsynthese, kein zusätzlicher Schlüssel erforderlich
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API ihre eigenen Stimmen erstellen (ausgehend von einer Audioprobe) und den Rollen Gastgeber/Gast zuweisen — Podcasts und Sprach-Quiz werden dann mit der Stimme eines Elternteils vorgelesen, was das Erlebnis für das Kind noch immersiver macht
- Zwei konfigurierbare Sprechrollen: **Gastgeber** (Hauptnarrator) und **Gast** (zweite Podcast-Stimme)
- Der vollständige Katalog der Mistral-Stimmen ist in den Einstellungen verfügbar und nach Sprache filterbar

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
| **Entwicklungsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Teilmuster, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, von Vite kompiliertes TypeScript |
| **Templating** | vite-plugin-handlebars | HTML-Zusammenstellung über Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Firefox-Reader-View-Technologie) |
| **Headless Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS-/SPA-Seiten — Scraping-Fallback |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Verwaltung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Zusammenfügen von Audiosegmenten |
| **Tests** | Vitest | Unit-Tests — Abdeckung gemessen durch SonarCloud |
| **Persistenz** | JSON-Dateien | Speicherung ohne Abhängigkeiten |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Lernzettel, Flashcards, Podcast, Quiz, Lückentexte, Chat, Prüfung von Sprach-Quiz, Bild-Agent, Web-Such-Agent, Aufgabenerkennung | Beste Mehrsprachigkeit + Befolgung von Anweisungen |
| `mistral-ocr-2512` (OCR 3, Standard) | Dokumenten-OCR | Gedruckter Text, Tabellen, Handschrift ($2 / 1000 Seiten) |
| `mistral-ocr-4-0` (OCR 4, Option) | Dokumenten-OCR — höhere Qualität | In den Einstellungen wählbar, 2× Kosten ($4 / 1000 Seiten) |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Sprach-Quiz, Vorlesen |
| `mistral-moderation-latest` | Inhaltsmoderation | 5 Kategorien für Kind/Teenager blockiert (+ Jailbreaking) |
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

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Provider — kein zusätzlicher Schlüssel nötig über `MISTRAL_API_KEY` hinaus.

> **Vom Nutzer eingegebener API-Schlüssel**: `MISTRAL_API_KEY` ist jetzt **optional**. Wenn er fehlt, startet die App trotzdem und fordert jeden Nutzer auf, **seinen eigenen Mistral-Schlüssel** in der Oberfläche einzugeben. Der Schlüssel wird **im Browser gespeichert** (über Web Crypto + IndexedDB im sicheren Kontext verschlüsselt) und per Anfrage gesendet — **niemals auf dem Server persistiert**. Priorität: Profilschlüssel > globaler Browser-Schlüssel > `MISTRAL_API_KEY` (env). Wenn `EUREKAI_REQUIRE_USER_KEY=true` gesetzt ist, muss jeder Nutzer seinen Schlüssel angeben (der env-Schlüssel dient dann nur noch für Vorladungen).

> **Lokales HTTPS (Tablet/LAN)**: `localhost` ist bereits ein sicherer Kontext. Für LAN-Zugriff (Tablet) generiere ein lokales Zertifikat und aktiviere HTTPS, um die Browser-Verschlüsselung freizuschalten und den Schlüssel während der Übertragung zu verschlüsseln:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert falls verfügbar, sonst self-signed mit openssl
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite in HTTPS
> ```
### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | optional | — | Mistral-API-Schlüssel (Chat, OCR, STT, Voxtral-TTS, Agents, Moderation). Falls nicht vorhanden, gibt der Benutzer seinen Schlüssel in der App ein (im Browser gespeichert, niemals serverseitig) |
| `EUREKAI_REQUIRE_USER_KEY` | optional | `false` | `true` → deaktiviert den Fallback auf `MISTRAL_API_KEY` für KI-Anfragen (jeder Benutzer MUSS seinen Schlüssel bereitstellen). Nützlich auf einer öffentlich zugänglichen Instanz |
| `HTTPS_KEY` / `HTTPS_CERT` | optional | — | TLS-Schlüssel-/Zertifikatspfade (vgl. `scripts/gen-cert.sh`) → Express und Vite dienen über HTTPS aus (sicherer Kontext LAN/Tablet) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Wenn `production` → Express dient das Frontend aus `dist/` aus (sonst `public/`) |
| `SONAR_TOKEN` | optional CI | — | Wird ausschließlich vom GitHub-Actions-Workflow SonarCloud verwendet |

### Tests, Codequalität und Beitrag

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)**: `pre-commit` startet `npm test`, `pre-push` startet `npm run security`. Beide blockieren den Commit/Push bei Fehlern.

**Erforderliche externe Tools (optional, aber verwendet von `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Ohne diese Tools schlägt `npm test` bei `pretest` fehl (lizard fehlt) und `npm run security` schlägt fehl (opengrep fehlt). Die Husky-Hooks blockieren dann den Commit/Push.

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

> **`:U`** ist ein rootless Podman-Flag, das die Berechtigungen des Volumes automatisch anpasst.

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
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (7 agents) + MAX_AUTO_PLAN_LENGTH
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
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
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
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

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Für KI-Mitwirkende**: Siehe [`CLAUDE.md`](CLAUDE.md) für den detaillierten Architekturkontext, die zwingenden Regeln (Anti-Leak-Prompts, Fehlercodes, Kostenverfolgung) und bekannte Fallstricke (Lizard CCN, Opengrep, Codacy/Semgrep-Migration).

---

## API-Referenz

### Konfiguration
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Modell) |
| `GET` | `/api/config/status` | API-Status: `mistral` (Mistral-Schlüssel gesetzt), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Anbieter) |
| `POST` | `/api/config/reset` | Konfiguration auf Standard zurücksetzen |
| `GET` | `/api/config/voices` | Mistral-TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + Standardwerte nach Alter |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Ein Profil erstellen |
| `PUT` | `/api/profiles/:id` | Ein Profil ändern (PIN erforderlich für < 15 Jahre) |
| `DELETE` | `/api/profiles/:id` | Ein Profil löschen + Kaskade für Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Ein Projekt `{name, profileId}` erstellen |
| `GET` | `/api/projects/:pid` | Projektdetails |
| `PUT` | `/api/projects/:pid` | `{name}` umbenennen |
| `DELETE` | `/api/projects/:pid` | Das Projekt löschen |

### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateien importieren (OCR für JPG/PNG/PDF, direkte Lektüre für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-Stimme (Multipart-Audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Quellen-Array zurück |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eine Quelle löschen |
| `POST` | `/api/projects/:pid/moderate` | `{text}` moderieren |
| `POST` | `/api/projects/:pid/detect-consigne` | Lernanweisungen erkennen |

### Generierung
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernblatt |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprachquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der zu startenden Generatoren) — gibt `{plan, costDelta}` zurück (Kosten nur des Routings) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Backend-Generierung (Routing + 7 Typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image). Ausführung parallel — setzt einen Mistral-Tier mit rate-limit ≥ 7 gleichzeitigen Anfragen voraus; andernfalls können mehrere 429 in `failedSteps` auftauchen. |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` erfordert zusätzlich `{generationId, weakQuestions}`.

### CRUD für Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten übermitteln `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort prüfen (Audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS laut vorlesen (Lernblätter/Flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` umbenennen |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Die Generierung löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Den Chat-Verlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Eine Nachricht senden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Den Chat-Verlauf löschen |

---

## Architektonische Entscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Footprint, leichte Reaktivität mit von Vite kompiliertem TypeScript. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Keine Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren — man startet und los geht's. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials für die Code-Organisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — leicht zu iterieren, zu testen und nach Sprache/Altersgruppe anzupassen. |
| **Multi-Generierungs-System** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — ermöglicht mehrere Lernblätter, Quiz usw. pro Kurs. |
| **Altersangepasste Prompts** | 4 Altersgruppen mit unterschiedlichem Wortschatz, unterschiedlicher Komplexität und unterschiedlichem Ton — derselbe Inhalt lehrt je nach Lernenden unterschiedlich. |
| **Agentenbasierte Funktionen** | Die Bildgenerierung und die Websuche verwenden temporäre Mistral-Agents — sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert gemischte URLs und Schlüsselwörter — URLs werden über Readability (statische Seiten) mit Lightpanda-Fallback (JS-/SPA-Seiten) gescraped, Schlüsselwörter lösen einen Mistral-web_search-Agenten aus. Jedes Ergebnis erstellt eine unabhängige Quelle. |
| **100 % Mistral-TTS** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus) — Sprachsynthese in die Kostenkette und die sprachabhängige Stimmauflösung integriert. |

---

## Danksagungen & Credits

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-First-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Web-Inhaltsextraktion (Firefox-Reader-View-Technologie)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser zum Scraping von JS/SPA-Seiten

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig von KI entwickelt mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Aus dem Französischen ins Deutsche übersetzter Artikel mit gpt-5.4-mini.**
