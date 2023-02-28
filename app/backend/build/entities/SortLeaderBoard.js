"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SortLeaderBoard {
    constructor(leaderBoard) {
        this.leaderBoard = leaderBoard;
    }
    sortLeaderBoard() {
        this.leaderBoard.sort((a, b) => {
            if (a.totalPoints > b.totalPoints)
                return -1;
            if (a.totalPoints === b.totalPoints) {
                if (a.totalVictories > b.totalVictories)
                    return -1;
                if (a.totalVictories === b.totalVictories) {
                    return SortLeaderBoard.sortGoalsBoard(a, b);
                }
            }
            return 1;
        });
        return this.leaderBoard;
    }
    static sortGoalsBoard(a, b) {
        if (a.goalsBalance > b.goalsBalance)
            return -1;
        if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor > b.goalsFavor)
                return -1;
            if (a.goalsFavor === b.goalsFavor && b.goalsOwn > a.goalsOwn)
                return -1;
        }
        return 1;
    }
}
exports.default = SortLeaderBoard;
//# sourceMappingURL=SortLeaderBoard.js.map