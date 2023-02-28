import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger-output.json';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import LoginRoutes from './routes/LoginRoutes';
import TeamRoutes from './routes/TeamRoutes';
import MatchRoutes from './routes/MatchRoutes';
import LeaderBoardRoutes from './routes/LeaderBoardRoutes';

class App {
  public app: express.Express;
  private loginRoutes: LoginRoutes;
  private teamRoutes: TeamRoutes;
  private matchRoutes: MatchRoutes;
  private leaderBoardRoutes: LeaderBoardRoutes;

  constructor() {
    this.app = express();

    this.loginRoutes = new LoginRoutes();
    this.teamRoutes = new TeamRoutes();
    this.matchRoutes = new MatchRoutes();
    this.leaderBoardRoutes = new LeaderBoardRoutes();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());

    this.app.use(this.loginRoutes.loginRouter);
    this.app.use(this.teamRoutes.teamRouter);
    this.app.use(this.matchRoutes.matchRouter);
    this.app.use(this.leaderBoardRoutes.leaderBoardRouter);
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use(ErrorMiddleware.catchError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
