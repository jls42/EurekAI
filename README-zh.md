<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任何内容转换为交互式学习体验 — 由 AI 驱动。</strong>
</p>

<p align="center">
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-Worldwide%20Hackathon-FF7000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" alt="Mistral AI Hackathon"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-6%20Modèles-FF7000?style=for-the-badge" alt="Mistral AI"></a>
  <a href="https://elevenlabs.io"><img src="https://img.shields.io/badge/ElevenLabs-TTS%20alternatif-000000?style=for-the-badge" alt="ElevenLabs"></a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI">▶️ 在 YouTube 上观看演示</a> · <a href="README-en.md">🇬🇧 阅读英文版</a>
</p>

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

## 故事 — 为什么 EurekAI？

**EurekAI** 起源于 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。我需要一个题目 —— 灵感来自非常实际的需求：我经常和女儿一起准备测验，我想借助 AI 将复习过程变得更有趣、更互动。

目标：接收 **任何输入** —— 教材照片、复制粘贴的文本、语音录音、网络搜索 —— 并将其转换为 **复习资料、抽认卡、测验、播客、填空题、插图等**。全部由 Mistral AI 的法国模型驱动，因此对法语学生来说天然友好。

每一行代码都是在黑客松期间编写的。所有 API 与开源库均按照黑客松规则使用。

---

## 功能

| | 功能 | 描述 |
|---|---|---|
| 📷 | **上传 OCR** | 拍摄教材或笔记的照片 — Mistral OCR 提取内容 |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 录音 — Voxtral STT 转录你的语音 |
| 🌐 | **网络搜索** | 提问 — Mistral Agent 在网络上查找答案 |
| 📄 | **复习资料** | 结构化笔记，包含要点、词汇、引用、趣闻 |
| 🃏 | **抽认卡** | 5-50 张问答卡，带来源引用以便主动记忆 |
| ❓ | **选择题测验** | 5-50 道多项选择题，带错误的自适应复习 |
| ✏️ | **填空文本** | 带提示和容错校验的填空练习 |
| 🎙️ | **播客** | 双声部迷你播客，通过 Mistral Voxtral TTS 转为音频 |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育类图片 |
| 🗣️ | **语音测验** | 题目以语音朗读，口头回答，AI 自动核验 |
| 💬 | **AI 家教** | 与课程文档上下文关联的对话式聊天，支持工具调用 |
| 🧠 | **智能路由器** | AI 分析你的内容并在 7 个生成器中推荐最相关的选项 |
| 🔒 | **家长控制** | 按年龄分级的审核、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面与 AI 内容完整支持法语与英语 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 或 ElevenLabs 听复习资料与抽认卡 |

---

## 架构总览

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Upload OCR<br/><i>mistral-ocr-latest</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Recherche web<br/><i>Agent Mistral</i>"]
    end

    subgraph "🛡️ Sécurité (async, si activée par profil)"
        MOD["Modération<br/><i>mistral-moderation-2603</i>"]
        CON["Détection de consigne<br/><i>mistral-large-latest</i>"]
    end

    subgraph "🧠 Générateurs IA"
        SUM["📄 Fiche"]
        FC["🃏 Flashcards"]
        QZ["❓ Quiz QCM"]
        FB["✏️ Textes à trous"]
        POD["🎙️ Podcast"]
        IMG["🖼️ Image"]
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

## 模型使用地图

