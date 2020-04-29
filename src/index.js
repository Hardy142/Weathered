// Requires & Imports
const location = require('./modules/location');
const weather = require('./modules/weather');
import { Skycons } from 'skycons-ts';
const skycons = new Skycons({'color': 'white'});

// Variables
var input = document.getElementById('search');
var autocomplete = new google.maps.places.Autocomplete(input);
var userTextSearch = '';
var timeofDay;

// Gets Coordinates of User's Current Location
window.addEventListener('load', function(){

    location.getCurrentUserLocation().then(function(result){

        // Calls Weather Module To Get Weather
        weather.getCurrentWeather(result).then(function(result){
            
            // Calls UI Module To Fill the Front End
            uiController.setWeather(result);
    
        });
        
        // Calls Weather Module To Get Weather
        weather.get5DayWeather(result).then(function(result){
            
            // Calls UI Module To Fill the Front End
            uiController.set5DayWeather(result);
    
        });

    });

    // Starts Animations for Icons After They're Set
    skycons.play();

});

document.getElementById('city-title').addEventListener('click', function(){

    $('#city-title').css('display', 'none');
    $('#search').val('');
    $('#search').css('opacity', 1).focus();

});


// Listens for When User Clicks Button for New Search
document.querySelector('#search').addEventListener('change', function(){
   
    $('#city-title').css('display', 'block');
    $('.pac-item').css('opacity', 0);

    $('.odds-container').each(function(){
        $(this).css('transform', 'scale(0)');
    });

    $('.multi-day').each(function(){
        $(this).css('opacity', 0);
    });

    $('.control-info-wrapper').css('opacity', 0);

    setTimeout(function(){

        // Gets Text From User Input Field
        var searchTerm = document.querySelector('#search').value;
            
        userTextSearch = searchTerm;

        // Calls Location Module to Recieve Coordinates From User's Text Result
        location.getCoord(searchTerm).then(function(result){

            // Calls Weather Module To Get Weather
            weather.getCurrentWeather(result).then(function(result){

                // Calls UI Module To Fill the Front End
                uiController.setWeather(result);

            });

            // Calls Weather Module To Get Weather
            weather.get5DayWeather(result).then(function(result){

                // Calls UI Module To Fill the Front End
                uiController.set5DayWeather(result);

            });

        });

    }, 1000);

});

