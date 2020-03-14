import BookingsRoutes from "./api/bookings/routes/BookingsRoutes";
import BookingRepository from "./api/bookings/repositories/BookingRepository";
import ControlAccessService from "./api/bookings/services/ControlAccessService";
import BookingService from "./api/bookings/services/BookingService";
import BookingsController from "./api/bookings/controllers/BookingsController";

import DomoticRoutes from "./api/domotic/routes/DomoticRoutes";
import DomoticRepository from "./api/domotic/repositories/DomoticRepository";
import DomoticService from "./api/domotic/services/DomoticService";
import DomoticController from "./api/domotic/controllers/DomoticController";

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