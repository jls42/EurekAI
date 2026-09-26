<p align="center">
  <img src="public/assets/logo.webp" alt="EurekAI Logo" width="120" />
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

O **EurekAI** nasceu durante o [Mistral AI Worldwide Hackathon](https://luma.com/mistralhack-online) ([site oficial](https://worldwide-hackathon.mistral.ai/)) (março de 2026). Eu precisava de um tema — e a ideia veio de algo muito concreto: estudo regularmente para as provas com a minha filha e pensei que deveria ser possível tornar isso mais lúdico e interativo graças à IA.

O objetivo: pegar **qualquer tipo de entrada** — uma foto da lição, um texto copiado e colado, uma gravação de voz, uma pesquisa na web — e transformá-la em **fichas de revisão, flashcards, quizzes, podcasts, textos com lacunas, ilustrações e muito mais**. Tudo impulsionado pelos modelos franceses da Mistral AI, tornando-se uma solução naturalmente adaptada a estudantes francófonos.

O [protótipo inicial](https://github.com/jls42/worldwide-hackathon.mistral.ai) foi concebido em 48 horas durante o hackathon como uma prova de conceito em torno dos serviços da Mistral — já funcional, mas limitado. Desde então, o EurekAI se tornou um projeto real: textos com lacunas, navegação nos exercícios, web scraping, moderação parental configurável, revisão detalhada de código e muito mais. Todo o código é gerado por IA — principalmente pelo [Claude Code](https://code.claude.com/), com algumas contribuições via [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Visão geral

<p align="center">
  <img src="docs/screenshots/eurekai-tour.gif" alt="Tour guiado pelo EurekAI: fontes, ficha, quiz, flashcards, ilustrações" width="820" />
</p>

| | |
|---|---|
| ![Painel de controle](docs/screenshots/dashboard.webp)<br>**Painel de controle** — gerações recentes, custo estimado por card e total do projeto, botão « Auto — Magia! » | ![Fontes](docs/screenshots/sources.webp)<br>**Fontes** — importação de foto/PDF/texto/voz/web, geração em um clique, detecção de instruções |

Cada fonte importada exibe sua [pontuação de confiança do OCR, sua moderação e seu custo estimado](docs/screenshots/sources-list.webp).

### Os componentes em ação

| | |
|---|---|
| ![Ficha de revisão](docs/screenshots/notes.gif)<br>**Ficha de revisão** — pontos-chave, vocabulário, citações com fontes, leitura de áudio por seção | ![Quiz de múltipla escolha](docs/screenshots/quiz.gif)<br>**Quiz de múltipla escolha** — feedback imediato com explicação, navegação passo a passo |
| ![Flashcards](docs/screenshots/flashcards.gif)<br>**Flashcards** — cartão para virar e autoavaliação « eu sabia / eu não sabia » | ![Textos com lacunas](docs/screenshots/fillblank.gif)<br>**Textos com lacunas** — dica sob demanda, validação tolerante |
| ![Ditado](docs/screenshots/dictation.gif)<br>**Ditado** — palavra ditada em áudio, correção estrita letra por letra | ![Quiz por voz](docs/screenshots/vocal-quiz.gif)<br>**Quiz por voz** — pergunta lida em voz alta, resposta pelo microfone |
| ![Podcast](docs/screenshots/podcast.gif)<br>**Podcast** — minipodcast a 2 vozes, roteiro dialogado consultável | ![Ilustrações](docs/screenshots/illustrations.gif)<br>**Ilustrações** — imagens educativas geradas por Agente |
| ![Tutor de IA](docs/screenshots/chat.gif)<br>**Tutor de IA** — chat baseado nos documentos da aula, respostas explicadas, pode gerar quizzes e flashcards | |

### Primeiros passos

| | |
|---|---|
| ![Escolha do perfil](docs/screenshots/login.gif)<br>**Escolha do perfil** — cada criança tem seu espaço, seu avatar e seu idioma | ![Criação de perfil](docs/screenshots/profile-create.gif)<br>**Criação de perfil** — idade, avatar, PIN parental para menores de 15 anos |
| ![Criação de curso](docs/screenshots/course.gif)<br>**Criação de curso** — um projeto por aula, pronto para receber fontes | ![Configurações](docs/screenshots/settings.gif)<br>**Configurações** — status da API, escolha dos modelos de IA com tarifas exibidas |

---

## Funcionalidades

| | Funcionalidade | Descrição |
|---|---|---|
| 📷 | **Importação de arquivos** | Importe suas aulas — foto, PDF (via Mistral OCR com pontuação média de confiança, níveis `high`/`medium`/`low`) ou arquivo de texto (TXT, MD). Sessões de upload com nova tentativa por arquivo e progresso individual |
| 📝 | **Entrada de texto** | Digite ou cole qualquer texto diretamente |
| 🎤 | **Entrada por voz** | Grave áudio — o Voxtral STT transcreve sua voz |
| 🌐 | **Web / URL** | Cole uma URL (scraping direto via Readability + Lightpanda) ou digite uma pesquisa (Agente Mistral web_search) |
| 📄 | **Fichas de revisão** | Notas estruturadas com pontos-chave, vocabulário, citações, curiosidades |
| 🃏 | **Flashcards** | Cartões de P/R interativos, leitura em áudio dialogada |
| ❓ | **Quiz de múltipla escolha** | Questões de múltipla escolha com revisão adaptativa de erros (quantidade configurável) |
| ✏️ | **Textos com lacunas** | Exercícios para preencher lacunas com dicas e validação tolerante |
| 🔤 | **Ditado** | Palavras ditadas em áudio (Voxtral TTS) a partir de uma lista importada, digitação no teclado, correção estrita letra por letra com regra ortográfica explicada |
| 🎙️ | **Podcast** | Minipodcast a 2 vozes em áudio — vozes Mistral padrão ou vozes personalizadas (dos pais!) |
| 🖼️ | **Ilustrações** | Imagens educativas geradas por um Agente Mistral |
| 🗣️ | **Quiz por voz** | Perguntas lidas em voz alta (voz personalizada possível), resposta oral, verificação por IA |
| 💬 | **Tutor de IA** | Chat contextual com seus documentos de aula, com chamada de ferramentas (tool calling) |
| 🧠 | **Roteador automático** | Um roteador baseado no `mistral-small-latest` analisa o conteúdo e sugere uma combinação de geradores entre os 8 tipos disponíveis |
| 🔒 | **Controle parental** | Moderação configurável por perfil (categorias personalizáveis), PIN parental, restrições do chat |
| 🌍 | **Multilíngue** | Interface disponível em 9 idiomas; geração por IA controlável em 15 idiomas por meio dos prompts |
| 🔊 | **Leitura em voz alta** | Ouça as fichas e flashcards (diálogo pergunta/resposta) via Mistral Voxtral TTS |
| 💶 | **Monitoramento de custos da API** | Estimativa transparente do custo em € de cada geração e fonte (tokens / caracteres / páginas / segundos de áudio). Badge por card + total por projeto, visível no painel |
| 🎨 | **Tema por perfil** | Cada perfil escolhe seu tema `dark` ou `light` — persiste ao trocar de perfil |

---

## Visão geral da arquitetura

<p align="center">
  <img src="public/assets/architecture-overview.webp" alt="Visão geral da arquitetura" width="800" />
</p>

---

## Mapeamento de uso dos modelos

<p align="center">
  <img src="public/assets/model-map.webp" alt="Mapeamento de modelos de IA por tarefa" width="800" />
</p>

---

## Jornada do usuário

<p align="center">
  <img src="public/assets/user-journey.webp" alt="Jornada de aprendizagem do aluno" width="800" />
</p>

---

## Aprofundamento — Funcionalidades

### Entrada multimodal

O EurekAI aceita 4 tipos de fontes, moderadas de acordo com o perfil (ativado por padrão para criança e adolescente):

- **Importação de arquivos** — Arquivos JPG, PNG ou PDF processados pelo Mistral OCR — **OCR 4 (`mistral-ocr-4-0`) por padrão** (melhor qualidade), **OCR 3 (`mistral-ocr-2512`) como opção** nas Configurações (mais barato, ~½ do custo) — para texto impresso, tabelas e escrita manual; ou arquivos de texto (TXT, MD) importados diretamente. Os uploads de múltiplos arquivos utilizam um sistema de **sessões de upload**: progresso individual por arquivo, nova tentativa para o arquivo com falha sem reenviar os outros, descarte da sessão quando concluída. O OCR disponibiliza uma **pontuação de confiança** média (`average`, limitada a `[0,1]`, calculada a partir dos `averagePageConfidenceScore` retornados pela Mistral), exibida na interface em forma de badge de nível `high` / `medium` / `low` (limiares ~0.9 / ~0.7) — alerta sem bloquear caso a digitalização seja de baixa qualidade. A cópia do documento enviada à Mistral para o OCR é excluída assim que o processamento termina, mesmo em caso de falha.
- **Texto livre** — Digite ou cole qualquer conteúdo. Moderado antes do armazenamento se a moderação estiver ativa.
- **Entrada por voz** — Grave áudio no navegador. Transcrito pelo `voxtral-mini-latest`. O parâmetro `language="fr"` otimiza o reconhecimento.
- **Web / URL** — Cole uma ou mais URLs para extrair o conteúdo diretamente (Readability + Lightpanda para páginas JS), ou digite palavras-chave para uma pesquisa na web via Agente Mistral. O campo único aceita ambos — URLs e palavras-chave são separadas automaticamente, e cada resultado cria uma fonte independente.

### Geração de conteúdo por IA

Oito tipos de materiais de aprendizagem gerados:

| Gerador | Modelo | Saída |
|---|---|---|
| **Ficha de revisão** | `mistral-large-latest` | Título, resumo, pontos-chave, vocabulário, citações, curiosidade |
| **Flashcards** | `mistral-large-latest` | Cartões de P/R com referências às fontes (quantidade configurável) |
| **Quiz de múltipla escolha** | `mistral-large-latest` | Questões de múltipla escolha, explicações, revisão adaptativa (quantidade configurável) |
| **Textos com lacunas** | `mistral-large-latest` | Frases para preencher com dicas, validação tolerante (Levenshtein) |
| **Ditado** | `mistral-large-latest` + Voxtral TTS | Palavras-chave ditadas em áudio (1 MP3/palavra) → digitação no teclado → correção estrita (acentos) com regra explicada |
| **Podcast** | `mistral-large-latest` + Voxtral TTS | Roteiro a 2 vozes → áudio MP3 |
| **Ilustração** | Agente `mistral-large-latest` | Imagem educativa por meio da ferramenta `image_generation` |
| **Quiz por voz** | `mistral-large-latest` + Voxtral TTS + STT | Perguntas em TTS → resposta em STT → verificação por IA |

### Tutor de IA por chat

Um tutor conversacional com acesso completo aos documentos da aula:

- Utiliza o `mistral-large-latest`
- **Chamada de ferramentas** (tool calling): pode gerar fichas, flashcards, quizzes ou textos com lacunas durante a conversa
- Histórico de 50 mensagens por curso
- Moderação se estiver ativada para o perfil: a mensagem é verificada, e as fontes sinalizadas, com erro ou ainda não verificadas são excluídas tanto do contexto quanto das ferramentas (a verificação delas é reiniciada previamente, por no máximo 5 s)

### Roteador automático

O roteador utiliza o `mistral-small-latest` para analisar o conteúdo das fontes e sugerir os geradores mais pertinentes entre os 8 disponíveis. A interface exibe o progresso em tempo real: primeiro uma fase de análise e, em seguida, as gerações individuais com possibilidade de cancelamento.

### Aprendizagem adaptativa

- **Estatísticas de quiz**: acompanhamento de tentativas e precisão por questão
- **Revisão de quiz**: gera de 5 a 10 novas questões focadas nos conceitos fracos, a partir das fontes do quiz original (o controle de moderação se aplica a essas mesmas fontes)
- **Detecção de instruções**: detecta as instruções de revisão ("Sei a minha lição se souber...") e as prioriza nos geradores textuais compatíveis (ficha, flashcards, quiz, textos com lacunas). Com a moderação ativa, a detecção aguarda a verificação das fontes e lê apenas aquelas consideradas seguras; a instrução mantém a lista de suas fontes de origem, não sendo exibida nem aplicada se uma delas for sinalizada, e desaparece junto com ela. Seu custo é contabilizado

### Segurança e controle parental

- **4 faixas etárias**: criança (≤10 anos), adolescente (11-15), estudante (16-25), adulto (26+)
- **Moderação de conteúdo**: `mistral-moderation-2603` (Mistral Moderation 2) com 11 categorias disponíveis, 6 bloqueadas por padrão para novos perfis de criança/adolescente (`sexual`, `hate_and_discrimination`, `violence_and_threats`, `criminal`, `selfharm`, `jailbreaking`; `criminal` adicionado após uma avaliação em 50 lições, incluindo história, sem nenhum falso positivo). Categorias personalizáveis por perfil nas configurações; o Moderation 2 dividiu a antiga categoria «conteúdo perigoso» em `dangerous` + `criminal` (os perfis existentes são migrados automaticamente, e as categorias bloqueadas também se aplicam a fontes já importadas). Segurança por padrão: se a resposta do modelo não permitir verificar uma categoria bloqueada, o conteúdo é recusado («Moderação indisponível»); com a moderação ativa, tanto a geração quanto o chat descartam fontes sinalizadas, em erro ou em processo de verificação. Uma fonte nunca verificada (importada com moderação desativada, projeto antigo vinculado) é verificada antes do uso; uma moderação interrompida por reinicialização ou que tenha entrado em erro é retomada automaticamente (na inicialização se a chave do servidor permitir, caso contrário na abertura do projeto ou na próxima geração), e um botão «Verificar de novo» a reinicia sob demanda. O conteúdo de uma fonte sinalizada ou em processo de verificação fica oculto para a criança (pré-visualização, texto, documento original); os pais podem exibi-lo com seu PIN durante a consulta. A resposta oral do quiz por voz é moderada antes de ser verificada. ID datado fixado em `helpers/moderation-model.ts`: o alias `-latest`, descontinuado, não é mais listado pela API.
- **PIN parental**: hash SHA-256, obrigatório para perfis com menos de 15 anos; no máximo 10 códigos incorretos a cada 15 minutos por endereço IP (429 `rate_limited`). Para uma implantação em produção, preveja um hash lento com sal (Argon2id, bcrypt).
- **Dados do servidor**: o `/output` expõe apenas as mídias dos projetos (áudios, imagens, arquivos importados); o `profiles.json`, o `config.json` e os arquivos dos projetos nunca são disponibilizados
- **Restrições do chat**: chat com IA desativado por padrão para menores de 16 anos, podendo ser ativado pelos pais

### Sistema de múltiplos perfis

- Múltiplos perfis com nome, idade, avatar, preferências de idioma
- **Vozes por perfil** (`Profile.mistralVoices?: { host?, guest? }` — cada função é opcional) — cada criança pode ter seu próprio par de vozes para podcast/quiz por voz
- **Tema por perfil** (`Profile.theme: 'dark' | 'light'`) — alternância automática ao mudar de perfil, persistida no backend
- Projetos vinculados a perfis via `profileId`; um projeto antigo sem perfil é associado ao primeiro perfil que o abrir e, em seguida, moderado de acordo com esse perfil
- Exclusão em cascata: excluir um perfil remove todos os seus projetos

### Monitoramento de custos da API

Cada chamada Mistral faturável (chat, OCR, STT, TTS, agentes), incluindo detecção de instruções e respostas orais do quiz por voz, é instrumentada para fornecer uma estimativa em € **transparente** ao usuário. A moderação, gratuita, não é contabilizada. Os custos de ferramentas dos agentes estão incluídos: US$ 0,03 por busca web e US$ 0,10 por imagem gerada (tarifas Mistral), além dos tokens produzidos por essas ferramentas, contabilizados pela tarifa de entrada do modelo do agente.

- **Fonte da verdade**: `helpers/pricing.ts` — `MODEL_PRICING` por prefixo de modelo (ex.: `mistral-large` → entrada 0,5 €/M tokens, saída 1,5 €/M tokens), `PRICING_SOURCES` com URLs da doc Mistral para re-scraping periódico
- **Unidades suportadas**: `tokens`, `characters` (TTS), `pages` (OCR), `audio-seconds` (STT) — conversão orientada por `helpers/cost-calc.ts`
- **Cadeia de instrumentação**: `helpers/tracked-client.ts` (wrapper do cliente Mistral) → `helpers/usage-context.ts` (AsyncLocalStorage) → `helpers/cost-calc.ts` → `helpers/cost-persist.ts` → `helpers/cost-middleware.ts` (injeção na resposta HTTP)
- **UI**: badge de custo por geração (`src/partials/cost-badge-gen.html`), por fonte (`cost-badge-src.html`), total acumulado no dashboard (`Project.totalCost`)
- **Endpoints**: as respostas `/generate/*` e `/sources/*` decoram o objeto retornado (Generation / Source) com `estimatedCost`, `usage` e `costBreakdown`. `POST /generate/route` adiciona um campo `costDelta: number` para o custo apenas do roteamento; `POST /detect-consigne` (`{consigne, costDelta}`) e a verificação de uma resposta oral também retornam seu `costDelta`. `GET /projects/:pid` retorna o projeto enriquecido com `totalCost` (soma calculada a partir de `costLog[]`) + o histórico completo

### TTS (Mistral Voxtral) & vozes personalizadas

- **Mistral Voxtral TTS**: `voxtral-mini-tts-latest`, síntese de voz 100% Mistral, nenhuma chave adicional necessária
- **Vozes personalizadas**: os pais podem criar suas próprias vozes via API Mistral Voices (a partir de uma amostra de áudio) e atribuí-las às funções de apresentador/convidado — os podcasts e quizzes por voz passam a ser lidos com a voz de um dos pais, tornando a experiência ainda mais imersiva para a criança
- Duas funções vocais configuráveis: **apresentador** (narrador principal) e **convidado** (segunda voz do podcast)
- Catálogo completo de vozes Mistral disponível nas configurações, filtrável por idioma

### Internacionalização

- Interface disponível em 9 idiomas: fr, en, es, pt, it, nl, de, hi, ar
- Prompts de IA suportam 15 idiomas (fr, en, es, de, it, pt, nl, ja, zh, ko, ar, hi, pl, ro, sv)
- Idioma configurável por perfil

---

## Stack técnica

| Camada | Tecnologia | Papel |
|---|---|---|
| **Runtime** | Node.js + TypeScript 6.x | Servidor e type safety |
| **Backend** | Express 5.x | API REST |
| **Servidor de dev** | Vite 8.x (Rolldown) + tsx | HMR, partials Handlebars, proxy |
| **Frontend** | HTML + TailwindCSS 4.x + Alpine.js 3.x | Interface reativa, TypeScript compilado pelo Vite |
| **Templating** | vite-plugin-handlebars | Composição HTML via partials |
| **IA** | Mistral AI SDK 2.x | Chat, OCR, STT, TTS, Agentes, Moderação |
| **TTS** | Mistral Voxtral TTS | `voxtral-mini-tts-latest`, síntese de voz integrada |
| **Ícones** | Lucide 1.x | Biblioteca de ícones SVG |
| **Scraping web** | Readability + linkedom | Extração do conteúdo principal de páginas web (tecnologia Firefox Reader View) |
| **Headless browser** | Lightpanda | Navegador headless ultraleve (Zig + V8) para páginas JS/SPA — fallback de scraping |
| **Markdown** | Marked | Renderização de markdown no chat |
| **Upload de arquivos** | Multer 2.x | Gerenciamento de formulários multipart |
| **Áudio** | ffmpeg-static | Concatenação de segmentos de áudio |
| **Testes** | Vitest | Testes unitários — cobertura medida pelo SonarCloud |
| **Persistência** | Arquivos JSON | Armazenamento sem dependências |

---

## Referência dos modelos

| Modelo | Uso | Por quê |
|---|---|---|
| `mistral-large-latest` | Ficha de revisão, Flashcards, Podcast, Quiz, Textos com lacunas, Chat, Verificação de quiz por voz, Agente de Imagem, Agente de Web Search, Detecção de instruções | Melhor multilíngue + seguimento de instruções |
| `mistral-ocr-4-0` (OCR 4, padrão) | OCR de documentos — qualidade superior | Texto impresso, tabelas, escrita manual (US$ 4 / 1.000 páginas) |
| `mistral-ocr-2512` (OCR 3, opcional) | OCR de documentos | Selecionável nas Configurações, mais econômico (US$ 2 / 1.000 páginas) |
| `voxtral-mini-latest` | Reconhecimento de voz (STT) | STT multilíngue, otimizado com `language="fr"` |
| `voxtral-mini-tts-latest` | Síntese de voz (TTS) | Podcasts, quiz por voz, leitura em voz alta |
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

> **Nota**: Mistral Voxtral TTS é o único provedor de TTS — nenhuma chave adicional é necessária além de `MISTRAL_API_KEY`.

> **Chave de API inserida pelo usuário**: `MISTRAL_API_KEY` agora é **opcional**. Se estiver ausente, o app inicia normalmente e solicita a cada usuário que insira **sua própria chave Mistral** na interface. A chave é **armazenada no navegador** (criptografada via Web Crypto + IndexedDB em contexto seguro) e enviada por requisição — **nunca persistida no servidor**. Precedência: chave do perfil > chave global do navegador > `MISTRAL_API_KEY` (env). Definir `EUREKAI_REQUIRE_USER_KEY=true` obriga cada usuário a fornecer sua própria chave (a chave de ambiente passa a servir apenas para pré-carregamentos).

> **HTTPS local (tablet/LAN)**: `localhost` já é um contexto seguro. Para acesso via LAN (tablet), gere um certificado local e ative o HTTPS para desbloquear a criptografia no navegador + criptografar a chave em trânsito:
> ```bash
> ./scripts/gen-cert.sh 192.168.1.42   # mkcert se disponível, caso contrário openssl self-signed
> export HTTPS_KEY=certs/key.pem HTTPS_CERT=certs/cert.pem
> npm run dev                          # Express + Vite em HTTPS
> ```

### Variáveis de ambiente

| Variável | Obrigatório | Padrão | Papel |
|---|---|---|---|
| `MISTRAL_API_KEY` | opcional | — | Chave de API Mistral (chat, OCR, STT, TTS Voxtral, agentes, moderação). Se ausente, o usuário insere sua chave no app (armazenada no navegador, nunca no servidor) |
| `EUREKAI_REQUIRE_USER_KEY` | opcional | `false` | `true` → desativa o fallback para `MISTRAL_API_KEY` nas requisições de IA (cada usuário DEVE fornecer sua chave). Útil em instâncias expostas |
| `HTTPS_KEY` / `HTTPS_CERT` | opcional | — | Caminhos de chave/cert TLS (consulte `scripts/gen-cert.sh`) → Express e Vite servem em HTTPS (contexto seguro LAN/tablet) |
| `PORT` | opcional | `3000` | Porta HTTP do backend Express |
| `NODE_ENV` | opcional | `development` | Se `production` → Express serve o frontend a partir de `dist/` (caso contrário, `public/`) |
| `SONAR_TOKEN` | opcional CI | — | Utilizado apenas pelo workflow SonarCloud do GitHub Actions |

### Testes, qualidade de código e contribuição

```bash
npm test                # vitest (déclenche pretest : typecheck + lint:complexity + lint:ci + lint:deadcode)
npm run test:coverage   # couverture vitest
npm run lint            # ESLint + typescript-eslint + sonarjs
npm run lint:fix        # auto-fix
npm run format          # prettier
npm run security        # Opengrep (SAST local) — bloque sur finding ERROR
```

**Git Hooks (Husky)**: `pre-commit` encadeia `scripts/pre-commit-fast.sh` (conflitos, arquivos grandes, shellcheck), `lint-staged` e depois `npm test`; `pre-push` executa primeiro um gate `npm audit` (bloqueia em caso de vulnerabilidade crítica transitiva, consulte `scripts/audit-verdict.mjs`) e depois `npm run security`. Todos bloqueiam o commit/push em caso de falha.

**Ferramentas externas necessárias (opcionais, mas usadas por `pretest` / `npm run security`)**:

```bash
# Lizard (Python) pour lint:complexity (CCN > 8 sur l'allowlist)
pipx install lizard          # ou : pipx run lizard

# Opengrep (binaire standalone ~40 Mo) pour npm run security
./scripts/install-opengrep.sh   # installe dans ~/.local/bin/
```

Sem essas ferramentas, `npm test` falha em `pretest` (lizard ausente) e `npm run security` falha (opengrep ausente). Os hooks do husky bloquearão o commit/push nesses casos.

---

## Implantação com contêiner

A imagem está publicada no **GitHub Container Registry**:

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

> **`:U`** é uma flag do Podman rootless que ajusta automaticamente as permissões do volume.

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

> **Para contribuidores de IA**: consulte [`CLAUDE.md`](CLAUDE.md) para o contexto detalhado de arquitetura, as regras obrigatórias (anti-leak de prompts, códigos de erro, rastreamento de custos) e as armadilhas conhecidas (Lizard CCN, Opengrep, migração Codacy/Semgrep).

---

## Referência da API

### Config
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/config` | Configuração atual |
| `PUT` | `/api/config` | Modificar a configuração (modelos, vozes, modelo TTS) |
| `GET` | `/api/config/status` | Status das APIs: `mistral` (chave Mistral definida), `ttsAvailable` (alias de `mistral`, Mistral Voxtral é o único provedor TTS) |
| `POST` | `/api/config/reset` | Redefinir a configuração para o padrão |
| `GET` | `/api/config/voices` | Listar vozes do Mistral TTS (opcional `?lang=fr`) |
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
| `GET` | `/api/projects` | Listar projetos (`?profileId=` opcional) |
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
| `POST` | `/api/projects/:pid/sources/websearch` | Scraping de URL ou busca web `{query}` — retorna um array de fontes; 422 `url_blocked` se todos os endereços forem recusados (rede interna), 502 `all_sources_failed` se nenhuma fonte puder ser criada |
| `POST` | `/api/projects/:pid/sources/moderate` | Retomar moderações pendentes ou com erro `{sourceIds?}` (no máximo 10 por chamada, espera ≤ 10 s) → `{sources: [{id, moderation}]}` |
| `DELETE` | `/api/projects/:pid/sources/:sid` | Excluir uma fonte, seu arquivo importado e a instrução associada → `{ok, consigne}` |
| `POST` | `/api/projects/:pid/moderate` | Moderar `{text}` |
| `POST` | `/api/projects/:pid/detect-consigne` | Detectar instruções de estudo (apenas fontes verificadas) → `{consigne, costDelta}` |

### Geração
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generate/summary` | Ficha de revisão |
| `POST` | `/api/projects/:pid/generate/flashcards` | Flashcards |
| `POST` | `/api/projects/:pid/generate/quiz` | Quiz de múltipla escolha |
| `POST` | `/api/projects/:pid/generate/fill-blank` | Textos com lacunas |
| `POST` | `/api/projects/:pid/generate/dictation` | Ditado (palavras + frases de exemplo + regras, 1 áudio TTS por palavra; também sugerido pelo auto-router) |
| `POST` | `/api/projects/:pid/generate/podcast` | Podcast |
| `POST` | `/api/projects/:pid/generate/image` | Ilustração |
| `POST` | `/api/projects/:pid/generate/quiz-vocal` | Quiz por voz |
| `POST` | `/api/projects/:pid/generate/quiz-review` | Revisão adaptativa `{generationId, weakQuestions}` |
| `POST` | `/api/projects/:pid/generate/remediation-summary` | Ficha de reforço direcionada às questões erradas de um quiz `{generationId, weakQuestions}` — chamada em paralelo a `quiz-review` pelo botão «Praticar os meus erros» |
| `POST` | `/api/projects/:pid/generate/route` | Análise de roteamento (plano dos geradores a executar) — retorna `{plan, costDelta}` (custo apenas do roteamento) |
| `POST` | `/api/projects/:pid/generate/auto` | Geração automática no backend (roteamento + 8 tipos: summary, flashcards, quiz, fill-blank, podcast, quiz-vocal, image, dictation). Execução em paralelo — supõe um tier Mistral com rate-limit ≥ 8 requisições simultâneas; caso contrário, múltiplos 429 podem ser retornados em `failedSteps`. |

Todas as rotas de geração aceitam `{sourceIds?, lang?, ageGroup?, count?, useConsigne?}`; um `lang` que não seja um código de idioma (ex.: `pt-BR`) ou um `ageGroup` desconhecido → 400 `invalid_input`, antes de qualquer chamada de IA. `quiz-review` e `remediation-summary` exigem adicionalmente `{generationId, weakQuestions}` e operam sobre as fontes do quiz de origem.

### CRUD Gerações
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/projects/:pid/generations/:gid/quiz-attempt` | Enviar respostas do quiz `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/fill-blank-attempt` | Enviar respostas dos textos com lacunas `{answers}` |
| `POST` | `/api/projects/:pid/generations/:gid/dictation-attempt` | Enviar respostas do ditado `{answers}` (pontuação estrita no servidor) |
| `POST` | `/api/projects/:pid/generations/:gid/vocal-answer` | Verificar uma resposta oral (áudio + questionIndex); resposta moderada (400 `quiz.answerBlocked`), custo retornado em `costDelta` |
| `POST` | `/api/projects/:pid/generations/:gid/read-aloud` | Leitura TTS em voz alta (fichas/flashcards) |
| `POST` | `/api/projects/:pid/generations/:gid/cancel` | Cancelar uma geração em andamento (única forma de cancelar um status pendente) |
| `PUT` | `/api/projects/:pid/generations/:gid` | Renomear `{title}` |
| `DELETE` | `/api/projects/:pid/generations/:gid` | Excluir a geração e suas mídias associadas (áudio, imagem) |

### Chat
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/projects/:pid/chat` | Recuperar o histórico do chat |
| `POST` | `/api/projects/:pid/chat` | Enviar uma mensagem `{message, lang, ageGroup, useConsigne?}` |
| `DELETE` | `/api/projects/:pid/chat` | Limpar o histórico do chat |

---

## Decisões arquiteturais

| Decisão | Justificativa |
|---|---|
| **Alpine.js em vez de React/Vue** | Menor overhead, reatividade leve com TypeScript compilado pelo Vite. Perfeito para um hackathon onde a velocidade importa. |
| **Persistência em arquivos JSON** | Zero dependências, inicialização instantânea. Nenhum banco de dados para configurar — basta iniciar e usar. |
| **Vite + Handlebars** | O melhor dos dois mundos: HMR rápido para desenvolvimento, partials HTML para organização do código, Tailwind JIT. |
| **Prompts centralizados** | Todos os prompts de IA em `prompts.ts` — fácil de iterar, testar e adaptar por idioma/faixa etária. |
| **Sistema multigeração** | Cada geração é um objeto independente com seu próprio ID — permite múltiplas fichas, quizzes, etc. por curso. |
| **Prompts adaptados por idade** | 4 faixas etárias com vocabulário, complexidade e tom diferenciados — o mesmo conteúdo ensina de forma diferente conforme o estudante. |
| **Funcionalidades baseadas em Agentes** | A geração de imagens e a busca web utilizam Agentes Mistral temporários — ciclo de vida limpo com desalocação automática. |
| **Scraping inteligente de URLs** | Um campo único aceita URLs e palavras-chave combinadas — as URLs passam por scraping via Readability (páginas estáticas) com fallback para Lightpanda (páginas JS/SPA), enquanto as palavras-chave acionam um Agente Mistral web_search. Cada resultado gera uma fonte independente. |
| **TTS 100% Mistral** | Mistral Voxtral TTS (nenhuma chave adicional além de `MISTRAL_API_KEY`) — síntese de voz integrada ao rastreamento de custos e à resolução de vozes por idioma. |

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
- **[Luciole](https://luciole-vision.com)** — Fonte projetada para leitores com deficiência visual, © Laurent Bourcellier & Jonathan Perez, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (opção « Conforto de leitura » dos perfis)

Iniciado durante o Mistral AI Worldwide Hackathon (março de 2026), desenvolvido integralmente por IA com [Claude Code](https://code.claude.com/), [Codex](https://openai.com/codex/) e [Gemini CLI](https://geminicli.com/).

---

## Autor

**Julien LS** — [contact@jls42.org](mailto:contact@jls42.org)

## Licença

[AGPL-3.0](LICENSE) — Copyright (C) 2026 Julien LS

**Artigo traduzido do fr para o pt com gemini-3.8-flash-medium.**
