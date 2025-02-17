import { Component, OnInit } from '@angular/core';
import {AdminsService} from './admins.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  admins: any;

  constructor(private adminsService: AdminsService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.setLoader(true);
    this.search = {
      fullName: '',
      username: '',
      phone: '',
      role: ''
    };
    this.page = 1;
    this.limit = 20;

    this.getAdmins();
  }

  getAdmins(): any {
    this.adminsService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.admins = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  changeStatus(admin): void {
    this.sharedService.setLoader(true);
    this.adminsService.updateStatus(admin).subscribe( (res: any) => {
      if (!res.error) {
        this.getAdmins();
      }
      this.notiFuncion(res);
    });
  }

  updateshowTrackBoard(admin): void {
    this.sharedService.setLoader(true);
    this.adminsService.updateshowTrackBoard(admin).subscribe( (res: any) => {
      if (!res.error) {
        this.getAdmins();
      }
      this.notiFuncion(res);
    });
  }
  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    setTimeout(() => {
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }

  currentpage(n: number): void {
    this.page = n;
    this.getAdmins();
  }

  next(): void {
    this.page++;
    this.getAdmins();
  }

  prev(): void {
    this.page--;
    this.getAdmins();
  }

}
