import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpException';
import { IToken, ITokenData } from '../interfaces/IToken';

export default class Token {
  public static createToken(data: IToken): string {
    const token = jwt.sign({ data }, process.env.JWT_SECRET || "jwt_secret" as string, {
      expiresIn: '999d',
      algorithm: 'HS256',
    });
    return token;
  }

  public static validateToken(token: string): IToken {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret" as string) as ITokenData;
      return data;
    } catch (error) {
      throw new HttpException(401, 'Token must be a valid token');
    }
  }
}
