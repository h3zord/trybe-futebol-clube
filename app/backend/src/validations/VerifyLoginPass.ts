import * as bcrypt from 'bcryptjs';
import HttpException from '../utils/HttpException';
import IUser from '../interfaces/IUser';

export default class VerifyPassword {
  public static validatePassword(user: IUser, requestPassword: string) {
    const checkPass = bcrypt.compareSync(requestPassword, user.password);

    if (!checkPass) {
      throw new HttpException(401, 'Incorrect email or password');
    }
  }
}
