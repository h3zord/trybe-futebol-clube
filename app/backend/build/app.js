"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger-output.json"));
const ErrorMiddleware_1 = __importDefault(require("./middlewares/ErrorMiddleware"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
const TeamRoutes_1 = __importDefault(require("./routes/TeamRoutes"));
const MatchRoutes_1 = __importDefault(require("./routes/MatchRoutes"));
const LeaderBoardRoutes_1 = __importDefault(require("./routes/LeaderBoardRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.loginRoutes = new LoginRoutes_1.default();
        this.teamRoutes = new TeamRoutes_1.default();
        this.matchRoutes = new MatchRoutes_1.default();
        this.leaderBoardRoutes = new LeaderBoardRoutes_1.default();
        this.config();
        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express_1.default.json());
        this.app.use(accessControl);
        this.app.use((0, cors_1.default)());
        this.app.use(this.loginRoutes.loginRouter);
        this.app.use(this.teamRoutes.teamRouter);
        this.app.use(this.matchRoutes.matchRouter);
        this.app.use(this.leaderBoardRoutes.leaderBoardRouter);
        this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(ErrorMiddleware_1.default.catchError);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map