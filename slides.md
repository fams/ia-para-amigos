---
theme: none
title: IA para amigos
info: Esqueleto de um curso visual, dos fundamentos à construção de agentes.
author: ""
download: false
wakeLock: false
exportFilename: ia-para-amigos
colorSchema: light
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

<div class="cards two">
<div><b>Markov</b><p>O contexto muda as chances do que vem a seguir.</p></div>
<div><b>Shannon</b><p>A incerteza que sobra ajuda a explicar o que dá para comprimir.</p></div>
</div>

<div class="note">Da próxima letra aos bits que precisamos transmitir.</div>

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

# Veja as consoantes e vogais, letra por letra

<div class="markov-slide-deck">Frase criada para a demonstração. Leia sem espaços e conte o que aparece depois de cada letra.</div>

<MarkovLetterEvolution />

<!--
**Mostre a contagem crescendo.** Na frase «A lua clara surge no céu», marque V (vogal) ou C (consoante). Ignore espaços e acentos; por isso contamos também a transição entre palavras. Não conte a primeira letra como um par. Depois de duas letras, A → L é V → C e altera só a primeira linha. Avance até L → U e mostre que a segunda linha ganha a própria observação.

**Ao final:** depois de vogal há 2 vogais e 7 consoantes; depois de consoante há 7 vogais e 2 consoantes. São 18 pares de uma frase criada para ensinar. Não compare os percentuais desse exemplo diretamente com a contagem histórica anterior ou com os digramas de Os Sertões, que aqui desconsideram pares entre palavras.
-->

---

# Como o texto vira uma distribuição

<MarkovVideo />

<!--
**Aponte o que muda.** No início, nenhuma transição foi registrada. Em câmera lenta, observe qual par entra e em que linha a barra é atualizada. A rajada acelera a demonstração e salta para o resultado do livro. No quadro tridimensional, destaque Q → U. Pause antes do sorteio se quiser pedir à turma um número para testar no próximo slide.
-->

---

# Que letra cai na faixa?

<div class="markov-slide-deck">No modelo de digrama, só a letra anterior determina a distribuição da próxima. A régua de 1.000 posições é uma aproximação.</div>

<MarkovRuler />

<!-- Peça um inteiro de 1 a 1.000. Mostre as faixas antes de aplicar. Começando em A, 787, 854, 147, 868 reproduzem ASTAS se usar a letra sorteada em cada passo. A régua de 1.000 aproxima a distribuição: A → Y tem 4 em 86.752 ocorrências e fica sem posição na régua. -->

---

# E se olharmos duas letras?

<div class="markov-slide-deck">O trigrama distingue padrões que o digrama mistura. Pode soar mais como português, mas pares raros têm poucos exemplos.</div>

<MarkovComparison />

<MarkovRuler trigram />

<!-- Compare U, QU e OU usando o número 500. Os três usam Os Sertões com a mesma normalização, sem acentos e apenas dentro das palavras. Mostre que os resultados das amostras ilustram uma possibilidade, não avaliam a qualidade. Não há palpite para um contexto sem observações. -->

---

<div class="eyebrow">Shannon · 1948 e 1951</div>

# Quanto já sabemos antes da próxima letra?

<div class="shannon-hero">
<div>
<div class="shannon-guess-row"><b>Sem contexto</b><div class="shannon-tiles" aria-label="Letra desconhecida"><span class="shannon-slot">?</span></div></div>
<div class="shannon-guess-row"><b>Com contexto</b><div class="shannon-tiles" aria-label="Q, U, E, letra desconhecida"><span>Q</span><span>U</span><span>E</span><span class="shannon-slot">?</span></div></div>
<div class="note">Em Markov, o contexto muda as chances.<br><b>Shannon mede a incerteza que sobra.</b></div>
<div class="markov-source"><a href="https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf">Shannon, 1948</a> · <a href="https://doi.org/10.1002/j.1538-7305.1951.tb01366.x">Shannon, 1951</a></div>
</div>
<ShannonPortrait />
</div>

<!--
**1 min | Comece pela turma.** Peça uma letra sem dar contexto; depois aponte as fichas Q, U, E e «?» e recolha dois ou três palpites. M de QUEM, R de QUER e D de QUEDA são possíveis. O objetivo não é acertar a letra que o professor pensou; é notar que o contexto muda o conjunto de palpites plausíveis. Exemplo em português criado para a aula, não um resultado do artigo nem uma medição de Os Sertões.

