<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変換 — <a href="https://mistral.ai">Mistral AI</a> によって実現。</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="コード臭"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="コード行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy バッジ"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 物語 — なぜ EurekAI なのか？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）で生まれました（2026年3月）。テーマが必要だったのですが、きっかけはとても身近なものでした。私は娘と一緒に定期的にテスト勉強をしていて、それを AI でより楽しく、よりインタラクティブにできるはずだと思ったのです。

目的は、**あらゆる入力** — 授業の写真、コピペしたテキスト、音声録音、Web 検索 — を **復習シート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど** に変換することです。すべては Mistral AI のフランス製モデルで駆動しており、フランス語話者の学習者に自然に適したソリューションになっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai) は、ハッカソン中の 48 時間で Mistral の各サービスを使った概念実証として構築され、すでに動作していましたが、制限もありました。そこから EurekAI は本格的なプロジェクトへと成長しました。穴埋め問題、演習ナビゲーション、Web スクレイピング、設定可能な保護者向けモデレーション、詳細なコードレビューなど、さらに多くの機能が追加されています。コード全体は AI によって生成されており、主に [Claude Code](https://code.claude.com/) を使用し、[Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) からもいくつかの寄与があります。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルインポート** | 授業内容をインポート — 写真、PDF（Mistral OCR と平均信頼度スコアによる処理、`high`/`medium`/`low` のティア）またはテキストファイル（TXT、MD）。ファイルごとの再試行と個別進捗を備えたアップロードセッション |
| 📝 | **テキスト入力** | どんなテキストでも直接入力または貼り付け |
| 🎤 | **音声入力** | 自分の声を録音 — Voxtral STT が音声を文字起こし |
| 🌐 | **Web / URL** | URL を貼り付ける（Readability + Lightpanda による直接スクレイピング）か、検索語を入力（Agent Mistral web_search） |
| 📄 | **復習シート** | 要点、キーワード、引用、エピソードを含む構造化ノート |
| 🃏 | **フラッシュカード** | 対話式の Q/A カード、音声読み上げ付き |
| ❓ | **選択式クイズ** | 間違いの適応復習付き多肢選択問題（数は設定可能） |
| ✏️ | **穴埋め問題** | ヒント付きで解く練習問題、寛容な判定付き |
| 🔤 | **書き取り** | インポートした単語リストから音声で出題される単語（Voxtral TTS）、キーボード入力、ルールを説明するスペリング規則付きの厳密な文字単位採点 |
| 🎙️ | **ポッドキャスト** | 2人の音声によるミニポッドキャスト — デフォルトは Mistral 音声、またはカスタム音声（保護者！） |
| 🖼️ | **イラスト** | Mistral Agent によって生成される教育用画像 |
| 🗣️ | **音声クイズ** | 音声で読み上げられる問題（カスタム音声も可）、口頭回答、AI による確認 |
| 💬 | **AI チューター** | 受講資料と連携する文脈対応チャット、ツール呼び出し付き |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターがコンテンツを解析し、利用可能な 8 種類の生成器から組み合わせを提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイル別に設定可能なモデレーション（カテゴリのカスタマイズ可）、保護者 PIN、チャット制限 |
| 🌍 | **多言語対応** | UI は 9 言語で利用可能。AI 生成はプロンプト経由で 15 言語を制御可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS でシートやフラッシュカード（Q/A 対話）を聴取可能 |
| 💶 | **API コスト追跡** | 各生成とソースの € コストを透明に見積もり（トークン / 文字 / ページ / 音声秒）。カードごとのバッジ + プロジェクトごとの合計をダッシュボードで表示 |
| 🎨 | **プロフィール別テーマ** | 各プロフィールが `dark` または `light` のテーマを選択 — プロフィール切り替え時も保持 |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャの概要" width="800" />
</p>

---

## モデル使用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI モデルとタスクの対応" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者の学習ジャーニー" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAI は、プロフィールに応じて 4 種類のソースを受け付けます（子どもとティーンではデフォルトで有効）：

- **ファイルインポート** — JPG、PNG、PDF ファイルは Mistral OCR で処理されます — **OCR 3 (`mistral-ocr-2512`) がデフォルト**、**OCR 4 (`mistral-ocr-4-0`) は設定で選択可能**（より高品質だがコストは 2×） — 印刷テキスト、表、手書き文字向け。テキストファイル（TXT、MD）は直接インポートできます。複数ファイルのアップロードは **アップロードセッション** を使用します。ファイルごとの進捗表示、失敗したファイルのみの再試行、完了後のセッション解除が可能です。OCR は平均化された **信頼度スコア** (`average`、`[0,1]` にクランプ、Mistral が返す `averagePageConfidenceScore` から計算) を公開し、UI ではティア `high` / `medium` / `low` のバッジとして表示されます（閾値はおおむね 0.9 / 0.7）— スキャン品質が悪い場合でもブロックせず警告します。
- **自由入力テキスト** — どんな内容でも入力または貼り付けできます。モデレーションが有効なら保存前に審査されます。
- **音声入力** — ブラウザ内で音声を録音します。`voxtral-mini-latest` によって文字起こしされます。`language="fr"` パラメータが認識精度を最適化します。
- **Web / URL** — 複数の URL を貼り付けて内容を直接スクレイピングするか（JS ページ向けに Readability + Lightpanda）、Web 検索用のキーワードを入力して Mistral Agent 経由で検索します。単一の入力欄で両方に対応し、URL とキーワードは自動的に分離され、それぞれの結果が独立したソースとして作成されます。

### AI コンテンツ生成

生成される学習素材は 8 種類あります：

| 生成器 | モデル | 出力 |
|---|---|---|
| **復習シート** | `mistral-large-latest` | タイトル、要約、重要ポイント、キーワード、引用、エピソード |
| **フラッシュカード** | `mistral-large-latest` | ソース参照付きの Q/A カード（数は設定可能） |
| **選択式クイズ** | `mistral-large-latest` | 多肢選択問題、解説、適応復習（数は設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、寛容な判定（Levenshtein） |
| **書き取り** | `mistral-large-latest` + Voxtral TTS | 音声で出題されるキーワード（1 MP3/単語） → キーボード入力 → 解説付きの厳密な採点（アクセント） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2人の音声のスクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツールによる教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS で問題表示 → STT で回答 → AI による確認 |

### チャット型 AI チューター

受講資料に完全アクセスできる会話型チューターです：

- `mistral-large-latest` を使用
- **ツール呼び出し**: 会話中にシート、フラッシュカード、クイズ、穴埋め問題を生成可能
- 1 コースあたり 50 メッセージの履歴
- プロフィールで有効化されている場合はコンテンツをモデレーション

### 自動ルーター

ルーターは `mistral-small-latest` を使ってソースの内容を解析し、利用可能な 8 種類の中から最適な生成器を提案します。UI では進行状況がリアルタイムで表示され、まず解析フェーズがあり、その後に個別の生成が行われ、必要ならキャンセルできます。

### 適応学習

- **クイズ統計**: 問題ごとの試行回数と正答率を追跡
- **クイズ復習**: 弱い概念を狙った新しい問題を 5〜10 問生成
- **指示検出**: 復習指示（「私は〜を知っていれば、レッスンを理解している」など）を検出し、対応するテキスト生成器（シート、フラッシュカード、クイズ、穴埋め問題）で優先的に扱います

### セキュリティ & ペアレンタルコントロール

- **4 つの年齢グループ**: 子ども（≤10 歳）、ティーン（11–15 歳）、学生（16–25 歳）、大人（26+）
- **コンテンツモデレーション**: `mistral-moderation-latest` に 10 のカテゴリがあり、子ども/ティーン向けには 5 カテゴリがデフォルトでブロックされています（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。カテゴリは設定でプロフィールごとにカスタマイズ可能です。
- **保護者 PIN**: SHA-256 ハッシュ、15 歳未満のプロフィールでは必須です。本番導入では、ソルト付きの遅いハッシュ（Argon2id、bcrypt）を使うことを想定してください。
- **チャット制限**: 16 歳未満では AI チャットはデフォルト無効、保護者が有効化可能

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数プロフィール
- **プロフィール別音声** (`Profile.mistralVoices?: { host, guest }`) — 各子どもにポッドキャスト/音声クイズ用の音声ペアを割り当て可能
- **プロフィール別テーマ** (`Profile.theme: 'dark' | 'light'`) — プロフィール切り替え時に自動で切り替わり、バックエンド側で永続化
- プロジェクトは `profileId` を通じてプロフィールに紐付け
- カスケード削除: プロフィールを削除すると、そのプロフィールの全プロジェクトも削除される

### API コスト追跡

Mistral への各呼び出し（チャット、OCR、STT、TTS、モデレーション、エージェント）は、ユーザーに対して **透明な** € 見積もりを提供するよう計測されています — 課金で驚くことはありません。

- **正本**: `helpers/pricing.ts` — モデルプレフィックスごとの `MODEL_PRICING`（例: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens）、定期的な再スクレイピングのための Mistral ドキュメント URL を持つ `PRICING_SOURCES`
- **対応単位**: `tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT） — `helpers/cost-calc.ts` によって変換を制御
- **計測チェーン**: `helpers/tracked-client.ts`（Mistral クライアントのラッパー）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP レスポンスへの注入）
- **UI**: 生成ごとのコストバッジ (`src/partials/cost-badge-gen.html`)、ソースごとのバッジ (`cost-badge-src.html`)、ダッシュボードでの累計合計 (`Project.totalCost`)
- **エンドポイント**: `/generate/*` と `/sources/*` のレスポンスは、返却オブジェクト（Generation / Source）に `estimatedCost`、`usage`、`costBreakdown` を付与します。`POST /generate/auto/route` はルーティング単体のコスト用に `costDelta: number` フィールドを追加します。`GET /projects/:pid` は `totalCost`（`costLog[]` から計算された合計）+ 完全な履歴を含む拡張済みプロジェクトを返します

### マルチプロバイダー TTS とカスタム音声

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`、100% Mistral の音声合成で、追加のキーは不要
- **カスタム音声**: 保護者は Mistral Voices API（音声サンプルから）で自分自身の音声を作成し、ホスト/ゲストの役割に割り当てることができます。するとポッドキャストや音声クイズは保護者の声で再生され、子どもにとってより没入感のある体験になります
- 設定可能な 2 つの音声ロール: **ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの第 2 音声）
- Mistral 音声の完全なカタログは設定画面で利用可能、言語で絞り込み可能

### 国際化

- UI は 9 言語で利用可能: fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは 15 言語をサポート (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- プロフィールごとに言語設定が可能

---

## 技術スタック

| 層 | 技術 | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | レスポンシブ UI、Vite でコンパイルされる TypeScript |
| **テンプレート処理** | vite-plugin-handlebars | partials による HTML 構成 |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Web スクレイピング** | Readability + linkedom | Web ページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPA ページ向けの超軽量ヘッドレスブラウザ（Zig + V8） — スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内の markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | multipart フォーム処理 |
| **音声** | ffmpeg-static | 音声セグメントの連結 |
| **テスト** | Vitest | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 依存なしのストレージ |

---

## モデルリファレンス

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | シート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズの確認、画像エージェント、Web 検索エージェント、指示検出 | 最高の多言語性能 + 指示追従 |
| `mistral-ocr-2512`（OCR 3、デフォルト） | 文書 OCR | 印刷テキスト、表、手書き文字 ($2 / 1000 pages) |
| `mistral-ocr-4-0`（OCR 4、オプション） | 文書 OCR — 上位品質 | 設定で選択可能、コストは 2× ($4 / 1000 pages) |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語 STT、`language="fr"` で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音声読み上げ |
| `mistral-moderation-latest` | コンテンツモデレーション | 子ども/ティーン向けに 5 カテゴリをブロック（+ ジェイルブレイク対策） |
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

> **注**: Mistral Voxtral TTS は唯一の TTS プロバイダです。`MISTRAL_API_KEY` 以外に追加のキーは必要ありません。

> **ユーザー入力の API キー**: `MISTRAL_API_KEY` は現在 **任意** です。未設定でもアプリは起動し、各ユーザーにインターフェース上で **自分の Mistral キー** を入力するよう促します。キーは **ブラウザ内に保存** されます（セキュアコンテキストで Web Crypto + IndexedDB により暗号化）し、リクエストで送信されます — **サーバーに永続化されることはありません**。優先順位: プロファイルのキー > グローバルなブラウザキー > `MISTRAL_API_KEY`（env）。`EUREKAI_REQUIRE_USER_KEY=true` を設定すると、各ユーザーに必ず自分のキーを入力させます（env のキーはプリロードにのみ使用されます）。

> **ローカル HTTPS（タブレット/LAN）**: `localhost` はすでにセキュアコンテキストです。LAN アクセス（タブレット）の場合は、ローカル証明書を生成して HTTPS を有効化し、ブラウザ側の暗号化を有効にしつつ、転送中のキーを暗号化してください:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert があればそれを使用、なければ openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite を HTTPS で起動
> ```

### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral API キー（chat、OCR、STT、Voxtral TTS、agents、moderation）。未設定の場合、ユーザーがアプリ内で自分のキーを入力します（ブラウザに保存、サーバーには保存しません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AI リクエストでの `MISTRAL_API_KEY` へのフォールバックを無効化します（各ユーザーが必ず自分のキーを提供する必要があります）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLS の鍵/証明書のパス（`scripts/gen-cert.sh` を参照） → Express と Vite を HTTPS で提供します（secure context の LAN/タブレット） |
| `PORT` | 任意 | `3000` | Express バックエンドの HTTP ポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合、Express が `dist/` からフロントエンドを提供します（それ以外は `public/`） |
| `SONAR_TOKEN` | 任意 CI | — | GitHub Actions の SonarCloud ワークフローでのみ使用 |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git フック（Husky）**: `pre-commit` は `npm test` を起動し、`pre-push` は `npm run security` を起動します。どちらも失敗すると commit/push をブロックします。

**必要な外部ツール（任意ですが `pretest` / `npm run security` で使用）**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test` は `pretest` で失敗し（lizard がない）、`npm run security` は失敗します（opengrep がない）。その場合 husky フックが commit/push をブロックします。

---

## コンテナでのデプロイ

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
config.ts                 — Config runtime (modèles, voix, TTS provider), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (8 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, 15 langues)

generators/
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (8 agents) + MAX_AUTO_PLAN_LENGTH
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

> **AI コントリビューター向け**: 詳細なアーキテクチャ背景、必須ルール（anti-leak prompts、エラーコード、cost tracking）、および既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep migration）については [`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## API リファレンス

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定を変更（モデル、音声、TTS モデル） |
| `GET` | `/api/config/status` | API の状態: `mistral`（Mistral キーが設定済み）、`ttsAvailable`（`mistral` の別名、Mistral Voxtral は唯一の TTS プロバイダ） |
| `POST` | `/api/config/reset` | デフォルト設定にリセット |
| `GET` | `/api/config/voices` | Mistral TTS の音声を一覧表示（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢別デフォルト |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを変更（15歳未満は PIN 必須） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除 + プロジェクトのカスケード `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=` は任意） |
| `POST` | `/api/projects` | `{name, profileId}` プロジェクトを作成 |
| `GET` | `/api/projects/:pid` | プロジェクト詳細 |
| `PUT` | `/api/projects/:pid` | `{name}` の名前を変更 |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart ファイルをインポート（JPG/PNG/PDF は OCR、TXT/MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由入力テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 音声（multipart audio） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL スクレイピングまたは web_search `{query}` — ソースの配列を返します |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | `{text}` をモデレート |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出 |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | MCQ クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | ディクテーション（単語 + 例文 + ルール、単語ごとに TTS 音声 1 件；auto-router でも提案されます） |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズで間違えた問題に特化したリマインダーシート `{generationId, weakQuestions}` — 「間違いを練習する」ボタンで `quiz-review` と並列に呼び出されます |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング解析（起動するジェネレーターの計画） — `{plan, costDelta}` を返します（ルーティング単体のコスト） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンドの自動生成（ルーティング + 8 種類: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation）。並列実行 — 同時 8 リクエスト以上の rate-limit を持つ Mistral ティアが前提です。そうでない場合、複数の 429 が `failedSteps` に返ることがあります。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。`quiz-review` と `remediation-summary` では追加で `{generationId, weakQuestions}` が必要です。

### 生成 CRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | ディクテーションの回答を送信 `{answers}`（厳密なサーバースコア） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を確認（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS の音声読み上げ（シート/フラッシュカード） |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` の名前を変更 |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の判断

| 判断 | 理由 |
|---|---|
| **React/Vue ではなく Alpine.js** | 最小限のフットプリント、Vite でコンパイルされた TypeScript による軽量なリアクティブ性。速度が重要なハッカソンに最適。 |
| **JSON ファイルによる永続化** | 依存関係ゼロ、即時起動。設定すべきデータベースがないので、起動してすぐ使えます。 |
| **Vite + Handlebars** | いいとこ取り: 開発用の高速 HMR、コード整理のための HTML partials、Tailwind JIT。 |
| **集中管理されたプロンプト** | すべての AI プロンプトを `prompts.ts` に集約 — 言語/年齢グループごとに反復、テスト、調整が容易。 |
| **マルチ生成システム** | 各生成は独立したオブジェクトで、それぞれ独自の ID を持ちます — 1 つの講義に対して複数のシート、クイズなどを可能にします。 |
| **年齢別に最適化されたプロンプト** | 語彙、複雑さ、トーンが異なる 4 つの年齢グループ — 同じ内容でも学習者に応じて教え方を変えます。 |
| **Agents ベースの機能** | 画像生成と web 検索では一時的な Mistral Agents を使用します — 自動クリーンアップ付きの明確なライフサイクル。 |
| **インテリジェントな URL スクレイピング** | 1 つのフィールドで URL とキーワードの混在を受け付けます — URL は Readability（静的ページ）でスクレイピングされ、JS/SPA ページは Lightpanda にフォールバック、キーワードは Mistral web_search Agent を起動します。各結果は独立したソースを作成します。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外に追加キー不要） — コストチェーンと言語別の音声解決に組み込まれた音声合成。 |

---

## クレジットと謝辞

- **[ミストラル AI](https://mistral.ai)** — AI モデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量なリアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティ CSS フレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdown パーサー
- **[Readability](https://github.com/mozilla/readability)** — Web コンテンツ抽出（Firefox Reader View の技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPA ページのスクレイピング向け超軽量ヘッドレスブラウザ
- **[Luciole](https://luciole-vision.com)** — 視覚障害のある読者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロファイルの「読書快適」オプション）

2026 年 3 月の Mistral AI Worldwide Hackathon 中に始動し、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) を使って AI によって完全に開発されました。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**fr から ja に翻訳された記事、gpt-5.4-mini にて。**
