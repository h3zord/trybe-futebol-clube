export interface IToken {
  email: number,
  password: string,
}

export interface ITokenData {
  data: {
    email: number,
    password: number,
    iat?: number,
    exp?: number,
  }
}