```mermaid
flowchart LR
    subgraph "Modèles Mistral"
        ML["mistral-large-latest"]
        MO["mistral-ocr-latest"]
        MV["voxtral-mini-latest"]
        MMod["mistral-moderation-2603"]
        MS["mistral-small-latest"]
        MTTS["voxtral-mini-tts-latest"]
    end

    subgraph "Tâches"
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Textes à trous / Vérification quiz / Consigne"]
        T2["OCR — documents, tableaux, écriture manuscrite"]
        T3["Reconnaissance vocale — STT optimisé FR"]
        T4["Modération de contenu — filtrage par âge"]
        T5["Routeur intelligent — analyse du contenu"]
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

## 用户流程

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

## 深入介绍 — 功能

### 多模态输入

EurekAI 接受 4 种类型的来源，根据用户档案进行审核（默认对儿童和青少年启用）：

- **上传 OCR** — JPG、PNG 或 PDF 文件通过 `mistral-ocr-latest` 处理。支持印刷文本、表格和手写文字。
- **自由文本** — 输入或粘贴任意内容。若启用审核，存储前会进行内容审查。
- **语音输入** — 在浏览器中录制音频。由 `voxtral-mini-latest` 转录。参数 `language="fr"` 优化识别效果。
- **网络搜索** — 输入查询。一个临时的 Mistral Agent 使用工具 `web_search` 抓取并总结结果。

### AI 内容生成

生成七种类型的学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习资料** | `mistral-large-latest` | 标题、摘要、10-25 个要点、词汇、引用、趣闻 |
| **抽认卡** | `mistral-large-latest` | 5-50 张问答卡，带来源引用以便主动记忆 |
| **选择题测验** | `mistral-large-latest` | 5-50 道题，每题 4 个选项，附解释，带自适应复习 |
| **填空文本** | `mistral-large-latest` | 带提示的填空句子，容错校验（Levenshtein） |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双声部脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过工具 `image_generation` 生成的教育图片 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 朗读题目 → STT 识别回答 → AI 验证 |

### 聊天式 AI 家教

一个能访问完整课程文档的对话式家教：

- 使用 `mistral-large-latest`
- **工具调用**：可以在对话中生成复习资料、抽认卡、测验或填空题
- 每门课程保留 50 条消息的历史
- 若为启用审核的档案则对内容进行过滤

### 智能自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并在 7 个可用生成器中推荐最相关的选项 —— 这样学生无需手动选择。界面显示实时进度：先是分析阶段，然后是各个生成任务，可单独取消。

### 自适应学习

- **测验统计**：跟踪每题的作答次数与准确率
- **测验复习**：生成 5-10 道针对薄弱概念的新题
- **指令检测**：检测复习指令（如“如果我知道……就算我掌握了课程”）并在所有生成器中予以优先处理

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11-15）、学生（16-25）、成年人（26+）
- **内容审核**：`mistral-moderation-2603`，对儿童/青少年屏蔽 5 类内容（性、仇恨、暴力、自伤、绕过限制），学生/成年用户不受限制
- **家长 PIN**：使用 SHA-256 哈希，15 岁以下档案需设置
- **聊天限制**：16 岁以下默认禁用 AI 聊天，家长可启用

### 多配置文件系统

- 多个配置文件，包含姓名、年龄、头像、语言偏好
- 通过 `profileId` 将项目与配置文件关联
- 级联删除：删除配置文件将删除其所有项目

### 多提供商 TTS

- **Mistral Voxtral TTS**（默认）：`voxtral-mini-tts-latest`，无需额外密钥
- **ElevenLabs**（可选）：`eleven_v3`，音色自然，需要 `ELEVENLABS_API_KEY`
- 在应用设置中可配置提供商

### 国际化

- 界面完整提供法语与英语版本
- AI 提示目前支持两种语言（FR、EN），架构已准备好扩展到 15 种（es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 语言可按配置文件设置

---

## 技术栈

| 层级 | 技术 | 作用 |
|---|---|---|
| **运行时** | Node.js + TypeScript 5.7 | 服务器与类型安全 |
| **后端** | Express 4.21 | REST API |
| **开发服务器** | Vite 7.3 + tsx | HMR、Handlebars partials、代理 |
| **前端** | HTML + TailwindCSS 4.2 + Alpine.js 3.15 | 响应式界面，TypeScript 由 Vite 编译 |
| **模板** | vite-plugin-handlebars | 通过 partials 组合 HTML |
| **AI** | Mistral AI SDK 2.1 | 聊天、OCR、STT、TTS、Agents、审核 |
| **TTS（默认）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，集成语音合成 |
| **TTS（可选）** | ElevenLabs SDK 2.36 | `eleven_v3`，自然语音 |
| **图标** | Lucide 0.575 | SVG 图标库 |
| **Markdown** | Marked 17 | 聊天中的 Markdown 渲染 |
| **文件上传** | Multer 1.4 | multipart 表单处理 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest 4 | 单元测试 — 覆盖率由 SonarCloud 测量 |
| **持久化** | JSON 文件 | 无依赖的存储方式 |

---

## 模型参考

| 模型 | 用途 | 为什么 |
|---|---|---|
| `mistral-large-latest` | 复习资料、抽认卡、播客、测验、填空、聊天、语音测验验证、图片 Agent、网络检索 Agent、指令检测 | 最佳多语言能力 + 指令跟随 |
| `mistral-ocr-latest` | 文档 OCR | 印刷文本、表格、手写识别 |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，可与 `language="fr"` 配合优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、朗读 |
| `mistral-moderation-2603` | 内容审核 | 对儿童/青少年屏蔽 5 类内容（含绕过限制） |
| `mistral-small-latest` | 智能路由器 | 快速分析内容以做路由决策 |
| `eleven_v3` (ElevenLabs) | 语音合成（TTS 可选） | 自然声音，可作为可配置的替代项 |

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
#   MISTRAL_API_KEY=votre_clé_ici           (requis)
#   ELEVENLABS_API_KEY=votre_clé_ici        (optionnel, TTS alternatif)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注意**：Mistral Voxtral TTS 为默认提供商 —— 除了 `MISTRAL_API_KEY` 外无需额外密钥。ElevenLabs 为可在设置中配置的替代 TTS 提供商。

---

## 项目结构

```
server.ts                 — Point d'entrée Express, monte les routes + config
config.ts                 — Config runtime (modèles, voix, TTS provider), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (7 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, FR/EN)

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
  router.ts               — Routeur automatique intelligent (contenu → générateurs recommandés)
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

