export default class BookingEntity {
    clientId;
    dateFrom;
    dateTo;

    error;

    constructor (clientId, dateFrom, dateTo, error = null) {
        this.clientId = clientId;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.error = error;
    }
}