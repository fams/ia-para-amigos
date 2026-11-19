---
theme: none
title: IA para amigos
info: Esqueleto de um curso visual, dos fundamentos à construção de agentes.
author: ""
download: false
wakeLock: false
exportFilename: ia-para-amigos
colorSchema: dark
transition: fade
mdc: true
fonts:
  sans: Arial
  mono: monospace
  provider: none
drawings:
  persist: false
defaults:
  layout: default
---

<div class="eyebrow">Um curso para experimentar, entender e construir</div>

# IA para amigos
## Das probabilidades aos agentes

<div class="hero-path"><span>Entender</span><b>→</b><span>Experimentar</span><b>→</b><span>Construir</span></div>

<div class="edition">Esqueleto v0.1 · Conteúdo e demonstrações em desenvolvimento</div>

---
layout: default
---

<div class="eyebrow">O destino</div>

# Construir algo que ajude você

Não precisamos virar especialistas em redes neurais.<br>
Precisamos entender o suficiente para **delegar, verificar e controlar**.

<div class="cards three">
<div><b>Pesquisa</b><p>Organizar evidências e formular perguntas melhores.</p></div>
<div><b>Trabalho</b><p>Transformar uma necessidade em um processo verificável.</p></div>
<div><b>Criação</b><p>Construir pequenos softwares e parceiros de exploração.</p></div>
</div>

---

<div class="eyebrow">Mapa do percurso</div>

# Os fundamentos servem à prática

<ConceptSteps :labels="['Probabilidade', 'Aprendizado', 'Linguagem', 'Contexto', 'Agentes']" />

<div class="note">O ritmo é do professor. Cada etapa pode ser aprofundada sem perder o destino: construir agentes.</div>

---

<div class="eyebrow">01 · Probabilidade e informação</div>

# Como prever o próximo passo?

<div class="cards three">
<div><b>Markov</b><p>Dependência entre estados e sequências.</p></div>
<div><b>Monte Carlo</b><p>Usar amostras para explorar possibilidades.</p></div>
<div><b>Shannon</b><p>Incerteza, informação e compressão.</p></div>
</div>

<div class="pending">Visual planejado: sequência de estados → amostragem → mensagem comprimida.</div>

---

<div class="eyebrow markov-eyebrow">1902 → 1906 · A pergunta</div>

# Os resultados precisam ser independentes?

<div class="markov-timeline">
  <div><span>1902 · NEKRASOV</span><b>Independência era necessária?</b><p>Nekrasov defendia que, para a lei dos grandes números funcionar, os resultados precisavam ser independentes.</p></div>
  <div><span>1906 · MARKOV</span><b>Não para toda sequência.</b><p>Markov mostrou que, em certas sequências dependentes, as médias também podem se estabilizar.</p></div>
</div>

<div class="note">Dependência não impede regularidade. Em seguida, Markov procurou um exemplo na literatura.</div>

<div class="markov-source"><a href="https://doi.org/10.1016/j.laa.2003.12.041">Fonte histórica: Basharin, Langville e Naumov (2004)</a></div>

<!-- Por independentes, entenda que saber um resultado não altera as chances do outro. Num jogo de moedas ideal isso pode ser razoável; numa sequência de letras, é uma questão empírica. Não diga que dependência garante a lei dos grandes números. -->

---

<div class="eyebrow markov-eyebrow">1913 · O experimento com Pushkin</div>

# A próxima letra depende da anterior?

Em *Evguêni Oniéguin*, Markov marcou **20.000 letras** como vogais ou consoantes.

<div class="markov-history-chart">
  <div class="markov-key"><span>■ Vogal</span><span>■ Consoante</span></div>
  <div class="markov-history-row"><b>Depois de vogal</b><div class="markov-history-track" role="img" aria-label="Depois de vogal, cerca de 12,8% de vogais"><i style="width:12.8%"></i><em style="width:87.2%"></em></div></div>
  <div class="markov-history-row"><b>Depois de consoante</b><div class="markov-history-track" role="img" aria-label="Depois de consoante, cerca de 66,3% de vogais"><i style="width:66.3%"></i><em style="width:33.7%"></em></div></div>
</div>

<div class="note">A letra anterior muda bastante as chances. E se fizermos a contagem com <i>Os Sertões</i>?</div>

<div class="markov-source"><a href="https://doi.org/10.1017/S0269889706001074">Fonte: Markov (1913), tradução do texto original</a></div>

<!-- Nota de apresentação: cerca de 12,8% de vogais depois de uma vogal, contra 66,3% depois de uma consoante. Duas barras de igual largura, cada uma com o próprio denominador. A contagem histórica é no trecho russo; a demonstração seguinte usa pares e trincas de letras internas a palavras de Os Sertões. Os recortes não são diretamente comparáveis. -->

