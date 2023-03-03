import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('First test', () => {
  it('First Test', async () => {
    expect({ "ok": true }).to.be.deep.eq({
      "ok": true
    })
  })
})