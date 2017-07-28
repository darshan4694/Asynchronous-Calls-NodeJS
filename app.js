const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});