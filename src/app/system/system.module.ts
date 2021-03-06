import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './user-info/user-info.component';
import { SearchComponent } from './search/search.component';
import { SystemComponent } from './system.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateMainComponent } from './search/update-main/update-main.component';
import { UpdateAddressComponent } from './search/update-address/update-address.component';
import { NewAddressModalComponent } from './search/new-address-modal/new-address-modal.component';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { MaterialModule } from '../material/material.module';
import { AuthGuard } from '../shared/services/auth.guard';

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
    ],
    providers: [ AuthGuard ]
})

export class SystemModule {}
