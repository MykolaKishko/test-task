import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DefaultComponent} from './default.component';
import { HomeComponent } from './home/home.component';
import { DefaultRoutingModule } from './default-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent,
        HomeComponent,
        DefaultComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        DefaultRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        SharedModule
    ]
})
export class DefaultModule { }
