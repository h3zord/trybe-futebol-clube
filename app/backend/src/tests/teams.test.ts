import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';
import teams from './mocks/teamsMock';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando os times', () => {
  let chaiHttpResponse: Response;

  it('Testando se retorna todos os times', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teams as TeamModel[]);

    chaiHttpResponse = await chai
      .request(app).get('/teams');
    
    expect(chaiHttpResponse.body).to.be.deep.equal(teams)
  })

  it('Testando se retorna um time pelo id', async () => {
    (TeamModel.findAll as sinon.SinonStub).restore()

    sinon
      .stub(TeamModel, "findByPk")
      .resolves(teams[11] as TeamModel);

    chaiHttpResponse = await chai
      .request(app).get('/teams/12');

      expect(chaiHttpResponse.body).to.be.deep.equal(teams[11]);
  })

});
