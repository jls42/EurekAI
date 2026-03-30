<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>任意のコンテンツをインタラクティブな学習体験に変換 — <a href="https://mistral.ai">Mistral AI</a> によって駆動。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 英語</a> · <a href="README-es.md">🇪🇸 スペイン語</a> · <a href="README-pt.md">🇧🇷 ポルトガル語</a> · <a href="README-de.md">🇩🇪 ドイツ語</a> · <a href="README-it.md">🇮🇹 イタリア語</a> · <a href="README-nl.md">🇳🇱 オランダ語</a> · <a href="README-ar.md">🇸🇦 アラビア語</a><br>
  <a href="README-hi.md">🇮🇳 ヒンディー語</a> · <a href="README-zh.md">🇨🇳 中国語</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 韓国語</a> · <a href="README-pl.md">🇵🇱 ポーランド語</a> · <a href="README-ro.md">🇷🇴 ルーマニア語</a> · <a href="README-sv.md">🇸🇪 スウェーデン語</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Démo YouTube"></a>
</p>

<h4 align="center">📊 コード品質</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Security Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Reliability Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Maintainability Rating"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Vulnerabilities"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="Lines of Code"></a>
</p>

---

## 背景 — なぜ EurekAI？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）で生まれました（2026年3月）。テーマが必要で、きっかけは非常に身近なものでした：私は娘と定期的にテスト対策をしており、AIでそれをもっと楽しくインタラクティブにできないかと考えたのです。

目標は、写真、コピー＆ペーストしたテキスト、音声録音、ウェブ検索など「任意の入力」を受け取り、それを「復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど」に変換することです。すべてフランスの Mistral AI のモデルで駆動するため、フランス語話者の生徒に自然に適したソリューションになっています。

