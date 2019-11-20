import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CountriesService } from '../shared/services/countries.service';

@Component({
    selector: 'wfm-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})

export class SystemComponent implements OnInit  {

    user = JSON.parse(window.localStorage.User);
    show = false;

    constructor( private authService: AuthService, private countriesService: CountriesService ) {}

    ngOnInit() {}

    logOut() {
        this.authService.logout();
    }
    leftBar() {
        this.show = !this.show;
    }
}
