export default class BookingsRoutes {
  #bookingsController;

  constructor(bookingController, app) {
    this.#bookingsController = bookingController;
    this.defineRoutes(app);
  }

  defineRoutes = (app) => {
    app.route('/bookings')
      .post(this.#bookingsController.createBooking);

    app.route('/checkin')
      .post(this.#bookingsController.checkin);

    app.route('/checkout')
      .post(this.#bookingsController.checkout);
  }

}