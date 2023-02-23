"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const HttpException_1 = require("../utils/HttpException");
class Token {
    static createToken(data) {
        const token = jwt.sign({ data }, process.env.JWT_SECRET || 'jwt_secret', {
            expiresIn: '9999d',
            algorithm: 'HS256',
        });
        return token;
    }
    static validateToken(token) {
        try {
            const { data } = jwt
                .verify(token, process.env.JWT_SECRET || 'jwt_secret');
            return data;
        }
        catch (error) {
            throw new HttpException_1.default(401, 'Token must be a valid token');
        }
    }
}
exports.default = Token;
//# sourceMappingURL=Token.js.map