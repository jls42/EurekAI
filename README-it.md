<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Trasforma qualsiasi contenuto in un'esperienza di apprendimento interattiva — alimentato da <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Qualità del codice</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Esito qualità"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Valutazione sicurezza"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Valutazione affidabilità"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Valutazione manutenibilità"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Copertura"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Vulnerabilità"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Linee di codice"></a>
</p>

---

## La storia — Perché EurekAI ?

**EurekAI** è nato durante l'[hackathon mondiale Mistral AI](https://luma.com/mistralhack-online) ([sito ufficiale](https://worldwide-hackathon.mistral.ai/)) (marzo 2026). Avevo bisogno di un soggetto — e l'idea è nata da qualcosa di molto concreto: preparo regolarmente i controlli con mia figlia, e mi sono detto che doveva essere possibile rendere questo processo più ludico e interattivo grazie all'IA.

L'obiettivo: prendere **qualunque input** — una foto del manuale, un testo copiato-incollato, una registrazione vocale, una ricerca web — e trasformarlo in **schede di ripasso, flashcards, quiz, podcast, testi a completamento, illustrazioni e molto altro**. Il tutto alimentato dai modelli francesi di Mistral AI, rendendolo così una soluzione naturalmente adatta agli studenti francofoni.

Il progetto è stato avviato durante l'hackathon, poi ripreso e arricchito successivamente. L'intero codice è generato dall'IA — principalmente [Claude Code](https://docs.anthropic.com/en/docs/claude-code), con alcuni contributi tramite [Codex](https://openai.com/index/introducing-codex/).

---

## Funzionalità

| | Funzionalità | Descrizione |
|---|---|---|
| 📷 | **Caricamento OCR** | Fotografa il tuo manuale o i tuoi appunti — Mistral OCR ne estrae il contenuto |
| 📝 | **Inserimento testo** | Digita o incolla qualsiasi testo direttamente |
| 🎤 | **Inserimento vocale** | Registrati — Voxtral STT trascrive la tua voce |
| 🌐 | **Ricerca web** | Fai una domanda — un Agente Mistral cerca le risposte sul web |
| 📄 | **Schede di revisione** | Appunti strutturati con punti chiave, vocabolario, citazioni, aneddoti |
| 🃏 | **Flashcards** | 5-50 carte Q/A con riferimenti alle fonti per la memorizzazione attiva |
| ❓ | **Quiz a scelta multipla (QCM)** | 5-50 domande a scelta multipla con revisione adattativa degli errori |
| ✏️ | **Testi a completamento** | Esercizi da completare con indizi e validazione tollerante |
| 🎙️ | **Podcast** | Mini-podcast a 2 voci convertito in audio tramite Mistral Voxtral TTS |
| 🖼️ | **Illustrazioni** | Immagini didattiche generate da un Agente Mistral |
| 🗣️ | **Quiz vocale** | Domande lette ad alta voce, risposta orale, l'IA verifica la risposta |
| 💬 | **Tutor IA** | Chat contestuale con i tuoi documenti di corso, con chiamata agli strumenti |
| 🧠 | **Router automatico** | Un router basato su `mistral-small-latest` analizza il contenuto e propone una combinazione di generatori tra i 7 tipi disponibili |
| 🔒 | **Controllo genitori** | Moderazione per età, PIN genitoriale, restrizioni della chat |
| 🌍 | **Multilingue** | Interfaccia disponibile in 9 lingue; generazione IA controllabile in 15 lingue tramite i prompt |
| 🔊 | **Lettura a voce alta** | Ascolta le schede e le flashcards tramite Mistral Voxtral TTS o ElevenLabs |

---

## Panoramica dell'architettura

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

## Mappa d'uso dei modelli

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

## Percorso utente

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

## Approfondimento — Funzionalità

### Ingresso multimodale

EurekAI accetta 4 tipi di sorgenti, moderate in base al profilo (attivato di default per bambino e adolescente):

- **Caricamento OCR** — File JPG, PNG o PDF elaborati da `mistral-ocr-latest`. Gestisce testo stampato, tabelle e scrittura a mano.
- **Testo libero** — Digita o incolla qualsiasi contenuto. Moderato prima della memorizzazione se la moderazione è attiva.
- **Inserimento vocale** — Registra audio nel browser. Trascritto da `voxtral-mini-latest`. Il parametro `language="fr"` ottimizza il riconoscimento.
- **Ricerca web** — Inserisci una query. Un Agente Mistral temporaneo con lo strumento `web_search` recupera e riassume i risultati.

### Generazione di contenuti IA

Sette tipi di materiale didattico generato:

