import { NextFunction, Request, Response } from 'express';
import Token from '../entities/Token';

export default class TokenMiddleware {
  public static checkToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization: token } = req.headers;

    if (token) {
      Token.validateToken(token);
    } else {
      return res.status(404).json({ message: 'Token not found' });
    }

    next();
  }
}
