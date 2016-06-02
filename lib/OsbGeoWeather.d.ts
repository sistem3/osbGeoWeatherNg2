import { Http } from '@angular/http';
export declare class OsbGeoWeather {
    http: Http;
    isLoading: boolean;
    forecastLoading: boolean;
    googleMapsApiBase: string;
    googleMapsApiKey: string;
    weatherApiBase: string;
    weatherApiKey: string;
    weatherData: {};
    forecastData: {};
    constructor(http: Http);
    getTodayWeather(location: any): void;
    setTodayWeather(weather: any): void;
    getWeatherForecast(location: any): void;
    setWeatherForecast(forecast: any): void;
    getLocation(): void;
    setLocation(location: any): void;
}
