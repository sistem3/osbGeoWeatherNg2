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
        this.weatherApiBase = 'https://api.apixu.com/v1/';
        this.weatherApiKey = 'cb61805cd0e54021b5c115809170501';
        this.weatherData = {};
        this.forecastData = {};
        this.getLocation();
    }
    // Get Today's weather from openWeatherApi
    getTodayWeather(location) {
        this.http.get(this.weatherApiBase + 'current.json?key=' +  this.weatherApiKey + '&q=' + location)
            .subscribe(response => this.setTodayWeather(response));
    }
    // Set Today's weather
    setTodayWeather(weather) {
        console.log(weather.json());
        this.weatherData = weather.json();
        this.isLoading = false;
    }
    // Get Weather forecast from openWeatherApi
    getWeatherForecast(location) {
        this.http.get(this.weatherApiBase + 'forecast.json?key=' +  this.weatherApiKey + '&q=' + location + '&days=10')
            .subscribe(response => this.setWeatherForecast(response));
    }
    // Set Weather forecast
    setWeatherForecast(forecast) {
        console.log(forecast.json());
        this.forecastData = forecast.json();
        this.forecastLoading = false;
    }
    // Get location from device or default then get long/lat from Google Maps
    getLocation() {
        if ('geolocation' in navigator) {
            //console.log('Has geolocation');
            let holder = this;
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
        let data = location.json();
        this.getTodayWeather(data.results[0].address_components[2].long_name);
        this.getWeatherForecast(data.results[0].address_components[2].long_name);
    }

    getDate(date) {
        return new Date(date);
    }

}