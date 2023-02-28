"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamController_1 = __importDefault(require("../controllers/TeamController"));
const TeamService_1 = __importDefault(require("../services/TeamService"));
class TeamRoutes {
    constructor() {
        this.teamRouter = (0, express_1.Router)();
        this.teamService = new TeamService_1.default();
        this.teamController = new TeamController_1.default(this.teamService);
        this.teamRouter.get('/teams', (req, res) => this.teamController
            .getAll(req, res)
        // #swagger.tags = ['Team']
        // #swagger.summary = 'Listar todos os times'
        // #swagger.description = 'Endpoint para listar todos os times cadastrados no banco de dados.'
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/Teams" },
          description: 'Requisição para listar todos os times efetuada com sucesso!'
        } */ );
        this.teamRouter.get('/teams/:id', (req, res) => this.teamController
            .findById(req, res)
        // #swagger.tags = ['Team']
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
        } */ );
    }
}
exports.default = TeamRoutes;
//# sourceMappingURL=TeamRoutes.js.map