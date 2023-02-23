"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const HttpException_1 = require("../utils/HttpException");
class VerifyPassword {
    constructor(user, requestPassword) {
        this.user = user;
        this.requestPassword = requestPassword;
    }
    validatePassword() {
        const checkPass = bcrypt.compareSync(this.requestPassword, this.user.password);
        if (!checkPass)
            throw new HttpException_1.default(401, 'Incorrect email or password');
    }
}
exports.default = VerifyPassword;
//# sourceMappingURL=VerifyLoginPass.js.map