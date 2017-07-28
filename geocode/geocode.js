const request = require('request');

/*
Format of the 'request' is as below:
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/

var geocodeAdress = (address) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true
    },
        (error, response, body) => {
            if (error) {
                console.log("Unable to connect to Google servers");
            } else if (body.status === 'ZERO_RESULTS') {
                console.log("invalid address");
            } else if (body.status === 'OK') {
                console.log(`Address: ${body.results[0].formatted_address}`);
                console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
                console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
            }
        });
};

module.exports = {
    geocodeAdress
};