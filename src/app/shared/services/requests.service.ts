import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from 'src/app/shared/models/users';

@Injectable({
  providedIn: 'root'
})

export class QueriesService {

  URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<object> {
    return this.http.get(this.URL);
  }
  deleteUser(id: number): Observable<object> {
    const url = `${this.URL}/${id}`;
    return this.http.delete(url);
  }
  addNewUser( obj: Users ): Observable<object> {
    return this.http.post( this.URL, obj);
  }
  editUser( userId: number, obj: object) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post( this.URL, obj ).subscribe();
  }
  deleteAddress( userId: number, user: object ) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, user).subscribe();
  }
  editAddress( userId: number, user: object ) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, user).subscribe();
  }
  addAddress( userId: number, obj: object) {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, obj).subscribe();
  }
}
