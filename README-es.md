<p align="center">
  <img src="public/assets/logo.webp" alt="Logotipo de EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Convierte cualquier contenido en una experiencia de aprendizaje interactiva — impulsada por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Inglés</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Portugués</a> · <a href="README-de.md">🇩🇪 Alemán</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Neerlandés</a> · <a href="README-ar.md">🇸🇦 Árabe</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chino</a> · <a href="README-ja.md">🇯🇵 Japonés</a> · <a href="README-ko.md">🇰🇷 Coreano</a> · <a href="README-pl.md">🇵🇱 Polaco</a> · <a href="README-ro.md">🇷🇴 Rumano</a> · <a href="README-sv.md">🇸🇪 Sueco</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demostración de YouTube"></a>
</p>

<h4 align="center">📊 Calidad del código</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Puerta de calidad"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Puntuación de seguridad"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Puntuación de fiabilidad"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Puntuación de mantenibilidad"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Cobertura"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilidades"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Olores de código"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Líneas de código"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Insignia de Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## La historia — ¿Por qué EurekAI?

**EurekAI** nació durante el [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([sitio oficial](https://worldwide-hackathon.mistral.ai/)) (marzo de 2026). Necesitaba un tema — y la idea surgió de algo muy concreto: preparo regularmente los exámenes con mi hija, y pensé que debía ser posible hacerlo más lúdico e interactivo gracias a la IA.

El objetivo: tomar **cualquier entrada** — una foto de la lección, un texto copiado y pegado, una grabación de voz, una búsqueda web — y transformarla en **fichas de repaso, flashcards, quiz, podcasts, textos con huecos, ilustraciones, y mucho más**. Todo ello impulsado por los modelos franceses de Mistral AI, lo que lo convierte en una solución naturalmente adaptada a los alumnos francófonos.

El [prototipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) se diseñó en 48h durante el hackathon como prueba de concepto en torno a los servicios de Mistral — ya funcional, pero limitado. Desde entonces, EurekAI se ha convertido en un proyecto real: textos con huecos, navegación por los ejercicios, scraping web, moderación parental configurable, revisión de código en profundidad, y mucho más. La totalidad del código está generada por IA — principalmente [Claude Code](https://code.claude.com/), con algunas contribuciones mediante [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Funcionalidades

| | Funcionalidad | Descripción |
|---|---|---|
| 📷 | **Importación de archivos** | Importa tus lecciones — foto, PDF (mediante Mistral OCR con puntuación de confianza promediada, tercios `high`/`medium`/`low`) o archivo de texto (TXT, MD). Sesiones de carga con reintento por archivo y progreso individual |
| 📝 | **Entrada de texto** | Escribe o pega cualquier texto directamente |
| 🎤 | **Entrada de voz** | Grábate — Voxtral STT transcribe tu voz |
| 🌐 | **Web / URL** | Pega una URL (scraping directo mediante Readability + Lightpanda) o escribe una búsqueda (Agent Mistral web_search) |
| 📄 | **Fichas de repaso** | Notas estructuradas con puntos clave, vocabulario, citas, anécdotas |
| 🃏 | **Flashcards** | Tarjetas Q/R interactivas, lectura de audio dialogada |
| ❓ | **Quiz de opción múltiple** | Preguntas de opción múltiple con revisión adaptativa de los errores (número configurable) |
| ✏️ | **Textos con huecos** | Ejercicios para completar con pistas y validación tolerante |
| 🔤 | **Dictado** | Palabras dictadas en audio (Voxtral TTS) desde una lista importada, entrada por teclado, corrección estricta letra por letra con regla de ortografía explicada |
| 🎙️ | **Podcast** | Minipodcast de 2 voces en audio — voz Mistral por defecto o voces personalizadas (¡padres!) |
| 🖼️ | **Ilustraciones** | Imágenes educativas generadas por un Agent Mistral |
| 🗣️ | **Quiz de voz** | Preguntas leídas en voz alta (voz personalizada posible), respuesta oral, verificación de IA |
| 💬 | **Tutor de IA** | Chat contextual con tus documentos de clase, con llamada a herramientas |
| 🧠 | **Enrutador automático** | Un router basado en `mistral-small-latest` analiza el contenido y propone una combinación de generadores entre los 8 tipos disponibles |
| 🔒 | **Control parental** | Moderación configurable por perfil (categorías personalizables), PIN parental, restricciones del chat |
| 🌍 | **Multilingüe** | Interfaz disponible en 9 idiomas; generación de IA configurable en 15 idiomas mediante los prompts |
| 🔊 | **Lectura en voz alta** | Escucha las fichas y flashcards (diálogo pregunta/respuesta) mediante Mistral Voxtral TTS |
| 💶 | **Seguimiento de costes de la API** | Estimación transparente del coste € de cada generación y fuente (tokens / caracteres / páginas / segundos de audio). Insignia por tarjeta + total por proyecto, visible en el panel |
| 🎨 | **Tema por perfil** | Cada perfil elige su tema `dark` o `light` — persiste al cambiar de perfil |

---

## Resumen de la arquitectura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Resumen de la arquitectura" width="800" />
</p>

---

## Mapa de uso de los modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="Asignación de modelo de IA a tarea" width="800" />
</p>

---

## Recorrido del usuario

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Recorrido de aprendizaje del estudiante" width="800" />
</p>

---

## Profundización — Funcionalidades

### Entrada multimodal

EurekAI acepta 4 tipos de fuentes, moderadas según el perfil (activado por defecto para niño y adolescente):

- **Importación de archivos** — Archivos JPG, PNG o PDF tratados por OCR Mistral — **OCR 4 (`mistral-ocr-4-0`) por defecto** (mejor calidad), **OCR 3 (`mistral-ocr-2512`) opcional** en Ajustes (más barato, ~½ del coste) — para texto impreso, tablas y escritura manuscrita; o archivos de texto (TXT, MD) importados directamente. Las cargas multiparchivo utilizan un sistema de **sesiones de carga**: progreso individual por archivo, reintento del archivo fallido sin volver a enviar los demás, descartar la sesión cuando termina. El OCR expone una **puntuación de confianza** promediada (`average`, acotada en `[0,1]`, calculada a partir de `averagePageConfidenceScore` devueltos por Mistral), mostrada en la UI como una insignia de nivel `high` / `medium` / `low` (umbrales ~0.9 / ~0.7) — avisa sin bloquear si el escaneo es de mala calidad.
- **Texto libre** — Escribe o pega cualquier contenido. Se modera antes del almacenamiento si la moderación está activa.
- **Entrada de voz** — Graba audio en el navegador. Transcrito por `voxtral-mini-latest`. El parámetro `language="fr"` optimiza el reconocimiento.
- **Web / URL** — Pega una o varias URLs para extraer el contenido directamente (Readability + Lightpanda para las páginas JS), o escribe palabras clave para una búsqueda web mediante Agent Mistral. El campo único acepta ambos — las URLs y las palabras clave se separan automáticamente, y cada resultado crea una fuente independiente.

### Generación de contenido con IA

Ocho tipos de material de aprendizaje generado:

| Generador | Modelo | Salida |
|---|---|---|
| **Ficha de repaso** | `mistral-large-latest` | Título, resumen, puntos clave, vocabulario, citas, anécdota |
| **Flashcards** | `mistral-large-latest` | Tarjetas Q/R con referencias a las fuentes (número configurable) |
| **Quiz de opción múltiple** | `mistral-large-latest` | Preguntas de opción múltiple, explicaciones, revisión adaptativa (número configurable) |
| **Textos con huecos** | `mistral-large-latest` | Frases para completar con pistas, validación tolerante (Levenshtein) |
| **Dictado** | `mistral-large-latest` + Voxtral TTS | Palabras clave dictadas en audio (1 MP3/palabra) → entrada por teclado → corrección estricta (acentos) con regla explicada |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Guion de 2 voces → audio MP3 |
| **Ilustración** | Agent `mistral-large-latest` | Imagen educativa mediante la herramienta `image_generation` |
| **Quiz de voz** | `mistral-large-latest` + Voxtral TTS + STT | Preguntas TTS → respuesta STT → verificación de IA |

### Tutor de IA por chat

Un tutor conversacional con acceso completo a los documentos de clase:

- Usa `mistral-large-latest`
- **Llamada a herramientas**: puede generar fichas, flashcards, quiz o textos con huecos durante la conversación
- Historial de 50 mensajes por clase
- Moderación del contenido si está activada para el perfil

### Enrutador automático

El router utiliza `mistral-small-latest` para analizar el contenido de las fuentes y proponer los generadores más pertinentes entre los 8 disponibles. La interfaz muestra el progreso en tiempo real: primero una fase de análisis, después las generaciones individuales con cancelación posible.

### Aprendizaje adaptativo

- **Estadísticas del quiz**: seguimiento de los intentos y de la precisión por pregunta
- **Revisión del quiz**: genera 5-10 nuevas preguntas dirigidas a los conceptos débiles
- **Detección de consignas**: detecta las instrucciones de repaso ("Sé la lección si sé...") y las prioriza en los generadores textuales compatibles (ficha, flashcards, quiz, textos con huecos)

### Seguridad y control parental

- **4 grupos de edad**: niño (≤10 años), adolescente (11-15), estudiante (16-25), adulto (26+)
- **Moderación del contenido**: `mistral-moderation-2603` (Mistral Moderation 2) con 10 categorías disponibles, 5 bloqueadas por defecto para niño/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorías personalizables por perfil en los ajustes. Se evita deliberadamente el alias `-latest` (todavía apunta a una versión obsoleta).
- **PIN parental**: hash SHA-256, requerido para los perfiles de menos de 15 años. Para un despliegue en producción, prever un hash lento con sal (Argon2id, bcrypt).
- **Restricciones del chat**: chat de IA desactivado por defecto para los menores de 16 años, activable por los padres

### Sistema multiperfil

- Perfiles múltiples con nombre, edad, avatar, preferencias de idioma
- **Voz por perfil** (`Profile.mistralVoices?: { host, guest }`) — cada niño puede tener su pareja de voces de podcast/quiz de voz
- **Tema por perfil** (`Profile.theme: 'dark' | 'light'`) — cambio automático al cambiar de perfil, persistido en el backend
- Proyectos vinculados a los perfiles mediante `profileId`
- Eliminación en cascada: eliminar un perfil borra todos sus proyectos

### Seguimiento de los costes de la API

Cada llamada a Mistral (chat, OCR, STT, TTS, moderación, agentes) está instrumentada para ofrecer una estimación € **transparente** al usuario — sin sorpresas en la facturación.

- **Fuente de verdad**: `helpers/pricing.ts` — `MODEL_PRICING` por prefijo de modelo (p. ej.: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` con URLs de la documentación de Mistral para re-scraping periódico
- **Unidades admitidas**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversión impulsada por `helpers/cost-calc.ts`
- **Cadena de instrumentación**: `helpers/tracked-client.ts` (wrap del cliente Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (inyección en la respuesta HTTP)
- **UI**: insignia de coste por generación (`src/partials/cost-badge-gen.html`), por fuente (`cost-badge-src.html`), total acumulado en el panel (`Project.totalCost`)
- **Endpoints**: las respuestas `/generate/*` y `/sources/*` decoran el objeto devuelto (Generation / Source) con `estimatedCost`, `usage` y `costBreakdown`. `POST /generate/route` añade un campo `costDelta: number` para el coste del enrutamiento por sí solo. `GET /projects/:pid` devuelve el proyecto enriquecido con `totalCost` (suma calculada a partir de `costLog[]`) + el historial completo

### TTS (Mistral Voxtral) y voces personalizadas

- **Mistral Voxtral TTS** : `voxtral-mini-tts-latest`, síntesis de voz 100% Mistral, no se necesita ninguna clave adicional
- **Voces personalizadas**: los padres pueden crear sus propias voces mediante la API Mistral Voices (a partir de una muestra de audio) y asignarlas a los roles de anfitrión/invitado — los podcasts y quizzes de voz se leen entonces con la voz de un padre, haciendo la experiencia aún más inmersiva para el niño
- Dos roles de voz configurables: **anfitrión** (narrador principal) e **invitado** (segunda voz del podcast)
- Catálogo completo de voces Mistral disponible en los ajustes, filtrable por idioma

### Internacionalización

- Interfaz disponible en 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Los prompts de IA admiten 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Idioma configurable por perfil

---

## Stack técnico

| Capa | Tecnología | Rol |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Servidor y seguridad de tipos |
| **Backend** | Express 5.x | API REST |
| **Servidor de desarrollo** | Vite 8.x (Rolldown) + tsx | HMR, partials de Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfaz reactiva, TypeScript compilado por Vite |
| **Templating** | vite-plugin-handlebars | Composición HTML mediante partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderación |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntesis de voz integrada |
| **Iconos** | Lucide 1.x | Biblioteca de iconos SVG |
| **Scraping web** | Readability + linkedom | Extracción del contenido principal de las páginas web (tecnología Firefox Reader View) |
| **Navegador headless** | Lightpanda | Navegador headless ultraligero (Zig + V8) para páginas JS/SPA — fallback de scraping |
| **Markdown** | Marked | Renderizado de markdown en el chat |
| **Carga de archivos** | Multer 2.x | Gestión de formularios multipart |
| **Audio** | ffmpeg-static | Concatenación de segmentos de audio |
| **Pruebas** | Vitest | Pruebas unitarias — cobertura medida por SonarCloud |
| **Persistencia** | Archivos JSON | Almacenamiento sin dependencias |

---

## Referencia de los modelos

| Modelo | Uso | Por qué |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos con huecos, Chat, Verificación de quiz de voz, Agent Image, Agent Web Search, Detección de consignas | Mejor multilingüe + seguimiento de instrucciones |
| `mistral-ocr-4-0` (OCR 4, predeterminado) | OCR de documentos — calidad superior | Texto impreso, tablas, escritura manuscrita ($4 / 1000 páginas) |
| `mistral-ocr-2512` (OCR 3, opcional) | OCR de documentos | Seleccionable en Ajustes, más barato ($2 / 1000 páginas) |
| `voxtral-mini-latest` | Reconocimiento de voz (STT) | STT multilingüe, optimizado con `language="fr"` |
| `voxtral-mini-tts-latest` | Síntesis de voz (TTS) | Podcasts, quiz de voz, lectura en voz alta |
| `mistral-moderation-2603` | Moderación de contenido | 5 categorías bloqueadas para niño/adolescente (incluida `jailbreaking`) |
| `mistral-small-latest` | Enrutador automático | Análisis rápido del contenido para decisiones de enrutamiento |

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
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Nota**: Mistral Voxtral TTS es el único proveedor TTS — no se necesita ninguna clave adicional más allá de `MISTRAL_API_KEY`.

> **Clave API introducida por el usuario**: `MISTRAL_API_KEY` ahora es **opcional**. Si no está presente, la aplicación arranca igualmente e invita a cada usuario a introducir **su propia clave Mistral** en la interfaz. La clave se **almacena en el navegador** (cifrada mediante Web Crypto + IndexedDB en un contexto seguro) y se envía por solicitud — **nunca se persiste en el servidor**. Precedencia: clave del perfil > clave global del navegador > `MISTRAL_API_KEY` (env). Definir `EUREKAI_REQUIRE_USER_KEY=true` obliga a cada usuario a proporcionar su clave (la clave de env solo sirve para las precargas).

> **HTTPS local (tableta/LAN)**: `localhost` ya es un contexto seguro. Para un acceso LAN (tableta), genera un certificado local y activa HTTPS para desbloquear el cifrado del navegador + cifrar la clave en tránsito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si está disponible, si no openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variables de entorno

| Variable | Requerido | Predeterminado | Rol |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcional | — | Clave API Mistral (chat, OCR, STT, TTS Voxtral, agentes, moderación). Si no está presente, el usuario introduce su clave en la app (almacenada en el navegador, nunca en el servidor) |
| `EUREKAI_REQUIRE_USER_KEY` | opcional | `false` | `true` → desactiva el fallback sobre `MISTRAL_API_KEY` para las solicitudes de IA (cada usuario DEBE proporcionar su clave). Útil en una instancia expuesta |
| `HTTPS_KEY` / `HTTPS_CERT` | opcional | — | Rutas de clave/cert TLS (cf. `scripts/gen-cert.sh`) → Express y Vite sirven en HTTPS (contexto seguro LAN/tableta) |
| `PORT` | opcional | `3000` | Puerto HTTP del backend Express |
| `NODE_ENV` | opcional | `development` | Si `production` → Express sirve el frontend desde `dist/` (si no `public/`) |
| `SONAR_TOKEN` | opcional CI | — | Utilizado solo por el flujo de trabajo GitHub Actions SonarCloud |

### Pruebas, calidad de código y contribución

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooks Git (Husky)**: `pre-commit` ejecuta `npm test`, `pre-push` ejecuta `npm run security`. Ambos bloquean el commit/push en caso de fallo.

**Herramientas externas requeridas (opcionalmente, pero usadas por `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Sin estas herramientas, `npm test` falla en `pretest` (lizard ausente) y `npm run security` falla (opengrep ausente). Los hooks husky bloquean entonces el commit/push.

---

## Despliegue con contenedor

La imagen se publica en **GitHub Container Registry**:

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=<your_api_key> \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** es un flag de Podman rootless que ajusta automáticamente los permisos del volumen.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## Estructura del proyecto

```
server.ts                 — Point d'entrée Express, monte les routes + config
config.ts                 — Config runtime (modèles, voix, modèle TTS), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
  generation-types.ts     — Types générables individuellement (SINGLE_GENERATE_TYPES, coïncide avec les 8 agents auto)
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (nombre configurable)
  quiz.ts                 — Quiz QCM (nombre configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
  dictation.ts            — Dictée : mots + phrases-exemples + règles, 1 audio TTS par mot (8e agent auto)
  podcast.ts              — Script podcast 2 voix
  quiz-vocal.ts           — Quiz vocal : questions TTS + réponses STT + vérification IA
  image.ts                — Génération d'image via Agent Mistral (outil image_generation)
  chat.ts                 — Tuteur IA par chat avec appel d'outils
  router.ts               — Routeur automatique (contenu → générateurs recommandés)
  consigne.ts             — Détection de consignes de révision
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
  tts.ts                  — Génération audio multi-voix (podcast + flashcards, concaténation de segments)
  stt.ts                  — Voxtral STT (audio → texte)
  websearch.ts            — Agent Mistral avec outil web_search (fallback)
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Import fichiers (OCR + texte brut), texte libre, voix STT, scraping URL + recherche web, modération
  generate.ts             — Endpoints de génération (8 types + auto + route)
  generations.ts          — Tentatives de quiz/fill-blank, réponses vocales, lecture à voix haute
  chat.ts                 — Chat IA avec appel d'outils

helpers/
  # IO & parsing
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  logger.ts               — Logger structuré (niveaux, contexte JSON)

  # Génération & UX
  auto-title.ts           — autoTitle(type, data, lang) : préfixe auto pour carte liste (Fiche, Note, Quiz, etc.)
  choice-labels.ts        — Labels localisés des choix (quiz, quiz-vocal) — 9 langues
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, `diversityParams` : temperature/presencePenalty/randomSeed)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  dictation-diff.ts       — Comparaison stricte lettre à lettre pour la correction de dictée (local, zéro coût IA)
  reading-comfort.ts      — Option « Confort de lecture » par profil (police Luciole, espacements) — partagé serveur/client
  ocr-models.ts           — Source de vérité sélection OCR (OCR 4 défaut / OCR 3 option) + normalizeOcrModel

  # Codes d'erreur stables
  error-codes.ts              — Re-export mince de l'API publique
  error-code-resolution.ts    — Orchestration extractErrorCode(e, agent) → FailedStepCode
  error-code-rules.ts         — Règles de mapping par agent/step
  error-matchers.ts           — Matchers par pattern d'erreur HTTP/LLM (délimités pour Lizard)

  # Cost tracking API (suivi coûts €)
  pricing.ts              — MODEL_PRICING + PRICING_SOURCES (tarifs Mistral par prefix de modèle)
  cost-calc.ts            — Conversion ApiUsage → coût € (tokens / characters / pages / audio-seconds)
  cost-persist.ts         — Écriture dans Project.costLog + totalCost
  cost-middleware.ts      — Injection de costDelta dans la réponse HTTP
  tracked-client.ts       — Wrap du client Mistral (capture ApiUsage automatiquement)
  usage-context.ts        — AsyncLocalStorage pour propager l'usage dans les pipelines async

  # Clé API Mistral & sécurité
  mistral-client-factory.ts — Source UNIQUE de construction du client Mistral (buildTrackedClient, resolveClient, requireKeyMiddleware)
  rate-limit.ts           — Rate-limiters Express (authLimiter, aiLimiter, generalLimiter)
  security-headers.ts     — Options Helmet / CSP (createHelmetOptions)
  redact.ts               — Redaction des secrets dans les logs (clé API, headers sensibles)
  mistral-retry.ts        — Retry avec backoff sur erreurs transitoires Mistral (3 tentatives)

  # Événements & notifications (SSE)
  event-bus.ts            — Bus d'événements de génération en mémoire (dispatch SSE, filet anti-uncaughtException)
  event-key.ts            — Clé d'événement typée partagée client/serveur (idempotence notifications)

  # Voix & profils
  voice-selection.ts      — selectVoices : rotation déterministe par profil + langue (host/guest)
  voice-types.ts          — Type MistralVoice (importable côté frontend sans embarquer le SDK Mistral)

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
    config.ts             — Interface de configuration (modèles, voix, modèle TTS)
    render.ts             — Helpers de rendu HTML
    i18n.ts               — Changement de langue
    ...
  components/
    quiz.ts               — Composant quiz interactif
    quiz-vocal.ts         — Composant quiz vocal
    fill-blank.ts         — Composant textes à trous
    fill-blank-validate.ts — Ré-export client de la validation textes à trous (validateAnswer)
    flashcards.ts         — Composant flashcards avec retournement
    dictation.ts          — Composant dictée interactif
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

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Para los contribuyentes de IA**: consultar [`CLAUDE.md`](CLAUDE.md) para el contexto arquitectónico detallado, las reglas obligatorias (anti-leak prompts, códigos de error, seguimiento de costes) y los problemas conocidos (Lizard CCN, Opengrep, migración Codacy/Semgrep).

---

## Referencia de la API

### Configuración
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/config` | Configuración actual |
| `PUT` | `/api/config` | Modificar la configuración (modelos, voz, modelo TTS) |
| `GET` | `/api/config/status` | Estado de las APIs: `mistral` (clave Mistral definida), `ttsAvailable` (alias de `mistral`, Mistral Voxtral es el único proveedor TTS) |
| `POST` | `/api/config/reset` | Restablecer la configuración predeterminada |
| `GET` | `/api/config/voices` | Listar las voces Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorías de moderación disponibles + valores predeterminados por edad |
| `POST` | `/api/providers/mistral/validate` | Validar una clave Mistral introducida por el usuario — siempre 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), sin fallback env |

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
| `GET` | `/api/projects/:pid/events` | Flujo SSE en tiempo real (`event: generation`) de las transiciones de generación (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Fuentes
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importar archivos multipart (OCR para JPG/PNG/PDF, lectura directa para TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Texto libre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voz STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL o búsqueda web `{query}` — devuelve un array de fuentes |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminar una fuente |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar las instrucciones de revisión |

### Generación
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de repaso |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Cuestionario QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos con huecos |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictado (palabras + frases de ejemplo + reglas, 1 audio TTS por palabra; también propuesto por el auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustración |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Repaso adaptativo `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Ficha de recuerdo centrada en las preguntas falladas de un quiz `{generationId, weakQuestions}` — llamada en paralelo a `quiz-review` por el botón «Entrenarme en mis errores» |
| `POST` | `/api/projects/:pid/generate/route` | Análisis de enrutamiento (plan de los generadores a lanzar) — devuelve `{plan, costDelta}` (coste del enrutamiento solo) |
| `POST` | `/api/projects/:pid/generate/auto` | Generación automática backend (enrutamiento + 8 tipos: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Ejecución en paralelo — supone un tier Mistral con rate-limit ≥ 8 solicitudes simultáneas; si no, varios 429 pueden remontar en `failedSteps`. |

Todas las rutas de generación aceptan `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` y `remediation-summary` exigen además `{generationId, weakQuestions}`.

### CRUD de generaciones
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar las respuestas del quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar las respuestas de textos con huecos `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Enviar las respuestas del dictado `{answers}` (puntuación estricta del servidor) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar una respuesta oral (audio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lectura TTS en voz alta (fichas/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancelar una generación en curso (única vía de cancelación de un pending) |
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
| **Persistencia en archivos JSON** | Cero dependencias, arranque instantáneo. No hace falta configurar ninguna base de datos: se arranca y listo. |
| **Vite + Handlebars** | Lo mejor de ambos mundos: HMR rápida para el desarrollo, partials HTML para organizar el código, Tailwind JIT. |
| **Prompts centralizados** | Todos los prompts de IA en `prompts.ts` — fácil de iterar, probar y adaptar por idioma/grupo de edad. |
| **Sistema multigeneración** | Cada generación es un objeto independiente con su propio ID — permite varias fichas, quizzes, etc. por curso. |
| **Prompts adaptados por edad** | 4 grupos de edad con vocabulario, complejidad y tono diferentes — el mismo contenido enseña de forma distinta según el alumno. |
| **Funcionalidades basadas en Agents** | La generación de imágenes y la búsqueda web usan Agents Mistral temporales — ciclo de vida propio con limpieza automática. |
| **Scraping inteligente de URL** | Un único campo acepta URLs y palabras clave mezcladas — las URLs se scrapean mediante Readability (páginas estáticas) con fallback Lightpanda (páginas JS/SPA), las palabras clave activan un Agent Mistral web_search. Cada resultado crea una fuente independiente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (sin clave adicional más allá de `MISTRAL_API_KEY`) — síntesis de voz integrada en la cadena de coste y en la resolución de voz por idioma. |

---

## Créditos y agradecimientos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactivo ligero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitario
- **[Vite](https://vitejs.dev)** — Herramienta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de iconos
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracción de contenido web (tecnología Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultraligero para el scraping de páginas JS/SPA
- **[Luciole](https://luciole-vision.com)** — Fuente diseñada para lectores con baja visión, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opción «Confort de lectura» de los perfiles)

Iniciado durante el Mistral AI Worldwide Hackathon (marzo de 2026), desarrollado íntegramente por IA con [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencia

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artículo traducido del fr al es con gpt-5.4-mini.**
