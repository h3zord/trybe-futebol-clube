"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeaderBoardController {
    constructor(leaderBoardService) {
        this.leaderBoardService = leaderBoardService;
    }
    async createLeaderBoard(_req, res) {
        const result = await this.leaderBoardService.createLeaderBoard();
        return res.status(200).json(result);
    }
}
exports.default = LeaderBoardController;
//# sourceMappingURL=LeaderBoardController.js.map