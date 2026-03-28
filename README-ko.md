<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 로고" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>어떤 콘텐츠든 AI로 구동되는 인터랙티브 학습 경험으로 변환합니다.</strong>
</p>

<p align="center">
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-Worldwide%20Hackathon-FF7000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" alt="Mistral AI Hackathon"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-6%20Modèles-FF7000?style=for-the-badge" alt="Mistral AI"></a>
  <a href="https://elevenlabs.io"><img src="https://img.shields.io/badge/ElevenLabs-TTS%20alternatif-000000?style=for-the-badge" alt="ElevenLabs"></a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI">▶️ 유튜브에서 데모 보기</a> · <a href="README-en.md">🇬🇧 영어로 읽기</a>
</p>

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

## 이야기 — 왜 EurekAI인가?

**EurekAI**는 [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([공식 사이트](https://worldwide-hackathon.mistral.ai/))(2026년 3월) 동안 탄생했습니다. 주제가 필요했는데, 계기가 된 것은 아주 실질적인 문제였습니다: 저는 딸과 함께 자주 테스트 준비를 하는데, AI를 활용하면 이를 더 재미있고 인터랙티브하게 만들 수 있지 않을까 생각했습니다.

목표: **어떤 입력이든** — 교재 사진, 복사·붙여넣은 텍스트, 음성 녹음, 웹 검색 등 — 을 받아 **요약 노트, 플래시카드, 퀴즈, 팟캐스트, 빈칸 채우기 문제, 일러스트레이션 등**으로 변환하는 것입니다. 모든 것이 Mistral AI의 프랑스어 모델들로 구동되므로 프랑스어권 학생들에게 자연스럽게 적합한 솔루션입니다.

해커톤 기간 동안 모든 코드 라인이 작성되었습니다. 사용된 모든 API와 오픈소스 라이브러리는 해커톤 규칙에 따라 사용되었습니다.

---

## 기능

| | 기능 | 설명 |
|---|---|---|
| 📷 | **OCR 업로드** | 교재나 노트를 사진으로 찍으세요 — Mistral OCR이 내용을 추출합니다 |
| 📝 | **텍스트 입력** | 원하는 텍스트를 직접 타이핑하거나 붙여넣기 |
| 🎤 | **음성 입력** | 녹음하세요 — Voxtral STT가 음성을 텍스트로 변환합니다 |
| 🌐 | **웹 검색** | 질문을 입력하면 Mistral 에이전트가 웹에서 답을 찾아옵니다 |
| 📄 | **요약 노트** | 핵심 포인트, 어휘, 인용, 에피소드가 포함된 구조화된 노트 |
| 🃏 | **플래시카드** | 출처 참조가 포함된 5-50장 Q/A 카드로 능동적 암기 지원 |
| ❓ | **객관식 퀴즈** | 5-50문제의 객관식 퀴즈와 오답에 대한 적응형 복습 |
| ✏️ | **빈칸 채우기 텍스트** | 힌트와 관대한 정답 검증이 포함된 완성형 연습 |
| 🎙️ | **팟캐스트** | 2인 대화형 미니 팟캐스트를 Mistral Voxtral TTS로 오디오 변환 |
| 🖼️ | **일러스트레이션** | 교육용 이미지를 Mistral 에이전트가 생성 |
| 🗣️ | **음성 퀴즈** | 질문을 음성으로 읽어주고, 학생의 음성 답변을 AI가 검증 |
| 💬 | **AI 튜터** | 수업 자료를 참조하는 컨텍스트 채팅, 도구 호출 가능 |
| 🧠 | **스마트 라우터** | AI가 콘텐츠를 분석해 7가지 생성기 중 가장 적절한 것을 추천 |
| 🔒 | **부모 통제** | 연령별 검열, 부모 PIN, 채팅 제한 기능 |
| 🌍 | **다국어 지원** | 인터페이스 및 AI 콘텐츠가 프랑스어와 영어로 제공 |
| 🔊 | **읽어주기** | 요약 노트와 플래시카드를 Mistral Voxtral TTS 또는 ElevenLabs로 청취 |

---

## 아키텍처 개요

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

## 모델 사용 지도

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

## 심층 분석 — 기능들

### 다중 모달 입력

EurekAI는 4가지 유형의 소스를 허용하며, 프로필에 따라 검열이 적용됩니다(어린이 및 청소년 프로필에는 기본 활성화):

- **OCR 업로드** — JPG, PNG 또는 PDF 파일을 `mistral-ocr-latest`으로 처리합니다. 인쇄된 텍스트, 표 및 손글씨를 처리합니다.
- **자유 텍스트** — 어떤 내용이든 입력하거나 붙여넣기 하세요. 저장 전에 검열이 활성화된 경우 검열됩니다.
- **음성 입력** — 브라우저에서 오디오를 녹음합니다. `voxtral-mini-latest`이 이를 텍스트로 변환합니다. `language="fr"` 설정이 인식률을 최적화합니다.
- **웹 검색** — 쿼리를 입력하면 임시 Mistral 에이전트가 `web_search` 도구를 사용해 결과를 수집하고 요약합니다.

### AI 콘텐츠 생성

다음 7가지 유형의 학습 자료를 생성합니다:

| 생성기 | 모델 | 출력 |
|---|---|---|
| **요약 노트** | `mistral-large-latest` | 제목, 요약, 10-25개의 핵심 포인트, 어휘, 인용, 에피소드 |
| **플래시카드** | `mistral-large-latest` | 출처 참조가 포함된 5-50장의 Q/A 카드로 능동적 암기 지원 |
| **객관식 퀴즈** | `mistral-large-latest` | 5-50문제, 각 4지선다, 해설, 적응형 복습 |
| **빈칸 채우기 텍스트** | `mistral-large-latest` | 힌트가 있는 완성 문장, 관대한 검증(Levenshtein) |
| **팟캐스트** | `mistral-large-latest` + Voxtral TTS | 2인 대본 → MP3 오디오 |
| **일러스트레이션** | Agent `mistral-large-latest` | `image_generation` 도구를 통한 교육용 이미지 |
| **음성 퀴즈** | `mistral-large-latest` + Voxtral TTS + STT | TTS로 질문 출력 → STT로 답변 수집 → AI가 검증 |

### 채팅 기반 AI 튜터

수업 자료에 완전 접근 가능한 대화형 튜터:

- `mistral-large-latest` 사용
- **도구 호출**: 대화 중에 요약 노트, 플래시카드, 퀴즈 또는 빈칸 채우기 문제를 생성할 수 있음
- 코스당 50개 메시지의 히스토리 유지
- 프로필에 따라 콘텐츠 검열 적용

### 자동 지능형 라우터

라우터는 `mistral-small-latest`을 사용해 소스의 내용을 분석하고 7가지 생성기 중 가장 적합한 것을 추천합니다 — 학생이 수동으로 선택할 필요가 없도록. 인터페이스는 실시간 진행 상태를 표시합니다: 먼저 분석 단계가 진행되고, 이후 개별 생성이 진행되며 취소 가능.

### 적응형 학습

- **퀴즈 통계**: 문제별 시도와 정답률 추적
- **퀴즈 복습**: 취약한 개념을 겨냥한 5-10개의 새로운 문제 생성
- **지시 감지**: "이걸 알면 수업을 안다" 같은 복습 지시를 감지하여 모든 생성기에서 우선순위를 높임

### 보안 및 부모 통제

- **4개 연령 그룹**: 어린이(≤10세), 청소년(11-15세), 학생(16-25세), 성인(26세 이상)
- **콘텐츠 검열**: `mistral-moderation-2603`로 어린이/청소년에 대해 5가지 카테고리 차단(성 관련, 증오, 폭력, 자해, 탈옥/우회), 학생/성인에는 제한 없음
- **부모 PIN**: SHA-256 해시, 15세 미만 프로필에 필수
- **채팅 제한**: 16세 미만에는 기본적으로 AI 채팅 비활성화, 부모가 활성화 가능

### 다중 프로필 시스템

- 이름, 나이, 아바타, 언어 선호를 가진 다중 프로필 지원
- `profileId`을 통해 프로필에 연결된 프로젝트 관리
- 계층적 삭제: 프로필을 삭제하면 해당 프로필의 모든 프로젝트가 삭제됨

### TTS 다중 제공자

- **Mistral Voxtral TTS** (기본): `voxtral-mini-tts-latest`, 추가 키 불필요
- **ElevenLabs** (대안): `eleven_v3`, 자연스러운 음성, `ELEVENLABS_API_KEY` 필요
- 애플리케이션 설정에서 제공자 구성 가능

### 다국어화

- 인터페이스가 프랑스어와 영어로 제공
- AI 프롬프트는 현재 2개 언어(FR, EN)를 지원하며, 아키텍처는 향후 15개(es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)를 준비
- 프로필별로 언어 설정 가능

---

## 기술 스택

| 층 | 기술 | 역할 |
|---|---|---|
| **런타임** | Node.js + TypeScript 5.7 | 서버와 타입 안전성 |
| **백엔드** | Express 4.21 | REST API |
| **개발 서버** | Vite 7.3 + tsx | HMR, Handlebars partials, 프록시 |
| **프론트엔드** | HTML + TailwindCSS 4.2 + Alpine.js 3.15 | 반응형 UI, Vite로 컴파일되는 TypeScript |
| **템플릿** | vite-plugin-handlebars | partials로 HTML 구성 |
| **AI** | Mistral AI SDK 2.1 | 채팅, OCR, STT, TTS, 에이전트, 검열 |
| **TTS (기본)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, 통합 음성 합성 |
| **TTS (대안)** | ElevenLabs SDK 2.36 | `eleven_v3`, 자연스러운 음성 |
| **아이콘** | Lucide 0.575 | SVG 아이콘 라이브러리 |
| **마크다운** | Marked 17 | 채팅 내 마크다운 렌더링 |
| **파일 업로드** | Multer 1.4 | multipart 폼 처리 |
| **오디오** | ffmpeg-static | 오디오 세그먼트 결합 |
| **테스트** | Vitest 4 | 단위 테스트 — SonarCloud로 커버리지 측정 |
| **영속성** | JSON 파일 | 의존성 없는 스토리지 |

---

## 모델 참조

| 모델 | 사용처 | 이유 |
|---|---|---|
| `mistral-large-latest` | 요약 노트, 플래시카드, 팟캐스트, 퀴즈, 빈칸 채우기, 채팅, 음성 퀴즈 검증, 이미지 에이전트, 웹 검색 에이전트, 지시 감지 | 멀티링구얼 성능 + 지시 추적에 최적 |
| `mistral-ocr-latest` | 문서 OCR | 인쇄 텍스트, 표, 손글씨 처리 |
| `voxtral-mini-latest` | 음성 인식 (STT) | 다국어 STT, `language="fr"`로 최적화 |
| `voxtral-mini-tts-latest` | 음성 합성 (TTS) | 팟캐스트, 음성 퀴즈, 읽어주기 |
| `mistral-moderation-2603` | 콘텐츠 검열 | 어린이/청소년용 5개 카테고리 차단 |
| `mistral-small-latest` | 지능형 라우터 | 라우팅 결정용 고속 콘텐츠 분석 |
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

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **참고** : Mistral Voxtral TTS는 기본 제공자입니다 — `MISTRAL_API_KEY` 외 추가 키가 필요하지 않습니다. ElevenLabs는 설정에서 구성 가능한 대체 TTS 제공자입니다.

---

## 프로젝트 구조

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

## API 참조

### 설정
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/config` | 현재 설정 조회 |
| `PUT` | `/api/config` | 설정 수정 (모델, 음성, TTS 제공자) |
| `GET` | `/api/config/status` | API 상태 (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | 기본 설정으로 재설정 |
| `GET` | `/api/config/voices` | Mistral TTS 음성 목록 조회 (선택적 `?lang=fr`) |

### 프로필
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/profiles` | 모든 프로필 목록 |
| `POST` | `/api/profiles` | 프로필 생성 |
| `PUT` | `/api/profiles/:id` | 프로필 수정 (15세 미만은 PIN 필요) |
| `DELETE` | `/api/profiles/:id` | 프로필 삭제 + 프로젝트 연쇄 삭제 |

### 프로젝트
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects` | 프로젝트 목록 |
| `POST` | `/api/projects` | 프로젝트 생성 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 프로젝트 상세 |
| `PUT` | `/api/projects/:pid` | 이름 변경 `{name}` |
| `DELETE` | `/api/projects/:pid` | 프로젝트 삭제 |

### 소스
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | OCR 업로드 (multipart 파일) |
| `POST` | `/api/projects/:pid/sources/text` | 자유 텍스트 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | 음성 STT (multipart 오디오) |
| `POST` | `/api/projects/:pid/sources/websearch` | 웹 검색 `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 소스 삭제 |
| `POST` | `/api/projects/:pid/moderate` | 검열 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 복습 지시 감지 |

### 생성
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 요약 노트 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 플래시카드 |
| `POST` | `/api/projects/:pid/generate/quiz` | 객관식 퀴즈 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 빈칸 채우기 텍스트 |
| `POST` | `/api/projects/:pid/generate/podcast` | 팟캐스트 |
| `POST` | `/api/projects/:pid/generate/image` | 일러스트레이션 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 음성 퀴즈 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 적응형 복습 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 라우팅 분석 (실행할 생성기 계획) |
| `POST` | `/api/projects/:pid/generate/auto` | 백엔드 자동 생성 (라우팅 + 5종: 요약, 플래시카드, 퀴즈, 빈칸, 팟캐스트) |

모든 생성 라우트는 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`를 허용합니다.

### CRUD 생성
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 퀴즈 응답 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 빈칸 답안 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 음성 답변 검증 (오디오 + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS로 읽어주기 (요약/플래시카드) |
| `PUT` | `/api/projects/:pid/generations/:gid` | 이름 변경 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 생성물 삭제 |

### 채팅
| 메소드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 채팅 히스토리 조회 |
| `POST` | `/api/projects/:pid/chat` | 메시지 전송 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 채팅 히스토리 삭제 |

---

## 아키텍처 결정

| 결정 | 정당성 |
|---|---|
| **Alpine.js를 React/Vue 대신 선택** | 작은 용량, TypeScript로 컴파일되는 가벼운 반응성. 해커톤처럼 속도가 중요한 환경에 적합. |
| **JSON 파일로 영속성 유지** | 의존성 0, 즉시 시작 가능. 데이터베이스 설정 불필요 — 바로 시작할 수 있음. |
| **Vite + Handlebars** | 두 환경의 장점: 빠른 HMR 개발, 코드 정리를 위한 HTML partials, Tailwind JIT 지원. | **중앙화된 프롬프트** | 모든 AI 프롬프트는 `prompts.ts`에 있음 — 언어/연령대별로 반복, 테스트 및 조정하기 쉬움. |
| **다중 생성 시스템** | 각 생성물은 고유 ID를 가진 독립 객체입니다 — 강좌당 여러 학습지, 퀴즈 등을 허용합니다. |
| **연령별 맞춤 프롬프트** | 4개의 연령대 그룹(어휘, 복잡도 및 어조가 다름) — 동일한 콘텐츠가 학습자에 따라 다르게 전달됩니다. |
| **에이전트 기반 기능** | 이미지 생성 및 웹 검색은 임시 Mistral 에이전트를 사용합니다 — 자체 수명 주기와 자동 정리 기능을 갖춤. |
| **다중 TTS 제공자** | 기본값은 Mistral Voxtral TTS(추가 키 불필요), 대안으로 ElevenLabs — 재시작 없이 구성 가능. |

---

## 크레딧 및 감사

- **[Mistral AI](https://mistral.ai)** — AI 모델 (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 대체 음성 합성 엔진 (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 경량 반응형 프레임워크
- **[TailwindCSS](https://tailwindcss.com)** — 유틸리티 CSS 프레임워크
- **[Vite](https://vitejs.dev)** — 프런트엔드 빌드 도구
- **[Lucide](https://lucide.dev)** — 아이콘 라이브러리
- **[Marked](https://marked.js.org)** — Markdown 파서

2026년 3월 Mistral AI Worldwide Hackathon 기간 동안 정성스럽게 제작됨.

---

## 저자

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 라이선스

[AGPL-3.0](LICENSE) — 저작권 (C) 2026 Julien LS

**이 문서는 gpt-5-mini 모델을 사용하여 fr 버전에서 ko 언어로 번역되었습니다. 번역 과정에 대한 자세한 정보는 https://gitlab.com/jls42/ai-powered-markdown-translator 를 참조하세요**

