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

  public async create(req: Request, res: Response): Promise<Response> {
    const result = await this.matchService.create(req.body);

    return res.status(201).json(result);
  }

  public async updateProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const result = await this.matchService.updateProgress(id);

    if (result) return res.status(200).json({ message: 'Finished' });

    return res.status(500).json({ message: 'Update error' });
  }

  public async updateGoals(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const result = await this.matchService.updateGoals(id, req.body);

    if (result) return res.status(200).json({ message: 'Finished' });

    return res.status(500).json({ message: 'Update error' });
  }
}
