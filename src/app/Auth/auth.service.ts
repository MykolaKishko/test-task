import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  private isAuthenticated = false;

  log(): void {
    this.isAuthenticated = true;
  }
  logout(): void {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }
  isLogetIn(): boolean {
    return this.isAuthenticated;
  }
}