**História em uma frase.** Mostre o retrato, sem atribuir uma data à fotografia. Em 1948, nos Bell Labs, Shannon formalizou a informação e ilustrou regularidades do inglês com aproximações por letras, digramas e trigramas. Em 1951, usou palpites humanos da próxima letra, dado o texto anterior, para estimar a entropia do inglês impresso.

**Transição:** «Se eu já espero certas letras, todas carregam a mesma surpresa quando aparecem?»
-->

---

<div class="eyebrow">Shannon · Surpresa e entropia</div>

# O que é raro surpreende mais

<ShannonTokens />

<div class="note"><b>Entropia</b> é a surpresa média, levando em conta a frequência de cada possibilidade.</div>

<!--
**1 min | Conte as fichas.** Cada quadrado representa um sinal; cada linha tem 16 fichas. As quatro cores ajudam a acompanhar os mesmos sinais no próximo slide. Em cima, nenhum favorito. Embaixo, A aparece em metade das vezes e D em apenas duas de 16. Se o próximo for D, a surpresa é maior do que se for A. Mas A pesa mais na média. As frequências são inventadas para a aula.

**Cuidado:** informação aqui não quer dizer importância, significado ou verdade. Entropia caracteriza a distribuição que estamos usando. Se perguntarem pelos números, a distribuição de cima tem 2 bits de entropia por sinal; a de baixo, 1,75. Não precisa mostrar logaritmos.

**Transição:** «Dá para transformar essa diferença em economia de bits?»
-->

---

<div class="eyebrow">Shannon · Compressão sem perdas</div>

# Códigos curtos para sinais frequentes

<ShannonBits />

<!--
**2 min | Primeiro, peça um palpite.** A encurtou de dois bits para um. C e D ficaram mais caros. A economia em A compensa? Clique para revelar: código fixo 16 × 2 = 32 bits; variável 8 × 1 + 4 × 2 + 2 × 3 + 2 × 3 = 28 bits. Aponte as quatro células vazias: as duas tiras têm a mesma escala e cada célula é um bit. As cores atribuem os bits ao sinal que os originou, não indicam zero ou um. A economia é de 4 bits (12,5%), sem contar o custo de comunicar a tabela. Neste exemplo, a tabela é conhecida pelos dois lados.

**Mostre que volta ao original.** Escreva 010111 e leia da esquerda para a direita: 0 | 10 | 111 dá A, B, D. As barras são só para explicar; não foram transmitidas. Nenhum código é começo de outro, então a separação não depende de adivinhar. O quadro é um exemplo didático de código sem prefixos, não um algoritmo atribuído a Shannon.

**Feche o elo com Markov.** Aqui usamos uma tabela única, sem olhar para trás. Um compressor que use contexto pode usar chances diferentes dependendo das letras anteriores. Para valer a pena, o modelo precisa funcionar em texto novo e a economia tem de superar os custos extras. Não diga que toda mensagem encurta ou que prever texto é o mesmo que compreender.

**Passagem para o próximo bloco:** «Até aqui, nós contamos regularidades ou escrevemos o código à mão. Como fazer uma máquina aprender a dar peso às pistas?»
-->

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

<MicroNeuron />

<div class="markov-source"><a href="https://pubmed.ncbi.nlm.nih.gov/13602029/">Referência do conceito: Rosenblatt (1958)</a></div>

<!--
**Siga o desenho da esquerda para a direita.** Cada círculo à esquerda contém um sinal. Cada seta tem o seu peso: é um multiplicador, não outra entrada. Σ junta as três contribuições com o viés. No limiar de zero ou mais, a saída é 1; abaixo, é 0.

**Interação.** Mantenha os demais pesos fixos, passe o peso 1 de 0,5 a 0,1 e aponte onde a saída vira. Use Reiniciar pesos para voltar. Os valores mudam porque alguém ajusta os controles: não é treinamento automático.
-->

---

# Flappy Bird: o perceptron no comando

<FlappyCanonical />

<!--
**Compare em passos.** Pause e observe os sinais do jogo entrando pelos nós x. Cada peso w multiplica uma entrada; o viés entra como termo adicional. A soma passa por um limiar e a saída decide bater a asa (1) ou não (0). Troque um peso ou o viés, repita o passo a partir do mesmo estado e confira se mudou a ação. Em modo manual, o jogo obedece à pessoa, não ao perceptron. Este demonstrador usa pesos escolhidos à mão, não treinados.
-->

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
