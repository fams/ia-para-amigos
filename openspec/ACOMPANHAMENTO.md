# IA para Amigos · Quadro de produção

OpenSpec nos bastidores: descreve o que já funciona e o que vai mudar. Não entra como conteúdo da aula. Este quadro diferencia **feito**, **publicado** e **planejado**.

## Linha de base · 20/11/2026
- **Feito e testado no pacote de 38 slides:** vídeo de Markov e controles de digrama/trigrama; Shannon; perceptron canônico e Flappy jogável.
- **Publicado:** o [GitHub Pages de prévia](https://fams.github.io/ia-para-amigos-preview/) ainda está na edição anterior de 37 slides. O pacote de 38 é a base de produção, não uma alegação de publicação.
- **Esboçado, não concluído:** treinamento/backpropagation, embeddings e Transformer com novas demonstrações; contexto, RAG, tools, MCP, agentes e memória ainda precisam de prática integrada.
- **Separado da aula:** demonstrador de triagem de artigos em medicina com dados sintéticos. Agente instalável de TCC é um projeto maior, não dependência desta entrega.
- **Fora do escopo:** reinserir Monte Carlo, reanimar o vídeo de Markov ou ensinar OpenSpec só porque passou a ser usado para produzir a aula.

## Fila
1. **Especificada, não implementada:** `preparar-laboratorio-triagem`. Uma mudança ativa; cenário nominal e cenário de falha com revisão humana.
2. **A decidir depois do ensaio:** uma demonstração de treinamento visual ou um aprofundamento de contexto, conforme o que a turma precisar.
3. **Publicação:** uma decisão separada, com versão identificada e teste do link. Não confundir build aprovado e versão no ar.

## Evidência da base
- `slides.md` do pacote de 38 slides, SHA-256: `ce59804f0f992da5dd988d3e3f8e7c093ecfbacf8e55ed57706f9fa9d0a2f3e1`.
- ZIP `aula-dos-amigos-markov-flappy-slidev-v2.zip`, SHA-256: `d8fcfd61ead562e6eb28477cad1c63f172260388423090b74728ea92cc2b93cd`.
- Regressões: slides 8–10 e 15–16, vídeo e controles; confirmar comportamento em tela larga e pequena antes de fechar mudança.

## Rotina
Para cada mudança: proposta (por quê) → requisitos e cenários (o que deve acontecer) → desenho e tarefas (como fazer) → prova (teste, render ou ensaio) → arquivo. Marcar um item como publicado só após conferir o link. Manter os arquivos de OpenSpec junto à fonte da aula.

## Revisão dos fundamentos · 20/11/2026
- Base: `slides.md` de 38 slides identificado acima. Chromium percorreu as 38 rotas e reproduziu a emissão da ação da rede no Flappy incorporado, a 1280 px e 390 px. Com as mesmas entradas iniciais, o viés −0,8 não bate a asa, o viés 0 bate, e o pássaro muda de posição de acordo. Os testes do motor e dos controles também passaram.
- As notas do slide 16 correspondem ao motor: três entradas, pesos, soma com viés, limiar inclusivo em zero e modo manual distinto. A demonstração não treina o perceptron.
- A revisão de fontes dos fundamentos conferiu Markov (trecho e probabilidades de transição), o relato histórico de Basharin et al. e Shannon (1948, 1951). O exemplo de compressão de 32 para 28 bits é didático e não inclui custo de comunicar a tabela.
- A mudança `explicitar-limites-demos` aplica as ressalvas no texto visível, sem mexer nos dados, no vídeo, nas notas ou na ordem da aula. Validada localmente; CI do GitHub e publicação permanecem estados separados.
