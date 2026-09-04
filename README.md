# 🕹️ Memory Arcade

Jogo da memória clássico com visual retrô de fliperama. Vire as cartas, encontre os pares e tente vencer no menor número de jogadas possível.

## ✨ Funcionalidades

- Tabuleiro 4x4 com 8 pares de símbolos
- Contador de jogadas e cronômetro
- Animação de virada de carta em 3D (CSS puro)
- Botão de reiniciar a qualquer momento
- Mensagem de vitória com o resultado final

## 🚀 Como rodar

1. Baixe ou clone este repositório
2. Abra `index.html` no navegador

## 🎮 Como jogar

Clique em duas cartas para virá-las. Se os símbolos forem iguais, elas permanecem viradas. Se forem diferentes, viram de volta depois de um instante. O objetivo é encontrar todos os pares usando o menor número de jogadas possível.

## 🛠️ Tecnologias

- HTML5
- CSS3 (transform 3D, grid, sem frameworks)
- JavaScript puro

## ✏️ Personalizando

- Troque os símbolos no topo do `script.js` (array `SYMBOLS`) por emojis diferentes
- Ajuste as cores em `style.css`, dentro de `:root`
- Mude o tamanho do tabuleiro trocando `grid-template-columns` e a quantidade de símbolos
