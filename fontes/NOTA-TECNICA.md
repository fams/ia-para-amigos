# Markov em movimento · tema claro v2

A revisão resolve a perda de contraste em regiões semitransparentes causada pelo tratamento de cor anterior. A correção atua sobre o render Manim v8 recuperado, não sobre os objetos do projeto Manim. O MP4 v8 tem somente RGB composto: a opacidade original de cada camada não pode ser extraída dali.

- No canvas, a composição de cor passa a ser um único mapeamento afim contínuo por pixel, preservando misturas de cor que o Manim já rasterizou. Há apenas recorte aos limites RGB. Não há troca abrupta de mapeamento para texto e transições conforme o matiz.
- A página creme do livro já tinha alto contraste. Seu interior é protegido durante o trecho estável, com transição espacial suave nas bordas. Assim o total **964.641** e as letras impressas permanecem sólidos. A montagem, o ritmo, as contagens, o giro, o destaque **Q → U** e as demonstrações de sorteio preservam o original.
- Nenhum quadro foi removido ou acrescentado. Sem áudio, como no v8.

## Reproduzir

Pré-requisitos: Python 3 com NumPy e Pillow e FFmpeg com libx264. Use o render `aula-dos-amigos-markov-giro.mp4` (SHA-256 `b9f9c698d74de81b7d232337ea83a64544ee329754b62b0cc641b991b9627028`).

```sh
python corrigir.py aula-dos-amigos-markov-giro.mp4 markov-manim-tema-claro-v2.mp4
```

O script gera os arquivos de cor e a máscara automaticamente. A área da máscara é específica da geometria deste render 1080p.

Corpus: Euclides da Cunha, *Os Sertões* (1902), transcrição educacional da Biblioteca Virtual do Estudante Brasileiro (Escola do Futuro/USP), edição São Paulo: Três, 1984; recorte da Nota Preliminar ao fim do corpo do livro. [PDF, espelho do Curso Objetivo](https://www.curso-objetivo.br/vestibular/assets/download/obras-literarias/euclides-da-cunha/os-sertoes.pdf). Com o espaço dentro da matriz, o corpus tem 964.641 pares e 6.230/6.231 ocorrências de U depois de Q.
