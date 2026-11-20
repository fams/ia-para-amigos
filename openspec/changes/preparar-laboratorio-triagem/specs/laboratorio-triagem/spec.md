## ADDED Requirements

### Requirement: Triagem rastreável com evidência
O agente SHALL registrar as ferramentas usadas, as fontes consultadas e a razão de cada decisão relevante sobre a triagem.

#### Scenario: Resumo suficiente
- **WHEN** a busca recupera um resumo sintético suficiente para aplicar o critério da aula
- **THEN** o agente registra a decisão provisória de triagem, a fonte e a justificativa apoiada no resumo.

#### Scenario: Evidência insuficiente
- **WHEN** não há resumo suficiente depois das buscas permitidas
- **THEN** o agente sinaliza revisão humana, registra a lacuna e encerra sem inventar evidência.
