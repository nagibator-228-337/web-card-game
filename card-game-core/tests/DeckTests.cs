using NUnit.Framework;
using System.Collections.Generic;

[TestFixture]
public class DeckTests
{
    private Deck deck;

    [SetUp]
    public void Setup()
    {
        deck = new Deck();
    }

    [Test]
    public void Deck_Should_Initialize_With_52_Cards()
    {
        Assert.AreEqual(52, deck.Cards.Count);
    }

    [Test]
    public void Shuffle_Should_Randomize_Card_Order()
    {
        var originalOrder = new List<Card>(deck.Cards);
        deck.Shuffle();
        Assert.AreNotEqual(originalOrder, deck.Cards);
    }

    [Test]
    public void Draw_Should_Remove_Top_Card_From_Deck()
    {
        var topCard = deck.Cards[0];
        var drawnCard = deck.Draw();
        Assert.AreEqual(topCard, drawnCard);
        Assert.AreEqual(51, deck.Cards.Count);
    }

    [Test]
    public void Draw_Should_Return_Null_When_Deck_Is_Empty()
    {
        for (int i = 0; i < 52; i++)
        {
            deck.Draw();
        }
        var drawnCard = deck.Draw();
        Assert.IsNull(drawnCard);
    }

    [Test]
    public void Reset_Should_Return_Deck_To_Original_State()
    {
        deck.Shuffle();
        deck.Reset();
        Assert.AreEqual(52, deck.Cards.Count);
    }
}