---

# Que letra cai na faixa?

<MarkovRuler />

<!-- Peça um inteiro de 1 a 1.000. Mostre as faixas antes de aplicar. Começando em A, 787, 854, 147, 868 reproduzem ASTAS se usar a letra sorteada em cada passo. -->

---

# E se olharmos duas letras?

<MarkovRuler trigram />

<!-- Compare QU e OU e peça à turma para aplicar o mesmo número nos dois casos. As frequências são de trincas dentro de cada palavra. Não há palpite para um contexto sem observações. -->

---

# Monte Carlo: aprender com muitas tentativas

<div class="visual-equation"><span>Possibilidades</span><b>→</b><span>Amostras</span><b>→</b><span>Estimativa</span></div>

<div class="note">Repetir uma simulação ajuda a estimar resultados. Não torna qualquer conclusão verdadeira.</div>

<div class="pending">Planejado: experimento visual controlado pelo professor e narrativa histórica de Ulam e von Neumann, com referência verificada.</div>

---

# Shannon: o que surpreende informa

<div class="cards two">
<div><b>Mensagem previsível</b><p>Podemos explorar regularidades para representá-la de forma mais compacta.</p></div>
<div><b>Mensagem inesperada</b><p>Exige mais informação para distinguir o que aconteceu.</p></div>
</div>

<div class="note">Compressão e previsão serão uma ponte conceitual. “Comprimir é inteligência” não será tratado como equivalência demonstrada.</div>

<div class="pending">Planejado: animação de compressão e surpresa, com matemática visual.</div>

---

<div class="eyebrow">02 · Aprender padrões</div>

# Regras escritas ou padrões aprendidos?

<div class="cards two">
<div><b>IA simbólica</b><p>Representações explícitas e regras de manipulação.</p></div>
<div><b>IA neural</b><p>Parâmetros ajustados a partir de exemplos e objetivos.</p></div>
</div>

<div class="note">Um único desvio: linguagem, Chomsky e Skinner. Comparar perguntas e limites sem tratar o sucesso de LLMs como refutação automática de uma teoria.</div>

---

# Um neurônio artificial, por dentro

<div class="visual-equation"><span>Entradas × pesos</span><b>+</b><span>Viés</span><b>→</b><span>Saída</span></div>

<MicroNeuron />

<div class="note">Este brinquedo calcula uma soma ponderada e uma decisão por limiar. Ainda não há treinamento nem jogo.</div>

---

# Primeiro laboratório: uma micro-rede no Flappy

<div class="cards three">
<div><b>Observar</b><p>Posição, distância e movimento como entradas.</p></div>
<div><b>Ajustar</b><p>Alterar pesos à mão e ver a decisão mudar.</p></div>
<div><b>Comparar</b><p>Jogar, pausar, avançar um passo e repetir.</p></div>
</div>

<div class="pending">Espaço reservado. O protótipo do jogo não está incluído nesta versão. Integração e validação visual serão etapas próprias.</div>

---

# Backpropagation: atribuir o erro

<ConceptSteps :labels="['Prever', 'Medir erro', 'Calcular gradientes', 'Ajustar pesos', 'Repetir']" />

<div class="note">Backpropagation calcula como os parâmetros contribuem para o erro; o otimizador usa essa informação para atualizá-los.</div>

<div class="pending">Planejado: uma rede minúscula, erros visíveis e animação passo a passo, antes do MNIST.</div>

---

# Depois: aprender a reconhecer números

<div class="digit-row">0 1 2 3 4 5 6 7 8 9</div>

<div class="cards two">
<div><b>Ao vivo</b><p>Exemplos → treinamento → previsões → erros que podemos inspecionar.</p></div>
<div><b>Para explorar depois</b><p>Notebook Jupyter completo, com execução curta e instruções claras.</p></div>
</div>

<div class="pending">MNIST e notebook ainda não incluídos. Nenhum resultado de treinamento é apresentado como concluído.</div>

---

# Da visão à linguagem

<div class="visual-equation"><span>LeNet</span><b>→</b><span>AlexNet</span><b>→</b><span>Redes para sequências</span></div>

<div class="note">São marcos para conectar ideias, não uma árvore genealógica única. Reconhecer padrões visuais prepara a intuição para aprender representações.</div>

<div class="pending">Linha do tempo e imagens ainda em produção. Convolução fica fora do percurso principal.</div>

---

<div class="eyebrow">03 · Representar e gerar linguagem</div>

# Uma RNN lê em sequência

