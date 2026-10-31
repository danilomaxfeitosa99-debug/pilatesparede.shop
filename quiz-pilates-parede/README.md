# Quiz — Pilates de Parede

Quiz em HTML, CSS e JavaScript puro (sem dependências, sem build). Pode ser hospedado em qualquer lugar: GitHub Pages, Vercel, Netlify, Hostinger, etc.

## Estrutura

```
index.html        → página única que carrega o quiz
css/style.css     → estilos (cores nas variáveis no topo do arquivo)
js/config.js      → link do checkout, timer, notificações, etc.
js/steps.js       → TODAS as telas do quiz (textos, opções, imagens, ordem)
js/quiz.js        → motor que renderiza as telas (normalmente não precisa mexer)
assets/img/       → imagens usadas no quiz
```

## Como colocar o link do seu checkout

Abra `js/config.js` e altere:

```js
checkoutUrl: "https://SEU-LINK-DE-CHECKOUT-AQUI",
```

Todos os botões da página final ("Testar agora", "Quero Testar Agora" e o botão fixo no rodapé) apontam para esse link.

## Como editar / reordenar telas

Abra `js/steps.js`. Cada bloco `{ ... }` dentro de `QUIZ_STEPS` é uma tela. A ordem no arquivo é a ordem em que aparecem.

- Para **reordenar**: mova o bloco de lugar.
- Para **remover**: apague o bloco.
- Para **mudar textos/opções**: edite direto no bloco.
- Para **destacar uma palavra em roxo**: `<span class="accent">palavra</span>`.

Tipos de tela disponíveis (`type`):

| type | o que é |
|------|---------|
| `info` | texto + imagem/carrossel + botão |
| `single` | pergunta de escolha única (avança ao clicar) |
| `multi` | escolha múltipla + botão Continuar |
| `weight` | slider de peso (kg/lb) |
| `input` | campo de texto / e-mail / número |
| `loadingTestimonials` | tela de carregamento com depoimentos (avança sozinha) |
| `loadingBars` | tela de carregamento com 3 barras + botão |
| `final` | página de oferta com preço e botões para o checkout |

Na página final, `{{nome}}` é substituído pelo nome digitado pela pessoa.

## Testar localmente

Basta abrir `index.html` no navegador. Se preferir um servidor local:

```bash
python3 -m http.server 8080
# depois abra http://localhost:8080
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. O quiz ficará disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
