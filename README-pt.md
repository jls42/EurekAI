<p align="center">
  <img src="public/assets/logo.webp" alt="Logótipo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforme qualquer conteúdo numa experiência de aprendizagem interativa — com tecnologia da <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 Inglês</a> · <a href="README-es.md">🇪🇸 Espanhol</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Alemão</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Neerlandês</a> · <a href="README-ar.md">🇸🇦 Árabe</a><br>
  <a href="README-hi.md">🇮🇳 Híndi</a> · <a href="README-zh.md">🇨🇳 Chinês</a> · <a href="README-ja.md">🇯🇵 Japonês</a> · <a href="README-ko.md">🇰🇷 Coreano</a> · <a href="README-pl.md">🇵🇱 Polonês</a> · <a href="README-ro.md">🇷🇴 Romeno</a> · <a href="README-sv.md">🇸🇪 Sueco</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstração no YouTube"></a>
</p>

<h4 align="center">📊 Qualidade do código</h4>

<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=alert_status" alt="Porta de qualidade"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=security_rating" alt="Classificação de segurança"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=reliability_rating" alt="Classificação de fiabilidade"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=sqale_rating" alt="Classificação de manutenibilidade"></a>
</p>
<p align="center">
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=coverage" alt="Cobertura"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=vulnerabilities" alt="Vulnerabilidades"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=code_smells" alt="Code Smells"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=jls42_EurekAI"><img src="https://sonarcloud.io/api/project_badges/measure?project=jls42_EurekAI&metric=ncloc" alt="Linhas de código"></a>
</p>
<p align="center">
  <a href="https://app.codacy.com/gh/jls42/EurekAI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://app.codacy.com/project/badge/Grade/e4e3a71712194157a90c2335f84ba7e4" alt="Badge Codacy"></a>
  <a href="https://www.codefactor.io/repository/github/jls42/eurekai"><img src="https://www.codefactor.io/repository/github/jls42/eurekai/badge" alt="CodeFactor"></a>
</p>

---

## A história — Por que EurekAI?

