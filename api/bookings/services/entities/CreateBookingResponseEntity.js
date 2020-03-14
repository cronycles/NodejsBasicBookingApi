export default class CreateBookingResponseEntity {
    booking;
    error;

    constructor (booking, error) {
        this.booking = booking;
        this.error = error;
    }
}