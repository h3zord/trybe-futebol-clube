"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../utils/HttpException");
const TeamModel_1 = require("../database/models/TeamModel");
class TeamService {
    constructor(teamModel = TeamModel_1.default) {
        this.teamModel = teamModel;
    }
    async getAll() {
        const result = await this.teamModel.findAll();
        return result;
    }
    async findById(id) {
        const result = await this.teamModel.findByPk(id);
        if (!result)
            throw new HttpException_1.default(400, 'There is no team with such id!');
        return result;
    }
}
exports.default = TeamService;
//# sourceMappingURL=TeamService.js.map