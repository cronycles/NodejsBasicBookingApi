import app from "../server.js";
import request from 'supertest';
import { expect } from "chai"

describe('BookingsController Test Suite', () => {
  const INVALID_CLIENT_IDS = [null, undefined, 0, -1];
  INVALID_CLIENT_IDS.forEach((clientId) => {
    describe(`POST /bookings with invalid or unregistered clientId (${clientId})`, () => {
      it('responds error with id 1 and "Invalid client id "text', (done) => {
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
