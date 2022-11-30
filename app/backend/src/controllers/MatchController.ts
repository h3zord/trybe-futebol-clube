import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  public async findByProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const result = await this.matchService.findByProgress('true');

      return res.status(200).json(result);
    }

    if (inProgress === 'false') {
      const result = await this.matchService.findByProgress('false');

      return res.status(200).json(result);
    }

    const result = await this.matchService.findByProgress('');

    return res.status(200).json(result);
  }
}
