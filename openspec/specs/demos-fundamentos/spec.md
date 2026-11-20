# Demonstrações de fundamentos

## Purpose
Registrar o que já foi implementado no pacote local de 38 slides.

## Requirements

### Requirement: Observar e sortear transições
A abertura SHALL mostrar a contagem começando em zero e a construção visual das faixas de probabilidade. A comparação entre digrama e trigrama fica nos slides, não no vídeo.

#### Scenario: Sorteio em aula
- **WHEN** o professor informa ou sorteia um número no controle
- **THEN** o slide mostra a faixa e a próxima letra que o número selecionou.

### Requirement: Inspecionar a decisão do perceptron
A demo de Flappy SHALL exibir os sinais, pesos, soma, viés, limiar e ação efetivamente usados no jogo. Alterar pesos manualmente não é treinamento.

#### Scenario: Mesmo início, decisão diferente
- **GIVEN** o mesmo estado inicial e os pesos de referência
- **WHEN** o professor compara um passo com viés −0,8 e outro, após reiniciar, com viés 0
- **THEN** o primeiro passo não bate a asa e o segundo bate.
