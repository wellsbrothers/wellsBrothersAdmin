import { Component, OnInit } from '@angular/core';
import {AccountService} from './account.service';
import {SharedService} from '../../shared/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  editInfo: boolean;
  newPassword: string;
  editPass: boolean;
  admin: any;
  validateError: any;
  constructor(private accountService: AccountService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.validateError = {
      fullName: false,
      username: false,
      phone: false,
      percentage: false
    };
    const id = JSON.parse(localStorage.getItem('admin'))._id;
    this.accountService.getOne(id).subscribe( (res: any) => {
      if (!res.error) {
        this.admin = res.data;
      }
    });
    this.editInfo = false;
    this.editPass = false;
  }

  update(): void {
    this.sharedService.setLoader(true);
    if (!this.validation(this.validateError, this.admin)) {
      this.accountService.update(this.admin).subscribe((res: any) => {
        if (!res.error) {
          this.admin = res.data;
          this.editInfo = false;
          this.editPass = false;
        }
        this.notiFuncion(res);
      });
    }

  }

  updatePassword(): void {
    this.sharedService.setLoader(true);
    this.accountService.updatePassword({_id: this.admin._id, password: this.newPassword}).subscribe((res: any) => {
      if (!res.error) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      this.notiFuncion(res);
    });
  }

  backup(): void {
    this.accountService.backup().subscribe((res: any) => {});
  }

  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    this.sharedService.setLoader(false);
    setTimeout(() => {
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }

  validation(validatorObj, validatedObj): any {
    for (const [key, value] of Object.entries(validatedObj)) {
      if (validatorObj.hasOwnProperty(key)) {
        if (!validatedObj[key] || validatedObj[key] == null || typeof  validatedObj[key] === 'undefined') {
          validatorObj[key] = true;
        } else {
          if (key === 'phone' || key === 'percentage') {
            const isNumber = /^\d+$/;
            validatorObj[key] = !isNumber.test(validatedObj[key]);
          } else if (key === 'email') {
            const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            validatorObj[key] = !isEmail.test(validatedObj[key]);
          } else {
            validatorObj[key] = false;
          }
        }
        console.log(key, ' ::: ', validatorObj.hasOwnProperty(key), ':::', validatorObj[key] );
      }
    }

    return Object.values(validatorObj).indexOf(true) >= 0 ? true : false;
  }

}
