<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 标志" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>将任何内容转化为交互式学习体验——由 <a href="https://mistral.ai">Mistral AI</a> 驱动。</strong>
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

## 背景故事——为什么选择 EurekAI？

**EurekAI** 诞生于 [Mistral AI 全球黑客松](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026 年 3 月）。当时我需要一个主题，而灵感来自一件非常具体的事：我经常陪女儿复习测验，于是想到，借助 AI，应该可以让这件事变得更有趣、更具互动性。

目标是：获取**任意输入内容**——课程照片、复制粘贴的文本、语音录音、网络搜索——并将其转化为**复习笔记、抽认卡、测验、播客、填空练习、插图等内容**。这一切均由法国企业 Mistral AI 的模型驱动，因此 EurekAI 天然适合法语学生使用。

[最初的原型](https://github.com/jls42/worldwide-hackathon.mistral.ai)是在黑客松期间用 48 小时构建的概念验证，基于 Mistral 服务打造——当时已可运行，但功能有限。此后，EurekAI 已发展成为一个真正的项目：填空练习、练习导航、网页抓取、可配置的家长内容审核、深入的代码审查，等等。全部代码均由 AI 生成——主要使用 [Claude Code](https://code.claude.com/)，另有部分内容通过 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 完成。

---

## 概览

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 导览：来源、复习笔记、测验、抽认卡、插图" width="820" />
</p>

| | |
|---|---|
| ![仪表板](docs/screenshots/dashboard.webp)<br>**仪表板**——最近生成的内容、每张卡片和整个项目的预估成本、“自动——魔法！”按钮 | ![来源](docs/screenshots/sources.webp)<br>**来源**——导入照片/PDF/文本/语音/网页，一键生成，检测学习要求 |

每个导入的来源都会显示其 [OCR 置信度、审核状态和预估成本](docs/screenshots/sources-list.webp)。

### 实际运行中的组件

| | |
|---|---|
| ![复习笔记](docs/screenshots/notes.gif)<br>**复习笔记**——要点、词汇、附来源的引文、按章节播放音频 | ![测验](docs/screenshots/quiz.gif)<br>**选择题测验**——每题只有一个正确答案，立即提供反馈和解释，逐步导航 |
| ![抽认卡](docs/screenshots/flashcards.gif)<br>**抽认卡**——翻转卡片后进行“我知道/我不知道”自我评估 | ![填空练习](docs/screenshots/fillblank.gif)<br>**填空练习**——按需提供提示，宽容校验答案 |
| ![听写](docs/screenshots/dictation.gif)<br>**听写**——通过音频朗读单词，逐字母严格批改 | ![语音测验](docs/screenshots/vocal-quiz.gif)<br>**语音测验**——大声朗读问题，通过麦克风回答 |
| ![播客](docs/screenshots/podcast.gif)<br>**播客**——双人迷你播客，可查看对话脚本 | ![插图](docs/screenshots/illustrations.gif)<br>**插图**——由 Agent 生成的教育图片 |
| ![AI 导师](docs/screenshots/chat.gif)<br>**AI 导师**——基于课程文档的聊天，提供带解释的回答，并可生成测验和抽认卡 | |

### 快速入门

| | |
|---|---|
| ![选择个人资料](docs/screenshots/login.gif)<br>**选择个人资料**——每个孩子都有自己的空间、头像和语言 | ![创建个人资料](docs/screenshots/profile-create.gif)<br>**创建个人资料**——年龄、头像，以及供 15 岁以下用户使用的家长 PIN |
| ![创建课程](docs/screenshots/course.gif)<br>**创建课程**——每节课对应一个项目，可随时添加来源 | ![设置](docs/screenshots/settings.gif)<br>**设置**——API 状态、选择 AI 模型并显示价格 |

---

## 功能

| | 功能 | 说明 |
|---|---|---|
| 📷 | **导入文件** | 导入课程资料——照片、PDF（通过 Mistral OCR 处理，包含平均置信度和 `high`/`medium`/`low` 等级）或文本文件（TXT、MD）。上传会话支持按文件重试和单独显示进度 |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 录制语音——Voxtral STT 会将语音转写为文本 |
| 🌐 | **网页/URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索内容（使用 Mistral Agent 的 web_search） |
| 📄 | **复习笔记** | 包含要点、词汇、引文和趣闻的结构化笔记 |
| 🃏 | **抽认卡** | 交互式问答卡片，支持对话式音频朗读 |
| ❓ | **选择题测验** | 每题 4 个选项且仅有一个正确答案，并针对错题进行自适应复习（数量可配置） |
| ✏️ | **填空练习** | 提供提示并支持宽容校验的填空练习 |
| 🔤 | **听写** | 根据导入的列表通过音频朗读单词（Voxtral TTS），使用键盘输入，逐字母严格批改并解释拼写规则 |
| 🎙️ | **播客** | 双人音频迷你播客——默认使用 Mistral 语音，也可使用自定义语音（包括家长的声音！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育图片 |
| 🗣️ | **语音测验** | 大声朗读问题（可使用自定义语音），口头回答，由 AI 校验 |
| 💬 | **AI 导师** | 基于课程文档并支持工具调用的上下文聊天 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器会分析内容，并从 8 种可用类型中推荐一组生成器 |
| 🔒 | **家长控制** | 可按个人资料配置内容审核（可自定义类别）、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面支持 9 种语言；可通过提示词控制 AI 使用 15 种语言生成内容 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 收听复习笔记和抽认卡（问题/答案对话） |
| 💶 | **API 成本跟踪** | 透明估算每次生成和每个来源的欧元成本（token/字符/页数/音频秒数）。每张卡片显示徽章，仪表板中显示项目总成本 |
| 🎨 | **按个人资料设置主题** | 每份个人资料都可选择 `dark` 或 `light` 主题——该选择会随个人资料保存，并在每次切换个人资料时重新应用 |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构概览" width="800" />
</p>

---

## 模型使用分布图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型与任务映射" width="800" />
</p>

---

## 用户历程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习历程" width="800" />
</p>

---

## 深入了解——功能

### 多模态输入

EurekAI 支持 4 种来源类型，并根据个人资料进行内容审核（儿童和青少年个人资料默认启用审核）：

- **导入文件**——由 Mistral OCR 处理 JPG、PNG 或 PDF 文件——默认使用 **OCR 4.1（`mistral-ocr-4-1`）**，也可在设置中选择 **OCR 3（`mistral-ocr-2512`）**（成本更低，约为前者的一半；手写内容识别效果更好）——可处理印刷文本、表格和手写内容；文本文件（TXT、MD）则直接导入。多文件上传采用**上传会话**系统：单独显示每个文件的进度，可仅重试失败的文件而无须重新提交其他文件，并可在完成后关闭会话。OCR 会提供平均**置信度**（`average`，在 `[0,1]` 中进行限幅，根据 Mistral 返回的 `averagePageConfidenceScore` 计算），并在界面中以 `high` / `medium` / `low` 等级徽章显示（阈值约为 0.9 / 0.7）——扫描质量较差时会发出警告，但不会阻止操作。发送给 Mistral 用于 OCR 的文档副本会在处理结束后立即删除，即使处理失败也不例外。
- **自由文本**——输入或粘贴任意内容。如果启用了审核，则在存储前进行审核。
- **语音输入**——在浏览器中录制音频。由 `voxtral-mini-latest` 转写。`language="fr"` 参数用于优化识别效果。
- **网页/URL**——粘贴一个或多个 URL 以直接抓取内容（使用 Readability + Lightpanda 处理 JS 页面），或输入关键词，通过 Mistral Agent 进行网页搜索。同一个字段同时支持这两种输入——URL 和关键词会自动分离，每个结果都会创建一个独立来源。

### AI 内容生成

可生成八种学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习笔记** | `mistral-large-latest` | 标题、摘要、要点、词汇、引文、趣闻 |
| **抽认卡** | `mistral-large-latest` | 带来源引用的问答卡片（数量可配置） |
| **选择题测验** | `mistral-large-latest` | 每题 4 个选项且仅有一个正确答案、解释、自适应复习（数量可配置） |
| **填空练习** | `mistral-large-latest` | 带提示的填空句子，宽容校验（Levenshtein） |
| **听写** | `mistral-large-latest` + Voxtral TTS | 通过音频朗读关键词（每个单词 1 个 MP3）→ 键盘输入 → 严格批改（漏写一个重音符号也算错误）并解释规则 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过 `image_generation` 工具生成教育图片 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 朗读问题 → STT 转写回答 → AI 校验 |

### 聊天式 AI 导师

可完整访问课程文档的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话期间生成复习笔记、抽认卡、测验或填空练习
- 每门课程保留 50 条消息的历史记录
- 如果个人资料启用了审核：消息会接受检查，已标记的来源、检查失败的来源以及尚未检查的来源都会从上下文和工具中排除（系统会先重新检查失败或尚未检查的来源，最多等待 5 秒）

### 自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并从 8 种可用生成器中推荐最相关的生成器。界面会实时显示进度：先进行分析，然后逐项生成内容，并可取消操作。

### 自适应学习

- **测验统计**：跟踪每道题的作答次数和准确率
- **测验复习**：根据原测验的来源，生成 5 至 10 道针对薄弱概念的新题（审核保护同样针对这些来源）
- **学习要求检测**：检测复习要求（“如果我能……就说明我掌握了课程……”），并在兼容的文本生成器（复习笔记、抽认卡、测验、填空练习）中优先处理。启用审核后，检测会等待来源检查完成，并且只读取被判定为安全的来源；学习要求会保留其原始来源列表：如果其中任何来源后来被标记，该要求既不会显示，也不会应用；如果其中任何来源被删除，该要求也会被清除。其成本会计入统计

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11 至 15 岁）、学生（16 至 25 岁）、成人（26 岁以上）
- **内容审核**：`mistral-moderation-2603`（Mistral Moderation 2）提供 11 个可用类别，新建儿童/青少年个人资料默认屏蔽其中 6 个类别（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`；在对包括历史课在内的 50 节课程进行测量且未发现任何误报后，又添加了 `criminal`）。可在设置中按个人资料自定义类别；Moderation 2 将旧的“危险内容”类别拆分为 `dangerous` + `criminal`（现有个人资料会自动迁移，屏蔽类别也适用于已经导入的来源）。默认安全策略：如果模型响应无法验证某个被屏蔽的类别，内容将被拒绝（“审核不可用”）；启用审核后，无论是内容生成还是聊天，都会排除已标记的来源、检查失败的来源以及正在检查的来源。从未接受检查的来源（在审核关闭时导入，或旧项目关联至个人资料后出现的来源）会在使用前接受检查。如果审核因重启而中断，并且服务器密钥允许，系统会在启动时恢复审核；否则，它会像出错的审核一样，在打开项目或下次生成内容时恢复。“重新检查”按钮可按需再次发起检查。启用审核后，在来源被判定为安全之前，其内容会对儿童隐藏（预览、文本、原始文档）；家长可使用 PIN 临时显示一次。语音测验的口头回答会先接受审核，然后再进行答案校验。带日期且固定的 ID 位于 `helpers/moderation-model.ts` 中：已弃用的别名 `-latest` 不再由 API 列出。
- **家长 PIN**：使用 SHA-256 哈希，15 岁以下用户的个人资料必须设置；每个 IP 地址每 15 分钟最多可输错 10 次，超出后返回 429 `rate_limited`。生产环境部署时，应使用带盐的慢速哈希（Argon2id、bcrypt）。
- **服务器数据**：`/output` 仅公开项目媒体（音频、图片、导入的文件）；`profiles.json`、`config.json`、`projects.json` 和 `project.json` 永远不会对外提供
- **聊天限制**：16 岁以下用户默认禁用 AI 聊天，家长可将其启用

### 多个人资料系统

- 支持多份个人资料，包含姓名、年龄、头像和语言偏好
- **按个人资料设置语音**（`Profile.mistralVoices?: { host?, guest? }`——每个角色均为可选）——每个孩子都可拥有自己的一组播客/语音测验声音
- **按个人资料设置主题**（`Profile.theme: 'dark' | 'light'`）——切换个人资料时自动切换，并在后端持久保存
- 项目通过 `profileId` 与个人资料关联；没有个人资料的旧项目会关联至第一个打开它的个人资料，随后按照该个人资料进行审核
- 级联删除：删除个人资料会同时删除其所有项目
### API 成本跟踪

每次可计费的 Mistral 调用（chat、OCR、STT、TTS、agents），包括指令检测和语音测验的口头回答，都会被检测，以便向用户提供**透明的**欧元成本估算。免费的内容审核不计入其中。Agent 工具费用包括：每次网络搜索 0.03 美元、每张生成图片 0.10 美元（Mistral 定价），以及这些工具生成的 tokens；估算时按 Agent 模型的输入费率计算这些 tokens。

- **事实来源**：`helpers/pricing.ts` — 按模型 prefix 设置 `MODEL_PRICING`（例如：`mistral-large` → 输入 0.5 欧元/M tokens，输出 1.5 欧元/M tokens），`PRICING_SOURCES` 包含 Mistral 文档 URLs，以便定期重新抓取
- **支持的单位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）——转换由 `helpers/cost-calc.ts` 控制
- **检测链路**：`helpers/tracked-client.ts`（封装 Mistral 客户端）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（注入 HTTP 响应）
- **UI**：每次生成的成本徽章（`src/partials/cost-badge-gen.html`）、每个来源的成本徽章（`cost-badge-src.html`）、dashboard 中的累计总额（`Project.totalCost`）
- **Endpoints**：`/generate/*` 和 `/sources/*` 响应使用 `estimatedCost`、`usage` 和 `costBreakdown` 扩充返回的对象（`Generation` / `Source`）。`POST /generate/route` 添加 `costDelta: number` 字段，仅表示路由成本；`POST /detect-consigne`（`{consigne, costDelta}`）以及口头回答验证也会返回各自的 `costDelta`。`GET /projects/:pid` 返回包含 `totalCost`（根据 `costLog[]` 计算的总和）及完整历史记录的扩充项目

### TTS（Mistral Voxtral）与自定义语音

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`，100% 基于 Mistral 的语音合成，无需额外密钥
- **自定义语音**：家长可以通过 Mistral Voices API（使用音频样本）创建自己的语音，并将其分配给主持人/嘉宾角色——随后 podcast 和语音测验会使用家长的声音朗读，让孩子获得更具沉浸感的体验
- 两个可配置的语音角色：**主持人**（主要讲述者）和**嘉宾**（podcast 的第二个声音）
- 设置中提供完整的 Mistral 语音目录，可按语言筛选

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI prompts 支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 可按个人资料配置语言

---

## 技术栈

| 层级 | 技术 | 作用 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **Backend** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，由 Vite 编译 TypeScript |
| **Templating** | vite-plugin-handlebars | 通过 partials 组合 HTML |
| **AI** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、内容审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，集成式语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主要内容（Firefox Reader View 技术） |
| **Headless browser** | Lightpanda | 用于 JS/SPA 页面的超轻量 headless 浏览器（Zig + V8）——抓取 fallback |
| **Markdown** | Marked | 在 chat 中渲染 markdown |
| **文件上传** | Multer 2.x | multipart 表单管理 |
| **音频** | ffmpeg-static | 拼接音频片段 |
| **测试** | Vitest | 单元测试——覆盖率由 SonarCloud 测量 |
| **持久化** | JSON 文件 | 无依赖存储 |

---

## 模型参考

| 模型 | 用途 | 原因 |
|---|---|---|
| `mistral-large-latest` | 复习资料、Flashcards、Podcast、Quiz、填空文本、Chat、语音测验验证、图像 Agent、Web Search Agent、指令检测 | 更出色的多语言能力与指令遵循能力 |
| `mistral-ocr-4-1`（OCR 4.1，默认） | 文档 OCR | 印刷文本、表格、手写内容（4 美元 / 1000 页） |
| `mistral-ocr-2512`（OCR 3，可选） | 文档 OCR | 可在设置中选择，价格更低（2 美元 / 1000 页），手写内容识别效果更好 |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，使用 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | Podcasts、语音测验、朗读 |
| `mistral-moderation-2603` | 内容审核 | 为儿童/青少年屏蔽 6 个类别（包括 `jailbreaking`） |
| `mistral-small-latest` | 自动路由器 | 快速分析内容以作出路由决策 |

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

> **注意**：Mistral Voxtral TTS 是唯一的 TTS provider——除 `MISTRAL_API_KEY` 外无需任何额外密钥。

> **用户输入的 API 密钥**：`MISTRAL_API_KEY` 现在为**可选项**。如果缺失，应用仍会启动，并提示每位用户在界面中输入**自己的 Mistral 密钥**。密钥**存储在浏览器中**（在安全上下文中通过 Web Crypto + IndexedDB 加密），并随请求发送——**绝不会持久化到服务器**。优先级：个人资料密钥 > 浏览器全局密钥 > `MISTRAL_API_KEY`（env）。设置 `EUREKAI_REQUIRE_USER_KEY=true` 会强制每位用户提供密钥（env 密钥此后仅用于预加载）。

> **本地 HTTPS（平板电脑/LAN）**：`localhost` 已经是安全上下文。如需通过 LAN（平板电脑）访问，请生成本地证书并启用 HTTPS：浏览器随后便可加密其存储的密钥，并在传输过程中加密该密钥：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 环境变量

| 变量 | 必需性 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 可选 | — | Mistral API 密钥（chat、OCR、STT、TTS Voxtral、agents、内容审核）。如果缺失，用户需在应用中输入密钥（存储在浏览器中，绝不存储在服务器上） |
| `EUREKAI_REQUIRE_USER_KEY` | 可选 | `false` | `true` → 禁用 AI 请求对 `MISTRAL_API_KEY` 的 fallback（每位用户都必须提供自己的密钥）。适用于公开部署的实例 |
| `HTTPS_KEY` / `HTTPS_CERT` | 可选 | — | TLS 密钥/证书路径（参见 `scripts/gen-cert.sh`）→ Express 和 Vite 通过 HTTPS 提供服务（LAN/平板电脑安全上下文） |
| `PORT` | 可选 | `3000` | Express backend 的 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 若为 `production` → Express 从 `dist/` 提供 frontend（否则为 `public/`） |
| `SONAR_TOKEN` | CI 可选 | — | 仅由 GitHub Actions SonarCloud workflow 使用 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git hooks（Husky）**：`pre-commit` 依次执行 `scripts/pre-commit-fast.sh`（冲突、大文件、shellcheck）、`lint-staged`，然后执行 `npm test`；`pre-push` 首先执行阻断式检查 `npm audit`（只要任何依赖项——即使是传递依赖——存在 `critical` 级别的漏洞就会阻断，参见 `scripts/audit-verdict.mjs`），然后执行 `npm run security`。任一阶段失败时，各 hook 都会阻止 commit/push。

**外部工具（运行应用时可选，但 `pretest` 和 `npm run security` 必须使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

如果缺少这些工具，`npm test` 会在 `pretest` 处失败（缺少 lizard），`npm run security` 也会失败（缺少 opengrep）。此时 husky hooks 会阻止 commit/push。

---

## 使用容器部署

镜像发布在 **GitHub Container Registry**：

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

> **`:U`**：Podman rootless flag，可自动调整 volume 权限。

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

> **面向代码贡献 AI Agents**：请参阅 [`CLAUDE.md`](CLAUDE.md)，了解详细的 architecture 背景、强制规则（错误码、cost tracking，以及不含元词汇的 prompts，即不使用文档类型等限定词，因为模型会将这些词复制到输出中）和已知陷阱（Lizard CCN、Opengrep、Codacy/Semgrep migration）。

---

## API 参考

### 配置
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已设置 Mistral 密钥）、`ttsAvailable`（`mistral` 的 alias，Mistral Voxtral 是唯一的 TTS provider） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 语音（可选 `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 可用的内容审核类别及各年龄段的默认值 |
| `POST` | `/api/providers/mistral/validate` | 验证用户输入的 Mistral 密钥——始终返回 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`），不使用 env fallback |

### 个人资料
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有个人资料 |
| `POST` | `/api/profiles` | 创建个人资料 |
| `PUT` | `/api/profiles/:id` | 修改个人资料（15 岁以下需要 PIN；15 分钟内 10 次 PIN 错误 → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | 删除个人资料，并级联处理项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建项目 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 项目详情；`?profileId=` 将无个人资料的项目关联到打开该项目的个人资料 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |
| `GET` | `/api/projects/:pid/events` | 生成状态转换（`completed`/`failed`/`cancelled`）的实时 SSE 流（`event: generation`）+ heartbeat keep-alive |

### 来源
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入 multipart 文件（JPG/PNG/PDF 使用 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 语音（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL 抓取或 Web 搜索 `{query}`——返回来源数组；若所有地址均被拒绝（内部网络），则返回 422 `url_blocked`；若无法创建任何来源，则返回 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 恢复待处理或出错的内容审核 `{sourceIds?}`（每次调用最多 10 个，等待 ≤ 10 秒）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源、其导入文件以及依赖该来源的指令 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令（仅限已验证的来源）→ `{consigne, costDelta}` |

### 生成
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习资料 |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | 多项选择测验（4 个选项，只有一个正确答案） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空文本 |
| `POST` | `/api/projects/:pid/generate/dictation` | 听写（单词 + 例句 + 规则，每个单词 1 段 TTS 音频；auto-router 也会推荐） |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 针对测验错题的定向复习资料 `{generationId, weakQuestions}`——测验视图的补救按钮会与 `quiz-review` 并行调用 |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（要启动的生成器计划）——返回 `{plan, costDelta}`（仅路由成本） |
| `POST` | `/api/projects/:pid/generate/auto` | Backend 自动生成（路由 + 8 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。并行执行——要求 Mistral tier 的 rate-limit ≥ 8 个并发请求；否则 `failedSteps` 中可能出现多个 429。 |

所有生成 routes 都接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`；未知的 `ageGroup` 或不是有效语言代码的 `lang`（预期：`fr`、`pt-BR`……）会在任何 AI 调用前返回 400 `invalid_input`。`quiz-review` 和 `remediation-summary` 还要求提供 `{generationId, weakQuestions}`，并作用于原始测验的来源。

### 生成内容 CRUD
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空文本答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 提交听写答案 `{answers}`（服务器严格评分） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口头回答（音频 + questionIndex）；口头回答会在验证前接受内容审核（拒绝：400 `quiz.answerBlocked`），成本通过 `costDelta` 返回 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（复习资料/flashcards） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 取消正在进行的生成任务（取消 pending 状态任务的唯一途径） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 重命名 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 删除生成内容及其媒体（音频、图像） |

### Chat
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 获取 chat 历史记录 |
| `POST` | `/api/projects/:pid/chat` | 发送消息 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | 清除 chat 历史记录 |

---

## 架构决策

| 决策 | 理由 |
|---|---|
| **使用 Alpine.js 而不是 React/Vue** | 占用空间极小，通过 Vite 编译的 TypeScript 提供轻量响应能力。非常适合重视速度的 hackathon。 |
| **使用 JSON 文件持久化** | 零依赖，即时启动。无需配置任何数据库——启动即可使用。 |
| **Vite + Handlebars** | 两全其美：快速 HMR 改善开发体验，HTML partials 便于组织代码，Tailwind JIT。 |
| **集中管理 prompts** | 所有 AI prompts 均位于 `prompts.ts`——便于迭代、测试，并针对语言/年龄组进行调整。 |
| **多生成内容系统** | 每项生成内容都是具有自身 ID 的独立对象——每门课程可以有多份复习资料、测验等。 |
| **按年龄调整 prompts** | 4 个年龄组采用不同的词汇、复杂度和语气——同一内容会根据学习者采用不同的教学方式。 |
| **基于 Agents 的功能** | 图像生成和 Web 搜索使用临时 Mistral Agents——生命周期清晰，并自动清理。 |
| **智能 URL 抓取** | 单个字段可接受混合输入的 URLs 和关键词——URLs 通过 Readability 抓取（静态页面），并以 Lightpanda 作为 fallback（JS/SPA 页面）；关键词则会触发 Mistral web_search Agent。每个结果都会创建独立来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）——语音合成已集成到成本链路和按语言解析语音的流程中。 |

---
## 鸣谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 轻量级响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用工具优先的 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取工具（采用 Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面的超轻量级无头浏览器
- **[Luciole](https://luciole-vision.com)** — 专为视障读者设计的字体，© Laurent Bourcellier 和 Jonathan Perez，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（配置文件中的“舒适阅读”选项）

项目始于 Mistral AI Worldwide Hackathon（2026 年 3 月），并完全由 AI 使用 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — 版权所有 (C) 2026 Julien LS

**使用 gpt-5.6-sol 将文章从法语翻译成中文。**