**EurekAI** nasceu durante o [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (março de 2026). Eu precisava de um tema — e a ideia veio de algo muito concreto: preparo regularmente os testes com a minha filha, e pensei que devia ser possível tornar isso mais divertido e interativo com a ajuda da IA.

O objetivo: pegar em **qualquer entrada** — uma foto da lição, um texto copiado e colado, uma gravação de voz, uma pesquisa na web — e transformá-la em **fichas de revisão, flashcards, quizzes, podcasts, textos com lacunas, ilustrações e muito mais**. Tudo alimentado pelos modelos franceses da Mistral AI, o que faz dela uma solução naturalmente adaptada a estudantes francófonos.

O [protótipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) foi concebido em 48h durante o hackathon como prova de conceito em torno dos serviços da Mistral — já funcional, mas limitado. Desde então, o EurekAI tornou-se um verdadeiro projeto: textos com lacunas, navegação entre exercícios, scraping da web, moderação parental configurável, revisão de código aprofundada e muito mais. Todo o código é gerado por IA — principalmente [Claude Code](https://code.claude.com/), com algumas contribuições via [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 📷 | **Importação de ficheiros** | Importe as suas lições — foto, PDF (via Mistral OCR com pontuação de confiança média, níveis `high`/`medium`/`low`) ou ficheiro de texto (TXT, MD). Sessões de upload com retry por ficheiro e progresso individual |
| 📝 | **Entrada de texto** | Escreva ou cole qualquer texto diretamente |
| 🎤 | **Entrada de voz** | Grave-se — o Voxtral STT transcreve a sua voz |
| 🌐 | **Web / URL** | Cole uma URL (scraping direto via Readability + Lightpanda) ou escreva uma pesquisa (Agent Mistral web_search) |
| 📄 | **Fichas de revisão** | Notas estruturadas com pontos-chave, vocabulário, citações, anedotas |
| 🃏 | **Flashcards** | Cartas Q/R interativas, leitura de áudio dialogada |
| ❓ | **Quiz de escolha múltipla** | Perguntas de escolha múltipla com revisão adaptativa dos erros (número configurável) |
| ✏️ | **Textos com lacunas** | Exercícios para completar com pistas e validação tolerante |
| 🎙️ | **Podcast** | Mini-podcast a 2 vozes em áudio — voz Mistral por defeito ou vozes personalizadas (pais!) |
| 🖼️ | **Ilustrações** | Imagens educativas geradas por um Agent Mistral |
| 🗣️ | **Quiz de voz** | Perguntas lidas em voz alta (voz personalizada possível), resposta oral, verificação por IA |
| 💬 | **Tutor de IA** | Chat contextual com os seus documentos de aula, com chamada de ferramentas |
| 🧠 | **Router automático** | Um router baseado em `mistral-small-latest` analisa o conteúdo e propõe uma combinação de geradores entre os 7 tipos disponíveis |
| 🔒 | **Controlo parental** | Moderação configurável por perfil (categorias personalizáveis), PIN parental, restrições do chat |
| 🌍 | **Multilingue** | Interface disponível em 9 idiomas; geração por IA controlável em 15 idiomas via os prompts |
| 🔊 | **Leitura em voz alta** | Ouça as fichas e flashcards (diálogo pergunta/resposta) via Mistral Voxtral TTS |
| 💶 | **Monitorização dos custos da API** | Estimativa transparente do custo € de cada geração e fonte (tokens / caracteres / páginas / segundos de áudio). Badge por cartão + total por projeto, visível no dashboard |
| 🎨 | **Tema por perfil** | Cada perfil escolhe o seu tema `dark` ou `light` — persiste quando muda de perfil |

---

## Visão geral da arquitetura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Visão geral da arquitetura" width="800" />
</p>

---

## Mapa de utilização dos modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapeamento de tarefas para modelos de IA" width="800" />
</p>

---

## Percurso do utilizador

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Percurso de aprendizagem do estudante" width="800" />
</p>

---

## Mergulho aprofundado — Funcionalidades

### Entrada multimodal

EurekAI aceita 4 tipos de fontes, moderadas de acordo com o perfil (ativado por defeito para criança e adolescente) :

- **Importação de ficheiros** — Ficheiros JPG, PNG ou PDF processados por OCR Mistral — **OCR 3 (`mistral-ocr-2512`) por defeito**, **OCR 4 (`mistral-ocr-4-0`) opcional** em Definições (melhor qualidade, mas 2× o custo) — para texto impresso, tabelas e escrita manual; ou ficheiros de texto (TXT, MD) importados diretamente. Os uploads de vários ficheiros usam um sistema de **sessões de upload**: progresso individual por ficheiro, retry do ficheiro com falha sem reenviar os outros, dismissal da sessão quando termina. O OCR expõe uma **pontuação de confiança** média (`average`, limitada em `[0,1]`, calculada a partir de `averagePageConfidenceScore` devolvidos pela Mistral), mostrada na UI como badge de nível `high` / `medium` / `low` (limiares ~0.9 / ~0.7) — avisa sem bloquear se o scan tiver má qualidade.
- **Texto livre** — Escreva ou cole qualquer conteúdo. Moderado antes do armazenamento se a moderação estiver ativa.
- **Entrada de voz** — Grave áudio no navegador. Transcrito por `voxtral-mini-latest`. O parâmetro `language="fr"` otimiza o reconhecimento.
- **Web / URL** — Cole uma ou várias URLs para fazer scraping do conteúdo diretamente (Readability + Lightpanda para páginas JS), ou escreva palavras-chave para uma pesquisa na web via Agent Mistral. O campo único aceita ambos — URLs e palavras-chave são separados automaticamente, e cada resultado cria uma fonte independente.

### Geração de conteúdo por IA

Sete tipos de material de aprendizagem gerado:

| Gerador | Modelo | Saída |
|---|---|---|
| **Ficha de revisão** | `mistral-large-latest` | Título, resumo, pontos-chave, vocabulário, citações, anedota |
| **Flashcards** | `mistral-large-latest` | Cartas Q/R com referências às fontes (número configurável) |
| **Quiz de escolha múltipla** | `mistral-large-latest` | Perguntas de escolha múltipla, explicações, revisão adaptativa (número configurável) |
| **Textos com lacunas** | `mistral-large-latest` | Frases para completar com pistas, validação tolerante (Levenshtein) |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Roteiro a 2 vozes → áudio MP3 |
| **Ilustração** | Agent `mistral-large-latest` | Imagem educativa via a ferramenta `image_generation` |
| **Quiz de voz** | `mistral-large-latest` + Voxtral TTS + STT | Perguntas TTS → resposta STT → verificação por IA |

### Tutor de IA por chat

Um tutor conversacional com acesso completo aos documentos de aula:

- Utiliza `mistral-large-latest`
- **Chamada de ferramentas** : pode gerar fichas, flashcards, quizzes ou textos com lacunas durante a conversa
- Histórico de 50 mensagens por aula
- Moderação de conteúdo se estiver ativada para o perfil

### Router automático

O router usa `mistral-small-latest` para analisar o conteúdo das fontes e propor os geradores mais relevantes entre os 7 disponíveis. A interface mostra o progresso em tempo real: primeiro uma fase de análise, depois as gerações individuais com possibilidade de cancelamento.

### Aprendizagem adaptativa

- **Estatísticas dos quizzes** : acompanhamento das tentativas e da precisão por pergunta
- **Revisão de quiz** : gera 5-10 novas perguntas focadas nos conceitos fracos
- **Deteção de instruções** : deteta instruções de revisão ("Eu sei a minha lição se eu sei...") e prioriza-as nos geradores textuais compatíveis (ficha, flashcards, quiz, textos com lacunas)

### Segurança e controlo parental

- **4 grupos etários** : criança (≤10 anos), adolescente (11-15), estudante (16-25), adulto (26+)
- **Moderação de conteúdo** : `mistral-moderation-latest` com 10 categorias disponíveis, 5 bloqueadas por defeito para criança/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorias personalizáveis por perfil nas definições.
- **PIN parental** : hash SHA-256, obrigatório para perfis com menos de 15 anos. Para uma implementação em produção, prever um hash lento com sal (Argon2id, bcrypt).
- **Restrições do chat** : chat de IA desativado por defeito para menores de 16 anos, ativável pelos pais

### Sistema multi-perfil

- Vários perfis com nome, idade, avatar, preferências de idioma
- **Voz por perfil** (`Profile.mistralVoices?: { host, guest }`) — cada criança pode ter o seu par de vozes para podcast/quiz de voz
- **Tema por perfil** (`Profile.theme: 'dark' | 'light'`) — alternância automática quando muda de perfil, persistida no backend
- Projetos associados aos perfis via `profileId`
- Eliminação em cascata: ao eliminar um perfil, elimina-se todos os seus projetos

### Monitorização dos custos da API

Cada chamada Mistral (chat, OCR, STT, TTS, moderação, agentes) é instrumentada para fornecer uma estimativa € **transparente** ao utilizador — sem surpresas na faturação.

- **Fonte de verdade** : `helpers/pricing.ts` — `MODEL_PRICING` por prefixo de modelo (ex: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` com URLs da documentação Mistral para re-scraping periódico
- **Unidades suportadas** : `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversão conduzida por `helpers/cost-calc.ts`
- **Cadeia de instrumentação** : `helpers/tracked-client.ts` (wrap client Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injeção na resposta HTTP)
- **UI** : badge de custo por geração (`src/partials/cost-badge-gen.html`), por fonte (`cost-badge-src.html`), total acumulado no dashboard (`Project.totalCost`)
- **Endpoints** : as respostas `/generate/*` e `/sources/*` decoram o objeto devolvido (Generation / Source) com `estimatedCost`, `usage` e `costBreakdown`. `POST /generate/auto/route` adiciona um campo `costDelta: number` para o custo apenas do routing. `GET /projects/:pid` devolve o projeto enriquecido com `totalCost` (soma calculada a partir de `costLog[]`) + o histórico completo

### TTS multi-provider e vozes personalizadas

- **Mistral Voxtral TTS** : `voxtral-mini-tts-latest`, síntese vocal 100% Mistral, sem necessidade de chave adicional
- **Vozes personalizadas** : os pais podem criar as suas próprias vozes via a API Mistral Voices (a partir de uma amostra de áudio) e atribuí-las aos papéis de anfitrião/convidado — os podcasts e quizzes de voz são então lidos com a voz de um dos pais, tornando a experiência ainda mais imersiva para a criança
- Dois papéis vocais configuráveis: **anfitrião** (narrador principal) e **convidado** (segunda voz do podcast)
- Catálogo completo das vozes Mistral disponível nas definições, filtrável por idioma

### Internacionalização

- Interface disponível em 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Prompts de IA suportam 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Idioma configurável por perfil

---

## Stack técnica

| Camada | Tecnologia | Função |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Servidor e segurança de tipos |
| **Backend** | Express 5.x | API REST |
| **Servidor de desenvolvimento** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interface reativa, TypeScript compilado pelo Vite |
| **Templating** | vite-plugin-handlebars | Composição HTML por partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agents, Moderação |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntese vocal integrada |
| **Ícones** | Lucide 1.x | Biblioteca de ícones SVG |
| **Scraping web** | Readability + linkedom | Extração do conteúdo principal das páginas web (tecnologia Firefox Reader View) |
| **Browser headless** | Lightpanda | Navegador headless ultra-leve (Zig + V8) para páginas JS/SPA — fallback de scraping |
| **Markdown** | Marked | Renderização markdown no chat |
| **Upload de ficheiros** | Multer 2.x | Gestão de formulários multipart |
| **Áudio** | ffmpeg-static | Concatenação de segmentos de áudio |
| **Testes** | Vitest | Testes unitários — cobertura medida pelo SonarCloud |
| **Persistência** | Ficheiros JSON | Armazenamento sem dependências |

---

## Referência dos modelos

| Modelo | Utilização | Porquê |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos com lacunas, Chat, Verificação de quiz de voz, Agent de Imagem, Agent Web Search, Deteção de instruções | Melhor suporte multilingue + seguimento de instruções |
| `mistral-ocr-2512` (OCR 3, padrão) | OCR de documentos | Texto impresso, tabelas, escrita manual ($2 / 1000 páginas) |
| `mistral-ocr-4-0` (OCR 4, opcional) | OCR de documentos — qualidade superior | Selecionável nas Definições, 2× o custo ($4 / 1000 páginas) |
| `voxtral-mini-latest` | Reconhecimento vocal (STT) | STT multilingue, otimizado com `language="fr"` |
| `voxtral-mini-tts-latest` | Síntese vocal (TTS) | Podcasts, quiz de voz, leitura em voz alta |
| `mistral-moderation-latest` | Moderação de conteúdo | 5 categorias bloqueadas para criança/adolescente (+ jailbreaking) |
| `mistral-small-latest` | Router automático | Análise rápida do conteúdo para decisões de routing |

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
#   MISTRAL_API_KEY=<your_api_key>           (requis)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Nota** : Mistral Voxtral TTS é o único fornecedor TTS — não é necessária nenhuma chave adicional além de `MISTRAL_API_KEY`.

### Variáveis de ambiente

| Variável | Obrigatório | Predefinição | Função |
|---|---|---|---|
| `MISTRAL_API_KEY` | ✅ | — | Chave API Mistral (chat, OCR, STT, TTS Voxtral, agents, moderação) |
| `PORT` | opcional | `3000` | Porta HTTP do backend Express |
| `NODE_ENV` | opcional | `development` | Se `production` → o Express serve o frontend a partir de `dist/` (caso contrário `public/`) |
| `SONAR_TOKEN` | opcional CI | — | Utilizado apenas pelo workflow GitHub Actions SonarCloud |

### Testes, qualidade de código e contribuição

```bash
npm test                # vitest (déclenche pretest : lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooks Git (Husky)** : `pre-commit` executa `npm test`, `pre-push` executa `npm run security`. Ambos bloqueiam o commit/push em caso de falha.

**Ferramentas externas necessárias (opcionais mas usadas por `pretest` / `npm run security`)** :

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Sem estas ferramentas, `npm test` falha em `pretest` (lizard ausente) e `npm run security` falha (opengrep ausente). Os hooks husky bloqueiam então o commit/push.

---

## Implementação com contentor

A imagem é publicada no **GitHub Container Registry** :

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

> **`:U`** é um flag do Podman rootless que ajusta automaticamente as permissões do volume.

```bash
# Build local
podman build -t eurekai -f Containerfile .

# Publier sur ghcr.io (mainteneurs)
./scripts/publish-ghcr.sh
```

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
  auto-agents.ts          — Source unique de vérité : AUTO_AGENTS_SET (7 agents) + MAX_AUTO_PLAN_LENGTH
  ocr.ts                  — OCR via Mistral (JPG, PNG, PDF) avec extraction interne des scores de confiance moyens par page
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
  tts-provider.ts         — TTS Mistral Voxtral (synthèse vocale + listing des voix)
  tts.ts                  — Génération audio multi-voix (podcast + flashcards, concaténation de segments)
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
  # IO & parsing
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
  logger.ts               — Logger structuré (niveaux, contexte JSON)

  # Génération & UX
  auto-title.ts           — autoTitle(type, data, lang) : préfixe auto pour carte liste (Fiche, Note, Quiz, etc.)
  choice-labels.ts        — Labels localisés des choix (quiz, quiz-vocal) — 9 langues
  diversity.ts            — Diversité des générations (exclusion du contenu déjà produit, `diversityParams` : temperature/presencePenalty/randomSeed)
  fill-blank-validate.ts  — Validation tolérante des réponses (normalisation, Levenshtein)

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

public/assets/            — Ressources statiques (logo, avatars, schémas architecture)
docs/                     — Notes internes (inventaire prompts, audits)
scripts/                  — Tooling : check-deps, check-security, check-complexity, install-opengrep, translate-readme, publish-ghcr, update-pricing
output/                   — Données d'exécution (projets, config, fichiers audio) ; en mode prod (`NODE_ENV=production`), Express sert le frontend depuis `dist/` au lieu de `public/`
```

> **Para os colaboradores de IA**: consulte [`CLAUDE.md`](CLAUDE.md) para o contexto arquitetural detalhado, as regras obrigatórias (anti-leak prompts, códigos de erro, rastreamento de custos) e as armadilhas conhecidas (Lizard CCN, Opengrep, migração Codacy/Semgrep).

---

## Referência da API

### Config
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/config` | Configuração atual |
| `PUT` | `/api/config` | Modificar a config (modelos, voz, modelo TTS) |
| `GET` | `/api/config/status` | Status das APIs: `mistral` (chave Mistral definida), `ttsAvailable` (alias de `mistral`, Mistral Voxtral é o único provedor TTS) |
| `POST` | `/api/config/reset` | Redefinir a config padrão |
| `GET` | `/api/config/voices` | Listar as vozes Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorias de moderação disponíveis + padrões por idade |

### Perfis
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/profiles` | Listar todos os perfis |
| `POST` | `/api/profiles` | Criar um perfil |
| `PUT` | `/api/profiles/:id` | Modificar um perfil (PIN necessário para < 15 anos) |
| `DELETE` | `/api/profiles/:id` | Excluir um perfil + cascata de projetos `{pin?}` → `{ok, deletedProjects}` |

### Projetos
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects` | Listar os projetos (`?profileId=` opcional) |
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
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL ou busca na web `{query}` — retorna uma matriz de fontes |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Excluir uma fonte |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar as instruções de revisão |

### Geração
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de revisão |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos com lacunas |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustração |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz de voz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revisão adaptativa `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/route` | Análise de roteamento (plano dos geradores a serem executados) — retorna `{plan, costDelta}` (custo apenas do roteamento) |
| `POST` | `/api/projects/:pid/generate/auto` | Geração automática do backend (roteamento + 7 tipos: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image). Execução em paralelo — pressupõe um tier Mistral com rate-limit ≥ 7 requisições simultâneas; caso contrário, vários 429 podem retornar em `failedSteps`. |

Todas as rotas de geração aceitam `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` exige além disso `{generationId, weakQuestions}`.

### CRUD de Gerações
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

## Decisões arquiteturais

| Decisão | Justificativa |
|---|---|
| **Alpine.js em vez de React/Vue** | Pegada mínima, reatividade leve com TypeScript compilado pelo Vite. Perfeito para um hackathon onde a velocidade conta. |
| **Persistência em arquivos JSON** | Zero dependência, inicialização instantânea. Nenhuma base de dados para configurar — basta iniciar e pronto. |
| **Vite + Handlebars** | O melhor dos dois mundos: HMR rápido para desenvolvimento, partials HTML para organização do código, Tailwind JIT. |
| **Prompts centralizados** | Todos os prompts de IA em `prompts.ts` — fácil de iterar, testar e adaptar por idioma/faixa etária. |
| **Sistema multi-gerações** | Cada geração é um objeto independente com seu próprio ID — permite várias fichas, quizzes etc. por curso. |
| **Prompts adaptados por idade** | 4 grupos etários com vocabulário, complexidade e tom diferentes — o mesmo conteúdo ensina de forma diferente conforme o aprendiz. |
| **Funcionalidades baseadas em Agents** | A geração de imagens e a busca na web usam Agents Mistral temporários — ciclo de vida próprio com limpeza automática. |
| **Scraping inteligente de URL** | Um campo único aceita URLs e palavras-chave misturados — as URLs são escrapeadas via Readability (páginas estáticas) com fallback Lightpanda (páginas JS/SPA), as palavras-chave acionam um Agent Mistral web_search. Cada resultado cria uma fonte independente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (sem chave adicional além de `MISTRAL_API_KEY`) — síntese de voz integrada à cadeia de custo e à resolução de voz por idioma. |

---

## Créditos e agradecimentos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reativo leve
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitário
- **[Vite](https://vitejs.dev)** — Ferramenta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de ícones
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extração de conteúdo web (tecnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultraleve para scraping de páginas JS/SPA

Iniciado durante o Mistral AI Worldwide Hackathon (março de 2026), desenvolvido integralmente por IA com [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licença

[AGPL-3.0](LICENSE) — Direitos autorais (C) 2026 Julien LS

**Artigo traduzido do fr para o pt com gpt-5.4-mini.**
