import * as express from 'express';
import { Request, Response, Router } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardController from '../controllers/LeaderBoardController';

export default class LeaderBoardRoutes {
  public leaderBoardRouter: express.IRouter;
  private leaderBoardService: LeaderBoardService;
  private leaderBoardController: LeaderBoardController;
  private leaderBoardHomeService: LeaderBoardService;
  private leaderBoardAwayService : LeaderBoardService;
  private leaderBoardHomeController: LeaderBoardController;
  private leaderBoardAwayController : LeaderBoardController;

  constructor() {
    this.leaderBoardRouter = Router();

    this.leaderBoardService = new LeaderBoardService(undefined);
    this.leaderBoardHomeService = new LeaderBoardService('homeTeam');
    this.leaderBoardAwayService = new LeaderBoardService('awayTeam');
    this.leaderBoardController = new LeaderBoardController(this.leaderBoardService);
    this.leaderBoardHomeController = new LeaderBoardController(this.leaderBoardHomeService);
    this.leaderBoardAwayController = new LeaderBoardController(this.leaderBoardAwayService);

    this.leaderBoardRouter
      .get('/', (req: Request, res: Response) => this.leaderBoardController
        .createLeaderBoard(req, res));

    this.leaderBoardRouter
      .get('/home', (req: Request, res: Response) => this.leaderBoardHomeController
        .createLeaderBoard(req, res));

    this.leaderBoardRouter
      .get('/away', (req: Request, res: Response) => this.leaderBoardAwayController
        .createLeaderBoard(req, res));
  }
}
