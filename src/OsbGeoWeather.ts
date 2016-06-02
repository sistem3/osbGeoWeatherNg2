import {Component} from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'osb-geo-weather',
    templateUrl: 'node_modules/osb-geo-weather/lib/OsbGeoWeather.html',
    styleUrls: ['node_modules/osb-geo-weather/lib/OsbGeoWeather.css']
})
export class OsbGeoWeather {
    isLoading = true;
    forecastLoading = true;
    googleMapsApiBase = '';
    googleMapsApiKey  = '';
    weatherApiBase = '';
    weatherApiKey = '';
    weatherData = {};
    forecastData = {};

    constructor(public http: Http) {
        this.isLoading = true;
        this.forecastLoading = true;
        this.googleMapsApiBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        this.googleMapsApiKey  = 'AIzaSyDI-MPoDrmVJnK2qAYtDZr9aR9pOzHCSiI';
        this.weatherApiBase = 'http://api.openweathermap.org/data/2.5/';
        this.weatherApiKey = '893dd0afe360cf42975f84a9b97cd4ec';
        this.weatherData = {};
        this.forecastData = {};
        this.getLocation();
    }
    // Get Today's weather from openWeatherApi
    getTodayWeather(location) {
        this.http.get(this.weatherApiBase + 'weather?q=' + location + '&units=metric&APPID=' + this.weatherApiKey)
            .subscribe(response => this.setTodayWeather(response));
    }
    // Set Today's weather
    setTodayWeather(weather) {
        this.weatherData = weather.json();
        this.isLoading = false;
    }
    // Get Weather forecast from openWeatherApi
    getWeatherForecast(location) {
        this.http.get(this.weatherApiBase + 'forecast/daily?q=' + location + '&units=metric&APPID=' + this.weatherApiKey)
            .subscribe(response => this.setWeatherForecast(response));
    }
    // Set Weather forecast
    setWeatherForecast(forecast) {
        this.forecastData = forecast.json();
        this.forecastLoading = false;
    }
    // Get location from device or default then get long/lat from Google Maps
    getLocation() {
        if ('geolocation' in navigator) {
            //console.log('Has geolocation');
            var holder = this;
            // Get Location from Google if available else use default
            navigator.geolocation.getCurrentPosition(function(position) {
                holder.http.get(holder.googleMapsApiBase + position.coords.latitude + ',' + position.coords.longitude + '&key=' + holder.googleMapsApiKey)
                    .subscribe(response => holder.setLocation(response));
            });
        } else {
            console.log('No geolocation');
        }
    }
    // Set location
    setLocation(location) {
        var data = location.json();
        this.getTodayWeather(data.results[0].address_components[3].long_name);
        this.getWeatherForecast(data.results[0].address_components[3].long_name);
    }

}