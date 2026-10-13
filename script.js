const cards = ['😀', '🐶', '🐱', '🦊', '🐼', '🐸', '🦁', '🐵'];
const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const scoreStats = document.getElementById('score-stats');
const gameMessage = document.getElementById('game-message');
const restartButton = document.getElementById('restart-button');
const scoresCookieName = 'memoryGameScores';

let selectedCards = [];
let allCards = [];
let isLocked = false;
let isGameOver = false;
let elapsedSeconds = 0;
let timerId = null;
let comparisonTimeoutId = null;

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;
    card.addEventListener('click', cardOnClick);

    const cardContent = document.createElement('span');
    cardContent.classList.add('card-content');
    cardContent.textContent = cardValue;
    card.appendChild(cardContent);
    return card;
}

function duplicateArray(arraySimple) {
    return [...arraySimple, ...arraySimple];
}

function shuffleArray(shuffleArray) {
    for (let i = shuffleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
    }
    return shuffleArray;
}

function checkVictory() {
    const matchedCards = gameBoard.querySelectorAll('.card.matched');

    if (matchedCards.length === allCards.length) {
        isGameOver = true;
        stopTimer();
        saveScore(elapsedSeconds);
        gameMessage.textContent = `Bravo, tu as gagné en ${elapsedSeconds} seconde${elapsedSeconds > 1 ? 's' : ''} !`;
        updateScoreStats();
    }
}

function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
        elapsedSeconds += 1;
        timerElement.textContent = `${elapsedSeconds} s`;
    }, 1000);
}

function stopTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function getScores() {
    try {
        return JSON.parse(getCookie(scoresCookieName)) || [];
    } catch {
        return [];
    }
}

function getCookie(name) {
    const cookie = document.cookie
        .split('; ')
        .find((value) => value.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : '[]';
}

function saveScore(score) {
    const scores = [...getScores(), score].slice(-20);
    document.cookie = `${scoresCookieName}=${encodeURIComponent(JSON.stringify(scores))}; max-age=31536000; path=/; SameSite=Lax`;
}

function updateScoreStats() {
    const scores = getScores();

    if (scores.length === 0) {
        scoreStats.textContent = 'Aucun score enregistré.';
        return;
    }

    const average = Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
    const best = Math.min(...scores);
    scoreStats.textContent = `Meilleur score : ${best} s | Moyenne : ${average} s`;
}

function startGame() {
    stopTimer();
    if (comparisonTimeoutId !== null) {
        clearTimeout(comparisonTimeoutId);
        comparisonTimeoutId = null;
    }
    selectedCards = [];
    allCards = shuffleArray(duplicateArray(cards));
    isLocked = false;
    isGameOver = false;
    elapsedSeconds = 0;
    timerElement.textContent = '0 s';
    gameMessage.textContent = '';
    gameBoard.replaceChildren();

    allCards.forEach((cardValue) => {
        gameBoard.appendChild(createCard(cardValue));
    });

    startTimer();
}

function cardOnClick(e) {
    const card = e.currentTarget;

    if (
        isLocked ||
        isGameOver ||
        selectedCards.length >= 2 ||
        card.classList.contains('flip') ||
        card.classList.contains('matched')
    ) {
        return;
    }

    card.classList.add('flip');

    selectedCards.push(card);

    if (selectedCards.length === 2) {
        isLocked = true;
        comparisonTimeoutId = setTimeout(() => {
            if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
                selectedCards[0].classList.add('matched');
                selectedCards[1].classList.add('matched');
            } else {
                selectedCards[0].classList.remove('flip');
                selectedCards[1].classList.remove('flip');
            }

            selectedCards = [];
            isLocked = false;
            comparisonTimeoutId = null;
            checkVictory();
        }, 1000);
    }
}

restartButton.addEventListener('click', startGame);
updateScoreStats();
startGame();