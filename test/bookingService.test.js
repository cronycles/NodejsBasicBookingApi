// import app from "../server.js";
// import request from 'supertest';
// import chai from 'chai';
// import spies from 'chai-spies';

// chai.use(spies);
// let assert = chai.assert;
// let should = chai.should();
// let expect = chai.expect;

//  import BookingService from '../api/booking/services/BookingService'

// describe('BookingsService Test Suite', () => {

//     INVALID_REQUEST_BODY.forEach((body) => {
//         describe('createBooking() with null booking datas', () => {
//           let fakeBookingService;
//           let fakeBookingsController;
//           let req = { body: body };
//           beforeEach(() => {
//             fakeBookingService = new BookingService();
//             fakeBookingsController = new BookingsController(fakeBookingService);
//           });
    
//           it('always returns an invalid input error', (done) => {
//             let fakeBookingRoutes = sinon.stub(boookingsRoutes).returns(fakeBookingRoutes);
//             sinon.stub(fakeBookingService, 'createBooking').resolves();
    
//             fakeBookingsController.createBooking(req, mockResponse());
//             sinon.assert.notCalled(fakeBookingService.createBooking);
//             done();
//           });
//         });
//       });
  

// //   const INVALID_DATES = [
// //     null,
// //     {dateFrom: null, dateTo: null},
// //     {dateFrom: 0, dateTo: 0},
// //     {dateFrom: 1, dateTo: 3},
// //     {dateFrom: "1asds123", dateTo: null},
// //     {dateFrom: "1asds123", dateTo: "null"},
// //     {dateFrom: Date.now().toString() , dateTo: Date.now().toString()}, //Mismo día
// //     {dateFrom: "12/05/2019", dateTo: "13/05/2019"}, //años atras
// //     {dateFrom: (Date.now() + 1).toString(), dateTo: Date.now().toString()} //años atras
// //   ];
// //   INVALID_DATES.forEach((date) => {
// //     describe.skip(`POST /bookings with invalid date (${date})`, () => {
// //       it('responds error with id 2 and "Invalid dates "text', (done) => {
// //         request(app)
// //           .post('/bookings')
// //           .send({ clientId: clientId })
// //           .set('Accept', 'application/json')
// //           .end((err, res) => {
// //             expect('Content-Type', /json/)
// //             expect(res.statusCode).to.equal(200);
// //             expect(res.body.error.id).to.equal(2);
// //             expect(res.body.error.message).to.equal("Invalid dates");
// //             expect(res.body.booking).to.be.undefined;
// //             done();
// //           });
// //       });
// //     });
// //   });
  
// });
