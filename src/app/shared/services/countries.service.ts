import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Countries } from '../models/countries';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  constructor(private http: HttpClient) {}

  apiURL = 'https://restcountries.eu/rest/v1/all';
  countries: Countries[];

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
