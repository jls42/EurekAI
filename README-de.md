<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Verwandle beliebige Inhalte in ein interaktives Lernerlebnis — angetrieben von <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Codezeilen"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy-Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## Die Geschichte — Warum EurekAI?

**EurekAI** entstand während des [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([offizielle Website](https://worldwide-hackathon.mistral.ai/)) (März 2026). Ich brauchte ein Thema — und die Idee kam aus etwas sehr Konkretem: Ich bereite regelmäßig die Tests mit meiner Tochter vor, und ich dachte mir, dass es doch möglich sein müsste, das mit KI spielerischer und interaktiver zu gestalten.

Das Ziel: **beliebige Eingaben** — ein Foto der Lektion, ein kopierter Text, eine Sprachaufnahme, eine Websuche — in **Lernblätter, Flashcards, Quizze, Podcasts, Lückentexte, Illustrationen und mehr** zu verwandeln. Alles angetrieben von den französischen Modellen von Mistral AI, was es zu einer natürlich passenden Lösung für französischsprachige Lernende macht.

Der [ursprüngliche Prototyp](https://github.com/jls42/worldwide-hackathon.mistral.ai) wurde innerhalb von 48 Stunden während des Hackathons als Proof of Concept rund um die Mistral-Services entwickelt — bereits funktionsfähig, aber begrenzt. Seitdem ist EurekAI zu einem echten Projekt geworden: Lückentexte, Navigation in den Übungen, Web-Scraping, konfigurierbare elterliche Moderation, gründliche Code-Reviews und vieles mehr. Der gesamte Code wird von KI generiert — hauptsächlich [Claude Code](https://code.claude.com/), mit einigen Beiträgen über [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/).

---

## Funktionen

| | Funktion | Beschreibung |
|---|---|---|
| 📷 | **Dateiimport** | Importieren Sie Ihre Lektionen — Foto, PDF (über Mistral OCR mit gemitteltem Vertrauenswert, Stufen `high`/`medium`/`low`) oder Textdatei (TXT, MD). Upload-Sessions mit Wiederholung pro Datei und individuellem Fortschritt |
| 📝 | **Texteingabe** | Tippen oder fügen Sie beliebigen Text direkt ein |
| 🎤 | **Spracheingabe** | Nehmen Sie sich auf — Voxtral STT transkribiert Ihre Stimme |
| 🌐 | **Web / URL** | Fügen Sie eine URL ein (direktes Scraping über Readability + Lightpanda) oder geben Sie eine Suche ein (Agent Mistral web_search) |
| 📄 | **Lernblätter** | Strukturierte Notizen mit Kernpunkten, Vokabular, Zitaten, Anekdoten |
| 🃏 | **Flashcards** | Interaktive Frage-/Antwort-Karten, dialogische Audiowiedergabe |
| ❓ | **Multiple-Choice-Quiz** | Multiple-Choice-Fragen mit adaptiver Fehlerwiederholung (konfigurierbare Anzahl) |
| ✏️ | **Lückentexte** | Übungen zum Ausfüllen mit Hinweisen und toleranter Validierung |
| 🎙️ | **Podcast** | Mini-Podcast mit 2 Stimmen als Audio — standardmäßig Mistral-Stimmen oder benutzerdefinierte Stimmen (für Eltern!) |
| 🖼️ | **Illustrationen** | Von einem Mistral-Agenten generierte Lernbilder |
| 🗣️ | **Sprachquiz** | Laut vorgelesene Fragen (eigene Stimme möglich), mündliche Antwort, KI-Prüfung |
| 💬 | **KI-Tutor** | Kontextbezogener Chat mit Ihren Kursdokumenten, mit Tool-Aufrufen |
| 🧠 | **Automatischer Router** | Ein auf `mistral-small-latest` basierender Router analysiert den Inhalt und schlägt eine Kombination von Generatoren aus den 7 verfügbaren Typen vor |
| 🔒 | **Kindersicherung** | Konfigurierbare Moderation pro Profil (anpassbare Kategorien), Eltern-PIN, Chat-Einschränkungen |
| 🌍 | **Mehrsprachig** | Oberfläche in 9 Sprachen verfügbar; KI-Generierung über Prompts in 15 Sprachen steuerbar |
| 🔊 | **Vorlesen** | Hören Sie Lernblätter und Flashcards (Frage/Antwort-Dialog) über Mistral Voxtral TTS |
| 💶 | **API-Kostenverfolgung** | Transparente Schätzung der €-Kosten jeder Generierung und Quelle (Tokens / Zeichen / Seiten / Audiosekunden). Badge pro Karte + Gesamtsumme pro Projekt, sichtbar im Dashboard |
| 🎨 | **Profil-Thema** | Jedes Profil wählt sein `dark`- oder `light`-Thema — bleibt beim Profilwechsel erhalten |

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

## Nutzerreise

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Lernreise der Lernenden" width="800" />
</p>

---

## Vertiefung — Funktionen

### Multimodale Eingabe

EurekAI akzeptiert 4 Arten von Quellen, je nach Profil moderiert (standardmäßig für Kind und Teenager aktiviert) :

- **Dateiimport** — JPG-, PNG- oder PDF-Dateien werden per Mistral OCR verarbeitet — **OCR 3 (`mistral-ocr-2512`) standardmäßig**, **OCR 4 (`mistral-ocr-4-0`) optional** in den Einstellungen (bessere Qualität, aber 2× Kosten) — für gedruckten Text, Tabellen und Handschrift; oder Textdateien (TXT, MD) werden direkt importiert. Multi-Datei-Uploads verwenden ein System von **Upload-Sessions**: individueller Fortschritt pro Datei, erneuter Versuch für die fehlgeschlagene Datei, ohne die anderen erneut einzureichen, Verwerfen der Sitzung, wenn sie abgeschlossen ist. OCR stellt einen **gemittelten Vertrauenswert** bereit (`average`, auf `[0,1]` begrenzt, berechnet aus `averagePageConfidenceScore`, die von Mistral zurückgegeben werden), der in der UI als Badge der Stufe `high` / `medium` / `low` angezeigt wird (Schwellenwerte ~0.9 / ~0.7) — warnt, blockiert aber nicht, wenn der Scan von schlechter Qualität ist.
- **Freitext** — Tippen oder fügen Sie beliebigen Inhalt ein. Wird vor dem Speichern moderiert, wenn die Moderation aktiv ist.
- **Spracheingabe** — Nehmen Sie Audio im Browser auf. Transkribiert durch `voxtral-mini-latest`. Der Parameter `language="fr"` optimiert die Erkennung.
- **Web / URL** — Fügen Sie eine oder mehrere URLs ein, um Inhalte direkt zu scrapen (Readability + Lightpanda für JS-Seiten), oder geben Sie Schlüsselwörter für eine Websuche über den Agent Mistral ein. Das einzelne Feld akzeptiert beides — URLs und Schlüsselwörter werden automatisch getrennt, jedes Ergebnis erstellt eine unabhängige Quelle.

### KI-Inhaltserzeugung

Sieben Arten von generiertem Lernmaterial:

| Generator | Modell | Ausgabe |
|---|---|---|
| **Lernblatt** | `mistral-large-latest` | Titel, Zusammenfassung, Kernpunkte, Vokabular, Zitate, Anekdote |
| **Flashcards** | `mistral-large-latest` | Frage-/Antwort-Karten mit Quellenverweisen (konfigurierbare Anzahl) |
| **Multiple-Choice-Quiz** | `mistral-large-latest` | Multiple-Choice-Fragen, Erklärungen, adaptive Wiederholung (konfigurierbare Anzahl) |
| **Lückentexte** | `mistral-large-latest` | Sätze zum Ergänzen mit Hinweisen, tolerante Validierung (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Skript mit 2 Stimmen → MP3-Audio |
| **Illustration** | Agent `mistral-large-latest` | Lernbild über das Tool `image_generation` |
| **Sprachquiz** | `mistral-large-latest` + Voxtral TTS + STT | TTS-Fragen → STT-Antwort → KI-Prüfung |

### KI-Tutor per Chat

Ein konversationeller Tutor mit vollem Zugriff auf die Kursdokumente:

- Verwendet `mistral-large-latest`
- **Tool-Aufrufe**: kann während der Unterhaltung Lernblätter, Flashcards, Quizze oder Lückentexte erzeugen
- Verlauf von 50 Nachrichten pro Kurs
- Inhaltsmoderation, wenn sie für das Profil aktiviert ist

### Automatischer Router

Der Router verwendet `mistral-small-latest`, um den Inhalt der Quellen zu analysieren und die relevantesten Generatoren unter den 7 verfügbaren vorzuschlagen. Die Oberfläche zeigt den Fortschritt in Echtzeit: zuerst eine Analysephase, dann die einzelnen Generierungen mit möglicher Abbruchoption.

### Adaptives Lernen

- **Quiz-Statistiken**: Verfolgung der Versuche und der Genauigkeit pro Frage
- **Quiz-Wiederholung**: erzeugt 5–10 neue Fragen, die auf schwache Konzepte abzielen
- **Anweisungserkennung**: erkennt Wiederholungsanweisungen („Ich kenne meine Lektion, wenn ich ... kann“) und priorisiert sie in den kompatiblen textbasierten Generatoren (Lernblatt, Flashcards, Quiz, Lückentexte)

### Sicherheit & Kindersicherung

- **4 Altersgruppen**: Kind (≤10 Jahre), Teenager (11–15), Student (16–25), Erwachsener (26+)
- **Inhaltsmoderation**: `mistral-moderation-latest` mit 10 verfügbaren Kategorien, 5 standardmäßig blockiert für Kind/Teenager (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorien pro Profil in den Einstellungen anpassbar.
- **Eltern-PIN**: SHA-256-Hash, erforderlich für Profile unter 15 Jahren. Für ein Produktions-Deployment einen langsamen Hash mit Salt vorsehen (Argon2id, bcrypt).
- **Chat-Einschränkungen**: KI-Chat standardmäßig für unter 16-Jährige deaktiviert, von den Eltern aktivierbar

### Multi-Profil-System

- Mehrere Profile mit Name, Alter, Avatar, Spracheinstellungen
- **Stimme pro Profil** (`Profile.mistralVoices?: { host, guest }`) — jedes Kind kann sein eigenes Stimmenpaar für Podcast/Sprachquiz haben
- **Thema pro Profil** (`Profile.theme: 'dark' | 'light'`) — automatische Umschaltung beim Profilwechsel, backendseitig gespeichert
- Projekte über `profileId` an Profile gebunden
- Kaskadenlöschung: Wenn ein Profil gelöscht wird, werden alle seine Projekte gelöscht

### API-Kostenverfolgung

Jeder Mistral-Aufruf (Chat, OCR, STT, TTS, Moderation, Agents) wird instrumentiert, um dem Benutzer eine **transparente** €-Schätzung bereitzustellen — keine Überraschungen bei der Abrechnung.

- **Single Source of Truth**: `helpers/pricing.ts` — `MODEL_PRICING` pro Modellpräfix (z. B. `mistral-large` → Eingabe 0.5 €/M Tokens, Ausgabe 1.5 €/M Tokens), `PRICING_SOURCES` mit Mistral-Doku-URLs für regelmäßiges erneutes Scraping
- **Unterstützte Einheiten**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — Konvertierung gesteuert durch `helpers/cost-calc.ts`
- **Instrumentierungskette**: `helpers/tracked-client.ts` (Mistral-Client-Wrap) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (Einfügung in die HTTP-Antwort)
- **UI**: Kosten-Badge pro Generierung (`src/partials/cost-badge-gen.html`), pro Quelle (`cost-badge-src.html`), kumulierte Gesamtsumme im Dashboard (`Project.totalCost`)
- **Endpunkte**: die Antworten `/generate/*` und `/sources/*` erweitern das zurückgegebene Objekt (Generation / Source) um `estimatedCost`, `usage` und `costBreakdown`. `POST /generate/auto/route` fügt ein Feld `costDelta: number` für die reinen Routing-Kosten hinzu. `GET /projects/:pid` gibt das mit `totalCost` angereicherte Projekt zurück (aus `costLog[]` berechnete Summe) + den vollständigen Verlauf

### TTS mit mehreren Providern & benutzerdefinierten Stimmen

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral-Sprachsynthese, kein zusätzlicher Schlüssel erforderlich
- **Benutzerdefinierte Stimmen**: Eltern können über die Mistral Voices API eigene Stimmen erstellen (ausgehend von einer Audioaufnahme) und den Rollen Host/Gast zuweisen — Podcasts und Sprachquizze werden dann mit der Stimme eines Elternteils abgespielt, was das Erlebnis für das Kind noch immersiver macht
- Zwei konfigurierbare Sprachrollen: **Host** (Hauptnarrator) und **Gast** (zweite Podcast-Stimme)
- Der vollständige Katalog der Mistral-Stimmen ist in den Einstellungen verfügbar und nach Sprache filterbar

### Internationalisierung

- Oberfläche in 9 Sprachen verfügbar: fr, en, es, pt, it, nl, de, hi, ar
- KI-Prompts unterstützen 15 Sprachen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Sprache pro Profil konfigurierbar

---

## Tech-Stack

| Schicht | Technologie | Rolle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server und Typsicherheit |
| **Backend** | Express 5.x | REST-API |
| **Entwicklungsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-Teilschablonen, Proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktive Oberfläche, von Vite kompiliertes TypeScript |
| **Vorlagenerstellung** | vite-plugin-handlebars | HTML-Zusammenstellung über Partials |
| **KI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderation |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, integrierte Sprachsynthese |
| **Icons** | Lucide 1.x | SVG-Icon-Bibliothek |
| **Web-Scraping** | Readability + linkedom | Extraktion des Hauptinhalts von Webseiten (Firefox-Reader-View-Technologie) |
| **Headless-Browser** | Lightpanda | Ultraleichter Headless-Browser (Zig + V8) für JS-/SPA-Seiten — Scraping-Fallback |
| **Markdown** | Marked | Markdown-Rendering im Chat |
| **Datei-Upload** | Multer 2.x | Verarbeitung von Multipart-Formularen |
| **Audio** | ffmpeg-static | Zusammenführen von Audiosegmenten |
| **Tests** | Vitest | Unit-Tests — Coverage gemessen von SonarCloud |
| **Persistenz** | JSON-Dateien | Speicher ohne Abhängigkeiten |

---

## Modellreferenz

| Modell | Verwendung | Warum |
|---|---|---|
| `mistral-large-latest` | Lernblatt, Flashcards, Podcast, Quiz, Lückentexte, Chat, Sprachquiz-Prüfung, Bild-Agent, Web-Search-Agent, Anweisungserkennung | Beste Mehrsprachigkeit + Befolgung von Anweisungen |
| `mistral-ocr-2512` (OCR 3, Standard) | Dokumenten-OCR | Gedruckter Text, Tabellen, Handschrift ($2 / 1000 Seiten) |
| `mistral-ocr-4-0` (OCR 4, optional) | Dokumenten-OCR — höhere Qualität | In den Einstellungen auswählbar, 2× Kosten ($4 / 1000 Seiten) |
| `voxtral-mini-latest` | Spracherkennung (STT) | Mehrsprachiges STT, optimiert mit `language="fr"` |
| `voxtral-mini-tts-latest` | Sprachsynthese (TTS) | Podcasts, Sprachquiz, Vorlesen |
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
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=<your_api_key>           (requis)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Hinweis**: Mistral Voxtral TTS ist der einzige TTS-Provider — außer `MISTRAL_API_KEY` ist kein zusätzlicher Schlüssel erforderlich.

### Umgebungsvariablen

| Variable | Erforderlich | Standard | Rolle |
|---|---|---|---|
| `MISTRAL_API_KEY` | ✅ | — | Mistral-API-Schlüssel (Chat, OCR, STT, Voxtral TTS, Agents, Moderation) |
| `PORT` | optional | `3000` | HTTP-Port des Express-Backends |
| `NODE_ENV` | optional | `development` | Wenn `production` → Express liefert das Frontend aus `dist/` aus (sonst `public/`) |
| `SONAR_TOKEN` | optional in CI | — | Wird nur vom GitHub-Actions-Workflow für SonarCloud verwendet |

### Tests, Codequalität und Beitrag

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git-Hooks (Husky)** : `pre-commit` führt `npm test` aus, `pre-push` führt `npm run security` aus. Beide blockieren Commit/Push bei Fehlern.

**Erforderliche externe Tools (optional, aber von `pretest` / `npm run security` verwendet)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Ohne diese Tools schlägt `npm test` bei `pretest` fehl (lizard fehlt) und `npm run security` schlägt fehl (opengrep fehlt). Die Husky-Hooks blockieren dann den Commit/Push.

---

## Container-Deployment

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

> **`:U`** ist ein Podman-rootless-Flag, das die Berechtigungen des Volumes automatisch anpasst.

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

> **Für KI-Mitwirkende**: Siehe [`CLAUDE.md`](CLAUDE.md) für den detaillierten architektonischen Kontext, die verbindlichen Regeln (Anti-Leak-Prompts, Fehlercodes, Kostenverfolgung) und bekannte Fallstricke (Lizard CCN, Opengrep, Codacy/Semgrep-Migration).

---

## API-Referenz

### Konfiguration
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/config` | Aktuelle Konfiguration |
| `PUT` | `/api/config` | Konfiguration ändern (Modelle, Stimmen, TTS-Modell) |
| `GET` | `/api/config/status` | API-Status: `mistral` (Mistral-Schlüssel gesetzt), `ttsAvailable` (Alias von `mistral`, Mistral Voxtral ist der einzige TTS-Anbieter) |
| `POST` | `/api/config/reset` | Auf Standardkonfiguration zurücksetzen |
| `GET` | `/api/config/voices` | Mistral-TTS-Stimmen auflisten (optional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Verfügbare Moderationskategorien + altersabhängige Standardwerte |

### Profile
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/profiles` | Alle Profile auflisten |
| `POST` | `/api/profiles` | Profil erstellen |
| `PUT` | `/api/profiles/:id` | Profil bearbeiten (PIN erforderlich für < 15-Jährige) |
| `DELETE` | `/api/profiles/:id` | Profil löschen + Kaskade für Projekte `{pin?}` → `{ok, deletedProjects}` |

### Projekte
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects` | Projekte auflisten (`?profileId=` optional) |
| `POST` | `/api/projects` | Projekt `{name, profileId}` erstellen |
| `GET` | `/api/projects/:pid` | Projektdetails |
| `PUT` | `/api/projects/:pid` | Umbenennen `{name}` |
| `DELETE` | `/api/projects/:pid` | Projekt löschen |

### Quellen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-Dateien importieren (OCR für JPG/PNG/PDF, direkte Verarbeitung für TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Freitext `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-Stimme (Multipart-Audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-Scraping oder Websuche `{query}` — gibt ein Array von Quellen zurück |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Quelle löschen |
| `POST` | `/api/projects/:pid/moderate` | Moderieren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Überarbeitungsanweisungen erkennen |

### Generierung
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Lernzettel |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Multiple-Choice-Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Lückentexte |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Sprach-Quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptive Wiederholung `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routing-Analyse (Plan der auszuführenden Generatoren) — gibt `{plan, costDelta}` zurück (nur Routing-Kosten) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische Backend-Generierung (Routing + 7 Typen: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image). Parallele Ausführung — setzt ein Mistral-Tier mit Rate-Limit ≥ 7 gleichzeitigen Anfragen voraus; andernfalls können mehrere 429 in `failedSteps` zurückgemeldet werden. |

Alle Generierungsrouten akzeptieren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` erfordert zusätzlich `{generationId, weakQuestions}`.

### CRUD der Generierungen
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz-Antworten einsenden `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Lückentext-Antworten einsenden `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Eine mündliche Antwort prüfen (Audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-Lautvorlesen (Lernzettel/Flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Umbenennen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generierung löschen |

### Chat
| Methode | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatverlauf abrufen |
| `POST` | `/api/projects/:pid/chat` | Nachricht senden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatverlauf löschen |

---

## Architektonische Entscheidungen

| Entscheidung | Begründung |
|---|---|
| **Alpine.js statt React/Vue** | Minimaler Fußabdruck, leichte Reaktivität mit von Vite kompiliertem TypeScript. Perfekt für einen Hackathon, bei dem Geschwindigkeit zählt. |
| **Persistenz in JSON-Dateien** | Keine Abhängigkeiten, sofortiger Start. Keine Datenbank zu konfigurieren — man startet einfach, und los geht's. |
| **Vite + Handlebars** | Das Beste aus beiden Welten: schnelles HMR für die Entwicklung, HTML-Partials für die Code-Organisation, Tailwind JIT. |
| **Zentralisierte Prompts** | Alle KI-Prompts in `prompts.ts` — leicht iterierbar, testbar und an Sprache/Altersgruppe anpassbar. |
| **Multi-Generierungs-System** | Jede Generierung ist ein unabhängiges Objekt mit eigener ID — ermöglicht mehrere Lernzettel, Quiz usw. pro Kurs. |
| **Altersangepasste Prompts** | 4 Altersgruppen mit unterschiedlichem Wortschatz, unterschiedlicher Komplexität und Tonalität — derselbe Inhalt vermittelt je nach Lernendem anders. |
| **Agentenbasierte Funktionen** | Die Bilderzeugung und Websuche nutzen temporäre Mistral-Agents — sauberer Lebenszyklus mit automatischer Bereinigung. |
| **Intelligentes URL-Scraping** | Ein einziges Feld akzeptiert gemischte URLs und Schlüsselwörter — URLs werden via Readability (statische Seiten) gescraped, mit Lightpanda-Fallback (JS-/SPA-Seiten); Schlüsselwörter lösen einen Mistral-web_search-Agenten aus. Jedes Ergebnis erstellt eine unabhängige Quelle. |
| **100 % Mistral-TTS** | Mistral Voxtral TTS (kein zusätzlicher Schlüssel über `MISTRAL_API_KEY` hinaus) — Sprachsynthese, integriert in die Kostenkette und die Sprachauflösung pro Sprache. |

---

## Credits & Danksagungen

- **[Mistral AI](https://mistral.ai)** — KI-Modelle (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Leichtgewichtiges reaktives Framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-CSS-Framework
- **[Vite](https://vitejs.dev)** — Frontend-Build-Tool
- **[Lucide](https://lucide.dev)** — Icon-Bibliothek
- **[Marked](https://marked.js.org)** — Markdown-Parser
- **[Readability](https://github.com/mozilla/readability)** — Web-Content-Extraktion (Firefox-Reader-View-Technologie)
- **[Lightpanda](https://lightpanda.io)** — Ultraleichter Headless-Browser zum Scraping von JS-/SPA-Seiten

Initiiert während des Mistral AI Worldwide Hackathon (März 2026), vollständig von KI mit [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) und [Gemini CLI](https://geminicli.com/) entwickelt.

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Lizenz

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artikel übersetzt vom Fr ins De mit gpt-5.4-mini.**
