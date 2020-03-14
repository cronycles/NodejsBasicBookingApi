export default class CreateBookingRequestEntity {
    clientId;
    dateFrom;
    dateTo;

    constructor (clientId, dateFrom, dateTo) {
        this.clientId = clientId;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}