## API 参考

### 配置
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 提供商） |
| `GET` | `/api/config/status` | API 状态（Mistral、ElevenLabs、TTS） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 音色（可选 `?lang=fr`） |

### 配置文件
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有配置文件 |
| `POST` | `/api/profiles` | 创建配置文件 |
| `PUT` | `/api/profiles/:id` | 修改配置文件（<15 岁需 PIN） |
| `DELETE` | `/api/profiles/:id` | 删除配置文件 + 级联删除项目 |

### 项目
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目 |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |

### 来源
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 上传 OCR（multipart 文件） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 语音 STT（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | 网络搜索 `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源 |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令 |

### 生成
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习资料 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 抽认卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 选择题测验 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空文本 |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（要运行的生成器计划） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 5 类型：summary、flashcards、quiz、fill-blank、podcast） |

所有生成路由均接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`。

### CRUD 生成
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空题答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口头回答（音频 + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（复习资料/抽认卡） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成内容 |

### 聊天
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天历史 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 清空聊天历史 |

---

## 架构决策

| 决策 | 证明 |
|---|---|
| **使用 Alpine.js 而非 React/Vue** | 占用资源少，提供轻量响应性，TypeScript 由 Vite 编译。适合以速度为先的黑客松。 |
| **以 JSON 文件持久化** | 零依赖，快速启动。无需配置数据库 —— 即可开箱运行。 |
| **Vite + Handlebars** | 两者兼得：开发时快速 HMR，partial HTML 便于代码组织，Tailwind JIT。 |
| **集中提示** | 所有 AI 提示都在 `prompts.ts` — 易于按语言/年龄组迭代、测试和调整。 |
| **多代系统** | 每次生成都是具有自己 ID 的独立对象 — 允许每门课程有多份讲义、测验等。 |
| **按年龄适配的提示** | 4 个年龄组，词汇、复杂度和语气不同 — 相同内容根据学习者不同而以不同方式教授。 |
| **基于 Agents 的功能** | 图像生成和网络搜索使用临时 Mistral Agents — 生命周期独立并自动清理。 |
| **多提供商 TTS** | 默认使用 Mistral Voxtral TTS（无需额外密钥），ElevenLabs 作为备选 — 可在不重启的情况下配置。 |

---

## 致谢与鸣谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ 全球黑客松
- **[ElevenLabs](https://elevenlabs.io)** — 可选的语音合成引擎（`eleven_v3`）
- **[Alpine.js](https://alpinejs.dev)** — 轻量响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用类 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器

在 Mistral AI 全球黑客松期间精心构建，2026 年 3 月。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — 版权所有 (C) 2026 Julien LS

**本文件使用 gpt-5-mini 模型由法语（fr）翻译为中文（zh）。欲了解有关翻译过程的更多信息，请参阅 https://gitlab.com/jls42/ai-powered-markdown-translator**

