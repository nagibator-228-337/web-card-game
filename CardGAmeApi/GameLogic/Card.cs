public class Card
{
    public string Suit { get; set; }
    public string Rank { get; set; }

    public Card(string suit, string rank)
    {
        Suit = suit;
        Rank = rank;
    }

    public int CompareTo(Card other)
    {
        if (Rank == other.Rank)
        {
            return 0;
        }

        // Assuming a simple comparison based on rank order
        // This can be expanded based on the game's rules
        return GetRankValue(Rank).CompareTo(GetRankValue(other.Rank));
    }

    private int GetRankValue(string rank)
    {
        switch (rank)
        {
            case "2": return 2;
            case "3": return 3;
            case "4": return 4;
            case "5": return 5;
            case "6": return 6;
            case "7": return 7;
            case "8": return 8;
            case "9": return 9;
            case "10": return 10;
            case "J": return 11;
            case "Q": return 12;
            case "K": return 13;
            case "A": return 14;
            default: throw new ArgumentException("Invalid rank");
        }
    }
}