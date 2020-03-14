import BookingsRoutes from "./api/routes/BookingsRoutes";
import BookingsController from "./api/controllers/BookingsController";
import BookingService from "./Services/BookingService";

module.exports.initializeClasses = (app) => {
  const bookingService = new BookingService();
  const bookingsController = new BookingsController(bookingService);
  new BookingsRoutes(bookingsController, app);
}