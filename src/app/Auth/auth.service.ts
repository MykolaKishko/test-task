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
