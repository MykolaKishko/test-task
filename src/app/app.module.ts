import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AuthService } from './shared/services/auth.service';
import { AppComponent } from './app.component';
import { UpdateAddressComponent } from './system/search/update-address/update-address.component';
import { UpdateMainComponent } from './system/search/update-main/update-main.component';
import { AskModalComponent } from './system/search/ask-modal/ask-modal.component';
import { NewAddressModalComponent } from './system/search/new-address-modal/new-address-modal.component';

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
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateAddressComponent,
    UpdateMainComponent,
    AskModalComponent,
    NewAddressModalComponent
  ]
})
export class AppModule { }
