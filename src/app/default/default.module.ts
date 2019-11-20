
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './home/home.component';
import { AuthRoutingModule } from './default-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
    declarations: [
        LoginComponent,
        HomeComponent,
        DefaultComponent,
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
