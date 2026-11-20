## MODIFIED Requirements

### Requirement: Observar e sortear transições
A abertura SHALL mostrar a contagem começando em zero e a construção visual das faixas de probabilidade. A comparação entre digrama e trigrama fica nos slides, não no vídeo. A régua SHALL identificar a hipótese do digrama como propriedade desse modelo e suas 1.000 posições como aproximação.

#### Scenario: Sorteio em aula
- **WHEN** o professor informa ou sorteia um número no controle
- **THEN** o slide mostra a faixa e a próxima letra que o número selecionou.

#### Scenario: Comparar Q → U
- **WHEN** a turma contrasta a frequência do vídeo com a dos controles
- **THEN** a legenda distingue o recorte do vídeo com espaços e o dos controles dentro das palavras.

### Requirement: Inspecionar a decisão do perceptron
A demo de Flappy SHALL exibir os sinais, pesos, soma, viés, limiar e ação efetivamente usados no jogo. A legenda SHALL explicitar que os pesos são ajustados manualmente e que não há treinamento. A referência a Rosenblatt SHALL identificar a origem conceitual do perceptron, não a autoria da demo.

#### Scenario: Mesmo início, decisão diferente
- **GIVEN** o mesmo estado inicial e os pesos de referência
- **WHEN** o professor compara um passo com viés −0,8 e outro, após reiniciar, com viés 0
- **THEN** o primeiro passo não bate a asa e o segundo bate.
