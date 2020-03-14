import CLIENT_BOOKING_ERRORS from './sharedEntities/BookingErrorsConstants';
import SERVICE_BOOKING_ERRORS from '../services/entities/BookingServiceErrorsConstants';
import CreateBookingRequestEntity from '../services/entities/CreateBookingRequestEntity';

export default class BookingsController {
  #bookingService;

  constructor(bookingService) {
    this.#bookingService = bookingService;
  }
  createBooking = (req, res) => {
    var booking = req.body;
    if (this.#isAValidBookingRequest(booking)) {
      let bookingServiceRequestEntity = new CreateBookingRequestEntity(booking.clientId, booking.dateFrom, booking.dateTo);
      let bookingServiceResponseEntity = this.#bookingService.createBooking(bookingServiceRequestEntity);
      const objectResponse = this.#createObjectResponseForCreatedBooking(bookingServiceResponseEntity);
      res.status(objectResponse.status).json(objectResponse.body);
    }
    else {
      res.status(400).json(null);
    }
  };

  #isAValidBookingRequest(booking) {
    try {
      let outcome = false;
      if (booking != null
        && booking != {}
        && booking.clientId
        && booking.dateFrom
        && booking.dateTo) {
        outcome = true;
      }
      return outcome;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  #createObjectResponseForCreatedBooking(bookingServiceResponseEntity) {
    try {
      let outcome = {}

      if (bookingServiceResponseEntity) {
        if (bookingServiceResponseEntity.error && bookingServiceResponseEntity.booking == null) {
          outcome = this.#createErrorResponseFromServiceError(bookingServiceResponseEntity.error);
        }
        else {
          outcome = {
            status: 200,
            data: {
              booking:  bookingServiceResponseEntity.booking
            } 
          }
        }
      }

      return outcome;

    } catch (e) {
      console.log(e);
      return {
        status: 500
      }
    }
  }

  #createErrorResponseFromServiceError(serviceErrorEntity) {
    let outcome = {
      status: 200,
      data: {
        error: {
          id: CLIENT_BOOKING_ERRORS.UNKNOWN,
          message: "Unknown error"
        } 
      }
    }
    if (serviceErrorEntity.id) {
      
      switch (serviceErrorEntity.id) {
        case SERVICE_BOOKING_ERRORS.INVALID_INPUTS:
          outcome.status = 400
          break;
        case SERVICE_BOOKING_ERRORS.INVALID_CLIENT_ID:
          outcome.data.error.id = serviceErrorEntity.id;
          outcome.data.error.message = "Invalid client id"
          break;
        case SERVICE_BOOKING_ERRORS.INVALID_DATES:
          outcome.data.error.id = serviceErrorEntity.id;
          outcome.data.error.message = "Invalid dates"
          break;
        default:
          outcome.data.error.message = "Unknown error"
          break;
      }
    }

    return outcome;
  }

}