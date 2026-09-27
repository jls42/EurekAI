<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 로고" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>모든 콘텐츠를 대화형 학습 경험으로 변환합니다 — <a href="https://mistral.ai">Mistral AI</a> 기반.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube 데모"></a>
</p>

<h4 align="center">📊 코드 품질</h4>

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

## 탄생 배경 — 왜 EurekAI인가?

**EurekAI**는 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)([공식 사이트](https://worldwide-hackathon.mistral.ai/))(2026년 3월) 기간에 탄생했습니다. 해커톤에 참여할 주제가 필요했는데, 매우 일상적이고 구체적인 경험에서 아이디어를 얻었습니다. 평소 딸아이와 함께 시험공부를 하곤 하는데, AI를 활용하면 이 과정을 훨씬 더 재미있고 대화형으로 만들 수 있겠다고 생각했습니다.

목표는 **어떤 형태의 입력이든** — 수업 내용 사진, 복사하여 붙여넣은 텍스트, 음성 녹음, 웹 검색 등 — 받아 **요약 노트, 플래시카드, 퀴즈, 팟캐스트, 빈칸 채우기, 삽화 등으로** 변환하는 것입니다. 프랑스 기업 Mistral AI의 모델로 구동되므로, EurekAI는 프랑스어를 사용하는 학생들에게도 자연스럽게 최적화된 솔루션입니다.

[초기 프로토타입](https://github.com/jls42/worldwide-hackathon.mistral.ai)은 Mistral 서비스를 기반으로 구축된 개념 증명(PoC)으로서 해커톤 48시간 동안 제작되었습니다. 이미 작동은 가능했지만 기능이 제한적이었습니다. 그 후 EurekAI는 빈칸 채우기, 연습 문제 탐색, 웹 스크래핑, 설정 가능한 자녀 보호 모더레이션, 심층 코드 리뷰 등 다양한 기능을 갖춘 본격적인 프로젝트로 발전했습니다. 모든 코드는 AI가 생성했으며, 주로 [Claude Code](https://code.claude.com/)를 활용하고 [Codex](https://openai.com/codex/) 및 [Gemini CLI](https://geminicli.com/)의 일부 기여를 받았습니다.

---

## 둘러보기

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 둘러보기: 소스, 요약 노트, 퀴즈, 플래시카드, 삽화" width="820" />
</p>

| | |
|---|---|
| ![대시보드](docs/screenshots/dashboard.webp)<br>**대시보드** — 최근 생성 내역, 카드별 및 프로젝트 총 예상 비용, "자동 — 매직!" 버튼 | ![소스](docs/screenshots/sources.webp)<br>**소스** — 사진/PDF/텍스트/음성/웹 가져오기, 원클릭 생성, 학습 지침 감지 |

가져온 각 소스에는 [OCR 신뢰도 점수, 모더레이션 상태 및 예상 비용](docs/screenshots/sources-list.webp)이 표시됩니다.

### 기능별 동작 화면

| | |
|---|---|
| ![요약 노트](docs/screenshots/notes.gif)<br>**요약 노트** — 핵심 요약, 어휘, 출처가 있는 인용구, 섹션별 오디오 재생 | ![퀴즈](docs/screenshots/quiz.gif)<br>**객관식 퀴즈** — 문항당 단 하나의 정답, 해설과 함께 즉각적인 피드백, 단계별 진행 |
| ![플래시카드](docs/screenshots/flashcards.gif)<br>**플래시카드** — 카드를 뒤집은 후 "알고 있었음 / 모르고 있었음" 자가 평가 | ![빈칸 채우기](docs/screenshots/fillblank.gif)<br>**빈칸 채우기** — 요청 시 힌트 제공, 유연한 정답 검증 |
| ![받아쓰기](docs/screenshots/dictation.gif)<br>**받아쓰기** — 오디오로 단어 받아쓰기, 엄격한 글자 단위 채점 | ![음성 퀴즈](docs/screenshots/vocal-quiz.gif)<br>**음성 퀴즈** — 음성으로 질문 낭독, 마이크를 통한 답변 |
| ![팟캐스트](docs/screenshots/podcast.gif)<br>**팟캐스트** — 2인 음성 미니 팟캐스트, 대화 대본 열람 가능 | ![삽화](docs/screenshots/illustrations.gif)<br>**삽화** — Agent가 생성한 교육용 이미지 |
| ![AI 튜터](docs/screenshots/chat.gif)<br>**AI 튜터** — 수업 문서 기반 채팅, 친절한 설명, 퀴즈 및 플래시카드 즉석 생성 가능 | |

### 시작하기

| | |
|---|---|
| ![프로필 선택](docs/screenshots/login.gif)<br>**프로필 선택** — 자녀별 맞춤 공간, 아바타 및 언어 설정 | ![프로필 생성](docs/screenshots/profile-create.gif)<br>**프로필 생성** — 나이, 아바타, 15세 미만을 위한 부모 안심 PIN |
| ![수업 생성](docs/screenshots/course.gif)<br>**수업 생성** — 수업별 프로젝트, 소스를 추가할 준비 완료 | ![설정](docs/screenshots/settings.gif)<br>**설정** — API 상태, 요금이 표시된 AI 모델 선택 |

---

## 기능

| | 기능 | 설명 |
|---|---|---|
| 📷 | **파일 가져오기** | 수업 자료 가져오기 — 사진, PDF(평균 신뢰도 점수 및 등급 `high`/`medium`/`low`을(를) 제공하는 Mistral OCR 사용) 또는 텍스트 파일(TXT, MD). 파일별 재시도 및 개별 진행률을 지원하는 업로드 세션 제공 |
| 📝 | **텍스트 입력** | 원하는 텍스트를 직접 입력하거나 붙여넣기 |
| 🎤 | **음성 입력** | 음성 녹음 — Voxtral STT가 음성을 텍스트로 변환 |
| 🌐 | **웹 / URL** | URL 붙여넣기(Readability + Lightpanda를 통한 직접 스크래핑) 또는 검색어 입력(Mistral Agent web_search) |
| 📄 | **요약 노트** | 핵심 요약, 어휘, 인용구, 토막 상식이 포함된 구조화된 노트 |
| 🃏 | **플래시카드** | 대화형 Q&A 카드, 대화식 오디오 재생 |
| ❓ | **객관식 퀴즈** | 단 하나의 정답이 있는 4지 선다형 질문, 취약점 적응형 복습 제공(문항 수 설정 가능) |
| ✏️ | **빈칸 채우기** | 힌트 및 유연한 정답 검증이 포함된 빈칸 채우기 연습 |
| 🔤 | **받아쓰기** | 가져온 목록의 단어를 오디오(Voxtral TTS)로 듣고 키보드로 입력, 맞춤법 규칙 설명과 함께 엄격한 철자 단위 채점 |
| 🎙️ | **팟캐스트** | 오디오 기반 2인 미니 팟캐스트 — 기본 Mistral 음성 또는 맞춤 음성(부모님 목소리 등) 지원 |
| 🖼️ | **삽화** | Mistral Agent가 생성한 교육용 이미지 |
| 🗣️ | **음성 퀴즈** | 음성으로 질문 낭독(맞춤 음성 가능), 구두 답변, AI 검증 |
| 💬 | **AI 튜터** | 수업 문서를 바탕으로 대화하며 도구 호출(Tool calling)을 지원하는 문맥 기반 채팅 |
| 🧠 | **자동 라우터** | `mistral-small-latest` 기반 라우터가 콘텐츠를 분석하여 사용 가능한 8가지 유형 중 최적의 생성기 조합을 제안 |
| 🔒 | **자녀 보호 기능** | 프로필별 맞춤 모더레이션(카테고리 사용자 정의), 부모 안심 PIN, 채팅 제한 |
| 🌍 | **다국어 지원** | 인터페이스 9개 언어 지원, 프롬프트를 통해 15개 언어로 AI 생성 제어 가능 |
| 🔊 | **음성 낭독 (TTS)** | Mistral Voxtral TTS를 통해 요약 노트 및 플래시카드(질문/답변 대화) 듣기 |
| 💶 | **API 비용 추적** | 각 생성 및 소스별 유로(€) 비용 투명 예측 (토큰 / 글자 수 / 페이지 / 오디오 시간(초)). 대시보드에서 카드별 배지 + 프로젝트별 총비용 확인 가능 |
| 🎨 | **프로필별 테마** | 각 프로필별로 `dark` 또는 `light` 테마 선택 — 프로필에 저장되어 전환할 때마다 다시 적용됨 |

---

## 아키텍처 개요

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## 모델 활용 맵

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## 사용자 여정

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## 세부 기능 심층 분석

### 멀티모달 입력

EurekAI는 프로필에 따라 모더레이션되는 4가지 유형의 소스를 지원합니다(어린이 및 청소년 프로필의 경우 모더레이션이 기본 활성화됨).

- **파일 가져오기** — 인쇄된 텍스트, 표, 손글씨 처리를 위한 Mistral OCR 지원 JPG, PNG 또는 PDF 파일 — **기본값은 OCR 4(`mistral-ocr-4-0`)**(최고 품질), 설정에서 **선택 가능한 OCR 3(`mistral-ocr-2512`)**(더 경제적, 비용 약 절반) — 또는 직접 가져오는 텍스트 파일(TXT, MD). 다중 파일 업로드는 **업로드 세션** 시스템을 사용합니다. 파일별 개별 진행률 표시, 다른 파일을 다시 제출하지 않고 실패한 파일만 재시도, 완료 시 세션 닫기(dismiss)가 가능합니다. OCR은 평균 **신뢰도 점수**(`average`, `[0,1]` 범위로 제한됨, Mistral이 반환한 `averagePageConfidenceScore` 기반 계산)를 제공하며, UI에 등급 배지(`high` / `medium` / `low`, 임계값 약 0.9 / ~0.7)로 표시되어 스캔 품질이 낮더라도 차단하지 않고 경고합니다. OCR을 위해 Mistral에 전송된 문서 사본은 실패하더라도 처리가 완료되는 즉시 삭제됩니다.
- **자유 텍스트** — 어떤 내용이든 입력하거나 붙여넣을 수 있습니다. 모더레이션이 활성화된 경우 저장 전에 검열됩니다.
- **음성 입력** — 브라우저에서 오디오를 녹음합니다. `voxtral-mini-latest`에 의해 텍스트로 변환됩니다. `language="fr"` 매개변수가 인식 성능을 최적화합니다.
- **웹 / URL** — 하나 이상의 URL을 붙여넣어 콘텐츠를 직접 스크래핑(JS 페이지의 경우 Readability + Lightpanda 사용)하거나, 검색어를 입력하여 Mistral Agent를 통한 웹 검색을 수행할 수 있습니다. 단일 입력 필드에서 두 가지를 모두 지원하며, URL과 검색어는 자동으로 구분되어 각 결과가 독립적인 소스로 생성됩니다.

### AI 콘텐츠 생성

생성되는 8가지 유형의 학습 자료:

| 생성기 | 모델 | 출력 |
|---|---|---|
| **요약 노트** | `mistral-large-latest` | 제목, 요약, 핵심 요약, 어휘, 인용구, 토막 상식 |
| **플래시카드** | `mistral-large-latest` | 소스 출처가 포함된 Q&A 카드 (개수 설정 가능) |
| **객관식 퀴즈** | `mistral-large-latest` | 단 하나의 정답이 있는 4지 선다형 질문, 해설, 적응형 복습 (문항 수 설정 가능) |
| **빈칸 채우기** | `mistral-large-latest` | 힌트가 포함된 빈칸 완성 문장, 유연한 정답 검증(Levenshtein) |
| **받아쓰기** | `mistral-large-latest` + Voxtral TTS | 오디오로 낭독되는 핵심 단어(단어당 MP3 1개) → 키보드 입력 → 맞춤법 규칙 설명과 함께 엄격한 채점(악센트 누락도 오답 처리) |
| **팟캐스트** | `mistral-large-latest` + Voxtral TTS | 2인 대본 → MP3 오디오 |
| **삽화** | Agent `mistral-large-latest` | `image_generation` 도구를 통한 교육용 이미지 |
| **음성 퀴즈** | `mistral-large-latest` + Voxtral TTS + STT | TTS 질문 → STT 응답 → AI 검증 |

### 채팅 기반 AI 튜터

수업 문서에 대한 전체 접근 권한을 갖춘 대화형 튜터:

- `mistral-large-latest` 사용
- **도구 호출(Tool Calling)**: 대화 중에 요약 노트, 플래시카드, 퀴즈 또는 빈칸 채우기를 생성할 수 있음
- 수업당 50개의 메시지 기록 지원
- 프로필에 모더레이션이 활성화된 경우: 메시지가 검사되며, 신고된 소스, 검사에 실패한 소스 및 아직 검사되지 않은 소스는 문맥과 도구에서 제외됨(실패했거나 아직 검사되지 않은 소스의 검사를 최대 5초 동안 먼저 재시도함)

### 자동 라우터

라우터는 `mistral-small-latest`을(를) 사용하여 소스 콘텐츠를 분석하고 8가지 사용 가능한 생성기 중 가장 적합한 조합을 제안합니다. 인터페이스는 실시간 진행 상황을 표시합니다. 먼저 분석 단계가 진행된 후 개별 생성이 진행되며, 생성 취소도 가능합니다.

### 적응형 학습

- **퀴즈 통계**: 문항별 시도 횟수 및 정답률 추적
- **퀴즈 복습**: 원래 퀴즈의 소스를 바탕으로 취약한 개념을 겨냥한 5~10개의 새로운 질문 생성(모더레이션 보호 조치는 동일한 소스에 적용됨)
- **학습 지침 감지**: 복습 지침("~을 알면 수업 내용을 이해한 것입니다" 등)을 감지하여 호환되는 텍스트 생성기(요약 노트, 플래시카드, 퀴즈, 빈칸 채우기)에서 우선적으로 반영합니다. 모더레이션이 활성화된 경우 지침 감지는 소스 검증이 끝날 때까지 대기하며 안전하다고 확인된 소스만 읽습니다. 지침은 원본 소스 목록을 유지하므로, 소스 중 하나라도 신고 상태가 되면 지침이 표시되거나 적용되지 않으며, 소스가 삭제되면 지침도 삭제됩니다. 이에 따른 비용도 정상 계산됩니다.

### 보안 및 자녀 보호

- **4가지 연령대 그룹**: 어린이(≤10세), 청소년(11~15세), 학생(16~25세), 성인(26세 이상)
- **콘텐츠 모더레이션**: 11개 카테고리를 제공하는 `mistral-moderation-2603`(Mistral Moderation 2), 신규 어린이/청소년 프로필에는 6개 카테고리가 기본 차단됨(`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal`은(는) 역사를 포함한 50개 수업에 대한 측정 후 오탐(false positive)이 전혀 없어 추가됨). 설정에서 프로필별로 카테고리 맞춤 설정 가능. Moderation 2는 기존의 '위험한 콘텐츠' 카테고리를 `dangerous` + `criminal`(으)로 세분화함(기존 프로필은 자동 마이그레이션되며 차단된 카테고리는 이미 가져온 소스에도 적용됨). 기본 안전 원칙(Fail-safe): 모델의 응답으로 차단된 카테고리를 검증할 수 없는 경우 콘텐츠가 거절됨("모더레이션 사용 불가"). 모더레이션 활성화 시 생성과 채팅 모두 신고된 소스, 검사에 실패한 소스, 검사 진행 중인 소스를 제외함. 한 번도 검사되지 않은 소스(모더레이션 비활성화 시 가져왔거나 프로필에 연결된 기존 프로젝트)는 사용 전 검사됨. 재시작으로 인해 중단된 모더레이션은 서버 키가 허용하는 경우 시작 시 재개되며, 그렇지 않으면 오류가 발생한 모더레이션과 마찬가지로 프로젝트를 열거나 다음 생성 시 재개됨. "다시 검사" 버튼을 통해 필요할 때마다 재검사 가능. 모더레이션 활성화 시 소스가 안전하다고 판단될 때까지 자녀에게 소스 내용(미리보기, 텍스트, 원본 문서)이 숨겨지며, 부모는 PIN을 입력하여 1회에 한해 열람할 수 있음. 음성 퀴즈의 구두 답변은 검증 전 먼저 모더레이션을 거침. `helpers/moderation-model.ts`에 고정된 날짜 기반 ID: 지원 중단(deprecated)된 별칭 `-latest`은(는) 더 이상 API에 표시되지 않음.
- **부모 안심 PIN**: SHA-256 해시, 15세 미만 프로필에 필수 적용. IP 주소당 15분 동안 최대 10회의 잘못된 코드 입력 허용(429 `rate_limited`). 프로덕션 배포 시 솔트가 포함된 느린 해시(Argon2id, bcrypt) 권장.
- **서버 데이터**: `/output`은(는) 프로젝트 미디어(오디오, 이미지, 가져온 파일)만 외부에 공개하며, `profiles.json`, `config.json`, `projects.json` 및 `project.json`은(는) 절대 서비스되지 않음.
- **채팅 제한**: 16세 미만에게는 AI 채팅이 기본 비활성화되어 있으며, 부모가 활성화할 수 있음.

### 다중 프로필 시스템

- 이름, 나이, 아바타, 언어 설정을 지원하는 다중 프로필
- **프로필별 음성** (`Profile.mistralVoices?: { host?, guest? }` — 각 역할은 선택 사항) — 자녀마다 고유한 팟캐스트/음성 퀴즈 음성 조합 설정 가능
- **프로필별 테마** (`Profile.theme: 'dark' | 'light'`) — 프로필 전환 시 자동 전환되며 백엔드에 유지됨
- `profileId`을(를) 통해 프로젝트가 프로필에 연결됨. 프로필이 지정되지 않은 기존 프로젝트는 이를 처음 여는 프로필에 연결된 후 해당 프로필 기준에 따라 모더레이션됨
- 연쇄 삭제(Cascade delete): 프로필을 삭제하면 해당 프로필의 모든 프로젝트가 함께 삭제됨

### API 비용 추적

지시 사항 감지 및 음성 퀴즈의 구두 답변을 포함하여 과금되는 모든 Mistral 호출(채팅, OCR, STT, TTS, 에이전트)은 사용자에게 **투명한** 유로(€) 추정치를 제공하도록 계측됩니다. 무료인 검토(모더레이션)는 계산에 포함되지 않습니다. 에이전트 도구 비용이 포함됩니다: 웹 검색당 0.03달러 및 생성된 이미지당 0.10달러(Mistral 요금), 여기에 이 도구들이 생성한 토큰이 추가되며, 추정치 계산 시 에이전트 모델의 입력 요율로 반영됩니다.

- **단일 진실 공급원(Source of truth)**: `helpers/pricing.ts` — 모델 접두사별 `MODEL_PRICING`(예: `mistral-large` → 입력 0.5 €/백만 토큰, 출력 1.5 €/백만 토큰), 주기적 재스크래핑을 위한 Mistral 문서 URL이 포함된 `PRICING_SOURCES`
- **지원 단위**: `tokens`, `characters`(TTS), `pages`(OCR), `audio-seconds`(STT) — `helpers/cost-calc.ts`에 의해 제어되는 변환
- **계측 체인**: `helpers/tracked-client.ts`(Mistral 클라이언트를 래핑) → `helpers/usage-context.ts`(AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`(HTTP 응답에 주입)
- **UI**: 생성별 비용 배지(`src/partials/cost-badge-gen.html`), 소스별(`cost-badge-src.html`), 대시보드의 누적 합계(`Project.totalCost`)
- **엔드포인트**: `/generate/*` 및 `/sources/*` 응답은 반환된 객체(`Generation` / `Source`)를 `estimatedCost`, `usage`, `costBreakdown`으로 보강합니다. `POST /generate/route`은 라우팅 비용만을 위한 `costDelta: number` 필드를 추가합니다. `POST /detect-consigne`(`{consigne, costDelta}`) 및 구두 답변 검증 또한 자체 `costDelta`을 반환합니다. `GET /projects/:pid`은 `totalCost`(`costLog[]`에서 계산된 합계) 및 전체 기록이 보강된 프로젝트를 반환합니다.

### TTS (Mistral Voxtral) 및 커스텀 음성

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral 음성 합성, 추가 키 불필요
- **커스텀 음성**: 학부모는 Mistral Voices API를 통해(오디오 샘플 기반) 자신만의 음성을 생성하고 호스트/게스트 역할에 할당할 수 있습니다. 이를 통해 팟캐스트와 음성 퀴즈가 부모의 목소리로 재생되어 아이에게 더욱 몰입감 있는 경험을 선사합니다.
- 설정 가능한 두 가지 음성 역할: **호스트**(메인 내레이터) 및 **게스트**(팟캐스트의 두 번째 음성)
- 설정에서 언어별로 필터링 가능한 Mistral 음성 전체 카탈로그 제공

### 다국어 지원

- 9개 언어로 제공되는 인터페이스: fr, en, es, pt, it, nl, de, hi, ar
- 15개 언어를 지원하는 AI 프롬프트(fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- 프로필별로 언어 설정 가능

---

## 기술 스택

| 계층 | 기술 | 역할 |
|---|---|---|
| **런타임** | Node.js + TypeScript 6.x | 서버 및 타입 안전성 |
| **백엔드** | Express 5.x | REST API |
| **개발 서버** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars 파셜, 프록시 |
| **프론트엔드** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 반응형 인터페이스, Vite로 컴파일된 TypeScript |
| **템플릿** | vite-plugin-handlebars | 파셜을 통한 HTML 구성 |
| **AI** | Mistral AI SDK 2.x | 채팅, OCR, STT, TTS, 에이전트, 검토 |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, 내장 음성 합성 |
| **아이콘** | Lucide 1.x | SVG 아이콘 라이브러리 |
| **웹 스크래핑** | Readability + linkedom | 웹 페이지의 주요 콘텐츠 추출(Firefox Reader View 기술) |
| **헤드리스 브라우저** | Lightpanda | JS/SPA 페이지를 위한 초경량 헤드리스 브라우저(Zig + V8) — 스크래핑 폴백 |
| **Markdown** | Marked | 채팅 내 Markdown 렌더링 |
| **파일 업로드** | Multer 2.x | multipart 폼 처리 |
| **오디오** | ffmpeg-static | 오디오 세그먼트 병합 |
| **테스트** | Vitest | 단위 테스트 — SonarCloud로 커버리지 측정 |
| **영속성** | JSON 파일 | 의존성 없는 스토리지 |

---

## 모델 레퍼런스

| 모델 | 용도 | 선정 이유 |
|---|---|---|
| `mistral-large-latest` | 복습 시트, 플래시카드, 팟캐스트, 퀴즈, 빈칸 채우기, 채팅, 음성 퀴즈 검증, 이미지 에이전트, 웹 검색 에이전트, 지시 사항 감지 | 최고의 다국어 지원 + 지시 수행 능력 |
| `mistral-ocr-4-0` (OCR 4, 기본값) | 문서 OCR — 고품질 | 인쇄 텍스트, 표, 필기체 (1000페이지당 $4) |
| `mistral-ocr-2512` (OCR 3, 옵션) | 문서 OCR | 설정에서 선택 가능, 더 저렴함 (1000페이지당 $2) |
| `voxtral-mini-latest` | 음성 인식(STT) | 다국어 STT, `language="fr"`으로 최적화됨 |
| `voxtral-mini-tts-latest` | 음성 합성(TTS) | 팟캐스트, 음성 퀴즈, 소리 내어 읽기 |
| `mistral-moderation-2603` | 콘텐츠 검토 | 어린이/청소년 대상 6개 차단 카테고리(`jailbreaking` 포함) |
| `mistral-small-latest` | 자동 라우터 | 라우팅 결정을 위한 빠른 콘텐츠 분석 |

---

## 빠른 시작

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

> **참고**: Mistral Voxtral TTS가 유일한 TTS 공급자이며, `MISTRAL_API_KEY` 외에 추가 키는 필요하지 않습니다.

> **사용자가 입력하는 API 키**: `MISTRAL_API_KEY`은 이제 **선택 사항**입니다. 키가 없어도 앱은 정상적으로 실행되며 각 사용자에게 인터페이스에서 **자신의 Mistral 키**를 입력하도록 요청합니다. 키는 **브라우저에 저장되며**(보안 컨텍스트에서 Web Crypto + IndexedDB로 암호화됨) 요청마다 전송됩니다 — **서버에는 절대 영구 저장되지 않습니다**. 우선순위: 프로필 키 > 브라우저 전역 키 > `MISTRAL_API_KEY`(환경 변수). `EUREKAI_REQUIRE_USER_KEY=true`을 설정하면 각 사용자가 자신의 키를 반드시 제공해야 합니다(환경 변수 키는 프리로드에만 사용됨).

> **로컬 HTTPS (태블릿/LAN)**: `localhost`은 이미 보안 컨텍스트입니다. LAN(태블릿) 접근을 위해서는 로컬 인증서를 생성하고 HTTPS를 활성화하세요. 그러면 브라우저가 저장하는 키를 암호화할 수 있으며, 전송 중에도 키가 암호화됩니다:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 환경 변수

| 변수 | 필수 여부 | 기본값 | 역할 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 선택 사항 | — | Mistral API 키(채팅, OCR, STT, Voxtral TTS, 에이전트, 검토). 설정하지 않으면 사용자가 앱에서 키를 입력함(브라우저에 저장되며 서버에는 저장되지 않음) |
| `EUREKAI_REQUIRE_USER_KEY` | 선택 사항 | `false` | `true` → AI 요청 시 `MISTRAL_API_KEY` 폴백 비활성화(각 사용자가 반드시 자신의 키를 제공해야 함). 공개된 인스턴스에 유용함 |
| `HTTPS_KEY` / `HTTPS_CERT` | 선택 사항 | — | TLS 키/인증서 경로(`scripts/gen-cert.sh` 참조) → Express 및 Vite가 HTTPS로 서비스 제공(LAN/태블릿 보안 컨텍스트) |
| `PORT` | 선택 사항 | `3000` | Express 백엔드 HTTP 포트 |
| `NODE_ENV` | 선택 사항 | `development` | `production`인 경우 → Express가 `dist/`에서 프론트엔드를 제공(그렇지 않으면 `public/`) |
| `SONAR_TOKEN` | CI 선택 사항 | — | SonarCloud GitHub Actions 워크플로에서만 사용됨 |

### 테스트, 코드 품질 및 기여

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git 훅 (Husky)**: `pre-commit`은 `scripts/pre-commit-fast.sh`(충돌, 대용량 파일, shellcheck), `lint-staged`, `npm test` 순으로 실행하며, `pre-push`은 먼저 차단 검사인 `npm audit`(전이적 의존성을 포함하여 어떤 의존성이든 `critical` 수준의 취약점이 발견되면 즉시 차단, `scripts/audit-verdict.mjs` 참조)을 실행한 다음 `npm run security`을 실행합니다. 각 훅은 단계 중 하나라도 실패하면 즉시 커밋/푸시를 차단합니다.

**외부 도구 (애플리케이션 실행 시에는 선택 사항, `pretest` 및 `npm run security`에는 필수)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

이러한 도구가 없으면 `npm test`은 `pretest`에서 실패하고(lizard 누락), `npm run security`도 실패합니다(opengrep 누락). 그러면 husky 훅이 커밋/푸시를 차단합니다.

---

## 컨테이너 배포

이미지는 **GitHub Container Registry**에 게시됩니다:

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

> **`:U`**: 볼륨 권한을 자동으로 조정하는 루트리스 Podman 플래그입니다.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

---

## 프로젝트 구조

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

> **코드에 기여하는 AI 에이전트 참고 사항**: 상세한 아키텍처 컨텍스트, 필수 규칙(오류 코드, 비용 추적, 문서 유형 등 출력에 그대로 복사될 수 있는 한정자를 쓰지 않는 메타 단어 배제 프롬프트), 그리고 알려진 주의 사항(Lizard CCN, Opengrep, Codacy/Semgrep 마이그레이션)은 [`CLAUDE.md`](CLAUDE.md)을 참조하세요.

---

## API 레퍼런스

### 설정
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/config` | 현재 설정 |
| `PUT` | `/api/config` | 설정 수정(모델, 음성, TTS 모델) |
| `GET` | `/api/config/status` | API 상태: `mistral`(Mistral 키 설정됨), `ttsAvailable`(`mistral`의 별칭, Mistral Voxtral이 유일한 TTS 공급자임) |
| `POST` | `/api/config/reset` | 설정을 기본값으로 초기화 |
| `GET` | `/api/config/voices` | Mistral TTS 음성 목록 조회(선택 사항: `?lang=fr`) |
| `GET` | `/api/moderation-categories` | 사용 가능한 검토 카테고리 + 연령별 기본값 |
| `POST` | `/api/providers/mistral/validate` | 사용자가 입력한 Mistral 키 유효성 검사 — 항상 200 `{status}` 반환(`ok`/`invalid`/`quota`/`network`/`missing`), 환경 변수 폴백 없음 |

### 프로필
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/profiles` | 모든 프로필 목록 조회 |
| `POST` | `/api/profiles` | 프로필 생성 |
| `PUT` | `/api/profiles/:id` | 프로필 수정(15세 미만은 PIN 필요, 15분 동안 PIN 10회 오류 시 → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | 프로필 삭제 + 연계된 프로젝트 삭제(`{pin?}` → `{ok, deletedProjects}`) |

### 프로젝트
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects` | 프로젝트 목록 조회(`?profileId=` 선택 사항) |
| `POST` | `/api/projects` | 프로젝트 생성 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 프로젝트 상세 정보. `?profileId=`은 프로필이 없는 프로젝트를 여는 프로필에 연결함 |
| `PUT` | `/api/projects/:pid` | `{name}` 이름 변경 |
| `DELETE` | `/api/projects/:pid` | 프로젝트 삭제 |
| `GET` | `/api/projects/:pid/events` | 생성 상태 전환(`completed`/`failed`/`cancelled`)의 실시간 SSE 스트림(`event: generation`) + keep-alive 하트비트 |

### 소스
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | multipart 파일 가져오기(JPG/PNG/PDF는 OCR, TXT/MD는 직접 읽기) |
| `POST` | `/api/projects/:pid/sources/text` | 자유 텍스트 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 음성 STT(multipart 오디오) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL 스크래핑 또는 웹 검색 `{query}` — 소스 배열 반환. 모든 주소가 거부된 경우(내부 네트워크) 422 `url_blocked`, 소스가 전혀 생성되지 않은 경우 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 대기 중이거나 오류 상태인 검토 재개 `{sourceIds?}`(호출당 최대 10개, 대기 시간 ≤ 10초) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 소스, 가져온 파일 및 이에 종속된 지시 사항 삭제 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | `{text}` 검토 |
| `POST` | `/api/projects/:pid/detect-consigne` | 복습 지시 사항 감지(검증된 소스만 대상) → `{consigne, costDelta}` |

### 생성
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 복습 시트 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 플래시카드 |
| `POST` | `/api/projects/:pid/generate/quiz` | 객관식 퀴즈(4개 보기, 단일 정답) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 빈칸 채우기 |
| `POST` | `/api/projects/:pid/generate/dictation` | 받아쓰기(단어 + 예문 + 규칙, 단어당 1개 TTS 오디오. 자동 라우터에서도 제안됨) |
| `POST` | `/api/projects/:pid/generate/podcast` | 팟캐스트 |
| `POST` | `/api/projects/:pid/generate/image` | 일러스트레이션 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 음성 퀴즈 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 맞춤형 복습 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 퀴즈에서 틀린 문제에 초점을 맞춘 복습 시트 `{generationId, weakQuestions}` — 퀴즈 뷰의 보충 학습 버튼을 통해 `quiz-review`과 병렬로 호출됨 |
| `POST` | `/api/projects/:pid/generate/route` | 라우팅 분석(실행할 생성기 계획) — `{plan, costDelta}` 반환(라우팅 단독 비용) |
| `POST` | `/api/projects/:pid/generate/auto` | 백엔드 자동 생성(라우팅 + 8개 유형: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). 병렬 실행 — 8개 이상의 동시 요청 rate-limit을 지원하는 Mistral 티어 가정. 그렇지 않으면 `failedSteps`에 여러 429 오류가 보고될 수 있음. |

모든 생성 경로는 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`을 허용합니다. 알 수 없는 `ageGroup`이나 유효한 언어 코드가 아닌 `lang`(예상: `fr`, `pt-BR` 등)는 AI 호출 전에 400 `invalid_input`을 반환합니다. `quiz-review` 및 `remediation-summary`는 추가로 `{generationId, weakQuestions}`을 요구하며 원래 퀴즈의 소스를 대상으로 합니다.

### 생성 항목 CRUD
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 퀴즈 답변 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 빈칸 채우기 답변 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 받아쓰기 답변 제출 `{answers}`(엄격한 서버 채점) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 구두 답변 검증(오디오 + questionIndex). 구두 답변은 검증 전 검토를 거치며(거부 시: 400 `quiz.answerBlocked`), 비용은 `costDelta`에 반환됨 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 소리 내어 읽기(복습 시트/플래시카드) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 진행 중인 생성 취소(대기 중인 작업을 취소하는 유일한 경로) |
| `PUT` | `/api/projects/:pid/generations/:gid` | `{title}` 이름 변경 |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 생성 항목 및 해당 미디어(오디오, 이미지) 삭제 |

### 채팅
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 채팅 기록 조회 |
| `POST` | `/api/projects/:pid/chat` | 메시지 전송 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | 채팅 기록 지우기 |

---

## 아키텍처 결정 사항

| 결정 사항 | 근거 |
|---|---|
| **React/Vue 대신 Alpine.js 선택** | 최소한의 풋프린트, Vite로 컴파일된 TypeScript 기반의 가벼운 반응성. 속도가 중요한 해커톤에 적합함. |
| **JSON 파일 영속성** | 무의존성, 즉각적인 시작. 구성할 데이터베이스가 없음 — 바로 실행하여 사용 가능. |
| **Vite + Handlebars** | 두 방식의 장점 결합: 개발을 위한 빠른 HMR, 코드 구성을 위한 HTML 파셜, Tailwind JIT. |
| **중앙 집중식 프롬프트** | 모든 AI 프롬프트를 `prompts.ts`에서 관리 — 언어 및 연령대별 반복 개선, 테스트, 조정이 용이함. |
| **다중 생성 시스템** | 각 생성 항목은 고유한 ID를 가진 독립된 객체임 — 학습 단위당 여러 복습 시트, 퀴즈 등을 허용함. |
| **연령 맞춤형 프롬프트** | 어휘, 복잡성, 어조가 다른 4개 연령대 그룹 — 학습자에 따라 동일한 콘텐츠를 다르게 전달함. |
| **에이전트 기반 기능** | 이미지 생성 및 웹 검색에 임시 Mistral 에이전트를 사용 — 자동 정리를 통한 깔끔한 라이프사이클. |
| **지능형 URL 스크래핑** | 단일 입력 필드에서 URL과 키워드를 함께 입력받음 — URL은 Readability(정적 페이지)를 통해 스크래핑되며 Lightpanda(JS/SPA 페이지)로 폴백되고, 키워드는 Mistral web_search 에이전트를 실행함. 각 결과는 독립적인 소스를 생성함. |
| **100% Mistral TTS** | Mistral Voxtral TTS(`MISTRAL_API_KEY` 외 추가 키 불필요) — 비용 산정 체인 및 언어별 음성 결정에 내장된 음성 합성. |

---

## 크레딧 및 감사의 말

- **[Mistral AI](https://mistral.ai)** — AI 모델 (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 경량 반응형 프레임워크
- **[TailwindCSS](https://tailwindcss.com)** — 유틸리티 CSS 프레임워크
- **[Vite](https://vitejs.dev)** — 프론트엔드 빌드 도구
- **[Lucide](https://lucide.dev)** — 아이콘 라이브러리
- **[Marked](https://marked.js.org)** — 마크다운 파서
- **[Readability](https://github.com/mozilla/readability)** — 웹 콘텐츠 추출 (Firefox Reader View 기술)
- **[Lightpanda](https://lightpanda.io)** — JS/SPA 페이지 스크래핑을 위한 초경량 헤드리스 브라우저
- **[Luciole](https://luciole-vision.com)** — 저시력 독자를 위해 설계된 폰트, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (프로필의 "읽기 편의" 옵션)

Mistral AI Worldwide Hackathon(2026년 3월) 기간에 시작되었으며, [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) 및 [Gemini CLI](https://geminicli.com/)를 통해 전적으로 AI로 개발되었습니다.

---

## 작성자

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 라이선스

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**gemini-3.8-flash-high로 프랑스어에서 한국어로 번역된 기사.**
