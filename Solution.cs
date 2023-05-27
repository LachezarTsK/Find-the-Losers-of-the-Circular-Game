
using System;

public class Solution
{
    public int[] CircularGameLosers(int totalPlayers, int steps)
    {
        bool[] ballReceivedByPlayer = new bool[totalPlayers];
        int uniqueBallReceptions = countUniqueBallReceptions(ballReceivedByPlayer, totalPlayers, steps);
        return extractLosersFromAllPlayers(ballReceivedByPlayer, totalPlayers, uniqueBallReceptions);
    }

    private int countUniqueBallReceptions(bool[] ballReceivedByPlayer, int totalPlayers, int steps)
    {
        int currentPlayer = 0;
        int uniqueBallReceptions = 1;
        ballReceivedByPlayer[currentPlayer] = true;

        while (true)
        {
            int nextPlayer = (currentPlayer + uniqueBallReceptions * steps) % totalPlayers;
            if (ballReceivedByPlayer[nextPlayer])
            {
                break;
            }

            ++uniqueBallReceptions;
            currentPlayer = nextPlayer;
            ballReceivedByPlayer[nextPlayer] = true;
        }
        return uniqueBallReceptions;
    }

    private int[] extractLosersFromAllPlayers(bool[] ballReceivedByPlayer, int totalPlayers, int countUniqueBallReceptions)
    {
        int index = 0;
        int[] circularGameLosers = new int[totalPlayers - countUniqueBallReceptions];
        for (int i = 0; i < totalPlayers; ++i)
        {
            if (!ballReceivedByPlayer[i])
            {
                circularGameLosers[index] = i + 1;//PlayerID for the results start from 1.
                ++index;
            }
        }
        return circularGameLosers;
    }
}
