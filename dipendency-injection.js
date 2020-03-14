import BookingsRoutes from "./api/bookings/routes/BookingsRoutes";
import BookingsController from "./api/bookings/controllers/BookingsController";
import BookingService from "./api/bookings/services/BookingService";

module.exports.initializeClasses = (app) => {
  const bookingService = new BookingService();
  const bookingsController = new BookingsController(bookingService);
  new BookingsRoutes(bookingsController, app);
}