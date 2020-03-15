
import serviceConfiguration from '../../../serviceConfiguration'
const https = require('https');

export default class ControlAccessApi {
    #api;
    constructor(apiService) {
        this.#api = apiService;
    }

    getAccessCode = () => {
        try {
            if (serviceConfiguration.doesMockService) {
                return Math.floor(100000 + Math.random() * 900000);
            }
            else {
                return this.#callExternalService();
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    #callExternalService = () => {
        let outcome = null;
        this.#api.getCall(
            serviceConfiguration.servicehost,
            serviceConfiguration.servicePort,
            serviceConfiguration.accessCodePath,
            serviceConfiguration.isSecure,
            this.#getAccessCodeCallback);
        return outcome;
    }

    #getAccessCodeCallback = (outputObj) => {
        let outcome = null;
        if(outputObj) {
            if (outputObj.error) {
                console.error(outputObj.error)
            }
            else {
                console.log(outputObj.data)
            }
        }

        return outcome;
    }

}