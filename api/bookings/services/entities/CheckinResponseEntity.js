export default class CheckinResponseEntity {
    accessCode;
    error;

    constructor (accessCode, error) {
        this.accessCode = accessCode;
        this.error = error;
    }
}