const yargs = require('yargs');
const axios = require('axios');

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
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find the address.')
    }

    console.log(response.data.results[0].formatted_address);

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng
    var weatherUrl = `https://api.darksky.net/forecast/b76d93e4d12050af39c25388af04b88c/${latitude},${longitude}`;

    return axios.get(weatherUrl);
}).then((response) => {
    console.log(`The temperature is : ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`)
}).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect.')
    } else {
        console.log(e.message);
    }
});
