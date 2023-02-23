"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("express-async-errors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const LoginRoutes_1 = require("./routes/LoginRoutes");
const TeamRoutes_1 = require("./routes/TeamRoutes");
const MatchRoutes_1 = require("./routes/MatchRoutes");
const LeaderBoardRoutes_1 = require("./routes/LeaderBoardRoutes");
class App {
    constructor() {
        this.app = express();
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
        this.app.use(express.json());
        this.app.use(accessControl);
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