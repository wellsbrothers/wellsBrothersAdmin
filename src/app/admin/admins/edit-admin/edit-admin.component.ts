import { Component, OnInit } from '@angular/core';
import {AdminsService} from '../admins.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  changePassword: boolean;
  role: number;
  admin: any;
  adminId: string;
  newPassword: string;
  constructor(private adminsService: AdminsService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router) {
    sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
  }

  ngOnInit(): void {
    this.changePassword = false;
    this.route.params.subscribe((param) => {
      this.adminId = param.id;
      this.getAdmin();
    });
  }

  getAdmin(): void {
    this.sharedService.setLoader(true);
    this.adminsService.getOne(this.adminId).subscribe( (res: any) => {
      if (!res.error) {
        this.admin = res.data;
      }
      this.sharedService.setLoader(false);
    });
  }

  updateAdmin(): void {
    this.sharedService.setLoader(true);
    this.adminsService.update(this.admin).subscribe( (res: any) => {
      if (!res.error) {
        this.router.navigate(['/admin/admins']);
      }
      this.notiFuncion(res);
    });
  }

  updatePassword(): void {
    this.admin.password = this.newPassword;
    this.adminsService.updatePassword(this.admin).subscribe( (res: any) => {
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
