import * as express from 'express';
import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

export default class LoginRoutes {
  public loginRouter: express.IRouter;
  private userService: UserService;
  private userController: UserController;

  constructor() {
    this.loginRouter = Router();

    this.userService = new UserService();
    this.userController = new UserController(this.userService);

    this.loginRouter.post(
      '/login',
      (req: Request, res: Response) => this.userController
        .validateLogin(req, res)

      // #swagger.tags = ['Login']
      // #swagger.summary = 'Realizar o login com email e senha e gerar um token'
      // #swagger.description = 'Endpoint para consultar se o email e a senha fornecidos coincidem com os cadastrados no banco de dados.'

      /* #swagger.parameters['INFO'] = {
        in: 'body',
        description: 'Informações necessárias para realizar o login.',
        type: 'object',
        schema: { $ref: "#/definitions/Login" },
      } */

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/ValidToken" },
        description: 'Requisição para realizar o login efetuada com sucesso!'
      } */

      /* #swagger.responses[400] = {
        schema: { $ref: "#/definitions/BodyLoginIncompleteError" },
        description: 'Erro! A requisição falhou! Todos os campos devem ser preenchidos.'
      } */

      /* #swagger.responses[401] = {
        schema: { $ref: "#/definitions/InvalidLoginBodyError" },
        description: 'Erro! A requisição falhou! O email ou a senha informados estão incorretos.'
      } */

      /* #swagger.responses[404] = {
        schema: { $ref: "#/definitions/BodyNotFoundError" },
        description: 'Erro! A requisição falhou! O body com as informações necessárias não foi encontrado.'
      } */,
    );

    this.loginRouter.get(
      '/login/validate',
      (req: Request, res: Response) => this.userController
        .getRole(req, res)

      // #swagger.tags = ['Login']
      // #swagger.summary = 'Verificar qual é o tipo de usuário'
      // #swagger.description = 'Endpoint para verificar se o token fornecido é válido e retornar qual o tipo de usuário logado.',

      /* #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'Token necessário para verificar qual o tipo de usuário está logado.',
        type: 'string',
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjc3MDI4Njg3LCJleHAiOjE3NjMzNDIyODd9.7hkBkM1PUqUZ1rmmLMqCfIryM4qWPfgT_3XFU3khFrk'
      } */

      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/AdminRole" },
        description: 'Requisição para retornar o tipo de usuário efetuada com sucesso!'
      } */

      /* #swagger.responses[401] = {
        schema: { $ref: "#/definitions/InvalidTokenError" },
        description: 'Erro! A requisição falhou! O token fornecido é inválido.'
      } */

      /* #swagger.responses[404] = {
        schema: { $ref: "#/definitions/BodyNotFoundError" },
        description: 'Erro! A requisição falhou! O token não foi encontrado.'
      } */,
    );
  }
}
