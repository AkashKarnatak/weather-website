const request = require('request');

function forecast(lat, lon, loc, callback){
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=81e66cb4c996f4650126e187e7be73b2&units=metric`;

    request({url : url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services.', undefined);
        } else if (!response.body.current){
            callback('Unable to find location. Try another search', undefined);
        } else {
            console.log(response.body);
            callback(undefined, `The temperature outside in ${loc} is ${response.body.current.temp}. Its ${response.body.current.weather[0].description}y outside.`);
        }
    });
}


module.exports = forecast