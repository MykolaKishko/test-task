import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalService } from '../global.service';

@Component({
    selector: 'wfm-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']

})

export class SystemComponent implements OnInit  {


    constructor(
        private authService: AuthService,
        private globalservice: GlobalService
    ) { }

    user = JSON.parse(window.localStorage.User);

    ngOnInit() {
    }

    logOut(){
        this.authService.logout();
    }

    slide(){
        document.getElementById('slide').style.left = '0';
    }

    hideSlide(){
        document.getElementById('slide').style.left = '-40%';
    }

}
