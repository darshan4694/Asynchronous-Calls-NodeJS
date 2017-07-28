const request = require('request');

/*
Format of the 'request' is as below:
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/
//b76d93e4d12050af39c25388af04b88c
var geocodeAdress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true
    },
        (error, response, body) => {
            if (error) {
                callback("Unable to connect to Google servers");
            } else if (body.status === 'ZERO_RESULTS') {
                callback("invalid address");
            } else if (body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
};

module.exports = {
    geocodeAdress
};