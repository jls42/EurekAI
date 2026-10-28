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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="质量门禁"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="安全评级"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="可靠性评级"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="可维护性评级"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="测试覆盖率"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="漏洞"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="代码异味"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="代码行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy 徽章"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 缘起——为什么做 EurekAI？

**EurekAI** 诞生于 [Mistral AI 全球黑客松](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。当时我需要一个选题——而灵感来自一件非常具体的事情：我经常陪女儿复习准备测验，于是想到，借助 AI 应该可以让这件事变得更有趣、更具互动性。

目标是：接收**任何输入**——一张课文照片、一段复制粘贴的文字、一段录音、一次网络搜索——并将其转化为**复习卡片、记忆卡片、测验、播客、填空题、插图等等**。这一切均由法国公司 Mistral AI 的模型驱动，这也让 EurekAI 天然适合法语学生使用。

[最初的原型](https://github.com/jls42/worldwide-hackathon.mistral.ai)是在黑客松期间用 48 小时打造的概念验证，基于 Mistral 的各项服务构建——已经可以运行，但功能有限。此后，EurekAI 发展成了一个真正的项目：填空题、练习导航、网页抓取、可配置的家长内容审核、深入的代码审查，以及更多功能。全部代码均由 AI 生成——主要使用 [Claude Code](https://code.claude.com/)，也有部分来自 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 的贡献。

---

## 概览

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 导览：资料来源、复习卡片、测验、记忆卡片、插图" width="820" />
</p>

| | |
|---|---|
| ![仪表盘](docs/screenshots/dashboard.webp)<br>**仪表盘**——最近的生成内容、每张卡片的预估费用及项目总计、「自动——变魔术！」按钮 | ![资料来源](docs/screenshots/sources.webp)<br>**资料来源**——导入照片/PDF/文本/语音/网页，一键生成，自动检测复习要求 |

每个导入的资料来源都会显示其 [OCR 置信度评分、审核状态和预估费用](docs/screenshots/sources-list.webp)。

### 各组件实际效果

| | |
|---|---|
| ![复习卡片](docs/screenshots/notes.gif)<br>**复习卡片**——要点、词汇、附出处的引文、分节朗读 | ![测验](docs/screenshots/quiz.gif)<br>**选择题测验**——每题仅有一个正确答案，即时反馈并附解析，逐题导航 |
| ![记忆卡片](docs/screenshots/flashcards.gif)<br>**记忆卡片**——翻转卡片，再自评「我会 / 我不会」 | ![填空题](docs/screenshots/fillblank.gif)<br>**填空题**——按需提示，宽松校验 |
| ![听写](docs/screenshots/dictation.gif)<br>**听写**——语音播报单词，逐字母严格批改 | ![语音测验](docs/screenshots/vocal-quiz.gif)<br>**语音测验**——朗读题目，通过麦克风作答 |
| ![播客](docs/screenshots/podcast.gif)<br>**播客**——双人迷你播客，可查看对话脚本 | ![插图](docs/screenshots/illustrations.gif)<br>**插图**——由 Agent 生成的教育类图片 |
| ![AI 辅导老师](docs/screenshots/chat.gif)<br>**AI 辅导老师**——基于课程文档的聊天，答案附讲解，可生成测验和记忆卡片 | |

### 快速上手

| | |
|---|---|
| ![选择档案](docs/screenshots/login.gif)<br>**选择档案**——每个孩子都有自己的空间、头像和语言 | ![创建档案](docs/screenshots/profile-create.gif)<br>**创建档案**——年龄、头像，15 岁以下需设置家长 PIN 码 |
| ![创建课程](docs/screenshots/course.gif)<br>**创建课程**——每节课一个项目，随时可以添加资料来源 | ![设置](docs/screenshots/settings.gif)<br>**设置**——API 状态，选择 AI 模型并显示价格 |

---

## 功能

| | 功能 | 说明 |
|---|---|---|
| 📷 | **文件导入** | 导入课文——照片、PDF（通过 Mistral OCR，提供平均置信度评分，分为 `high`/`medium`/`low` 三档）或文本文件（TXT、MD）。上传会话支持按文件重试及单独显示进度 |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 录下自己的声音——由 Voxtral STT 转写 |
| 🌐 | **网页 / URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索词（Mistral Agent web_search） |
| 📄 | **复习卡片** | 结构化笔记，包含要点、词汇、引文、趣闻 |
| 🃏 | **记忆卡片** | 互动式问答卡片，支持对话式朗读 |
| ❓ | **选择题测验** | 每题 4 个选项，仅一个正确答案，并针对错题进行自适应复习（题目数量可配置） |
| ✏️ | **填空题** | 带提示和宽松校验的填空练习 |
| 🔤 | **听写** | 从导入的词表中以语音播报单词（Voxtral TTS），键盘输入，逐字母严格批改，并讲解拼写规则 |
| 🎙️ | **播客** | 双人语音迷你播客——默认使用 Mistral 语音，也可使用自定义语音（比如爸爸妈妈的声音！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育类图片 |
| 🗣️ | **语音测验** | 朗读题目（可使用自定义语音），口头作答，由 AI 判定 |
| 💬 | **AI 辅导老师** | 结合课程文档的上下文聊天，支持工具调用 |
| 🧠 | **自动路由** | 基于 `mistral-small-latest` 的路由器分析内容，从 8 种可用生成器中推荐一个组合 |
| 🔁 | **跨课程连续运行** | 打开另一门课程时，导入、自动生成、麦克风录音、聊天、网络搜索和朗读都会继续在原课程中进行；在别处完成时，会有通知注明对应课程 |
| 🔒 | **家长控制** | 按档案配置的内容审核（类别可自定义）、家长 PIN 码、聊天限制 |
| 🌍 | **多语言** | 界面提供 9 种语言；通过提示词可用 15 种语言进行 AI 生成 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 收听复习卡片和记忆卡片（问答对话形式） |
| 💶 | **API 费用跟踪** | 透明估算每次生成和每个资料来源的欧元费用（token / 字符 / 页数 / 音频秒数）。每张卡片显示徽章，并显示项目总计，可在仪表盘中查看 |
| 🎨 | **按档案设置主题** | 每个档案可选择 `dark` 或 `light` 主题——随档案保存，切换档案时自动重新应用 |

---

## 架构总览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构总览" width="800" />
</p>

---

## 模型使用图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型与任务对应关系" width="800" />
</p>

---

## 用户旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习旅程" width="800" />
</p>

---

## 深入解析——功能

### 多模态输入

EurekAI 支持 4 种资料来源，并根据档案进行审核（儿童和青少年档案默认启用审核）：

- **文件导入**——JPG、PNG 或 PDF 文件由 Mistral OCR 处理——默认使用 **OCR 4.1**（`mistral-ocr-4-1`），也可在设置中选择 **OCR 3**（`mistral-ocr-2512`）（更便宜，费用约为一半；识别手写更好）——适用于印刷文字、表格和手写内容；文本文件（TXT、MD）则直接导入。多文件上传采用**上传会话**机制：每个文件单独显示进度，失败的文件可单独重试而无需重新提交其他文件，完成后可关闭会话。OCR 提供平均**置信度评分**（`average`，限制在 `[0,1]` 范围内，根据 Mistral 返回的 `averagePageConfidenceScore` 计算），在界面中以 `high` / `medium` / `low` 档位徽章显示（阈值约为 0.9 / 0.7）——扫描质量较差时会发出提醒，但不会阻止操作。发送给 Mistral 进行 OCR 的文档副本在处理结束后立即删除，即使处理失败也是如此。
- **自由文本**——输入或粘贴任意内容。如启用审核，则在存储前进行审核。
- **语音输入**——在浏览器中录音。默认由 **Voxtral Mini Transcribe 2**（`voxtral-mini-2602`）转写；也可在设置中选择 **Voxtral Mini Transcribe 3** 和 **Voxtral Small Transcribe 3**（Mistral 预览版）。界面语言会传递给模型（`language`）以优化识别效果。
- **网页 / URL**——粘贴一个或多个 URL 直接抓取内容（对于 JS 页面使用 Readability + Lightpanda），或输入关键词通过 Mistral Agent 进行网络搜索。同一个输入框两者均可接受——URL 和关键词会自动区分，每个结果都会创建一个独立的资料来源。

### AI 内容生成

八种生成的学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习卡片** | `mistral-large-latest` | 标题、摘要、要点、词汇、引文、趣闻 |
| **记忆卡片** | `mistral-large-latest` | 附资料来源引用的问答卡片（数量可配置） |
| **选择题测验** | `mistral-large-latest` | 每题 4 个选项、仅一个正确答案，附解析，自适应复习（数量可配置） |
| **填空题** | `mistral-large-latest` | 带提示的待补全句子，宽松校验（Levenshtein） |
| **听写** | `mistral-large-latest` + Voxtral TTS | 以语音播报关键词（每词 1 个 MP3）→ 键盘输入 → 严格批改（漏掉一个重音符号也算错误），并讲解规则 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过 `image_generation` 工具生成的教育类图片 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 朗读题目 → STT 识别回答 → AI 判定 |

### AI 聊天辅导老师

一个可完整访问课程文档的对话式辅导老师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话过程中生成复习卡片、记忆卡片、测验或填空题
- 每门课程保留 50 条消息的历史记录
- 如该档案启用了审核：消息会经过检查，被标记的资料来源、检查失败的资料来源以及尚未检查的资料来源都会从上下文和工具中排除（检查失败或尚未检查的资料来源会先重新检查，最多 5 秒）

### 自动路由

路由器使用 `mistral-small-latest` 分析资料来源的内容，从 8 种可用生成器中推荐最相关的几种。界面实时显示进度：先是分析阶段，然后是各项单独的生成，每项均可取消。

自动模式在服务器上运行：即使重新加载页面、打开另一门课程或切换档案，它也会继续运行；每门课程同一时间只运行一个自动任务（第二个标签页会加入正在进行的任务）。服务器对每个 Mistral 密钥最多同时运行 3 项生成。每完成一项生成都会有一条消息，最后只显示一次最终汇总；如果它在显示另一门课程时完成，消息会注明所属课程。单独取消的某项生成不会在汇总中计为失败。「全部取消」会停止该课程的整批任务，只显示一条消息。如果服务器在自动任务运行期间重启，该任务会被标记为已中断，并提供「继续」按钮，仅重新运行未完成的生成，而不会重新分析。

从标签页启动的长时间生成（逐项启动的生成、复习提醒卡片）最多同时运行 3 项：其余的会排队等候，打开课程无需等待正在进行的生成结束。

### 自适应学习

- **测验统计**：跟踪每道题的作答次数和正确率
- **测验复习**：根据原测验的资料来源，生成 5-10 道针对薄弱知识点的新题（审核把关同样作用于这些资料来源）
- **复习要求检测**：检测复习说明（如「如果我知道……就说明我掌握了这节课」），并在兼容的文本类生成器（复习卡片、记忆卡片、测验、填空题）中优先考虑这些要求。启用审核时，检测会等待资料来源检查完成，且只读取被判定为安全的资料来源；复习要求会保留其原始资料来源列表：如果其中某个资料来源被标记，该复习要求既不显示也不应用；如果其中某个资料来源被删除，该复习要求将被清除。其费用会被计入

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11-15 岁）、学生（16-25 岁）、成人（26 岁以上）
- **内容审核**：使用 `mistral-moderation-2603`（Mistral Moderation 2），共有 11 个类别。新建的儿童/青少年档案默认屏蔽其中 6 个：`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`。其中 `criminal` 是在用 50 节课程（含历史课）测试、未出现任何误报后才加入的。每个档案都可以在设置中自定义屏蔽类别。Moderation 2 把原来的“危险内容”类别拆分为 `dangerous` 和 `criminal`：现有档案会自动迁移，屏蔽类别也会作用于已导入的来源。默认采取安全优先策略：如果模型的响应无法确认某个屏蔽类别，内容就会被拒绝，并显示“审核不可用”。启用审核后，生成和聊天都会排除以下来源：被标记的来源、验证失败的来源，以及正在验证中的来源。从未验证过的来源（在审核关闭时导入的来源，或刚关联到某个档案的旧项目）会在使用前先进行验证。如果审核因重启而中断，只要服务器密钥允许，就会在启动时恢复；否则，它会像出错的审核一样，在打开项目或下一次生成时恢复。“重新验证”按钮可以随时重新发起验证。启用审核后，来源在被判定为安全之前，其内容（预览、文本、原始文档）对儿童隐藏；家长可以输入 PIN 显示内容，但仅限查看一次。语音测验中的口头回答会先经过审核，再进行判分。`helpers/moderation-model.ts` 中固定使用带日期的模型 ID，因为别名 `-latest` 已被弃用，API 不再列出它。
- **家长 PIN**：使用 SHA-256 哈希，15 岁以下的档案必须设置；同一 IP 地址每 15 分钟最多可输错 10 次（返回 429 `rate_limited`）。生产环境部署时，应改用加盐的慢哈希算法（Argon2id、bcrypt）。
- **服务器数据**：`/output` 只公开项目的媒体文件（音频、图片、导入的文件）；`profiles.json`、`config.json`、`projects.json` 和 `project.json` 永远不会对外提供
- **聊天限制**：16 岁以下用户默认关闭 AI 聊天，家长可以开启

### 多档案系统

- 支持多个档案，每个档案有名称、年龄、头像和语言偏好
- **按档案设置语音**（`Profile.mistralVoices?: { host?, guest? }`，每个角色均可选）：每个孩子都可以有自己的一对播客/语音测验语音
- **按档案设置主题**（`Profile.theme: 'dark' | 'light'`）：切换档案时自动切换主题，并保存在后端
- 项目通过 `profileId` 与档案关联；没有档案的旧项目会归属第一个打开它的档案，然后按该档案的设置进行审核
- 级联删除：删除档案会同时删除它的所有项目

### API 费用追踪

每一次计费的 Mistral 调用（聊天、OCR、STT、TTS、智能体），包括学习要求检测和语音测验的口头回答，都会被记录下来，以便向用户提供**透明**的欧元费用估算。审核是免费的，不计入费用。智能体的工具费用也计算在内：每次网页搜索 0.03 美元，每生成一张图片 0.10 美元（Mistral 价格）。此外还有这些工具产生的 token，估算时按智能体所用模型的输入价格计算。

- **唯一数据来源**：`helpers/pricing.ts`。其中 `MODEL_PRICING` 按模型前缀定价（例如 `mistral-large` → 输入 0.5 €/百万 token，输出 1.5 €/百万 token），`PRICING_SOURCES` 记录 Mistral 文档的 URL，供定期重新抓取价格
- **支持的单位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT），单位换算由 `helpers/cost-calc.ts` 控制
- **记录链路**：`helpers/tracked-client.ts`（封装 Mistral 客户端）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（写入 HTTP 响应）
- **界面**：每次生成显示费用徽章（`src/partials/cost-badge-gen.html`），每个来源也显示（`cost-badge-src.html`），仪表盘中显示累计总额（`Project.totalCost`）
- **端点**：`/generate/*` 和 `/sources/*` 的响应会在返回对象（`Generation` / `Source`）上附加 `estimatedCost`、`usage` 和 `costBreakdown`。`POST /generate/route` 额外增加一个 `costDelta: number` 字段，单独记录路由的费用；`POST /detect-consigne`（`{consigne, costDelta}`）和口头回答的判分也会返回各自的 `costDelta`。`GET /projects/:pid` 返回附带 `totalCost`（根据 `costLog[]` 计算的总和）的项目以及完整历史记录

### TTS（Mistral Voxtral）与自定义语音

- **Mistral Voxtral TTS**：默认使用 **Voxtral TTS**（`voxtral-mini-tts-2603`），也可以在“设置”中选择 **Voxtral TTS 3**（`voxtral-mini-tts-3-0`，Mistral 预览版，支持更多语言的原生语音）。语音合成完全由 Mistral 提供，不需要额外的密钥。界面只列出所选模型支持的语音：Voxtral TTS 不接受用 Voxtral 3 添加的语音
- **自定义语音**：家长可以通过 Mistral Voices API 用一段音频样本创建自己的语音，并分配给主持人/嘉宾角色。这样播客和语音测验就会用家长的声音朗读，让孩子更有代入感
- 可配置两个语音角色：**主持人**（主讲人）和**嘉宾**（播客中的第二个声音）
- 设置中提供完整的 Mistral 语音目录，可以按语言筛选
- 正在播放的内容（学习卡、播客、听写单词）在离开所在页面时暂停，返回后从中断的地方继续播放
- 抽认卡的朗读音频在第一次收听时生成，之后保存在对应的生成结果中，再次打开时不会重新生成，也不会重复计费
- 来源标记（`[Source N]`）不会被朗读

### 国际化

- 界面提供 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示词支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 每个档案可以单独设置语言

---

## 技术栈

| 层级 | 技术 | 作用 |
|---|---|---|
| **运行时** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **后端** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、代理 |
| **前端** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，TypeScript 由 Vite 编译 |
| **模板** | vite-plugin-handlebars | 用 partials 组合 HTML |
| **AI** | Mistral AI SDK | 聊天、OCR、STT、TTS、智能体、审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603`（可选 Voxtral TTS 3），内置语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页正文（Firefox 阅读视图所用技术） |
| **无头浏览器** | Lightpanda | 超轻量无头浏览器（Zig + V8），用于 JS/SPA 页面，作为备用抓取方案 |
| **Markdown** | Marked | 在聊天中渲染 Markdown |
| **文件上传** | Multer 2.x | 处理 multipart 表单 |
| **音频** | ffmpeg-static | 拼接音频片段 |
| **测试** | Vitest | 单元测试，覆盖率由 SonarCloud 统计 |
| **持久化** | JSON 文件 | 无依赖存储 |

---

## 模型参考

| 模型 | 用途 | 选用原因 |
|---|---|---|
| `mistral-large-latest` | 学习卡、抽认卡、播客、测验、填空题、聊天、语音测验判分、图像智能体、网页搜索智能体、学习要求检测 | 多语言能力和指令遵循能力最佳 |
| `mistral-ocr-4-1`（OCR 4.1，默认） | 文档 OCR | 印刷文字、表格、手写文字（$4 / 1000 页） |
| `mistral-ocr-2512`（OCR 3，可选） | 文档 OCR | 可在“设置”中选择，更便宜（$2 / 1000 页），手写识别效果更好 |
| `voxtral-mini-2602`（Voxtral Mini Transcribe 2，默认） | 语音识别（STT） | 语音输入和语音测验的口头回答（$0.003 / 分钟） |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0`（Transcribe 3，可选，预览版） | 语音识别（STT） | 可在“设置”中选择（$0.0035 / 分钟和 $0.004 / 分钟） |
| `voxtral-mini-tts-2603`（Voxtral TTS，默认） | 语音合成（TTS） | 播客、语音测验、听写、朗读（$16 / 百万字符） |
| `voxtral-mini-tts-3-0`（Voxtral TTS 3，可选，预览版） | 语音合成（TTS） | 可在“设置”中选择，支持更多语言的原生语音（$13 / 百万字符） |
| `mistral-moderation-2603` | 内容审核 | 儿童/青少年屏蔽 6 个类别（包括 `jailbreaking`） |
| `mistral-small-latest` | 自动路由 | 快速分析内容，用于路由决策 |

在手机上，“设置”会在每个选择框下方显示所选模型的完整标签（价格、“推荐”或“预览版”），因为收起的菜单会截断这些文字。

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

> **注意**：Mistral Voxtral TTS 是唯一的 TTS 提供方，除了 `MISTRAL_API_KEY` 之外不需要其他密钥。

> **用户自行输入 API 密钥**：`MISTRAL_API_KEY` 现在是**可选**的。没有配置时，应用照常启动，并提示每位用户在界面中输入**自己的 Mistral 密钥**。密钥**保存在浏览器中**（在安全上下文中通过 Web Crypto + IndexedDB 加密），随每次请求发送，**绝不会保存在服务器上**。优先级：档案密钥 > 浏览器全局密钥 > `MISTRAL_API_KEY`（环境变量）。设置 `EUREKAI_REQUIRE_USER_KEY=true` 后，每位用户都必须提供自己的密钥（环境变量中的密钥只用于预加载）。

> **本地 HTTPS（平板/局域网）**：`localhost` 本身就是安全上下文。如需通过局域网访问（例如平板），请生成本地证书并启用 HTTPS。这样浏览器才能加密它保存的密钥，密钥在传输过程中也会被加密：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 环境变量

| 变量 | 是否必需 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 可选 | — | Mistral API 密钥（聊天、OCR、STT、Voxtral TTS、智能体、审核）。未设置时，用户在应用中输入自己的密钥（保存在浏览器，绝不保存在服务器） |
| `EUREKAI_REQUIRE_USER_KEY` | 可选 | `false` | `true` → AI 请求不再回退到 `MISTRAL_API_KEY`（每位用户必须提供自己的密钥）。适用于公开访问的实例 |
| `HTTPS_KEY` / `HTTPS_CERT` | 可选 | — | TLS 密钥/证书路径（参见 `scripts/gen-cert.sh`）→ Express 和 Vite 以 HTTPS 提供服务（局域网/平板的安全上下文） |
| `PORT` | 可选 | `3000` | Express 后端的 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 设为 `production` 时，Express 从 `dist/` 提供前端（否则从 `public/`） |
| `SONAR_TOKEN` | CI 可选 | — | 仅供 SonarCloud 的 GitHub Actions 工作流使用 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git 钩子（Husky）**：`pre-commit` 依次运行 `scripts/pre-commit-fast.sh`（冲突、大文件、shellcheck）、`lint-staged` 和 `npm test`。`pre-push` 先运行阻断性检查 `npm audit`：只要任何依赖（包括传递依赖）存在 `critical` 级别的漏洞就会阻断，参见 `scripts/audit-verdict.mjs`。之后再运行 `npm run security`。每个钩子只要有一步失败，就会阻止 commit/push。

**外部工具（运行应用时可不装，但 `pretest` 和 `npm run security` 必须用到）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

缺少这些工具时，`npm test` 会在 `pretest` 处失败（缺少 lizard），`npm run security` 也会失败（缺少 opengrep），husky 钩子因此会阻止 commit/push。

---

## 使用容器部署

镜像发布在 **GitHub Container Registry** 上：

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

> **`:U`**：Podman rootless 模式的标志，会自动调整卷的权限。

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
  generate.ts             — Endpoints de génération (8 types + route)
  auto-runs.ts            — Lots Auto côté serveur : lancement, analyse et étapes en arrière-plan, état, annulation
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
  keyed-slots.ts          — Places par clé (au plus 3 étapes d'Auto en même temps par clé Mistral)
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
  stt-models.ts           — Source de vérité sélection transcription (Mini Transcribe 2 défaut / Transcribe 3 option) + normalizeSttModel
  tts-models.ts           — Source de vérité sélection synthèse vocale (Voxtral TTS défaut / TTS 3 option) + compatibilité des voix
  tts-text.ts             — Texte envoyé au TTS : marqueurs de sources et crochets retirés (Voxtral les lit ou avale le mot)
  source-markers.ts       — Regex des marqueurs `[Source N]` des fiches (pastilles côté navigateur, texte lu côté serveur)
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
  event-bus.ts            — Bus d'événements de génération et de lots Auto en mémoire (dispatch SSE, filet anti-uncaughtException)
  auto-run-state.ts       — Transitions d'un lot Auto (fonctions pures, appliquées par le store)
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
    view-media.ts         — Pause du son au changement de vue (position gardée)
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, Auto)
    auto-launch.ts        — Lancement d'un Auto côté serveur, suivi pendant qu'un autre cours est affiché, annulation
    auto-runs.ts          — Auto suivis par l'onglet : état reçu du serveur, bilan affiché une seule fois, coût de l'analyse
    request-slots.ts      — Au plus 3 générations longues en même temps pour l'onglet, file d'attente FIFO
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    chat-in-flight.ts     — Messages du chat en attente de réponse, par cours
    config.ts             — Interface de configuration (modèles de chat, d'OCR, de transcription et de TTS, voix)
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

> **参与代码贡献的 AI 智能体请注意**：请查阅 [`CLAUDE.md`](CLAUDE.md)（通用规则、索引）和 [`.claude/rules/`](.claude/rules/) 中的详细规则。这些规则会根据读取或修改的文件按需加载，内容包括：详细的架构背景；必须遵守的规则（错误码、费用追踪，以及提示词中不得使用元描述词，即不要用文档类型之类的词来描述文档，否则模型会把这些词照搬到输出中）；已知的坑（Lizard CCN、Opengrep、Codacy/Semgrep 迁移）。

---

## API 参考

### 配置
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已设置 Mistral 密钥）、`ttsAvailable`（`mistral` 的别名，Mistral Voxtral 是唯一的 TTS 提供方） |
| `POST` | `/api/config/reset` | 将配置恢复为默认值 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 语音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的审核类别及各年龄段的默认值 |
| `POST` | `/api/providers/mistral/validate` | 验证用户输入的 Mistral 密钥：始终返回 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`），不会回退到环境变量 |

### 档案
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有档案 |
| `POST` | `/api/profiles` | 创建档案 |
| `PUT` | `/api/profiles/:id` | 修改档案（15 岁以下需要 PIN；15 分钟内输错 10 次 PIN → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | 删除档案并级联删除项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | 端点 | 说明 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（可选 `?profileId=`） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情；`?profileId=` 会把没有档案的项目归到打开它的档案 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |
| `GET` | `/api/projects/:pid/events` | 实时推送生成状态变化（`completed`/`failed`/`cancelled`）的 SSE 流（`event: generation`），附带 keep-alive 心跳 |

### 来源
| 方法 | 端点 | 说明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 通过 multipart 导入文件（JPG/PNG/PDF 使用 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 语音（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | 抓取 URL 或进行网页搜索 `{query}`，返回来源数组；所有地址都被拒绝时（内部网络）返回 422 `url_blocked`，一个来源都没能创建时返回 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 恢复待处理或出错的审核 `{sourceIds?}`（每次调用最多 10 个，等待 ≤ 10 秒）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源、其导入的文件以及依赖它的学习要求 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习要求（仅限已验证的来源）→ `{consigne, costDelta}` |

### 生成
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习卡片 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 闪卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 多项选择测验（4 个选项，仅一个正确答案） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/dictation` | 听写（单词 + 例句 + 规则，每个单词 1 段 TTS 音频；自动路由器也会推荐） |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 针对测验 `{generationId, weakQuestions}` 中答错题目的巩固卡片——由测验视图的补救按钮与 `quiz-review` 并行调用 |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（待启动的生成器计划）——返回 `{plan, costDelta}`（仅路由的成本） |
| `POST` | `/api/projects/:pid/generate/auto/start` | 在服务器端启动 Auto 批次 `{runId, …}`：立即返回 202，随后在后台进行分析和各步骤，每个 Mistral 密钥最多同时运行 3 个步骤；页面重新加载后批次仍会继续。如果该课程已有批次在运行，则返回 409 `auto_busy` |
| `POST` | `/api/projects/:pid/generate/auto/resume` | 恢复因服务器重启而中断的 Auto 批次 `{runId}`：其中断的步骤将使用本次请求的密钥重新启动，无需重新分析（返回 202） |
| `GET` | `/api/projects/:pid/auto-runs/:runId` | Auto 批次状态：分析、各步骤及每个步骤的结果 |
| `POST` | `/api/projects/:pid/auto-runs/:runId/cancel` | 取消整个 Auto 批次（单个步骤的取消方式与普通生成相同） |

所有生成路由均接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`；未知的 `ageGroup` 或不是有效语言代码的 `lang`（应为：`fr`、`pt-BR`……）→ 400 `invalid_input`，在任何 AI 调用之前返回。`quiz-review` 和 `remediation-summary` 还额外要求 `{generationId, weakQuestions}`，并基于原测验的来源。

### 生成内容 CRUD
| 方法 | 端点 | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空题答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 提交听写答案 `{answers}`（服务器端严格评分） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口头回答（音频 + questionIndex）；口头回答在验证前会先经过审核（拒绝：400 `quiz.answerBlocked`），成本以 `costDelta` 返回 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（复习卡片/闪卡） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 取消正在进行的生成（取消 pending 状态的唯一途径） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成内容及其媒体（音频、图片） |

### 聊天
| 方法 | 端点 | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取聊天记录 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | 清除聊天记录 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **选择 Alpine.js 而非 React/Vue** | 占用极小，轻量级响应式，配合由 Vite 编译的 TypeScript。非常适合注重速度的黑客松。 |
| **JSON 文件持久化** | 零依赖，即时启动。无需配置数据库——启动即可使用。 |
| **Vite + Handlebars** | 两全其美：开发时快速 HMR，用 HTML partials 组织代码，Tailwind JIT。 |
| **集中式提示词** | 所有 AI 提示词都在 `prompts.ts` 中——便于迭代、测试，并按语言/年龄组进行调整。 |
| **多生成系统** | 每个生成内容都是带有独立 ID 的独立对象——每门课程可拥有多份复习卡片、测验等。 |
| **按年龄调整的提示词** | 4 个年龄组，词汇、复杂度和语气各不相同——同样的内容会根据学习者以不同方式教授。 |
| **基于 Agents 的功能** | 图像生成和网络搜索使用临时 Mistral Agents——生命周期清晰，并自动清理。 |
| **智能 URL 抓取** | 单一输入框同时接受 URL 和关键词——URL 通过 Readability 抓取（静态页面），并以 Lightpanda 作为后备（JS/SPA 页面），关键词则触发 Mistral web_search Agent。每个结果都会创建一个独立的来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）——语音合成已集成到成本链和按语言的语音选择中。 |

---

## 致谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 轻量级响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用优先的 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面的超轻量无头浏览器
- **[Luciole](https://luciole-vision.com)** — 专为视障读者设计的字体，© Laurent Bourcellier & Jonathan Perez，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（个人资料中的“阅读舒适”选项）

本项目始于 Mistral AI Worldwide Hackathon（2026 年 3 月），完全由 AI 借助 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**文章使用 claude-opus-5-5-high 从法语译成中文。**
