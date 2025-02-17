import { Component, OnInit } from '@angular/core';
import {CarriersService} from './carriers.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.css']
})
export class CarriersComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  carriers: any;
  searchTD: boolean[];

  constructor(private carriersService: CarriersService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
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

    this.getCarriers();
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
    this.getCarriers();
  }

  getCarriers(): any {
    this.sharedService.setLoader(true);
    this.carriersService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.carriers = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  changeStatus(broker): void {
    this.sharedService.setLoader(true);
    this.carriersService.updateStatus(broker).subscribe( (res: any) => {
      if (!res.error) {
        this.getCarriers();
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
    this.getCarriers();
  }

  next(): void {
    this.page++;
    this.getCarriers();
  }

  prev(): void {
    this.page--;
    this.getCarriers();
  }

}
