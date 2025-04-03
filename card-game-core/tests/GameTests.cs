using NUnit.Framework;

[TestFixture]
public class GameTests
{
    private Game game;

    [SetUp]
    public void Setup()
    {
        game = new Game();
    }

    [Test]
    public void TestGameInitialization()
    {
        Assert.IsNotNull(game);
        Assert.AreEqual(0, game.Players.Count);
        Assert.IsFalse(game.IsGameOver);
    }

    [Test]
    public void TestAddPlayer()
    {
        var player = new Player("Alice");
        game.AddPlayer(player);
        
        Assert.AreEqual(1, game.Players.Count);
        Assert.AreEqual("Alice", game.Players[0].Name);
    }

    [Test]
    public void TestStartGame()
    {
        game.AddPlayer(new Player("Alice"));
        game.AddPlayer(new Player("Bob"));
        game.StartGame();
        
        Assert.IsTrue(game.IsGameStarted);
        Assert.AreEqual(2, game.Players.Count);
    }

    [Test]
    public void TestGameOver()
    {
        game.AddPlayer(new Player("Alice"));
        game.AddPlayer(new Player("Bob"));
        game.StartGame();
        
        // Simulate game actions that lead to game over
        game.EndGame();
        
        Assert.IsTrue(game.IsGameOver);
    }
}