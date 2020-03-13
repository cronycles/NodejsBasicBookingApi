import app from "../server.js";
import request from 'supertest';
import { expect } from "chai"

describe('BookingsController Test Suite', () => {
  const INVALID_REQUEST_BODY = [null, {}];
  INVALID_REQUEST_BODY.forEach((body) => {
    describe(`POST /bookings with invalid body (${body})`, () => {
      it('responds always with some error and some text into the message error', (done) => {
        request(app)
          .post('/bookings')
          .send(body)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect('Content-Type', /json/)
            expect(res.statusCode).to.equal(200);
            expect(res.body.error).not.null;
            expect(res.body.error.id).to.be.greaterThan(0);
            expect(res.body.error.message).not.to.be.empty;
            expect(res.body.booking).to.be.undefined;
            done();
          });
      });
    });
  });


  const INVALID_CLIENT_IDS = [null, undefined, 0, -1];
  INVALID_CLIENT_IDS.forEach((clientId) => {
    describe(`POST /bookings with invalid or unregistered clientId (${clientId})`, () => {
      it('responds error with id 2 and "Invalid client id "text', (done) => {
        request(app)
          .post('/bookings')
          .send({ clientId: clientId })
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect('Content-Type', /json/)
            expect(res.statusCode).to.equal(200);
            expect(res.body.error.id).to.equal(1);
            expect(res.body.error.message).to.equal("Invalid client id");
            expect(res.body.booking).to.be.undefined;
            done();
          });
      });
    });
  });
  
});
