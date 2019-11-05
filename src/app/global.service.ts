import { Injectable } from '@angular/core';
import { Users, NewUser, Address } from './users';
import { Observable, of } from 'rxjs';
import { Countries } from './countries';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }



  newUser: NewUser[] = [];
  apiURL = 'https://restcountries.eu/rest/v1/all';
  countries: Countries[];



  users: Users[] = [
  {
    firstName: 'admin',
    lastName: 'admin',
    userName: 'admin',
    phone: '0505934900',
    email: 'mykola221@gmail.com',
    password: '000000',
    address: [
      {
        type: 'Home address',
        country: 'Ukraine',
        city: 'Lviv',
        code: 45654,
        id: 1
      },
      {
        type: 'Shipping address',
        country: 'Ukraine',
        city: 'Kalush',
        code: 45654,
        id: 2
      },
      {
        type: 'Billing address',
        country: 'Ukraine',
        city: 'Herson',
        code: 45654,
        id: 3
      }
    ]
  },
  {
    firstName: 'Mykola',
    lastName: 'Kishko',
    userName: 'mykola221',
    phone: '0505934900',
    email: 'mykola221@gmail.com',
    password: '000000',
    address: [
      {
        type: 'Home address',
        country: 'Ukraine',
        city: 'Lviv',
        code: 45654,
        id: 1
      },
      {
        type: 'Shipping address',
        country: 'Ukraine',
        city: 'Kalush',
        code: 45654,
        id: 2
      },
      {
        type: 'Billing address',
        country: 'Ukraine',
        city: 'Herson',
        code: 45654,
        id: 3
      }
    ]
  }
];

  getCountries(): Observable<Countries[]>{
    return this.http.get<Countries[]>(`${this.apiURL}`)
      .pipe(catchError(this.handleError('getCountry', [])));
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

}

}
