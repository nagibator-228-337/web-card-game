# Card Game Core

This project implements the core mechanics for a card game. It includes classes for managing the game state, players, cards, and the rules of the game.

## Project Structure

- **src/**: Contains the main source code for the card game.
  - **Game.cs**: Main game class that manages game state and flow.
  - **Card.cs**: Represents a playing card with properties for Suit and Rank.
  - **Deck.cs**: Manages a collection of Card objects, including shuffling and drawing.
  - **Player.cs**: Represents a player, including player information and hand management.
  - **Mechanics/**: Contains classes for game mechanics.
    - **TurnManager.cs**: Manages turn-taking mechanics.
    - **Scoring.cs**: Handles the scoring system.
    - **Rules.cs**: Defines and enforces game rules.

- **tests/**: Contains unit tests for the game components.
  - **GameTests.cs**: Tests for the Game class.
  - **CardTests.cs**: Tests for the Card class.
  - **DeckTests.cs**: Tests for the Deck class.
  - **PlayerTests.cs**: Tests for the Player class.

- **CardGameCore.sln**: Solution file that organizes the project structure.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Build the solution using your preferred .NET build tool.
4. Run the game to start playing!

## Game Rules

- The game is played with a standard deck of cards.
- Players take turns drawing cards and playing them according to the rules defined in the `Rules.cs` file.
- Scoring is managed by the `Scoring.cs` class, which calculates scores based on player actions.

## Usage

To use this project, you can modify the classes in the `src` directory to implement your own game logic or rules. The tests in the `tests` directory can be run to ensure that your changes do not break existing functionality.