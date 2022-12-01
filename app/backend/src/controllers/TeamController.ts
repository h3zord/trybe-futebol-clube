import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const result = await this.teamService.getAll();

    return res.status(200).json(result);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const result = await this.teamService.findById(id);

    return res.status(200).json(result);
  }
}
