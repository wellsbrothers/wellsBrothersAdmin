import { Component, OnInit } from '@angular/core';
import {BrokersService} from './brokers.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  brokers: any;
  searchTD: boolean[];

  constructor(private brokersService: BrokersService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.setLoader(true);
    this.searchTD = [false, false, false, false];
    this.search = {
      name: '',
      mc: '',
      phone: '',
      sortBool: true,
      sortBy: 'createdAt'
    };
    this.page = 1;
    this.limit = 20;

    this.getBrokers();
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
    this.getBrokers();
  }

  getBrokers(): any {
    this.sharedService.setLoader(true);
    this.brokersService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.brokers = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  changeStatus(broker): void {
    this.sharedService.setLoader(true);
    this.brokersService.updateStatus(broker).subscribe( (res: any) => {
      if (!res.error) {
        this.getBrokers();
      }
    });
  }

  currentpage(n: number): void {
    this.page = n;
    this.getBrokers();
  }

  next(): void {
    this.page++;
    this.getBrokers();
  }

  prev(): void {
    this.page--;
    this.getBrokers();
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
