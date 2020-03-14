export default class BookingRepository {

    #accessCodes;

    constructor() {
        this.#accessCodes = [114545, 245466];
    }

    isAccessCodeValid = (accessCode) => {
        let outcome = false;
        if (this.#accessCodes && this.#accessCodes.length > 0) {
            for (let dbAccessCode of this.#accessCodes) {
                if (dbAccessCode == accessCode) {
                    outcome = true;
                    break;
                }
            }
        }
        return outcome;
    }
}