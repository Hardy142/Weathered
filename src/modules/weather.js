// Requiring Weather API
var weather = require('openweather-apis');

// API Config
weather.setAPPID('##############');
weather.setLang('en');

// Exports
module.exports = {
    
    getCurrentWeather: function(coord){
        
        return new Promise(function(res,rej){

            // Creates Object and Assigns Properties of Coordinates Brought Into Function
            // Setting Coordinates
            weather.setCoordinate(coord.lat, coord.long);

            // Call to API for Weather Object
            weather.getAllWeather(function(err, JSONObj){
                res({JSONObj});
            });

        });

    },
    get5DayWeather: function(coord){
        
        return new Promise(function(res,rej){

            weather.setCoordinate(coord.lat, coord.long);

            // Call to API for Weather Object
            weather.getWeatherForecastForDays(5, function(err, JSONObj){
                res({JSONObj});
            });

        });

    }
}