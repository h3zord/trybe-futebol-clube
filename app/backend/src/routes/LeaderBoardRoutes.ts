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

  // eslint-disable-next-line max-lines-per-function
  constructor() {
    this.leaderBoardRouter = Router();

    this.leaderBoardService = new LeaderBoardService(undefined);
    this.leaderBoardHomeService = new LeaderBoardService('homeTeam');
    this.leaderBoardAwayService = new LeaderBoardService('awayTeam');
    this.leaderBoardController = new LeaderBoardController(this.leaderBoardService);
    this.leaderBoardHomeController = new LeaderBoardController(this.leaderBoardHomeService);
    this.leaderBoardAwayController = new LeaderBoardController(this.leaderBoardAwayService);

    this.leaderBoardRouter.get(
      '/leaderboard',
      (req: Request, res: Response) => this.leaderBoardController
        .createLeaderBoard(req, res)

      // #swagger.tags = ['LeaderBoards']
      // #swagger.summary = 'Lista a classificação geral do campeonato'
      // #swagger.description = 'Endpoint para listar a classificação geral do campeonato de acordo com as partidas cadastradas no banco de dados.'

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/LeaderBoard" },
        description: 'Requisição para listar a classificação geral do campeonato efetuada com sucesso!'
      } */
      ,
    );

    this.leaderBoardRouter.get(
      '/leaderboard/home',
      (req: Request, res: Response) => this.leaderBoardHomeController
        .createLeaderBoard(req, res)

      // #swagger.tags = ['LeaderBoards']
      // #swagger.summary = 'Lista a classificação dos times como mandante no campeonato'
      // #swagger.description = 'Endpoint para listar a classificação dos times como mandante no campeonato de acordo com as partidas cadastradas no banco de dados.'

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/LeaderBoardHome" },
        description: 'Requisição para listar a classificação dos times como mandante no campeonato efetuada com sucesso!'
      } */,
    );

    this.leaderBoardRouter.get(
      '/leaderboard/away',
      (req: Request, res: Response) => this.leaderBoardAwayController
        .createLeaderBoard(req, res)

      // #swagger.tags = ['LeaderBoards']
      // #swagger.summary = 'Lista a classificação dos times como visitante no campeonato'
      // #swagger.description = 'Endpoint para listar a classificação dos times como visitante no campeonato de acordo com as partidas cadastradas no banco de dados.'

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/LeaderBoardAway" },
        description: 'Requisição para listar a classificação dos times como visitante no campeonato efetuada com sucesso!'
      } */,
    );
  }
}
