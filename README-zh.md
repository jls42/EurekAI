<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任何内容转化为互动式学习体验——由 <a href="https://mistral.ai">Mistral AI</a> 驱动。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube 演示"></a>
</p>

<h4 align="center">📊 代码质量</h4>

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
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 故事——为什么选择 EurekAI？

**EurekAI** 诞生于 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。我需要一个选题——灵感来自非常具体的一件事：我经常和女儿一起准备测验，我就想到，或许可以借助 AI 让这件事变得更有趣、更互动。

目标是：接收**任何输入**——一张课文照片、一段复制粘贴的文本、一个语音录音、一次网页搜索——并将其转化为**复习卡片、闪卡、测验、播客、填空练习、插图**等等。全部由 Mistral AI 的法语模型驱动，这使它天然适合讲法语的学生。

最初的[原型](https://github.com/jls42/worldwide-hackathon.mistral.ai)是在黑客松期间 48 小时内围绕 Mistral 服务制作的概念验证——当时已经可用，但功能有限。自那以后，EurekAI 已经成长为一个真正的项目：填空练习、练习导航、网页抓取、可配置的家长监管、深入的代码审查，等等。整套代码都由 AI 生成——主要是 [Claude Code](https://code.claude.com/)，并辅以 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 的部分贡献。

---

## 功能

| | 功能 | 描述 |
|---|---|---|
| 📷 | **文件导入** | 导入你的课文——照片、PDF（通过带置信度分数的 Mistral OCR）或文本文件（TXT、MD） |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 录制你的声音——Voxtral STT 会将其转写 |
| 🌐 | **Web / URL** | 粘贴一个 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索内容（Mistral web_search Agent） |
| 📄 | **复习卡片** | 结构化笔记，包含关键点、词汇、引文、趣闻轶事 |
| 🃏 | **闪卡** | 交互式问答卡，带对话式音频朗读 |
| ❓ | **MCQ 测验** | 多项选择题，带错误自适应复习（数量可配置） |
| ✏️ | **填空练习** | 带提示和容错校验的补全练习 |
| 🎙️ | **播客** | 双人 2 声音频迷你播客——默认 Mistral 声音或自定义声音（家长！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育图像 |
| 🗣️ | **语音测验** | 题目语音朗读（可用自定义声音）、口头回答、AI 校验 |
| 💬 | **AI 导师** | 与你的课程文档进行上下文聊天，并支持工具调用 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器分析内容，并在 7 种可用类型中建议一种生成器组合 |
| 🔒 | **家长控制** | 按配置文件进行可配置的审核（可自定义类别）、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面支持 9 种语言；AI 生成可通过提示词控制为 15 种语言 |
| 🔊 | **语音朗读** | 通过 Mistral Voxtral TTS 或 ElevenLabs 听取复习卡和闪卡（问答对话） |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## 模型使用映射图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## 用户旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 深入了解——功能

### 多模态输入

EurekAI 接受 4 种来源，按配置文件进行审核（儿童和青少年默认启用）：

- **文件导入** — JPG、PNG 或 PDF 文件由 `mistral-ocr-latest` 处理（印刷文本、表格、手写），或直接导入文本文件（TXT、MD）。
- **自由文本** — 直接输入或粘贴任意内容。若审核启用，则在存储前进行审核。
- **语音输入** — 在浏览器中录制音频。由 `voxtral-mini-latest` 转写。`language="fr"` 参数可优化识别。
- **Web / URL** — 粘贴一个或多个 URL 以直接抓取内容（对 JS 页面使用 Readability + Lightpanda），或输入关键词通过 Mistral Agent 进行网页搜索。单一输入框同时接受两者——URL 和关键词会自动分离，每个结果都会创建一个独立来源。

### AI 内容生成

生成七种学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习卡片** | `mistral-large-latest` | 标题、摘要、要点、词汇、引文、趣闻轶事 |
| **闪卡** | `mistral-large-latest` | 带来源引用的问答卡（数量可配置） |
| **MCQ 测验** | `mistral-large-latest` | 多项选择题、解释、自适应复习（数量可配置） |
| **填空练习** | `mistral-large-latest` | 带提示、容错校验（Levenshtein）的补全句子 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人脚本 → MP3 音频 |
| **插图** | `mistral-large-latest` Agent | 通过 `image_generation` 工具生成教育图像 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 题目 → STT 回答 → AI 校验 |

### 通过聊天的 AI 导师

一个可对课程文档进行完整访问的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话中生成复习卡、闪卡、测验或填空练习
- 每门课程保留 50 条消息历史
- 若配置文件启用了审核，则进行内容审核

### 自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并在 7 种可用生成器中推荐最相关的选项。界面会显示实时进度：首先是分析阶段，然后是各个独立生成过程，并支持取消。

### 自适应学习

- **测验统计**：跟踪每道题的尝试次数和准确率
- **测验复习**：生成 5-10 道针对薄弱概念的新题目
- **指令检测**：检测复习指令（“如果我知道……，就说明我会这课”），并在兼容的文本生成器（复习卡、闪卡、测验、填空练习）中优先处理

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11-15 岁）、学生（16-25 岁）、成人（26+）
- **内容审核**：`mistral-moderation-latest`，提供 10 个可用类别，默认对儿童/青少年屏蔽 5 类（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。类别可在设置中按配置文件自定义。
- **家长 PIN**：SHA-256 哈希，15 岁以下配置文件需要。用于生产部署时，建议使用带盐的慢哈希（Argon2id、bcrypt）。
- **聊天限制**：16 岁以下默认禁用 AI 聊天，可由家长启用

### 多配置文件系统

- 多个配置文件，包含姓名、年龄、头像、语言偏好
- 通过 `profileId` 将项目与配置文件关联
- 级联删除：删除一个配置文件会删除其所有项目

### 多供应商 TTS 与自定义声音

- **Mistral Voxtral TTS**（默认）：`voxtral-mini-tts-latest`，无需额外密钥
- **ElevenLabs**（替代）：`eleven_v3`，自然音色，需要 `ELEVENLABS_API_KEY`
- 可在应用设置中配置提供商
- **自定义声音**：家长可通过 Mistral Voices API（基于音频样本）创建自己的声音，并分配给主持人/嘉宾角色——此时播客和语音测验会使用家长的声音朗读，让孩子的体验更具沉浸感
- 两个可配置的语音角色：**主持人**（主要叙述者）和**嘉宾**（播客的第二个声音）
- 设置中提供完整的 Mistral 声音目录，可按语言筛选

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 每个配置文件可单独设置语言

---

## 技术栈

| 层 | 技术 | 角色 |
|---|---|---|
| **运行时** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **后端** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x（Rolldown）+ tsx | HMR、Handlebars 部件、代理 |
| **前端** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，TypeScript 由 Vite 编译 |
| **模板** | vite-plugin-handlebars | 通过部件组合 HTML |
| **AI** | Mistral AI SDK 2.x | 聊天、OCR、STT、TTS、Agent、审核 |
| **TTS（默认）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，内置语音合成 |
| **TTS（替代）** | ElevenLabs SDK 2.x | `eleven_v3`，自然音色 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主要内容（Firefox Reader View 技术） |
| **无头浏览器** | Lightpanda | 超轻量无头浏览器（Zig + V8），用于 JS/SPA 页面——抓取回退 |
| **Markdown** | Marked | 聊天中的 markdown 渲染 |
| **文件上传** | Multer 2.x | multipart 表单处理 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试——覆盖率由 SonarCloud 测量 |
| **持久化** | JSON 文件 | 无依赖存储 |

---

## 模型参考

| 模型 | 用途 | 原因 |
|---|---|---|
| `mistral-large-latest` | 复习卡、闪卡、播客、测验、填空练习、聊天、语音测验校验、图像 Agent、Web 搜索 Agent、指令检测 | 最佳多语言能力 + 指令跟随 |
| `mistral-ocr-latest` | 文档 OCR | 印刷文本、表格、手写 |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，结合 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、语音朗读 |
| `mistral-moderation-latest` | 内容审核 | 为儿童/青少年屏蔽 5 类（+ 越狱） |
| `mistral-small-latest` | 自动路由器 | 快速分析内容以作出路由决策 |
| `eleven_v3`（ElevenLabs） | 语音合成（替代 TTS） | 自然音色，可配置替代方案 |

---

## 快速开始

```bash
# Cloner le dépôt
git clone https://github.com/jls42/EurekAI.git
cd EurekAI

# Installer les dépendances
npm install

# Configurer les clés API
cp .env.example .env
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=<your_api_key>           (requis)
#   ELEVENLABS_API_KEY=<your_api_key>        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注**：Mistral Voxtral TTS 是默认提供商——除 `MISTRAL_API_KEY` 外无需额外密钥。ElevenLabs 是可在设置中配置的替代 TTS 提供商。

---

## 使用容器部署

镜像已发布到 **GitHub Container Registry**：

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=<your_api_key> \
  -e ELEVENLABS_API_KEY=<your_api_key> \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** 是一个 Podman rootless 标志，可自动调整卷权限。
> **`ELEVENLABS_API_KEY`** 为可选项（替代 TTS）。

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## 项目结构

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
  tts.ts                  — Génération audio multi-voix (podcast + flashcards, concaténation de segments)
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

## API 参考

### 配置
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、声音、TTS 提供商） |
| `GET` | `/api/config/status` | API 状态（Mistral、ElevenLabs、TTS） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 声音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的审核类别 + 按年龄默认值 |

### 配置文件
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有配置文件 |
| `POST` | `/api/profiles` | 创建配置文件 |
| `PUT` | `/api/profiles/:id` | 修改配置文件（15 岁以下需 PIN） |
| `DELETE` | `/api/profiles/:id` | 删除配置文件 + 级联删除项目 `{pin?}` → `{ok, deletedProjects}` | ### 项目
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |

### 数据源
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入 multipart 文件（JPG/PNG/PDF 使用 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 语音 STT（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | 爬取 URL 或网络搜索 `{query}` — 返回一个数据源数组 |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除一个数据源 |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令 |

### 生成
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习卡片 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 闪卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 选择题测验 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（要启动的生成器计划） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 7 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image）。并行执行——假设 Mistral 套餐的速率限制 ≥ 7 个并发请求；否则可能会在 `failedSteps` 中返回多个 429。 |

所有生成路由都接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`。`quiz-review` 还额外需要 `{generationId, weakQuestions}`。

### 生成 CRUD
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口语回答（音频 + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | 大声朗读 TTS（笔记/闪卡） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成内容 |

### 聊天
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天历史 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 清空聊天历史 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **采用 Alpine.js 而不是 React/Vue** | 占用极小，借助 Vite 编译的 TypeScript 实现轻量响应式。非常适合速度优先的黑客松场景。 |
| **使用 JSON 文件持久化** | 零依赖，启动即用。无需配置数据库——启动后即可开始。 |
| **Vite + Handlebars** | 两全其美：开发时 HMR 快速，HTML partials 便于组织代码，Tailwind JIT。 |
| **集中式提示词** | 所有 AI 提示词都在 `prompts.ts` 中——便于按语言/年龄组迭代、测试和调整。 |
| **多生成系统** | 每个生成项都是一个独立对象，拥有自己的 ID——允许同一课程生成多份笔记、测验等。 |
| **按年龄适配提示词** | 4 个年龄组，词汇、复杂度和语气不同——相同内容会根据学习者以不同方式讲授。 |
| **基于 Agents 的功能** | 图像生成和网络搜索使用临时 Mistral Agents——具有自动清理的独立生命周期。 |
| **智能 URL 爬取** | 单一输入框可同时接受 URL 和关键词混合输入——URL 通过 Readability 爬取（静态页面），必要时回退到 Lightpanda（JS/SPA 页面），关键词会触发一个 Mistral web_search Agent。每个结果都会创建一个独立的数据源。 |
| **多提供商 TTS** | 默认使用 Mistral Voxtral TTS（无需额外密钥），也可切换到 ElevenLabs——无需重启即可配置。 |

---

## 致谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 替代语音合成引擎 (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 轻量响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用型 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于 JS/SPA 页面爬取的超轻量 headless 浏览器

始于 Mistral AI Worldwide Hackathon（2026 年 3 月），由 AI 借助 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 全程开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**该文档已使用 gpt-5.4-mini 模型从 fr 版本翻译为 zh 语言。有关翻译过程的更多信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

