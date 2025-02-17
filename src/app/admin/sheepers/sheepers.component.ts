import { Component, OnInit } from '@angular/core';
import {SheepersService} from './sheepers.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-sheepers',
  templateUrl: './sheepers.component.html',
  styleUrls: ['./sheepers.component.css']
})
export class SheepersComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  sheepers: any;
  searchTD: boolean[];

  constructor(private sheepersService: SheepersService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.searchTD = [false, false, false];

    this.search = {
      name: '',
      phone: '',
      sortBool: true,
      sortBy: 'createdAt'
    };
    this.page = 1;
    this.limit = 20;

    this.getSheepers();
  }

  sort(index): void {
    for (let i = 0; i < this.searchTD.length; i++) {
      if (i === index) {
        this.searchTD[i] = !this.searchTD[i];
        this.search.sortBool = this.searchTD[i];
      } else {
        this.searchTD[i] = false;
      }
    }
    this.page = 1;
    this.getSheepers();
  }

  getSheepers(): any {
    this.sharedService.setLoader(true);
    this.sheepersService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.sheepers = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  changeStatus(broker): void {
    this.sharedService.setLoader(true);
    this.sheepersService.updateStatus(broker).subscribe( (res: any) => {
      if (!res.error) {
        this.getSheepers();
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

  currentpage(n: number): void {
    this.page = n;
    this.getSheepers();
  }

  next(): void {
    this.page++;
    this.getSheepers();
  }

  prev(): void {
    this.page--;
    this.getSheepers();
  }


}
