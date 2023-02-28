"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeaderBoard {
    constructor(teams, matches, homeOrAway) {
        this.teams = teams;
        this.matches = matches;
        this.homeOrAway = homeOrAway;
        this.board = {
            name: '',
            totalPoints: 0,
            totalGames: 0,
            totalVictories: 0,
            totalDraws: 0,
            totalLosses: 0,
            goalsFavor: 0,
            goalsOwn: 0,
            goalsBalance: 0,
            efficiency: '',
        };
    }
    get getBoard() {
        return this.board;
    }
    createBoard() {
        const boardList = this.teams.map((team) => {
            this.resetBoard();
            for (let index = 0; index < this.matches.length; index += 1) {
                if (this.homeOrAway && team.id === this.matches[index][this.homeOrAway]) {
                    this.finishingBoard(team, index);
                }
                if (!this.homeOrAway)
                    this.allMatches(team, index);
            }
            return this.getBoard;
        });
        return boardList;
    }
    checkHomeOrAway(index) {
        const obj = {
            homeGoals: this.homeOrAway === 'homeTeam'
                ? this.matches[index].homeTeamGoals : this.matches[index].awayTeamGoals,
            awayGoals: this.homeOrAway === 'awayTeam'
                ? this.matches[index].homeTeamGoals : this.matches[index].awayTeamGoals,
        };
        return obj;
    }
    matchGoals(homeGoals, awayGoals) {
        this.board.goalsFavor += homeGoals;
        this.board.goalsOwn += awayGoals;
        this.board.goalsBalance = this.board.goalsFavor - this.board.goalsOwn;
    }
    matchResult(homeGoals, awayGoals) {
        this.board.totalGames += 1;
        if (homeGoals > awayGoals) {
            this.board.totalPoints += 3;
            this.board.totalVictories += 1;
        }
        if (homeGoals < awayGoals) {
            this.board.totalPoints += 0;
            this.board.totalLosses += 1;
        }
        if (homeGoals === awayGoals) {
            this.board.totalPoints += 1;
            this.board.totalDraws += 1;
        }
        this.board.efficiency = `${((this.board.totalPoints / (this.board.totalGames * 3)) * 100)
            .toFixed(2)}`;
    }
    allMatches(team, index) {
        if (team.id === this.matches[index].homeTeam) {
            this.homeOrAway = 'homeTeam';
            this.finishingBoard(team, index);
            this.homeOrAway = undefined;
        }
        if (team.id === this.matches[index].awayTeam) {
            this.homeOrAway = 'awayTeam';
            this.finishingBoard(team, index);
            this.homeOrAway = undefined;
        }
    }
    finishingBoard(team, index) {
        const { homeGoals, awayGoals } = this.checkHomeOrAway(index);
        // const { awayGoals } = this.checkHomeOrAway(index);
        this.board.name = team.teamName;
        this.matchGoals(homeGoals, awayGoals);
        this.matchResult(homeGoals, awayGoals);
    }
    resetBoard() {
        this.board = {
            name: '',
            totalPoints: 0,
            totalGames: 0,
            totalVictories: 0,
            totalDraws: 0,
            totalLosses: 0,
            goalsFavor: 0,
            goalsOwn: 0,
            goalsBalance: 0,
            efficiency: '',
        };
    }
}
exports.default = LeaderBoard;
//# sourceMappingURL=LeaderBoard.js.map