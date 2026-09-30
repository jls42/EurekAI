<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAIロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験へ — <a href="https://mistral.ai">Mistral AI</a>搭載。</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="品質ゲート"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="セキュリティ評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="信頼性評価"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="保守性評価"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="カバレッジ"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="脆弱性"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="コードの問題"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="コード行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacyバッジ"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 誕生の経緯 — なぜEurekAIなのか？

**EurekAI**は、[Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）の開催期間中である2026年3月に誕生しました。テーマが必要だったとき、ごく身近な体験からアイデアが浮かびました。私は普段から娘のテスト勉強を手伝っており、AIを使えば、それをもっと楽しくインタラクティブにできるはずだと考えたのです。

目標は、授業内容の写真、コピー＆ペーストしたテキスト、音声録音、ウェブ検索など、**あらゆる入力**を、**復習ノート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど**へ変換することです。すべてフランス企業Mistral AIのモデルを利用しているため、EurekAIはフランス語圏の学習者にも自然に適したソリューションとなっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)は、ハッカソン期間中の48時間でMistralのサービスを利用した概念実証として開発されました。すでに動作していましたが、機能は限定的でした。その後、EurekAIは本格的なプロジェクトへと発展し、穴埋め問題、演習内のナビゲーション、ウェブスクレイピング、設定可能な保護者向けモデレーション、徹底的なコードレビューなど、多数の機能が追加されました。コード全体はAIによって生成されており、主に[Claude Code](https://code.claude.com/)を使用し、一部は[Codex](https://openai.com/codex/)と[Gemini CLI](https://geminicli.com/)によるものです。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAIのガイドツアー：ソース、復習ノート、クイズ、フラッシュカード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成、カードごとの推定コストとプロジェクト総額、「自動 — マジック！」ボタン | ![ソース](docs/screenshots/sources.webp)<br>**ソース** — 写真・PDF・テキスト・音声・ウェブのインポート、ワンクリック生成、指示の検出 |

インポートした各ソースには、[OCR信頼度スコア、モデレーション結果、推定コスト](docs/screenshots/sources-list.webp)が表示されます。

### 各コンポーネントの動作

| | |
|---|---|
| ![復習ノート](docs/screenshots/notes.gif)<br>**復習ノート** — 要点、語彙、出典付き引用、セクションごとの音声読み上げ | ![クイズ](docs/screenshots/quiz.gif)<br>**選択式クイズ** — 各問題に正解は1つのみ、解説付きの即時フィードバック、段階的なナビゲーション |
| ![フラッシュカード](docs/screenshots/flashcards.gif)<br>**フラッシュカード** — カードを裏返してから「分かった／分からなかった」で自己評価 | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — 必要に応じたヒント、表記揺れを許容する判定 |
| ![ディクテーション](docs/screenshots/dictation.gif)<br>**ディクテーション** — 音声で読み上げられた単語を、一文字ずつ厳密に採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 問題を音声で読み上げ、マイクで回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2人の話者による短いポッドキャスト、対話形式の台本も閲覧可能 | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — Agentが生成する教育用画像 |
| ![AIチューター](docs/screenshots/chat.gif)<br>**AIチューター** — 授業資料に基づくチャット、解説付き回答、クイズやフラッシュカードの生成も可能 | |

### はじめに

| | |
|---|---|
| ![プロフィールの選択](docs/screenshots/login.gif)<br>**プロフィールの選択** — 子どもごとに専用スペース、アバター、言語を設定 | ![プロフィールの作成](docs/screenshots/profile-create.gif)<br>**プロフィールの作成** — 年齢、アバター、15歳未満向けの保護者PIN |
| ![コースの作成](docs/screenshots/course.gif)<br>**コースの作成** — 授業ごとにプロジェクトを作成し、すぐにソースを追加可能 | ![設定](docs/screenshots/settings.gif)<br>**設定** — APIステータス、料金表示付きのAIモデル選択 |

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | 授業資料をインポートできます。写真、PDF（平均化された信頼度スコアと`high`／`medium`／`low`の段階表示を備えたMistral OCR経由）、またはテキストファイル（TXT、MD）に対応しています。アップロードセッションでは、ファイルごとの再試行と個別の進行状況表示を利用できます |
| 📝 | **テキスト入力** | あらゆるテキストを直接入力または貼り付けできます |
| 🎤 | **音声入力** | 音声を録音すると、Voxtral STTが文字起こしします |
| 🌐 | **ウェブ／URL** | URLを貼り付けて直接スクレイピング（Readability + Lightpanda）するか、検索語を入力して検索できます（Mistralのweb_search Agent） |
| 📄 | **復習ノート** | 要点、語彙、引用、豆知識を含む構造化されたノート |
| 🃏 | **フラッシュカード** | インタラクティブなQ&Aカード、対話形式の音声読み上げ |
| ❓ | **選択式クイズ** | 4つの選択肢から正解を1つ選ぶ問題と、間違いに応じた適応型復習（問題数を設定可能） |
| ✏️ | **穴埋め問題** | ヒントと表記揺れを許容する判定を備えた補完問題 |
| 🔤 | **ディクテーション** | インポートしたリストの単語を音声（Voxtral TTS）で読み上げ、キーボードで入力し、説明付きのスペル規則とともに一文字ずつ厳密に採点 |
| 🎙️ | **ポッドキャスト** | 2人の話者による短い音声ポッドキャスト — デフォルトのMistral音声またはカスタム音声（保護者の声も使用可能！） |
| 🖼️ | **イラスト** | Mistral Agentが生成する教育用画像 |
| 🗣️ | **音声クイズ** | 問題を音声で読み上げ（カスタム音声も使用可能）、口頭で回答し、AIが判定 |
| 💬 | **AIチューター** | 授業資料を参照する、ツール呼び出し対応のコンテキストチャット |
| 🧠 | **自動ルーター** | `mistral-small-latest`を使用するルーターがコンテンツを分析し、利用可能な8種類からジェネレーターの組み合わせを提案 |
| 🔒 | **保護者による管理** | プロフィールごとに設定可能なモデレーション（カテゴリをカスタマイズ可能）、保護者PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは9言語に対応し、プロンプトを通じて15言語でAI生成を制御可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTSを使用して、復習ノートやフラッシュカード（質問と回答の対話形式）を再生 |
| 💶 | **APIコストの追跡** | 生成およびソースごとの費用をユーロで明確に推定（トークン数／文字数／ページ数／音声秒数）。カードごとのバッジとプロジェクト総額をダッシュボードに表示 |
| 🎨 | **プロフィール別テーマ** | 各プロフィールで`dark`または`light`のテーマを選択可能 — プロフィールに保存され、プロフィールを切り替えるたびに再適用 |

---

## アーキテクチャ概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャ概要" width="800" />
</p>

---

## モデル利用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AIモデルとタスクの対応関係" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="学習者の学習プロセス" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAIは4種類のソースに対応し、プロフィールに応じてモデレーションを行います（子どもおよびティーンのプロフィールではデフォルトで有効）。

- **ファイルのインポート** — JPG、PNG、PDFファイルをMistral OCRで処理します。設定では、印刷文、表、手書き文字に対応する**デフォルトのOCR 4.1（`mistral-ocr-4-1`）**と、**任意で選べるOCR 3（`mistral-ocr-2512`）**（より安価で、コストは約半分。手書き文字の読み取り性能はより良好）を選択できます。テキストファイル（TXT、MD）は直接インポートされます。複数ファイルのアップロードには**アップロードセッション**方式を採用しています。ファイルごとの進行状況を表示し、失敗したファイルだけを他のファイルの再送信なしで再試行でき、完了後はセッションを閉じられます。OCRでは平均化された**信頼度スコア**が提供されます（`average`、`[0,1]`内で範囲を制限し、Mistralが返す`averagePageConfidenceScore`から算出）。UIでは`high`／`medium`／`low`の段階別バッジ（しきい値は約0.9／約0.7）として表示され、スキャン品質が低い場合に処理を止めず警告します。OCRのためにMistralへ送信された文書のコピーは、処理が失敗した場合も含め、処理完了直後に削除されます。
- **自由入力テキスト** — あらゆるコンテンツを入力または貼り付けられます。モデレーションが有効な場合は、保存前に検査されます。
- **音声入力** — ブラウザ内で音声を録音できます。`voxtral-mini-latest`によって文字起こしされます。`language="fr"`パラメーターによって認識性能を最適化します。
- **ウェブ／URL** — 1つまたは複数のURLを貼り付けてコンテンツを直接スクレイピング（Readability + LightpandaでJavaScriptページにも対応）するか、検索語を入力してMistral Agentによるウェブ検索を実行できます。1つの入力欄で両方に対応し、URLと検索語は自動的に分離され、各結果が独立したソースとして作成されます。

### AIコンテンツ生成

8種類の学習教材を生成できます。

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、要点、語彙、引用、豆知識 |
| **フラッシュカード** | `mistral-large-latest` | ソース参照付きのQ&Aカード（枚数を設定可能） |
| **選択式クイズ** | `mistral-large-latest` | 4つの選択肢から正解を1つ選ぶ問題、解説、適応型復習（問題数を設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒントと表記揺れを許容する判定（Levenshtein）を備えた補完問題 |
| **ディクテーション** | `mistral-large-latest` + Voxtral TTS | 重要単語を音声で読み上げ（1単語につきMP3ファイル1つ）→ キーボード入力 → 厳密な採点（アクセント記号の欠落も誤りとして扱う）と規則の解説 |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2人の話者による台本 → MP3音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation`ツールを使用した教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTSによる問題の読み上げ → STTによる回答の文字起こし → AIによる判定 |

### チャット形式のAIチューター

授業資料へ完全にアクセスできる対話型チューターです。

- `mistral-large-latest`を使用
- **ツール呼び出し**：会話中に復習ノート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースごとに50件のメッセージ履歴
- プロフィールでモデレーションが有効な場合：メッセージを検査し、報告済みのソース、検査に失敗したソース、未検査のソースをコンテキストとツールから除外します（検査に失敗したソースまたは未検査のソースについては、まず検査を最大5秒間再試行します）

### 自動ルーター

ルーターは`mistral-small-latest`を使用してソースの内容を分析し、利用可能な8種類から最適なジェネレーターを提案します。インターフェースには進行状況がリアルタイムで表示されます。最初に分析フェーズが実行され、その後、個別の生成処理へ進みます。各処理はキャンセル可能です。

### 適応型学習

- **クイズ統計**：問題ごとの解答回数と正答率を追跡
- **クイズ復習**：元のクイズのソースを基に、理解が弱い概念を対象とした新しい問題を5～10問生成（モデレーションの保護対象も同じソース）
- **指示の検出**：復習に関する指示（「次のことができれば授業内容を理解している……」）を検出し、対応するテキスト系ジェネレーター（復習ノート、フラッシュカード、クイズ、穴埋め問題）で優先します。モデレーションが有効な場合、検出処理はソースの検査完了を待ち、安全と判定されたソースだけを読み取ります。指示には元のソース一覧が保持されます。そのうち1つでも報告対象になると指示は表示も適用もされず、1つでも削除されると指示も削除されます。処理コストも集計されます

### セキュリティと保護者による管理

- **4つの年齢層**：子ども（10歳以下）、ティーン（11～15歳）、学生（16～25歳）、成人（26歳以上）
- **コンテンツモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）は11カテゴリに対応し、新規の子ども・ティーン向けプロフィールでは6カテゴリ（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`）をデフォルトでブロックします。`criminal`は、歴史を含む50件の授業で誤検出が一度もなかったことを確認後に追加されました。カテゴリはプロフィールごとに設定画面からカスタマイズできます。Moderation 2では、従来の「危険なコンテンツ」カテゴリが`dangerous`と`criminal`に分割されました（既存のプロフィールは自動的に移行され、ブロック対象カテゴリはインポート済みのソースにも適用されます）。安全性を優先する設計により、モデルの応答からブロック対象カテゴリを確認できない場合、コンテンツは拒否されます（「モデレーションを利用できません」）。モデレーションが有効な場合、生成処理とチャットの両方で、報告済みのソース、検査に失敗したソース、検査中のソースが除外されます。一度も検査されていないソース（モデレーションが無効なときにインポートされたもの、またはプロフィールに関連付けられた旧プロジェクト）は、使用前に検査されます。再起動によって中断されたモデレーションは、サーバーキーが利用可能であれば起動時に再開されます。利用できない場合は、エラーになったモデレーションと同様に、プロジェクトを開いたとき、または次回の生成時に再開されます。「再検査」ボタンから手動で検査を再実行できます。モデレーションが有効な場合、ソースが安全と判断されるまで、その内容（プレビュー、テキスト、元の文書）は子どもに表示されません。保護者はPINを使用して、1回の閲覧に限り表示できます。音声クイズの口頭回答は、正誤判定の前にモデレーションされます。日付付きIDは`helpers/moderation-model.ts`に固定されています。非推奨の別名`-latest`はAPIに表示されなくなりました。
- **保護者PIN**：SHA-256ハッシュを使用し、15歳未満のプロフィールでは必須です。誤入力はIPアドレスごとに15分間で最大10回までです（429 `rate_limited`）。本番環境へのデプロイでは、ソルトを使用する低速ハッシュ（Argon2id、bcrypt）を採用してください。
- **サーバーデータ**：`/output`で公開されるのはプロジェクトのメディア（音声、画像、インポートしたファイル）のみです。`profiles.json`、`config.json`、`projects.json`、`project.json`が配信されることはありません
- **チャット制限**：16歳未満ではAIチャットがデフォルトで無効になっており、保護者が有効化できます

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を持つ複数のプロフィール
- **プロフィール別音声**（`Profile.mistralVoices?: { host?, guest? }` — 各役割は任意）— 子どもごとにポッドキャスト／音声クイズ用の音声ペアを設定可能
- **プロフィール別テーマ**（`Profile.theme: 'dark' | 'light'`）— プロフィール切り替え時に自動で変更され、バックエンドに保存
- プロジェクトは`profileId`を介してプロフィールに関連付けられます。プロフィールのない旧プロジェクトは、最初に開いたプロフィールへ関連付けられ、そのプロフィールに応じてモデレーションされます
- 連鎖削除：プロフィールを削除すると、そのプロフィールのすべてのプロジェクトも削除されます
### API コストの追跡

課金対象となる各 Mistral 呼び出し（chat、OCR、STT、TTS、agents）には、指示の検出と音声クイズの口頭回答を含め、ユーザーに**透明性のある**ユーロ建ての見積もりを提供するための計測が組み込まれています。無料のモデレーションは計上されません。agents のツール料金も含まれます。Web 検索 1 回あたり 0.03 ドル、生成画像 1 枚あたり 0.10 ドル（Mistral の料金）に加え、これらのツールが生成する tokens が対象となり、見積もりでは agent のモデルの入力料金として計算されます。

- **信頼できる唯一の情報源**：`helpers/pricing.ts` — モデルの prefix ごとの `MODEL_PRICING`（例：`mistral-large` → 入力 0.5 €/M tokens、出力 1.5 €/M tokens）、Mistral ドキュメントの URLs を含む `PRICING_SOURCES` により定期的に再スクレイピング
- **対応単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— `helpers/cost-calc.ts` により変換を制御
- **計測チェーン**：`helpers/tracked-client.ts`（Mistral クライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP レスポンスへの注入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごとのコストバッジ（`cost-badge-src.html`）、dashboard の累積合計（`Project.totalCost`）
- **Endpoints**：`/generate/*` と `/sources/*` のレスポンスは、返されるオブジェクト（`Generation` / `Source`）に `estimatedCost`、`usage`、`costBreakdown` を追加します。`POST /generate/route` はルーティングのみのコストを示す `costDelta: number` フィールドを追加します。`POST /detect-consigne`（`{consigne, costDelta}`）と口頭回答の検証も、それぞれの `costDelta` を返します。`GET /projects/:pid` は、`totalCost`（`costLog[]` から算出した合計）と完全な履歴を追加したプロジェクトを返します

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`、100% Mistral による音声合成で、追加のキーは不要
- **カスタム音声**：保護者は Mistral Voices API を使用して音声サンプルから独自の音声を作成し、ホスト／ゲストの役割に割り当てられます。これにより podcast と音声クイズが保護者の声で読み上げられ、子どもにとってさらに没入感のある体験になります
- 設定可能な音声役割は 2 つ：**ホスト**（メインナレーター）と**ゲスト**（podcast の 2 番目の音声）
- 言語で絞り込み可能な Mistral 音声の完全なカタログを設定画面で利用可能

### 国際化

- インターフェースは 9 言語で利用可能：fr、en、es、pt、it、nl、de、hi、ar
- AI prompts は 15 言語に対応（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- プロフィールごとに言語を設定可能

---

## 技術スタック

| レイヤー | テクノロジー | 役割 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **Backend** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebars partials、proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、Vite でコンパイルされる TypeScript |
| **Templating** | vite-plugin-handlebars | partials による HTML 構成 |
| **AI** | Mistral AI SDK 2.x | Chat、OCR、STT、TTS、Agents、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVG アイコンライブラリ |
| **Web スクレイピング** | Readability + linkedom | Web ページの主要コンテンツを抽出（Firefox Reader View 技術） |
| **Headless browser** | Lightpanda | JS/SPA ページ向けの超軽量 headless browser（Zig + V8）— スクレイピングの fallback |
| **Markdown** | Marked | chat 内での Markdown レンダリング |
| **ファイル送信** | Multer 2.x | multipart フォームの処理 |
| **Audio** | ffmpeg-static | 音声セグメントの連結 |
| **テスト** | Vitest | 単体テスト — SonarCloud でカバレッジを測定 |
| **永続化** | JSON ファイル | 依存関係のないストレージ |

---

## モデル一覧

| モデル | 用途 | 採用理由 |
|---|---|---|
| `mistral-large-latest` | 学習シート、Flashcards、Podcast、Quiz、穴埋め問題、Chat、音声クイズの検証、画像 Agent、Web Search Agent、指示検出 | 多言語性能と指示追従性に最も優れる |
| `mistral-ocr-4-1`（OCR 4.1、デフォルト） | ドキュメントの OCR | 印刷テキスト、表、手書き文字（$4 / 1000 ページ） |
| `mistral-ocr-2512`（OCR 3、オプション） | ドキュメントの OCR | 設定画面で選択可能で、より安価（$2 / 1000 ページ）、手書き文字の読み取りにより優れる |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語 STT、`language="fr"` で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | Podcasts、音声クイズ、音声読み上げ |
| `mistral-moderation-2603` | コンテンツモデレーション | 子ども／青少年向けに 6 カテゴリをブロック（`jailbreaking` を含む） |
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

> **注記**：Mistral Voxtral TTS が唯一の TTS provider です。`MISTRAL_API_KEY` 以外の追加キーは不要です。

> **ユーザーが入力する API キー**：`MISTRAL_API_KEY` は現在**任意**です。存在しない場合でも app は起動し、各ユーザーにインターフェース上で**自身の Mistral キー**を入力するよう求めます。キーは**ブラウザに保存**され（安全なコンテキストでは Web Crypto + IndexedDB により暗号化）、リクエストごとに送信されます。**サーバーに永続化されることはありません**。優先順位：プロフィールのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（env）。`EUREKAI_REQUIRE_USER_KEY=true` を設定すると、各ユーザーにキーの提供を強制します（env のキーは事前読み込みにのみ使用されます）。

> **ローカル HTTPS（タブレット／LAN）**：`localhost` はすでに安全なコンテキストです。LAN（タブレット）からアクセスする場合は、ローカル証明書を生成して HTTPS を有効にします。これにより、ブラウザは保存するキーを暗号化でき、キーは転送中も暗号化されます：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral API キー（chat、OCR、STT、TTS Voxtral、agents、モデレーション）。存在しない場合、ユーザーが app 内でキーを入力します（ブラウザに保存され、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AI リクエストでの `MISTRAL_API_KEY` への fallback を無効化します（各ユーザーが必ず自身のキーを提供する必要があります）。公開インスタンスで有用です |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLS のキー／証明書へのパス（`scripts/gen-cert.sh` を参照）→ Express と Vite が HTTPS で配信します（LAN／タブレット向けの安全なコンテキスト） |
| `PORT` | 任意 | `3000` | Express backend の HTTP ポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合、Express が `dist/` から frontend を配信します（それ以外は `public/`） |
| `SONAR_TOKEN` | CI では任意 | — | GitHub Actions の SonarCloud workflow のみで使用 |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git hooks（Husky）**：`pre-commit` は `scripts/pre-commit-fast.sh`（競合、大容量ファイル、shellcheck）、`lint-staged`、`npm test` を順番に実行します。`pre-push` は、まずブロッキングチェック `npm audit` を実行し（推移的依存関係を含め、`critical` レベルの脆弱性を持つ依存関係が 1 つでもあるとブロックします。`scripts/audit-verdict.mjs` を参照）、その後 `npm run security` を実行します。いずれかの手順が失敗すると、各 hook は commit／push をブロックします。

**外部ツール（アプリケーションの起動には任意ですが、`pretest` と `npm run security` には必須）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test` は `pretest` で失敗し（lizard がないため）、`npm run security` も失敗します（opengrep がないため）。その場合、Husky hooks は commit／push をブロックします。

---

## コンテナによるデプロイ

イメージは **GitHub Container Registry** で公開されています：

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

> **`:U`**：ボリュームの権限を自動調整する rootless Podman の flag です。

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
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, tryParseJson, retryTurns, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  generation-media.ts     — Noms uniques des médias (MP3/PNG) et suppression avec leur génération
  media-ledger.ts         — Médias écrits pendant une génération, supprimés si elle échoue ou est annulée
  keyed-lock.ts           — File d'attente par clé (OCR sérialisé par contenu)
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
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours), statut effectif, garde de la consigne
  moderation-profile.ts   — Profil propriétaire du projet et catégories actives (source unique des routes)
  source-moderation.ts    — Modérations en vol et reprise (démarrage, génération, chat, « Revérifier »)
  input-moderation.ts     — Modération d'un texte saisi ou dicté (texte libre, recherche web, réponse orale)
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
  rate-limit.ts           — Rate-limiters Express (authLimiter, pinLimiter, aiLimiter / aiPathLimiter, generalLimiter), 429 `rate_limited`
  request-validation.ts   — Validation de lang / ageGroup sur toutes les routes IA (400 invalid_input)
  output-static.ts        — Liste blanche du montage statique /output (médias des projets seulement)
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
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
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

