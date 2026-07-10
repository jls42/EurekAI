<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>どんなコンテンツでもインタラクティブな学習体験に変える — <a href="https://mistral.ai">Mistral AI</a> によって実現。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 英語</a> · <a href="README-es.md">🇪🇸 スペイン語</a> · <a href="README-pt.md">🇧🇷 ポルトガル語</a> · <a href="README-de.md">🇩🇪 ドイツ語</a> · <a href="README-it.md">🇮🇹 イタリア語</a> · <a href="README-nl.md">🇳🇱 オランダ語</a> · <a href="README-ar.md">🇸🇦 アラビア語</a><br>
  <a href="README-hi.md">🇮🇳 ヒンディー語</a> · <a href="README-zh.md">🇨🇳 中国語</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 韓国語</a> · <a href="README-pl.md">🇵🇱 ポーランド語</a> · <a href="README-ro.md">🇷🇴 ルーマニア語</a> · <a href="README-sv.md">🇸🇪 スウェーデン語</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube デモ"></a>
</p>

<h4 align="center">📊 コード品質</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="品質ゲート"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="セキュリティ評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="信頼性評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="保守性評価"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="カバレッジ"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="脆弱性"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="コードの臭い"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="コード行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy バッジ"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 背景 — なぜ EurekAI なのか？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）で誕生しました（2026年3月）。題材が必要だったのですが、きっかけはとても身近なものでした。私は娘と一緒に定期的にテスト勉強をしているのですが、これを AI で、もっと楽しくインタラクティブにできないだろうかと思ったのです。

目的は、**どんな入力でも** — 授業の写真、コピペしたテキスト、音声録音、Web 検索 — を **復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラスト、そしてさらに多くの形式** に変換することです。すべて Mistral AI のフランス製モデルで駆動しており、フランス語圏の学習者に自然に適したソリューションになっています。

