using NUnit.Framework;

[TestFixture]
public class PlayerTests
{
    private Player player;

    [SetUp]
    public void Setup()
    {
        player = new Player("TestPlayer");
    }

    [Test]
    public void PlayerInitialization_ShouldSetName()
    {
        Assert.AreEqual("TestPlayer", player.Name);
    }

    [Test]
    public void PlayerHand_ShouldBeEmptyOnInitialization()
    {
        Assert.IsEmpty(player.Hand);
    }

    [Test]
    public void PlayerCanAddCardToHand()
    {
        Card card = new Card(Suit.Hearts, Rank.Ace);
        player.AddCard(card);
        Assert.Contains(card, player.Hand);
    }

    [Test]
    public void PlayerCanRemoveCardFromHand()
    {
        Card card = new Card(Suit.Spades, Rank.King);
        player.AddCard(card);
        player.RemoveCard(card);
        Assert.IsFalse(player.Hand.Contains(card));
    }

    [Test]
    public void PlayerScore_ShouldInitializeToZero()
    {
        Assert.AreEqual(0, player.Score);
    }

    [Test]
    public void PlayerScore_ShouldUpdateCorrectly()
    {
        player.UpdateScore(10);
        Assert.AreEqual(10, player.Score);
    }
}