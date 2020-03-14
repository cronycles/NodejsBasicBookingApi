import CreateBookingResponseEntity from "./entities/CreateBookingResponseEntity";
import SERVICE_ERRORS from "./entities/BookingServiceErrorsConstants";
export default class BookingService {

    createBooking = (createBookingRequestEntity) => {
        try {
            let outcome = null;
            if (createBookingRequestEntity) {
                if(!this.#isAValidClientId(createBookingRequestEntity.clientId)) {
                    outcome = new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_CLIENT_ID);
                };
            }else {
                outcome = new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_INPUTS);
            }
            return outcome;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    #isAValidClientId = (clientId) => {
        return clientId && clientId > 0
    }
}