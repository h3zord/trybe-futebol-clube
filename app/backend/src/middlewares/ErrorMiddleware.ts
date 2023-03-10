import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpException';

export default class ErrorMiddleware {
  public static catchError(err: Error, _req: Request, res: Response, next: NextFunction): void {
    const { status, message } = err as HttpException;
    res.status(status || 500).json({ message });

    next();
  }
}
