"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../utils/HttpException");
const Token_1 = require("../entities/Token");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async validateLogin(req, res) {
        if (!Object.keys(req.body).length)
            throw new HttpException_1.default(404, 'Body not found');
        await this.userService.validateLogin(req.body);
        const token = Token_1.default.createToken(req.body);
        return res.status(200).json({ token });
    }
    async getRole(req, res) {
        const { authorization: token } = req.headers;
        if (token) {
            const role = await this.userService.getRole(token);
            return res.status(200).json({ role });
        }
        return res.status(404).json({ message: 'Token not found' });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map