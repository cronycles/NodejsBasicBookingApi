import BookingsRoutes from "./sections/bookings/routes/BookingsRoutes";
import BookingRepository from "./sections/bookings/repositories/BookingRepository";
import ControlAccessService from "./sections/bookings/services/ControlAccessService";
import BookingService from "./sections/bookings/services/BookingService";
import BookingsController from "./sections/bookings/controllers/BookingsController";

import DomoticRoutes from "./sections/domotic/routes/DomoticRoutes";
import DomoticRepository from "./sections/domotic/repositories/DomoticRepository";
import DomoticService from "./sections/domotic/services/DomoticService";
import DomoticController from "./sections/domotic/controllers/DomoticController";

module.exports.initializeClasses = (app) => {
  const bookingRespository = new BookingRepository();
  const controlAccessService = new ControlAccessService();
  const bookingService = new BookingService(bookingRespository, controlAccessService);
  const bookingsController = new BookingsController(bookingService);
  new BookingsRoutes(bookingsController, app);

  const domoticRespository = new DomoticRepository();
  const domoticService = new DomoticService(domoticRespository);
  const domoticController = new DomoticController(domoticService);
  new DomoticRoutes(domoticController, app);
}