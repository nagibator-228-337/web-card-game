using NUnit.Framework;

[TestFixture]
public class CardTests
{
    [Test]
    public void Card_Initialization_SetsPropertiesCorrectly()
    {
        // Arrange
        var card = new Card("Hearts", "Ace");

        // Act & Assert
        Assert.AreEqual("Hearts", card.Suit);
        Assert.AreEqual("Ace", card.Rank);
    }

    [Test]
    public void Card_CompareTo_ReturnsCorrectComparison()
    {
        // Arrange
        var card1 = new Card("Hearts", "Ace");
        var card2 = new Card("Diamonds", "King");

        // Act
        int result = card1.CompareTo(card2);

        // Assert
        Assert.IsTrue(result > 0); // Assuming Ace is higher than King
    }

    [Test]
    public void Card_ToString_ReturnsCorrectStringRepresentation()
    {
        // Arrange
        var card = new Card("Spades", "Queen");

        // Act
        string result = card.ToString();

        // Assert
        Assert.AreEqual("Queen of Spades", result);
    }
}