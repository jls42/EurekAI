<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
</p>

<h1 align="center">EurekAI</h1>

<p align="center">
  <strong>Transforme qualquer conteúdo em uma experiência interativa de aprendizagem — impulsionado por <a href="https://mistral.ai">Mistral AI</a>.</strong>
</p>

<p align="center">
  <a href="README-en.md">🇬🇧 English</a> · <a href="README-es.md">🇪🇸 Español</a> · <a href="README-pt.md">🇧🇷 Português</a> · <a href="README-de.md">🇩🇪 Deutsch</a> · <a href="README-it.md">🇮🇹 Italiano</a> · <a href="README-nl.md">🇳🇱 Nederlands</a> · <a href="README-ar.md">🇸🇦 العربية</a><br>
  <a href="README-hi.md">🇮🇳 हिन्दी</a> · <a href="README-zh.md">🇨🇳 中文</a> · <a href="README-ja.md">🇯🇵 日本語</a> · <a href="README-ko.md">🇰🇷 한국어</a> · <a href="README-pl.md">🇵🇱 Polski</a> · <a href="README-ro.md">🇷🇴 Română</a> · <a href="README-sv.md">🇸🇪 Svenska</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=_b1TQz2leoI"><img src="https://img.shields.io/badge/▶️_Voir_la_démo-YouTube-red?style=for-the-badge&logo=youtube" alt="Demonstração no YouTube"></a>
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

## A história — Por que o EurekAI?

