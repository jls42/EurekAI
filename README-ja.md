<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変換 — <a href="https://mistral.ai">Mistral AI</a> 搭載。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTubeデモ"></a>
</p>

<h4 align="center">📊 コード品質</h4>

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

## ストーリー — なぜ EurekAI なのか？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）の期間中に生まれました。テーマが必要だったのですが、アイデアはとても身近なところから来ました。娘と定期的にテスト勉強をしていて、AIの力でもっと楽しくインタラクティブにできるはずだと思ったのです。

目標は、**あらゆる入力** — 授業の写真、コピー＆ペーストしたテキスト、音声録音、ウェブ検索 — を取り込み、**復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど**に変換することです。すべてフランスの Mistral AI モデルで動作するため、フランス語圏の生徒にも自然に適したソリューションになっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)は、ハッカソン中の48時間で Mistral のサービスを中心とした概念実証として設計されました。すでに動作していましたが、機能は限定的でした。その後、EurekAI は本格的なプロジェクトへと成長しました。穴埋め問題、演習内ナビゲーション、ウェブスクレイピング、設定可能な保護者モデレーション、徹底的なコードレビューなどです。コード全体は AI によって生成されています — 主に [Claude Code](https://code.claude.com/) で、一部は [Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) による貢献もあります。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAIのガイドツアー：ソース、ノート、クイズ、フラッシュカード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成、カードごとの推定コストとプロジェクト合計、「Auto — Magie !」ボタン | ![ソース](docs/screenshots/sources.webp)<br>**ソース** — 写真／PDF／テキスト／音声／ウェブのインポート、ワンクリック生成、指示の検出 |

インポートされた各ソースには、[OCR信頼度スコア、モデレーション、推定コスト](docs/screenshots/sources-list.webp)が表示されます。

### 実際のコンポーネント

| | |
|---|---|
| ![復習ノート](docs/screenshots/notes.gif)<br>**復習ノート** — 要点、語彙、出典付き引用、セクションごとの音声読み上げ | ![クイズ](docs/screenshots/quiz.gif)<br>**QCMクイズ** — 解説付きの即時フィードバック、ステップバイステップのナビゲーション |
| ![フラッシュカード](docs/screenshots/flashcards.gif)<br>**フラッシュカード** — カードを裏返してから「わかった／わからなかった」で自己評価 | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — オンデマンドのヒント、寛容な検証 |
| ![ディクテ](docs/screenshots/dictation.gif)<br>**ディクテ** — 音声で読み上げられた単語、文字単位の厳密な採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 質問を声に出して読み上げ、マイクで回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2声のミニポッドキャスト、閲覧可能な対話スクリプト | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — Agent が生成する教育用画像 |
| ![AIチューター](docs/screenshots/chat.gif)<br>**AIチューター** — コースのドキュメントに基づくチャット、解説付きの回答、クイズやフラッシュカードの生成も可能 | |

### はじめに

| | |
|---|---|
| ![プロフィール選択](docs/screenshots/login.gif)<br>**プロフィール選択** — 各子どもに専用スペース、アバター、言語 | ![プロフィール作成](docs/screenshots/profile-create.gif)<br>**プロフィール作成** — 年齢、アバター、15歳未満向けの保護者PIN |
| ![コース作成](docs/screenshots/course.gif)<br>**コース作成** — レッスンごとのプロジェクト、ソースを受け入れる準備完了 | ![設定](docs/screenshots/settings.gif)<br>**設定** — APIステータス、料金表示付きのAIモデル選択 |

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | レッスンをインポート — 写真、PDF（信頼度スコア平均付きの Mistral OCR、ティア `high`/`medium`/`low`）、またはテキストファイル（TXT、MD）。ファイルごとのリトライと個別進捗付きのアップロードセッション |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 録音 — Voxtral STT が声を文字起こし |
| 🌐 | **Web / URL** | URLを貼り付け（Readability + Lightpanda による直接スクレイピング）、または検索を入力（Agent Mistral web_search） |
| 📄 | **復習ノート** | 要点、語彙、引用、逸話付きの構造化されたノート |
| 🃏 | **フラッシュカード** | インタラクティブな Q/A カード、対話型音声読み上げ |
| ❓ | **QCMクイズ** | 誤答の適応的復習付き多肢選択問題（数は設定可能） |
| ✏️ | **穴埋め問題** | ヒントと寛容な検証付きの穴埋め演習 |
| 🔤 | **ディクテ** | インポートしたリストから音声で読み上げる単語（Voxtral TTS）、キーボード入力、文字単位の厳密な採点と説明付きの綴りルール |
| 🎙️ | **ポッドキャスト** | 2声のミニポッドキャスト音声 — デフォルトの Mistral ボイス、またはカスタムボイス（保護者向け！） |
| 🖼️ | **イラスト** | Agent Mistral が生成する教育用画像 |
| 🗣️ | **音声クイズ** | 声に出して読み上げる質問（カスタムボイス可）、口頭での回答、AIによる検証 |
| 💬 | **AIチューター** | コースドキュメントを使ったコンテキスト付きチャット、ツール呼び出し対応 |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターがコンテンツを分析し、利用可能な8種類のジェネレーターから組み合わせを提案 |
| 🔒 | **保護者コントロール** | プロフィールごとの設定可能なモデレーション（カスタマイズ可能なカテゴリ）、保護者PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは9言語で利用可能；AI生成はプロンプト経由で15言語を制御可能 |
| 🔊 | **音声読み上げ** | ノートとフラッシュカード（質問／回答の対話）を Mistral Voxtral TTS で聴く |
| 💶 | **APIコスト追跡** | 各生成とソースの€コストを透明に推定（トークン／文字／ページ／音声秒数）。カードごとのバッジ＋プロジェクト合計をダッシュボードで表示 |
| 🎨 | **プロフィールごとのテーマ** | 各プロフィールが `dark` または `light` テーマを選択 — プロフィール切り替え時も保持 |

---

## アーキテクチャ概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## モデル利用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAI は4種類のソースを受け付け、プロフィールに応じてモデレーションされます（子ども・ティーン向けはデフォルトで有効）：

- **ファイルのインポート** — JPG、PNG、または PDF ファイルを Mistral OCR で処理 — **デフォルトは OCR 4（`mistral-ocr-4-0`）**（最高品質）、設定で **OCR 3（`mistral-ocr-2512`）をオプション選択可**（より安価、コスト約½） — 印刷テキスト、表、手書きに対応；またはテキストファイル（TXT、MD）を直接インポート。複数ファイルのアップロードは **アップロードセッション** システムを使用：ファイルごとの個別進捗、他を再送信せずに失敗ファイルのみリトライ、完了時にセッションを閉じる。OCR は平均化された **信頼度スコア**（`average`、`[0,1]` にクランプ、Mistral が返す `averagePageConfidenceScore` から計算）を公開し、UI ではティアバッジ `high` / `medium` / `low`（しきい値 ~0.9 / ~0.7）として表示 — スキャン品質が低い場合はブロックせず警告します。
- **自由テキスト** — 任意のコンテンツを入力または貼り付け。モデレーションが有効な場合、保存前にモデレートされます。
- **音声入力** — ブラウザで音声を録音。`voxtral-mini-latest` で文字起こし。`language="fr"` パラメータが認識を最適化します。
- **Web / URL** — 1つまたは複数の URL を貼り付けてコンテンツを直接スクレイピング（JSページ向けに Readability + Lightpanda）、またはキーワードを入力して Agent Mistral 経由でウェブ検索。単一フィールドが両方を受け付け — URL とキーワードは自動で分離され、各結果が独立したソースを作成します。

### AIコンテンツ生成

生成される学習教材は8種類：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、要点、語彙、引用、逸話 |
| **フラッシュカード** | `mistral-large-latest` | ソース参照付き Q/A カード（数は設定可能） |
| **QCMクイズ** | `mistral-large-latest` | 多肢選択問題、解説、適応的復習（数は設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、寛容な検証（Levenshtein） |
| **ディクテ** | `mistral-large-latest` + Voxtral TTS | 音声で読み上げるキーワード（1語あたり1 MP3）→ キーボード入力 → アクセント込みの厳密な採点と説明付きルール |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2声スクリプト → MP3音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツール経由の教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS質問 → STT回答 → AI検証 |

### チャットによるAIチューター

コースドキュメントへのフルアクセスを持つ会話型チューター：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中にノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースあたり50メッセージの履歴
- プロフィールで有効な場合、コンテンツをモデレーション

### 自動ルーター

ルーターは `mistral-small-latest` を使い、ソースのコンテンツを分析して利用可能な8つのジェネレーターから最も適切なものを提案します。インターフェースはリアルタイムの進捗を表示：まず分析フェーズ、次に個別の生成（キャンセル可能）。

### 適応学習

- **クイズ統計**：質問ごとの試行回数と正答率の追跡
- **クイズ復習**：苦手な概念を狙った5〜10の新しい問題を生成
- **指示の検出**：「これができたらレッスンを覚えたことになる…」といった復習指示を検出し、対応するテキスト系ジェネレーター（ノート、フラッシュカード、クイズ、穴埋め）で優先

### セキュリティと保護者コントロール

- **4つの年齢グループ**：子ども（≤10歳）、ティーン（11〜15）、学生（16〜25）、大人（26+）
- **コンテンツモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）、利用可能な11カテゴリ、子ども／ティーン向けにデフォルトで5つをブロック（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。設定でプロフィールごとにカテゴリをカスタマイズ可能；Moderation 2 は旧カテゴリ「危険なコンテンツ」を `dangerous` + `criminal` に分割（既存プロフィールは自動移行され、ブロックされたカテゴリはすでにインポート済みのソースにも適用）。デフォルトの安全性：モデルの応答でブロック対象カテゴリを検証できない場合、コンテンツは拒否されます（「モデレーション利用不可」）；モデレーションが有効な場合、生成とチャットはフラグ付き・エラー・検証中のソースを除外します（モデレーション無効でインポートされたソースは再検証されません）。日付付きIDが `helpers/moderation-model.ts` に固定：非推奨のエイリアス `-latest` は API にリストされなくなりました。
- **保護者PIN**：SHA-256 ハッシュ、15歳未満のプロフィールに必須。本番デプロイでは、ソルト付きの遅いハッシュ（Argon2id、bcrypt）を計画してください。
- **チャット制限**：16歳未満ではAIチャットはデフォルトで無効、保護者が有効化可能

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数プロフィール
- **プロフィールごとのボイス**（`Profile.mistralVoices?: { host?, guest? }` — 各ロールはオプション）— 各子どもがポッドキャスト／音声クイズ用のボイスペアを持てる
- **プロフィールごとのテーマ**（`Profile.theme: 'dark' | 'light'`）— プロフィール切り替え時に自動切替、バックエンド側で永続化
- `profileId` 経由でプロフィールに紐づくプロジェクト
- カスケード削除：プロフィールを削除すると、そのすべてのプロジェクトも削除される

### APIコスト追跡

課金対象の各 Mistral 呼び出し（チャット、OCR、STT、TTS、エージェント）が計測され、ユーザーに **透明な** €推定を提供します。無料のモデレーションは計上されません。既知の制限：エージェントのツール料金（ウェブ検索 30 $/1000呼び出し、画像生成 100 $/1000画像）はまだ計上されていません — イラストの表示コストは過小評価されています。

- **信頼できる情報源**：`helpers/pricing.ts` — モデル接頭辞ごとの `MODEL_PRICING`（例：`mistral-large` → 入力 0.5 €/M tokens、出力 1.5 €/M tokens）、定期的な再スクレイピング用の Mistral ドキュメント URL 付き `PRICING_SOURCES`
- **対応単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— `helpers/cost-calc.ts` による変換
- **計測チェーン**：`helpers/tracked-client.ts`（Mistral クライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTPレスポンスへの注入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごと（`cost-badge-src.html`）、ダッシュボードの累計合計（`Project.totalCost`）
- **エンドポイント**：`/generate/*` と `/sources/*` のレスポンスは、返却オブジェクト（Generation / Source）に `estimatedCost`、`usage`、`costBreakdown` を付与。`POST /generate/route` はルーティングのみのコスト用に `costDelta: number` フィールドを追加。`GET /projects/:pid` は `totalCost`（`costLog[]` から計算された合計）＋完全な履歴で enrichment されたプロジェクトを返す

### TTS（Mistral Voxtral）とカスタムボイス

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`、100% Mistral の音声合成、追加キー不要
- **カスタムボイス**：保護者は Mistral Voices API（音声サンプルから）で独自のボイスを作成し、ホスト／ゲストのロールに割り当て可能 — ポッドキャストと音声クイズが保護者の声で再生され、子どもにとってさらに没入感のある体験に
- 設定可能な2つの音声ロール：**ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの2人目の声）
- 設定に Mistral ボイスの完全なカタログがあり、言語でフィルタ可能
### 国際化

- インターフェースは9言語に対応：fr、en、es、pt、it、nl、de、hi、ar
- IAプロンプトは15言語をサポート（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 言語はプロフィールごとに設定可能

---

## 技術スタック

| 層 | 技術 | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、プロキシ |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、ViteによるTypeScriptコンパイル |
| **Templating** | vite-plugin-handlebars | partialsによるHTML構成 |
| **IA** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVGアイコンライブラリ |
| **ウェブスクレイピング** | Readability + linkedom | ウェブページの主要コンテンツ抽出（Firefox Reader View技術） |
| **Headless browser** | Lightpanda | JS/SPAページ向けの超軽量ヘッドレスブラウザ（Zig + V8）— スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内のmarkdownレンダリング |
| **ファイルアップロード** | Multer 2.x | multipartフォームの管理 |
| **Audio** | ffmpeg-static | オーディオセグメントの連結 |
| **テスト** | Vitest | 単体テスト — カバレッジはSonarCloudで計測 |
| **永続化** | JSONファイル | 依存なしのストレージ |

---

## モデルリファレンス

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | まとめシート、Flashcards、Podcast、Quiz、穴埋め、Chat、音声クイズ検証、Agent Image、Agent Web Search、指示検出 | 最高の多言語対応 + 指示追従 |
| `mistral-ocr-4-0` (OCR 4、デフォルト) | ドキュメントOCR — 高品質 | 印刷テキスト、表、手書き文字（$4 / 1000ページ） |
| `mistral-ocr-2512` (OCR 3、オプション) | ドキュメントOCR | 設定で選択可能、より安価（$2 / 1000ページ） |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語STT、`language="fr"`で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音読 |
| `mistral-moderation-2603` | コンテンツモデレーション | 子ども/青少年向けにブロックされる5カテゴリ（うち`jailbreaking`を含む） |
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

> **注記**：Mistral Voxtral TTSは唯一のTTSプロバイダーです — `MISTRAL_API_KEY`以外に追加のキーは不要です。

> **ユーザーが入力するAPIキー**：`MISTRAL_API_KEY`は現在**オプション**です。未設定でもアプリは起動し、各ユーザーにインターフェース上で**自身のMistralキー**の入力を促します。キーは**ブラウザに保存**され（セキュアコンテキストでWeb Crypto + IndexedDBにより暗号化）、リクエストごとに送信されます — **サーバーには永続化されません**。優先順位：プロフィールのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（env）。`EUREKAI_REQUIRE_USER_KEY=true`を設定すると、各ユーザーにキーの提供を強制します（envキーはプリロード専用になります）。

> **ローカルHTTPS（タブレット/LAN）**：`localhost`はすでにセキュアコンテキストです。LANアクセス（タブレット）では、ローカル証明書を生成してHTTPSを有効にし、ブラウザ暗号化の解除と転送中キーの暗号化を行います：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | オプション | — | Mistral APIキー（chat、OCR、STT、TTS Voxtral、agents、モデレーション）。未設定の場合、ユーザーがアプリ内でキーを入力（ブラウザ保存、サーバーには保存されない） |
| `EUREKAI_REQUIRE_USER_KEY` | オプション | `false` | `true` → IAリクエストの`MISTRAL_API_KEY`フォールバックを無効化（各ユーザーがキーを**必ず**提供する必要がある）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | オプション | — | TLSキー/証明書のパス（`scripts/gen-cert.sh`参照）→ ExpressとViteがHTTPSで配信（LAN/タブレットのセキュアコンテキスト） |
| `PORT` | オプション | `3000` | ExpressバックエンドのHTTPポート |
| `NODE_ENV` | オプション | `development` | `production`の場合 → Expressが`dist/`からフロントエンドを配信（それ以外は`public/`） |
| `SONAR_TOKEN` | オプション CI | — | GitHub Actions SonarCloudワークフローでのみ使用 |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Gitフック（Husky）**：`pre-commit`は`scripts/pre-commit-fast.sh`（競合、大きなファイル、shellcheck）、`lint-staged`、続いて`npm test`を実行します；`pre-push`はまず`npm audit`ゲートを実行し（推移的な重大脆弱性でブロック、`scripts/audit-verdict.mjs`参照）、その後`npm run security`を実行します。失敗時はすべてcommit/pushをブロックします。

**必要な外部ツール（オプションだが`pretest` / `npm run security`で使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test`は`pretest`で失敗し（lizard不在）、`npm run security`も失敗します（opengrep不在）。その場合huskyフックがcommit/pushをブロックします。

---

## コンテナでのデプロイ

イメージは**GitHub Container Registry**に公開されています：

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

> **`:U`**はボリュームの権限を自動調整するPodman rootlessフラグです。

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

> **IAコントリビューター向け**：詳細なアーキテクチャの文脈、必須ルール（プロンプトのanti-leak、エラーコード、cost tracking）、既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep移行）については[`CLAUDE.md`](CLAUDE.md)を参照してください。

---

## APIリファレンス

### Config
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定の変更（モデル、音声、TTSモデル） |
| `GET` | `/api/config/status` | APIのステータス：`mistral`（Mistralキーが定義済み）、`ttsAvailable`（`mistral`のエイリアス、Mistral Voxtralが唯一のTTSプロバイダー） |
| `POST` | `/api/config/reset` | 設定をデフォルトにリセット |
| `GET` | `/api/config/voices` | Mistral TTSの音声一覧（オプション`?lang=fr`） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢別デフォルト |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力したMistralキーの検証 — 常に200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`）、envフォールバックなし |

### プロフィール
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロフィールを一覧表示 |
| `POST` | `/api/profiles` | プロフィールを作成 |
| `PUT` | `/api/profiles/:id` | プロフィールを変更（15歳未満はPIN必須） |
| `DELETE` | `/api/profiles/:id` | プロフィールを削除 + プロジェクトをカスケード `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=`はオプション） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細 |
| `PUT` | `/api/projects/:pid` | 名前変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成遷移のリアルタイムSSEストリーム（`event: generation`）（`completed`/`failed`/`cancelled`）+ heartbeat keep-alive |

### ソース
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipartファイルのインポート（JPG/PNG/PDFはOCR、TXT/MDは直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声STT（audio multipart） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLスクレイピングまたはウェブ検索 `{query}` — ソースの配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | モデレート `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習の指示を検出 |

### 生成
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式Quiz |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め |
| `POST` | `/api/projects/:pid/generate/dictation` | ディクテ（単語 + 例文 + ルール、単語ごとに1つのTTS音声；auto-routerからも提案） |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズの間違えた問題に焦点を当てたリマインドシート `{generationId, weakQuestions}` — 「間違いを練習する」ボタンにより`quiz-review`と並列で呼び出される |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動するジェネレーターの計画） — `{plan, costDelta}`を返す（ルーティングのみのコスト） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 8種類：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。並列実行 — 同時リクエスト数 ≥ 8 のrate-limitを持つMistralティアを想定；そうでない場合、複数の429が`failedSteps`に上がることがある。 |

すべての生成ルートは`{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`を受け付けます。`quiz-review`と`remediation-summary`はさらに`{generationId, weakQuestions}`が必要です。

### CRUD 生成
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズ回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | ディクテ回答を送信 `{answers}`（サーバー側で厳密に採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答を検証（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS音読（シート/flashcards） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 進行中の生成をキャンセル（pendingをキャンセルする唯一の経路） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### Chat
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定

| 決定 | 根拠 |
|---|---|
| **React/VueではなくAlpine.js** | 最小フットプリント、ViteでコンパイルされたTypeScriptによる軽量なリアクティビティ。速度が重要なハッカソンに最適。 |
| **JSONファイルによる永続化** | 依存ゼロ、即時起動。設定すべきデータベースなし — 起動してすぐ使える。 |
| **Vite + Handlebars** | 両方の長所：開発用の高速HMR、コード整理のためのHTML partials、Tailwind JIT。 |
| **集中管理されたプロンプト** | すべてのIAプロンプトを`prompts.ts`に配置 — 言語/年齢グループごとの反復、テスト、適応が容易。 |
| **マルチ生成システム** | 各生成は独自IDを持つ独立オブジェクト — 1つのコースにつき複数のシート、クイズなどを可能に。 |
| **年齢に応じたプロンプト** | 語彙・複雑さ・トーンが異なる4つの年齢グループ — 同じ内容でも学習者に応じて教え方が変わる。 |
| **Agentsベースの機能** | 画像生成とウェブ検索は一時的なMistral Agentsを使用 — 自動クリーンアップ付きのきれいなライフサイクル。 |
| **インテリジェントなURLスクレイピング** | 1つのフィールドでURLとキーワードの混在を受付 — URLはReadability経由でスクレイプ（静的ページ）、Lightpandaフォールバック（JS/SPAページ）、キーワードはMistral web_search Agentを起動。各結果が独立したソースを作成。 |
| **TTS 100% Mistral** | Mistral Voxtral TTS（`MISTRAL_API_KEY`以外の追加キー不要） — コストチェーンと言語別音声解決に統合された音声合成。 |

---

## クレジット & 謝辞

- **[Mistral AI](https://mistral.ai)** — IAモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — ウェブコンテンツ抽出（Firefox Reader View技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング向け超軽量ヘッドレスブラウザ
- **[Luciole](https://luciole-vision.com)** — 視覚障害のある読者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロフィールの「読みやすさの快適さ」オプション）

Mistral AI Worldwide Hackathon（2026年3月）中に開始され、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/)を用いてすべてIAにより開発。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**grok-4.5でフランス語から日本語に翻訳された記事。**
