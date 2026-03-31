<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 로고" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>모든 콘텐츠를 대화형 학습 경험으로 변환 — <a href="https://mistral.ai">Mistral AI</a> 기반.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 영어</a> · <a href="README-es.md">🇪🇸 스페인어</a> · <a href="README-pt.md">🇧🇷 포르투갈어</a> · <a href="README-de.md">🇩🇪 독일어</a> · <a href="README-it.md">🇮🇹 이탈리아어</a> · <a href="README-nl.md">🇳🇱 네덜란드어</a> · <a href="README-ar.md">🇸🇦 아랍어</a><br>
  <a href="README-hi.md">🇮🇳 힌디어</a> · <a href="README-zh.md">🇨🇳 중국어</a> · <a href="README-ja.md">🇯🇵 일본어</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 폴란드어</a> · <a href="README-ro.md">🇷🇴 루마니아어</a> · <a href="README-sv.md">🇸🇪 스웨덴어</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="YouTube 데모"></a>
</p>

<h4 align="center">📊 코드 품질</h4>

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

## 배경 — 왜 EurekAI인가?

**EurekAI**는 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([공식 사이트](https://worldwide-hackathon.mistral.ai/))(2026년 3월) 기간 동안 탄생했습니다. 주제가 필요했고, 아이디어는 매우 실용적인 필요에서 나왔습니다: 저는 딸과 함께 자주 시험을 준비하는데, AI로 이를 더 재미있고 상호작용적으로 만들 수 있겠다고 생각했습니다.

목표: **어떤 입력이든** — 수업의 사진, 복사-붙여넣은 텍스트, 음성 녹음, 웹 검색 — 을 받아서 **요약 노트, 플래시카드, 퀴즈, 팟캐스트, 빈칸 채우기 문제, 일러스트 등**으로 변환하는 것입니다. 모두 프랑스어 모델인 Mistral AI로 구동되어 프랑스어 사용자에게 자연스럽게 적합한 솔루션입니다.

[초기 프로토타입](https://github.com/jls42/worldwide-hackathon.mistral.ai)은 해커톤 48시간 동안 Mistral 서비스 중심의 개념 증명으로 제작되었습니다 — 작동하지만 제한적이었습니다. 이후 EurekAI는 실제 프로젝트가 되었고: 빈칸 채우기, 연습문제 내비게이션, 웹 스크래핑, 구성 가능한 부모 통제, 심층 코드 리뷰 등 기능이 추가되었습니다. 전체 코드의 대부분은 AI로 생성되었으며 — 주로 [Claude Code](https://code.claude.com/), 일부는 [Codex](https://openai.com/codex/)와 [Gemini CLI](https://geminicli.com/)의 기여가 있습니다.

---

## 기능

| | 기능 | 설명 |
|---|---|---|
| 📷 | **파일 가져오기** | 수업 자료 가져오기 — 사진, PDF (Mistral OCR 사용) 또는 텍스트 파일 (TXT, MD) |
| 📝 | **텍스트 입력** | 텍스트를 직접 입력하거나 붙여넣기 |
| 🎤 | **음성 입력** | 녹음 기능 — Voxtral STT가 음성을 필사 |
| 🌐 | **웹 / URL** | URL 붙여넣기(직접 스크래핑: Readability + Lightpanda) 또는 검색어 입력(Agent Mistral web_search) |
| 📄 | **요약 노트** | 핵심 포인트, 어휘, 인용문, 일화가 포함된 구조화된 노트 |
| 🃏 | **플래시카드** | 출처 참조가 포함된 Q/A 카드로 능동적 암기 지원(개수 설정 가능) |
| ❓ | **객관식 퀴즈** | 오답 적응 복습이 포함된 객관식 문제(개수 설정 가능) |
| ✏️ | **빈칸 채우기 문제** | 힌트와 관용적 검증(허용된 오타) 기능이 있는 완성형 문제 |
| 🎙️ | **팟캐스트** | 2인 음성 미니팟캐스트 — 기본 Mistral 음성 또는 맞춤 음성(부모 음성 가능) |
| 🖼️ | **일러스트** | Agent Mistral로 생성된 교육용 이미지 |
| 🗣️ | **음성 퀴즈** | 음성으로 읽어주는 문제(맞춤 음성 가능), 구두 답변, AI 검증 |
| 💬 | **AI 튜터** | 수업 문서를 참조하는 컨텍스트 채팅, 도구 호출 가능 |
| 🧠 | **자동 라우터** | `mistral-small-latest` 기반 라우터가 콘텐츠를 분석해 7가지 생성기 조합 제안 |
| 🔒 | **부모 통제** | 프로필별 구성 가능한 모더레이션(카테고리 사용자 지정), 부모 PIN, 채팅 제한 |
| 🌍 | **다국어 지원** | 인터페이스 9개 언어 제공; 프롬프트로 15개 언어에서 AI 생성 가능 |
| 🔊 | **텍스트 음성 변환(TTS)** | Mistral Voxtral TTS 또는 ElevenLabs를 통한 노트와 플래시카드 읽기 |

---

## 아키텍처 개요

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="아키텍처 개요" width="800" />
</p>

---

## 모델 매핑

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI 모델-작업 매핑" width="800" />
</p>

---

## 사용자 여정

<p align="center">
  <img src="public/assets/user-journey.webp" alt="학습자 여정" width="800" />
</p>

---

## 심층 탐구 — 기능

### 다중 모달 입력

EurekAI는 프로필별(기본적으로 어린이/청소년에 대해 활성화)로 조정되는 4가지 소스 유형을 허용합니다:

- **파일 가져오기** — JPG, PNG 또는 PDF 파일은 `mistral-ocr-latest`로 처리(인쇄된 텍스트, 표, 손글씨 포함), 또는 텍스트 파일(TXT, MD)을 직접 가져오기.
- **자유 텍스트** — 임의의 콘텐츠를 입력하거나 붙여넣기. 모더레이션이 활성화된 경우 저장 전 검토.
- **음성 입력** — 브라우저에서 오디오 녹음. `voxtral-mini-latest`가 필사. `language="fr"` 설정이 인식 최적화.
- **웹 / URL** — 하나 이상의 URL을 붙여넣어 직접 스크래핑(Readability + Lightpanda, JS 페이지 처리), 또는 키워드로 Mistral Agent 웹 검색 실행. 단일 입력란이 둘 다 허용 — URL과 키워드는 자동으로 분리되고 각 결과는 독립적인 소스로 생성됩니다.

### AI 콘텐츠 생성

생성되는 학습 자료의 7가지 유형:

| 생성기 | 모델 | 출력 |
|---|---|---|
| **요약 노트** | `mistral-large-latest` | 제목, 요약, 핵심 포인트, 어휘, 인용문, 일화 |
| **플래시카드** | `mistral-large-latest` | 출처 참조가 포함된 Q/A 카드(개수 설정 가능) |
| **객관식 퀴즈** | `mistral-large-latest` | 객관식 문제, 해설, 오답 기반 적응 복습(개수 설정 가능) |
| **빈칸 채우기 문제** | `mistral-large-latest` | 힌트가 포함된 문장 완성, 관용적 검증(Levenshtein) |
| **팟캐스트** | `mistral-large-latest` + Voxtral TTS | 2인 스크립트 → MP3 오디오 |
| **일러스트** | Agent `mistral-large-latest` | 도구 `image_generation`을 통한 교육용 이미지 |
| **음성 퀴즈** | `mistral-large-latest` + Voxtral TTS + STT | TTS로 질문 → STT로 답변 → AI 검증 |

### 챗 기반 AI 튜터

문서 전체에 접근 가능한 대화형 튜터:

- `mistral-large-latest` 사용
- **도구 호출**: 대화 중에 요약 노트, 플래시카드, 퀴즈 또는 빈칸 문제를 생성 가능
- 코스별 최대 50개 메시지의 히스토리
- 프로필에 따라 콘텐츠 모더레이션 적용

### 자동 라우터

라우터는 `mistral-small-latest`을 사용해 소스 콘텐츠를 분석하고 7가지 생성기 중 가장 적합한 것을 제안합니다. 인터페이스는 실시간 진행률을 표시: 먼저 분석 단계, 그 다음 개별 생성(취소 가능).

### 적응 학습

- **퀴즈 통계**: 문항별 시도 및 정답률 추적
- **퀴즈 복습**: 약한 개념을 겨냥한 5-10개의 신규 문항 생성
- **지시문 감지**: "내가 수업을 알았는지" 같은 복습 지시를 감지하고(예: "Je sais ma leçon si je sais...") 텍스트 생성기(요약 노트, 플래시카드, 퀴즈, 빈칸 문제)에서 우선 처리

### 보안 및 부모 통제

- **4개 연령 그룹**: 어린이 (≤10세), 청소년 (11-15세), 학생 (16-25세), 성인 (26세+)
- **콘텐츠 모더레이션**: `mistral-moderation-latest` 사용, 10개 카테고리 제공, 어린이/청소년에 대해 기본으로 5개 차단(`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). 프로필 설정에서 카테고리 사용자 지정 가능.
- **부모 PIN**: SHA-256 해시 사용, 15세 미만 프로필에 필수. 프로덕션 배포 시 소금과 느린 해시(Argon2id, bcrypt) 사용 권장.
- **채팅 제한**: 16세 미만에 대해 기본적으로 AI 채팅 비활성화, 부모가 활성화 가능

### 다중 프로필 시스템

- 이름, 나이, 아바타, 언어 선호를 가진 다수의 프로필
- 프로필에 연결된 프로젝트는 `profileId` 통해 관리
- 계층적 삭제: 프로필 삭제 시 모든 프로젝트도 삭제

### 다중 TTS 제공자 및 맞춤 음성

- **Mistral Voxtral TTS** (기본): `voxtral-mini-tts-latest`, 추가 키 불필요
- **ElevenLabs** (대체): `eleven_v3`, 자연스러운 음성, `ELEVENLABS_API_KEY` 필요
- 애플리케이션 설정에서 제공자 선택 가능
- **맞춤 음성**: 부모는 음성 샘플로 Mistral Voices API를 통해 자신만의 음성을 생성하고 호스트/게스트 역할에 할당 가능 — 팟캐스트와 음성 퀴즈는 부모 음성으로 재생되어 자녀에게 더 몰입감 제공
- 설정에서 두 가지 음성 역할 구성 가능: **호스트**(주 내레이터) 및 **게스트**(팟캐스트의 두 번째 음성)
- Mistral 음성 전체 카탈로그는 설정에서 언어별로 필터링 가능

### 국제화

- 인터페이스 9개 언어 제공: fr, en, es, pt, it, nl, de, hi, ar
- AI 프롬프트는 15개 언어 지원(fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- 프로필별 언어 설정 가능

---

## 기술 스택

| 계층 | 기술 | 역할 |
|---|---|---|
| **런타임** | Node.js + TypeScript 6.x | 서버 및 타입 안정성 |
| **백엔드** | Express 5.x | REST API |
| **개발 서버** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, 프록시 |
| **프론트엔드** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 반응형 UI, Vite로 컴파일된 TypeScript |
| **템플릿** | vite-plugin-handlebars | partials로 HTML 구성 |
| **AI** | Mistral AI SDK 2.x | 챗, OCR, STT, TTS, Agents, 모더레이션 |
| **TTS (기본)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, 통합 음성 합성 |
| **TTS (대안)** | ElevenLabs SDK 2.x | `eleven_v3`, 자연스러운 음성 |
| **아이콘** | Lucide 1.x | SVG 아이콘 라이브러리 |
| **웹 스크래핑** | Readability + linkedom | 웹 페이지의 주요 콘텐츠 추출(Firefox Reader View 기술) |
| **헤드리스 브라우저** | Lightpanda | JS/SPA 페이지 처리를 위한 경량 헤드리스 브라우저(Zig + V8) — 폴백 스크래핑 |
| **마크다운** | Marked | 채팅 내 마크다운 렌더링 |
| **파일 업로드** | Multer 2.x | multipart 폼 처리 |
| **오디오** | ffmpeg-static | 오디오 세그먼트 병합 |
| **테스트** | Vitest | 단위 테스트 — 커버리지는 SonarCloud로 측정 |
| **영속성** | JSON 파일 | 외부 의존 없는 저장소 |

---

## 모델 참조

| 모델 | 용도 | 이유 |
|---|---|---|
| `mistral-large-latest` | 요약 노트, 플래시카드, 팟캐스트, 퀴즈, 빈칸 문제, 채팅, 음성 퀴즈 검증, 이미지 에이전트, 웹 검색 에이전트, 지시문 감지 | 다중언어 성능 우수 + 지시문 따름 |
| `mistral-ocr-latest` | 문서 OCR | 인쇄 텍스트, 표, 손글씨 |
| `voxtral-mini-latest` | 음성 인식 (STT) | 다국어 STT, `language="fr"`로 최적화 |
| `voxtral-mini-tts-latest` | 음성 합성 (TTS) | 팟캐스트, 음성 퀴즈, 읽기 기능 |
| `mistral-moderation-latest` | 콘텐츠 모더레이션 | 어린이/청소년에 대해 기본으로 5개 카테고리 차단 (+ jailbreaking 검출) |
| `mistral-small-latest` | 자동 라우터 | 라우팅 결정용 빠른 콘텐츠 분석 |
| `eleven_v3` (ElevenLabs) | 음성 합성 (TTS 대안) | 자연스러운 음성, 선택적 대안 |

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
# Éditez .env avec vos clés :
#   MISTRAL_API_KEY=votre_clé_ici           (requis)
#   ELEVENLABS_API_KEY=votre_clé_ici        (optionnel, TTS alternatif)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **참고** : Mistral Voxtral TTS는 기본 제공자입니다 — `MISTRAL_API_KEY` 외에 추가 키 필요 없음. ElevenLabs는 설정에서 선택 가능한 대체 TTS 제공자입니다.

---

## 컨테이너로 배포

이미지는 **GitHub Container Registry**에 게시되어 있습니다:

```bash
# Télécharger l'image
podman pull ghcr.io/jls42/eurekai:latest

# Lancer EurekAI
mkdir -p ./data
podman run -d --name eurekai \
  -e MISTRAL_API_KEY=votre_clé_ici \
  -e ELEVENLABS_API_KEY=votre_clé_ici \
  -v ./data:/app/output:U \
  -p 3000:3000 \
  ghcr.io/jls42/eurekai:latest
# → http://localhost:3000
```

> **`:U`** 는 Podman rootless 플래그로 볼륨 권한을 자동으로 조정합니다.
> **`ELEVENLABS_API_KEY`** 는 선택 사항입니다 (대체 TTS).

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

## API 참조

### 설정
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/config` | 현재 설정 조회 |
| `PUT` | `/api/config` | 설정 수정(모델, 음성, TTS 제공자) |
| `GET` | `/api/config/status` | API 상태 확인(Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | 기본 설정으로 재설정 |
| `GET` | `/api/config/voices` | Mistral TTS 음성 목록 조회(선택적 `?lang=fr`) |
| `GET` | `/api/moderation-categories` | 사용 가능한 모더레이션 카테고리 + 연령별 기본값 |

### 프로필
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/profiles` | 모든 프로필 목록 |
| `POST` | `/api/profiles` | 프로필 생성 |
| `PUT` | `/api/profiles/:id` | 프로필 수정(15세 미만은 PIN 필요) |
| `DELETE` | `/api/profiles/:id` | 프로필 삭제 + 프로젝트 연쇄 삭제 `{pin?}` → `{ok, deletedProjects}` |

### 프로젝트
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects` | 프로젝트 목록 조회(`?profileId=` 선택적) |
| `POST` | `/api/projects` | 프로젝트 생성 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 프로젝트 상세 |
| `PUT` | `/api/projects/:pid` | 이름 변경 `{name}` |
| `DELETE` | `/api/projects/:pid` | 프로젝트 삭제 ### 출처
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 멀티파트 파일 가져오기 (JPG/PNG/PDF는 OCR, TXT/MD는 직접 읽기) |
| `POST` | `/api/projects/:pid/sources/text` | 자유 텍스트 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 음성 STT (오디오 멀티파트) |
| `POST` | `/api/projects/:pid/sources/websearch` | URL 스크래핑 또는 웹 검색 `{query}` — 소스 배열 반환 |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 소스 삭제 |
| `POST` | `/api/projects/:pid/moderate` | 모더레이션 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 복습 지침 감지 |

### 생성
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 복습 노트 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 플래시카드 |
| `POST` | `/api/projects/:pid/generate/quiz` | 객관식 퀴즈 (QCM) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 빈칸 채우기 텍스트 |
| `POST` | `/api/projects/:pid/generate/podcast` | 팟캐스트 |
| `POST` | `/api/projects/:pid/generate/image` | 일러스트 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 음성 퀴즈 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 적응형 복습 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 라우팅 분석(실행할 제너레이터 계획) |
| `POST` | `/api/projects/:pid/generate/auto` | 백엔드 자동 생성(라우팅 + 5종류: 요약, 플래시카드, 퀴즈, 빈칸, 팟캐스트) |

모든 생성 라우트는 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`을(를) 허용합니다. `quiz-review`는 추가로 `{generationId, weakQuestions}`를(을) 요구합니다.

### 생성 CRUD
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 퀴즈 답안 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 빈칸 텍스트 답안 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 구두 답안 검증(오디오 + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 음성 재생(노트/플래시카드) |
| `PUT` | `/api/projects/:pid/generations/:gid` | 이름 변경 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 생성 삭제 |

### 채팅
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 채팅 기록 가져오기 |
| `POST` | `/api/projects/:pid/chat` | 메시지 전송 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 채팅 기록 삭제 |

---

## 아키텍처 결정

| 결정 | 근거 |
|---|---|
| **React/Vue 대신 Alpine.js** | 최소한의 크기, Vite로 컴파일된 TypeScript로 가벼운 반응성. 속도가 중요한 해커톤에 완벽함. |
| **JSON 파일 지속성** | 종속성이 전혀 없고 즉시 시작 가능. 설정할 데이터베이스가 없음 — 바로 시작할 수 있습니다. |
| **Vite + Handlebars** | 최고의 조합: 개발을 위한 빠른 HMR, 코드 조직을 위한 HTML partials, Tailwind JIT. |
| **중앙화된 프롬프트** | 모든 AI 프롬프트가 `prompts.ts`에 있음 — 언어/연령대별로 반복, 테스트, 조정하기 쉬움. |
| **다중 생성 시스템** | 각 생성은 고유 ID를 가진 독립 객체 — 과정별로 여러 노트, 퀴즈 등을 허용. |
| **연령별 맞춤 프롬프트** | 어휘, 복잡성, 톤이 다른 4개의 연령대 그룹 — 동일한 콘텐츠가 학습자에 따라 다르게 가르침. |
| **에이전트 기반 기능** | 이미지 생성과 웹 검색은 임시 Mistral 에이전트를 사용 — 자동 정리로 깔끔한 수명 관리. |
| **지능형 URL 스크래핑** | 하나의 필드에 URL과 키워드를 혼합 입력 가능 — URL은 Readability(정적 페이지)로 스크랩, JS/SPA는 Lightpanda로 폴백, 키워드는 Mistral web_search 에이전트를 트리거. 각 결과는 독립 소스를 생성. |
| **다중 TTS 제공자** | 기본값 Mistral Voxtral TTS(추가 키 불필요), 대안으로 ElevenLabs — 재시작 없이 설정 가능. |

---

## 크레딧 & 감사

- **[Mistral AI](https://mistral.ai)** — AI 모델(대형, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + 전세계 해커톤
- **[ElevenLabs](https://elevenlabs.io)** — 대체 음성 합성 엔진 (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 경량 반응형 프레임워크
- **[TailwindCSS](https://tailwindcss.com)** — 유틸리티 CSS 프레임워크
- **[Vite](https://vitejs.dev)** — 프론트엔드 빌드 도구
- **[Lucide](https://lucide.dev)** — 아이콘 라이브러리
- **[Marked](https://marked.js.org)** — Markdown 파서
- **[Readability](https://github.com/mozilla/readability)** — 웹 콘텐츠 추출 (기술: Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — JS/SPA 페이지 스크래핑을 위한 초경량 헤드리스 브라우저

Mistral AI Worldwide Hackathon(2026년 3월) 동안 시작되었고, [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) 및 [Gemini CLI](https://geminicli.com/)와 함께 AI에 의해 전적으로 개발됨.

---

## 저자

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 라이선스

[AGPL-3.0](LICENSE) — 저작권 (C) 2026 Julien LS

**이 문서는 gpt-5-mini 모델을 사용하여 fr 버전에서 ko 언어로 번역되었습니다. 번역 과정에 대한 자세한 정보는 https://gitlab.com/jls42/ai-powered-markdown-translator 를 참조하세요.**

