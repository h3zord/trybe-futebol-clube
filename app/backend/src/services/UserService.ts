import VerifyPassword from '../validations/VerifyLoginPass';
import UserModel from '../database/models/UserModel';
import VerifyFields from '../validations/VerifyLoginFields';
import HttpException from '../utils/HttpException';
import Token from '../entities/Token';
import { IToken } from '../interfaces/IToken';

export default class UserService {
  constructor(private userModel = UserModel) {}

  public async validateLogin(payload: IToken): Promise<void> {
    const { email, password } = payload;

    const verifyFields = new VerifyFields(email, password);

    verifyFields.validateFields();

    const result = await this.userModel.findOne({ where: { email } });

    if (!result) throw new HttpException(401, 'Incorrect email or password');

    const verifyPassword = new VerifyPassword(result, password);

    verifyPassword.validatePassword();
  }

  public async getRole(token: string): Promise<string | undefined> {
    const { email } = Token.validateToken(token);

    const result = await this.userModel.findOne({ where: { email } });

    return result?.role;
  }
}