最初の[プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)はハッカソン中の48時間で作られた概念実証で、動作するものの機能は限定的でした。その後、EurekAI は本格的なプロジェクトに発展しました：穴埋め問題、演習のナビゲーション、ウェブスクレイピング、設定可能な保護者向けモデレーション、詳細なコードレビューなど。コード全体は主に [Claude Code](https://code.claude.com/) によって生成され、一部 [Codex](https://openai.com/codex/) や [Gemini CLI](https://geminicli.com/) も使われています。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | レッスンをインポート — 写真、PDF（Mistral OCR 経由）やテキストファイル（TXT, MD） |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 録音 — Voxtral STT が音声を文字起こし |
| 🌐 | **Web / URL** | URL を貼り付け（Readability + Lightpanda で直接スクレイピング）または検索語を入力（Agent Mistral web_search） |
| 📄 | **復習ノート** | 重要点、語彙、引用、逸話を含む構造化ノート |
| 🃏 | **フラッシュカード** | 出典参照付きのQ/Aカードで能動的な暗記（枚数設定可能） |
| ❓ | **選択式クイズ（QCM）** | 複数選択問題、エラーに対する適応的復習（数設定可能） |
| ✏️ | **穴埋め問題** | ヒントと寛容な検証付きの穴埋め練習 |
| 🎙️ | **ポッドキャスト** | 2声の短いポッドキャスト — デフォルトは Mistral の音声、カスタム音声も可（保護者など） |
| 🖼️ | **イラスト** | Agent Mistral による教育用画像生成 |
| 🗣️ | **音声クイズ** | 質問を読み上げ（カスタム音声可）、口頭回答、AI による検証 |
| 💬 | **AIチューター** | コースドキュメントに基づくコンテキストチャット、ツール呼び出し対応 |
| 🧠 | **自動ルーター** | `mistral-small-latest` に基づくルーターが内容を解析し、7種類のジェネレーターから組み合わせを提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイルごとに設定可能なモデレーション（カテゴリーカスタマイズ可）、保護者用PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェイスは9言語対応；AI生成はプロンプトで15言語制御可 |
| 🔊 | **読み上げ** | Mistral Voxtral TTS または ElevenLabs でノート・フラッシュカードを音声再生 |

---

## アーキテクチャ概観

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## モデル使用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 詳細 — 機能

### マルチモーダル入力

EurekAI は 4 種類のソースを受け入れ、プロファイルに応じてモデレーションを行います（子供・ティーン向けはデフォルトで有効）：

- **ファイルのインポート** — JPG、PNG、PDF は `mistral-ocr-latest` で処理（印刷テキスト、表、手書き）、TXT/MD のテキストファイルは直接インポート。
- **自由テキスト** — 任意のコンテンツを入力または貼り付け。保存前にモデレーションが有効なら検査。
- **音声入力** — ブラウザで音声を録音。`voxtral-mini-latest` が文字起こし。`language="fr"` のパラメータで認識を最適化。
- **Web / URL** — 1つまたは複数のURLを貼り付けて直接スクレイピング（JSページは Readability + Lightpanda）、またはキーワードで Agent Mistral によるウェブ検索。入力フィールドは両方を受け付け、URL とキーワードは自動で分離され、各結果が独立したソースになります。

### AIによるコンテンツ生成

生成される教材は7種類：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、重要点、語彙、引用、逸話 |
| **フラッシュカード** | `mistral-large-latest` | 出典参照付きのQ/Aカード（枚数設定可能） |
| **選択式クイズ（QCM）** | `mistral-large-latest` | 複数選択問題、解説、適応的復習（数設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、レーベンシュタインによる寛容な検証 |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2声のスクリプト → MP3 オーディオ |
| **イラスト** | Agent `mistral-large-latest` | ツール `image_generation` による教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS で質問 → STT で回答 → AI による検証 |

### チャットによるAIチューター

コースドキュメントに完全アクセス可能な会話型チューター：

- `mistral-large-latest` を使用
- ツール呼び出し：会話中に復習ノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースごとに50メッセージの履歴
- プロファイルで有効ならコンテンツのモデレーションあり

### 自動ルーター

ルーターはソースの内容を解析するために `mistral-small-latest` を使い、7つのジェネレーターから最も適切なものを提案します。インターフェイスはリアルタイムで進捗を表示：まず解析フェーズ、その後個別生成が行われ、キャンセルも可能。

### 適応学習

- **クイズ統計**：問題ごとの試行回数と正答率を追跡
- **クイズの復習**：弱点概念を狙った5〜10問の新規問題を生成
- **指示検出**：復習指示（「私は〜を知っていたら〜ができる」等）を検出し、対応するテキスト系ジェネレーター（ノート、フラッシュカード、クイズ、穴埋め）で優先処理

### セキュリティとペアレンタルコントロール

- **4つの年齢グループ**：子供（≤10歳）、ティーン（11-15）、学生（16-25）、大人（26+）
- **コンテンツモデレーション**：`mistral-moderation-latest` を使用、10カテゴリが利用可能で、子供/ティーン向けにはデフォルトで5カテゴリをブロック（`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`）。カテゴリはプロファイル設定でカスタマイズ可。
- **保護者PIN**：SHA-256 ハッシュ（15歳未満のプロファイルに必須）。本番運用ではソルト付きの遅延ハッシュ（Argon2id、bcrypt）を検討。
- **チャット制限**：16歳未満はデフォルトでAIチャット無効、保護者が有効化可能

### マルチプロファイルシステム

- 名前、年齢、アバター、言語設定を持つ複数プロファイル対応
- プロファイルに紐づくプロジェクトは `profileId`
- カスケード削除：プロファイルを削除すると関連プロジェクトもすべて削除

### 複数プロバイダのTTSとカスタム音声

- **Mistral Voxtral TTS**（デフォルト）：`voxtral-mini-tts-latest`、追加キー不要
- **ElevenLabs**（代替）：`eleven_v3`、自然な音声だが `ELEVENLABS_API_KEY` が必要
- プロバイダはアプリ設定で切替可能
- **カスタム音声**：保護者は Mistral Voices API を使って自身の音声サンプルから音声を作成し、ホスト/ゲストの役割に割り当て可能 — ポッドキャストや音声クイズが保護者の声で再生され、子供にとって没入感が向上
- 設定でフィルタリング可能な完全な Mistral 音声カタログあり
- 設定可能な2つの音声役割：**ホスト**（メインナレーター）と **ゲスト**（ポッドキャストの第2の声）

### 国際化

- インターフェイスは9言語で利用可能：fr, en, es, pt, it, nl, de, hi, ar
- AIプロンプトは15言語をサポート（fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv）
- 言語はプロファイルごとに設定可能

---

## 技術スタック

| レイヤー | 技術 | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブUI、TypeScript を Vite でコンパイル |
| **テンプレーティング** | vite-plugin-handlebars | partials による HTML 組成 |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、Agents、モデレーション |
| **TTS（デフォルト）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **TTS（代替）** | ElevenLabs SDK 2.x | `eleven_v3`、自然な音声 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Webスクレイピング** | Readability + linkedom | ページの主要コンテンツ抽出（Firefox Reader View 技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPA 用の超軽量ヘッドレス（Zig + V8） — フォールバックでスクレイピング |
| **Markdown** | Marked | チャット内の Markdown レンダリング |
| **ファイルアップロード** | Multer 2.x | multipart フォーム管理 |
| **オーディオ** | ffmpeg-static | オーディオセグメントの連結 |
| **テスト** | Vitest | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 依存のないストレージ |

---

## モデル参照

| モデル | 利用用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | ノート、フラッシュカード、ポッドキャスト、クイズ、穴埋め、チャット、音声クイズ検証、画像エージェント、ウェブ検索エージェント、指示検出 | マルチリンガル性能と指示追従が優れる |
| `mistral-ocr-latest` | ドキュメントのOCR | 印刷テキスト、表、手書き |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語STT、`language="fr"` と最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、読み上げ |
| `mistral-moderation-latest` | コンテンツモデレーション | 子供/ティーン向けに5カテゴリをブロック（+ ジェイルブレイク対策） |
| `mistral-small-latest` | 自動ルーター | ルーティング判定のための高速解析 |
| `eleven_v3` (ElevenLabs) | 音声合成（代替TTS） | 自然な音声、設定可能な代替手段 |

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
#   MISTRAL_API_KEY=votre_clé_ici           (requis)
#   ELEVENLABS_API_KEY=votre_clé_ici        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注意**：Mistral Voxtral TTS はデフォルトのプロバイダです — `MISTRAL_API_KEY` 以外に追加のキーは不要です。ElevenLabs は設定で利用できる代替 TTS プロバイダです。

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

## API 参照

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定取得 |
| `PUT` | `/api/config` | 設定の変更（モデル、音声、TTS プロバイダ） |
| `GET` | `/api/config/status` | API のステータス（Mistral、ElevenLabs、TTS） |
| `POST` | `/api/config/reset` | 設定をデフォルトにリセット |
| `GET` | `/api/config/voices` | Mistral TTS の音声一覧（オプション `?lang=fr`） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢別デフォルト |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを編集（< 15歳はPIN必須） |
| `DELETE` | `/api/profiles/:id` | プロファイルを削除（プロジェクトをカスケード削除） `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクト一覧取得（`?profileId=` オプション） |
| `POST` | `/api/projects` | プロジェクト作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクト詳細 |
| `PUT` | `/api/projects/:pid` | 名前変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクト削除 |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートファイルのインポート（JPG/PNG/PDF は OCR、TXT/MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声 STT（オーディオ multipart） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL スクレイピングまたはウェブ検索 `{query}` — ソースの配列を返す |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソースを削除 |
| `POST` | `/api/projects/:pid/moderate` | モデレーション `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出 | ### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習用シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 多肢選択クイズ (QCM) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋めテキスト |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応学習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング解析（起動するジェネレーターの計画） |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 5タイプ：summary、flashcards、quiz、fill-blank、podcast） |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。`quiz-review` はさらに `{generationId, weakQuestions}` を必要とします。

### 生成のCRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズ回答の送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋めテキストの回答送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 音声回答を検証する（audio + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTSでの音声再生（fiches/flashcards） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前を変更する `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除する |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得する |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信する `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去する |

---

## アーキテクチャ上の決定

| 決定事項 | 理由 |
|---|---|
| **Alpine.js を採用（React/Vueではなく）** | 最小限のフットプリント、ViteでコンパイルされたTypeScriptによる軽量なリアクティビティ。スピードが重要なハッカソンに最適。 |
| **JSONファイルでの永続化** | 依存関係ゼロ、即起動可能。データベースの設定不要で、そのまますぐに開始可能。 |
| **Vite + Handlebars** | 両者の長所を活かす：開発向けの高速HMR、コード整理のためのHTMLパーシャル、TailwindのJIT。 |
| **プロンプトの集中管理** | すべてのAIプロンプトは `prompts.ts` に集約 — 言語や年齢層ごとに繰り返し改善、テスト、調整が容易。 |
| **マルチ生成システム** | 各生成は独立したオブジェクトで固有のIDを持つ — コースごとに複数のシートやクイズ等を持てる。 |
| **年齢別に調整されたプロンプト** | 語彙、複雑さ、トーンが異なる4つの年齢グループ — 同じ内容でも学習者に応じて異なる教え方を実現。 |
| **エージェントベースの機能** | 画像生成やウェブ検索は一時的なMistralエージェントを使用 — 自動クリーンアップを伴う明確なライフサイクル。 |
| **URLのスマートスクレイピング** | 単一フィールドでURLとキーワードの混在を受け付ける — URLはReadability（静的ページ）でスクレイプし、フォールバックでLightpanda（JS/SPAページ）を使用。キーワードはMistralエージェントのweb_searchをトリガー。各結果は独立したソースを生成。 |
| **マルチプロバイダTTS** | デフォルトはMistral Voxtral TTS（追加キー不要）、代替はElevenLabs — 再起動なしで設定可能。 |

---

## クレジット & 感謝

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）＋Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 代替音声合成エンジン（`eleven_v3`）
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティファーストなCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサ
- **[Readability](https://github.com/mozilla/readability)** — ウェブコンテンツ抽出（Firefox Reader View技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング向け超軽量ヘッドレスブラウザ

Mistral AI Worldwide Hackathon（2026年3月）で発案、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/) といったAIにより全体が開発されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**この文書は gpt-5-mini モデルを使用して fr バージョンから ja 言語に翻訳されました。翻訳プロセスの詳細については https://gitlab.com/jls42/ai-powered-markdown-translator をご覧ください。**

