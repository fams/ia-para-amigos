# Aula dos Amigos · Markov e Flappy Bird

Versão local com 38 slides. Os demais conteúdos foram preservados da revisão visual clara.
- **Slide 8:** animação de Markov no próprio slide, com controles de vídeo. Começa com zero pares contados, acompanha as barras mudando, destaca Q → U e mostra o sorteio.
- **Slides 9 e 10:** controles de digrama e trigrama. O gerador de trigrama não faz parte do vídeo.
- **Slide 15:** perceptron isolado, com pesos editáveis.
- **Slide 16:** jogo Flappy com o mesmo tipo de perceptron controlando o pássaro. Ajuste os pesos e clique em **Um quadro** para observar a decisão. O modo manual serve para comparar.

## Abrir no navegador

Para o ZIP portátil de entrega, extraia o conteúdo inteiro, execute `py apresentar.py` (Windows) ou `python3 apresentar.py`, e acesse http://127.0.0.1:8786. Não abra o `index.html` direto do disco.

## Editar

A partir do checkout, com Node.js compatível, execute `npm ci` e `npm run dev`. Para gerar um build sem notas, use `npm run build`. As notas do professor permanecem no Markdown. O vídeo e o jogo estão em `public/`.

## Demonstração em 30 segundos

No slide 16, use **Um quadro** com os pesos de referência: a rede decide não bater a asa. Clique **Reiniciar**, mude só o viés de −0,8 para 0 e use **Um quadro** de novo. Mesmo ponto de partida, outra decisão: agora o pássaro bate a asa. O desenho mostra os valores que entraram na decisão do quadro, não uma rede à parte.

No slide 8, o vídeo reutiliza a animação Manim v8 e altera as cores no render final. Ele mantém pausa, aceleração, tabela 3D, Q → U e o sorteio nas faixas.

No ZIP portátil, o vídeo acompanha o projeto uma única vez, em `public/videos/`. O servidor local já encontra esse arquivo. Para hospedar o build em outro serviço, execute `npm run build` novamente para copiar o vídeo para `dist/videos/` junto com os outros recursos.

## Prévia de PR para `dev`

O workflow existente valida o build e os testes de navegação e gera o artefato
`slidev-dev-preview.zip` na execução do PR. O deploy do Pages continua restrito
a `main`. O quadro e as mudanças editoriais ficam em
[`openspec/ACOMPANHAMENTO.md`](openspec/ACOMPANHAMENTO.md).
