import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from 'src/app/shared/models/users';

@Injectable({
  providedIn: 'root'
})

export class RequestionService {

  URL = 'http://localhost:3000/users';
  authURL = 'http://localhost:3000/authUser';

  constructor( private http: HttpClient ) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.URL);
  }
  deleteUser(id: number): Observable<Users> {
    const url = `${this.URL}/${id}`;
    return this.http.delete<Users>(url);
  }
  addNewUser( obj: Users ): Observable<Users> {
    return this.http.post<Users>( this.URL, obj);
  }
  updateUser( userId: number, user: Users ): void {
    const url = `${this.URL}/${userId}`;
    this.http.delete(url).subscribe();
    this.http.post(this.URL, user).subscribe();
  }
}