O **EurekAI** nasceu durante o [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (março de 2026). Eu precisava de um tema — e a ideia surgiu de algo muito concreto: costumo estudar para as provas com minha filha e pensei que deveria ser possível tornar isso mais lúdico e interativo graças à IA.

O objetivo: pegar **qualquer tipo de entrada** — uma foto da lição, um texto copiado e colado, uma gravação de voz, uma pesquisa na web — e transformá-la em **fichas de revisão, flashcards, quizzes, podcasts, textos com lacunas, ilustrações e muito mais**. Tudo isso impulsionado pelos modelos da Mistral AI, uma empresa francesa, o que torna o EurekAI uma solução naturalmente adaptada a estudantes francófonos.

O [protótipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) foi concebido em 48 horas durante o hackathon como uma prova de conceito construída sobre os serviços da Mistral — já funcional, mas limitado. Desde então, o EurekAI se transformou em um projeto real: textos com lacunas, navegação nos exercícios, web scraping, moderação parental configurável, revisão aprofundada de código e muito mais. A totalidade do código foi gerada por IA — principalmente pelo [Claude Code](https://code.claude.com/), com algumas contribuições via [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Visão geral

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tour guiado pelo EurekAI: fontes, ficha, quiz, flashcards, ilustrações" width="820" />
</p>

| | |
|---|---|
| ![Painel](docs/screenshots/dashboard.webp)<br>**Painel** — gerações recentes, custo estimado por cartão e total do projeto, botão « Auto — Mágica! » | ![Fontes](docs/screenshots/sources.webp)<br>**Fontes** — importação de foto/PDF/texto/voz/web, geração com um clique, detecção de instruções |

Cada fonte importada exibe sua [pontuação de confiança do OCR, sua moderação e seu custo estimado](docs/screenshots/sources-list.webp).

### Os componentes em ação

| | |
|---|---|
| ![Ficha de revisão](docs/screenshots/notes.gif)<br>**Ficha de revisão** — pontos-chave, vocabulário, citações com fontes, leitura em áudio por seção | ![Quiz](docs/screenshots/quiz.gif)<br>**Quiz de múltipla escolha** — apenas uma resposta correta por pergunta, feedback imediato com explicação, navegação passo a passo |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — cartão para virar e autoavaliação « eu sabia / eu não sabia » | ![Textos com lacunas](docs/screenshots/fillblank.gif)<br>**Textos com lacunas** — dica sob demanda, validação tolerante |
| ![Ditado](docs/screenshots/dictation.gif)<br>**Ditado** — palavra ditada em áudio, correção rigorosa letra por letra | ![Quiz vocal](docs/screenshots/vocal-quiz.gif)<br>**Quiz vocal** — pergunta lida em voz alta, resposta no microfone |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — minipodcast a 2 vozes, roteiro dialogado consultável | ![Ilustrações](docs/screenshots/illustrations.gif)<br>**Ilustrações** — imagens educativas geradas por Agente |
| ![Tutor IA](docs/screenshots/chat.gif)<br>**Tutor IA** — chat fundamentado nos documentos da aula, respostas explicadas, capaz de gerar quizzes e flashcards | |

### Primeiros passos

| | |
|---|---|
| ![Escolha do perfil](docs/screenshots/login.gif)<br>**Escolha do perfil** — cada criança tem seu espaço, seu avatar e seu idioma | ![Criação de perfil](docs/screenshots/profile-create.gif)<br>**Criação de perfil** — idade, avatar, PIN parental para menores de 15 anos |
| ![Criação de curso](docs/screenshots/course.gif)<br>**Criação de curso** — um projeto por lição, pronto para receber fontes | ![Configurações](docs/screenshots/settings.gif)<br>**Configurações** — status da API, escolha dos modelos de IA com tarifas exibidas |

---

## Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 📷 | **Importação de arquivos** | Importe suas lições — foto, PDF (via Mistral OCR com pontuação média de confiança, níveis `high`/`medium`/`low`) ou arquivo de texto (TXT, MD). Sessões de upload com nova tentativa por arquivo e progresso individual |
| 📝 | **Digitação de texto** | Digite ou cole qualquer texto diretamente |
| 🎤 | **Entrada de voz** | Grave sua voz — o Voxtral STT transcreve a sua fala |
| 🌐 | **Web / URL** | Cole uma URL (scraping direto via Readability + Lightpanda) ou digite uma pesquisa (Agente Mistral web_search) |
| 📄 | **Fichas de revisão** | Notas estruturadas com pontos-chave, vocabulário, citações, curiosidades |
| 🃏 | **Flashcards** | Cartões interativos de perguntas e respostas, leitura em áudio dialogada |
| ❓ | **Quiz de múltipla escolha** | Questões de 4 opções com apenas uma resposta correta, com revisão adaptativa de erros (quantidade configurável) |
| ✏️ | **Textos com lacunas** | Exercícios de preenchimento com dicas e validação tolerante |
| 🔤 | **Ditado** | Palavras ditadas em áudio (Voxtral TTS) a partir de uma lista importada, digitação no teclado, correção rigorosa letra por letra com regra ortográfica explicada |
| 🎙️ | **Podcast** | Minipodcast a 2 vozes em áudio — vozes padrão da Mistral ou vozes personalizadas (pais!) |
| 🖼️ | **Ilustrações** | Imagens educativas geradas por um Agente Mistral |
| 🗣️ | **Quiz vocal** | Perguntas lidas em voz alta (possibilidade de voz personalizada), resposta oral, verificação por IA |
| 💬 | **Tutor IA** | Chat contextual com os documentos da aula, com chamada de ferramentas |
| 🧠 | **Roteador automático** | Um roteador baseado em `mistral-small-latest` analisa o conteúdo e sugere uma combinação de geradores entre os 8 tipos disponíveis |
| 🔒 | **Controle parental** | Moderação configurável por perfil (categorias personalizáveis), PIN parental, restrições de chat |
| 🌍 | **Multilíngue** | Interface disponível em 9 idiomas; geração por IA controlável em 15 idiomas por meio dos prompts |
| 🔊 | **Leitura em voz alta** | Ouça as fichas e flashcards (diálogo pergunta/resposta) via Mistral Voxtral TTS |
| 💶 | **Monitoramento de custos da API** | Estimativa transparente do custo em € de cada geração e fonte (tokens / caracteres / páginas / segundos de áudio). Badge por cartão + total por projeto, visível no painel |
| 🎨 | **Tema por perfil** | Cada perfil escolhe seu tema `dark` ou `light` — memorizado com o perfil e reaplicado a cada troca de perfil |

---

## Visão geral da arquitetura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Architecture Overview" width="800" />
</p>

---

## Mapeamento de uso dos modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="AI Model-to-Task Mapping" width="800" />
</p>

---

## Jornada do usuário

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Student Learning Journey" width="800" />
</p>

---

## Visão detalhada — Funcionalidades

### Entrada multimodal

O EurekAI aceita 4 tipos de fontes, moderadas de acordo com o perfil (moderação ativada por padrão para perfis de criança e adolescente):

- **Importação de arquivos** — Arquivos JPG, PNG ou PDF processados pelo Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) por padrão** (melhor qualidade), **OCR 3 (`mistral-ocr-2512`) opcional** nas Configurações (mais econômico, ~½ do custo) — para texto impresso, tabelas e escrita manual; ou arquivos de texto (TXT, MD) importados diretamente. Os uploads de múltiplos arquivos utilizam um sistema de **sessões de upload**: progresso individual por arquivo, nova tentativa para o arquivo com falha sem reenviar os demais, encerramento da sessão quando concluída. O OCR expõe uma **pontuação de confiança** média (`average`, delimitada em `[0,1]`, calculada a partir de `averagePageConfidenceScore` retornados pela Mistral), exibida na interface sob a forma de badge de nível `high` / `medium` / `low` (limiares ~0.9 / ~0.7) — emitindo um aviso sem bloquear caso a digitalização seja de baixa qualidade. A cópia do documento enviada à Mistral para o OCR é excluída assim que o processamento termina, mesmo em caso de falha.
- **Texto livre** — Digite ou cole qualquer conteúdo. Moderado antes do armazenamento se a moderação estiver ativa.
- **Entrada de voz** — Grave áudio no navegador. Transcrito por `voxtral-mini-latest`. O parâmetro `language="fr"` otimiza o reconhecimento.
- **Web / URL** — Cole uma ou mais URLs para extrair o conteúdo diretamente (Readability + Lightpanda para páginas JS) ou digite palavras-chave para uma pesquisa na web via Agente Mistral. O campo único aceita ambos — URLs e palavras-chave são separadas automaticamente, e cada resultado cria uma fonte independente.

### Geração de conteúdo por IA

Oito tipos de materiais de aprendizagem gerados:

| Gerador | Modelo | Saída |
|---|---|---|
| **Ficha de revisão** | `mistral-large-latest` | Título, resumo, pontos-chave, vocabulário, citações, curiosidade |
| **Flashcards** | `mistral-large-latest` | Cartões de perguntas e respostas com referências às fontes (quantidade configurável) |
| **Quiz de múltipla escolha** | `mistral-large-latest` | Questões de 4 opções com apenas uma resposta correta, explicações, revisão adaptativa (quantidade configurável) |
| **Textos com lacunas** | `mistral-large-latest` | Frases para completar com dicas, validação tolerante (Levenshtein) |
| **Ditado** | `mistral-large-latest` + Voxtral TTS | Palavras-chave ditadas em áudio (1 MP3/palavra) → digitação no teclado → correção rigorosa (um acento esquecido conta como erro) com regra explicada |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Roteiro a 2 vozes → áudio MP3 |
| **Ilustração** | Agente `mistral-large-latest` | Imagem educativa por meio da ferramenta `image_generation` |
| **Quiz vocal** | `mistral-large-latest` + Voxtral TTS + STT | Perguntas TTS → resposta STT → verificação por IA |

### Tutor IA por chat

Um tutor conversacional com acesso completo aos documentos da aula:

- Utiliza `mistral-large-latest`
- **Chamada de ferramentas**: pode gerar fichas, flashcards, quizzes ou textos com lacunas durante a conversa
- Histórico de 50 mensagens por curso
- Moderação, se ativada para o perfil: a mensagem é verificada, e as fontes sinalizadas, aquelas cuja verificação falhou e as que ainda não foram verificadas são excluídas do contexto e das ferramentas (a verificação das fontes com falha ou ainda não verificadas é reiniciada primeiro, por no máximo 5 s)

### Roteador automático

O roteador utiliza o `mistral-small-latest` para analisar o conteúdo das fontes e sugerir os geradores mais pertinentes entre os 8 disponíveis. A interface exibe o progresso em tempo real: primeiro uma fase de análise e, em seguida, as gerações individuais com possibilidade de cancelamento.

### Aprendizagem adaptativa

- **Estatísticas de quiz**: acompanhamento de tentativas e precisão por questão
- **Revisão de quiz**: gera de 5 a 10 novas questões focadas nos conceitos com maior dificuldade, a partir das fontes do quiz original (o controle de moderação se aplica a essas mesmas fontes)
- **Detecção de instruções**: detecta instruções de estudo ("Eu sei a minha lição se eu souber...") e as prioriza nos geradores textuais compatíveis (ficha, flashcards, quiz, textos com lacunas). Com a moderação ativa, a detecção aguarda a verificação das fontes e lê apenas aquelas consideradas seguras; a instrução mantém a lista de suas fontes originais: se uma delas for sinalizada, a instrução não será exibida nem aplicada e, se uma delas for excluída, a instrução será apagada. Seu custo é contabilizado

### Segurança e controle parental

- **4 faixas etárias**: criança (≤10 anos), adolescente (11-15), estudante (16-25), adulto (26+)
- **Moderação de conteúdo**: `mistral-moderation-2603` (Mistral Moderation 2) com 11 categorias disponíveis, 6 bloqueadas por padrão para novos perfis de criança/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` adicionada após uma avaliação em 50 lições, incluindo história, sem nenhum falso positivo). Categorias personalizáveis por perfil nas configurações; o Moderation 2 dividiu a antiga categoria «conteúdo perigoso» em `dangerous` + `criminal` (os perfis existentes são migrados automaticamente, e as categorias bloqueadas também se aplicam a fontes já importadas). Segurança por padrão: se a resposta do modelo não permitir verificar uma categoria bloqueada, o conteúdo é recusado («Moderação indisponível»); com a moderação ativa, tanto a geração quanto o chat descartam fontes sinalizadas, aquelas cuja verificação falhou e aquelas em processo de verificação. Uma fonte nunca verificada (importada quando a moderação estava desativada ou projeto antigo vinculado a um perfil) é verificada antes do uso. Uma moderação interrompida por uma reinicialização é retomada na inicialização se a chave do servidor permitir; caso contrário, assim como uma moderação com erro, ela é retomada na abertura do projeto ou na próxima geração. O botão «Verificar novamente» reinicia a verificação sob demanda. Com a moderação ativa, enquanto uma fonte não for considerada segura, seu conteúdo fica oculto para a criança (pré-visualização, texto, documento original); o responsável pode visualizá-lo com seu PIN, para uma única consulta. A resposta oral do quiz vocal é moderada antes de ser verificada. ID com data fixado em `helpers/moderation-model.ts`: o alias `-latest`, descontinuado, não é mais listado pela API.
- **PIN parental**: hash SHA-256, obrigatório para perfis de menores de 15 anos; no máximo 10 códigos incorretos a cada 15 minutos por endereço IP (429 `rate_limited`). Para uma implantação em produção, preveja um hash lento com salt (Argon2id, bcrypt).
- **Dados do servidor**: `/output` disponibiliza apenas as mídias dos projetos (áudios, imagens, arquivos importados); `profiles.json`, `config.json`, `projects.json` e os `project.json` nunca são expostos
- **Restrições de chat**: chat de IA desativado por padrão para menores de 16 anos, podendo ser ativado pelos pais/responsáveis

### Sistema multiperfil

- Múltiplos perfis com nome, idade, avatar, preferências de idioma
- **Voz por perfil** (`Profile.mistralVoices?: { host?, guest? }` — cada função é opcional) — cada criança pode ter seu próprio par de vozes para podcast/quiz vocal
- **Tema por perfil** (`Profile.theme: 'dark' | 'light'`) — alternância automática ao trocar de perfil, persistida no backend
- Projetos vinculados aos perfis via `profileId`; um projeto antigo sem perfil é vinculado ao primeiro perfil que o abrir, sendo então moderado de acordo com esse perfil
- Exclusão em cascata: excluir um perfil remove todos os seus projetos

### Monitoramento de custos da API

Cada chamada faturável da Mistral (chat, OCR, STT, TTS, agentes), incluindo a detecção de instruções e as respostas orais do quiz vocal, é instrumentada para fornecer uma estimativa em € **transparente** ao usuário. A moderação, gratuita, não é contabilizada. Os custos de ferramentas dos agentes estão inclusos: $ 0,03 por busca web e $ 0,10 por imagem gerada (tarifas da Mistral), além dos tokens produzidos por essas ferramentas, que a estimativa calcula com a tarifa de entrada do modelo do agente.

- **Fonte da verdade**: `helpers/pricing.ts` — `MODEL_PRICING` por prefixo de modelo (ex.: `mistral-large` → entrada 0.5 €/M tokens, saída 1.5 €/M tokens), `PRICING_SOURCES` com URLs da documentação da Mistral para re-scraping periódico
- **Unidades suportadas**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversão orientada por `helpers/cost-calc.ts`
- **Cadeia de instrumentação**: `helpers/tracked-client.ts` (envolve o cliente Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injeção na resposta HTTP)
- **UI**: badge de custo por geração (`src/partials/cost-badge-gen.html`), por fonte (`cost-badge-src.html`), total acumulado no dashboard (`Project.totalCost`)
- **Endpoints**: as respostas `/generate/*` e `/sources/*` decoram o objeto retornado (`Generation` / `Source`) com `estimatedCost`, `usage` e `costBreakdown`. `POST /generate/route` adiciona um campo `costDelta: number` apenas para o custo do roteamento; `POST /detect-consigne` (`{consigne, costDelta}`) e a verificação de uma resposta oral também retornam seu `costDelta`. `GET /projects/:pid` retorna o projeto enriquecido com `totalCost` (soma calculada a partir de `costLog[]`) + o histórico completo

### TTS (Mistral Voxtral) e vozes personalizadas

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, síntese de voz 100% Mistral, nenhuma chave adicional necessária
- **Vozes personalizadas**: os pais podem criar suas próprias vozes por meio da API Mistral Voices (a partir de uma amostra de áudio) e atribuí-las às funções de apresentador/convidado — os podcasts e quizzes vocais são então lidos com a voz de um dos pais, tornando a experiência ainda mais imersiva para a criança
- Duas funções de voz configuráveis: **apresentador** (narrador principal) e **convidado** (segunda voz do podcast)
- Catálogo completo de vozes da Mistral disponível nas configurações, filtrável por idioma

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
| **Servidor de desenvolvimento** | Vite 8.x (Rolldown) + tsx | HMR, parciais Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interface reativa, TypeScript compilado pelo Vite |
| **Templating** | vite-plugin-handlebars | Composição HTML via parciais |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agentes, Moderação |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntese de voz integrada |
| **Ícones** | Lucide 1.x | Biblioteca de ícones SVG |
| **Scraping web** | Readability + linkedom | Extração do conteúdo principal de páginas web (tecnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Navegador headless ultraleve (Zig + V8) para páginas JS/SPA — fallback de scraping |
| **Markdown** | Marked | Renderização de Markdown no chat |
| **Envio de arquivos** | Multer 2.x | Gerenciamento de formulários multipart |
| **Áudio** | ffmpeg-static | Concatenação de segmentos de áudio |
| **Testes** | Vitest | Testes unitários — cobertura medida pelo SonarCloud |
| **Persistência** | Arquivos JSON | Armazenamento sem dependências |

---

## Referência dos modelos

| Modelo | Uso | Por quê |
|---|---|---|
| `mistral-large-latest` | Ficha, Flashcards, Podcast, Quiz, Textos com lacunas, Chat, Verificação de quiz vocal, Agente de Imagem, Agente de Busca Web, Detecção de instruções | Melhor multilingual + seguimento de instruções |
| `mistral-ocr-4-0` (OCR 4, padrão) | OCR de documentos — qualidade superior | Texto impresso, tabelas, escrita manual ($ 4 / 1000 páginas) |
| `mistral-ocr-2512` (OCR 3, opcional) | OCR de documentos | Selecionável nas Configurações, mais barato ($ 2 / 1000 páginas) |
| `voxtral-mini-latest` | Reconhecimento de voz (STT) | STT multilíngue, otimizado com `language="fr"` |
| `voxtral-mini-tts-latest` | Síntese de voz (TTS) | Podcasts, quiz vocal, leitura em voz alta |
| `mistral-moderation-2603` | Moderação de conteúdo | 6 categorias bloqueadas para crianças/adolescentes (incluindo `jailbreaking`) |
| `mistral-small-latest` | Roteador automático | Análise rápida de conteúdo para decisões de roteamento |

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
# Éditez .env (toutes optionnelles) :
#   MISTRAL_API_KEY=<your_api_key>           (optionnel — sinon chaque utilisateur saisit sa clé dans l'app)
#   SONAR_TOKEN=...                          (optionnel, CI SonarCloud uniquement)

# Lancer le développement
npm run dev
# → Backend :  http://localhost:3000 (API)
# → Frontend : http://localhost:5173 (serveur Vite avec HMR)
```

> **Nota**: O Mistral Voxtral TTS é o único provedor de TTS — nenhuma chave adicional é necessária além de `MISTRAL_API_KEY`.

> **Chave de API inserida pelo usuário**: `MISTRAL_API_KEY` agora é **opcional**. Se estiver ausente, o app inicia mesmo assim e convida cada usuário a inserir **sua própria chave Mistral** na interface. A chave é **armazenada no navegador** (criptografada via Web Crypto + IndexedDB em contexto seguro) e enviada por requisição — **nunca persistida no servidor**. Precedência: chave do perfil > chave global do navegador > `MISTRAL_API_KEY` (env). Definir `EUREKAI_REQUIRE_USER_KEY=true` força cada usuário a fornecer sua própria chave (a chave de env passa a servir apenas para pré-carregamentos).

> **HTTPS local (tablet/LAN)**: `localhost` já é um contexto seguro. Para acesso via LAN (tablet), gere um certificado local e ative o HTTPS: o navegador poderá então criptografar a chave que armazena, e a chave é criptografada durante seu trânsito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert si dispo, sinon openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite en HTTPS
> ```

### Variáveis de ambiente

| Variável | Obrigatório | Padrão | Função |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcional | — | Chave de API Mistral (chat, OCR, STT, TTS Voxtral, agentes, moderação). Se ausente, o usuário insere sua chave no app (armazenada no navegador, nunca no servidor) |
| `EUREKAI_REQUIRE_USER_KEY` | opcional | `false` | `true` → desativa o fallback para `MISTRAL_API_KEY` em requisições de IA (cada usuário DEVE fornecer sua própria chave). Útil em uma instância exposta |
| `HTTPS_KEY` / `HTTPS_CERT` | opcional | — | Caminhos de chave/cert TLS (cf. `scripts/gen-cert.sh`) → Express e Vite servem em HTTPS (contexto seguro LAN/tablet) |
| `PORT` | opcional | `3000` | Porta HTTP do backend Express |
| `NODE_ENV` | opcional | `development` | Se `production` → Express serve o frontend a partir de `dist/` (caso contrário `public/`) |
| `SONAR_TOKEN` | opcional CI | — | Utilizado apenas pelo workflow do GitHub Actions SonarCloud |

### Testes, qualidade de código e contribuição

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git Hooks (Husky)**: `pre-commit` encadeia `scripts/pre-commit-fast.sh` (conflitos, arquivos grandes, shellcheck), `lint-staged` e depois `npm test`; `pre-push` executa primeiro uma verificação bloqueante `npm audit` (bloqueia assim que uma dependência, mesmo transitiva, tiver uma vulnerabilidade de nível `critical`, cf. `scripts/audit-verdict.mjs`) e depois `npm run security`. Cada hook bloqueia o commit/push assim que uma de suas etapas falhar.

**Ferramentas externas (opcionais para iniciar a aplicação, indispensáveis para `pretest` e para `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Sem essas ferramentas, `npm test` falha em `pretest` (lizard ausente) e `npm run security` falha (opengrep ausente). Os hooks do Husky bloqueiam então o commit/push.

---

## Implantação com contêiner

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

> **`:U`**: flag do Podman rootless que ajusta automaticamente as permissões do volume.

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

> **Para agentes de IA que contribuem com o código**: consultar [`CLAUDE.md`](CLAUDE.md) para o contexto detalhado de arquitetura, as regras obrigatórias (códigos de erro, cost tracking e prompts sem metapalavras, ou seja, sem qualificadores do documento como seu tipo, pois o modelo copiaria essas palavras em suas saídas) e as armadilhas conhecidas (Lizard CCN, Opengrep, migração Codacy/Semgrep).

---

## Referência da API

### Config
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/config` | Configuração atual |
| `PUT` | `/api/config` | Modificar a configuração (modelos, vozes, modelo TTS) |
| `GET` | `/api/config/status` | Status das APIs: `mistral` (chave Mistral definida), `ttsAvailable` (alias de `mistral`, Mistral Voxtral é o único provedor de TTS) |
| `POST` | `/api/config/reset` | Redefinir a configuração para o padrão |
| `GET` | `/api/config/voices` | Listar as vozes Mistral TTS (opcional `?lang=fr`) |
| `GET` | `/api/moderation-categories` | Categorias de moderação disponíveis + padrões por idade |
| `POST` | `/api/providers/mistral/validate` | Validar uma chave Mistral inserida pelo usuário — sempre 200 `{status}` (`ok`/`invalid`/`quota`/`network`/`missing`), sem fallback para env |

### Perfis
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/profiles` | Listar todos os perfis |
| `POST` | `/api/profiles` | Criar um perfil |
| `PUT` | `/api/profiles/:id` | Modificar um perfil (PIN obrigatório para < 15 anos; 10 PINs incorretos / 15 min → 429 `rate_limited`) |
| `DELETE` | `/api/profiles/:id` | Excluir um perfil + cascata de projetos `{pin?}` → `{ok, deletedProjects}` |

### Projetos
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects` | Listar os projetos (`?profileId=` opcional) |
| `POST` | `/api/projects` | Criar um projeto `{name, profileId}` |
| `GET` | `/api/projects/:pid` | Detalhes do projeto; `?profileId=` vincula um projeto sem perfil ao perfil que o abre |
| `PUT` | `/api/projects/:pid` | Renomear `{name}` |
| `DELETE` | `/api/projects/:pid` | Excluir o projeto |
| `GET` | `/api/projects/:pid/events` | Fluxo SSE em tempo real (`event: generation`) das transições de geração (`completed`/`failed`/`cancelled`) + heartbeat keep-alive |

### Fontes
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/sources/upload` | Importação de arquivos multipart (OCR para JPG/PNG/PDF, leitura direta para TXT/MD) |
| `POST` | `/api/projects/:pid/sources/text` | Texto livre `{text}` |
| `POST` | `/api/projects/:pid/sources/voice` | Voz STT (áudio multipart) |
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL ou busca web `{query}` — retorna um array de fontes; 422 `url_blocked` se todos os endereços forem recusados (rede interna), 502 `all_sources_failed` se nenhuma fonte pôde ser criada |
| `POST` | `/api/projects/:pid/sources/moderate` | Retomar as moderações pendentes ou em erro `{sourceIds?}` (no máximo 10 por chamada, espera ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Excluir uma fonte, seu arquivo importado e a instrução que depende dela → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar as instruções de revisão (apenas fontes verificadas) → `{consigne, costDelta}` |

### Geração
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de revisão |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz de múltipla escolha (4 opções, apenas uma resposta correta) |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos com lacunas |
| `POST` | `/api/projects/:pid/generate/dictation` | Ditado (palavras + frases de exemplo + regras, 1 áudio TTS por palavra; também proposto pelo roteador automático) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustração |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz vocal |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revisão adaptativa `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Ficha de reforço direcionada às questões erradas de um quiz `{generationId, weakQuestions}` — chamada em paralelo a `quiz-review` pelo botão de recuperação da visualização de quiz |
| `POST` | `/api/projects/:pid/generate/route` | Análise de roteamento (plano dos geradores a serem executados) — retorna `{plan, costDelta}` (custo apenas do roteamento) |
| `POST` | `/api/projects/:pid/generate/auto` | Geração automática no backend (roteamento + 8 tipos: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execução em paralelo — pressupõe um tier da Mistral com rate-limit ≥ 8 requisições simultâneas; caso contrário, múltiplos 429 podem ocorrer em `failedSteps`. |

Todas as rotas de geração aceitam `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; um `ageGroup` desconhecido ou um `lang` que não seja um código de idioma válido (esperado: `fr`, `pt-BR`…) → 400 `invalid_input`, antes de qualquer chamada de IA. `quiz-review` e `remediation-summary` exigem adicionalmente `{generationId, weakQuestions}` e operam sobre as fontes do quiz de origem.

### CRUD de gerações
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar as respostas do quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar as respostas dos textos com lacunas `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Enviar as respostas do ditado `{answers}` (pontuação estrita no servidor) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar uma resposta oral (áudio + questionIndex); a resposta oral é moderada antes de ser verificada (recusa: 400 `quiz.answerBlocked`), custo retornado em `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Leitura TTS em voz alta (fichas/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancelar uma geração em andamento (único caminho para cancelamento de um pending) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Renomear `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Excluir a geração e suas mídias (áudio, imagem) |

### Chat
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Obter o histórico do chat |
| `POST` | `/api/projects/:pid/chat` | Enviar uma mensagem `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Limpar o histórico do chat |

---

## Decisões arquiteturais

| Decisão | Justificativa |
|---|---|
| **Alpine.js em vez de React/Vue** | Pegada mínima, reatividade leve com TypeScript compilado pelo Vite. Perfeito para um hackathon onde a velocidade conta. |
| **Persistência em arquivos JSON** | Zero dependências, inicialização instantânea. Nenhum banco de dados para configurar — é iniciar e começar a usar. |
| **Vite + Handlebars** | O melhor dos dois mundos: HMR rápido para o desenvolvimento, parciais HTML para a organização do código, Tailwind JIT. |
| **Prompts centralizados** | Todos os prompts de IA em `prompts.ts` — fácil de iterar, testar e adaptar por idioma/faixa etária. |
| **Sistema multigerações** | Cada geração é um objeto independente com seu próprio ID — permite múltiplas fichas, quizzes, etc. por disciplina. |
| **Prompts adaptados por idade** | 4 faixas etárias com vocabulário, complexidade e tom diferentes — o mesmo conteúdo ensina de forma diferente conforme o aluno. |
| **Funcionalidades baseadas em Agentes** | A geração de imagens e a busca web utilizam Agentes Mistral temporários — ciclo de vida limpo com limpeza automática. |
| **Scraping inteligente de URLs** | Um campo único aceita URLs e palavras-chave combinadas — as URLs passam por scraping via Readability (páginas estáticas) com fallback para o Lightpanda (páginas JS/SPA); as palavras-chave acionam um Agente Mistral web_search. Cada resultado cria uma fonte independente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (nenhuma chave adicional além de `MISTRAL_API_KEY`) — síntese de voz integrada à cadeia de custos e à resolução de voz por idioma. |

---

## Créditos & agradecimentos

- **[Mistral AI](https://mistral.ai)** — Modelos de IA (Large, OCR, Voxtral STT, Voxtral TTS, Moderation, Small) + Worldwide Hackathon
- **[Alpine.js](https://alpinejs.dev)** — Framework reativo leve
- **[TailwindCSS](https://tailwindcss.com)** — Framework CSS utilitário
- **[Vite](https://vitejs.dev)** — Ferramenta de build frontend
- **[Lucide](https://lucide.dev)** — Biblioteca de ícones
- **[Marked](https://marked.js.org)** — Parser Markdown
- **[Readability](https://github.com/mozilla/readability)** — Extração de conteúdo web (tecnologia Firefox Reader View)
- **[Lightpanda](https://lightpanda.io)** — Navegador headless ultraleve para scraping de páginas JS/SPA
- **[Luciole](https://luciole-vision.com)** — Fonte concebida para leitores com deficiência visual, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opção « Conforto de leitura » dos perfis)

Iniciado durante o Mistral AI Worldwide Hackathon (março de 2026), desenvolvido integralmente por IA com [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licença

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artigo traduzido do fr para o pt com gemini-3.8-flash-high.**
