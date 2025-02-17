import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {Router} from '@angular/router';
import {TrackboardService} from './trackboard.service';

@Component({
  selector: 'app-trackboard',
  templateUrl: './trackboard.component.html',
  styleUrls: ['./trackboard.component.css']
})
export class TrackboardComponent implements OnInit {
  showHeadeDropdown: boolean;
  role: number;
  page: number;
  limit: number;
  total: number;
  showTrackBoard: boolean;

  tracks: any;
  search: any;
  searchTD: any;

  constructor(private sharedService: SharedService,
              private trackboardService: TrackboardService,
              private router: Router) {
    sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
    sharedService.showTrackBoard$.subscribe((val: boolean) => {
      this.showTrackBoard = val;
    });
  }

  ngOnInit(): void {
    if (!this.showTrackBoard) {
      this.router.navigate(['dashboard']);
    } else {
      this.searchTD = [false, false, false, false, false, true, false]
      this.search = {
        sortBool: true,
        sortBy: 'loads.consignee.date'
      };
      this.page = 1;
      this.limit = 20;
      this.showHeadeDropdown = false;
      this.getTracks();
    }
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
    this.getTracks();
  }

  getTracks(): void {
    this.sharedService.setLoader(true);
    this.trackboardService.getList(this.page, this.limit, this.search).subscribe((res: any) => {
      if (!res.error) {
        this.tracks = res.data;
        this.total = res.total;
      }
      this.sharedService.setLoader(false);
    });
  }

  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  currentpage(n: number): void {
    this.page = n;
    this.getTracks();
  }

  next(): void {
    this.page++;
    this.getTracks();
  }

  prev(): void {
    this.page--;
    this.getTracks();
  }

  getLastConsignee(data): any {
      return data.reduce((a, b) => {
        return new Date(a.date).toString() > new Date(b.date).toString() ? a : b;
      });
  }

  getLastSheeper(data): any {
      return data.reduce((a, b) => {
        return new Date(a.date).toString() > new Date(b.date).toString() ? a : b;
      });
  }
}
