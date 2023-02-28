"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async getAll(_req, res) {
        const result = await this.teamService.getAll();
        return res.status(200).json(result);
    }
    async findById(req, res) {
        const { id } = req.params;
        const result = await this.teamService.findById(id);
        return res.status(200).json(result);
    }
}
exports.default = TeamController;
//# sourceMappingURL=TeamController.js.map