<ConceptSteps :labels="['Uma palavra', 'Estado atualizado', 'Próxima palavra', 'Novo estado']" />

<div class="cards two">
<div><b>A ideia</b><p>Carregar um estado enquanto a sequência é processada.</p></div>
<div><b>A pergunta</b><p>Como relacionar partes distantes sem depender apenas desse percurso?</p></div>
</div>

---

# Embeddings: representar por coordenadas

<div class="cards two">
<div><b>Definição</b><p>Uma representação numérica de um item em um espaço vetorial.</p></div>
<div><b>Intuição visual</b><p>Um mapa em que relações aprendidas podem aparecer como proximidades e direções.</p></div>
</div>

<div class="pending">Planejado: mapa manipulável em 2D/3D. Projeções serão identificadas como simplificações, não o espaço real completo.</div>

---

# Transformer: relacionar partes do contexto

<div class="visual-equation"><span>Tokens</span><b>↔</b><span>Atenção ao contexto</span><b>→</b><span>Representações</span></div>

<div class="note">O foco é a interação entre partes da sequência e a diferença em relação à recorrência. Sem derivar query, key e value.</div>

<div class="pending">Diagrama original da arquitetura e animação em desenvolvimento. “Attention Is All You Need” será citado como título, sem reproduzir material de terceiros.</div>

---

# De representações a um texto novo

<ConceptSteps :labels="['Contexto', 'Probabilidades', 'Próximo token', 'Contexto ampliado']" />

<div class="cards two">
<div><b>BERT e GPT</b><p>Comparar objetivos e usos sem transformar nomes em uma lista de marcas.</p></div>
<div><b>Gerar não é verificar</b><p>Um texto plausível ainda precisa de evidências e testes.</p></div>
</div>

---

# Como um modelo é preparado?

<div class="cards three">
<div><b>Pré-treinamento</b><p>Aprender regularidades em grandes conjuntos de dados.</p></div>
<div><b>Fine-tuning</b><p>Ajustar o comportamento com dados e objetivos específicos.</p></div>
<div><b>RLHF / RLVR</b><p>Explorar sinais de preferências humanas ou recompensas verificáveis.</p></div>
</div>

<div class="note">Recompensa não equivale a verdade universal. Verificadores, ambientes e “modelos de mundo” precisam ser distinguidos.</div>

---

<div class="eyebrow">04 · Preparar o trabalho do modelo</div>

# Primeiro degrau: engenharia de prompt

<div class="visual-equation"><span>Objetivo</span><b>+</b><span>Instruções</span><b>+</b><span>Critério de sucesso</span></div>

<div class="pending">Demonstração planejada: transformar um pedido vago em um pedido testável, sem fórmulas mágicas.</div>

---

# Segundo degrau: engenharia de contexto

<div class="cards three">
<div><b>Selecionar</b><p>Que evidências e instruções realmente importam?</p></div>
<div><b>Organizar</b><p>O que entra agora, o que fica de fora e de onde veio?</p></div>
<div><b>Atualizar</b><p>Como incorporar resultados, memória e limites?</p></div>
</div>

<div class="note">RAG, ferramentas e memória ajudam a compor o contexto. Não se resumem a escrever um prompt maior.</div>

---

# RAG: recuperar antes de responder

<ConceptSteps :labels="['Pergunta', 'Buscar fontes', 'Selecionar trechos', 'Responder com evidências']" />

<div class="note">Recuperar um trecho não garante que ele seja relevante, correto ou suficiente. Fonte e resposta precisam ser verificadas.</div>

<div class="pending">Laboratório planejado com documentos públicos ou fictícios, nunca dados pessoais reais.</div>

---

# Tools: do texto para uma ação

<div class="visual-equation"><span>Solicitação</span><b>→</b><span>Ferramenta autorizada</span><b>→</b><span>Resultado observado</span></div>

<div class="cards two">
<div><b>Contrato</b><p>Entradas, saída esperada, erros e efeitos.</p></div>
<div><b>Limites</b><p>Permissões, validação, custo e confirmação antes de ações sensíveis.</p></div>
</div>

---

# MCP: uma conexão padronizada

<div class="visual-equation"><span>Aplicação</span><b>↔</b><span>Protocolo</span><b>↔</b><span>Serviço / ferramenta</span></div>

<div class="note">MCP ajuda a integrar capacidades. Não é o agente e não substitui autorização, avaliação ou desenho do processo.</div>

<div class="pending">Diagrama e exemplo original serão desenvolvidos após a explicação de tools.</div>

---

<div class="eyebrow">05 · O foco do curso</div>

# Agente não é só uma conversa

