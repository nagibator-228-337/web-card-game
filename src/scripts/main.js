// Initialize the deck and players
let deck = [];
let player1Deck = [];
let player2Deck = [];
let centerPile = [];
let currentPlayer = 1; // Track whose turn it is (1 = Player 1, 2 = Player 2)

// Card values and suits
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = [
  { rank: 2, name: '2' },
  { rank: 3, name: '3' },
  { rank: 4, name: '4' },
  { rank: 5, name: '5' },
  { rank: 6, name: '6' },
  { rank: 7, name: '7' },
  { rank: 8, name: '8' },
  { rank: 9, name: '9' },
  { rank: 10, name: '10' },
  { rank: 11, name: 'Jack' },
  { rank: 12, name: 'Queen' },
  { rank: 13, name: 'King' },
  { rank: 14, name: 'Ace' }
];

// DOM Elements
const player1CardArea = document.getElementById('player1-card');
const player2CardArea = document.getElementById('player2-card');
const centerCardsArea = document.getElementById('center-cards');
const player1DrawButton = document.getElementById('player1-draw');
const player2DrawButton = document.getElementById('player2-draw');
const player1DeckArea = document.getElementById('player1-deck');
const player2DeckArea = document.getElementById('player2-deck');
const player1Count = document.getElementById('player1-count');
const player2Count = document.getElementById('player2-count');
const warStatus = document.getElementById('war-status');

// Create and shuffle the deck
function createDeck() {
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ ...value, suit });
    });
  });
  deck = deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

// Deal cards to players
function dealCards() {
  player1Deck = deck.slice(0, 26);
  player2Deck = deck.slice(26);
  
  // Animate initial deal
  animateInitialDeal();
  updateCardCounts();
}

function animateInitialDeal() {
  const dealDelay = 50;
  player1Deck.forEach((_, index) => {
    setTimeout(() => {
      const card = document.createElement('div');
      card.className = 'card-back dealing';
      player1DeckArea.appendChild(card);
      setTimeout(() => card.remove(), 500);
    }, index * dealDelay);
  });

  player2Deck.forEach((_, index) => {
    setTimeout(() => {
      const card = document.createElement('div');
      card.className = 'card-back dealing';
      player2DeckArea.appendChild(card);
      setTimeout(() => card.remove(), 500);
    }, (index + 26) * dealDelay);
  });
}

function updateCardCounts() {
  player1Count.textContent = player1Deck.length;
  player2Count.textContent = player2Deck.length;
}

function updateButtonStates() {
  if (centerPile.length === 0) {
    player1DrawButton.disabled = currentPlayer !== 1;
    player2DrawButton.disabled = true; // Всегда отключена, пока первый игрок не сходил
  } else if (centerPile.length === 1) {
    player1DrawButton.disabled = true;
    player2DrawButton.disabled = currentPlayer !== 2;
  } else {
    player1DrawButton.disabled = true;
    player2DrawButton.disabled = true;
  }
}

function animateCardDraw(player, card) {
  const playerArea = player === 1 ? player1CardArea : player2CardArea;
  const deckArea = player === 1 ? player1DeckArea : player2DeckArea;
  
  const cardElement = document.createElement('img');
  cardElement.src = `src/assets/cards/${card.name.toLowerCase()}_of_${card.suit}.png`;
  cardElement.className = 'card-image drawing-card';
  
  const deckRect = deckArea.getBoundingClientRect();
  const targetRect = playerArea.getBoundingClientRect();
  
  cardElement.style.left = `${deckRect.left}px`;
  cardElement.style.top = `${deckRect.top}px`;
  cardElement.style.setProperty('--targetX', `${targetRect.left - deckRect.left}px`);
  cardElement.style.setProperty('--targetY', `${targetRect.top - deckRect.top}px`);
  
  document.body.appendChild(cardElement);
  
  return new Promise(resolve => {
    cardElement.addEventListener('animationend', () => {
      cardElement.remove();
      playerArea.innerHTML = `<img src="src/assets/cards/${card.name.toLowerCase()}_of_${card.suit}.png" alt="${card.name} of ${card.suit}" class="card-image">`;
      resolve();
    });
  });
}

// Draw a card for a player
async function drawCard(player) {
  if ((player === 1 && player1Deck.length > 0) || (player === 2 && player2Deck.length > 0)) {
    const deck = player === 1 ? player1Deck : player2Deck;
    const card = deck.shift();
    await animateCardDraw(player, card);
    centerPile.push(card);
    updateCardCounts();
    return card;
  }
  return null;
}