| Generatore | Modello | Output |
|---|---|---|
| **Scheda di revisione** | `mistral-large-latest` | Titolo, riassunto, 10-25 punti chiave, vocabolario, citazioni, aneddoto |
| **Flashcards** | `mistral-large-latest` | 5-50 carte Q/A con riferimenti alle fonti per la memorizzazione attiva |
| **Quiz a scelta multipla (QCM)** | `mistral-large-latest` | 5-50 domande, 4 opzioni ciascuna, spiegazioni, revisione adattativa |
| **Testi a completamento** | `mistral-large-latest` | Frasi da completare con indizi, validazione tollerante (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script a 2 voci → audio MP3 |
| **Illustrazione** | Agente `mistral-large-latest` | Immagine didattica tramite lo strumento `image_generation` |
| **Quiz vocale** | `mistral-large-latest` + Voxtral TTS + STT | Domande TTS → risposta STT → verifica IA |

### Tutor IA via chat

Un tutor conversazionale con accesso completo ai documenti di corso:

- Utilizza `mistral-large-latest`
- **Chiamata di strumenti**: può generare schede, flashcards, quiz o testi a completamento durante la conversazione
- Cronologia di 50 messaggi per corso
- Moderazione dei contenuti se attivata per il profilo

### Router automatico

Il router utilizza `mistral-small-latest` per analizzare il contenuto delle sorgenti e proporre i generatori più pertinenti tra i 7 disponibili. L'interfaccia mostra il progresso in tempo reale: prima una fase di analisi, poi le generazioni individuali con possibilità di annullamento.

### Apprendimento adattivo

- **Statistiche del quiz**: monitoraggio dei tentativi e della precisione per domanda
- **Revisione del quiz**: genera 5-10 nuove domande mirate ai concetti deboli
- **Rilevamento delle istruzioni**: rileva le istruzioni di revisione ("So la mia lezione se so...") e le dà priorità nei generatori testuali compatibili (scheda, flashcards, quiz, testi a completamento)

### Sicurezza e controllo parentale

- **4 gruppi di età**: bambino (≤10 anni), adolescente (11-15), studente (16-25), adulto (26+)
- **Moderazione dei contenuti**: `mistral-moderation-latest` con 5 categorie bloccate per bambino/adolescente (sexual, hate, violence, selfharm, jailbreaking), nessuna restrizione per studente/adulto
- **PIN genitoriale**: hash SHA-256, richiesto per i profili con meno di 15 anni. Per un deployment in produzione, prevedere un hash lento con salt (Argon2id, bcrypt).
- **Restrizioni della chat**: chat IA disabilitata di default per i minori di 16 anni, attivabile dai genitori

### Sistema multi-profili

- Profili multipli con nome, età, avatar, preferenze di lingua
- Progetti collegati ai profili tramite `profileId`
- Cancellazione a cascata: eliminare un profilo rimuove tutti i suoi progetti

### TTS multi-fornitore

- **Mistral Voxtral TTS** (predefinito): `voxtral-mini-tts-latest`, nessuna chiave aggiuntiva necessaria
- **ElevenLabs** (alternativo): `eleven_v3`, voci naturali, richiede `ELEVENLABS_API_KEY`
- Fornitore configurabile nelle impostazioni dell'app

### Internazionalizzazione

- Interfaccia disponibile in 9 lingue: fr, en, es, pt, it, nl, de, hi, ar
- I prompt IA supportano 15 lingue (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Lingua configurabile per profilo

---

## Stack tecnico

| Livello | Tecnologia | Ruolo |
|---|---|---|
| **Runtime** | Node.js + TypeScript 5.x | Server e sicurezza dei tipi |
| **Backend** | Express 4.x | API REST |
| **Server di dev** | Vite 7.x + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfaccia reattiva, TypeScript compilato da Vite |
| **Templating** | vite-plugin-handlebars | Composizione HTML tramite partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderazione |
| **TTS (predefinito)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, sintesi vocale integrata |
| **TTS (alternativo)** | ElevenLabs SDK 2.x | `eleven_v3`, voci naturali |
| **Icone** | Lucide | Libreria di icone SVG |
| **Markdown** | Marked | Rendering markdown nella chat |
| **Upload file** | Multer 1.4 LTS | Gestione form multipart |
| **Audio** | ffmpeg-static | Concatenazione di segmenti audio |
| **Test** | Vitest | Test unitari — copertura misurata da SonarCloud |
| **Persistenza** | File JSON | Storage senza dipendenze |

---

## Riferimento dei modelli

| Modello | Utilizzo | Perché |
|---|---|---|
| `mistral-large-latest` | Scheda, Flashcards, Podcast, Quiz, Testi a completamento, Chat, Verifica quiz vocale, Agente Immagine, Agente Ricerca Web, Rilevamento istruzioni | Migliore multilingua + follow delle istruzioni |
| `mistral-ocr-latest` | OCR di documenti | Testo stampato, tabelle, scrittura a mano |
| `voxtral-mini-latest` | Riconoscimento vocale (STT) | STT multilingue, ottimizzato con `language="fr"` |
| `voxtral-mini-tts-latest` | Sintesi vocale (TTS) | Podcast, quiz vocale, lettura a voce alta |
| `mistral-moderation-latest` | Moderazione dei contenuti | 5 categorie bloccate per bambino/adolescente (+ jailbreaking) |
| `mistral-small-latest` | Router automatico | Analisi rapida del contenuto per decisioni di routing |
| `eleven_v3` (ElevenLabs) | Sintesi vocale (TTS alternativo) | Voci naturali, alternativa configurabile |

---

## Avvio rapido

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

> **Nota** : Mistral Voxtral TTS è il provider predefinito — nessuna chiave aggiuntiva necessaria oltre a `MISTRAL_API_KEY`. ElevenLabs è un provider TTS alternativo configurabile nelle impostazioni.

---

## Struttura del progetto

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

## Riferimento API

### Config
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/config` | Configurazione corrente |
| `PUT` | `/api/config` | Modificare la config (modelli, voci, provider TTS) |
| `GET` | `/api/config/status` | Stato delle API (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Ripristinare la config predefinita |
| `GET` | `/api/config/voices` | Elencare le voci Mistral TTS (opzionale `?lang=fr`) |

### Profili
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/profiles` | Elencare tutti i profili |
| `POST` | `/api/profiles` | Creare un profilo |
| `PUT` | `/api/profiles/:id` | Modificare un profilo (PIN richiesto per < 15 anni) |
| `DELETE` | `/api/profiles/:id` | Eliminare un profilo + cancellazione a cascata progetti `{pin?}` → `{ok, deletedProjects}` |

### Progetti
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/projects` | Elencare i progetti (`?profileId=` opzionale) |
| `POST` | `/api/projects` | Creare un progetto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Dettagli del progetto |
| `PUT` | `/api/projects/:pid` | Rinomina `{name}` |
| `DELETE` | `/api/projects/:pid` | Eliminare il progetto |

### Sorgenti
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Upload OCR (file multipart) |
| `POST` | `/api/projects/:pid/sources/text` | Testo libero `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voce STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Ricerca web `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminare una sorgente |
| `POST` | `/api/projects/:pid/moderate` | Moderare `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Rilevare `POST` |
| `POST` | `/api/projects/:pid/detect-consigne` | Rilevare le istruzioni di revisione |

### Generazione
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Scheda di revisione |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz a scelta multipla |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Testi a completamento |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Illustrazione |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocale |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revisione adattativa `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Analisi di routing (piano dei generatori da lanciare) |
| `POST` | `/api/projects/:pid/generate/auto` | Generazione auto backend (routing + 5 tipi: summary, flashcards, quiz, fill-blank, podcast) |

Tutte le rotte di generazione accettano `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` richiede inoltre `{generationId, weakQuestions}`.

### CRUD Generazioni
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Inviare le risposte del quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Inviare le risposte dei testi a completamento `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificare una risposta orale (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Riproduzione TTS a voce alta (schede/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Rinomina `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Eliminare la generazione |

### Chat
| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperare la cronologia della chat |
| `POST` | `/api/projects/:pid/chat` | Inviare un messaggio `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Cancellare la cronologia della chat |

---

## Decisioni architetturali

| Decisione | Giustificazione |
|---|---|
| **Alpine.js invece di React/Vue** | Impronta minima, reattività leggera con TypeScript compilato da Vite. Perfetto per un hackathon dove la velocità conta. |
| **Persistenza in file JSON** | Zero dipendenze, avvio istantaneo. Nessun database da configurare — si avvia e si parte. |
| **Vite + Handlebars** | Il meglio dei due mondi: HMR veloce per lo sviluppo, partials HTML per l'organizzazione del codice, Tailwind JIT. |
| **Prompt centralizzati** | Tutti i prompt IA in `prompts.ts` — facile da iterare, testare e adattare per lingua/fascia d'età. |
| **Sistema multi-generazioni** | Ogni generazione è un oggetto indipendente con il proprio ID — permette più schede, quiz, ecc. per corso. |
| **Prompt adattati per fascia d'età** | 4 gruppi d'età con vocabolario, complessità e tono diversi — lo stesso contenuto insegna in modo differente a seconda dell'apprendente. |
| **Funzionalità basate sugli Agenti** | La generazione di immagini e la ricerca web utilizzano Agenti Mistral temporanei — ciclo di vita dedicato con pulizia automatica. |
| **TTS multi-provider** | Mistral Voxtral TTS di default (nessuna chiave aggiuntiva), ElevenLabs come alternativa — configurabile senza riavvio. |

---

## Crediti e ringraziamenti

- **[Mistral AI](https://mistral.ai)** — Modelli IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Motore di sintesi vocale alternativo (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reattivo leggero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utility
- **[Vite](https://vitejs.dev)** — Strumento di build frontend
- **[Lucide](https://lucide.dev)** — Libreria di icone
- **[Marked](https://marked.js.org)** — Parser Markdown

Iniziato durante il Mistral AI Worldwide Hackathon (marzo 2026), sviluppato interamente dall'IA con Claude Code e Codex.

---

## Autore

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licenza

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Questo documento è stato tradotto dalla versione fr alla lingua it utilizzando il modello gpt-5-mini. Per ulteriori informazioni sul processo di traduzione, consultare https://gitlab.com/jls42/ai-powered-markdown-translator**

