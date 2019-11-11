import { Injectable } from '@angular/core';
import { Users, NewUser } from './users';
import { Observable, of } from 'rxjs';
import { Countries } from './countries';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  constructor(private http: HttpClient) {}

  newUser: NewUser[] = [];
  apiURL = 'https://restcountries.eu/rest/v1/all';
  countries: Countries[];

  currentValue = [];
  currentAddr = [];
  address: any;
  element: [];
  addressInfo = [];
  firstFormValue = [];
  secondFormValue = [];
  editFormValue = [];
  currentUser = [];

  editUser = [false];
  deleteUser = [false];
  editAddress = [false];
  deleteAddress = [false];
  addNewAddress = [false];

  users = [];
//   users: Users[] = [
//   {
//     firstName: 'admin',
//     lastName: 'admin',
//     userName: 'admin',
//     phone: '0505934900',
//     email: 'mykola221@gmail.com',
//     password: '000000',
//     address: [
//       {
//         type: 'Home address',
//         country: 'Ukraine',
//         city: 'Lviv',
//         code: 45654,
//         id: 1
//       },
//       {
//         type: 'Shipping address',
//         country: 'Ukraine',
//         city: 'Lviv',
//         code: 45654,
//         id: 2
//       },
//       {
//         type: 'Billing address',
//         country: 'Ukraine',
//         city: 'Herson',
//         code: 45654,
//         id: 3
//       }
//     ]
//   },
//   {
//     firstName: 'Mykola',
//     lastName: 'Kishko',
//     userName: 'mykola221',
//     phone: '0505934900',
//     email: 'mykola221@gmail.com',
//     password: '000000',
//     address: [
//       {
//         type: 'Home address',
//         country: 'Ukraine',
//         city: 'Lviv',
//         code: 45654,
//         id: 1
//       },
//       {
//         type: 'Shipping address',
//         country: 'Ukraine',
//         city: 'Kalush',
//         code: 45654,
//         id: 2
//       },
//       {
//         type: 'Billing address',
//         country: 'Ukraine',
//         city: 'Herson',
//         code: 45654,
//         id: 3
//       }
//     ]
//   }
// ];

mainInfo = [];

  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(`${this.apiURL}`)
      .pipe(catchError(this.handleError('getCountry', [])));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
