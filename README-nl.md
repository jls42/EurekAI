<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Zet elk soort inhoud om in een interactieve leerervaring — aangedreven door <a href="https://mistral.ai">Mistral AI</a>.</strong>
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

**EurekAI** is ontstaan tijdens de [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([officiële site](https://worldwide-hackathon.mistral.ai/)) (maart 2026). Ik had een onderwerp nodig — en het idee kwam van iets heel concreets: ik bereid regelmatig toetsen voor met mijn dochter, en ik dacht dat het mogelijk moest zijn om dat leuker en interactiever te maken dankzij AI.

Het doel: neem **elke invoer** — een foto van het leerboek, geplakte tekst, een spraakopname, een webzoekopdracht — en zet die om in **samenvattingsfiches, flashcards, quizzen, podcasts, invuloefeningen, illustraties en meer**. Alles aangedreven door de Franse modellen van Mistral AI, waardoor het van nature goed geschikt is voor Franstalige leerlingen.

Het project is gestart tijdens de hackathon en daarna verder ontwikkeld. De volledige code is gegenereerd door AI — voornamelijk [Claude Code](https://docs.anthropic.com/en/docs/claude-code), met enkele bijdragen via [Codex](https://openai.com/index/introducing-codex/).

---

## Functionaliteiten

| | Functionaliteit | Beschrijving |
|---|---|---|
| 📷 | **Upload OCR** | Neem een foto van je leerboek of notities — Mistral OCR extraheert de inhoud |
| 📝 | **Tekstinvoer** | Typ of plak rechtstreeks elke tekst |
| 🎤 | **Spraakinvoer** | Neem jezelf op — Voxtral STT zet je stem om naar tekst |
| 🌐 | **Webzoekopdracht** | Stel een vraag — een Mistral Agent zoekt antwoorden op het web |
| 📄 | **Samenvattingsfiches** | Gestructureerde notities met kernpunten, vocabulaire, citaten, anekdotes |
| 🃏 | **Flashcards** | 5-50 Q/A-kaarten met bronverwijzingen voor actief onthouden |
| ❓ | **Meerkeuzequiz** | 5-50 meerkeuzevragen met adaptieve herhaling van fouten |
| ✏️ | **Invuloefeningen** | Oefeningen om in te vullen met hints en tolerante validatie |
| 🎙️ | **Podcast** | Mini-podcast met 2 stemmen, omgezet naar audio via Mistral Voxtral TTS |
| 🖼️ | **Illustraties** | Educatieve afbeeldingen gegenereerd door een Mistral Agent |
| 🗣️ | **Spraakquiz** | Vragen hardop voorgelezen, mondeling antwoord, AI controleert het antwoord |
| 💬 | **AI-tutor** | Contextuele chat met je lesdocumenten, met aanroepen van tools |
| 🧠 | **Automatische router** | Een router gebaseerd op `mistral-small-latest` analyseert de inhoud en stelt een combinatie van generators voor uit de 7 beschikbare typen |
| 🔒 | **Ouderlijk toezicht** | Moderatie op leeftijd, ouderlijke PIN, chatbeperkingen |
| 🌍 | **Meertalig** | Interface beschikbaar in 9 talen; AI-generatie aanstuurbaar in 15 talen via prompts |
| 🔊 | **Voorlezen** | Laat samenvattingen en flashcards voorlezen via Mistral Voxtral TTS of ElevenLabs |

---

## Overzicht van de architectuur

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Upload OCR<br/><i>mistral-ocr-latest</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Recherche web<br/><i>Agent Mistral</i>"]
    end

    subgraph "🛡️ Sécurité (async, si activée par profil)"
        MOD["Modération<br/><i>mistral-moderation-latest</i>"]
        CON["Détection de consigne<br/><i>mistral-large-latest</i>"]
    end

    subgraph "🧠 Générateurs IA"
        SUM["📄 Fiche"]
        FC["🃏 Flashcards"]
        QZ["❓ Quiz QCM"]
        FB["✏️ Textes à trous"]
        POD["🎙️ Podcast"]
        IMG["🖼️ Illustration"]
        QV["🗣️ Quiz vocal"]
        CHAT["💬 Tuteur IA"]
    end

    subgraph "📤 Sortie"
        TTS["🔊 TTS<br/><i>Mistral Voxtral / ElevenLabs</i>"]
        JSON["📦 Persistance JSON"]
        UI["🖥️ Interface interactive"]
    end

    OCR & TXT & MIC & WEB --> MOD & CON
    MOD & CON -.->|gardes| SUM & FC & QZ & FB & POD & IMG & QV & CHAT
    POD --> TTS
    QV --> TTS
    SUM & FC -->|lecture à voix haute| TTS
    SUM & FC & QZ & FB & POD & IMG & QV & CHAT --> JSON
    JSON --> UI
    TTS --> UI
```

---

## Kaart van modelgebruik

```mermaid
flowchart LR
    subgraph "Modèles Mistral"
        ML["mistral-large-latest"]
        MO["mistral-ocr-latest"]
        MV["voxtral-mini-latest"]
        MMod["mistral-moderation-latest"]
        MS["mistral-small-latest"]
        MTTS["voxtral-mini-tts-latest"]
    end

    subgraph "Tâches"
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Textes à trous / Vérification quiz / Consigne"]
        T2["OCR — documents, tableaux, écriture manuscrite"]
        T3["Reconnaissance vocale — STT optimisé FR"]
        T4["Modération de contenu — filtrage par âge"]
        T5["Routeur automatique — analyse du contenu"]
        T6["Génération d'image — Agent + outil image_generation"]
        T7["Recherche web — Agent + outil web_search"]
        T8["Synthèse vocale — podcasts, quiz vocal, lecture à voix haute"]
    end

    ML --> T1
    MO --> T2
    MV --> T3
    MMod --> T4
    MS --> T5
    ML --> T6
    ML --> T7
    MTTS --> T8
```

---

## Gebruikerstraject

```mermaid
sequenceDiagram
    actor Élève as Élève
    participant App as EurekAI
    participant AI as Mistral AI
    participant TTS as TTS (Voxtral / ElevenLabs)

    Élève->>App: Créer un profil (nom, âge, avatar)
    Élève->>App: Créer un cours
    Élève->>App: Ajouter des sources (photo / texte / voix / web)
    App->>AI: Modérer le contenu (si activé par profil)
    App->>AI: Détecter les consignes de révision
    Élève->>App: Générer du matériel d'étude
    App->>AI: Fiche / Flashcards / Quiz / Textes à trous / Podcast
    AI-->>App: Réponses JSON structurées
    App->>TTS: Convertir le script podcast en audio
    TTS-->>App: Fichier audio MP3
    Élève->>App: Écouter une fiche ou des flashcards
    App->>TTS: Synthèse TTS du contenu
    TTS-->>App: Audio MP3
    Élève->>App: Passer le quiz
    App->>AI: Réviser les erreurs → nouvelles questions
    Élève->>App: Passer le quiz vocal
    App->>TTS: TTS lit la question à voix haute
    Élève->>App: Répondre à voix haute
    App->>AI: Transcription STT + vérification IA
    Élève->>App: Discuter avec le tuteur IA
    App->>AI: Chat contextuel avec appel d'outils
```

---

## Diepgaande blik — Functionaliteiten

### Multimodale invoer

EurekAI accepteert 4 soorten bronnen, gemodereerd volgens het profiel (standaard ingeschakeld voor kind en tiener):

- **Upload OCR** — JPG-, PNG- of PDF-bestanden verwerkt door `mistral-ocr-latest`. Ondersteunt gedrukte tekst, tabellen en handschrift.
- **Vrije tekst** — Typ of plak elke inhoud. Gemodereerd vóór opslag als moderatie actief is.
- **Spraakinvoer** — Neem audio op in de browser. Getranscribeerd door `voxtral-mini-latest`. De instelling `language="fr"` optimaliseert de herkenning.
- **Webzoekopdracht** — Voer een query in. Een tijdelijke Mistral Agent met de tool `web_search` haalt resultaten op en vat ze samen.

### AI-gegenereerde inhoud

Zeven types leermateriaal gegenereerd:

| Generator | Model | Output |
|---|---|---|
| **Samenvattingsfiche** | `mistral-large-latest` | Titel, samenvatting, 10-25 kernpunten, vocabulaire, citaten, anekdote |
| **Flashcards** | `mistral-large-latest` | 5-50 Q/A-kaarten met bronverwijzingen voor actief onthouden |
| **Meerkeuzequiz** | `mistral-large-latest` | 5-50 vragen, 4 keuzes elk, uitleg, adaptieve herhaling |
| **Invuloefeningen** | `mistral-large-latest` | Zinnen om in te vullen met hints, tolerante validatie (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script voor 2 stemmen → MP3-audio |
| **Illustratie** | Agent `mistral-large-latest` | Educatieve afbeelding via de tool `image_generation` |
| **Spraakquiz** | `mistral-large-latest` + Voxtral TTS + STT | Vragen TTS → antwoord STT → AI-controle |

### AI-tutor via chat

Een conversationele tutor met volledige toegang tot lesdocumenten:

- Gebruikt `mistral-large-latest`
- **Tool-aanroepen**: kan tijdens het gesprek samenvattingen, flashcards, quizzen of invuloefeningen genereren
- Geschiedenis van 50 berichten per cursus
- Moderatie van inhoud indien ingeschakeld voor het profiel

### Automatische router

De router gebruikt `mistral-small-latest` om de inhoud van bronnen te analyseren en de meest relevante generators voor te stellen uit de 7 beschikbare. De interface toont realtime voortgang: eerst een analysefase, daarna de individuele generaties met annuleeroptie.

### Adaptief leren

- **Quizstatistieken**: bijhouden van pogingen en nauwkeurigheid per vraag
- **Quizherhaling**: genereert 5-10 nieuwe vragen gericht op zwakke concepten
- **Detectie van instructies**: detecteert herzieningsinstructies ("Ik ken mijn les als ik weet...") en geeft ze prioriteit in compatibele tekstgenerators (fiche, flashcards, quiz, invuloefeningen)

### Veiligheid & ouderlijk toezicht

- **4 leeftijdsgroepen**: kind (≤10 jaar), tiener (11-15), student (16-25), volwassene (26+)
- **Inhoudsmoderatie**: `mistral-moderation-latest` met 5 categorieën geblokkeerd voor kind/tiener (seksualiteit, haat, geweld, zelfbeschadiging, jailbreak), geen beperkingen voor student/volwassene
- **Ouder-PIN**: SHA-256-hash, vereist voor profielen jonger dan 15 jaar. Voor productie-implementatie voorkom een trage hash met salt (Argon2id, bcrypt).
- **Chatbeperkingen**: AI-chat standaard uitgeschakeld voor onder 16-jarigen, inschakelbaar door ouders

### Multi-profiel systeem

- Meerdere profielen met naam, leeftijd, avatar, taalvoorkeuren
- Projecten gekoppeld aan profielen via `profileId`
- Cascadeverwijdering: een profiel verwijderen verwijdert al zijn projecten

### TTS multi-provider

- **Mistral Voxtral TTS** (standaard): `voxtral-mini-tts-latest`, geen extra sleutel nodig
- **ElevenLabs** (alternatief): `eleven_v3`, natuurlijke stemmen, vereist `ELEVENLABS_API_KEY`
- Provider configureerbaar in de applicatie-instellingen

### Internationalisatie

- Interface beschikbaar in 9 talen: fr, en, es, pt, it, nl, de, hi, ar
- AI-prompts ondersteunen 15 talen (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Taal instelbaar per profiel

---

## Technische stack

| Laag | Technologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 5.x | Server en typeveiligheid |
| **Backend** | Express 4.x | REST API |
| **Dev-server** | Vite 7.x + tsx | HMR, Handlebars partials, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Reactieve interface, TypeScript gecompileerd door Vite |
| **Templating** | vite-plugin-handlebars | HTML-compositie via partials |
| **AI** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderatie |
| **TTS (standaard)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, ingebouwde spraaksynthese |
| **TTS (alternatief)** | ElevenLabs SDK 2.x | `eleven_v3`, natuurlijke stemmen |
| **Iconen** | Lucide | SVG-icoonbibliotheek |
| **Markdown** | Marked | Markdown-rendering in de chat |
| **Bestandsupload** | Multer 1.4 LTS | Multipart formulierverwerking |
| **Audio** | ffmpeg-static | Samenvoegen van audiosegmenten |
| **Tests** | Vitest | Unit tests — dekking gemeten door SonarCloud |
| **Permanente opslag** | JSON-bestanden | Opslag zonder afhankelijkheden |

---

## Modelreferentie

| Model | Gebruik | Waarom |
|---|---|---|
| `mistral-large-latest` | Fiche, Flashcards, Podcast, Quiz, Invuloefeningen, Chat, Verificatie spraakquiz, Image Agent, Web Search Agent, Detectie instructies | Beste meertalige model + opvolging van instructies |
| `mistral-ocr-latest` | Document OCR | Gedrukte tekst, tabellen, handschrift |
| `voxtral-mini-latest` | Spraakherkenning (STT) | Meertalige STT, geoptimaliseerd met `language="fr"` |
| `voxtral-mini-tts-latest` | Spraaksynthese (TTS) | Podcasts, spraakquiz, voorlezen |
| `mistral-moderation-latest` | Inhoudsmoderatie | 5 categorieën geblokkeerd voor kind/tiener (+ jailbreak) |
| `mistral-small-latest` | Automatische router | Snelle analyse van inhoud voor routeringsbeslissingen |
| `eleven_v3` (ElevenLabs) | Spraaksynthese (alternatieve TTS) | Natuurlijke stemmen, configureerbaar alternatief |

---

## Snelstart

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

> **Opmerking** : Mistral Voxtral TTS is de standaardprovider — geen extra sleutel nodig bovenop `MISTRAL_API_KEY`. ElevenLabs is een alternatief configureerbare TTS-provider in de instellingen.

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
  ocr.ts                  — Upload + OCR via Mistral (JPG, PNG, PDF)
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
  websearch.ts            — Agent Mistral avec outil web_search
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Upload OCR, texte libre, voix STT, recherche web, modération
  generate.ts             — Endpoints de génération (7 types + auto + route)
  generations.ts          — Tentatives de quiz/fill-blank, réponses vocales, lecture à voix haute
  chat.ts                 — Chat IA avec appel d'outils

helpers/
  index.ts                — safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)

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
| `GET` | `/api/config/voices` | Lijst van Mistral TTS-stemmen (optioneel `?lang=fr`) |

### Profielen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/profiles` | Alle profielen lijst |
| `POST` | `/api/profiles` | Profiel aanmaken |
| `PUT` | `/api/profiles/:id` | Profiel bewerken (PIN vereist voor < 15 jaar) |
| `DELETE` | `/api/profiles/:id` | Profiel verwijderen + cascade projecten `{pin?}` → `{ok, deletedProjects}` |

### Projecten
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects` | Projecten lijst (`?profileId=` optioneel) |
| `POST` | `/api/projects` | Project aanmaken `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Projectdetails |
| `PUT` | `/api/projects/:pid` | Hernoemen `{name}` |
| `DELETE` | `/api/projects/:pid` | Project verwijderen |

### Bronnen
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Upload OCR (multipart bestanden) |
| `POST` | `/api/projects/:pid/sources/text` | Vrije tekst `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Spraak STT (multipart audio) |
| `POST` | `/api/projects/:pid/sources/websearch` | Webzoekopdracht `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Bron verwijderen |
| `POST` | `/api/projects/:pid/moderate` | Modereren `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detecteer herzieningsinstructies |

### Generatie
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Samenvattingsfiche |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Meerkeuzequiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Invuloefeningen |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustratie |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Spraakquiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Adaptieve herziening `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Routeringsanalyse (plan van te starten generators) |
| `POST` | `/api/projects/:pid/generate/auto` | Auto backend generatie (routering + 5 types: summary, flashcards, quiz, fill-blank, podcast) |

Alle generatie-routes accepteren `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` vereist daarnaast `{generationId, weakQuestions}`.

### CRUD Generaties
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quizantwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Invuloefeningen antwoorden indienen `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Mondeling antwoord verifiëren (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS-voorlezen (fiches/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Hernoemen `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Generatie verwijderen |

### Chat
| Methode | Endpoint | Beschrijving |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chatgeschiedenis ophalen |
| `POST` | `/api/projects/:pid/chat` | Bericht versturen `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chatgeschiedenis wissen |

---

## Architectuurbeslissingen

| Beslissing | Rechtvaardiging |
|---|---|
| **Alpine.js in plaats van React/Vue** | Minimale footprint, lichte reactiviteit met TypeScript gecompileerd door Vite. Perfect voor een hackathon waar snelheid telt. |
| **Permanente opslag in JSON-bestanden** | Geen afhankelijkheden, directe start. Geen databaseconfiguratie nodig — je start en het werkt meteen. |
| **Vite + Handlebars** | Het beste van twee werelden: snelle HMR voor ontwikkeling, HTML-partials voor codeorganisatie, Tailwind JIT. |
| **Gecentraliseerde prompts** | Alle AI-prompts in `prompts.ts` — gemakkelijk te itereren, te testen en per taal/leeftijdsgroep aan te passen. |
| **Multi-generatiesysteem** | Elke generatie is een onafhankelijk object met een eigen ID — maakt meerdere leerkaarten, quizzen, enz. per cursus mogelijk. |
| **Prompts aangepast per leeftijd** | 4 leeftijdsgroepen met verschillend vocabulaire, complexiteit en toon — dezelfde inhoud onderwijst op verschillende manieren, afhankelijk van de leerling. |
| **Functies gebaseerd op Agents** | Het genereren van afbeeldingen en webzoekopdrachten gebruiken tijdelijke Mistral Agents — eigen levenscyclus met automatische opschoning. |
| **Meerdere TTS-providers** | Mistral Voxtral TTS standaard (geen extra sleutel), ElevenLabs als alternatief — configureerbaar zonder herstart. |

---

## Credits & dank

- **[Mistral AI](https://mistral.ai)** — AI-modellen (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Alternatieve spraaksynthesemotor (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Lichtgewicht reactief framework
- **[TailwindCSS](https://tailwindcss.com)** — Utility CSS-framework
- **[Vite](https://vitejs.dev)** — Frontend buildtool
- **[Lucide](https://lucide.dev)** — Icoonbibliotheek
- **[Marked](https://marked.js.org)** — Markdown-parser

Opgestart tijdens de Mistral AI Worldwide Hackathon (maart 2026), volledig ontwikkeld door AI met Claude Code en Codex.

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licentie

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Dit document is vertaald van de Franse versie naar het Nederlands met behulp van het model gpt-5-mini. Voor meer informatie over het vertaalproces, raadpleeg https://gitlab.com/jls42/ai-powered-markdown-translator**

