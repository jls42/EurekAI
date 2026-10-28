<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAIのロゴ" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変える — <a href="https://mistral.ai">Mistral AI</a>を活用。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 英語</a> · <a href="README-es.md">🇪🇸 スペイン語</a> · <a href="README-pt.md">🇧🇷 ポルトガル語</a> · <a href="README-de.md">🇩🇪 ドイツ語</a> · <a href="README-it.md">🇮🇹 イタリア語</a> · <a href="README-nl.md">🇳🇱 オランダ語</a> · <a href="README-ar.md">🇸🇦 アラビア語</a><br>
  <a href="README-hi.md">🇮🇳 ヒンディー語</a> · <a href="README-zh.md">🇨🇳 中国語</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 韓国語</a> · <a href="README-pl.md">🇵🇱 ポーランド語</a> · <a href="README-ro.md">🇷🇴 ルーマニア語</a> · <a href="README-sv.md">🇸🇪 スウェーデン語</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTubeのデモ"></a>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="コードの不吉な臭い"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="コード行数"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacyバッジ"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## 誕生の背景 — なぜEurekAIなのか？

**EurekAI**は、[Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）で生まれました。テーマを探していたとき、日常の具体的な経験からアイデアが浮かびました。私は普段、娘と一緒にテスト勉強をしているのですが、人工知能を使えば、もっと楽しくインタラクティブにできるはずだと思ったのです。

目標は、**あらゆる入力** — 授業資料の写真、コピーした文章、音声録音、ウェブ検索 — を、**復習ノート、暗記カード、クイズ、ポッドキャスト、穴埋め問題、イラストなど**に変換することです。フランス企業であるMistral AIのモデルを全面的に活用しており、EurekAIはフランス語圏の生徒に自然に適したソリューションとなっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)は、ハッカソン中の48時間で、Mistralのサービスを基盤とする概念実証として開発されました。すでに動作していましたが、機能は限られていました。その後、EurekAIは本格的なプロジェクトへと成長し、穴埋め問題、問題間の移動、ウェブスクレイピング、設定可能な保護者向けモデレーション、詳細なコードレビューなど、多くの機能を備えるようになりました。コードはすべて人工知能によって生成されており、主に[Claude Code](https://code.claude.com/)を使用し、[Codex](https://openai.com/codex/)と[Gemini CLI](https://geminicli.com/)も一部で使用しています。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAIのガイドツアー：資料、復習ノート、クイズ、暗記カード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成結果、カードごとの推定費用とプロジェクトの合計費用、「自動 — 魔法！」ボタン | ![資料](docs/screenshots/sources.webp)<br>**資料** — 写真／PDF／文章／音声／ウェブからの取り込み、ワンクリック生成、学習指示の検出 |

取り込んだ各資料には、[OCRの信頼度スコア、モデレーション結果、推定費用](docs/screenshots/sources-list.webp)が表示されます。

### 各機能の動作

| | |
|---|---|
| ![復習ノート](docs/screenshots/notes.gif)<br>**復習ノート** — 要点、語彙、出典付きの引用、セクションごとの音声読み上げ | ![クイズ](docs/screenshots/quiz.gif)<br>**選択式クイズ** — 各問題の正解は1つ、解説付きの即時フィードバック、問題を順に移動 |
| ![暗記カード](docs/screenshots/flashcards.gif)<br>**暗記カード** — カードを裏返してから「知っていた／知らなかった」で自己評価 | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — 必要に応じたヒント、軽微な誤りを許容する判定 |
| ![書き取り](docs/screenshots/dictation.gif)<br>**書き取り** — 単語の音声出題、1文字ずつ厳密に採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 問題を読み上げ、マイクで回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2人の声による短いポッドキャスト、対話形式の台本も閲覧可能 | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — エージェントが生成する教育用画像 |
| ![人工知能チューター](docs/screenshots/chat.gif)<br>**人工知能チューター** — 授業資料に基づくチャット、解説付きの回答、クイズや暗記カードも生成可能 | |

### はじめ方

| | |
|---|---|
| ![プロフィールの選択](docs/screenshots/login.gif)<br>**プロフィールの選択** — 子どもごとに専用のスペース、アバター、言語を設定 | ![プロフィールの作成](docs/screenshots/profile-create.gif)<br>**プロフィールの作成** — 年齢、アバター、15歳未満には保護者用PIN |
| ![授業の作成](docs/screenshots/course.gif)<br>**授業の作成** — 授業ごとにプロジェクトを作成し、資料を取り込み可能 | ![設定](docs/screenshots/settings.gif)<br>**設定** — APIの状態、料金を確認しながら人工知能モデルを選択 |

---

## 機能

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルの取り込み** | 授業資料を取り込み — 写真、PDF（Mistral OCRによる処理、平均信頼度スコアと`high`/`medium`/`low`の段階表示）、またはテキストファイル（TXT、MD）。アップロードセッションでは、ファイルごとの再試行と進捗表示に対応 |
| 📝 | **文章入力** | 任意の文章を直接入力または貼り付け |
| 🎤 | **音声入力** | 音声を録音すると、Voxtral STTが文字起こし |
| 🌐 | **ウェブ / URL** | URLを貼り付け（Readability + Lightpandaによる直接スクレイピング）、または検索語を入力（Mistralエージェントのweb_search） |
| 📄 | **復習ノート** | 要点、語彙、引用、豆知識を含む構造化されたノート |
| 🃏 | **暗記カード** | インタラクティブな質問・回答カード、対話形式の音声読み上げ |
| ❓ | **選択式クイズ** | 正解が1つの4択問題、誤答に応じた適応型の復習（問題数を設定可能） |
| ✏️ | **穴埋め問題** | ヒントと軽微な誤りを許容する判定を備えた穴埋め練習 |
| 🔤 | **書き取り** | 取り込んだ一覧から単語を音声で出題（Voxtral TTS）、キーボード入力、綴りの規則を解説しながら1文字ずつ厳密に採点 |
| 🎙️ | **ポッドキャスト** | 2人の声による短い音声ポッドキャスト — 標準のMistral音声、または独自の音声（保護者の声も！） |
| 🖼️ | **イラスト** | Mistralエージェントが生成する教育用画像 |
| 🗣️ | **音声クイズ** | 問題の読み上げ（独自の音声も利用可能）、口頭での回答、人工知能による判定 |
| 💬 | **人工知能チューター** | 授業資料に基づくチャット、ツール呼び出しに対応 |
| 🧠 | **自動ルーター** | `mistral-small-latest`を基盤とするルーターが内容を分析し、利用可能な8種類から生成機能の組み合わせを提案 |
| 🔁 | **授業間での処理継続** | 別の授業を開いても、取り込み、自動生成、マイク録音、チャット、ウェブ検索、読み上げは元の授業で継続。別の授業を表示中に完了すると、通知に授業名を表示 |
| 🔒 | **保護者による管理** | プロフィールごとに設定できるモデレーション（カテゴリをカスタマイズ可能）、保護者用PIN、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは9言語に対応。プロンプトで生成言語を15言語から指定可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTSで復習ノートと暗記カード（質問・回答の対話形式）を読み上げ |
| 💶 | **API費用の追跡** | 各生成処理と資料の費用を€で明確に推定（トークン／文字／ページ／音声の秒数）。カードごとのバッジとプロジェクト合計をダッシュボードに表示 |
| 🎨 | **プロフィール別テーマ** | プロフィールごとに`dark`または`light`のテーマを選択 — プロフィールとともに保存され、切り替えるたびに再適用 |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="アーキテクチャの概要" width="800" />
</p>

---

## モデルの用途対応図

<p align="center">
  <img src="public/assets/model-map.webp" alt="人工知能モデルとタスクの対応図" width="800" />
</p>

---

## 利用の流れ

<p align="center">
  <img src="public/assets/user-journey.webp" alt="生徒の学習の流れ" width="800" />
</p>

---

## 機能の詳細

### マルチモーダル入力

EurekAIは4種類の資料を受け付け、プロフィールに応じてモデレーションを行います（子どもとティーンのプロフィールでは標準で有効）：

- **ファイルの取り込み** — JPG、PNG、PDFファイルをMistral OCRで処理します。標準は**OCR 4.1**（`mistral-ocr-4-1`）で、設定から**OCR 3**（`mistral-ocr-2512`）も選択できます（費用は約½で、手書き文字の認識に優れています）。印刷された文章、表、手書き文字に対応し、テキストファイル（TXT、MD）は直接取り込めます。複数ファイルのアップロードには**アップロードセッション**の仕組みを使用します。ファイルごとに進捗を表示し、失敗したファイルだけを再試行でき、ほかのファイルを再送信する必要はありません。完了後はセッション表示を閉じられます。OCRは平均化した**信頼度スコア**（`average`、`[0,1]`の範囲に制限、Mistralが返す`averagePageConfidenceScore`から算出）を提供し、画面には`high` / `medium` / `low`の段階別バッジとして表示します（しきい値は約0.9 / 約0.7）。スキャン品質が低い場合は警告しますが、処理は妨げません。OCR用にMistralへ送信した文書のコピーは、失敗した場合も含め、処理終了時に削除されます。
- **自由入力** — 任意の内容を入力または貼り付けます。モデレーションが有効な場合は、保存前に確認します。
- **音声入力** — ブラウザーで音声を録音します。標準では**Voxtral Mini Transcribe 2**（`voxtral-mini-2602`）で文字起こしし、設定から**Voxtral Mini Transcribe 3**と**Voxtral Small Transcribe 3**（Mistralのプレビュー版）も選択できます。認識を最適化するため、インターフェースの言語をモデルに渡します（`language`）。
- **ウェブ / URL** — 1つ以上のURLを貼り付けて内容を直接取得するか（Readability + LightpandaでJavaScriptを使用するページにも対応）、キーワードを入力してMistralエージェント経由でウェブ検索します。1つの入力欄で両方に対応し、URLとキーワードは自動で分離され、結果ごとに独立した資料が作成されます。

### 人工知能によるコンテンツ生成

8種類の学習教材を生成します：

| 生成機能 | モデル | 出力 |
|---|---|---|
| **復習ノート** | `mistral-large-latest` | タイトル、要約、要点、語彙、引用、豆知識 |
| **暗記カード** | `mistral-large-latest` | 出典への参照付きの質問・回答カード（枚数を設定可能） |
| **選択式クイズ** | `mistral-large-latest` | 正解が1つの4択問題、解説、適応型の復習（問題数を設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、軽微な誤りを許容する判定（Levenshtein） |
| **書き取り** | `mistral-large-latest` + Voxtral TTS | 重要単語を音声で出題（1 MP3/単語）→ キーボード入力 → 規則の解説付きで厳密に採点（アクセント記号の抜けも誤りとして扱う） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2人の声による台本 → MP3音声 |
| **イラスト** | エージェント `mistral-large-latest` | `image_generation`ツールによる教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTSによる出題 → STTによる回答の文字起こし → 人工知能による判定 |

### チャットによる人工知能チューター

授業資料のすべてにアクセスできる対話型チューターです：

- `mistral-large-latest`を使用
- **ツール呼び出し**：会話中に復習ノート、暗記カード、クイズ、穴埋め問題を生成可能
- 授業ごとに50件のメッセージ履歴
- プロフィールでモデレーションが有効な場合：メッセージを確認し、問題が検出された資料、確認に失敗した資料、未確認の資料をコンテキストとツールの対象から除外します（確認に失敗した資料と未確認の資料は、まず確認を再実行し、最大5秒待機します）

### 自動ルーター

ルーターは`mistral-small-latest`で資料の内容を分析し、利用可能な8種類から最適な生成機能を提案します。画面には進捗がリアルタイムで表示され、最初に分析段階、その後に個別の生成処理が表示されます。処理はキャンセルできます。

自動処理はサーバー上で実行されるため、ページを再読み込みしたり、別の授業を開いたり、プロフィールを切り替えたりしても継続します。各授業で同時に実行できる自動処理は1つです（2つ目のタブでは実行中の処理に接続します）。サーバーではMistralキーごとに最大3件の生成処理を同時実行します。各生成処理が完了するたびにメッセージを表示し、最後に結果のまとめを1回だけ表示します。別の授業を表示中に完了した場合、メッセージには対象の授業名が表示されます。個別にキャンセルした生成処理は、結果のまとめで失敗として数えません。「すべてキャンセル」は、その授業の一連の処理をすべて停止し、メッセージを1件だけ表示します。自動処理中にサーバーが再起動した場合は、中断として表示され、「再開」ボタンから分析をやり直さずに未完了の生成処理だけを再実行できます。

タブから開始した時間のかかる生成処理（個別に開始した生成処理、復習カード）は最大3件まで同時に実行され、それ以降は順番待ちになります。実行中の生成処理が終わるのを待たずに、授業を開けます。

### 適応型学習

- **クイズ統計**：問題ごとの解答回数と正答率を追跡
- **クイズの復習**：元のクイズの資料に基づき、苦手な概念に焦点を当てた新しい問題を5-10問生成します（モデレーションの確認対象も同じ資料です）
- **学習指示の検出**：復習の指示（「〜ができれば、この授業は理解できている」）を検出し、対応する文章生成機能（復習ノート、暗記カード、クイズ、穴埋め問題）で優先します。モデレーションが有効な場合、検出処理は資料の確認完了を待ち、安全と判断された資料だけを読み取ります。指示には元の資料の一覧が保持され、そのうち1つでも問題が検出されると、指示は表示も適用もされません。元の資料が1つでも削除されると、指示は消去されます。この処理の費用も計上されます
### 安全性と保護者による管理

- **4つの年齢グループ**：子ども（≤10歳）、青少年（11-15）、学生（16-25）、成人（26+）
- **コンテンツのモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）では11のカテゴリーが利用可能で、新規の子ども・青少年プロフィールでは6つが既定でブロックされます（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`。`criminal`は、歴史を含む50のレッスンで測定し、誤検出が一度もなかったことを確認して追加）。カテゴリーは設定でプロフィールごとにカスタマイズできます。Moderation 2では、従来の「危険なコンテンツ」カテゴリーが`dangerous`と`criminal`に分割されました（既存のプロフィールは自動的に移行され、ブロック対象のカテゴリーはインポート済みのソースにも適用されます）。既定で安全性を確保するため、モデルの応答からブロック対象のカテゴリーを確認できない場合は、コンテンツを拒否します（「モデレーションを利用できません」）。モデレーションが有効な場合、生成とチャットの両方で、問題が報告されたソース、確認に失敗したソース、確認中のソースを除外します。未確認のソース（モデレーションが無効なときにインポートされたもの、またはプロフィールに関連付けられた旧プロジェクト）は、使用前に確認されます。再起動によって中断されたモデレーションは、サーバーのキーで実行可能なら起動時に再開されます。それ以外の場合は、エラーになったモデレーションと同様に、プロジェクトを開いたとき、または次回の生成時に再開されます。「再確認」ボタンで、必要に応じて確認を再実行できます。モデレーションが有効な場合、ソースが安全と判断されるまで、その内容（プレビュー、テキスト、元の文書）は子どもには表示されません。保護者はPINを使い、1回の閲覧に限って表示できます。音声クイズの口頭回答は、正誤判定前にモデレーションされます。日付付きのIDを`helpers/moderation-model.ts`に固定しています。非推奨のエイリアス`-latest`は、APIの一覧に表示されなくなりました。
- **保護者用PIN**：SHA-256ハッシュを使用し、15歳未満のプロフィールでは必須です。IPアドレスごとに15分間で誤入力は最大10回までです（429 `rate_limited`）。本番環境へのデプロイでは、ソルト付きの低速ハッシュ（Argon2id、bcrypt）を使用してください。
- **サーバーのデータ**：`/output`が公開するのはプロジェクトのメディア（音声、画像、インポートしたファイル）のみです。`profiles.json`、`config.json`、`projects.json`、`project.json`は配信されません
- **チャットの制限**：16歳未満ではAIチャットが既定で無効になっており、保護者が有効にできます

### 複数プロフィールの仕組み

- 名前、年齢、アバター、言語設定を持つ複数のプロフィール
- **プロフィールごとの音声**（`Profile.mistralVoices?: { host?, guest? }` — 各役割は任意）— 子どもごとにポッドキャスト・音声クイズ用の音声ペアを設定できます
- **プロフィールごとのテーマ**（`Profile.theme: 'dark' | 'light'`）— プロフィールの切り替え時に自動で切り替わり、バックエンドに保存されます
- プロジェクトは`profileId`でプロフィールに関連付けられます。プロフィールのない旧プロジェクトは、最初に開いたプロフィールに関連付けられ、そのプロフィールに従ってモデレーションされます
- 連鎖削除：プロフィールを削除すると、そのプロフィールの全プロジェクトが削除されます

### API費用の追跡

課金対象のMistral呼び出し（チャット、OCR、STT、TTS、エージェント）は、指示の検出や音声クイズの口頭回答を含め、すべて計測され、ユーザーに**透明性のある**ユーロ建ての見積額を提示します。無料のモデレーションは計上しません。エージェントのツール料金も含まれます。ウェブ検索1回につき0,03 $、画像生成1枚につき0,10 $（Mistralの料金）に加え、これらのツールが生成したトークンを、エージェントのモデルの入力料金で見積もりに計上します。

- **正となる情報源**：`helpers/pricing.ts` — モデルの接頭辞ごとの`MODEL_PRICING`（例：`mistral-large` → 入力0.5 €/Mトークン、出力1.5 €/Mトークン）、定期的な再スクレイピング用のMistralドキュメントURLを含む`PRICING_SOURCES`
- **対応単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT）— `helpers/cost-calc.ts`で換算を制御
- **計測の処理経路**：`helpers/tracked-client.ts`（Mistralクライアントをラップ）→ `helpers/usage-context.ts`（AsyncLocalStorage）→ `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTP応答に挿入）
- **画面表示**：生成ごとの費用バッジ（`src/partials/cost-badge-gen.html`）、ソースごとの費用（`cost-badge-src.html`）、ダッシュボードの累計額（`Project.totalCost`）
- **エンドポイント**：`/generate/*`と`/sources/*`の応答は、返されるオブジェクト（`Generation` / `Source`）に`estimatedCost`、`usage`、`costBreakdown`を付加します。`POST /generate/route`は、ルーティングのみの費用を示す`costDelta: number`フィールドを追加します。`POST /detect-consigne`（`{consigne, costDelta}`）と口頭回答の正誤判定も、それぞれの`costDelta`を返します。`GET /projects/:pid`は、`totalCost`（`costLog[]`から計算した合計）を追加したプロジェクトと全履歴を返します

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS**：既定は**Voxtral TTS**（`voxtral-mini-tts-2603`）で、設定から**Voxtral TTS 3**（`voxtral-mini-tts-3-0`、Mistralのプレビュー版、より多くの言語でネイティブ音声に対応）を選択できます。音声合成は100% Mistralで行い、追加のキーは不要です。選択したモデルが対応する音声のみが表示されます。Voxtral TTSは、Voxtral 3で追加された音声を受け付けません
- **カスタム音声**：保護者はMistral Voices APIを使い、音声サンプルから自分の音声を作成して、ホスト・ゲストの役割に割り当てられます。ポッドキャストや音声クイズが保護者の声で読み上げられ、子どもがさらに没入できる体験になります
- 設定可能な音声の役割は2つ：**ホスト**（主なナレーター）と**ゲスト**（ポッドキャストの2人目の声）
- 設定にはMistral音声の全カタログがあり、言語で絞り込めます
- 再生（学習シート、ポッドキャスト、書き取りの単語）は、その画面を離れると一時停止し、停止位置から再開します
- フラッシュカードの読み上げ音声は、初回の再生時に作成され、その生成結果に保存されます。戻るたびに再作成や再課金はされません
- ソースのマーカー（`[Source N]`）は読み上げません

### 国際化

- インターフェースは9言語に対応：fr、en、es、pt、it、nl、de、hi、ar
- AIプロンプトは15言語に対応（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- 言語はプロフィールごとに設定可能

---

## 技術スタック

| レイヤー | 技術 | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーと型安全性 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebarsのパーシャル、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、ViteでコンパイルしたTypeScript |
| **テンプレート処理** | vite-plugin-handlebars | パーシャルによるHTMLの構成 |
| **AI** | Mistral AI SDK | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-2603`（Voxtral TTS 3は任意）、音声合成を内蔵 |
| **アイコン** | Lucide 1.x | SVGアイコンライブラリ |
| **ウェブスクレイピング** | Readability + linkedom | ウェブページの主要コンテンツを抽出（Firefox Reader Viewの技術） |
| **ヘッドレスブラウザー** | Lightpanda | JS/SPAページ向けの超軽量ヘッドレスブラウザー（Zig + V8）— スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内でMarkdownをレンダリング |
| **ファイル送信** | Multer 2.x | マルチパートフォームの処理 |
| **音声** | ffmpeg-static | 音声セグメントの連結 |
| **テスト** | Vitest | 単体テスト — SonarCloudでカバレッジを測定 |
| **永続化** | JSONファイル | 依存関係のないストレージ |

---

## モデル一覧

| モデル | 用途 | 採用理由 |
|---|---|---|
| `mistral-large-latest` | 学習シート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズの正誤判定、画像エージェント、ウェブ検索エージェント、指示の検出 | 優れた多言語対応と指示への追従 |
| `mistral-ocr-4-1`（OCR 4.1、既定） | 文書のOCR | 印刷されたテキスト、表、手書き文字（$4 / 1000ページ） |
| `mistral-ocr-2512`（OCR 3、任意） | 文書のOCR | 設定で選択可能、低価格（$2 / 1000ページ）、手書き文字の読み取りに優れる |
| `voxtral-mini-2602`（Voxtral Mini Transcribe 2、既定） | 音声認識（STT） | 音声入力と音声クイズの口頭回答（$0.003 / min） |
| `voxtral-mini-transcribe-3-0` / `voxtral-small-transcribe-3-0`（Transcribe 3、任意、プレビュー版） | 音声認識（STT） | 設定で選択可能（$0.0035 / minおよび$0.004 / min） |
| `voxtral-mini-tts-2603`（Voxtral TTS、既定） | 音声合成（TTS） | ポッドキャスト、音声クイズ、書き取り、読み上げ（$16 / M文字） |
| `voxtral-mini-tts-3-0`（Voxtral TTS 3、任意、プレビュー版） | 音声合成（TTS） | 設定で選択可能、より多くの言語でネイティブ音声に対応（$13 / M文字） |
| `mistral-moderation-2603` | コンテンツのモデレーション | 子ども・青少年向けに6つのカテゴリーをブロック（`jailbreaking`を含む） |
| `mistral-small-latest` | 自動ルーター | ルーティングを判断するため、コンテンツを高速に分析 |

スマートフォンでは、閉じたメニューで見切れていた選択中のモデルの完全なラベル（価格、「推奨」または「プレビュー版」）を、設定の各選択欄の下に表示します。

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

> **注**：Mistral Voxtral TTSが唯一のTTSプロバイダーです。`MISTRAL_API_KEY`以外の追加キーは不要です。

> **ユーザーが入力するAPIキー**：`MISTRAL_API_KEY`は現在**任意**です。未設定でもアプリは起動し、各ユーザーに画面から**自分のMistralキー**を入力するよう案内します。キーは**ブラウザーに保存**され（セキュアコンテキストではWeb Crypto + IndexedDBで暗号化）、リクエストごとに送信されます。**サーバーには永続保存されません**。優先順位：プロフィールのキー > ブラウザー全体のキー > `MISTRAL_API_KEY`（環境変数）。`EUREKAI_REQUIRE_USER_KEY=true`を設定すると、各ユーザーは自分のキーを提供する必要があります（環境変数のキーは事前読み込みにのみ使用されます）。

> **ローカルHTTPS（タブレット/LAN）**：`localhost`は、すでにセキュアコンテキストです。LAN経由でアクセスする場合（タブレット）は、ローカル証明書を生成し、HTTPSを有効にしてください。これにより、ブラウザーは保存するキーを暗号化でき、転送中のキーも暗号化されます：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 環境変数

| 変数 | 必須 | 既定値 | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral APIキー（チャット、OCR、STT、TTS Voxtral、エージェント、モデレーション）。未設定の場合、ユーザーがアプリでキーを入力します（ブラウザーに保存し、サーバーには保存しません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AIリクエストで`MISTRAL_API_KEY`へのフォールバックを無効化（各ユーザーは自分のキーを提供する必要があります）。外部に公開するインスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLSキー・証明書のパス（`scripts/gen-cert.sh`を参照）→ ExpressとViteがHTTPSで配信（LAN・タブレットでのセキュアコンテキスト） |
| `PORT` | 任意 | `3000` | ExpressバックエンドのHTTPポート |
| `NODE_ENV` | 任意 | `development` | `production`の場合 → Expressは`dist/`からフロントエンドを配信（それ以外は`public/`） |
| `SONAR_TOKEN` | CIでは任意 | — | GitHub ActionsのSonarCloudワークフローでのみ使用 |

### テスト、コード品質、貢献

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Gitフック（Husky）**：`pre-commit`は、`scripts/pre-commit-fast.sh`（競合、大きなファイル、shellcheck）、`lint-staged`、`npm test`を順に実行します。`pre-push`は、まず処理を中止させる`npm audit`の検査（推移的な依存関係を含め、依存関係に`critical`レベルの脆弱性が1つでもあれば中止。`scripts/audit-verdict.mjs`を参照）を実行し、その後`npm run security`を実行します。各フックは、いずれかの段階が失敗するとコミット・プッシュを中止します。

**外部ツール（アプリの起動には任意、`pretest`と`npm run security`には必須）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test`は`pretest`で失敗し（lizardがないため）、`npm run security`も失敗します（opengrepがないため）。その結果、huskyフックがコミット・プッシュを中止します。

---

## コンテナーでのデプロイ

イメージは**GitHub Container Registry**で公開されています：

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

> **`:U`**：ボリュームのアクセス権を自動調整する、ルートレスPodmanのフラグです。

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
  generate.ts             — Endpoints de génération (8 types + route)
  auto-runs.ts            — Lots Auto côté serveur : lancement, analyse et étapes en arrière-plan, état, annulation
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
  keyed-slots.ts          — Places par clé (au plus 3 étapes d'Auto en même temps par clé Mistral)
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
  event-bus.ts            — Bus d'événements de génération et de lots Auto en mémoire (dispatch SSE, filet anti-uncaughtException)
  auto-run-state.ts       — Transitions d'un lot Auto (fonctions pures, appliquées par le store)
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
    generate.ts           — Déclencheurs de génération (individuel, tout, Auto)
    auto-launch.ts        — Lancement d'un Auto côté serveur, suivi pendant qu'un autre cours est affiché, annulation
    auto-runs.ts          — Auto suivis par l'onglet : état reçu du serveur, bilan affiché une seule fois, coût de l'analyse
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

> **コードに貢献するAIエージェント向け**：[`CLAUDE.md`](CLAUDE.md)（共通ルール、索引）と、読み取り・変更するファイルに応じて必要時に読み込まれる[`.claude/rules/`](.claude/rules/)の詳細ルールを参照してください。アーキテクチャの詳細な背景、必須ルール（エラーコード、費用追跡、メタ的な語を含まないプロンプト、すなわち文書の種類などの修飾語を含めないこと。モデルがそれらの語を出力に転記してしまうため）、既知の注意点（Lizard CCN、Opengrep、Codacy/Semgrepの移行）を確認できます。

---

## APIリファレンス

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定を変更（モデル、音声、TTSモデル） |
| `GET` | `/api/config/status` | APIの状態：`mistral`（Mistralキーが設定済み）、`ttsAvailable`（`mistral`のエイリアス、Mistral Voxtralが唯一のTTSプロバイダー） |
| `POST` | `/api/config/reset` | 設定を既定値にリセット |
| `GET` | `/api/config/voices` | Mistral TTSの音声を一覧表示（`?lang=fr`は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリーと年齢別の既定値 |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力したMistralキーを検証 — 常に200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`）、環境変数へのフォールバックなし |

### プロフィール
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | 全プロフィールを一覧表示 |
| `POST` | `/api/profiles` | プロフィールを作成 |
| `PUT` | `/api/profiles/:id` | プロフィールを変更（15歳未満ではPINが必須。15 minでPINを10回誤入力 → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | プロフィールと関連プロジェクトを連鎖削除 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=`は任意） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細。`?profileId=`は、プロフィールのないプロジェクトを、開いたプロフィールに関連付け |
| `PUT` | `/api/projects/:pid` | 名前を変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成状態の遷移（`completed`/`failed`/`cancelled`）のリアルタイムSSEストリーム（`event: generation`）と接続維持用ハートビート |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートでファイルをインポート（JPG/PNG/PDFにはOCR、TXT/MDは直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由入力テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT音声（マルチパート音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLのスクレイピングまたはウェブ検索 `{query}` — ソースの配列を返す。すべてのアドレスが拒否された場合（内部ネットワーク）は422 `url_blocked`、ソースを1つも作成できなかった場合は502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 保留中またはエラーのモデレーションを再開 `{sourceIds?}`（呼び出しごとに最大10件、待機≤10 s）→ `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソース、インポートしたファイル、それに依存する指示を削除 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | モデレーションを実行 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習の指示を検出（確認済みのソースのみ）→ `{consigne, costDelta}` |
### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | 暗記カード |
| `POST` | `/api/projects/:pid/generate/quiz` | 多肢選択式クイズ（4択、正解は1つのみ） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | 書き取り（単語＋例文＋規則、単語ごとに1つのTTS音声。自動ルーターからも提案されます） |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 適応型復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズで間違えた問題に絞った復習シート `{generationId, weakQuestions}` — クイズ画面の補習ボタンから `quiz-review` と並行して呼び出されます |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（実行する生成処理の計画）— `{plan, costDelta}`（ルーティングのみの費用）を返します |
| `POST` | `/api/projects/:pid/generate/auto/start` | サーバー側で自動バッチを開始 `{runId, …}`：即座に202を返し、その後バックグラウンドで分析と各ステップを実行します。Mistralキーごとに同時実行は最大3ステップ。ページを再読み込みしてもバッチは続行します。この講座ですでにバッチが実行中の場合は409 `auto_busy` |
| `POST` | `/api/projects/:pid/generate/auto/resume` | サーバーの再起動で中断された自動バッチを再開 `{runId}`：分析をやり直さず、このリクエストのキーで中断されたステップを再実行します（応答は202） |
| `GET` | `/api/projects/:pid/auto-runs/:runId` | 自動バッチの状態：分析、各ステップとその結果 |
| `POST` | `/api/projects/:pid/auto-runs/:runId/cancel` | 自動バッチ全体をキャンセル（個別のステップは生成処理と同じ方法でキャンセル） |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。不明な `ageGroup`、または有効な言語コードではない `lang`（想定値：`fr`、`pt-BR` など）の場合、AIの呼び出し前に400 `invalid_input` を返します。`quiz-review` と `remediation-summary` は、さらに `{generationId, weakQuestions}` を必須とし、元のクイズの資料を対象とします。

### 生成結果のCRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの解答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の解答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 書き取りの解答を送信 `{answers}`（サーバー側で厳密に採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭の解答を検証（音声＋questionIndex）。口頭の解答は検証前にモデレーションを行います（拒否時：400 `quiz.answerBlocked`）。費用は `costDelta` で返します |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTSによる音声読み上げ（シート／暗記カード） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 実行中の生成処理をキャンセル（保留中の処理をキャンセルする唯一の手段） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前を変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成結果とそのメディア（音声、画像）を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定

| 決定 | 理由 |
|---|---|
| **React/VueよりAlpine.jsを採用** | 最小限のリソース使用量で、ViteがコンパイルするTypeScriptによって軽量なリアクティビティを実現。速さが重要なハッカソンに最適です。 |
| **JSONファイルによる永続化** | 依存関係がなく、即座に起動します。データベースの設定は不要で、起動すればすぐに使えます。 |
| **Vite + Handlebars** | 開発時の高速なHMR、コード整理のためのHTMLパーシャル、Tailwind JITを組み合わせ、それぞれの利点を活用します。 |
| **プロンプトの一元管理** | すべてのAIプロンプトを `prompts.ts` に集約し、反復改善、テスト、言語や年齢層に応じた調整を容易にします。 |
| **複数の生成結果に対応する仕組み** | 各生成結果は固有のIDを持つ独立したオブジェクトで、講座ごとに複数のシートやクイズなどを作成できます。 |
| **年齢に応じたプロンプト** | 4つの年齢層に合わせて語彙、複雑さ、語調を変え、同じ内容でも学習者に応じた教え方を実現します。 |
| **エージェントを活用した機能** | 画像生成とウェブ検索には一時的なMistralエージェントを使用し、自動クリーンアップでライフサイクルを適切に管理します。 |
| **URLのインテリジェントなスクレイピング** | 1つの入力欄にURLとキーワードを混在させて入力できます。URLはReadability（静的ページ）でスクレイピングし、必要に応じてLightpanda（JS/SPAページ）にフォールバックします。キーワードはMistralのweb_searchエージェントを起動します。各結果から独立した資料を作成します。 |
| **100% MistralのTTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外の追加キーは不要）を使用し、音声合成を費用管理の仕組みと言語ごとの音声選択に統合します。 |

---

## クレジットと謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）＋Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量なリアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティ型CSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドのビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — ウェブコンテンツの抽出（Firefox Reader Viewの技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング用の超軽量ヘッドレスブラウザー
- **[Luciole](https://luciole-vision.com)** — 弱視の読者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロフィールの「読みやすさ」オプション）

Mistral AI Worldwide Hackathon（2026年3月）で始動し、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/)を使用して、すべてAIによって開発されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — 著作権 (C) 2026 Julien LS

**gpt-6.1-solでフランス語から日本語に翻訳された記事。**
