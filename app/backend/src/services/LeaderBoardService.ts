import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import LeaderBoard from '../entities/LeaderBoard';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import SortLeaderBoard from '../entities/SortLeaderBoard';

export default class LeaderboardService {
  constructor(
    private homeOrAway: 'homeTeam' | 'awayTeam' | undefined,
    private teamModel = TeamModel,
    private matchModel = MatchModel,
  ) {}

  public async createLeaderBoard(): Promise <ILeaderBoard[]> {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findAll({ where: { inProgress: false } });

    const createLeaderboard = new LeaderBoard(allTeams, allMatches, this.homeOrAway);

    const leaderBoard = createLeaderboard.createBoard();

    const sortLeaderBoard = new SortLeaderBoard(leaderBoard);

    const result = sortLeaderBoard.sortLeaderBoard();

    return result;
  }
}
