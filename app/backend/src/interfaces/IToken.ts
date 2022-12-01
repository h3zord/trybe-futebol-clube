export interface IToken {
  email: string,
  password: string,
}

export interface ITokenData {
  data: {
    email: string,
    password: number,
    iat?: number,
    exp?: number,
  }
}
