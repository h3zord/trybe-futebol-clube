import * as express from 'express';
import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

export default class TeamRoutes {
  public teamRouter: express.IRouter;
  private teamService: TeamService;
  private teamController: TeamController;

  constructor() {
    this.teamRouter = Router();

    this.teamService = new TeamService();
    this.teamController = new TeamController(this.teamService);

    this.teamRouter
      .get('/', (req: Request, res: Response) => this.teamController
        .getAll(req, res));

    this.teamRouter
      .get('/:id', (req: Request, res: Response) => this.teamController
        .findById(req, res));
  }
}
