import { Request, Response } from 'express';
import Token from '../entities/Token';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService: UserService) {}

  public async validateLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    await this.userService.validateLogin(email, password);

    const token = Token.createToken({ email, password });

    res.status(200).json({ token });
  }

  public async getRole(req: Request, res: Response) {
    const { authorization: token } = req.headers;

    if (token) {
      const role = await this.userService.getRole(token);

      return res.status(200).json({ role });
    }

    res.status(401).json({ message: 'Token not found' });
  }
}
