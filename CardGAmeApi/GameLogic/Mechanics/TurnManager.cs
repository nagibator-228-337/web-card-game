using System;
using System.Collections.Generic;

namespace CardGameCore.Mechanics
{
    public class TurnManager
    {
        private List<Player> players;
        private int currentPlayerIndex;

        public TurnManager(List<Player> players)
        {
            this.players = players;
            currentPlayerIndex = 0;
        }

        public Player CurrentPlayer => players[currentPlayerIndex];

        public void NextTurn()
        {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.Count;
        }

        public void ResetTurns()
        {
            currentPlayerIndex = 0;
        }

        public int GetCurrentPlayerIndex()
        {
            return currentPlayerIndex;
        }
    }
}