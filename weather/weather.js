const request = require('request');


var getWeather = (addressData, callback) => {

    request({
        url: `https://api.darksky.net/forecast/b76d93e4d12050af39c25388af04b88c/${addressData.latitude},${addressData.longitude}`,
        json: true
    },
        (error, response, body) => {
            // console.log(body);
            if (error) {
                callback("Unable to connect to forecast");
            } else if (body.code === 400) {
                callback(body.error);
            } else if (response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparent: body.currently.apparentTemperature
                });
                // console.log(body.latitude);
                // console.log(body.longitude);
                // console.log(body.currently.temperature);
            }
        });
};

module.exports = {
    getWeather
};