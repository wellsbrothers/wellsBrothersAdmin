import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarriersService {
  headers = new HttpHeaders({'Content-Type': 'application/json', token: localStorage.getItem('token')});

  constructor(private http: HttpClient) {
    console.log();
  }

  create(obj): any {
    return this.http.post(environment.apiUrl + '/carriers/create', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(obj): any {
    return this.http.put(environment.apiUrl + '/carriers/update', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateCarrierLastLoadId(obj): any {
    return this.http.put(environment.apiUrl + '/carriers/updateCarrierLastLoadId', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateStatus(obj): any {
    return this.http.put(environment.apiUrl + '/carriers/update-status', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getOne(id): any {
    return this.http.get(environment.apiUrl + '/carriers/get-one/' + id, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getList(page, limit, obj): any {
    return this.http.post(environment.apiUrl + '/carriers/get-all/' + page + '/' + limit, obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  search(obj): any {
    return this.http.post(environment.apiUrl + '/carriers/search/1/15', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  searchCarrierReview(obj): any {
    return this.http.post(environment.apiUrl + '/carriers/searchCarrierReview', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updatecarrierReview(obj): any {
    return this.http.post(environment.apiUrl + '/carriers/updatecarrierReview', obj, {headers: this.headers}).pipe(
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
