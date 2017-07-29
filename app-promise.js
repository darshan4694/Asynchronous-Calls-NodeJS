const request = require('request');

var geocodeAdress = (address) => {

    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Unable to connect to Google servers");
            } else if (body.status === 'ZERO_RESULTS') {
                reject("invalid address");
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};



var getWeather = (addressData) => {

    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/b76d93e4d12050af39c25388af04b88c/${addressData.latitude},${addressData.longitude}`,
            json: true
        },
            (error, response, body) => {
                // console.log(body);
                if (error) {
                    reject("Unable to connect to forecast");
                } else if (body.code === 400) {
                    reject(body.error);
                } else if (response.statusCode === 200) {
                    resolve({
                        temperature: body.currently.temperature,
                        apparent: body.currently.apparentTemperature
                    });
                    // console.log(body.latitude);
                    // console.log(body.longitude);
                    // console.log(body.currently.temperature);
                }
            });
    });


};

geocodeAdress('07307').then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
    return getWeather(res);
}).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
})
    .catch((errorMessage) => {
        console.log("From catch");
    });