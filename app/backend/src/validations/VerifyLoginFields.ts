import * as Joi from 'joi';
import HttpException from '../utils/HttpException';

export default class VerifyFields {
  public static validateFields(email: string, password: string) {
    const schema = Joi.object({
      email: Joi.required(),
      password: Joi.required(),
    });

    const { error } = schema.validate({ email, password });

    if (error) throw new HttpException(400, 'All fields must be filled');
  }
}
