# web-card-game

**War Card Game (Drunkard)**  
**Description**  

The War Card Game is a classic card game "Drunkard" (or "War"), implemented as a web application using Node.js, Express, Vue.js, and Socket.IO. The game allows two players to compete against each other in real-time through a web browser.  

**Technology Stack:**

- **Frontend**: Vue.js, Socket.IO (client-side)
- **Backend**: Node.js, Express, Socket.IO (server-side)
- **WebSocket**: Implemented for real-time data exchange between players  

**Game Rules**  
**Objective of the Game:**  
The goal of the game is to capture all the opponent's cards and become the winner.  

**Card Dealing:**

- A deck of 52 cards is divided equally between the two players.  
- The cards are hidden and revealed one by one in each round.  

**Gameplay:**  

- Players simultaneously draw one card. The winner is the one with the higher card.  
- The defeated player's cards go to the winner and are placed at the end of the winner's deck.  
- If the cards are the same, a "War" begins:  
  - Both players place three cards face down and one card face up.  
  - The last face-up card determines who wins all the cards.  
  - If there is another tie, the war repeats.  

**End of the Game:**  
The game ends when one player captures all the cards.  
If a player runs out of cards, they lose.  

**Shuffling the Cards:**  
After each round, the winner shuffles their captured cards before placing them at the end of their deck.
