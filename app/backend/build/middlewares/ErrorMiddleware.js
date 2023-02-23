"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorMiddleware {
    static catchError(err, _req, res, next) {
        const { status, message } = err;
        res.status(status || 500).json({ message });
        next();
    }
}
exports.default = ErrorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map