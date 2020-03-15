
import serviceConfiguration from '../../../serviceConfiguration'

export default class ControlAccessApi {
    constructor() {
    }

    getAccessCode() {
        if(serviceConfiguration.doesMockService) {
            return Math.floor(100000 + Math.random() * 900000);
        }
    }
}