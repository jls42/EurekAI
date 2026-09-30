<p align="center">
  <img src="public/assets/logo.webp" alt="Logotipo de EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforma cualquier contenido en una experiencia de aprendizaje interactiva, impulsada por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demostración de YouTube"></a>
</p>

<h4 align="center">📊 Calidad del código</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Umbral de calidad"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Calificación de seguridad"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Calificación de fiabilidad"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Calificación de mantenibilidad"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Cobertura"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilidades"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Malos olores de código"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Líneas de código"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Insignia de Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## La historia — ¿Por qué EurekAI?

**EurekAI** nació durante el [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([sitio oficial](https://worldwide-hackathon.mistral.ai/)) (marzo de 2026). Necesitaba un tema, y la idea surgió de algo muy concreto: preparo habitualmente los exámenes con mi hija y pensé que debía de ser posible hacer esa tarea más lúdica e interactiva gracias a la IA.

El objetivo: tomar **cualquier entrada** —una foto de la lección, un texto copiado y pegado, una grabación de voz, una búsqueda web— y transformarla en **fichas de estudio, flashcards, cuestionarios, podcasts, textos con espacios en blanco, ilustraciones y mucho más**. Todo ello impulsado por los modelos de Mistral AI, una empresa francesa, lo que convierte a EurekAI en una solución naturalmente adaptada al alumnado francófono.

El [prototipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) se diseñó en 48 horas durante el hackathon como prueba de concepto basada en los servicios de Mistral: ya era funcional, pero limitado. Desde entonces, EurekAI se ha convertido en un proyecto real: textos con espacios en blanco, navegación por los ejercicios, scraping web, moderación parental configurable, revisión exhaustiva del código y mucho más. Todo el código está generado por IA, principalmente [Claude Code](https://code.claude.com/), con algunas contribuciones mediante [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Vista previa

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Visita guiada de EurekAI: fuentes, ficha, cuestionario, flashcards e ilustraciones" width="820" />
</p>

| | |
|---|---|
| ![Panel de control](docs/screenshots/dashboard.webp)<br>**Panel de control** — generaciones recientes, coste estimado por tarjeta y total del proyecto, botón «Automático — ¡Magia!» | ![Fuentes](docs/screenshots/sources.webp)<br>**Fuentes** — importación de fotos/PDF/texto/voz/web, generación con un clic, detección de instrucciones |

Cada fuente importada muestra su [puntuación de confianza del OCR, su moderación y su coste estimado](docs/screenshots/sources-list.webp).

### Los componentes en acción

| | |
|---|---|
| ![Ficha de estudio](docs/screenshots/notes.gif)<br>**Ficha de estudio** — puntos clave, vocabulario, citas con fuentes, reproducción de audio por sección | ![Cuestionario](docs/screenshots/quiz.gif)<br>**Cuestionario de opción múltiple** — una sola respuesta correcta por pregunta, comentarios inmediatos con explicación, navegación paso a paso |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — tarjeta que se puede voltear y posterior autoevaluación «lo sabía / no lo sabía» | ![Textos con espacios en blanco](docs/screenshots/fillblank.gif)<br>**Textos con espacios en blanco** — pista a petición, validación tolerante |
| ![Dictado](docs/screenshots/dictation.gif)<br>**Dictado** — palabra dictada en audio, corrección estricta letra por letra | ![Cuestionario oral](docs/screenshots/vocal-quiz.gif)<br>**Cuestionario oral** — pregunta leída en voz alta, respuesta mediante el micrófono |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — minipodcast con 2 voces, guion dialogado disponible | ![Ilustraciones](docs/screenshots/illustrations.gif)<br>**Ilustraciones** — imágenes educativas generadas por un Agente |
| ![Tutor de IA](docs/screenshots/chat.gif)<br>**Tutor de IA** — chat basado en los documentos del curso, respuestas explicadas, puede generar cuestionarios y flashcards | |

### Primeros pasos

| | |
|---|---|
| ![Selección del perfil](docs/screenshots/login.gif)<br>**Selección del perfil** — cada niño tiene su espacio, su avatar y su idioma | ![Creación del perfil](docs/screenshots/profile-create.gif)<br>**Creación del perfil** — edad, avatar y PIN parental para menores de 15 años |
| ![Creación del curso](docs/screenshots/course.gif)<br>**Creación del curso** — un proyecto por lección, listo para recibir fuentes | ![Ajustes](docs/screenshots/settings.gif)<br>**Ajustes** — estado de la API, selección de modelos de IA con las tarifas mostradas |

---

## Funcionalidades

| | Funcionalidad | Descripción |
|---|---|---|
| 📷 | **Importación de archivos** | Importa tus lecciones: foto, PDF (mediante Mistral OCR con puntuación de confianza promediada, niveles `high`/`medium`/`low`) o archivo de texto (TXT, MD). Sesiones de upload con retry por archivo y progreso individual |
| 📝 | **Entrada de texto** | Escribe o pega cualquier texto directamente |
| 🎤 | **Entrada de voz** | Graba tu voz: Voxtral STT la transcribe |
| 🌐 | **Web / URL** | Pega una URL (scraping directo mediante Readability + Lightpanda) o escribe una búsqueda (Agent Mistral web_search) |
| 📄 | **Fichas de estudio** | Notas estructuradas con puntos clave, vocabulario, citas y anécdotas |
| 🃏 | **Flashcards** | Tarjetas interactivas de preguntas y respuestas, reproducción de audio dialogada |
| ❓ | **Cuestionarios de opción múltiple** | Preguntas con 4 opciones y una sola respuesta correcta, con revisión adaptativa de los errores (cantidad configurable) |
| ✏️ | **Textos con espacios en blanco** | Ejercicios para completar con pistas y validación tolerante |
| 🔤 | **Dictado** | Palabras dictadas en audio (Voxtral TTS) a partir de una lista importada, entrada mediante teclado, corrección estricta letra por letra con explicación de la regla ortográfica |
| 🎙️ | **Podcast** | Minipodcast con 2 voces en formato de audio: voces de Mistral de manera predeterminada o voces personalizadas (¡de los padres!) |
| 🖼️ | **Ilustraciones** | Imágenes educativas generadas por un Agent Mistral |
| 🗣️ | **Cuestionario oral** | Preguntas leídas en voz alta (con posibilidad de usar una voz personalizada), respuesta oral, verificación mediante IA |
| 💬 | **Tutor de IA** | Chat contextual con tus documentos del curso, con llamadas a herramientas |
| 🧠 | **Enrutador automático** | Un enrutador basado en `mistral-small-latest` analiza el contenido y propone una combinación de generadores entre los 8 tipos disponibles |
| 🔒 | **Control parental** | Moderación configurable por perfil (categorías personalizables), PIN parental, restricciones del chat |
| 🌍 | **Multilingüe** | Interfaz disponible en 9 idiomas; generación mediante IA controlable en 15 idiomas a través de los prompts |
| 🔊 | **Lectura en voz alta** | Escucha las fichas y flashcards (diálogo de pregunta y respuesta) mediante Mistral Voxtral TTS |
| 💶 | **Seguimiento de los costes de la API** | Estimación transparente del coste en euros de cada generación y fuente (tokens / caracteres / páginas / segundos de audio). Insignia por tarjeta + total por proyecto, visible en el panel de control |
| 🎨 | **Tema por perfil** | Cada perfil elige su tema `dark` o `light`: se guarda con el perfil y se vuelve a aplicar cada vez que se cambia de perfil |

---

## Vista general de la arquitectura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Vista general de la arquitectura" width="800" />
</p>

---

## Mapa de uso de los modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="Asignación de modelos de IA a tareas" width="800" />
</p>

---

## Recorrido del usuario

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Recorrido de aprendizaje del estudiante" width="800" />
</p>

---

## Análisis en profundidad — Funcionalidades

### Entrada multimodal

EurekAI admite 4 tipos de fuentes, moderadas según el perfil (la moderación está activada de manera predeterminada para los perfiles infantiles y adolescentes):

- **Importación de archivos** — Archivos JPG, PNG o PDF procesados mediante Mistral OCR: **OCR 4.1 (`mistral-ocr-4-1`) de manera predeterminada**, **OCR 3 (`mistral-ocr-2512`) como opción** en los Ajustes (más barato, aproximadamente la mitad del coste; lee mejor la escritura manuscrita), para texto impreso, tablas y escritura manuscrita; o archivos de texto (TXT, MD) importados directamente. Los uploads de varios archivos utilizan un sistema de **sesiones de upload**: progreso individual por archivo, retry del archivo que ha fallado sin volver a enviar los demás y dismiss de la sesión cuando finaliza. El OCR proporciona una **puntuación de confianza** promediada (`average`, limitada en `[0,1]`, calculada a partir de los `averagePageConfidenceScore` devueltos por Mistral), mostrada en la interfaz mediante una insignia de nivel `high` / `medium` / `low` (umbrales aproximados de 0.9 / 0.7), que advierte sin bloquear si el escaneo es de mala calidad. La copia del documento enviada a Mistral para el OCR se elimina en cuanto finaliza el procesamiento, incluso si se produce un error.
- **Texto libre** — Escribe o pega cualquier contenido. Se modera antes de almacenarse si la moderación está activa.
- **Entrada de voz** — Graba audio en el navegador. Se transcribe mediante `voxtral-mini-latest`. El parámetro `language="fr"` optimiza el reconocimiento.
- **Web / URL** — Pega una o varias URL para extraer directamente su contenido (Readability + Lightpanda para las páginas JS), o escribe palabras clave para realizar una búsqueda web mediante Agent Mistral. El campo único admite ambas opciones: las URL y las palabras clave se separan automáticamente y cada resultado crea una fuente independiente.

### Generación de contenido mediante IA

Ocho tipos de material de aprendizaje generado:

| Generador | Modelo | Salida |
|---|---|---|
| **Ficha de estudio** | `mistral-large-latest` | Título, resumen, puntos clave, vocabulario, citas, anécdota |
| **Flashcards** | `mistral-large-latest` | Tarjetas de preguntas y respuestas con referencias a las fuentes (cantidad configurable) |
| **Cuestionario de opción múltiple** | `mistral-large-latest` | Preguntas con 4 opciones y una sola respuesta correcta, explicaciones, revisión adaptativa (cantidad configurable) |
| **Textos con espacios en blanco** | `mistral-large-latest` | Frases para completar con pistas, validación tolerante (Levenshtein) |
| **Dictado** | `mistral-large-latest` + Voxtral TTS | Palabras clave dictadas en audio (1 MP3/palabra) → entrada mediante teclado → corrección estricta (olvidar una tilde cuenta como error) con explicación de la regla |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Guion con 2 voces → audio MP3 |
| **Ilustración** | Agent `mistral-large-latest` | Imagen educativa mediante la herramienta `image_generation` |
| **Cuestionario oral** | `mistral-large-latest` + Voxtral TTS + STT | Preguntas mediante TTS → respuesta mediante STT → verificación mediante IA |

### Tutor de IA por chat

Un tutor conversacional con acceso completo a los documentos del curso:

- Utiliza `mistral-large-latest`
- **Llamadas a herramientas**: puede generar fichas, flashcards, cuestionarios o textos con espacios en blanco durante la conversación
- Historial de 50 mensajes por curso
- Moderación si está activada para el perfil: se comprueba el mensaje, y las fuentes marcadas, aquellas cuya comprobación haya fallado y las que aún no se hayan comprobado se excluyen del contexto y de las herramientas (primero se vuelve a intentar la comprobación de las fuentes con errores o aún no verificadas, durante un máximo de 5 s)

### Enrutador automático

El enrutador utiliza `mistral-small-latest` para analizar el contenido de las fuentes y proponer los generadores más pertinentes entre los 8 disponibles. La interfaz muestra el progreso en tiempo real: primero una fase de análisis y, después, las generaciones individuales, que se pueden cancelar.

### Aprendizaje adaptativo

- **Estadísticas de los cuestionarios**: seguimiento de los intentos y de la precisión por pregunta
- **Revisión de cuestionarios**: genera entre 5 y 10 preguntas nuevas dirigidas a los conceptos más débiles a partir de las fuentes del cuestionario original (la protección de moderación se aplica a esas mismas fuentes)
- **Detección de instrucciones**: detecta las instrucciones de repaso («Me sé la lección si sé...») y les da prioridad en los generadores de texto compatibles (ficha, flashcards, cuestionarios, textos con espacios en blanco). Con la moderación activa, la detección espera a que se comprueben las fuentes y solo lee las consideradas seguras; la instrucción conserva la lista de sus fuentes originales: si alguna de ellas pasa a estar marcada, la instrucción no se muestra ni se aplica, y si se elimina alguna de ellas, la instrucción se borra. Su coste se contabiliza

### Seguridad y control parental

- **4 grupos de edad**: infantil (≤10 años), adolescente (11-15), estudiante (16-25), adulto (26+)
- **Moderación del contenido**: `mistral-moderation-2603` (Mistral Moderation 2) con 11 categorías disponibles, 6 bloqueadas de manera predeterminada para los nuevos perfiles infantiles/adolescentes (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` se añadió tras una evaluación de 50 lecciones, incluida historia, sin ningún falso positivo). Categorías personalizables por perfil en los ajustes; Moderation 2 dividió la antigua categoría «contenido peligroso» en `dangerous` + `criminal` (los perfiles existentes se migran automáticamente y las categorías bloqueadas también se aplican a las fuentes ya importadas). Seguridad predeterminada: si la respuesta del modelo no permite comprobar una categoría bloqueada, el contenido se rechaza («Moderación no disponible»); con la moderación activa, tanto la generación como el chat excluyen las fuentes marcadas, aquellas cuya comprobación haya fallado y las que estén en proceso de verificación. Una fuente que nunca se haya comprobado (importada cuando la moderación estaba desactivada o perteneciente a un proyecto antiguo vinculado a un perfil) se verifica antes de usarse. Una moderación interrumpida por un reinicio se reanuda al arrancar si la clave del servidor lo permite; de lo contrario, al igual que una moderación que haya producido un error, se reanuda al abrir el proyecto o en la siguiente generación. Un botón «Volver a comprobar» reinicia la verificación cuando se solicita. Con la moderación activa, mientras una fuente no se considere segura, su contenido permanece oculto para el menor (vista previa, texto, documento original); uno de los padres puede mostrarlo con su PIN para una única consulta. La respuesta oral del cuestionario se modera antes de verificarse. ID fechado fijado en `helpers/moderation-model.ts`: el alias `-latest`, obsoleto, ya no aparece en la API.
- **PIN parental**: hash SHA-256, obligatorio para los perfiles de menores de 15 años; como máximo 10 códigos incorrectos por cada cuarto de hora y por dirección IP (429 `rate_limited`). Para un despliegue en producción, debe utilizarse un hash lento con salt (Argon2id, bcrypt).
- **Datos del servidor**: `/output` solo publica los archivos multimedia de los proyectos (audio, imágenes, archivos importados); `profiles.json`, `config.json`, `projects.json` y los `project.json` nunca se sirven
- **Restricciones del chat**: chat de IA desactivado de manera predeterminada para menores de 16 años, que los padres pueden activar

### Sistema de múltiples perfiles

- Varios perfiles con nombre, edad, avatar y preferencias de idioma
- **Voces por perfil** (`Profile.mistralVoices?: { host?, guest? }` — cada rol es opcional): cada niño puede tener su propia pareja de voces para el podcast/cuestionario oral
- **Tema por perfil** (`Profile.theme: 'dark' | 'light'`): cambio automático al cambiar de perfil, guardado en el backend
- Proyectos vinculados a los perfiles mediante `profileId`; un proyecto antiguo sin perfil se vincula al primer perfil que lo abre y después se modera de acuerdo con dicho perfil
- Eliminación en cascada: al eliminar un perfil se eliminan todos sus proyectos
### Seguimiento de los costes de la API

Cada llamada facturable a Mistral (chat, OCR, STT, TTS, agentes), incluidas la detección de instrucciones y las respuestas orales del cuestionario de voz, está instrumentada para proporcionar al usuario una estimación en € **transparente**. La moderación, que es gratuita, no se contabiliza. Se incluyen los costes de las herramientas de los agentes: 0,03 $ por búsqueda web y 0,10 $ por imagen generada (tarifas de Mistral), además de los tokens producidos por estas herramientas, que la estimación contabiliza según la tarifa de entrada del modelo del agente.

- **Fuente de verdad**: `helpers/pricing.ts` — `MODEL_PRICING` por prefijo de modelo (p. ej.: `mistral-large` → entrada 0.5 €/M tokens, salida 1.5 €/M tokens), `PRICING_SOURCES` con URLs de la documentación de Mistral para una nueva extracción periódica
- **Unidades compatibles**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversión controlada por `helpers/cost-calc.ts`
- **Cadena de instrumentación**: `helpers/tracked-client.ts` (envuelve el cliente Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (inyección en la respuesta HTTP)
- **UI**: insignia de coste por generación (`src/partials/cost-badge-gen.html`), por fuente (`cost-badge-src.html`), total acumulado en el panel (`Project.totalCost`)
- **Endpoints**: las respuestas `/generate/*` y `/sources/*` enriquecen el objeto devuelto (`Generation` / `Source`) con `estimatedCost`, `usage` y `costBreakdown`. `POST /generate/route` añade un campo `costDelta: number` para el coste exclusivo del enrutamiento; `POST /detect-consigne` (`{consigne, costDelta}`) y la verificación de una respuesta oral también devuelven su `costDelta`. `GET /projects/:pid` devuelve el proyecto enriquecido con `totalCost` (suma calculada a partir de `costLog[]`) + el historial completo

### TTS (Mistral Voxtral) y voces personalizadas

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, síntesis de voz 100 % Mistral, sin necesidad de una clave adicional
- **Voces personalizadas**: los padres pueden crear sus propias voces mediante la API Mistral Voices (a partir de una muestra de audio) y asignarlas a los roles de anfitrión/invitado; los pódcast y cuestionarios de voz se reproducen entonces con la voz de uno de los padres, haciendo que la experiencia sea aún más inmersiva para el niño
- Dos roles de voz configurables: **anfitrión** (narrador principal) e **invitado** (segunda voz del pódcast)
- Catálogo completo de voces de Mistral disponible en los ajustes, filtrable por idioma

### Internacionalización

- Interfaz disponible en 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Los prompts de IA admiten 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Idioma configurable por perfil

---

## Stack tecnológico

| Capa | Tecnología | Función |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Servidor y seguridad de tipos |
| **Backend** | Express 5.x | API REST |
| **Servidor de desarrollo** | Vite 8.x (Rolldown) + tsx | HMR, parciales Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interfaz reactiva, TypeScript compilado por Vite |
| **Templating** | vite-plugin-handlebars | Composición HTML mediante parciales |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, moderación |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntesis de voz integrada |
| **Iconos** | Lucide 1.x | Biblioteca de iconos SVG |
| **Scraping web** | Readability + linkedom | Extracción del contenido principal de las páginas web (tecnología Firefox Reader View) |
| **Headless browser** | Lightpanda | Navegador headless ultraligero (Zig + V8) para páginas JS/SPA — fallback de scraping |
| **Markdown** | Marked | Renderizado de Markdown en el chat |
| **Envío de archivos** | Multer 2.x | Gestión de formularios multipart |
| **Audio** | ffmpeg-static | Concatenación de segmentos de audio |
| **Pruebas** | Vitest | Pruebas unitarias — cobertura medida por SonarCloud |
| **Persistencia** | Archivos JSON | Almacenamiento sin dependencias |

---

## Referencia de los modelos

| Modelo | Uso | Motivo |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Pódcast, Cuestionario, Textos con huecos, Chat, Verificación del cuestionario de voz, Agente de imágenes, Agente de búsqueda web, Detección de instrucciones | Mejor compatibilidad multilingüe + seguimiento de instrucciones |
| `mistral-ocr-4-1` (OCR 4.1, predeterminado) | OCR de documentos | Texto impreso, tablas, escritura manuscrita ($4 / 1000 páginas) |
| `mistral-ocr-2512` (OCR 3, opcional) | OCR de documentos | Seleccionable en Ajustes, más barato ($2 / 1000 páginas), lee mejor la escritura manuscrita |
| `voxtral-mini-latest` | Reconocimiento de voz (STT) | STT multilingüe, optimizado con `language="fr"` |
| `voxtral-mini-tts-latest` | Síntesis de voz (TTS) | Pódcast, cuestionarios de voz, lectura en voz alta |
| `mistral-moderation-2603` | Moderación de contenido | 6 categorías bloqueadas para niños/adolescentes (incluida `jailbreaking`) |
| `mistral-small-latest` | Enrutador automático | Análisis rápido del contenido para tomar decisiones de enrutamiento |

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

> **Nota**: Mistral Voxtral TTS es el único proveedor de TTS; no se necesita ninguna clave adicional aparte de `MISTRAL_API_KEY`.

> **Clave API introducida por el usuario**: `MISTRAL_API_KEY` ahora es **opcional**. Si no está presente, la aplicación se inicia de todos modos e invita a cada usuario a introducir **su propia clave de Mistral** en la interfaz. La clave se **almacena en el navegador** (cifrada mediante Web Crypto + IndexedDB en un contexto seguro) y se envía con cada solicitud; **nunca se conserva en el servidor**. Precedencia: clave del perfil > clave global del navegador > `MISTRAL_API_KEY` (entorno). Definir `EUREKAI_REQUIRE_USER_KEY=true` obliga a cada usuario a proporcionar su clave (la clave del entorno solo se utiliza para las precargas).

> **HTTPS local (tableta/LAN)**: `localhost` ya es un contexto seguro. Para acceder mediante LAN (tableta), genera un certificado local y activa HTTPS: así, el navegador puede cifrar la clave que almacena y esta queda cifrada durante su tránsito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variables de entorno

| Variable | Obligatoria | Valor predeterminado | Función |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcional | — | Clave API de Mistral (chat, OCR, STT, TTS Voxtral, agentes, moderación). Si no está presente, el usuario introduce su clave en la aplicación (almacenada en el navegador, nunca en el servidor) |
| `EUREKAI_REQUIRE_USER_KEY` | opcional | `false` | `true` → desactiva el fallback a `MISTRAL_API_KEY` para las solicitudes de IA (cada usuario DEBE proporcionar su clave). Útil en una instancia expuesta |
| `HTTPS_KEY` / `HTTPS_CERT` | opcional | — | Rutas de la clave/certificado TLS (véase `scripts/gen-cert.sh`) → Express y Vite sirven mediante HTTPS (contexto seguro LAN/tableta) |
| `PORT` | opcional | `3000` | Puerto HTTP del backend Express |
| `NODE_ENV` | opcional | `development` | Si `production` → Express sirve el frontend desde `dist/` (de lo contrario, `public/`) |
| `SONAR_TOKEN` | opcional para CI | — | Utilizado únicamente por el workflow de GitHub Actions de SonarCloud |

### Pruebas, calidad del código y contribución

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooks de Git (Husky)**: `pre-commit` encadena `scripts/pre-commit-fast.sh` (conflictos, archivos grandes, shellcheck), `lint-staged` y luego `npm test`; `pre-push` ejecuta primero un control bloqueante `npm audit` (bloquea en cuanto una dependencia, incluso transitiva, presenta una vulnerabilidad de nivel `critical`; véase `scripts/audit-verdict.mjs`) y después `npm run security`. Cada hook bloquea el commit/push en cuanto falla uno de sus pasos.

**Herramientas externas (opcionales para ejecutar la aplicación, indispensables para `pretest` y `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Sin estas herramientas, `npm test` falla en `pretest` (lizard no está instalado) y `npm run security` falla (opengrep no está instalado). Los hooks de Husky bloquean entonces el commit/push.

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

> **`:U`**: flag de Podman rootless que ajusta automáticamente los permisos del volumen.

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
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, tryParseJson, retryTurns, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  generation-media.ts     — Noms uniques des médias (MP3/PNG) et suppression avec leur génération
  media-ledger.ts         — Médias écrits pendant une génération, supprimés si elle échoue ou est annulée
  keyed-lock.ts           — File d'attente par clé (OCR sérialisé par contenu)
  logger.ts               — Logger structuré (niveaux, contexte JSON)

  # Génération & UX
  auto-title.ts           — autoTitle(type, data, lang) : préfixe auto pour carte liste (Fiche, Note, Quiz, etc.)
  choice-labels.ts        — Labels localisés des choix (quiz, quiz-vocal) — 9 langues
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, `diversityParams` : temperature/presencePenalty/randomSeed)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  dictation-diff.ts       — Comparaison stricte lettre à lettre pour la correction de dictée (local, zéro coût IA)
  reading-comfort.ts      — Option « Confort de lecture » par profil (police Luciole, espacements) — partagé serveur/client
  ocr-models.ts           — Source de vérité sélection OCR (OCR 4 défaut / OCR 3 option) + normalizeOcrModel
  moderation-model.ts     — Modèle de modération épinglé + ses 11 catégories + migration des catégories legacy
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours), statut effectif, garde de la consigne
  moderation-profile.ts   — Profil propriétaire du projet et catégories actives (source unique des routes)
  source-moderation.ts    — Modérations en vol et reprise (démarrage, génération, chat, « Revérifier »)
  input-moderation.ts     — Modération d'un texte saisi ou dicté (texte libre, recherche web, réponse orale)
  chat-sources.ts         — Sources accessibles au chat (sans les sources non vérifiées si la modération est active)

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
  rate-limit.ts           — Rate-limiters Express (authLimiter, pinLimiter, aiLimiter / aiPathLimiter, generalLimiter), 429 `rate_limited`
  request-validation.ts   — Validation de lang / ageGroup sur toutes les routes IA (400 invalid_input)
  output-static.ts        — Liste blanche du montage statique /output (médias des projets seulement)
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
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
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
docs/                     — Notes internes (inventaire prompts, audits, prompts des diagrammes) + screenshots du README
scripts/                  — Tooling : check-deps, check-models, check-security, check-complexity, gen-cert, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Para los agentes de IA que contribuyen al código**: consultar [`CLAUDE.md`](CLAUDE.md) para conocer el contexto detallado de la arquitectura, las reglas obligatorias (códigos de error, seguimiento de costes y prompts sin palabras meta, es decir, sin calificativos del documento como su tipo, porque el modelo copiaría esas palabras en sus resultados) y los problemas conocidos (Lizard CCN, Opengrep, migración de Codacy/Semgrep).

---

## Referencia de la API

### Configuración
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/config` | Configuración actual |
| `PUT` | `/api/config` | Modificar la configuración (modelos, voces, modelo TTS) |
| `GET` | `/api/config/status` | Estado de las API: `mistral` (clave de Mistral definida), `ttsAvailable` (alias de `mistral`, Mistral Voxtral es el único proveedor de TTS) |
| `POST` | `/api/config/reset` | Restablecer la configuración predeterminada |
| `GET` | `/api/config/voices` | Enumerar las voces de Mistral TTS (`?lang=fr` opcional) |
| `GET` | `/api/moderation-categories` | Categorías de moderación disponibles + valores predeterminados por edad |
| `POST` | `/api/providers/mistral/validate` | Validar una clave de Mistral introducida por el usuario — siempre 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), sin fallback al entorno |

### Perfiles
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/profiles` | Enumerar todos los perfiles |
| `POST` | `/api/profiles` | Crear un perfil |
| `PUT` | `/api/profiles/:id` | Modificar un perfil (PIN obligatorio para menores de 15 años; 10 PIN incorrectos / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Eliminar un perfil + eliminación en cascada de proyectos `{pin?}` → `{ok, deletedProjects}` |

### Proyectos
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/projects` | Enumerar los proyectos (`?profileId=` opcional) |
| `POST` | `/api/projects` | Crear un proyecto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalles del proyecto; `?profileId=` vincula un proyecto sin perfil al perfil que lo abre |
| `PUT` | `/api/projects/:pid` | Cambiar el nombre de `{name}` |
| `DELETE` | `/api/projects/:pid` | Eliminar el proyecto |
| `GET` | `/api/projects/:pid/events` | Flujo SSE en tiempo real (`event: generation`) de las transiciones de generación (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Fuentes
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importar archivos multipart (OCR para JPG/PNG/PDF, lectura directa para TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Texto libre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voz STT (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL o búsqueda web `{query}` — devuelve una matriz de fuentes; 422 `url_blocked` si se rechazan todas las direcciones (red interna), 502 `all_sources_failed` si no se ha podido crear ninguna fuente |
| `POST` | `/api/projects/:pid/sources/moderate` | Reanudar las moderaciones pendientes o con errores `{sourceIds?}` (como máximo 10 por llamada, espera ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminar una fuente, su archivo importado y la instrucción que depende de ella → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar las instrucciones de repaso (solo fuentes verificadas) → `{consigne, costDelta}` |

### Generación
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de repaso |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Cuestionario de opción múltiple (4 opciones, una sola respuesta correcta) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos con huecos |
| `POST` | `/api/projects/:pid/generate/dictation` | Dictado (palabras + frases de ejemplo + reglas, 1 audio TTS por palabra; también propuesto por el enrutador automático) |
| `POST` | `/api/projects/:pid/generate/podcast` | Pódcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustración |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Cuestionario de voz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Repaso adaptativo `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Ficha de recordatorio centrada en las preguntas falladas de un cuestionario `{generationId, weakQuestions}` — llamada en paralelo con `quiz-review` mediante el botón de refuerzo de la vista del cuestionario |
| `POST` | `/api/projects/:pid/generate/route` | Análisis de enrutamiento (plan de los generadores que se ejecutarán) — devuelve `{plan, costDelta}` (coste exclusivo del enrutamiento) |
| `POST` | `/api/projects/:pid/generate/auto` | Generación automática en el backend (enrutamiento + 8 tipos: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Ejecución en paralelo — presupone un tier de Mistral con rate-limit ≥ 8 solicitudes simultáneas; de lo contrario, pueden aparecer varios errores 429 en `failedSteps`. |

Todas las rutas de generación aceptan `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; un `ageGroup` desconocido o un `lang` que no sea un código de idioma válido (esperado: `fr`, `pt-BR`…) → 400 `invalid_input`, antes de cualquier llamada a la IA. `quiz-review` y `remediation-summary` requieren además `{generationId, weakQuestions}` y se aplican a las fuentes del cuestionario original.

### CRUD de generaciones
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar las respuestas del cuestionario `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar las respuestas de los textos con huecos `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Enviar las respuestas del dictado `{answers}` (puntuación estricta del servidor) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar una respuesta oral (audio + questionIndex); la respuesta oral se modera antes de verificarse (rechazo: 400 `quiz.answerBlocked`), coste devuelto en `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Lectura TTS en voz alta (fichas/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancelar una generación en curso (única vía para cancelar una generación pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Cambiar el nombre de `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Eliminar la generación y sus archivos multimedia (audio, imagen) |

### Chat
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperar el historial del chat |
| `POST` | `/api/projects/:pid/chat` | Enviar un mensaje `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Borrar el historial del chat |

---

## Decisiones arquitectónicas

| Decisión | Justificación |
|---|---|
| **Alpine.js en lugar de React/Vue** | Huella mínima, reactividad ligera con TypeScript compilado por Vite. Perfecto para un hackathon en el que la velocidad es importante. |
| **Persistencia en archivos JSON** | Cero dependencias, inicio instantáneo. No hay que configurar ninguna base de datos: se inicia y listo. |
| **Vite + Handlebars** | Lo mejor de ambos mundos: HMR rápido para el desarrollo, parciales HTML para organizar el código, Tailwind JIT. |
| **Prompts centralizados** | Todos los prompts de IA en `prompts.ts` — fáciles de iterar, probar y adaptar por idioma/grupo de edad. |
| **Sistema de múltiples generaciones** | Cada generación es un objeto independiente con su propio ID, lo que permite varias fichas, cuestionarios, etc. por curso. |
| **Prompts adaptados por edad** | 4 grupos de edad con vocabulario, complejidad y tono diferentes: el mismo contenido se enseña de forma distinta según el alumno. |
| **Funcionalidades basadas en Agents** | La generación de imágenes y la búsqueda web utilizan Agents temporales de Mistral — ciclo de vida limpio con eliminación automática. |
| **Scraping inteligente de URL** | Un único campo acepta URLs y palabras clave mezcladas: las URLs se extraen mediante Readability (páginas estáticas) con fallback a Lightpanda (páginas JS/SPA), y las palabras clave activan un Agent Mistral web_search. Cada resultado crea una fuente independiente. |
| **TTS 100 % Mistral** | Mistral Voxtral TTS (sin clave adicional aparte de `MISTRAL_API_KEY`) — síntesis de voz integrada en la cadena de costes y en la selección de voces por idioma. |

---
## Créditos y agradecimientos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reactivo ligero
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS de utilidades
- **[Vite](https://vitejs.dev)** — Herramienta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de iconos
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extracción de contenido web (tecnología Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultraligero para el scraping de páginas JS/SPA
- **[Luciole](https://luciole-vision.com)** — Fuente diseñada para lectores con discapacidad visual, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opción «Comodidad de lectura» de los perfiles)

Iniciado durante el Mistral AI Worldwide Hackathon (marzo de 2026), desarrollado íntegramente mediante IA con [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) y [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licencia

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artículo traducido del fr al es con gpt-5.6-sol.**
