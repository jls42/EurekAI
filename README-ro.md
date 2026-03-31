<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transformă orice conținut într-o experiență de învățare interactivă — alimentată de <a href="https://mistral.ai">Mistral AI</a>.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Calitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Evaluare securitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Evaluare fiabilitate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Evaluare întreținere"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Acoperire"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Vulnerabilități"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Probleme de cod"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Linii de cod"></a>
</p>

---

## Povestea — De ce EurekAI ?

**EurekAI** a luat naștere în timpul [Hackathon-ului mondial Mistral AI](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (martie 2026). Aveam nevoie de un subiect — iar ideea a venit dintr-un lucru foarte concret: pregătesc periodic testele cu fiica mea și m-am gândit că ar trebui să fie posibil să facem asta mai distractiv și interactiv cu ajutorul IA.

Obiectivul: să preluăm **orice intrare** — o poză cu lecția, un text copiat-lipit, o înregistrare vocală, o căutare web — și să o transformăm în **fișe de revizie, flashcarduri, quiz-uri, podcasturi, texte cu spații de completat, ilustrații și altele**. Toate alimentate de modelele franceze Mistral AI, ceea ce face soluția natural adaptată elevilor francofoni.

[Prototipul inițial](https://github.com/jls42/worldwide-hackathon.mistral.ai) a fost conceput în 48h în timpul hackathon-ului ca proof of concept în jurul serviciilor Mistral — deja funcțional, dar limitat. De atunci, EurekAI a devenit un proiect real: texte cu spații de completat, navigare în exerciții, scraping web, moderare parentală configurabilă, revizuire de cod aprofundată și multe altele. Întreg codul este generat de IA — în principal [Claude Code](https://code.claude.com/), cu unele contribuții via [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Funcționalități

| | Funcționalitate | Descriere |
|---|---|---|
| 📷 | **Import de fișiere** | Importați lecțiile — poză, PDF (via Mistral OCR) sau fișier text (TXT, MD) |
| 📝 | **Introducere text** | Tastați sau lipiți orice text direct |
| 🎤 | **Intrare vocală** | Înregistrați-vă — Voxtral STT transcrie vocea |
| 🌐 | **Web / URL** | Lipiți o URL (scraping direct via Readability + Lightpanda) sau tastați o căutare (Agent Mistral web_search) |
| 📄 | **Fișe de revizie** | Note structurate cu puncte cheie, vocabular, citate, anecdotă |
| 🃏 | **Flashcards** | Carduri Q/R cu referințe la surse pentru memorare activă (număr configurabil) |
| ❓ | **Quiz QCM** | Întrebări cu alegere multiplă cu revizie adaptivă a erorilor (număr configurabil) |
| ✏️ | **Texte cu spații de completat** | Exerciții de completat cu indicii și validare tolerantă |
| 🎙️ | **Podcast** | Mini-podcast cu 2 voci în audio — voce Mistral implicită sau voci personalizate (părinți!) |
| 🖼️ | **Ilustrații** | Imagini educaționale generate de un Agent Mistral |
| 🗣️ | **Quiz vocal** | Întrebări citite cu voce tare (voce custom posibilă), răspuns oral, verificare IA |
| 💬 | **Tutor IA** | Chat contextual cu documentele dvs. de curs, cu apel la uneltele disponibile |
| 🧠 | **Router automat** | Un router bazat pe `mistral-small-latest` analizează conținutul și propune o combinație de generatoare dintre cele 7 tipuri disponibile |
| 🔒 | **Control parental** | Moderare configurabilă pe profil (categorii personalizabile), PIN parental, restricții chat |
| 🌍 | **Multilingv** | Interfață disponibilă în 9 limbi; generare IA controlabilă în 15 limbi via prompturi |
| 🔊 | **Lectură cu voce tare** | Ascultați fișele și flashcardurile via Mistral Voxtral TTS sau ElevenLabs |

---

## Vedere de ansamblu a arhitecturii

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Prezentare arhitectură" width="800" />
</p>

---

## Harta utilizării modelelor

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapare modele IA către sarcini" width="800" />
</p>

---

## Parcursul utilizatorului

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Parcursul de învățare al elevului" width="800" />
</p>

---

## Detaliu aprofundat — Funcționalități

### Intrare multi-modală

EurekAI acceptă 4 tipuri de surse, moderate în funcție de profil (activat implicit pentru copil și adolescent):

- **Import de fișiere** — Fișiere JPG, PNG sau PDF procesate de `mistral-ocr-latest` (text tipărit, tabele, scriere de mână), sau fișiere text (TXT, MD) importate direct.
- **Text liber** — Tastați sau lipiți orice conținut. Moderat înainte de stocare dacă moderarea este activată.
- **Intrare vocală** — Înregistrați audio în browser. Transcris de `voxtral-mini-latest`. Parametrul `language="fr"` optimizează recunoașterea.
- **Web / URL** — Lipiți una sau mai multe URL-uri pentru a face scraping direct al conținutului (Readability + Lightpanda pentru paginile JS), sau tastați cuvinte-cheie pentru o căutare web via Agent Mistral. Câmpul unic acceptă ambele — URL-urile și cuvintele-cheie sunt separate automat, fiecare rezultat creează o sursă independentă.

### Generare de conținut IA

Șapte tipuri de material de învățare generate:

| Generator | Model | Ieșire |
|---|---|---|
| **Fișă de revizie** | `mistral-large-latest` | Titlu, rezumat, puncte cheie, vocabular, citate, anecdotă |
| **Flashcards** | `mistral-large-latest` | Carduri Q/R cu referințe la surse (număr configurabil) |
| **Quiz QCM** | `mistral-large-latest` | Întrebări cu alegere multiplă, explicații, revizie adaptivă (număr configurabil) |
| **Texte cu spații de completat** | `mistral-large-latest` | Fraze de completat cu indicii, validare tolerantă (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script 2 voci → audio MP3 |
| **Ilustrație** | Agent `mistral-large-latest` | Imagine educațională via instrumentul `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Întrebări TTS → răspuns STT → verificare IA |

### Tutor IA prin chat

Un tutor conversațional cu acces complet la documentele de curs:

- Folosește `mistral-large-latest`
- **Apel la unelte**: poate genera fișe, flashcards, quiz-uri sau texte cu spații de completat în timpul conversației
- Istoric de 50 de mesaje pe curs
- Moderare a conținutului dacă este activată pentru profil

### Router automat

Router-ul folosește `mistral-small-latest` pentru a analiza conținutul surselor și a propune generatoarele cele mai relevante dintre cele 7 disponibile. Interfața afișează progresul în timp real: mai întâi o fază de analiză, apoi generările individuale cu posibilitate de anulare.

### Învățare adaptativă

- **Statistici ale quiz-urilor**: urmărire a tentativelor și a acurateței pe întrebare
- **Revizie quiz**: generează 5-10 întrebări noi țintind conceptele slabe
- **Detectare de instrucțiuni**: detectează indicațiile de revizie ("Știu lecția dacă știu...") și le prioritizează în generatoarele textuale compatibile (fișă, flashcards, quiz, texte cu spații de completat)

### Securitate & control parental

- **4 grupe de vârstă**: copil (≤10 ani), adolescent (11-15), student (16-25), adult (26+)
- **Moderare conținut**: `mistral-moderation-latest` cu 10 categorii disponibile, 5 blocate implicit pentru copil/adolescent (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorii personalizabile pe profil în setări.
- **PIN parental**: hash SHA-256, necesar pentru profilele sub 15 ani. Pentru un deployment în producție, folosiți un hash lent cu salt (Argon2id, bcrypt).
- **Restricții chat**: chat IA dezactivat implicit pentru cei sub 16 ani, activabil de către părinți

### Sistem multi-profil

- Profile multiple cu nume, vârstă, avatar, preferințe de limbă
- Proiecte legate de profile via `profileId`
- Ștergere în cascadă: ștergerea unui profil șterge toate proiectele sale

### TTS multi-provider & voci personalizate

- **Mistral Voxtral TTS** (implicit) : `voxtral-mini-tts-latest`, nu este necesară nicio cheie suplimentară
- **ElevenLabs** (alternativ) : `eleven_v3`, voci naturale, necesită `ELEVENLABS_API_KEY`
- Provider configurabil în setările aplicației
- **Voci personalizate**: părinții pot crea propriile voci prin API-ul Mistral Voices (pornind de la un eșantion audio) și le pot atribui rolurilor gazdă/invitat — podcasturile și quiz-urile vocale vor fi astfel citite cu vocea unui părinte, făcând experiența și mai imersivă pentru copil
- Două roluri vocale configurabile: **gazdă** (narator principal) și **invitat** (a doua voce a podcastului)
- Catalog complet al vocilor Mistral disponibil în setări, filtrabil după limbă

### Internaționalizare

- Interfață disponibilă în 9 limbi: fr, en, es, pt, it, nl, de, hi, ar
- Prompturile IA suportă 15 limbi (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Limba configurabilă pe profil

---

## Stack tehnic

| Nivel | Tehnologie | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Server și siguranța tipurilor |
| **Backend** | Express 5.x | API REST |
| **Server de dev** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfață reactivă, TypeScript compilat de Vite |
| **Templating** | vite-plugin-handlebars | Compoziție HTML prin partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderare |
| **TTS (implicit)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sinteză vocală integrată |
| **TTS (alternativ)** | ElevenLabs SDK 2.x | `eleven_v3`, voci naturale |
| **Iconițe** | Lucide 1.x | Bibliotecă de iconițe SVG |
| **Scraping web** | Readability + linkedom | Extracție a conținutului principal al paginilor web (tehnologie Firefox Reader View) |
| **Browser headless** | Lightpanda | Browser headless ultra-ușor (Zig + V8) pentru pagini JS/SPA — fallback scraping |
| **Markdown** | Marked | Randare markdown în chat |
| **Upload fișiere** | Multer 2.x | Gestionare formulare multipart |
| **Audio** | ffmpeg-static | Concatenerare segmente audio |
| **Teste** | Vitest | Teste unitare — acoperire măsurată de SonarCloud |
| **Persistență** | Fișiere JSON | Stocare fără dependență |

---

## Referință modele

| Model | Utilizare | De ce |
|---|---|---|
| `mistral-large-latest` | Fișă, Flashcards, Podcast, Quiz, Texte cu spații de completat, Chat, Verificare quiz vocal, Agent Imagine, Agent Web Search, Detectare instrucțiuni | Cel mai bun multilingv + urmărire instrucțiuni |
| `mistral-ocr-latest` | OCR documente | Text tipărit, tabele, scriere de mână |
| `voxtral-mini-latest` | Recunoaștere vocală (STT) | STT multilingv, optimizat cu `language="fr"` |
| `voxtral-mini-tts-latest` | Sinteză vocală (TTS) | Podcasturi, quiz vocal, citire cu voce tare |
| `mistral-moderation-latest` | Moderare conținut | 5 categorii blocate pentru copil/adolescent (+ jailbreaking) |
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

> **Notă** : Mistral Voxtral TTS este providerul implicit — nu este necesară nicio cheie suplimentară dincolo de `MISTRAL_API_KEY`. ElevenLabs este un provider TTS alternativ configurabil în setări.

---

## Implementare cu container

Imaginea este publicată pe **GitHub Container Registry** :

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

> **`:U`** este un flag Podman rootless care ajustează automat permisiunile volumului.
> **`ELEVENLABS_API_KEY`** este opțional (TTS alternativ).

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

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
| `GET` | `/api/config` | Configurație curentă |
| `PUT` | `/api/config` | Modificare config (modele, voci, provider TTS) |
| `GET` | `/api/config/status` | Stare API-uri (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Reseta config la valorile implicite |
| `GET` | `/api/config/voices` | Listare voci Mistral TTS (opțional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorii de moderare disponibile + implicit pe vârstă |

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
| `PUT` | `/api/projects/:pid` | Redenumește `{name}` |
| `DELETE` | `/api/projects/:pid` | Șterge proiectul | ### Surse
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Import fișiere multipart (OCR pentru JPG/PNG/PDF, citire directă pentru TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Text liber `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL sau căutare web `{query}` — returnează un tabel de surse |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Șterge o sursă |
| `POST` | `/api/projects/:pid/moderate` | Modera `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectează instrucțiunile de revizuire |

### Generare
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fișă de revizuire |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Texte cu spații libere |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustrație |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revizuire adaptivă `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analiză de rutare (planul generatoarelor de lansat) |
| `POST` | `/api/projects/:pid/generate/auto` | Generare automată backend (rutare + 5 tipuri: summary, flashcards, quiz, fill-blank, podcast) |

Toate rutele de generare acceptă `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` necesită în plus `{generationId, weakQuestions}`.

### CRUD Generări
| Metodă | Endpoint | Descriere |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Trimite răspunsurile la quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Trimite răspunsurile pentru textele cu spații libere `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verifică un răspuns oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Redare TTS cu voce tare (fișe/flashcards) |
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
| **Persistență în fișiere JSON** | Zero dependențe, pornire instantanee. Nicio bază de date de configurat — pornim și gata. |
| **Vite + Handlebars** | Cele mai bune din ambele lumi: HMR rapid pentru dezvoltare, partials HTML pentru organizarea codului, Tailwind JIT. |
| **Prompts centralizate** | Toate prompturile IA în `prompts.ts` — ușor de iterat, testat și adaptat pe limbă/grupă de vârstă. |
| **Sistem multi-generări** | Fiecare generare este un obiect independent cu propriul ID — permite mai multe fișe, quizuri etc. pe curs. |
| **Prompts adaptate pe vârstă** | 4 grupe de vârstă cu vocabular, complexitate și ton diferite — același conținut învață diferit în funcție de cursant. |
| **Funcționalități bazate pe Agenți** | Generarea de imagini și căutarea web folosesc Agenți Mistral temporari — ciclu de viață curat cu curățare automată. |
| **Scraping inteligent de URL** | Un câmp unic acceptă URL-uri și cuvinte-cheie combinate — URL-urile sunt scrapate via Readability (pagini statice) cu fallback Lightpanda (pagini JS/SPA), cuvintele-cheie declanșează un Agent Mistral web_search. Fiecare rezultat creează o sursă independentă. |
| **TTS multi-provider** | Mistral Voxtral TTS implicit (fără cheie suplimentară), ElevenLabs ca alternativă — configurabil fără repornire. |

---

## Credite & mulțumiri

- **[Mistral AI](https://mistral.ai)** — Modele IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Motor alternativ de sinteză vocală (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reactiv ușor
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitar
- **[Vite](https://vitejs.dev)** — Unealtă de build pentru frontend
- **[Lucide](https://lucide.dev)** — Bibliotecă de icoane
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracție de conținut web (tehnologie Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Browser headless ultra-ușor pentru scrapingul paginilor JS/SPA

Inițiat în timpul Mistral AI Worldwide Hackathon (martie 2026), dezvoltat integral de IA cu [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) și [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licență

[AGPL-3.0](LICENSE) — Drepturi de autor (C) 2026 Julien LS

**Acest document a fost tradus din versiunea fr în limba ro folosind modelul gpt-5-mini. Pentru mai multe informații despre procesul de traducere, consultați https://gitlab.com/jls42/ai-powered-markdown-translator**

