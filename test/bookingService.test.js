import app from "../server.js";
import request from 'supertest';
import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';

chai.use(spies);
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import ControlAccessService from "../api/bookings/services/ControlAccessService";
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

        describe('createBooking(inputEntity) the dates are invalid', () => {
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

    describe('createBooking(inputEntity) with valid inputs', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('always calls bookingRepository.getClientById() function', (done) => {
            const inputEntity = { clientId: 1, dateFrom: "3050-01-01", dateTo: "3050-01-02" };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(null);

            const bookingServiceCreateBookingOutcome = bookingService.createBooking(inputEntity);
            expect(bookingServiceCreateBookingOutcome).to.be.an.instanceOf(CreateBookingResponseEntity);
            sinon.assert.calledOnce(fakeBookingRepository.getClientById);
            done();
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
            expect(bookingServiceCreateBookingOutcome.booking).is.null;
            expect(bookingServiceCreateBookingOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.CLIENT_NOT_FOUND);
            done();
        });
    });

    describe('the client already has booking into the building', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('always returns bookings found error', (done) => {
            const inputEntity = { clientId: 1, dateFrom: "3050-01-01", dateTo: "3050-01-02" };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(1);
            sinon.stub(fakeBookingRepository, 'getClientBookingsByDates').returns(["booking"]);

            const bookingServiceCreateBookingOutcome = bookingService.createBooking(inputEntity);
            expect(bookingServiceCreateBookingOutcome).not.null;
            expect(bookingServiceCreateBookingOutcome).not.null;
            expect(bookingServiceCreateBookingOutcome.booking).is.null;
            expect(bookingServiceCreateBookingOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.BOOKINGS_FOUND);
            done();
        });
    });

    describe('createBooking() with everything ok', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('it always creates calls bookingRepository.createBooking() function ', (done) => {
            const inputEntity = { clientId: 1, dateFrom: "3050-01-01", dateTo: "3050-01-02" };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(1);
            sinon.stub(fakeBookingRepository, 'getClientBookingsByDates').returns(null);
            sinon.stub(fakeBookingRepository, 'createBooking').resolves();

            bookingService.createBooking(inputEntity);
            sinon.assert.calledOnce(fakeBookingRepository.createBooking);
            done();
        });
    });

    describe('checkin() with unknown clientId', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('it always returns a client not found error', (done) => {
            const inputEntity = { clientId: 1 };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(null);
        
            const bookingServiceCheckinOutcome = bookingService.checkin(inputEntity);
            expect(bookingServiceCheckinOutcome).not.null;
            expect(bookingServiceCheckinOutcome).not.null;
            expect(bookingServiceCheckinOutcome.accessCode).is.null;
            expect(bookingServiceCheckinOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.CLIENT_NOT_FOUND);
            done();
        });
    });

    describe('checkin() with valid clientId', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('it always calls a BookingRepository.getClientTodayBooking', (done) => {
            const inputEntity = { clientId: 1 };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(1);
            sinon.stub(fakeBookingRepository, 'getClientTodayBooking').returns({booking: "booking"});
        
            bookingService.checkin(inputEntity);
            sinon.assert.calledOnce(fakeBookingRepository.getClientTodayBooking);
            done();
        });
    });

    describe('checkin() with valid clientId and existig booking', () => {
        let fakeBookingRepository;
        let fakeControlAccessService;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            fakeControlAccessService = new ControlAccessService();
            bookingService = new BookingService(fakeBookingRepository, fakeControlAccessService);
        });

        it('it always calls a ControleAccessService.getAccessCode', (done) => {
            const inputEntity = { clientId: 1 };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(1);
            sinon.stub(fakeBookingRepository, 'getClientTodayBooking').returns({booking: "booking"});
            sinon.stub(fakeControlAccessService, 'getAccessCode').resolves();
        
            bookingService.checkin(inputEntity);
            sinon.assert.calledOnce(fakeControlAccessService.getAccessCode);
            done();
        });
    });

    describe('checkout() with unknown clientId', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('it always returns a client not found error', (done) => {
            const inputEntity = { clientId: 1 };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(null);
        
            const bookingServiceCheckinOutcome = bookingService.checkout(inputEntity);
            expect(bookingServiceCheckinOutcome).not.null;
            expect(bookingServiceCheckinOutcome).not.null;
            expect(bookingServiceCheckinOutcome.error).is.equal(BOOKING_SERVICE_CONSTANTS.CLIENT_NOT_FOUND);
            done();
        });
    });

    describe('checkout() with valid clientId', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('it always calls a BookingRepository.getClientCheckedInBooking', (done) => {
            const inputEntity = { clientId: 1 };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(1);
            sinon.stub(fakeBookingRepository, 'getClientCheckedInBooking').returns({booking: "booking"});
        
            bookingService.checkout(inputEntity);
            sinon.assert.calledOnce(fakeBookingRepository.getClientCheckedInBooking);
            done();
        });
    });

    describe('checkout() with valid clientId and existig checkedIn booking', () => {
        let fakeBookingRepository;
        let bookingService;
        beforeEach(() => {
            fakeBookingRepository = new BookingRepository(fakeBookingRepository);
            bookingService = new BookingService(fakeBookingRepository);
        });

        it('it always calls a BookingRepository.getAccessCode', (done) => {
            const inputEntity = { clientId: 1 };
            sinon.stub(fakeBookingRepository, 'getClientById').returns(1);
            sinon.stub(fakeBookingRepository, 'getClientCheckedInBooking').returns({booking: "booking"});
            sinon.stub(fakeBookingRepository, 'checkout').resolves();
        
            bookingService.checkout(inputEntity);
            sinon.assert.calledOnce(fakeBookingRepository.checkout);
            done();
        });
    });

});