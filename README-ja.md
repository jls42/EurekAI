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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="品質ゲート"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="セキュリティ評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="信頼性評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="保守性評価"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="カバレッジ"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="脆弱性"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="コードスメル"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="行数"></a>
</p>

---

## 来歴 — なぜ EurekAI？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）で生まれました。テーマが必要で、アイデアは非常に具体的な体験から生まれました：私は娘と定期的にテストの準備をしており、AIを使えばそれをもっと楽しくインタラクティブにできるはずだと考えたのです。

目的：**あらゆる入力**— レッスンの写真、コピー＆ペーストしたテキスト、音声録音、ウェブ検索 — を取り込み、**復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど** に変換すること。すべて Mistral AI のフランス語モデルで駆動されるため、フランス語圏の生徒に自然に適したソリューションになります。

初期の [プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai) はハッカソン中の48時間で Mistral のサービスを用いた概念実証として作られました — 既に動作しますが限定的でした。以降、EurekAI は実際のプロジェクトへと発展しました：穴埋め問題、問題のナビゲーション、ウェブスクレイピング、プロファイルごとの設定可能な親のモデレーション、詳細なコードレビューなど。コードの大部分は AI によって生成されています — 主に [Claude Code](https://code.claude.com/)、一部は [Codex](https://openai.com/codex/) や [Gemini CLI](https://geminicli.com/) からの貢献です。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | レッスンをインポート — 写真、PDF（Mistral OCR 経由）またはテキストファイル（TXT、MD） |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 録音 — Voxtral STT が音声を文字起こし |
| 🌐 | **Web / URL** | URL を貼り付け（Readability + Lightpanda による直接スクレイピング）または検索語句を入力（Agent Mistral web_search） |
| 📄 | **復習ノート** | 重要ポイント、語彙、引用、逸話を含む構造化されたノート |
| 🃏 | **フラッシュカード** | インタラクティブなQ/Aカード、対話式の音声読み上げ |
| ❓ | **選択式クイズ（QCM）** | 複数選択式問題、エラーに対する適応的な復習（回数は設定可能） |
| ✏️ | **穴埋め問題** | ヒントと寛容な検証を備えた完成課題 |
| 🎙️ | **ポッドキャスト** | 2音声のミニポッドキャスト — デフォルトは Mistral の声、親の声も設定可能 |
| 🖼️ | **イラスト** | Agent Mistral による教育用画像生成 |
| 🗣️ | **音声クイズ** | 音声で出題（カスタムボイス可）、音声で回答、AI による検証 |
| 💬 | **AI チューター** | コースドキュメントに基づく文脈チャット、ツール呼び出し可能 |
| 🧠 | **自動ルーティング** | `mistral-small-latest` に基づくルーターがコンテンツを解析し、7種類のジェネレーターを組み合わせて提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイルごとに設定可能なモデレーション（カテゴリのカスタマイズ可）、保護者PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェイスは9言語で利用可能；プロンプトで15言語に対して生成可能 |
| 🔊 | **読み上げ** | Mistral Voxtral TTS または ElevenLabs による復習ノートとフラッシュカードの読み上げ（Q/A 対話形式） |

---

## アーキテクチャ概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャ概要" width="800" />
</p>

---

## モデル利用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI モデルとタスクのマッピング" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者のジャーニー" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAI は 4 種類のソースを受け付け、プロファイルに応じてモデレーション（子供・ティーンはデフォルトで有効）されます：

- **ファイルのインポート** — JPG、PNG、PDF は `mistral-ocr-latest` により処理（印刷テキスト、表、手書き）、またはテキストファイル（TXT、MD）を直接インポート。
- **自由テキスト** — 任意のコンテンツを入力または貼り付け。保存前にモデレーションが有効なら検査。
- **音声入力** — ブラウザ内で音声を録音。`voxtral-mini-latest` が文字起こしを行う。`language="fr"` パラメータで認識が最適化。
- **Web / URL** — 1つまたは複数の URL を貼り付けて直接スクレイピング（Readability + Lightpanda を利用）、またはキーワードで Agent Mistral によるウェブ検索。入力欄は URL とキーワードの両方を受け付け、自動で分離し、各結果ごとに独立したソースを作成。

### AI によるコンテンツ生成

生成される学習教材は7種類：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、重要ポイント、語彙、引用、逸話 |
| **フラッシュカード** | `mistral-large-latest` | 参照付きの Q/A カード（件数は設定可能） |
| **選択式クイズ（QCM）** | `mistral-large-latest` | 複数選択問題、解説、適応的復習（件数設定可） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、寛容な検証（Levenshtein） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2 音声のスクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツールによる教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS による出題 → STT による回答 → AI による検証 |

### チャットベースの AI チューター

コースドキュメントに完全アクセスする対話型チューター：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中に復習ノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースごとに 50 メッセージの履歴
- プロファイルで有効ならコンテンツのモデレーションを実行

### 自動ルーター

ルーターは `mistral-small-latest` を使用してソースの内容を解析し、7 種類のジェネレーターの中から最適なものを提案します。UI はリアルタイムの進捗を表示：まず解析フェーズ、次に個別生成とキャンセル可能な処理。

### 適応学習

- **クイズ統計**：問題ごとの試行回数と正答率を追跡
- **クイズ復習**：弱点概念に対して 5〜10 問の新しい問題を生成
- **指示検出**：復習指示（「私は〜ができればテストに合格する」等）を検出し、互換のあるテキスト生成（ノート、フラッシュカード、クイズ、穴埋め）で優先

### セキュリティ＆ペアレンタルコントロール

- **年齢グループ 4 分類**：子供（≤10）、ティーン（11–15）、学生（16–25）、成人（26+）
- **コンテンツモデレーション**：`mistral-moderation-latest`、10カテゴリを利用可能。子供/ティーンではデフォルトで5カテゴリをブロック（`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`）。プロフィールでカテゴリをカスタマイズ可能。
- **親用 PIN**：SHA-256 ハッシュ、15歳未満のプロファイルで必須。本番運用ではソルト付きの遅延ハッシュ（Argon2id、bcrypt）を検討。
- **チャット制限**：16歳未満はデフォルトで AI チャット無効、保護者が有効化可能

### マルチプロファイルシステム

- 名前、年齢、アバター、言語設定を持つ複数プロファイル対応
- プロファイルに紐づくプロジェクトは `profileId`
- カスケード削除：プロファイル削除で関連プロジェクトも削除

### マルチプロバイダ TTS とカスタムボイス

- **Mistral Voxtral TTS**（デフォルト）：`voxtral-mini-tts-latest`、追加キー不要
- **ElevenLabs**（代替）：`eleven_v3`、自然な音声、`ELEVENLABS_API_KEY` が必要
- プロバイダはアプリ設定で選択可能
- **カスタムボイス**：保護者は Mistral Voices API を使ってサンプル音声から自分の声を作成し、ホスト/ゲスト役に割り当て可能 — ポッドキャストや音声クイズを保護者の声で再生でき、子供にとって没入感が向上
- 2 つの音声ロール設定：**ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの第2音声）
- 設定で言語フィルタ可能な Mistral の全ボイスカタログ

### 国際化（多言語対応）

- インターフェイスは 9 言語：fr, en, es, pt, it, nl, de, hi, ar
- AI プロンプトは 15 言語をサポート（fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv）
- 言語はプロファイルごとに設定可能

---

## 技術スタック

| レイヤー | 技術 | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーおよび型安全 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブ UI、Vite による TypeScript コンパイル |
| **テンプレート** | vite-plugin-handlebars | partial による HTML 組み立て |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、Agents、モデレーション |
| **TTS（デフォルト）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、組み込み音声合成 |
| **TTS（代替）** | ElevenLabs SDK 2.x | `eleven_v3`、自然な音声 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **ウェブスクレイピング** | Readability + linkedom | ウェブページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPA ページ向けの超軽量ヘッドレス（Zig + V8） — フォールバックでスクレイピング |
| **Markdown** | Marked | チャット内の Markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | マルチパートフォームの処理 |
| **オーディオ** | ffmpeg-static | 音声セグメントの連結 |
| **テスト** | Vitest | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 外部依存のないストレージ |

---

## モデルの参照

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | ノート、フラッシュカード、ポッドキャスト、クイズ、穴埋め、チャット、音声クイズの検証、画像エージェント、ウェブ検索エージェント、指示検出 | 多言語対応かつ指示追従が優れている |
| `mistral-ocr-latest` | ドキュメントの OCR | 印刷テキスト、表、手書き |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語 STT、`language="fr"` と併用で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、読み上げ |
| `mistral-moderation-latest` | コンテンツモデレーション | 子供/ティーン用に 5 カテゴリをブロック（+ ジェイルブレイキング検出） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のための高速解析 |
| `eleven_v3` (ElevenLabs) | 音声合成（代替 TTS） | 自然な音声、設定可能な代替手段 |

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
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=<your_api_key>           (requis)
#   ELEVENLABS_API_KEY=<your_api_key>        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注意**：Mistral Voxtral TTS はデフォルトプロバイダです — `MISTRAL_API_KEY` 以上の追加キーは不要。ElevenLabs は設定で選べる代替 TTS プロバイダです。

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

### 設定（Config）
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定を取得 |
| `PUT` | `/api/config` | 設定を変更（モデル、ボイス、TTS プロバイダなど） |
| `GET` | `/api/config/status` | API ステータス（Mistral、ElevenLabs、TTS） |
| `POST` | `/api/config/reset` | デフォルト設定にリセット |
| `GET` | `/api/config/voices` | Mistral TTS のボイス一覧を取得（`?lang=fr` はオプション） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリと年齢別デフォルト |

### プロファイル（Profils）
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを編集（15歳未満は PIN 必須） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除 + プロジェクトをカスケード削除 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト（Projets）
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧（`?profileId=` はオプション） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細 |
| `PUT` | `/api/projects/:pid` | リネーム `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 | ### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートファイルのインポート（JPG/PNG/PDFはOCR、TXT/MDは直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声STT（マルチパート音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLスクレイピングまたはウェブ検索 `{query}` — ソースの配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | モデレーション `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示の検出 |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式クイズ（多肢選択） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動するジェネレーターの計画） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 5種類：summary、flashcards、quiz、fill-blank、podcast） |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。 `quiz-review` はさらに `{generationId, weakQuestions}` を要求します。

### 生成のCRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズ回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を検証（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | 音声合成で読み上げ（シート/フラッシュカード） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前を変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャの決定

| 決定 | 理由 |
|---|---|
| **Alpine.js を React/Vue の代わりに** | 最小のフットプリント、ViteでコンパイルされたTypeScriptによる軽量なリアクティビティ。スピードが重要なハッカソンに最適。 |
| **JSONファイルによる永続化** | 依存関係なし、即起動。データベースの設定が不要 — すぐに開始できる。 |
| **Vite + Handlebars** | 両方の良いところ：開発時の高速なHMR、コード整理のためのHTMLパーシャル、TailwindのJIT。 |
| **プロンプトの集中管理** | すべてのIAプロンプトは `prompts.ts` に — 言語や年齢層ごとに反復、テスト、適応が容易。 |
| **マルチ生成システム** | 各生成は独立したIDを持つオブジェクト — コースごとに複数のシート、クイズ等を可能にする。 |
| **年齢別プロンプト対応** | 4つの年齢グループで語彙、複雑さ、語調を変える — 同じ内容でも学習者によって教え方を変える。 |
| **エージェントベースの機能** | 画像生成とウェブ検索は一時的な Mistral エージェントを使用 — ライフサイクル管理と自動クリーンアップ。 |
| **スマートなURLスクレイピング** | 単一フィールドでURLとキーワードの混在を許可 — URLはReadabilityでスクレイピング（静的ページ）し、フォールバックでLightpanda（JS/SPAページ）を使用。キーワードはMistralのweb_searchエージェントを起動。各結果は独立したソースを生成する。 |
| **マルチプロバイダTTS** | デフォルトはMistral Voxtral TTS（追加キー不要）、代替にElevenLabs — 再起動不要で設定可能。 |

---

## クレジットと謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）＋Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 代替音声合成エンジン (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティファーストなCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — Webコンテンツ抽出（Firefox Reader View 技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング用軽量ヘッドレスブラウザ

Mistral AI Worldwide Hackathon（2026年3月）で開始され、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) とAIによって完全に開発されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**この文書は gpt-5-mini モデルを使用して fr 版から ja 言語に翻訳されました。翻訳プロセスの詳細については https://gitlab.com/jls42/ai-powered-markdown-translator をご覧ください。**

