export interface IToken {
  email: string,
  password: string,
  iat?: number,
  exp?: number,
}

export interface ITokenData {
  data: {
    email: string,
    password: string,
    iat?: number,
    exp?: number,
  }
}
