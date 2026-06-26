<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 标志" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任何内容转换为交互式学习体验——由 <a href="https://mistral.ai">Mistral AI</a> 提供支持。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 英语</a> · <a href="README-es.md">🇪🇸 西班牙语</a> · <a href="README-pt.md">🇧🇷 葡萄牙语</a> · <a href="README-de.md">🇩🇪 德语</a> · <a href="README-it.md">🇮🇹 意大利语</a> · <a href="README-nl.md">🇳🇱 荷兰语</a> · <a href="README-ar.md">🇸🇦 阿拉伯语</a><br>
  <a href="README-hi.md">🇮🇳 印地语</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日语</a> · <a href="README-ko.md">🇰🇷 韩语</a> · <a href="README-pl.md">🇵🇱 波兰语</a> · <a href="README-ro.md">🇷🇴 罗马尼亚语</a> · <a href="README-sv.md">🇸🇪 瑞典语</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube 演示"></a>
</p>

<h4 align="center">📊 代码质量</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="质量门禁"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="安全评分"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="可靠性评分"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="可维护性评分"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="覆盖率"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="漏洞"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="代码异味"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="代码行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy 徽章"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 故事——为什么选择 EurekAI？

**EurekAI** 诞生于 [Mistral AI 全球黑客松](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。我需要一个题目——这个想法来自非常具体的事情：我经常和女儿一起准备测验，我就想，也许可以借助 AI 把这件事做得更有趣、更互动。

目标是：接收**任何输入**——课程照片、复制粘贴的文本、语音录音、网页搜索——并将其转换为**复习卡、抽认卡、测验、播客、填空题、插图**，以及更多内容。全部由 Mistral AI 的法语模型驱动，因此它天然适合讲法语的学生。

[初始原型](https://github.com/jls42/worldwide-hackathon.mistral.ai) 是在黑客松期间用 48 小时打造的，作为围绕 Mistral 服务的概念验证——已经可用，但功能有限。此后，EurekAI 逐渐成长为一个真正的项目：填空题、练习导航、网页抓取、可配置的家长审查、深入的代码审查，等等。整个代码库都由 AI 生成——主要由 [Claude Code](https://code.claude.com/) 完成，并通过 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 贡献了少量内容。

---

## 功能

| | 功能 | 描述 |
|---|---|---|
| 📷 | **文件导入** | 导入你的课程材料——照片、PDF（通过 Mistral OCR，平均置信度分数，第三方 `high`/`medium`/`low`）或文本文件（TXT、MD）。支持带重试的多文件上传会话以及单独进度显示 |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 录制你的声音——Voxtral STT 会将语音转写 |
| 🌐 | **网页 / URL** | 粘贴一个 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索词（Mistral web_search Agent） |
| 📄 | **复习卡** | 结构化笔记，包含要点、词汇、引用、趣闻 |
| 🃏 | **抽认卡** | 交互式问答卡片，带对话式音频朗读 |
| ❓ | **选择题测验** | 选择题，带错误的自适应复习（数量可配置） |
| ✏️ | **填空题** | 带提示和宽松验证的完成练习 |
| 🎙️ | **播客** | 双人语音迷你播客——默认使用 Mistral 语音，也支持自定义声音（家长！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育图片 |
| 🗣️ | **语音测验** | 题目以语音朗读（可使用自定义声音），口头回答，AI 验证 |
| 💬 | **AI 导师** | 可与课程文档进行上下文聊天，并支持工具调用 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器会分析内容，并在 7 种可用生成器中建议最合适的组合 |
| 🔒 | **家长控制** | 按个人资料配置的内容审核（可自定义类别）、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面提供 9 种语言；AI 生成可通过提示词控制为 15 种语言 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 收听复习卡和抽认卡（问答对话） |
| 💶 | **API 成本追踪** | 对每次生成及其来源的 € 成本进行透明估算（tokens / 字符 / 页数 / 音频秒数）。每张卡都有徽章 + 项目总计，并在 dashboard 中可见 |
| 🎨 | **按个人资料的主题** | 每个个人资料可选择自己的 `dark` 或 `light` 主题——切换个人资料时保持不变 |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构概览" width="800" />
</p>

---

## 模型使用地图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型到任务的映射" width="800" />
</p>

---

## 用户旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习旅程" width="800" />
</p>

---

## 深入了解——功能

### 多模态输入

EurekAI 接受 4 种来源类型，并按个人资料进行审核（默认对儿童和青少年启用）：

- **文件导入**——JPG、PNG 或 PDF 文件通过 Mistral OCR 处理——**默认 OCR 3（`mistral-ocr-2512`）**，**可选 OCR 4（`mistral-ocr-4-0`）**可在设置中开启（质量更高，但成本是 2 倍）——适用于印刷文本、表格和手写；或者直接导入文本文件（TXT、MD）。多文件上传使用**上传会话**系统：每个文件单独显示进度，失败文件可单独重试而无需重新提交其他文件，完成后可关闭会话。OCR 提供一个**平均置信度分数**（`average`，在 `[0,1]` 中钳制，由 Mistral 返回的 `averagePageConfidenceScore` 计算得出），在 UI 中以第 `high` / `medium` / `low` 级徽章显示（阈值约为 0.9 / 0.7）——在扫描质量较差时发出警告但不阻止继续。
- **自由文本**——直接输入或粘贴任意内容。在启用审核时，存储前会先进行审核。
- **语音输入**——在浏览器中录制音频。由 `voxtral-mini-latest` 转写。`language="fr"` 参数可优化识别效果。
- **网页 / URL**——粘贴一个或多个 URL 以直接抓取内容（针对 JS 页面使用 Readability + Lightpanda），或者输入关键词通过 Mistral Agent 进行网页搜索。单一输入字段两者都支持——URL 和关键词会自动分离，每个结果都会创建一个独立来源。

### AI 内容生成

生成 7 种学习材料类型：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习卡** | `mistral-large-latest` | 标题、摘要、要点、词汇、引用、轶事 |
| **抽认卡** | `mistral-large-latest` | 带来源引用的问答卡（数量可配置） |
| **选择题测验** | `mistral-large-latest` | 选择题、解释、自适应复习（数量可配置） |
| **填空题** | `mistral-large-latest` | 带提示的完成句子、宽松验证（Levenshtein） |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人脚本 → MP3 音频 |
| **插图** | Mistral `mistral-large-latest` Agent | 通过 `image_generation` 工具生成教育图片 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 问题 → STT 回答 → AI 验证 |

### 通过聊天的 AI 导师

一个可对课程文档进行完全访问的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话过程中生成复习卡、抽认卡、测验或填空题
- 每门课程保留 50 条消息历史
- 如果对该个人资料启用了内容审核，则会进行审核

### 自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并在 7 种可用生成器中推荐最相关的内容。界面会实时显示进度：先是分析阶段，然后是各个生成过程，并且可以随时取消。

### 自适应学习

- **测验统计**：跟踪每个问题的作答次数和准确率
- **测验复习**：生成 5-10 个新问题，针对薄弱概念
- **指令检测**：检测复习指令（“如果我知道……我就学会了课文”），并在兼容的文本生成器（复习卡、抽认卡、测验、填空题）中优先处理

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11-15 岁）、学生（16-25 岁）、成人（26+）
- **内容审核**：`mistral-moderation-latest`，提供 10 个可用类别，儿童/青少年默认屏蔽 5 类（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。类别可在设置中按个人资料自定义。
- **家长 PIN**：SHA-256 哈希，15 岁以下个人资料必需。生产部署建议使用带盐的慢哈希（Argon2id、bcrypt）。
- **聊天限制**：16 岁以下默认禁用 AI 聊天，可由家长启用

### 多个人资料系统

- 多个个人资料，包含姓名、年龄、头像、语言偏好
- **按个人资料的声音**（`Profile.mistralVoices?: { host, guest }`）——每个孩子都可以拥有自己的一对播客/语音测验声音
- **按个人资料的主题**（`Profile.theme: 'dark' | 'light'`）——切换个人资料时自动切换，并在后端持久化
- 通过 `profileId` 将项目与个人资料关联
- 级联删除：删除个人资料会删除其所有项目

### API 成本追踪

每次 Mistral 调用（聊天、OCR、STT、TTS、审核、Agent）都经过埋点，以便向用户提供**透明**的 € 估算——账单不会有惊喜。

- **唯一数据源**：`helpers/pricing.ts`——按模型前缀的 `MODEL_PRICING`（例如：`mistral-large` → 输入 0.5 €/M tokens，输出 1.5 €/M tokens），`PRICING_SOURCES` 结合 Mistral 文档 URL 进行定期重新抓取
- **支持的单位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）——由 `helpers/cost-calc.ts` 驱动转换
- **埋点链路**：`helpers/tracked-client.ts`（封装 Mistral 客户端）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（注入到 HTTP 响应中）
- **UI**：每次生成的成本徽章（`src/partials/cost-badge-gen.html`）、每个来源的成本徽章（`cost-badge-src.html`）、dashboard 中的累计总额（`Project.totalCost`）
- **端点**：`/generate/*` 和 `/sources/*` 的响应会用 `estimatedCost`、`usage` 和 `costBreakdown` 装饰返回对象（Generation / Source）。`POST /generate/auto/route` 会增加一个 `costDelta: number` 字段，仅用于路由成本。`GET /projects/:pid` 返回包含 `totalCost` 的项目（从 `costLog[]` 计算求和）+ 完整历史记录

### 多供应商 TTS 与自定义声音

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`，100% Mistral 语音合成，无需额外密钥
- **自定义声音**：家长可以通过 Mistral Voices API（基于一段音频样本）创建自己的声音，并分配给主持人/嘉宾角色——此后播客和语音测验会使用家长的声音朗读，让孩子的体验更加沉浸
- 两个可配置语音角色：**主持人**（主叙述者）和 **嘉宾**（播客的第二个声音）
- 设置中提供完整的 Mistral 声音目录，可按语言筛选

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 可按个人资料配置语言

---

## 技术栈

| 层 | 技术 | 作用 |
|---|---|---|
| **运行时** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **后端** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x（Rolldown）+ tsx | HMR、Handlebars 部分模板、代理 |
| **前端** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，TypeScript 由 Vite 编译 |
| **模板** | vite-plugin-handlebars | 通过 partials 组合 HTML |
| **AI** | Mistral AI SDK 2.x | 聊天、OCR、STT、TTS、Agents、审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，内置语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主要内容（Firefox Reader View 技术） |
| **无头浏览器** | Lightpanda | 超轻量无头浏览器（Zig + V8），用于 JS/SPA 页面——抓取回退 |
| **Markdown** | Marked | 在聊天中渲染 markdown |
| **文件上传** | Multer 2.x | 处理 multipart 表单 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试——覆盖率由 SonarCloud 测量 |
| **持久化** | JSON 文件 | 无依赖存储 |

---

## 模型参考

| 模型 | 用途 | 原因 |
|---|---|---|
| `mistral-large-latest` | 复习卡、抽认卡、播客、测验、填空题、聊天、语音测验验证、图像 Agent、网页搜索 Agent、指令检测 | 最佳多语言能力 + 指令遵循 |
| `mistral-ocr-2512`（OCR 3，默认） | 文档 OCR | 印刷文本、表格、手写（$2 / 1000 页） |
| `mistral-ocr-4-0`（OCR 4，可选） | 文档 OCR——更高质量 | 可在设置中选择，成本是 2 倍（$4 / 1000 页） |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，配合 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、朗读 |
| `mistral-moderation-latest` | 内容审核 | 为儿童/青少年屏蔽 5 类（+ jailbreaking） |
| `mistral-small-latest` | 自动路由器 | 快速分析内容以进行路由决策 |

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
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注意**：Mistral Voxtral TTS 是唯一的 TTS 提供商——除 `MISTRAL_API_KEY` 外，无需额外密钥。

### 环境变量

| 变量 | 必需 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | ✅ | — | Mistral API 密钥（聊天、OCR、STT、Voxtral TTS、Agent、审核） |
| `PORT` | 可选 | `3000` | Express 后端的 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 若 `production` → Express 从 `dist/` 提供前端（否则为 `public/`） |
| `SONAR_TOKEN` | CI 可选 | — | 仅供 GitHub Actions SonarCloud 工作流使用 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git 钩子（Husky）**：`pre-commit` 会运行 `npm test`，`pre-push` 会运行 `npm run security`。两者在失败时都会阻止 commit/push。

**需要的外部工具（可选，但被 `pretest` / `npm run security` 使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

没有这些工具时，`npm test` 会在 `pretest` 处失败（缺少 lizard），而 `npm run security` 会失败（缺少 opengrep）。此时 husky 钩子会阻止 commit/push。

---

## 容器化部署

镜像已发布到 **GitHub Container Registry**：

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

> **`:U`** 是一个 Podman rootless 标志，会自动调整卷权限。

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
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (7 agents) + MAX_AUTO_PLAN_LENGTH
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
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
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
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

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **给 AI 贡献者**：请查阅 [`CLAUDE.md`](CLAUDE.md) 以获取详细的架构上下文、强制规则（防提示泄漏、错误代码、成本追踪）以及已知陷阱（Lizard CCN、Opengrep、Codacy/Semgrep 迁移）。

---

## API 参考

### 配置
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、声音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已设置 Mistral 密钥）、`ttsAvailable`（`mistral` 的别名，Mistral Voxtral 是唯一的 TTS 提供方） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 声音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的审核类别 + 按年龄的默认值 |

### 用户配置
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有用户配置 |
| `POST` | `/api/profiles` | 创建用户配置 |
| `PUT` | `/api/profiles/:id` | 修改用户配置（15 岁以下需要 PIN） |
| `DELETE` | `/api/profiles/:id` | 删除用户配置 + 级联项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |

### 来源
| 方法 | 端点 | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入多部分文件（JPG/PNG/PDF 使用 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 语音（多部分音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | 抓取 URL 或网页搜索 `{query}` — 返回一个来源数组 |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源 |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令 |

### 生成
| 方法 | 端点 | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习卡片 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 抽认卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | QCM 测验 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空文本 |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（要启动的生成器计划）— 返回 `{plan, costDelta}`（仅路由成本） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 7 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image）。并行执行——假设 Mistral 层级的并发限流至少为 7 个同时请求；否则多个 429 可能会在 `failedSteps` 中返回。 |

所有生成路由都接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`。`quiz-review` 还额外需要 `{generationId, weakQuestions}`。

### 生成项 CRUD
| 方法 | 端点 | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空文本答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 检查口语答案（音频 + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（笔记/抽认卡） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成项 |

### 聊天
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天历史 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 清空聊天历史 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **选择 Alpine.js 而不是 React/Vue** | 体积最小，配合由 Vite 编译的 TypeScript，响应式开销很轻。非常适合速度至上的黑客松。 |
| **以 JSON 文件持久化** | 零依赖，瞬时启动。无需配置数据库——直接启动就能跑。 |
| **Vite + Handlebars** | 两全其美：开发时 HMR 很快，HTML partials 便于组织代码，Tailwind JIT。 |
| **集中管理提示词** | 所有 AI 提示词都放在 `prompts.ts` 中——便于按语言/年龄组迭代、测试和调整。 |
| **多生成系统** | 每个生成项都是一个独立对象，拥有自己的 ID——同一课程可生成多份笔记、测验等。 |
| **按年龄定制提示词** | 4 个年龄组，词汇、复杂度和语气各不相同——相同内容会根据学习者以不同方式进行教学。 |
| **基于 Agents 的功能** | 图片生成和网页搜索使用临时 Mistral Agents——生命周期清晰，并带有自动清理。 |
| **智能 URL 抓取** | 一个单一字段可同时接受 URL 和混合关键词——URL 通过 Readability 抓取（静态页面），并在必要时回退到 Lightpanda（JS/SPA 页面）；关键词会触发一个 Mistral web_search Agent。每个结果都会创建一个独立来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）——语音合成集成到成本链路和按语言的语音解析中。 |

---

## 致谢与鸣谢

- **[Mistral AI](https://mistral.ai)** — IA 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 轻量响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用优先 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面 的超轻量无头浏览器

始于 Mistral AI Worldwide Hackathon（2026 年 3 月），由 AI 通过 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 完整开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — 版权所有 (C) 2026 Julien LS

**用 gpt-5.4-mini 从法语翻译成中文的文章。**
