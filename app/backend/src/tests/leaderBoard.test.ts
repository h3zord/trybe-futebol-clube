import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';
import teamsMock from './mocks/teamsMock';
import MatchModel from '../database/models/MatchModel';
import { progressFalse } from './mocks/matchesMock';
import { leaderBoardAllMatches, leaderBoardAway, leaderBoardHome } from './mocks/leaderBoardMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando os leaderBoards', () => {
  let chaiHttpResponse: Response;

  it('Testando se retorna corretamente o leaderBoard away', async () => {
    chaiHttpResponse = await chai
      .request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardAway)
  })

  it('Testando se retorna corretamente o leaderBoard home', async () => {
    chaiHttpResponse = await chai
      .request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardHome)
  })

  it('Testando se retorna corretamente o leaderBoard geral', async () => {
    chaiHttpResponse = await chai
      .request(app).get('/leaderboard');

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardAllMatches)
  })
});
