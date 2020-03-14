import app from "../server.js";
import request from 'supertest';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import BookingService from '../api/bookings/services/BookingService'
import BOOKING_SERVICE_CONSTANTS from '../api/bookings/services/entities/BookingServiceErrorsConstants'
import CreateBookingResponseEntity from "../api/bookings/services/entities/CreateBookingResponseEntity.js";

describe('BookingsService Test Suite', () => {
    const INVALID_INPUTS = [
        null,
        undefined
    ];
    INVALID_INPUTS.forEach((inputEntity) => {
        describe('createBooking(InputEntity) with invalid InputEntity', () => {
            let bookingService;
            beforeEach(() => {
                bookingService = new BookingService();
            });

            it('always returns an invalid inputs error', (done) => {
                const bookingServiceCreateBookingOutcome = bookingService.createBooking(inputEntity);
                expect(bookingServiceCreateBookingOutcome).not.null;
                expect(bookingServiceCreateBookingOutcome).not.null;
                expect(bookingServiceCreateBookingOutcome).to.be.an.instanceOf(CreateBookingResponseEntity);
                expect(bookingServiceCreateBookingOutcome.booking).is.null;
                expect(bookingServiceCreateBookingOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.INVALID_INPUTS);
                done();
            });
        });
    });

    const INVALID_CLIENT_ID = [
        { clientId: 0 },
        { clientId: -10 },
        { clientId: null },
        { clientId: "" },
        { clientId: "blablabla" }
    ];
    INVALID_CLIENT_ID.forEach((inputEntity) => {
        describe('createBooking(InputEntity) with invalid clientId', () => {
            let bookingService;
            beforeEach(() => {
                bookingService = new BookingService();
            });

            it('always returns an invalid client id error', (done) => {
                const bookingServiceCreateBookingOutcome = bookingService.createBooking(inputEntity);
                expect(bookingServiceCreateBookingOutcome).not.null;
                expect(bookingServiceCreateBookingOutcome).not.null;
                expect(bookingServiceCreateBookingOutcome).to.be.an.instanceOf(CreateBookingResponseEntity);
                expect(bookingServiceCreateBookingOutcome.booking).is.null;
                expect(bookingServiceCreateBookingOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.INVALID_CLIENT_ID);
                done();
            });
        });
    });

    const INVALID_DATES = [
        { clientId: 1, dateFrom: null },
        { clientId: 1, dateFrom: null, dateTo: null },
        { clientId: 1, dateTo: null },
        { clientId: 1, dateFrom: "", dateTo: "" },
        { clientId: 1, dateFrom: "adasdsdaad", dateTo: "asdds" },
        { clientId: 1, dateFrom: "2011/04/02", dateTo: "2000/04/02" },
        { clientId: 1, dateFrom: "2011/16/02", dateTo: "2000/04/02" },
        { clientId: 1, dateFrom: "2011-04-02", dateTo: "2010-04-02" },
    ];
    INVALID_DATES.forEach((inputEntity) => {

        describe('the dates are invalid', () => {
            let bookingService;
            beforeEach(() => {
                bookingService = new BookingService();
            });

            it('always returns an invalid dates error', (done) => {
                const bookingServiceCreateBookingOutcome = bookingService.createBooking(inputEntity);
                expect(bookingServiceCreateBookingOutcome).not.null;
                expect(bookingServiceCreateBookingOutcome).not.null;
                expect(bookingServiceCreateBookingOutcome).to.be.an.instanceOf(CreateBookingResponseEntity);
                expect(bookingServiceCreateBookingOutcome.booking).is.null;
                expect(bookingServiceCreateBookingOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.INVALID_DATES);
                done();
            });
        });
    });


    //   const INVALID_DATES = [
    //     null,
    //     {dateFrom: null, dateTo: null},
    //     {dateFrom: 0, dateTo: 0},
    //     {dateFrom: 1, dateTo: 3},
    //     {dateFrom: "1asds123", dateTo: null},
    //     {dateFrom: "1asds123", dateTo: "null"},
    //     {dateFrom: Date.now().toString() , dateTo: Date.now().toString()}, //Mismo día
    //     {dateFrom: "12/05/2019", dateTo: "13/05/2019"}, //años atras
    //     {dateFrom: (Date.now() + 1).toString(), dateTo: Date.now().toString()} //años atras
    //   ];
    //   INVALID_DATES.forEach((date) => {
    //     describe.skip(`POST /bookings with invalid date (${date})`, () => {
    //       it('responds error with id 2 and "Invalid dates "text', (done) => {
    //         request(app)
    //           .post('/bookings')
    //           .send({ clientId: clientId })
    //           .set('Accept', 'application/json')
    //           .end((err, res) => {
    //             expect('Content-Type', /json/)
    //             expect(res.statusCode).to.equal(200);
    //             expect(res.body.error.id).to.equal(2);
    //             expect(res.body.error.message).to.equal("Invalid dates");
    //             expect(res.body.booking).to.be.undefined;
    //             done();
    //           });
    //       });
    //     });
    //   });


});