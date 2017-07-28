const request = require('request');
const yargs = require('yargs');
/*
Format of the 'request' is as below:
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/

const argv = yargs
            .options({
                a: {
                    describe: 'Address for which weather data required',
                    demand: true,
                    alias: 'address',
                    string: true
                }
            })
            .help()
            .alias('help', 'h')
            .argv;
        
const address = encodeURIComponent(argv.a);

// In our case we are using 'request' to fetch location info
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
},
(error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});