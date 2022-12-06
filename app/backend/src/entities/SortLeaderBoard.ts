import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class SortLeaderBoard {
  constructor(private leaderBoard: ILeaderBoard[]) {}

  public sortLeaderBoard(): ILeaderBoard[] {
    this.leaderBoard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories > b.totalVictories) return -1;
        if (a.totalVictories === b.totalVictories) {
          return SortLeaderBoard.sortGoalsBoard(a, b);
        }
      }

      return 1;
    });

    return this.leaderBoard;
  }

  private static sortGoalsBoard(a: ILeaderBoard, b: ILeaderBoard) {
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance === b.goalsBalance) {
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor === b.goalsFavor && b.goalsOwn > a.goalsOwn) return -1;
    }

    return 1;
  }
}
