# Aula dos Amigos · As letras de Os Sertões

## Fonte e recorte
Euclides da Cunha, *Os Sertões*, obra publicada originalmente em 1902. Base digital: transcrição educacional da Biblioteca Virtual do Estudante Brasileiro (Escola do Futuro/USP), que identifica como fonte a edição São Paulo: Três, 1984. [PDF integral, espelho do Curso Objetivo](https://www.curso-objetivo.br/vestibular/assets/download/obras-literarias/euclides-da-cunha/os-sertoes.pdf). SHA-256 do PDF: `8410e40827abe710dc315e4716b94145e840e87d392eaa0bcd7bd29d9acc7bae`.

Conta-se da Nota Preliminar ao fim do corpo, abrangendo A Terra, O Homem e A Luta, inclusive títulos internos. Excluem-se capa, créditos e o apêndice de notas à segunda edição. O corpus é uma **sequência de tokens para análise**, não uma edição de leitura. A extração não corrige manualmente erros da digitalização, hifens ou quebras de página; qualquer ocorrência pode afetar os números.

## Regra
Minúsculas, acentos e cedilha reduzidos à letra base (é→e, ç→c); cada sequência contígua de letras A–Z forma um token. Espaços, hífens, números e pontuação são fronteiras. Não se conta uma transição da última letra de uma palavra para a primeira da próxima. Foram **808.966 letras**, **155.677 tokens** e **653.289 pares** dentro dos tokens.

Cada célula é a contagem do par atual→próxima dividida pelo total de pares que saem da letra atual. Linhas com dados somam 1; célula vazia significa distribuição indefinida por falta de observações de saída.

## Controle e exemplo
O controle embaralha todas as letras com semente 1902 e repõe as mesmas fronteiras (mesmos comprimentos por posição). As frequências globais das 26 letras são exatamente iguais, e os pares são contados pela mesma regra. Não se preservam as marginais específicas de posições dentro de palavras; o controle serve para ilustrar o efeito da ordem original, não para atribuir o padrão a um mecanismo único.

- **Q→U:** no original **6.230/6.230** (100%); embaralhado **192/5.067** (3,79%).
- **S→E:** no original **8.137/34.802** (23,38%); S→T é a segunda saída (16,82%).

Na aula: pergunte o que vem depois de Q; revele as duas barras e só depois mostre as contagens. Troque para S para deixar claro que previsibilidade não significa certeza. A matriz é um modelo descritivo de primeira ordem deste corpus, não demonstra que o português não depende de contexto mais longo.

## Reprodução
O repositório publica as contagens, não uma cópia do texto normalizado.
Com o PDF da fonte acima salvo como `os-sertoes.pdf`, execute:

```sh
pdftotext os-sertoes.pdf bruto.txt
python3 scripts/normalizar-sertoes.py bruto.txt /tmp/sertoes
python3 scripts/build-markov-data.py /tmp/sertoes/corpus-normalizado.txt
```

O corpus normalizado usado tem SHA-256
`f384b3212e18ceb12fa441c49616b7ede3fb6af361899296a45893d65c2e8543`.
`sertoes-contagens.json` e `sertoes-trigramas.json` contêm pares e
trincas observados, respectivamente, em ordem alfabética das próximas letras.
