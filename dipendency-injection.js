import BookingsRoutes from "./sections/bookings/routes/BookingsRoutes";
import BookingRepository from "./sections/bookings/repositories/BookingRepository";
import BookingService from "./sections/bookings/services/BookingService";
import BookingsController from "./sections/bookings/controllers/BookingsController";

import DomoticRoutes from "./sections/domotic/routes/DomoticRoutes";
import DomoticRepository from "./sections/domotic/repositories/DomoticRepository";
import DomoticService from "./sections/domotic/services/DomoticService";
import DomoticController from "./sections/domotic/controllers/DomoticController";

import ControlAccessApi from "./sections/controlAccess/api/ControlAccessApi";
import ControlAccessService from "./sections/controlAccess/services/ControlAccessService";

module.exports.initializeClasses = (app) => {
  const controlAccessApi = new ControlAccessApi();
  const controlAccessService = new ControlAccessService(controlAccessApi);
  
  const bookingRespository = new BookingRepository();
  const bookingService = new BookingService(bookingRespository, controlAccessService);
  const bookingsController = new BookingsController(bookingService);
  new BookingsRoutes(bookingsController, app);

  const domoticRespository = new DomoticRepository();
  const domoticService = new DomoticService(domoticRespository);
  const domoticController = new DomoticController(domoticService);
  new DomoticRoutes(domoticController, app);
}