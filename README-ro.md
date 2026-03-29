<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformați orice conținut într-o experiență de învățare interactivă — propulsată de <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Engleză</a> · <a href="README-es.md">🇪🇸 Spaniolă</a> · <a href="README-pt.md">🇧🇷 Portugheză</a> · <a href="README-de.md">🇩🇪 Germană</a> · <a href="README-it.md">🇮🇹 Italiană</a> · <a href="README-nl.md">🇳🇱 Olandeză</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Poloneză</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Suedeză</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstrație YouTube"></a>
</p>

<h4 align="center">📊 Calitatea codului</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Stare calitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Clasament securitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Clasament fiabilitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Clasament mentenabilitate"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Acoperire"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Vulnerabilități"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Probleme de cod"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Linii de cod"></a>
</p>

---

## Povestea — De ce EurekAI?

**EurekAI** a luat naștere în timpul [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de un subiect — iar ideea a venit din ceva foarte concret: pregătesc frecvent testele cu fiica mea și mi-am spus că ar trebui să fie posibil să facem asta mai distractiv și interactiv cu ajutorul IA.

Obiectivul: să preia **orice intrare** — o fotografie a manualului, un text copiat-lipit, o înregistrare vocală, o căutare web — și să o transforme în **fișe de recapitulare, flashcard-uri, chestionare, podcasturi, texte cu spații de completat, ilustrații și multe altele**. Totul propulsat de modelele franceze Mistral AI, ceea ce face soluția în mod natural adaptată pentru elevii francofoni.

Proiectul a fost inițiat în timpul hackathon-ului, apoi reluat și îmbogățit ulterior. Întregul cod este generat de IA — în principal cu [Claude Code](https://docs.anthropic.com/en/docs/claude-code), cu câteva contribuții via [Codex](https://openai.com/index/introducing-codex/).

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Încărcare OCR** | Faceți o poză manualului sau notițelor — Mistral OCR extrage conținutul |
| 📝 | **Introducere text** | Tastați sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT transcrie vocea |
| 🌐 | **Căutare web** | Puneți o întrebare — un Agent Mistral caută răspunsuri pe web |
| 📄 | **Fișe de studiu** | Note structurate cu puncte cheie, vocabular, citate, anecdote |
| 🃏 | **Flashcard-uri** | 5-50 de carduri Q/R cu referințe la surse pentru memorare activă |
| ❓ | **Chestionar QCM** | 5-50 de întrebări cu alegere multiplă cu revizuire adaptativă a greșelilor |
| ✏️ | **Texte cu spații de completat** | Exerciții de completat cu indicii și validare tolerantă |
| 🎙️ | **Podcast** | Mini-podcast 2 voci convertit în audio via Mistral Voxtral TTS |
| 🖼️ | **Ilustrații** | Imagini educaționale generate de un Agent Mistral |
| 🗣️ | **Chestionar vocal** | Întrebări citite cu voce tare, răspuns oral, IA verifică răspunsul |
| 💬 | **Tutor IA** | Chat contextual cu documentele dvs. de curs, cu apel la unelte |
| 🧠 | **Routare automată** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 7 tipuri disponibile |
| 🔒 | **Control parental** | Moderare pe vârstă, PIN parental, restricții pentru chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generarea IA controlabilă în 15 limbi prin prompturi |
| 🔊 | **Citire cu voce tare** | Ascultați fișele și flashcard-urile via Mistral Voxtral TTS sau ElevenLabs |

---

## Privire de ansamblu asupra arhitecturii

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

## Harta utilizării modelelor

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

## Fluxul utilizatorului

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

## Explorare detaliată — Funcționalități

### Intrare multimodală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (activat implicit pentru copil și adolescent):

- **Încărcare OCR** — Fișiere JPG, PNG sau PDF procesate de `mistral-ocr-latest`. Gestionează textul tipărit, tabelele și scrisul de mână.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activă.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Setarea `language="fr"` optimizează recunoașterea.
- **Căutare web** — Introduceți o interogare. Un Agent Mistral temporar cu instrumentul `web_search` recuperează și rezumă rezultatele.

### Generare de conținut IA

Șapte tipuri de materiale de învățare generate:

| Generator | Model | Ieșire |
|---|---|---|
| **Fișă de studiu** | `mistral-large-latest` | Titlu, rezumat, 10-25 de puncte cheie, vocabular, citate, anecdotă |
| **Flashcard-uri** | `mistral-large-latest` | 5-50 carduri Q/R cu referințe la surse pentru memorare activă |
| **Chestionar QCM** | `mistral-large-latest` | 5-50 de întrebări, 4 opțiuni fiecare, explicații, revizuire adaptativă |
| **Texte cu spații de completat** | `mistral-large-latest` | Propoziții de completat cu indicii, validare tolerantă (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educațională via instrumentul `image_generation` |
| **Chestionar vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Utilizează `mistral-large-latest`
- **Apel de unelte**: poate genera fișe, flashcard-uri, chestionare sau texte cu spații de completat în timpul conversației
- Istoric de 50 de mesaje per curs
- Moderare a conținutului dacă este activată pentru profil

### Routare automată

Router-ul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune generatoarele cele mai potrivite dintre cele 7 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale cu posibilitate de anulare.

### Învățare adaptivă

- **Statistici de chestionar**: urmărirea tentativelor și a acurateței pe întrebare
- **Revizuire de chestionar**: generează 5-10 întrebări noi țintind conceptele slabe
- **Detectare de instrucțiuni**: detectează instrucțiunile de revizuire ("Știu lecția dacă știu...") și le prioritizează în generatoarele textuale compatibile (fișă, flashcard-uri, chestionar, texte cu spații)

### Securitate și control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderare de conținut**: `mistral-moderation-latest` cu 5 categorii blocate pentru copil/adolescent (sexual, ură, violență, auto-vătămare, eludare de restricții), nicio restricție pentru student/adult
- **PIN parental**: hash SHA-256, necesar pentru profilele cu vârstă < 15 ani. Pentru un deployment în producție, folosiți un hash lent cu salt (Argon2id, bcrypt).
- **Restricții ale chatului**: chat IA dezactivat implicit pentru cei sub 16 ani, activabil de către părinți

### Sistem multi-profil

- Profile multiple cu nume, vârstă, avatar, preferințe de limbă
- Proiecte legate de profile via `profileId`
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele asociate

### TTS multi-furnizor

- **Mistral Voxtral TTS** (implicit): `voxtral-mini-tts-latest`, fără cheie suplimentară necesară
- **ElevenLabs** (alternativ): `eleven_v3`, voci naturale, necesită `ELEVENLABS_API_KEY`
- Furnizor configurabil în setările aplicației

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturi IA suportă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limba configurabilă per profil

---

## Stack tehnic

| Strat | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 5.x | Server și siguranța tipurilor |
| **Backend** | Express 4.x | API REST |
| **Server de dev** | Vite 7.x + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agenți, Moderare |
| **TTS (implicit)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **TTS (alternativ)** | ElevenLabs SDK 2.x | `eleven_v3`, voci naturale |
| **Iconițe** | Lucide | Bibliotecă de iconițe SVG |
| **Markdown** | Marked | Randare markdown în chat |
| **Încărcare fișiere** | Multer 1.4 LTS | Gestionare formulare multipart |
| **Audio** | ffmpeg-static | Concatenerare segmente audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependențe |

---

## Referință modele

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcard-uri, Podcast, Chestionar, Texte cu spații, Chat, Verificare chestionar vocal, Agent Imagine, Agent Căutare Web, Detectare instrucțiuni | Cel mai bun multilingv + urmărire a instrucțiunilor |
| `mistral-ocr-latest` | OCR documente | Text tipărit, tabele, scris de mână |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, chestionar vocal, citire cu voce tare |
| `mistral-moderation-latest` | Moderare de conținut | 5 categorii blocate pentru copil/adolescent (+ eludare de restricții) |
| `mistral-small-latest` | Router automat | Analiză rapidă a conținutului pentru decizii de rutare |
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

> **Notă** : Mistral Voxtral TTS este furnizorul implicit — nicio cheie suplimentară necesară în afară de `MISTRAL_API_KEY`. ElevenLabs este un furnizor TTS alternativ configurabil în setări.

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

## Referință API

### Config
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/config` | Configurația curentă |
| `PUT` | `/api/config` | Modificare config (modele, voci, furnizor TTS) |
| `GET` | `/api/config/status` | Starea API-urilor (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Resetare config la valorile implicite |
| `GET` | `/api/config/voices` | Listare voci Mistral TTS (opțional `?lang=fr`) |

### Profile
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/profiles` | Listează toate profilele |
| `POST` | `/api/profiles` | Creează un profil |
| `PUT` | `/api/profiles/:id` | Modifică un profil (PIN necesar pentru < 15 ani) |
| `DELETE` | `/api/profiles/:id` | Șterge un profil + cascade proiecte `{pin?}` → `{ok, deletedProjects}` |

### Proiecte
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects` | Listează proiectele (`?profileId=` opțional) |
| `POST` | `/api/projects` | Creează un proiect `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalii proiect |
| `PUT` | `/api/projects/:pid` | Redenumire `{name}` |
| `DELETE` | `/api/projects/:pid` | Ștergere proiect |

### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Încărcare OCR (fișiere multipart) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Căutare web `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Șterge o sursă |
| `POST` | `/api/projects/:pid/moderate` | Moderează `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectează `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectează instrucțiunile de revizuire |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de studiu |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcard-uri |
| `POST` | `/api/projects/:pid/generate/quiz` | Chestionar QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații de completat |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Chestionar vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revizuire adaptativă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată backend (rutare + 5 tipuri : summary, flashcards, quiz, fill-blank, podcast) |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` cere în plus `{generationId, weakQuestions}`.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimitere răspunsuri chestionar `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimitere răspunsuri texte cu spații `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificare răspuns oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Redare TTS cu voce tare (fișe/flashcard-uri) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Redenumire `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Ștergere generare |

### Chat
| Metodă | Endpoint | Descriere |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperare istoric chat |
| `POST` | `/api/projects/:pid/chat` | Trimitere mesaj `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Ștergere istoric chat |

---

## Decizii arhitecturale

| Decizie | Justificare |
|---|---|
| **Alpine.js în loc de React/Vue** | Amprentă minimă, reactivitate ușoară cu TypeScript compilat de Vite. Perfect pentru un hackathon unde viteza contează. |
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornești și e gata. |
| **Vite + Handlebars** | Ce e mai bun din ambele lumi: HMR rapid pentru dezvoltare, partiale HTML pentru organizarea codului, Tailwind JIT. |
| **Prompturi centralizate** | Toate prompturile IA în `prompts.ts` — ușor de iterat, testat și adaptat pe limbă/grupă de vârstă. |
| **Sistem multi-generații** | Fiecare generație este un obiect independent cu propriul său ID — permite mai multe fișe, quizuri etc. pe curs. |
| **Prompturi adaptate pe vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut predă diferit în funcție de cursant. |
| **Funcționalități bazate pe Agenți** | Generarea imaginilor și căutarea web folosesc agenți Mistral temporari — ciclu de viață izolat cu curățare automată. |
| **TTS multi-furnizor** | Mistral Voxtral TTS implicit (fără cheie suplimentară), ElevenLabs ca alternativă — configurabil fără repornire. |

---

## Credite & mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Motor alternativ de sinteză vocală (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Instrument de build pentru frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de icoane
- **[Marked](https://marked.js.org)** — Parser Markdown

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat în întregime de IA cu Claude Code și Codex.

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Drepturi de autor (C) 2026 Julien LS

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul gpt-5-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

