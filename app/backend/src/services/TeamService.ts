import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) {}

  public async getAll() {
    const result = await this.teamModel.findAll();

    return result;
  }

  public async findById(id: string) {
    const result = await this.teamModel.findByPk(id);

    return result;
  }
}
