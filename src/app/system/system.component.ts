import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalService } from '../shared/services/countries.service';

@Component({
    selector: 'wfm-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})

export class SystemComponent implements OnInit  {

    user = JSON.parse(window.localStorage.User);
    show = false;

    constructor( private authService: AuthService, private globalservice: GlobalService ) {}

    ngOnInit() {}

    logOut() {
        this.authService.logout();
    }
    slide() {
        this.show = true;
    }
    hideSlide() {
        this.show = false;
    }
}
