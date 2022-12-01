import TeamModel from '../database/models/TeamModel';
import HttpException from '../utils/HttpException';

export default class VerifyTeams {
  constructor(private team1: number, private team2: number) {}

  public async validateTeams() {
    if (this.team1 === this.team2) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    const findFirstTeam = await TeamModel.findByPk(this.team1);
    const findSecondTeam = await TeamModel.findByPk(this.team2);

    if (!findFirstTeam || !findSecondTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }
}
