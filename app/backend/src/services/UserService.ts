import VerifyPassword from '../validations/VerifyLoginPass';
import UserModel from '../database/models/UserModel';
import VerifyFields from '../validations/VerifyLoginFields';
import HttpException from '../utils/HttpException';
import Token from '../entities/Token';

export default class UserService {
  // constructor(private userModel: UserModel) {}
  public async validateLogin(RequestEmail: string, RequestPassword: string) {
    VerifyFields.validateFields(RequestEmail, RequestPassword);

    const result = await UserModel.findOne({ where: { email: RequestEmail } });

    if (!result) throw new HttpException(401, 'Incorrect email or password');

    VerifyPassword.validatePassword(result, RequestPassword);
  }

  public async getRole(token: string) {
    const { email } = Token.validateToken(token);

    const result = await UserModel.findOne({ where: { email } });

    return result?.role;
  }
}
