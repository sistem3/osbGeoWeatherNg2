import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {OsbGeoWeather} from 'osb-geo-weather/components';

@Component({
    selector: 'sandbox',
    directives: [OsbGeoWeather],
    template: `<osb-geo-weather></osb-geo-weather>`
})
export class Sandbox {
    constructor() {
        console.log('Sandbox Loaded');
    }
}

bootstrap(Sandbox);