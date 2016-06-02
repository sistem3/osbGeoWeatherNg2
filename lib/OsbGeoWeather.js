"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
let OsbGeoWeather = class OsbGeoWeather {
    constructor(http) {
        this.http = http;
        this.isLoading = true;
        this.forecastLoading = true;
        this.googleMapsApiBase = '';
        this.googleMapsApiKey = '';
        this.weatherApiBase = '';
        this.weatherApiKey = '';
        this.weatherData = {};
        this.forecastData = {};
        this.isLoading = true;
        this.forecastLoading = true;
        this.googleMapsApiBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        this.googleMapsApiKey = 'AIzaSyDI-MPoDrmVJnK2qAYtDZr9aR9pOzHCSiI';
        this.weatherApiBase = 'http://api.openweathermap.org/data/2.5/';
        this.weatherApiKey = '893dd0afe360cf42975f84a9b97cd4ec';
        this.weatherData = {};
        this.forecastData = {};
        this.getLocation();
    }
    getTodayWeather(location) {
        this.http.get(this.weatherApiBase + 'weather?q=' + location + '&units=metric&APPID=' + this.weatherApiKey)
            .subscribe(response => this.setTodayWeather(response));
    }
    setTodayWeather(weather) {
        this.weatherData = weather.json();
        this.isLoading = false;
    }
    getWeatherForecast(location) {
        this.http.get(this.weatherApiBase + 'forecast/daily?q=' + location + '&units=metric&APPID=' + this.weatherApiKey)
            .subscribe(response => this.setWeatherForecast(response));
    }
    setWeatherForecast(forecast) {
        this.forecastData = forecast.json();
        this.forecastLoading = false;
    }
    getLocation() {
        if ('geolocation' in navigator) {
            var holder = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                holder.http.get(holder.googleMapsApiBase + position.coords.latitude + ',' + position.coords.longitude + '&key=' + holder.googleMapsApiKey)
                    .subscribe(response => holder.setLocation(response));
            });
        }
        else {
            console.log('No geolocation');
        }
    }
    setLocation(location) {
        var data = location.json();
        this.getTodayWeather(data.results[0].address_components[3].long_name);
        this.getWeatherForecast(data.results[0].address_components[3].long_name);
    }
};
OsbGeoWeather = __decorate([
    core_1.Component({
        selector: 'osb-geo-weather',
        templateUrl: 'vendor/osb-geo-weather/lib/OsbGeoWeather.html',
        styleUrls: ['vendor/osb-geo-weather/lib/OsbGeoWeather.css']
    }), 
    __metadata('design:paramtypes', [http_1.Http])
], OsbGeoWeather);
exports.OsbGeoWeather = OsbGeoWeather;
//# sourceMappingURL=OsbGeoWeather.js.map