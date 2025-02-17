import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private statesJsonURL = 'assets/usa_states.json';
  private caStatesJsonURL = 'assets/ca_states.json';

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private loader = new BehaviorSubject<boolean>(false);
  loader$ = this.loader.asObservable();

  private showSideBar = new BehaviorSubject<boolean>(false);
  showSideBar$ = this.showSideBar.asObservable();

  private loadCreated = new BehaviorSubject<boolean>(false);
  loadCreated$ = this.loadCreated.asObservable();

  private getLoads = new Subject();
  getLoads$ = this.getLoads.asObservable();

  private addBrokerModal = new BehaviorSubject<boolean>(false);
  addBrokerModal$ = this.addBrokerModal.asObservable();
  private addCarrierModal = new BehaviorSubject<boolean>(false);
  addCarrierModal$ = this.addCarrierModal.asObservable();
  private addSheeperModal = new BehaviorSubject<boolean>(false);
  addSheeperModal$ = this.addSheeperModal.asObservable();
  private addConsigneeModal = new BehaviorSubject<boolean>(false);
  addConsigneeModal$ = this.addConsigneeModal.asObservable();

  private role = new BehaviorSubject<number>(-1);
  role$ = this.role.asObservable();
  private showTrackBoard = new BehaviorSubject<boolean>(false);
  showTrackBoard$ = this.showTrackBoard.asObservable();

  private notShow = new Subject();
  notShow$ = this.notShow.asObservable();

  private notError = new Subject();
  notError$ = this.notError.asObservable();

  private notMessage = new Subject();
  notMessage$ = this.notMessage.asObservable();

  private percentage = new Subject();
  percentage$ = this.percentage.asObservable();

  private loadMoalAddOrEdtit = new BehaviorSubject<{add: true, loadId: ''}>({add: true, loadId: ''});
  loadMoalAddOrEdtit$ = this.loadMoalAddOrEdtit.asObservable();

  constructor(private http: HttpClient) {
  }

  setLoader(bool): void {
    this.loader.next(bool);
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.statesJsonURL);
  }

  public getCAJSON(): Observable<any> {
    return this.http.get(this.caStatesJsonURL);
  }

  setshowSideBarStatus(bool): void {
    this.showSideBar.next(bool);
  }

  loggedInStatus(bool): void {
    this.isLoggedIn.next(bool);
  }

  openModalAddBroker(bool): void {
    this.addBrokerModal.next(bool);
  }
  openModalAddCarrier(bool): void {
    this.addCarrierModal.next(bool);
  }
  openModalAddSheeper(bool): void {
    this.addSheeperModal.next(bool);
  }
  openModalAddConsignee(bool): void {
    this.addConsigneeModal.next(bool);
  }

  setModalAddOrEdtit(data): void {
    this.loadMoalAddOrEdtit.next(data);
  }

  setnotShow(bool): void {
    this.notShow.next(bool);
  }

  setnotError(bool): void {
    this.notError.next(bool);
  }

  setnotMessage(str): void {
    this.notMessage.next(str);
  }

  loadCreatedFunc(bool): void {
    this.loadCreated.next(bool);
  }

  reloadLoads(): void {
    this.getLoads.next(true);
  }

  seRole(r: number): void {
    this.role.next(r);
  }
  setShowTrackBoardRole(r: boolean): void {
    this.showTrackBoard.next(r);
  }

  setPercentage(r: number): void {
    this.percentage.next(r);
  }

  currentUser(): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.get(`${environment.apiUrl}`  + '/admins/get-current', { headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${environment.apiUrl}` + '/admins/login', {username, password}, {headers});
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
