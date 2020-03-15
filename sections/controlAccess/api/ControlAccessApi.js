
import serviceConfiguration from '../../../serviceConfiguration'
const https = require('https');

export default class ControlAccessApi {
    #api;
    constructor(apiService) {
        this.#api = apiService;
    }

    getAccessCode = async () => {
        try {
            if (serviceConfiguration.doesMockService) {
                let code = Math.floor(100000 + Math.random() * 900000);
                return `mocked${code}`;
            }
            else {
                return await this.#callExternalService();
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    #callExternalService = async () => {
        let outcome = null;
        try {
            let outputObj = await this.#api.postCall(
                serviceConfiguration.servicehost,
                serviceConfiguration.servicePort,
                serviceConfiguration.accessCodePath,
                serviceConfiguration.isSecure);
            if (outputObj && outputObj.data) {
                outcome = outputObj.data.code;
            }
            return outcome;

        } catch (e) {
            console.error(e);
            return null;
        }
    }

}