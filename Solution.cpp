
#include <vector>
using namespace std;

class Solution {
    
public:
    vector<int> circularGameLosers(int totalPlayers, int steps) const {
        vector<bool> ballReceivedByPlayer(totalPlayers);
        int uniqueBallReceptions = countUniqueBallReceptions(ballReceivedByPlayer, totalPlayers, steps);
        return extractLosersFromAllPlayers(ballReceivedByPlayer, totalPlayers, uniqueBallReceptions);
    }

private:
    int countUniqueBallReceptions(vector<bool>& ballReceivedByPlayer, int totalPlayers, int steps) const {
        int currentPlayer = 0;
        int uniqueBallReceptions = 1;
        ballReceivedByPlayer[currentPlayer] = true;

        while (true) {
            int nextPlayer = (currentPlayer + uniqueBallReceptions * steps) % totalPlayers;
            if (ballReceivedByPlayer[nextPlayer]) {
                break;
            }

            ++uniqueBallReceptions;
            currentPlayer = nextPlayer;
            ballReceivedByPlayer[nextPlayer] = true;
        }
        return uniqueBallReceptions;
    }

    vector<int> extractLosersFromAllPlayers(const vector<bool>& ballReceivedByPlayer, int totalPlayers, int countUniqueBallReceptions) const {
        int index = 0;
        vector<int> circularGameLosers(totalPlayers - countUniqueBallReceptions);
        for (int i = 0; i < totalPlayers; ++i) {
            if (!ballReceivedByPlayer[i]) {
                circularGameLosers[index] = i + 1; //PlayerID for the results start from 1.
                ++index;
            }
        }
        return circularGameLosers;
    }
};
