const http = require('http');
const https = require('https');
export default class ApiService {
    constructor() {

    }

    /**
    * getCall:  RESTful GET request returning JSON object(s)
    * @param callback: callback to pass the results JSON object(s) back
    */
    getCall = async (host, port, path, isSecure) => {

        const options = {
            host: host,
            path: path,
            port: port,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const protocol = isSecure ? https : http;

        let output = '';

        return new Promise((resolve, reject) => {
            const req = protocol.request(options, (res) => {

                res.setEncoding('utf8');

                res.on('data', (chunk) => {
                    output += chunk;
                });

                res.on('end', () => {
                    let obj = JSON.parse(output);
                    resolve({
                        status: res.statusCode,
                        data: obj
                    });
                });
            });

            req.on('error',reject);
            req.write("")
            req.end();
        });
    }
}