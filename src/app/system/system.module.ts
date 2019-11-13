import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { SearchComponent } from './search/search.component';
import { SystemComponent } from './system.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateMainComponent } from './search/update-main/update-main.component';
import { UpdateAddressComponent } from './search/update-address/update-address.component';
import { NewAddressModalComponent } from './search/new-address-modal/new-address-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutingModule,
        BrowserAnimationsModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        UserInfoComponent,
        SearchComponent,
        SystemComponent,
        CreateUserComponent,
        UpdateMainComponent,
        UpdateAddressComponent,
        NewAddressModalComponent
    ]
})

export class SystemModule {}
