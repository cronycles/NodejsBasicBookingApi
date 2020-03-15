export default class ControlAccessService {
    #api;

    constructor(controAccessApi) {
        this.#api = controAccessApi;
    }

    getAccessCode = () => {
        try {
            return this.#api.getAccessCode();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}