<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI ロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変える — <a href="https://mistral.ai">Mistral AI</a> が実現します。</strong>
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

## 誕生の経緯 — なぜ EurekAI なのか？

**EurekAI** は、[Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）で生まれました。取り組むテーマを探していたとき、ごく身近な経験からアイデアが浮かびました。私は普段、娘のテスト勉強を手伝っていて、人工知能を使えば、もっと楽しくインタラクティブにできるはずだと考えたのです。

目標は、**どんな入力でも** — 授業の写真、コピーして貼り付けた文章、音声録音、ウェブ検索 — **復習ノート、暗記カード、クイズ、ポッドキャスト、穴埋め問題、イラストなど**に変換することです。すべてフランス企業 Mistral AI のモデルで動作するため、EurekAI はフランス語圏の生徒に自然に適したソリューションとなっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)は、ハッカソン中の48時間で、Mistral のサービスを利用した概念実証として開発しました。すでに動作していましたが、機能は限られていました。その後、EurekAI は本格的なプロジェクトに成長しました。穴埋め問題、問題間の移動、ウェブスクレイピング、設定可能な保護者向けモデレーション、詳細なコードレビューなど、多くの機能が加わっています。コードはすべて人工知能で生成しています。主に [Claude Code](https://code.claude.com/) を使用し、[Codex](https://openai.com/codex/) と [Gemini CLI](https://geminicli.com/) による貢献も一部含まれています。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI のガイドツアー：資料、復習ノート、クイズ、暗記カード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成結果、カードごとおよびプロジェクト全体の推定費用、「自動 — 魔法！」ボタン | ![資料](docs/screenshots/sources.webp)<br>**資料** — 写真/PDF/テキスト/音声/ウェブの取り込み、ワンクリック生成、学習指示の検出 |

取り込んだ各資料には、[OCR の信頼度スコア、モデレーション結果、推定費用](docs/screenshots/sources-list.webp)が表示されます。

### 各機能の動作

| | |
|---|---|
| ![復習ノート](docs/screenshots/notes.gif)<br>**復習ノート** — 要点、語彙、出典付きの引用、セクションごとの音声読み上げ | ![選択式クイズ](docs/screenshots/quiz.gif)<br>**選択式クイズ** — 各問題の正解は1つ、解説付きの即時フィードバック、順を追った問題間の移動 |
| ![暗記カード](docs/screenshots/flashcards.gif)<br>**暗記カード** — カードを裏返した後、「知っていた / 知らなかった」で自己評価 | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — 必要に応じたヒント、表記の揺れを許容する採点 |
| ![書き取り](docs/screenshots/dictation.gif)<br>**書き取り** — 単語を音声で出題、文字ごとの厳密な採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 問題を読み上げ、マイクで回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2人の声によるミニポッドキャスト、会話形式の台本を閲覧可能 | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — エージェントが生成する学習用画像 |
| ![人工知能チューター](docs/screenshots/chat.gif)<br>**人工知能チューター** — 授業資料に基づくチャット、解説付きの回答、クイズや暗記カードの生成が可能 | |

### はじめに

| | |
|---|---|
| ![プロフィールの選択](docs/screenshots/login.gif)<br>**プロフィールの選択** — 子どもごとに専用のスペース、アバター、言語を設定 | ![プロフィールの作成](docs/screenshots/profile-create.gif)<br>**プロフィールの作成** — 年齢、アバター、15歳未満向けの保護者用暗証番号 |
| ![授業の作成](docs/screenshots/course.gif)<br>**授業の作成** — レッスンごとにプロジェクトを作り、資料を追加 | ![設定](docs/screenshots/settings.gif)<br>**設定** — API の状態、料金を確認しながら人工知能モデルを選択 |

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルの取り込み** | 授業資料を取り込み — 写真、PDF（Mistral OCR による平均信頼度スコア付き、段階は `high`/`medium`/`low`）、テキストファイル（TXT、MD）。アップロードセッションではファイルごとの再試行と個別の進捗表示に対応 |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 音声を録音すると、Voxtral STT が文字起こし |
| 🌐 | **ウェブ / URL** | URL を貼り付け（Readability + Lightpanda で直接スクレイピング）、または検索語を入力（Mistral エージェントの web_search） |
| 📄 | **復習ノート** | 要点、語彙、引用、豆知識を含む構造化されたノート |
| 🃏 | **暗記カード** | インタラクティブな質問・回答カード、会話形式の音声読み上げ |
| ❓ | **選択式クイズ** | 正解が1つの4択問題と、間違いに応じた復習（問題数は設定可能） |
| ✏️ | **穴埋め問題** | ヒント付きの穴埋め練習、表記の揺れを許容する採点 |
| 🔤 | **書き取り** | 取り込んだ単語リストから音声で出題（Voxtral TTS）、キーボードで回答、つづりの規則を解説しながら文字ごとに厳密に採点 |
| 🎙️ | **ポッドキャスト** | 2人の声による音声ミニポッドキャスト — 標準の Mistral 音声またはカスタム音声（保護者の声も！） |
| 🖼️ | **イラスト** | Mistral エージェントが生成する学習用画像 |
| 🗣️ | **音声クイズ** | 問題の読み上げ（カスタム音声も使用可能）、口頭で回答、人工知能による判定 |
| 💬 | **人工知能チューター** | 授業資料の内容に基づくチャット、ツール呼び出しに対応 |
| 🧠 | **自動ルーター** | `mistral-small-latest` を使用するルーターが内容を分析し、利用可能な8種類から生成機能の組み合わせを提案 |
| 🔁 | **授業間での処理の継続** | 別の授業を開いても、取り込み、自動生成、マイク録音、チャット、ウェブ検索、読み上げは元の授業で継続。他の授業で処理が完了すると、授業名付きの通知を表示 |
| 🔒 | **保護者による管理** | プロフィールごとのモデレーション設定（カテゴリーをカスタマイズ可能）、保護者用暗証番号、チャットの制限 |
| 🌍 | **多言語対応** | インターフェースは9言語に対応。プロンプトを通じて15言語での人工知能生成を指定可能 |
| 🔊 | **読み上げ** | Mistral Voxtral TTS で復習ノートと暗記カード（質問・回答の対話）を音声で再生 |
| 💶 | **API 費用の追跡** | 各生成と資料の費用を € で明確に推定（トークン / 文字 / ページ / 音声秒数）。カードごとのバッジとプロジェクトごとの合計をダッシュボードに表示 |
| 🎨 | **プロフィールごとのテーマ** | プロフィールごとに `dark` または `light` のテーマを選択 — プロフィールに保存され、切り替えるたびに再適用 |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャの概要" width="800" />
</p>

---

## モデルの用途マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="人工知能モデルとタスクの対応関係" width="800" />
</p>

---

## ユーザーの利用の流れ

<p align="center">
  <img src="public/assets/user-journey.webp" alt="生徒の学習の流れ" width="800" />
</p>

---

## 詳細 — 機能

### マルチモーダル入力

EurekAI は4種類の資料に対応し、プロフィールに応じてモデレーションを行います（子ども・青少年のプロフィールでは標準で有効）：

- **ファイルの取り込み** — JPG、PNG、PDF ファイルを Mistral OCR で処理します。標準は **OCR 4.1**（`mistral-ocr-4-1`）、設定では **OCR 3**（`mistral-ocr-2512`）も選択可能です（より安価で費用は約½、手書き文字の認識に優れています）。印刷された文章、表、手書き文字に対応し、テキストファイル（TXT、MD）は直接取り込みます。複数ファイルのアップロードには**アップロードセッション**を使用します。ファイルごとの進捗表示、他のファイルを再送せずに失敗したファイルだけを再試行、完了したセッションの表示を閉じる操作に対応します。OCR は平均**信頼度スコア**（`average`、`[0,1]` の範囲に制限、Mistral が返す `averagePageConfidenceScore` から算出）を提供し、画面上では `high` / `medium` / `low` の段階別バッジとして表示します（しきい値は約0.9 / 約0.7）。スキャン品質が低い場合は警告を表示しますが、処理は妨げません。OCR のために Mistral に送信した文書のコピーは、失敗した場合も含め、処理が終わるとすぐに削除されます。
- **自由入力テキスト** — 任意の内容を入力または貼り付けます。モデレーションが有効な場合、保存前に確認します。
- **音声入力** — ブラウザーで音声を録音します。標準では **Voxtral Mini Transcribe 2**（`voxtral-mini-2602`）で文字起こしし、設定で **Voxtral Mini Transcribe 3** と **Voxtral Small Transcribe 3**（Mistral のプレビュー版）も選択できます。認識を最適化するため、インターフェースの言語をモデルに渡します（`language`）。
- **ウェブ / URL** — 1つ以上の URL を貼り付けて内容を直接スクレイピング（Readability + JavaScript ページ用の Lightpanda）するか、キーワードを入力して Mistral エージェントでウェブ検索します。1つの入力欄で両方に対応し、URL とキーワードを自動で振り分け、結果ごとに独立した資料を作成します。

### 人工知能によるコンテンツ生成

8種類の学習教材を生成します：

| 生成機能 | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、要点、語彙、引用、豆知識 |
| **暗記カード** | `mistral-large-latest` | 出典への参照付き質問・回答カード（枚数は設定可能） |
| **選択式クイズ** | `mistral-large-latest` | 正解が1つの4択問題、解説、理解度に応じた復習（問題数は設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、表記の揺れを許容する採点（Levenshtein） |
| **書き取り** | `mistral-large-latest` + Voxtral TTS | 重要語句を音声で出題（1 MP3/単語） → キーボード入力 → 規則の解説付きの厳密な採点（アクセント記号の付け忘れも誤りとして扱います） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2人の声による台本 → MP3 音声 |
| **イラスト** | エージェント `mistral-large-latest` | `image_generation` ツールによる学習用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS による出題 → STT による回答の認識 → 人工知能による判定 |

### チャット型の人工知能チューター

授業資料に全面的にアクセスできる対話型チューターです：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中に復習ノート、暗記カード、クイズ、穴埋め問題を生成可能
- 授業ごとに50件のメッセージ履歴を保持
- プロフィールでモデレーションが有効な場合：メッセージを確認し、問題ありと判定された資料、確認に失敗した資料、未確認の資料を文脈とツールの対象から除外します（確認に失敗した資料や未確認の資料については、まず確認を再試行し、最大5秒待機します）

### 自動ルーター

ルーターは `mistral-small-latest` を使って資料の内容を分析し、利用可能な8種類の中から最適な生成機能を提案します。画面には進捗がリアルタイムで表示され、最初に分析段階、その後に個々の生成処理が表示されます。キャンセルも可能です。

1つのタブで同時に実行する時間のかかる生成処理は最大3件です（すべての自動生成の各工程、個別に開始した生成、復習用ノート）。それ以降は順番を待ち、実行中の生成が完了するのを待たずに授業を開けます。「すべてキャンセル」は、別の授業に移動した後でも、その授業の自動生成で待機中の工程も停止し、通知は1件だけ表示します。

### 理解度に応じた学習

- **クイズの統計**：問題ごとの回答回数と正答率を追跡
- **クイズの復習**：元のクイズの資料から、苦手な概念を対象とした新しい問題を5-10問生成します（モデレーションによる保護も同じ資料に適用されます）
- **学習指示の検出**：復習の指示（「〜ができれば、この授業の内容を理解している」）を検出し、対応するテキスト生成機能（復習ノート、暗記カード、クイズ、穴埋め問題）で優先します。モデレーションが有効な場合、検出は資料の確認を待ち、安全と判断された資料だけを読み取ります。指示には元の資料の一覧を保持します。そのうち1つでも問題ありと判定された場合、指示は表示も適用もされず、1つでも削除された場合は指示自体を消去します。この処理の費用も計上します
### セキュリティと保護者による管理

- **4つの年齢グループ**：子ども（≤10歳）、青少年（11-15歳）、学生（16-25歳）、成人（26歳以上）
- **コンテンツのモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）では11のカテゴリを利用でき、新しい子ども・青少年プロフィールでは既定で6つがブロックされます（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`。`criminal`は、歴史を含む50の授業で測定し、誤検知が一度もなかったことを確認した後に追加）。設定でプロフィールごとにカテゴリを変更できます。Moderation 2では従来の「危険なコンテンツ」カテゴリが`dangerous`と`criminal`に分割されました（既存のプロフィールは自動的に移行され、ブロック対象のカテゴリはインポート済みのソースにも適用されます）。既定で安全を優先し、モデルの応答からブロック対象カテゴリを確認できない場合は、コンテンツを拒否します（「モデレーションを利用できません」）。モデレーションが有効な場合、生成とチャットの両方で、問題が報告されたソース、確認に失敗したソース、確認中のソースを除外します。一度も確認されていないソース（モデレーションが無効なときにインポートされたものや、プロフィールに関連付けられた旧プロジェクトのもの）は、使用前に確認されます。再起動で中断したモデレーションは、サーバーのキーで実行できる場合、起動時に再開されます。それ以外の場合は、エラーになったモデレーションと同様に、プロジェクトを開いたとき、または次回の生成時に再開されます。「再確認」ボタンで、必要に応じて確認をやり直せます。モデレーションが有効な場合、ソースが安全と判断されるまで、その内容（プレビュー、テキスト、元の文書）は子どもに表示されません。保護者は自分のPINを使って、1回の閲覧に限り表示できます。音声クイズの口頭回答は、正誤判定の前にモデレーションされます。日付付きのIDを`helpers/moderation-model.ts`で固定しています。非推奨となったエイリアス`-latest`は、APIの一覧に表示されなくなりました。
- **保護者用PIN**：SHA-256ハッシュを使用し、15歳未満のプロフィールでは必須です。誤ったコードの入力は、IPアドレスごとに15分間で最大10回までです（429 `rate_limited`）。本番環境へのデプロイでは、ソルト付きの低速ハッシュ（Argon2id、bcrypt）を使用してください。
- **サーバーのデータ**：`/output`で公開されるのはプロジェクトのメディア（音声、画像、インポートしたファイル）のみです。`profiles.json`、`config.json`、`projects.json`、`project.json`は一切配信されません
- **チャットの制限**：16歳未満ではAIチャットが既定で無効になり、保護者が有効にできます

### 複数プロフィールの仕組み

- 名前、年齢、アバター、言語設定を持つ複数のプロフィール
- **プロフィールごとの音声**（`Profile.mistralVoices?: { host?, guest? }` — 各役割は任意）— 子どもごとに、ポッドキャスト・音声クイズ用の音声の組み合わせを設定できます
- **プロフィールごとのテーマ**（`Profile.theme: 'dark' | 'light'`）— プロフィールの切り替え時に自動で切り替わり、バックエンド側に保存されます
- プロジェクトは`profileId`でプロフィールに関連付けられます。プロフィールのない旧プロジェクトは、最初に開いたプロフィールに関連付けられ、そのプロフィールに従ってモデレーションされます
- 連鎖削除：プロフィールを削除すると、そのプロフィールの全プロジェクトが削除されます

### APIコストの追跡

課金対象となるMistralへの各呼び出し（チャット、OCR、STT、TTS、エージェント）には、指示の検出と音声クイズの口頭回答も含めて計測が組み込まれ、ユーザーに**透明性のある**ユーロ建ての見積額を提供します。無料のモデレーションは計上しません。エージェントのツール料金も含まれます。ウェブ検索1回あたり0,03 $、画像生成1枚あたり0,10 $（Mistralの料金）に加え、これらのツールが生成したトークンを、エージェントのモデルの入力料金で見積もります。

- **正しい情報の参照元**：`helpers/pricing.ts` — モデルの接頭辞ごとの`MODEL_PRICING`（例：`mistral-large` → 入力0.5 €/Mトークン、出力1.5 €/Mトークン）、定期的な再スクレイピング用にMistralのドキュメントURLを含む`PRICING_SOURCES`
- **対応する単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— `helpers/cost-calc.ts`に基づいて換算
- **計測の処理経路**：`helpers/tracked-client.ts`（Mistralクライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP応答に挿入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごとのコストバッジ（`cost-badge-src.html`）、ダッシュボードの累計額（`Project.totalCost`）
- **エンドポイント**：`/generate/*`と`/sources/*`の応答では、返されるオブジェクト（`Generation` / `Source`）に`estimatedCost`、`usage`、`costBreakdown`を付加します。`POST /generate/route`は、ルーティングのみのコストを示す`costDelta: number`フィールドを追加します。`POST /detect-consigne`（`{consigne, costDelta}`）と口頭回答の正誤判定も、それぞれの`costDelta`を返します。`GET /projects/:pid`は、`totalCost`（`costLog[]`から計算した合計）を付加したプロジェクトと、完全な履歴を返します

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS**：既定は**Voxtral TTS**（`voxtral-mini-tts-2603`）で、設定から**Voxtral TTS 3**（`voxtral-mini-tts-3-0`、Mistralのプレビュー版、より多くの言語のネイティブ音声）も選べます。音声合成は100% Mistralで、追加のキーは不要です。選択したモデルが対応する音声のみが表示されます。Voxtral TTSでは、Voxtral 3で追加された音声は使用できません
- **カスタム音声**：保護者はMistral Voices APIを使い、音声サンプルから自分の音声を作成して、ホスト・ゲストの役割に割り当てられます。ポッドキャストや音声クイズが保護者の声で読み上げられ、子どもはさらに没入して楽しめます
- 設定可能な2つの音声の役割：**ホスト**（主なナレーター）と**ゲスト**（ポッドキャストの2人目の声）
- 設定でMistral音声の全カタログを利用でき、言語で絞り込めます
- 再生（学習シート、ポッドキャスト、書き取りの単語）は、その画面を離れると一時停止し、停止した位置から再開します
- フラッシュカードの読み上げ音声は、初回の再生時に作成され、その生成結果に保存されます。戻るたびに再作成されたり、再課金されたりすることはありません
- ソースのマーカー（`[Source N]`）は読み上げません

### 国際化

- インターフェースは9言語に対応：フランス語、英語、スペイン語、ポルトガル語、イタリア語、オランダ語、ドイツ語、ヒンディー語、アラビア語
- AIプロンプトは15言語に対応（フランス語、英語、スペイン語、ドイツ語、イタリア語、ポルトガル語、オランダ語、日本語、中国語、韓国語、アラビア語、ヒンディー語、ポーランド語、ルーマニア語、スウェーデン語）
- プロフィールごとに言語を設定可能

---

## 技術スタック

| レイヤー | 技術 | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebarsのパーシャル、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、ViteでコンパイルするTypeScript |
| **テンプレート処理** | vite-plugin-handlebars | パーシャルによるHTMLの構成 |
| **AI** | Mistral AI SDK | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603`（Voxtral TTS 3も選択可能）、組み込みの音声合成 |
| **アイコン** | Lucide 1.x | SVGアイコンライブラリ |
| **ウェブスクレイピング** | Readability + linkedom | ウェブページの主要コンテンツの抽出（Firefox Reader Viewの技術） |
| **ヘッドレスブラウザー** | Lightpanda | JS/SPAページ向けの超軽量ヘッドレスブラウザー（Zig + V8）— スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内のMarkdown表示 |
| **ファイルのアップロード** | Multer 2.x | マルチパートフォームの処理 |
| **音声** | ffmpeg-static | 音声セグメントの連結 |
| **テスト** | Vitest | 単体テスト — SonarCloudでカバレッジを測定 |
| **永続化** | JSONファイル | 依存関係のないストレージ |

---

## モデル一覧

| モデル | 用途 | 採用理由 |
|---|---|---|
| `mistral-large-latest` | 学習シート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズの正誤判定、画像エージェント、ウェブ検索エージェント、指示の検出 | 優れた多言語対応と指示への追従 |
| `mistral-ocr-4-1`（OCR 4.1、既定） | 文書のOCR | 印刷されたテキスト、表、手書き文字（$4 / 1000ページ） |
| `mistral-ocr-2512`（OCR 3、選択可能） | 文書のOCR | 設定で選択可能、低価格（$2 / 1000ページ）、手書き文字の認識に優れる |
| `voxtral-mini-2602`（Voxtral Mini Transcribe 2、既定） | 音声認識（STT） | 音声入力と音声クイズの口頭回答（$0.003 / min） |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0`（Transcribe 3、選択可能、プレビュー版） | 音声認識（STT） | 設定で選択可能（$0.0035 / minおよび$0.004 / min） |
| `voxtral-mini-tts-2603`（Voxtral TTS、既定） | 音声合成（TTS） | ポッドキャスト、音声クイズ、書き取り、読み上げ（$16 / M文字） |
| `voxtral-mini-tts-3-0`（Voxtral TTS 3、選択可能、プレビュー版） | 音声合成（TTS） | 設定で選択可能、より多くの言語のネイティブ音声（$13 / M文字） |
| `mistral-moderation-2603` | コンテンツのモデレーション | 子ども・青少年向けに6カテゴリをブロック（`jailbreaking`を含む） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のための高速なコンテンツ解析 |

スマートフォンでは、設定の各選択欄の下に、選択したモデルの完全なラベル（価格、「推奨」または「プレビュー版」）を表示します。閉じたメニューでは途中で切れていた情報を確認できます。

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

> **注**：TTSプロバイダーはMistral Voxtral TTSのみです。`MISTRAL_API_KEY`以外に追加のキーは必要ありません。

> **ユーザーが入力するAPIキー**：`MISTRAL_API_KEY`は**任意**になりました。設定されていなくてもアプリは起動し、各ユーザーにインターフェースから**自分のMistralキー**を入力するよう案内します。キーは**ブラウザーに保存**され（安全なコンテキストではWeb Crypto + IndexedDBで暗号化）、リクエストごとに送信されます。**サーバーには一切永続保存されません**。優先順位は、プロフィールのキー > ブラウザー全体のキー > `MISTRAL_API_KEY`（環境変数）です。`EUREKAI_REQUIRE_USER_KEY=true`を設定すると、各ユーザーによるキーの入力が必須になります（環境変数のキーは事前読み込みのみに使用されます）。

> **ローカルHTTPS（タブレット/LAN）**：`localhost`は既に安全なコンテキストです。LAN経由でアクセスする場合（タブレット）は、ローカル証明書を生成してHTTPSを有効にしてください。ブラウザーで保存するキーを暗号化でき、転送中のキーも暗号化されます。
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 環境変数

| 変数 | 必須 | 既定値 | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral APIキー（チャット、OCR、STT、Voxtral TTS、エージェント、モデレーション）。未設定の場合、ユーザーがアプリ内でキーを入力します（ブラウザーに保存し、サーバーには保存しません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AIリクエストで`MISTRAL_API_KEY`へのフォールバックを無効化（各ユーザーは必ず自分のキーを入力）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLSキー・証明書のパス（`scripts/gen-cert.sh`を参照）→ ExpressとViteがHTTPSで配信（LAN・タブレットでの安全なコンテキスト） |
| `PORT` | 任意 | `3000` | ExpressバックエンドのHTTPポート |
| `NODE_ENV` | 任意 | `development` | `production`の場合 → Expressが`dist/`からフロントエンドを配信（それ以外は`public/`） |
| `SONAR_TOKEN` | CIで任意 | — | GitHub ActionsのSonarCloudワークフローのみで使用 |

### テスト、コード品質、開発への貢献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Gitフック（Husky）**：`pre-commit`は、`scripts/pre-commit-fast.sh`（競合、大きなファイル、shellcheck）、`lint-staged`、`npm test`の順に実行します。`pre-push`は、まず処理を阻止する`npm audit`の検査を実行し（間接依存を含むいずれかの依存関係に`critical`レベルの脆弱性があれば阻止。`scripts/audit-verdict.mjs`を参照）、次に`npm run security`を実行します。各フックは、いずれかの手順が失敗するとコミット・プッシュを阻止します。

**外部ツール（アプリの起動には任意、`pretest`と`npm run security`には必須）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test`は`pretest`で失敗し（lizardがないため）、`npm run security`も失敗します（opengrepがないため）。その結果、huskyフックがコミット・プッシュを阻止します。

---

## コンテナーでのデプロイ

イメージは**GitHub Container Registry**で公開されています。

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

> **`:U`**：ボリュームの権限を自動調整する、ルートレスPodmanのフラグです。

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
  stt-models.ts           — Source de vérité sélection transcription (Mini Transcribe 2 défaut / Transcribe 3 option) + normalizeSttModel
  tts-models.ts           — Source de vérité sélection synthèse vocale (Voxtral TTS défaut / TTS 3 option) + compatibilité des voix
  tts-text.ts             — Texte envoyé au TTS : marqueurs de sources et crochets retirés (Voxtral les lit ou avale le mot)
  source-markers.ts       — Regex des marqueurs `[Source N]` des fiches (pastilles côté navigateur, texte lu côté serveur)
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
    view-media.ts         — Pause du son au changement de vue (position gardée)
    profiles.ts           — Logique du sélecteur de profils
    projects.ts           — CRUD des cours
    sources.ts            — Gestionnaires d'upload de sources
    generate.ts           — Déclencheurs de génération (individuel, tout, auto 2 phases)
    auto-runs.ts          — Générations automatiques en cours, par cours (elles continuent quand on change de cours)
    request-slots.ts      — Au plus 3 générations longues en même temps pour l'onglet, file d'attente FIFO
    moderation-gate.ts    — Pré-contrôle de modération des générations (vérifie d'abord les sources en attente)
    effective-moderation.ts — Statut de modération affiché et masquage du contenu des sources
    generations.ts        — Affichage + actions sur les générations
    chat.ts               — Interface de chat
    chat-in-flight.ts     — Messages du chat en attente de réponse, par cours
    config.ts             — Interface de configuration (modèles de chat, d'OCR, de transcription et de TTS, voix)
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

> **コードの開発に参加するAIエージェント向け**：[`CLAUDE.md`](CLAUDE.md)（共通ルール、索引）と、読み取り・変更するファイルに応じて必要なときに読み込まれる[`.claude/rules/`](.claude/rules/)の詳細ルールを参照してください。アーキテクチャの詳細な背景、必須ルール（エラーコード、コスト追跡、メタ的な語を含めないプロンプト。つまり、モデルが出力にその語をそのまま転記してしまうため、文書の種類など、文書を形容する語を含めないこと）、既知の注意点（Lizard CCN、Opengrep、Codacy/Semgrepの移行）を確認できます。

---

## APIリファレンス

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定を変更（モデル、音声、TTSモデル） |
| `GET` | `/api/config/status` | APIの状態：`mistral`（Mistralキーが設定済み）、`ttsAvailable`（`mistral`のエイリアス、TTSプロバイダーはMistral Voxtralのみ） |
| `POST` | `/api/config/reset` | 設定を既定値にリセット |
| `GET` | `/api/config/voices` | Mistral TTSの音声一覧を取得（`?lang=fr`は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリと年齢別の既定値 |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力したMistralキーを検証 — 常に200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`）、環境変数へのフォールバックなし |

### プロフィール
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | 全プロフィールの一覧を取得 |
| `POST` | `/api/profiles` | プロフィールを作成 |
| `PUT` | `/api/profiles/:id` | プロフィールを変更（15歳未満ではPINが必須。15 minで10回の誤ったPIN → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | プロフィールと関連プロジェクトを連鎖削除 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトの一覧を取得（`?profileId=`は任意） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細。`?profileId=`は、プロフィールのないプロジェクトを、開いたプロフィールに関連付けます |
| `PUT` | `/api/projects/:pid` | 名前を変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成状態の遷移（`completed`/`failed`/`cancelled`）のリアルタイムSSEストリーム（`event: generation`）と接続維持用のハートビート |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートでファイルをインポート（JPG/PNG/PDFはOCR、TXT/MDは直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由入力テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STTによる音声認識（マルチパート音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLのスクレイピングまたはウェブ検索 `{query}` — ソースの配列を返します。全アドレスが拒否された場合（内部ネットワーク）は422 `url_blocked`、ソースを1件も作成できなかった場合は502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 保留中またはエラーになったモデレーションを再開 `{sourceIds?}`（1回の呼び出しで最大10件、待機 ≤ 10 s）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソース、インポートしたファイル、そのソースに依存する指示を削除 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | モデレーションを実行 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習の指示を検出（確認済みのソースのみ）→ `{consigne, costDelta}` |
### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 多肢選択式クイズ（4択、正解は1つ） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | 書き取り（単語 + 例文 + 規則、単語ごとにTTS音声1件。自動ルーターからも提案される） |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズで間違えた問題に絞った復習シート `{generationId, weakQuestions}` — クイズ画面の補習ボタンによって `quiz-review` と並列に呼び出される |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（実行する生成器の計画）— `{plan, costDelta}`（ルーティングのみのコスト）を返す |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンドでの自動生成（ルーティング + 8種類：`summary`、`flashcards`、`quiz`、`fill-blank`、`podcast`、`quiz-vocal`、`image`、`dictation`）。並列実行 — 同時リクエスト数の上限が ≥ 8 のMistralプランを前提とする。それ以外の場合、複数の429エラーが `failedSteps` に返されることがある。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付ける。未知の `ageGroup`、または有効な言語コードではない `lang`（想定値：`fr`、`pt-BR`…）の場合、AI呼び出しの前に400 `invalid_input` を返す。`quiz-review` と `remediation-summary` は、さらに `{generationId, weakQuestions}` を必須とし、元のクイズのソースを対象とする。

### 生成データのCRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 書き取りの回答を送信 `{answers}`（サーバー側で厳密に採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答を検証（音声 + questionIndex）。口頭回答は検証前にモデレーションされる（拒否時：400 `quiz.answerBlocked`）。コストは `costDelta` で返される |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTSによる読み上げ（シート／フラッシュカード） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 実行中の生成をキャンセル（保留状態の生成をキャンセルする唯一の方法） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前を変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成データとそのメディア（音声、画像）を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の判断

| 判断 | 理由 |
|---|---|
| **React/VueよりAlpine.jsを採用** | 最小限のリソース使用量と、ViteでコンパイルしたTypeScriptによる軽量なリアクティビティ。開発速度が重要なハッカソンに最適。 |
| **JSONファイルによる永続化** | 依存関係がなく、即座に起動。データベースの設定は不要で、起動すればすぐに使える。 |
| **Vite + Handlebars** | 高速な開発用HMR、コードを整理するHTMLパーシャル、Tailwind JITの利点を組み合わせる。 |
| **プロンプトの一元管理** | すべてのAIプロンプトを `prompts.ts` に集約 — 改善の反復、テスト、言語や年齢層ごとの調整が容易。 |
| **複数生成システム** | 各生成データは固有のIDを持つ独立したオブジェクトで、講座ごとに複数のシートやクイズなどを作成できる。 |
| **年齢に合わせたプロンプト** | 語彙、複雑さ、語調が異なる4つの年齢層 — 同じ内容でも学習者に応じて教え方を変える。 |
| **エージェントを活用した機能** | 画像生成とウェブ検索には一時的なMistralエージェントを使用 — 自動クリーンアップでライフサイクルを適切に管理。 |
| **インテリジェントなURLスクレイピング** | 1つの入力欄でURLとキーワードの混在を受け付ける。URLはReadability（静的ページ）でスクレイピングし、必要に応じてLightpanda（JS/SPAページ）にフォールバックする。キーワードはMistralのweb_searchエージェントを起動する。各結果から独立したソースを作成する。 |
| **100% MistralのTTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外の追加キーは不要）— 音声合成をコスト管理処理と、言語に応じた音声選択に統合。 |

---

## クレジットと謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ 世界規模のハッカソン
- **[Alpine.js](https://alpinejs.dev)** — 軽量なリアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティ型CSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — ウェブコンテンツの抽出（Firefox Reader Viewの技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング向け超軽量ヘッドレスブラウザー
- **[Luciole](https://luciole-vision.com)** — 弱視の読者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロフィールの「読みやすさ」オプション）

Mistral AI Worldwide Hackathon（2026年3月）で開始し、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/)を用いて、すべてAIで開発。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**gpt-6.1-solでフランス語から日本語に翻訳された記事。**
