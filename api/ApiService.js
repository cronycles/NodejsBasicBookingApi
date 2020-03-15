const http = require('http');
const https = require('https');
export default class ApiService {
    constructor() {

    }

    /**
    * getCall:  RESTful GET request returning JSON object(s)
    * @param callback: callback to pass the results JSON object(s) back
    */
    getCall = (host, port, path, isSecure, callback) => {
       
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
        const req = protocol.request(options, (res) => {
            
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                output += chunk;
            });

            res.on('end', () => {
                let obj = JSON.parse(output);
                callback({
                    status: res.statusCode, 
                    data : obj
                });
            });
        });

        req.on('error', (err) => {
            callback({
                error: err
            });
        });
        req.write("")
        req.end();

    }
}