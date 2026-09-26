<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>あらゆるコンテンツをインタラクティブな学習体験に変える — <a href="https://mistral.ai">Mistral AI</a> を搭載。</strong>
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

## 誕生の経緯 — なぜ EurekAI なのか？

**EurekAI** は、[Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)（[公式サイト](https://worldwide-hackathon.mistral.ai/)）（2026年3月）の期間中に誕生しました。何かテーマが必要だったとき、身近で具体的な課題からアイデアが浮かびました。私は娘と一緒に定期的にテスト勉強をしているのですが、AIを活用すればもっと楽しくインタラクティブにできるはずだと考えたのです。

目指したのは、**あらゆる入力**（授業のノートの写真、コピー＆ペーストしたテキスト、音声録音、ウェブ検索）を取り込み、**復習シート、フラッシュカード、クイズ、ポッドキャスト、穴埋め問題、イラストなど**へ変換することです。すべてフランス発の Mistral AI のモデルによって駆動されているため、フランス語圏の生徒にも自然に適したソリューションとなっています。

[最初のプロトタイプ](https://github.com/jls42/worldwide-hackathon.mistral.ai)は、Mistral の各種サービスを検証する概念実証としてハッカソン中の48時間で設計されました。すでに機能してはいたものの、限定的なものでした。それ以降、EurekAI は本格的なプロジェクトへと発展しました。穴埋め問題、練習問題のナビゲーション、ウェブスクレイピング、設定可能なペアレンタルモデレーション、綿密なコードレビューなど、多くの機能が追加されています。コードのすべては AI によって生成されており、主に [Claude Code](https://code.claude.com/) を使用し、[Codex](https://openai.com/codex/) や [Gemini CLI](https://geminicli.com/) による貢献も一部含まれています。

---

## 概要

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI ガイドツアー：ソース、復習シート、クイズ、フラッシュカード、イラスト" width="820" />
</p>

| | |
|---|---|
| ![ダッシュボード](docs/screenshots/dashboard.webp)<br>**ダッシュボード** — 最近の生成物、カード別およびプロジェクト全体の推定コスト、「自動 — マジック！」ボタン | ![ソース](docs/screenshots/sources.webp)<br>**ソース** — 写真/PDF/テキスト/音声/ウェブのインポート、ワンクリック生成、指示文の検出 |

インポートされた各ソースには、[OCR 信頼度スコア、モデレーション状況、推定コスト](docs/screenshots/sources-list.webp)が表示されます。

### コンポーネントの動作

| | |
|---|---|
| ![復習シート](docs/screenshots/notes.gif)<br>**復習シート** — 重要ポイント、語彙、ソース付き引用、セクション別の音声読み上げ | ![クイズ](docs/screenshots/quiz.gif)<br>**選択式クイズ** — 解説付きの即時フィードバック、ステップバイステップのナビゲーション |
| ![フラッシュカード](docs/screenshots/flashcards.gif)<br>**フラッシュカード** — カードをめくって「知っていた／知らなかった」で自己評価 | ![穴埋め問題](docs/screenshots/fillblank.gif)<br>**穴埋め問題** — オンデマンドのヒント、柔軟な正誤判定 |
| ![ディクテーション](docs/screenshots/dictation.gif)<br>**ディクテーション** — 音声で読み上げられる単語、厳密な1文字ずつの採点 | ![音声クイズ](docs/screenshots/vocal-quiz.gif)<br>**音声クイズ** — 質問を声で読み上げ、マイクで回答 |
| ![ポッドキャスト](docs/screenshots/podcast.gif)<br>**ポッドキャスト** — 2人の対話形式ミニポッドキャスト、台本の閲覧も可能 | ![イラスト](docs/screenshots/illustrations.gif)<br>**イラスト** — Agent が生成する教育用画像 |
| ![AIチューター](docs/screenshots/chat.gif)<br>**AIチューター** — 授業資料に根ざしたチャット、解説付きの回答、クイズやフラッシュカードの生成も可能 | |

### はじめ方

| | |
|---|---|
| ![プロファイル選択](docs/screenshots/login.gif)<br>**プロファイル選択** — お子様ごとに個別のスペース、アバター、言語を設定 | ![プロファイル作成](docs/screenshots/profile-create.gif)<br>**プロファイル作成** — 年齢、アバター、15歳未満向けの保護者PIN |
| ![コース作成](docs/screenshots/course.gif)<br>**コース作成** — 授業ごとのプロジェクトを作成し、ソースを取り込む準備を完了 | ![設定](docs/screenshots/settings.gif)<br>**設定** — API ステータス、料金が表示された AI モデルの選択 |

---

## 機能一覧

| | 機能 | 説明 |
|---|---|---|
| 📷 | **ファイルのインポート** | レッスンの取り込み — 写真、PDF（平均信頼度スコア、ティア `high`/`medium`/`low` を備えた Mistral OCR 経由）、またはテキストファイル（TXT、MD）。ファイルごとのリトライと個別プログレス表示を備えたアップロードセッション |
| 📝 | **テキスト入力** | 任意のテキストを直接入力または貼り付け |
| 🎤 | **音声入力** | 音声を録音 — Voxtral STT が音声を文字起こし |
| 🌐 | **Web / URL** | URL を貼り付けて直接スクレイピング（Readability + JSページ向け Lightpanda）、またはキーワード入力でウェブ検索（Mistral Agent の web_search） |
| 📄 | **復習シート** | 重要ポイント、語彙、引用、豆知識を整理した構造化ノート |
| 🃏 | **フラッシュカード** | インタラクティブな一問一答カード、対話形式の音声読み上げ |
| ❓ | **選択式クイズ** | 間違えた問題に適応する復習機能を備えた多肢選択式問題（問題数は設定可能） |
| ✏️ | **穴埋め問題** | ヒント機能と柔軟な正誤判定を備えた穴埋め問題 |
| 🔤 | **ディクテーション** | インポートされたリストから音声読み上げ（Voxtral TTS）、キーボード入力、つづりの規則解説付きの厳密な1文字ずつの採点 |
| 🎙️ | **ポッドキャスト** | 音声による2人の対話ミニポッドキャスト — デフォルトの Mistral 音声またはカスタム音声（保護者の声など！） |
| 🖼️ | **イラスト** | Mistral Agent によって生成される教育用画像 |
| 🗣️ | **音声クイズ** | 質問の読み上げ（カスタム音声も可能）、声による回答、AI による判定 |
| 💬 | **AIチューター** | 授業の資料に基づいた、ツール呼び出し対応のコンテキスト型チャット |
| 🧠 | **自動ルーター** | `mistral-small-latest` ベースのルーターがコンテンツを分析し、利用可能な8種類のジェネレーターから最適な組み合わせを提案 |
| 🔒 | **ペアレンタルコントロール** | プロファイルごとに設定可能なモデレーション（カテゴリのカスタマイズ可能）、保護者PIN、チャットの制限 |
| 🌍 | **多言語対応** | インターフェースは9言語に対応。プロンプトを通じた AI 生成は15言語で制御可能 |
| 🔊 | **音声読み上げ** | 復習シートやフラッシュカード（質問／回答の対話）を Mistral Voxtral TTS でリスニング |
| 💶 | **API コスト追跡** | 各生成およびソースの推定コスト（トークン／文字数／ページ数／音声秒数）をユーロ（€）で透明性高く表示。カードごとのバッジとプロジェクト合計をダッシュボードに表示 |
| 🎨 | **プロファイル別テーマ** | プロファイルごとに `dark` または `light` のテーマを選択可能 — プロファイル切り替え後も保持 |

---

## アーキテクチャの概要

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## モデル利用マップ

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## ユーザーフロー

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 機能の詳細解説

### マルチモーダル入力

EurekAI は4種類のソースを受け付け、プロファイルに応じてモデレーションを行います（子どもおよびティーンエイジャーではデフォルトで有効）：

- **ファイルのインポート** — JPG、PNG、または PDF ファイルを Mistral OCR で処理 — デフォルトでは **OCR 4（`mistral-ocr-4-0`）**（最高品質）、設定でオプションとして **OCR 3（`mistral-ocr-2512`）**（より安価、コスト約半分）を選択可能 — 印刷テキスト、表、手書き文字に対応。TXT や MD などのテキストファイルは直接インポートされます。複数ファイルのアップロードには**アップロードセッション**方式を採用しています。ファイルごとの個別プログレス、他のファイルを再送信することなく失敗したファイルのみのリトライ、完了時のセッションの破棄が可能です。OCR は平均**信頼度スコア**（`average`、`[0,1]` の範囲にクランプ、Mistral から返された `averagePageConfidenceScore` から算出）を提供し、UI 上にティア `high` / `medium` / `low` のバッジ（しきい値 約0.9 / 約0.7）として表示されます。スキャン品質が低い場合でも処理をブロックすることなく警告します。OCR 処理のために Mistral へ送信されたドキュメントのコピーは、失敗した場合も含め処理完了後すぐに削除されます。
- **自由記述テキスト** — 任意のコンテンツを入力または貼り付け。モデレーションが有効な場合は保存前にチェックされます。
- **音声入力** — ブラウザで音声を録音。`voxtral-mini-latest` によって文字起こしされます。`language="fr"` パラメータにより認識精度が最適化されます。
- **Web / URL** — 1つ以上の URL を貼り付けてコンテンツを直接スクレイピング（JS ページには Readability + Lightpanda を使用）、または Mistral Agent を介してウェブ検索を行うキーワードを入力。単一の入力欄で両方を受け付け、URL とキーワードは自動的に分類され、各結果が個別のソースとして作成されます。

### AI コンテンツ生成

生成される8種類の学習教材：

| ジェネレーター | モデル | 出力 |
|---|---|---|
| **復習シート** | `mistral-large-latest` | タイトル、要約、重要ポイント、語彙、引用、豆知識 |
| **フラッシュカード** | `mistral-large-latest` | ソースへの参照付きの一問一答カード（枚数は設定可能） |
| **選択式クイズ** | `mistral-large-latest` | 多肢選択式問題、解説、適応型復習（問題数は設定可能） |
| **穴埋め問題** | `mistral-large-latest` | ヒント付きの穴埋め文、柔軟な正誤判定（レーベンシュタイン距離） |
| **ディクテーション** | `mistral-large-latest` + Voxtral TTS | 音声で読み上げられる重要単語（単語ごとに1つのMP3）→ キーボード入力 → 正書法ルール解説付きの厳密な採点（アクセント含む） |
| **ポッドキャスト** | `mistral-large-latest` + Voxtral TTS | 2人対話スクリプト → MP3 音声 |
| **イラスト** | Agent `mistral-large-latest` | `image_generation` ツールによる教育用画像 |
| **音声クイズ** | `mistral-large-latest` + Voxtral TTS + STT | TTS による質問 → STT による回答 → AI による判定 |

### チャットによる AI チューター

コースドキュメントに完全アクセスできる対話型チューター：

- `mistral-large-latest` を使用
- **ツール呼び出し**：会話中に復習シート、フラッシュカード、クイズ、穴埋め問題を生成可能
- 1コースあたり50件のメッセージ履歴
- プロファイルで有効な場合のモデレーション：メッセージがチェックされ、フラグが設定されたソース、エラーのソース、または未確認のソースは、コンテキストやツールから除外されます（まず最大5秒間、再チェックが実行されます）

### 自動ルーター

ルーターは `mistral-small-latest` を使用してソースの内容を分析し、利用可能な8種類のジェネレーターの中から最も適切なものを提案します。インターフェースにはリアルタイムで進行状況が表示されます。最初に分析フェーズが行われ、その後にキャンセル可能な個別の生成が行われます。

### アダプティブラーニング

- **クイズ統計**：問題ごとの試行回数と正解率の追跡
- **クイズの復習**：元のクイズのソースから、苦手な概念をターゲットにした5〜10問の新しい問題を生成（モデレーションガードは同一のソースに適用されます）
- **指示文の検出**：復習の指示（「〜が分かっていればこの単元は理解できている」など）を検出し、対応するテキストジェネレーター（シート、フラッシュカード、クイズ、穴埋め問題）で優先的に処理。モデレーションが有効な場合、検出処理はソースの検証を待ち、安全と判定されたソースのみを読み込みます。指示文は生成元ソースのリストを保持し、そのうちの1つでもフラグが立った場合は表示も適用もされず、そのソースとともに削除されます。その処理コストも計上されます

### セキュリティ＆ペアレンタルコントロール

- **4つの年齢グループ**：子ども（10歳以下）、ティーンエイジャー（11〜15歳）、学生（16〜25歳）、大人（26歳以上）
- **コンテンツモデレーション**：11の利用可能なカテゴリを備えた `mistral-moderation-2603`（Mistral Moderation 2）。新しい子ども／ティーンエイジャーのプロファイルでは6つがデフォルトでブロック（`sexual`、`hate_and_discrimination`、`violence_and_threats`、`criminal`、`selfharm`、`jailbreaking`。`criminal` は歴史を含む50のレッスンでテストし、偽陽性がゼロであることを確認した上で追加）。設定からプロファイルごとにカテゴリをカスタマイズ可能。Moderation 2 では従来の「危険なコンテンツ」カテゴリが `dangerous` と `criminal` に分割されました（既存のプロファイルは自動的に移行され、ブロックされたカテゴリはすでにインポートされているソースにも適用されます）。安全優先の設計：モデルの応答でブロックされたカテゴリを検証できない場合、コンテンツは拒否されます（「モデレーション利用不可」）。モデレーションが有効な場合、生成およびチャットの両方で、フラグ付き、エラー、または検証中のソースが除外されます。一度も検証されていないソース（モデレーション無効時にインポートされたもの、プロファイルに関連付けられた古いプロジェクトのもの）は使用前に検証されます。再起動によって中断された、あるいはエラーになったモデレーションは自動的に再開され（サーバーキーが利用可能な場合は起動時、それ以外はプロジェクトを開いた際または次の生成時）、必要に応じて「再検証」ボタンで手動再開も可能です。フラグが設定された、または検証中のソースのコンテンツは子どもには非表示になります（プレビュー、テキスト、元のドキュメント）。保護者は PIN を入力することで一時的に閲覧できます。音声クイズの口頭での回答は、正誤判定の前にモデレーションが行われます。`helpers/moderation-model.ts` に固定された日付付き ID：非推奨のエイリアス `-latest` は API でリストされなくなりました。
- **保護者 PIN**：SHA-256 ハッシュ。15歳未満のプロファイルで必須。IP アドレスごとに15分あたり最大10回の誤入力制限（429 `rate_limited`）。本番環境のデプロイでは、ソルト付きの低速ハッシュ（Argon2id、bcrypt）を推奨します。
- **サーバーデータ**：`/output` はプロジェクトのメディア（音声、画像、インポートされたファイル）のみを公開します。`profiles.json`、`config.json`、およびプロジェクトのファイル自体が直接提供されることはありません
- **チャット制限**：AI チャットは16歳未満ではデフォルトで無効化されており、保護者が有効化できます

### マルチプロファイルシステム

- 名前、年齢、アバター、言語設定を備えた複数のプロファイル
- **プロファイル別音声**（`Profile.mistralVoices?: { host?, guest? }` — 各役割は任意）— お子様ごとにポッドキャスト／音声クイズ用の音声ペアを設定可能
- **プロファイル別テーマ**（`Profile.theme: 'dark' | 'light'`）— プロファイル切り替え時に自動的に切り替わり、バックエンド側で保持
- `profileId` を介してプロファイルにリンクされたプロジェクト。プロファイルが紐付いていない古いプロジェクトは、それを最初に開いたプロファイルに関連付けられ、そのプロファイルに基づいてモデレーションが行われます
- カスケード削除：プロファイルを削除すると、関連するすべてのプロジェクトも削除されます

### APIコスト追跡

指示の検出や音声クイズの口頭回答を含め、課金対象となる各Mistral呼び出し（チャット、OCR、STT、TTS、エージェント）は、ユーザーに**透明性のある**ユーロ（€）見積もりを提供するために計測されます。無料のモデレーションはカウントされません。エージェントのツール費用が含まれます：ウェブ検索1回あたり0.03ドル、生成画像1枚あたり0.10ドル（Mistral料金）、さらにこれらのツールによって生成されたトークンは、エージェントモデルの入力料金でカウントされます。

- **信頼できる唯一の情報源（Source of Truth）**：`helpers/pricing.ts` — モデルのプレフィックスごとの`MODEL_PRICING`（例：`mistral-large` → 入力 0.5 €/1M トークン、出力 1.5 €/1M トークン）、定期的な再スクレイピング用のMistralドキュメントURLを含む`PRICING_SOURCES`
- **サポートされている単位**：`tokens`、`characters`（TTS）、`pages`（OCR）、`audio-seconds`（STT） — `helpers/cost-calc.ts`による変換
- **計測チェーン**：`helpers/tracked-client.ts`（Mistralクライアントのラップ） → `helpers/usage-context.ts`（AsyncLocalStorage） → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`（HTTPレスポンスへの注入）
- **UI**：生成ごとのコストバッジ（`src/partials/cost-badge-gen.html`）、ソースごと（`cost-badge-src.html`）、ダッシュボード内の累計合計（`Project.totalCost`）
- **エンドポイント**：`/generate/*`および`/sources/*`のレスポンスは、返されるオブジェクト（Generation / Source）を`estimatedCost`、`usage`、および`costBreakdown`で修飾します。`POST /generate/route`はルーティング単体のコスト用にフィールド`costDelta: number`を追加します。`POST /detect-consigne`（`{consigne, costDelta}`）および口頭回答の検証も各自の`costDelta`を返します。`GET /projects/:pid`は`totalCost`（`costLog[]`から算出された合計）+ 完全な履歴が付与されたプロジェクトを返します

### TTS（Mistral Voxtral）とカスタム音声

- **Mistral Voxtral TTS**：`voxtral-mini-tts-latest`、100% Mistralによる音声合成、追加のキーは不要
- **カスタム音声**：保護者はMistral Voices API経由で独自の音声を作成し（音声サンプルから）、ホスト/ゲストの役割に割り当てることができます — これにより、ポッドキャストや音声クイズが保護者の声で読み上げられ、子供にとってより没入感のある体験になります
- 設定可能な2つの音声ロール：**ホスト**（メインナレーター）と**ゲスト**（ポッドキャストの2人目の声）
- 設定から利用可能なMistral音声の完全なカタログ（言語によるフィルタリング可能）

### 国際化

- 9言語で利用可能なインターフェース：fr、en、es、pt、it、nl、de、hi、ar
- AIプロンプトは15言語に対応（fr、en、es、de、it、pt、nl、ja、zh、ko、ar、hi、pl、ro、sv）
- プロファイルごとに言語を設定可能

---

## 技術スタック

| レイヤー | テクノロジー | 役割 |
|---|---|---|
| **ランタイム** | Node.js + TypeScript 6.x | サーバーおよび型の安全性 |
| **バックエンド** | Express 5.x | REST API |
| **開発サーバー** | Vite 8.x (Rolldown) + tsx | HMR、Handlebarsパーシャル、プロキシ |
| **フロントエンド** | HTML + TailwindCSS 4.x + Alpine.js 3.x | リアクティブインターフェース、ViteによってコンパイルされるTypeScript |
| **テンプレート** | vite-plugin-handlebars | パーシャルによるHTML構成 |
| **AI** | Mistral AI SDK 2.x | チャット、OCR、STT、TTS、エージェント、モデレーション |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`、統合音声合成 |
| **アイコン** | Lucide 1.x | SVGアイコンライブラリ |
| **ウェブスクレイピング** | Readability + linkedom | ウェブページのメインコンテンツ抽出（Firefox Reader View技術） |
| **ヘッドレスブラウザ** | Lightpanda | JS/SPAページ用の超軽量ヘッドレスブラウザ（Zig + V8） — スクレイピングのフォールバック |
| **Markdown** | Marked | チャット内でのMarkdownレンダリング |
| **ファイルアップロード** | Multer 2.x | マルチパートフォームの管理 |
| **オーディオ** | ffmpeg-static | オーディオセグメントの連結 |
| **テスト** | Vitest | 単体テスト — SonarCloudで測定されるカバレッジ |
| **永続化** | JSONファイル | 依存関係のないストレージ |

---

## モデルリファレンス

| モデル | 用途 | 理由 |
|---|---|---|
| `mistral-large-latest` | 復習シート、フラッシュカード、ポッドキャスト、クイズ、穴埋め問題、チャット、音声クイズ検証、画像エージェント、Web検索エージェント、指示検出 | 最高のマルチリンガル性能 + 指示追従性 |
| `mistral-ocr-4-0`（OCR 4、デフォルト） | ドキュメントのOCR — 高品質 | 印刷テキスト、表、手書き文字（$4 / 1000ページ） |
| `mistral-ocr-2512`（OCR 3、オプション） | ドキュメントのOCR | 設定で選択可能、より安価（$2 / 1000ページ） |
| `voxtral-mini-latest` | 音声認識（STT） | マルチリンガルSTT、`language="fr"`で最適化 |
| `voxtral-mini-tts-latest` | 音声合成（TTS） | ポッドキャスト、音声クイズ、音読 |
| `mistral-moderation-2603` | コンテンツモデレーション | 子ども/ティーンエイジャー向けに6つのカテゴリをブロック（`jailbreaking`を含む） |
| `mistral-small-latest` | 自動ルーター | ルーティング決定のための迅速なコンテンツ分析 |

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

> **注意**：Mistral Voxtral TTSが唯一のTTSプロバイダーです — `MISTRAL_API_KEY`以外の追加キーは必要ありません。

> **ユーザー入力のAPIキー**：`MISTRAL_API_KEY`は現在**任意**です。キーが存在しない場合でもアプリは起動し、インターフェース上で各ユーザーに**自身のMistralキー**を入力するよう促します。キーは**ブラウザに保存され**（安全なコンテキスト下でWeb Crypto + IndexedDBを介して暗号化）、リクエストごとに送信されます — **サーバー上に永続化されることは決してありません**。優先順位：プロファイルのキー > ブラウザのグローバルキー > `MISTRAL_API_KEY`（環境変数）。`EUREKAI_REQUIRE_USER_KEY=true`を設定すると、各ユーザーにキーの提供を強制します（環境変数のキーは事前読み込みにのみ使用されます）。

> **ローカルHTTPS（タブレット/LAN）**：`localhost`はすでに安全なコンテキストです。LANアクセス（タブレット）の場合は、ローカル証明書を生成してHTTPSを有効化し、ブラウザ暗号化のブロックを解除して転送中のキーを暗号化します：
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcertが利用可能な場合はそれを使用、なければopenssl自己署名
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # HTTPSでのExpress + Vite
> ```

### 環境変数

| 変数 | 必須 | デフォルト | 役割 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 任意 | — | Mistral APIキー（チャット、OCR、STT、Voxtral TTS、エージェント、モデレーション）。存在しない場合、ユーザーはアプリ内でキーを入力します（ブラウザに保存され、サーバーには保存されません） |
| `EUREKAI_REQUIRE_USER_KEY` | 任意 | `false` | `true` → AIリクエストにおける`MISTRAL_API_KEY`へのフォールバックを無効化（各ユーザーは自身のキーを提供しなければなりません）。公開インスタンスで有用 |
| `HTTPS_KEY` / `HTTPS_CERT` | 任意 | — | TLSのキー/証明書のパス（`scripts/gen-cert.sh`を参照） → ExpressとViteがHTTPSで提供（LAN/タブレットの安全なコンテキスト） |
| `PORT` | 任意 | `3000` | ExpressバックエンドのHTTPポート |
| `NODE_ENV` | 任意 | `development` | `production`の場合 → Expressは`dist/`からフロントエンドを提供（それ以外は`public/`） |
| `SONAR_TOKEN` | CIで任意 | — | SonarCloudのGitHub Actionsワークフローのみで使用 |

### テスト、コード品質、コントリビューション

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Gitフック（Husky）**：`pre-commit`は`scripts/pre-commit-fast.sh`（競合、大容量ファイル、shellcheck）、`lint-staged`、そして`npm test`を順次実行します。`pre-push`はまずゲート`npm audit`を実行し（推移的な重大な脆弱性をブロック、`scripts/audit-verdict.mjs`を参照）、その後に`npm run security`を実行します。すべて失敗時にはコミット/プッシュをブロックします。

**必要な外部ツール（任意ですが、`pretest` / `npm run security`で使用）**：

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

これらのツールがない場合、`npm test`は`pretest`で失敗し（lizard不在）、`npm run security`は失敗します（opengrep不在）。その結果、huskyフックがコミット/プッシュをブロックします。

---

## コンテナによるデプロイ

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

> **`:U`** は、ボリュームの権限を自動調整するrootless Podmanフラグです。

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## プロジェクト構造

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

> **AIコントリビューター向け**：アーキテクチャの詳細なコンテキスト、必須ルール（プロンプト流出防止、エラーコード、コスト追跡）、および既知の落とし穴（Lizard CCN、Opengrep、Codacy/Semgrep移行）については、[`CLAUDE.md`](CLAUDE.md)を参照してください。

---

## APIリファレンス

### 設定
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/config` | 現在の設定 |
| `PUT` | `/api/config` | 設定の変更（モデル、音声、TTSモデル） |
| `GET` | `/api/config/status` | APIステータス：`mistral`（Mistralキー設定済み）、`ttsAvailable`（`mistral`のエイリアス、Mistral Voxtralが唯一のTTSプロバイダー） |
| `POST` | `/api/config/reset` | 設定をデフォルトにリセット |
| `GET` | `/api/config/voices` | Mistral TTSの音声を一覧表示（オプションで`?lang=fr`） |
| `GET` | `/api/moderation-categories` | 利用可能なモデレーションカテゴリ + 年齢別デフォルト |
| `POST` | `/api/providers/mistral/validate` | ユーザーが入力したMistralキーの検証 — 常に200 `{status}`（`ok`/`invalid`/`quota`/`network`/`missing`）、環境変数へのフォールバックなし |

### プロファイル
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/profiles` | すべてのプロファイルを一覧表示 |
| `POST` | `/api/profiles` | プロファイルを作成 |
| `PUT` | `/api/profiles/:id` | プロファイルの変更（15歳未満はPIN必須。15分間に10回誤ったPINを入力 → 429 `rate_limited`） |
| `DELETE` | `/api/profiles/:id` | プロファイルの削除 + プロジェクトのカスケード `{pin?}` → `{ok, deletedProjects}` |

### プロジェクト
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects` | プロジェクトを一覧表示（`?profileId=`は任意） |
| `POST` | `/api/projects` | プロジェクトを作成 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | プロジェクトの詳細。`?profileId=`はプロファイルのないプロジェクトを開いたプロファイルに関連付けます |
| `PUT` | `/api/projects/:pid` | 名前の変更 `{name}` |
| `DELETE` | `/api/projects/:pid` | プロジェクトを削除 |
| `GET` | `/api/projects/:pid/events` | 生成遷移のリアルタイムSSEストリーム（`event: generation`）（`completed`/`failed`/`cancelled`） + キープアライブハートビート |

### ソース
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | マルチパートファイルのインポート（JPG/PNG/PDF用のOCR、TXT/MDの直接読み込み） |
| `POST` | `/api/projects/:pid/sources/text` | フリーテキスト `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 音声STT（マルチパートオーディオ） |
| `POST` | `/api/projects/:pid/sources/websearch` | URLスクレイピングまたはウェブ検索 `{query}` — ソースの配列を返します。すべてのアドレスが拒否された場合は422 `url_blocked`（内部ネットワーク）、ソースを1つも作成できなかった場合は502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 保留中またはエラー状態のモデレーションを再開 `{sourceIds?}`（1回の呼び出しにつき最大10件、待機時間 ≤ 10秒） → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | ソース、インポートされたファイル、およびそれに依存する指示を削除 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | モデレーションを実行 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 復習の指示を検出（検証済みソースのみ） → `{consigne, costDelta}` |

### 生成
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 復習シート |
| `POST` | `/api/projects/:pid/generate/flashcards` | フラッシュカード |
| `POST` | `/api/projects/:pid/generate/quiz` | 選択式クイズ |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 穴埋め問題 |
| `POST` | `/api/projects/:pid/generate/dictation` | ディクテーション（単語 + 例文 + ルール、単語ごとに1つのTTSオーディオ。自動ルーターによっても提案されます） |
| `POST` | `/api/projects/:pid/generate/podcast` | ポッドキャスト |
| `POST` | `/api/projects/:pid/generate/image` | イラスト |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 音声クイズ |
| `POST` | `/api/projects/:pid/generate/quiz-review` | アダプティブ復習 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | クイズで間違えた問題に焦点を当てた復習シート `{generationId, weakQuestions}` — 「間違いを練習する」ボタンによって`quiz-review`と並行して呼び出されます |
| `POST` | `/api/projects/:pid/generate/route` | ルーティング分析（起動するジェネレーターの計画） — `{plan, costDelta}`（ルーティング単体のコスト）を返します |
| `POST` | `/api/projects/:pid/generate/auto` | バックエンド自動生成（ルーティング + 8つのタイプ：summary、flashcards、quiz、fill-blank、podcast、quiz-vocal、image、dictation）。並列実行 — レート制限が8リクエスト以上の同時実行をサポートするMistralティアを想定しています。そうでない場合、複数の429が`failedSteps`に返される可能性があります。 |

すべての生成ルートは`{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`を受け入れます。言語コード（例：`pt-BR`）ではない`lang`、または不明な`ageGroup` → AI呼び出しの前に400 `invalid_input`。`quiz-review`および`remediation-summary`はさらに`{generationId, weakQuestions}`を必要とし、元のクイズのソースを対象とします。

### 生成CRUD
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | クイズの回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 穴埋め問題の回答を送信 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | ディクテーションの回答を送信 `{answers}`（厳格なサーバー採点） |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 口頭回答を検証（音声 + questionIndex）。回答はモデレーションされ（400 `quiz.answerBlocked`）、コストは`costDelta`で返されます |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTSによる音読（復習シート/フラッシュカード） |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 進行中の生成をキャンセル（保留中状態をキャンセルする唯一のパス） |
| `PUT` | `/api/projects/:pid/generations/:gid` | 名前の変更 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 生成物とそのメディア（音声、画像）を削除 |

### チャット
| メソッド | エンドポイント | 説明 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | チャット履歴を取得 |
| `POST` | `/api/projects/:pid/chat` | メッセージを送信 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | チャット履歴を消去 |

---

## アーキテクチャ上の決定

| 決定事項 | 正当な理由 |
|---|---|
| **React/VueではなくAlpine.jsを採用** | 最小限のフットプリント、ViteでコンパイルされたTypeScriptによる軽量なリアクティビティ。スピードが重要なハッカソンに最適。 |
| **JSONファイルへの永続化** | 依存関係ゼロ、即時起動。セットアップするデータベースはありません — 起動するだけですぐに使えます。 |
| **Vite + Handlebars** | 両方の利点を享受：開発用の高速なHMR、コード整理のためのHTMLパーシャル、Tailwind JIT。 |
| **一元管理されたプロンプト** | すべてのAIプロンプトを`prompts.ts`に配置 — 言語/年齢層に応じた反復、テスト、適応が容易。 |
| **複数生成システム** | 各生成物は独自のIDを持つ独立したオブジェクト — コースごとに複数のシートやクイズなどを作成可能。 |
| **年齢に応じたプロンプト** | 語彙、複雑さ、口調が異なる4つの年齢層 — 同じコンテンツでも学習者に応じて教え方を変えられます。 |
| **エージェントベースの機能** | 画像生成とWeb検索には一時的なMistral Agentsを使用 — 自動クリーンアップを伴うクリーンなライフサイクル。 |
| **インテリジェントなURLスクレイピング** | 単一の入力フィールドでURLとキーワードの混在を受け入れ — URLはReadability（静的ページ）経由でスクレイピングされ、Lightpanda（JS/SPAページ）へのフォールバックを備えています。キーワードはMistralのweb_searchエージェントをトリガーします。各結果は独立したソースを作成します。 |
| **100% Mistral TTS** | Mistral Voxtral TTS（`MISTRAL_API_KEY`以外の追加キー不要） — コストチェーンと言語ごとの音声解決に統合された音声合成。 |

---

## クレジット＆謝辞

- **[Mistral AI](https://mistral.ai)** — AIモデル（Large、OCR、Voxtral STT、Voxtral TTS、Moderation、Small）+ Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 軽量リアクティブフレームワーク
- **[TailwindCSS](https://tailwindcss.com)** — ユーティリティCSSフレームワーク
- **[Vite](https://vitejs.dev)** — フロントエンドビルドツール
- **[Lucide](https://lucide.dev)** — アイコンライブラリ
- **[Marked](https://marked.js.org)** — Markdownパーサー
- **[Readability](https://github.com/mozilla/readability)** — Webコンテンツ抽出（Firefox Reader View技術）
- **[Lightpanda](https://lightpanda.io)** — JS/SPAページのスクレイピング向け超軽量ヘッドレスブラウザ
- **[Luciole](https://luciole-vision.com)** — 視覚障がい者向けに設計されたフォント、© Laurent Bourcellier & Jonathan Perez、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（プロファイルの「読書快適性」オプション）

Mistral AI Worldwide Hackathon（2026年3月）で開始され、[Claude Code](https://code.claude.com/)、[Codex](https://openai.com/codex/)、[Gemini CLI](https://geminicli.com/)を活用して全面的にAIによって開発されました。

---

## 作者

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## ライセンス

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**gemini-3.8-flash-mediumでフランス語から日本語に翻訳された記事。**
