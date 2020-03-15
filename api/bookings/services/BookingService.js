import BookingEntity from "./entities/BookingEntity";
import CheckinEntity from "./entities/CheckinEntity";
import CheckoutEntity from "./entities/CheckoutEntity";
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
    checkin = (checkinEntity) => {
        try {
            if (!checkinEntity) {
                return this.#createCheckinErrorResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidClientId(checkinEntity.clientId)) {
                return this.#createCheckinErrorResponseEntity(SERVICE_ERRORS.INVALID_CLIENT_ID);
            }
            
            return this.#performCheckin(checkinEntity);

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    checkout = (checkoutEntity) => {
        try {
            if (!checkoutEntity) {
                return this.#createCheckoutErrorResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidClientId(checkoutEntity.clientId)) {
                return this.#createCheckoutErrorResponseEntity(SERVICE_ERRORS.INVALID_CLIENT_ID);
            }
            return this.#performCheckout(checkoutEntity);

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

    #createCheckinErrorResponseEntity = (errorConstant) => {
        return new CheckinEntity(null, null, null, errorConstant);
    };

    #createCheckoutErrorResponseEntity = (errorConstant) => {
        return new CheckoutEntity(null, null, errorConstant);
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

    #performCheckin = (checkinEntity) => {
        const clientId = this.#bookingRepository.getClientById(checkinEntity.clientId);
        if (!clientId) {
            
            return this.#createCheckinErrorResponseEntity(SERVICE_ERRORS.CLIENT_NOT_FOUND);
        }
        const clientBooking = this.#bookingRepository.getClientTodayBooking(checkinEntity.clientId);
        if (!clientBooking) {
            return this.#createCheckinErrorResponseEntity(SERVICE_ERRORS.INVALID_CHECKIN);
        }
        checkinEntity.bookingId = clientBooking.id;
        const accessCode = this.#controlAccessService.getAccessCode();
        if (accessCode) {
            checkinEntity.accessCode = accessCode;
            return this.#bookingRepository.checkin(checkinEntity);
        }
        return this.#createCheckinErrorResponseEntity(SERVICE_ERRORS.UNKNOWN);
    };

    #performCheckout = (checkoutEntity) => {
        const clientId = this.#bookingRepository.getClientById(checkoutEntity.clientId);
        if (!clientId) {
            return this.#createCheckoutErrorResponseEntity(SERVICE_ERRORS.CLIENT_NOT_FOUND);
        }
        const clientBooking = this.#bookingRepository.getClientCheckedInBooking(checkoutEntity.clientId);
        if (!clientBooking) {
            return this.#createCheckoutErrorResponseEntity(SERVICE_ERRORS.INVALID_CHECKOUT);
        }
        checkoutEntity.bookingId = clientBooking.id;

        return this.#bookingRepository.checkout(checkoutEntity);
    };
}