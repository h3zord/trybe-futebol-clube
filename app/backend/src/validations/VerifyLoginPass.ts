import * as bcrypt from 'bcryptjs';
import HttpException from '../utils/HttpException';
import IUser from '../interfaces/IUser';

export default class VerifyPassword {
  constructor(private user: IUser, private requestPassword: string) {
  }

  public validatePassword() {
    const checkPass = bcrypt.compareSync(this.requestPassword, this.user.password);

    if (!checkPass) throw new HttpException(401, 'Incorrect email or password');
  }
}
