import * as express from 'express';
import 'express-async-errors';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import LoginRoutes from './routes/LoginRoutes';
import TeamRoutes from './routes/TeamRoutes';
import MatchRoutes from './routes/MatchRoutes';

class App {
  public app: express.Express;
  private loginRoutes: LoginRoutes;
  private teamRoutes: TeamRoutes;
  private matchRoutes: MatchRoutes;

  constructor() {
    this.app = express();

    this.loginRoutes = new LoginRoutes();
    this.teamRoutes = new TeamRoutes();
    this.matchRoutes = new MatchRoutes();

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

    this.app.use('/login', this.loginRoutes.loginRouter);
    this.app.use('/teams', this.teamRoutes.teamRouter);
    this.app.use('/matches', this.matchRoutes.matchRouter);

    this.app.use(ErrorMiddleware.catchError);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
