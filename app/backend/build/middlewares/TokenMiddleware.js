"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../entities/Token");
class TokenMiddleware {
    static checkToken(req, res, next) {
        const { authorization: token } = req.headers;
        if (token) {
            Token_1.default.validateToken(token);
        }
        else {
            return res.status(404).json({ message: 'Token not found' });
        }
        next();
    }
}
exports.default = TokenMiddleware;
//# sourceMappingURL=TokenMiddleware.js.map