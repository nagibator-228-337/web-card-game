public class Player
{
    public string Name { get; set; }
    public int Score { get; set; }
    public List<Card> Hand { get; private set; }

    public Player(string name)
    {
        Name = name;
        Score = 0;
        Hand = new List<Card>();
    }

    public void AddCard(Card card)
    {
        Hand.Add(card);
    }

    public void RemoveCard(Card card)
    {
        Hand.Remove(card);
    }

    public void ClearHand()
    {
        Hand.Clear();
    }
}