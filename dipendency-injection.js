import BookingsRoutes from "./api/bookings/routes/BookingsRoutes";
import BookingsController from "./api/bookings/controllers/BookingsController";
import BookingService from "./api/bookings/services/BookingService";
import BookingRepository from "./api/bookings/repositories/BookingRepository";

module.exports.initializeClasses = (app) => {
  const bookingRespository = new BookingRepository();
  const bookingService = new BookingService(bookingRespository);
  const bookingsController = new BookingsController(bookingService);
  new BookingsRoutes(bookingsController, app);
}