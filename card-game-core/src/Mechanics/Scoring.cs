using System;
using System.Collections.Generic;

namespace CardGameCore.Mechanics
{
    public class Scoring
    {
        private Dictionary<string, int> playerScores;

        public Scoring()
        {
            playerScores = new Dictionary<string, int>();
        }

        public void AddScore(string playerName, int score)
        {
            if (playerScores.ContainsKey(playerName))
            {
                playerScores[playerName] += score;
            }
            else
            {
                playerScores[playerName] = score;
            }
        }

        public int GetScore(string playerName)
        {
            return playerScores.ContainsKey(playerName) ? playerScores[playerName] : 0;
        }

        public string GetWinner()
        {
            int maxScore = int.MinValue;
            string winner = null;

            foreach (var player in playerScores)
            {
                if (player.Value > maxScore)
                {
                    maxScore = player.Value;
                    winner = player.Key;
                }
            }

            return winner;
        }

        public void ResetScores()
        {
            playerScores.Clear();
        }
    }
}