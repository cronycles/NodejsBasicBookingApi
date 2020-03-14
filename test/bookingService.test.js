import app from "../server.js";
import request from 'supertest';
import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';

chai.use(spies);
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import BookingRepository from "../api/bookings/repositories/BookingRepository";
import BookingService from '../api/bookings/services/BookingService'
import BOOKING_SERVICE_CONSTANTS from '../api/bookings/services/entities/BookingServiceErrorsConstants'
import CreateBookingResponseEntity from "../api/bookings/services/entities/CreateBookingResponseEntity";

describe('BookingsService Test Suite', () => {
    const INVALID_INPUTS = [
        null,
        undefined
    ];
    INVALID_INPUTS.forEach((inputEntity) => {
        describe('createBooking(InputEntity) with invalid InputEntity', () => {
            let bookingService;
            beforeEach(() => {
                bookingService = new BookingService(new BookingRepository());
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
                bookingService = new BookingService(new BookingRepository());
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
        { clientId: 1, dateFrom: "2011-04-02", dateTo: "2015-04-02" },
    ];
    INVALID_DATES.forEach((inputEntity) => {

        describe('the dates are invalid', () => {
            let bookingService;
            beforeEach(() => {
                bookingService = new BookingService(new BookingRepository());
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

    describe('the client does not exists into de DB', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('always returns a client not found error', (done) => {
            const inputEntity = { clientId: 1, dateFrom: "3050-01-01", dateTo: "3050-01-02" };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(null);

            const bookingServiceCreateBookingOutcome = bookingService.createBooking(inputEntity);
            expect(bookingServiceCreateBookingOutcome).not.null;
            expect(bookingServiceCreateBookingOutcome).not.null;
            expect(bookingServiceCreateBookingOutcome).to.be.an.instanceOf(CreateBookingResponseEntity);
            sinon.assert.calledOnce(fakeBookingRepository.getClientById);
            expect(bookingServiceCreateBookingOutcome.booking).is.null;
            expect(bookingServiceCreateBookingOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.CLIENT_NOT_FOUND);
            done();
        });
    });

});