<p align="center">
  <img src="public/assets/logo.webp" alt="Logotipo de EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforma cualquier contenido en una experiencia de aprendizaje interactiva — impulsada por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Inglés</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Portugués</a> · <a href="README-de.md">🇩🇪 Alemán</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Neerlandés</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chino</a> · <a href="README-ja.md">🇯🇵 Japonés</a> · <a href="README-ko.md">🇰🇷 Coreano</a> · <a href="README-pl.md">🇵🇱 Polaco</a> · <a href="README-ro.md">🇷🇴 Rumano</a> · <a href="README-sv.md">🇸🇪 Sueco</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Calidad del código</h4>

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

## La historia — ¿Por qué EurekAI?

**EurekAI** nació durante el [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([sitio oficial](https://worldwide-hackathon.mistral.ai/)) (marzo de 2026). Necesitaba un tema — y la idea vino de algo muy concreto: preparo regularmente los exámenes con mi hija, y pensé que debía ser posible hacerlo más lúdico e interactivo gracias a la IA.

El objetivo: tomar **cualquier entrada** — una foto de la lección, un texto copiado y pegado, una grabación de voz, una búsqueda web — y transformarla en **fichas de repaso, flashcards, cuestionarios, podcasts, textos para completar, ilustraciones, y más**. Todo ello impulsado por los modelos franceses de Mistral AI, lo que lo convierte en una solución naturalmente adaptada a estudiantes francófonos.

El [prototipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) fue concebido en 48 h durante el hackathon como prueba de concepto alrededor de los servicios de Mistral — ya funcional, pero limitado. Desde entonces, EurekAI se ha convertido en un proyecto real: textos para completar, navegación en los ejercicios, scraping web, moderación parental configurable, revisión de código en profundidad, y mucho más. La totalidad del código está generada por IA — principalmente [Claude Code](https://code.claude.com/), con algunas contribuciones vía [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Características

| | Funcionalidad | Descripción |
|---|---|---|
| 📷 | **Importación de archivos** | Importe sus lecciones — foto, PDF (vía Mistral OCR) o archivo de texto (TXT, MD) |
| 📝 | **Entrada de texto** | Escriba o pegue cualquier texto directamente |
| 🎤 | **Entrada de voz** | Grábese — Voxtral STT transcribe su voz |
| 🌐 | **Web / URL** | Pegue una URL (scraping directo vía Readability + Lightpanda) o escriba una búsqueda (Agent Mistral web_search) |
| 📄 | **Fichas de repaso** | Notas estructuradas con puntos clave, vocabulario, citas, anécdotas |
| 🃏 | **Flashcards** | Tarjetas Q/A con referencias a las fuentes para la memorización activa (número configurable) |
| ❓ | **Quiz QCM** | Preguntas de opción múltiple con revisión adaptativa de errores (número configurable) |
| ✏️ | **Textos para completar** | Ejercicios para completar con pistas y validación tolerante |
| 🎙️ | **Podcast** | Mini-podcast de 2 voces en audio — voz Mistral por defecto o voces personalizadas (¡padres!) |
| 🖼️ | **Ilustraciones** | Imágenes educativas generadas por un Agent Mistral |
| 🗣️ | **Quiz vocal** | Preguntas leídas en voz alta (voz customizable posible), respuesta oral, verificación por IA |
| 💬 | **Tutor IA** | Chat contextual con sus documentos de curso, con llamada a herramientas |
| 🧠 | **Enrutador automático** | Un enrutador basado en `mistral-small-latest` analiza el contenido y propone una combinación de generadores entre los 7 tipos disponibles |
| 🔒 | **Control parental** | Moderación configurable por perfil (categorías personalizables), PIN parental, restricciones del chat |
| 🌍 | **Multilingüe** | Interfaz disponible en 9 idiomas; generación IA controlable en 15 idiomas vía los prompts |
| 🔊 | **Lectura en voz alta** | Escuche las fichas y flashcards vía Mistral Voxtral TTS o ElevenLabs |

---

## Visión general de la arquitectura

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

## Mapa de uso de los modelos

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

## Recorrido del usuario

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

## Profundización — Funcionalidades

### Entrada multimodal

EurekAI acepta 4 tipos de fuentes, moderadas según el perfil (activado por defecto para niño y adolescente) :

- **Importación de archivos** — Archivos JPG, PNG o PDF procesados por `mistral-ocr-latest` (texto impreso, tablas, escritura manuscrita), o archivos de texto (TXT, MD) importados directamente.
- **Texto libre** — Escriba o pegue cualquier contenido. Moderado antes del almacenamiento si la moderación está activa.
- **Entrada de voz** — Grabe audio en el navegador. Transcrito por `voxtral-mini-latest`. El parámetro `language="fr"` optimiza el reconocimiento.
- **Web / URL** — Pegue una o varias URLs para scrapear el contenido directamente (Readability + Lightpanda para páginas JS), o escriba palabras clave para una búsqueda web vía Agent Mistral. El campo único acepta ambos — URLs y palabras clave se separan automáticamente, cada resultado crea una fuente independiente.

### Generación de contenido IA

Siete tipos de material de aprendizaje generado:

| Generador | Modelo | Salida |
|---|---|---|
| **Ficha de repaso** | `mistral-large-latest` | Título, resumen, puntos clave, vocabulario, citas, anécdota |
| **Flashcards** | `mistral-large-latest` | Tarjetas Q/A con referencias a las fuentes (número configurable) |
| **Quiz QCM** | `mistral-large-latest` | Preguntas de opción múltiple, explicaciones, revisión adaptativa (número configurable) |
| **Textos para completar** | `mistral-large-latest` | Frases para completar con pistas, validación tolerante (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Guion 2 voces → audio MP3 |
| **Ilustración** | Agent `mistral-large-latest` | Imagen educativa vía la herramienta `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Preguntas TTS → respuesta STT → verificación por IA |

### Tutor IA por chat

Un tutor conversacional con acceso completo a los documentos de curso:

- Utiliza `mistral-large-latest`
- **Llamada a herramientas** : puede generar fichas, flashcards, quiz o textos para completar durante la conversación
- Historial de 50 mensajes por curso
- Moderación del contenido si está activada para el perfil

### Enrutador automático

El enrutador utiliza `mistral-small-latest` para analizar el contenido de las fuentes y proponer los generadores más pertinentes entre los 7 disponibles. La interfaz muestra el progreso en tiempo real: primero una fase de análisis, luego las generaciones individuales con posibilidad de cancelación.

### Aprendizaje adaptativo

- **Estadísticas de quiz** : seguimiento de intentos y precisión por pregunta
- **Revisión de quiz** : genera 5-10 nuevas preguntas dirigidas a los conceptos débiles
- **Detección de consigna** : detecta las instrucciones de repaso ("Sé mi lección si sé...") y las prioriza en los generadores textuales compatibles (ficha, flashcards, quiz, textos para completar)

### Seguridad y control parental

- **4 grupos de edad** : niño (≤10 años), adolescente (11-15), estudiante (16-25), adulto (26+)
- **Moderación del contenido** : `mistral-moderation-latest` con 10 categorías disponibles, 5 bloqueadas por defecto para niño/ado (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorías personalizables por perfil en la configuración.
- **PIN parental** : hash SHA-256, requerido para perfiles menores de 15 años. Para un despliegue en producción, prever un hash lento con sal (Argon2id, bcrypt).
- **Restricciones del chat** : chat IA desactivado por defecto para menores de 16 años, activable por los padres

### Sistema multi-perfiles

- Perfiles múltiples con nombre, edad, avatar, preferencias de idioma
- Proyectos vinculados a los perfiles vía `profileId`
- Eliminación en cascada: eliminar un perfil elimina todos sus proyectos

### TTS multi-proveedor y voces personalizadas

- **Mistral Voxtral TTS** (predeterminado) : `voxtral-mini-tts-latest`, no se necesita clave adicional
- **ElevenLabs** (alternativa) : `eleven_v3`, voces naturales, requiere `ELEVENLABS_API_KEY`
- Proveedor configurable en la configuración de la aplicación
- **Voces personalizadas** : los padres pueden crear sus propias voces vía la API Mistral Voices (a partir de una muestra de audio) y asignarlas a los roles anfitrión/invitado — los podcasts y quiz vocales se reproducen entonces con la voz de un padre, haciendo la experiencia aún más inmersiva para el niño
- Dos roles vocales configurables : **anfitrión** (narrador principal) y **invitado** (segunda voz del podcast)
- Catálogo completo de voces Mistral disponible en la configuración, filtrable por idioma

### Internacionalización

- Interfaz disponible en 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Los prompts de IA soportan 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Idioma configurable por perfil

---

## Stack técnico

| Capa | Tecnología | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Servidor y seguridad de tipos |
| **Backend** | Express 5.x | API REST |
| **Servidor de dev** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfaz reactiva, TypeScript compilado por Vite |
| **Templating** | vite-plugin-handlebars | Composición HTML por partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderación |
| **TTS (predeterminado)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntesis vocal integrada |
| **TTS (alternativo)** | ElevenLabs SDK 2.x | `eleven_v3`, voces naturales |
| **Iconos** | Lucide 1.x | Biblioteca de iconos SVG |
| **Scraping web** | Readability + linkedom | Extracción del contenido principal de las páginas web (tecnología Firefox Reader View) |
| **Navegador headless** | Lightpanda | Navegador headless ultra-ligero (Zig + V8) para páginas JS/SPA — scraping fallback |
| **Markdown** | Marked | Renderizado markdown en el chat |
| **Subida de archivos** | Multer 2.x | Gestión de formularios multipart |
| **Audio** | ffmpeg-static | Concatenación de segmentos de audio |
| **Pruebas** | Vitest | Tests unitarios — cobertura medida por SonarCloud |
| **Persistencia** | Archivos JSON | Almacenamiento sin dependencia |

---

## Referencia de modelos

| Modelo | Uso | Por qué |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos para completar, Chat, Verificación quiz vocal, Agent Image, Agent Web Search, Detección de consigna | Mejor multilingüe + seguimiento de instrucciones |
| `mistral-ocr-latest` | OCR de documentos | Texto impreso, tablas, escritura manuscrita |
| `voxtral-mini-latest` | Reconocimiento de voz (STT) | STT multilingüe, optimizado con `language="fr"` |
| `voxtral-mini-tts-latest` | Síntesis vocal (TTS) | Podcasts, quiz vocal, lectura en voz alta |
| `mistral-moderation-latest` | Moderación de contenido | 5 categorías bloqueadas para niño/ado (+ jailbreaking) |
| `mistral-small-latest` | Enrutador automático | Análisis rápido del contenido para decisiones de enrutamiento |
| `eleven_v3` (ElevenLabs) | Síntesis vocal (TTS alternativa) | Voces naturales, alternativa configurable |

---

## Inicio rápido

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

> **Nota** : Mistral Voxtral TTS es el proveedor por defecto — no se necesita ninguna clave adicional más allá de `MISTRAL_API_KEY`. ElevenLabs es un proveedor TTS alternativo configurable en la configuración.

---

## Estructura del proyecto

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

## Referencia de la API

### Config
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/config` | Configuración actual |
| `PUT` | `/api/config` | Modificar la configuración (modelos, voces, proveedor TTS) |
| `GET` | `/api/config/status` | Estado de las APIs (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Restablecer la configuración por defecto |
| `GET` | `/api/config/voices` | Listar las voces Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorías de moderación disponibles + valores por defecto según edad |

### Perfiles
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/profiles` | Listar todos los perfiles |
| `POST` | `/api/profiles` | Crear un perfil |
| `PUT` | `/api/profiles/:id` | Modificar un perfil (PIN requerido para < 15 años) |
| `DELETE` | `/api/profiles/:id` | Eliminar un perfil + cascada de proyectos `{pin?}` → `{ok, deletedProjects}` |

### Proyectos
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/projects` | Listar los proyectos (`?profileId=` opcional) |
| `POST` | `/api/projects` | Crear un proyecto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalles del proyecto |
| `PUT` | `/api/projects/:pid` | Renombrar `{name}` |
| `DELETE` | `/api/projects/:pid` | Eliminar el proyecto |

### Fuentes
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importar archivos multipart (OCR para JPG/PNG/PDF, lectura directa para TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Texto libre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voz STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL o búsqueda web `{query}` — devuelve un array de fuentes |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminar una fuente |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar las consignas de repaso | ### Generación
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de repaso |
| `POST` | `/api/projects/:pid/generate/flashcards` | Tarjetas |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos con huecos |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustración |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Repaso adaptativo `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Análisis de enrutamiento (plan de los generadores a lanzar) |
| `POST` | `/api/projects/:pid/generate/auto` | Generación automática backend (routage + 5 tipos: resumen, tarjetas, quiz, rellenar_huecos, podcast) |

Todas las rutas de generación aceptan `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` exige además `{generationId, weakQuestions}`.

### CRUD Generaciones
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar las respuestas del quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar las respuestas de textos con huecos `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar una respuesta oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lectura TTS en voz alta (fichas/tarjetas) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Renombrar `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Eliminar la generación |

### Chat
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperar el historial del chat |
| `POST` | `/api/projects/:pid/chat` | Enviar un mensaje `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Borrar el historial del chat |

---

## Decisiones arquitectónicas

| Decisión | Justificación |
|---|---|
| **Alpine.js en lugar de React/Vue** | Huella mínima, reactividad ligera con TypeScript compilado por Vite. Perfecto para un hackathon donde la velocidad importa. |
| **Persistencia en archivos JSON** | Cero dependencias, arranque instantáneo. Ninguna base de datos que configurar — se inicia y listo. |
| **Vite + Handlebars** | Lo mejor de ambos mundos: HMR rápido para el desarrollo, partials HTML para organizar el código, Tailwind JIT. |
| **Prompts centralizados** | Todos los prompts IA en `prompts.ts` — fácil de iterar, probar y adaptar por idioma/grupo de edad. |
| **Sistema multi-generaciones** | Cada generación es un objeto independiente con su propio ID — permite varias fichas, quizzes, etc. por curso. |
| **Prompts adaptados por edad** | 4 grupos de edad con vocabulario, complejidad y tono diferentes — el mismo contenido enseña de forma distinta según el alumno. |
| **Funcionalidades basadas en Agents** | La generación de imágenes y la búsqueda web utilizan Agents Mistral temporales — ciclo de vida propio con limpieza automática. |
| **Scraping inteligente de URLs** | Un campo único acepta URLs y palabras clave mezcladas — las URLs se scrapean vía Readability (páginas estáticas) con fallback Lightpanda (páginas JS/SPA), las palabras clave activan un Agent Mistral web_search. Cada resultado crea una fuente independiente. |
| **TTS multi-proveedor** | Mistral Voxtral TTS por defecto (sin clave adicional), ElevenLabs como alternativa — configurable sin reiniciar. |

---

## Créditos & agradecimientos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Hackathon mundial
- **[ElevenLabs](https://elevenlabs.io)** — Motor de síntesis de voz alternativo (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reactivo ligero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitario
- **[Vite](https://vitejs.dev)** — Herramienta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de iconos
- **[Marked](https://marked.js.org)** — Analizador de Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracción de contenido web (tecnología Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultraligero para el scraping de páginas JS/SPA

Iniciado durante el Mistral AI Worldwide Hackathon (marzo 2026), desarrollado íntegramente por IA con [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencia

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Este documento ha sido traducido de la versión fr al idioma es utilizando el modelo gpt-5-mini. Para más información sobre el proceso de traducción, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

