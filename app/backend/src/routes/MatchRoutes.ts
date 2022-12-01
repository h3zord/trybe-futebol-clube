import { Request, Response, NextFunction, Router, IRouter } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import TokenMiddleware from '../middlewares/TokenMiddleware';

export default class MatchRoutes {
  public matchRouter: IRouter;
  private matchService: MatchService;
  private matchController: MatchController;

  constructor() {
    this.matchRouter = Router();

    this.matchService = new MatchService();
    this.matchController = new MatchController(this.matchService);

    this.matchRouter
      .get('/', (req: Request, res: Response) => this.matchController
        .findByProgress(req, res));

    this.matchRouter
      .post(
        '/',
        (req: Request, res: Response, next: NextFunction) => TokenMiddleware
          .checkToken(req, res, next),
        (req: Request, res: Response) => this.matchController
          .create(req, res),
      );

    this.matchRouter
      .patch('/:id/finish', (req: Request, res: Response) => this.matchController
        .updateProgress(req, res));
  }
}
