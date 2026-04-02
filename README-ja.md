<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツを対話型学習体験に変換 — <a href="https://mistral.ai">Mistral AI</a> により動作。</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="品質ゲート"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="セキュリティ評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="信頼性評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="保守性評価"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="カバレッジ"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="脆弱性"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="コードスメル"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="コード行数"></a>
</p>

---

## 由来 — なぜ EurekAI？

**EurekAI** は [Mistral AI ワールドワイドハッカソン](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）中（2026年3月）に生まれました。テーマが必要で、きっかけはとても現実的なものです：私（訳者の作成者）は娘の定期テスト準備をよく手伝っており、AIを使えばそれをもっと楽しくインタラクティブにできるはずだと考えました。

目標は、写真（授業の写真）、コピー＆ペーストしたテキスト、音声録音、ウェブ検索など、あらゆる入力を受け取り、それを **復習用ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど** に変換することです。すべてフランスの Mistral AI モデルで動作するため、フランス語圏の生徒に自然に適したソリューションになっています。

[プロトタイプ初期版](https://github.com/jls42/worldwide-hackathon.mistral.ai) はハッカソン中の48時間で Mistral サービスを使った概念実証として作られました — 既に動作しますが機能は限定的でした。それ以降、EurekAI は本格的なプロジェクトへと成長しました：穴埋め問題、演習のナビゲーション、ウェブスクレイピング、親によるモデレーション設定、詳細なコードレビューなど。コード全体は主に [Claude Code](https://code.claude.com/) によって生成され、一部は [Codex](https://openai.com/codex/) や [Gemini CLI](https://geminicli.com/) からの貢献もあります。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | 授業資料をインポート — 写真、PDF（Mistral OCR 経由）、またはテキストファイル（TXT, MD） |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 録音 — Voxtral STT が音声を文字起こし |
| 🌐 | **ウェブ / URL** | URL を貼り付け（Readability + Lightpanda で直接スクレイピング）または検索語を入力（Agent Mistral web_search） |
| 📄 | **復習用ノート** | 重要ポイント、語彙、引用、逸話を含む構造化ノート |
| 🃏 | **フラッシュカード** | 参照元付き Q/A カードで能動的暗記（枚数は設定可能） |
| ❓ | **選択式クイズ** | 選択肢付き問題と誤答の適応的復習（問題数は設定可能） |
| ✏️ | **穴埋め問題** | ヒントと許容される検証を伴う穴埋め問題 |
| 🎙️ | **ポッドキャスト** | 2音声によるミニポッドキャスト — デフォルトは Mistral の音声、親の声などカスタム音声も可 |
| 🖼️ | **イラスト** | Agent Mistral による教育用画像生成 |
| 🗣️ | **音声クイズ** | 質問を音声で読み上げ（カスタム音声可）、口頭回答、AI による確認 |
| 💬 | **AI チューター** | コース資料を参照できるコンテキストチャット、ツール呼び出し可 |
| 🧠 | **自動ルーター** | `mistral-small-latest` に基づくルーターがコンテンツを解析し、利用可能な7種類のジェネレータを組み合わせて提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイルごとに設定可能なモデレーション（カテゴリはカスタマイズ可能）、親用 PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは9言語で利用可能；プロンプトにより15言語での生成が可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS または ElevenLabs によるノートやフラッシュカードの読み上げ |

---

## アーキテクチャ概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャ概要" width="800" />
</p>

---

## モデル使用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI モデル割り当て" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者のジャーニー" width="800" />
</p>

---

## 詳細 — 機能

### マルチモーダル入力

EurekAI はプロファイルに応じて（子供・ティーンはデフォルトで有効）4種類のソースを受け付け、モデレーションを行います：

- **ファイルのインポート** — JPG、PNG、PDF ファイルは `mistral-ocr-latest` によって処理（印刷されたテキスト、表、手書き文字を含む）、またはテキストファイル（TXT、MD）は直接インポート。
- **自由テキスト** — 任意の内容を入力または貼り付け。モデレーションが有効な場合は保存前にフィルタリング。
- **音声入力** — ブラウザで音声を録音。`voxtral-mini-latest` が文字起こし。`language="fr"` パラメータが認識を最適化。
- **ウェブ / URL** — 1つまたは複数の URL を貼り付けて直接スクレイピング（Readability + Lightpanda を使用して JS ページを処理）、またはキーワードを入力して Agent Mistral によるウェブ検索を実行。入力欄は URL とキーワードの両方を受け付け、自動で分離し、各結果が個別のソースとして作成されます。

### AI によるコンテンツ生成

生成される学習教材は7タイプ：

| ジェネレータ | モデル | 出力 |
|---|---|---|
| **復習用ノート** | `mistral-large-latest` | タイトル、要約、重要点、語彙、引用、逸話 |
| **フラッシュカード** | `mistral-large-latest` | 参照元付き Q/A カード（枚数設定可） |
| **選択式クイズ** | `mistral-large-latest` | 選択肢付き問題、解説、適応的復習（問題数設定可） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの空欄補充問題、許容査定（Levenshtein） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2音声のスクリプト → MP3 オーディオ |
| **イラスト** | Agent `mistral-large-latest` | ツール `image_generation` による教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS での出題 → STT での回答 → AI による検証 |

### チャット型 AI チューター

コース資料に完全にアクセスできる対話型チューター：

- `mistral-large-latest` を利用
- **ツール呼び出し**：会話中にノート、フラッシュカード、クイズ、穴埋め問題の生成が可能
- 各コースごとに50メッセージの履歴
- プロファイルでモデレーションが有効な場合は内容をフィルタリング

### 自動ルーター

ルーターは `mistral-small-latest` を使ってソースの内容を解析し、7種のジェネレータの中から最も適切なものを提案します。インターフェースはリアルタイムで進行状況を表示：まず解析フェーズ、続いて個別生成（取り消し可能）が行われます。

### 適応学習

- **クイズ統計**：問題ごとの試行回数と正答率の追跡
- **クイズ復習**：弱点に焦点を当てた 5〜10 問の新規問題を生成
- **指示検出**：復習指示（「これが分かれば私は授業が分かる」など）を検出し、対応するテキストジェネレータ（ノート、フラッシュカード、クイズ、穴埋め）で優先的に扱う

### セキュリティ & ペアレンタルコントロール

- **年齢グループは4種**：子供（≤10歳）、ティーン（11-15歳）、学生（16-25歳）、成人（26歳以上）
- **コンテンツモデレーション**：`mistral-moderation-latest` を使用、10カテゴリが利用可能。子供/ティーンではデフォルトで5カテゴリがブロック（`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`）。各プロファイルでカテゴリはカスタマイズ可能。
- **親用 PIN**：SHA-256 ハッシュ、15歳未満のプロファイルには必須。本番展開ではソルト付きの遅延ハッシュ（Argon2id、bcrypt）を推奨。
- **チャット制限**：16歳未満はデフォルトで AI チャット無効、親が有効化可能

### マルチプロファイルシステム

- 名前、年齢、アバター、言語設定を持つ複数プロファイル対応
- プロファイルに紐づくプロジェクトは `profileId`
- カスケード削除：プロファイル削除で関連プロジェクトも削除

### マルチプロバイダ TTS & カスタム音声

- **Mistral Voxtral TTS**（デフォルト）：`voxtral-mini-tts-latest`、追加キー不要
- **ElevenLabs**（代替）：`eleven_v3`、自然な音声、`ELEVENLABS_API_KEY` が必要
- プロバイダはアプリ設定で選択可能
- **カスタム音声**：親はサンプル音声から Mistral Voices API を使って自分の声を作成し、ホスト/ゲストなどの役割に割り当て可能 — ポッドキャストや音声クイズが親の声で再生され、子供にとって没入感の高い体験に
- 設定でフィルタ可能な Mistral の音声カタログ（言語別フィルタ）

### 国際化

- インターフェースは9言語：fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは15言語をサポート（fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv）
- 言語はプロファイルごとに設定可能

---

## 技術スタック

| 層 | 技術 | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partial、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブ UI、Vite による TypeScript コンパイル |
| **テンプレーティング** | vite-plugin-handlebars | partial による HTML 組み立て |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、Agents、モデレーション |
| **TTS（デフォルト）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、組み込み音声合成 |
| **TTS（代替）** | ElevenLabs SDK 2.x | `eleven_v3`、自然音声 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **ウェブスクレイピング** | Readability + linkedom | ウェブページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | 軽量ヘッドレスブラウザ（Zig + V8）で JS/SPA ページを処理 — フォールバックあり |
| **Markdown** | Marked | チャット内の Markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | マルチパートフォームの処理 |
| **オーディオ** | ffmpeg-static | オーディオセグメントの連結 |
| **テスト** | Vitest | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 依存のないストレージ |

---

## モデル参照

| モデル | 利用先 | 理由 |
|---|---|---|
| `mistral-large-latest` | ノート、フラッシュカード、ポッドキャスト、クイズ、穴埋め、チャット、音声クイズの検証、画像エージェント、ウェブ検索エージェント、指示検出 | マルチリンガル性能と指示フォローの良さ |
| `mistral-ocr-latest` | ドキュメントの OCR | 印刷文字、表、手書き文字 |
| `voxtral-mini-latest` | 音声認識（STT） | マルチリンガル STT、`language="fr"` による最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、読み上げ |
| `mistral-moderation-latest` | コンテンツモデレーション | 子供/ティーン用にデフォルトで 5 カテゴリをブロック（+ ジェイルブレイク対策） |
| `mistral-small-latest` | 自動ルーター | コンテンツを迅速に解析してルーティング判断 |
| `eleven_v3` (ElevenLabs) | 音声合成（代替 TTS） | 自然な音声、代替プロバイダとして設定可能 |

---

## すばやい開始方法

```bash
# Cloner le dépôt
git clone https://github.com/jls42/EurekAI.git
cd EurekAI

# Installer les dépendances
npm install

# Configurer les clés API
cp .env.example .env
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=<your_api_key>           (requis)
#   ELEVENLABS_API_KEY=<your_api_key>        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注意** : Mistral Voxtral TTS がデフォルトプロバイダです — `MISTRAL_API_KEY` 以外に追加のキーは不要です。ElevenLabs は設定で選べる代替 TTS プロバイダです。

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
  -e ELEVENLABS_API_KEY=<your_api_key> \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** は Podman rootless フラグで、ボリュームの権限を自動調整します。  
> **`ELEVENLABS_API_KEY`** はオプション（代替 TTS）。

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
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF)
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
  tts-provider.ts         — Dispatch TTS multi-provider (Mistral Voxtral / ElevenLabs)
  tts.ts                  — Génération audio podcast (concaténation de segments)
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
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, randomSeed)

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

public/assets/            — Ressources statiques (logo, avatars)
output/                   — Données d'exécution (projets, config, fichiers audio)
```

---

## API リファレンス

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定を取得 |
| `PUT` | `/api/config` | 設定を変更（モデル、音声、TTS プロバイダ） |
| `GET` | `/api/config/status` | API（Mistral, ElevenLabs, TTS）のステータス |
| `POST` | `/api/config/reset` | 設定をデフォルトにリセット |
| `GET` | `/api/config/voices` | Mistral TTS の音声一覧を取得（`?lang=fr` はオプション） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢ごとのデフォルト |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを編集（15歳未満は PIN 必須） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除 + プロジェクトのカスケード削除 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクト一覧（`?profileId=` はオプション） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細 |
| `PUT` | `/api/projects/:pid` | 名前変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 | ### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートファイルのインポート（JPG/PNG/PDFはOCR、TXT/MDは直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声STT（マルチパート音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLスクレイピングまたはウェブ検索 `{query}` — ソースの配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | モデレート `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | レビュールールの検出 |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | レビューフラッシュシート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応学習レビュー `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング解析（起動するジェネレータの計画） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 5タイプ：summary, flashcards, quiz, fill-blank, podcast） |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け入れます。 `quiz-review` はさらに `{generationId, weakQuestions}` を要求します。

### CRUD 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を検証（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTSで読み上げ（シート/フラッシュカード） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定

| 決定 | 正当化 |
|---|---|
| **Alpine.js を採用（React/Vueではなく）** | 最小のフットプリント、ViteでコンパイルされたTypeScriptによる軽量なリアクティビティ。ハッカソンのように速度が重要な場合に最適です。 |
| **JSONファイルでの永続化** | 依存をゼロにし、即時起動。データベースの設定不要でそのまま始められます。 |
| **Vite + Handlebars** | 開発向けに高速なHMR、コード整理のためのHTMLパーシャル、Tailwind JITの利点を両立。 |
| **プロンプトの集中管理** | すべてのAIプロンプトを `prompts.ts` に集約 — 言語や年齢層ごとにテスト・調整が容易。 |
| **マルチ生成システム** | 各生成は独立したIDを持つオブジェクト — コースごとに複数のシートやクイズを持てる。 |
| **年齢別に合わせたプロンプト** | 語彙、複雑さ、口調が異なる4つの年齢グループ — 同じ内容でも学習者に応じて別の教え方を提供。 |
| **エージェントに基づく機能** | 画像生成やウェブ検索は一時的なMistralエージェントを使用 — ライフサイクルを管理し自動でクリーンアップ。 |
| **インテリジェントなURLスクレイピング** | 1つのフィールドにURLとキーワードを混在して受け付ける — URLはReadability（静的ページ）でスクレイピング、JS/SPAページはLightpandaにフォールバック、キーワードはMistralのweb_searchエージェントをトリガー。各結果は独立したソースを生成。 |
| **マルチプロバイダーTTS** | デフォルトは Mistral Voxtral TTS（追加キー不要）、代替は ElevenLabs — 再起動不要で設定可能。 |

---

## クレジット & 謝辞

- **[Mistral AI](https://mistral.ai)** — IAモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small） + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 代替音声合成エンジン (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティファーストのCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — ウェブコンテンツ抽出（Firefox Reader Viewの技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング用超軽量ヘッドレスブラウザ

Mistral AI Worldwide Hackathon（2026年3月）中に開始、Claude Code（https://code.claude.com/）、Codex（https://openai.com/codex/）、および Gemini CLI（https://geminicli.com/）と共にAI主導で完全に開発されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**この文書は gpt-5-mini モデルを使用して fr バージョンから ja 言語に翻訳されました。翻訳プロセスの詳細については、https://gitlab.com/jls42/ai-powered-markdown-translator をご覧ください。**

