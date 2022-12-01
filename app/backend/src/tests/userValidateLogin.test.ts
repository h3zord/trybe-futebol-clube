import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando validações de login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as UserModel);
  });

  afterEach(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Testando se retorna o status 200 com email e pass corretos', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_admin"
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testando se não enviar o email retorna o status 400', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send({
        password: "secret_admin"
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Testando se enviar o password incorreto retorna o status 401', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secrets_admin"
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
  })

  it('Testando se retorna uma mensagem de email ou pass incorreto', async () => {
    (UserModel.findOne as sinon.SinonStub).restore()

    sinon
      .stub(UserModel, "findOne")
      .rejects;

    chaiHttpResponse = await chai
      .request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_admin"
      });

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  })

});
