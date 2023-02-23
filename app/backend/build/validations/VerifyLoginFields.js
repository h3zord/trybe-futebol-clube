"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../utils/HttpException");
class VerifyFields {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    validateFields() {
        if (!this.email || !this.password)
            throw new HttpException_1.default(400, 'All fields must be filled');
    }
}
exports.default = VerifyFields;
//# sourceMappingURL=VerifyLoginFields.js.map