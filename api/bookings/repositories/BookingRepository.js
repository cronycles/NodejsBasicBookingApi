export default class BookingRepository {

    #clients;
    #validBookings;

    constructor() {
        this.#clients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.#validBookings = [
            { client: 1, dateFrom: new Date("2050-01-04"), dateTo: new Date("2050-01-05") },
            { client: 5, dateFrom: new Date("2050-05-04"), dateTo: new Date("2050-05-10") }
        ];
    }

    getClientById = (clientId) => {
        let outcome = null;
        if (this.#clients && this.#clients.length > 0) {
            for (let client of this.#clients) {
                if (client == clientId) {
                    outcome = client;
                    break;
                }
            }
        }

        return outcome;
    }

    getClientBookingsByDates = (clientId, dateFrom, dateTo) => {
        let outcome = [];
        const clientBookings = this.#getClientBookings(clientId)

        if (clientBookings && clientBookings.length > 0) {
            for (let clientBooking of clientBookings) {
                if (dateFrom >= clientBooking.dateFrom && dateTo <= clientBooking.dateTo) {
                    outcome.push(clientBooking);
                    break;
                }
            }
        }
        return outcome;
    }

    getClientTodayBooking = (clientId) => {
        let outcome = null;
        const clientBookings = this.#getClientBookings(clientId)
        const today = new Date().setHours(0, 0, 0, 0);
        if (clientBookings && clientBookings.length > 0) {
            for (let clientBooking of clientBookings) {
                if (clientBooking.dateFrom == today) {
                    outcome = clientBooking;
                    break;
                }
            }
        }
        return outcome;
    }

    createBooking = (clientId, dateFrom, dateTo) => {
        const booking = {client: clientId, dateFrom: dateFrom, dateTo: dateTo};
        this.#validBookings.push(booking);
        return booking;
    }

    #getClientBookings(clientId) {
        let outcome = [];
        if (this.#validBookings && this.#validBookings.length > 0) {
            for (let booking of this.#validBookings) {
                if (booking.client == clientId) {
                    outcome.push(booking);
                    break;
                }
            }
        }

        return outcome;
    }
}