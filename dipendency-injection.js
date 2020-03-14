import BookingsRoutes from "./api/bookings/routes/BookingsRoutes";
import BookingsController from "./api/bookings/controllers/BookingsController";
import BookingService from "./api/bookings/services/BookingService";
import BookingRepository from "./api/bookings/repositories/BookingRepository";
import ControlAccessService from "./api/bookings/services/ControlAccessService";

module.exports.initializeClasses = (app) => {
  const bookingRespository = new BookingRepository();
  const controlAccessService = new ControlAccessService();
  const bookingService = new BookingService(bookingRespository, controlAccessService);
  const bookingsController = new BookingsController(bookingService);
  new BookingsRoutes(bookingsController, app);
}