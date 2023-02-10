import ILeaderBoard from '../interfaces/ILeaderBoard';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import IHomeOrAwayGoals from '../interfaces/IHomeOrAwayGoals';

export default class LeaderBoard {
  private teams: TeamModel[];
  private matches: MatchModel[];
  private homeOrAway: 'homeTeam' | 'awayTeam' | undefined;
  private board: ILeaderBoard;

  constructor(teams: TeamModel[], matches: MatchModel[], homeOrAway?: 'homeTeam' | 'awayTeam') {
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

  private get getBoard() {
    return this.board;
  }

  public createBoard(): ILeaderBoard[] {
    const boardList = this.teams.map((team) => {
      this.resetBoard();

      for (let index = 0; index < this.matches.length; index += 1) {
        if (this.homeOrAway && team.id === this.matches[index][this.homeOrAway]) {
          this.finishingBoard(team, index);
        }
        if (!this.homeOrAway) this.allMatches(team, index);
      }

      return this.getBoard;
    });

    return boardList;
  }

  private checkHomeOrAway(index: number): IHomeOrAwayGoals {
    const obj = {
      homeGoals: this.homeOrAway === 'homeTeam'
        ? this.matches[index].homeTeamGoals : this.matches[index].awayTeamGoals,
      awayGoals: this.homeOrAway === 'awayTeam'
        ? this.matches[index].homeTeamGoals : this.matches[index].awayTeamGoals,
    };

    return obj;
  }

  private matchGoals(homeGoals: number, awayGoals: number) :void {
    this.board.goalsFavor += homeGoals;
    this.board.goalsOwn += awayGoals;
    this.board.goalsBalance = this.board.goalsFavor - this.board.goalsOwn;
  }

  private matchResult(homeGoals: number, awayGoals: number): void {
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

  private allMatches(team: TeamModel, index: number): void {
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

  private finishingBoard(team: TeamModel, index: number): void {
    const { homeGoals, awayGoals } = this.checkHomeOrAway(index);
    // const { awayGoals } = this.checkHomeOrAway(index);
    this.board.name = team.teamName;
    this.matchGoals(homeGoals, awayGoals);
    this.matchResult(homeGoals, awayGoals);
  }

  private resetBoard(): void {
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
