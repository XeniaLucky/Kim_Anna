let cards = [];
let cardValues = [];
let cardIds = [];
let matchedCards = [];
let lives = 3;
let totalPairs = 0;
let gameStarted = false;

const texts = [
    '☃',
    '🍦',
    '❄',
    '🥶',
    '🎿',
    '🌨',
    '🛷',
    '😰'
];

document.getElementById('start-game').addEventListener('click', createBoard);

function createBoard() {
    const board = document.getElementById('memo-board');
    board.innerHTML = '';
    cardValues = [];
    cardIds = [];
    matchedCards = [];
    lives = 3;
    document.getElementById('lives').textContent = `Жизни: ${lives}`;
    document.getElementById('message').textContent = '';
    gameStarted = true;

    const difficulty = document.getElementById('difficulty').value;
    setDifficulty(difficulty);

    cards.sort(() => 0.5 - Math.random());
    totalPairs = cards.length / 2;

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('data-id', i);
        card.classList.add('card');
        card.innerHTML = `<span class="card-text"></span>`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    }
}

function setDifficulty(difficulty) {
    if (difficulty === 'easy') {
        cards = texts.slice(0, 4).concat(texts.slice(0, 4));
    } else if (difficulty === 'medium') {
        cards = texts.slice(0, 6).concat(texts.slice(0, 6));
    } else if (difficulty === 'hard') {
        cards = texts.slice(0, 8).concat(texts.slice(0, 8));
    }
}

function flipCard() {
    if (!gameStarted || lives === 0) return;

    const selected = this;
    const cardId = selected.getAttribute('data-id');

    if (cardIds.length < 2 && !matchedCards.includes(cardId) && !selected.classList.contains('flipped')) {
        selected.classList.add('flipped');
        selected.querySelector('.card-text').textContent = cards[cardId];
        cardValues.push(cards[cardId]);
        cardIds.push(cardId);

        if (cardValues.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const cardsElements = document.querySelectorAll('.card');
    const [firstId, secondId] = cardIds;

    if (cardValues[0] === cardValues[1]) {
        matchedCards.push(firstId, secondId);
        cardValues = [];
        cardIds = [];

        cardsElements[firstId].style.visibility = 'hidden';
        cardsElements[secondId].style.visibility = 'hidden';

        if (matchedCards.length / 2 === totalPairs) {
            document.getElementById('message').textContent = 'Поздравляем, вы выиграли!';
        }
    } else {
        lives--;
        document.getElementById('lives').textContent = `Жизни: ${lives}`;
        if (lives === 0) {
            document.getElementById('message').textContent = 'Игра окончена. Попробуйте снова!';
            gameStarted = false;
        } else {
            setTimeout(() => {
                cardsElements[firstId].classList.remove('flipped');
                cardsElements[secondId].classList.remove('flipped');
                cardsElements[firstId].querySelector('.card-text').textContent = '';
                cardsElements[secondId].querySelector('.card-text').textContent = '';
                cardValues = [];
                cardIds = [];
            }, 1000);
        }
    }
}
