import request from 'request';
var port = 8083
console.log('Sending POST request')

request.post(
    `http://localhost:${port}/`,
    { json: { username: 'TestUser' } },
    function (error: any, response: request.Response, body: any) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log(`Error: status code: ${response.statusCode}`);
        }
    }
);