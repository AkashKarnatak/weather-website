const request = require('request');

function geocode(address, callback){
    // address = address.repl
    const geolocationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieGVmb3giLCJhIjoiY2tibWo1cWJ3MHExNjJxcDlxOGd1c3NibiJ9.ZxGU39eg_5VG4TLXGkWqTQ`;

    request({ url : geolocationURL, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services.', undefined);
        } else if (!response.body.features.length){
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                lat : response.body.features[0].center[1],
                lon : response.body.features[0].center[0],
                name : response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;