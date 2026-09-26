<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任意内容转化为互动学习体验——由 <a href="https://mistral.ai">Mistral AI</a> 驱动。</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Security Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Reliability Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Maintainability Rating"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilities"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Lines of Code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 故事——为什么是 EurekAI？

**EurekAI** 诞生于 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。当时我需要一个主题——灵感来自一件非常具体的事：我经常和女儿一起准备测验，于是想，借助 AI 应该能把这件事变得更有趣、更互动。

目标是：接收**任意输入**——课程照片、复制粘贴的文本、语音录音、网络搜索——并将其转化为**复习笔记、闪卡、测验、播客、填空题、插图等等**。这一切由 Mistral AI 的法国模型驱动，因此天然适合法语学生。

[初始原型](https://github.com/jls42/worldwide-hackathon.mistral.ai) 在黑客松期间用 48 小时完成，作为围绕 Mistral 服务的概念验证——已经可用，但功能有限。此后，EurekAI 发展成真正的项目：填空题、练习导航、网页抓取、可配置的家长审核、深入的代码审查，以及更多功能。全部代码均由 AI 生成——主要是 [Claude Code](https://code.claude.com/)，另有部分贡献来自 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/)。

---

## 概览

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 导览：来源、笔记、测验、闪卡、插图" width="820" />
</p>

| | |
|---|---|
| ![仪表盘](docs/screenshots/dashboard.webp)<br>**仪表盘** — 最近生成记录、每张卡片与项目总估算费用、「自动——魔法！」按钮 | ![来源](docs/screenshots/sources.webp)<br>**来源** — 导入照片/PDF/文本/语音/网页，一键生成，指令检测 |

每个导入的来源都会显示其 [OCR 置信度分数、审核状态与估算费用](docs/screenshots/sources-list.webp)。

### 各组件实况演示

| | |
|---|---|
| ![复习笔记](docs/screenshots/notes.gif)<br>**复习笔记** — 要点、词汇、带出处的引用、按章节朗读 | ![测验](docs/screenshots/quiz.gif)<br>**选择题测验** — 即时反馈与讲解，逐步导航 |
| ![闪卡](docs/screenshots/flashcards.gif)<br>**闪卡** — 翻转卡片后自评「我知道 / 我不知道」 | ![填空题](docs/screenshots/fillblank.gif)<br>**填空题** — 按需提示，宽松校验 |
| ![听写](docs/screenshots/dictation.gif)<br>**听写** — 音频听写单词，逐字母严格批改 | ![口语测验](docs/screenshots/vocal-quiz.gif)<br>**口语测验** — 朗读问题，麦克风作答 |
| ![播客](docs/screenshots/podcast.gif)<br>**播客** — 双声道迷你播客，可查看对话脚本 | ![插图](docs/screenshots/illustrations.gif)<br>**插图** — 由 Agent 生成的教育图像 |
| ![AI 导师](docs/screenshots/chat.gif)<br>**AI 导师** — 锚定课程文档的聊天，带讲解的回答，可生成测验与闪卡 | |

### 快速上手

| | |
|---|---|
| ![选择个人资料](docs/screenshots/login.gif)<br>**选择个人资料** — 每个孩子有自己的空间、头像与语言 | ![创建个人资料](docs/screenshots/profile-create.gif)<br>**创建个人资料** — 年龄、头像、15 岁以下需家长 PIN |
| ![创建课程](docs/screenshots/course.gif)<br>**创建课程** — 每节课一个项目，可接收来源 | ![设置](docs/screenshots/settings.gif)<br>**设置** — API 状态、带价格显示的 AI 模型选择 |

---

## 功能

| | 功能 | 说明 |
|---|---|---|
| 📷 | **文件导入** | 导入课程——照片、PDF（通过 Mistral OCR，带平均置信度分数，等级 `high`/`medium`/`low`）或文本文件（TXT、MD）。上传会话支持按文件重试与单独进度 |
| 📝 | **文本输入** | 直接键入或粘贴任意文本 |
| 🎤 | **语音输入** | 录音——Voxtral STT 转录您的声音 |
| 🌐 | **网页 / URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索词（Agent Mistral web_search） |
| 📄 | **复习笔记** | 结构化笔记，含要点、词汇、引用、趣闻 |
| 🃏 | **闪卡** | 互动问答卡，对话式朗读 |
| ❓ | **选择题测验** | 多选题，带自适应错题复习（数量可配置） |
| ✏️ | **填空题** | 完形填空练习，带提示与宽松校验 |
| 🔤 | **听写** | 从导入列表用音频听写单词（Voxtral TTS），键盘输入，逐字母严格批改并讲解拼写规则 |
| 🎙️ | **播客** | 双声道迷你播客音频——默认 Mistral 语音或自定义语音（家长！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育图像 |
| 🗣️ | **口语测验** | 朗读问题（可自定义语音），口头作答，AI 核验 |
| 💬 | **AI 导师** | 基于课程文档的上下文聊天，支持工具调用 |
| 🧠 | **自动路由** | 基于 `mistral-small-latest` 的路由器分析内容，从 8 种可用类型中建议生成器组合 |
| 🔒 | **家长控制** | 按个人资料可配置审核（可自定义类别）、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面支持 9 种语言；通过提示词可在 15 种语言中驱动 AI 生成 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 收听笔记与闪卡（问答对话） |
| 💶 | **API 费用跟踪** | 透明估算每次生成与来源的 € 费用（tokens / 字符 / 页数 / 音频秒数）。每张卡片徽章 + 按项目合计，在仪表盘可见 |
| 🎨 | **按个人资料主题** | 每个个人资料可选择 `dark` 或 `light` 主题——切换个人资料时保持 |

---

## 架构总览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## 模型使用图谱

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## 用户旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 深入了解——功能详解

### 多模态输入

EurekAI 接受 4 类来源，并按个人资料进行审核（儿童与青少年默认开启）：

- **文件导入** — JPG、PNG 或 PDF 文件由 Mistral OCR 处理——默认 **OCR 4（`mistral-ocr-4-0`）**（质量更好），设置中可选 **OCR 3（`mistral-ocr-2512`）**（更便宜，约 ½ 费用）——适用于印刷文本、表格与手写；或直接导入文本文件（TXT、MD）。多文件上传使用 **上传会话** 系统：每个文件单独进度、失败文件可重试而无需重新提交其他文件、完成后可关闭会话。OCR 暴露平均 **置信度分数**（`average`，钳制在 `[0,1]`，由 Mistral 返回的 `averagePageConfidenceScore` 计算），在 UI 中以等级徽章 `high` / `medium` / `low` 显示（阈值约 0.9 / 约 0.7）——扫描质量差时发出警告但不阻断。
- **自由文本** — 键入或粘贴任意内容。若审核开启，存储前会进行审核。
- **语音输入** — 在浏览器中录制音频。由 `voxtral-mini-latest` 转录。参数 `language="fr"` 优化识别效果。
- **网页 / URL** — 粘贴一个或多个 URL 以直接抓取内容（Readability + Lightpanda 处理 JS 页面），或输入关键词通过 Agent Mistral 进行网络搜索。单一输入框同时接受两者——URL 与关键词自动分离，每个结果创建独立来源。

### AI 内容生成

生成八类学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习笔记** | `mistral-large-latest` | 标题、摘要、要点、词汇、引用、趣闻 |
| **闪卡** | `mistral-large-latest` | 带来源引用的问答卡（数量可配置） |
| **选择题测验** | `mistral-large-latest` | 多选题、讲解、自适应复习（数量可配置） |
| **填空题** | `mistral-large-latest` | 带提示的完形填空句，宽松校验（Levenshtein） |
| **听写** | `mistral-large-latest` + Voxtral TTS | 关键词音频听写（每词 1 个 MP3）→ 键盘输入 → 严格批改（含重音）并讲解规则 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双声道脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过工具 `image_generation` 生成教育图像 |
| **口语测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 问题 → STT 回答 → AI 核验 |

### 聊天式 AI 导师

可完整访问课程文档的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话中生成笔记、闪卡、测验或填空题
- 每门课程保留 50 条消息历史
- 若个人资料开启审核，则对内容进行审核

### 自动路由

路由器使用 `mistral-small-latest` 分析来源内容，从 8 种可用生成器中建议最相关的组合。界面实时显示进度：先是分析阶段，然后是可取消的各项生成。

### 自适应学习

- **测验统计**：按题目跟踪尝试次数与正确率
- **测验复习**：生成 5–10 道针对薄弱概念的新题
- **指令检测**：检测复习指令（「如果我知道……就说明我掌握了这节课」）并在兼容的文本生成器中优先处理（笔记、闪卡、测验、填空题）

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11–15）、学生（16–25）、成人（26+）
- **内容审核**：`mistral-moderation-2603`（Mistral Moderation 2），提供 11 个类别，儿童/青少年默认屏蔽 5 个（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。可在设置中按个人资料自定义类别；Moderation 2 将旧的「危险内容」类别拆分为 `dangerous` + `criminal`（现有个人资料自动迁移，屏蔽类别也适用于已导入的来源）。默认安全策略：若模型响应无法验证某个屏蔽类别，则拒绝内容（「审核不可用」）；审核开启时，生成与聊天都会排除被标记、出错或正在核验的来源（导入时审核已关闭的来源不会重新核验）。日期化 ID 固定在 `helpers/moderation-model.ts`：已弃用的别名 `-latest` 不再由 API 列出。
- **家长 PIN**：SHA-256 哈希，15 岁以下个人资料必需。生产部署建议使用带盐的慢哈希（Argon2id、bcrypt）。
- **聊天限制**：16 岁以下默认禁用 AI 聊天，可由家长开启

### 多个人资料系统

- 多个个人资料，含姓名、年龄、头像、语言偏好
- **按个人资料语音**（`Profile.mistralVoices?: { host?, guest? }`——每个角色可选）——每个孩子可有自己的播客/口语测验语音对
- **按个人资料主题**（`Profile.theme: 'dark' | 'light'`）——切换个人资料时自动切换，由后端持久化
- 项目通过 `profileId` 关联到个人资料
- 级联删除：删除个人资料会删除其所有项目

### API 费用跟踪

每个可计费的 Mistral 调用（chat、OCR、STT、TTS、agents）都经过埋点，为用户提供 **透明** 的 € 估算。免费的审核不计入。已知限制：agent 工具费用（网络搜索 30 $/1000 次调用，图像生成 100 $/1000 张图像）尚未计入——插图显示费用被低估。

- **事实来源**：`helpers/pricing.ts` — 按模型前缀的 `MODEL_PRICING`（例：`mistral-large` → 输入 0.5 €/M tokens，输出 1.5 €/M tokens），`PRICING_SOURCES` 含 Mistral 文档 URL 供定期重新抓取
- **支持的单位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）——由 `helpers/cost-calc.ts` 驱动换算
- **埋点链路**：`helpers/tracked-client.ts`（封装 Mistral 客户端）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（注入 HTTP 响应）
- **UI**：每次生成的费用徽章（`src/partials/cost-badge-gen.html`）、每个来源（`cost-badge-src.html`）、仪表盘累计合计（`Project.totalCost`）
- **Endpoints**：`/generate/*` 与 `/sources/*` 响应为返回对象（Generation / Source）装饰 `estimatedCost`、`usage` 与 `costBreakdown`。`POST /generate/route` 增加 `costDelta: number` 字段表示仅路由费用。`GET /projects/:pid` 返回充实后的项目，含 `totalCost`（从 `costLog[]` 计算的总和）+ 完整历史

### TTS（Mistral Voxtral）与自定义语音

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`，100% Mistral 语音合成，无需额外密钥
- **自定义语音**：家长可通过 Mistral Voices API（基于音频样本）创建自己的语音，并分配给主持/嘉宾角色——播客与口语测验随即以家长的声音播放，让孩子的体验更沉浸
- 两个可配置的语音角色：**主持**（主要叙述者）与 **嘉宾**（播客第二声）
- 完整的 Mistral 语音目录可在设置中查看，可按语言筛选
### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示词支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 语言可按个人资料配置

---

## 技术栈

| 层级 | 技术 | 作用 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **Backend** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、代理 |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，TypeScript 由 Vite 编译 |
| **Templating** | vite-plugin-handlebars | 通过 partials 组合 HTML |
| **IA** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，内置语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主要内容（Firefox Reader View 技术） |
| **Headless browser** | Lightpanda | 超轻量无头浏览器（Zig + V8），用于 JS/SPA 页面 — 抓取回退方案 |
| **Markdown** | Marked | 聊天中的 Markdown 渲染 |
| **文件上传** | Multer 2.x | 处理 multipart 表单 |
| **Audio** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试 — 覆盖率由 SonarCloud 度量 |
| **持久化** | JSON 文件 | 无外部依赖的存储 |

---

## 模型参考

| 模型 | 用途 | 原因 |
|---|---|---|
| `mistral-large-latest` | 复习卡、闪卡、播客、测验、填空、聊天、语音测验校验、图片 Agent、网络搜索 Agent、指令检测 | 最佳多语言能力 + 指令遵循 |
| `mistral-ocr-4-0`（OCR 4，默认） | 文档 OCR — 更高质量 | 印刷文本、表格、手写（$4 / 1000 页） |
| `mistral-ocr-2512`（OCR 3，可选） | 文档 OCR | 可在设置中选择，更便宜（$2 / 1000 页） |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，配合 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、朗读 |
| `mistral-moderation-2603` | 内容审核 | 面向儿童/青少年拦截 5 类内容（含 `jailbreaking`） |
| `mistral-small-latest` | 自动路由 | 快速分析内容以做出路由决策 |

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
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **说明**：Mistral Voxtral TTS 是唯一的 TTS 提供方 — 除 `MISTRAL_API_KEY` 外无需额外密钥。

> **由用户输入的 API 密钥**：`MISTRAL_API_KEY` 现已为**可选**。若缺失，应用仍会启动，并提示每位用户在界面中输入**自己的 Mistral 密钥**。该密钥**存储在浏览器中**（在安全上下文中通过 Web Crypto + IndexedDB 加密），并按请求发送 — **永不持久化到服务器**。优先级：个人资料密钥 > 浏览器全局密钥 > `MISTRAL_API_KEY`（环境变量）。设置 `EUREKAI_REQUIRE_USER_KEY=true` 会强制每位用户提供自己的密钥（环境变量密钥仅用于预加载）。

> **本地 HTTPS（平板/局域网）**：`localhost` 已是安全上下文。若要通过局域网访问（平板），请生成本地证书并启用 HTTPS，以解锁浏览器加密并在传输中加密密钥：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 环境变量

| 变量 | 必需 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 可选 | — | Mistral API 密钥（聊天、OCR、STT、TTS Voxtral、agents、审核）。若缺失，用户在应用中输入密钥（存储于浏览器，永不存于服务器） |
| `EUREKAI_REQUIRE_USER_KEY` | 可选 | `false` | `true` → 禁用对 `MISTRAL_API_KEY` 的回退，用于 AI 请求（每位用户**必须**提供自己的密钥）。适用于对外暴露的实例 |
| `HTTPS_KEY` / `HTTPS_CERT` | 可选 | — | TLS 密钥/证书路径（参见 `scripts/gen-cert.sh`）→ Express 与 Vite 以 HTTPS 提供服务（局域网/平板安全上下文） |
| `PORT` | 可选 | `3000` | Express 后端的 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 若 `production` → Express 从 `dist/` 提供前端（否则 `public/`） |
| `SONAR_TOKEN` | 可选 CI | — | 仅由 GitHub Actions SonarCloud 工作流使用 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git Hooks（Husky）**：`pre-commit` 依次执行 `scripts/pre-commit-fast.sh`（冲突、大文件、shellcheck）、`lint-staged` 然后 `npm test`；`pre-push` 先执行 `npm audit` 门禁（在存在严重传递性漏洞时阻断，参见 `scripts/audit-verdict.mjs`），然后执行 `npm run security`。任一失败都会阻止 commit/push。

**所需外部工具（可选，但由 `pretest` / `npm run security` 使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

若缺少这些工具，`npm test` 会在 `pretest` 失败（缺少 lizard），`npm run security` 也会失败（缺少 opengrep）。此时 husky hooks 会阻止 commit/push。

---

## 容器部署

镜像发布于 **GitHub Container Registry**：

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

> **`:U`** 是 Podman rootless 标志，用于自动调整卷权限。

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
  moderation-model.ts     — Modèle de modération épinglé + ses 11 catégories + migration des catégories legacy
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours)
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
docs/                     — Notes internes (inventaire prompts, audits, prompts des diagrammes) + screenshots du README
scripts/                  — Tooling : check-deps, check-models, check-security, check-complexity, gen-cert, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **致 AI 贡献者**：请参阅 [`CLAUDE.md`](CLAUDE.md)，了解详细架构上下文、强制规则（防提示词泄漏、错误码、成本追踪）以及已知陷阱（Lizard CCN、Opengrep、Codacy/Semgrep 迁移）。

---

## API 参考

### 配置
| 方法 | Endpoint | 说明 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已定义 Mistral 密钥）、`ttsAvailable`（`mistral` 的别名，Mistral Voxtral 是唯一的 TTS 提供方） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 语音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用审核类别 + 按年龄的默认值 |
| `POST` | `/api/providers/mistral/validate` | 校验用户输入的 Mistral 密钥 — 始终返回 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`），不回退到环境变量 |

### 个人资料
| 方法 | Endpoint | 说明 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有个人资料 |
| `POST` | `/api/profiles` | 创建个人资料 |
| `PUT` | `/api/profiles/:id` | 修改个人资料（未满 15 岁需 PIN） |
| `DELETE` | `/api/profiles/:id` | 删除个人资料并级联删除项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | Endpoint | 说明 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |
| `GET` | `/api/projects/:pid/events` | 实时 SSE 流（`event: generation`），推送生成状态转换（`completed`/`failed`/`cancelled`）+ heartbeat keep-alive |

### 来源
| 方法 | Endpoint | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入 multipart 文件（JPG/PNG/PDF 走 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 语音 STT（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL 抓取或网络搜索 `{query}` — 返回来源数组 |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源 |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令 |

### 生成
| 方法 | Endpoint | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习卡 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 闪卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 选择题测验 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/dictation` | 听写（单词 + 例句 + 规则，每个单词 1 段 TTS 音频；也可由自动路由提出） |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 针对某次测验错题的定向复习卡 `{generationId, weakQuestions}` — 由「针对我的错题练习」按钮与 `quiz-review` 并行调用 |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（待启动生成器计划）— 返回 `{plan, costDelta}`（仅路由成本） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 8 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。并行执行 — 假定 Mistral 套餐的速率限制 ≥ 8 个并发请求；否则可能在 `failedSteps` 中出现多个 429。 |

所有生成路由均接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`。`quiz-review` 与 `remediation-summary` 还要求 `{generationId, weakQuestions}`。

### 生成 CRUD
| 方法 | Endpoint | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 提交听写答案 `{answers}`（严格服务端评分） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 校验口头回答（音频 + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（复习卡/闪卡） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 取消进行中的生成（取消 pending 的唯一路径） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成 |

### 聊天
| 方法 | Endpoint | 说明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天历史 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 清空聊天历史 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **选用 Alpine.js 而非 React/Vue** | 体积最小，配合 Vite 编译的 TypeScript 实现轻量响应。非常适合看重速度的黑客马拉松。 |
| **以 JSON 文件持久化** | 零依赖，即时启动。无需配置数据库 — 启动即可运行。 |
| **Vite + Handlebars** | 两全其美：开发时快速 HMR、用 HTML partials 组织代码、Tailwind JIT。 |
| **集中管理提示词** | 所有 AI 提示词位于 `prompts.ts` — 便于按语言/年龄组迭代、测试与适配。 |
| **多生成系统** | 每次生成都是带独立 ID 的对象 — 同一课程可有多份复习卡、测验等。 |
| **按年龄适配提示词** | 4 个年龄组，词汇、复杂度与语气不同 — 同一内容按学习者差异化教学。 |
| **基于 Agents 的功能** | 图片生成与网络搜索使用临时 Mistral Agents — 生命周期清晰，自动清理。 |
| **智能 URL 抓取** | 单一字段同时接受 URL 与关键词 — URL 经 Readability 抓取（静态页面），并以 Lightpanda 回退（JS/SPA 页面）；关键词触发 Mistral web_search Agent。每个结果创建独立来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）— 语音合成纳入成本链路，并按语言解析语音。 |

---

## 致谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 轻量响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用优先 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面的超轻量无头浏览器
- **[Luciole](https://luciole-vision.com)** — 专为视力障碍读者设计的字体，© Laurent Bourcellier & Jonathan Perez，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（个人资料中的「阅读舒适」选项）

始于 Mistral AI Worldwide Hackathon（2026 年 3 月），完全由 AI 使用 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 与 [Gemini CLI](https://geminicli.com/) 开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**由 grok-4.5 从法语翻译为中文的文章。**