// Compare cards and determine the winner
async function compareCards(card1, card2) {
  player1DrawButton.disabled = true;
  player2DrawButton.disabled = true;
  
  const winner = card1.rank > card2.rank ? 1 : card1.rank < card2.rank ? 2 : 0;
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (winner === 1 || winner === 2) {
    const losingCard = winner === 1 ? 
      player2CardArea.querySelector('.card-image') : 
      player1CardArea.querySelector('.card-image');
    const winningCard = winner === 1 ? 
      player1CardArea.querySelector('.card-image') : 
      player2CardArea.querySelector('.card-image');
    
    // Очищаем карты сразу после создания копий для анимации
    const losingCardSrc = losingCard.src;
    const winningCardSrc = winningCard.src;
    player1CardArea.innerHTML = '';
    player2CardArea.innerHTML = '';
    
    // Создаем копии для анимации
    const winnerDeckArea = winner === 1 ? player1DeckArea : player2DeckArea;
    const deckRect = winnerDeckArea.getBoundingClientRect();
    
    [{ card: losingCard, src: losingCardSrc }, { card: winningCard, src: winningCardSrc }].forEach(({ src }) => {
      const cardRect = losingCard.getBoundingClientRect();
      const cardCopy = document.createElement('img');
      cardCopy.src = src;
      cardCopy.className = 'card-image moving-to-deck';
      cardCopy.style.position = 'fixed';
      cardCopy.style.left = `${cardRect.left}px`;
      cardCopy.style.top = `${cardRect.top}px`;
      cardCopy.style.setProperty('--deckX', `${deckRect.left - cardRect.left}px`);
      cardCopy.style.setProperty('--deckY', `${deckRect.top - cardRect.top}px`);
      
      document.body.appendChild(cardCopy);
      
      cardCopy.addEventListener('animationend', () => {
        cardCopy.remove();
      });
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const winnerDeck = winner === 1 ? player1Deck : player2Deck;
    winnerDeck.push(...centerPile);
    centerPile = [];
    updateCardCounts();
    centerCardsArea.textContent = `Player ${winner} wins the round!`;
  } else {
    warStatus.textContent = 'War!';
    handleWar();
  }
  
  currentPlayer = 1;
  updateButtonStates();
  checkGameOver();
}

function animateCardsToWinner(winner) {
  const cards = document.querySelectorAll('.card-image');
  cards.forEach(card => {
    card.classList.add('collecting');
    card.style.transform = `translateY(${winner === 1 ? '-' : ''}200px)`;
  });
}

// Handle war logic
async function handleWar() {
  if (player1Deck.length < 4 || player2Deck.length < 4) {
    centerCardsArea.textContent = 'Game Over! Not enough cards for war.';
    return;
  }

  centerCardsArea.innerHTML = '<div class="war-area"><div class="war-pile" id="war-pile1"></div><div class="war-pile" id="war-pile2"></div></div>';
  const warPile1 = document.getElementById('war-pile1');
  const warPile2 = document.getElementById('war-pile2');

  // Добавляем начальные карты, которые вызвали war
  const initialCard1 = centerPile[centerPile.length - 2];
  const initialCard2 = centerPile[centerPile.length - 1];
  warPile1.innerHTML = `<div class="war-stack"><img src="src/assets/cards/${initialCard1.name.toLowerCase()}_of_${initialCard1.suit}.png" class="war-card"></div>`;
  warPile2.innerHTML = `<div class="war-stack"><img src="src/assets/cards/${initialCard2.name.toLowerCase()}_of_${initialCard2.suit}.png" class="war-card"></div>`;

  // Добавляем 3 карты рубашкой вверх для каждого игрока
  const warCards1 = [];
  const warCards2 = [];

  for (let i = 0; i < 3; i++) {
    warCards1.push(player1Deck.shift());
    warCards2.push(player2Deck.shift());
    
    const stack1 = warPile1.querySelector('.war-stack');
    const stack2 = warPile2.querySelector('.war-stack');
    
    stack1.innerHTML += `<div class="war-card face-down"></div>`;
    stack2.innerHTML += `<div class="war-card face-down"></div>`;
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Добавляем финальные карты для сравнения
  const finalCard1 = player1Deck.shift();
  const finalCard2 = player2Deck.shift();
  
  warCards1.push(finalCard1);
  warCards2.push(finalCard2);
  centerPile.push(...warCards1, ...warCards2);

  await new Promise(resolve => setTimeout(resolve, 500));

  const stack1 = warPile1.querySelector('.war-stack');
  const stack2 = warPile2.querySelector('.war-stack');
  
  stack1.innerHTML += `<img src="src/assets/cards/${finalCard1.name.toLowerCase()}_of_${finalCard1.suit}.png" class="war-card">`;
  stack2.innerHTML += `<img src="src/assets/cards/${finalCard2.name.toLowerCase()}_of_${finalCard2.suit}.png" class="war-card">`;

  await new Promise(resolve => setTimeout(resolve, 1000));

  if (finalCard1.rank > finalCard2.rank) {
    player1Deck.push(...centerPile);
    centerPile = [];
    centerCardsArea.textContent = 'Player 1 wins the war!';
  } else if (finalCard2.rank > finalCard1.rank) {
    player2Deck.push(...centerPile);
    centerPile = [];
    centerCardsArea.textContent = 'Player 2 wins the war!';
  } else {
    centerCardsArea.textContent = 'Another tie! War continues!';
    handleWar();
  }

  updateCardCounts();
  currentPlayer = 1;
  updateButtonStates();
}

// Check if the game is over
function checkGameOver() {
  if (player1Deck.length === 0) {
    centerCardsArea.innerHTML = '<div class="victory-message">Player 2 Wins the Game!</div>';
  } else if (player2Deck.length === 0) {
    centerCardsArea.innerHTML = '<div class="victory-message">Player 1 Wins the Game!</div>';
  }
}

// Event listeners for draw buttons
player1DrawButton.addEventListener('click', async () => {
  if (currentPlayer === 1 && centerPile.length === 0) {
    player1DrawButton.disabled = true;
    const card1 = await drawCard(1);
    if (card1) {
      currentPlayer = 2;
      updateButtonStates();
    }
  }
});

player2DrawButton.addEventListener('click', async () => {
  if (currentPlayer === 2 && centerPile.length === 1) { // Изменено условие
    player2DrawButton.disabled = true;
    const card2 = await drawCard(2);
    if (card2) {
      compareCards(centerPile[0], card2);
      updateButtonStates();
    }
  }
});

// Initialize the game
createDeck();
dealCards();
updateButtonStates();