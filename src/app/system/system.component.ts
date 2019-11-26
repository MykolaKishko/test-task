import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutUser } from '../store/action/login.action';
import { Router } from '@angular/router';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})

export class SystemComponent implements OnInit  {

    show = false;

    constructor( private store: Store, private router: Router ) {}

    ngOnInit() {}

    logOut(): void {
        this.store.dispatch(new LogoutUser());
    }
    leftBar(): void {
        this.show = !this.show;
    }
}
