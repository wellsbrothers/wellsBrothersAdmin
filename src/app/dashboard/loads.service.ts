import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadsService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    token: localStorage.getItem('token')!,
  });

  constructor(private http: HttpClient) {
    console.log();
  }

  create(obj): any {
    return this.http
      .post(environment.apiUrl + '/loads/create', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  update(obj): any {
    return this.http
      .put(environment.apiUrl + '/loads/update', obj, { headers: this.headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateLoadAp(obj): any {
    return this.http
      .put(environment.apiUrl + '/loads/updateLoadAp', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateStatus(obj): any {
    return this.http
      .put(environment.apiUrl + '/loads/update-status', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getOne(id): any {
    return this.http
      .get(environment.apiUrl + '/loads/get-one/' + id, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getList(page, limit, obj): any {
    return this.http
      .post(environment.apiUrl + '/loads/get-all/' + page + '/' + limit, obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  getListAp(page, limit, type, obj): any {
    return this.http
      .post(
        environment.apiUrl +
        '/loads/get-all-ap/' +
        page +
        '/' +
        limit +
        '/' +
        type,
        obj,
        { headers: this.headers }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getListByLoadNumbers(obj): any {
    return this.http
      .post(
        environment.apiUrl + '/loads/getListByLoadNumbers',
        { loadNums: obj },
        { headers: this.headers }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getReport(obj): any {
    return this.http
      .post(environment.apiUrl + '/loads/getReport', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  reportPdf(obj): any {
    return this.http
      .post(environment.apiUrl + '/loads/reportPdf', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  expoertExcel(obj): any {
    return this.http
      .post(environment.apiUrl + '/loads/expoertExcel', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  search(obj): any {
    return this.http
      .post(environment.apiUrl + '/loads/search/1/15', obj, {
        headers: this.headers,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  upload(loadId, obj): any {
    const headers = new HttpHeaders({ token: localStorage.getItem('token')! });
    return this.http
      .post(environment.apiUrl + '/loads/upload/' + loadId, obj, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteFile(loadId, fileId): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')!,
    });
    return this.http
      .delete(
        environment.apiUrl + '/loads/delete-file/' + loadId + '/' + fileId,
        { headers }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteLoad(loadId): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')!,
    });
    return this.http
      .delete(environment.apiUrl + '/loads/delete/' + loadId, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  getRatePdf(html): any {
    const headers = new HttpHeaders({ token: localStorage.getItem('token')! });
    return this.http
      .post(environment.apiUrl + '/loads/pdf', html, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  getRatePdfNew(html): any {
    const headers = new HttpHeaders({ token: localStorage.getItem('token')! });
    return this.http
      .post(environment.apiUrl + '/loads/pdf-new', html, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  getBol(html): any {
    const headers = new HttpHeaders({ token: localStorage.getItem('token')! });
    return this.http
      .post(environment.apiUrl + '/loads/bol', html, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  getInvoicePdf(html): any {
    const headers = new HttpHeaders({ token: localStorage.getItem('token')! });
    return this.http
      .post(environment.apiUrl + '/loads/invoice', html, { headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  sendMail(data: {
    load_id: number,
    message: string | undefined,
    email: string,
    subject: string,
    cc_email: string[] | []
  }) {
    const headers = new HttpHeaders({ token: localStorage.getItem('token')! });

    return this.http
      .post(environment.apiUrl + '/loads/send-invoice-email', data, { headers })
      .pipe(retry(1), catchError(this.handleError));
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
    console.log(error);

    return throwError('Something bad happened; please try again later.');
  }
}