[最初のプロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai) は、ハッカソン中に Mistral の各種サービスを使った概念実証として48時間で作られました。すでに動作はしていましたが、機能は限定的でした。その後、EurekAI は本格的なプロジェクトへと成長しました。穴埋め問題、演習内ナビゲーション、Web スクレイピング、設定可能な保護者モデレーション、徹底したコードレビューなど、さらに多くの機能が追加されています。コード全体は AI によって生成されており、主に [Claude Code](https://code.claude.com/)、一部 [Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) による貢献もあります。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI のガイドツアー：ソース、ノート、クイズ、フラッシュカード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成、カードごとの推定コストとプロジェクト合計、「Auto — マジック！」ボタン | ![ソース](docs/screenshots/sources.webp)<br>**ソース** — 写真/PDF/テキスト/音声/Web の取り込み、ワンクリック生成、指示検出 |

インポートされた各ソースには、[OCR 信頼度スコア、モデレーション、推定コスト](docs/screenshots/sources-list.webp) が表示されます。

### コンポーネントの動作

| | |
|---|---|---|
| ![復習ノート](docs/screenshots/notes.gif)<br>**復習ノート** — 要点、語彙、出典付き引用、セクションごとの音声読み上げ | ![クイズ](docs/screenshots/quiz.gif)<br>**MCQ クイズ** — 解説付きの即時フィードバック、ステップごとのナビゲーション |
| ![フラッシュカード](docs/screenshots/flashcards.gif)<br>**フラッシュカード** — 裏返し可能なカードと自己評価「知っていた / 知らなかった」 | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — 必要に応じたヒント、寛容な検証 |
| ![ディクテーション](docs/screenshots/dictation.gif)<br>**ディクテーション** — 音声で読み上げられる単語、文字単位の厳密な採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 音読される質問、マイクでの回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2人の声によるミニポッドキャスト、閲覧可能な対話形式スクリプト | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — Agent によって生成された教育用画像 |
| ![AI チューター](docs/screenshots/chat.gif)<br>**AI チューター** — 授業資料に根ざしたチャット、説明付き回答、クイズやフラッシュカードも生成可能 | |

### 使い始め

| | |
|---|---|
| ![プロフィール選択](docs/screenshots/login.gif)<br>**プロフィール選択** — 各子どもに専用スペース、アバター、言語があります | ![プロフィール作成](docs/screenshots/profile-create.gif)<br>**プロフィール作成** — 年齢、アバター、15歳未満向けの保護者 PIN |
| ![コース作成](docs/screenshots/course.gif)<br>**コース作成** — 1つのレッスンにつき1つのプロジェクト、ソースの受け入れ準備完了 | ![設定](docs/screenshots/settings.gif)<br>**設定** — API ステータス、料金表示付きの AI モデル選択 |

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | レッスンを取り込みます — 写真、PDF（Mistral OCR と平均化された信頼度スコア、しきい値 `high`/`medium`/`low` を介して）またはテキストファイル（TXT、MD）。アップロードセッションでは、ファイルごとの再試行と個別の進捗表示に対応しています |
| 📝 | **テキスト入力** | どんなテキストでも直接入力または貼り付けできます |
| 🎤 | **音声入力** | ブラウザで録音します — Voxtral STT が音声を文字起こしします |
| 🌐 | **Web / URL** | URL を貼り付けると（Readability + Lightpanda による直接スクレイピング）、または検索語を入力すると（Agent Mistral web_search）処理されます |
| 📄 | **復習ノート** | 要点、語彙、引用、エピソードを含む構造化ノート |
| 🃏 | **フラッシュカード** | インタラクティブな Q/R カード、対話形式の音声読み上げ |
| ❓ | **MCQ クイズ** | 誤答の適応復習付きの多肢選択問題（数を設定可能） |
| ✏️ | **穴埋め問題** | ヒントと寛容な検証付きの補完演習 |
| 🔤 | **ディクテーション** | インポートしたリスト、キーボード入力、文字単位の厳密な採点と説明付きの綴り規則に基づき、音声で単語を読み上げます（Voxtral TTS） |
| 🎙️ | **ポッドキャスト** | 2人の声によるミニポッドキャスト音声 — デフォルトの Mistral 音声、またはカスタム音声（保護者向け！） |
| 🖼️ | **イラスト** | Agent Mistral によって生成された教育用画像 |
| 🗣️ | **音声クイズ** | 音読される質問（カスタム音声も可）、口頭回答、AI による検証 |
| 💬 | **AI チューター** | あなたの授業資料に基づく文脈対応チャット、ツール呼び出し付き |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターがコンテンツを解析し、利用可能な 8 種類の生成器から最適な組み合わせを提案します |
| 🔒 | **保護者コントロール** | プロフィールごとに設定可能なモデレーション（カスタマイズ可能なカテゴリ）、保護者 PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは 9 言語で利用可能。AI 生成はプロンプトを通じて 15 言語で制御可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS を使ってノートとフラッシュカード（Q/A の対話）を聴けます |
| 💶 | **API コスト追跡** | 各生成と各ソースの € コストを透明に推定（トークン / 文字 / ページ / 音声秒）。カードごとのバッジ + プロジェクト合計がダッシュボードに表示されます |
| 🎨 | **プロフィール別テーマ** | 各プロフィールで `dark` または `light` テーマを選択可能 — プロフィール変更後も保持されます |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャ概要" width="800" />
</p>

---

## モデル使用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI モデルとタスクの対応表" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者の学習ジャーニー" width="800" />
</p>

---

## 深掘り — 機能

### マルチモーダル入力

EurekAI は 4 種類のソースを受け付け、プロフィールに応じてモデレーションされます（子どもとティーンではデフォルトで有効）：

- **ファイルのインポート** — JPG、PNG、PDF ファイルを Mistral OCR で処理します — **OCR 4 (`mistral-ocr-4-0`) がデフォルト**（最高品質）、**OCR 3 (`mistral-ocr-2512`) が設定で選択可能**（より安価、コストは約半分）— 印刷テキスト、表、手書き文字に対応。テキストファイル（TXT、MD）は直接インポートできます。複数ファイルのアップロードは **アップロードセッション** を使います。ファイルごとの進捗表示、失敗したファイルのみの再試行、他のファイルを再送信せずに処理できます。完了後はセッションを閉じられます。OCR は平均化された **信頼度スコア** (`average`、`[0,1]` にクランプ、Mistral が返す `averagePageConfidenceScore` から計算) を公開し、UI では `high` / `medium` / `low` のバッジとして表示されます（しきい値は約 0.9 / 約 0.7）— 画質が悪い場合はブロックせずに警告します。
- **自由記述テキスト** — どんな内容でも入力または貼り付けできます。モデレーションが有効な場合は保存前に検査されます。
- **音声入力** — ブラウザ内で音声を録音します。`voxtral-mini-latest` により文字起こしされます。`language="fr"` パラメータが認識を最適化します。
- **Web / URL** — 1つ以上の URL を貼り付けると、コンテンツを直接スクレイピングします（JavaScript ページ向けの Readability + Lightpanda）、またはキーワードを入力すると Mistral Agent による Web 検索を実行します。単一入力欄で両方に対応し、URL とキーワードは自動で分割され、各結果が独立したソースとして作成されます。

### AI コンテンツ生成

8 種類の学習素材を生成できます：

| 生成器 | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、要点、語彙、引用、エピソード |
| **フラッシュカード** | `mistral-large-latest` | ソース参照付きの Q/R カード（数を設定可能） |
| **MCQ クイズ** | `mistral-large-latest` | 多肢選択問題、解説、適応復習（数を設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの補完文、寛容な検証（Levenshtein） |
| **ディクテーション** | `mistral-large-latest` + Voxtral TTS | 音声で読み上げるキーワード（1 単語につき 1 MP3）→ キーボード入力 → 厳密な採点（アクセント）と説明付き規則 |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2 声スクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツール経由の教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS で質問 → STT で回答 → AI による検証 |

### チャット型 AI チューター

授業資料に完全にアクセスできる会話型チューターです：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中にノート、フラッシュカード、クイズ、穴埋め問題を生成できます
- 1 コースあたり 50 メッセージの履歴
- プロフィールで有効な場合、コンテンツモデレーションを実施

### 自動ルーター

ルーターは `mistral-small-latest` を使ってソース内容を解析し、利用可能な 8 種類の中から最も適切な生成器を提案します。インターフェースはリアルタイムで進行状況を表示します。まず解析フェーズがあり、その後に個別生成が行われ、必要ならキャンセルできます。

### 適応学習

- **クイズ統計**：問題ごとの試行回数と正答率を追跡
- **クイズ復習**：弱い概念を狙った新しい問題を 5〜10 問生成
- **指示検出**：「私はレッスンをこう言えれば知っている…」のような復習指示を検出し、対応するテキスト生成器（ノート、フラッシュカード、クイズ、穴埋め問題）で優先的に扱います

### セキュリティと保護者コントロール

- **4 つの年齢グループ**：子ども（≤10歳）、ティーン（11-15）、学生（16-25）、大人（26+）
- **コンテンツモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）で、利用可能な 10 カテゴリのうち 5 つが子ども/ティーンではデフォルトでブロックされています（`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`）。カテゴリは設定画面でプロフィールごとにカスタマイズできます。`-latest` エイリアスは意図的に使っていません（まだ非推奨版を指しているため）。
- **保護者 PIN**：SHA-256 ハッシュ、15歳未満のプロフィールで必須です。本番環境では、ソルト付きの遅いハッシュ（Argon2id、bcrypt）を使用してください。
- **チャット制限**：AI チャットは 16歳未満ではデフォルト無効で、保護者が有効化できます

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数プロフィール
- **プロフィールごとの音声** (`Profile.mistralVoices?: { host?, guest? }` — 各ロールは任意) — 各子どもはポッドキャスト/音声クイズ用に自分の音声ペアを持てます
- **プロフィールごとのテーマ** (`Profile.theme: 'dark' | 'light'`) — プロフィール変更時に自動切り替えされ、バックエンド側に永続化されます
- プロフィールは `profileId` を通じてプロジェクトと紐づきます
- カスケード削除：プロフィールを削除すると、そのすべてのプロジェクトも削除されます

### API コスト追跡

すべての Mistral 呼び出し（チャット、OCR、STT、TTS、モデレーション、エージェント）は、ユーザーに対して **透明な** € 推定値を提供するよう計測されています。請求額に驚かされることはありません。

- **正本**：`helpers/pricing.ts` — モデルの prefix ごとの `MODEL_PRICING`（例：`mistral-large` → input 0.5 €/M tokens、output 1.5 €/M tokens）、定期的な再スクレイピングのための Mistral ドキュメント URL を使う `PRICING_SOURCES`
- **対応単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— `helpers/cost-calc.ts` による変換
- **計測チェーン**：`helpers/tracked-client.ts`（Mistral クライアントのラッパー）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP レスポンスへの注入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごとのコストバッジ（`cost-badge-src.html`）、ダッシュボードでの累計合計（`Project.totalCost`）
- **エンドポイント**：`/generate/*` と `/sources/*` の応答が、返却オブジェクト（Generation / Source）に `estimatedCost`、`usage`、`costBreakdown` を付与します。`POST /generate/route` はルーティング単体のコスト用に `costDelta: number` フィールドを追加します。`GET /projects/:pid` は `totalCost`（`costLog[]` から計算された合計）と完全な履歴を含む拡張済みプロジェクトを返します

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`、100% Mistral の音声合成で、追加のキーは不要です
- **カスタム音声**：保護者は Mistral Voices API（音声サンプルから）を使って自分の声を作成し、ホスト/ゲストの役割に割り当てることができます。するとポッドキャストや音声クイズは保護者の声で再生され、子どもにとってさらに没入感のある体験になります
- 設定可能な 2 つの音声ロール：**ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの第2音声）
- Mistral の音声カタログは設定画面で完全に利用可能で、言語でフィルタできます

### 国際化

- インターフェースは 9 言語で利用可能：fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは 15 言語に対応（fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv）
- 言語はプロフィールごとに設定可能

---
## 技術スタック

| レイヤー | 技術 | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars の partial、プロキシ |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、Vite でコンパイルされる TypeScript |
| **Templating** | vite-plugin-handlebars | partial による HTML 構成 |
| **AI** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Web スクレイピング** | Readability + linkedom | Web ページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPA ページ向けの超軽量ヘッドレスブラウザ（Zig + V8）— スクレイピングのフォールバック |
| **Markdown** | Marked | Chat 内の Markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | multipart フォームの管理 |
| **Audio** | ffmpeg-static | 音声セグメントの連結 |
| **Tests** | Vitest | 単体テスト — SonarCloud で計測されるカバレッジ |
| **永続化** | JSON ファイル | 依存関係なしの保存 |

---

## モデル参照

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | まとめ、Flashcards、Podcast、穴埋めテキスト、Chat、音声 quiz 検証、Image Agent、Web Search Agent、指示検出 | 最良の多言語対応 + 指示追従 |
| `mistral-ocr-4-0` (OCR 4、デフォルト) | 文書 OCR — 最高品質 | 印刷テキスト、表、手書き ($4 / 1000 ページ) |
| `mistral-ocr-2512` (OCR 3、オプション) | 文書 OCR | 設定で選択可能、より安価 ($2 / 1000 ページ) |
| `voxtral-mini-latest` | 音声認識 (STT) | 多言語 STT、`language="fr"` で最適化 |
| `voxtral-mini-tts-latest` | 音声合成 (TTS) | Podcast、音声 quiz、音読 |
| `mistral-moderation-2603` | コンテンツのモデレーション | 子ども/ティーン向けに 5 つのカテゴリをブロック（`jailbreaking` を含む） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のためのコンテンツ高速分析 |

---

## クイックスタート

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

> **注**: Mistral Voxtral TTS は唯一の TTS プロバイダーです — `MISTRAL_API_KEY` 以外に追加のキーは必要ありません。

> **ユーザー入力の API キー**: `MISTRAL_API_KEY` は現在 **任意** です。未設定でもアプリは起動し、各ユーザーにインターフェース上で **自分の Mistral キー** を入力するよう求めます。キーは **ブラウザ内に保存** され（安全なコンテキストで Web Crypto + IndexedDB により暗号化）、リクエストごとに送信されます — **サーバーには一切永続化されません**。優先順位: プロフィールキー > ブラウザのグローバルキー > `MISTRAL_API_KEY` (env)。`EUREKAI_REQUIRE_USER_KEY=true` を設定すると、各ユーザーは必ず自分のキーを提供する必要があります（env のキーは事前読み込みにのみ使われます）。

> **ローカル HTTPS（タブレット/LAN）**: `localhost` はすでに安全なコンテキストです。LAN アクセス（タブレット）用には、ローカル証明書を生成して HTTPS を有効にし、ブラウザ側の暗号化を有効化しつつ転送中のキーも暗号化してください:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert があればそれを使用、なければ openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # HTTPS で Express + Vite
> ```

### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral API キー（chat、OCR、STT、Voxtral TTS、agents、モデレーション）。未設定時は、ユーザーがアプリ内で自分のキーを入力します（ブラウザに保存、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AI リクエストで `MISTRAL_API_KEY` のフォールバックを無効化（各ユーザーが必ず自分のキーを提供する必要あり）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLS キー/証明書のパス（`scripts/gen-cert.sh` 参照）→ Express と Vite を HTTPS で提供（secure context LAN/タブレット） |
| `PORT` | 任意 | `3000` | Express バックエンドの HTTP ポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合 → Express が `dist/` からフロントエンドを提供（そうでなければ `public/`） |
| `SONAR_TOKEN` | 任意 CI | — | GitHub Actions の SonarCloud ワークフローでのみ使用 |

### テスト、コード品質、貢献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git フック (Husky)**: `pre-commit` は `scripts/pre-commit-fast.sh`（競合、大きなファイル、shellcheck）、`lint-staged`、その後 `npm test` を順に実行します。`pre-push` はまず `npm audit` のゲートを実行し（重大な transitive vulnerability でブロック、`scripts/audit-verdict.mjs` 参照）、その後 `npm run security` を実行します。いずれも失敗すると commit/push をブロックします。

**必要な外部ツール（任意だが `pretest` / `npm run security` で使用）**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test` は `pretest`（lizard 不在）で失敗し、`npm run security` は失敗します（opengrep 不在）。その場合、husky フックが commit/push をブロックします。

---

## コンテナによるデプロイ

イメージは **GitHub Container Registry** に公開されています:

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

> **`:U`** は、ボリュームの権限を自動調整する rootless Podman のフラグです。

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## プロジェクト構成

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

> **AI コントリビューター向け**: 詳細なアーキテクチャの背景、必須ルール（プロンプトの漏えい防止、エラーコード、コスト追跡）および既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep migration）については [`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## API リファレンス

### Config
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定を変更（モデル、音声、TTS モデル） |
| `GET` | `/api/config/status` | API ステータス: `mistral` (Mistral キーが設定済み)、`ttsAvailable` (`mistral` のエイリアス、Mistral Voxtral は唯一の TTS プロバイダー) |
| `POST` | `/api/config/reset` | デフォルト設定にリセット |
| `GET` | `/api/config/voices` | Mistral TTS の音声を一覧表示（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢別のデフォルト |
| `POST` | `/api/providers/mistral/validate` | ユーザー入力の Mistral キーを検証 — 常に 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`)、env フォールバックなし |

### プロフィール
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロフィールを一覧表示 |
| `POST` | `/api/profiles` | プロフィールを作成 |
| `PUT` | `/api/profiles/:id` | プロフィールを編集（15歳未満は PIN 必須） |
| `DELETE` | `/api/profiles/:id` | プロフィールを削除 + プロジェクトの cascade `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=` は任意） |
| `POST` | `/api/projects` | `{name, profileId}` を作成 |
| `GET` | `/api/projects/:pid` | プロジェクト詳細 |
| `PUT` | `/api/projects/:pid` | `{name}` を変更 |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成トランジションのリアルタイム SSE ストリーム (`event: generation`) (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### ソース
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart ファイルをインポート（JPG/PNG/PDF は OCR、TXT/MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由記述テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 音声（multipart 音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL スクレイピングまたは Web 検索 `{query}` — ソースの配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | `{text}` をモデレート |
| `POST` | `/api/projects/:pid/detect-consigne` | 見直し用の指示を検出 |

### 生成
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習用シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | MCQ クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋めテキスト |
| `POST` | `/api/projects/:pid/generate/dictation` | ディクテーション（単語 + 例文 + ルール、単語ごとに TTS 音声 1 つ；自動ルーターでも提案） |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | 画像生成 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声 quiz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズで間違えた質問に特化した復習シート `{generationId, weakQuestions}` — 「間違いで練習する」ボタンにより `quiz-review` と並列で呼び出される |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（実行する生成器の計画）— `{plan, costDelta}`（ルーティング単独のコスト）を返す |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（routing + 8 types: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation）。並列実行 — rate-limit が 8 同時リクエスト以上の Mistral tier を前提とする；そうでない場合、複数の 429 が `failedSteps` に返る可能性がある。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け入れます。`quiz-review` と `remediation-summary` ではさらに `{generationId, weakQuestions}` が必要です。

### 生成 CRUD
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズ回答 `{answers}` を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋めテキストの回答 `{answers}` を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | ディクテーション回答 `{answers}` を送信（厳格なサーバースコア） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を検証（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 音読（fiches/flashcards） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 実行中の生成をキャンセル（pending の唯一のキャンセル経路） |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` を変更 |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### Chat
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chat 履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Chat 履歴を消去 |

---

## アーキテクチャ上の判断

| 判断 | 理由 |
|---|---|
| **React/Vue ではなく Alpine.js** | 最小限のフットプリント、Vite でコンパイルされた TypeScript による軽量なリアクティビティ。速度が重要なハッカソンに最適。 |
| **JSON ファイルで永続化** | 依存関係ゼロ、即時起動。設定すべきデータベースはありません — すぐに開始できます。 |
| **Vite + Handlebars** | 両方の良いところを活用: 開発用の高速 HMR、コード整理のための HTML partial、Tailwind JIT。 |
| **中央集約されたプロンプト** | すべての AI プロンプトを `prompts.ts` に集約 — 言語/年齢層ごとに反復、テスト、適応しやすい。 |
| **マルチ生成システム** | 各生成物は固有の ID を持つ独立オブジェクト — 1 つの講義につき複数のシート、クイズなどを可能にする。 |
| **年齢に適応したプロンプト** | 語彙、複雑さ、口調が異なる 4 つの年齢グループ — 同じ内容でも学習者に応じて教え方が変わる。 |
| **Agents ベースの機能** | 画像生成と Web 検索は一時的な Mistral Agents を使用 — 自動クリーンアップ付きの適切なライフサイクル。 |
| **賢い URL スクレイピング** | 1 つの入力欄で URL とキーワードの混在を受け付ける — URL は Readability（静的ページ）でスクレイピングされ、Lightpanda（JS/SPA ページ）にフォールバック、キーワードは Mistral web_search Agent を起動する。各結果は独立したソースを作成する。 |
| **100% Mistral の TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外に追加キー不要）— コストチェーンと言語別音声解決に統合された音声合成。 |

---

## クレジットと謝辞

- **[Mistral AI](https://mistral.ai)** — AI モデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティ CSS フレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdown パーサー
- **[Readability](https://github.com/mozilla/readability)** — Web コンテンツ抽出（Firefox Reader View 技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPA ページのスクレイピング用超軽量ヘッドレスブラウザ
- **[Luciole](https://luciole-vision.com)** — 視覚障害のある読者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロフィールの「読書しやすさ」オプション）

Mistral AI Worldwide Hackathon（2026年3月）で始動し、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) を使って AI のみにより完全に開発されました。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**gpt-5.4-miniでfrからjaに翻訳された記事。**
