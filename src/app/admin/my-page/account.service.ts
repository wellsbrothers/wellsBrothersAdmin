import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private headers = new HttpHeaders({'Content-Type': 'application/json', token: localStorage.getItem('token')});

  constructor(private http: HttpClient) {
    console.log();
  }

  update(obj): any {
    return this.http.put(environment.apiUrl + '/admins/update', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updatePassword(obj) {
    return this.http.put(environment.apiUrl + '/admins/update-password', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  backup() {
    return this.http.post(environment.apiUrl + '/admins/dataBackup', {}, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getOne(id): any {
    return this.http.get(environment.apiUrl + '/admins/get-one/' + id, { headers: this.headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
