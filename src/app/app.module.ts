import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';


import { AuthService } from './shared/services/auth.service';
import { AppComponent } from './app.component';
import { UpdateAddressComponent } from './system/search/update-address/update-address.component';
import { UpdateMainComponent } from './system/search/update-main/update-main.component';
import { NewAddressModalComponent } from './system/search/new-address-modal/new-address-modal.component';
import { UserState } from './store/state/User.state';
import { CreateUserState } from './store/state/users.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    SystemModule,
    HttpClientModule,
    MaterialModule,
    NgxsModule.forRoot([
      // UserState,
      // CreateUserState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateAddressComponent,
    UpdateMainComponent,
    NewAddressModalComponent
  ]
})
export class AppModule { }
