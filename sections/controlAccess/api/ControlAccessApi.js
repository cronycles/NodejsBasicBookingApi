
import serviceConfiguration from '../../../serviceConfiguration'
const https = require('https');

export default class ControlAccessApi {
    constructor() {
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
        this.#jsonCall((statusCode, result) => {
            console.log(statusCode);
            console.log(result);
            // console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);
        });
    }

    /**
    * #jsonCall:  RESTful GET request returning JSON object(s)
    * @param callback: callback to pass the results JSON object(s) back
    */
    #jsonCall = (callback) => {
        console.log('rest::getJSON');
        const options = {
            host: 'jsonplaceholder.typicode.com',
            port: 443,
            path: '/posts',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const port = options.port == 443 ? https : http;

        let output = '';

        const req = port.request(options, (res) => {
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                output += chunk;
            });

            res.on('end', () => {
                let obj = JSON.parse(output);
                callback(res.statusCode, obj);
            });
        });

        req.on('error', (err) => {
            // res.send('error: ' + err.message);
        });

        req.end();

    }
}