> **コードに貢献する AI agents 向け**：詳細なアーキテクチャのコンテキスト、必須ルール（エラーコード、コスト追跡、メタ語を含まない prompts。つまり、モデルが出力へそのまま転載してしまうため、ドキュメントの種類などを表す修飾語を使用しないこと）、および既知の注意点（Lizard CCN、Opengrep、Codacy/Semgrep migration）については、[`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## API リファレンス

### Config
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定の変更（モデル、音声、TTS モデル） |
| `GET` | `/api/config/status` | APIs の状態：`mistral`（Mistral キーが設定済み）、`ttsAvailable`（`mistral` の alias、Mistral Voxtral が唯一の TTS provider） |
| `POST` | `/api/config/reset` | デフォルト設定へリセット |
| `GET` | `/api/config/voices` | Mistral TTS 音声の一覧（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリと年齢別のデフォルト |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力した Mistral キーを検証 — 常に 200 `{status}`（`ok`／`invalid`／`quota`／`network`／`missing`）、env への fallback なし |

### プロフィール
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロフィールを一覧表示 |
| `POST` | `/api/profiles` | プロフィールを作成 |
| `PUT` | `/api/profiles/:id` | プロフィールを変更（15 歳未満は PIN が必要。不正な PIN が 15 分以内に 10 回入力されると 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | プロフィールと関連プロジェクトを連鎖削除 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=` は任意） |
| `POST` | `/api/projects` | プロジェクト `{name, profileId}` を作成 |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細。`?profileId=` は、プロフィールのないプロジェクトを、それを開いたプロフィールに関連付けます |
| `PUT` | `/api/projects/:pid` | `{name}` の名前を変更 |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成状態の遷移（`completed`／`failed`／`cancelled`）を通知するリアルタイム SSE stream（`event: generation`）+ keep-alive heartbeat |

### ソース
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart ファイルをインポート（JPG／PNG／PDF は OCR、TXT／MD は直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由記述テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 音声（multipart audio） |
| `POST` | `/api/projects/:pid/sources/websearch` | URL スクレイピングまたは Web 検索 `{query}` — ソースの配列を返します。すべてのアドレスが拒否された場合（内部ネットワーク）は 422 `url_blocked`、ソースを 1 件も作成できなかった場合は 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 保留中またはエラー状態のモデレーション `{sourceIds?}` を再開（1 回の呼び出しにつき最大 10 件、待機時間 ≤ 10 秒）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソース、そのインポート済みファイル、およびそれに依存する指示を削除 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | `{text}` をモデレート |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出（検証済みソースのみ）→ `{consigne, costDelta}` |

### 生成
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習用学習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | 多肢選択 Quiz（4 つの選択肢、正解は 1 つのみ） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | ディクテーション（単語 + 例文 + 規則、単語ごとに 1 つの TTS audio。auto-router からも提案） |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Quiz `{generationId, weakQuestions}` で間違えた問題に特化した復習シート — Quiz 画面の補習ボタンにより `quiz-review` と並列で呼び出されます |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動する生成機能の計画）— `{plan, costDelta}`（ルーティングのみのコスト）を返します |
| `POST` | `/api/projects/:pid/generate/auto` | backend の自動生成（ルーティング + 8 種類：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。並列実行 — 同時リクエスト数 8 以上の rate-limit を持つ Mistral tier を前提とします。それ以外では、複数の 429 が `failedSteps` に返される可能性があります。 |

すべての生成 route は `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。不明な `ageGroup` または有効な言語コードではない `lang`（想定値：`fr`、`pt-BR` など）の場合、AI 呼び出しの前に 400 `invalid_input` を返します。`quiz-review` と `remediation-summary` では、さらに `{generationId, weakQuestions}` が必要で、元の Quiz のソースを対象とします。

### 生成データの CRUD
| メソッド | Endpoint | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Quiz の回答 `{answers}` を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答 `{answers}` を送信 |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | ディクテーションの回答 `{answers}` を送信（サーバー側で厳密に採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答を検証（audio + questionIndex）。口頭回答は検証前にモデレートされます（拒否：400 `quiz.answerBlocked`）。コストは `costDelta` で返されます |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS による音声読み上げ（学習シート／flashcards） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 進行中の生成をキャンセル（pending をキャンセルする唯一の経路） |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` の名前を変更 |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成データとそのメディア（audio、image）を削除 |

### Chat
| メソッド | Endpoint | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Chat 履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージ `{message, lang, ageGroup, useConsigne?}` を送信 |
| `DELETE` | `/api/projects/:pid/chat` | Chat 履歴を消去 |

---

## アーキテクチャ上の決定

| 決定 | 根拠 |
|---|---|
| **React/Vue ではなく Alpine.js** | フットプリントが最小限で、Vite によりコンパイルされる TypeScript を使った軽量なリアクティビティを実現します。速度が重要な hackathon に最適です。 |
| **JSON ファイルによる永続化** | 依存関係がなく、即座に起動できます。設定すべき database はなく、起動すればすぐに使えます。 |
| **Vite + Handlebars** | 両方の長所を活用します。開発向けの高速 HMR、コード整理のための HTML partials、Tailwind JIT を利用できます。 |
| **一元管理された prompts** | すべての AI prompts を `prompts.ts` に集約し、言語／年齢層ごとの反復改善、テスト、適応を容易にします。 |
| **複数生成システム** | 各生成結果は独自の ID を持つ独立したオブジェクトです。各コースに複数の学習シートや Quiz などを作成できます。 |
| **年齢に応じた prompts** | 語彙、複雑さ、語調が異なる 4 つの年齢層を用意し、同じコンテンツでも学習者に応じて異なる方法で教えます。 |
| **Agents ベースの機能** | 画像生成と Web 検索では一時的な Mistral Agents を使用し、自動クリーンアップによる適切なライフサイクルを実現します。 |
| **インテリジェントな URL スクレイピング** | 1 つのフィールドで URLs とキーワードを混在して受け付けます。URLs は Readability（静的ページ）でスクレイピングし、Lightpanda（JS/SPA ページ）を fallback として使用します。キーワードは Mistral Agent の web_search を起動します。各結果から独立したソースが作成されます。 |
| **100% Mistral の TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外の追加キーは不要）— コスト計算チェーンと、言語別の音声解決に統合された音声合成です。 |

---
## クレジット＆謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）＋Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティファーストCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — Webコンテンツ抽出（Firefox Reader View技術）
- **[Lightpanda](https://lightpanda.io)** — JS／SPAページのスクレイピング向け超軽量ヘッドレスブラウザー
- **[Luciole](https://luciole-vision.com)** — 弱視者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロフィールの「読みやすさ」オプション）

Mistral AI Worldwide Hackathon（2026年3月）期間中に始動し、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/)を用いてAIにより全面的に開発されました。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権（C）2026 Julien LS

**gpt-5.6-solを使用してフランス語から日本語に翻訳された記事。**
