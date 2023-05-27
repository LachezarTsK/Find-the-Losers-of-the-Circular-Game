
/**
 * @param {number} totalPlayers
 * @param {number} steps
 * @return {number[]}
 */
var circularGameLosers = function (totalPlayers, steps) {
    const ballReceivedByPlayer = new Array(totalPlayers).fill(false);
    let uniqueBallReceptions = countUniqueBallReceptions(ballReceivedByPlayer, totalPlayers, steps);
    return extractLosersFromAllPlayers(ballReceivedByPlayer, totalPlayers, uniqueBallReceptions);
};

/**
 * @param {boolean[]} ballReceivedByPlayer
 * @param {number} totalPlayers
 * @param {number} steps 
 * @return {number}
 */
function countUniqueBallReceptions(ballReceivedByPlayer, totalPlayers, steps) {
    let currentPlayer = 0;
    let uniqueBallReceptions = 1;
    ballReceivedByPlayer[currentPlayer] = true;

    while (true) {
        let nextPlayer = (currentPlayer + uniqueBallReceptions * steps) % totalPlayers;
        if (ballReceivedByPlayer[nextPlayer]) {
            break;
        }

        ++uniqueBallReceptions;
        currentPlayer = nextPlayer;
        ballReceivedByPlayer[nextPlayer] = true;
    }
    return uniqueBallReceptions;
}

/**
 * @param {boolean[]} ballReceivedByPlayer
 * @param {number} totalPlayers
 * @param {number} countUniqueBallReceptions 
 * @return {number[]}
 */
function extractLosersFromAllPlayers(ballReceivedByPlayer, totalPlayers, countUniqueBallReceptions) {
    let index = 0;
    const circularGameLosers = new Array(totalPlayers - countUniqueBallReceptions);
    for (let i = 0; i < totalPlayers; ++i) {
        if (!ballReceivedByPlayer[i]) {
            circularGameLosers[index] = i + 1;//PlayerID for the results start from 1.
            ++index;
        }
    }
    return circularGameLosers;
}
