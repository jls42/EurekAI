<p align="center">
  <img src="public/assets/logo.webp" alt="Sigla EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — alimentat de <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engleză</a> · <a href="README-es.md">🇪🇸 Spaniolă</a> · <a href="README-pt.md">🇧🇷 Portugheză</a> · <a href="README-de.md">🇩🇪 Germană</a> · <a href="README-it.md">🇮🇹 Italiană</a> · <a href="README-nl.md">🇳🇱 Olandeză</a> · <a href="README-ar.md">🇸🇦 Arabă</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chineză</a> · <a href="README-ja.md">🇯🇵 Japoneză</a> · <a href="README-ko.md">🇰🇷 Coreeană</a> · <a href="README-pl.md">🇵🇱 Poloneză</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Suedeză</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstrație YouTube"></a>
</p>

<h4 align="center">📊 Calitatea codului</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Poartă de calitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Clasament securitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Clasament fiabilitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Clasament mentenabilitate"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Acoperire"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Vulnerabilități"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Linii de cod"></a>
</p>

---

## Povestea — De ce EurekAI?

**EurekAI** a luat naștere în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de un subiect — iar ideea a pornit din ceva foarte concret: pregătesc regulat testele cu fiica mea și m-am gândit că ar trebui să fie posibil să facem asta mai distractiv și interactiv cu ajutorul IA.

