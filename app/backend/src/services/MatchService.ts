import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ICreateMatch from '../interfaces/ICreateMatch';
import VerifyTeams from '../validations/VerifyTeams';
import IUpdateGoals from '../interfaces/IUpdateGoals';

export default class MatchService {
  constructor(private matchModel = MatchModel, private teamModel = TeamModel) {}

  public async findByProgress(progress: string): Promise<MatchModel[]> {
    const inProgress = progress === 'true';

    if (!progress) {
      const result = await this.matchModel.findAll({ include:
        [
          { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });

      return result;
    }

    const result = await this.matchModel.findAll({ where: { inProgress },
      include:
      [
        { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return result;
  }

  public async create(payload: ICreateMatch): Promise<MatchModel> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = payload;

    const verifyTeams = new VerifyTeams(homeTeam, awayTeam);

    await verifyTeams.validateTeams();

    const result = await this.matchModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return result;
  }

  public async updateProgress(id: string): Promise<number> {
    const [result] = await this.matchModel.update({ inProgress: false }, { where: { id } });

    return result;
  }

  public async updateGoals(id: string, payload: IUpdateGoals): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = payload;

    const [result] = await this.matchModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return result;
  }
}
