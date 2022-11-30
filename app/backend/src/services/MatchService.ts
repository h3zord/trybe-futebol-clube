import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  constructor(private matchModel = MatchModel) {}

  public async findByProgress(progress: string): Promise<MatchModel[]> {
    const inProgress = progress === 'true';

    if (!progress) {
      const result = await this.matchModel.findAll({ include:
        [
          { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });

      return result;
    }

    const result = await this.matchModel.findAll({ where: { inProgress },
      include:
      [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return result;
  }
}
