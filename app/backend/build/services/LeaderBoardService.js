"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TeamModel_1 = __importDefault(require("../database/models/TeamModel"));
const MatchModel_1 = __importDefault(require("../database/models/MatchModel"));
const LeaderBoard_1 = __importDefault(require("../entities/LeaderBoard"));
const SortLeaderBoard_1 = __importDefault(require("../entities/SortLeaderBoard"));
class LeaderboardService {
    constructor(homeOrAway, teamModel = TeamModel_1.default, matchModel = MatchModel_1.default) {
        this.homeOrAway = homeOrAway;
        this.teamModel = teamModel;
        this.matchModel = matchModel;
    }
    async createLeaderBoard() {
        const allTeams = await this.teamModel.findAll();
        const allMatches = await this.matchModel.findAll({ where: { inProgress: false } });
        const createLeaderboard = new LeaderBoard_1.default(allTeams, allMatches, this.homeOrAway);
        const leaderBoard = createLeaderboard.createBoard();
        const sortLeaderBoard = new SortLeaderBoard_1.default(leaderBoard);
        const result = sortLeaderBoard.sortLeaderBoard();
        return result;
    }
}
exports.default = LeaderboardService;
//# sourceMappingURL=LeaderBoardService.js.map