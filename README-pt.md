<p align="center">
  <img src="public/assets/logo.webp" alt="Logotipo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforme qualquer conteúdo em uma experiência de aprendizagem interativa — impulsionada por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Inglês</a> · <a href="README-es.md">🇪🇸 Espanhol</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Alemão</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Neerlandês</a> · <a href="README-ar.md">🇸🇦 Árabe</a><br>
  <a href="README-hi.md">🇮🇳 Hindi</a> · <a href="README-zh.md">🇨🇳 Chinês</a> · <a href="README-ja.md">🇯🇵 Japonês</a> · <a href="README-ko.md">🇰🇷 Coreano</a> · <a href="README-pl.md">🇵🇱 Polonês</a> · <a href="README-ro.md">🇷🇴 Romeno</a> · <a href="README-sv.md">🇸🇪 Sueco</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstração YouTube"></a>
</p>

<h4 align="center">📊 Qualidade do código</h4>

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

## A história — Por que EurekAI?

**EurekAI** nasceu durante o [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (março de 2026). Eu precisava de um tema — e a ideia veio de algo muito concreto: eu preparo regularmente as provas com minha filha, e pensei que deveria ser possível tornar isso mais lúdico e interativo graças à IA.

O objetivo: pegar **qualquer entrada** — uma foto da lição, um texto copiado/colado, uma gravação de voz, uma pesquisa na web — e transformá-la em **fichas de revisão, flashcards, quizzes, podcasts, textos com lacunas, ilustrações e muito mais**. Tudo impulsionado pelos modelos franceses da Mistral AI, tornando a solução naturalmente adequada para alunos francófonos.

O [protótipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) foi concebido em 48h durante o hackathon como prova de conceito em torno dos serviços da Mistral — já funcional, mas limitado. Desde então, EurekAI tornou-se um projeto real: textos com lacunas, navegação nos exercícios, scraping web, moderação parental configurável, revisão de código aprofundada e muito mais. Todo o código foi gerado por IA — principalmente via [Claude Code](https://code.claude.com/), com algumas contribuições via [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 📷 | **Importar arquivos** | Importe suas lições — foto, PDF (via Mistral OCR) ou arquivo de texto (TXT, MD) |
| 📝 | **Entrada de texto** | Digite ou cole qualquer texto diretamente |
| 🎤 | **Entrada de voz** | Grave-se — Voxtral STT transcreve sua voz |
| 🌐 | **Web / URL** | Cole uma URL (scraping direto via Readability + Lightpanda) ou digite uma pesquisa (Agent Mistral web_search) |
| 📄 | **Fichas de revisão** | Notas estruturadas com pontos-chave, vocabulário, citações, anedotas |
| 🃏 | **Flashcards** | Cartões Q/R com referências às fontes para memorização ativa (quantidade configurável) |
| ❓ | **Quiz de múltipla escolha** | Perguntas de escolha múltipla com revisão adaptativa de erros (quantidade configurável) |
| ✏️ | **Textos com lacunas** | Exercícios para completar com pistas e validação tolerante |
| 🎙️ | **Podcast** | Mini-podcast com 2 vozes em áudio — voz Mistral por padrão ou vozes personalizadas (pais!) |
| 🖼️ | **Ilustrações** | Imagens educativas geradas por um Agent Mistral |
| 🗣️ | **Quiz vocal** | Perguntas lidas em voz alta (voz customizável possível), resposta oral, verificação por IA |
| 💬 | **Tutor IA** | Chat contextual com seus documentos de curso, com chamada de ferramentas |
| 🧠 | **Roteador automático** | Um roteador baseado em `mistral-small-latest` analisa o conteúdo e propõe uma combinação de geradores entre os 7 tipos disponíveis |
| 🔒 | **Controle parental** | Moderação configurável por perfil (categorias personalizáveis), PIN parental, restrições do chat |
| 🌍 | **Multilíngue** | Interface disponível em 9 idiomas; geração IA controlável em 15 idiomas via prompts |
| 🔊 | **Leitura em voz alta** | Ouça as fichas e flashcards via Mistral Voxtral TTS ou ElevenLabs |

---

## Visão geral da arquitetura

```mermaid
graph TD
    subgraph "📥 Sources d'entrée"
        OCR["📷 Import fichiers<br/><i>OCR / texte brut</i>"]
        TXT["📝 Saisie texte"]
        MIC["🎤 Voix STT<br/><i>voxtral-mini-latest</i>"]
        WEB["🌐 Web / URL<br/><i>Readability + Lightpanda<br/>ou Agent Mistral</i>"]
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

## Mapa de uso dos modelos

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
        T7["Web / URL — Scraping direct ou Agent web_search"]
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

## Jornada do usuário

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

## Mergulho em profundidade — Funcionalidades

### Entrada multimodal

EurekAI aceita 4 tipos de fontes, moderadas conforme o perfil (ativado por padrão para criança e adolescente):

- **Importar arquivos** — Arquivos JPG, PNG ou PDF processados por `mistral-ocr-latest` (texto impresso, tabelas, escrita manual), ou arquivos de texto (TXT, MD) importados diretamente.
- **Texto livre** — Digite ou cole qualquer conteúdo. Moderado antes do armazenamento se a moderação estiver ativa.
- **Entrada de voz** — Grave áudio no navegador. Transcrito por `voxtral-mini-latest`. O parâmetro `language="fr"` otimiza o reconhecimento.
- **Web / URL** — Cole uma ou várias URLs para fazer scraping do conteúdo diretamente (Readability + Lightpanda para páginas JS), ou digite palavras-chave para uma pesquisa web via Agent Mistral. O campo único aceita ambos — URLs e palavras-chave são separadas automaticamente, cada resultado cria uma fonte independente.

### Geração de conteúdo por IA

Sete tipos de material de aprendizagem gerado:

| Gerador | Modelo | Saída |
|---|---|---|
| **Ficha de revisão** | `mistral-large-latest` | Título, resumo, pontos-chave, vocabulário, citações, anedota |
| **Flashcards** | `mistral-large-latest` | Cartões Q/R com referências às fontes (quantidade configurável) |
| **Quiz de múltipla escolha** | `mistral-large-latest` | Perguntas de escolha múltipla, explicações, revisão adaptativa (quantidade configurável) |
| **Textos com lacunas** | `mistral-large-latest` | Frases para completar com pistas, validação tolerante (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Roteiro 2 vozes → áudio MP3 |
| **Ilustração** | Agent `mistral-large-latest` | Imagem educativa via a ferramenta `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Perguntas TTS → resposta STT → verificação por IA |

### Tutor IA por chat

Um tutor conversacional com acesso completo aos documentos do curso:

- Utiliza `mistral-large-latest`
- **Chamada de ferramentas**: pode gerar fichas, flashcards, quizzes ou textos com lacunas durante a conversa
- Histórico de 50 mensagens por curso
- Moderação de conteúdo se ativada para o perfil

### Roteador automático

O roteador usa `mistral-small-latest` para analisar o conteúdo das fontes e propor os geradores mais pertinentes entre os 7 disponíveis. A interface mostra o progresso em tempo real: primeiro uma fase de análise, depois as gerações individuais com possibilidade de cancelamento.

### Aprendizagem adaptativa

- **Estatísticas de quiz**: acompanhamento das tentativas e da precisão por pergunta
- **Revisão de quiz**: gera 5-10 novas perguntas direcionadas aos conceitos fracos
- **Detecção de instrução**: detecta instruções de revisão ("Se eu sei minha lição se eu sei...") e as prioriza nos geradores textuais compatíveis (ficha, flashcards, quiz, textos com lacunas)

### Segurança & controle parental

- **4 faixas etárias**: criança (≤10 anos), adolescente (11-15), estudante (16-25), adulto (26+)
- **Moderação de conteúdo**: `mistral-moderation-latest` com 10 categorias disponíveis, 5 bloqueadas por padrão para criança/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorias personalizáveis por perfil nas configurações.
- **PIN parental**: hash SHA-256, exigido para perfis com menos de 15 anos. Para um deployment em produção, prever um hash lento com salt (Argon2id, bcrypt).
- **Restrições do chat**: chat IA desativado por padrão para menores de 16 anos, ativável pelos pais

### Sistema multi-perfis

- Múltiplos perfis com nome, idade, avatar, preferências de idioma
- Projetos vinculados aos perfis via `profileId`
- Exclusão em cascata: excluir um perfil exclui todos os seus projetos

### TTS multi-provider & vozes personalizadas

- **Mistral Voxtral TTS** (padrão): `voxtral-mini-tts-latest`, sem chave adicional necessária
- **ElevenLabs** (alternativo): `eleven_v3`, vozes naturais, requer `ELEVENLABS_API_KEY`
- Provider configurável nas configurações da aplicação
- **Vozes personalizadas**: os pais podem criar suas próprias vozes via a API Mistral Voices (a partir de uma amostra de áudio) e atribuí-las aos papéis host/convidado — os podcasts e quizzes vocais então são reproduzidos com a voz de um dos pais, tornando a experiência ainda mais imersiva para a criança
- Dois papéis vocais configuráveis: **host** (narrador principal) e **convidado** (segunda voz do podcast)
- Catálogo completo de vozes Mistral disponível nas configurações, filtrável por idioma

### Internacionalização

- Interface disponível em 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Prompts IA suportam 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Idioma configurável por perfil

---

## Stack técnico

| Camada | Tecnologia | Papel |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Servidor e segurança de tipos |
| **Backend** | Express 5.x | API REST |
| **Servidor de dev** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interface reativa, TypeScript compilado pelo Vite |
| **Templating** | vite-plugin-handlebars | Composição HTML por partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderação |
| **TTS (padrão)** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntese vocal integrada |
| **TTS (alternativo)** | ElevenLabs SDK 2.x | `eleven_v3`, vozes naturais |
| **Ícones** | Lucide 1.x | Biblioteca de ícones SVG |
| **Scraping web** | Readability + linkedom | Extração do conteúdo principal das páginas web (tecnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Navegador headless ultraleve (Zig + V8) para páginas JS/SPA — fallback scraping |
| **Markdown** | Marked | Renderização de markdown no chat |
| **Upload de arquivos** | Multer 2.x | Gestão de formulários multipart |
| **Áudio** | ffmpeg-static | Concatenação de segmentos de áudio |
| **Tests** | Vitest | Testes unitários — cobertura medida por SonarCloud |
| **Persistência** | Arquivos JSON | Armazenamento sem dependência |

---

## Referência dos modelos

| Modelo | Uso | Por quê |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos com lacunas, Chat, Verificação de quiz vocal, Agent Image, Agent Web Search, Detecção de instrução | Melhor multilingual + seguimento de instruções |
| `mistral-ocr-latest` | OCR de documentos | Texto impresso, tabelas, escrita manual |
| `voxtral-mini-latest` | Reconhecimento de voz (STT) | STT multilíngue, otimizado com `language="fr"` |
| `voxtral-mini-tts-latest` | Síntese vocal (TTS) | Podcasts, quiz vocal, leitura em voz alta |
| `mistral-moderation-latest` | Moderação de conteúdo | 5 categorias bloqueadas para criança/adolescente (+ jailbreaking) |
| `mistral-small-latest` | Roteador automático | Análise rápida do conteúdo para decisões de roteamento |
| `eleven_v3` (ElevenLabs) | Síntese vocal (TTS alternativo) | Vozes naturais, alternativa configurável |

---

## Início rápido

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

> **Nota** : Mistral Voxtral TTS é o provider padrão — nenhuma chave adicional necessária além de `MISTRAL_API_KEY`. ElevenLabs é um provider TTS alternativo configurável nas configurações.

---

## Estrutura do projeto

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

## Referência da API

### Config
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/config` | Configuração atual |
| `PUT` | `/api/config` | Modificar a config (modelos, vozes, provider TTS) |
| `GET` | `/api/config/status` | Status das APIs (Mistral, ElevenLabs, TTS) |
| `POST` | `/api/config/reset` | Resetar a config para padrão |
| `GET` | `/api/config/voices` | Listar vozes Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorias de moderação disponíveis + padrões por idade |

### Perfis
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/profiles` | Listar todos os perfis |
| `POST` | `/api/profiles` | Criar um perfil |
| `PUT` | `/api/profiles/:id` | Modificar um perfil (PIN exigido para < 15 anos) |
| `DELETE` | `/api/profiles/:id` | Excluir um perfil + cascade projetos `{pin?}` → `{ok, deletedProjects}` |

### Projetos
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects` | Listar projetos (`?profileId=` opcional) |
| `POST` | `/api/projects` | Criar um projeto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalhes do projeto |
| `PUT` | `/api/projects/:pid` | Renomear `{name}` |
| `DELETE` | `/api/projects/:pid` | Excluir o projeto |

### Fontes
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importar arquivos multipart (OCR para JPG/PNG/PDF, leitura direta para TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Texto livre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voz STT (áudio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL ou pesquisa web `{query}` — retorna um array de fontes |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Excluir uma fonte |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar instruções de revisão | ### Geração
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de revisão |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos com lacunas |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustração |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revisão adaptativa `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Análise de roteamento (plano dos geradores a executar) |
| `POST` | `/api/projects/:pid/generate/auto` | Geração automática backend (roteamento + 5 tipos: resumo, flashcards, quiz, preencher-lacunas, podcast) |

Todas as rotas de geração aceitam `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` exige, além disso, `{generationId, weakQuestions}`.

### CRUD Gerações
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar as respostas do quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar as respostas dos textos com lacunas `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar uma resposta oral (áudio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Leitura TTS em voz alta (fichas/flashcards) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Renomear `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Excluir a geração |

### Chat
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperar o histórico do chat |
| `POST` | `/api/projects/:pid/chat` | Enviar uma mensagem `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Apagar o histórico do chat |

---

## Decisões arquitetônicas

| Decisão | Justificação |
|---|---|
| **Alpine.js em vez de React/Vue** | Pegada mínima, reatividade leve com TypeScript compilado pelo Vite. Perfeito para um hackathon onde a velocidade importa. |
| **Persistência em arquivos JSON** | Zero dependências, inicialização instantânea. Nenhum banco de dados para configurar — inicia-se e pronto. |
| **Vite + Handlebars** | O melhor dos dois mundos: HMR rápido para desenvolvimento, partials HTML para organização do código, Tailwind JIT. |
| **Prompts centralizados** | Todos os prompts de IA em `prompts.ts` — fácil de iterar, testar e adaptar por idioma/faixa etária. |
| **Sistema multi-gerações** | Cada geração é um objeto independente com seu próprio ID — permite várias fichas, quizzes, etc. por curso. |
| **Prompts adaptados por idade** | 4 faixas etárias com vocabulário, complexidade e tom diferentes — o mesmo conteúdo ensina de forma diferente conforme o aprendiz. |
| **Funcionalidades baseadas em Agentes** | A geração de imagens e a busca web usam Agentes Mistral temporários — ciclo de vida limpo com limpeza automática. |
| **Scraping inteligente de URLs** | Um único campo aceita URLs e palavras-chave misturadas — as URLs são raspadas via Readability (páginas estáticas) com fallback Lightpanda (páginas JS/SPA), as palavras-chave disparam um Agent Mistral web_search. Cada resultado cria uma fonte independente. |
| **TTS multi-provider** | Mistral Voxtral TTS por padrão (sem chave adicional), ElevenLabs como alternativa — configurável sem reiniciar. |

---

## Créditos & agradecimentos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[ElevenLabs](https://elevenlabs.io)** — Motor de síntese de voz alternativo (`eleven_v3`)
- **[Alpine.js](https://alpinejs.dev)** — Framework reativo leve
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitário
- **[Vite](https://vitejs.dev)** — Ferramenta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de ícones
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extração de conteúdo web (tecnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultra-leve para scraping de páginas JS/SPA

Iniciado durante o Mistral AI Worldwide Hackathon (março de 2026), desenvolvido integralmente por IA com [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licença

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Este documento foi traduzido da versão fr para a língua pt usando o modelo gpt-5-mini. Para mais informações sobre o processo de tradução, consulte https://gitlab.com/jls42/ai-powered-markdown-translator**

