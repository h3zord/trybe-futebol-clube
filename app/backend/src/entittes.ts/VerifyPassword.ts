import * as bcrypt from 'bcryptjs';
import HttpException from '../utils/http.exception';
import IUser from '../interfaces/IUser';

export default class VerifyPassword {
  public static validate(user: IUser, requestPassword: string) {
    const checkPass = bcrypt.compareSync(requestPassword, user.password);

    if (!user || !checkPass) {
      throw new HttpException(401, 'Incorrect email or password');
    }
  }
}
