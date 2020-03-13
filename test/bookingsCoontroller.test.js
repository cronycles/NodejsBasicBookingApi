import app from "../server.js";
import request from 'supertest';
import {expect} from "chai"

describe('BookingsController Test Suite', () => {
  describe('POST /bookings with null clientId', () => {
    it('responds error with id 1 and "Invalid client id "text', (done) => {
      request(app)
        .post('/bookings')
        .send({ clientId: null })
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