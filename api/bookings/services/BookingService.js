import BookingEntity from "./entities/BookingEntity";
import CheckinResponseEntity from "./entities/CheckinResponseEntity";
import CheckoutResponseEntity from "./entities/CheckoutResponseEntity";
import SERVICE_ERRORS from "./entities/BookingServiceErrorsConstants";
export default class BookingService {
    #bookingRepository;
    #controlAccessService;

    constructor(bookingRepository, controlAccessService) {
        this.#bookingRepository = bookingRepository;
        this.#controlAccessService = controlAccessService;
    }

    createBooking = (bookingEntity) => {
        try {
            if (!bookingEntity) {
                return this.#createBookingErrorResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidClientId(bookingEntity.clientId)) {
                return this.#createBookingErrorResponseEntity(SERVICE_ERRORS.INVALID_CLIENT_ID);
            }
            if (!this.#areValidDates(bookingEntity.dateFrom, bookingEntity.dateTo)) {
                return this.#createBookingErrorResponseEntity(SERVICE_ERRORS.INVALID_DATES);
            }
            return this.#performBookingCreation(bookingEntity);

        } catch (e) {
            console.log(e);
            return null;
        }
    }
    checkin = (checkinRequestEntity) => {
        try {
            if (!checkinRequestEntity) {
                return new CheckinResponseEntity(null, SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidClientId(checkinRequestEntity.clientId)) {
                return new CheckinResponseEntity(null, SERVICE_ERRORS.INVALID_CLIENT_ID);
            }

            return this.#performCheckin(checkinRequestEntity);

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    checkout = (checkoutRequestEntity) => {
        try {
            if (!checkoutRequestEntity) {
                return new CheckoutResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidClientId(checkoutRequestEntity.clientId)) {
                return new CheckoutResponseEntity(SERVICE_ERRORS.INVALID_CLIENT_ID);
            }
            return this.#performCheckout(checkoutRequestEntity);

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

    #createBookingErrorResponseEntity = (errorConstant) => {
        return new BookingEntity(null, null, null, errorConstant);
    };

    #performBookingCreation = (bookingEntity) => {
        const clientId = this.#bookingRepository.getClientById(bookingEntity.clientId);
        if (!clientId) {
            return this.#createBookingErrorResponseEntity(SERVICE_ERRORS.CLIENT_NOT_FOUND);
        }
        const clientBookingsByDates = this.#bookingRepository.getClientBookingsByDates(bookingEntity.clientId, bookingEntity.dateFrom, clientId.DateTo);
        if (clientBookingsByDates && clientBookingsByDates.length > 0) {
            return this.#createBookingErrorResponseEntity(SERVICE_ERRORS.BOOKINGS_FOUND);
        }

        return this.#bookingRepository.createBooking(bookingEntity);
    };

    #performCheckin = (checkinRequestEntity) => {
        const clientId = this.#bookingRepository.getClientById(checkinRequestEntity.clientId);
        if (!clientId) {
            return new CheckinResponseEntity(null, SERVICE_ERRORS.CLIENT_NOT_FOUND);
        }
        const clientBooking = this.#bookingRepository.getClientTodayBooking(checkinRequestEntity.clientId);
        if (!clientBooking) {
            return new CheckinResponseEntity(null, SERVICE_ERRORS.INVALID_CHECKIN);
        }
        const accessCode = this.#controlAccessService.getAccessCode();
        if (accessCode) {
            return new CheckinResponseEntity(accessCode, null);
        }
        return new CheckinResponseEntity(null, SERVICE_ERRORS.UNKNOWN);
    };

    #performCheckout = (checkoutRequestEntity) => {
        const clientId = this.#bookingRepository.getClientById(checkoutRequestEntity.clientId);
        if (!clientId) {
            return new CheckoutResponseEntity(SERVICE_ERRORS.CLIENT_NOT_FOUND);
        }

        const clientBooking = this.#bookingRepository.getClientCheckedInBooking(checkoutRequestEntity.clientId);
        if (!clientBooking) {
            return new CheckoutResponseEntity(SERVICE_ERRORS.INVALID_CHECKIN);
        }

        const isCheckedOut = this.#bookingRepository.checkout(clientId, clientBooking.id);
        if (isCheckedOut) {
            return new CheckoutResponseEntity();
        }
        return new CheckoutResponseEntity(SERVICE_ERRORS.UNKNOWN);
    };
}