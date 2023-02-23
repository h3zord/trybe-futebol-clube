"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyLoginPass_1 = require("../validations/VerifyLoginPass");
const UserModel_1 = require("../database/models/UserModel");
const VerifyLoginFields_1 = require("../validations/VerifyLoginFields");
const HttpException_1 = require("../utils/HttpException");
const Token_1 = require("../entities/Token");
class UserService {
    constructor(userModel = UserModel_1.default) {
        this.userModel = userModel;
    }
    async validateLogin(payload) {
        const { email, password } = payload;
        const verifyFields = new VerifyLoginFields_1.default(email, password);
        verifyFields.validateFields();
        const result = await this.userModel.findOne({ where: { email } });
        if (!result)
            throw new HttpException_1.default(401, 'Incorrect email or password');
        const verifyPassword = new VerifyLoginPass_1.default(result, password);
        verifyPassword.validatePassword();
    }
    async getRole(token) {
        const { email } = Token_1.default.validateToken(token);
        const result = await this.userModel.findOne({ where: { email } });
        return result === null || result === void 0 ? void 0 : result.role;
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map