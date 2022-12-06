import HttpException from '../utils/HttpException';

export default class VerifyFields {
  constructor(private email: string, private password: string) { }

  public validateFields(): void {
    if (!this.email || !this.password) throw new HttpException(400, 'All fields must be filled');
  }
}
