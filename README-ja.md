<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変換 — <a href="https://mistral.ai">Mistral AI</a> で駆動。</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="コードスメル"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="コード行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy バッジ"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## ストーリー — なぜ EurekAI なのか？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）で生まれました。題材が必要だったのですが、そのアイデアはとても身近なところから生まれました。私は娘と定期的にテスト勉強をしていて、AI を使えば、もっと楽しく、インタラクティブにできるはずだと思ったのです。

目的は、**あらゆる入力** — レッスンの写真、コピペしたテキスト、音声録音、Web 検索 — を **復習シート、Flashcards、クイズ、ポッドキャスト、穴埋めテキスト、イラスト、その他** に変換することです。すべて Mistral AI のフランスのモデルで駆動されており、フランス語圏の学習者に自然に適したソリューションになっています。

[最初のプロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai) は、ハッカソン中の48時間で Mistral のサービスを使った概念実証として作られました。すでに動作していましたが、機能は限定的でした。それ以来、EurekAI は本格的なプロジェクトへと成長しています。穴埋めテキスト、問題間ナビゲーション、Web スクレイピング、設定可能なペアレンタルモデレーション、徹底したコードレビュー、そしてさらに多くの機能が加わりました。コード全体は AI によって生成されており、主に [Claude Code](https://code.claude.com/)、一部 [Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) の貢献によるものです。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | レッスンをインポート — 写真、PDF（Mistral OCR による平均化済み信頼度スコア付き、`high`/`medium`/`low` のティア）またはテキストファイル（TXT, MD）。ファイルごとの再試行と個別進捗を備えたアップロードセッション |
| 📝 | **テキスト入力** | どんなテキストでも直接入力または貼り付けできます |
| 🎤 | **音声入力** | ブラウザで録音できます — Voxtral STT が音声を文字起こしします |
| 🌐 | **Web / URL** | URL を貼り付ける（Readability + Lightpanda による直接スクレイピング）か、検索語を入力して Mistral web_search エージェントで検索します |
| 📄 | **復習シート** | 重要ポイント、語彙、引用、エピソードを含む構造化ノート |
| 🃏 | **Flashcards** | インタラクティブな Q/A カード、対話型音声読み上げ |
| ❓ | **選択式クイズ** | 誤答を適応的に復習する多肢選択問題（数は設定可能） |
| ✏️ | **穴埋めテキスト** | ヒント付きの完成問題、寛容な検証付き |
| 🎙️ | **ポッドキャスト** | 2声のミニポッドキャスト音声 — デフォルトの Mistral 音声、またはカスタム音声（保護者向け！） |
| 🖼️ | **イラスト** | Mistral Agent が生成する教育用画像 |
| 🗣️ | **音声クイズ** | 音声で読み上げられる質問（カスタム音声も可）、音声回答、AI 検証 |
| 💬 | **AI チューター** | ツール呼び出し付きで、授業資料と文脈連動チャット |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターがコンテンツを解析し、利用可能な7種類のうち最適な生成器の組み合わせを提案します |
| 🔒 | **ペアレンタルコントロール** | プロフィールごとに設定可能なモデレーション（カテゴリのカスタマイズ可）、保護者 PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは9言語で利用可能。AI 生成はプロンプト経由で15言語を操作可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS で復習シートと Flashcards（Q/A 対話）を聞くことができます |
| 💶 | **API コストの追跡** | 各生成とソースの推定 € コストを透明に表示（トークン / 文字 / ページ / 音声秒）。カードごとのバッジ + プロジェクト合計がダッシュボードで確認可能 |
| 🎨 | **プロフィールごとのテーマ** | 各プロフィールが `dark` または `light` のテーマを選択 — プロフィール切り替え時も保持 |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャの概要" width="800" />
</p>

---

## モデル利用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI モデルとタスクの対応表" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者の学習ジャーニー" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAI は、プロフィールに応じて管理された4種類のソースを受け付けます（子どもとティーンではデフォルトで有効）：

- **ファイルのインポート** — JPG、PNG、PDF ファイルを Mistral OCR で処理します — **OCR 3 (`mistral-ocr-2512`) がデフォルト**、**OCR 4 (`mistral-ocr-4-0`) は設定で選択可**（より高品質ですがコストは2倍） — 印刷テキスト、表、手書き文字向け。あるいはテキストファイル（TXT, MD）を直接インポートできます。複数ファイルのアップロードは **アップロードセッション** を使います：ファイルごとの個別進捗、失敗したファイルだけの再試行、完了時のセッション破棄。OCR は平均化された **信頼度スコア**（`average`、`[0,1]` にクランプ、Mistral が返す `averagePageConfidenceScore` から計算）を公開し、UI ではティア `high` / `medium` / `low` のバッジとして表示されます（閾値は約 0.9 / 約 0.7）— スキャン品質が悪い場合はブロックせずに警告します。
- **自由入力テキスト** — どんな内容でも入力または貼り付けできます。モデレーションが有効な場合は保存前に検査されます。
- **音声入力** — ブラウザで音声を録音します。`voxtral-mini-latest` によって文字起こしされます。`language="fr"` パラメータが認識精度を最適化します。
- **Web / URL** — 1つ以上の URL を貼り付けてコンテンツを直接スクレイピングできます（JS ページ向けには Readability + Lightpanda を使用）、またはキーワードを入力して Mistral Agent による Web 検索を行えます。単一フィールドで両方に対応しており、URL とキーワードは自動で分離され、各結果が独立したソースとして作成されます。

### AI コンテンツ生成

生成される学習素材は7種類です：

| 生成器 | モデル | 出力 |
|---|---|---|
| **復習シート** | `mistral-large-latest` | タイトル、要約、重要ポイント、語彙、引用、エピソード |
| **Flashcards** | `mistral-large-latest` | ソース参照付きの Q/A カード（数は設定可能） |
| **選択式クイズ** | `mistral-large-latest` | 多肢選択問題、解説、適応的復習（数は設定可能） |
| **穴埋めテキスト** | `mistral-large-latest` | ヒント付きの穴埋め文、寛容な検証（Levenshtein） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2声のスクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツール経由の教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS の質問 → STT の回答 → AI 検証 |

### チャットベースの AI チューター

授業資料に完全アクセスできる会話型チューターです：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中に復習シート、Flashcards、クイズ、穴埋めテキストを生成可能
- 授業ごとに50メッセージの履歴
- プロフィールで有効な場合、コンテンツモデレーションあり

### 自動ルーター

ルーターは `mistral-small-latest` を使ってソース内容を解析し、7種類の中から最も適切な生成器を提案します。UI はリアルタイムの進行状況を表示し、まず解析フェーズ、その後に個別生成が行われ、必要に応じてキャンセルできます。

### 適応学習

- **クイズ統計**：各問題の試行回数と正答率を追跡
- **クイズ復習**：弱点の概念に焦点を当てた新しい問題を5〜10問生成
- **指示検出**：復習の指示（「私はこの単元をこう覚えた」など）を検出し、対応するテキスト系ジェネレーター（復習シート、Flashcards、クイズ、穴埋めテキスト）で優先的に扱います

### セキュリティ & ペアレンタルコントロール

- **4つの年齢グループ**：子ども（≤10歳）、ティーン（11–15）、学生（16–25）、大人（26+）
- **コンテンツモデレーション**：`mistral-moderation-latest`、利用可能な10カテゴリのうち5カテゴリを子ども/ティーン向けにデフォルトでブロック（`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`）。カテゴリは設定でプロフィールごとにカスタマイズ可能です。
- **保護者 PIN**：SHA-256 ハッシュ、15歳未満のプロフィールでは必須です。本番展開では、ソルト付きの遅いハッシュ（Argon2id, bcrypt）を使うべきです。
- **チャット制限**：16歳未満では AI チャットはデフォルトで無効、保護者によって有効化可能

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数プロフィール
- **プロフィールごとの音声** (`Profile.mistralVoices?: { host, guest }`) — 各子どもにポッドキャスト/音声クイズ用の音声ペアを割り当て可能
- **プロフィールごとのテーマ** (`Profile.theme: 'dark' | 'light'`) — プロフィール切り替え時に自動で変更され、バックエンド側で永続化
- `profileId` を介してプロフィールに紐づくプロジェクト
- カスケード削除：プロフィールを削除すると、そのプロフィールのすべてのプロジェクトも削除されます

### API コストの追跡

Mistral の各呼び出し（チャット、OCR、STT、TTS、モデレーション、エージェント）は、ユーザーに **透明な** € 見積もりを提供するよう計測されています。請求で驚かされることはありません。

- **信頼できる情報源**：`helpers/pricing.ts` — モデル接頭辞ごとの `MODEL_PRICING`（例：`mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens）、定期的な再スクレイピングのための Mistral ドキュメント URL を持つ `PRICING_SOURCES`
- **対応単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— 変換は `helpers/cost-calc.ts` によって制御
- **計測チェーン**：`helpers/tracked-client.ts`（Mistral クライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP レスポンスへの注入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごとのコストバッジ（`cost-badge-src.html`）、ダッシュボード内の累計合計（`Project.totalCost`）
- **エンドポイント**：`/generate/*` と `/sources/*` のレスポンスは、返却されるオブジェクト（Generation / Source）に `estimatedCost`、`usage`、`costBreakdown` を付与します。`POST /generate/auto/route` はルーティング単体のコスト用に `costDelta: number` フィールドを追加します。`GET /projects/:pid` は `totalCost`（`costLog[]` から計算された合計）と完全な履歴を含む拡張済みプロジェクトを返します

### マルチプロバイダー TTS & カスタム音声

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`、100% Mistral の音声合成、追加キーは不要
- **カスタム音声**：保護者は Mistral Voices API（音声サンプルから）を使って自分の声を作成し、ホスト/ゲストの役割に割り当てられます。すると、ポッドキャストと音声クイズは保護者の声で再生され、子どもにとってさらに没入感のある体験になります
- 設定可能な2つの音声役割：**ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの第2音声）
- 設定から利用できる Mistral 音声の完全カタログ。言語でフィルタリング可能

### 国際化

- インターフェースは9言語で利用可能：fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは15言語に対応（fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv）
- 言語はプロフィールごとに設定可能

---

## 技術スタック

| レイヤー | 技術 | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、プロキシ |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、Vite による TypeScript コンパイル |
| **Templating** | vite-plugin-handlebars | partials による HTML 構成 |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Web スクレイピング** | Readability + linkedom | Web ページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPA ページ向けの超軽量ヘッドレスブラウザ（Zig + V8）— フォールバック用スクレイピング |
| **Markdown** | Marked | チャット内の markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | multipart フォームの処理 |
| **Audio** | ffmpeg-static | 音声セグメントの連結 |
| **テスト** | Vitest | ユニットテスト — カバレッジは SonarCloud で計測 |
| **永続化** | JSON ファイル | 依存なしの保存 |

---

## モデルリファレンス

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | 復習シート、Flashcards、ポッドキャスト、クイズ、穴埋めテキスト、チャット、音声クイズ検証、画像エージェント、Web Search エージェント、指示検出 | 最高の多言語対応 + 指示追従 |
| `mistral-ocr-2512`（OCR 3、デフォルト） | 文書 OCR | 印刷テキスト、表、手書き文字（$2 / 1000 pages） |
| `mistral-ocr-4-0`（OCR 4、オプション） | 文書 OCR — 上位品質 | 設定で選択可能、コストは2倍（$4 / 1000 pages） |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語 STT、`language="fr"` で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音声読み上げ |
| `mistral-moderation-latest` | コンテンツモデレーション | 子ども/ティーン向けに5カテゴリをブロック（+ jailbreak 対策） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のための高速コンテンツ解析 |

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

> **注**：Mistral Voxtral TTS は唯一の TTS プロバイダーです — `MISTRAL_API_KEY` 以外に追加のキーは不要です。

> **ユーザー入力の API キー**：`MISTRAL_API_KEY` は現在 **任意** です。未設定でもアプリは起動し、各ユーザーに UI 上で **自分の Mistral キー** の入力を促します。キーは **ブラウザ内に保存** され（安全なコンテキストでは Web Crypto + IndexedDB で暗号化）、リクエストごとに送信されます — **サーバーには永続化されません**。優先順位：プロフィールのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（env）。`EUREKAI_REQUIRE_USER_KEY=true` を設定すると、各ユーザーは必ず自分のキーを提供する必要があります（env のキーは事前読み込みにのみ使われます）。

> **ローカル HTTPS（タブレット/LAN）**：`localhost` はすでに安全なコンテキストです。LAN アクセス（タブレット）では、ローカル証明書を生成して HTTPS を有効化し、ブラウザ側の暗号化を有効にしつつ、転送中のキーを暗号化してください：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert があればそれを使用、なければ openssl の self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite を HTTPS で起動
> ```
### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral API キー（chat、OCR、STT、TTS Voxtral、agents、moderation）。未設定の場合、ユーザーがアプリ内でキーを入力します（ブラウザに保存、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → IA リクエストに対する `MISTRAL_API_KEY` へのフォールバックを無効化します（各ユーザーが自分のキーを提供する必要があります）。公開インスタンスで有用です |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLS の鍵/証明書のパス（`scripts/gen-cert.sh` 参照）→ Express と Vite を HTTPS で提供します（LAN/タブレット向けの secure context） |
| `PORT` | 任意 | `3000` | Express バックエンドの HTTP ポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合、Express は `dist/` からフロントエンドを配信します（それ以外は `public/`） |
| `SONAR_TOKEN` | 任意 CI | — | GitHub Actions の SonarCloud ワークフローでのみ使用されます |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git フック (Husky)** : `pre-commit` は `npm test` を起動し、`pre-push` は `npm run security` を起動します。どちらも失敗時には commit/push をブロックします。

**必要な外部ツール（任意だが `pretest` / `npm run security` で使用）** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがないと、`npm test` は `pretest` で失敗し（lizard がないため）、`npm run security` も失敗します（opengrep がないため）。そのため husky フックが commit/push をブロックします。

---

## コンテナでのデプロイ

イメージは **GitHub Container Registry** に公開されています：

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

> **`:U`** は、ボリュームの権限を自動調整する Podman の rootless フラグです。

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

> **IA コントリビューター向け** : 詳細なアーキテクチャの背景、必須ルール（anti-leak prompts、エラーコード、cost tracking）、既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep migration）については [`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## API リファレンス

### Config
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定を変更する（モデル、音声、TTS モデル） |
| `GET` | `/api/config/status` | API の状態：`mistral`（Mistral キーが定義済み）、`ttsAvailable`（`mistral` の alias、Mistral Voxtral は唯一の TTS provider） |
| `POST` | `/api/config/reset` | デフォルト設定にリセットする |
| `GET` | `/api/config/voices` | Mistral TTS の音声一覧を取得する（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能な moderation カテゴリ + 年齢別デフォルト |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示する |
| `POST` | `/api/profiles` | プロファイルを作成する |
| `PUT` | `/api/profiles/:id` | プロファイルを変更する（15歳未満は PIN 必須） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除する + `{pin?}` → `{ok, deletedProjects}` のプロジェクトを連鎖削除する |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示する（`?profileId=` は任意） |
| `POST` | `/api/projects` | `{name, profileId}` のプロジェクトを作成する |
| `GET` | `/api/projects/:pid` | プロジェクト詳細 |
| `PUT` | `/api/projects/:pid` | `{name}` の名前を変更する |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除する |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart ファイルをインポートする（JPG/PNG/PDF は OCR、TXT/MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 音声（multipart audio） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL スクレイピングまたは web 検索 `{query}` — ソース配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除する |
| `POST` | `/api/projects/:pid/moderate` | `{text}` を moderation する |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出する |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | QCM クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋めテキスト |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | アダプティブ復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動する生成器の計画） — `{plan, costDelta}` を返す（ルーティング単体のコスト） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 7 種類: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image）。並列実行 — 同時 7 リクエスト以上の rate-limit を持つ Mistral tier を想定しています。そうでない場合、複数の 429 が `failedSteps` に返る可能性があります。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。`quiz-review` はさらに `{generationId, weakQuestions}` を必要とします。

### CRUD 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズ回答を送信する `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋めテキストの回答を送信する `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を確認する（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS を音読する（シート/フラッシュカード） |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` の名前を変更する |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除する |

### Chat
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | chat 履歴を取得する |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信する `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | chat 履歴を消去する |

---

## アーキテクチャ上の決定

| 決定 | 理由 |
|---|---|
| **React/Vue ではなく Alpine.js** | 最小限のフットプリント、Vite でコンパイルされた TypeScript による軽量なリアクティビティ。速度が重要なハッカソンに最適です。 |
| **JSON ファイルでの永続化** | 依存関係ゼロ、即時起動。設定するデータベースは不要で、起動してすぐ使えます。 |
| **Vite + Handlebars** | 両方の長所を活かします。開発時の高速 HMR、コード整理のための HTML partials、Tailwind JIT。 |
| **中央集約された prompts** | すべての IA prompts を `prompts.ts` に集約 — 言語/年齢グループごとに反復、テスト、調整しやすいです。 |
| **マルチ生成システム** | 各生成は独立したオブジェクトで、それぞれ独自の ID を持ちます — これにより、講座ごとに複数のシート、クイズなどを作成できます。 |
| **年齢に適応した prompts** | 4 つの年齢グループがあり、語彙、複雑さ、トーンが異なります — 同じ内容でも学習者に応じて教え方が変わります。 |
| **Agents ベースの機能** | 画像生成と web 検索は一時的な Mistral Agents を使用します — 自動クリーンアップ付きの明確なライフサイクル。 |
| **URL のインテリジェントなスクレイピング** | 1 つのフィールドで URL とキーワードの混在を受け付けます — URL は Readability（静的ページ）経由でスクレイピングされ、Lightpanda フォールバック（JS/SPA ページ）も使用されます。キーワードは Mistral の web_search Agent を起動します。各結果は独立したソースを作成します。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外に追加キー不要）— コストチェーンと、言語ごとの音声解決に統合された音声合成。 |

---

## クレジット & 謝辞

- **[Mistral AI](https://mistral.ai)** — IA モデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティ CSS フレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdown パーサー
- **[Readability](https://github.com/mozilla/readability)** — Web コンテンツ抽出（Firefox Reader View の技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPA ページのスクレイピング向け超軽量 headless ブラウザ

Mistral AI Worldwide Hackathon（2026年3月）中に開始され、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) を使って AI により完全に開発されました。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**fr から ja へ gpt-5.4-mini で翻訳された記事。**
