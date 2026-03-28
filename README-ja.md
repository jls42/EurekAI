<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変換します — AI 搭載。</strong>
</p>

<p align="center">
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-Worldwide%20Hackathon-FF7000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" alt="Mistral AI ハッカソン"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-6%20Modèles-FF7000?style=for-the-badge" alt="Mistral AI"></a>
  <a href="https://elevenlabs.io"><img src="https://img.shields.io/badge/ElevenLabs-TTS%20alternatif-000000?style=for-the-badge" alt="ElevenLabs"></a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI">▶️ YouTubeでデモを見る</a> · <a href="README-en.md">🇬🇧 英語で読む</a>
</p>

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

## ストーリー — なぜ EurekAI？

**EurekAI** は [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）中に生まれました（2026年3月）。テーマが必要で、発想は非常に具体的なところから来ました：私は娘の試験対策をよく手伝っており、AIを使えばそれをもっと楽しくインタラクティブにできるはずだと考えたのです。

目標：写真（教科書の写真）、コピーしたテキスト、音声録音、ウェブ検索など「どんな入力」でも受け取り、これを「復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラスト」などに変換すること。すべてフランスの Mistral AI のモデルで動作するため、フランス語話者の生徒に自然に適したソリューションになっています。

すべてのコード行はハッカソン期間中に書かれました。使用している API とオープンソースライブラリはすべてハッカソンの規則に従って使用しています。

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **OCR アップロード** | 教科書やノートの写真を撮影 — Mistral OCR が内容を抽出 |
| 📝 | **テキスト入力** | 任意のテキストを入力または貼り付け |
| 🎤 | **音声入力** | 録音してアップロード — Voxtral STT が音声をテキスト化 |
| 🌐 | **ウェブ検索** | 質問を入力 — 一時的な Mistral エージェントがウェブで回答を検索 |
| 📄 | **復習ノート** | 重要ポイント、語彙、引用、逸話を含む構造化されたノート |
| 🃏 | **フラッシュカード** | 5〜50枚のQ/Aカード、出典参照付きでアクティブリコールに対応 |
| ❓ | **選択式クイズ（QCM）** | 5〜50問の選択式問題、誤答に基づく適応復習 |
| ✏️ | **穴埋め問題** | ヒントと許容的な検証を備えた穴埋め形式の演習 |
| 🎙️ | **ポッドキャスト** | 2音声のミニポッドキャストを Mistral Voxtral TTS で音声化 |
| 🖼️ | **イラスト** | Mistral エージェントが生成する教育用画像 |
| 🗣️ | **音声クイズ** | 問題を音声で読み上げ、口頭で回答、AIが回答を検証 |
| 💬 | **AI チューター** | コース資料に基づくコンテキスト付きチャット、ツール呼び出し可 |
| 🧠 | **スマートルーター** | AIがコンテンツを解析し、7つの生成器の中から最適なものを推薦 |
| 🔒 | **保護者コントロール** | 年齢によるモデレーション、親用PIN、チャット制限 |
| 🌍 | **多言語** | インターフェースとAI出力はフランス語と英語に完全対応 |
| 🔊 | **読み上げ** | Mistral Voxtral TTS または ElevenLabs によるノート/フラッシュカードの音声再生 |

---

## アーキテクチャ概要

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Upload OCR<br/><i>mistral-ocr-latest</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Recherche web<br/><i>Agent Mistral</i>"]
    end

    subgraph "🛡️ Sécurité (async, si activée par profil)"
        MOD["Modération<br/><i>mistral-moderation-2603</i>"]
        CON["Détection de consigne<br/><i>mistral-large-latest</i>"]
    end

    subgraph "🧠 Générateurs IA"
        SUM["📄 Fiche"]
        FC["🃏 Flashcards"]
        QZ["❓ Quiz QCM"]
        FB["✏️ Textes à trous"]
        POD["🎙️ Podcast"]
        IMG["🖼️ Image"]
        QV["🗣️ Quiz vocal"]
        CHAT["💬 Tuteur IA"]
    end

    subgraph "📤 Sortie"
        TTS["🔊 TTS<br/><i>Mistral Voxtral / ElevenLabs</i>"]
        JSON["📦 Persistance JSON"]
        UI["🖥️ Interface interactive"]
    end

    OCR & TXT & MIC & WEB --> MOD & CON
    MOD & CON -.->|gardes| SUM & FC & QZ & FB & POD & IMG & QV & CHAT
    POD --> TTS
    QV --> TTS
    SUM & FC -->|lecture à voix haute| TTS
    SUM & FC & QZ & FB & POD & IMG & QV & CHAT --> JSON
    JSON --> UI
    TTS --> UI
```

---

## モデル使用マップ

```mermaid
flowchart LR
    subgraph "Modèles Mistral"
        ML["mistral-large-latest"]
        MO["mistral-ocr-latest"]
        MV["voxtral-mini-latest"]
        MMod["mistral-moderation-2603"]
        MS["mistral-small-latest"]
        MTTS["voxtral-mini-tts-latest"]
    end

    subgraph "Tâches"
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Textes à trous / Vérification quiz / Consigne"]
        T2["OCR — documents, tableaux, écriture manuscrite"]
        T3["Reconnaissance vocale — STT optimisé FR"]
        T4["Modération de contenu — filtrage par âge"]
        T5["Routeur intelligent — analyse du contenu"]
        T6["Génération d'image — Agent + outil image_generation"]
        T7["Recherche web — Agent + outil web_search"]
        T8["Synthèse vocale — podcasts, quiz vocal, lecture à voix haute"]
    end

    ML --> T1
    MO --> T2
    MV --> T3
    MMod --> T4
    MS --> T5
    ML --> T6
    ML --> T7
    MTTS --> T8
```

---

## ユーザーフロー

```mermaid
sequenceDiagram
    actor Élève as Élève
    participant App as EurekAI
    participant AI as Mistral AI
    participant TTS as TTS (Voxtral / ElevenLabs)

    Élève->>App: Créer un profil (nom, âge, avatar)
    Élève->>App: Créer un cours
    Élève->>App: Ajouter des sources (photo / texte / voix / web)
    App->>AI: Modérer le contenu (si activé par profil)
    App->>AI: Détecter les consignes de révision
    Élève->>App: Générer du matériel d'étude
    App->>AI: Fiche / Flashcards / Quiz / Textes à trous / Podcast
    AI-->>App: Réponses JSON structurées
    App->>TTS: Convertir le script podcast en audio
    TTS-->>App: Fichier audio MP3
    Élève->>App: Écouter une fiche ou des flashcards
    App->>TTS: Synthèse TTS du contenu
    TTS-->>App: Audio MP3
    Élève->>App: Passer le quiz
    App->>AI: Réviser les erreurs → nouvelles questions
    Élève->>App: Passer le quiz vocal
    App->>TTS: TTS lit la question à voix haute
    Élève->>App: Répondre à voix haute
    App->>AI: Transcription STT + vérification IA
    Élève->>App: Discuter avec le tuteur IA
    App->>AI: Chat contextuel avec appel d'outils
```

---

## 詳細 — 機能

### マルチモーダル入力

EurekAI は 4 種類のソースを受け入れ、プロファイルに応じてモデレートされます（子ども・ティーン向けはデフォルトで有効）：

- **OCR アップロード** — JPG、PNG、PDF を `mistral-ocr-latest` で処理。印刷テキスト、表、手書き文字を扱います。
- **テキスト自由入力** — 任意の内容を入力または貼り付け。保存前にモデレーションが有効ならチェックされます。
- **音声入力** — ブラウザで音声を録音。`voxtral-mini-latest` が文字起こしします。`language="fr"` のパラメータで認識精度を最適化します。
- **ウェブ検索** — クエリを入力。一時的な Mistral エージェントが `web_search` を使って結果を取得し要約します。

### AI コンテンツ生成

生成される学習教材は7種類：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、10–25の重要ポイント、語彙、引用、逸話 |
| **フラッシュカード** | `mistral-large-latest` | 5–50枚のQ/Aカード、出典参照付きでアクティブリコール向け |
| **選択式クイズ（QCM）** | `mistral-large-latest` | 5–50問、各問4つの選択肢、解説、適応復習 |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、許容的な検証（Levenshtein） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2音声のスクリプト → MP3 オーディオ |
| **イラスト** | Agent `mistral-large-latest` | ツール `image_generation` による教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTSで問題を読み上げ → STTで回答 → AIが検証 |

### チャットによる AI チューター

コース資料へフルアクセスできる会話型チューター：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中にノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースごとに最大50メッセージの履歴
- プロファイルでモデレーションが有効ならコンテンツをチェック

### スマート自動ルーター

ルーターは `mistral-small-latest` を使ってソースの内容を解析し、7つの生成器の中でどれが最適かを推薦します — 生徒が手動で選ぶ必要がなくなるように。インターフェースはリアルタイムで進行状況を表示：まず解析フェーズ、その後個別生成を開始し、キャンセルも可能。

### 適応学習

- **クイズ統計**：問題ごとの試行回数と正答率を追跡
- **クイズ復習**：弱点の概念を狙った5–10問の新しい問題を生成
- **指示検出**：復習の指示（「〜ができれば理解している」等）を検出し、すべての生成器で優先的に扱う

### セキュリティと保護者コントロール

- **4つの年齢グループ**：子ども（≤10歳）、ティーン（11–15）、学生（16–25）、成人（26+）
- **コンテンツモデレーション**：`mistral-moderation-2603` により、子ども/ティーンには5カテゴリをブロック（性的、ヘイト、暴力、自傷、脱獄）、学生/成人には制限なし
- **保護者用PIN**：SHA-256 ハッシュ、15歳未満のプロファイルには必須
- **チャット制限**：16歳未満はデフォルトで AI チャット無効、保護者が有効化可能

### マルチプロファイルシステム

- 名前、年齢、アバター、言語設定を持つ複数プロファイルに対応
- プロファイルに紐づくプロジェクトは `profileId` を使用
- カスケード削除：プロファイルを削除すると関連するすべてのプロジェクトが削除される

### 複数 TTS プロバイダー

- **Mistral Voxtral TTS**（デフォルト）：`voxtral-mini-tts-latest`、追加キー不要
- **ElevenLabs**（代替）：`eleven_v3`、自然な音声、`ELEVENLABS_API_KEY` が必要
- プロバイダーはアプリ設定で切り替え可能

### 国際化

- インターフェースはフランス語と英語に完全対応
- AI プロンプトは現在2言語（FR、EN）をサポート、将来的に15言語（es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv）に対応可能な設計
- プロファイルごとに言語を設定可能

---

## 技術スタック

| 層 | 技術 | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 5.7 | サーバーと型安全 |
| **バックエンド** | Express 4.21 | REST API |
| **開発サーバー** | Vite 7.3 + tsx | HMR、Handlebars partials、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.2 + Alpine.js 3.15 | リアクティブな UI、TypeScript は Vite でコンパイル |
| **テンプレート** | vite-plugin-handlebars | partials による HTML 構成 |
| **AI** | Mistral AI SDK 2.1 | チャット、OCR、STT、TTS、Agents、モデレーション |
| **TTS（デフォルト）** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合された音声合成 |
| **TTS（代替）** | ElevenLabs SDK 2.36 | `eleven_v3`、自然な音声 |
| **アイコン** | Lucide 0.575 | SVG アイコンライブラリ |
| **Markdown** | Marked 17 | チャット内の Markdown レンダリング |
| **ファイルアップロード** | Multer 1.4 | マルチパートフォーム処理 |
| **オーディオ** | ffmpeg-static | オーディオセグメントの連結 |
| **テスト** | Vitest 4 | 単体テスト — カバレッジは SonarCloud で測定 |
| **永続化** | JSON ファイル | 依存なしのストレージ |

---

## モデルリファレンス

| モデル | 使用箇所 | 理由 |
|---|---|---|
| `mistral-large-latest` | ノート、フラッシュカード、ポッドキャスト、クイズ、穴埋め、チャット、音声クイズの検証、画像エージェント、ウェブ検索エージェント、指示検出 | 多言語対応と指示追従が最良 |
| `mistral-ocr-latest` | ドキュメントの OCR | 印刷文字、表、手書き対応 |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語 STT、`language="fr"` と組み合わせて最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、読み上げ |
| `mistral-moderation-2603` | コンテンツモデレーション | 子ども/ティーン向けに5カテゴリをブロック |
| `mistral-small-latest` | スマートルーター | ルーティング判断のための高速解析 |
| `eleven_v3` (ElevenLabs) | 音声合成（代替 TTS） | 自然な声、設定で切替可能 |

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

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **注**：Mistral Voxtral TTS がデフォルトプロバイダーです — `MISTRAL_API_KEY` 以上の追加キーは不要です。ElevenLabs は設定で選べる代替 TTS プロバイダーです。

---

## プロジェクト構成

```
server.ts                 — Point d'entrée Express, monte les routes + config
config.ts                 — Config runtime (modèles, voix, TTS provider), persistée dans output/config.json
store.ts                  — ProjectStore : CRUD projets/sources/générations, persistance JSON
profiles.ts               — ProfileStore : gestion des profils, hachage PIN
types.ts                  — Types TypeScript : Source, Generation (7 types), QuizStats, Profile
prompts.ts                — Tous les prompts IA centralisés (system + user templates, FR/EN)

generators/
  ocr.ts                  — Upload + OCR via Mistral (JPG, PNG, PDF)
  summary.ts              — Génération de fiche de révision (JSON structuré)
  flashcards.ts           — Flashcards Q/R (5-50, configurable)
  quiz.ts                 — Quiz QCM (5-50 questions, configurable) + révision adaptative
  fill-blank.ts           — Exercices à trous avec validation tolérante
  podcast.ts              — Script podcast 2 voix
  quiz-vocal.ts           — Quiz vocal : questions TTS + réponses STT + vérification IA
  image.ts                — Génération d'image via Agent Mistral (outil image_generation)
  chat.ts                 — Tuteur IA par chat avec appel d'outils
  router.ts               — Routeur automatique intelligent (contenu → générateurs recommandés)
  consigne.ts             — Détection de consignes de révision
  tts-provider.ts         — Dispatch TTS multi-provider (Mistral Voxtral / ElevenLabs)
  tts.ts                  — Génération audio podcast (concaténation de segments)
  stt.ts                  — Voxtral STT (audio → texte)
  websearch.ts            — Agent Mistral avec outil web_search
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Upload OCR, texte libre, voix STT, recherche web, modération
  generate.ts             — Endpoints de génération (7 types + auto + route)
  generations.ts          — Tentatives de quiz/fill-blank, réponses vocales, lecture à voix haute
  chat.ts                 — Chat IA avec appel d'outils

helpers/
  index.ts                — safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)

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
    fr.ts                 — Traductions françaises
    en.ts                 — Traductions anglaises
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
| `PUT` | `/api/config` | 設定を変更（モデル、声、TTS プロバイダー） |
| `GET` | `/api/config/status` | API（Mistral、ElevenLabs、TTS）のステータス |
| `POST` | `/api/config/reset` | デフォルト設定にリセット |
| `GET` | `/api/config/voices` | Mistral TTS のボイス一覧（オプション `?lang=fr`） |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示 |
| `POST` | `/api/profiles` | プロファイル作成 |
| `PUT` | `/api/profiles/:id` | プロファイル編集（15歳未満はPIN必須） |
| `DELETE` | `/api/profiles/:id` | プロファイル削除 + プロジェクトのカスケード削除 |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクト一覧 |
| `POST` | `/api/projects` | プロジェクト作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクト詳細 |
| `PUT` | `/api/projects/:pid` | 名前変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクト削除 |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | OCR アップロード（マルチパート） |
| `POST` | `/api/projects/:pid/sources/text` | テキスト自由入力 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声 STT（オーディオマルチパート） |
| `POST` | `/api/projects/:pid/sources/websearch` | ウェブ検索 `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソース削除 |
| `POST` | `/api/projects/:pid/moderate` | モデレーション `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示の検出 |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習ノート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式クイズ（QCM） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング解析（起動すべきジェネレーターの計画） |
| `POST` | `/api/projects/:pid/generate/auto` | 自動バックエンド生成（ルーティング + 5 種類：summary, flashcards, quiz, fill-blank, podcast） |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。

