<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI-logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Zet elke inhoud om in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engels</a> · <a href="README-es.md">🇪🇸 Spaans</a> · <a href="README-pt.md">🇧🇷 Portugees</a> · <a href="README-de.md">🇩🇪 Duits</a> · <a href="README-it.md">🇮🇹 Italiaans</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 Arabisch</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chinees</a> · <a href="README-ja.md">🇯🇵 Japans</a> · <a href="README-ko.md">🇰🇷 Koreaans</a> · <a href="README-pl.md">🇵🇱 Pools</a> · <a href="README-ro.md">🇷🇴 Roemeens</a> · <a href="README-sv.md">🇸🇪 Zweeds</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube-demo"></a>
</p>

<h4 align="center">📊 Codekwaliteit</h4>

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

## Het verhaal — Waarom EurekAI?

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam uit iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter en dacht dat het mogelijk moest zijn om dat speelser en interactiever te maken met behulp van AI.

Het doel: elke invoer nemen — een foto van de les, gekopieerde tekst, een audio-opname, een webzoekopdracht — en die omzetten in **samenvattingsfiches, flashcards, quizzen, podcasts, invuloefeningen, illustraties en meer**. Alles aangedreven door de Franse modellen van Mistral AI, waardoor het van nature goed geschikt is voor Franstalige leerlingen.

Het [initiële prototype](https://github.com/jls42/worldwide-hackathon.mistral.ai) werd in 48 uur ontwikkeld tijdens de hackathon als proof of concept rond de services van Mistral — al functioneel, maar beperkt. Sindsdien is EurekAI uitgegroeid tot een echt project: invuloefeningen, navigatie in oefeningen, webscraping, configureerbare ouderlijke moderatie, grondige code-review, en meer. De volledige code is gegenereerd door AI — voornamelijk [Claude Code](https://code.claude.com/), met enkele bijdragen via [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Functies

| | Functionaliteit | Beschrijving |
|---|---|---|
| 📷 | **Bestanden importeren** | Importeer je lessen — foto, PDF (via Mistral OCR) of tekstbestand (TXT, MD) |
| 📝 | **Tekstinvoer** | Typ of plak elke tekst direct |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT transcribeert je stem |
| 🌐 | **Web / URL** | Plak een URL (directe scraping via Readability + Lightpanda) of typ een zoekopdracht (Agent Mistral web_search) |
| 📄 | **Samenvattingsfiches** | Gestructureerde aantekeningen met kernpunten, vocabulaire, citaten, anekdotes |
| 🃏 | **Flashcards** | Vragen/antwoorden kaarten met bronverwijzingen voor actieve memorisatie (instelbaar aantal) |
| ❓ | **Meerkeuzequiz** | Meerkeuzevragen met adaptieve foutreview (instelbaar aantal) |
| ✏️ | **Invuloefeningen** | Oefeningen om aan te vullen met hints en tolerante validatie |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen in audio — standaard Mistral-stem of gepersonaliseerde stemmen (ouders!) |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Agent Mistral |
| 🗣️ | **Spraakquiz** | Vragen die hardop worden voorgelezen (aanpasbare stem mogelijk), mondeling antwoord, AI-validatie |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met aanroepen van tools |
| 🧠 | **Automatische router** | Een router gebaseerd op `mistral-small-latest` analyseert de inhoud en stelt een combinatie van generatoren voor uit de 7 beschikbare types |
| 🔒 | **Ouderlijk toezicht** | Configureerbare moderatie per profiel (aanpasbare categorieën), ouderlijke PIN, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie aanstuurbaar in 15 talen via prompts |
| 🔊 | **Voorlezen** | Luister naar samenvattingen en flashcards via Mistral Voxtral TTS of ElevenLabs |

---

## Overzicht van de architectuur

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architectuuroverzicht" width="800" />
</p>

---

## Model-to-taak kaart

<p align="center">
  <img src="public/assets/model-map.webp" alt="Model-naar-taak mapping" width="800" />
</p>

---

## Gebruikerstraject

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Leertraject van de leerling" width="800" />
</p>

---

## Dieper duiken — Functies

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd per profiel (standaard ingeschakeld voor kind en tiener):

- **Bestanden importeren** — JPG-, PNG- of PDF-bestanden verwerkt door `mistral-ocr-latest` (gedrukte tekst, tabellen, handschrift), of tekstbestanden (TXT, MD) die direct worden geïmporteerd.
- **Vrije tekst** — Typ of plak elke inhoud. Gemodereerd vóór opslag als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De parameter `language="fr"` optimaliseert de herkenning.
- **Web / URL** — Plak één of meerdere URL's om de inhoud direct te scrapen (Readability + Lightpanda voor JS-pagina's), of typ trefwoorden voor een webzoekopdracht via Agent Mistral. Het enkele veld accepteert beide — URL's en trefwoorden worden automatisch gescheiden, elk resultaat creëert een onafhankelijke bron.

