"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeamModel_1 = require("../database/models/TeamModel");
const MatchModel_1 = require("../database/models/MatchModel");
const VerifyTeams_1 = require("../validations/VerifyTeams");
class MatchService {
    constructor(matchModel = MatchModel_1.default, teamModel = TeamModel_1.default) {
        this.matchModel = matchModel;
        this.teamModel = teamModel;
    }
    async findByProgress(progress) {
        const inProgress = progress === 'true';
        if (!progress) {
            const result = await this.matchModel.findAll({ include: [
                    { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
                    { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
                ],
            });
            return result;
        }
        const result = await this.matchModel.findAll({ where: { inProgress },
            include: [
                { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
                { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
            ],
        });
        return result;
    }
    async create(payload) {
        const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = payload;
        const verifyTeams = new VerifyTeams_1.default(homeTeam, awayTeam);
        await verifyTeams.validateTeams();
        const result = await this.matchModel
            .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
        return result;
    }
    async updateProgress(id) {
        const [result] = await this.matchModel.update({ inProgress: false }, { where: { id } });
        return result;
    }
    async updateGoals(id, payload) {
        const { homeTeamGoals, awayTeamGoals } = payload;
        const [result] = await this.matchModel
            .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
        return result;
    }
}
exports.default = MatchService;
//# sourceMappingURL=MatchService.js.map