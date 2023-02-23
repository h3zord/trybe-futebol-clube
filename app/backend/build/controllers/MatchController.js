"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../utils/HttpException");
class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    async findByProgress(req, res) {
        const { inProgress } = req.query;
        if (inProgress === 'true') {
            const result = await this.matchService.findByProgress('true');
            return res.status(200).json(result);
        }
        if (inProgress === 'false') {
            const result = await this.matchService.findByProgress('false');
            return res.status(200).json(result);
        }
        const result = await this.matchService.findByProgress('');
        return res.status(200).json(result);
    }
    async create(req, res) {
        if (!Object.keys(req.body).length)
            throw new HttpException_1.default(404, 'Body not found');
        const result = await this.matchService.create(req.body);
        return res.status(201).json(result);
    }
    async updateProgress(req, res) {
        const { id } = req.params;
        const result = await this.matchService.updateProgress(id);
        if (result)
            return res.status(200).json({ message: 'Finished' });
        return res.status(500).json({ message: 'Update error' });
    }
    async updateGoals(req, res) {
        const { id } = req.params;
        if (!Object.keys(req.body).length)
            throw new HttpException_1.default(404, 'Body not found');
        const result = await this.matchService.updateGoals(id, req.body);
        if (result)
            return res.status(200).json({ message: 'Finished' });
        return res.status(500).json({ message: 'Update error' });
    }
}
exports.default = MatchController;
//# sourceMappingURL=MatchController.js.map