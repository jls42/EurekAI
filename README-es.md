<p align="center">
  <img src="public/assets/logo.webp" alt="Logo de EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforma cualquier contenido en una experiencia de aprendizaje interactiva — impulsado por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Inglés</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Portugués</a> · <a href="README-de.md">🇩🇪 Alemán</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Neerlandés</a> · <a href="README-ar.md">🇸🇦 Árabe</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chino</a> · <a href="README-ja.md">🇯🇵 Japonés</a> · <a href="README-ko.md">🇰🇷 Coreano</a> · <a href="README-pl.md">🇵🇱 Polaco</a> · <a href="README-ro.md">🇷🇴 Rumano</a> · <a href="README-sv.md">🇸🇪 Sueco</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Ver demo en YouTube"></a>
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

**EurekAI** nació durante el [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([sitio oficial](https://worldwide-hackathon.mistral.ai/)) (marzo 2026). Necesitaba un tema — y la idea vino de algo muy concreto: preparo regularmente los controles con mi hija, y pensé que debía ser posible hacerlo más lúdico e interactivo gracias a la IA.

El objetivo: tomar **cualquier entrada** — una foto de la lección, un texto copiado/pegado, una grabación de voz, una búsqueda web — y transformarla en **fichas de repaso, flashcards, cuestionarios, podcasts, textos con huecos, ilustraciones y más**. Todo ello impulsado por los modelos franceses de Mistral AI, lo que lo convierte en una solución naturalmente adaptada a los estudiantes francófonos.

El [prototipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) fue concebido en 48 h durante el hackathon como prueba de concepto alrededor de los servicios de Mistral — ya funcional, pero limitado. Desde entonces, EurekAI se ha convertido en un proyecto real: textos con huecos, navegación en los ejercicios, scraping web, moderación parental configurable, revisión de código profunda y mucho más. La totalidad del código es generado por IA — principalmente [Claude Code](https://code.claude.com/), con algunas contribuciones vía [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Características

| | Funcionalidad | Descripción |
|---|---|---|
| 📷 | **Importación de archivos** | Importa tus lecciones — foto, PDF (vía Mistral OCR) o archivo de texto (TXT, MD) |
| 📝 | **Entrada de texto** | Escribe o pega cualquier texto directamente |
| 🎤 | **Entrada de voz** | Grábate — Voxtral STT transcribe tu voz |
| 🌐 | **Web / URL** | Pega una URL (scraping directo vía Readability + Lightpanda) o escribe una búsqueda (Agent Mistral web_search) |
| 📄 | **Fichas de repaso** | Notas estructuradas con puntos clave, vocabulario, citas, anécdotas |
| 🃏 | **Flashcards** | Tarjetas Q/R con referencias a las fuentes para la memorización activa (cantidad configurable) |
| ❓ | **Cuestionarios QCM** | Preguntas de opción múltiple con revisión adaptativa de errores (cantidad configurable) |
| ✏️ | **Textos con huecos** | Ejercicios para completar con pistas y validación tolerante |
| 🎙️ | **Podcast** | Mini-podcast de 2 voces en audio — voz Mistral por defecto o voces personalizadas (¡padres!) |
| 🖼️ | **Ilustraciones** | Imágenes educativas generadas por un Agent Mistral |
| 🗣️ | **Cuestionario vocal** | Preguntas leídas en voz alta (voz personalizada posible), respuesta oral, verificación por IA |
| 💬 | **Tutor IA** | Chat contextual con tus documentos de curso, con llamada a herramientas |
| 🧠 | **Enrutador automático** | Un enrutador basado en `mistral-small-latest` analiza el contenido y propone una combinación de generadores entre los 7 tipos disponibles |
| 🔒 | **Control parental** | Moderación configurable por perfil (categorías personalizables), PIN parental, restricciones del chat |
| 🌍 | **Multilingüe** | Interfaz disponible en 9 idiomas; generación IA controlable en 15 idiomas vía prompts |
| 🔊 | **Lectura en voz alta** | Escucha las fichas y flashcards vía Mistral Voxtral TTS o ElevenLabs |

---

## Visión general de la arquitectura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Visión general de la arquitectura" width="800" />
</p>

---

## Mapa de uso de los modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="Asignación de modelos AI a tareas" width="800" />
</p>

---

## Recorrido del usuario

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Recorrido de aprendizaje del estudiante" width="800" />
</p>

---

## Análisis en profundidad — Funcionalidades

### Entrada multimodal

EurekAI acepta 4 tipos de fuentes, moderadas según el perfil (activado por defecto para niño y adolescente):

- **Importación de archivos** — Archivos JPG, PNG o PDF tratados por `mistral-ocr-latest` (texto impreso, tablas, escritura manuscrita), o archivos de texto (TXT, MD) importados directamente.
- **Texto libre** — Escribe o pega cualquier contenido. Moderado antes del almacenamiento si la moderación está activa.
- **Entrada de voz** — Graba audio en el navegador. Transcrito por `voxtral-mini-latest`. El parámetro `language="fr"` optimiza el reconocimiento.
- **Web / URL** — Pega una o varias URLs para hacer scraping del contenido directamente (Readability + Lightpanda para páginas JS), o escribe palabras clave para una búsqueda web vía Agent Mistral. El campo único acepta ambos — URLs y palabras clave se separan automáticamente, cada resultado crea una fuente independiente.

### Generación de contenido IA

Siete tipos de material de aprendizaje generado:

| Generador | Modelo | Salida |
|---|---|---|
| **Ficha de repaso** | `mistral-large-latest` | Título, resumen, puntos clave, vocabulario, citas, anécdota |
| **Flashcards** | `mistral-large-latest` | Tarjetas Q/R con referencias a las fuentes (cantidad configurable) |
| **Cuestionario QCM** | `mistral-large-latest` | Preguntas de opción múltiple, explicaciones, revisión adaptativa (cantidad configurable) |
| **Textos con huecos** | `mistral-large-latest` | Frases para completar con pistas, validación tolerante (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Guion 2 voces → audio MP3 |
| **Ilustración** | Agent `mistral-large-latest` | Imagen educativa vía la herramienta `image_generation` |
| **Cuestionario vocal** | `mistral-large-latest` + Voxtral TTS + STT | Preguntas TTS → respuesta STT → verificación IA |

### Tutor IA por chat

Un tutor conversacional con acceso completo a los documentos del curso:

- Utiliza `mistral-large-latest`
- **Llamada a herramientas**: puede generar fichas, flashcards, cuestionarios o textos con huecos durante la conversación
- Historial de 50 mensajes por curso
- Moderación del contenido si está activada para el perfil

### Enrutador automático

El enrutador utiliza `mistral-small-latest` para analizar el contenido de las fuentes y proponer los generadores más pertinentes entre los 7 disponibles. La interfaz muestra el progreso en tiempo real: primero una fase de análisis, luego las generaciones individuales con posibilidad de cancelación.

### Aprendizaje adaptativo

- **Estadísticas de quiz**: seguimiento de intentos y precisión por pregunta
- **Revisión de quiz**: genera 5-10 nuevas preguntas focalizadas en los conceptos débiles
- **Detección de consigna**: detecta las instrucciones de repaso ("Sé mi lección si sé...") y las prioriza en los generadores textuales compatibles (ficha, flashcards, quiz, textos con huecos)

### Seguridad y control parental

- **4 grupos de edad**: niño (≤10 años), adolescente (11-15), estudiante (16-25), adulto (26+)
- **Moderación del contenido**: `mistral-moderation-latest` con 10 categorías disponibles, 5 bloqueadas por defecto para niño/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorías personalizables por perfil en los ajustes.
- **PIN parental**: hash SHA-256, requerido para perfiles menores de 15 años. Para un despliegue en producción, prever un hash lento con sal (Argon2id, bcrypt).
- **Restricciones del chat**: chat IA desactivado por defecto para menores de 16 años, activable por los padres

### Sistema multi-perfiles

- Múltiples perfiles con nombre, edad, avatar, preferencias de idioma
- Proyectos vinculados a los perfiles vía `profileId`
- Eliminación en cascada: eliminar un perfil borra todos sus proyectos

### TTS multi-proveedor y voces personalizadas

- **Mistral Voxtral TTS** (por defecto): `voxtral-mini-tts-latest`, no se necesita clave adicional
- **ElevenLabs** (alternativo): `eleven_v3`, voces naturales, requiere `ELEVENLABS_API_KEY`
- Proveedor configurable en los ajustes de la aplicación
- **Voces personalizadas**: los padres pueden crear sus propias voces vía la API Mistral Voices (a partir de una muestra de audio) y asignarlas a los roles anfitrión/invitado — los podcasts y quizzes vocales se reproducen entonces con la voz de un padre, haciendo la experiencia más inmersiva para el niño
- Dos roles vocales configurables: **anfitrión** (narrador principal) y **invitado** (segunda voz del podcast)
- Catálogo completo de voces Mistral disponible en los ajustes, filtrable por idioma

### Internacionalización

- Interfaz disponible en 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Los prompts IA soportan 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
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
| **TTS (por defecto)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntesis de voz integrada |
| **TTS (alternativo)** | ElevenLabs SDK 2.x | `eleven_v3`, voces naturales |
| **Iconos** | Lucide 1.x | Biblioteca de iconos SVG |
| **Scraping web** | Readability + linkedom | Extracción del contenido principal de páginas web (tecnología Firefox Reader View) |
| **Navegador headless** | Lightpanda | Navegador headless ultra-ligero (Zig + V8) para páginas JS/SPA — scraping de respaldo |
| **Markdown** | Marked | Renderizado markdown en el chat |
| **Subida de archivos** | Multer 2.x | Gestión de formularios multipart |
| **Audio** | ffmpeg-static | Concatenación de segmentos de audio |
| **Tests** | Vitest | Tests unitarios — cobertura medida por SonarCloud |
| **Persistencia** | Archivos JSON | Almacenamiento sin dependencias |

---

## Referencia de modelos

| Modelo | Utilización | Por qué |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos con huecos, Chat, Verificación quiz vocal, Agent Imagen, Agent Web Search, Detección de consigna | Mejor multilingüe + seguimiento de instrucciones |
| `mistral-ocr-latest` | OCR de documentos | Texto impreso, tablas, escritura manuscrita |
| `voxtral-mini-latest` | Reconocimiento de voz (STT) | STT multilingüe, optimizado con `language="fr"` |
| `voxtral-mini-tts-latest` | Síntesis de voz (TTS) | Podcasts, quiz vocal, lectura en voz alta |
| `mistral-moderation-latest` | Moderación de contenido | 5 categorías bloqueadas para niño/adolescente (+ jailbreaking) |
| `mistral-small-latest` | Enrutador automático | Análisis rápido del contenido para decisiones de enrutamiento |
| `eleven_v3` (ElevenLabs) | Síntesis de voz (TTS alternativo) | Voces naturales, alternativa configurable |

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

> **Nota** : Mistral Voxtral TTS es el proveedor por defecto — no se necesita clave adicional más allá de `MISTRAL_API_KEY`. ElevenLabs es un proveedor TTS alternativo configurable en los ajustes.

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
| `PUT` | `/api/config` | Modificar la config (modelos, voces, proveedor TTS) |
| `GET` | `/api/config/status` | Estado de las APIs (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Restablecer la config por defecto |
| `GET` | `/api/config/voices` | Listar las voces Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorías de moderación disponibles + valores por defecto por edad |

### Perfiles
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/profiles` | Listar todos los perfiles |
| `POST` | `/api/profiles` | Crear un perfil |
| `PUT` | `/api/profiles/:id` | Modificar un perfil (PIN requerido para < 15 años) |
| `DELETE` | `/api/profiles/:id` | Eliminar un perfil + cascada proyectos `{pin?}` → `{ok, deletedProjects}` |

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
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping URL o búsqueda web `{query}` — devuelve un array de fuentes |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminar una fuente |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar las consignas de repaso | ### Generación
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de repaso |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos con huecos |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustración |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Repaso adaptativo `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Análisis de enrutamiento (plan de generadores a lanzar) |
| `POST` | `/api/projects/:pid/generate/auto` | Generación auto backend (enrutamiento + 5 tipos: summary, flashcards, quiz, fill-blank, podcast) |

Todas las rutas de generación aceptan `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` exige además `{generationId, weakQuestions}`.

### CRUD Generaciones
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar respuestas de quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar respuestas de textos con huecos `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar una respuesta oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Reproducción TTS en voz alta (fichas/flashcards) |
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
| **Persistencia en archivos JSON** | Cero dependencias, inicio instantáneo. Ninguna base de datos que configurar — se arranca y listo. |
| **Vite + Handlebars** | Lo mejor de ambos mundos: HMR rápido para el desarrollo, partials HTML para la organización del código, Tailwind JIT. |
| **Prompts centralizados** | Todos los prompts IA en `prompts.ts` — fácil de iterar, probar y adaptar por idioma/grupo de edad. |
| **Sistema multi-generaciones** | Cada generación es un objeto independiente con su propio ID — permite múltiples fichas, quizzes, etc. por curso. |
| **Prompts adaptados por edad** | 4 grupos de edad con vocabulario, complejidad y tono distintos — el mismo contenido enseña de forma diferente según el aprendiz. |
| **Funciones basadas en Agentes** | La generación de imágenes y la búsqueda web usan Agentes Mistral temporales — ciclo de vida limpio con limpieza automática. |
| **Scraping inteligente de URLs** | Un campo único acepta URLs y palabras clave mezcladas — las URLs se scrapearán via Readability (páginas estáticas) con fallback Lightpanda (páginas JS/SPA), las palabras clave desencadenan un Agente Mistral web_search. Cada resultado crea una fuente independiente. |
| **TTS multi-proveedor** | Mistral Voxtral TTS por defecto (sin clave adicional), ElevenLabs como alternativa — configurable sin reinicio. |

---

## Créditos y agradecimientos

- **[Mistral AI](https://mistral.ai)** — Modelos IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Motor de síntesis de voz alternativo (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reactivo ligero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitario
- **[Vite](https://vitejs.dev)** — Herramienta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de iconos
- **[Marked](https://marked.js.org)** — Parser de Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracción de contenido web (tecnología Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultra-ligero para el scraping de páginas JS/SPA

Iniciado durante el Mistral AI Worldwide Hackathon (marzo de 2026), desarrollado íntegramente por IA con [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencia

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Este documento ha sido traducido de la versión fr al idioma es utilizando el modelo gpt-5-mini. Para más información sobre el proceso de traducción, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

