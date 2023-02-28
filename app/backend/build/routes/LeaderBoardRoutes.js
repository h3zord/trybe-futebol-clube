"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderBoardService_1 = __importDefault(require("../services/LeaderBoardService"));
const LeaderBoardController_1 = __importDefault(require("../controllers/LeaderBoardController"));
class LeaderBoardRoutes {
    // eslint-disable-next-line max-lines-per-function
    constructor() {
        this.leaderBoardRouter = (0, express_1.Router)();
        this.leaderBoardService = new LeaderBoardService_1.default(undefined);
        this.leaderBoardHomeService = new LeaderBoardService_1.default('homeTeam');
        this.leaderBoardAwayService = new LeaderBoardService_1.default('awayTeam');
        this.leaderBoardController = new LeaderBoardController_1.default(this.leaderBoardService);
        this.leaderBoardHomeController = new LeaderBoardController_1.default(this.leaderBoardHomeService);
        this.leaderBoardAwayController = new LeaderBoardController_1.default(this.leaderBoardAwayService);
        this.leaderBoardRouter.get('/leaderboard', (req, res) => this.leaderBoardController
            .createLeaderBoard(req, res)
        // #swagger.tags = ['LeaderBoard']
        // #swagger.summary = 'Lista a classificação geral do campeonato'
        // #swagger.description = 'Endpoint para listar a classificação geral do campeonato de acordo com as partidas cadastradas no banco de dados.'
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/LeaderBoard" },
          description: 'Requisição para listar a classificação geral do campeonato efetuada com sucesso!'
        } */
        );
        this.leaderBoardRouter.get('/leaderboard/home', (req, res) => this.leaderBoardHomeController
            .createLeaderBoard(req, res)
        // #swagger.tags = ['LeaderBoard']
        // #swagger.summary = 'Lista a classificação dos times como mandante no campeonato'
        // #swagger.description = 'Endpoint para listar a classificação dos times como mandante no campeonato de acordo com as partidas cadastradas no banco de dados.'
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/LeaderBoardHome" },
          description: 'Requisição para listar a classificação dos times como mandante no campeonato efetuada com sucesso!'
        } */ );
        this.leaderBoardRouter.get('/leaderboard/away', (req, res) => this.leaderBoardAwayController
            .createLeaderBoard(req, res)
        // #swagger.tags = ['LeaderBoard']
        // #swagger.summary = 'Lista a classificação dos times como visitante no campeonato'
        // #swagger.description = 'Endpoint para listar a classificação dos times como visitante no campeonato de acordo com as partidas cadastradas no banco de dados.'
        /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/LeaderBoardAway" },
          description: 'Requisição para listar a classificação dos times como visitante no campeonato efetuada com sucesso!'
        } */ );
    }
}
exports.default = LeaderBoardRoutes;
//# sourceMappingURL=LeaderBoardRoutes.js.map