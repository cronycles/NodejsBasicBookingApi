export default class CheckinEntity {
    clientId;
    bookingId;
    accessCode;
    error;

    constructor (clientId, bookingId, accessCode, error = null) {
        this.clientId = clientId;
        this.bookingId = bookingId;
        this.accessCode = accessCode;
        this.error = error;
    }
}