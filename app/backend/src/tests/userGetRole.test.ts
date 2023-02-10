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

describe('Testando as roles e validações', () => {
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

  afterEach(()=> {
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Testando se retorna a role admin', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/validate')
       .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjc1OTczNTcyLCJleHAiOjE2NzY1NzgzNzJ9.ABaMMlo3PuNHABoagFN0-enlJH3J1MhGvjyt4wrgh6A');       

    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  });

  it('Testando se não retorna nada se não encontrar nenhum usuário', async () => {
    (UserModel.findOne as sinon.SinonStub).restore()

    sinon
      .stub(UserModel, "findOne")
      .rejects;

    chaiHttpResponse = await chai
    .request(app).get('/login/validate')
    .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjc1OTczNTcyLCJleHAiOjE2NzY1NzgzNzJ9.ABaMMlo3PuNHABoagFN0-enlJH3J1MhGvjyt4wrgh6A');

    expect(chaiHttpResponse.body).to.be.deep.equal({});
  });

  it('Testando se retorna o erro 500 se não houver token', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/validate')
       .set('Authorization', '');

    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Testando se retorna a mensagem invalid token, com um token inválido', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/login/validate')
       .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY5NDY2Mzg2LCJleHAiOjE2NzAwNzExODZ9.XGT7qkREOC1ujIAo4DUbsUp39QsKLQZRc9gEQHt23rEs');

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });

});
