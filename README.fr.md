<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforme n'importe quel contenu en expérience d'apprentissage interactive — propulsé par l'IA.</strong>
</p>

<p align="center">
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-Worldwide%20Hackathon-FF7000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" alt="Mistral AI Hackathon"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-5%20Modèles-FF7000?style=for-the-badge" alt="Mistral AI"></a>
  <a href="https://elevenlabs.io"><img src="https://img.shields.io/badge/ElevenLabs-TTS-000000?style=for-the-badge" alt="ElevenLabs"></a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI">▶️ Voir la démo sur YouTube</a> · <a href="README.md">🇬🇧 Read in English</a>
</p>

---

## L'histoire — Pourquoi EurekAI ?

**EurekAI** est né pendant le [Mistral AI Worldwide Hackathon](https://worldwidehackathon.mistral.ai/) (mars 2026). Il me fallait un sujet — et l'idée est venue de quelque chose de très concret : je prépare régulièrement les contrôles avec ma fille, et je me suis dit qu'il devait être possible de rendre ça plus ludique et interactif grâce à l'IA.

L'objectif : prendre **n'importe quelle entrée** — une photo du manuel, un texte copié-collé, un enregistrement vocal, une recherche web — et la transformer en **fiches de révision, flashcards, quiz, podcasts, illustrations, et plus encore**. Le tout propulsé par les modèles français de Mistral AI, ce qui en fait une solution naturellement adaptée aux élèves francophones.

Chaque ligne de code a été écrite pendant le hackathon. Toutes les APIs et bibliothèques open-source sont utilisées conformément aux règles du hackathon.

---

## Fonctionnalités

| | Fonctionnalité | Description |
|---|---|---|
| 📷 | **Upload OCR** | Prenez en photo votre manuel ou vos notes — Mistral OCR en extrait le contenu |
| 📝 | **Saisie texte** | Tapez ou collez n'importe quel texte directement |
| 🎤 | **Entrée vocale** | Enregistrez-vous — Voxtral STT transcrit votre voix |
| 🌐 | **Recherche web** | Posez une question — un Agent Mistral cherche les réponses sur le web |
| 📄 | **Fiches de révision** | Notes structurées avec points clés, vocabulaire, citations, anecdotes |
| 🃏 | **Flashcards** | 5 cartes Q/R avec références aux sources pour la mémorisation active |
| ❓ | **Quiz QCM** | 10-20 questions à choix multiples avec révision adaptative des erreurs |
| 🎙️ | **Podcast** | Mini-podcast 2 voix (Alex & Zoé) converti en audio via ElevenLabs |
| 🖼️ | **Illustrations** | Images éducatives générées par un Agent Mistral |
| 🗣️ | **Quiz vocal** | Questions lues à haute voix, réponse orale, l'IA vérifie la réponse |
| 💬 | **Tuteur IA** | Chat contextuel avec vos documents de cours, avec appel d'outils |
| 🧠 | **Routeur intelligent** | L'IA analyse votre contenu et recommande les meilleurs générateurs |
| 🔒 | **Contrôle parental** | Modération par âge, PIN parental, restrictions du chat |
| 🌍 | **Multilingue** | Interface et contenu IA complets en français et anglais |
| 🔊 | **Lecture à voix haute** | Écoutez les fiches et flashcards lues à voix haute via ElevenLabs TTS |

---

## Vue d'ensemble de l'architecture

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Upload OCR<br/><i>mistral-ocr-latest</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Recherche web<br/><i>Agent Mistral</i>"]
    end

    subgraph "🛡️ Sécurité (async à l'ajout de source)"
        MOD["Modération<br/><i>mistral-moderation-latest</i>"]
        CON["Détection de consigne<br/><i>mistral-large-latest</i>"]
    end

    subgraph "🧠 Générateurs IA"
        SUM["📄 Fiche"]
        FC["🃏 Flashcards"]
        QZ["❓ Quiz QCM"]
        POD["🎙️ Podcast"]
        IMG["🖼️ Image"]
        QV["🗣️ Quiz vocal"]
        CHAT["💬 Tuteur IA"]
    end

    subgraph "📤 Sortie"
        TTS["🔊 ElevenLabs TTS"]
        JSON["📦 Persistance JSON"]
        UI["🖥️ Interface interactive"]
    end

    OCR & TXT & MIC & WEB --> MOD & CON
    MOD & CON -.->|gardes| SUM & FC & QZ & POD & IMG & QV & CHAT
    POD --> TTS
    QV --> TTS
    SUM & FC -->|lecture à voix haute| TTS
    SUM & FC & QZ & POD & IMG & QV & CHAT --> JSON
    JSON --> UI
    TTS --> UI
```

---

## Carte d'utilisation des modèles

```mermaid
flowchart LR
    subgraph "Modèles Mistral"
        ML["mistral-large-latest"]
        MO["mistral-ocr-latest"]
        MV["voxtral-mini-latest"]
        MMod["mistral-moderation-latest"]
        MS["mistral-small-latest"]
    end

    subgraph "Tâches"
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Vérification quiz / Consigne"]
        T2["OCR — 96.6% tableaux, 88.9% écriture manuscrite"]
        T3["Reconnaissance vocale — ~4% WER, 4x plus rapide en FR"]
        T4["Modération de contenu — 9 catégories"]
        T5["Routeur intelligent — analyse du contenu"]
        T6["Génération d'image — Agent + outil image_generation"]
        T7["Recherche web — Agent + outil web_search"]
    end

    ML --> T1
    MO --> T2
    MV --> T3
    MMod --> T4
    MS --> T5
    ML --> T6
    ML --> T7
```

---

## Parcours utilisateur

```mermaid
sequenceDiagram
    actor Élève as Élève
    participant App as EurekAI
    participant AI as Mistral AI
    participant TTS as ElevenLabs

    Élève->>App: Créer un profil (nom, âge, avatar)
    Élève->>App: Créer un cours
    Élève->>App: Ajouter des sources (photo / texte / voix / web)
    App->>AI: Modérer le contenu (9 catégories)
    App->>AI: Détecter les consignes de révision
    Élève->>App: Générer du matériel d'étude
    App->>AI: Fiche / Flashcards / Quiz / Podcast
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

## Plongée en profondeur — Fonctionnalités

### Entrée multi-modale

EurekAI accepte 4 types de sources, toutes modérées avant traitement :

- **Upload OCR** — Fichiers JPG, PNG ou PDF traités par `mistral-ocr-latest`. Gère le texte imprimé, les tableaux (96.6% de précision) et l'écriture manuscrite (88.9% de précision).
- **Texte libre** — Tapez ou collez n'importe quel contenu. Passe par la modération avant stockage.
- **Entrée vocale** — Enregistrez de l'audio dans le navigateur. Transcrit par `voxtral-mini-latest` avec ~4% WER. Le paramètre `language="fr"` le rend 4x plus rapide.
- **Recherche web** — Entrez une requête. Un Agent Mistral temporaire avec l'outil `web_search` récupère et résume les résultats.

### Génération de contenu IA

Six types de matériel d'apprentissage généré :

| Générateur | Modèle | Sortie |
|---|---|---|
| **Fiche de révision** | `mistral-large-latest` | Titre, résumé, 10-25 points clés, vocabulaire, citations, anecdote |
| **Flashcards** | `mistral-large-latest` | 5 cartes Q/R avec références aux sources |
| **Quiz QCM** | `mistral-large-latest` | 10-20 questions, 4 choix chacune, explications, révision adaptative |
| **Podcast** | `mistral-large-latest` + ElevenLabs | Script 2 voix (Alex & Zoé) → audio MP3 |
| **Illustration** | Agent `mistral-large-latest` | Image éducative via l'outil `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + ElevenLabs + Voxtral | Questions TTS → réponse STT → vérification IA |

### Tuteur IA par chat

Un tuteur conversationnel avec accès complet aux documents de cours :

- Utilise `mistral-large-latest` (fenêtre de contexte de 128K tokens)
- **Appel d'outils** : peut générer des fiches, flashcards ou quiz en ligne pendant la conversation
- Historique de 50 messages par cours
- Modération du contenu pour les profils selon l'âge

### Routeur automatique intelligent

Le routeur utilise `mistral-small-latest` pour analyser le contenu des sources et recommander quels générateurs sont les plus pertinents — pour que les élèves n'aient pas à choisir manuellement.

### Apprentissage adaptatif

- **Statistiques de quiz** : suivi des tentatives et de la précision par question
- **Révision de quiz** : génère 5-10 nouvelles questions ciblant les concepts faibles
- **Détection de consigne** : détecte les instructions de révision ("Je sais ma leçon si je sais...") et les priorise dans tous les générateurs

### Sécurité & contrôle parental

- **4 groupes d'âge** : enfant (6-10), ado (11-15), étudiant (16+), adulte
- **Modération du contenu** : 9 catégories via `mistral-moderation-latest`, seuils adaptés par groupe d'âge
- **PIN parental** : hash SHA-256, requis pour les profils de moins de 15 ans
- **Restrictions du chat** : chat IA disponible uniquement pour les profils de 15 ans et plus

### Système multi-profils

- Profils multiples avec nom, âge, avatar, préférences de langue
- Projets liés aux profils via `profileId`
- Suppression en cascade : supprimer un profil supprime tous ses projets

### Internationalisation

- Interface complète disponible en français et en anglais
- Prompts IA supportent 2 langues aujourd'hui (FR, EN) avec architecture prête pour 15 (es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Langue configurable par profil

---

## Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| **Runtime** | Node.js + TypeScript 5.7 | Serveur et sûreté des types |
| **Backend** | Express 4.21 | API REST |
| **Serveur de dev** | Vite 7.3 + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.2 + Alpine.js 3.15 | Interface réactive, TypeScript compilé par Vite |
| **Templating** | vite-plugin-handlebars | Composition HTML par partials |
| **IA** | Mistral AI SDK 1.14 | Chat, OCR, STT, Agents, Modération |
| **TTS** | ElevenLabs SDK 2.36 | Synthèse vocale pour podcasts et quiz vocaux |
| **Icônes** | Lucide 0.575 | Bibliothèque d'icônes SVG |
| **Markdown** | Marked 17 | Rendu markdown dans le chat |
| **Upload fichiers** | Multer 1.4 | Gestion des formulaires multipart |
| **Audio** | ffmpeg-static | Traitement audio |
| **Tests** | Vitest 4 | Tests unitaires |
| **Persistance** | Fichiers JSON | Stockage sans dépendance |

---

## Référence des modèles

| Modèle | Utilisation | Pourquoi |
|---|---|---|
| `mistral-large-latest` | Fiche, Flashcards, Podcast, Quiz QCM, Chat, Vérification quiz, Agent Image, Agent Web Search, Détection consigne | Meilleur multilingual + suivi d'instructions |
| `mistral-ocr-latest` | OCR de documents | 96.6% précision tableaux, 88.9% écriture manuscrite |
| `voxtral-mini-latest` | Reconnaissance vocale | ~4% WER, `language="fr"` donne 4x+ de vitesse |
| `mistral-moderation-latest` | Modération de contenu | 9 catégories, sécurité enfants |
| `mistral-small-latest` | Routeur intelligent | Analyse rapide du contenu pour décisions de routage |
| `eleven_v3` (ElevenLabs) | Synthèse vocale | Voix naturelles en français pour podcasts et quiz vocaux |

---

## Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/your-username/eurekai.git
cd eurekai

# Installer les dépendances
npm install

# Configurer les clés API
cp .env.example .env
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=votre_clé_ici
#   ELEVENLABS_API_KEY=votre_clé_ici  (optionnel, pour les fonctions audio)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Note** : ElevenLabs est optionnel. Sans cette clé, les fonctions podcast et quiz vocal génèreront les scripts mais ne synthétiseront pas l'audio.

---

## Structure du projet

```
server.ts                 — Point d'entrée Express, monte les routes + config
config.ts                 — Config runtime (modèles, voix, TTS), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (6 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, FR/EN)

generators/
  ocr.ts                  — Upload + OCR via Mistral (JPG, PNG, PDF)
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — 5 flashcards Q/R
  quiz.ts                 — Quiz QCM (10-20 questions) + révision adaptative
  podcast.ts              — Script podcast 2 voix (Alex + Zoé)
  quiz-vocal.ts           — Quiz vocal : questions TTS + réponses STT + vérification IA
  image.ts                — Génération d'image via Agent Mistral (outil image_generation)
  chat.ts                 — Tuteur IA par chat avec appel d'outils
  router.ts               — Routeur automatique intelligent (contenu → générateurs recommandés)
  consigne.ts             — Détection de consignes de révision
  tts.ts                  — ElevenLabs TTS (eleven_v3, concaténation de segments)
  stt.ts                  — Voxtral STT (audio → texte)
  websearch.ts            — Agent Mistral avec outil web_search
  moderation.ts           — Modération de contenu (9 catégories)

routes/
  projects.ts             — CRUD projets
  sources.ts              — Upload OCR, texte libre, voix STT, recherche web, modération
  generate.ts             — Endpoints de génération (fiche/flashcards/quiz/podcast/image/vocal)
  generations.ts          — Tentatives de quiz, réponses vocales, lecture à voix haute, renommage, suppression
  chat.ts                 — Chat IA avec appel d'outils
  profiles.ts             — CRUD profils avec gestion du PIN

helpers/
  index.ts                — safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)

src/                      — Frontend (Vite + Handlebars)
  index.html              — Point d'entrée HTML principal
  main.ts                 — Entrée frontend (init Alpine.js + icônes Lucide)
  app/                    — Modules applicatifs Alpine.js
    state.ts              — Gestion d'état réactif
    navigation.ts         — Routage des vues + gardes par âge
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
  i18n/
    fr.ts                 — Traductions françaises
    en.ts                 — Traductions anglaises
    index.ts              — Chargeur i18n
  partials/               — Partials HTML Handlebars (header, sidebar, dialogues, vues)
  styles/
    main.css              — Entrée TailwindCSS
    theme.css             — Variables de thème personnalisées

public/assets/            — Ressources statiques (logo, avatars)
output/                   — Données d'exécution (projets, config, fichiers audio)
```

---

## Référence API

### Config
| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Configuration courante |
| `PUT` | `/api/config` | Modifier la config (modèles, voix, TTS) |
| `GET` | `/api/config/status` | Statut des APIs (Mistral, ElevenLabs) |

### Profils
| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles` | Lister tous les profils |
| `POST` | `/api/profiles` | Créer un profil |
| `PUT` | `/api/profiles/:id` | Modifier un profil (PIN requis pour < 15 ans) |
| `DELETE` | `/api/profiles/:id` | Supprimer un profil + cascade projets |

### Projets
| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Lister les projets |
| `POST` | `/api/projects` | Créer un projet `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Détails du projet |
| `PUT` | `/api/projects/:pid` | Renommer `{name}` |
| `DELETE` | `/api/projects/:pid` | Supprimer le projet |

### Sources
| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Upload OCR (fichiers multipart) |
| `POST` | `/api/projects/:pid/sources/text` | Texte libre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voix STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Recherche web `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Supprimer une source |
| `POST` | `/api/projects/:pid/moderate` | Modérer `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Détecter les consignes de révision |

### Génération
| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Fiche de révision `{sourceIds?}` |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards `{sourceIds?}` |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM `{sourceIds?}` |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast `{sourceIds?}` |
| `POST` | `/api/projects/:pid/generate/image` | Illustration `{sourceIds?}` |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal `{sourceIds?}` |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Révision adaptative `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/auto` | Génération auto par le routeur |

### CRUD Générations
| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Soumettre les réponses `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Vérifier une réponse orale (audio multipart + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lecture TTS à voix haute (fiches/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Renommer `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Supprimer la génération |

### Chat
| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Récupérer l'historique du chat |
| `POST` | `/api/projects/:pid/chat` | Envoyer un message `{message}` |
| `DELETE` | `/api/projects/:pid/chat` | Effacer l'historique du chat |

---

## Décisions architecturales

| Décision | Justification |
|---|---|
| **Alpine.js plutôt que React/Vue** | Empreinte minimale, réactivité légère avec TypeScript compilé par Vite. Parfait pour un hackathon où la vitesse compte. |
| **Persistance en fichiers JSON** | Zéro dépendance, démarrage instantané. Aucune base de données à configurer — on démarre et c'est parti. |
| **Vite + Handlebars** | Le meilleur des deux mondes : HMR rapide pour le développement, partials HTML pour l'organisation du code, Tailwind JIT. |
| **Prompts centralisés** | Tous les prompts IA dans `prompts.ts` — facile à itérer, tester et adapter par langue/groupe d'âge. |
| **Système multi-générations** | Chaque génération est un objet indépendant avec son propre ID — permet plusieurs fiches, quiz, etc. par cours. |
| **Prompts adaptés par âge** | 4 groupes d'âge avec vocabulaire, complexité et ton différents — le même contenu enseigne différemment selon l'apprenant. |
| **Fonctionnalités basées sur les Agents** | La génération d'images et la recherche web utilisent des Agents Mistral temporaires — cycle de vie propre avec nettoyage automatique. |

---

## Crédits & remerciements

- **[Mistral AI](https://mistral.ai)** — Modèles IA (Large, OCR, Voxtral, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Moteur de synthèse vocale (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework réactif léger
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitaire
- **[Vite](https://vitejs.dev)** — Outil de build frontend
- **[Lucide](https://lucide.dev)** — Bibliothèque d'icônes
- **[Marked](https://marked.js.org)** — Parseur Markdown

Construit avec soin pendant le Mistral AI Worldwide Hackathon, mars 2026.

---

## Auteur

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licence

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS
