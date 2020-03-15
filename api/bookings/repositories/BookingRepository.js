export default class BookingRepository {

    #clients;
    #validBookings;

    constructor() {
        this.#clients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.#validBookings = [
            { id: 1, client: 1, dateFrom: new Date("2050-01-04"), dateTo: new Date("2050-01-05"), checkin: false },
            { id: 2, client: 5, dateFrom: new Date("2050-05-04"), dateTo: new Date("2050-05-10"), checkin: false },
            { id: 3, client: 3, dateFrom: new Date("2030-10-01"), dateTo: new Date("2030-10-07"), checkin: true },
            { id: 4, client: 9, dateFrom: new Date().setHours(0, 0, 0, 0), dateTo: new Date("2030-10-07"), checkin: false }
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

    getClientCheckedInBooking = (clientId) => {
        let outcome = null;
        const clientBookings = this.#getClientBookings(clientId)

        if (clientBookings && clientBookings.length > 0) {
            for (let clientBooking of clientBookings) {
                if (clientBooking.checkin) {
                    outcome = clientBooking;
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

    createBooking = (bookingEntity) => {
        //booking persist
        return bookingEntity;
    }

    checkin = (checkinEntity) => {
        //checkin performing
        // setting checkin boolean to tro
        // associating access code to booking
        return checkinEntity;
    }

    checkout = (checkoutEntity) => {
        //checkout performing
        // mark checkout as done and disassociate all access codes
        return true;
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