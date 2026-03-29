<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI 로고" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>모든 콘텐츠를 대화형 학습 경험으로 변환 — Mistral AI로 구동.</strong>
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

## 이야기 — 왜 EurekAI인가 ?

**EurekAI**는 [Mistral AI Worldwide 해커톤](https://luma.com/mistralhack-online) ([공식 사이트](https://worldwide-hackathon.mistral.ai/)) (2026년 3월) 동안 탄생했습니다. 주제가 필요했는데, 아이디어는 매우 실제적인 것에서 나왔습니다: 저는 딸과 정기적으로 시험 대비를 준비하는데, AI를 통해 이것을 더 재미있고 인터랙티브하게 만들 수 있겠다고 생각했습니다.

목표: **어떤 입력이든** — 교재 사진, 텍스트 복사-붙여넣기, 음성 녹음, 웹 검색 — 을 받아 **복습 노트, 플래시카드, 퀴즈, 팟캐스트, 빈칸 채우기, 삽화 등**으로 변환하는 것입니다. 모두 Mistral AI의 프랑스어 모델로 구동되어 프랑스어권 학생들에게 자연스럽게 적합한 솔루션입니다.

이 프로젝트는 해커톤에서 시작되었고 이후 밖에서 다시 작업되어 확장되었습니다. 전체 코드가 주로 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)에 의해 생성되었으며, 일부는 [Codex](https://openai.com/index/introducing-codex/)를 통해 기여되었습니다.

---

## 기능

| | 기능 | 설명 |
|---|---|---|
| 📷 | **OCR 업로드** | 교재나 노트를 사진으로 찍으면 Mistral OCR이 내용을 추출합니다 |
| 📝 | **텍스트 입력** | 텍스트를 직접 입력하거나 붙여넣기 하세요 |
| 🎤 | **음성 입력** | 녹음하면 Voxtral STT가 음성을 전사합니다 |
| 🌐 | **웹 검색** | 질문을 입력하면 Mistral 에이전트가 웹에서 답을 찾아요 |
| 📄 | **복습 노트** | 핵심 포인트, 어휘, 인용구, 일화가 포함된 구조화된 노트 |
| 🃏 | **플래시카드** | 출처 참조가 포함된 5-50장의 질문/답 카드로 능동적 암기 |
| ❓ | **객관식 퀴즈** | 오답에 대한 적응형 복습을 포함한 5-50문항의 객관식 퀴즈 |
| ✏️ | **빈칸 채우기** | 힌트와 유연한 정답 검증을 갖춘 완성형 문제 |
| 🎙️ | **팟캐스트** | 2인 대본으로 만든 미니 팟캐스트를 Mistral Voxtral TTS로 오디오 변환 |
| 🖼️ | **삽화** | Mistral 에이전트가 생성한 교육용 이미지 |
| 🗣️ | **음성 퀴즈** | 질문을 음성으로 읽고, 구두 응답을 AI가 검증합니다 |
| 💬 | **AI 튜터** | 수업 문서와 맥락을 공유하는 채팅, 도구 호출 가능 |
| 🧠 | **자동 라우터** | `mistral-small-latest` 기반 라우터가 내용을 분석하여 7가지 생성기 중 조합을 제안합니다 |
| 🔒 | **부모 통제** | 연령별 검열, 부모 PIN, 채팅 제한 |
| 🌍 | **다국어** | 인터페이스는 9개 언어로 제공; 프롬프트로 15개 언어로 AI 생성 제어 가능 |
| 🔊 | **음성 읽기(텍스트 음성 변환)** | Mistral Voxtral TTS 또는 ElevenLabs로 노트와 플래시카드를 들으세요 |

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
        IMG["🖼️ Illustration"]
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

## 모델 활용도 지도

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

## 심층 분석 — 기능들

### 멀티모달 입력

EurekAI는 프로필에 따라(어린이 및 청소년에 대해 기본 활성화) 검열되는 4가지 유형의 소스를 허용합니다 :

- **OCR 업로드** — JPG, PNG 또는 PDF 파일을 `mistral-ocr-latest`로 처리합니다. 인쇄된 텍스트, 표, 손글씨를 처리합니다.
- **자유 텍스트** — 아무 텍스트나 입력하거나 붙여넣기 하세요. 검열이 활성화된 경우 저장 전에 검토됩니다.
- **음성 입력** — 브라우저에서 오디오를 녹음하세요. `voxtral-mini-latest`가 전사합니다. `language="fr"` 매개변수가 인식 성능을 최적화합니다.
- **웹 검색** — 쿼리를 입력하세요. 도구 `web_search`를 가진 임시 Mistral 에이전트가 결과를 수집하고 요약합니다.

### AI 콘텐츠 생성

생성되는 학습 자료는 7가지 유형입니다 :

| 생성기 | 모델 | 출력 |
|---|---|---|
| **복습 노트** | `mistral-large-latest` | 제목, 요약, 10-25개의 핵심 포인트, 어휘, 인용문, 일화 |
| **플래시카드** | `mistral-large-latest` | 출처 참조가 포함된 5-50장의 Q/A 카드로 능동적 암기 |
| **객관식 퀴즈** | `mistral-large-latest` | 5-50문항, 각 4지선다, 설명 및 적응형 복습 |
| **빈칸 채우기** | `mistral-large-latest` | 힌트가 있는 완성 문장, 유연한 정답 검증(Levenshtein) |
| **팟캐스트** | `mistral-large-latest` + Voxtral TTS | 2인 대본 → MP3 오디오 |
| **삽화** | Agent `mistral-large-latest` | 도구 `image_generation`를 통한 교육용 이미지 |
| **음성 퀴즈** | `mistral-large-latest` + Voxtral TTS + STT | TTS로 질문 → STT로 응답 → AI가 검증 |

### 채팅 기반 AI 튜터

수업 문서에 완전히 접근할 수 있는 대화형 튜터:

- `mistral-large-latest` 사용
- **도구 호출** : 대화 중에 노트, 플래시카드, 퀴즈 또는 빈칸 문제를 생성할 수 있습니다
- 코스별로 50개 메시지의 히스토리를 유지합니다
- 프로필에 대해 활성화된 경우 콘텐츠 검열이 적용됩니다

### 자동 라우터

라우터는 소스의 내용을 분석하기 위해 `mistral-small-latest`를 사용하여 7가지 생성기 중 가장 적절한 것을 제안합니다. 인터페이스는 실시간 진행을 표시합니다 : 먼저 분석 단계가 있고, 그 다음 각 생성물이 생성되며 취소가 가능합니다.

### 적응형 학습

- **퀴즈 통계** : 문항별 시도 횟수 및 정확도 추적
- **퀴즈 복습** : 약한 개념을 겨냥한 5-10개의 새로운 문제 생성
- **지시 검출** : 복습 지시("내가 수업을 안다는 것은 ...을 알면")를 감지하고 텍스트 생성기(노트, 플래시카드, 퀴즈, 빈칸 채우기)에서 우선순위를 둡니다

### 보안 및 부모 통제

- **4개 연령 그룹** : 어린이 (≤10세), 청소년 (11-15세), 학생 (16-25세), 성인 (26세+)
- **콘텐츠 검열** : `mistral-moderation-2603` — 어린이/청소년에게는 5개 카테고리(성적, 혐오, 폭력, 자해, 탈옥) 차단, 학생/성인에게는 제한 없음
- **부모 PIN** : SHA-256 해시, 15세 미만 프로필에 필요합니다. 프로덕션 배포의 경우 솔트가 있는 느린 해시(Argon2id, bcrypt)를 사용하세요.
- **채팅 제한** : 16세 미만은 기본적으로 AI 채팅이 비활성화되며, 부모가 활성화할 수 있습니다

### 다중 프로필 시스템

- 이름, 나이, 아바타, 언어 선호 설정을 가진 다중 프로필
- `profileId`를 통해 프로필에 연결된 프로젝트
- 연쇄 삭제 : 프로필을 삭제하면 해당 프로필의 모든 프로젝트가 삭제됩니다

### 다중 TTS 제공자

- **Mistral Voxtral TTS** (기본) : `voxtral-mini-tts-latest`, 추가 키 불필요
- **ElevenLabs** (대안) : `eleven_v3`, 자연스러운 음성, `ELEVENLABS_API_KEY` 필요
- 제공자는 앱 설정에서 구성 가능

### 국제화

- 인터페이스는 9개 언어로 제공 : fr, en, es, pt, it, nl, de, hi, ar
- AI 프롬프트는 15개 언어를 지원 (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- 언어는 프로필별로 구성 가능

---

## 기술 스택

| 레이어 | 기술 | 역할 |
|---|---|---|
| **런타임** | Node.js + TypeScript 5.x | 서버 및 타입 안정성 |
| **백엔드** | Express 4.x | REST API |
| **개발 서버** | Vite 7.x + tsx | HMR, Handlebars 파셜, 프록시 |
| **프론트엔드** | HTML + TailwindCSS 4.x + Alpine.js 3.x | 반응형 인터페이스, Vite로 컴파일된 TypeScript |
| **템플릿** | vite-plugin-handlebars | 파셜을 통한 HTML 구성 |
| **AI** | Mistral AI SDK 2.x | 채팅, OCR, STT, TTS, 에이전트, 검열 |
| **TTS (기본)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, 통합 음성 합성 |
| **TTS (대안)** | ElevenLabs SDK 2.x | `eleven_v3`, 자연스러운 음성 |
| **아이콘** | Lucide | SVG 아이콘 라이브러리 |
| **마크다운** | Marked | 채팅 내 마크다운 렌더링 |
| **파일 업로드** | Multer 1.4 LTS | multipart 폼 처리 |
| **오디오** | ffmpeg-static | 오디오 세그먼트 병합 |
| **테스트** | Vitest | 단위 테스트 — SonarCloud로 커버리지 측정 |
| **영속성** | JSON 파일 | 의존성이 없는 저장 |

---

## 모델 참조

| 모델 | 용도 | 이유 |
|---|---|---|
| `mistral-large-latest` | 노트, 플래시카드, 팟캐스트, 퀴즈, 빈칸 문제, 채팅, 음성 퀴즈 검증, 이미지 에이전트, 웹 검색 에이전트, 지시 검출 | 다국어 처리 및 지시 따르기 우수 |
| `mistral-ocr-latest` | 문서 OCR | 인쇄 텍스트, 표, 손글씨 |
| `voxtral-mini-latest` | 음성인식 (STT) | 다국어 STT, `language="fr"`로 최적화 |
| `voxtral-mini-tts-latest` | 음성 합성 (TTS) | 팟캐스트, 음성 퀴즈, 텍스트 음성 읽기 |
| `mistral-moderation-2603` | 콘텐츠 검열 | 어린이/청소년에게 5개 카테고리 차단 (+ 탈옥 대응) |
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

> **참고** : Mistral Voxtral TTS는 기본 제공자입니다 — `MISTRAL_API_KEY` 외 추가 키 불필요. ElevenLabs는 설정에서 구성할 수 있는 대체 TTS 제공자입니다.

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
  ocr.ts                  — Upload + OCR via Mistral (JPG, PNG, PDF)
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
| `GET` | `/api/config` | 현재 구성 |
| `PUT` | `/api/config` | 구성 수정 (모델, 음성, TTS 제공자) |
| `GET` | `/api/config/status` | API 상태 (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | 기본 구성으로 재설정 |
| `GET` | `/api/config/voices` | Mistral TTS 음성 목록 (선택적 `?lang=fr`) |

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
| `GET` | `/api/projects` | 프로젝트 나열 (`?profileId=` 선택) |
| `POST` | `/api/projects` | 프로젝트 생성 `{name, profileId}` |
| `GET` | `/api/projects/:pid` | 프로젝트 상세 |
| `PUT` | `/api/projects/:pid` | 이름 변경 `{name}` |
| `DELETE` | `/api/projects/:pid` | 프로젝트 삭제 |

### 소스
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | OCR 업로드 (multipart 파일) |
| `POST` | `/api/projects/:pid/sources/text` | 자유 텍스트 `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | STT 음성 (audio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | 웹 검색 `{query}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | 소스 삭제 |
| `POST` | `/api/projects/:pid/moderate` | 검열 `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | 복습 지시 검출 |

### 생성
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | 복습 노트 |
| `POST` | `/api/projects/:pid/generate/flashcards` | 플래시카드 |
| `POST` | `/api/projects/:pid/generate/quiz` | 객관식 퀴즈 |
| `POST` | `/api/projects/:pid/generate/fill-blank` | 빈칸 채우기 |
| `POST` | `/api/projects/:pid/generate/podcast` | 팟캐스트 |
| `POST` | `/api/projects/:pid/generate/image` | 삽화 |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | 음성 퀴즈 |
| `POST` | `/api/projects/:pid/generate/quiz-review` | 적응형 복습 `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | 라우팅 분석 (실행할 생성기 계획) |
| `POST` | `/api/projects/:pid/generate/auto` | 자동 백엔드 생성 (라우팅 + 5종: 요약, 플래시카드, 퀴즈, 빈칸, 팟캐스트) |

모든 생성 라우트는 `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`을(를) 허용합니다. `quiz-review`는 추가로 `{generationId, weakQuestions}`가 필요합니다.

### 생성물 CRUD
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | 퀴즈 응답 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | 빈칸 답안 제출 `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | 구두 답변 검증 (오디오 + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | TTS 음성 재생 (노트/플래시카드) |
| `PUT` | `/api/projects/:pid/generations/:gid` | 이름 변경 `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | 생성물 삭제 |

### 채팅
| 메서드 | 엔드포인트 | 설명 |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | 채팅 히스토리 가져오기 |
| `POST` | `/api/projects/:pid/chat` | 메시지 전송 `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | 채팅 히스토리 삭제 |

---

## 아키텍처 결정

| 결정 | 근거 |
|---|---|
| **Alpine.js (React/Vue 대신)** | 작은 용량, Vite로 컴파일된 TypeScript를 통한 가벼운 반응성. 속도가 중요한 해커톤에 적합합니다. |
| **JSON 파일로 영속성 유지** | 의존성 없음, 즉시 시작 가능. 데이터베이스 설정이 필요 없어 바로 시작할 수 있습니다. | |
| **Vite + Handlebars** | 최고의 조합: 개발을 위한 빠른 HMR, 코드 정리를 위한 HTML 파셜, Tailwind JIT. |
| **중앙화된 프롬프트** | 모든 AI 프롬프트가 `prompts.ts`에 — 언어/연령대별로 반복, 테스트 및 조정하기 쉬움. |
| **다중 생성 시스템** | 각 생성은 고유 ID를 가진 독립 객체 — 코스당 여러 학습지, 퀴즈 등을 허용. |
| **연령별 맞춤 프롬프트** | 어휘, 복잡성 및 어조가 다른 4개 연령대 그룹 — 동일한 콘텐츠가 학습자에 따라 다르게 가르침. |
| **에이전트 기반 기능** | 이미지 생성과 웹 검색은 임시 Mistral 에이전트를 사용 — 자동 정리되는 독립 수명 주기. |
| **다중 제공 TTS** | 기본값은 Mistral Voxtral TTS(추가 키 불필요), 대안은 ElevenLabs — 재시작 없이 구성 가능. |

---

## 공로 및 감사

- **[Mistral AI](https://mistral.ai)** — AI 모델들 (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — 대체 음성 합성 엔진 (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — 경량 리액티브 프레임워크
- **[TailwindCSS](https://tailwindcss.com)** — 유틸리티 기반 CSS 프레임워크
- **[Vite](https://vitejs.dev)** — 프론트엔드 빌드 도구
- **[Lucide](https://lucide.dev)** — 아이콘 라이브러리
- **[Marked](https://marked.js.org)** — Markdown 파서

Mistral AI Worldwide Hackathon(2026년 3월) 기간 중 시작되었으며, Claude Code 및 Codex와 함께 AI로 전적으로 개발되었습니다.

---

## 저자

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## 라이선스

[AGPL-3.0](LICENSE) — 저작권 (C) 2026 Julien LS

**이 문서는 gpt-5-mini 모델을 사용하여 프랑스어 버전에서 한국어로 번역되었습니다. 번역 과정에 대한 자세한 정보는 https://gitlab.com/jls42/ai-powered-markdown-translator 에서 확인하세요.**

