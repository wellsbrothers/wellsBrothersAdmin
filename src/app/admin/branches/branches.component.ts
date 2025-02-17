import { Component, OnInit } from '@angular/core';
import {BranchesService} from './branches.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  page: number;
  limit: number;
  total: number;
  search: any;
  branches: any;
  searchTD: boolean[];

  constructor(private branchesService: BranchesService,
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

    this.getBranches();
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
    this.getBranches();
  }

  getBranches(): any {
    this.branchesService.getList(this.page, this.limit, this.search).subscribe( (res: any) => {
      if (!res.error) {
        this.branches = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  changeStatus(broker): void {
    this.sharedService.setLoader(true);
    this.branchesService.updateStatus(broker).subscribe( (res: any) => {
      if (!res.error) {
        this.getBranches();
      }
      this.notiFuncion(res);
    });
  }

  currentpage(n: number): void {
    this.page = n;
    this.getBranches();
  }

  next(): void {
    this.page++;
    this.getBranches();
  }

  prev(): void {
    this.page--;
    this.getBranches();
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
