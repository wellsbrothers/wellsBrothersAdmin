import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, first } from 'rxjs/operators';
import {SharedService} from './shared/shared.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  headers: any;
  constructor(private router: Router,
              private sharedService: SharedService,
              private http: HttpClient) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token');
      this.headers = new HttpHeaders({'Content-Type': 'application/json', token});
      // console.log(this.headers);
      return this.http.get(`${environment.apiUrl}`  + '/admins/get-current', { headers: this.headers }).pipe(
        first(),
        map((res: any) => {
            if (res.error_token) {
              // console.log('DUS QCII')
              localStorage.removeItem('token');
              this.sharedService.loggedInStatus(false);
              this.router.navigate(['/login']);
              return false;
            } else {
              if (next.data.roles && next.data.roles.indexOf(res.response.role) === -1) {
                this.sharedService.seRole(res.response.role);
                this.sharedService.setShowTrackBoardRole(res.response.showTrackBoard);
                this.sharedService.setPercentage(res.response.percentage);
                if (res.response.role === 0) {
                  this.router.navigate(['/home']);
                  return false;
                } else {
                  this.router.navigate(['/dashboard']);
                  return false;
                }
              } else {
                this.sharedService.loggedInStatus(true);
                this.sharedService.seRole(res.response.role);
                this.sharedService.setShowTrackBoardRole(res.response.showTrackBoard);
                this.sharedService.setPercentage(res.response.percentage);
                return true;
              }
            }
        }));
    } else {
      // console.log('res4 :::');
      this.sharedService.loggedInStatus(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
