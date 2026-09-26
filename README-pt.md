<p align="center">
  <img src="public/assets/logo.webp" alt="Logo EurekAI" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforme qualquer conteúdo em uma experiência de aprendizagem interativa — impulsionado por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demo YouTube"></a>
</p>

<h4 align="center">📊 Qualidade do código</h4>

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

## A história — Por que EurekAI?

**EurekAI** nasceu durante o [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (março de 2026). Eu precisava de um tema — e a ideia veio de algo muito concreto: preparo regularmente as provas com a minha filha, e pensei que deveria ser possível tornar isso mais lúdico e interativo graças à IA.

O objetivo: pegar **qualquer entrada** — uma foto da lição, um texto copiado e colado, uma gravação de voz, uma pesquisa na web — e transformá-la em **fichas de revisão, flashcards, quizzes, podcasts, textos com lacunas, ilustrações e muito mais**. Tudo impulsionado pelos modelos franceses da Mistral AI, o que o torna uma solução naturalmente adaptada a alunos falantes de francês.

O [protótipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) foi concebido em 48h durante o hackathon como prova de conceito em torno dos serviços Mistral — já funcional, mas limitado. Desde então, o EurekAI tornou-se um projeto de verdade: textos com lacunas, navegação nos exercícios, scraping web, moderação parental configurável, revisão de código aprofundada e muito mais. A totalidade do código é gerada por IA — principalmente [Claude Code](https://code.claude.com/), com algumas contribuições via [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Visão geral

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tour guiado do EurekAI: fontes, ficha, quiz, flashcards, ilustrações" width="820" />
</p>

| | |
|---|---|
| ![Painel](docs/screenshots/dashboard.webp)<br>**Painel** — gerações recentes, custo estimado por cartão e total do projeto, botão « Auto — Magia! » | ![Fontes](docs/screenshots/sources.webp)<br>**Fontes** — importação de foto/PDF/texto/voz/web, geração em um clique, detecção de enunciado |

Cada fonte importada exibe a sua [pontuação de confiança OCR, a sua moderação e o seu custo estimado](docs/screenshots/sources-list.webp).

### Os componentes em ação

| | |
|---|---|
| ![Ficha de revisão](docs/screenshots/notes.gif)<br>**Ficha de revisão** — pontos-chave, vocabulário, citações com fonte, leitura em áudio por secção | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz de múltipla escolha** — feedback imediato com explicação, navegação passo a passo |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — cartão para virar e depois autoavaliação « eu sabia / eu não sabia » | ![Textos com lacunas](docs/screenshots/fillblank.gif)<br>**Textos com lacunas** — dica a pedido, validação tolerante |
| ![Ditados](docs/screenshots/dictation.gif)<br>**Ditados** — palavra ditada em áudio, correção estrita letra a letra | ![Quiz vocal](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocal** — pergunta lida em voz alta, resposta pelo microfone |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — mini-podcast de 2 vozes, script dialogado consultável | ![Ilustrações](docs/screenshots/illustrations.gif)<br>**Ilustrações** — imagens educativas geradas por Agent |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat ancorado nos documentos do curso, respostas explicadas, pode gerar quizzes e flashcards | |

### Primeiros passos

| | |
|---|---|
| ![Escolha do perfil](docs/screenshots/login.gif)<br>**Escolha do perfil** — cada criança tem o seu espaço, o seu avatar e a sua língua | ![Criação de perfil](docs/screenshots/profile-create.gif)<br>**Criação de perfil** — idade, avatar, PIN parental para menores de 15 anos |
| ![Criação de curso](docs/screenshots/course.gif)<br>**Criação de curso** — um projeto por lição, pronto para receber fontes | ![Definições](docs/screenshots/settings.gif)<br>**Definições** — estado da API, escolha dos modelos de IA com tarifas exibidas |

---

## Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 📷 | **Importação de ficheiros** | Importe as suas lições — foto, PDF (via Mistral OCR com pontuação de confiança média, tiers `high`/`medium`/`low`) ou ficheiro de texto (TXT, MD). Sessões de upload com retry por ficheiro e progresso individual |
| 📝 | **Entrada de texto** | Digite ou cole qualquer texto diretamente |
| 🎤 | **Entrada de voz** | Grave-se — o Voxtral STT transcreve a sua voz |
| 🌐 | **Web / URL** | Cole uma URL (scraping direto via Readability + Lightpanda) ou digite uma pesquisa (Agent Mistral web_search) |
| 📄 | **Fichas de revisão** | Notas estruturadas com pontos-chave, vocabulário, citações, anedotas |
| 🃏 | **Flashcards** | Cartões P/R interativos, leitura em áudio dialogada |
| ❓ | **Quiz de múltipla escolha** | Perguntas de múltipla escolha com revisão adaptativa dos erros (número configurável) |
| ✏️ | **Textos com lacunas** | Exercícios de preenchimento com dicas e validação tolerante |
| 🔤 | **Ditados** | Palavras ditadas em áudio (Voxtral TTS) a partir de uma lista importada, introdução por teclado, correção estrita letra a letra com regra ortográfica explicada |
| 🎙️ | **Podcast** | Mini-podcast de 2 vozes em áudio — vozes Mistral por defeito ou vozes personalizadas (pais!) |
| 🖼️ | **Ilustrações** | Imagens educativas geradas por um Agent Mistral |
| 🗣️ | **Quiz vocal** | Perguntas lidas em voz alta (voz personalizada possível), resposta oral, verificação por IA |
| 💬 | **Tutor IA** | Chat contextual com os seus documentos de curso, com chamada de ferramentas |
| 🧠 | **Router automático** | Um router baseado em `mistral-small-latest` analisa o conteúdo e propõe uma combinação de geradores entre os 8 tipos disponíveis |
| 🔒 | **Controlo parental** | Moderação configurável por perfil (categorias personalizáveis), PIN parental, restrições do chat |
| 🌍 | **Multilingue** | Interface disponível em 9 línguas; geração por IA controlável em 15 línguas via os prompts |
| 🔊 | **Leitura em voz alta** | Ouça as fichas e flashcards (diálogo pergunta/resposta) via Mistral Voxtral TTS |
| 💶 | **Acompanhamento dos custos da API** | Estimativa transparente do custo € de cada geração e fonte (tokens / caracteres / páginas / segundos de áudio). Badge por cartão + total por projeto, visível no painel |
| 🎨 | **Tema por perfil** | Cada perfil escolhe o seu tema `dark` ou `light` — persiste na mudança de perfil |

---

## Visão geral da arquitetura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Visão geral da arquitetura" width="800" />
</p>

---

## Mapa de utilização dos modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapeamento Modelo IA–Tarefa" width="800" />
</p>

---

## Percurso do utilizador

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Percurso de aprendizagem do aluno" width="800" />
</p>

---

## Mergulho profundo — Funcionalidades

### Entrada multimodal

O EurekAI aceita 4 tipos de fontes, moderadas segundo o perfil (ativado por defeito para criança e adolescente):

- **Importação de ficheiros** — Ficheiros JPG, PNG ou PDF processados por OCR Mistral — **OCR 4 (`mistral-ocr-4-0`) por defeito** (melhor qualidade), **OCR 3 (`mistral-ocr-2512`) em opção** nas Definições (mais barato, ~½ do custo) — para texto impresso, tabelas e escrita manuscrita; ou ficheiros de texto (TXT, MD) importados diretamente. Os uploads multi-ficheiros usam um sistema de **sessões de upload**: progresso individual por ficheiro, retry do ficheiro em falha sem reenviar os outros, dismiss da sessão quando terminada. O OCR expõe uma **pontuação de confiança** média (`average`, limitada a `[0,1]`, calculada a partir de `averagePageConfidenceScore` devolvidos pela Mistral), exibida na UI sob a forma de badge tier `high` / `medium` / `low` (limiares ~0.9 / ~0.7) — avisa sem bloquear se o scan for de má qualidade.
- **Texto livre** — Digite ou cole qualquer conteúdo. Moderado antes do armazenamento se a moderação estiver ativa.
- **Entrada de voz** — Grave áudio no navegador. Transcrito por `voxtral-mini-latest`. O parâmetro `language="fr"` otimiza o reconhecimento.
- **Web / URL** — Cole uma ou várias URLs para fazer scraping do conteúdo diretamente (Readability + Lightpanda para páginas JS), ou digite palavras-chave para uma pesquisa web via Agent Mistral. O campo único aceita os dois — URLs e palavras-chave são separados automaticamente, cada resultado cria uma fonte independente.

### Geração de conteúdo por IA

Oito tipos de material de aprendizagem gerado:

| Gerador | Modelo | Saída |
|---|---|---|
| **Ficha de revisão** | `mistral-large-latest` | Título, resumo, pontos-chave, vocabulário, citações, anedota |
| **Flashcards** | `mistral-large-latest` | Cartões P/R com referências às fontes (número configurável) |
| **Quiz de múltipla escolha** | `mistral-large-latest` | Perguntas de múltipla escolha, explicações, revisão adaptativa (número configurável) |
| **Textos com lacunas** | `mistral-large-latest` | Frases a completar com dicas, validação tolerante (Levenshtein) |
| **Ditados** | `mistral-large-latest` + Voxtral TTS | Palavras-chave ditadas em áudio (1 MP3/palavra) → introdução por teclado → correção estrita (acentos) com regra explicada |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Script de 2 vozes → áudio MP3 |
| **Ilustração** | Agent `mistral-large-latest` | Imagem educativa via a ferramenta `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Perguntas TTS → resposta STT → verificação por IA |

### Tutor IA por chat

Um tutor conversacional com acesso completo aos documentos do curso:

- Utiliza `mistral-large-latest`
- **Chamada de ferramentas**: pode gerar fichas, flashcards, quizzes ou textos com lacunas durante a conversa
- Histórico de 50 mensagens por curso
- Moderação do conteúdo se ativada para o perfil

### Router automático

O router utiliza `mistral-small-latest` para analisar o conteúdo das fontes e propor os geradores mais relevantes entre os 8 disponíveis. A interface exibe o progresso em tempo real: primeiro uma fase de análise, depois as gerações individuais com possibilidade de cancelamento.

### Aprendizagem adaptativa

- **Estatísticas de quiz**: acompanhamento das tentativas e da precisão por pergunta
- **Revisão de quiz**: gera 5-10 novas perguntas direcionadas aos conceitos fracos
- **Deteção de enunciado**: deteta as instruções de revisão ("Sei a minha lição se souber...") e prioriza-as nos geradores textuais compatíveis (ficha, flashcards, quiz, textos com lacunas)

### Segurança e controlo parental

- **4 grupos etários**: criança (≤10 anos), adolescente (11-15), estudante (16-25), adulto (26+)
- **Moderação do conteúdo**: `mistral-moderation-2603` (Mistral Moderation 2) com 11 categorias disponíveis, 5 bloqueadas por defeito para criança/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `selfharm`, `jailbreaking`). Categorias personalizáveis por perfil nas definições; o Moderation 2 dividiu a antiga categoria « conteúdo perigoso » em `dangerous` + `criminal` (os perfis existentes são migrados automaticamente, e as categorias bloqueadas aplicam-se também às fontes já importadas). Segurança por defeito: se a resposta do modelo não permitir verificar uma categoria bloqueada, o conteúdo é recusado (« Moderação indisponível »); com a moderação ativa, a geração e o chat excluem as fontes assinaladas, em erro ou em verificação (uma fonte importada com moderação desativada não é re-verificada). Id datado fixado em `helpers/moderation-model.ts`: o alias `-latest`, descontinuado, já não é listado pela API.
- **PIN parental**: hash SHA-256, obrigatório para perfis com menos de 15 anos. Para um deployment em produção, prever um hash lento com salt (Argon2id, bcrypt).
- **Restrições do chat**: chat IA desativado por defeito para menores de 16 anos, ativável pelos pais

### Sistema multiperfis

- Perfis múltiplos com nome, idade, avatar, preferências de língua
- **Vozes por perfil** (`Profile.mistralVoices?: { host?, guest? }` — cada papel é opcional) — cada criança pode ter o seu par de vozes podcast/quiz vocal
- **Tema por perfil** (`Profile.theme: 'dark' | 'light'`) — mudança automática ao trocar de perfil, persistida no backend
- Projetos ligados aos perfis via `profileId`
- Eliminação em cascata: eliminar um perfil elimina todos os seus projetos

### Acompanhamento dos custos da API

Cada chamada Mistral faturável (chat, OCR, STT, TTS, agents) é instrumentada para fornecer uma estimativa € **transparente** ao utilizador. A moderação, gratuita, não é contabilizada. Limite conhecido: as taxas de ferramentas dos agents (pesquisa web 30 $/1000 chamadas, geração de imagem 100 $/1000 imagens) ainda não são contabilizadas — o custo exibido de uma ilustração está subestimado.

- **Fonte de verdade**: `helpers/pricing.ts` — `MODEL_PRICING` por prefixo de modelo (ex: `mistral-large` → input 0.5 €/M tokens, output 1.5 €/M tokens), `PRICING_SOURCES` com URLs da documentação Mistral para re-scraping periódico
- **Unidades suportadas**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversão orientada por `helpers/cost-calc.ts`
- **Cadeia de instrumentação**: `helpers/tracked-client.ts` (wrap do cliente Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injeção na resposta HTTP)
- **UI**: badge de custo por geração (`src/partials/cost-badge-gen.html`), por fonte (`cost-badge-src.html`), total acumulado no painel (`Project.totalCost`)
- **Endpoints**: as respostas `/generate/*` e `/sources/*` decoram o objeto devolvido (Generation / Source) com `estimatedCost`, `usage` e `costBreakdown`. `POST /generate/route` adiciona um campo `costDelta: number` para o custo do routing isolado. `GET /projects/:pid` devolve o projeto enriquecido com `totalCost` (soma calculada a partir de `costLog[]`) + o histórico completo

### TTS (Mistral Voxtral) e vozes personalizadas

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, síntese de voz 100% Mistral, sem necessidade de chave adicional
- **Vozes personalizadas**: os pais podem criar as suas próprias vozes via a API Mistral Voices (a partir de uma amostra de áudio) e atribuí-las aos papéis anfitrião/convidado — os podcasts e quizzes vocais são então lidos com a voz de um pai, tornando a experiência ainda mais imersiva para a criança
- Dois papéis vocais configuráveis: **anfitrião** (narrador principal) e **convidado** (segunda voz do podcast)
- Catálogo completo das vozes Mistral disponível nas definições, filtrável por língua
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
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntese de voz integrada |
| **Ícones** | Lucide 1.x | Biblioteca de ícones SVG |
| **Scraping web** | Readability + linkedom | Extração do conteúdo principal das páginas web (tecnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Navegador headless ultraleve (Zig + V8) para páginas JS/SPA — fallback de scraping |
| **Markdown** | Marked | Renderização de markdown no chat |
| **Upload de ficheiros** | Multer 2.x | Gestão de formulários multipart |
| **Áudio** | ffmpeg-static | Concatenação de segmentos de áudio |
| **Testes** | Vitest | Testes unitários — cobertura medida pelo SonarCloud |
| **Persistência** | Ficheiros JSON | Armazenamento sem dependências |

---

## Referência dos modelos

| Modelo | Utilização | Porquê |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos com lacunas, Chat, Verificação de quiz vocal, Agent Image, Agent Web Search, Detecção de consignas | Melhor multilingual + seguimento de instruções |
| `mistral-ocr-4-0` (OCR 4, predefinição) | OCR de documentos — qualidade superior | Texto impresso, tabelas, escrita manuscrita ($4 / 1000 páginas) |
| `mistral-ocr-2512` (OCR 3, opção) | OCR de documentos | Selecionável em Definições, mais barato ($2 / 1000 páginas) |
| `voxtral-mini-latest` | Reconhecimento de voz (STT) | STT multilingue, otimizado com `language="fr"` |
| `voxtral-mini-tts-latest` | Síntese de voz (TTS) | Podcasts, quiz vocal, leitura em voz alta |
| `mistral-moderation-2603` | Moderação de conteúdo | 5 categorias bloqueadas para criança/adolescente (incluindo `jailbreaking`) |
| `mistral-small-latest` | Router automático | Análise rápida do conteúdo para decisões de routing |

---

## Arranque rápido

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

> **Nota**: Mistral Voxtral TTS é o único provider TTS — nenhuma chave adicional necessária além de `MISTRAL_API_KEY`.

> **Chave API introduzida pelo utilizador**: `MISTRAL_API_KEY` é agora **opcional**. Se estiver ausente, a app arranca na mesma e convida cada utilizador a introduzir **a sua própria chave Mistral** na interface. A chave é **armazenada no navegador** (encriptada via Web Crypto + IndexedDB em contexto seguro) e enviada por pedido — **nunca persistida no servidor**. Precedência: chave do perfil > chave global do navegador > `MISTRAL_API_KEY` (env). Definir `EUREKAI_REQUIRE_USER_KEY=true` obriga cada utilizador a fornecer a sua chave (a chave de env serve apenas para pré-carregamentos).

> **HTTPS local (tablet/LAN)**: `localhost` já é um contexto seguro. Para acesso LAN (tablet), gera um certificado local e ativa HTTPS para desbloquear a encriptação do navegador + encriptar a chave em trânsito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variáveis de ambiente

| Variável | Obrigatório | Predefinição | Função |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcional | — | Chave API Mistral (chat, OCR, STT, TTS Voxtral, agents, moderação). Se ausente, o utilizador introduz a sua chave na app (armazenada no navegador, nunca no servidor) |
| `EUREKAI_REQUIRE_USER_KEY` | opcional | `false` | `true` → desativa o fallback para `MISTRAL_API_KEY` nas pedidos de IA (cada utilizador DEVE fornecer a sua chave). Útil numa instância exposta |
| `HTTPS_KEY` / `HTTPS_CERT` | opcional | — | Caminhos chave/cert TLS (cf. `scripts/gen-cert.sh`) → Express e Vite servem em HTTPS (secure context LAN/tablet) |
| `PORT` | opcional | `3000` | Porta HTTP do backend Express |
| `NODE_ENV` | opcional | `development` | Se `production` → Express serve o frontend a partir de `dist/` (caso contrário `public/`) |
| `SONAR_TOKEN` | opcional CI | — | Utilizado apenas pelo workflow GitHub Actions SonarCloud |

### Testes, qualidade de código e contribuição

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Hooks Git (Husky)**: `pre-commit` encadeia `scripts/pre-commit-fast.sh` (conflitos, ficheiros grandes, shellcheck), `lint-staged` depois `npm test` ; `pre-push` executa primeiro um gate `npm audit` (bloqueia em vulnerabilidade crítica transitiva, cf. `scripts/audit-verdict.mjs`) depois `npm run security`. Todos bloqueiam o commit/push em caso de falha.

**Ferramentas externas necessárias (opcionais mas utilizadas por `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Sem estas ferramentas, `npm test` falha em `pretest` (lizard ausente) e `npm run security` falha (opengrep ausente). Os hooks husky bloqueiam então o commit/push.

---

## Implantação com contentor

A imagem é publicada no **GitHub Container Registry**:

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

> **`:U`** é um flag Podman rootless que ajusta automaticamente as permissões do volume.

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
  index.ts                — getContent, stripJsonMarkdown, safeParseJson, unwrapJsonArray, extractAllText, timer
  audio.ts                — collectStream (ReadableStream → Buffer)
  audio-files.ts          — Persistance et lecture des fichiers audio générés (podcast, flashcards)
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
  moderation-http.ts      — Statut de modération → réponse HTTP (400 signalé / 503 indisponible / 409 en cours)
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
  rate-limit.ts           — Rate-limiters Express (authLimiter, aiLimiter, generalLimiter)
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

> **Para os contribuidores de IA**: consultar [`CLAUDE.md`](CLAUDE.md) para o contexto de arquitetura detalhado, as regras obrigatórias (anti-leak de prompts, códigos de erro, cost tracking) e as armadilhas conhecidas (Lizard CCN, Opengrep, migração Codacy/Semgrep).

---

## Referência da API

### Config
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/config` | Configuração atual |
| `PUT` | `/api/config` | Modificar a config (modelos, vozes, modelo TTS) |
| `GET` | `/api/config/status` | Estado das APIs: `mistral` (chave Mistral definida), `ttsAvailable` (alias de `mistral`, Mistral Voxtral é o único provider TTS) |
| `POST` | `/api/config/reset` | Repor a config por predefinição |
| `GET` | `/api/config/voices` | Listar as vozes Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorias de moderação disponíveis + predefinições por idade |
| `POST` | `/api/providers/mistral/validate` | Validar uma chave Mistral introduzida pelo utilizador — sempre 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), sem fallback env |

### Perfis
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/profiles` | Listar todos os perfis |
| `POST` | `/api/profiles` | Criar um perfil |
| `PUT` | `/api/profiles/:id` | Modificar um perfil (PIN obrigatório para < 15 anos) |
| `DELETE` | `/api/profiles/:id` | Eliminar um perfil + cascade de projetos `{pin?}` → `{ok, deletedProjects}` |

### Projetos
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects` | Listar os projetos (`?profileId=` opcional) |
| `POST` | `/api/projects` | Criar um projeto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalhes do projeto |
| `PUT` | `/api/projects/:pid` | Renomear `{name}` |
| `DELETE` | `/api/projects/:pid` | Eliminar o projeto |
| `GET` | `/api/projects/:pid/events` | Fluxo SSE em tempo real (`event: generation`) das transições de geração (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Fontes
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importação de ficheiros multipart (OCR para JPG/PNG/PDF, leitura direta para TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Texto livre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voz STT (áudio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL ou pesquisa web `{query}` — devolve um array de fontes |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Eliminar uma fonte |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detetar as consignas de revisão |

### Geração
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de revisão |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz QCM |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos com lacunas |
| `POST` | `/api/projects/:pid/generate/dictation` | Ditado (palavras + frases-exemplo + regras, 1 áudio TTS por palavra; também proposta pelo auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustração |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revisão adaptativa `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Ficha de recordação centrada nas perguntas falhadas de um quiz `{generationId, weakQuestions}` — chamada em paralelo com `quiz-review` pelo botão « Treinar-me nos meus erros » |
| `POST` | `/api/projects/:pid/generate/route` | Análise de routing (plano dos geradores a lançar) — devolve `{plan, costDelta}` (custo do routing isolado) |
| `POST` | `/api/projects/:pid/generate/auto` | Geração automática backend (routing + 8 tipos: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execução em paralelo — pressupõe um tier Mistral com rate-limit ≥ 8 pedidos simultâneos; caso contrário vários 429 podem surgir em `failedSteps`. |

Todas as rotas de geração aceitam `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`. `quiz-review` e `remediation-summary` exigem ainda `{generationId, weakQuestions}`.

### CRUD Gerações
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Submeter as respostas do quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Submeter as respostas dos textos com lacunas `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Submeter as respostas de ditado `{answers}` (score servidor estrito) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar uma resposta oral (áudio + questionIndex) |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Leitura TTS em voz alta (fichas/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancelar uma geração em curso (único caminho de cancelamento de um pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Renomear `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Eliminar a geração |

### Chat
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperar o histórico do chat |
| `POST` | `/api/projects/:pid/chat` | Enviar uma mensagem `{message, lang, ageGroup}` |
| `DELETE` | `/api/projects/:pid/chat` | Apagar o histórico do chat |

---

## Decisões arquiteturais

| Decisão | Justificação |
|---|---|
| **Alpine.js em vez de React/Vue** | Pegada mínima, reatividade leve com TypeScript compilado pelo Vite. Perfeito para um hackathon em que a velocidade conta. |
| **Persistência em ficheiros JSON** | Zero dependências, arranque instantâneo. Nenhuma base de dados a configurar — arranca-se e está pronto. |
| **Vite + Handlebars** | O melhor dos dois mundos: HMR rápido para o desenvolvimento, partials HTML para a organização do código, Tailwind JIT. |
| **Prompts centralizados** | Todos os prompts de IA em `prompts.ts` — fácil de iterar, testar e adaptar por idioma/grupo etário. |
| **Sistema multi-gerações** | Cada geração é um objeto independente com o seu próprio ID — permite várias fichas, quizzes, etc. por curso. |
| **Prompts adaptados por idade** | 4 grupos etários com vocabulário, complexidade e tom diferentes — o mesmo conteúdo ensina de forma diferente consoante o aprendiz. |
| **Funcionalidades baseadas em Agents** | A geração de imagens e a pesquisa web utilizam Agents Mistral temporários — ciclo de vida limpo com limpeza automática. |
| **Scraping inteligente de URL** | Um único campo aceita URLs e palavras-chave misturadas — as URLs são scrapadas via Readability (páginas estáticas) com fallback Lightpanda (páginas JS/SPA), as palavras-chave disparam um Agent Mistral web_search. Cada resultado cria uma fonte independente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (sem chave adicional além de `MISTRAL_API_KEY`) — síntese de voz integrada na cadeia de custos e na resolução de voz por idioma. |

---

## Créditos e agradecimentos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reativo leve
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitário
- **[Vite](https://vitejs.dev)** — Ferramenta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de ícones
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extração de conteúdo web (tecnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultraleve para o scraping de páginas JS/SPA
- **[Luciole](https://luciole-vision.com)** — Tipo de letra concebido para leitores com deficiência visual, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opção « Conforto de leitura » dos perfis)

Iniciado durante o Mistral AI Worldwide Hackathon (março de 2026), desenvolvido integralmente por IA com [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licença

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artigo traduzido do fr para o pt com grok-4.5.**
