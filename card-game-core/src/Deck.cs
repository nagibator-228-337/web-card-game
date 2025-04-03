using System;
using System.Collections.Generic;

public class Deck
{
    private List<Card> cards;
    private Random random;

    public Deck()
    {
        cards = new List<Card>();
        random = new Random();
        InitializeDeck();
    }

    private void InitializeDeck()
    {
        // Assuming Card has a constructor that takes Suit and Rank
        foreach (Suit suit in Enum.GetValues(typeof(Suit)))
        {
            foreach (Rank rank in Enum.GetValues(typeof(Rank)))
            {
                cards.Add(new Card(suit, rank));
            }
        }
    }

    public void Shuffle()
    {
        int n = cards.Count;
        while (n > 1)
        {
            int k = random.Next(n--);
            Card temp = cards[n];
            cards[n] = cards[k];
            cards[k] = temp;
        }
    }

    public Card DrawCard()
    {
        if (cards.Count == 0)
        {
            throw new InvalidOperationException("No cards left in the deck.");
        }
        Card drawnCard = cards[cards.Count - 1];
        cards.RemoveAt(cards.Count - 1);
        return drawnCard;
    }

    public void ReturnToDeck(List<Card> returnedCards)
    {
        cards.AddRange(returnedCards);
        Shuffle(); // Optionally shuffle the deck after returning cards
    }

    public int CardsRemaining()
    {
        return cards.Count;
    }
}