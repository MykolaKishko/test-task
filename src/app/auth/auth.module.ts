
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { HomeComponent } from './home/home.component';
import { AuthRoutingModule } from './auth-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
    declarations: [
        LoginComponent,
        HomeComponent,
        AuthComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        SharedModule
    ]
})
export class AuthModule { }
