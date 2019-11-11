import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    { path: '', component: AuthComponent, children:
    [
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
