export default class BookingRepository {

    #doors;
    #validAccessCodes;

    constructor() {
        this.#doors = [1,2,3];
        this.#validAccessCodes = [114545, 245466];
    }

    getDoorById = (doorId) => {
        let outcome = false;
        if (this.#doors && this.#doors.length > 0) {
            for (let dbdoor of this.#doors) {
                if (dbdoor == doorId) {
                    outcome = dbdoor;
                    break;
                }
            }
        }
        return outcome;
    }

    isAccessCodeValid = (accessCode) => {
        let outcome = false;
        if (this.#validAccessCodes && this.#validAccessCodes.length > 0) {
            for (let dbAccessCode of this.#validAccessCodes) {
                if (dbAccessCode == accessCode) {
                    outcome = true;
                    break;
                }
            }
        }
        return outcome;
    }
}