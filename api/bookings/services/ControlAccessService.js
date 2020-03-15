export default class ControlAccessService {

    constructor() {

    }

    getAccessCode = () => {
        try {
            return Math.floor(100000 + Math.random() * 900000);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}