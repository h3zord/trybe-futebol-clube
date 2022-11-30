import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  public async getAll(_req: Request, res: Response) {
    const result = await this.matchService.getAll();

    res.status(200).json(result);
  }
}
