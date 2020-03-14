import CreateBookingResponseEntity from "./entities/CreateBookingResponseEntity";
import SERVICE_ERRORS from "./entities/BookingServiceErrorsConstants";
export default class BookingService {
    #bookingRepository;

    constructor(bookingRepository) {
        this.#bookingRepository = bookingRepository;
    }

    createBooking = (createBookingRequestEntity) => {
        try {
            let outcome = null;
            if (!createBookingRequestEntity) {
                return new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidClientId(createBookingRequestEntity.clientId)) {
                return new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_CLIENT_ID);
            }
            if (!this.#areValidDates(createBookingRequestEntity.dateFrom, createBookingRequestEntity.dateTo)) {
                return new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_DATES);
            }
            return this.#performBookingCreation(createBookingRequestEntity);

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    #isAValidClientId = (clientId) => {
        return clientId && clientId > 0
    }

    #areValidDates = (dateFromString, dateToString) => {
        try {
            let outcome = false;
            if (dateFromString && dateToString) {

                const dateFrom = Date.parse(dateFromString);
                const dateTo = Date.parse(dateToString);
                if (!isNaN(dateFrom) && !isNaN(dateTo)) {
                    let todayStart = new Date().setHours(0, 0, 0, 0);
                    outcome = dateFrom >= todayStart
                        && dateTo > dateFrom
                }
            }

            return outcome;

        } catch (e) {
            console.log(e);
            return false;
        }
    }
    #performBookingCreation = (createBookingRequestEntity) => {
        let outcome = null;
        const clientId = this.#bookingRepository.getClientById(createBookingRequestEntity.clientId);
        if (!clientId) {
            return new CreateBookingResponseEntity(null, SERVICE_ERRORS.CLIENT_NOT_FOUND);
        }
        const clientBookingsByDates = this.#bookingRepository.getClientBookingsByDates(createBookingRequestEntity.clientId, createBookingRequestEntity.dateFrom,clientId.DateTo);
        if(clientBookingsByDates && clientBookingsByDates.length > 0) {
            return new CreateBookingResponseEntity(null, SERVICE_ERRORS.BOOKINGS_FOUND);
        }

        return this.#bookingRepository.createBooking(createBookingRequestEntity.clientId, createBookingRequestEntity.dateFrom,clientId.DateTo);
    }
}