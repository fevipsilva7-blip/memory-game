const SYMBOLS = ['🚀', '⭐', '🌙', '⚡', '🔥', '💎', '🎯', '👾'];

let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timerInterval = null;
let seconds = 0;
let boardLocked = false;

const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart');
const playAgainBtn = document.getElementById('play-again');

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerEl.textContent = formatTime(seconds);
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = formatTime(seconds);
  }, 1000);
}

function createBoard() {
  const deck = shuffle([...SYMBOLS, ...SYMBOLS]);
  board.innerHTML = '';
  cards = [];
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  boardLocked = false;
  movesEl.textContent = moves;
  winMessage.classList.add('hidden');

  deck.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card__inner">
        <div class="card__face card__face--back"></div>
        <div class="card__face card__face--front">${symbol}</div>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(card));
    board.appendChild(card);
    cards.push(card);
  });

  startTimer();
}

function handleCardClick(card) {
  if (boardLocked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  const isMatch = first.dataset.symbol === second.dataset.symbol;

  if (isMatch) {
    first.classList.add('matched');
    second.classList.add('matched');
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === cards.length) {
      clearInterval(timerInterval);
      showWinMessage();
    }
  } else {
    boardLocked = true;
    setTimeout(() => {
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      flippedCards = [];
      boardLocked = false;
    }, 800);
  }
}

function showWinMessage() {
  winMessage.classList.remove('hidden');
  winMessage.querySelector('.win-message__stats').textContent =
    `${moves} jogadas em ${formatTime(seconds)}`;
}

restartBtn.addEventListener('click', createBoard);
playAgainBtn.addEventListener('click', createBoard);

createBoard();
