<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI のロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変換します — <a href="https://mistral.ai">Mistral AI</a> によって支えられています。</strong>
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

**EurekAI** は、2026 年 3 月の [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）中に生まれました。題材が必要だったのですが、そのアイデアはとても身近なところから来ました。私は娘と一緒に定期的にテスト勉強をしていて、それを AI でもっと楽しく、インタラクティブにできるはずだと思ったのです。

目的は、**どんな入力でも** — 授業の写真、コピペしたテキスト、音声録音、Web 検索 — を **復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど** に変換することです。すべて Mistral AI のフランス製モデルで動いており、フランス語話者の学習者に自然に適したソリューションになっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai) は、ハッカソン中の 48 時間で Mistral の各サービスを使った概念実証として作られました。すでに動作していましたが、機能は限定的でした。それから EurekAI は本格的なプロジェクトへと成長しました。穴埋め問題、演習ナビゲーション、Web スクレイピング、設定可能な保護者モデレーション、詳細なコードレビューなど、さらに多くの機能が追加されています。コード全体は AI によって生成されており、主に [Claude Code](https://code.claude.com/)、一部 [Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) からの貢献で構成されています。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | 授業内容をインポートします — 写真、PDF（Mistral OCR による平均信頼スコア付き、`high`/`medium`/`low` の 3 段階）またはテキストファイル（TXT、MD）。ファイルごとの再試行と個別進捗を備えたアップロードセッション |
| 📝 | **テキスト入力** | どんなテキストでも直接入力または貼り付け |
| 🎤 | **音声入力** | 録音します — Voxtral STT が音声を文字起こしします |
| 🌐 | **Web / URL** | URL を貼り付ける（Readability + Lightpanda による直接スクレイピング）か、検索語を入力する（Agent Mistral の web_search） |
| 📄 | **復習ノート** | 重要ポイント、語彙、引用、豆知識を含む構造化メモ |
| 🃏 | **フラッシュカード** | インタラクティブな Q&A カード、対話型音声読み上げ |
| ❓ | **MCQ クイズ** | 間違いを適応的に復習する多肢選択問題（件数を設定可能） |
| ✏️ | **穴埋め問題** | ヒント付きで解答する、寛容な検証付きの補完問題 |
| 🔤 | **ディクテーション** | インポートしたリスト、キーボード入力、厳密な一文字ずつの採点と説明付きの綴りルールに基づく、音声で диктされた単語（Voxtral TTS） |
| 🎙️ | **ポッドキャスト** | 2 役のミニポッドキャスト音声 — デフォルトの Mistral 音声またはカスタム音声（保護者向け！） |
| 🖼️ | **イラスト** | Agent Mistral によって生成される教育用画像 |
| 🗣️ | **音声クイズ** | 音声で読み上げられる質問（カスタム音声も可能）、音声回答、AI による検証 |
| 💬 | **AI チューター** | 連携ツール付きで、授業資料と文脈を共有するチャット |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターが内容を分析し、利用可能な 8 種類のジェネレーターから組み合わせを提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイルごとに設定可能なモデレーション（カスタムカテゴリ）、保護者用 PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは 9 言語で利用可能。AI 生成はプロンプト経由で 15 言語に対応 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS でノートとフラッシュカード（質問/回答の対話）を聴取可能 |
| 💶 | **API コスト追跡** | 各生成とソースのコストを € で透明に推定（トークン / 文字 / ページ / 音声秒）。カードごとのバッジ + プロジェクト合計をダッシュボードに表示 |
| 🎨 | **プロフィール別テーマ** | 各プロフィールが `dark` または `light` テーマを選択可能 — プロフィール切り替え時も維持 |

---

## アーキテクチャ概要

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

## 詳細 — 機能

### マルチモーダル入力

EurekAI は 4 種類のソース入力を受け付け、プロフィールに応じてモデレートされます（子どもとティーンではデフォルトで有効）：

- **ファイルのインポート** — JPG、PNG、PDF ファイルは Mistral OCR で処理されます — **OCR 4 (`mistral-ocr-4-0`) がデフォルト**（最高品質）、**OCR 3 (`mistral-ocr-2512`) は設定で選択可能**（より安価、コストは約半分）— 印刷テキスト、表、手書き文字に対応。テキストファイル（TXT、MD）は直接インポートされます。複数ファイルのアップロードでは **アップロードセッション** を使用します。ファイルごとの個別進捗、失敗したファイルのみの再試行、完了後のセッション解除に対応します。OCR は平均化された **信頼スコア**（`average`、`[0,1]` にクリップ、Mistral が返す `averagePageConfidenceScore` を基に計算）を公開し、UI では `high` / `medium` / `low` のバッジとして表示されます（しきい値は約 0.9 / 約 0.7）— スキャン品質が悪い場合でも、ブロックせずに警告します。
- **自由テキスト** — どんな内容でも入力または貼り付けできます。モデレーションが有効な場合、保存前に検査されます。
- **音声入力** — ブラウザで音声を録音します。`voxtral-mini-latest` により文字起こしされます。`language="fr"` の設定で認識精度を最適化します。
- **Web / URL** — 1 つ以上の URL を貼り付けて内容を直接スクレイピングするか（JavaScript ページには Readability + Lightpanda を使用）、またはキーワードを入力して Agent Mistral による Web 検索を行います。単一フィールドで両方に対応しており、URL とキーワードは自動的に分離され、各結果が独立したソースになります。

### AI コンテンツ生成

生成される学習素材は 8 種類あります：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、重要ポイント、語彙、引用、豆知識 |
| **フラッシュカード** | `mistral-large-latest` | ソース参照付きの Q&A カード（件数を設定可能） |
| **MCQ クイズ** | `mistral-large-latest` | 多肢選択問題、解説、適応的な復習（件数を設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの補完文、寛容な検証（Levenshtein） |
| **ディクテーション** | `mistral-large-latest` + Voxtral TTS | 音声で диктされたキーワード（1 MP3/語）→ キーボード入力 → 厳密な採点（アクセント含む）と説明付きルール |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2 役のスクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツールによる教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS の質問 → STT の回答 → AI による検証 |

### チャット型 AI チューター

授業資料へ完全にアクセスできる会話型チューターです：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中にノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- 1 授業あたり 50 メッセージの履歴
- プロフィールで有効な場合はコンテンツモデレーションを適用

### 自動ルーター

ルーターは `mistral-small-latest` を使ってソース内容を分析し、利用可能な 8 種類の中から最も適切なジェネレーターを提案します。インターフェースはリアルタイムで進捗を表示します。まず分析フェーズがあり、その後、個別の生成が行われ、必要に応じてキャンセルできます。

### 適応学習

- **クイズ統計**：問題ごとの試行回数と正答率を追跡
- **クイズ復習**：弱い概念を狙った新しい問題を 5〜10 問生成
- **指示検出**：「私は……を知っていれば、その単元を覚えたと言える」のような復習指示を検出し、対応するテキスト生成器（ノート、フラッシュカード、クイズ、穴埋め問題）で優先的に扱う

### セキュリティとペアレンタルコントロール

- **4 つの年齢グループ**：子ども（10 歳以下）、ティーン（11〜15 歳）、学生（16〜25 歳）、大人（26 歳以上）
- **コンテンツモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）を使用し、10 のカテゴリを提供。子ども/ティーン向けには 5 カテゴリがデフォルトでブロック（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`selfharm`、`jailbreaking`）。カテゴリは設定でプロフィールごとにカスタマイズ可能です。`-latest` という別名は意図的に避けています（まだ非推奨版を指しているため）。
- **保護者 PIN**：SHA-256 ハッシュを使用し、15 歳未満のプロフィールで必須です。本番環境では、ソルト付きの遅いハッシュ（Argon2id、bcrypt）を使用してください。
- **チャット制限**：16 歳未満では AI チャットをデフォルトで無効化。保護者が有効化可能

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数プロフィール
- **プロフィール別音声** (`Profile.mistralVoices?: { host, guest }`) — 各子どもにポッドキャスト/音声クイズ用の音声ペアを割り当て可能
- **プロフィール別テーマ** (`Profile.theme: 'dark' | 'light'`) — プロフィール切り替え時に自動で切り替わり、バックエンド側で永続化
- `profileId` を介してプロフィールに紐づくプロジェクト
- カスケード削除：プロフィールを削除すると、そのプロフィールのすべてのプロジェクトも削除

### API コスト追跡

すべての Mistral 呼び出し（チャット、OCR、STT、TTS、モデレーション、Agent）は、ユーザーに対して **透明な** € 見積もりを提供するよう計測されています。請求で驚かされることはありません。

- **信頼できる唯一のソース**：`helpers/pricing.ts` — モデルプレフィックスごとの `MODEL_PRICING`（例：`mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens）、定期的な再スクレイピングのための Mistral ドキュメント URL を持つ `PRICING_SOURCES`
- **対応単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT） — `helpers/cost-calc.ts` によって変換を制御
- **計測チェーン**：`helpers/tracked-client.ts`（Mistral クライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP レスポンスへの注入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごとのバッジ（`cost-badge-src.html`）、ダッシュボードの累計（`Project.totalCost`）
- **エンドポイント**：`/generate/*` と `/sources/*` の応答は、返却オブジェクト（Generation / Source）に `estimatedCost`、`usage`、`costBreakdown` を付加します。`POST /generate/route` はルーティング単独のコスト用に `costDelta: number` フィールドを追加します。`GET /projects/:pid` は `totalCost`（`costLog[]` から計算された合計）と完全な履歴を含む拡張済みプロジェクトを返します

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`、100% Mistral による音声合成で、追加キーは不要
- **カスタム音声**：保護者は Mistral Voices API（音声サンプルから）を使って独自の音声を作成し、ホスト/ゲスト役に割り当てられます。するとポッドキャストと音声クイズは保護者の声で読み上げられ、子どもにとってさらに没入感のある体験になります
- 設定可能な 2 つの音声役割：**ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの 2 番目の声）
- 設定画面では Mistral の全音声カタログが利用可能で、言語でフィルタできます

### 国際化

- インターフェースは 9 言語で利用可能：fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは 15 言語をサポート：fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv
- プロフィールごとに言語を設定可能

---

## 技術スタック

| 層 | 技術 | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x（Rolldown）+ tsx | HMR、Handlebars の partial、プロキシ |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | レスポンシブ UI、Vite でコンパイルされる TypeScript |
| **Templating** | vite-plugin-handlebars | partial による HTML 構成 |
| **AI** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、組み込み音声合成 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Web スクレイピング** | Readability + linkedom | Web ページの主要コンテンツ抽出（Firefox Reader View の技術） |
| **Headless browser** | Lightpanda | JS/SPA ページ向けの超軽量ヘッドレスブラウザ（Zig + V8）— スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内の markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | multipart フォームの処理 |
| **Audio** | ffmpeg-static | 音声セグメントの連結 |
| **Tests** | Vitest | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 依存関係なしのストレージ |

---

## モデル参照

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | ノート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズ検証、画像 Agent、Web Search Agent、指示検出 | 最高の多言語性能 + 指示追従 |
| `mistral-ocr-4-0`（OCR 4、デフォルト） | 文書 OCR — 最高品質 | 印刷テキスト、表、手書き文字（$4 / 1000 pages） |
| `mistral-ocr-2512`（OCR 3、オプション） | 文書 OCR | 設定で選択可能、より安価（$2 / 1000 pages） |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語 STT、`language="fr"` で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音声読み上げ |
| `mistral-moderation-2603` | コンテンツモデレーション | 子ども/ティーン向けに 5 カテゴリをブロック（`jailbreaking` を含む） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のための高速内容分析 |

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

> **注** : Mistral Voxtral TTS は唯一の TTS provider です — `MISTRAL_API_KEY` 以外に追加のキーは不要です。

> **ユーザーが入力する API キー** : `MISTRAL_API_KEY` は現在 **任意** です。これがない場合でもアプリは起動し、各ユーザーにインターフェース内で **自分の Mistral キー** を入力するよう促します。キーは **ブラウザ内に保存** されます（安全なコンテキストでの Web Crypto + IndexedDB により暗号化）し、リクエストごとに送信されます — **サーバーには決して永続保存されません**。優先順位 : プロファイルのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（env）。`EUREKAI_REQUIRE_USER_KEY=true` を設定すると、各ユーザーにキーの入力を強制します（env キーは事前読み込みにのみ使われます）。

> **ローカル HTTPS（タブレット/LAN）** : `localhost` はすでに安全なコンテキストです。LAN からアクセスする場合（タブレットなど）は、ローカル証明書を生成して HTTPS を有効化し、ブラウザ側の暗号化を解放しつつ、転送中のキーを暗号化してください：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert があれば使用、なければ openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite を HTTPS で提供
> ```

### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral API キー（chat、OCR、STT、Voxtral TTS、agents、moderation）。未設定の場合、ユーザーがアプリ内でキーを入力します（ブラウザに保存、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AI リクエストで `MISTRAL_API_KEY` へのフォールバックを無効化します（各ユーザーが必ず自分のキーを提供する必要があります）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLS の鍵/証明書パス（`scripts/gen-cert.sh` 参照）→ Express と Vite を HTTPS で提供します（安全な LAN/タブレットコンテキスト） |
| `PORT` | 任意 | `3000` | Express バックエンドの HTTP ポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合 → Express が `dist/` からフロントエンドを提供します（それ以外は `public/`） |
| `SONAR_TOKEN` | 任意 CI | — | GitHub Actions の SonarCloud ワークフローでのみ使用 |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git Hooks（Husky）** : `pre-commit` は `npm test` を起動し、`pre-push` は `npm run security` を起動します。どちらも失敗時には commit/push をブロックします。

**必要な外部ツール（任意ですが `pretest` / `npm run security` で使用）** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがないと、`npm test` は `pretest` で失敗し（lizard がない）、`npm run security` は失敗します（opengrep がない）。その場合、husky hooks が commit/push をブロックします。

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

> **`:U`** は Podman rootless 用のフラグで、ボリュームの権限を自動調整します。

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
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **AI コントリビューター向け** : 詳細なアーキテクチャ背景、必須ルール（anti-leak prompts、エラーコード、cost tracking）、および既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep migration）については [`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## API リファレンス

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定を変更（モデル、音声、TTS モデル） |
| `GET` | `/api/config/status` | API の状態 : `mistral`（Mistral キーが設定済み）、`ttsAvailable`（`mistral` の別名、Mistral Voxtral は唯一の TTS provider） |
| `POST` | `/api/config/reset` | デフォルト設定にリセット |
| `GET` | `/api/config/voices` | Mistral TTS の音声一覧を取得（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢別デフォルト |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力した Mistral キーを検証 — 常に 200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`）、env フォールバックなし |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを編集（15歳未満は PIN 必須） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除 + プロジェクトの連鎖削除 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=` は任意） |
| `POST` | `/api/projects` | プロジェクト `{name, profileId}` を作成 |
| `GET` | `/api/projects/:pid` | プロジェクト詳細 |
| `PUT` | `/api/projects/:pid` | `{name}` をリネーム |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成遷移のリアルタイム SSE フロー（`event: generation`）（`completed`/`failed`/`cancelled`）+ heartbeat keep-alive |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart ファイルをインポート（JPG/PNG/PDF は OCR、TXT/MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 音声（audio multipart） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL スクレイピングまたはウェブ検索 `{query}` — ソース配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | `{text}` をモデレート |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出 |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | 書き取り（単語 + 例文 + ルール、単語ごとに TTS 音声 1 つ；auto-router でも提案される） |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズ `{generationId, weakQuestions}` で間違えた問題に絞ったリマインダーシート — 「間違いを練習する」ボタンで `quiz-review` と並列に呼び出されます |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動するジェネレーターの計画） — `{plan, costDelta}` を返します（ルーティング単体のコスト） |
| `POST` | `/api/projects/:pid/generate/auto` | backend の自動生成（ルーティング + 8 種類: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation）。並列実行 — 同時 8 リクエスト以上の rate-limit を持つ Mistral tier が前提。そうでない場合、複数の 429 が `failedSteps` に返る可能性があります。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。`quiz-review` と `remediation-summary` はさらに `{generationId, weakQuestions}` を必要とします。

### 生成 CRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズ回答 `{answers}` を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め回答 `{answers}` を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 書き取り回答 `{answers}` を送信（サーバーで厳密採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答を検証（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS の音声読み上げ（シート/フラッシュカード） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 実行中の生成をキャンセル（pending をキャンセルできる唯一の経路） |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` をリネーム |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージ `{message, lang, ageGroup}` を送信 |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定

| 決定 | 理由 |
|---|---|
| **React/Vue ではなく Alpine.js** | 最小限のフットプリント、Vite でコンパイルされる TypeScript による軽量なリアクティビティ。スピードが重要なハッカソンに最適です。 |
| **JSON ファイルで永続化** | 依存関係ゼロ、即時起動。設定するデータベースは不要で、起動すればすぐに使えます。 |
| **Vite + Handlebars** | 開発用の高速 HMR と、コード整理のための HTML partials、Tailwind JIT を両立した最良の組み合わせです。 |
| **プロンプトの一元管理** | すべての AI プロンプトを `prompts.ts` に集約 — 言語や年齢グループごとに反復・テスト・調整しやすいです。 |
| **マルチ生成システム** | 各生成物は独立したオブジェクトで、それぞれ固有の ID を持ちます — 1 つのコースに対して複数のシート、クイズなどを作成できます。 |
| **年齢に合わせたプロンプト** | 語彙、複雑さ、トーンが異なる 4 つの年齢グループ — 同じ内容でも学習者に応じて異なる形で教えます。 |
| **Agents ベースの機能** | 画像生成とウェブ検索では一時的な Mistral Agents を使用 — 自動クリーンアップ付きの明確なライフサイクル。 |
| **URL のインテリジェントなスクレイピング** | 1 つのフィールドで URL とキーワードの混在を受け付けます — URL は Readability でスクレイピングされ（静的ページ）、JS/SPA ページは Lightpanda にフォールバック、キーワードは Mistral の web_search Agent を起動します。各結果は独立したソースを作成します。 |
| **100% Mistral の TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外の追加キー不要） — コストチェーンと、言語ごとの音声解決に統合された音声合成。 |

---

## クレジットと謝辞

- **[Mistral AI](https://mistral.ai)** — AI モデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティ CSS フレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdown パーサー
- **[Readability](https://github.com/mozilla/readability)** — Web コンテンツ抽出（Firefox Reader View 技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPA ページのスクレイピング用の超軽量 headless ブラウザ
- **[Luciole](https://luciole-vision.com)** — 視覚障害のある読者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロファイルの「読みやすさ」オプション）

2026年3月の Mistral AI Worldwide Hackathon 中に始動し、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) を使って AI により完全に開発されました。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**frからjaへ翻訳された記事をgpt-5.4-miniで。**
