import * as express from 'express';
import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
// import UserModel from '../database/models/UserModel';

export default class LoginRoutes {
  public loginRouter: express.IRouter;
  // private userModel: UserModel;
  private userService: UserService;
  private userController: UserController;

  constructor() {
    this.loginRouter = Router();

    // this.userModel = new UserModel();
    this.userService = new UserService();
    this.userController = new UserController(this.userService);

    this.loginRouter
      .post('/', (req: Request, res: Response) => this.userController
        .validateLogin(req, res));

    this.loginRouter
      .get('/validate', (req: Request, res: Response) => this.userController
        .getRole(req, res));
  }
}
