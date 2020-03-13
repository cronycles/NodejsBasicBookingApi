import BookingsController from '../controllers/BookingsController';


export default class BookingsRoutes {
  #bookingsController;

  constructor(app) {
    this.#bookingsController = new BookingsController();
    this.defineBookingsRoutes(app);
  }

  defineBookingsRoutes = (app) => {
    app.route('/bookings')
      .post(this.#bookingsController.createABooking);
  }

}