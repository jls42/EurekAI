<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任何内容转化为互动式学习体验 — 由 <a href="https://mistral.ai">Mistral AI</a> 强力驱动。</strong>
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

## 诞生故事 — 为什么创立 EurekAI？

**EurekAI** 诞生于 [Mistral AI 全球黑客马拉松](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026年3月）。当时我需要一个项目选题 — 灵感来自于一件非常具体的事情：我经常陪女儿一起复习功课准备考试，我心想借助人工智能，完全可以让这个过程变得更加生动有趣和富有互动性。

目标是：获取**任何形式的输入** — 课程讲义照片、复制粘贴的文本、语音录音、网络搜索结果 — 并将其转化为**复习笔记、记忆卡片、测验、播客、填空题、插图等多种形式**。这一切均由 Mistral AI 的法国模型驱动，使其天然非常适合讲法语的学生。

[最初的原型](https://github.com/jls42/worldwide-hackathon.mistral.ai)是在黑客马拉松期间的48小时内构思完成的，作为基于 Mistral 服务的一个概念验证 — 虽然已经具备可用功能，但相对有限。自那时起，EurekAI 已经发展成为一个成熟的项目：支持填空题、练习导航、网页抓取、可配置的家长控制审核、深度的代码审查等等。全部代码均由 AI 生成 — 主要由 [Claude Code](https://code.claude.com/) 编写，并包含来自 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 的少量贡献。

---

## 概览

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 导览：来源、笔记、测验、记忆卡片、插图" width="820" />
</p>

| | |
|---|---|
| ![仪表盘](docs/screenshots/dashboard.webp)<br>**仪表盘** — 最近生成的内容、每张卡片和项目总估算成本、“自动 — 魔法！”按钮 | ![来源](docs/screenshots/sources.webp)<br>**来源** — 导入照片/PDF/文本/语音/网络内容、一键生成、学习指引检测 |

每个导入的来源都会显示其 [OCR 置信度评分、审核状态和预估成本](docs/screenshots/sources-list.webp)。

### 组件展示

| | |
|---|---|
| ![复习笔记](docs/screenshots/notes.gif)<br>**复习笔记** — 核心要点、词汇表、带出处的引用、按章节音频朗读 | ![测验](docs/screenshots/quiz.gif)<br>**选择题测验** — 带解析的即时反馈、分步导航 |
| ![记忆卡片](docs/screenshots/flashcards.gif)<br>**记忆卡片** — 翻转卡片并进行“我知道 / 我不知道”自我评估 | ![填空题](docs/screenshots/fillblank.gif)<br>**填空题** — 按需提示、容错校验 |
| ![听写](docs/screenshots/dictation.gif)<br>**听写** — 音频朗读单词、严格逐字母核对 | ![语音测验](docs/screenshots/vocal-quiz.gif)<br>**语音测验** — 大声朗读问题、麦克风语音作答 |
| ![播客](docs/screenshots/podcast.gif)<br>**播客** — 双人迷你播客、可查阅对话剧本 | ![插图](docs/screenshots/illustrations.gif)<br>**插图** — 由 Agent 生成的教学图片 |
| ![AI 导师](docs/screenshots/chat.gif)<br>**AI 导师** — 基于课程文档的对话、详细解答，可生成测验与记忆卡片 | |

### 新手入门

| | |
|---|---|
| ![选择档案](docs/screenshots/login.gif)<br>**选择档案** — 每个孩子拥有独立的空间、头像和语言 | ![创建档案](docs/screenshots/profile-create.gif)<br>**创建档案** — 年龄、头像、15岁以下家长 PIN 码 |
| ![创建课程](docs/screenshots/course.gif)<br>**创建课程** — 每节课对应一个项目，随时可添加来源 | ![设置](docs/screenshots/settings.gif)<br>**设置** — API 状态、AI 模型选择及资费标示 |

---

## 功能特性

| | 功能 | 描述 |
|---|---|---|
| 📷 | **文件导入** | 导入您的课程资料 — 照片、PDF（通过 Mistral OCR 提供平均置信度评分，分为等级 `high`/`medium`/`low`）或文本文件（TXT、MD）。支持上传会话，具备单文件重试和独立进度显示功能 |
| 📝 | **文本输入** | 直接输入或粘贴任何文本 |
| 🎤 | **语音输入** | 录制您的声音 — Voxtral STT 将语音转录为文字 |
| 🌐 | **网络 / URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取）或输入关键词进行搜索（Mistral Agent web_search） |
| 📄 | **复习笔记** | 结构化笔记，包含核心要点、词汇、引用和趣味小知识 |
| 🃏 | **记忆卡片** | 交互式问答卡片，支持对话式音频朗读 |
| ❓ | **选择题测验** | 多项选择题，支持自适应错题复习（题数可配置） |
| ✏️ | **填空题** | 完形填空练习，提供提示和容错校验 |
| 🔤 | **听写** | 从导入的列表中通过音频朗读单词（Voxtral TTS），键盘输入，严格逐字母校正并解释拼写规则 |
| 🎙️ | **播客** | 双人音频迷你播客 — 默认 Mistral 语音或自定义声音（比如父母的声音！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教学配图 |
| 🗣️ | **语音测验** | 大声朗读问题（可使用自定义声音），口述回答，AI 进行评判 |
| 💬 | **AI 导师** | 结合课程文档进行上下文对话，支持工具调用 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器分析内容，并在 8 种可用生成器中推荐最佳组合 |
| 🔒 | **家长控制** | 按档案配置内容审核（可自定义类别）、家长 PIN 码、聊天限制 |
| 🌍 | **多语言支持** | 界面支持 9 种语言；通过 Prompt 可引导 AI 用 15 种语言生成内容 |
| 🔊 | **大声朗读** | 通过 Mistral Voxtral TTS 朗读复习笔记和记忆卡片（问答对话模式） |
| 💶 | **API 成本跟踪** | 透明估算每次生成和每个来源的欧元成本（按 Token / 字符 / 页数 / 音频秒数）。在仪表盘中展示单卡片徽章及项目总额 |
| 🎨 | **档案专属主题** | 每个档案可选择 `dark` 或 `light` 主题 — 切换档案时自动保存状态 |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构概览" width="800" />
</p>

---

## 模型应用映射图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型与任务映射" width="800" />
</p>

---

## 用户学习路径

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习路径" width="800" />
</p>

---

## 深入探索 — 功能详解

### 多模态输入

EurekAI 支持 4 种来源类型，并根据用户档案进行审核（儿童和青少年档案默认开启）：

- **文件导入** — JPG、PNG 或 PDF 文件通过 Mistral OCR 处理 — **默认使用 OCR 4（`mistral-ocr-4-0`）**（质量最佳），在设置中**可选 OCR 3（`mistral-ocr-2512`）**（价格更低，成本约为一半） — 支持印刷体、表格和手写体；或直接导入纯文本文件（TXT、MD）。多文件上传采用**上传会话**系统：单文件独立进度、单个失败文件重试无需重新提交全部、完成后关闭会话。OCR 会输出平均**置信度评分**（`average`，限制在 `[0,1]` 区间，基于 Mistral 返回的 `averagePageConfidenceScore` 计算），在界面中以等级徽章显示：`high` / `medium` / `low`（阈值约 0.9 / 0.7）— 当扫描质量不佳时会给出提示而不会直接阻断。发送给 Mistral 用于 OCR 的文档副本在处理完成后会立即删除，即使处理失败也是如此。
- **自由文本** — 输入或粘贴任意内容。如果启用了审核功能，在存储前会先进行审核。
- **语音输入** — 在浏览器中录制音频。由 `voxtral-mini-latest` 进行转录。参数 `language="fr"` 可进一步优化识别效果。
- **网络 / URL** — 粘贴一个或多个 URL 直接抓取内容（针对 JS 页面使用 Readability + Lightpanda），或者输入关键词通过 Mistral Agent 进行网络搜索。单个输入框同时支持这两种形式 — URL 和关键词会自动分离，每个结果都会创建独立的来源。

### AI 内容生成

支持生成八种类型的学习材料：

| 生成器 | 模型 | 输出结果 |
|---|---|---|
| **复习笔记** | `mistral-large-latest` | 标题、摘要、核心要点、词汇、引用、趣味小知识 |
| **记忆卡片** | `mistral-large-latest` | 带有来源引用的问答卡片（数量可配置） |
| **选择题测验** | `mistral-large-latest` | 多项选择题、解析、自适应错题复习（数量可配置） |
| **填空题** | `mistral-large-latest` | 带提示的挖空句子、容错校验（Levenshtein 算法） |
| **听写** | `mistral-large-latest` + Voxtral TTS | 关键词音频朗读（每个词 1 个 MP3）→ 键盘输入 → 严格校验（包括重音符等），并解释规则 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人对话脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过 `image_generation` 工具生成教学图片 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 朗读问题 → STT 语音识别回答 → AI 评判校验 |

### AI 对话导师

具备完整课程文档访问权限的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话过程中动态生成笔记、记忆卡片、测验或填空题
- 每个课程保留 50 条消息的历史记录
- 档案若开启审核：用户的每条消息都会经过审核，而被标记、出错或尚未审核的来源会被排除在上下文和工具之外（会优先重新触发审核，最多等待 5 秒）

### 自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并在 8 种可用生成器中推荐最相关的组合。界面实时展示生成进度：先进行内容分析阶段，随后是各项独立的生成任务，支持随时取消。

### 自适应学习

- **测验统计**：跟踪每道题目的尝试次数和正确率
- **测验复习**：根据原始测验的来源资料，针对薄弱知识点重新生成 5-10 道新题（审核规则同样适用于这些来源）
- **学习指引检测**：检测复习指南或考点提示（如“掌握以下内容即代表学懂本课……”），并在兼容的文本生成器（笔记、卡片、测验、填空题）中优先体现。开启审核时，检测过程会等待来源审核完成，且仅读取被判定为安全的来源；指引会保留原始来源列表，若其中任一来源被标记有风险，则指引将不再显示或应用，并随该来源一同移除。其调用成本会计入统计

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11-15 岁）、学生（16-25 岁）、成人（26 岁以上）
- **内容审核**：`mistral-moderation-2603`（Mistral Moderation 2）包含 11 个可用类别，新的儿童/青少年档案默认屏蔽其中的 6 个类别（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`；在针对包含历史课在内的 50 篇课文进行零误报实测后新增了 `criminal`）。可在设置中按档案自定义类别；Moderation 2 已将原先的“危险内容”类别拆分为 `dangerous` + `criminal`（现有档案会自动迁移，屏蔽类别也会应用于已导入的历史来源）。默认安全机制：如果模型响应无法验证被屏蔽的类别，该内容将被拒绝（提示“审核不可用”）；在启用审核的情况下，生成功能和聊天对话均会排除被标记、出错或正在审核中的来源。从未审核过的来源（在关闭审核时导入、或关联自旧项目）在使用前会先进行审核；因服务重启中断或出错的审核流程会自动恢复执行（若服务器密钥支持则在启动时执行，否则在打开项目或下次生成时执行），并且提供了“重新审核”按钮支持手动触发。被标记或正在审核中的来源内容会对儿童隐藏（包括预览、文本和原始文档）；家长可输入 PIN 码临时解锁查看。语音测验中的口述回答在评判前也会进行审核。版本日期已固定在 `helpers/moderation-model.ts` 中：已弃用的别名 `-latest` 不再由 API 列出。
- **家长 PIN 码**：SHA-256 哈希存储，15 岁以下档案强制要求；每个 IP 地址每 15 分钟最多允许输错 10 次密码（429 `rate_limited`）。在生产环境部署时，建议使用加盐的慢哈希算法（Argon2id、bcrypt）。
- **服务器数据**：`/output` 仅公开项目媒体文件（音频、图片、导入文件）；`profiles.json`、`config.json` 以及项目文件绝不对外提供访问
- **聊天限制**：16 岁以下用户默认禁用 AI 聊天功能，可由家长手动开启

### 多档案系统

- 支持多个档案，包含姓名、年龄、头像、语言偏好
- **档案独立音色**（`Profile.mistralVoices?: { host?, guest? }` — 每个角色均为可选）— 每个孩子都可以拥有属于自己的播客/语音测验配音搭档
- **档案独立主题**（`Profile.theme: 'dark' | 'light'`）— 切换档案时自动更换主题，并在后端持久化保存
- 项目通过 `profileId` 与档案关联；未关联档案的历史项目将自动绑定至首个打开它的档案，并按照该档案的规则进行审核
- 级联删除：删除某个档案将同步删除其名下的所有项目

### API 成本追踪

每次计费的 Mistral 调用（对话、OCR、STT、TTS、智能体），包括学习指引检测以及语音测验的口头回答，均已接入监测，从而向用户提供**透明**的欧元估算。免费的内容审核不计入费用。智能体工具费用均包含在内：每次网页搜索 0.03 美元，每张生成图片 0.10 美元（Mistral 定价），加上这些工具生成的 token，按智能体模型的输入费率计算。

- **事实来源（Source of truth）**：`helpers/pricing.ts` —— 按模型前缀区分的 `MODEL_PRICING`（例如：`mistral-large` → 输入 0.5 €/M tokens，输出 1.5 €/M tokens），带有用于定期重新抓取的 Mistral 文档 URL 的 `PRICING_SOURCES`
- **支持的单位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）—— 由 `helpers/cost-calc.ts` 驱动转换
- **监测链路**：`helpers/tracked-client.ts`（封装 Mistral 客户端）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（注入到 HTTP 响应中）
- **UI**：单次生成成本徽标（`src/partials/cost-badge-gen.html`）、单来源徽标（`cost-badge-src.html`）、仪表盘累计总计（`Project.totalCost`）
- **端点**：`/generate/*` 和 `/sources/*` 响应通过 `estimatedCost`、`usage` 和 `costBreakdown` 修饰返回的对象（Generation / Source）。`POST /generate/route` 添加了一个 `costDelta: number` 字段，仅表示路由成本；`POST /detect-consigne`（`{consigne, costDelta}`）和口头回答验证也会返回其 `costDelta`。`GET /projects/:pid` 返回富集了 `totalCost`（从 `costLog[]` 计算的总和）的项目及完整历史记录

### TTS（Mistral Voxtral）与自定义语音

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`，100% Mistral 语音合成，无需额外密钥
- **自定义语音**：家长可以通过 Mistral Voices API（基于音频样本）创建自己的语音，并将其分配给主持/嘉宾角色 —— 播客和语音测验将使用家长的声音朗读，使孩子的体验更具沉浸感
- 两个可配置的语音角色：**主持**（主叙述者）和**嘉宾**（播客的第二声线）
- 设置中提供完整的 Mistral 语音目录，支持按语言过滤

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示词支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 可按档案配置语言

---

## 技术栈

| 层级 | 技术 | 角色 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | 服务端与类型安全 |
| **Backend** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars 局部模板、代理 |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，由 Vite 编译的 TypeScript |
| **模板引擎** | vite-plugin-handlebars | 通过局部模板进行 HTML 组合 |
| **AI** | Mistral AI SDK 2.x | 对话、OCR、STT、TTS、智能体、内容审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，内置语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主要内容（Firefox 阅读模式技术） |
| **Headless 浏览器** | Lightpanda | 超轻量级无头浏览器（Zig + V8），适用于 JS/SPA 页面 —— 抓取后备方案 |
| **Markdown** | Marked | 对话中的 Markdown 渲染 |
| **文件上传** | Multer 2.x | 多部分表单处理 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试 —— 覆盖率由 SonarCloud 统计 |
| **持久化** | JSON 文件 | 无依赖存储 |

---

## 模型参考

| 模型 | 用途 | 选用理由 |
|---|---|---|
| `mistral-large-latest` | 复习笔记、记忆卡片、播客、测验、填空题、对话、语音测验验证、图片智能体、网页搜索智能体、学习指引检测 | 最佳的多语言支持与指令遵循能力 |
| `mistral-ocr-4-0`（OCR 4，默认） | 文档 OCR —— 更高品质 | 印刷文本、表格、手写体（$4 / 1000 页） |
| `mistral-ocr-2512`（OCR 3，可选） | 文档 OCR | 可在设置中选择，成本更低（$2 / 1000 页） |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，使用 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、大声朗读 |
| `mistral-moderation-2603` | 内容审核 | 针对儿童/青少年封禁 6 个类别（包括 `jailbreaking`） |
| `mistral-small-latest` | 自动路由器 | 快速分析内容以做出路由决策 |

---

## 快速上手

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

> **注意**：Mistral Voxtral TTS 是唯一的 TTS 提供方 —— 除了 `MISTRAL_API_KEY` 之外无需额外密钥。

> **用户输入的 API 密钥**：`MISTRAL_API_KEY` 现已**可选**。如果缺失，应用仍会启动，并提示每位用户在界面中输入**其专属 Mistral 密钥**。密钥将**存储在浏览器中**（在安全上下文中通过 Web Crypto + IndexedDB 加密），并随请求发送 —— **绝不会持久化在服务器上**。优先级：档案密钥 > 浏览器全局密钥 > `MISTRAL_API_KEY`（环境变量）。设置 `EUREKAI_REQUIRE_USER_KEY=true` 会强制每位用户提供其密钥（环境变量密钥仅用于预加载）。

> **本地 HTTPS（平板/局域网）**：`localhost` 已属于安全上下文。对于局域网访问（平板电脑），生成本地证书并启用 HTTPS 以解锁浏览器加密并在传输中加密密钥：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # 如果可用使用 mkcert，否则使用 openssl 自签名
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # 以 HTTPS 运行 Express + Vite
> ```

### 环境变量

| 变量 | 必填 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 可选 | — | Mistral API 密钥（对话、OCR、STT、Voxtral TTS、智能体、内容审核）。若缺失，用户需在应用中输入密钥（存储在浏览器中，绝不存储在服务器上） |
| `EUREKAI_REQUIRE_USER_KEY` | 可选 | `false` | `true` → 对 AI 请求禁用后备回退到 `MISTRAL_API_KEY`（每位用户必须提供自己的密钥）。在公开暴露的实例上很有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 可选 | — | TLS 密钥/证书路径（参见 `scripts/gen-cert.sh`）→ Express 和 Vite 以 HTTPS 提供服务（局域网/平板的安全上下文） |
| `PORT` | 可选 | `3000` | Express 后端 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 若为 `production` → Express 从 `dist/` 提供前端服务（否则为 `public/`） |
| `SONAR_TOKEN` | CI 可选 | — | 仅供 GitHub Actions SonarCloud 工作流使用 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git 钩子（Husky）**：`pre-commit` 依次执行 `scripts/pre-commit-fast.sh`（冲突、大文件、shellcheck）、`lint-staged` 以及 `npm test`；`pre-push` 首先执行门禁 `npm audit`（遇 critical 级传递性漏洞则阻断，参见 `scripts/audit-verdict.mjs`），然后执行 `npm run security`。若失败均会阻止 commit/push。

**所需的外部工具（可选，但被 `pretest` / `npm run security` 使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

若没有这些工具，`npm test` 将在 `pretest` 处失败（缺少 lizard），而 `npm run security` 将失败（缺少 opengrep）。此时 husky 钩子将阻止 commit/push。

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

> **`:U`** 是一个 rootless Podman 标志，会自动调整卷的权限。

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

> **致 AI 贡献者**：请查阅 [`CLAUDE.md`](CLAUDE.md) 获取详细的架构上下文、强制性规则（防提示词泄露、错误代码、成本追踪）以及已知陷阱（Lizard CCN、Opengrep、Codacy/Semgrep 迁移）。

---

## API 参考

### 配置（Config）
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已定义 Mistral 密钥），`ttsAvailable`（`mistral` 的别名，Mistral Voxtral 为唯一 TTS 提供方） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 语音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的审核类别 + 按年龄段设置的默认值 |
| `POST` | `/api/providers/mistral/validate` | 验证用户输入的 Mistral 密钥 —— 始终返回 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`），不回退到环境变量 |

### 档案（Profiles）
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有档案 |
| `POST` | `/api/profiles` | 创建档案 |
| `PUT` | `/api/profiles/:id` | 修改档案（15 岁以下需要 PIN 码；15 分钟内输错 10 次 PIN 码 → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | 删除档案 + 级联项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目（Projects）
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情；`?profileId=` 将未关联档案的项目关联至打开它的档案 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |
| `GET` | `/api/projects/:pid/events` | 生成状态转换（`completed`/`failed`/`cancelled`）的实时 SSE 流（`event: generation`）+ 保活心跳 |

### 来源（Sources）
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 多部分文件导入（JPG/PNG/PDF 进行 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 语音 STT（多部分音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | 抓取 URL 或网页搜索 `{query}` —— 返回来源数组；若所有地址均被拒绝（内网）则返回 422 `url_blocked`，若未成功创建任何来源则返回 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 重新处理处于待审核或错误状态的审核 `{sourceIds?}`（每次调用最多 10 个，等待 ≤ 10 秒）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除某个来源、其导入的文件及依赖于它的学习指引 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习相关的学习指引（仅限已验证来源）→ `{consigne, costDelta}` |

### 生成（Generation）
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习笔记 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 记忆卡片 |
| `POST` | `/api/projects/:pid/generate/quiz` | 选择题测验 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/dictation` | 听写（词汇 + 例句 + 规则，每个词 1 个 TTS 音频；也可由自动路由器提供） |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 针对测验中答错题目的专项回顾卡 `{generationId, weakQuestions}` —— 通过“针对我的错题进行练习”按钮与 `quiz-review` 并行调用 |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（要启动的生成器计划）—— 返回 `{plan, costDelta}`（仅限路由成本） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 8 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。并行执行 —— 假定所用 Mistral 套餐等级的速率限制 ≥ 8 个并发请求；否则可能会在 `failedSteps` 中返回多个 429。 |

所有生成路由均接收 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`；若 `lang` 不是合法的语言代码（例如 `pt-BR`）或 `ageGroup` 未知 → 在发起任何 AI 调用之前返回 400 `invalid_input`。`quiz-review` 和 `remediation-summary` 还额外需要 `{generationId, weakQuestions}`，并作用于原测验的来源。

### 生成内容增删改查（CRUD Generations）
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验回答 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空题回答 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 提交听写回答 `{answers}`（严格服务端评分） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口头回答（音频 + questionIndex）；回答经审核（400 `quiz.answerBlocked`），成本在 `costDelta` 中返回 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 大声朗读（复习笔记/记忆卡片） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 取消正在进行的生成（取消待处理 pending 状态的唯一路径） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成及其媒体内容（音频、图片） |

### 对话（Chat）
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取对话历史记录 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | 清空对话历史记录 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **选用 Alpine.js 而非 React/Vue** | 极小的体积开销，配合 Vite 编译的 TypeScript 实现轻量级响应式。非常适合注重速度的黑客松。 |
| **JSON 文件持久化** | 零依赖，即时启动。无需配置数据库 —— 启动即可运行。 |
| **Vite + Handlebars** | 两全其美：快速的开发 HMR、用于代码组织的 HTML 局部模板、Tailwind JIT。 |
| **集中式提示词** | 所有 AI 提示词均存放在 `prompts.ts` 中 —— 便于迭代、测试以及根据语言/年龄段进行调整。 |
| **多生成实例系统** | 每次生成均为具有独立 ID 的独立对象 —— 允许每门课程拥有多份复习笔记、测验等。 |
| **按年龄适配提示词** | 4 个年龄段，具有不同的词汇、复杂度和语气 —— 相同的内容根据学习者的不同采用不同的教学方式。 |
| **基于智能体的功能** | 图片生成和网页搜索使用临时的 Mistral Agents —— 具备自动清理的干净生命周期。 |
| **智能 URL 抓取** | 单个输入框同时接受混合的 URL 和关键词 —— URL 通过 Readability（静态页面）抓取，并以 Lightpanda（JS/SPA 页面）作为后备方案，关键词触发 Mistral web_search 智能体。每个结果都会创建独立的来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）—— 语音合成已集成至成本链路及各语言语音解析中。 |

---

## 鸣谢与致谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 轻量级响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用类优先 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox 阅读模式技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面的超轻量级无头浏览器
- **[Luciole](https://luciole-vision.com)** — 专为视障读者设计的字体，© Laurent Bourcellier & Jonathan Perez，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（档案中的“阅读舒适度”选项）

始于 Mistral AI 全球黑客松（2026 年 3 月），完全由 AI 通过 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 与 [Gemini CLI](https://geminicli.com/) 开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**使用 gemini-3.8-flash-medium 从法语翻译成中文的文章。**
