import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderboardService) {}

  public async createLeaderBoard(_req: Request, res: Response): Promise <Response> {
    const result = await this.leaderBoardService.createLeaderBoard();

    return res.status(200).json(result);
  }
}
