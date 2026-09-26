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

## 故事——为什么是 EurekAI？

**EurekAI** 诞生于 [Mistral AI 全球黑客松](https://luma.com/mistralhack-online)（[官方网站](https://worldwide-hackathon.mistral.ai/)）（2026年3月）。我需要一个主题——灵感来自非常现实的事情：我经常和女儿一起准备测验，于是我想到，借助 AI，或许可以把这件事变得更有趣、更具互动性。

目标是：接收**任何输入**——课程照片、复制粘贴的文本、语音录音、网页搜索——并将其转化为**复习提纲、闪卡、测验、播客、填空题、插图**等等。全部由 Mistral AI 的法国模型驱动，这使它天然适合讲法语的学生。

[最初的原型](https://github.com/jls42/worldwide-hackathon.mistral.ai)是在黑客松期间用48小时完成的概念验证，围绕 Mistral 服务构建——已经可用，但功能有限。从那以后，EurekAI 逐渐成长为一个真正的项目：填空题、练习导航、网页抓取、可配置的家长监护、深入的代码审查，等等。整个代码库都由 AI 生成——主要是 [Claude Code](https://code.claude.com/)，并通过 [Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 做了一些补充。

---

## 概览

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 导览：来源、提纲、测验、闪卡、插图" width="820" />
</p>

| | |
|---|---|
| ![仪表板](docs/screenshots/dashboard.webp)<br>**仪表板**——最近生成、按卡片估算成本和项目总计，“自动——魔法！”按钮 | ![来源](docs/screenshots/sources.webp)<br>**来源**——照片/PDF/文本/语音/网页导入，一键生成，指令检测 |

每个导入来源都会显示其 [OCR 置信度、审核结果和估算成本](docs/screenshots/sources-list.webp)。

### 组件实战

| | |
|---|---|
| ![复习提纲](docs/screenshots/notes.gif)<br>**复习提纲**——关键点、词汇、带来源的引用、按章节朗读 | ![测验](docs/screenshots/quiz.gif)<br>**选择题测验**——即时反馈与解析，逐步导航 |
| ![闪卡](docs/screenshots/flashcards.gif)<br>**闪卡**——翻卡后进行“我知道 / 我不知道”的自我评估 | ![填空题](docs/screenshots/fillblank.gif)<br>**填空题**——可按需提示，宽松验证 |
| ![听写](docs/screenshots/dictation.gif)<br>**听写**——音频朗读单词，逐字母严格纠错 | ![语音测验](docs/screenshots/vocal-quiz.gif)<br>**语音测验**——题目语音播报，麦克风作答 |
| ![播客](docs/screenshots/podcast.gif)<br>**播客**——双人迷你播客，可查看对话脚本 | ![插图](docs/screenshots/illustrations.gif)<br>**插图**——由 Agent 生成的教育图像 |
| ![AI 导师](docs/screenshots/chat.gif)<br>**AI 导师**——锚定在课程文档中的聊天，回答会解释，还可生成测验和闪卡 | |

### 快速上手

| | |
|---|---|
| ![选择档案](docs/screenshots/login.gif)<br>**选择档案**——每个孩子都有自己的空间、头像和语言 | ![创建档案](docs/screenshots/profile-create.gif)<br>**创建档案**——年龄、头像、15岁以下的家长 PIN 码 |
| ![创建课程](docs/screenshots/course.gif)<br>**创建课程**——每节课一个项目，随时接收来源 | ![设置](docs/screenshots/settings.gif)<br>**设置**——API 状态、带价格显示的 AI 模型选择 |

---

## 功能

| | 功能 | 描述 |
|---|---|---|
| 📷 | **文件导入** | 导入课程材料——照片、PDF（通过 Mistral OCR，采用平均置信度，第三方 `high`/`medium`/`low`）或文本文件（TXT、MD）。多文件上传会使用**上传会话**系统：每个文件独立进度，失败文件可单独重试，无需重新提交其他文件，完成后可关闭会话 |
| 📝 | **文本输入** | 直接输入或粘贴任意文本 |
| 🎤 | **语音输入** | 在浏览器中录音——Voxtral STT 会转写你的语音 |
| 🌐 | **网页 / URL** | 粘贴 URL（通过 Readability + Lightpanda 直接抓取）或输入搜索词（Agent Mistral web_search） |
| 📄 | **复习提纲** | 结构化笔记，包含关键点、词汇、引文、轶事 |
| 🃏 | **闪卡** | 交互式问答卡，带对话式语音朗读 |
| ❓ | **选择题测验** | 多项选择题，带错误自适应复习（可配置数量） |
| ✏️ | **填空题** | 带提示和宽松验证的补全练习 |
| 🔤 | **听写** | 从导入列表中朗读的音频单词（Voxtral TTS）、键盘输入、带解释拼写规则的逐字母严格纠错 |
| 🎙️ | **播客** | 双人迷你音频播客——默认使用 Mistral 语音，或使用自定义语音（家长！） |
| 🖼️ | **插图** | 由 Mistral Agent 生成的教育图像 |
| 🗣️ | **语音测验** | 题目语音播报（可使用自定义语音）、口头作答、AI 验证 |
| 💬 | **AI 导师** | 结合课程文档的上下文聊天，并支持工具调用 |
| 🧠 | **自动路由器** | 基于 `mistral-small-latest` 的路由器会分析内容，并在 8 种可用类型中推荐一组生成器 |
| 🔒 | **家长控制** | 按档案可配置的审核（类别可自定义）、家长 PIN、聊天限制 |
| 🌍 | **多语言** | 界面支持 9 种语言；通过提示词可用 15 种语言驱动 AI 生成 |
| 🔊 | **朗读** | 通过 Mistral Voxtral TTS 收听提纲和闪卡（问答对话） |
| 💶 | **API 成本跟踪** | 透明估算每次生成和每个来源的欧元成本（tokens / 字符 / 页 / 音频秒数）。每卡徽章 + 每项目总计，可在仪表板中查看 |
| 🎨 | **按档案主题** | 每个档案可选择自己的 `dark` 或 `light` 主题——切换档案时保持不变 |

---

## 架构概览

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="架构概览" width="800" />
</p>

---

## 模型使用地图

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 模型到任务映射" width="800" />
</p>

---

## 用户旅程

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学生学习旅程" width="800" />
</p>

---

## 深入了解——功能

### 多模态输入

EurekAI 接受 4 种来源类型，并按档案进行审核（儿童和青少年默认启用）：

- **文件导入**——JPG、PNG 或 PDF 文件通过 Mistral OCR 处理——**默认使用 OCR 4 (`mistral-ocr-4-0`)**（质量最佳），在设置中也可选 **OCR 3 (`mistral-ocr-2512`)**（更便宜，约为一半成本）——适用于印刷文本、表格和手写；文本文件（TXT、MD）则可直接导入。多文件上传使用**上传会话**系统：每个文件独立进度，失败文件可单独重试，无需重新提交其他文件，完成后可关闭会话。OCR 会输出一个**平均置信度**（`average`，限制在 `[0,1]` 内，根据 Mistral 返回的 `averagePageConfidenceScore` 计算），在 UI 中以 `high` / `medium` / `low` 级徽章显示（阈值约为 0.9 / 0.7）——当扫描质量较差时会提醒但不会阻止。
- **自由文本**——直接输入或粘贴任意内容。如果审核已启用，存储前会先进行审核。
- **语音输入**——在浏览器中录制音频。由 `voxtral-mini-latest` 转写。`language="fr"` 参数可优化识别。
- **网页 / URL**——粘贴一个或多个 URL 以直接抓取内容（针对 JS 页面使用 Readability + Lightpanda），或输入关键词通过 Mistral Agent 进行网页搜索。单一输入框两者都支持——URL 与关键词会自动分开，每个结果都会创建一个独立来源。

### AI 内容生成

生成 8 种学习材料：

| 生成器 | 模型 | 输出 |
|---|---|---|
| **复习提纲** | `mistral-large-latest` | 标题、摘要、要点、词汇、引文、轶事 |
| **闪卡** | `mistral-large-latest` | 带来源引用的问答卡（数量可配置） |
| **选择题测验** | `mistral-large-latest` | 多项选择题、解释、自适应复习（数量可配置） |
| **填空题** | `mistral-large-latest` | 带提示和宽松验证（Levenshtein）的补全句子 |
| **听写** | `mistral-large-latest` + Voxtral TTS | 以音频朗读关键词（每词 1 个 MP3）→ 键盘输入 → 严格纠错（重音符号）并附带解释规则 |
| **播客** | `mistral-large-latest` + Voxtral TTS | 双人脚本 → MP3 音频 |
| **插图** | Agent `mistral-large-latest` | 通过 `image_generation` 工具生成的教育图像 |
| **语音测验** | `mistral-large-latest` + Voxtral TTS + STT | TTS 提问 → STT 作答 → AI 验证 |

### 通过聊天的 AI 导师

一个可对课程文档进行完整访问的对话式导师：

- 使用 `mistral-large-latest`
- **工具调用**：可在对话过程中生成提纲、闪卡、测验或填空题
- 每个课程保留 50 条消息历史
- 若档案启用审核，则会对内容进行审核

### 自动路由器

路由器使用 `mistral-small-latest` 分析来源内容，并在 8 个可用生成器中推荐最相关的选项。界面会实时显示进度：先是分析阶段，然后是各项独立生成，且可随时取消。

### 自适应学习

- **测验统计**：按题跟踪尝试次数和准确率
- **测验复习**：生成 5-10 道聚焦薄弱概念的新题
- **指令检测**：识别复习指令（“如果我会……，就算我掌握了这课”）并在兼容的文本生成器（提纲、闪卡、测验、填空题）中优先处理

### 安全与家长控制

- **4 个年龄组**：儿童（≤10 岁）、青少年（11-15 岁）、学生（16-25 岁）、成人（26+）
- **内容审核**：`mistral-moderation-2603`（Mistral Moderation 2），提供 10 个可用类别，其中 5 个默认对儿童/青少年屏蔽（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。可在设置中按档案自定义类别。`-latest` 别名被有意避开（它仍指向弃用版本）。
- **家长 PIN**：SHA-256 哈希，15 岁以下档案必需。生产部署建议使用带盐的慢哈希（Argon2id、bcrypt）。
- **聊天限制**：16 岁以下默认禁用 AI 聊天，家长可启用

### 多档案系统

- 多个档案，包含姓名、年龄、头像、语言偏好
- **按档案语音**（`Profile.mistralVoices?: { host?, guest? }`——每个角色都是可选的）——每个孩子都可以拥有自己的一对播客/语音测验语音
- **按档案主题**（`Profile.theme: 'dark' | 'light'`）——切换档案时自动切换，并在后端持久保存
- 通过 `profileId` 将项目与档案关联
- 级联删除：删除档案会删除其所有项目

### API 成本跟踪

每次 Mistral 调用（聊天、OCR、STT、TTS、审核、Agent）都会被埋点，以便向用户提供**透明**的欧元成本估算——账单没有惊喜。

- **单一事实来源**：`helpers/pricing.ts`——按模型前缀 `MODEL_PRICING`（例如：`mistral-large` → 输入 0.5 €/M tokens，输出 1.5 €/M tokens），`PRICING_SOURCES` 并附带 Mistral 文档 URL 以便定期重新抓取
- **支持的单位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）——由 `helpers/cost-calc.ts`
  进行转换
- **埋点链路**：`helpers/tracked-client.ts`（Mistral 客户端封装）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（注入到 HTTP 响应中）
- **UI**：每次生成的成本徽章（`src/partials/cost-badge-gen.html`）、每个来源的成本徽章（`cost-badge-src.html`）、仪表板中的累计总计（`Project.totalCost`）
- **端点**：`/generate/*` 和 `/sources/*` 的响应会为返回对象（Generation / Source）附加 `estimatedCost`、`usage` 和 `costBreakdown`。`POST /generate/route` 会为仅路由成本添加 `costDelta: number` 字段。`GET /projects/:pid` 返回经过增强的项目，其中包含 `totalCost`（根据 `costLog[]` 计算的总和）以及完整历史记录

### TTS（Mistral Voxtral）与自定义语音

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`，100% 由 Mistral 提供的语音合成，不需要额外密钥
- **自定义语音**：家长可以通过 Mistral Voices API（基于音频样本）创建自己的语音，并将其分配给主持人/嘉宾角色——此时播客和语音测验会使用家长的声音朗读，让孩子的体验更加沉浸
- 两个可配置的语音角色：**主持人**（主讲叙述者）和**嘉宾**（播客的第二个声音）
- 设置中提供完整的 Mistral 语音目录，可按语言筛选

### 国际化

- 界面支持 9 种语言：fr、en、es、pt、it、nl、de、hi、ar
- AI 提示词支持 15 种语言（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 每个档案可单独配置语言

---
## 技术栈

| 层 | 技术 | 作用 |
|---|---|---|
| **运行时** | Node.js + TypeScript 6.x | 服务器与类型安全 |
| **后端** | Express 5.x | REST API |
| **开发服务器** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars 片段、代理 |
| **前端** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 响应式界面，TypeScript 由 Vite 编译 |
| **模板引擎** | vite-plugin-handlebars | 通过 partials 组合 HTML |
| **AI** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、内容审核 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`，集成语音合成 |
| **图标** | Lucide 1.x | SVG 图标库 |
| **网页抓取** | Readability + linkedom | 提取网页主要内容（Firefox Reader View 技术） |
| **无头浏览器** | Lightpanda | 超轻量无头浏览器（Zig + V8），用于 JS/SPA 页面——抓取回退 |
| **Markdown** | Marked | 在聊天中渲染 markdown |
| **文件上传** | Multer 2.x | multipart 表单处理 |
| **音频** | ffmpeg-static | 音频片段拼接 |
| **测试** | Vitest | 单元测试——覆盖率由 SonarCloud 统计 |
| **持久化** | JSON 文件 | 无依赖存储 |

---

## 模型参考

| 模型 | 用途 | 原因 |
|---|---|---|
| `mistral-large-latest` | 复习卡、闪卡、播客、测验、填空题、聊天、语音测验校验、图像 Agent、网页搜索 Agent、指令检测 | 多语言能力最佳 + 指令跟踪 |
| `mistral-ocr-4-0` (OCR 4，默认) | 文档 OCR——更高质量 | 印刷文本、表格、手写体（$4 / 1000 页） |
| `mistral-ocr-2512` (OCR 3，可选) | 文档 OCR | 可在设置中选择，更便宜（$2 / 1000 页） |
| `voxtral-mini-latest` | 语音识别（STT） | 多语言 STT，针对 `language="fr"` 优化 |
| `voxtral-mini-tts-latest` | 语音合成（TTS） | 播客、语音测验、朗读 |
| `mistral-moderation-2603` | 内容审核 | 为儿童/青少年屏蔽 5 类内容（包括 `jailbreaking`） |
| `mistral-small-latest` | 自动路由器 | 对内容进行快速分析，以决定路由 |

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

> **注意**：Mistral Voxtral TTS 是唯一的 TTS 提供方——除 `MISTRAL_API_KEY` 外无需额外密钥。

> **用户输入的 API 密钥**：`MISTRAL_API_KEY` 现在是**可选的**。如果它不存在，应用仍会启动，并提示每位用户在界面中输入**自己的 Mistral 密钥**。该密钥会**存储在浏览器中**（在安全上下文里通过 Web Crypto + IndexedDB 加密），并通过请求发送——**绝不保存在服务器上**。优先级：个人资料密钥 > 浏览器全局密钥 > `MISTRAL_API_KEY`（env）。设置 `EUREKAI_REQUIRE_USER_KEY=true` 会强制每位用户提供自己的密钥（env 密钥只用于预加载）。

> **本地 HTTPS（平板/LAN）**：`localhost` 已经是安全上下文。若要通过 LAN（平板）访问，请生成本地证书并启用 HTTPS，以解锁浏览器加密并对传输中的密钥加密：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # 若可用则用 mkcert，否则使用 openssl 自签名
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite 使用 HTTPS
> ```

### 环境变量

| 变量 | 必需 | 默认值 | 作用 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 可选 | — | Mistral API 密钥（chat、OCR、STT、TTS Voxtral、agents、内容审核）。若缺失，用户会在应用中输入自己的密钥（存于浏览器，绝不存服务器） |
| `EUREKAI_REQUIRE_USER_KEY` | 可选 | `false` | `true` → 禁用 AI 请求对 `MISTRAL_API_KEY` 的回退（每位用户都必须提供自己的密钥）。适用于公开实例 |
| `HTTPS_KEY` / `HTTPS_CERT` | 可选 | — | TLS 密钥/证书路径（见 `scripts/gen-cert.sh`）→ Express 与 Vite 通过 HTTPS 提供服务（LAN/平板安全上下文） |
| `PORT` | 可选 | `3000` | Express 后端的 HTTP 端口 |
| `NODE_ENV` | 可选 | `development` | 若 `production` → Express 从 `dist/` 提供前端（否则为 `public/`） |
| `SONAR_TOKEN` | 可选 CI | — | 仅由 GitHub Actions 的 SonarCloud 工作流使用 |

### 测试、代码质量与贡献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git Hooks（Husky）**：`pre-commit` 会串联执行 `scripts/pre-commit-fast.sh`（冲突、大文件、shellcheck）、`lint-staged`，然后 `npm test`；`pre-push` 会先运行 `npm audit` 门禁（遇到传递性高危漏洞即阻止，见 `scripts/audit-verdict.mjs`），然后再执行 `npm run security`。任何一步失败都会阻止 commit/push。

**所需外部工具（可选，但被 `pretest` / `npm run security` 使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

如果没有这些工具，`npm test` 会在 `pretest` 失败（缺少 lizard），`npm run security` 会失败（缺少 opengrep）。此时 husky hooks 会阻止 commit/push。

---

## 容器部署

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

> **`:U`** 是一个 Podman rootless 标志，用于自动调整卷权限。

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

> **致 AI 贡献者**：请查阅 [`CLAUDE.md`](CLAUDE.md) 以获取详细的架构上下文、必须遵守的规则（防提示泄漏、错误码、成本追踪）以及已知陷阱（Lizard CCN、Opengrep、Codacy/Semgrep 迁移）。

---

## API 参考

### 配置
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/config` | 当前配置 |
| `PUT` | `/api/config` | 修改配置（模型、语音、TTS 模型） |
| `GET` | `/api/config/status` | API 状态：`mistral`（已定义 Mistral 密钥）、`ttsAvailable`（`mistral` 的别名，Mistral Voxtral 是唯一的 TTS 提供方） |
| `POST` | `/api/config/reset` | 重置为默认配置 |
| `GET` | `/api/config/voices` | 列出 Mistral TTS 语音（`?lang=fr` 可选） |
| `GET` | `/api/moderation-categories` | 可用的内容审核类别 + 各年龄默认值 |
| `POST` | `/api/providers/mistral/validate` | 验证用户输入的 Mistral 密钥——始终返回 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`），不走 env 回退 |

### 个人资料
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/profiles` | 列出所有个人资料 |
| `POST` | `/api/profiles` | 创建个人资料 |
| `PUT` | `/api/profiles/:id` | 修改个人资料（15 岁以下需要 PIN） |
| `DELETE` | `/api/profiles/:id` | 删除个人资料 + 级联删除项目 `{pin?}` → `{ok, deletedProjects}` |

### 项目
| 方法 | Endpoint | 描述 |
|---|---|---|
| `GET` | `/api/projects` | 列出项目（`?profileId=` 可选） |
| `POST` | `/api/projects` | 创建 `{name, profileId}` 项目 |
| `GET` | `/api/projects/:pid` | 项目详情 |
| `PUT` | `/api/projects/:pid` | 重命名 `{name}` |
| `DELETE` | `/api/projects/:pid` | 删除项目 |
| `GET` | `/api/projects/:pid/events` | 生成状态转换的实时 SSE 流（`event: generation`）（`completed`/`failed`/`cancelled`）+ heartbeat 保活 |

### 来源
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 导入 multipart 文件（JPG/PNG/PDF 使用 OCR，TXT/MD 直接读取） |
| `POST` | `/api/projects/:pid/sources/text` | 自由文本 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 语音（multipart 音频） |
| `POST` | `/api/projects/:pid/sources/websearch` | 抓取 URL 或网页搜索 `{query}`——返回来源数组 |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 删除来源 |
| `POST` | `/api/projects/:pid/moderate` | 审核 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 检测复习指令 |

### 生成
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 复习卡 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 闪卡 |
| `POST` | `/api/projects/:pid/generate/quiz` | 选择题测验 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 填空题 |
| `POST` | `/api/projects/:pid/generate/dictation` | 听写（单词 + 示例句 + 规则，每个单词 1 段 TTS 音频；也会被自动路由器建议） |
| `POST` | `/api/projects/:pid/generate/podcast` | 播客 |
| `POST` | `/api/projects/:pid/generate/image` | 插图 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 语音测验 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 自适应复习 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 针对测验 `{generationId, weakQuestions}` 中答错题目的定向回顾卡——由按钮“让我针对错误练习”与 `quiz-review` 并行调用 |
| `POST` | `/api/projects/:pid/generate/route` | 路由分析（待启动的生成器计划）——返回 `{plan, costDelta}`（仅路由成本） |
| `POST` | `/api/projects/:pid/generate/auto` | 后端自动生成（路由 + 8 种类型：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。并行执行——假设一个速率限制 ≥ 8 个并发请求的 Mistral 配额；否则多个 429 可能会在 `failedSteps` 中返回。 |

所有生成路由都接受 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`。`quiz-review` 和 `remediation-summary` 另外要求 `{generationId, weakQuestions}`。

### 生成内容 CRUD
| 方法 | Endpoint | 描述 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 提交测验答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 提交填空答案 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 提交听写答案 `{answers}`（严格服务器评分） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 验证口语回答（音频 + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 朗读（复习卡/闪卡） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 取消正在进行的生成（唯一的 pending 取消路径） |
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
| **采用 Alpine.js 而不是 React/Vue** | 体积最小，配合由 Vite 编译的 TypeScript，响应轻量。在速度至关重要的黑客松中非常合适。 |
| **使用 JSON 文件持久化** | 零依赖，启动即时。无需配置数据库——开机就能用。 |
| **Vite + Handlebars** | 两全其美：开发时 HMR 快速，HTML partials 便于组织代码，Tailwind JIT。 |
| **集中管理 Prompts** | 所有 AI prompts 都在 `prompts.ts` 中——便于按语言/年龄组迭代、测试和调整。 |
| **多生成系统** | 每个生成内容都是带有独立 ID 的独立对象——支持同一课程下的多份复习卡、测验等。 |
| **按年龄适配的 Prompts** | 4 个年龄组，词汇、复杂度和语气各不相同——同样的内容会根据学习者以不同方式讲授。 |
| **基于 Agents 的功能** | 图像生成和网页搜索使用临时的 Mistral Agents——生命周期清晰，并自动清理。 |
| **智能 URL 抓取** | 单个输入框可同时接受 URL 和关键词——URL 通过 Readability 抓取（静态页面），并在需要时回退到 Lightpanda（JS/SPA 页面）；关键词会触发一个 Mistral web_search Agent。每个结果都会创建一个独立来源。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（除 `MISTRAL_API_KEY` 外无需额外密钥）——语音合成集成到成本链路，并支持按语言进行语音识别。 |

---

## 致谢与鸣谢

- **[Mistral AI](https://mistral.ai)** — AI 模型（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ 全球黑客松
- **[Alpine.js](https://alpinejs.dev)** — 轻量响应式框架
- **[TailwindCSS](https://tailwindcss.com)** — 实用优先的 CSS 框架
- **[Vite](https://vitejs.dev)** — 前端构建工具
- **[Lucide](https://lucide.dev)** — 图标库
- **[Marked](https://marked.js.org)** — Markdown 解析器
- **[Readability](https://github.com/mozilla/readability)** — 网页内容提取（Firefox Reader View 技术）
- **[Lightpanda](https://lightpanda.io)** — 用于抓取 JS/SPA 页面内容的超轻量无头浏览器
- **[Luciole](https://luciole-vision.com)** — 专为视力不佳读者设计的字体，© Laurent Bourcellier & Jonathan Perez，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（个人资料的“阅读舒适模式”选项）

始于 Mistral AI Worldwide Hackathon（2026 年 3 月），由 AI 使用 [Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/) 和 [Gemini CLI](https://geminicli.com/) 全程开发。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 许可证

[AGPL-3.0](LICENSE) — 版权所有 (C) 2026 Julien LS

**使用 gpt-5.4-mini 将文章从法语翻译成中文。**
