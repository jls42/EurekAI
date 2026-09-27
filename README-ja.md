<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変える — <a href="https://mistral.ai">Mistral AI</a> 搭載。</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube デモ"></a>
</p>

<h4 align="center">📊 コード品質</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Quality Gate"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Security Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Reliability Rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Maintainability Rating"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Coverage"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilities"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Lines of Code"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Codacy Badge"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## ストーリー — なぜ EurekAI なのか？

**EurekAI** は、[Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）の開催中に誕生しました。ハッカソンのテーマを探していた際、非常に身近な実体験からアイデアが浮かびました。私は普段から娘と一緒にテスト勉強をしているのですが、AI を活用すればもっと楽しくインタラクティブにできるはずだと考えたのです。

目指したのは、授業ノートの写真、コピー＆ペーストしたテキスト、音声録音、ウェブ検索といった**あらゆる入力**を取り込み、**復習シート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど**に変換することです。これらはすべてフランスの企業である Mistral AI のモデルを基盤としており、EurekAI はフランス語圏の学習者にも自然に適したソリューションとなっています。

[初期プロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)は、Mistral の各種サービス上に構築された概念実証（PoC）としてハッカソン中の48時間で作成されました。すでに機能はしていましたが、限定的なものでした。その後、EurekAI は本格的なプロジェクトへと発展し、穴埋め問題、演習問題のナビゲーション、ウェブスクレイピング、設定可能な保護者モデレーション、詳細なコードレビューなど、多くの機能が追加されました。なお、コードのすべては AI によって生成されており、主に [Claude Code](https://code.claude.com/) を使用し、一部 [Codex](https://openai.com/codex/) や [Gemini CLI](https://geminicli.com/) も活用されています。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI ガイドツアー：ソース、復習シート、クイズ、フラッシュカード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成履歴、カードごとの推定コストおよびプロジェクト合計、「おまかせ自動生成（Auto — Magie !）」ボタン | ![ソース](docs/screenshots/sources.webp)<br>**ソース** — 写真/PDF/テキスト/音声/ウェブのインポート、ワンクリック生成、指示文の自動検出 |

インポートされた各ソースには、[OCR信頼度スコア、モデレーション、推定コスト](docs/screenshots/sources-list.webp)が表示されます。

### コンポーネントの動作

| | |
|---|---|
| ![復習シート](docs/screenshots/notes.gif)<br>**復習シート** — 重要ポイント、語彙、出典付きの引用、セクションごとの音声読み上げ | ![クイズ](docs/screenshots/quiz.gif)<br>**多肢選択式クイズ** — 1問につき1つの正解、解説付きの即時フィードバック、ステップバイステップのナビゲーション |
| ![フラッシュカード](docs/screenshots/flashcards.gif)<br>**フラッシュカード** — カードをめくった後の自己評価（「知っていた／知らなかった」） | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — オンデマンドのヒント表示、柔軟な正誤判定 |
| ![ディクテーション](docs/screenshots/dictation.gif)<br>**ディクテーション** — 音声で読み上げられる単語、一文字ずつの厳格な採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 読み上げられる問題、マイクで口頭回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2人の対話によるミニポッドキャスト、対話スクリプトの閲覧が可能 | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — エージェントによって生成される教育用画像 |
| ![AI チューター](docs/screenshots/chat.gif)<br>**AI チューター** — 授業資料に根ざしたチャット、解説付きの回答、クイズやフラッシュカードの生成が可能 | |

### はじめ方

| | |
|---|---|
| ![プロフィール選択](docs/screenshots/login.gif)<br>**プロフィール選択** — お子様ごとに専用スペース、アバター、言語を設定 | ![プロフィール作成](docs/screenshots/profile-create.gif)<br>**プロフィール作成** — 年齢、アバター、15歳未満向けの保護者PINコード |
| ![コース作成](docs/screenshots/course.gif)<br>**コース作成** — レッスンごとに1つのプロジェクトを作成し、ソースを取り込み可能 | ![設定](docs/screenshots/settings.gif)<br>**設定** — APIステータス、料金が表示された AI モデルの選択 |

---

## 機能一覧

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルインポート** | レッスンを取り込み — 写真、PDF（Mistral OCR による平均信頼度スコア、ティア `high`/`medium`/`low` 表示）またはテキストファイル（TXT、MD）。ファイルごとのリトライと個別の進捗表示を備えたアップロードセッション |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 声を録音 — Voxtral STT が音声を文字起こし |
| 🌐 | **Web / URL** | URL を貼り付け（Readability + Lightpanda による直接スクレイピング）、または検索キーワードを入力（Mistral エージェントの web_search） |
| 📄 | **復習シート** | 重要ポイント、語彙、引用、豆知識を含む構造化ノート |
| 🃏 | **フラッシュカード** | インタラクティブな Q&A カード、対話形式の音声読み上げ |
| ❓ | **多肢選択式クイズ** | 正解が1つのみの4択問題、間違えた問題の適応型復習付き（問題数は設定可能） |
| ✏️ | **穴埋め問題** | ヒントと柔軟な正誤判定を備えた穴埋め演習 |
| 🔤 | **ディクテーション** | インポートしたリストから単語を音声読み上げ（Voxtral TTS）、キーボード入力、つづり規則の解説付きで一文字ずつ厳格に採点 |
| 🎙️ | **ポッドキャスト** | 音声による2人の対話型ミニポッドキャスト — デフォルトの Mistral 音声またはカスタム音声（保護者の声など！） |
| 🖼️ | **イラスト** | Mistral エージェントによって生成される教育用画像 |
| 🗣️ | **音声クイズ** | 読み上げられる問題（カスタム音声対応）、声で回答、AI による判定 |
| 💬 | **AI チューター** | 授業ドキュメントに基づいたツール呼び出し対応のコンテキストチャット |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターがコンテンツを分析し、利用可能な8種類のジェネレーターから最適な組み合わせを提案 |
| 🔒 | **ペアレンタルコントロール** | プロフィールごとに設定可能なモデレーション（カテゴリのカスタマイズ対応）、保護者PINコード、チャット制限 |
| 🌍 | **多言語対応** | インターフェースは9言語に対応。プロンプト経由での AI 生成は15言語を制御可能 |
| 🔊 | **音声読み上げ** | Mistral Voxtral TTS を介して復習シートやフラッシュカード（質問／回答の対話）を音声で聴取可能 |
| 💶 | **APIコスト追跡** | 各生成およびソースの推定コスト（€：トークン／文字数／ページ数／音声秒数）を明確に表示。ダッシュボードにカードごとのバッジとプロジェクト合計を表示 |
| 🎨 | **プロフィールごとのテーマ** | 各プロフィールで `dark` または `light` のテーマを選択可能 — プロフィールに保存され、プロフィール切り替え時に自動再適用 |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## モデル活用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## ユーザージャーニー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 詳細解説 — 機能

### マルチモーダル入力

EurekAI は4種類のソースタイプを受け付け、プロフィールに応じてモデレーションを行います（子どもおよびティーン向けプロフィールではデフォルトでモデレーションが有効です）：

- **ファイルインポート** — 印刷されたテキスト、表、手書き文字に対応した Mistral OCR で処理される JPG、PNG、または PDF ファイル — **デフォルトは OCR 4（`mistral-ocr-4-0`）**（最高品質）、設定で**オプションとして OCR 3（`mistral-ocr-2512`）**も選択可能（安価でコストは約半分）— または直接インポートされるテキストファイル（TXT、MD）。複数ファイルのアップロードには**アップロードセッション**システムを使用：ファイルごとの個別進捗表示、他のファイルを再送信することなく失敗したファイルのみをリトライ、完了時にセッションを閉じる（dismiss）機能。OCR は平均**信頼度スコア**（`average`、`[0,1]` にクランプされ、Mistral から返される `averagePageConfidenceScore` に基づいて算出）を出力し、UI 上にティアバッジ `high` / `medium` / `low`（しきい値 ~0.9 / ~0.7）として表示されます — スキャンの品質が低い場合にブロックすることなく警告します。OCR 処理のために Mistral に送信されたドキュメントのコピーは、処理が失敗した場合も含め、処理終了直後に削除されます。
- **自由形式テキスト** — 任意のコンテンツを入力または貼り付けます。モデレーションが有効な場合、保存前にチェックされます。
- **音声入力** — ブラウザ内で音声を録音します。`voxtral-mini-latest` によって文字起こしされます。パラメータ `language="fr"` により認識が最適化されます。
- **ウェブ / URL** — 1つ以上の URL を貼り付けてコンテンツを直接スクレイピングするか（JavaScript ページ向けには Readability + Lightpanda を使用）、キーワードを入力して Mistral エージェントによるウェブ検索を行います。1つの入力フィールドで両方に対応しており、URL とキーワードは自動的に判別され、結果ごとに独立したソースが作成されます。

### AI コンテンツ生成

8種類の学習教材を生成可能：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習シート** | `mistral-large-latest` | タイトル、要約、重要ポイント、語彙、引用、豆知識 |
| **フラッシュカード** | `mistral-large-latest` | ソースへの参照付き一問一答カード（枚数は設定可能） |
| **多肢選択式クイズ** | `mistral-large-latest` | 正解が1つのみの4択問題、解説、適応型復習（問題数は設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、柔軟な正誤判定（レーベンシュタイン距離） |
| **ディクテーション** | `mistral-large-latest` + Voxtral TTS | 音声で読み上げられる重要単語（単語ごとに1つのMP3）→ キーボード入力 → 解説付きの厳格な採点（アクセントの欠落も誤りとして判定） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2人による台本 → MP3 音声 |
| **イラスト** | エージェント `mistral-large-latest` | `image_generation` ツールを使用した教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS による出題 → STT による回答 → AI による判定 |

### チャット形式の AI チューター

授業ドキュメントにフルアクセスできる対話型チューター：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中に復習シート、フラッシュカード、クイズ、穴埋め問題を生成可能
- コースごとに50件のメッセージ履歴を保持
- プロフィールでモデレーションが有効な場合：メッセージが検証され、フラグが立てられたソース、検証に失敗したソース、未検証のソースはコンテキストおよびツールから除外されます（失敗したソースや未検証のソースの検証は、まず最大5秒間再試行されます）

### 自動ルーター

ルーターは `mistral-small-latest` を使用してソースの内容を分析し、利用可能な8種類の中から最も関連性の高いジェネレーターを提案します。インターフェースには進捗がリアルタイムで表示されます。まず分析フェーズが行われ、その後に個別の生成が実行されます（キャンセルも可能です）。

### アダプティブラーニング

- **クイズ統計**：問題ごとの試行回数と正答率を追跡
- **クイズの復習**：元のクイズのソースから、苦手な概念を対象とした新しい問題を5〜10問生成（これらのソースに対してもモデレーションガードが適用されます）
- **指示文の検出**：復習指示（「〜ができたらこの課を理解したとみなす」など）を検出し、対応するテキスト系ジェネレーター（復習シート、フラッシュカード、クイズ、穴埋め問題）で優先的に反映します。モデレーションが有効な場合、検出処理はソースの検証を待ち、安全と判断されたソースのみを読み込みます。指示文は生成元のソースリストを保持しており、そのいずれかにフラグが立てられた場合、指示文は表示も適用もされず、いずれかが削除された場合は指示文自体が消去されます。この処理のコストもカウントされます。

### セキュリティ＆ペアレンタルコントロール

- **4つの年齢層**：子ども（10歳以下）、ティーン（11〜15歳）、学生（16〜25歳）、大人（26歳以上）
- **コンテンツモデレーション**：`mistral-moderation-2603`（Mistral Moderation 2）を採用。11の利用可能なカテゴリのうち、新規の子ども／ティーン向けプロフィールではデフォルトで6カテゴリがブロックされます（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`。`criminal` は歴史の授業を含む50件のレッスンで誤検知（偽陽性）ゼロを測定した後にブロック対象に追加）。設定画面でプロフィールごとにカテゴリのカスタマイズが可能。Moderation 2 では従来の「危険なコンテンツ」カテゴリが `dangerous` と `criminal` に分割されました（既存のプロフィールは自動移行され、ブロック対象カテゴリはすでにインポートされたソースにも適用されます）。デフォルト安全設計：モデルの応答によってブロック対象カテゴリを検証できない場合、コンテンツは拒否されます（「モデレーション利用不可」）。モデレーションが有効な場合、生成機能およびチャットの両方で、フラグが立てられたソース、検証に失敗したソース、および検証中のソースは除外されます。未検証のソース（モデレーション無効時にインポートされたもの、またはプロフィールに紐付けられた古いプロジェクト）は使用前に検証されます。再起動によって中断されたモデレーションは、サーバーキーが許容すれば起動時に再開されます。それ以外の場合は、エラーになったモデレーションと同様に、プロジェクトを開いた際または次の生成時に再開されます。「再検証」ボタンにより、オンデマンドで検証を再実行できます。モデレーションが有効な場合、ソースが安全と判断されるまで、そのコンテンツ（プレビュー、テキスト、元のドキュメント）はお子様から非表示になります。保護者は PIN コードを入力することで、1回の閲覧に限り表示させることができます。音声クイズの口頭回答は、判定前にモデレーションが行われます。日付付き ID は `helpers/moderation-model.ts` に固定：非推奨となったエイリアス `-latest` は API にリストされなくなりました。
- **保護者PINコード**：SHA-256 ハッシュ。15歳未満のプロフィールで必須。IPアドレスあたり15分間に最大10回までの誤入力制限（429 `rate_limited`）。本番環境でのデプロイには、ソルト付きの低速ハッシュ（Argon2id、bcrypt）の使用を推奨します。
- **サーバーデータ**：`/output` はプロジェクトのメディア（音声、画像、インポートされたファイル）のみを公開し、`profiles.json`、`config.json`、`projects.json`、および `project.json` が提供されることは一切ありません。
- **チャット制限**：16歳未満は AI チャットがデフォルトで無効化されており、保護者により有効化が可能です。

### マルチプロフィールシステム

- 名前、年齢、アバター、言語設定を備えたマルチプロフィール対応
- **プロフィールごとの音声**（`Profile.mistralVoices?: { host?, guest? }` — 各ロールは任意）— お子様ごとにポッドキャストや音声クイズ用の音声ペアを設定可能
- **プロフィールごとのテーマ**（`Profile.theme: 'dark' | 'light'`）— プロフィールの切り替え時に自動的に反映され、バックエンド側に保存
- プロジェクトは `profileId` を介してプロフィールに紐付けられます。プロフィールのない過去のプロジェクトは、最初に開いたプロフィールに紐付けられ、そのプロフィールに従ってモデレーションが行われます。
- カスケード削除：プロフィールを削除すると、そのプロフィールのすべてのプロジェクトも削除されます

### APIコスト追跡

請求対象となるすべてのMistral呼び出し（チャット、OCR、STT、TTS、エージェント）は、指示の検出や音声クイズの口頭回答を含め、ユーザーに**透明性の高い**ユーロ（€）見積もりを提供できるよう計測されています。無料であるモデレーションはカウントされません。エージェントのツール利用料も含まれます：Web検索1回あたり0.03ドル、画像生成1回あたり0.10ドル（Mistral料金）、さらにこれらのツールによって生成されたトークンも含まれ、見積もりではエージェントモデルの入力料金として計算されます。

- **信頼できる情報源（Source of truth）** : `helpers/pricing.ts` — モデルプレフィックスごとの `MODEL_PRICING`（例: `mistral-large` → 入力 0.5 €/100万トークン、出力 1.5 €/100万トークン）、定期的な再スクレイピング用のMistralドキュメントURLを含む `PRICING_SOURCES`
- **サポートされる単位** : `tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT） — `helpers/cost-calc.ts` による変換制御
- **計測チェーン** : `helpers/tracked-client.ts`（Mistralクライアントをラップ） → `helpers/usage-context.ts`（AsyncLocalStorage） → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTPレスポンスへの注入）
- **UI** : 生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごと（`cost-badge-src.html`）、ダッシュボード内の累計合計（`Project.totalCost`）
- **エンドポイント** : `/generate/*` および `/sources/*` のレスポンスは、返却されるオブジェクト（`Generation` / `Source`）に `estimatedCost`、`usage`、`costBreakdown` を付加します。`POST /generate/route` はルーティング単体のコストとして `costDelta: number` フィールドを追加します。`POST /detect-consigne`（`{consigne, costDelta}`）および口頭回答の検証もそれぞれの `costDelta` を返します。`GET /projects/:pid` は `totalCost`（`costLog[]` から計算された合計）および完全な履歴が付加されたプロジェクトを返します。

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS** : `voxtral-mini-tts-latest`、100% Mistralによる音声合成、追加のキーは不要
- **カスタム音声** : 保護者はMistral Voices API経由で独自の音声を作成（音声サンプルから）し、ホスト/ゲストの役割に割り当てることができます。これにより、ポッドキャストや音声クイズが保護者の声で読み上げられ、子どもにとってさらに没入感のある体験になります
- 設定可能な2つの音声の役割 : **ホスト**（メインナレーター）および**ゲスト**（ポッドキャストの2人目の声）
- 設定画面で利用可能なMistral音声の完全カタログ（言語による絞り込みが可能）

### 国際化

- 9言語で利用可能なインターフェース : fr、en、es、pt、it、nl、de、hi、ar
- AIプロンプトは15言語をサポート（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- プロファイルごとに言語を設定可能

---

## 技術スタック

| レイヤー | テクノロジー | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーおよび型の安全性 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebarsパーシャル、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブなインターフェース、ViteによってコンパイルされるTypeScript |
| **テンプレートエンジン** | vite-plugin-handlebars | パーシャルによるHTMLの組み立て |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVGアイコンライブラリ |
| **Webスクレイピング** | Readability + linkedom | Webページのメインコンテンツ抽出（Firefox Reader Viewの技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPAページ向けの超軽量ヘッドレスブラウザ（Zig + V8） — スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内でのMarkdownレンダリング |
| **ファイル送信** | Multer 2.x | マルチパートフォームの処理 |
| **オーディオ** | ffmpeg-static | 音声セグメントの結合 |
| **テスト** | Vitest | 単体テスト — SonarCloudによるカバレッジ計測 |
| **永続化** | JSONファイル | 依存関係のないストレージ |

---

## モデルリファレンス

| モデル | 用途 | 選定理由 |
|---|---|---|
| `mistral-large-latest` | 要約シート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズ検証、画像エージェント、Web検索エージェント、指示検出 | 最高の多言語対応＋指示追従性 |
| `mistral-ocr-4-0`（OCR 4、デフォルト） | ドキュメントOCR — 高品質 | 活字テキスト、表、手書き文字（1,000ページあたり4ドル） |
| `mistral-ocr-2512`（OCR 3、オプション） | ドキュメントOCR | 設定で選択可能、より安価（1,000ページあたり2ドル） |
| `voxtral-mini-latest` | 音声認識（STT） | 多言語STT、`language="fr"` で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音読 |
| `mistral-moderation-2603` | コンテンツモデレーション | 子ども/ティーン向けに6つのカテゴリをブロック（`jailbreaking` を含む） |
| `mistral-small-latest` | 自動ルーター | ルーティング判断のための高速なコンテンツ分析 |

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

> **注意** : Mistral Voxtral TTSが唯一のTTSプロバイダーです — `MISTRAL_API_KEY` 以外の追加キーは不要です。

> **ユーザー入力のAPIキー** : `MISTRAL_API_KEY` は現在**任意（オプション）**です。未設定の場合でもアプリは起動し、各ユーザーにインターフェース内で**自身のMistralキー**を入力するよう促します。キーは**ブラウザ内に保存され**（セキュアコンテキストではWeb Crypto + IndexedDBにより暗号化）、リクエストごとに送信されます — **サーバー上に永続化されることは決してありません**。優先順位 : プロファイルのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（環境変数）。`EUREKAI_REQUIRE_USER_KEY=true` を定義すると、各ユーザーに自身のキーの提供を強制します（環境変数のキーは事前読み込みにのみ使用されます）。

> **ローカルHTTPS（タブレット/LAN）** : `localhost` はすでにセキュアコンテキストです。LANアクセス（タブレット）の場合は、ローカル証明書を生成してHTTPSを有効化してください。これにより、ブラウザは保存するキーを暗号化でき、キーの転送中も暗号化されます :
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 環境変数

| 変数 | 必須 | デフォルト値 | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral APIキー（チャット、OCR、STT、Voxtral TTS、エージェント、モデレーション）。未設定の場合、ユーザーがアプリ内でキーを入力（ブラウザに保存、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AIリクエストに対する `MISTRAL_API_KEY` へのフォールバックを無効化（各ユーザーがキーを指定する必要があります）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLSキー/証明書パス（`scripts/gen-cert.sh` 参照） → ExpressとViteがHTTPSで配信（LAN/タブレットのセキュアコンテキスト） |
| `PORT` | 任意 | `3000` | ExpressバックエンドのHTTPポート |
| `NODE_ENV` | 任意 | `development` | `production` の場合 → Expressはフロントエンドを `dist/` から配信（それ以外は `public/`） |
| `SONAR_TOKEN` | 任意（CI） | — | SonarCloudのGitHub Actionsワークフローでのみ使用 |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Gitフック（Husky）** : `pre-commit` は `scripts/pre-commit-fast.sh`（コンフリクト、大容量ファイル、shellcheck）、`lint-staged`、次に `npm test` を順次実行します。`pre-push` はまずブロッキングチェックである `npm audit`（推移的依存関係であっても `critical` レベルの脆弱性がある場合はブロック、`scripts/audit-verdict.mjs` 参照）を実行し、その後に `npm run security` を実行します。各フックはいずれかのステップが失敗するとコミット/プッシュをブロックします。

**外部ツール（アプリケーションの起動には任意、`pretest` および `npm run security` には必須）** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test` は `pretest`（lizardがないため）で失敗し、`npm run security` は失敗します（opengrepがないため）。その結果、Huskyフックがコミット/プッシュをブロックします。

---

## コンテナによるデプロイ

イメージは **GitHub Container Registry** で公開されています :

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

> **`:U`** : ボリュームの権限を自動調整するrootless Podmanフラグ。

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

> **コードに貢献するAIエージェントへ** : 詳細なアーキテクチャのコンテキスト、必須ルール（エラーコード、コスト追跡、およびモデルが出力にそれらの単語をそのままコピーしてしまうのを防ぐための、ドキュメントのタイプなどの修飾語を含まないメタワードなしのプロンプト）、および既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrepの移行）については [`CLAUDE.md`](CLAUDE.md) を参照してください。

---

## APIリファレンス

### 設定

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定の変更（モデル、音声、TTSモデル） |
| `GET` | `/api/config/status` | APIのステータス : `mistral`（Mistralキー設定済み）、`ttsAvailable`（`mistral` のエイリアス、Mistral Voxtralが唯一のTTSプロバイダー） |
| `POST` | `/api/config/reset` | 設定をデフォルトにリセット |
| `GET` | `/api/config/voices` | Mistral TTSの音声一覧（`?lang=fr` は任意） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ＋年齢別のデフォルト値 |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力したMistralキーを検証 — 常に200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`）、環境変数へのフォールバックなし |

### プロファイル

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルを変更（15歳未満はPIN必須、15分間に10回誤ったPINを入力 → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | プロファイルの削除＋プロジェクトのカスケード処理 `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=` は任意） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細。`?profileId=` はプロファイルが設定されていないプロジェクトを開いたプロファイルに関連付けます |
| `PUT` | `/api/projects/:pid` | 名前を変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成ステータス遷移（`completed`/`failed`/`cancelled`）のリアルタイムSSEストリーム（`event: generation`）＋キープアライブハートビート |

### ソース

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートファイルのインポート（JPG/PNG/PDFはOCR、TXT/MDは直接読み取り） |
| `POST` | `/api/projects/:pid/sources/text` | 自由形式テキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声STT（マルチパート音声） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLスクレイピングまたはWeb検索 `{query}` — ソースの配列を返却。すべてのアドレスが拒否された場合（内部ネットワーク）は422 `url_blocked`、ソースを1つも作成できなかった場合は502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 保留中またはエラーとなったモデレーションを再開 `{sourceIds?}`（1回の呼び出しにつき最大10件、待機 ≤ 10秒） → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソース、そのインポートされたファイル、およびそれに依存する指示を削除 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | モデレーションを実行 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習指示を検出（検証済みソースのみ） → `{consigne, costDelta}` |

### 生成

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式クイズ（4択、正解は1つ） |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | ディクテーション（単語＋例文＋ルール、単語ごとに1つのTTS音声。自動ルーターからも提案） |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | アダプティブ復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズで間違えた問題に焦点を当てた復習シート `{generationId, weakQuestions}` — クイズ画面の救済ボタンから `quiz-review` と並行して呼び出し |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動するジェネレーターの計画） — `{plan, costDelta}`（ルーティングのみのコスト）を返却 |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング＋8種類：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。並列実行 — レート制限が8リクエスト以上の同時実行に対応するMistralティアを前提とします。そうでない場合、複数の429が `failedSteps` で発生する可能性があります。 |

すべての生成ルートは `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}` を受け付けます。未知の `ageGroup`、または有効な言語コードではない `lang`（想定値: `fr`、`pt-BR`…）の場合は、いかなるAI呼び出しよりも前に 400 `invalid_input` となります。`quiz-review` および `remediation-summary` はさらに `{generationId, weakQuestions}` を必須とし、元のクイズのソースを対象とします。

### 生成物のCRUD

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | ディクテーションの回答を送信 `{answers}`（厳密なサーバー採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答の検証（音声＋questionIndex）。口頭回答は検証前にモデレーションされます（拒絶時: 400 `quiz.answerBlocked`）、コストは `costDelta` で返却 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTSによる音読（要約シート/フラッシュカード） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 進行中の生成をキャンセル（保留中状態をキャンセルする唯一の手段） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前を変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成物とそのメディア（音声、画像）を削除 |

### チャット

| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定事項

| 決定事項 | 理由 |
|---|---|
| **React/VueではなくAlpine.jsを採用** | 最小限のフットプリント、ViteでコンパイルされたTypeScriptによる軽量なリアクティビティ。スピードが重視されるハッカソンに最適。 |
| **JSONファイルによる永続化** | 依存関係ゼロ、即時起動。設定すべきデータベースは不要 — 起動するだけで準備完了。 |
| **Vite + Handlebars** | 両者のベストな組み合わせ：開発時の高速なHMR、コード構成のためのHTMLパーシャル、Tailwind JIT。 |
| **プロンプトの一元化** | すべてのAIプロンプトを `prompts.ts` に集約 — 言語や年齢層ごとの反復改善、テスト、適合が容易。 |
| **複数生成システム** | 各生成物は独自のIDを持つ独立したオブジェクト — 1つの教材につき複数の要約シートやクイズ等を作成可能。 |
| **年齢に応じたプロンプト** | 語彙、複雑さ、トーンが異なる4つの年齢層 — 同じ内容でも学習者によって教え方を変える。 |
| **エージェントベースの機能** | 画像生成とWeb検索には一時的なMistralエージェントを使用 — 自動クリーンアップによるクリーンなライフサイクル。 |
| **スマートURLスクレイピング** | 単一の入力フィールドでURLとキーワードの混在に対応 — URLはReadability（静的ページ）経由でスクレイピングされ、Lightpanda（JS/SPAページ）にフォールバック。キーワードはMistralのweb_searchエージェントを起動。各結果から独立したソースを作成。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY` 以外の追加キー不要） — コストチェーンと言語別音声解決に統合された音声合成。 |

---

## クレジット＆謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — Webコンテンツ抽出（Firefox Reader View技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページスクレイピング用超軽量ヘッドレスブラウザ
- **[Luciole](https://luciole-vision.com)** — 視覚に配慮して設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロファイルの「読書快適性」オプション）

Mistral AI Worldwide Hackathon（2026年3月）中に開始され、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/)を用いて全面的にAIによって開発されました。

---

## 著者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**gemini-3.8-flash-highでフランス語から日本語に翻訳された記事。**
