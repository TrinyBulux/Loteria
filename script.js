document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const shuffleScreen = document.getElementById('shuffle-screen');
    const reviewScreen = document.getElementById('review-screen');
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const reviewButton = document.getElementById('review-button');
    const resetButton = document.getElementById('reset-button');
    const backButton = document.getElementById('back-button');
    const currentCardImage = document.getElementById('current-card');
    const lastCardsContainer = document.getElementById('last-cards');
    const reviewCardsContainer = document.getElementById('review-cards');

    let deck = [];
    let drawnCards = [];

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', showNextCard);
    reviewButton.addEventListener('click', showReviewScreen);
    resetButton.addEventListener('click', confirmReset);
    backButton.addEventListener('click', backToShuffleScreen);

    function startGame() {
        mainScreen.classList.add('hidden');
        shuffleScreen.classList.remove('hidden');
        initializeDeck();
        showNextCard();
    }

    function initializeDeck() {
        deck = [];
        drawnCards = [];
        for (let i = 1; i <= 54; i++) {
            deck.push(`${String(i).padStart(2, '0')}.jpg`);
        }
        shuffleDeck(deck);
    }

    function shuffleDeck(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showNextCard() {
        if (deck.length > 0) {
            const nextCard = deck.pop();
            drawnCards.push(nextCard);
            updateCurrentCard(nextCard);
            updateLastCards();
        } else {
            alert('Todas las cartas han sido barajadas.');
        }
    }

    function updateCurrentCard(card) {
        currentCardImage.src = card;
    }

    function updateLastCards() {
        lastCardsContainer.innerHTML = '';
        const lastFiveCards = drawnCards.slice(-5);
        lastFiveCards.forEach(card => {
            const img = document.createElement('img');
            img.src = card;
            lastCardsContainer.appendChild(img);
        });
    }

    function showReviewScreen() {
        shuffleScreen.classList.add('hidden');
        reviewScreen.classList.remove('hidden');
        updateReviewCards();
    }

    function updateReviewCards() {
        reviewCardsContainer.innerHTML = '';
        drawnCards.forEach(card => {
            const img = document.createElement('img');
            img.src = card;
            reviewCardsContainer.appendChild(img);
        });
    }

    function backToShuffleScreen() {
        reviewScreen.classList.add('hidden');
        shuffleScreen.classList.remove('hidden');
    }

    function confirmReset() {
        if (confirm('¿Está seguro de que desea reiniciar el juego?')) {
            resetGame();
        }
    }

    function resetGame() {
        mainScreen.classList.remove('hidden');
        shuffleScreen.classList.add('hidden');
        reviewScreen.classList.add('hidden');
    }
});
