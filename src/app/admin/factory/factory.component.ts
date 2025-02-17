import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {FactoriesService} from './factories.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  factories: any;
  searchTD: boolean[];

  constructor(private factoriesService: FactoriesService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.searchTD = [false, false, false, false];

    this.search = {
      name: '',
      phone: '',
      sortBool: true,
      sortBy: 'createdAt'
    };
    this.page = 1;
    this.limit = 20;

    this.getFactories();
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
    this.getFactories();
  }

  getFactories(): any {
    this.sharedService.setLoader(true);
    this.factoriesService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.factories = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  changeStatus(broker): void {
    this.sharedService.setLoader(true);
    this.factoriesService.updateStatus(broker).subscribe( (res: any) => {
      if (!res.error) {
        this.getFactories();
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
    this.getFactories();
  }

  next(): void {
    this.page++;
    this.getFactories();
  }

  prev(): void {
    this.page--;
    this.getFactories();
  }

}
