<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変換 — <a href="https://mistral.ai">Mistral AI</a> によって駆動。</strong>
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

## 背景 — なぜ EurekAI なのか？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）の最中に生まれました。題材が必要だったのですが、きっかけはとても身近なものでした。私は娘と一緒に定期的にテスト勉強をしているのですが、AI を使えば、これをもっと楽しく、もっとインタラクティブにできるのではないかと思ったのです。

目的は、**どんな入力でも** — 授業の写真、コピペしたテキスト、音声録音、Web 検索 — それを **復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラスト** などに変換することです。すべては Mistral AI のフランス製モデルによって駆動されており、フランス語話者の学習者に自然に適したソリューションになっています。

この [初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai) は、ハッカソン中に 48 時間で Mistral のサービスを中心とした概念実証として作られました。すでに動作していましたが、機能は限定的でした。それ以来、EurekAI は本格的なプロジェクトへと成長しました。穴埋め問題、演習内ナビゲーション、Web スクレイピング、設定可能な保護者向けモデレーション、詳細なコードレビューなど、さらに多くの機能があります。コード全体は AI によって生成されています。主に [Claude Code](https://code.claude.com/) を使用し、[Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) からのいくつかの貢献もあります。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルの取り込み** | 授業資料を取り込みます — 写真、PDF（Mistral OCR による平均化された信頼度スコア、ティア `high`/`medium`/`low`）またはテキストファイル（TXT、MD）。ファイルごとの再試行と個別進捗を備えたアップロードセッション |
| 📝 | **テキスト入力** | 直接テキストを入力または貼り付けできます |
| 🎤 | **音声入力** | 音声を録音すると、Voxtral STT が文字起こしします |
| 🌐 | **Web / URL** | URL を貼り付けると（Readability + Lightpanda による直接スクレイピング）、または検索語を入力すると（Agent Mistral の web_search）処理できます |
| 📄 | **復習ノート** | 要点、語彙、引用、豆知識を含む構造化ノート |
| 🃏 | **フラッシュカード** | 対話型の Q/A カード、対話形式の音声読み上げ |
| ❓ | **択一クイズ** | 誤答の適応的な復習付きの多肢選択問題（件数は設定可能） |
| ✏️ | **穴埋め問題** | ヒント付きで解答し、寛容な判定が行われる補完演習 |
| 🎙️ | **ポッドキャスト** | 2 声のミニポッドキャスト音声 — デフォルトの Mistral 音声、またはカスタム音声（保護者向け！） |
| 🖼️ | **イラスト** | Mistral Agent によって生成される教育用画像 |
| 🗣️ | **音声クイズ** | 音声で読み上げられる問題（カスタム音声も可）、口頭で回答、AI による検証 |
| 💬 | **AI チューター** | ツール呼び出し付きで、授業資料と文脈連動したチャット |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターが内容を解析し、利用可能な 7 種類の生成器から最適な組み合わせを提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイルごとに設定可能なモデレーション（カテゴリをカスタマイズ可能）、保護者 PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは 9 言語で利用可能。AI 生成はプロンプト経由で 15 言語に対応 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS を使ってノートとフラッシュカード（Q/A 対話）を聞けます |
| 💶 | **API コスト追跡** | 各生成とそのソースの推定コスト € を透明に表示（tokens / characters / pages / seconds audio）。カードごとのバッジ + プロジェクト合計をダッシュボードで表示 |
| 🎨 | **プロフィール別テーマ** | 各プロフィールが `dark` または `light` のテーマを選択 — プロフィール切り替え後も保持 |

---

## アーキテクチャ概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャ概要" width="800" />
</p>

---

## モデル利用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI モデルとタスクの対応" width="800" />
</p>

---

## 学習の流れ

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者の学習の流れ" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAI は 4 種類のソースを受け付けます。プロフィールに応じてモデレートされ、子どもとティーンでは既定で有効です。

- **ファイルの取り込み** — JPG、PNG、PDF を Mistral OCR で処理します。**OCR 3 (`mistral-ocr-2512`) が既定**、**OCR 4 (`mistral-ocr-4-0`) は設定で選択可能**（より高品質ですがコストは 2 倍）です。印刷テキスト、表、手書きに対応し、またテキストファイル（TXT、MD）も直接取り込めます。複数ファイルのアップロードは **アップロードセッション** 方式を採用しており、ファイルごとの進捗表示、失敗したファイルだけの再試行、完了時のセッション解除が可能です。OCR は平均化された **信頼度スコア** (`average`、`[0,1]` に収められ、Mistral が返す `averagePageConfidenceScore` から算出) を公開し、UI ではティア `high` / `medium` / `low` のバッジとして表示されます（しきい値は約 0.9 / 約 0.7）— スキャン品質が悪い場合でも、ブロックせずに警告します。
- **自由入力テキスト** — どんな内容でも入力または貼り付けできます。モデレーションが有効な場合は保存前に検査されます。
- **音声入力** — ブラウザで音声を録音します。`voxtral-mini-latest` によって文字起こしされます。`language="fr"` パラメータが認識精度を最適化します。
- **Web / URL** — 1 つ以上の URL を貼り付けて、内容を直接スクレイピングできます（JS ページでは Readability + Lightpanda）。または、キーワードを入力して Mistral Agent 経由で Web 検索できます。単一の入力欄で両方を受け付け、URL とキーワードは自動的に分離され、各結果は独立したソースとして作成されます。

### AI コンテンツ生成

生成される学習素材は 7 種類です。

| 生成器 | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、要点、語彙、引用、豆知識 |
| **フラッシュカード** | `mistral-large-latest` | ソース参照付きの Q/A カード（件数は設定可能） |
| **択一クイズ** | `mistral-large-latest` | 多肢選択問題、解説、適応的な復習（件数は設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きで補完する文、寛容な判定（Levenshtein） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2 声のスクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツール経由の教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS の問題 → STT の回答 → AI 検証 |

### チャットによる AI チューター

授業資料に完全アクセスできる会話型チューターです。

- `mistral-large-latest` を使用
- **ツール呼び出し**: 会話中に復習ノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースごとに最大 50 メッセージの履歴
- プロフィールで有効な場合、コンテンツモデレーションあり

### 自動ルーター

このルーターは `mistral-small-latest` を使ってソース内容を解析し、利用可能な 7 種類の中から最も適切な生成器を提案します。UI ではリアルタイムの進捗が表示され、最初に解析フェーズ、その後に個別の生成が行われ、必要に応じてキャンセルできます。

### 適応学習

- **クイズ統計**: 問題ごとの試行回数と正答率を追跡
- **クイズ復習**: 弱点となる概念を狙った新しい問題を 5〜10 問生成
- **指示検出**: 「授業を理解したと言えるのは、〜ができたとき」のような復習指示を検出し、対応するテキスト生成器（ノート、フラッシュカード、クイズ、穴埋め問題）で優先的に扱う

### セキュリティ & ペアレンタルコントロール

- **4 つの年齢グループ**: 子ども（10歳以下）、ティーン（11〜15歳）、学生（16〜25歳）、大人（26歳以上）
- **コンテンツモデレーション**: `mistral-moderation-latest` に 10 種類のカテゴリがあり、そのうち 5 種類は子ども/ティーン向けに既定でブロックされています（`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`）。カテゴリは設定でプロフィールごとにカスタマイズ可能です。
- **保護者 PIN**: SHA-256 ハッシュを使用し、15歳未満のプロフィールには必須です。本番デプロイでは、ソルト付きの低速ハッシュ（Argon2id、bcrypt）を用意してください。
- **チャット制限**: 16歳未満では AI チャットは既定で無効、保護者が有効化可能

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数プロフィール
- **プロフィール別の音声** (`Profile.mistralVoices?: { host, guest }`) — 各子どもにポッドキャスト/音声クイズ用の音声ペアを割り当て可能
- **プロフィール別のテーマ** (`Profile.theme: 'dark' | 'light'`) — プロフィール変更時に自動切り替え、バックエンド側で永続化
- `profileId` を通じてプロフィールに紐づくプロジェクト
- カスケード削除: プロフィールを削除すると、そのプロフィールのすべてのプロジェクトも削除される

### API コスト追跡

すべての Mistral 呼び出し（チャット、OCR、STT、TTS、モデレーション、エージェント）は計測され、ユーザーに **透明な** € 見積もりを提供します。請求で驚かされることはありません。

- **唯一の参照元**: `helpers/pricing.ts` — モデル接頭辞ごとの `MODEL_PRICING`（例: `mistral-large` → input 0.5 €/M tokens、output 1.5 €/M tokens）、`PRICING_SOURCES` と Mistral のドキュメント URL を使った定期再スクレイピング
- **対応単位**: `tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— 変換は `helpers/cost-calc.ts` によって制御
- **計測チェーン**: `helpers/tracked-client.ts`（Mistral クライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP レスポンスへの注入）
- **UI**: 生成ごとのコストバッジ (`src/partials/cost-badge-gen.html`)、ソースごとのコストバッジ (`cost-badge-src.html`)、ダッシュボードでの累計合計 (`Project.totalCost`)
- **エンドポイント**: `/generate/*` と `/sources/*` のレスポンスは、返却オブジェクト（Generation / Source）に `estimatedCost`、`usage`、`costBreakdown` を付与します。`POST /generate/auto/route` はルーティングのみのコスト用に `costDelta: number` フィールドを追加します。`GET /projects/:pid` は、`totalCost`（`costLog[]` から計算された合計）と完全な履歴を含む拡張済みプロジェクトを返します。

### マルチプロバイダー TTS & カスタム音声

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`、100% Mistral の音声合成で、追加キーは不要です
- **カスタム音声**: 保護者は Mistral Voices API（音声サンプルから作成）を使って自分の声を作成し、ホスト/ゲストの役割に割り当てられます。すると、ポッドキャストや音声クイズが保護者の声で再生され、子どもにとってさらに没入感のある体験になります
- 設定可能な 2 つの音声ロール: **ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの第2音声）
- Mistral の音声カタログは設定画面から利用可能で、言語でフィルタリングできます

### 国際化

- インターフェースは 9 言語で利用可能: fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは 15 言語に対応: fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv
- プロフィールごとに言語を設定可能

---

## 技術スタック

| 層 | 技術 | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partial、プロキシ |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、Vite でコンパイルされた TypeScript |
| **Templating** | vite-plugin-handlebars | partial による HTML 構成 |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、組み込み音声合成 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Web スクレイピング** | Readability + linkedom | Web ページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPA ページ向けの超軽量ヘッドレスブラウザ（Zig + V8）— スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内の Markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | multipart フォームの処理 |
| **Audio** | ffmpeg-static | 音声セグメントの連結 |
| **Tests** | Vitest | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 依存関係なしの保存 |

---

## モデル参照

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | ノート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズ検証、画像エージェント、Web 検索エージェント、指示検出 | 最高レベルの多言語対応 + 指示追従 |
| `mistral-ocr-2512`（OCR 3、既定） | 文書 OCR | 印刷テキスト、表、手書き（$2 / 1000 pages） |
| `mistral-ocr-4-0`（OCR 4、オプション） | 文書 OCR — 上位品質 | 設定で選択可能、コストは 2 倍（$4 / 1000 pages） |
| `voxtral-mini-latest` | 音声認識（STT） | `language="fr"` で最適化された多言語 STT |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音声読み上げ |
| `mistral-moderation-latest` | コンテンツモデレーション | 子ども/ティーン向けに 5 カテゴリをブロック（+ jailbreaking） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のための高速な内容解析 |

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

> **注**: Mistral Voxtral TTS は唯一の TTS プロバイダーです。`MISTRAL_API_KEY` 以外に追加のキーは不要です。

> **ユーザー入力 API キー**: `MISTRAL_API_KEY` は現在 **オプション** です。存在しない場合でもアプリは起動し、各ユーザーに UI で **自分の Mistral キー** を入力するよう促します。キーは **ブラウザ内に保存** されます（安全なコンテキストでは Web Crypto + IndexedDB で暗号化）し、リクエストごとに送信されます。**サーバーには決して永続化されません**。優先順位: プロフィールのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（env）。`EUREKAI_REQUIRE_USER_KEY=true` を設定すると、各ユーザーにキーの入力を強制します（env キーは事前読み込み専用になります）。

> **ローカル HTTPS（タブレット/LAN）**: `localhost` はすでに安全なコンテキストです。LAN アクセス（タブレット）では、ローカル証明書を生成して HTTPS を有効化し、ブラウザ側の暗号化を解放し、通信中のキーを暗号化してください:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert があればそれを使用、なければ openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite を HTTPS で起動
> ```
### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral APIキー（chat、OCR、STT、Voxtral TTS、agents、moderation）。未設定の場合、ユーザーはアプリ内で自分のキーを入力します（ブラウザに保存され、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AI リクエストに対する `MISTRAL_API_KEY` へのフォールバックを無効化します（各ユーザーが必ず自分のキーを提供する必要があります）。公開インスタンスで有用です |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLS キー/証明書のパス（`scripts/gen-cert.sh` 参照）→ Express と Vite を HTTPS で配信します（LAN/タブレットでの secure context） |
| `PORT` | 任意 | `3000` | Express バックエンドの HTTP ポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合、Express は `dist/` からフロントエンドを配信します（それ以外は `public/`） |
| `SONAR_TOKEN` | 任意（CI） | — | GitHub Actions SonarCloud ワークフローでのみ使用されます |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git フック（Husky）**: `pre-commit` は `npm test` を実行し、`pre-push` は `npm run security` を実行します。どちらも失敗時には commit/push をブロックします。

**必要な外部ツール（任意ですが `pretest` / `npm run security` で使用）**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがないと、`npm test` は `pretest` で失敗し（lizard がないため）、`npm run security` も失敗します（opengrep がないため）。その場合、husky フックが commit/push をブロックします。

---

## コンテナによるデプロイ

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

> **`:U`** は Podman rootless のフラグで、ボリュームの権限を自動的に調整します。

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

> **AI コントリビューター向け**: 詳細なアーキテクチャの背景、必須ルール（プロンプト漏えい防止、エラーコード、コスト追跡）、および既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep の移行）については [`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## API リファレンス

### Config
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定の変更（モデル、音声、TTS モデル） |
| `GET` | `/api/config/status` | API のステータス: `mistral`（Mistral キーが設定済み）、`ttsAvailable`（`mistral` のエイリアス、Mistral Voxtral は唯一の TTS プロバイダー） |
| `POST` | `/api/config/reset` | デフォルト設定にリセット |
| `GET` | `/api/config/voices` | Mistral TTS の音声を一覧表示（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能な moderation カテゴリ + 年齢別のデフォルト |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを変更（15歳未満では PIN が必要） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除 + `{pin?}` → `{ok, deletedProjects}` のプロジェクト連鎖削除 |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=` は任意） |
| `POST` | `/api/projects` | プロジェクト `{name, profileId}` を作成 |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細 |
| `PUT` | `/api/projects/:pid` | `{name}` をリネーム |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart ファイルをインポート（JPG/PNG/PDF は OCR、TXT/MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | `{text}` の自由記述テキスト |
| `POST` | `/api/projects/:pid/sources/voice` | STT 音声（multipart 音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL のスクレイピングまたは `{query}` の web 検索 — ソースの配列を返します |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | `{text}` を moderation する |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出 |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 多肢選択クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | 画像 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズ `{generationId, weakQuestions}` で不正解だった質問に特化したリマインドシート — 「自分のミスを練習する」ボタンから `quiz-review` と並行して呼び出されます |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動すべき生成器の計画） — `{plan, costDelta}` を返します（ルーティング単体のコスト） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 7 種類: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image）。並列実行 — 同時リクエスト 7 件以上の rate-limit を持つ Mistral の tier が必要です。そうでない場合、複数の 429 が `failedSteps` に返ることがあります。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。`quiz-review` と `remediation-summary` ではさらに `{generationId, weakQuestions}` が必要です。

### CRUD 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | `{answers}` のクイズ回答を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | `{answers}` の穴埋め回答を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を検証（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS で音声読み上げ（fiches/flashcards） |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` をリネーム |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | `{message, lang, ageGroup}` のメッセージを送信 |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の判断

| 判断 | 理由 |
|---|---|
| **React/Vue ではなく Alpine.js** | 最小限のフットプリント、Vite でコンパイルされた TypeScript による軽量なリアクティビティ。速度が重要なハッカソンに最適です。 |
| **JSON ファイルによる永続化** | 依存関係ゼロ、即時起動。設定するデータベースはありません — 起動してそのまま使えます。 |
| **Vite + Handlebars** | 両方の利点があります。開発では高速な HMR、コード整理には HTML partials、さらに Tailwind JIT を活用できます。 |
| **プロンプトの केंद? centralization** | AI プロンプトはすべて `prompts.ts` に集約 — 言語/年齢グループごとに反復、テスト、調整がしやすいです。 |
| **マルチ生成システム** | 各生成は独立したオブジェクトで、独自の ID を持ちます — 1 コースごとに複数のシート、クイズなどを可能にします。 |
| **年齢別に調整されたプロンプト** | 語彙、複雑さ、トーンが異なる 4 つの年齢グループ — 同じ内容でも学習者に応じて教え方が変わります。 |
| **Agents ベースの機能** | 画像生成と web 検索には一時的な Mistral Agents を使用します — 自動クリーンアップ付きの明確なライフサイクルです。 |
| **インテリジェントな URL スクレイピング** | URL とキーワードを混在させて入力できる単一フィールド — URL は Readability（静的ページ）でスクレイピングされ、Lightpanda（JS/SPA ページ）へフォールバックします。キーワードは Mistral の web_search Agent を起動します。各結果は独立したソースを作成します。 |
| **TTS 100% Mistral** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外の追加キーは不要）— コストチェーンと、言語ごとの音声解決に統合された音声合成です。 |

---

## クレジット & 謝辞

- **[Mistral AI](https://mistral.ai)** — AI モデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティファースト CSS フレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdown パーサー
- **[Readability](https://github.com/mozilla/readability)** — Web コンテンツ抽出（Firefox Reader View の技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPA ページのスクレイピング向け超軽量ヘッドレスブラウザ

Mistral AI Worldwide Hackathon（2026 年 3 月）で始まり、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) を使って完全に AI により開発されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**fr から ja へ gpt-5.4-mini で翻訳された記事。**
