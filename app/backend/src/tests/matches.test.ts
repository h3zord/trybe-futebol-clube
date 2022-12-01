import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import MatchModel from '../database/models/MatchModel';
import { allMatches, createdMatch, progressFalse, progressTrue, sameTeams, unknownTeam } from './mocks/matchesMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando os matches', () => {
  let chaiHttpResponse: Response;

  it('Testando se retorna todos os matches', async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(allMatches as unknown as MatchModel[]);

    chaiHttpResponse = await chai
      .request(app).get('/matches');

    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  });

  it('Testando se retorna os matches em progresso', async () => {
    (MatchModel.findAll as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "findAll")
      .resolves(progressTrue as unknown as MatchModel[]);

    chaiHttpResponse = await chai
      .request(app).get('/matches?inProgress=true')
    
    expect(chaiHttpResponse.body).to.be.deep.equal(progressTrue);
  })

  it('Testando se retorna os matches finalizados', async () => {
    (MatchModel.findAll as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "findAll")
      .resolves(progressFalse as unknown as MatchModel[]);

    chaiHttpResponse = await chai
      .request(app).get('/matches?inProgress=false')
    
    expect(chaiHttpResponse.body).to.be.deep.equal(progressFalse);
  })

  it('Testando se cria um match corretamente', async () => {
    (MatchModel.findAll as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "create")
      .resolves(createdMatch as MatchModel);

    chaiHttpResponse = await chai
      .request(app).post('/matches')
      .send(createdMatch)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY5NDY2Mzg2LCJleHAiOjE2NzAwNzExODZ9.XGT7qkREOC1ujIAo4DUbsUp39QsKLQZRc9gEQHt23rE');
    
    expect(chaiHttpResponse.body).to.be.deep.equal(createdMatch);
  })

  it('Testando se retorna um erro ao criar match com 2 times iguais', async () => {
    (MatchModel.create as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "create")
      .resolves(sameTeams as MatchModel);

    chaiHttpResponse = await chai
      .request(app).post('/matches')
      .send(sameTeams)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY5NDY2Mzg2LCJleHAiOjE2NzAwNzExODZ9.XGT7qkREOC1ujIAo4DUbsUp39QsKLQZRc9gEQHt23rE');
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });
  })

  it('Testando se retorna um erro ao criar match com times inexistentes', async () => {
    (MatchModel.create as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "create")
      .resolves(unknownTeam as MatchModel);

    chaiHttpResponse = await chai
      .request(app).post('/matches')
      .send(unknownTeam)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjY5NDY2Mzg2LCJleHAiOjE2NzAwNzExODZ9.XGT7qkREOC1ujIAo4DUbsUp39QsKLQZRc9gEQHt23rE');
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "There is no team with such id!" });
  })

  it('Testando se retorna um erro ao criar match sem token', async () => {
    (MatchModel.create as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "create")
      .resolves(createdMatch as MatchModel);

    chaiHttpResponse = await chai
      .request(app).post('/matches')
      .send(createdMatch)
      .set('Authorization', '');
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Token not found" });
  })

  it('Testando se retorna finished ao atualizar o progresso do jogo', async () => {
    (MatchModel.create as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "update")
      .resolves([1] as [affectedCount: number]);

    chaiHttpResponse = await chai
      .request(app).patch('/matches/1/finish')
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
  })

  it('Testando se retorna finished ao atualizar o placar do jogo', async () => {
    (MatchModel.update as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "update")
      .resolves([1] as [affectedCount: number]);

    chaiHttpResponse = await chai
      .request(app).patch('/matches/1')
      .send({
        "homeTeamGoals": 5,
        "awayTeamGoals": 3
      })
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
  })

  it('Testando se retorna um erro ao atualizar o progresso do jogo e falhar', async () => {
    (MatchModel.update as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "update")
      .resolves([0] as [affectedCount: number])

    chaiHttpResponse = await chai
      .request(app).patch('/matches/1/finish')
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Update error" });
  })

  it('Testando se retorna finished ao atualizar o placar do jogo', async () => {
    (MatchModel.update as sinon.SinonStub).restore()

    sinon
      .stub(MatchModel, "update")
      .resolves([0] as [affectedCount: number]);

    chaiHttpResponse = await chai
      .request(app).patch('/matches/1')
      .send({
        "homeTeamGoals": 5,
        "awayTeamGoals": 3
      })
    
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Update error" });
  })
});
