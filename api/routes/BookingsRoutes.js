export default class BookingsRoutes {
  bookingsController;

  constructor(bookingController, app) {
    this.bookingsController = bookingController;
    this.defineBookingsRoutes(app);
  }

  defineBookingsRoutes = (app) => {
    app.route('/bookings')
      .post(this.bookingsController.createBooking);
  }

}