<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 标志" width="120" />
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="质量阈"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="安全评级"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="可靠性评级"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="可维护性评级"></a>
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

## 诞生故事——为什么要做 EurekAI？

**EurekAI** 诞生于 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。当时我需要一个选题——灵感来自一件非常具体的事：我经常陪女儿复习备考，当时我就在想，借助 AI 一定能让这个过程变得更有趣、更具互动性。

其目标是：接收**任意形式的输入**——课本照片、复制粘贴的文本、语音录制、网络搜索——并将其转化为**复习单、抽认卡、测验、播客、填空题、插图等多种形式**。这一切均由法国企业 Mistral AI 的模型驱动，使 EurekAI 天然契合法语区学生的需求。

在黑客松期间，[最初的原型](https://github.com/jls42/worldwide-hackathon.mistral.ai)在 48 小时内完成，作为基于 Mistral 服务的概念验证——当时已具备可用功能，但相对有限。自那以后，EurekAI 演进成了一个真正的完整项目：填空练习、练习导航、网页抓取、可配置的家长控制审核、深度代码审查等等。项目的全部代码均由 AI 生成——主要通过 [Claude Code](https://code.claude.com/)，并辅以 [Codex](https://openai.com/codex/) 与 [Gemini CLI](https://geminicli.com/) 的部分贡献。

---

## 概览

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 漫游：资料来源、复习单、测验、抽认卡、插图" width="820" />
</p>

| | |
|---|---|
| ![仪表盘](docs/screenshots/dashboard.webp)<br>**仪表盘**——最近生成内容、按卡片预估费用及项目总费用、“自动——魔法！”按钮 | ![资料来源](docs/screenshots/sources.webp)<br>**资料来源**——支持照片/PDF/文本/语音/网页导入、一键生成、学习要求检测 |

每个导入的资料源都会显示其 [OCR 置信度得分、审核状态及预估费用](docs/screenshots/sources-list.webp)。

### 组件展示

| | |
|---|---|
| ![复习单](docs/screenshots/notes.gif)<br>**复习单**——核心要点、词汇、带出处的引用、分节音频朗读 | ![测验](docs/screenshots/quiz.gif)<br>**单选题测验**——每题仅一个正确答案、即时反馈与解析、逐步导航 |
| ![抽认卡](docs/screenshots/flashcards.gif)<br>**抽认卡**——翻转卡片进行“我知道 / 我不知道”自我评估 | ![填空题](docs/screenshots/fillblank.gif)<br>**填空题**——按需提供提示、容错校验 |
| ![听写](docs/screenshots/dictation.gif)<br>**听写**——音频报词、严格逐字核对纠错 | ![语音测验](docs/screenshots/vocal-quiz.gif)<br>**语音测验**——大声朗读题目、麦克风语音作答 |
| ![播客](docs/screenshots/podcast.gif)<br>**播客**——双人迷你播客音频、支持查看对话脚本 | ![插图](docs/screenshots/illustrations.gif)<br>**插图**——由 Agent 生成的教学插图 |
| ![AI 导师](docs/screenshots/chat.gif)<br>**AI 导师**——基于课程文档的问答对话、详细解答，并可直接生成测验和抽认卡 | |

### 快速上手

| | |
|---|---|
| ![选择个人资料](docs/screenshots/login.gif)<br>**选择个人资料**——每个孩子拥有专属空间、头像与语言偏好 | ![创建个人资料](docs/screenshots/profile-create.gif)<br>**创建个人资料**——设置年龄、头像，15 岁以下需设置家长 PIN 码 |
| ![创建课程](docs/screenshots/course.gif)<br>**创建课程**——每节课一个专属项目，随时准备导入资料 | ![设置](docs/screenshots/settings.gif)<br>**设置**——API 状态、AI 模型选择及对应资费显示 |

---

## 功能特性

| | 功能 | 描述 |
|---|---|---|
| 📷 | **文件导入** | 导入您的课本资料——照片、PDF（通过 Mistral OCR 识别并带有平均置信度得分，划分为 `high`/`medium`/`low` 三个档次）或文本文件（TXT、MD）。支持上传会话，提供单文件重试与独立进度显示 |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 直接录音——由 Voxtral STT 进行语音转写 |
| 🌐 | **网页 / URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取网页）或输入搜索词（Mistral Agent web_search 联网搜索） |
| 📄 | **复习单** | 结构化笔记，包含核心要点、词汇、引用与趣味小知识 |
| 🃏 | **抽认卡** | 交互式问答卡片，支持问答对话音频朗读 |
| ❓ | **单选题测验** | 四选一单选题，包含错题自适应复习（题数可配置） |
| ✏️ | **填空题** | 包含提示与容错校验的完形填空练习 |
| 🔤 | **听写** | 根据导入的词单通过音频朗读（Voxtral TTS），键盘输入，逐字严格核对纠错并解释拼写规则 |
| 🎙️ | **播客** | 双人迷你音频播客——默认 Mistral 语音或自定义语音（例如家长录音！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教学插图 |
| 🗣️ | **语音测验** | 朗读题目（可使用自定义声音）、口头作答并由 AI 评估检验 |
| 💬 | **AI 导师** | 结合课程文档的上下文对话聊天，支持工具调用 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器分析内容，并在 8 种可用生成器中推荐最佳组合 |
| 🔒 | **家长控制** | 支持按个人资料配置的内容审核（类别可定制）、家长 PIN 码、聊天限制 |
| 🌍 | **多语言支持** | 界面支持 9 种语言；通过提示词可驱动 AI 在 15 种语言下进行内容生成 |
| 🔊 | **语音朗读** | 通过 Mistral Voxtral TTS 收听复习单与抽认卡（问答对话模式） |
| 💶 | **API 成本跟踪** | 透明预估每次生成与每个资料来源的欧元（€）成本（基于 Token / 字符 / 页数 / 音频秒数）。在仪表盘中为每张卡片提供徽章标记并汇总项目总成本 |
| 🎨 | **独立主题** | 每个资料可独立选择 `dark` 或 `light` 主题——与个人资料绑定保存，并在切换资料时自动重新应用 |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构概览" width="800" />
</p>

---

## 模型任务映射图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型与任务映射" width="800" />
</p>

---

## 用户学习旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习旅程" width="800" />
</p>

---

## 功能深度解析

### 多模态输入

EurekAI 支持 4 种类型的资料来源，并根据用户资料进行审核（儿童与青少年资料默认开启审核）：

- **文件导入**——JPG、PNG 或 PDF 文件由 Mistral OCR 处理——**默认为 OCR 4（`mistral-ocr-4-0`）**（质量最佳），在设置中可**可选 OCR 3（`mistral-ocr-2512`）**（更经济，成本约减半）——适用于印刷文本、表格与手写内容；亦可直接导入纯文本文件（TXT、MD）。多文件上传采用**上传会话**系统：单文件独立进度显示、支持对失败文件进行单独重试而无需重新提交其他文件、完成后关闭会话。OCR 会输出平均**置信度得分**（`average`，限制在 `[0,1]` 范围内，根据 Mistral 返回的 `averagePageConfidenceScore` 计算得出），并在界面中以等级徽章 `high` / `medium` / `low`（阈值约 0.9 / 0.7）展示——当扫描质量较差时进行提示但不会阻断流程。发送给 Mistral 进行 OCR 的文档副本会在处理完成后立即删除，即使处理失败也是如此。
- **自由文本**——键入或粘贴任意内容。如果启用了内容审核，文本将在存储前经过审核。
- **语音输入**——在浏览器中录制音频。由 `voxtral-mini-latest` 完成转写。参数 `language="fr"` 可进一步优化识别效果。
- **网页 / URL**——粘贴一个或多个 URL 以直接抓取内容（针对包含 JS 的页面结合使用 Readability + Lightpanda），或者输入关键词通过 Mistral Agent 进行网络搜索。单个输入框同时支持这两种形式——URL 与关键词会自动分离，每个抓取结果都会生成一个独立的资料源。

### AI 内容生成

八种生成的学习材料类型：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习单** | `mistral-large-latest` | 标题、摘要、核心要点、词汇、引用、趣味小知识 |
| **抽认卡** | `mistral-large-latest` | 带有资料出处的问答卡片（数量可配置） |
| **单选题测验** | `mistral-large-latest` | 四选一单选题、解析、自适应错题复习（数量可配置） |
| **填空题** | `mistral-large-latest` | 带有提示的填空句子、容错校验（Levenshtein 算法） |
| **听写** | `mistral-large-latest` + Voxtral TTS | 关键词音频听写（每个词 1 个 MP3） → 键盘输入 → 严格纠错（遗漏变音符号即视为拼写错误）并附带规则解释 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过 `image_generation` 工具生成教学图像 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 朗读题目 → STT 语音转写回答 → AI 评估检验 |

### 对话式 AI 导师

能够完整访问课程文档的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话过程中直接生成复习单、抽认卡、测验或填空题
- 每门课程保留 50 条历史消息记录
- 个人资料若启用审核：消息将接受审核检验，凡被标记违规、审核失败以及尚未审核的资料源均会被排除在上下文和工具之外（对于失败或尚未审核的资料源，系统会先尝试重新发起审核，最多耗时 5 秒）

### 自动路由器

路由器使用 `mistral-small-latest` 分析资料源内容，并在 8 种可用生成器中推荐最相关的生成器组合。界面实时显示进度：首先进入分析阶段，随后按项目单独生成，并支持随时取消。

### 自适应学习

- **测验统计**：跟踪每道题的作答尝试次数与准确率
- **测验复习**：基于原测验的资料源，针对薄弱知识点生成 5-10 道新题（审核防护机制同样适用于这些资料源）
- **学习要求检测**：检测复习指令或考核标准（“掌握以下内容即掌握本课……”），并在兼容的文本生成器（复习单、抽认卡、测验、填空题）中优先考虑。在启用审核时，检测过程会等待资料源完成审核，且仅读取被判定为安全的资料；学习要求会记录其来源资料列表：一旦其中任一资料被标记违规，该要求将不再展示或生效；若任一来源资料被删除，该要求也将被一并清除。其产生的成本会被计入统计

### 安全与家长控制

- **4 个年龄组别**：儿童（≤10 岁）、青少年（11-15 岁）、学生（16-25 岁）、成人（26+ 岁）
- **内容审核**：使用 `mistral-moderation-2603`（Mistral Moderation 2），支持 11 个可用类别，针对新建的儿童/青少年个人资料默认拦截其中 6 类（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`；在针对包含历史在内的 50 节课进行测试且实现零误报后，加入了 `criminal`）。可在设置中按个人资料自定义审核类别；Moderation 2 已将原有的“危险内容”类别拆分为 `dangerous` + `criminal`（现有个人资料将自动迁移，拦截类别同样适用于已导入的资料源）。安全默认设置：若模型响应无法对拦截类别完成判定，则直接拒绝该内容（“审核不可用”）；在启用审核的情况下，内容生成与聊天对话均会剔除被标记违规、审核失败以及审核中的资料源。从未经过审核的资料源（在审核关闭时导入，或旧项目重新关联到个人资料）在使用前会先执行审核。因系统重启而中断的审核，在服务器密钥允许的情况下会在启动时自动恢复；否则，与出错的审核一样，将在打开项目或下一次生成时恢复执行。提供“重新审核”按钮支持按需重新发起审核。在启用审核时，只要资料源尚未被判定为安全，其内容就会对儿童隐藏（预览、文本、原始文档）；家长可输入 PIN 码临时查看单次。语音测验中的口头回答在核验前同样会进行审核。`helpers/moderation-model.ts` 中固定了带日期的模型 ID：已废弃的别名 `-latest` 不再被 API 列出。
- **家长 PIN 码**：SHA-256 哈希，15 岁以下个人资料必填；每 IP 地址每 15 分钟最多尝试错误 10 次（429 `rate_limited`）。在生产环境中部署时，建议使用带加盐的慢哈希算法（如 Argon2id、bcrypt）。
- **服务器数据**：`/output` 仅对外提供项目媒体资源（音频、图像、导入的文件）；`profiles.json`、`config.json`、`projects.json` 以及各类 `project.json` 绝不会被对外提供
- **聊天限制**：16 岁以下默认关闭 AI 聊天，家长可手动开启

### 多用户档案系统

- 支持多个人资料，包含姓名、年龄、头像与语言偏好
- **专属语音配置**（`Profile.mistralVoices?: { host?, guest? }`——每个角色均为可选）——每个孩子均可拥有专属的播客/语音测验配音组合
- **专属主题**（`Profile.theme: 'dark' | 'light'`）——切换个人资料时自动切换，后端持久化保存
- 项目通过 `profileId` 关联至个人资料；未关联资料的旧项目将归属至首个打开它的个人资料，并按照该资料的规则执行审核
- 级联删除：删除某个个人资料将同时删除其下的所有项目

### API 成本追踪

每个可计费的 Mistral 调用（聊天、OCR、STT、TTS、智能体），包括指令检测和语音测验的口述回答，均已植入监控以向用户提供**透明**的欧元（€）估算。内容审核免费，不计入成本。智能体工具费用已包含在内：每次网络搜索 0.03 美元，每张生成图片 0.10 美元（Mistral 定价），再加上这些工具生成的 token，估算时按该智能体模型的输入费率计费。

- **单一事实来源**：`helpers/pricing.ts` — 按模型前缀划分的 `MODEL_PRICING`（例如：`mistral-large` → 输入 0.5 €/M tokens，输出 1.5 €/M tokens），带有用于定期重新抓取的 Mistral 文档 URL 的 `PRICING_SOURCES`
- **支持的单位**：`tokens`、`characters` (TTS)、`pages` (OCR)、`audio-seconds` (STT) — 转换由 `helpers/cost-calc.ts` 驱动
- **监控链路**：`helpers/tracked-client.ts`（封装 Mistral 客户端）→ `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（注入到 HTTP 响应中）
- **UI**：单次生成的成本徽章 (`src/partials/cost-badge-gen.html`)、单个来源的成本徽章 (`cost-badge-src.html`)，仪表盘中的累计总额 (`Project.totalCost`)
- **端点**：`/generate/*` 和 `/sources/*` 的响应会使用 `estimatedCost`、`usage` 与 `costBreakdown` 来修饰返回的对象（`Generation` / `Source`）。`POST /generate/route` 添加了一个 `costDelta: number` 字段仅表示路由成本；`POST /detect-consigne` (`{consigne, costDelta}`) 以及口述回答的验证也会返回其 `costDelta`。`GET /projects/:pid` 返回附带有 `totalCost`（从 `costLog[]` 计算得出的总和）的丰富项目数据 + 完整历史记录

### TTS (Mistral Voxtral) 与自定义声音

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`，100% Mistral 语音合成，无需额外密钥
- **自定义声音**：家长可以通过 Mistral Voices API（基于音频样本）创建自己的声音，并分配给主持人/嘉宾角色——播客和语音测验便会使用家长的声音朗读，使孩子的体验更具沉浸感
- 两个可配置的声音角色：**主持人**（主叙述者）和**嘉宾**（播客第二声音）
- 设置中提供完整的 Mistral 声音目录，可按语言筛选

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示词支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 语言可按个人档案配置

---

## 技术栈

| 层级 | 技术 | 职责 |
|---|---|---|
| **运行时** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **后端** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、代理 |
| **前端** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，由 Vite 编译的 TypeScript |
| **模板引擎** | vite-plugin-handlebars | 通过 partials 进行 HTML 组合 |
| **AI** | Mistral AI SDK 2.x | 聊天、OCR、STT、TTS、智能体（Agents）、内容审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，集成语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 网页主要内容提取（Firefox 阅读模式技术） |
| **无头浏览器** | Lightpanda | 用于 JS/SPA 页面的超轻量级无头浏览器（Zig + V8）— 抓取后备方案 |
| **Markdown** | Marked | 聊天中的 Markdown 渲染 |
| **文件上传** | Multer 2.x | 处理 multipart 表单 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试 — 覆盖率由 SonarCloud 测定 |
| **持久化** | JSON 文件 | 无外部依赖存储 |

---

## 模型参考

| 模型 | 用途 | 适用原因 |
|---|---|---|
| `mistral-large-latest` | 复习单、抽认卡、播客、测验、填空题、聊天、语音测验验证、图像智能体、网络搜索智能体、指令检测 | 最佳多语言能力 + 指令遵循能力 |
| `mistral-ocr-4-0`（OCR 4，默认） | 文档 OCR — 超高品质 | 印刷文本、表格、手写体（4 美元 / 1000 页） |
| `mistral-ocr-2512`（OCR 3，可选） | 文档 OCR | 可在设置中选择，更经济（2 美元 / 1000 页） |
| `voxtral-mini-latest` | 语音识别 (STT) | 多语言 STT，已通过 `language="fr"` 进行优化 |
| `voxtral-mini-tts-latest` | 语音合成 (TTS) | 播客、语音测验、大声朗读 |
| `mistral-moderation-2603` | 内容审核 | 为儿童/青少年屏蔽的 6 个类别（包含 `jailbreaking`） |
| `mistral-small-latest` | 自动路由器 | 快速内容分析以做出路由决策 |

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

> **注意**：Mistral Voxtral TTS 是唯一的 TTS 服务提供商——除 `MISTRAL_API_KEY` 之外无需任何额外密钥。

> **用户输入的 API 密钥**：`MISTRAL_API_KEY` 现在是**可选的**。如果未提供，应用仍会启动，并提示每位用户在界面中输入**其专属的 Mistral 密钥**。密钥**存储在浏览器中**（在安全上下文中通过 Web Crypto + IndexedDB 加密），并随请求发送——**绝不在服务器上持久化**。优先级顺序：个人档案密钥 > 浏览器全局密钥 > `MISTRAL_API_KEY` (env)。设置 `EUREKAI_REQUIRE_USER_KEY=true` 会强制每位用户提供自己的密钥（环境变量密钥仅用于预加载）。

> **本地 HTTPS（平板/局域网）**：`localhost` 已经是安全上下文。对于局域网（平板电脑）访问，请生成本地证书并启用 HTTPS：这样浏览器就能加密其存储的密钥，且密钥在传输过程中也是加密的：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 环境变量

| 变量 | 必填 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 可选 | — | Mistral API 密钥（聊天、OCR、STT、Voxtral TTS、智能体、审核）。如果未提供，用户需在应用中输入其密钥（存储在浏览器中，绝不保存于服务器） |
| `EUREKAI_REQUIRE_USER_KEY` | 可选 | `false` | `true` → 禁用 AI 请求回退到 `MISTRAL_API_KEY`（每位用户必须提供自己的密钥）。适用于公开部署的实例 |
| `HTTPS_KEY` / `HTTPS_CERT` | 可选 | — | TLS 密钥/证书路径（参见 `scripts/gen-cert.sh`）→ Express 和 Vite 以 HTTPS 方式提供服务（局域网/平板的安全上下文） |
| `PORT` | 可选 | `3000` | Express 后端 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 若为 `production` → Express 从 `dist/` 提供前端服务（否则为 `public/`） |
| `SONAR_TOKEN` | CI 可选 | — | 仅用于 GitHub Actions 的 SonarCloud 工作流 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git 钩子 (Husky)**：`pre-commit` 串联执行 `scripts/pre-commit-fast.sh`（冲突、大文件、shellcheck）、`lint-staged` 然后执行 `npm test`；`pre-push` 先执行阻断性检查 `npm audit`（只要任何依赖项，包括传递依赖，存在 `critical` 级别的漏洞即阻断，参见 `scripts/audit-verdict.mjs`），然后执行 `npm run security`。一旦任何步骤失败，每个钩子都会阻断 commit/push。

**外部工具（运行应用程序可选，但对于 `pretest` 和 `npm run security` 必不可少）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

若没有这些工具，`npm test` 会在 `pretest` 处失败（缺少 lizard），而 `npm run security` 会失败（缺少 opengrep）。随后 husky 钩子会阻断 commit/push。

---

## 容器化部署

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

> **`:U`**：自动调整卷权限的 Podman rootless 标志。

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

> **致参与代码贡献的 AI 智能体**：请参阅 [`CLAUDE.md`](CLAUDE.md) 获取详细的架构上下文、强制规则（错误代码、成本追踪，以及不包含元词汇的提示词——即不包含文档类型等修饰词，因为模型会在输出中复制这些词）和已知陷阱（Lizard CCN、Opengrep、Codacy/Semgrep 迁移）。

---

## API 参考

### 配置
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、声音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已设置 Mistral 密钥），`ttsAvailable`（`mistral` 的别名，Mistral Voxtral 是唯一的 TTS 提供商） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 声音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的审核类别 + 按年龄划分的默认值 |
| `POST` | `/api/providers/mistral/validate` | 验证用户输入的 Mistral 密钥 — 始终返回 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`），不回退到环境变量 |

### 个人档案
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有个人档案 |
| `POST` | `/api/profiles` | 创建个人档案 |
| `PUT` | `/api/profiles/:id` | 修改个人档案（小于 15 岁需要 PIN；15 分钟内 10 次 PIN 错误 → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | 删除个人档案 + 级联删除项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情；`?profileId=` 将没有个人档案的项目关联到打开它的个人档案 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |
| `GET` | `/api/projects/:pid/events` | 生成状态流转（`completed`/`failed`/`cancelled`）的实时 SSE 流（`event: generation`）+ 心跳保活（heartbeat keep-alive） |

### 来源
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入 multipart 文件（JPG/PNG/PDF 进行 OCR 处理，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 语音 STT（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL 抓取或网络搜索 `{query}` — 返回来源数组；如果所有地址均被拒绝（内部网络），则返回 422 `url_blocked`；如果未能创建任何来源，则返回 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 恢复待处理或出错的审核 `{sourceIds?}`（单次调用最多 10 个，等待 ≤ 10 秒）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源、其导入的文件以及依赖于它的指令 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令（仅限已验证来源）→ `{consigne, costDelta}` |

### 内容生成
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习单 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 抽认卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 单项选择测验（4 个选项，单选正确答案） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/dictation` | 听写（单词 + 例句 + 规则，每个单词 1 个 TTS 音频；自动路由器也会推荐） |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 针对测验错题的复习单 `{generationId, weakQuestions}` — 由测验视图中的强化补救按钮与 `quiz-review` 并行调用 |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（待启动的生成器计划）— 返回 `{plan, costDelta}`（仅路由成本） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 8 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。并行执行 — 假定 Mistral 账户层级的速率限制（rate-limit）≥ 8 次并发请求；否则可能会在 `failedSteps` 中返回多个 429。 |

所有生成路由均接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`；在进行任何 AI 调用之前，未知的 `ageGroup` 或不是有效语言代码的 `lang`（预期为：`fr`、`pt-BR`……）会返回 → 400 `invalid_input`。`quiz-review` 和 `remediation-summary` 另外需要 `{generationId, weakQuestions}`，并作用于原始测验的来源。

### 生成结果 CRUD
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验回答 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空题回答 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 提交听写回答 `{answers}`（服务端严格计分） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口述回答（音频 + questionIndex）；口述回答在验证前先进行审核（拒绝：400 `quiz.answerBlocked`），成本在 `costDelta` 中返回 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 大声朗读（复习单/抽认卡） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 取消正在进行的生成（取消 pending 状态的唯一途径） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成内容及其媒体文件（音频、图像） |

### 聊天
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天历史记录 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | 清除聊天历史记录 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **选择 Alpine.js 而非 React/Vue** | 极小体积，通过 Vite 编译的 TypeScript 提供轻量级响应式。非常适合追求速度的黑客松。 |
| **JSON 文件持久化** | 零依赖，即开即用。无需配置数据库——启动即可开始。 |
| **Vite + Handlebars** | 两全其美：快速开发 HMR、用于代码组织的 HTML partials 以及 Tailwind JIT。 |
| **集中式提示词** | 所有 AI 提示词均汇总在 `prompts.ts` 中 — 便于迭代、测试并按语言/年龄段进行适配。 |
| **多生成结果系统** | 每次生成都是具有独立 ID 的对象 — 支持每门课程生成多个复习单、测验等。 |
| **按年龄适配的提示词** | 4 个年龄段对应不同的词汇、复杂度和语气 — 针对不同学习者以不同方式传授相同内容。 |
| **基于智能体的功能** | 图像生成和网络搜索采用临时 Mistral 智能体 — 具备自动清理的整洁生命周期。 |
| **智能 URL 抓取** | 单个输入字段即可接收混合的 URL 和关键词 — 静态页面的 URL 通过 Readability 抓取，JS/SPA 页面回退到 Lightpanda，关键词则触发 Mistral 的 web_search 智能体。每个结果都会生成一个独立的来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）— 语音合成深度集成到成本追踪链及按语言的声音解析中。 |

---

## 鸣谢与致谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 轻量级响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 工具类 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox 阅读视图技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面的超轻量无头浏览器
- **[Luciole](https://luciole-vision.com)** — 专为视障读者设计的字体，© Laurent Bourcellier & Jonathan Perez，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（配置文件“阅读舒适度”选项）

始于 Mistral AI Worldwide Hackathon（2026 年 3 月），完全由 AI 借助 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**使用 gemini-3.8-flash-high 从法语翻译成中文的文章。**
