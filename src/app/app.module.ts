import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AuthService } from './shared/services/auth.service';
import { AppComponent } from './app.component';
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
      ZooState
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
