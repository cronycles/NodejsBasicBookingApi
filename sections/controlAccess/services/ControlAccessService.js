export default class ControlAccessService {
    #api;

    constructor(controAccessApi) {
        this.#api = controAccessApi;
    }

    getAccessCode = async () => {
        try {
            return await this.#api.getAccessCode();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}