Obiectivul: să preluăm **oricare intrare** — o poză a lecției, un text copiat-lipiți, o înregistrare vocală, o căutare web — și să o transformăm în **fișe de recapitulare, flashcard-uri, quiz-uri, podcasturi, texte de completat, ilustrații și multe altele**. Totul alimentat de modelele franceze Mistral AI, ceea ce o face o soluție natural adaptată elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48h în timpul hackathon-ului ca proof of concept în jurul serviciilor Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect real: texte de completat, navigare în exerciții, scraping web, moderare parentală configurabilă, revizuire aprofundată a codului și multe altele. Întregul cod este generat de IA — în principal [Claude Code](https://code.claude.com/), cu câteva contribuții prin [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import fișiere** | Importați lecțiile — poză, PDF (via Mistral OCR) sau fișier text (TXT, MD) |
| 📝 | **Introducere text** | Tastați sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT îți transcrie vocea |
| 🌐 | **Web / URL** | Lipiți un URL (scraping direct via Readability + Lightpanda) sau tastați o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de recapitulare** | Note structurate cu puncte cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcards** | Carduri Q/R cu referințe la surse pentru memorare activă (număr configurabil) |
| ❓ | **Quiz QCM** | Întrebări cu răspunsuri multiple cu revizuire adaptivă a erorilor (număr configurabil) |
| ✏️ | **Texte de completat** | Exerciții de completat cu indicii și validare tolerantă |
| 🎙️ | **Podcast** | Mini-podcast cu 2 voci în audio — vocea Mistral implicită sau voci personalizate (părinți!) |
| 🖼️ | **Ilustrații** | Imagini educaționale generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (voce custom posibilă), răspuns oral, verificare IA |
| 💬 | **Tutor IA** | Chat contextual cu documentele tale de curs, cu apel la instrumente |
| 🧠 | **Ruter automat** | Un rutet bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare din cele 7 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă pe profil (categorii personalizabile), PIN parental, restricții chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generare IA controlabilă în 15 limbi prin prompturi |
| 🔊 | **Citire cu voce tare** | Ascultați fișele și flashcard-urile via Mistral Voxtral TTS sau ElevenLabs |

---

## Vedere de ansamblu a arhitecturii

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Import fichiers<br/><i>OCR / texte brut</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Web / URL<br/><i>Readability + Lightpanda<br/>ou Agent Mistral</i>"]
    end

    subgraph "🛡️ Modération (async, si activée par profil)"
        MOD["Modération<br/><i>mistral-moderation-latest</i>"]
    end

    CON["📋 Détection de consigne<br/><i>mistral-large-latest</i>"]

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

    OCR & TXT & MIC & WEB --> MOD
    OCR & TXT & MIC & WEB --> CON
    MOD -.->|garde| SUM & FC & QZ & FB & POD & IMG & QV & CHAT
    CON -.->|consigne| SUM & FC & QZ & FB
    POD --> TTS
    QV --> TTS
    SUM & FC -->|lecture à voix haute| TTS
    SUM & FC & QZ & FB & POD & IMG & QV & CHAT --> JSON
    JSON --> UI
    TTS --> UI
```

---

## Hartă de utilizare a modelelor

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
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Quiz vocal / Textes à trous / Vérification quiz / Consigne"]
        T2["OCR — documents, tableaux, écriture manuscrite (JPG, PNG, PDF)"]
        T3["Reconnaissance vocale — STT optimisé FR"]
        T4["Modération de contenu — filtrage par âge"]
        T5["Routeur automatique — analyse du contenu"]
        T6["Génération d'image — Agent + outil image_generation"]
        T7["Web / URL — Scraping direct ou Agent web_search"]
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

## Parcurs utilizator

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

## Scurgere detaliată — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (activat implicit pentru copil și adolescent):

- **Import fișiere** — Fișiere JPG, PNG sau PDF procesate de `mistral-ocr-latest` (text imprimat, tabele, scris de mână), sau fișiere text (TXT, MD) importate direct.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți una sau mai multe URL-uri pentru a extrage conținutul direct (Readability + Lightpanda pentru pagini JS), sau tastați cuvinte-cheie pentru o căutare web prin Agent Mistral. Câmpul unic acceptă ambele — URL-urile și cuvintele-cheie sunt separate automat, fiecare rezultat creând o sursă independentă.

### Generarea de conținut IA

Șapte tipuri de materiale de învățare generate:

| Generator | Model | Ieșire |
|---|---|---|
| **Fișă de recapitulare** | `mistral-large-latest` | Titlu, rezumat, puncte cheie, vocabular, citate, anecdotă |
| **Flashcards** | `mistral-large-latest` | Carduri Q/R cu referințe la surse (număr configurabil) |
| **Quiz QCM** | `mistral-large-latest` | Întrebări cu alegere multiplă, explicații, revizuire adaptivă (număr configurabil) |
| **Texte de completat** | `mistral-large-latest` | Fraze de completat cu indicii, validare tolerantă (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educațională via instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Folosește `mistral-large-latest`
- **Apelare de instrumente**: poate genera fișe, flashcard-uri, quiz-uri sau texte de completat în timpul conversației
- Istoric de 50 de mesaje per curs
- Moderare a conținutului dacă este activată pentru profil

### Rutare automată

Rutarea folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune generatoarele cele mai relevante dintre cele 7 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale cu posibilitate de anulare.

### Învățare adaptivă

- **Statistici quiz**: urmărire a încercărilor și a acurateței pe întrebare
- **Revizuire quiz**: generează 5–10 întrebări noi vizând conceptele slabe
- **Detectarea instrucțiunii**: detectează indicații de revizuire ("Știu lecția dacă știu...") și le prioritizează în generatoarele textuale compatibile (fișă, flashcards, quiz, texte de completat)

### Securitate & control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11–15), student (16–25), adult (26+)
- **Moderare conținut**: `mistral-moderation-latest` cu 10 categorii disponibile, 5 blocate implicit pentru copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorii personalizabile pe profil în setări.
- **PIN parental**: hash SHA-256, necesar pentru profilurile sub 15 ani. Pentru un mediu de producție, prevăzut un hash lent cu salt (Argon2id, bcrypt).
- **Restricții chat**: chat IA dezactivat implicit pentru cei sub 16 ani, activabil de către părinți

### Sistem multi-profil

- Profiluri multiple cu nume, vârstă, avatar, preferințe de limbă
- Proiecte legate de profiluri via `profileId`
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale

### TTS multiprovider & voci personalizate

- **Mistral Voxtral TTS** (implicit): `voxtral-mini-tts-latest`, fără cheie suplimentară necesară
- **ElevenLabs** (alternativ): `eleven_v3`, voci naturale, necesită `ELEVENLABS_API_KEY`
- Provider configurabil în setările aplicației
- **Voci personalizate**: părinții pot crea propriile voci via API-ul Mistral Voices (dintr-un eșantion audio) și le pot atribui rolurilor gazdă/invitat — podcasturile și quiz-urile vocale sunt astfel redate cu vocea unui părinte, făcând experiența mai imersivă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalog complet al vocilor Mistral disponibil în setări, filtrabil pe limbă

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile IA suportă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limba configurabilă per profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranța tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server dev** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderare |
| **TTS (implicit)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **TTS (alternativ)** | ElevenLabs SDK 2.x | `eleven_v3`, voci naturale |
| **Iconițe** | Lucide 1.x | Bibliotecă de iconițe SVG |
| **Scraping web** | Readability + linkedom | Extracție a conținutului principal din pagini web (tehnologie Firefox Reader View) |
| **Browser headless** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru pagini JS/SPA — fallback scraping |
| **Markdown** | Marked | Redare markdown în chat |
| **Upload fișiere** | Multer 2.x | Gestionare formulare multipart |
| **Audio** | ffmpeg-static | Concatenerare segmente audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependență |

---

## Referință modele

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, Texte de completat, Chat, Verificare quiz vocal, Agent Imagine, Agent Web Search, Detectare instrucțiune | Cel mai bun multilingual + urmărire a instrucțiunilor |
| `mistral-ocr-latest` | OCR documente | Text imprimat, tabele, scris de mână |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, citire cu voce tare |
| `mistral-moderation-latest` | Moderare conținut | 5 categorii blocate pentru copil/adolescent (+ jailbreaking) |
| `mistral-small-latest` | Rutare automată | Analiză rapidă a conținutului pentru decizii de rutare |
| `eleven_v3` (ElevenLabs) | Sinteză vocală (TTS alternativ) | Voci naturale, alternativă configurabilă |

---

## Pornire rapidă

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

> **Notă** : Mistral Voxtral TTS este providerul implicit — nicio cheie suplimentară necesară în afară de `MISTRAL_API_KEY`. ElevenLabs este un provider TTS alternativ configurabil în setări.

---

## Structura proiectului

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

## Referință API

### Config
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modifică config (modele, voci, provider TTS) |
| `GET` | `/api/config/status` | Starea API-urilor (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Resetează config la valorile implicite |
| `GET` | `/api/config/voices` | Listează vocile Mistral TTS (opțional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + implicit pe vârstă |

### Profiluri
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listează toate profilurile |
| `POST` | `/api/profiles` | Creează un profil |
| `PUT` | `/api/profiles/:id` | Modifică un profil (PIN necesar pentru < 15 ani) |
| `DELETE` | `/api/profiles/:id` | Șterge un profil + cascadă proiecte `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listează proiectele (`?profileId=` opțional) |
| `POST` | `/api/projects` | Creează un proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalii proiect |
| `PUT` | `/api/projects/:pid` | Redenumește `{name}` |
| `DELETE` | `/api/projects/:pid` | Șterge proiectul |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL sau căutare web `{query}` — returnează un array de surse |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Șterge o sursă |
| `POST` | `/api/projects/:pid/moderate` | Moderează `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectează instrucțiunile de revizuire | ### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de revizuire |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcard-uri |
| `POST` | `/api/projects/:pid/generate/quiz` | Chestionar QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații de completare |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revizuire adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată backend (rutare + 5 tipuri: rezumat, flashcard-uri, quiz, completare, podcast) |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` solicită în plus `{generationId, weakQuestions}`.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimite răspunsurile quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimite răspunsurile pentru textele cu spații de completare `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifică un răspuns oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Redare TTS cu voce tare (fișe/flashcard-uri) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumire `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Șterge generarea |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperează istoricul chatului |
| `POST` | `/api/projects/:pid/chat` | Trimite un mesaj `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Șterge istoricul chatului |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat de Vite. Perfect pentru un hackathon unde viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornești și e gata. |
| **Vite + Handlebars** | Ce e mai bun din ambele lumi: HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompts centralizate** | Toate prompt-urile IA în `prompts.ts` — ușor de iterat, testat și adaptat pe limbă/grupă de vârstă. |
| **Sistem multi-generații** | Fiecare generație este un obiect independent cu propriul ID — permite mai multe fișe, quiz-uri, etc. per curs. |
| **Prompts adaptate pe vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut învață diferit în funcție de cursant. |
| **Funcționalități bazate pe Agenți** | Generarea de imagini și căutarea web folosesc Agenți Mistral temporari — ciclu de viață curat cu curățare automată. |
| **Scraping inteligent de URL** | Un singur câmp acceptă URL-uri și cuvinte-cheie amestecate — URL-urile sunt extrase via Readability (pagini statice) cu fallback Lightpanda (pagini JS/SPA), cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS multi-provider** | Mistral Voxtral TTS implicit (fără cheie suplimentară), ElevenLabs ca alternativă — configurabil fără repornire. |

---

## Credite & mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Motor de sinteză vocală alternativ (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Unealtă de build pentru frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de icoane
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracție de conținut web (tehnologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultra-ușor pentru scraping-ul paginilor JS/SPA

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral de IA cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Drepturi de autor (C) 2026 Julien LS

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul gpt-5-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

