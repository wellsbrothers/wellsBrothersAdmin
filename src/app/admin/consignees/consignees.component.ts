import { Component, OnInit } from '@angular/core';
import {ConsigneesService} from './consignees.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-consignees',
  templateUrl: './consignees.component.html',
  styleUrls: ['./consignees.component.css']
})
export class ConsigneesComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  consignees: any;
  searchTD: boolean[];


  constructor(private consigneesService: ConsigneesService,
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

    this.getConsignees();
  }

  getConsignees(): any {
    this.sharedService.setLoader(true);
    this.consigneesService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.consignees = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
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
    this.getConsignees();
  }

  changeStatus(broker): void {
    this.sharedService.setLoader(true);
    this.consigneesService.updateStatus(broker).subscribe( (res: any) => {
      if (!res.error) {
        this.getConsignees();
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
    this.getConsignees();
  }

  next(): void {
    this.page++;
    this.getConsignees();
  }

  prev(): void {
    this.page--;
    this.getConsignees();
  }

}
