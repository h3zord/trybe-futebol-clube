import HttpException from '../utils/HttpException';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) {}

  public async getAll(): Promise<TeamModel[]> {
    const result = await this.teamModel.findAll();

    return result;
  }

  public async findById(id: string): Promise<TeamModel | null> {
    const result = await this.teamModel.findByPk(id);

    if (!result) throw new HttpException(400, 'There is no team with such id!');

    return result;
  }
}