### IA-inhoudsgeneratie

Zeven soorten gegenereerd leermateriaal:

| Generator | Model | Uitvoer |
|---|---|---|
| **Samenvattingsfiche** | `mistral-large-latest` | Titel, samenvatting, kernpunten, vocabulaire, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | Vragen/antwoorden kaarten met bronverwijzingen (instelbaar aantal) |
| **Meerkeuzequiz** | `mistral-large-latest` | Meerkeuzevragen, uitleg, adaptieve foutreview (instelbaar aantal) |
| **Invuloefeningen** | `mistral-large-latest` | Zinnen om aan te vullen met hints, tolerante validatie (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script voor 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | Vragen TTS → antwoord STT → AI-validatie |

### AI-tutor via chat

Een converserende tutor met volledige toegang tot de lesdocumenten:

- Gebruikt `mistral-large-latest`
- **Kan tools aanroepen** : kan tijdens het gesprek fiches, flashcards, quizzen of invuloefeningen genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie van inhoud indien ingeschakeld voor het profiel

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van bronnen te analyseren en de meest relevante generatoren uit de 7 beschikbare voor te stellen. De interface toont realtime voortgang: eerst een analysetrap, daarna individuele generaties met mogelijkheid tot annuleren.

### Adaptief leren

- **Quizstatistieken** : volgen van pogingen en nauwkeurigheid per vraag
- **Quizreview** : genereert 5–10 nieuwe vragen gericht op zwakkere concepten
- **Detectie van instructies** : detecteert revisie-instructies ("Ik ken mijn les als ik ... kan") en prioriteert deze in compatibele tekstgenerators (fiche, flashcards, quiz, invuloefeningen)

### Beveiliging & ouderlijk toezicht

- **4 leeftijdsgroepen** : kind (≤10 jaar), tiener (11–15), student (16–25), volwassene (26+)
- **Inhoudsmoderatie** : `mistral-moderation-latest` met 10 beschikbare categorieën, 5 geblokkeerd per standaard voor kind/tiener (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorieën aanpasbaar per profiel in de instellingen.
- **Ouder-PIN** : SHA-256-hash, vereist voor profielen jonger dan 15 jaar. Voor productie-implementatie voorzien van een langzame hash met salt (Argon2id, bcrypt).
- **Chatbeperkingen** : AI-chat standaard uitgeschakeld voor jonger dan 16 jaar, activeerbaar door ouders

### Multi-profielsysteem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- Projecten gekoppeld aan profielen via `profileId`
- Cascade-verwijdering: verwijderen van een profiel verwijdert al zijn projecten

### Meerdere TTS-providers & gepersonaliseerde stemmen

- **Mistral Voxtral TTS** (standaard) : `voxtral-mini-tts-latest`, geen extra sleutel vereist
- **ElevenLabs** (alternatief) : `eleven_v3`, natuurlijke stemmen, vereist `ELEVENLABS_API_KEY`
- Provider configureerbaar in de applicatie-instellingen
- **Gepersonaliseerde stemmen** : ouders kunnen hun eigen stemmen creëren via de Mistral Voices API (vanuit een audiovoorbeeld) en deze toewijzen aan rollen host/gast — podcasts en spraakquizzen worden dan ingesproken met de stem van een ouder, wat de ervaring voor het kind nog meeslepender maakt
- Twee configureerbare stemrollen : **host** (hoofdverteller) en **gast** (tweede stem van de podcast)
- Volledige catalogus van Mistral-stemmen beschikbaar in de instellingen, filterbaar op taal

### Internationalisatie

- Interface beschikbaar in 9 talen: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts ondersteunen 15 talen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Taal configureerbaar per profiel

---

## Technische stack

| Laag | Technologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server en typeveiligheid |
| **Backend** | Express 5.x | REST API |
| **Dev-server** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS (standaard)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, ingebouwde spraaksynthese |
| **TTS (alternatief)** | ElevenLabs SDK 2.x | `eleven_v3`, natuurlijke stemmen |
| **Iconen** | Lucide 1.x | SVG-icoonbibliotheek |
| **Webscraping** | Readability + linkedom | Extractie van hoofdinhoud van webpagina's (Firefox Reader View-technologie) |
| **Headless browser** | Lightpanda | Ultra-lichte headless browser (Zig + V8) voor JS/SPA-pagina's — fallback scraping |
| **Markdown** | Marked | Markdown-rendering in chat |
| **Bestandsupload** | Multer 2.x | Multipart form beheer |
| **Audio** | ffmpeg-static | Concatenatie van audiosegmenten |
| **Tests** | Vitest | Unittests — dekking gemeten door SonarCloud |
| **Persistentie** | JSON-bestanden | Opslag zonder externe afhankelijkheid |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Fiche, Flashcards, Podcast, Quiz, Invuloefeningen, Chat, Validatie spraakquiz, Image Agent, Web Search Agent, Detectie instructies | Beste meertaligheid + opvolging van instructies |
| `mistral-ocr-latest` | Document OCR | Gedrukte tekst, tabellen, handschrift |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, spraakquiz, voorlezen |
| `mistral-moderation-latest` | Inhoudsmoderatie | 5 categorieën geblokkeerd voor kind/tiener (+ jailbreaking) |
| `mistral-small-latest` | Automatische router | Snelle analyse van inhoud voor routeringsbeslissingen |
| `eleven_v3` (ElevenLabs) | Spraaksynthese (alternatieve TTS) | Natuurlijke stemmen, configureerbaar alternatief |

---

## Snelle start

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

> **Opmerking** : Mistral Voxtral TTS is de standaardprovider — geen extra sleutel nodig bovenop `MISTRAL_API_KEY`. ElevenLabs is een configureerbare alternatieve TTS-provider in de instellingen.

---

## Deployen met container

De image is gepubliceerd op **GitHub Container Registry** :

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

> **`:U`** is een Podman rootless flag die automatisch de permissies van het volume aanpast.
> **`ELEVENLABS_API_KEY`** is optioneel (alternatieve TTS).

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Projectstructuur

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

## API-referentie

### Config
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/config` | Huidige configuratie |
| `PUT` | `/api/config` | Config aanpassen (modellen, stemmen, TTS-provider) |
| `GET` | `/api/config/status` | API-status (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Config resetten naar standaard |
| `GET` | `/api/config/voices` | Lijst Mistral TTS-stemmen (optioneel `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Beschikbare moderatiecategorieën + standaardinstellingen per leeftijd |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen weergeven |
| `POST` | `/api/profiles` | Profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Profiel bewerken (PIN vereist voor < 15 jaar) |
| `DELETE` | `/api/profiles/:id` | Profiel verwijderen + cascade projecten `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten weergeven (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Project aanmaken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails |
| `PUT` | `/api/projects/:pid` | Hernoemen `{name}` |
| `DELETE` | `/api/projects/:pid` | Project verwijderen | ### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Multipart-bestanden importeren (OCR voor JPG/PNG/PDF, directe lezing voor TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT-spraak (multipart-audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL-scraping of webzoekopdracht `{query}` — geeft een tabel met bronnen terug |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Een bron verwijderen |
| `POST` | `/api/projects/:pid/moderate` | Modereren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Revisie-instructies detecteren |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Revisiekaart |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flitskaarten |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invulteksten |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Spraakquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve revisie `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routinganalyse (plan van te starten generatoren) |
| `POST` | `/api/projects/:pid/generate/auto` | Automatische backend-generatie (routing + 5 typen: samenvatting, flitskaarten, quiz, invultekst, podcast) |

Alle generatieroutes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` vereist daarnaast `{generationId, weakQuestions}`.

### CRUD-generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Antwoorden invulteksten indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Een mondeling antwoord controleren (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-voorlezen (revisiekaarten/flitskaarten) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Hernoemen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generatie verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Een bericht verzenden `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatgeschiedenis wissen |

---

## Architectuurbeslissingen

| Beslissing | Rechtvaardiging |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Persistente opslag in JSON-bestanden** | Geen afhankelijkheden, directe opstart. Geen database om te configureren — je start meteen. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor codeorganisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — gemakkelijk te itereren, testen en aanpassen per taal/leeftijdsgroep. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met zijn eigen ID — maakt meerdere revisiekaarten, quizzen, enz. per cursus mogelijk. |
| **Leeftijdsspecifieke prompts** | 4 leeftijdsgroepen met verschillend vocabulaire, complexiteit en toon — dezelfde inhoud onderwijst anders afhankelijk van de leerling. |
| **Agent-gebaseerde functionaliteiten** | Afbeeldingsgeneratie en websearch gebruiken tijdelijke Mistral Agents — levenscyclus netjes met automatische opschoning. |
| **Slimme URL-scraping** | Een enkel veld accepteert URL's en zoekwoorden gemengd — URL's worden gescraped via Readability (statische pagina's) met fallback Lightpanda (JS/SPA-pagina's), zoekwoorden activeren een Mistral-agent web_search. Elk resultaat creëert een onafhankelijke bron. |
| **Multi-provider TTS** | Mistral Voxtral TTS standaard (geen extra sleutel), ElevenLabs als alternatief — configureerbaar zonder herstart. |

---

## Credits & dank

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternatieve spraaksynthesemotor (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility-first CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend build-tool
- **[Lucide](https://lucide.dev)** — Pictogrammenbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser
- **[Readability](https://github.com/mozilla/readability)** — Extractie van webinhoud (technologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Ultralichte headless browser voor het scrapen van JS/SPA-pagina's

Gestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) en [Gemini CLI](https://geminicli.com/).

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Dit document is vertaald van de fr-versie naar de nl-versie met behulp van het model gpt-5-mini. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

