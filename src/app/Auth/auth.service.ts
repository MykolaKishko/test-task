import { Injectable } from '@angular/core';
import { RequestionService } from '../shared/services/requests.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private requestsService: RequestionService,
    private router: Router
  ) {}

  private isAuthenticated = false;

  log() {
    this.isAuthenticated = true;
    // this.requestsService.getUsers().subscribe( users => {
    //   if (!!users) {
    //     users.map((user) => {
    //       if (user.password === payload.password && user.userName === payload.userName) {
    //         window.localStorage.setItem('User', JSON.stringify(user));
    //         this.isAuthenticated = true;
    //         this.router.navigate(['/system/userInfo']);
    //         return user;
    //       }
    //     });
    //   }
    // });
  }
  logout(): void {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }
  isLogetIn(): boolean {
    return this.isAuthenticated;
  }
}
