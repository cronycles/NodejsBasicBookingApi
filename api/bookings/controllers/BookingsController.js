import CLIENT_BOOKING_ERRORS from './sharedEntities/BookingErrorsConstants';
import SERVICE_BOOKING_ERRORS from '../services/entities/BookingServiceErrorsConstants';
import BookingEntity from '../services/entities/BookingEntity';

export default class BookingsController {
  #bookingService;

  constructor(bookingService) {
    this.#bookingService = bookingService;
  }

  createBooking = (req, res) => {
    try {
      var booking = req.body;
      if (this.#isAValidBookingRequest(booking)) {
        let bookingServiceRequestEntity = new BookingEntity(booking.clientId, booking.dateFrom, booking.dateTo);
        let bookingServiceResponseEntity = this.#bookingService.createBooking(bookingServiceRequestEntity);

        const objectResponse = this.#createObjectResponseForBooking(bookingServiceResponseEntity);
        
        res.status(objectResponse.status).json(objectResponse.data);
      }
      else {
        res.status(400).json(null);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(null);
    }
  };

  checkin = (req, res) => {
    try {
      var checkin = req.body;
      if (this.#isAValidCheckinRequest(checkin)) {
        let checkInResponseEntity = this.#bookingService.checkin(checkin.clientId);

        const objectResponse = this.#createObjectResponseForCheckin(checkInResponseEntity);
        res.status(objectResponse.status).json(objectResponse.data);
      }
      else {
        res.status(400).json(null);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(null);
    }
  };

  checkout = (req, res) => {
    try {
      var checkout = req.body;
      if (this.#isAValidCheckoutRequest(checkout)) {
        let checkInResponseEntity = this.#bookingService.checkout(checkout.clientId);

        const objectResponse = this.#createObjectResponseForCheckout(checkInResponseEntity);
        res.status(objectResponse.status).json(objectResponse.data);
      }
      else {
        res.status(400).json(null);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(null);
    }
  };

  #isAValidCheckinRequest(checkin) {
    try {
      let outcome = false;
      if (checkin != null
        && checkin != {}
        && checkin.clientId) {
        outcome = true;
      }
      return outcome;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  #isAValidCheckoutRequest(checkout) {
    try {
      let outcome = false;
      if (checkout != null
        && checkout != {}
        && checkout.clientId) {
        outcome = true;
      }
      return outcome;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

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

  #createObjectResponseForBooking(bookingEntity) {
    try {
      let outcome = {}

      if (bookingEntity) {
        if (bookingEntity.error) {
          
          outcome = this.#createErrorResponseFromServiceError(bookingEntity.error);
        }
        else {
          outcome = this.#createResponseOkDataObject(
            {
              booking: {
                clientId: bookingEntity.clientId,
                dateFrom: bookingEntity.dateFrom,
                dateTo: bookingEntity.dateTo
              }
            });
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

  #createObjectResponseForCheckin(checkinResponseEntity) {
    try {
      let outcome = {}

      if (checkinResponseEntity) {
        if (checkinResponseEntity.error && checkinResponseEntity.accessCode == null) {
          outcome = this.#createErrorResponseFromServiceError(checkinResponseEntity.error);
        }
        else {
          outcome = this.#createResponseOkDataObject(checkinResponseEntity.accessCode);
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

  #createObjectResponseForCheckout(checkoutResponseEntity) {
    try {
      let outcome = {}

      if (checkoutResponseEntity) {
        if (checkoutResponseEntity.error) {
          outcome = this.#createErrorResponseFromServiceError(checkoutResponseEntity.error);
        }
        else {
          outcome = this.#createResponseOkDataObject({})
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

  #createResponseOkDataObject(outputDataObject) {
    return {
      status: 200,
      data: outputDataObject
    }
  }

  #createErrorResponseFromServiceError(serviceError) {
    let outcome = {
      status: 200,
      data: {
        error: {
          id: CLIENT_BOOKING_ERRORS.UNKNOWN,
          message: "Unknown error"
        }
      }
    }
    if (serviceError) {

      switch (serviceError) {
        case SERVICE_BOOKING_ERRORS.INVALID_INPUTS:
          outcome.status = 400
          break;
        case SERVICE_BOOKING_ERRORS.INVALID_CLIENT_ID:
        case SERVICE_BOOKING_ERRORS.CLIENT_NOT_FOUND:
          outcome.data.error.id = CLIENT_BOOKING_ERRORS.INVALID_CLIENT_ID;
          outcome.data.error.message = "Invalid client id"
          break;
        case SERVICE_BOOKING_ERRORS.INVALID_DATES:
          outcome.data.error.id = CLIENT_BOOKING_ERRORS.INVALID_DATES;
          outcome.data.error.message = "Invalid dates"
          break;
        case SERVICE_BOOKING_ERRORS.BOOKINGS_FOUND:
          outcome.data.error.id = CLIENT_BOOKING_ERRORS.BOOKINGS_FOUND;
          outcome.data.error.message = "you already have a booking between these days"
          break;
        case SERVICE_BOOKING_ERRORS.INVALID_CHECKIN:
          outcome.data.error.id = CLIENT_BOOKING_ERRORS.INVALID_CHECKIN;
          outcome.data.error.message = "checkin error"
          break;
        case SERVICE_BOOKING_ERRORS.INVALID_CHECKOUT:
          outcome.data.error.id = CLIENT_BOOKING_ERRORS.INVALID_CHECKOUT;
          outcome.data.error.message = "checkin error"
          break;
        default:
          outcome.data.error.id = CLIENT_BOOKING_ERRORS.UNKNOWN;
          outcome.data.error.message = "Unknown error"
          break;
      }
    }
    return outcome;
  }

}