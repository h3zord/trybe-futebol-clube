import * as express from 'express';
import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

export default class MatchRoutes {
  public matchRouter: express.IRouter;
  private matchService: MatchService;
  private matchController: MatchController;

  constructor() {
    this.matchRouter = Router();

    this.matchService = new MatchService();
    this.matchController = new MatchController(this.matchService);

    this.matchRouter
      .get('/', (req: Request, res: Response) => this.matchController
        .findByProgress(req, res));
  }
}
