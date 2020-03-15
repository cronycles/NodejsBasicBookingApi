import DomoticDoorEntity from "./entities/DomoticDoorEntity";
import SERVICE_ERRORS from "./entities/DomoticServiceErrorsConstants";
export default class DomoticService {
    #domoticRepository;

    constructor(domoticRepository) {
        this.#domoticRepository = domoticRepository;
    }

    openDoor = (domoticDoorEntity) => {
        try {
            if (!domoticDoorEntity) {
                return this.#createDomoticDoorErrorResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidDoorId(domoticDoorEntity.doorId)) {
                return this.#createDomoticDoorErrorResponseEntity(SERVICE_ERRORS.INVALID_INPUTS);
            }
            if (!this.#isAValidCode(domoticDoorEntity.code)) {
                return this.#createDomoticDoorErrorResponseEntity(SERVICE_ERRORS.INVALID_CODE);
            }
            return this.#performDoorOpening(domoticDoorEntity);

        } catch (e) {
            console.log(e);
            return null;
        }
    };

    #isAValidDoorId = (doorId) => {
        return doorId && doorId > 0
    }

    #isAValidCode = (code) => {
        return code && code > 0
    }

    #createDomoticDoorErrorResponseEntity = (errorConstant) => {
        return new DomoticDoorEntity(null, null, errorConstant);
    };

    #performDoorOpening = (domoticDoorEntity) => {
        if (!this.#domoticRepository.getDoorById(domoticDoorEntity.doorId)) {
            return this.#createDomoticDoorErrorResponseEntity(SERVICE_ERRORS.INVALID_DOOR_ID);
        }
        if (!this.#domoticRepository.isAccessCodeValid(domoticDoorEntity.code)) {
            return this.#createDomoticDoorErrorResponseEntity(SERVICE_ERRORS.INVALID_CODE);
        }
        //unlock door!!!
        return new DomoticDoorEntity();
    };
}