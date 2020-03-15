export default class CheckoutEntity {
    clientId;
    bookingId;
    error;

    constructor(clientId, bookingId, error) {
        this.clientId = clientId;
        this.bookingId = bookingId;
        this.error = error;
    }
}