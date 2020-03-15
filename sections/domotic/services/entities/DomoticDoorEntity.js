export default class DomoticDoorEntity {
    doorId;
    code;
    error;

    constructor (doorId, code, error = null) {
        this.doorId = doorId;
        this.code = code;
        this.error = error;
    }
}