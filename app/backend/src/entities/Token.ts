import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpException';
import { IToken, ITokenData } from '../interfaces/IToken';

export default class Token {
  public static createToken(data: IToken): string {
    const token = jwt.sign({ data }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }

  public static validateToken(token: string) {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET as string) as ITokenData;
      return data;
    } catch (_error) {
      throw new HttpException(401, 'Invalid token');
    }
  }
}
