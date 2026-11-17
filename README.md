# IA para amigos

Esqueleto original em Slidev de um curso visual dos fundamentos à construção de agentes, para pessoas de diferentes áreas. **Versão 0.1: roteiro navegável, não curso concluído.**

## Executar

Node.js 24 LTS (mínimo 22.12), npm:

```sh
npm ci
npm run dev
npm run build -- --base /ia-para-amigos/
npm run preview
npm test
```

## Estrutura

- `slides.md`: percurso principal e dois desvios ocultos.
- `components/`: dois componentes originais: sequência navegável e perceptron com pesos editáveis.
- `style.css`: identidade própria, sem fontes remotas ou marcas corporativas.
- `.github/workflows/pages.yml`: build e testes em PR; build, testes e deploy em main.
- `PROVENANCE.md`: origem e limites de reutilização.

O professor controla os passos dos diagramas. As caixas amarelas identificam demonstrações ou conteúdo ainda em desenvolvimento. Os desvios com `hide: true` ficam fora da navegação normal. O Flappy, o notebook MNIST e os laboratórios de agentes não estão integrados nesta edição.

## Publicação

GitHub Pages por GitHub Actions; a base do build é derivada do nome do repositório. Somente pushes na branch main ou execução manual nessa branch podem publicar. Pull requests apenas constroem, sem permissão de deployment.

Não incluir dados pessoais, credenciais, documentos privados ou material externo sem autorização específica. Todo conteúdo do repositório público, inclusive fontes e notas, é público. Não armazenar notas privadas aqui.

## Validação

O build e os testes de navegador cobrem os 32 slides principais, verificam cortes verticais, erros JavaScript, controle de passos, reset e mudança dos pesos do perceptron. As dependências possuem lockfile; overrides pontuais mantêm DOMPurify e image-size em versões corrigidas.
