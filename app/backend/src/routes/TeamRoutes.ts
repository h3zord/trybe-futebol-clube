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

    this.teamRouter.get(
      '/teams',
      (req: Request, res: Response) => this.teamController
        .getAll(req, res)

      // #swagger.tags = ['Teams']
      // #swagger.summary = 'Listar todos os times'
      // #swagger.description = 'Endpoint para listar todos os times cadastrados no banco de dados.'

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Teams" },
        description: 'Requisição para listar todos os times efetuada com sucesso!'
      } */,
    );

    this.teamRouter.get(
      '/teams/:id',
      (req: Request, res: Response) => this.teamController
        .findById(req, res)

      // #swagger.tags = ['Teams']
      // #swagger.summary = 'Buscar um time pelo seu ID'
      // #swagger.description = 'Endpoint para buscar um time cadastrado no banco de dados pelo seu ID.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        required: true,
        description: 'ID necessário para buscar o time cadastrado no banco de dados.'
      } */

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Team" },
        description: 'Requisição para buscar um time pelo seu ID efetuada com sucesso!'
      } */

      /* #swagger.responses[400] = {
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Erro! A requisição falhou! Não foi encontrado nenhum time cadastrado no banco de dados com esse ID.'
      } */,
    );
  }
}
