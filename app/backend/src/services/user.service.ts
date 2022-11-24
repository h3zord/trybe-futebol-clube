import UserModel from '../database/models/UserModel';

export default class UserService {
  static async validateLogin(email: string, password: string) {
    const result = await UserModel.findOne({ where: { email } });
  }
}
