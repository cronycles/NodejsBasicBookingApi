import BookingsController from '../controllers/BookingsController';
import BookingService from '../../Services/BookingService'

export default class BookingsRoutes {
  #bookingsController;

  constructor(app) {
    const bookingService = new BookingService();
    this.#bookingsController = new BookingsController(bookingService);
    this.defineBookingsRoutes(app);
  }

  defineBookingsRoutes = (app) => {
    app.route('/bookings')
      .post(this.#bookingsController.createABooking);
  }

}