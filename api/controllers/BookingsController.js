import BOOKING_ERRORS from './constants/BookingErrorsConstants';
export default class BookingsController {
  #bookingService;

  constructor(bookingService) {
    this.#bookingService = bookingService;
  }
  createBooking = (req, res) => {
    var booking = req.body;
    if (!this.#isAValidBookingRequest(booking)) {
      res.status(400).json(null);
    }
    else {
      let bookingServiceResponseEntity = this.#bookingService.createBooking(booking);
      const objectResponse = this.#createObjectResponseForCreatedBooking(bookingServiceResponseEntity);
      res.status(200).json(objectResponse);
    }
  };

  #isAValidBookingRequest(booking) {
    try {
      let outcome = false;
      if (booking != null
        && booking != {}
        && typeof booking.clientId != "undefined"
        && typeof booking.dateFrom != "undefined"
        && typeof booking.dateTo != "undefined") {
          outcome = true;
        }
      return outcome;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  #createObjectResponseForCreatedBooking(bookingServiceResponseEntity) {
    let outcome = {
      booking: null,
      error: {
        id: BOOKING_ERRORS.UNKNOWN,
        message: "Unknown error"
      }
    }

    if (bookingServiceResponseEntity) {
      if (bookingServiceResponseEntity.error && bookingServiceResponseEntity.booking == null) {
        outcome.error.id = bookingServiceResponseEntity.error.id;
        outcome.error.message = bookingServiceResponseEntity.message
          ? bookingServiceResponseEntity.message
          : outcome.error.message;
      }
      else {
        outcome.booking = bookingServiceResponseEntity.booking
        outcome.error = null;
      }
    }

    return outcome;
  }

}