<div class="cards two">
<div><b>Workflow</b><p>Um caminho definido previamente coordena as etapas.</p></div>
<div><b>Agente</b><p>O sistema decide próximos passos dentro de objetivos, ferramentas e limites.</p></div>
</div>

<div class="note">A autonomia é uma escolha de projeto, não uma medalha. Muitas tarefas pedem um fluxo simples.</div>

---

# O loop: agir, observar, decidir

<ConceptSteps :labels="['Objetivo', 'Decisão', 'Ação autorizada', 'Observação', 'Continuar ou parar']" />

<div class="note">Uma tentativa só termina quando há resultado observado ou uma condição clara de parada.</div>

---

# Memória não é uma caixa única

<div class="cards three">
<div><b>Episódica</b><p>O que aconteceu em uma experiência.</p></div>
<div><b>Semântica</b><p>Fatos e conhecimentos organizados.</p></div>
<div><b>Procedural</b><p>Como executar uma tarefa.</p></div>
</div>

<div class="note">São categorias úteis de projeto. É preciso definir validade, origem, revisão e remoção do que se guarda.</div>

---

# Quanto mais tempo, mais controle

<div class="cards two">
<div><b>Riscos acumulados</b><p>Desvio de objetivo, erro propagado, contexto contaminado e custo crescente.</p></div>
<div><b>Controles explícitos</b><p>Orçamento, checkpoints, observabilidade, permissões mínimas e intervenção humana.</p></div>
</div>

<div class="pending">Experimento planejado: interromper, corrigir e retomar uma execução sem perder o objetivo.</div>

---

<div class="eyebrow">06 · Construir de verdade</div>

# Da necessidade à especificação

<ConceptSteps :labels="['Problema real', 'Entradas e saídas', 'Ferramentas', 'Critérios de sucesso', 'Limites']" />

<div class="note">Antes da plataforma: o que o agente pode fazer, o que nunca pode fazer e como saberemos se funcionou?</div>

---

# Construir, testar, observar

<div class="cards three">
<div><b>Implementar</b><p>Começar com um loop pequeno e uma ferramenta segura.</p></div>
<div><b>Avaliar</b><p>Testar casos comuns, falhas, recusas e resultados enganosos.</p></div>
<div><b>Operar</b><p>Inspecionar rastros, custos, permissões e versões.</p></div>
</div>

<div class="pending">Laboratórios e comparação de produtos ainda em curadoria. Nenhuma plataforma foi escolhida como solução universal.</div>

---

# O mesmo método, diferentes profissões

<div class="cards three">
<div><b>Pesquisa e saúde</b><p>Organização de literatura e rastreabilidade. Sem decisões clínicas autônomas.</p></div>
<div><b>Engenharia e arquitetura</b><p>Explorar requisitos e gerar alternativas com validação profissional.</p></div>
<div><b>Negócios e criação</b><p>Investigar, prototipar e automatizar pequenas tarefas com revisão.</p></div>
</div>

<div class="pending">Casos concretos e fontes ainda serão selecionados. Usar dados públicos, sintéticos ou autorizados.</div>

---

# O projeto final começa com uma pergunta

## “Que trabalho eu gostaria de delegar,<br>sem abrir mão do controle?”

<div class="hero-path"><span>Especificação</span><b>→</b><span>Protótipo</span><b>→</b><span>Evidência de funcionamento</span></div>

<div class="note">O objetivo é sair com um pequeno agente compreensível, não uma demonstração que só funciona uma vez.</div>

---

# Próximas camadas do curso

<div class="cards three">
<div><b>Visual</b><p>Animações originais e demonstrações controladas pelo professor.</p></div>
<div><b>Prática</b><p>Flappy, MNIST e laboratórios de agentes integrados e testados.</p></div>
<div><b>Aprofundamento</b><p>Links comentados para leituras e vídeos, com autoria e licença verificadas.</p></div>
</div>

<div class="edition">Fim do percurso principal · Esta versão é um esqueleto navegável, não o curso concluído.</div>

---
hide: true
---

# Desvio opcional · Convolução

<div class="pending">Reservado para uma explicação visual sob demanda. Fora do percurso principal e sem detalhamento matemático nesta versão.</div>

---
hide: true
---

# Desvio opcional · Imagem e vídeo

<div class="visual-equation"><span>GANs</span><b>→</b><span>Difusão</span><b>→</b><span>Stable Diffusion</span><b>→</b><span>Wan / vídeo</span></div>

<div class="pending">Somente mapa de um aprofundamento futuro. Não representa uma genealogia direta entre todas as arquiteturas. Conteúdo não desenvolvido nesta etapa.</div>
