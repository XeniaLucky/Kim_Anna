let cards = [];
let cardValues = [];
let cardIds = [];
let matchedCards = [];
let lives = 3;
let totalPairs = 0;

const texts = [
    'Текст 1', // Тексты для карточек
    'Текст 2',
    'Текст 3',
    'Текст 4',
    'Текст 5',
    'Текст 6',
    'Текст 7',
    'Текст 8'
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

    const difficulty = document.getElementById('difficulty').value;
    setDifficulty(difficulty);

    cards.sort(() => 0.5 - Math.random());
    totalPairs = cards.length / 2;

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('data-id', i);
        card.classList.add('card');
        card.innerHTML = `<span class="card-text"></span>`; // Скрываем текст
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    }
}

function setDifficulty(difficulty) {
    if (difficulty === 'easy') {
        cards = texts.slice(0, 4).concat(texts.slice(0, 4)); // 4 пары
    } else if (difficulty === 'medium') {
        cards = texts.slice(0, 6).concat(texts.slice(0, 6)); // 6 пар
    } else if (difficulty === 'hard') {
        cards = texts.slice(0, 8).concat(texts.slice(0, 8)); // 8 пар
    }
}

function flipCard() {
    const selected = this;
    const cardId = selected.getAttribute('data-id');

    // Проверяем, если карточка уже перевернута или совпала
    if (cardIds.length < 2 && !matchedCards.includes(cardId) && !selected.classList.contains('flipped')) {
        selected.classList.add('flipped');
        selected.querySelector('.card-text').textContent = cards[cardId]; // Показываем текст
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

        // Скрываем карточки
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
            resetGame();
        } else {
            setTimeout(() => {
                cardsElements[firstId].classList.remove('flipped');
                cardsElements[secondId].classList.remove('flipped');
                cardsElements[firstId].querySelector('.card-text').textContent = ''; // Скрываем текст
                cardsElements[secondId].querySelector('.card-text').textContent = ''; // Скрываем текст
                cardValues = [];
                cardIds = [];
            }, 1000);
        }
    }
}

function resetGame() {
    cardValues = [];
    cardIds = [];
    matchedCards = [];
    lives = 3;
    document.getElementById('lives').textContent = `Жизни: ${lives}`;
}
