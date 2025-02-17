import { Component, OnInit } from '@angular/core';
import {AdminsService} from '../admins.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  admin: any;
  role: number;
  constructor(private adminsService: AdminsService,
              private sharedService: SharedService,
              private router: Router) {
    sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
  }

  ngOnInit(): void {
    this.admin = {
      fullName: '',
      username: '',
      percentage: 0,
      role: 1,
      phone: '',
      note: '',
      password: '',
    };
  }

  createAdmin(): void {
    this.sharedService.setLoader(true);
    this.adminsService.create(this.admin).subscribe( (res: any) => {
      if (!res.error) {
        this.router.navigate(['/admin/admins']);
      }
      this.notiFuncion(res);
    });
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

}
