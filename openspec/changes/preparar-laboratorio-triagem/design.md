## Context
Produção de uma aula para público heterogêneo. A especificação e os testes ficam nos bastidores; a turma vê o comportamento do agente e o rastro.

## Goals / Non-Goals
- Mostrar decisão, ferramenta, observação e condição de parada.
- Não fazer diagnóstico, recomendação clínica ou tratamento de dados de pacientes.
- Não reescrever a abertura ou construir o agente de TCC completo.

## Decisions
- Começar por uma base sintética fixa e uma ferramenta de busca. O rastro exibe fonte, decisão e motivo.
- Mostrar uma execução com resumo suficiente e outra em que buscar mais não resolve a lacuna e resulta em revisão humana.
- Preferir dados locais e preparação offline como contingência; uma reprodução gravada deve ser identificada como tal.

## Risks / Trade-offs
- Se a decisão for totalmente predeterminada, apresentar como workflow, não como autonomia. O caso deve provar que o resultado da ferramenta muda o próximo passo.
