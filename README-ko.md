<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 로고" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>어떤 콘텐츠든 대화형 학습 경험으로 변환 — <a href="https://mistral.ai">Mistral AI</a>로 구동됩니다.</strong>
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
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="품질 게이트"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="보안 등급"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="신뢰성 등급"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="유지보수성 등급"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="커버리지"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="취약점"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="코드 냄새"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc&token=c8f6207cabba0e2841b2ec04126d7fd6687397e8" alt="코드 라인 수"></a>
</p>

---

## 배경 — 왜 EurekAI인가 ?

**EurekAI**는 [Mistral AI Worldwide 해커톤](https://luma.com/mistralhack-online) ([공식 사이트](https://worldwide-hackathon.mistral.ai/))(2026년 3월) 동안 탄생했습니다. 주제가 필요했는데, 아이디어는 아주 실용적인 것에서 나왔습니다: 저는 딸의 시험 준비를 정기적으로 도와주는데, 인공지능으로 이를 더 즐겁고 인터랙티브하게 만들 수 있겠다고 생각했습니다.

목표: **어떤 입력이든** — 수업 사진, 복사해 붙여넣은 텍스트, 음성 녹음, 웹 검색 — 을 받아 **복습 노트, 플래시카드, 퀴즈, 팟캐스트, 빈칸 텍스트, 일러스트레이션 등**으로 변환하는 것입니다. 모든 것은 Mistral AI의 프랑스 모델로 구동되어 프랑스어권 학생들에게 자연스럽게 적합한 솔루션이 됩니다.

프로젝트는 해커톤 기간 동안 [원본 저장소](https://github.com/jls42/worldwide-hackathon.mistral.ai)에서 개발되었고, 이후 여기에 이어져 보강되었습니다. 전체 코드의 대부분은 AI로 생성되었으며 — 주로 [Claude Code](https://code.claude.com/)를 사용했고, 일부 기여는 [Codex](https://openai.com/codex/)와 [Gemini CLI](https://geminicli.com/)를 통해 이루어졌습니다.

---

## 기능

| | 기능 | 설명 |
|---|---|---|
| 📷 | **파일 가져오기** | 수업 자료를 가져오세요 — 사진, PDF (Mistral OCR을 통해) 또는 텍스트 파일(TXT, MD) |
| 📝 | **텍스트 입력** | 텍스트를 직접 입력하거나 붙여넣기 |
| 🎤 | **음성 입력** | 녹음하세요 — Voxtral STT가 음성을 전사합니다 |
| 🌐 | **웹 검색** | 질문을 입력하세요 — Mistral 에이전트가 웹에서 답을 찾습니다 |
| 📄 | **복습 노트** | 핵심 포인트, 어휘, 인용문, 일화가 포함된 구조화된 노트 |
| 🃏 | **플래시카드** | 출처 참조가 포함된 Q/A 카드(수량 설정 가능) |
| ❓ | **객관식 퀴즈** | 객관식 문제, 해설, 오류에 대한 적응형 복습(수량 설정 가능) |
| ✏️ | **빈칸 텍스트** | 힌트와 관대형 검증을 포함한 빈칸 채우기 연습 |
| 🎙️ | **팟캐스트** | 2인 음성의 미니 팟캐스트를 Mistral Voxtral TTS로 오디오 변환 |
| 🖼️ | **일러스트** | Mistral 에이전트가 생성한 교육용 이미지 |
| 🗣️ | **음성 퀴즈** | 문제를 음성으로 읽고 구술 답변을 AI가 확인 |
| 💬 | **AI 튜터** | 수업 문서를 참조하는 맥락형 채팅, 툴 호출 포함 |
| 🧠 | **자동 라우터** | `mistral-small-latest` 기반 라우터가 콘텐츠를 분석해 7가지 생성기 중 조합을 제안 |
| 🔒 | **부모 통제** | 프로필별 구성 가능한 검열(카테고리 맞춤), 부모 PIN, 채팅 제한 |
| 🌍 | **다국어** | 인터페이스는 9개 언어 제공; AI 생성은 프롬프트로 15개 언어 제어 가능 |
| 🔊 | **음성 읽기** | Mistral Voxtral TTS 또는 ElevenLabs로 노트와 플래시카드를 듣기 |

---

## 아키텍처 개요

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Import fichiers<br/><i>OCR / texte brut</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Recherche web<br/><i>Agent Mistral</i>"]
    end

    subgraph "🛡️ Modération (async, si activée par profil)"
        MOD["Modération<br/><i>mistral-moderation-latest</i>"]
    end

    CON["📋 Détection de consigne<br/><i>mistral-large-latest</i>"]

    subgraph "🧠 Générateurs IA"
        SUM["📄 Fiche"]
        FC["🃏 Flashcards"]
        QZ["❓ Quiz QCM"]
        FB["✏️ Textes à trous"]
        POD["🎙️ Podcast"]
        IMG["🖼️ Illustration"]
        QV["🗣️ Quiz vocal"]
        CHAT["💬 Tuteur IA"]
    end

    subgraph "📤 Sortie"
        TTS["🔊 TTS<br/><i>Mistral Voxtral / ElevenLabs</i>"]
        JSON["📦 Persistance JSON"]
        UI["🖥️ Interface interactive"]
    end

    OCR & TXT & MIC & WEB --> MOD
    OCR & TXT & MIC & WEB --> CON
    MOD -.->|garde| SUM & FC & QZ & FB & POD & IMG & QV & CHAT
    CON -.->|consigne| SUM & FC & QZ & FB
    POD --> TTS
    QV --> TTS
    SUM & FC -->|lecture à voix haute| TTS
    SUM & FC & QZ & FB & POD & IMG & QV & CHAT --> JSON
    JSON --> UI
    TTS --> UI
```

---

## 모델 사용 지도

```mermaid
flowchart LR
    subgraph "Modèles Mistral"
        ML["mistral-large-latest"]
        MO["mistral-ocr-latest"]
        MV["voxtral-mini-latest"]
        MMod["mistral-moderation-latest"]
        MS["mistral-small-latest"]
        MTTS["voxtral-mini-tts-latest"]
    end

    subgraph "Tâches"
        T1["Fiche / Flashcards / Podcast / Chat / Quiz / Quiz vocal / Textes à trous / Vérification quiz / Consigne"]
        T2["OCR — documents, tableaux, écriture manuscrite (JPG, PNG, PDF)"]
        T3["Reconnaissance vocale — STT optimisé FR"]
        T4["Modération de contenu — filtrage par âge"]
        T5["Routeur automatique — analyse du contenu"]
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

## 사용자 흐름

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

## 심층 탐구 — 기능들

### 멀티모달 입력

EurekAI는 프로필에 따라 검열되는 4가지 소스 유형(어린이 및 청소년에 대해 기본 활성화)을 허용합니다:

- **파일 가져오기** — JPG, PNG 또는 PDF 파일은 `mistral-ocr-latest`으로 처리(인쇄된 텍스트, 표, 손글씨), 또는 텍스트 파일(TXT, MD)을 직접 가져오기.
- **자유 텍스트** — 원하는 내용을 입력하거나 붙여넣기. 저장 전에 검열이 활성화되어 있으면 검열됩니다.
- **음성 입력** — 브라우저에서 오디오를 녹음하세요. `voxtral-mini-latest`가 전사합니다. `language="fr"` 설정은 인식 최적화를 돕습니다.
- **웹 검색** — 쿼리를 입력하세요. 임시 Mistral 에이전트가 도구 `web_search`을 사용해 결과를 수집하고 요약합니다.

### AI 콘텐츠 생성

생성되는 7가지 학습 자료 유형:

| 생성기 | 모델 | 출력 |
|---|---|---|
| **복습 노트** | `mistral-large-latest` | 제목, 요약, 핵심 포인트, 어휘, 인용문, 일화 |
| **플래시카드** | `mistral-large-latest` | 질문/답 카드, 출처 참조(수량 설정 가능) |
| **객관식 퀴즈** | `mistral-large-latest` | 객관식 문제, 해설, 적응형 복습(수량 설정 가능) |
| **빈칸 텍스트** | `mistral-large-latest` | 빈칸 채우기 문장, 힌트 제공, 관대형 검증(Levenshtein) |
| **팟캐스트** | `mistral-large-latest` + Voxtral TTS | 2인 스크립트 → MP3 오디오 |
| **일러스트** | Agent `mistral-large-latest` | 도구 `image_generation`을 통한 교육용 이미지 |
| **음성 퀴즈** | `mistral-large-latest` + Voxtral TTS + STT | TTS로 문제 읽기 → STT로 답변 → AI 검증 |

### 채팅 기반 AI 튜터

채팅형 튜터는 수업 문서에 완전 접근합니다:

- `mistral-large-latest` 사용
- **툴 호출**: 대화 중에 복습 노트, 플래시카드, 퀴즈 또는 빈칸 텍스트를 생성할 수 있습니다
- 수업당 50개 메시지 이력
- 프로필에 대해 활성화된 경우 콘텐츠 검열 적용

### 자동 라우터

라우터는 `mistral-small-latest`을 사용하여 소스의 내용을 분석하고 7가지 생성기 중 가장 적절한 조합을 제안합니다. 인터페이스는 실시간 진행률을 표시합니다: 먼저 분석 단계, 그다음 개별 생성(취소 가능).

### 적응형 학습

- **퀴즈 통계**: 질문별 시도 수와 정확도 추적
- **퀴즈 복습**: 약한 개념을 겨냥한 5-10개의 새로운 문제 생성
- **지시 감지**: "Je sais ma leçon si je sais..."와 같은 복습 지시를 감지하고 호환되는 텍스트 생성기(복습 노트, 플래시카드, 퀴즈, 빈칸 텍스트)에 우선 적용

### 보안 및 부모 통제

- **4개 연령 그룹**: 어린이 (≤10세), 청소년 (11-15세), 학생 (16-25세), 성인 (26세+)
- **콘텐츠 검열**: `mistral-moderation-latest` 사용, 10개 카테고리 제공, 어린이/청소년에 대해 기본적으로 5개 차단(`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). 카테고리는 설정에서 프로필별로 맞춤 가능.
- **부모 PIN**: SHA-256 해시, 15세 미만 프로필에 필요. 프로덕션 배포에서는 솔트가 있는 느린 해시(Argon2id, bcrypt)를 사용하세요.
- **채팅 제한**: 16세 미만은 기본적으로 AI 채팅 비활성화, 부모가 활성화 가능

### 다중 프로필 시스템

- 여러 프로필 지원(이름, 나이, 아바타, 언어 선호)
- 프로필에 연결된 프로젝트는 `profileId`을 통해 관리
- 연쇄 삭제: 프로필 삭제 시 모든 프로젝트가 함께 삭제됩니다

### TTS 다중 제공자

- **Mistral Voxtral TTS** (기본): `voxtral-mini-tts-latest`, 추가 키 불필요
- **ElevenLabs** (대안): `eleven_v3`, 자연스러운 음성, `ELEVENLABS_API_KEY` 필요
- 앱 설정에서 제공자 구성 가능

### 국제화

- 인터페이스는 9개 언어 지원: fr, en, es, pt, it, nl, de, hi, ar
- AI 프롬프트는 15개 언어 지원(fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- 언어는 프로필별로 설정 가능

---

## 기술 스택

| 계층 | 기술 | 역할 |
|---|---|---|
| **런타임** | Node.js + TypeScript 6.x | 서버 및 타입 안전성 |
| **백엔드** | Express 5.x | REST API |
| **개발 서버** | Vite 8.x (Rolldown) + tsx | HMR, Handlebars partials, 프록시 |
| **프론트엔드** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 반응형 인터페이스, TypeScript는 Vite로 컴파일 |
| **템플레이트** | vite-plugin-handlebars | partials로 HTML 구성 |
| **AI** | Mistral AI SDK 2.x | 채팅, OCR, STT, TTS, Agents, 검열 |
| **TTS (기본)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, 통합 음성 합성 |
| **TTS (대안)** | ElevenLabs SDK 2.x | `eleven_v3`, 자연스러운 음성 |
| **아이콘** | Lucide 1.x | SVG 아이콘 라이브러리 |
| **마크다운** | Marked | 채팅 내에서 마크다운 렌더링 |
| **파일 업로드** | Multer 2.x | multipart 폼 처리 |
| **오디오** | ffmpeg-static | 오디오 세그먼트 결합 |
| **테스트** | Vitest | 단위 테스트 — 커버리지는 SonarCloud로 측정 |
| **영속성** | JSON 파일 | 종속성 없는 저장 |

---

## 모델 참조

| 모델 | 사용처 | 이유 |
|---|---|---|
| `mistral-large-latest` | 복습 노트, 플래시카드, 팟캐스트, 퀴즈, 빈칸 텍스트, 채팅, 음성 퀴즈 검증, 이미지 에이전트, 웹 검색 에이전트, 지시 감지 | 최고의 다국어 성능 + 지시 추적 |
| `mistral-ocr-latest` | 문서 OCR | 인쇄 텍스트, 표, 손글씨 |
| `voxtral-mini-latest` | 음성 인식 (STT) | 다국어 STT, `language="fr"`로 최적화 |
| `voxtral-mini-tts-latest` | 음성 합성 (TTS) | 팟캐스트, 음성 퀴즈, 음성 읽기 |
| `mistral-moderation-latest` | 콘텐츠 검열 | 어린이/청소년용으로 5개 카테고리 차단 (+ 탈옥 방지) |
| `mistral-small-latest` | 자동 라우터 | 라우팅 결정을 위한 빠른 콘텐츠 분석 |
| `eleven_v3` (ElevenLabs) | 음성 합성 (대체 TTS) | 자연스러운 음성, 구성 가능한 대안 |

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

> **참고** : Mistral Voxtral TTS가 기본 제공자입니다 — `MISTRAL_API_KEY` 외에 추가 키가 필요 없습니다. ElevenLabs는 설정에서 구성 가능한 대체 TTS 제공자입니다.

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
  websearch.ts            — Agent Mistral avec outil web_search
  moderation.ts           — Modération de contenu (filtrage par âge)

routes/
  projects.ts             — CRUD projets
  profiles.ts             — CRUD profils avec gestion du PIN
  sources.ts              — Import fichiers (OCR + texte brut), texte libre, voix STT, recherche web, modération
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

### 구성
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/config` | 현재 구성 |
| `PUT` | `/api/config` | 구성 수정(모델, 음성, TTS 제공자) |
| `GET` | `/api/config/status` | API 상태(Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | 구성을 기본값으로 재설정 |
| `GET` | `/api/config/voices` | Mistral TTS 음성 목록(선택적 `?lang=fr`) |
| `GET` | `/api/moderation-categories` | 사용 가능한 검열 카테고리 + 연령별 기본값 |

### 프로필
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/profiles` | 모든 프로필 나열 |
| `POST` | `/api/profiles` | 프로필 생성 |
| `PUT` | `/api/profiles/:id` | 프로필 수정 (15세 미만은 PIN 필요) |
| `DELETE` | `/api/profiles/:id` | 프로필 삭제 + 프로젝트 연쇄 삭제 `{pin?}` → `{ok, deletedProjects}` |

### 프로젝트
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects` | 프로젝트 나열 (`?profileId=` 선택적) |
| `POST` | `/api/projects` | 프로젝트 생성 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 프로젝트 상세 |
| `PUT` | `/api/projects/:pid` | 이름 변경 `{name}` |
| `DELETE` | `/api/projects/:pid` | 프로젝트 삭제 |

### 소스
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | 멀티파트 파일 가져오기 (JPG/PNG/PDF는 OCR, TXT/MD는 직접 읽기) |
| `POST` | `/api/projects/:pid/sources/text` | 자유 텍스트 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 음성 STT (오디오 멀티파트) |
| `POST` | `/api/projects/:pid/sources/websearch` | 웹 검색 `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 소스 삭제 |
| `POST` | `/api/projects/:pid/moderate` | 검열 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 복습 지시 감지 |

### 생성
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 복습 노트 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 플래시카드 |
| `POST` | `/api/projects/:pid/generate/quiz` | 객관식 퀴즈 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 빈칸 텍스트 |
| `POST` | `/api/projects/:pid/generate/podcast` | 팟캐스트 |
| `POST` | `/api/projects/:pid/generate/image` | 일러스트 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 음성 퀴즈 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 적응형 복습 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 라우팅 분석(실행할 생성기 계획) |
| `POST` | `/api/projects/:pid/generate/auto` | 자동 백엔드 생성(라우팅 + 5종류: summary, flashcards, quiz, fill-blank, podcast) |

모든 생성 라우트는 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`을 허용합니다. `quiz-review`에는 추가로 `{generationId, weakQuestions}`가 필요합니다.

### CRUD 생성물
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 퀴즈 답 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 빈칸 텍스트 답 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 구술 답변 확인 (오디오 + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS로 읽기 (복습 노트/플래시카드) |
| `PUT` | `/api/projects/:pid/generations/:gid` | 이름 변경 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 생성물 삭제 |

### 채팅
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 채팅 이력 가져오기 |
| `POST` | `/api/projects/:pid/chat` | 메시지 전송 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 채팅 이력 삭제 |

---

## 아키텍처 결정사항 | 결정 | 이유 |
|---|---|
| **React/Vue 대신 Alpine.js** | 최소한의 발자국, Vite로 컴파일된 TypeScript로 가벼운 반응성. 속도가 중요한 해커톤에 완벽합니다. |
| **JSON 파일 기반 영속성** | 의존성 제로, 즉시 시작. 구성할 데이터베이스 없음 — 시작하면 바로 사용 가능합니다. |
| **Vite + Handlebars** | 양쪽의 장점: 개발을 위한 빠른 HMR, 코드 구성을 위한 HTML partials(부분 템플릿), Tailwind JIT. |
| **프롬프트 중앙화** | 모든 IA 프롬프트는 `prompts.ts`에 — 언어/연령대별로 반복, 테스트 및 조정하기 쉬움. |
| **다중 생성 시스템** | 각 생성은 고유 ID를 가진 독립 객체 — 강좌별로 여러 학습지, 퀴즈 등을 허용합니다. |
| **연령별 맞춤 프롬프트** | 4개 연령대별로 어휘, 복잡도 및 어조가 다름 — 동일한 콘텐츠가 학습자에 따라 다르게 전달됩니다. |
| **에이전트 기반 기능** | 이미지 생성과 웹 검색은 임시 Mistral 에이전트를 사용 — 자체 수명 주기와 자동 정리. |
| **다중 제공자 TTS** | 기본은 Mistral Voxtral TTS(추가 키 불필요), 대안으로 ElevenLabs — 재시작 없이 구성 가능. |

---

## 크레딧 & 감사

- **[Mistral AI](https://mistral.ai)** — AI 모델 (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide 해커톤
- **[ElevenLabs](https://elevenlabs.io)** — 대체 음성 합성 엔진 (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 경량 리액티브 프레임워크
- **[TailwindCSS](https://tailwindcss.com)** — 유틸리티 CSS 프레임워크
- **[Vite](https://vitejs.dev)** — 프론트엔드 빌드 도구
- **[Lucide](https://lucide.dev)** — 아이콘 라이브러리
- **[Marked](https://marked.js.org)** — 마크다운 파서

Mistral AI Worldwide Hackathon(2026년 3월) 중 시작되었으며, [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) 및 [Gemini CLI](https://geminicli.com/)와 함께 전적으로 AI로 개발되었습니다.

---

## 저자

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 라이선스

[AGPL-3.0](LICENSE) — 저작권 (C) 2026 Julien LS

**이 문서는 gpt-5-mini 모델을 사용하여 fr 버전에서 ko 언어로 번역되었습니다. 번역 프로세스에 대한 자세한 정보는 https://gitlab.com/jls42/ai-powered-markdown-translator를 참조하십시오.**

