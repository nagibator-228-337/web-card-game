using System;
using System.Collections.Generic;

public class Game
{
    private List<Player> players;
    private Deck deck;
    private int currentPlayerIndex;

    public Game(int numberOfPlayers)
    {
        players = new List<Player>();
        deck = new Deck();
        currentPlayerIndex = 0;

        InitializePlayers(numberOfPlayers);
        deck.Shuffle();
    }

    private void InitializePlayers(int numberOfPlayers)
    {
        for (int i = 0; i < numberOfPlayers; i++)
        {
            players.Add(new Player($"Player {i + 1}"));
        }
    }

    public void StartGame()
    {
        while (!IsGameOver())
        {
            PlayTurn();
            currentPlayerIndex = (currentPlayerIndex + 1) % players.Count;
        }

        AnnounceWinner();
    }

    private void PlayTurn()
    {
        Player currentPlayer = players[currentPlayerIndex];
        // Logic for the current player's turn goes here
    }

    private bool IsGameOver()
    {
        // Logic to determine if the game is over
        return false;
    }

    private void AnnounceWinner()
    {
        // Logic to determine and announce the winner
    }
}