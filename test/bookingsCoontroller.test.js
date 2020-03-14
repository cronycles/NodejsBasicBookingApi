import app, { boookingsRoutes } from "../server.js";
import request from 'supertest';
import sinon from 'sinon';
import chai from 'chai';

let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import BookingService from '../api/bookings/services/BookingService'
import BookingsController from "../api/bookings/controllers/BookingsController";

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

const INVALID_REQUEST_BODY = [
  null,
  {},
  { clientId: null },
  { clientId: null, dateFrom: null },
  { clientId: null, dateFrom: null, dateTo: null },
  { clientId: "", dateFrom: "", dateTo: "" },
];

describe('BookingsController Test Suite', () => {
  INVALID_REQUEST_BODY.forEach((body) => {
    describe(`POST /bookings with invalid body (${body})`, () => {
      it('responds a status 400 (bad request) and a null body response', (done) => {
        request(app)
          .post('/bookings')
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
    describe('createBooking calls with an invalid body', () => {
      let fakeBookingService;
      let fakeBookingsController;
      let req = { body: body };
      beforeEach(() => {
        fakeBookingService = new BookingService();
        fakeBookingsController = new BookingsController(fakeBookingService);
      });

      it('it never calls a createBooking service method', (done) => {
        let fakeBookingRoutes = sinon.stub(boookingsRoutes).returns(fakeBookingRoutes);
        sinon.stub(fakeBookingService, 'createBooking').resolves();

        fakeBookingsController.createBooking(req, mockResponse());
        sinon.assert.notCalled(fakeBookingService.createBooking);
        done();
      });
    });
  });

  describe('createBooking() with valid body', () => {
    let fakeBookingService = new BookingService();
    let bookingsController;
    let req = { body: { clientId: 1, dateFrom: "something", dateTo: "something" } };
    beforeEach(() => {
      fakeBookingService = new BookingService();
      bookingsController = new BookingsController(fakeBookingService);
    });

    it('it always calls a createBooking service method', (done) => {
      sinon.stub(fakeBookingService, 'createBooking').resolves();

      bookingsController.createBooking(req, mockResponse());
      sinon.assert.calledOnce(fakeBookingService.createBooking);
      done();
    });
  });

});