### CRUD 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答を検証（オーディオ + questionIndex） |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS での読み上げ（ノート/フラッシュカード） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定事項

| 決定 | 理由 |
|---|---|
| **Alpine.js を選択（React/Vue ではなく）** | フットプリントが小さく、TypeScript と Vite による軽量なリアクティビティ。ハッカソンのようにスピードが重要な場面で最適。 |
| **JSON ファイルによる永続化** | 依存をゼロにし、即起動可能。データベース設定が不要で、すぐ始められる。 |
| **Vite + Handlebars** | 開発には HMR の速さ、コード整理には HTML partials。Tailwind の JIT と相性が良い。 | **プロンプトの集中管理** | すべてのAIプロンプトが `prompts.ts` に — 言語／年齢層ごとに反復、テスト、適応が容易。 |
| **マルチ世代システム** | 各世代は固有のIDを持つ独立したオブジェクト — コースごとに複数の学習シートやクイズなどを可能にします。 |
| **年齢に合わせたプロンプト** | 語彙、複雑さ、トーンが異なる4つの年齢グループ — 同じコンテンツが学習者に応じて異なる教え方になります。 |
| **エージェントベースの機能** | 画像生成とウェブ検索は一時的なMistralエージェントを使用 — ライフサイクルが分離され、自動クリーンアップされます。 |
| **マルチプロバイダTTS** | デフォルトはMistral Voxtral TTS（追加のキー不要）、代替としてElevenLabs — 再起動なしで設定可能。 |

---

## クレジットと謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）＋ Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 代替の音声合成エンジン（`eleven_v3`）
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー

Mistral AI Worldwide Hackathon（2026年3月）で丁寧に構築されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**この文書は gpt-5-mini モデルを使用して fr 版から ja 言語へ翻訳されました。翻訳プロセスの詳細については https://gitlab.com/jls42/ai-powered-markdown-translator をご覧ください。**

