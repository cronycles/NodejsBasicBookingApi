import DomoticResponseEntity from "./entities/DomoticResponseEntity";
import SERVICE_ERRORS from "./entities/DomoticServiceErrorsConstants";
export default class DomoticService {
    #domoticRepository;

    constructor(domoticRepository) {
        this.#domoticRepository = domoticRepository;
    }

    openDoor = (accessCode) => {
        try {
            if (!accessCode) {
                return new DomoticResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            return this.#performDoorOpening(accessCode);

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    #performDoorOpening = (accessCode) => {
        if (!this.#domoticRepository.isAccessCodeValid(accessCode)) {
            return new DomoticResponseEntity(SERVICE_ERRORS.INVALID_CODE);
        }
        //unlock door
        return new DomoticResponseEntity();
    }
}