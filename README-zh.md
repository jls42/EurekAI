<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 标志" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任何内容转变为交互式学习体验 — 由 <a href="https://mistral.ai">Mistral AI</a> 提供动力。</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="质量门"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="安全评级"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="可靠性评级"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="可维护性评级"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="覆盖率"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="漏洞"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="代码异味"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="代码行数"></a>
</p>

---

## 背景 — 为什么是 EurekAI？

**EurekAI** 起源于 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。我需要一个主题 —— 想法来自非常实际的场景：我经常和我女儿一起准备考试，我觉得应该可以借助 AI 将这件事变得更有趣、更互动。

目标：接收 **任何输入** —— 课程照片、复制粘贴的文本、语音记录、网页搜索 —— 并将其转换为 **复习笔记、抽认卡、测验、播客、完形填空、插图等**。全部由 Mistral AI 的法语模型驱动，自然地适合法语学生使用。

[初始原型](https://github.com/jls42/worldwide-hackathon.mistral.ai) 在黑客松的 48 小时内完成，用作围绕 Mistral 服务的概念验证 —— 已能运行，但功能有限。此后，EurekAI 成为一个真正的项目：完形填空、练习内导航、网页抓取、可配置的家长审核、深入的代码审查等等。全部代码由 AI 生成 —— 主要通过 [Claude Code](https://code.claude.com/)，也有部分通过 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 提供。

---

## 功能

| | 功能 | 说明 |
|---|---|---|
| 📷 | **导入文件** | 导入课程资料 — 照片、PDF（通过 Mistral OCR）或文本文件（TXT、MD） |
| 📝 | **文本输入** | 直接键入或粘贴任何文本 |
| 🎤 | **语音输入** | 在浏览器录音 — Voxtral STT 转录您的语音 |
| 🌐 | **网页 / URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索（Agent Mistral web_search） |
| 📄 | **复习笔记** | 结构化笔记，包含要点、词汇、引用、趣闻 |
| 🃏 | **抽认卡** | 互动问答卡片，对话式音频播放 |
| ❓ | **选择题测验** | 多项选择题，带适应性错题复习（可配置题数） |
| ✏️ | **完形填空** | 填空练习，提供提示并允许容错校验 |
| 🎙️ | **播客** | 双声道迷你播客音频 — 默认 Mistral 语音或自定义语音（父母） |
| 🖼️ | **插图** | 由 Agent Mistral 生成的教育图片 |
| 🗣️ | **语音测验** | 题目语音播报（可自定义声音），口语回答，AI 校验 |
| 💬 | **AI 导师** | 可访问课程文档的上下文聊天，并能调用工具 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器分析内容，并在 7 种生成器中推荐组合 |
| 🔒 | **家长控制** | 可按配置文件自定义的内容审核（可定制分类）、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面支持 9 种语言；通过提示词实现 15 种语言的 AI 生成 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 或 ElevenLabs 听复习笔记与抽认卡（问答对话） |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构概览" width="800" />
</p>

---

## 模型用途分布图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型到任务映射" width="800" />
</p>

---

## 用户旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习旅程" width="800" />
</p>

---

## 深入探索 — 功能详解

### 多模态输入

EurekAI 接受 4 种类型的来源，按配置文件进行审核（默认为儿童和青少年启用）：

- **导入文件** — JPG、PNG 或 PDF 文件由 `mistral-ocr-latest` 处理（印刷文本、表格、手写），或直接导入文本文件（TXT、MD）。
- **自由文本** — 键入或粘贴任何内容。如启用审核，存储前将进行审核。
- **语音输入** — 在浏览器中录制音频。由 `voxtral-mini-latest` 转录。参数 `language="fr"` 优化识别。
- **网页 / URL** — 粘贴一个或多个 URL 以直接抓取内容（对 JS 页面使用 Readability + Lightpanda），或输入关键词通过 Agent Mistral 进行网页搜索。单一输入框同时接受两者 — URL 与关键词将被自动区分，每个结果都会创建独立来源。

### AI 内容生成

生成的七类学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习笔记** | `mistral-large-latest` | 标题、摘要、要点、词汇、引用、趣闻 |
| **抽认卡** | `mistral-large-latest` | 带来源引用的问答卡（可配置数量） |
| **选择题测验** | `mistral-large-latest` | 多项选择题、解析、适应性复习（可配置题数） |
| **完形填空** | `mistral-large-latest` | 带提示的填空句子、容错校验（Levenshtein） |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双声脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过工具 `image_generation` 生成的教育图片 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 朗读问题 → STT 语音回答 → AI 校验 |

### AI 聊天导师

一个可以访问课程文档的对话式导师：

- 使用 `mistral-large-latest`
- **调用工具**：可在对话中生成复习笔记、抽认卡、测验或完形填空
- 每门课程保留 50 条消息历史
- 如果为该配置文件启用，则对内容进行审核

### 自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并在 7 种可用生成器中推荐最合适的生成器。界面实时显示进度：先是分析阶段，然后是各个生成过程，可选择取消。

### 自适应学习

- **测验统计**：跟踪每题的尝试次数与正确率
- **测验复习**：生成 5-10 道针对薄弱概念的新题
- **指令检测**：识别复习指令（“如果我知道...我就知道我的课程”）并在兼容的文本生成器（复习笔记、抽认卡、测验、完形填空）中优先处理

### 安全与家长控制

- **4 个年龄组**：儿童 (≤10 岁)、青少年 (11–15)、学生 (16–25)、成人 (26+)
- **内容审核**：`mistral-moderation-latest`，提供 10 个分类，默认对儿童/青少年屏蔽 5 类（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。可在设置中为配置文件自定义分类。
- **家长 PIN**：使用 SHA-256 哈希，适用于 15 岁以下配置文件。生产部署建议使用带盐的慢哈希（Argon2id、bcrypt）。
- **聊天限制**：16 岁以下默认禁用 AI 聊天，父母可启用

### 多配置文件系统

- 多配置文件，包含姓名、年龄、头像、语言偏好
- 项目通过 `profileId` 与配置文件关联
- 级联删除：删除配置文件会删除其所有项目

### 多 TTS 提供商与自定义语音

- **Mistral Voxtral TTS**（默认）：`voxtral-mini-tts-latest`，无需额外密钥
- **ElevenLabs**（可选）：`eleven_v3`，自然语音，需 `ELEVENLABS_API_KEY`
- 可在应用设置中配置提供商
- **自定义语音**：父母可通过 Mistral Voices API（基于音频样本）创建自己的语音并分配为主持/嘉宾角色 — 播客和语音测验将使用父母的声音播放，使孩子的体验更具沉浸感
- 两个可配置的语音角色：**主持人**（主要叙述者）和 **嘉宾**（播客的第二声音）
- 完整的 Mistral 语音目录可在设置中查看，可按语言筛选

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 语言可按配置文件设置

---

## 技术栈

| 层 | 技术 | 角色 |
|---|---|---|
| **运行时** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **后端** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、代理 |
| **前端** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，TypeScript 由 Vite 编译 |
| **模板** | vite-plugin-handlebars | 通过 partials 组合 HTML |
| **AI** | Mistral AI SDK 2.x | 聊天、OCR、STT、TTS、Agents、审核 |
| **TTS（默认）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，集成语音合成 |
| **TTS（可选）** | ElevenLabs SDK 2.x | `eleven_v3`，自然语音 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主内容（类似 Firefox 阅读视图技术） |
| **无头浏览器** | Lightpanda | 超轻量无头浏览器（Zig + V8），用于 JS/SPA 页面 — 抓取回退方案 |
| **Markdown** | Marked | 聊天中的 Markdown 渲染 |
| **文件上传** | Multer 2.x | 处理 multipart 表单 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试 — 覆盖率由 SonarCloud 测量 |
| **持久化** | JSON 文件 | 无外部依赖的存储 |

---

## 模型参考

| 模型 | 用途 | 为什么 |
|---|---|---|
| `mistral-large-latest` | 复习笔记、抽认卡、播客、测验、完形填空、聊天、语音测验校验、图像 Agent、网页搜索 Agent、指令检测 | 最佳多语种支持 + 指令跟随能力 |
| `mistral-ocr-latest` | 文档 OCR | 印刷文本、表格、手写识别 |
| `voxtral-mini-latest` | 语音识别（STT） | 多语种 STT，使用 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、朗读 |
| `mistral-moderation-latest` | 内容审核 | 对儿童/青少年屏蔽 5 类（+ 防篡改） |
| `mistral-small-latest` | 自动路由器 | 快速分析内容以决定路由 |
| `eleven_v3` (ElevenLabs) | 语音合成（可选 TTS） | 自然语音、可配置替代方案 |

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

> **注意**：Mistral Voxtral TTS 为默认提供商 — 除了 `MISTRAL_API_KEY` 外无需额外密钥。ElevenLabs 为可在设置中配置的可选 TTS 提供商。

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

> **`:U`** 是一个 Podman rootless 标志，会自动调整卷的权限。
> **`ELEVENLABS_API_KEY`** 为可选项（可选 TTS）。

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
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 提供商） |
| `GET` | `/api/config/status` | API 状态（Mistral、ElevenLabs、TTS） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 声音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的审核分类 + 按年龄的默认值 |

### 配置文件
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有配置文件 |
| `POST` | `/api/profiles` | 创建配置文件 |
| `PUT` | `/api/profiles/:id` | 修改配置文件（<15 岁需 PIN） |
| `DELETE` | `/api/profiles/:id` | 删除配置文件 + 项目级联删除 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 | ### 来源
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入 multipart 文件（对 JPG/PNG/PDF 进行 OCR，对 TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 语音 STT（audio multipart） |
| `POST` | `/api/projects/:pid/sources/websearch` | 抓取 URL 或 网页搜索 `{query}` — 返回一个来源数组 |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源 |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令 |

### 生成
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习单 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 抽认卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 选择题测验（QCM） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（要启动的生成器计划） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 5 种类型：摘要、抽认卡、测验、填空、播客） |

所有生成路由都接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`。`quiz-review` 还需要 `{generationId, weakQuestions}`。

### 生成 CRUD
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验回答 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空题回答 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口语回答（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（复习单/抽认卡） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成项 |

### 聊天
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天历史 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 清除聊天历史 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **使用 Alpine.js 而非 React/Vue** | 体量最小，配合由 Vite 编译的 TypeScript 提供轻量响应性。非常适合对速度有要求的黑客马拉松。 |
| **使用 JSON 文件持久化** | 零依赖，瞬时启动。不需要配置数据库 —— 启动即可运行。 |
| **Vite + Handlebars** | 两者兼得：开发时快速的 HMR，使用 HTML partials 组织代码，Tailwind JIT。 |
| **提示语集中管理** | 所有 AI 提示语都在 `prompts.ts` 中 —— 易于迭代、测试并按语言/年龄组进行调整。 |
| **多生成系统** | 每个生成项都是具有自己 ID 的独立对象 —— 允许每门课程包含多张复习单、测验等。 |
| **按年龄适配的提示语** | 4 个年龄组，词汇、复杂度和语气不同 —— 相同内容根据学习者不同而以不同方式教授。 |
| **基于 Agents 的功能** | 图像生成和网络搜索使用临时的 Mistral Agents —— 生命周期管理良好并自动清理。 |
| **智能 URL 抓取** | 单一输入字段同时接受 URL 和关键词 —— URL 通过 Readability 抓取（静态页面），回退到 Lightpanda（JS/SPA 页面），关键词触发 Mistral Agent 的 web_search。每个结果都会创建独立来源。 |
| **多提供商 TTS** | 默认使用 Mistral Voxtral TTS（无需额外密钥），ElevenLabs 作为备选 —— 可配置且无需重启。 |

---

## 致谢与鸣谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、内容审核、Small）+ 全球黑客松
- **[ElevenLabs](https://elevenlabs.io)** — 备用语音合成引擎 (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 轻量响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用类 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（基于 Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面 的超轻量无头浏览器

本项目始于 Mistral AI 全球黑客松（2026 年 3 月），由 AI 全面开发，使用 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/)。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — 版权 (C) 2026 Julien LS

**本文件已使用 gpt-5-mini 模型将法语（fr）翻译为中文（zh）。有关翻译过程的更多信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

