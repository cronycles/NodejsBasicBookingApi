import CreateBookingResponseEntity from "./entities/CreateBookingResponseEntity";
import SERVICE_ERRORS from "./entities/BookingServiceErrorsConstants";
export default class BookingService {

    createBooking = (createBookingRequestEntity) => {
        try {
            let outcome = null;
            if (createBookingRequestEntity) {
                if(!this.#isAValidClientId(createBookingRequestEntity.clientId)) {
                    outcome = new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_CLIENT_ID);
                }
                else if(!this.#areValidDates(createBookingRequestEntity.dateFrom, createBookingRequestEntity.dateTo)) {
                    outcome = new CreateBookingResponseEntity(null, SERVICE_ERRORS.INVALID_DATES);
                }
                else {

                }
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

    #areValidDates = (dateFromString, dateToString) => {
        try {
            let outcome = false;
            console.log(dateFromString);
            if(dateFromString && dateToString) {
                
                const dateFrom = Date.parse(dateFromString);
                const dateTo = Date.parse(dateToString);
                if(!isNaN(dateFrom) && !isNaN(dateTo)) {
                    outcome = dateTo > dateFrom;
                }
            }
    
            return outcome;

        }catch (e){
            console.log(e);
            return false;
        }
    }
}