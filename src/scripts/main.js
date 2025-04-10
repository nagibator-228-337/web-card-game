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
}

// Draw a card for a player
function drawCard(player) {
  if (player === 1 && player1Deck.length > 0) {
    const card = player1Deck.shift();
    player1CardArea.textContent = `${card.name} of ${card.suit}`;
    centerPile.push(card);
    return card;
  } else if (player === 2 && player2Deck.length > 0) {
    const card = player2Deck.shift();
    player2CardArea.textContent = `${card.name} of ${card.suit}`;
    centerPile.push(card);
    return card;
  }
  return null;
}

// Compare cards and determine the winner
function compareCards(card1, card2) {
  if (card1.rank > card2.rank) {
    player1Deck.push(...centerPile);
    centerPile = [];
    centerCardsArea.textContent = 'Player 1 wins the round!';
  } else if (card2.rank > card1.rank) {
    player2Deck.push(...centerPile);
    centerPile = [];
    centerCardsArea.textContent = 'Player 2 wins the round!';
  } else {
    centerCardsArea.textContent = 'War!';
    handleWar();
  }
  currentPlayer = 1; // Reset to Player 1's turn
}

// Handle war logic
function handleWar() {
  if (player1Deck.length < 4 || player2Deck.length < 4) {
    centerCardsArea.textContent = 'Game Over! Not enough cards for war.';
    return;
  }

  // Each player places three cards face down and one face up
  const warCards = [];
  for (let i = 0; i < 4; i++) {
    warCards.push(player1Deck.shift());
    warCards.push(player2Deck.shift());
  }

  const player1WarCard = warCards[warCards.length - 2];
  const player2WarCard = warCards[warCards.length - 1];

  centerPile.push(...warCards);

  if (player1WarCard.rank > player2WarCard.rank) {
    player1Deck.push(...centerPile);
    centerPile = [];
    centerCardsArea.textContent = 'Player 1 wins the war!';
  } else if (player2WarCard.rank > player1WarCard.rank) {
    player2Deck.push(...centerPile);
    centerPile = [];
    centerCardsArea.textContent = 'Player 2 wins the war!';
  } else {
    centerCardsArea.textContent = 'Another tie! War continues!';
    handleWar(); // Recursive call for another war
  }
}

// Event listeners for draw buttons
player1DrawButton.addEventListener('click', () => {
  if (currentPlayer === 1 && centerPile.length === 0) {
    const card1 = drawCard(1);
    const card2 = drawCard(2);
    if (card1 && card2) {
      compareCards(card1, card2);
    }
    currentPlayer = 2; // Switch to Player 2's turn
  }
});

player2DrawButton.addEventListener('click', () => {
  if (currentPlayer === 2 && centerPile.length === 0) {
    const card1 = drawCard(1);
    const card2 = drawCard(2);
    if (card1 && card2) {
      compareCards(card1, card2);
    }
    currentPlayer = 1; // Switch to Player 1's turn
  }
});

// Initialize the game
createDeck();
dealCards();