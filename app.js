const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAdress(address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);

        weather.getWeather({
            latitude: results.latitude,
            longitude: results.longitude
        }, (erroMessage, weatherResults) => {
            if (erroMessage) {
                console.log(erroMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. But it feels like ${weatherResults.apparent}.`);
            }
        });
    }
});

