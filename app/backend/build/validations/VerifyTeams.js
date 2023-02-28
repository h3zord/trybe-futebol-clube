"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TeamModel_1 = __importDefault(require("../database/models/TeamModel"));
const HttpException_1 = __importDefault(require("../utils/HttpException"));
class VerifyTeams {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }
    async validateTeams() {
        if (this.team1 === this.team2) {
            throw new HttpException_1.default(422, 'It is not possible to create a match with two equal teams');
        }
        const findFirstTeam = await TeamModel_1.default.findByPk(this.team1);
        const findSecondTeam = await TeamModel_1.default.findByPk(this.team2);
        if (!findFirstTeam || !findSecondTeam) {
            throw new HttpException_1.default(400, 'There is no team with such id!');
        }
    }
}
exports.default = VerifyTeams;
//# sourceMappingURL=VerifyTeams.js.map