var uiController = (function(){

    return {
        getIcon: function(canvasID, icon) {

            switch(icon) {
    
                case 'Thunderstorm':
                    skycons.add('icon' + canvasID, 'cloudy');
                    break;
    
                case 'Drizzle':
                    skycons.add('icon' + canvasID, 'sleet');
                    break;
    
                case 'Rain':
                    skycons.add('icon' + canvasID, 'rain');
                    break;
    
                case 'Clear':
                    skycons.add('icon' + canvasID, 'clear-day');
                   
                    break;
    
                case 'Snow':
                    skycons.add('icon' + canvasID, 'snow');
                    break;
    
                case 'Clouds':
                    skycons.add('icon' + canvasID, 'cloudy');
                    break;
    
                case 'Mist':
                    skycons.add('icon' + canvasID, 'fog');
                    break;
    
                case 'Haze':
                    skycons.add('icon' + canvasID, 'fog');
                    break;
    
                case 'Fog':
                    skycons.add('icon' + canvasID, 'fog');
                    break;
    
            }
    
        },
        // Function To Set Date and Time
        setDateAndTime: function(){
            // Populates Todays Date
            var todaysDate = new Date();
            var dayOfWeek = todaysDate.getDay();
            var dayDOM = document.querySelector('.day-container');
            var day0DOM = document.getElementById('multi-day-text0');
            var day1DOM = document.getElementById('multi-day-text1');
            var day2DOM = document.getElementById('multi-day-text2');
            var day3DOM = document.getElementById('multi-day-text3');
            var day4DOM = document.getElementById('multi-day-text4');

            switch(dayOfWeek) {
                case 0:
                dayDOM.innerText = 'Sun, ';
                day0DOM.innerHTML = 'Mon';
                day1DOM.innerHTML = 'Tue';
                day2DOM.innerHTML = 'Wed';
                day3DOM.innerHTML = 'Thu';
                day4DOM.innerHTML = 'Fri';
                break;

                case 1:
                dayDOM.innerText = 'Mon, ';
                day0DOM.innerHTML = 'Tue';
                day1DOM.innerHTML = 'Wed';
                day2DOM.innerHTML = 'Thu';
                day3DOM.innerHTML = 'Fri';
                day4DOM.innerHTML = 'Sat';
                break;

                case 2:
                dayDOM.innerText = 'Tue, ';
                day0DOM.innerHTML = 'Wed';
                day1DOM.innerHTML = 'Thu';
                day2DOM.innerHTML = 'Fri';
                day3DOM.innerHTML = 'Sat';
                day4DOM.innerHTML = 'Sun';
                break;

                case 3:
                dayDOM.innerText = 'Wed, ';
                day0DOM.innerHTML = 'Thu';
                day1DOM.innerHTML = 'Fri';
                day2DOM.innerHTML = 'Sat';
                day3DOM.innerHTML = 'Sun';
                day4DOM.innerHTML = 'Mon';
                break;

                case 4:
                dayDOM.innerText = 'Thu, ';
                day0DOM.innerHTML = 'Fri';
                day1DOM.innerHTML = 'Sat';
                day2DOM.innerHTML = 'Sun';
                day3DOM.innerHTML = 'Mon';
                day4DOM.innerHTML = 'Tue';
                break;

                case 5:
                dayDOM.innerText = 'Fri, ';
                day0DOM.innerHTML = 'Sat';
                day1DOM.innerHTML = 'Sun';
                day2DOM.innerHTML = 'Mon';
                day3DOM.innerHTML = 'Tue';
                day4DOM.innerHTML = 'Wed';
                break;

                case 6:
                dayDOM.innerText = 'Sat, ';
                day0DOM.innerHTML = 'Sun';
                day1DOM.innerHTML = 'Mon';
                day2DOM.innerHTML = 'Tue';
                day3DOM.innerHTML = 'Wed';
                day4DOM.innerHTML = 'Thu';
                break;
            }

            function startTime() {
                var today = new Date();
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds();
                timeofDay = h;
                m = checkTime(m);
                document.getElementById('current-time').innerHTML = h + ":" + m;
                var t = setTimeout(startTime, 30000);
            }

            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            startTime();

        },
        // Function To Fill Front End with NEW Weather Information
        setWeather: function(weatherObj){

            if(userTextSearch === ''){
                document.querySelector('#city-title').innerHTML = '<i style="float: left;" class="far fa-keyboard"></i>' + weatherObj.JSONObj.name + ', ' + weatherObj.JSONObj.sys.country;
            }else {
                document.querySelector('#city-title').innerHTML = '<i style="float: left;" class="far fa-keyboard"></i>' + userTextSearch;
            }

            document.querySelector('.weather-desc-current-container').innerHTML = weatherObj.JSONObj.weather[0].description;

            var temp = Math.round(weatherObj.JSONObj.main.temp);
            document.querySelector('.temp-container').innerHTML = temp.toString() + '<sup>&deg;</sup>';

            var highTemp = Math.round(weatherObj.JSONObj.main.temp_max);
            document.querySelector('.high-container').innerHTML = 'High: ' + highTemp.toString() + ' <sup>&deg;</sup>';

            var lowTemp = Math.round(weatherObj.JSONObj.main.temp_min);
            document.querySelector('.low-container').innerHTML = 'Low: ' + lowTemp.toString() + ' <sup>&deg;</sup>';

            document.getElementById('feels-like-info').innerText = Math.round(weatherObj.JSONObj.main.feels_like);

            var windSpeed = weatherObj.JSONObj.wind.speed;
            document.getElementById('wind-info').innerText = windSpeed.toString() + ' km/h';

            var humidity = weatherObj.JSONObj.main.humidity;
            document.getElementById('humidity-info').innerText = humidity.toString() + ' %';

            var pressure = weatherObj.JSONObj.main.pressure;
            document.getElementById('pressure-info').innerText = pressure.toString() + ' kPa';

            var sunrise = weatherObj.JSONObj.sys.sunrise;
            var sunriseDate = new Date(sunrise);
            var sunriseHours = sunriseDate.getHours();
            var sunriseMinutes = sunriseDate.getMinutes();
            document.getElementById('sunrise-info').innerText = sunriseHours.toString() + ':' +  sunriseMinutes.toString() + ' AM';

            var sunset = weatherObj.JSONObj.sys.sunset;
            var sunsetDate = new Date(sunset);
            var sunsetHours = sunsetDate.getHours();
            var sunsetMinutes = sunsetDate.getMinutes();
            document.getElementById('sunset-info').innerText = sunsetHours.toString() + ':' +  sunsetMinutes.toString() + ' PM';

            // Set Time and Day
            this.setDateAndTime();

            // Get Icon
            var main = weatherObj.JSONObj.weather[0].main;
            this.getIcon('-main', main);

        },
        // Function To Set 5 Day Forecast
        set5DayWeather: function(weatherObj){

            for(var i = 0; i <= 4; i++) {
                document.getElementById('multi-day-desc' + i).innerHTML = weatherObj.JSONObj.list[i].weather[0].description;
                document.getElementById('multi-day-temp' + i).innerHTML = Math.round(weatherObj.JSONObj.list[i].temp.day) + '<sup>&deg;</sup>';
                this.getIcon(i.toString(), weatherObj.JSONObj.list[i].weather[0].main);
            }
            $('#search').css('opacity', 0);

            $('.odds-container').each(function(){
                $(this).css('transform', 'scale(1)');
            });
        
            $('.multi-day').each(function(){
                $(this).css('opacity', 1);
            });
        
            $('.control-info-wrapper').css('opacity', 1);

        }

    }

})();