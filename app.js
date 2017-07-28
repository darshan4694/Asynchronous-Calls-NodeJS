const request = require('request');

/*
Format of the 'request' is as below:
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/

// In our case we are using 'request' to fetch location info

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=5657%20amesbury%20drive%20dallas%20texas',
    json: true
},
(error, response, body) => {
    console.log(body);
});




/*   
 Output:
    $ node app.js 
    
{ results:
   [ { address_components: [Array],
       formatted_address: '5657 Amesbury Dr, Dallas, TX 75206, USA',
       geometry: [Object],
       place_id: 'ChIJqR3b0p6fToYRDUTteHYbmbw',
       types: [Array] } ],
  status: 'OK' }
  */