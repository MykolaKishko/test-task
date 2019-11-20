import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'wfm-auth',
    templateUrl: './default.component.html'
})

export class DefaultComponent implements OnInit {

    constructor( private router: Router ) {}

    ngOnInit() {
        this.router.navigate(['/home']);
    }
}
