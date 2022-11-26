import { NextFunction, Request, Response } from 'express';
import Token from '../entities/Token';

export default class TokenMiddleware {
  public static checkToken(req: Request, _res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;
    if (token) {
      Token.validateToken(token);
    }

    next();
  }
}
