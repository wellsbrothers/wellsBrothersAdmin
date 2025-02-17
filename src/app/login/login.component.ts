import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {Router} from '@angular/router';
import {ValidationsService} from '../validations/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;
  error: boolean;
  validateError: any;
  constructor(private sharedService: SharedService,
              private validationsService: ValidationsService,
              private router: Router) { }

  ngOnInit(): void {
    this.password = '';
    this.username = '';
    this.validateError = {
      password: false,
      username: false
    };
    this.error = false;
  }

  login(): any {
    this.error = false;
    if (!this.validationsService.validation(this.validateError, {username: this.username, password: this.password}).error) {
      this.sharedService.login(this.username, this.password).subscribe( (res: any) => {
        if (!res.error) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('admin', JSON.stringify(res.admin));
          if (localStorage.getItem('token')) {
            this.router.navigate(['/home']);
          }
        } else {
          this.error = true;
          this.errorMessage = res.message;
        }
      });
    } else {
      this.validateError = this.validationsService.returndObj;
    }
  }

}
