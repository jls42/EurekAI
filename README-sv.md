<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Förvandla vilket innehåll som helst till en interaktiv lärandeupplevelse — drivs av <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Démo YouTube"></a>
</p>

<h4 align="center">📊 Kodkvalitet</h4>

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

## Historien — Varför EurekAI?

**EurekAI** föddes under [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiell webbplats](https://worldwide-hackathon.mistral.ai/)) (mars 2026). Jag behövde ett ämne — och idén kom från något väldigt konkret: jag förbereder regelbundet prov med min dotter, och jag tänkte att det borde gå att göra det mer lekfullt och interaktivt med hjälp av AI.

Målet: ta emot **vilken input som helst** — ett foto av lektionen, en kopierad text, en ljudinspelning, en webbsökning — och förvandla det till **revisionskort, flashcards, quiz, poddar, lucktexter, illustrationer och mer**. Allt drivet av de franska modellerna från Mistral AI, vilket gör det naturligt anpassat för fransktalande elever.

[Prototypen initial](https://github.com/jls42/worldwide-hackathon.mistral.ai) byggdes på 48 timmar under hackathonet som proof of concept kring Mistral-tjänster — redan fungerande men begränsad. Sedan dess har EurekAI utvecklats till ett riktigt projekt: lucktexter, navigering i övningar, webbscraping, konfigurerbar föräldramoderering, djupgående kodgranskning och mycket mer. Hela koden genererades av AI — främst via [Claude Code](https://code.claude.com/), med några bidrag via [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Funktioner

| | Funktion | Beskrivning |
|---|---|---|
| 📷 | **Importera filer** | Importera dina lektioner — foto, PDF (via Mistral OCR) eller textfil (TXT, MD) |
| 📝 | **Fritext** | Skriv eller klistra in vilken text som helst direkt |
| 🎤 | **Röstinmatning** | Spela in dig själv — Voxtral STT transkriberar din röst |
| 🌐 | **Webb / URL** | Klistra in en URL (scraping direkt via Readability + Lightpanda) eller skriv en sökning (Agent Mistral web_search) |
| 📄 | **Revisionskort** | Strukturerade anteckningar med nyckelpunkter, vokabulär, citat, anekdoter |
| 🃏 | **Flashcards** | Interaktiva Q/A-kort, dialogbaserad ljuduppspelning |
| ❓ | **Flervalsquiz** | Flervalsfrågor med adaptiv repetitionshantering för fel (antal kan konfigureras) |
| ✏️ | **Texter med luckor** | Fyll i luckor-övningar med ledtrådar och tolerant validering |
| 🎙️ | **Podcast** | Mini-podcast med 2 röster i ljud — Mistral-röster som standard eller egna röster (föräldrar!) |
| 🖼️ | **Illustrationer** | Pedagogiska bilder genererade av en Agent Mistral |
| 🗣️ | **Röstquiz** | Frågor upplästa högt (anpassningsbar röst), muntliga svar, AI-verifiering |
| 💬 | **AI-handledare** | Kontextuell chatt med dina kursdokument, med verktygsanrop |
| 🧠 | **Automatisk router** | En router baserad på `mistral-small-latest` analyserar innehållet och föreslår en kombination av generatorer bland de 7 tillgängliga |
| 🔒 | **Föräldrakontroll** | Konfigurerbar moderering per profil (anpassningsbara kategorier), föräldra-PIN, chattbegränsningar |
| 🌍 | **Fler språk** | Gränssnitt tillgängligt på 9 språk; AI-generation styrbar på 15 språk via prompts |
| 🔊 | **Högläsning** | Lyssna på revisionskort och flashcards (fråga/svar-dialog) via Mistral Voxtral TTS eller ElevenLabs |

---

## Arkitekturöversikt

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Modellanvändningskarta

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Användarresa

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Djupdykning — Funktioner

### Multimodal inmatning

EurekAI accepterar 4 typer av källor, modererade enligt profil (aktiverat som standard för barn och tonåringar):

- **Importera filer** — JPG-, PNG- eller PDF-filer bearbetade av `mistral-ocr-latest` (tryckt text, tabeller, handskrift), eller textfiler (TXT, MD) importerade direkt.
- **Fritext** — Skriv eller klistra in vilket innehåll som helst. Modereras innan lagring om moderering är aktiv.
- **Röstinmatning** — Spela in ljud i webbläsaren. Transkriberas av `voxtral-mini-latest`. Parametern `language="fr"` optimerar igenkänningen.
- **Webb / URL** — Klistra in en eller flera URL:er för att scrapa innehållet direkt (Readability + Lightpanda för JS-sidor), eller skriv nyckelord för en webbsökning via Agent Mistral. Fältet accepterar båda — URL:er och nyckelord separeras automatiskt, varje resultat skapar en separat källa.

### AI-innehållsgenerering

Sju typer av genererat undervisningsmaterial:

| Generator | Modell | Utdata |
|---|---|---|
| **Revisionskort** | `mistral-large-latest` | Titel, sammanfattning, nyckelpunkter, vokabulär, citat, anekdot |
| **Flashcards** | `mistral-large-latest` | Q/A-kort med referenser till källor (antal går att konfigurera) |
| **Flervalsquiz** | `mistral-large-latest` | Flervalsfrågor, förklaringar, adaptiv repetition (antal går att konfigurera) |
| **Texter med luckor** | `mistral-large-latest` | Meningar att fylla i med ledtrådar, tolerant validering (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Manus för 2 röster → MP3-ljud |
| **Illustration** | Agent `mistral-large-latest` | Pedagogisk bild via verktyget `image_generation` |
| **Röstquiz** | `mistral-large-latest` + Voxtral TTS + STT | Frågor TTS → svar STT → AI-verifiering |

### AI-handledare via chatt

En konversationell handledare med full tillgång till kursdokumenten:

- Använder `mistral-large-latest`
- **Verktygsanrop**: kan generera revisionskort, flashcards, quiz eller lucktexter under konversationen
- Historik på 50 meddelanden per kurs
- Innehållsmoderering om aktiverad för profilen

### Automatisk router

Routern använder `mistral-small-latest` för att analysera källornas innehåll och föreslå de mest relevanta generatorerna bland de 7 tillgängliga. Gränssnittet visar framsteg i realtid: först en analysfas, sedan individuella genereringar med möjlighet att avbryta.

### Adaptivt lärande

- **Quizstatistik**: spårning av försök och noggrannhet per fråga
- **Quizrepetition**: skapar 5–10 nya frågor som riktar in sig på svaga begrepp
- **Upptäckt av instruktioner**: upptäcker revisionsinstruktioner ("Jag kan min läxa om jag kan...") och prioriterar dem i kompatibla textgeneratorer (revisionskort, flashcards, quiz, lucktexter)

### Säkerhet & föräldrakontroll

- **4 åldersgrupper**: barn (≤10 år), tonåring (11–15), student (16–25), vuxen (26+)
- **Innehållsmoderering**: `mistral-moderation-latest` med 10 tillgängliga kategorier, 5 blockerade som standard för barn/tonåringar (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Kategorier kan anpassas per profil i inställningarna.
- **Föräldra-PIN**: SHA-256-hash, krävs för profiler under 15 år. För produktionsdrift rekommenderas en långsam hash med salt (Argon2id, bcrypt).
- **Chattbegränsningar**: AI-chatt är som standard avstängd för under 16 år, kan aktiveras av föräldrar

### Flerprofilssystem

- Flera profiler med namn, ålder, avatar, språkinställningar
- Projekt kopplade till profiler via `profileId`
- Kaskadsradering: ta bort en profil tar bort alla dess projekt

### Flera TTS-leverantörer & anpassade röster

- **Mistral Voxtral TTS** (standard): `voxtral-mini-tts-latest`, ingen extra nyckel krävs
- **ElevenLabs** (alternativ): `eleven_v3`, naturliga röster, kräver `ELEVENLABS_API_KEY`
- Leverantör kan konfigureras i applikationsinställningarna
- **Anpassade röster**: föräldrar kan skapa egna röster via Mistral Voices API (från ett ljudprov) och tilldela dem till värd/gäst — podcasts och röstquiz spelas då upp med en förälders röst, vilket gör upplevelsen mer immersiv för barnet
- Två röstroller går att konfigurera: **värd** (huvudberättare) och **gäst** (andra rösten i podcasten)
- Fullständig katalog av Mistral-röster tillgänglig i inställningarna, filtrerbar per språk

### Internationalisering

- Gränssnitt tillgängligt på 9 språk: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts stödjer 15 språk (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Språk kan konfigureras per profil

---

## Teknisk stack

| Lager | Teknologi | Roll |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server och typ-säkerhet |
| **Backend** | Express 5.x | REST API |
| **Utvecklingsserver** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars-partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reaktivt gränssnitt, TypeScript kompilerat av Vite |
| **Templating** | vite-plugin-handlebars | HTML-komposition via partials |
| **AI** | Mistral AI SDK 2.x | Chatt, OCR, STT, TTS, Agents, Moderering |
| **TTS (standard)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, inbyggd talsyntes |
| **TTS (alternativ)** | ElevenLabs SDK 2.x | `eleven_v3`, naturliga röster |
| **Ikoner** | Lucide 1.x | SVG-ikonbibliotek |
| **Webbscraping** | Readability + linkedom | Extraherar huvudinnehåll från webbsidor (Firefox Reader View-teknik) |
| **Headless browser** | Lightpanda | Ultra-lätt headless-browser (Zig + V8) för JS/SPA-sidor — fallback scraping |
| **Markdown** | Marked | Markdown-rendering i chatten |
| **Filuppladdning** | Multer 2.x | Hantering av multipart-formulär |
| **Ljud** | ffmpeg-static | Sammanfogning av ljudsegment |
| **Tester** | Vitest | Enhetstester — täckning mätt av SonarCloud |
| **Persistens** | JSON-filer | Lagring utan externa beroenden |

---

## Modellreferens

| Modell | Användning | Varför |
|---|---|---|
| `mistral-large-latest` | Revisionskort, Flashcards, Podcast, Quiz, Texter med luckor, Chatt, Verifiering av röstquiz, Agent Bild, Agent Web Search, Instruktionsdetektion | Bäst för flerspråkighet + efterföljning av instruktioner |
| `mistral-ocr-latest` | OCR för dokument | Tryckt text, tabeller, handskrift |
| `voxtral-mini-latest` | Taligenkänning (STT) | Multispråkig STT, optimerad med `language="fr"` |
| `voxtral-mini-tts-latest` | Talsyntes (TTS) | Podcasts, röstquiz, högläsning |
| `mistral-moderation-latest` | Innehållsmoderering | 5 kategorier blockerade för barn/tonåringar (+ jailbreaking) |
| `mistral-small-latest` | Automatisk router | Snabb innehållsanalys för routingbeslut |
| `eleven_v3` (ElevenLabs) | Talsyntes (alternativ TTS) | Naturliga röster, konfigurerbart alternativ |

---

## Kom igång snabbt

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

> **Notera** : Mistral Voxtral TTS är standardleverantör — ingen extra nyckel krävs utöver `MISTRAL_API_KEY`. ElevenLabs är en alternativ TTS-leverantör som kan konfigureras i inställningarna.

---

## Driftsättning med container

Image publicerad på **GitHub Container Registry** :

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

> **`:U`** är en Podman rootless-flagga som automatiskt justerar volymrättigheter.
> **`ELEVENLABS_API_KEY`** är valfri (alternativ TTS).

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

## API-referens

### Konfiguration
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/config` | Aktuell konfiguration |
| `PUT` | `/api/config` | Ändra konfiguration (modeller, röster, TTS-leverantör) |
| `GET` | `/api/config/status` | API-status (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Återställ standardkonfiguration |
| `GET` | `/api/config/voices` | Lista Mistral TTS-röster (valfritt `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Tillgängliga modereringskategorier + standarder per ålder |

### Profiler
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/profiles` | Lista alla profiler |
| `POST` | `/api/profiles` | Skapa en profil |
| `PUT` | `/api/profiles/:id` | Ändra en profil (PIN krävs för < 15 år) |
| `DELETE` | `/api/profiles/:id` | Ta bort en profil + kaskad av projekt `{pin?}` → `{ok, deletedProjects}` |

### Projekt
| Metod | Endpoint | Beskrivning |
|---|---|---|
| `GET` | `/api/projects` | Lista projekt (`?profileId=` valfritt) |
| `POST` | `/api/projects` | Skapa ett projekt `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projektdetaljer |
| `PUT` | `/api/projects/:pid` | Byt namn `{name}` |
| `DELETE` | `/api/projects/:pid` | Ta bort projekt | ### Källor
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importera multipart-filer (OCR för JPG/PNG/PDF, direktläsning för TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Fri text `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-röst (multipart-ljud) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping av URL eller webbsökning `{query}` — returnerar en lista med källor |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Ta bort en källa |
| `POST` | `/api/projects/:pid/moderate` | Moderera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Upptäcka revisionsanvisningar |

### Generering
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Revisionskort |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashkort |
| `POST` | `/api/projects/:pid/generate/quiz` | Flervalsquiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Fyll i luckor |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustration |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Röstquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptiv repetition `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routningsanalys (plan för vilka generatorer som ska startas) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatisk backendgenerering (routning + 5 typer: sammanfattning, flashkort, quiz, fyll-i, podcast) |

Alla genereringsrutter accepterar `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` kräver dessutom `{generationId, weakQuestions}`.

### CRUD-genereringar
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Skicka in quiz-svar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Skicka in svar för fyll-i-texter `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifiera ett muntligt svar (ljud + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-uppläsning (revisionskort/flashkort) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Byt namn på `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Radera genereringen |

### Chatt
| Metod | Slutpunkt | Beskrivning |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Hämta chattens historik |
| `POST` | `/api/projects/:pid/chat` | Skicka ett meddelande `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Rensa chattens historik |

---

## Arkitektoniska beslut

| Beslut | Motivering |
|---|---|
| **Alpine.js istället för React/Vue** | Minimal footprint, lätt reaktivitet med TypeScript kompilerat av Vite. Perfekt för en hackathon där hastighet räknas. |
| **Persistens i JSON-filer** | Inga beroenden, omedelbar uppstart. Ingen databas att konfigurera — man startar och kör. |
| **Vite + Handlebars** | Det bästa av två världar: snabb HMR för utveckling, HTML-partials för kodorganisation, Tailwind JIT. |
| **Centraliserade prompts** | Alla AI-prompter i `prompts.ts` — enkelt att iterera, testa och anpassa efter språk/åldersgrupp. |
| **System med flera genereringar** | Varje generering är ett självständigt objekt med sitt eget ID — tillåter flera kort, quiz, etc. per kurs. |
| **Prompter anpassade efter ålder** | 4 åldersgrupper med olika vokabulär, komplexitet och ton — samma innehåll lärs ut olika beroende på lärande. |
| **Agent-baserade funktioner** | Bildgenerering och webbsök använder temporära Mistral-agenter — egen livscykel med automatisk städning. |
| **Intelligent URL-scraping** | Ett enda fält accepterar blandade URL:er och nyckelord — URL:er skrapas via Readability (statiska sidor) med fallback Lightpanda (JS/SPA-sidor), nyckelord triggar en Mistral web_search Agent. Varje resultat skapar en separat källa. |
| **TTS med flera leverantörer** | Mistral Voxtral TTS som standard (ingen extra nyckel), ElevenLabs som alternativ — konfigurerbart utan omstart. |

---

## Krediteringar & tack

- **[Mistral AI](https://mistral.ai)** — AI-modeller (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternativ röstsyntesmotor (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lätt reaktivt ramverk
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-ramverk
- **[Vite](https://vitejs.dev)** — Byggverktyg för frontend
- **[Lucide](https://lucide.dev)** — Ikonbibliotek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extrahering av webbinnehåll (teknik från Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Extremt lätt headless-webbläsare för scraping av JS/SPA-sidor

Påbörjat under Mistral AI Worldwide Hackathon (mars 2026), utvecklat helt av AI med [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) och [Gemini CLI](https://geminicli.com/).

---

## Författare

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licens

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Detta dokument har översatts från fr till sv med hjälp av modellen gpt-5-mini. För mer information om översättningsprocessen, se https://gitlab.com/jls42/ai-powered-markdown-translator**

