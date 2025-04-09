using System;
using System.Collections.Generic;
using System.Linq;

namespace CardGameCore.Mechanics
{
    public class Rules
    {
        public void InitializeDecks(Player player1, Player player2)
        {
            // Create and shuffle a standard 52-card deck
            var deck = new List<Card>();
            foreach (var suit in Enum.GetValues(typeof(Suit)))
            {
                for (int rank = 2; rank <= 14; rank++) // 2-10, Jack (11), Queen (12), King (13), Ace (14)
                {
                    deck.Add(new Card { Suit = (Suit)suit, Rank = rank });
                }
            }
            var shuffledDeck = deck.OrderBy(_ => Guid.NewGuid()).ToList();

            // Split the deck between two players
            player1.Hand = shuffledDeck.Take(26).ToList();
            player2.Hand = shuffledDeck.Skip(26).Take(26).ToList();
        }

        public bool IsGameOver(Player[] players)
        {
            // Game is over if any player has no cards left
            return players.Any(player => player.Hand.Count == 0);
        }

        public Player DetermineRoundWinner(Player player1, Player player2, out List<Card> cardsInPlay)
        {
            // Compare the top cards of each player's hand
            var cards = new List<Card>
            {
                player1.Hand.First(),
                player2.Hand.First()
            };

            player1.Hand.RemoveAt(0);
            player2.Hand.RemoveAt(0);

            cardsInPlay = cards;

            if (cards[0].Rank > cards[1].Rank)
            {
                return player1;
            }
            else if (cards[1].Rank > cards[0].Rank)
            {
                return player2;
            }
            else
            {
                return null; // It's a tie (War scenario)
            }
        }

        public void HandleWar(Player player1, Player player2, List<Card> cardsInPlay)
        {
            // Handle the "War" scenario
            if (player1.Hand.Count < 4 || player2.Hand.Count < 4)
            {
                throw new InvalidOperationException("A player does not have enough cards to continue the War.");
            }

            cardsInPlay.AddRange(player1.Hand.Take(4));
            cardsInPlay.AddRange(player2.Hand.Take(4));

            player1.Hand.RemoveRange(0, 4);
            player2.Hand.RemoveRange(0, 4);
        }

        public void EnforceRules(Player winner, List<Card> cardsInPlay)
        {
            // The winner takes all cards in play and adds them to the bottom of their hand
            if (winner != null)
            {
                winner.Hand.AddRange(cardsInPlay);
            }
        }
    }
}