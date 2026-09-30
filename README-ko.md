<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>어떤 콘텐츠든 인터랙티브 학습 경험으로 변환하세요 — <a href="https://mistral.ai">Mistral AI</a> 기반.</strong>
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

**EurekAI**는 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online)([공식 사이트](https://worldwide-hackathon.mistral.ai/))(2026년 3월)에서 탄생했습니다. 참가 주제가 필요하던 중 아주 구체적인 경험에서 아이디어가 떠올랐습니다. 저는 평소 딸아이와 함께 시험공부를 하곤 하는데, AI를 활용하면 이 과정을 훨씬 더 재미있고 인터랙티브하게 만들 수 있을 것이라 생각했습니다.

목표는 수업 사진, 복사하여 붙여넣은 텍스트, 음성 녹음, 웹 검색 등 **어떤 형태의 입력이든** 받아들여 **요약 노트, 플래시카드, 퀴즈, 팟캐스트, 빈칸 채우기, 삽화 등으로** 변환하는 것입니다. 이 모든 과정은 프랑스 기업인 Mistral AI의 모델을 기반으로 구동되므로, EurekAI는 프랑스어권 학생들에게도 자연스럽게 최적화된 솔루션입니다.

[초기 프로토타입](https://github.com/jls42/worldwide-hackathon.mistral.ai)은 해커톤 기간 중 Mistral 서비스를 기반으로 구축된 개념 증명(PoC)으로서 48시간 만에 제작되었습니다. 당시에도 이미 작동은 가능했지만 기능은 제한적이었습니다. 그 후 EurekAI는 빈칸 채우기, 연습 문제 탐색, 웹 스크래핑, 설정 가능한 보호자 모더레이션, 심층 코드 리뷰 등 다양한 기능을 갖춘 본격적인 프로젝트로 발전했습니다. 모든 코드는 AI로 생성되었으며, 주로 [Claude Code](https://code.claude.com/)를 사용했고 [Codex](https://openai.com/codex/) 및 [Gemini CLI](https://geminicli.com/)의 일부 기여도 포함되어 있습니다.

---

## 개요

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="EurekAI 둘러보기: 소스, 요약 노트, 퀴즈, 플래시카드, 삽화" width="820" />
</p>

| | |
|---|---|
| ![대시보드](docs/screenshots/dashboard.webp)<br>**대시보드** — 최근 생성 내역, 카드별 예상 비용 및 프로젝트 총비용, '자동 — 매직!' 버튼 | ![소스](docs/screenshots/sources.webp)<br>**소스** — 사진/PDF/텍스트/음성/웹 가져오기, 원클릭 생성, 학습 목표 지침 감지 |

가져온 각 소스에는 [OCR 신뢰도 점수, 모더레이션 상태 및 예상 비용](docs/screenshots/sources-list.webp)이 표시됩니다.

### 컴포넌트 작동 화면

| | |
|---|---|
| ![요약 노트](docs/screenshots/notes.gif)<br>**요약 노트** — 핵심 요점, 어휘, 출처가 포함된 인용구, 섹션별 오디오 재생 | ![객관식 퀴즈](docs/screenshots/quiz.gif)<br>**객관식 퀴즈** — 문제당 정답 1개, 설명과 함께 즉각적인 피드백 제공, 단계별 탐색 |
| ![플래시카드](docs/screenshots/flashcards.gif)<br>**플래시카드** — 카드를 뒤집은 후 '알고 있음 / 몰랐음' 자체 평가 | ![빈칸 채우기](docs/screenshots/fillblank.gif)<br>**빈칸 채우기** — 요청 시 힌트 제공, 유연한 정답 인정 |
| ![받아쓰기](docs/screenshots/dictation.gif)<br>**받아쓰기** — 오디오로 단어 받아쓰기, 엄격한 글자 단위 채점 | ![음성 퀴즈](docs/screenshots/vocal-quiz.gif)<br>**음성 퀴즈** — 문제를 음성으로 읽어주고 마이크로 답변 |
| ![팟캐스트](docs/screenshots/podcast.gif)<br>**팟캐스트** — 2인 대화형 미니 팟캐스트, 대화 스크립트 확인 가능 | ![삽화](docs/screenshots/illustrations.gif)<br>**삽화** — Agent가 생성한 교육용 이미지 |
| ![AI 튜터](docs/screenshots/chat.gif)<br>**AI 튜터** — 수업 자료에 기반한 채팅, 설명형 답변, 퀴즈 및 플래시카드 생성 가능 | |

### 시작하기

| | |
|---|---|
| ![프로필 선택](docs/screenshots/login.gif)<br>**프로필 선택** — 각 자녀별 전용 공간, 아바타 및 언어 설정 | ![프로필 생성](docs/screenshots/profile-create.gif)<br>**프로필 생성** — 나이, 아바타, 15세 미만을 위한 보호자 PIN |
| ![강의 생성](docs/screenshots/course.gif)<br>**강의 생성** — 수업별 프로젝트 구성, 소스 추가 준비 완료 | ![설정](docs/screenshots/settings.gif)<br>**설정** — API 상태, 요금이 표시된 AI 모델 선택 |

---

## 주요 기능

| | 기능 | 설명 |
|---|---|---|
| 📷 | **파일 가져오기** | 수업 자료 가져오기 — 사진, PDF(평균 신뢰도 점수 및 티어 `high`/`medium`/`low`가 제공되는 Mistral OCR 활용) 또는 텍스트 파일(TXT, MD). 파일별 재시도 및 개별 진행률을 지원하는 업로드 세션 |
| 📝 | **텍스트 입력** | 원하는 텍스트를 직접 입력하거나 붙여넣기 |
| 🎤 | **음성 입력** | 음성 녹음 — Voxtral STT가 음성을 텍스트로 변환 |
| 🌐 | **웹 / URL** | URL 붙여넣기(Readability + Lightpanda를 통한 직접 스크래핑) 또는 검색어 입력(Mistral Agent web_search) |
| 📄 | **요약 노트** | 핵심 요점, 어휘, 인용구, 흥미로운 일화가 포함된 구조화된 노트 |
| 🃏 | **플래시카드** | 인터랙티브 Q&A 카드, 대화형 오디오 재생 |
| ❓ | **객관식 퀴즈** | 정답이 1개인 4지 선다형 문제 및 오답에 대한 적응형 복습(문제 수 설정 가능) |
| ✏️ | **빈칸 채우기** | 힌트와 유연한 채점 방식을 제공하는 빈칸 완성 연습 문제 |
| 🔤 | **받아쓰기** | 가져온 목록에서 오디오로 들려주는 단어(Voxtral TTS), 키보드 입력, 맞춤법 규칙 설명이 포함된 엄격한 글자 단위 채점 |
| 🎙️ | **팟캐스트** | 2인 음성 오디오 미니 팟캐스트 — 기본 Mistral 음성 또는 맞춤 음성(부모님 음성 등!) 지원 |
| 🖼️ | **삽화** | Mistral Agent가 생성하는 교육용 이미지 |
| 🗣️ | **음성 퀴즈** | 음성으로 문제를 읽어주고(맞춤 음성 가능), 구두로 답변하며, AI가 정답 확인 |
| 💬 | **AI 튜터** | 수업 문서를 기반으로 한 맥락 인식 채팅 및 도구 호출 지원 |
| 🧠 | **자동 라우터** | `mistral-small-latest` 기반 라우터가 콘텐츠를 분석하여 제공되는 8가지 생성기 중 최적의 조합을 제안 |
| 🔒 | **자녀 보호 기능** | 프로필별 맞춤 모더레이션(카테고리 설정 가능), 보호자 PIN, 채팅 제한 |
| 🌍 | **다국어 지원** | 9개 언어로 인터페이스 제공, 프롬프트를 통해 15개 언어로 AI 생성 제어 가능 |
| 🔊 | **음성 낭독** | Mistral Voxtral TTS를 통해 요약 노트 및 플래시카드(Q&A 대화형) 청취 |
| 💶 | **API 비용 추적** | 각 생성 및 소스에 대한 투명한 유로(€) 비용 추정(토큰/글자 수/페이지/오디오 초 단위). 카드별 배지 + 프로젝트별 총비용이 대시보드에 표시됨 |
| 🎨 | **프로필별 테마** | 각 프로필마다 `dark` 또는 `light` 테마 선택 — 프로필에 저장되며 프로필 전환 시 자동 재적용 |

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

## 심층 분석 — 세부 기능

### 멀티모달 입력

EurekAI는 프로필에 따라 모더레이션되는 4가지 유형의 소스를 지원합니다(어린이 및 청소년 프로필의 경우 모더레이션이 기본 활성화됨):

- **파일 가져오기** — 인쇄된 텍스트, 표 및 필기체 인식을 위해 Mistral OCR로 처리되는 JPG, PNG 또는 PDF 파일 — 기본값은 **OCR 4.1**(`mistral-ocr-4-1`), 설정에서 선택 가능한 **OCR 3**(`mistral-ocr-2512`)(비용이 더 저렴하여 약 ½ 수준이며, 필기체를 더 잘 인식함); 또는 직접 가져오는 텍스트 파일(TXT, MD). 다중 파일 업로드는 **업로드 세션** 시스템을 사용합니다. 파일별 개별 진행률 표시, 다른 파일을 다시 제출하지 않고 실패한 파일만 재시도, 완료 시 세션 닫기를 지원합니다. OCR은 평균 **신뢰도 점수**(`average`, `[0,1]` 범위로 제한, Mistral에서 반환된 `averagePageConfidenceScore` 기반 계산)를 제공하며, UI에 티어 배지(`high` / `medium` / `low`, 임계값 약 0.9 / 약 0.7)로 표시되어 스캔 품질이 좋지 않을 경우 차단하지 않고 경고를 표시합니다. OCR 처리를 위해 Mistral로 전송된 문서 복사본은 처리가 완료되는 즉시(실패한 경우에도) 삭제됩니다.
- **자유 텍스트** — 원하는 내용을 직접 입력하거나 붙여넣습니다. 모더레이션이 활성화된 경우 저장 전에 검사가 진행됩니다.
- **음성 입력** — 브라우저에서 오디오를 녹음합니다. `voxtral-mini-latest`에 의해 텍스트로 변환됩니다. `language="fr"` 매개변수로 인식을 최적화합니다.
- **웹 / URL** — 하나 이상의 URL을 붙여넣어 콘텐츠를 직접 스크래핑(JS 페이지의 경우 Readability + Lightpanda 사용)하거나 키워드를 입력하여 Mistral Agent를 통한 웹 검색을 수행합니다. 단일 입력 필드에서 두 가지 방식을 모두 지원하며, URL과 키워드가 자동으로 구분되어 각 결과마다 독립적인 소스가 생성됩니다.

### AI 콘텐츠 생성

8가지 유형의 학습 자료 생성:

| 생성기 | 모델 | 결과물 |
|---|---|---|
| **요약 노트** | `mistral-large-latest` | 제목, 요약, 핵심 요점, 어휘, 인용구, 일화 |
| **플래시카드** | `mistral-large-latest` | 소스 참조가 포함된 Q&A 카드(카드 수 설정 가능) |
| **객관식 퀴즈** | `mistral-large-latest` | 정답이 1개인 4지 선다형 문제, 설명, 적응형 복습(문제 수 설정 가능) |
| **빈칸 채우기** | `mistral-large-latest` | 힌트가 포함된 빈칸 채우기 문장, 유연한 정답 인정(레벤슈타인 거리) |
| **받아쓰기** | `mistral-large-latest` + Voxtral TTS | 오디오로 들려주는 핵심 단어(단어당 MP3 1개) → 키보드 입력 → 규칙 설명이 포함된 엄격한 채점(악센트 누락도 오답 처리) |
| **팟캐스트** | `mistral-large-latest` + Voxtral TTS | 2인 대화 스크립트 → MP3 오디오 |
| **삽화** | Agent `mistral-large-latest` | `image_generation` 도구를 통한 교육용 이미지 |
| **음성 퀴즈** | `mistral-large-latest` + Voxtral TTS + STT | TTS 문제 → STT 답변 → AI 확인 |

### 채팅형 AI 튜터

수업 문서에 대한 전체 접근 권한을 갖춘 대화형 튜터:

- `mistral-large-latest` 사용
- **도구 호출**: 대화 중 요약 노트, 플래시카드, 퀴즈 또는 빈칸 채우기 생성 가능
- 강의당 50개의 메시지 기록 보관
- 프로필에 모더레이션이 활성화된 경우: 메시지가 검사되며, 신고되었거나 검증에 실패한 소스 및 아직 검증되지 않은 소스는 컨텍스트와 도구에서 제외됩니다(검증에 실패했거나 아직 검증되지 않은 소스는 먼저 최대 5초 동안 재검증을 시도함).

### 자동 라우터

라우터는 `mistral-small-latest`을 사용하여 소스 콘텐츠를 분석하고 제공되는 8가지 생성기 중 가장 적합한 항목을 제안합니다. 인터페이스는 실시간 진행 상황을 표시합니다. 먼저 분석 단계를 거친 후, 취소가 가능한 개별 생성이 진행됩니다.

### 적응형 학습

- **퀴즈 통계**: 문제별 시도 횟수 및 정확도 추적
- **퀴즈 복습**: 원래 퀴즈의 소스를 바탕으로 취약한 개념을 겨냥한 5~10개의 새로운 문제를 생성(모더레이션 보호는 동일한 소스에 적용됨)
- **학습 목표 지침 감지**: 복습 지침("~을 알면 수업을 이해한 것이다" 등)을 감지하여 호환되는 텍스트 생성기(요약 노트, 플래시카드, 퀴즈, 빈칸 채우기)에서 우선적으로 반영합니다. 모더레이션이 활성화된 경우 지침 감지는 소스 검증을 기다리며 안전하다고 판단된 소스만 읽습니다. 지침은 원본 소스 목록을 유지하므로 그중 하나라도 신고되면 지침이 표시되거나 적용되지 않으며, 원본 소스가 삭제되면 지침도 삭제됩니다. 이에 따른 비용도 계산됩니다.

### 보안 및 자녀 보호

- **4가지 연령 그룹**: 어린이(10세 이하), 청소년(11~15세), 학생(16~25세), 성인(26세 이상)
- **콘텐츠 모더레이션**: 11개 카테고리를 제공하는 `mistral-moderation-2603`(Mistral Moderation 2), 새로운 어린이/청소년 프로필의 경우 기본적으로 6개 카테고리가 차단됨(`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; 역사 과목을 포함한 50개 수업 측정 후 오탐이 전혀 없어 `criminal` 추가됨). 설정에서 프로필별로 카테고리 맞춤 설정 가능; Moderation 2에서는 기존의 '위험한 콘텐츠' 카테고리가 `dangerous` + `criminal`로 세분화됨(기존 프로필은 자동 마이그레이션되며 차단된 카테고리는 이미 가져온 소스에도 적용됨). 기본 안전 조치: 모델의 응답으로 차단된 카테고리를 확인할 수 없는 경우 콘텐츠가 거부됨("모더레이션 사용 불가"); 모더레이션이 활성화되어 있으면 생성 및 채팅 모두 신고된 소스, 검증에 실패한 소스, 검증 진행 중인 소스를 제외합니다. 한 번도 검증되지 않은 소스(모더레이션이 비활성화되었을 때 가져왔거나 프로필에 연결된 이전 프로젝트)는 사용 전에 검증을 거칩니다. 서버 재시작으로 중단된 모더레이션은 서버 키가 허용하는 경우 시작 시 재개됩니다. 그렇지 않은 경우 오류가 발생한 모더레이션과 마찬가지로 프로젝트를 열거나 다음 생성 시 재개됩니다. "재검증" 버튼을 통해 온디맨드로 검증을 다시 실행할 수 있습니다. 모더레이션이 활성화된 상태에서 소스가 안전하다고 판단되기 전까지는 해당 콘텐츠(미리보기, 텍스트, 원본 문서)가 어린이에게 숨겨집니다. 보호자는 PIN을 입력하여 1회에 한해 조회할 수 있습니다. 음성 퀴즈의 구두 답변은 정답 확인 전에 모더레이션을 거칩니다. `helpers/moderation-model.ts`에 고정된 날짜가 포함된 ID: 지원 중단된 별칭인 `-latest`는 더 이상 API에 나열되지 않습니다.
- **보호자 PIN**: SHA-256 해시, 15세 미만 프로필에 필수 요구; IP 주소당 15분마다 최대 10회 오입력 허용(429 `rate_limited`). 프로덕션 배포 시 솔트가 포함된 느린 해시(Argon2id, bcrypt) 적용 권장.
- **서버 데이터**: `/output`는 프로젝트 미디어(오디오, 이미지, 가져온 파일)만 외부에 공개하며, `profiles.json`, `config.json`, `projects.json` 및 `project.json`는 절대 외부에 제공되지 않음
- **채팅 제한**: 16세 미만에게는 AI 채팅이 기본 비활성화되며, 보호자가 활성화할 수 있음

### 다중 프로필 시스템

- 이름, 나이, 아바타, 언어 기본 설정을 갖춘 다중 프로필 지원
- **프로필별 음성** (`Profile.mistralVoices?: { host?, guest? }` — 각 역할은 선택 사항) — 각 자녀마다 고유한 팟캐스트/음성 퀴즈 음성 쌍 설정 가능
- **프로필별 테마** (`Profile.theme: 'dark' | 'light'`) — 프로필 변경 시 자동 전환되며 백엔드에 유지됨
- `profileId`를 통해 프로필에 연결되는 프로젝트; 프로필이 없는 이전 프로젝트는 해당 프로젝트를 처음 여는 프로필에 연결된 후 해당 프로필 기준에 따라 모더레이션됨
- 연쇄 삭제: 프로필을 삭제하면 해당 프로필의 모든 프로젝트도 함께 삭제됨

### API 비용 추적

지시사항 감지 및 음성 퀴즈의 구두 응답을 포함하여 과금되는 모든 Mistral 호출(채팅, OCR, STT, TTS, 에이전트)은 사용자에게 **투명한** 유로(€) 추정치를 제공하도록 계측됩니다. 무료인 검토(모더레이션)는 계산되지 않습니다. 에이전트 도구 수수료가 포함되어 있습니다: 웹 검색당 $0.03, 이미지 생성당 $0.10(Mistral 요금), 여기에 해당 도구에서 생성된 토큰이 추가되며, 추정치에서는 이를 에이전트 모델의 입력 요금으로 계산합니다.

- **단일 진실 공급원(Source of truth)**: `helpers/pricing.ts` — 모델 접두사별 `MODEL_PRICING`(예: `mistral-large` → 입력 0.5 €/M 토큰, 출력 1.5 €/M 토큰), 주기적인 재스크래핑을 위한 Mistral 문서 URL이 포함된 `PRICING_SOURCES`
- **지원 단위**: `tokens`, `characters`(TTS), `pages`(OCR), `audio-seconds`(STT) — `helpers/cost-calc.ts` 기반 변환
- **계측 체인**: `helpers/tracked-client.ts`(Mistral 클라이언트 래핑) → `helpers/usage-context.ts`(AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts`(HTTP 응답에 주입)
- **UI**: 생성별 비용 배지(`src/partials/cost-badge-gen.html`), 소스별 비용 배지(`cost-badge-src.html`), 대시보드의 누적 합계(`Project.totalCost`)
- **엔드포인트**: `/generate/*` 및 `/sources/*` 응답은 반환된 객체(`Generation` / `Source`)를 `estimatedCost`, `usage`, `costBreakdown`(으)로 데코레이션합니다. `POST /generate/route`은(는) 라우팅 단독 비용을 위한 `costDelta: number` 필드를 추가합니다. `POST /detect-consigne`(`{consigne, costDelta}`) 및 구두 응답 확인도 자체 `costDelta`을(를) 반환합니다. `GET /projects/:pid`은(는) `totalCost`(`costLog[]`에서 계산된 합계) + 전체 기록이 보강된 프로젝트를 반환합니다.

### TTS (Mistral Voxtral) 및 커스텀 음성

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, 100% Mistral 음성 합성, 추가 키 불필요
- **커스텀 음성**: 학부모는 Mistral Voices API를 통해(오디오 샘플 기반으로) 자신만의 음성을 생성하고 호스트/게스트 역할에 할당할 수 있습니다 — 이를 통해 팟캐스트와 음성 퀴즈가 부모의 목소리로 재생되어 아이에게 더욱 몰입감 있는 경험을 제공합니다.
- 설정 가능한 두 가지 음성 역할: **호스트**(주 내레이터) 및 **게스트**(팟캐스트의 보조 음성)
- 설정에서 Mistral 음성 전체 카탈로그 제공, 언어별 필터링 가능

### 다국어 지원

- 9개 언어로 인터페이스 제공: fr, en, es, pt, it, nl, de, hi, ar
- AI 프롬프트에서 15개 언어 지원(fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- 프로필별로 언어 설정 가능

---

## 기술 스택

| 계층 | 기술 | 역할 |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | 서버 및 타입 안전성 |
| **Backend** | Express 5.x | REST API |
| **개발 서버** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars 파셜, 프록시 |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 반응형 인터페이스, Vite로 컴파일된 TypeScript |
| **템플릿 엔진** | vite-plugin-handlebars | 파셜을 통한 HTML 구성 |
| **AI** | Mistral AI SDK 2.x | 채팅, OCR, STT, TTS, 에이전트, 검토(모더레이션) |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, 내장 음성 합성 |
| **아이콘** | Lucide 1.x | SVG 아이콘 라이브러리 |
| **웹 스크래핑** | Readability + linkedom | 웹 페이지 주요 콘텐츠 추출 (Firefox Reader View 기술) |
| **헤드리스 브라우저** | Lightpanda | JS/SPA 페이지용 초경량 헤드리스 브라우저(Zig + V8) — 스크래핑 폴백 |
| **Markdown** | Marked | 채팅 내 Markdown 렌더링 |
| **파일 업로드** | Multer 2.x | 멀티파트 폼 처리 |
| **오디오** | ffmpeg-static | 오디오 세그먼트 연결 |
| **테스트** | Vitest | 단위 테스트 — SonarCloud로 커버리지 측정 |
| **영속성** | JSON 파일 | 의존성 없는 저장소 |

---

## 모델 레퍼런스

| 모델 | 용도 | 선정 이유 |
|---|---|---|
| `mistral-large-latest` | 요약본, 플래시카드, 팟캐스트, 퀴즈, 빈칸 채우기, 채팅, 음성 퀴즈 검증, 이미지 에이전트, 웹 검색 에이전트, 지시사항 감지 | 최고 수준의 다국어 지원 + 지시사항 준수 |
| `mistral-ocr-4-1` (OCR 4.1, 기본값) | 문서 OCR | 인쇄 텍스트, 표, 손글씨 (1000페이지당 $4) |
| `mistral-ocr-2512` (OCR 3, 옵션) | 문서 OCR | 설정에서 선택 가능, 더 저렴함(1000페이지당 $2), 손글씨 인식 우수 |
| `voxtral-mini-latest` | 음성 인식 (STT) | 다국어 STT, `language="fr"`(으)로 최적화됨 |
| `voxtral-mini-tts-latest` | 음성 합성 (TTS) | 팟캐스트, 음성 퀴즈, 소리 내어 읽기 |
| `mistral-moderation-2603` | 콘텐츠 검토(모더레이션) | 어린이/청소년 대상 차단 카테고리 6개(`jailbreaking` 포함) |
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

> **참고**: Mistral Voxtral TTS가 유일한 TTS 제공자이며, `MISTRAL_API_KEY` 외에 추가 키가 필요하지 않습니다.

> **사용자가 입력하는 API 키**: `MISTRAL_API_KEY`은(는) 이제 **선택 사항**입니다. 환경 변수가 없어도 앱은 정상 시작되며, 각 사용자에게 인터페이스에서 **자신의 Mistral 키**를 입력하도록 요청합니다. 키는 **브라우저에 저장**되며(보안 컨텍스트에서 Web Crypto + IndexedDB를 통해 암호화됨) 요청 시마다 전송됩니다 — **서버에는 절대 영구 저장되지 않습니다**. 우선순위: 프로필 키 > 브라우저 전역 키 > `MISTRAL_API_KEY`(환경 변수). `EUREKAI_REQUIRE_USER_KEY=true`을(를) 설정하면 모든 사용자가 자신의 키를 직접 제공해야 합니다(환경 변수 키는 프리로드용으로만 사용됨).

> **로컬 HTTPS (태블릿/LAN)**: `localhost`은(는) 이미 보안 컨텍스트입니다. LAN(태블릿) 접속의 경우, 로컬 인증서를 생성하고 HTTPS를 활성화하세요. 그러면 브라우저가 저장하는 키를 암호화할 수 있으며, 전송 중에도 키가 암호화됩니다:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### 환경 변수

| 변수 | 필수 여부 | 기본값 | 역할 |
|---|---|---|---|
| `MISTRAL_API_KEY` | 선택 사항 | — | Mistral API 키(채팅, OCR, STT, Voxtral TTS, 에이전트, 검토). 미지정 시 사용자가 앱 내에서 키를 입력함(브라우저 저장, 서버 저장 안 함) |
| `EUREKAI_REQUIRE_USER_KEY` | 선택 사항 | `false` | `true` → AI 요청 시 `MISTRAL_API_KEY` 폴백을 비활성화(각 사용자가 반드시 자체 키를 제공해야 함). 공개 인스턴스에서 유용함 |
| `HTTPS_KEY` / `HTTPS_CERT` | 선택 사항 | — | TLS 키/인증서 경로(`scripts/gen-cert.sh` 참조) → Express 및 Vite가 HTTPS로 서비스(LAN/태블릿 보안 컨텍스트) |
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

**Git 훅 (Husky)**: `pre-commit`은(는) `scripts/pre-commit-fast.sh`(충돌, 대용량 파일, shellcheck), `lint-staged`, 그리고 `npm test`을(를) 차례로 실행합니다. `pre-push`은(는) 먼저 차단 검사인 `npm audit`을(를) 실행한 후(전이적 의존성을 포함하여 `critical` 수준의 취약점이 발견되면 즉시 차단, `scripts/audit-verdict.mjs` 참조) `npm run security`을(를) 실행합니다. 각 훅은 단계 중 하나라도 실패하면 커밋/푸시를 즉시 차단합니다.

**외부 도구(애플리케이션 실행에는 선택 사항이나, `pretest` 및 `npm run security`에는 필수)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

이러한 도구가 없으면 `npm test`은(는) `pretest`(lizard 없음)에서 실패하고 `npm run security`도 실패합니다(opengrep 없음). 그러면 Husky 훅이 커밋/푸시를 차단합니다.

---

## 컨테이너를 사용한 배포

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

> **`:U`**: 볼륨 권한을 자동으로 조정하는 루트리스(rootless) Podman 플래그입니다.

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

> **코드에 기여하는 AI 에이전트를 위한 안내**: 상세한 아키텍처 컨텍스트, 필수 규칙(에러 코드, 비용 추적, 메타 단어가 없는 프롬프트—즉 모델이 출력에 그대로 복사할 우려가 있으므로 문서 유형 등의 수식어를 사용하지 않는 프롬프트), 알려진 함정(Lizard CCN, Opengrep, Codacy/Semgrep 마이그레이션)은 [`CLAUDE.md`](CLAUDE.md)을(를) 참조하세요.

---

## API 레퍼런스

### 설정

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/config` | 현재 구성 |
| `PUT` | `/api/config` | 구성 수정(모델, 음성, TTS 모델) |
| `GET` | `/api/config/status` | API 상태: `mistral`(Mistral 키 설정 여부), `ttsAvailable`(`mistral`의 별칭, Mistral Voxtral이 유일한 TTS 제공자임) |
| `POST` | `/api/config/reset` | 구성을 기본값으로 재설정 |
| `GET` | `/api/config/voices` | Mistral TTS 음성 목록 조회(선택 사항: `?lang=fr`) |
| `GET` | `/api/moderation-categories` | 사용 가능한 검토 카테고리 + 연령별 기본값 |
| `POST` | `/api/providers/mistral/validate` | 사용자가 입력한 Mistral 키 유효성 검사 — 항상 200 `{status}` 반환(`ok`/`invalid`/`quota`/`network`/`missing`), 환경 변수 폴백 없음 |

### 프로필

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/profiles` | 모든 프로필 목록 조회 |
| `POST` | `/api/profiles` | 프로필 생성 |
| `PUT` | `/api/profiles/:id` | 프로필 수정(15세 미만은 PIN 필수, 15분 내 PIN 10회 오류 시 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | 프로필 삭제 + 프로젝트 연쇄 처리 `{pin?}` → `{ok, deletedProjects}` |

### 프로젝트

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects` | 프로젝트 목록 조회(`?profileId=` 선택 사항) |
| `POST` | `/api/projects` | 프로젝트 생성 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 프로젝트 상세 정보. `?profileId=`은(는) 프로필이 없는 프로젝트를 연 프로필에 연결함 |
| `PUT` | `/api/projects/:pid` | 이름 변경 `{name}` |
| `DELETE` | `/api/projects/:pid` | 프로젝트 삭제 |
| `GET` | `/api/projects/:pid/events` | 생성 상태 전환(`completed`/`failed`/`cancelled`)의 실시간 SSE 스트림(`event: generation`) + keep-alive 하트비트 |

### 소스

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 멀티파트 파일 가져오기(JPG/PNG/PDF는 OCR, TXT/MD는 직접 읽기) |
| `POST` | `/api/projects/:pid/sources/text` | 자유 형식 텍스트 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 음성 STT(멀티파트 오디오) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL 스크래핑 또는 웹 검색 `{query}` — 소스 배열 반환. 모든 주소가 거부된 경우(내부 네트워크) 422 `url_blocked`, 소스를 생성할 수 없는 경우 502 `all_sources_failed` |
| `POST` | `/api/projects/:pid/sources/moderate` | 대기 중이거나 오류가 발생한 검토 재개 `{sourceIds?}`(호출당 최대 10개, 대기 시간 ≤ 10초) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 소스, 가져온 파일 및 이에 종속된 지시사항 삭제 → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | 검토(모더레이션) `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 복습 지시사항 감지(검증된 소스만 해당) → `{consigne, costDelta}` |

### 생성

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 복습 요약본 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 플래시카드 |
| `POST` | `/api/projects/:pid/generate/quiz` | 객관식 퀴즈(보기 4개, 정답 1개) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 빈칸 채우기 |
| `POST` | `/api/projects/:pid/generate/dictation` | 받아쓰기(단어 + 예문 + 규칙, 단어당 1개 TTS 오디오. 자동 라우터에서도 제안됨) |
| `POST` | `/api/projects/:pid/generate/podcast` | 팟캐스트 |
| `POST` | `/api/projects/:pid/generate/image` | 일러스트레이션 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 음성 퀴즈 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 적응형 복습 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | 퀴즈 오답에 초점을 맞춘 복습 요약본 `{generationId, weakQuestions}` — 퀴즈 뷰의 교정/보충 학습 버튼을 통해 `quiz-review`과(와) 병렬로 호출됨 |
| `POST` | `/api/projects/:pid/generate/route` | 라우팅 분석(실행할 생성기 계획) — `{plan, costDelta}`(라우팅 단독 비용) 반환 |
| `POST` | `/api/projects/:pid/generate/auto` | 백엔드 자동 생성(라우팅 + 8가지 유형: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). 병렬 실행 — 동시 요청 수 8회 이상을 허용하는 Mistral 티어를 가정함. 그렇지 않을 경우 `failedSteps`에 여러 개의 429 오류가 발생할 수 있음. |

모든 생성 경로는 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`을(를) 허용합니다. 알 수 없는 `ageGroup` 또는 올바른 언어 코드가 아닌 `lang`(예상 값: `fr`, `pt-BR`…) → AI 호출 이전에 400 `invalid_input` 반환. `quiz-review` 및 `remediation-summary`은(는) 추가로 `{generationId, weakQuestions}`을(를) 요구하며 원본 퀴즈의 소스를 기반으로 작동합니다.

### 생성물 CRUD

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 퀴즈 답안 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 빈칸 채우기 답안 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | 받아쓰기 답안 제출 `{answers}`(엄격한 서버 채점) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 구두 응답 확인(오디오 + questionIndex). 구두 응답은 확인 전에 검토를 거침(거부 시: 400 `quiz.answerBlocked`), 비용은 `costDelta`으로 반환됨 |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 소리 내어 읽기(요약본/플래시카드) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | 진행 중인 생성 취소(대기 중인 생성의 유일한 취소 경로) |
| `PUT` | `/api/projects/:pid/generations/:gid` | 이름 변경 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 생성물 및 관련 미디어(오디오, 이미지) 삭제 |

### 채팅

| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 채팅 기록 조회 |
| `POST` | `/api/projects/:pid/chat` | 메시지 전송 `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | 채팅 기록 삭제 |

---

## 아키텍처 결정 사항

| 결정 사항 | 이유 |
|---|---|
| **React/Vue 대신 Alpine.js** | 최소한의 용량, Vite로 컴파일된 TypeScript를 통한 가벼운 반응성. 속도가 중요한 해커톤에 이상적임. |
| **JSON 파일 영속성** | 무의존성, 즉각적인 시작. 구성할 데이터베이스가 없음 — 바로 실행하여 시작할 수 있음. |
| **Vite + Handlebars** | 두 가지 장점의 결합: 빠른 개발용 HMR, 코드 구성을 위한 HTML 파셜, Tailwind JIT. |
| **중앙 집중식 프롬프트** | 모든 AI 프롬프트를 `prompts.ts`에 집중 — 언어/연령대별 반복 개선, 테스트 및 맞춤화가 용이함. |
| **다중 생성 시스템** | 각 생성물은 자체 ID를 가진 독립된 객체임 — 학습 과정당 여러 개의 요약본, 퀴즈 등을 생성 가능. |
| **연령 맞춤형 프롬프트** | 어휘, 복잡도, 어조가 다른 4개 연령대 — 학습자에 따라 동일한 콘텐츠를 다르게 교육함. |
| **에이전트 기반 기능** | 이미지 생성 및 웹 검색에 일회성 Mistral 에이전트 사용 — 자동 정리를 통한 깔끔한 수명 주기 관리. |
| **지능형 URL 스크래핑** | 단일 입력 필드에서 URL과 키워드의 혼합 입력을 지원 — URL은 Readability(정적 페이지)를 통해 스크래핑되며 Lightpanda(JS/SPA 페이지)로 폴백됨, 키워드는 Mistral web_search 에이전트를 트리거함. 각 결과는 독립적인 소스를 생성함. |
| **100% Mistral TTS** | Mistral Voxtral TTS(`MISTRAL_API_KEY` 외에 추가 키 불필요) — 비용 체인 및 언어별 음성 확인에 통합된 음성 합성. |

---

## 크레딧 및 감사의 말

- **[Mistral AI](https://mistral.ai)** — AI 모델(Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — 경량 반응형 프레임워크
- **[TailwindCSS](https://tailwindcss.com)** — 유틸리티 CSS 프레임워크
- **[Vite](https://vitejs.dev)** — 프론트엔드 빌드 도구
- **[Lucide](https://lucide.dev)** — 아이콘 라이브러리
- **[Marked](https://marked.js.org)** — Markdown 파서
- **[Readability](https://github.com/mozilla/readability)** — 웹 콘텐츠 추출(Firefox Reader View 기술)
- **[Lightpanda](https://lightpanda.io)** — JS/SPA 페이지 스크래핑을 위한 초경량 헤드리스 브라우저
- **[Luciole](https://luciole-vision.com)** — 시각장애인을 위해 설계된 글꼴, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)(프로필의 '읽기 편의' 옵션)

Mistral AI Worldwide Hackathon(2026년 3월)에서 시작되어 [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/), [Gemini CLI](https://geminicli.com/)를 활용해 전적으로 AI로 개발되었습니다.

---

## 작성자

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 라이선스

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**gemini-3.8-flash-high로 프랑스어에서 한국어로 번역된 기사.**
