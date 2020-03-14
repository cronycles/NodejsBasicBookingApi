import app from "../server.js";
import request from 'supertest';
import sinon from 'sinon';
import chai from 'chai';

let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import DomoticService from '../api/domotic/services/DomoticService'
import DomoticController from "../api/domotic/controllers/DomoticController";

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

const INVALID_REQUEST_BODY = [
  null,
  {},
  { accessCode: null }
];

describe('DomoticController Test Suite', () => {
  INVALID_REQUEST_BODY.forEach((body) => {
    describe(`POST /open-door with invalid body (${body})`, () => {
      it('responds a status 400 (bad request) and a null body response', (done) => {
        request(app)
          .post('/open-door')
          .send(body)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect('Content-Type', /json/)
            expect(res.statusCode).to.equal(400);
            expect(res.body).is.null;
            done();
          });
      });
    });
  });

  INVALID_REQUEST_BODY.forEach((body) => {
    describe('openDoor() calls with an invalid body', () => {
      let fakeDomoticService;
      let fakeDomoticController;
      let req = { body: body };
      beforeEach(() => {
        fakeDomoticService = new DomoticService();
        fakeDomoticController = new DomoticController(fakeDomoticService);
      });

      it('it never calls a openDoor service method', (done) => {
        sinon.stub(fakeDomoticService, 'openDoor').resolves();
        fakeDomoticController.openDoor(req, mockResponse());
        sinon.assert.notCalled(fakeDomoticService.openDoor);
        done();
      });
    });
  });

  describe('openDoor() with valid body', () => {
    let fakeDomoticService = new DomoticService();
    let domoticController;
    let req = { body: { code: 123456 } };
    beforeEach(() => {
      fakeDomoticService = new DomoticService();
      domoticController = new DomoticController(fakeDomoticService);
    });

    it('it always calls a openDoor service method', (done) => {
      sinon.stub(fakeDomoticService, 'openDoor').resolves();

      domoticController.openDoor(req, mockResponse());
      sinon.assert.calledOnce(fakeDomoticService.openDoor);
      done();
    });
  });

});
