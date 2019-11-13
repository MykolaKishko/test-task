import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  URL = 'http://localhost:3000/users';
  response: any;
  user: any;

  constructor(private http: HttpClient) {}

  private isAuthenticated = false;

  log() {
    this.isAuthenticated = true;
  }
  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }
  isLogetIn(): boolean {
    return this.isAuthenticated;
  }
  getUsers(): Observable<any> {
    return this.http.get(this.URL);
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.URL}/${id}`;
    return this.http.delete(url);
  }
  addNewUser( obj: any ): Observable<any> {
    return this.http.post( this.URL, obj);
  }
  editUser( userId: number, obj: any) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post( this.URL, obj ).subscribe();
  }
  deleteAddress( userId: number, user: any ) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, user).subscribe();
  }
  editAddress( userId: number, user: any ) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, user).subscribe();
  }
  addAddress( userId: number, obj: any) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, obj).subscribe();
  }
}
