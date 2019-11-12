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
    this.http.get(url).subscribe( user => {
      this.user = user;
      this.http.delete(`${this.URL}/${userId}`).subscribe();
      this.http.post( this.URL, obj ).subscribe();
    });
  }

  deleteAddress( userId: number, addressId: number ) {
    const url = `${this.URL}/${userId}`;
    this.http.get(url).subscribe( user => {
      this.user = user;
      this.user.address.forEach( (addr: object, i: number)  => {
        if (this.user.address[i].id === addressId) {
          this.user.address.splice(i, 1);
          this.http.delete(`${this.URL}/${userId}`).subscribe();
        }
      });
      this.http.post( this.URL, this.user ).subscribe();
    });
  }

  editAddress( userId: number, addressId: number,  address: any ) {
    const url = `${this.URL}/${userId}`;
    this.http.get(url).subscribe( user => {
      this.user = user;
      this.user.address.forEach( (addr: object, i: number)  => {
        if (this.user.address[i].id === addressId) {
          this.user.address.splice(i, 1);
          this.http.delete(`${this.URL}/${userId}`).subscribe();
          this.user.address.push(address);
          this.http.post( this.URL, this.user ).subscribe();
          console.log(this.user);
        }
      });
    });
  }
  addAddress( userId: number, obj: any) {
    const url = `${this.URL}/${userId}`;
    let usser: any;
    this.http.get(url).subscribe( user => {
      usser = user;
      this.http.delete(url);
      usser.address.push(obj);
      console.log(usser)
      this.http.post(this.URL, usser);

    });
  }


}
