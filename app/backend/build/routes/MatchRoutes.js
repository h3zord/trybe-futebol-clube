"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MatchService_1 = require("../services/MatchService");
const MatchController_1 = require("../controllers/MatchController");
const TokenMiddleware_1 = require("../middlewares/TokenMiddleware");
class MatchRoutes {
    // eslint-disable-next-line max-lines-per-function
    constructor() {
        this.matchRouter = (0, express_1.Router)();
        this.matchService = new MatchService_1.default();
        this.matchController = new MatchController_1.default(this.matchService);
        this.matchRouter.post('/matches', (req, res, next) => TokenMiddleware_1.default
            .checkToken(req, res, next), (req, res) => this.matchController
            .create(req, res)
        // #swagger.tags = ['Match']
        // #swagger.summary = 'Criar uma nova partida'
        // #swagger.description = 'Endpoint para cadastrar uma nova partida no banco de dados.'
        /* #swagger.parameters['authorization'] = {
          in: 'header',
          description: 'Token necessário para criar uma nova partida.',
          type: 'string',
          default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjc3MDI4Njg3LCJleHAiOjE3NjMzNDIyODd9.7hkBkM1PUqUZ1rmmLMqCfIryM4qWPfgT_3XFU3khFrk'
        } */
        /* #swagger.parameters['info'] = {
          in: 'body',
          description: 'Informações necessárias para criar uma nova partida.',
          type: 'object',
          schema: { $ref: "#/definitions/Match" },
        } */
        /* #swagger.responses[201] = {
          schema: { $ref: "#/definitions/Match" },
          description: 'Requisição para cadastrar uma nova partida efetuada com sucesso!'
        } */
        /* #swagger.responses[400] = {
          schema: { $ref: "#/definitions/IdNotFoundError" },
          description: 'Erro! A requisição falhou! O ID fornecido é inválido.'
        } */
        /* #swagger.responses[401] = {
          schema: { $ref: "#/definitions/InvalidTokenError" },
          description: 'Erro! A requisição falhou! O token fornecido é inválido.'
        } */
        /* #swagger.responses[404] = {
          schema: { $ref: "#/definitions/TokenNotFoundError" },
          description: 'Erro! A requisição falhou! O token não foi encontrado.'
        } */
        /* #swagger.responses[422] = {
          schema: { $ref: "#/definitions/EqualTeamsError" },
          description: 'Erro! A requisição falhou! Não é possível criar uma partida com dois times iguais.'
        } */
        /* #swagger.responses[500] = {
          schema: { $ref: "#/definitions/InvalidBodyError" },
          description: 'Erro! A requisição falhou! Verifique se as informações do body não estão ausentes ou incorretas.'
        } */ );
        this.matchRouter.get('/matches', (req, res) => this.matchController
            .findByProgress(req, res)
        // #swagger.tags = ['Match']
        // #swagger.summary = 'Listar todas as partidas, apenas as finalizadas ou que estão em andamento'
        // #swagger.description = 'Endpoint para listar todos as partidas cadastradas no banco de dados, com a opção de filtrar apenas as finalizadas, ou somente as partidas em andamento.',
        /* #swagger.parameters['inProgress'] = {
          in: 'query',
          type: 'string',
          example: 'true or false',
          description: 'Query opcional para filtrar as partidas por progresso. TRUE retorna as partidas em andamento, FALSE retorna as partidas já finalizadas.'
        } */
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/Matches" },
          description: 'Requisição para listar as partidas cadastradas no banco de dados efetuada com sucesso!'
        } */ );
        this.matchRouter.patch('/matches/:id/finish', (req, res) => this.matchController
            .updateProgress(req, res)
        // #swagger.tags = ['Match']
        // #swagger.summary = 'Atualiza o status de uma partida em andamento para finalizada'
        // #swagger.description = 'Endpoint para atualizar o status de uma partida cadastrada no banco de dados para finalizada.'
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/FinishedMessage" },
          description: 'Requisição para atualizar o status da partida efetuada com sucesso!'
        } */
        /* #swagger.responses[500] = {
          schema: { $ref: "#/definitions/UpdateError" },
          description: 'Erro! A requisição falhou! Ocorreu um erro ao atualizar o status da partida.'
        } */ );
        this.matchRouter.patch('/matches/:id', (req, res) => this.matchController
            .updateGoals(req, res)
        // #swagger.tags = ['Match']
        // #swagger.summary = 'Atualiza o placar da partida'
        // #swagger.description = 'Endpoint para atualizar o placar de uma partida cadastrada no banco de dados.'
        /* #swagger.parameters['id'] = {
          in: 'path',
          type: 'string',
          required: true,
          description: 'ID necessário para buscar a partida cadastrada no banco de dados.'
        } */
        /* #swagger.parameters['info'] = {
          in: 'body',
          description: 'Informações necessárias para atualizar o placar de uma partida.',
          type: 'object',
          schema: { $ref: "#/definitions/InfoUpdateMatch" },
        } */
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/FinishedMessage" },
          description: 'Requisição para atualizar o placar da partida efetuada com sucesso!'
        } */
        /* #swagger.responses[500] = {
          schema: { $ref: "#/definitions/UpdateError" },
          description: 'Erro! A requisição falhou! Ocorreu um erro ao  atualizar o status da partida.'
        } */ );
    }
}
exports.default = MatchRoutes;
//# sourceMappingURL=MatchRoutes.js.map